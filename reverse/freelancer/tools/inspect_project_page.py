import re
import os

filepath = os.path.join("reverse", "freelancer", "crawled_pages", "projects", "projects_data-entry_excel-sheets-chu.html")
with open(filepath, "r", encoding="utf-8") as f:
    html = f.read()

print("Title:", re.search(r"<title>(.*?)</title>", html, re.I).group(1))

# Extract headings
headings = [re.sub(r"<[^>]+>", "", h).strip() for h in re.findall(r"<h[1-4][^>]*>(.*?)</h[1-4]>", html, re.I | re.S)]
print("\nHeadings:")
for h in [h for h in headings if h][:15]:
    print("  •", h)

# Custom tags
custom = set(re.findall(r"<(app-[a-z0-9\-]+|fl-[a-z0-9\-]+)", html))
print(f"\nCustom tags ({len(custom)}):", sorted(list(custom))[:20])

# Form fields / buttons
buttons = [re.sub(r"<[^>]+>", "", b).strip() for b in re.findall(r"<button[^>]*>(.*?)</button>", html, re.I | re.S)]
print("\nSample Buttons:", [b for b in buttons if b and len(b) < 50][:10])
