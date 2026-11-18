import urllib.request
import urllib.parse
import re
import os
import json
import time

BASE_URL = "https://www.vn.freelancer.com"
OUTPUT_DIR = os.path.join("reverse", "freelancer", "crawled_pages")
ASSETS_DIR = os.path.join("reverse", "freelancer", "crawled_assets")
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
}

# Danh sách toàn bộ các nhánh trang cốt lõi cần quét thực tế
TARGET_ROUTES = [
    # 1. Core
    ("/", "home"),
    ("/post-project", "post_project"),
    ("/jobs", "jobs_browse"),
    ("/hire", "hire_directory"),
    ("/login", "login"),
    ("/signup", "signup"),
    
    # 2. Key Sub-pages & Business
    ("/enterprise", "enterprise"),
    ("/ai", "ai_services"),
    ("/contest", "contest"),
    ("/discover", "discover"),
    ("/freelancers", "freelancers_directory"),
    
    # 3. Policy & Guides
    ("/info/how-it-works", "how_it_works"),
    ("/feesandcharges", "fees_and_charges"),
    ("/about/privacy", "privacy_policy"),
    ("/about/terms", "terms_of_service"),
    
    # 4. Specific category / sub-skills samples
    ("/jobs/python", "jobs_python"),
    ("/jobs/graphic-design", "jobs_design"),
    ("/hire/python", "hire_python"),
    ("/hire/ui-ux", "hire_ui_ux"),
    ("/freelancers/vietnam", "freelancers_vietnam")
]

catalog = {
    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
    "total_targets": len(TARGET_ROUTES),
    "successful_pages": 0,
    "pages": {},
    "global_assets": {
        "stylesheets": [],
        "scripts": [],
        "svg_icons": [],
        "cdn_images": []
    },
    "component_registry": {}
}

print(f"🚀 BẮT ĐẦU QUÉT THỰC TẾ {len(TARGET_ROUTES)} TRANG CỐT LÕI...")

for path, key in TARGET_ROUTES:
    url = urllib.parse.urljoin(BASE_URL, path)
    filename = f"{key}.html"
    filepath = os.path.join(OUTPUT_DIR, filename)
    print(f"--> Đang quét: {path} ({url})...")
    
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            html = resp.read().decode("utf-8", errors="ignore")
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(html)
            
            # Phân tích nội dung trang
            title_match = re.search(r"<title>(.*?)</title>", html, re.I | re.S)
            title = title_match.group(1).strip() if title_match else "N/A"
            
            # Headings
            headings = [re.sub(r"<[^>]+>", "", h).strip() for h in re.findall(r"<h[1-3][^>]*>(.*?)</h[1-3]>", html, re.I | re.S)]
            headings = [h for h in headings if h][:10]
            
            # Custom components
            custom_tags = sorted(list(set(re.findall(r"<(app-[a-z0-9\-]+|fl-[a-z0-9\-]+)", html))))
            for t in custom_tags:
                catalog["component_registry"][t] = catalog["component_registry"].get(t, 0) + 1
            
            # Interactive elements
            buttons = [re.sub(r"<[^>]+>", "", b).strip() for b in re.findall(r"<button[^>]*>(.*?)</button>", html, re.I | re.S)]
            buttons = [b for b in buttons if b and len(b) < 50][:10]
            
            inputs = re.findall(r"<input[^>]*>", html, re.I)
            forms = re.findall(r"<form[^>]*>", html, re.I)
            
            # Links to other internal pages
            links = re.findall(r'href=["\']([^"\']+)["\']', html, re.I)
            sub_links = set()
            for l in links:
                if l.startswith("/") and not l.startswith("//") and not l.endswith((".css", ".js", ".png", ".jpg", ".svg")):
                    sub_links.add(l.split("?")[0].split("#")[0])
            
            # Stylesheets & CDN images
            css_links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
            img_links = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
            
            for c in css_links:
                if c not in catalog["global_assets"]["stylesheets"]:
                    catalog["global_assets"]["stylesheets"].append(c)
            for img in img_links:
                if "f-cdn.com" in img or img.startswith("/"):
                    if img not in catalog["global_assets"]["cdn_images"]:
                        catalog["global_assets"]["cdn_images"].append(img)
            
            catalog["pages"][key] = {
                "route": path,
                "url": url,
                "status": status,
                "size_bytes": len(html),
                "title": title,
                "headings": headings,
                "custom_components": custom_tags,
                "interactive": {
                    "form_count": len(forms),
                    "input_count": len(inputs),
                    "sample_buttons": buttons
                },
                "internal_routes_found": len(sub_links),
                "file": filepath
            }
            catalog["successful_pages"] += 1
            print(f"    ✅ Thành công: {status} | Size: {len(html):,} bytes | Title: {title[:45]}")
            
    except Exception as e:
        print(f"    ❌ Lỗi: {e}")
        catalog["pages"][key] = {
            "route": path,
            "url": url,
            "error": str(e)
        }
    
    time.sleep(0.5)

# Lưu catalog master
catalog_path = os.path.join("reverse", "freelancer", "CRAWL_CATALOG.json")
with open(catalog_path, "w", encoding="utf-8") as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

print(f"\n🎉 HOÀN TẤT QUÉT! Đã tải và lưu {catalog['successful_pages']}/{len(TARGET_ROUTES)} trang vào thư mục:")
print(f"📁 {OUTPUT_DIR}")
print(f"📄 Báo cáo tổng hợp: {catalog_path}")
