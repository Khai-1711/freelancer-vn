with open('generate_all_frontend.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace {title} in HEAD_TAG with __TITLE__
text = text.replace('<title>{title}</title>', '<title>__TITLE__</title>')

# Replace {HEAD_TAG.format(title="...")} with {get_head("...")}
import re
text = re.sub(r'\{HEAD_TAG\.format\(title="([^"]+)"\)\}', r'{get_head("\1")}', text)

# Insert get_head function after HEAD_TAG definition
head_end = "body class=\"min-h-screen flex flex-col bg-[#f8f9fa] text-[#151d2a] antialiased\">\n'''"
head_func = """
def get_head(title):
    return HEAD_TAG.replace('__TITLE__', title)
"""
if "def get_head(" not in text:
    text = text.replace(head_end, head_end + "\n" + head_func)

with open('generate_all_frontend.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Repaired successfully!")
