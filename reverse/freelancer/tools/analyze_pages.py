import re
import os

def analyze(filename, name):
    path = os.path.join("reverse", "freelancer", "raw_pages", filename)
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    print(f"================== {name} ({filename}) ==================")
    print(f"Size: {len(content):,} bytes")
    
    # Title
    t = re.search(r"<title>(.*?)</title>", content, re.I)
    print("Title:", t.group(1).strip() if t else "N/A")

    # Headings
    h = re.findall(r"<h[1-4][^>]*>(.*?)</h[1-4]>", content, re.I | re.S)
    print("\nHeadings:")
    seen_h = set()
    for item in h:
        clean = re.sub(r"<[^>]+>", "", item).strip()
        clean = re.sub(r"\s+", " ", clean)
        if clean and clean not in seen_h:
            seen_h.add(clean)
            print(f"  • {clean}")

    # Labels
    labels = re.findall(r"<label[^>]*>(.*?)</label>", content, re.I | re.S)
    print("\nForm Labels:")
    seen_l = set()
    for item in labels[:20]:
        clean = re.sub(r"<[^>]+>", "", item).strip()
        clean = re.sub(r"\s+", " ", clean)
        if clean and clean not in seen_l:
            seen_l.add(clean)
            print(f"  - {clean}")

    # Custom Angular components
    custom = set(re.findall(r"<(app-[a-z0-9\-]+|fl-[a-z0-9\-]+)", content))
    print(f"\nCustom Angular Components ({len(custom)} found, top 25):")
    for c in sorted(list(custom))[:25]:
        print(f"  [{c}]")

analyze("post-project.html", "POST A PROJECT (/post-project)")
analyze("jobs.html", "JOBS BROWSE (/jobs)")
analyze("hire.html", "HIRE FREELANCERS (/hire)")
