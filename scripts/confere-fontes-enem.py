# Confere as fontes candidatas que citam api.enem.dev: compara gabarito e alternativas do arquivo com a API.
# Uso: python scripts/confere-fontes-enem.py   (lê docs/fontes-candidatas/*.md; não altera nada)
import glob, json, re, sys, time, urllib.request
sys.stdout.reconfigure(encoding="utf-8")
norm = lambda t: re.sub(r"\s+", " ", (t or "").replace(" ", " ")).strip().rstrip(".").lower()
ok = dif = 0
for f in sorted(glob.glob("docs/fontes-candidatas/*.md")):
    for bloco in re.split(r"\n## ", open(f, encoding="utf-8").read())[1:]:
        m = re.search(r"https://api\.enem\.dev/v1/exams/(\d{4})/questions/(\d+)", bloco)
        if not m: continue
        g = re.search(r"\*\*Gabarito:\*\*\s*\W*([A-E])\b", bloco)
        alts = dict(re.findall(r"^\s*-\s*\**([A-Ea-e])\)\**\s*(.+)$", bloco, re.M))
        time.sleep(8)  # a API limita requisições (HTTP 429)
        try:
            req = urllib.request.Request(m.group(0), headers={"User-Agent": "confere-fontes"})
            d = json.load(urllib.request.urlopen(req, timeout=30))
        except Exception as e:
            print("ERRO", f, m.group(0), e); dif += 1; continue
        api = {a["letter"]: a.get("text") for a in d.get("alternatives", [])}
        prob = []
        if not g or g.group(1) != d.get("correctAlternative"): prob.append(f"gabarito arquivo={g.group(1) if g else None} api={d.get('correctAlternative')}")
        for k, v in alts.items():
            if norm(api.get(k.upper())) != norm(v): prob.append(f"alt {k}: arquivo='{v.strip()}' api='{api.get(k.upper())}'")
        if not alts: prob.append("alternativas não lidas do arquivo")
        nome = f.replace("\\", "/").split("/")[-1]
        if prob: dif += 1; print("DIVERGE", nome, m.group(1), m.group(2), "|", "; ".join(prob)[:300])
        else: ok += 1; print("ok     ", nome, m.group(1), m.group(2))
print(f"\n{ok} conferem, {dif} divergem ou falharam")
