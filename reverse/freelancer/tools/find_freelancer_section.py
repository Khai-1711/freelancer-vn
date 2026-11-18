import re

with open("reverse/freelancer/crawled_pages/home.html", "r", encoding="utf-8") as f:
    html = f.read()

# Search for find-work section
fw_blocks = re.findall(r'<app-navigation-logged-out-home-section-find-work.*?</app-navigation-logged-out-home-section-find-work>', html, re.S)
print(f"Find-work blocks: {len(fw_blocks)}")

if fw_blocks:
    items = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', fw_blocks[0], re.S)
    print(f"Total links in 'Tim viec' menu: {len(items)}")
    for href, txt in items:
        clean_txt = re.sub(r'<[^>]+>', '', txt).strip()
        clean_txt = re.sub(r'\s+', ' ', clean_txt)
        if clean_txt:
            print(f"  • {clean_txt} -> {href}")
else:
    # Search all links with "viec" or "jobs" or "freelance"
    print("Searching all find-work links in navbar...")
    links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.S)
    seen = set()
    for href, txt in links:
        clean_txt = re.sub(r'<[^>]+>', '', txt).strip()
        if any(w in clean_txt.lower() for w in ["tìm việc", "việc làm", "kiếm tiền", "chào giá", "dự án", "cuộc thi", "kỹ năng"]):
            if (href, clean_txt) not in seen:
                seen.add((href, clean_txt))
                print(f"  • {clean_txt} -> {href}")
