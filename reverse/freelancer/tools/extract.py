"""Tool dịch ngược: bóc cấu trúc từ HTML SSR + bundle JS của freelancer.com.
Viết bằng Python thuần (không phụ thuộc ngoài), chạy: python tools/extract.py
"""
import io, os, re, json, collections, html

RAW = os.path.join(os.path.dirname(__file__), "..", "raw")
OUT = os.path.join(os.path.dirname(__file__), "..", "analysis")
os.makedirs(OUT, exist_ok=True)


def read(name):
    p = os.path.join(RAW, name)
    with io.open(p, "r", encoding="utf-8", errors="replace") as f:
        return f.read()


def dump(name, obj):
    p = os.path.join(OUT, name)
    with io.open(p, "w", encoding="utf-8") as f:
        if isinstance(obj, str):
            f.write(obj)
        else:
            json.dump(obj, f, indent=2, ensure_ascii=False)
    print("wrote", p)


# ---------- 1. Bóc <style> đã inline trong SSR ----------
def extract_styles(doc):
    blocks = re.findall(r"<style[^>]*>(.*?)</style>", doc, re.S | re.I)
    css = "\n\n".join(blocks)
    css = html.unescape(css)
    dump("css-inline.css", css)
    # CSS custom properties (design tokens)
    vars_ = collections.Counter(re.findall(r"(--[A-Za-z0-9_-]+)\s*:", css))
    vals = {}
    for m in re.finditer(r"(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]{1,60})", css):
        vals.setdefault(m.group(1), m.group(2).strip())
    # color tokens
    colors = collections.Counter(c.lower() for c in re.findall(r"#[0-9a-fA-F]{3,8}\b|rgba?\([^)]{1,40}\)", css))
    # media queries
    mq = collections.Counter(re.findall(r"@media[^{]{1,120}", css))
    return {
        "style_blocks": len(blocks),
        "css_length": len(css),
        "custom_properties": [{"name": k, "sample_value": vals.get(k)} for k, _ in vars_.most_common()],
        "top_colors": [{"color": c, "count": n} for c, n in colors.most_common(60)],
        "media_queries": [{"query": q.strip(), "count": n} for q, n in mq.most_common(40)],
    }


# ---------- 2. Cây DOM các component tùy biến (fl-* / app-*) ----------
TAG = re.compile(r"<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:\"[^\"]*\"|'[^']*'|[^\s>]+))?)*)\s*(/?)>")
CLOSE = re.compile(r"</([a-zA-Z][a-zA-Z0-9-]*)\s*>")
ATTR = re.compile(r"([^\s=]+)(?:\s*=\s*(?:\"([^\"]*)\"|'([^']*)'|([^\s>]+)))?")
VOID = {"meta", "link", "br", "hr", "img", "input", "source", "path", "use", "area", "col", "param", "track", "wbr"}
SKIP = {"script", "style", "head", "svg", "g", "defs", "noscript", "template"}


