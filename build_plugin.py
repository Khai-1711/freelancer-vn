import re

with open('generate_master_screens.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Add safe fallback for realHeader and realFooter
header_fallback = '''
let realHeader = figma.getNodeById("2:2692");
let realFooter = figma.getNodeById("2:2412");

if (!realHeader) {
  realHeader = figma.currentPage.findOne(n => n.name && (n.name.includes("Background+Shadow") || n.name.toLowerCase().includes("header")));
}
if (!realFooter) {
  realFooter = figma.currentPage.findOne(n => n.name && (n.name.includes("Footer") || n.name.toLowerCase().includes("footer")));
}

function getHeader() {
  if (realHeader) return realHeader.clone();
  const h = figma.createFrame();
  h.resize(1920, 84);
  h.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  h.strokes = [{ type: 'SOLID', color: { r: 0.88, g: 0.9, b: 0.93 } }];
  h.strokeWeight = 1;
  return h;
}

function getFooter() {
  if (realFooter) return realFooter.clone();
  const f = figma.createFrame();
  f.resize(1920, 400);
  f.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.11, b: 0.16 } }];
  return f;
}
'''

# Replace const realHeader = ... and const realFooter = ...
code = re.sub(r'const realHeader = figma\.getNodeById\("2:2692"\);', '', code)
code = re.sub(r'const realFooter = figma\.getNodeById\("2:2412"\);', '', code)
code = header_fallback + '\n' + code

# Replace realHeader.clone() and realFooter.clone() with getHeader() and getFooter()
code = code.replace('realHeader.clone()', 'getHeader()')
code = code.replace('realFooter.clone()', 'getFooter()')

# Replace ending return
code = re.sub(r'return \{[\s\S]*?\};', 'figma.notify("✅ Đã dựng thành công các màn hình chuẩn Freelancer!");\nfigma.closePlugin();', code)

plugin_script = f'''(async () => {{
  try {{
{code}
  }} catch (err) {{
    console.error(err);
    figma.notify("❌ Lỗi: " + err.message, {{ error: true }});
    figma.closePlugin();
  }}
}})();'''

with open('figma-plugin/code.js', 'w', encoding='utf-8') as f:
    f.write(plugin_script)

print("Generated figma-plugin/code.js successfully!")
