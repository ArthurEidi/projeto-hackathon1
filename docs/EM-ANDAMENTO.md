# Em andamento: quem está fazendo o quê

Este arquivo é a **reserva de frentes**. Serve para duas máquinas (ou dois coordenadores) não editarem os mesmos arquivos.

## Regras

1. **Antes de começar:** `git pull --rebase origin main` e leia a tabela abaixo.
2. **Reserve antes de trabalhar:** escolha uma frente livre de `docs/PROXIMOS-PASSOS.md`, acrescente uma linha aqui, faça commit só deste arquivo e `git push`. Se o push for recusado, alguém reservou antes: puxe de novo e escolha outra.
3. **Fique dentro dos arquivos da sua frente.** A coluna "Arquivos" é o limite. Precisa mexer fora? Anote em "Pedidos entre máquinas" e deixe para o dono.
4. **Arquivos com dono fixo** (só a máquina indicada edita, sempre):
   - `content/taxonomy.json`, `src/widgets/common/**`, `src/engine/**`, `src/steps/**`, `src/ui/**`, `scripts/**`, `package.json`, `CLAUDE.md`: **Máquina A**.
   - `docs/PROXIMOS-PASSOS.md` e este arquivo: as duas editam, sempre em commit próprio e pequeno, com pull antes.
5. **Publicar:** commits pequenos e frequentes (um por capítulo revisto ou por lote pequeno) e `npm run publicar` ao fim de cada lote. Nunca `push --force`, nunca reescrever histórico.
6. **Ao terminar a frente:** mova a linha para "Concluídas" com a data e o que ficou pendente.
7. Reserva sem commit novo há mais de 2 dias pode ser assumida por outra máquina, avisando em "Pedidos entre máquinas".

## Frentes reservadas

