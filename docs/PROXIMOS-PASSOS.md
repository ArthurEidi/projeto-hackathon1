# Próximos passos

Atualizado em 12/11/2026. Quem trabalhar no projeto atualiza este arquivo ao fim da sessão (estado + o que mudou na fila).

## Estado

- **86 de 103 capítulos** têm aula no app (102 unidades publicadas, contando Cones, o capítulo-modelo). Cada um tem `aula-01.json` e teste próprio.
- **Validações na última sessão:** `lint:content` ok, 99 arquivos de teste / 1569 testes passando, `typecheck` limpo, `build` ok.
- **Widgets prontos** (`src/widgets/common/`, documentação no GUIA §5): `plano_cartesiano`, `reta_numerica`, `barras`, `grade_resultados`, `solido_3d`, `geometria_triangulo`, `ciclo_trigonometrico`, `geometria_poligono`, `geometria_circulo`, cada um com sua `*_figura`.
- **Roteiros:** 103 planos em `docs/planos/`, `npm run lint:planos` com 0 erros. Gabaritos dos roteiros conferidos às cegas (1359/1359, `docs/REVISAO-GABARITOS.md`).
- **Vestibular:** 20 questões com fonte real; 392 marcadas `PENDENTE-FONTE` nos roteiros.

## Fila, em ordem de prioridade

### 1. Capítulos que não dependem de widget novo (10)

Podem ser escritos já, adaptando aos widgets existentes (receita: GUIA §3.0; modelo de prompt abaixo).

| Slug | Widgets sugeridos | Observação |
|---|---|---|
| `potencias-e-radicais` | `plano_cartesiano` (curvas potência e raiz), `barras` | estava com um agente, não entregue |
| `notacao-cientifica-e-ordem-grandeza` | `reta_numerica`, `barras` | roteiro cita `escala_decimal` (não existe) |
| `expressoes-algebricas-e-produtos-notaveis` | `geometria_poligono` modo `malha` | ideal seria `retangulo_areas` (item 2) |
| `fatoracao-algebrica` | `plano_cartesiano` | idem |
| `unidades-conversoes-e-escalas` | `reta_numerica`, `geometria_poligono` (`escala k`) | |
| `sistemas-numericos-e-divisibilidade` | `reta_numerica`, `barras` | roteiro cita `grupos_inteiros` |
| `divisao-polinomial-e-teorema-do-resto` | `plano_cartesiano` | roteiro cita `divisao_polinomial` |
| `sistemas-lineares-e-escalonamento` | `plano_cartesiano` (duas retas) | roteiro cita `sistema_escalonado` |
| `matrizes-determinantes-sistemas` | `plano_cartesiano`, `geometria_poligono` | unidade provisória já existe na taxonomia |
| `determinantes-e-matriz-inversa` | `geometria_poligono` (`isometria`), `plano_cartesiano` | roteiro cita `transformacao_plano` |

### 2. Widgets que faltam (um agente forte, um widget por vez)

Especificação em `docs/WIDGETS-PENDENTES.md`; contrato no GUIA §3.2; use `src/widgets/common/circulo/` como modelo de estrutura. Nenhum destes foi começado.

| Ordem | Widget | Entrada | Capítulos que destrava |
|---|---|---|---|
| 1 | `lugar_geometrico` | 6 | `elipse`, `hiperbole`, `parabola-conica` |
| 2 | `pontos_no_plano` | 3 | `plano-cartesiano-distancia-e-ponto-medio` |
| 3 | `circunferencia_no_plano` | 5 | `circunferencia-equacao-e-posicoes` |
| 4 | `vetores_no_plano` + modo `complexo` | 4 e 18 | `vetores-no-plano`, `numeros-complexos` |
| 5 | `retangulo_areas` | 19 | melhora produtos notáveis, fatoração, potências |
| 6 | `maquinas_funcao` | 20 | melhora introdução a funções e composta/inversa |
| 7 | `transformacao_plano`, extensões da `reta_numerica` | 17 e 11 | melhora matrizes e inequações |

