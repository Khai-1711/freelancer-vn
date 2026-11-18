import io, json, os, re, collections
import sys, codecs
try:
    sys.stdout = codecs.getwriter("utf-8", sys.stdout.buffer, errors="replace")
except Exception:
    pass
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
def rd(n): return io.open(os.path.join(BASE,"raw",n), encoding="utf-8", errors="replace").read()
def out(name, text):
    p = os.path.join(BASE, "analysis", name)
    io.open(p, "w", encoding="utf-8").write(text)
    print("wrote", p, len(text))

js = rd("main-VF4HHFXO.js")
html_doc = rd("home.html")
lines = []
def say(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    try:
        print(s[:300])
    except Exception:
        pass

# A. selectors của component/directive Angular
sels = sorted(set(re.findall(r'selector:"([^"]{2,80})"', js)))
say("### A. Angular selectors trong bundle:", len(sels))
for s in sels: say("  ", s)

# B. Ten goi y Component/Service/Module (ASCII-only to avoid mojibake issues)
cls = sorted(set(re.findall(r'class ([A-Za-z][A-Za-z0-9$_]{2,70})', js)))
nice = [c.replace("$","").replace("_","") for c in cls]
say("\n### B. Class name hints:")
for kind in ("Component", "Service", "Module", "Page", "Store", "Guard", "Interceptor", "Shell"):
    hits = sorted({c for c, n in zip(cls, nice) if kind.lower() in n.lower()})
    say("  [%s] %d: %s" % (kind, len(hits), ", ".join(hits[:80])))

# C. cấu hình env đầy đủ (khối chứa environmentName:"prod")
i = js.find('environmentName:"prod"')
blk = js[max(0,i-200): i+9000]
say("\n### C. ENV BLOCK (raw, đã cắt):")
say(blk)
io.open(os.path.join(BASE,"analysis","env-block.txt"),"w",encoding="utf-8").write(blk)

# D. endpoint REST: chuỗi dạng resource/action không có .php
api = sorted(set(re.findall(r'"(/[a-z][a-z0-9_-]{2,40}(?:/[a-z0-9_{}$.-]{1,40}){1,6})"', js)))
api = [a for a in api if not a.endswith(".php") and not re.match(r"^/(assets|static|images|fonts|node_modules)", a)]
say("\n### D. Chuỗi đường dẫn (REST/route ứng viên):", len(api))
out("paths.txt", "\n".join(api))
for a in api[:250]: say("  ", a)

# E. localStorage / cookie keys
keys = sorted(set(re.findall(r'"([A-Z][A-Z0-9_]{5,40})"', js)))
say("\n### E. CONSTANT KEYS:", len(keys))
out("const-keys.txt", "\n".join(keys))

# F. i18n: số lượng message id & locale
say("\n### F. locale/i18n markers:", len(set(re.findall(r'\{\s*"?\d+"?:\s*\{"meta"', js))), bool(re.search(r'ngLocales|locale="vi"', js)))

# G. các URL CDN asset pattern
say("\n### G. Asset URL patterns:")
pats = collections.Counter(re.sub(r"[a-z0-9\-]{8,}\.(js|css|jpg|png|svg|webp)", "{hash}.*", u) for u in re.findall(r"https://www\.f-cdn\.com/[^\"' ]{5,120}", js + html_doc))
for p,n in pats.most_common(30): say("  %sx %s"%(n,p))

# H. CSS utility classes dùng trong SSR (mr-/mb-/text-/fl-)
classes = collections.Counter()
for m in re.findall(r'class="([^"]{1,200})"', html_doc):
    for c in m.split(): classes[c] += 1
say("\n### H. Top CSS classes trong HTML SSR:")
for c,n in classes.most_common(80): say("  %sx %s"%(n,c))
io.open(os.path.join(BASE,"analysis","class-freq.json"),"w",encoding="utf-8").write(json.dumps(dict(classes.most_common()),indent=1))

out("deep-report.txt", "\n".join(lines))