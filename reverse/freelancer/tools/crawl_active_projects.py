import re
import subprocess
import os

with open("reverse/freelancer/crawled_pages/jobs_browse.html", "r", encoding="utf-8") as f:
    text = f.read()

# Find project links
proj_links = set(re.findall(r'href=["\'](/projects/[a-z0-9\-]+/[a-z0-9\-]+)["\']', text, re.I))
print(f"Found {len(proj_links)} project links in jobs_browse.html:")

output_dir = os.path.join("reverse", "freelancer", "crawled_pages", "projects")
os.makedirs(output_dir, exist_ok=True)

for i, p in enumerate(list(proj_links)[:5]):
    full_url = f"https://www.vn.freelancer.com{p}"
    filename = p.strip("/").replace("/", "_") + ".html"
    filepath = os.path.join(output_dir, filename)
    print(f"--> [{i+1}/5] Crawling project: {full_url}...")
    res = subprocess.run(["curl.exe", "-sL", full_url], capture_output=True, text=True, encoding="utf-8", errors="ignore")
    if res.stdout and len(res.stdout) > 1000:
        with open(filepath, "w", encoding="utf-8") as out:
            out.write(res.stdout)
        title = re.search(r"<title>(.*?)</title>", res.stdout, re.I)
        t_str = title.group(1).strip() if title else "No title"
        print(f"    ✅ Saved ({len(res.stdout):,} bytes): {t_str[:50]}")
    else:
        print(f"    ⚠️ Empty or blocked: {len(res.stdout)} bytes")

print("\nDone crawling sample live project bidding pages!")