Cada widget entregue: pasta própria, teste, registro em `src/widgets/common/index.ts` e `params.ts`, subseção no GUIA §5, "pronto" na tabela de `WIDGETS-PENDENTES.md`, e **conferência visual no navegador em 400 px de largura**.

### 3. Capítulos que esperam o item 2 (7)

`elipse`, `hiperbole`, `parabola-conica`, `plano-cartesiano-distancia-e-ponto-medio`, `circunferencia-equacao-e-posicoes`, `vetores-no-plano`, `numeros-complexos`. Na taxonomia restam as unidades provisórias `circunferencia-analitica`, `conicas`, `numeros-complexos` e `matrizes-determinantes-sistemas`; troque-as pelos capítulos reais ao registrar (`--remove=`).

### 4. Revisão de qualidade do texto

Os gabaritos estão conferidos; o texto das falas e dos feedbacks de erro, não. Um modelo forte deve reler (edições mínimas no JSON, rodar o teste do capítulo depois):

- **Já revisto:** 10 capítulos de álgebra de 10/11 e 8 dos 10 de geometria espacial (em média 1 feedback errado por capítulo: descrevia um erro que não era o daquela alternativa).
- **Sem revisão, prioridade alta** (modelo gratuito fraco): `razao-proporcao-porcentagem`, `radianos-e-ciclo-trigonometrico`, `fracoes-e-decimais`. Conferir também se cada alternativa `correct` bate com o roteiro. `fracoes-e-decimais` foi encontrado pronto no disco sem aviso do agente: aula válida e testes passando, mas ninguém leu.
- **Sem revisão:** todos os capítulos de 11/11 escritos pelo Gemini Flash: inequações (5), funções introdução/composta, reta, conjuntos, valor absoluto, triângulos (7), polígonos (5), círculo (3), trigonometria no ciclo (6), `troncos-de-solidos`, `projecoes-cortes-e-planificacoes`.
- Os 10 de contagem e probabilidade (Claude Sonnet) têm prioridade baixa.

### 5. Conferência visual no navegador

`npx vite --port 51xx` e abrir `/#/aula/<pilar>/<setor>/<slug>/aula-01` em largura de celular. Os widgets foram vistos isoladamente; **as aulas, quase nenhuma**. Passar por todos os capítulos novos procurando rótulo sobreposto, passo que não completa e figura que não corresponde à fala.

### 6. Lacunas de widget anotadas pelos agentes

- `grade_resultados`: figura `escada` não desenha "degraus todos em 5" nem sinais de +; figura `bolinhas_e_barras` só aceita `sequencia`/`highlight`; urna sem bolas coloridas nem total riscado; não faz grade 4 × 5; régua de dependência só aparece com a pista ligada.
- `barras`: `sequencia` com recorrência de dois termos (Fibonacci); `categorias` com `degraus`; `pontos` com alerta "mediana sem ordenar".
- `solido_3d`: falta o modo `corte_cone`; no modo `prisma` as diagonais d e D aparecem juntas.
- Capítulos que trocaram um widget pedido pelo roteiro por `plano_cartesiano`/`reta_numerica`: `introducao-a-funcoes`, `funcao-composta-e-inversa` (pediam diagrama/encadeador), `reta-equacao-e-inclinacao` (`pontos_no_plano`), `conjuntos-e-intervalos`, `valor-absoluto-e-distancia`. Rever quando os widgets do item 2 existirem.

### 7. Fontes de vestibular (392 pendentes)

Trocar `PENDENTE-FONTE` por questões reais com fonte e URL conferidas. Exige modelo com navegação web confiável; nunca inventar. Depois de achar a fonte, atualizar o roteiro e acrescentar a questão ao `treino.vestibular` da aula.

### 8. Depois

