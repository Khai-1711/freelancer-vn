import re
from html.parser import HTMLParser

with open('reverse/freelancer/raw/home.html', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's find custom elements app-* and fl-*
custom_tags = set(re.findall(r'<(app-[a-z0-9-]+|fl-[a-z0-9-]+)', html))
print("Custom tags found:", sorted(list(custom_tags)))

# Let's extract the main sections under app-home-page
sections = re.findall(r'<(app-home-page-[a-z0-9-]+|app-[a-z0-9-]+)', html)
print("\nSection sequence:")
for s in sections:
    if 'home-page' in s or 'trust' in s or 'seen' in s or 'footer' in s:
        print(" -", s)
