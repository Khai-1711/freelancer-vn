"""Suy ra contract API REST của Freelancer từ bundle + probe các endpoint public."""
import io, os, re, json, sys, codecs, urllib.request, gzip
try:
    sys.stdout = codecs.getwriter("utf-8", sys.stdout.buffer, errors="replace")
except Exception:
    pass
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126 Safari/537.36",
      "Accept": "application/json", "Accept-Encoding": "gzip"}

js = io.open(os.path.join(BASE, "raw", "main-VF4HHFXO.js"), encoding="utf-8", errors="replace").read()
lines = []
def say(s):
    lines.append(str(s))
    try: print(str(s)[:300])
    except Exception: pass

# 1) resource/action style trong JS: "projects" : { ... } hoặc 'search' keys
say("### 1. Cluster token quanh apiBaseUrl / request builder")
for kw in ("apiBaseUrl", "objectstore", "ObjectStore", "query(", "params:", "httpOptions", "buildRequest", "ServicePath"):
    n = len(re.findall(re.escape(kw), js))
    say("   %-16s %d" % (kw, n))

# 2) chuỗi resource số nhiều hay gặp (candidate API resources)
res = {}
for m in re.finditer(r'"(projects|jobs|contests|users|accounts|sessions|reviews|bids|budgets|categories|skills|translations|templates|files|notifications|messages|teams|employers|employees|payments|invoices|subscriptions|escrow|testimonials|qualifications|exams|education|sites|photos|reports|recommendations|search|seo|blogs|challenges|enterprises|ai-agents|agents|websockets|tokens|devices|integrations|validation|identity|language|languages|timelines|feeds|articles|showcases|portfolios|resumes|cv|badges|achievements|disputes|support|helpdesk|faq|stats|counters|versions|featureflags|abtests)"', js):
    res[m.group(1)] = res.get(m.group(1), 0) + 1
say("\n### 2. Candidate API resources (theo tần suất trong bundle)")
for k, v in sorted(res.items(), key=lambda x: -x[1]):
    say("   %5d  %s" % (v, k))

# 3) Probe các endpoint public thật (chỉ GET, không vượt auth)
PROBES = [
    "https://www.freelancer.com/api/projects/0.1/projects/?limit=3&job_details=true",
    "https://www.freelancer.com/api/categories/0.1/categories?limit=5",
    "https://www.freelancer.com/api/skills/0.1/skills?limit=5",
    "https://www.freelancer.com/api/languages/0.1/languages?limit=5",
    "https://www.freelancer.com/api/seo/0.1/footer-links",
    "https://www.freelancer.com/api/timezones/0.1/timezones?limit=3",
]
say("\n### 3. Kết quả probe GET công khai")
results = []
for u in PROBES:
    row = {"url": u}
    try:
        req = urllib.request.Request(u, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            if r.headers.get("Content-Encoding") == "gzip":
                raw = gzip.decompress(raw)
            body = raw.decode("utf-8", "replace")
            row["status"] = r.status
            row["len"] = len(body)
            row["sample"] = body[:900]
            try:
                j = json.loads(body)
                row["top_keys"] = list(j.keys())
                for k, v in j.items():
                    if isinstance(v, list) and v and isinstance(v[0], dict):
                        row.setdefault("item_keys", {})[k] = list(v[0].keys())
            except Exception as e:
                row["parse_error"] = str(e)[:80]
    except Exception as e:
        row["error"] = str(e)[:160]
    results.append(row)
    say("   %s -> %s" % (u.replace("https://www.freelancer.com", ""), row.get("status") or row.get("error")))
io.open(os.path.join(BASE, "analysis", "api-probe.json"), "w", encoding="utf-8").write(json.dumps(results, indent=2, ensure_ascii=False))
io.open(os.path.join(BASE, "analysis", "api-report.txt"), "w", encoding="utf-8").write("\n".join(lines))
say("\nwrote analysis/api-probe.json")