Aula 02 de Cones (planificação, já prevista na taxonomia), vídeos Manim, divisão do bundle (o JS passou de 1 MB).

## Modelo de prompt para delegar um capítulo

```
Projeto: <raiz do repo>. Implemente a aula do capítulo <slug>.
Leia docs/planos/<slug>.md (fonte do conteúdo) e siga docs/GUIA-CAPITULOS.md §2, §3.0, §3.4 e §3.5.
Widget: <widget> (GUIA §5.x e src/widgets/common/<pasta>/params.ts). Modelo: <capítulo pronto com o mesmo widget>.
Crie SOMENTE content/<pilar>/<setor>/<slug>/aula-01.json e src/conteudo/<slug>.test.ts.
Não edite taxonomy.json, src/widgets, src/engine, docs; sem commit; sem npm run build.
Vestibular só com fonte real do roteiro. Ids de slider em minúsculas; sem setas/emoji.
Valide: comando de aula única do GUIA §3.4 ("aula ok"), vitest do capítulo, npm run lint:content, npx tsc --noEmit.
Ao terminar, informe o caminho do arquivo, o resultado das validações e as lacunas.
```

## O que deu certo e o que deu errado ao delegar

- Modelos baratos (Gemini Flash) escrevem capítulos válidos em 5 a 10 minutos quando o widget existe e há um capítulo-modelo. Erram em: tipagem dos testes, símbolos que o lint recusa, feedback que não corresponde à alternativa.
- Relato de agente não basta: o coordenador roda lint, testes e typecheck a cada entrega, e o build antes de commits grandes.
- Widgets pedem modelo forte e conferência visual; quatro widgets saíram numa noite com um único agente dono de `src/widgets/common/`.
- Arquivos compartilhados (`taxonomy.json`, registro de widgets) têm um único dono; foi isso que permitiu 6 agentes em paralelo sem conflito.

## Fora do repositório (só na máquina original)

`C:\Users\User\Hackathon\sprites` (arte-fonte dos personagens, 15 MB; os recortes usados pelo app já estão em `public/`) e `C:\Users\User\Hackathon\gabarito-cego` (pacotes e respostas da conferência às cegas; resultado em `docs/REVISAO-GABARITOS.md`, scripts em `scripts/gabarito-cego/`).

## Integra??o Shell #2 ? 12/11/2026

Registrados os 13 cap?tulos dos arquivos de entregas (10 cap?tulos adaptados e 3 c?nicas). Os itens correspondentes das filas 1 e 3 j? est?o entregues; falta limpar essas tabelas ap?s a integra??o final. Corrigido id de potencias-e-radicais para aula-01. Lugar geom?trico implementado (5 testes); revis?o visual pendente. Pr?ximo widget: pontos_no_plano.

Validação da integração: 113 arquivos / 1776 testes passando, typecheck limpo. Lint e build executados com NODE_OPTIONS=--require=C:/Users/User/AppData/Local/Temp/app-matematica-os-userinfo.cjs: fallback temporário de os.userInfo, pois a API do Windows retorna uv_os_get_passwd ENOMEM. Nenhuma dependência ou arquivo de produção alterado por esse contorno.

Pontos no plano implementado e testado: 114 arquivos / 1781 testes; lint, typecheck e build ok com o contorno de os.userInfo descrito acima. Sem novas entregas nesta integra??o. Pull e push bloqueados por conex?o ao github.com:443. Pr?ximo widget: circunferencia_no_plano.

Circunferencia no plano implementado (4 testes). Integrado plano-cartesiano-distancia-e-ponto-medio com id corrigido para aula-01. Lint, typecheck e build ok; 116 arquivos / 1809 testes. Proximo: vetores_no_plano e modo complexo. Revisao visual e sincronizacao GitHub continuam bloqueadas.

Vetores e complexo implementados (5 testes). Integrado circunferencia-equacao-e-posicoes, removida unidade provisoria circunferencia-analitica. Proximo widget: retangulo_areas.
