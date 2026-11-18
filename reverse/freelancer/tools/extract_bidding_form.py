import re

with open("reverse/freelancer/crawled_pages/projects/projects_data-entry_excel-sheets-chu.html", "r", encoding="utf-8") as f:
    text = f.read()

# Find text around "Đặt chào giá của bạn"
idx = text.find("Đặt chào giá của bạn")
if idx != -1:
    snippet = text[idx:idx+2500]
    clean = re.sub(r"<[^>]+>", " ", snippet)
    clean = re.sub(r"\s+", " ", clean)
    print("BIDDING FORM TEXT SNIPPET:")
    print(clean[:800])
