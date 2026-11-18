import subprocess
import os
import re

profile_url = "https://www.vn.freelancer.com/u/phun4"
output_file = os.path.join("reverse", "freelancer", "crawled_pages", "freelancer_profile.html")

print(f"Downloading profile: {profile_url}...")
res = subprocess.run(["curl.exe", "-sL", profile_url], capture_output=True, text=True, encoding="utf-8", errors="ignore")
html = res.stdout

with open(output_file, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Saved: {output_file} ({len(html):,} bytes)")

# Extract key profile sections
title = re.search(r"<title>(.*?)</title>", html, re.I)
print("Title:", title.group(1) if title else "N/A")

# Find custom elements
custom = set(re.findall(r"<(app-[a-z0-9\-]+|fl-[a-z0-9\-]+)", html))
print(f"Custom components ({len(custom)}):", sorted(list(custom))[:25])

# Headings
headings = [re.sub(r"<[^>]+>", "", h).strip() for h in re.findall(r"<h[1-4][^>]*>(.*?)</h[1-4]>", html, re.I | re.S)]
print("\nHeadings:")
for h in [h for h in headings if h][:15]:
    print("  •", h)
