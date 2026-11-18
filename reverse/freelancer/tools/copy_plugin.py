import os

src_path = os.path.join(r"c:\Users\khai1\OneDrive\Máy tính\sth\reverse\freelancer", "figma_builder_script.js")
dst_path = os.path.join(r"C:\Users\khai1\OneDrive\Máy tính\FigmaPlugin_BuildScreens", "code.js")

with open(src_path, "r", encoding="utf-8") as f:
    code = f.read()

# Append figma.closePlugin() before catch block
code = code.replace(
    'figma.notify("🎉 Dựng thành công 2 màn hình Post Project & Hire vào Figma!", { timeout: 4000 });',
    'figma.notify("🎉 Dựng thành công 2 màn hình Post Project & Hire vào Figma!", { timeout: 4000 });\n    figma.closePlugin();'
)

with open(dst_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Done! code.js created successfully.")