| Frente (nº em PROXIMOS-PASSOS) | Máquina / coordenador | Desde | Arquivos |
|---|---|---|---|
| Pendências 1 a 5 de "Pendências imediatas da Máquina A" em PROXIMOS-PASSOS (passos de álgebra, adaptações, fontes, visual de aritmética e álgebra) | A (Claude Code + agentes Maestri) | 13/11 | `content/aritmetica/**`, `content/algebra/**`, `docs/revisao/**`, `docs/fontes-candidatas/**` |
| 3. Widgets (`maquinas_funcao`, acentos, `transformacao_plano`, `reta_numerica`) | A | 13/11 | `src/widgets/common/**`, GUIA §5, `WIDGETS-PENDENTES.md` |
| 5b. Correções de conteúdo da conferência visual de geometria (analítica, plana e espacial feitas; trigonometria em andamento) e reconferência visual das correções | **B: maestro + Antigravity ×2 + Claude Code #2**, DESKTOP-M466PUL | 13/11 | `content/geometria/**`, `src/conteudo/<slug de geometria>.test.ts`, `docs/revisao/geometria-*.md`, `docs/visual/geometria.md` |
| 14/11: widgets, pedidos da B (esconder medidas em `pontos_no_plano`, `lugar_geometrico`, `circunferencia_no_plano`; rótulos de `ciclo_trigonometrico`, `geometria_triangulo`, `geometria_poligono`, `geometria_circulo`; grade do `MicroChallenge` e `ConceptLock` em 400 px). Inclui ligar os novos parâmetros nas aulas de geometria citadas em `docs/visual/geometria.md` (só `params`/`figure` desses passos) | A (Claude Code #2 + Antigravity #3 e #4) | 14/11 | `src/widgets/common/**`, `src/steps/**`, GUIA §5, e, em `content/geometria/**`, apenas os passos com achado "widget" no relatório visual |
| 14/11: vestibular nas aulas de aritmética e álgebra (candidatas ENEM aprovadas pelo script → `treino.vestibular` + roteiro) | A (Antigravity e Antigravity #2) | 14/11 | `content/aritmetica/**`, `content/algebra/**`, `docs/planos/*.md` (seção de vestibular), `docs/revisao/vestibular-*.md` |

### 14/11, tarde: Máquina A sem limite; Máquina B assume

Por instrução do usuário (14/11, 17h), a Máquina A chegou ao limite e a **Máquina B (DESKTOP-M466PUL) orquestra o projeto inteiro** até a A voltar, inclusive os arquivos de dono fixo da A (`src/widgets/common/**`, `src/steps/**`, `src/ui/**`), um agente por vez em cada pasta. As reservas da A acima ficam suspensas (último commit da A: 13:24). Divisão da B:

| Frente | Agente (B) | Desde | Arquivos |
|---|---|---|---|
| ~~B1 e B1b~~ concluídas 14/11 (d44d18b, 908cc06): widgets dos relatórios visuais e da reconferência B8; `solido_3d` ganhou `mostrar.g` e `face_destaque`. Sem pendência de widget aberta nos relatórios | Claude Code #2 | 14/11 | — |
| B2. Correções da reconferência de geometria (analítica) e reconferência visual de plana, espacial e trigonometria | Antigravity | 14/11 | `content/geometria/**`, `src/conteudo/<slug de geometria>.test.ts`, `docs/visual/geometria.md`, `docs/revisao/geometria-*.md` |
| B3. Vestibular de geometria: candidatas do ENEM (plana e trigonometria) | Antigravity #2 | 14/11 | `docs/fontes-candidatas/<slug de geometria>.md` (só arquivos novos) |
| B4. Vestibular de geometria: candidatas do ENEM (espacial e analítica) | Antigravity #3 | 14/11 | `docs/fontes-candidatas/<slug de geometria>.md` (só arquivos novos) |
| ~~B5. Trocar adaptações por `retangulo_areas`~~ concluída 14/11 (f44d529): `potencias-e-radicais` passo 3 trocado; `fatoracao-algebrica` não precisa | Antigravity #4 | 14/11 | — |
| B7. Vestibular de aritmética e álgebra: candidatas do ENEM para os 39 capítulos ainda sem questão e substitutas das questões repetidas | Antigravity #4 | 14/11 | `docs/fontes-candidatas/<slug de aritmética ou álgebra>.md` (só acréscimos) |
| B8. Reconferência visual das correções de plana, espacial e trigonometria (só relatório) | Antigravity #2 | 14/11 | `docs/visual/geometria-reconferencia-b8.md` |
| ~~B9a/B9b. Vestibular de geometria nas aulas~~ concluída 14/11 (62ce723): 35 questões do ENEM em 21 capítulos; auditoria do maestro conferiu todas as contas e corrigiu a apresentação | Antigravity #3 / Antigravity | 14/11 | — |
| ~~B7~~ concluída 14/11 (4ea797c): 39 candidatas conferidas contra a api.enem.dev; 21 capítulos sem candidata registrados com o motivo | Antigravity #4 | 14/11 | — |
| ~~B10a/B10b. Vestibular nas aulas de aritmética e álgebra~~ concluídas 14/11 (d9c8598, 50101e9): 31 questões do ENEM em 14 capítulos, 5 repetidas trocadas; auditoria do maestro reescreveu 29 feedbacks | Antigravity / Antigravity #3 | 14/11 | — |
| ~~B8. Reconferência visual~~ concluída 14/11 (0166572): 77 passos, 60 ok; relatório `docs/visual/geometria-reconferencia-b8.md` | Antigravity #2 | 14/11 | — |
| ~~B8b~~ concluída 14/11 (16014cd): 6 desafios sem "Resposta: …", 3 figuras de erradas; troncos p3 e projeções p4 passaram para o B1b (falta parâmetro no `solido_3d`) | Antigravity #2 | 14/11 | — |
| ~~B11. Reconferência visual de aritmética e álgebra~~ concluída 14/11: relatórios B11a–d e correções publicados (último: d89323c); `ChallengeOption` agora é estrito (a chave "override" era descartada em silêncio). Critério: em desafio de 2 alternativas, feedback que cita a certa não é defeito | 4 Antigravity + maestro | 14/11 | — |
| ~~B13~~ concluída 14/11 (750a557): `barras` com `mostrar.raiz` e `extremos` na fila, `grade` com `mostrar.razao_partes`. Máquina B sem frente aberta | Claude Code #2 | 14/11 | — |
| B6. Auditoria das 40 questões do ENEM de 14/11 (feita: 50dc335, 26 feedbacks corrigidos); revisão e integração de tudo; inserir o vestibular de geometria nas aulas depois da conferência | maestro (Claude Code) | 14/11 | `docs/revisao/auditoria-claude.md`, `treino.vestibular` das aulas, docs de coordenação |

### 15/11 a 17/11: Máquina B responsável pelo projeto

Por instrução do usuário (15/11), a Máquina A fica fora até terça (17/11) e a **Máquina B (DESKTOP-M466PUL) responde pelo projeto inteiro**, inclusive os arquivos de dono fixo da A. Decisões do usuário em 15/11: (1) os desafios (`micro_challenge`) com 2 ou 3 alternativas passam a ter 4; (2) hospedagem: **só preparar o build e documentar, sem publicar**. Agentes da B: Codex, Codex #2 (novos), Claude Code #2, Antigravity (Gemini perto do limite: uso mínimo). Briefing: `C:\Users\mkf10\projetos\briefing-b14.md` (fora do repo).

| Frente | Agente (B) | Desde | Arquivos |
|---|---|---|---|
| B14a1. ~~Desafios de 2 → 4 alternativas: as 7 aulas `equacoes-*` de `content/algebra/equacoes-e-inequacoes/`~~ entregue 15/11, auditada | Claude Code #2 (o Codex segue sem permissão de comandos) | 15/11 | essas 7 pastas, os testes delas, `docs/revisao/desafios-4-alternativas-b14a1.md` |
| B14a2. ~~Desafios de 2 → 4 alternativas: `expressoes-algebricas-e-produtos-notaveis`, `fatoracao-algebrica` e as 5 `inequacoes-*`~~ entregue 15/11, auditada. **B14 concluída: os 104 desafios (103 capítulos e Cones) têm 4 alternativas** | Claude Code #2 (15/11: o usuário mandou prosseguir; os Codex seguem sem permissão de comandos) | 15/11 | essas 7 pastas, os testes delas, `docs/revisao/desafios-4-alternativas-b14a2.md` |
| B14b. ~~Desafios de 2 → 4 alternativas: aritmética, conjuntos e proporcionalidade (12 capítulos)~~ entregue 15/11, auditada | Claude Code #2 (o Codex #2 ficou sem permissão de rodar comandos) | 15/11 | `content/aritmetica/conjuntos/**`, `content/aritmetica/proporcionalidade/**`, testes desses capítulos, `docs/revisao/desafios-4-alternativas-b14b.md` |
| B14c. ~~Desafios de 2 → 4 alternativas: álgebra, funções e matrizes (12 capítulos)~~ entregue 15/11, auditada | Claude Code #2 | 15/11 | `content/algebra/funcoes/**`, `content/algebra/matrizes-e-sistemas/**`, testes desses capítulos, `docs/revisao/desafios-4-alternativas-b14c.md` |
| B14d. ~~Desafios de 2 → 4 alternativas: polinômios, complexos e sequências (8) e `solidos-de-revolucao` (3 → 4)~~ entregue 15/11, auditada (2 ajustes do maestro) | Antigravity | 15/11 | `content/algebra/polinomios-e-complexos/**`, `content/algebra/sequencias/**`, `content/geometria/geometria-espacial/solidos-de-revolucao/**`, testes desses capítulos, `docs/revisao/desafios-4-alternativas-b14d.md` |
| B14e. Auditoria das 47 alternativas novas (conta, feedback, figura em 400 px depois de VERIFICAR) e publicação | maestro (Claude Code) | 15/11 | docs de coordenação, correções pontuais nos arquivos da B14 |
| B15. ~~Preparar a hospedagem (build estático, sem publicar)~~ concluída 15/11: base relativa, workflow manual, `docs/HOSPEDAGEM.md`; publicar depende do usuário | maestro (Claude Code) | 15/11 | `vite.config.ts`, `package.json` (scripts), `docs/HOSPEDAGEM.md`, `.github/workflows/` (só disparo manual) |

15/11, noite: o usuário pediu para seguir nas próximas prioridades usando mais Codex e Antigravity (o limite do Claude chegou à metade). Briefing: `C:\Users\mkf10\projetos\briefing-b16.md`. O Codex #2 segue sem permissão de comandos; foi recrutado o Codex "Ferrugem".

| Frente | Agente (B) | Desde | Arquivos |
|---|---|---|---|
| B16. ~~Imagem nas questões de vestibular (schema, treino, lint, GUIA §2.3)~~ concluída 15/11 (006346a) | Codex (o Ferrugem pedia aprovação a cada edição) | 15/11 | `src/engine/schema.ts`, `src/treino/**`, `src/ui/styles.css` (regras novas), `scripts/lint-content.ts`, testes, GUIA §2.3 |
| B17a. ~~Candidatas do ENEM com imagem: 20 capítulos de geometria sem vestibular~~ entregue 15/11: 13 questões em 8 capítulos; 12 seguem sem candidata | Antigravity | 15/11 | `docs/fontes-candidatas/<slug>.md` desses capítulos, `public/vestibular/` (novos), `docs/revisao/vestibular-b17a.md` |
| B17b. Candidatas do ENEM com imagem: 25 capítulos de álgebra e aritmética sem vestibular (sessão caiu sem entrega; refeita em 16/11, abaixo) | Antigravity #2 | 15/11 | idem, `docs/revisao/vestibular-b17b.md` |
| B18. ~~Vestibular nas aulas `equacoes-exponenciais`, `equacoes-logaritmicas`, `equacoes-quadraticas`~~ concluída 15/11 (2243f4f): as 9 candidatas não são verificáveis no cache (sites ou ENEM sem texto); nada inserido | Codex | 15/11 | essas 3 aulas, os 3 roteiros (seção de vestibular), `docs/revisao/vestibular-b18.md` |
| B19. Quais defeitos de widget continuam abertos (só relatório; sessão caiu sem entrega; refeita em 16/11, abaixo) | Antigravity #3 | 15/11 | `docs/visual/pendencias-b19.md` |
| B20. ~~Dividir o bundle: aulas carregadas sob demanda~~ concluída 15/11 (73c1f9d): JS inicial de 538 para 214 KB com gzip | Codex | 15/11 | `src/engine/content.ts`, `src/App.tsx`, `src/Home.tsx`, testes que chamam `loadLesson`, `docs/HOSPEDAGEM.md` |
| ~~B21. Inserir as 13 questões da B17a~~ concluída 15/11 (20aa1d4, f927349) (com imagem) em 8 aulas de geometria (briefing `C:/Users/mkf10/projetos/briefing-b21.md`) | Antigravity | 15/11 | `treino.vestibular` das 8 aulas, seção de vestibular dos 8 roteiros, `docs/revisao/vestibular-b21.md` |

16/11: os agentes de 15/11 caíram (PC reiniciado). B17b e B19 não deixaram entrega e recomeçam. As 39 imagens de `public/vestibular/` que não estavam no git eram sobras da B17a (candidatas descartadas e versões trocadas): foram para fora do repositório (`C:\Users\mkf10\projetos\sobras-b17a`). Briefing: `C:\Users\mkf10\projetos\briefing-b22.md`.

| Frente | Agente (B) | Desde | Arquivos |
|---|---|---|---|
| ~~B17b (refeita)~~ concluída 16/11 (323dfbf): 9 candidatas em 4 capítulos; 21 seguem sem candidata no cache | Antigravity #2 | 16/11 | — |
| ~~B19 (refeita)~~ concluída 16/11: `docs/visual/pendencias-b19.md`, 12 defeitos abertos (3 conferidos pelo maestro nas capturas) | Antigravity #3 | 16/11 | — |
| ~~B22~~ concluída 16/11 (820e903): desafio de `solidos-de-revolucao` cabe em 400 × 860; ENEM 2022/160 aprovada; 2022/143 segue descartada (gabarito do cache diverge da dobra) | Claude Code #2 | 16/11 | — |
| ~~B23a~~ concluída 16/11 (c0c2e9e): 6 questões em matrizes e distribuição de frequências | Claude Code #2 | 16/11 | — |
| ~~B23b~~ concluída 16/11 (ba66ffb): 4 questões em inequações exp./log., experimentos binomiais e projeções; maestro reescreveu 4 feedbacks | Antigravity #2 | 16/11 | — |
| ~~B24a~~ concluída 16/11 (9ca3b08): extremo fechado do arco, chips do ciclo e barras de soma; fala do passo da tangente | Antigravity #3 | 16/11 | — |
| ~~B24b~~ concluída 16/11 (ec80a68): pirâmides p2 e polígonos p2 pelo conteúdo; 3 lacunas de widget passaram para a B25 | Antigravity #4 | 16/11 | — |
| ~~B25a~~ concluída 16/11 (38ad1e3). Widgets `vetores` (chips x/y presos em u; Módulo encosta em Soma) e `triangulo` (modo `razoes` minúsculo em k = 1) (briefing `C:\Users\mkf10\projetos\briefing-b25.md`) | Claude Code #2 | 16/11 | `src/widgets/common/vetores/**`, `src/widgets/common/triangulo/**`, GUIA §5 dessas seções, aulas e testes de `vetores-no-plano` e `trigonometria-no-triangulo-retangulo`, `docs/visual/correcoes-b25a.md` |
| ~~B25b~~ concluída 16/11 (2ace37c, eee1c58). Widgets `circunferencia` (`mostrar.ponto`) e `poligono` (rótulo `t` e 90° no modo `paralelas`; 1ª versão recusada na auditoria, refeita) | Antigravity #3 | 16/11 | `src/widgets/common/circunferencia/**`, `src/widgets/common/poligono/**`, GUIA §5 dessas seções, aulas e testes de `circunferencia-equacao-e-posicoes` e `angulos-retas-paralelas`, `docs/visual/correcoes-b25b.md` |
| ~~B25c~~ concluída 16/11 (9bd24f0). Widget `solido` (encosto em prismas; áreas em composição; círculos máximos em esferas, ou fala ajustada) | Antigravity #4 | 16/11 | `src/widgets/common/solido/**`, GUIA §5 (`solido_3d`), aulas e testes de `prismas-e-paralelepipedos`, `areas-e-volumes-por-composicao`, `esferas`, `docs/visual/correcoes-b25c.md` |
| ~~B26~~ concluída 16/11 (f9e3d84). `prismas-e-paralelepipedos` p3 mostrava `D = 13` antes de o aluno chegar; chip `sen 0,5` cobre a marca `π` em `formulas-de-adicao-e-arco-duplo` p3 (briefing no fim de `C:/Users/mkf10/projetos/briefing-b25.md`) | Claude Code #2 | 16/11 | `src/widgets/common/solido/**`, `src/widgets/common/ciclo/**`, GUIA §5 dessas seções, aulas e testes desses 2 capítulos, `docs/visual/correcoes-b26.md` |

16/11, noite: **a Máquina B está sem frente aberta.** Árvore limpa, tudo publicado até f9e3d84. A Máquina A volta em 17/11 e pode retomar suas reservas; os acréscimos de widget de 15–16/11 estão no GUIA §5 (blocos "Acréscimo de 16/11").

16/11, noite (o usuário mandou prosseguir). Briefing: `C:\Users\mkf10\projetos\briefing-b27.md`.

| Frente | Agente (B) | Desde | Arquivos |
|---|---|---|---|
| B27b. Defeitos que só aparecem movendo o slider (9 casos do fim de `pendencias-b19.md`) | Claude Code #2 | 16/11 | `src/widgets/common/**` das pastas envolvidas, GUIA §5 dessas seções, aulas e testes desses 9 capítulos, `docs/visual/pendencias-b27b.md` |
| B27c. Figura que entrega a resposta: geometria (só relatório) | Antigravity #3 | 16/11 | `docs/visual/entrega-resposta-b27c.md` |
| ~~B27a~~ concluída 16/11 (10c5ddd): 9 de 10 ok; ENEM 2022/137 com frações em texto | Antigravity #2 | 16/11 | — |
| ~~B27d~~ concluída 16/11 (6b9fa20): 273 passos, 16 casos | Antigravity #4 | 16/11 | — |
| B28a. Corrigir os 16 casos da B27d (esconder até o aluno chegar, ou reescrever a fala; nada em `src/`) | Antigravity #4 | 16/11 | aulas e testes dos capítulos de `entrega-resposta-b27d.md`, `docs/visual/correcoes-b28a.md` |

## Pedidos entre máquinas

Use para pedir algo em arquivo que não é seu (ex.: "widget X corta o rótulo no passo 3 de `elipse`"). Formato: data, quem pede, para quem, o quê.

- 13/11, coordenador A → dono dos widgets (A): `retangulo_areas` modo `produto` desenha pequeno e descentralizado (ocupa cerca de 1/3 da área, colado à esquerda) e as peças não têm rótulo dentro (a², ab, b²). Visto em `expressoes-algebricas-e-produtos-notaveis`, passo 1, em 400 px.

- 13/11, B → dono dos widgets (A): defeitos de widget achados na conferência visual da geometria estão em `docs/visual/geometria.md` (coluna "tipo" = widget). Os principais: `pontos_no_plano` sempre mostra "d = ..." (entrega a resposta no passo 2 e no desafio de `plano-cartesiano-distancia-e-ponto-medio`); no modo `reta` aparecem os botões Quadrados/Ponto médio e a reta passa da borda da malha; `pontos_figura` rotula sempre A e B; layout muda durante o arraste quando a fala de conclusão aparece. Acrescentado depois do setor analítica (41 achados): `lugar_geometrico` mostra sempre a, b, c e a equação, o que entrega respostas (elipse passo 3 e desafio, hipérbole desafio, parábola desde o passo 1); rótulos colidem (F sobre o vértice na parábola, P sobre C na circunferência); MicroChallenge corta alternativas longas na grade 2 × 2 ("Concorren", "Perpendicul"); fichas do concept_lock quebram dentro do botão. Do setor plana: `geometria_triangulo` (modo `angulos`, `externo: true`) rotula "e = α + β" mas desenha e mede α + γ em B, como diz o GUIA §5.10 (visto em `triangulos-congruencia-e-propriedades` passos 2 e 6; o texto da aula já foi acertado para α + γ); legendas escrevem "3,14" e "1,41" mas calculam com π e √2 exatos, e as contas não fecham ("10 · 3,14 = 31,42", "5 · 1,41 = 7,07"): escrever "≈" ou calcular com o valor escrito; rótulos sobrepostos em `geometria_poligono` modo `paralelas`; canvas baixo em `comprimento-da-circunferencia` passo 4. Da trigonometria: `ciclo_trigonometrico` arredonda os rótulos de `marcos_rad` para inteiro (`ciclo/desenho.ts`, `fmt(r, 0)`): 0,5, 0,8 e 1,05 viram "1 rad", π vira "3 rad", 2π vira "6 rad"; `geometria_triangulo` modo `razoes` desenha o triângulo minúsculo no canto em 400 px, com chips HIP/30°/CO sobrepostos e CA cortado (`trigonometria-no-triangulo-retangulo`). Resumo completo, com os 5 achados graves e os padrões, no fim de `docs/visual/geometria.md`.

## Concluídas

- 13/11, B: frente 5 (conferência visual da geometria) concluída: 42/42 capítulos vistos em 400 px com screenshot real (Chrome headless via DevTools; o claude-in-chrome não conectou), 139 achados em `docs/visual/geometria.md`. Correções de conteúdo publicadas em analítica, plana e espacial, entre elas o gabarito errado do molde do dado (`projecoes-cortes-e-planificacoes`: Face 3 → Face 6, provado pelo `moldeDado`).

- 13/11, B (Claude Code maestro + 4 Antigravity + Claude Code #2): frente 4 concluída. 42 capítulos de geometria: 1337 alternativas erradas conferidas pela conta, 162 feedbacks reescritos, 18 falas de passo generalizadas; `reta-equacao-e-inclinacao` passou a usar `pontos_no_plano`; `radianos-e-ciclo-trigonometrico` passo `um-radiano` desenhava 1° em vez de 1 rad (params corrigidos). Auditoria do maestro sobre todas as alterações (5 feedbacks ainda refeitos). Registros em `docs/revisao/geometria-*.md`. Pendente: vestibular de geometria não começou.

- 13/11, A: frentes 1 e 2 (revisão de texto de aritmética e álgebra) e distratores de aritmética e álgebra.
- 13/11, A: os 103 capítulos escritos e registrados; 14 widgets; repositório publicado.

- 13/11, Shell #2 (Codex): reserva exclusiva de src/widgets/common/** para a pendência visual 1, por instrução do usuário. Sem commit/push/build; registros incrementais em docs/visual/widgets.md.

- 13/11, Shell #2: unidade parcial de retangulo_areas gravada; typecheck e 332 testes passaram. Sem imagens, lint bloqueado por ENOMEM e CLI Maestri ausente. Retomada detalhada em docs/visual/widgets.md; os seis widgets seguintes não foram iniciados.
