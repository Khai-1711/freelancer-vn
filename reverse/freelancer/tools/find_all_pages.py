import re
import os
from urllib.parse import urlparse

pages = set()

# Scan all html files in raw and raw_pages
dirs = [
    os.path.join("reverse", "freelancer", "raw"),
    os.path.join("reverse", "freelancer", "raw_pages")
]

for d in dirs:
    if not os.path.exists(d):
        continue
    for f in os.listdir(d):
        if not f.endswith(".html"):
            continue
        filepath = os.path.join(d, f)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as fp:
            content = fp.read()
        
        # Regex for href
        links = re.findall(r'href=["\']([^"\']+)["\']', content, re.I)
        for link in links:
            if link.startswith("/") and not link.startswith("//"):
                clean = link.split("?")[0].split("#")[0].rstrip("/")
                if clean and not clean.endswith((".css", ".js", ".png", ".jpg", ".svg", ".ico", ".webmanifest")):
                    pages.add(clean)
            elif "freelancer.com" in link:
                p = urlparse(link).path.rstrip("/")
                if p and not p.endswith((".css", ".js", ".png", ".jpg", ".svg", ".ico", ".webmanifest")):
                    pages.add(p)

print(f"Total unique pages discovered across all HTML files: {len(pages)}")

# Group by category / feature
grouped = {}
for p in sorted(list(pages)):
    parts = p.strip("/").split("/")
    section = parts[0] if parts else "root"
    if section not in grouped:
        grouped[section] = []
    grouped[section].append(p)

for sec, list_p in sorted(grouped.items()):
    print(f"\n[{sec.upper()}] ({len(list_p)} pages):")
    for item in list_p[:15]:
        print(f"  • {item}")
    if len(list_p) > 15:
        print(f"  ... và thêm {len(list_p) - 15} trang nữa")
