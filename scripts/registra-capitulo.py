# Registra uma aula pronta em content/taxonomy.json (só o coordenador roda).
# Uso (na raiz do repo): python scripts/registra-capitulo.py <pilar>/<setor>/<slug> [icone] [--remove=id1,id2]
#   - se a unidade <slug> já existe no setor, só preenche "arquivo" da aula-01;
#   - senão cria a unidade (título = título do roteiro em docs/planos/<slug>.md; aula = titulo/subtitulo do JSON);
#   - --remove apaga unidades provisórias (sem aula) que o capítulo substitui.
# Depois: conferir o título/ordem da unidade no JSON, npm run lint:content, npm test, npm run typecheck.
import json,sys,re
arg=sys.argv[1]; pilar,setor,slug=arg.split('/')
icone=sys.argv[2] if len(sys.argv)>2 and not sys.argv[2].startswith('--') else None
rem=[a.split('=')[1].split(',') for a in sys.argv if a.startswith('--remove=')]
rem=rem[0] if rem else []
p='content/taxonomy.json'
t=json.load(open(p,encoding='utf-8'))
L=json.load(open(f'content/{arg}/aula-01.json',encoding='utf-8'))
plano=open(f'docs/planos/{slug}.md',encoding='utf-8').read()
m=re.search(r'^#\s+(.+)$',plano,re.M)
P=next(x for x in t['pilares'] if x['id']==pilar)
S=next(x for x in P['setores'] if x['id']==setor)
S['unidades']=[u for u in S['unidades'] if u['id'] not in rem]
arq=f'{arg}/aula-01.json'
u=next((u for u in S['unidades'] if u['id']==slug),None)
tit=L.get('titulo') or L.get('title'); sub=L.get('subtitulo') or L.get('subtitle') or ''
if u is None:
    u={'id':slug,'titulo':(m.group(1).split('—',1)[-1].strip() if m else slug),'icone':icone or S['unidades'][0]['icone'] if S['unidades'] else icone,'aulas':[{'id':'aula-01','numero':1,'titulo':tit,'subtitulo':sub,'arquivo':arq}]}
    S['unidades'].append(u)
else:
    u['aulas'][0]['arquivo']=arq
json.dump(t,open(p,'w',encoding='utf-8',newline='\n'),ensure_ascii=False,indent=2); open(p,'a',newline='\n').write('\n')
print(u["id"],"ok")
