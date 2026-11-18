import re
from html.parser import HTMLParser

class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
        self.sources = []
        self.svgs = 0

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'img':
            src = attr_dict.get('src') or attr_dict.get('srcset') or attr_dict.get('data-src')
            alt = attr_dict.get('alt', '')
            if src:
                self.images.append((src, alt))
        elif tag == 'source':
            srcset = attr_dict.get('srcset')
            if srcset:
                self.sources.append(srcset)
        elif tag == 'svg':
            self.svgs += 1

with open('reverse/freelancer/raw/home.html', encoding='utf-8', errors='ignore') as f:
    content = f.read()

parser = AssetParser()
parser.feed(content)

print(f"Total images: {len(parser.images)}")
print(f"Total sources: {len(parser.sources)}")
print(f"Total svgs: {parser.svgs}")

print("\n--- SAMPLE IMAGES ---")
for src, alt in parser.images[:25]:
    print(f"- {src} (alt: {alt})")

print("\n--- SAMPLE SOURCES (PICTURE) ---")
for s in parser.sources[:15]:
    print(f"- {s.split(',')[0]}")
