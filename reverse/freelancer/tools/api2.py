"""Trích sâu registry service + endpoint động từ bundle đã minify."""
import io, os, re, json, sys, codecs
try:
    sys.stdout = codecs.getwriter("utf-8", sys.stdout.buffer, errors="replace")
except Exception:
    pass
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
js = io.open(os.path.join(BASE, "raw", "main-VF4HHFXO.js"), encoding="utf-8", errors="replace").read()
out_lines = []
def say(*a):
    s = " ".join(str(x) for x in a)
    out_lines.append(s)

# 1) Registry của API gateway client: các cặp (service name, version)
say("### 1. Service/version registry candidates")
pats = [
    r'([a-z][a-z0-9_-]{2,30})\s*:\s*"(\d+\.\d+)"',
    r'name\s*:\s*"([a-z][a-z0-9_-]{2,30})"\s*,\s*version\s*:\s*"(\d+\.\d+)"',
]
found = {}
for p in pats:
    for m in re.finditer(p, js):
        found.setdefault(m.group(1), set()).add(m.group(2))
for k in sorted(found):
    say("   %-24s %s" % (k, ",".join(sorted(found[k]))))
say("   TOTAL:", len(found))

# 2) Mọi chuỗi có dạng resource/x.y/...
say("\n### 2. All 'x.y' versioned path strings")
v = sorted(set(re.findall(r'[A-Za-z0-9_/${}.\-]{0,60}\d+\.\d+/[A-Za-z0-9_/${}.\-]{0,60}', js)))
v = [x for x in v if not re.search(r'\d+\.\d+/(px|em|rem|s\b)', x)]
for x in v[:200]:
    say("   ", x)

# 3) Chuỗi kết thúc bằng .php (làm sạch: chỉ nhận có dấu / )
say("\n### 3. PHP endpoints (cleaned)")
php = sorted({m.group(1) for m in re.finditer(r'"(/[A-Za-z0-9_./-]{3,70}\.php)"', js)})
for x in php: say("   ", x)

# 4) WebSocket / realtime
say("\n### 4. Realtime endpoints")
for x in sorted(set(re.findall(r'wss?://[^"\' ]{5,80}', js))): say("   ", x)
for x in sorted(set(re.findall(r'notifications\.[a-z.]+|transcriptions\.[a-z.]+', js)))[:10]: say("   *", x)

# 5) Context của một số service key để suy ra cách ghép URL
say("\n### 5. Gateway URL builder context")
i = js.find("${i.library}/${i.version}")
if i > 0:
    say(js[max(0, i - 1200):i + 600])

io.open(os.path.join(BASE, "analysis", "api-deep.txt"), "w", encoding="utf-8").write("\n".join(out_lines))
print("wrote analysis/api-deep.txt lines=", len(out_lines))