import os

frontend_dir = r"c:\Users\khai1\OneDrive\Máy tính\sth\frontend"
tag = '<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>\n</head>'

for f in os.listdir(frontend_dir):
    if f.endswith('.html'):
        p = os.path.join(frontend_dir, f)
        with open(p, 'r', encoding='utf-8') as file:
            content = file.read()
        if 'mcp.figma.com/mcp/html-to-design/capture.js' not in content:
            content = content.replace('</head>', tag)
            with open(p, 'w', encoding='utf-8') as file:
                file.write(content)
print('Injected capture script successfully!')
