import sys, io, json, pathlib
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
here = pathlib.Path(__file__).parent
key = json.loads((here / 'chave.json').read_text(encoding='utf-8'))
resp = pathlib.Path(r'C:\Users\User\Hackathon\gabarito-cego\respostas')
verbose = '-v' in sys.argv
ans = {}  # qkey -> {solver: (letra, conta)}
files = {}
for d in sorted(p for p in resp.iterdir() if p.is_dir()):
    n = 0
    for f in sorted(d.glob('*.json')):
        try:
            data = json.loads(f.read_text(encoding='utf-8-sig'))
        except Exception as e:
            print(f'JSON invalido: {d.name}/{f.name}: {e}'); continue
        n += 1
        for q, v in data.items():
            if isinstance(v, str): v = {'letra': v, 'conta': ''}
            ans.setdefault(f'{f.stem}:{q}', {})[d.name] = (str(v.get('letra', '?')).strip().upper()[:1], v.get('conta', ''))
    files[d.name] = n
print('arquivos por solucionador:', files)
tot = {s: [0, 0] for s in files}
sus = []
for k, kv in key.items():
    a = ans.get(k, {})
    div = {s: v for s, v in a.items() if v[0] != kv['letra']}
    for s, v in a.items():
        tot[s][0] += 1; tot[s][1] += v[0] == kv['letra']
    if div: sus.append((k, kv, a, div))
for s, (n, ok) in tot.items():
    if n: print(f'{s}: {n} respondidas, {ok} batem ({100*ok/n:.1f}%)')
resp_q = sum(1 for k in key if k in ans)
print(f'{resp_q}/{len(key)} questoes com alguma resposta; {len(sus)} com divergencia')
fortes = [x for x in sus if any(s in ('A', 'B') for s in x[3])]
print(f'divergencias do Flash (A/B): {len(fortes)}')
if verbose:
    for k, kv, a, div in sus:
        print(f"\n{k}  gabarito=({kv['letra']}) {kv['rot']}")
        for s, v in a.items():
            print(f"   {s}: ({v[0]}) {'OK' if v[0] == kv['letra'] else 'DIVERGE'} — {v[1][:200]}")
