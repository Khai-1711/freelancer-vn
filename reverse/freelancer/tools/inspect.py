import io, json, os, sys, collections, re
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
def L(n): return json.load(io.open(os.path.join(BASE,"analysis",n), encoding="utf-8"))
mode = sys.argv[1] if len(sys.argv)>1 else "report"
if mode=="report":
    d=L("report.json"); s=d["styles"]
    print("TOP COLORS"); print(json.dumps(s["top_colors"][:20],ensure_ascii=False))
    print("MEDIA QUERIES"); print(json.dumps(s["media_queries"],ensure_ascii=False))
    print("N_VARS",len(s["custom_properties"]))
    print("DOM SUMMARY", d["dom"]["total_elements"], d["dom"]["distinct_tags"])
    print("CUSTOM ELEMENTS"); print(json.dumps(d["dom"]["custom_elements"][:50],ensure_ascii=False))
    print("JS COUNTS", d["js"]); print("CONTENT", d["content_summary"])
elif mode=="vars":
    d=L("report.json")["styles"]["custom_properties"]
    fl=[v for v in d if not v["name"].startswith("--mat-")]
    print(len(d),"total;",len(fl),"non-material")
    print(json.dumps(fl[:120],ensure_ascii=False,indent=1))
elif mode=="tokens":
    d=L("report.json")["styles"]["custom_properties"]
    mat=[v for v in d if v["name"].startswith("--mat-")]
    print(len(mat)); print(json.dumps(mat[:150],ensure_ascii=False,indent=1))
elif mode=="urls":
    j=L("js-strings.json")
    for u in j["urls"]:
        if any(k in u for k in ("freelancer","f-cdn","wss","sentry","firebase")): print(u)
    print("--- PHP ---"); [print(x) for x in j["php_endpoints"]]
elif mode=="headings":
    c=L("content.json")
    for h in c["headings"]: print("H%d | %s"%(h["level"],h["text"]))
    print("--- BUTTONS ---")
    for b in dict.fromkeys(c["buttons"]): print("*",b)
elif mode=="links":
    c=L("content.json"); cnt=collections.Counter(l["href"] for l in c["links"])
    pat=collections.Counter(re.sub(r"\d+","{n}",l["href"]) for l in c["links"])
    print("TOP HREF PATTERNS")
    for p,n in pat.most_common(70): print(n,p)
elif mode=="tree":
    t=json.load(io.open(os.path.join(BASE,"analysis","dom-tree.json"),encoding="utf-8"))
    depth=int(sys.argv[2]) if len(sys.argv)>2 else 4
    def w(n,d=0):
        if d>depth: return
        cls=n.get("class",""); idd=n.get("id","")
        extra=(" #"+idd if idd else "")+((" ."+cls[:70]) if cls else "")
        print("  "*d+n["tag"]+extra)
        for ch in n["children"]: w(ch,d+1)
    w(t)