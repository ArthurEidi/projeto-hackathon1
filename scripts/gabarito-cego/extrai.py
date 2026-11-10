import re, sys, json, random, pathlib, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = pathlib.Path(r'C:\Users\User\Hackathon\app-matematica\docs\planos')
out = pathlib.Path(r'C:\Users\User\Hackathon\gabarito-cego')
key = {}; stats = {'q':0,'bad':[]}
for f in sorted(src.glob('*.md')):
    if f.name.startswith('_'): continue
    lines = f.read_text(encoding='utf-8').splitlines()
    qs = []; cur = None
    def close():
        global cur
        if cur and cur['opts']:
            qs.append(cur)
        cur = None
    for ln in lines:
        m = re.match(r'^(#{2,4})\s+(.*)', ln)
        if m:
            close()
            t = m.group(2)
            if 'PENDENTE-FONTE' in t: continue
            mm = re.match(r'^(Passo \d+|[FMDV]\d+)\s+—\s+(.*)', t)
            if mm and len(m.group(1)) >= 3:
                cur = {'qid': mm.group(1).replace('Passo ','P'), 'ctx': [], 'opts': [], 'hdr': None}
            continue
        if cur is None: continue
        if ln.startswith('|'):
            cells = [c.strip() for c in ln.strip().strip('|').split('|')]
            # handle escaped pipes
            cells = [c.strip() for c in re.split(r'(?<![\\])[|]',ln.strip()[1:-1] if ln.strip().endswith('|') else ln.strip()[1:])]
            if cur['hdr'] is None:
                cur['hdr'] = [c.lower() for c in cells]; continue
            if set(cells[0]) <= set('-: '): continue
            h = cur['hdr']
            try:
                ic = next(i for i,c in enumerate(h) if c.startswith('certa'))
                il = next(i for i,c in enumerate(h) if 'tulo' in c)
            except StopIteration:
                continue
            if len(cells) <= max(ic, il): stats['bad'].append((f.name, cur['qid'], ln[:60])); continue
            cur['opts'].append({'id': cells[0].strip('`'), 'rot': cells[il], 'ok': 'sim' in cells[ic].lower()})
        elif re.match(r'^- \*\*(Enunciado|Figura|Contexto|Texto|Dados)', ln):
            cur['ctx'].append(ln[2:])
    close()
    rnd = random.Random(f.stem)
    md = [f'# {f.stem}', '']
    for q in qs:
        n_ok = sum(o['ok'] for o in q['opts'])
        if n_ok != 1: stats['bad'].append((f.name, q['qid'], f'{n_ok} certas'))
        if not any(c.startswith('**Enunciado') for c in q['ctx']): stats['bad'].append((f.name, q['qid'], 'sem enunciado'))
        opts = q['opts'][:]; rnd.shuffle(opts)
        md.append(f"## {q['qid']}")
        md += q['ctx']
        for L, o in zip('ABCDEF', opts):
            md.append(f"- ({L}) {o['rot']}")
            if o['ok']: key[f"{f.stem}:{q['qid']}"] = {'letra': L, 'id': o['id'], 'rot': o['rot']}
        md.append('')
        stats['q'] += 1
    (out/'packs'/f.name).write_text('\n'.join(md), encoding='utf-8')
pathlib.Path(sys.argv[1]).write_text(json.dumps(key, ensure_ascii=False, indent=1), encoding='utf-8')
print(stats['q'], 'questoes;', len(key), 'chaves;', len(stats['bad']), 'problemas')
for b in stats['bad'][:40]: print(b)
