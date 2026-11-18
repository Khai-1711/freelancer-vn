import re

with open('reverse/freelancer/crawled_pages/home.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

imgs = re.findall(r'src=["\']([^"\']+)["\']', text)
logo_urls = [u for u in imgs if 'logo' in u.lower() or 'freelancer' in u.lower()]
print('Logo URLs:', logo_urls[:10])

# check fonts and styles
fonts = re.findall(r'https://fonts\.googleapis\.com[^\'"]+', text)
print('Fonts:', set(fonts))
