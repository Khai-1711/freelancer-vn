import re

with open('reverse/freelancer/raw/home.html', encoding='utf-8', errors='ignore') as f:
    html = f.read()

def get_section(tag_name):
    pattern = rf'<{tag_name}\b[^>]*>(.*?)</{tag_name}>'
    m = re.search(pattern, html, re.DOTALL)
    if m:
        # Strip internal tags to see text
        raw = m.group(1)
        # get text
        texts = re.findall(r'>([^<]+)<', raw)
        clean_texts = [t.strip() for t in texts if t.strip() and not t.strip().startswith('{')]
        # get images
        imgs = re.findall(r'<img[^>]+(?:src|srcset)=[\"\']([^\"\']+)[\"\']', raw)
        pics = re.findall(r'<source[^>]+srcset=[\"\']([^\"\']+)[\"\']', raw)
        return clean_texts[:10], imgs[:5], pics[:5]
    return [], [], []

sec_tags = [
    'app-navigation-logged-out-home',
    'app-home-page-hero',
    'app-companies-trust-logo',
    'app-home-page-make-it-real',
    'app-home-page-global-talent',
    'app-as-seen-on',
    'app-home-page-hire-categories',
    'app-home-page-ai-services',
    'app-home-page-api-enterprise-v5',
    'app-footer-freelancer'
]

for tag in sec_tags:
    texts, imgs, pics = get_section(tag)
    print(f"\n=== {tag} ===")
    print("Texts:", texts)
    print("Images:", imgs)
    print("Pictures:", pics)