def dom_tree(doc):
    body = re.search(r"<body[^>]*>(.*)</body>", doc, re.S | re.I)
    src = body.group(1) if body else doc
    tokens = []
    pos = 0
    while True:
        m = TAG.search(src, pos)
        c = CLOSE.search(src, pos)
        if not m and not c:
            break
        if m and (not c or m.start() < c.start()):
            name = m.group(1).lower()
            attrs = {}
            for am in ATTR.finditer(m.group(2) or ""):
                v = am.group(2) or am.group(3) or am.group(4)
                attrs[am.group(1)] = v
            tokens.append(("open", name, attrs, bool(m.group(3)) or name in VOID))
            pos = m.end()
        else:
            tokens.append(("close", c.group(1).lower(), None, False))
            pos = c.end()

    root = {"tag": "#root", "attrs": {}, "children": [], "text": ""}
    stack = [root]
    for kind, name, attrs, selfclosed in tokens:
        if kind == "open":
            node = {"tag": name, "attrs": attrs or {}, "children": [], "text": ""}
            stack[-1]["children"].append(node)
            if not selfclosed:
                stack.append(node)
                if name in SKIP:
                    stack.pop()
        else:
            for i in range(len(stack) - 1, 0, -1):
                if stack[i]["tag"] == name:
                    del stack[i:]
                    break

    counts = collections.Counter()
    custom = collections.Counter()
    def walk(n, depth=0):
        counts[n["tag"]] += 1
        if "-" in n["tag"]:
            custom[n["tag"]] += 1
        for ch in n["children"]:
            walk(ch, depth + 1)
    walk(root)

    def prune(n, depth=0):
        keep = {"tag": n["tag"], "children": []}
        a = n.get("attrs", {})
        for k in ("id", "class", "href", "src", "type", "rel", "aria-label", "placeholder", "name"):
            if k in a and a[k]:
                keep[k] = a[k][:160]
        if depth > 14:
            return keep
        for ch in n["children"]:
            keep["children"].append(prune(ch, depth + 1))
        return keep

    dump("dom-tree.json", prune(root))
    return {
        "total_elements": sum(counts.values()),
        "distinct_tags": len(counts),
        "custom_elements": [{"tag": t, "count": c} for t, c in custom.most_common()],
        "all_tags": [{"tag": t, "count": c} for t, c in counts.most_common()],
    }


# ---------- 3. Nội dung nhìn thấy được theo khối ----------
def visible_content(doc):
    body = re.search(r"<body[^>]*>(.*)</body>", doc, re.S | re.I)
    src = body.group(1) if body else doc
    src = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", src)
    heads = re.findall(r"(?is)<h([1-6])[^>]*>(.*?)</h\1>", src)
    btns = re.findall(r"(?is)<button[^>]*>(.*?)</button>", src)
    links = re.findall(r'(?is)<a\s[^>]*href="([^"]+)"[^>]*>(.*?)</a>', src)
    clean = lambda s: re.sub(r"\s+", " ", html.unescape(re.sub(r"(?s)<[^>]+>", "", s))).strip()
    return {
        "headings": [{"level": int(l), "text": clean(t)[:200]} for l, t in heads if clean(t)],
        "buttons": [clean(b)[:120] for b in btns if clean(b)],
        "links": [{"href": h, "text": clean(t)[:80]} for h, t in links],
    }


# ---------- 4. Trích token/chuỗi quan trọng từ bundle JS ----------
def js_strings(js):
    out = {}
    out["urls"] = sorted(set(re.findall(r"https?://[A-Za-z0-9_.:/{}\-?=&%]{6,120}", js)))
    out["php_endpoints"] = sorted(set(re.findall(r"/[A-Za-z0-9_./-]{3,70}\.php", js)))
    out["ng_module_names"] = sorted(set(re.findall(r"class ([A-Za-z0-9_$]{3,60})[^{]{0,80}\{\s*\w+\.ɵmod", js)))[:400]
    out["injection_tokens"] = sorted(set(re.findall(r'new \$+\w+\("([A-Z0-9_]{3,60})"\)', js)))
    out["storage_keys"] = sorted(set(re.findall(r'"([A-Z][A-Z0-9_]{4,50})"', js)))
    return out


def main():
    doc = read("home.html")
    js = read("main-VF4HHFXO.js")
    rep = {}
    rep["styles"] = extract_styles(doc)
    rep["dom"] = dom_tree(doc)
    content = visible_content(doc)
    dump("content.json", content)
    rep["content_summary"] = {
        "headings": len(content["headings"]),
        "buttons": len(content["buttons"]),
        "links": len(content["links"]),
    }
    s = js_strings(js)
    dump("js-strings.json", s)
    rep["js"] = {k: len(v) for k, v in s.items()}
    dump("report.json", rep)
    print(json.dumps(rep, indent=2, ensure_ascii=False)[:4000])


if __name__ == "__main__":
    main()