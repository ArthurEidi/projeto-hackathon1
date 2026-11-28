# Próximos passos

Atualizado em 28/11/2026.

> **28/11:** preparação da entrega ao Hack Brasil 2026 (prazo 30/11, 23h59). README reescrito como "Aula Visual", roteiro de vídeo de até 3 min em `docs/DEMO.md`, checklist em `docs/ENTREGA_HACKBRASIL_2026.md`, passo a passo do GitHub Pages em `docs/HOSPEDAGEM.md`. `lint:planos` passa (103/103). Validação: lint ok, 141 arquivos / 2.229 testes, typecheck e build ok. **Falta (equipe):** ativar o Pages e testar o link, gravar o vídeo, confirmar o nome e o terceiro integrante, commit e push antes do prazo.

> **21/11, noite:** identidade visual alinhada à landing page (creme, tinta, pastéis por disciplina, Manrope/DM Sans/Georgia). Varredura das 107 aulas em 3 tamanhos: só 2 registros, defeitos de conteúdo preexistentes (sliders sem efeito visual em `relacoes-metricas-triangulo-retangulo` p2 e `troncos-de-solidos` p3). Capturas reais em `docs/screenshots/`. Ver `docs/ALINHAMENTO_VISUAL_LANDING_APP.md`.

> **21/11:** o app passou a ter três áreas (Matemática, Física, Química), nova identidade visual, página inicial, aula em duas colunas no desktop, 1 aula de Física (lançamento oblíquo), 1 de Química (concentração e diluição) e a questão visual do ENEM 2022 (saque de vôlei). 2227 testes, lint, typecheck e build ok. Pendências e próximos passos em `docs/EVOLUCAO_VISUAL_E_DISCIPLINAS.md` §11–12 (varredura visual das 104 aulas no layout novo, roteiros das aulas novas, elegibilidade).

**Antes de pegar qualquer tarefa, leia `docs/EM-ANDAMENTO.md`**: é lá que cada máquina reserva a sua frente, para duas máquinas não mexerem nos mesmos arquivos.

## Estado

- **103 de 103 capítulos** têm aula no app (mais Cones, o capítulo-modelo). Cada um tem `aula-01.json` e teste próprio.
- **Validações em 19/11 (b5c8864):** `lint:content` ok, 132 arquivos de teste / 2121 testes passando, `typecheck` limpo, `build` ok.
- **Widgets** (`src/widgets/common/`, documentação no GUIA §5): `plano_cartesiano`, `reta_numerica`, `barras`, `grade_resultados`, `solido_3d`, `geometria_triangulo`, `ciclo_trigonometrico`, `geometria_poligono`, `geometria_circulo`, `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `retangulo_areas`, `maquinas_funcao`, `transformacao_plano`, e os 4 de um capítulo só (`escala_decimal`, `grupos_inteiros`, `divisao_polinomial`, `sistema_escalonado`, GUIA §5.21–5.24, 19/11). Nenhum capítulo depende mais de adaptação por falta de widget.
- **Roteiros:** 103 planos em `docs/planos/`; gabaritos conferidos às cegas (1359/1359).
- **Vestibular:** 98 das 104 aulas, 188 questões reais de 17 bancas (ENEM e provas oficiais conferidas no PDF e auditadas). Sem questão adequada: `funcao-racional`, `vetores-no-plano`, `quartis-percentis-e-boxplot`, `angulos-retas-paralelas`; em busca: `circunferencia-arcos-e-angulos`, `equacoes-irracionais`.
- **Desafios:** os 104 têm 4 alternativas (B14). **Figura que entrega a resposta:** os 25 casos achados em 16/11 resolvidos com `antes_de_concluir` (GUIA §2).

**Progresso estimado do protótipo (20/11, noite): cerca de 95%.** Conteúdo, widgets, roteiros: 100%. Texto, feedbacks e falas: ~98%. Conferência visual e varredura automática: 0 problemas nas 104 aulas. Vestibular: 98/104 aulas (188 questões de 17 bancas); 4 aulas sem questão adequada depois de busca ampla (`funcao-racional`, `vetores-no-plano`, `quartis-percentis-e-boxplot`, `angulos-retas-paralelas`) e 2 em busca (`circunferencia-arcos-e-angulos`, `equacoes-irracionais`). Produto: revisado como usuário de primeira viagem (B49), sem tela em branco em falhas de armazenamento, link ou rede (B54, B58), JS inicial 423 kB (B52), README e roteiro de demo ensaiado (B57, B59), atalho na Área de Trabalho (B51). Falta: publicar o app (decisão do usuário), 3 achados que atrapalham da revisão B63, auditar o branch `wip-20-11-noite`, opcionais.

O conteúdo existe; o trabalho agora é **qualidade**: texto, visual, widgets que foram substituídos por adaptações, fontes de vestibular.

## Resumo para quem chega agora (atualizado em 14/11)

**Feito até 13/11.** 103/103 capítulos no app; todos os widgets principais; nos três pilares: revisão de texto, distratores, conferência dos passos interativos (params × falas) e segunda passada nos feedbacks. Geometria (Máquina B): conferência visual 42/42 com 139 achados (`docs/visual/geometria.md`) e correções de conteúdo publicadas.

**Feito em 14/11 (Máquina A).**

- **Vestibular:** 40 questões do ENEM entraram em 19 aulas de aritmética e álgebra (antes, 9 aulas tinham vestibular; agora 26). Registro em `docs/revisao/vestibular-aritmetica.md` e `vestibular-algebra.md`. O gabarito de cada uma foi comparado com a `api.enem.dev` por script do coordenador: 40 de 40 batem.
- **Widgets (pedidos da B):** `pontos_no_plano`, `lugar_geometrico` e `circunferencia_no_plano` ganharam `mostrar.distancia`, `mostrar.dimensoes`, `mostrar.equacao` e `rotulos`, já ligados em `plano-cartesiano-distancia-e-ponto-medio`, `elipse`, `hiperbole` e `parabola-conica`; modo `reta` sem botões e sem `d`; marcos de radiano como fração de π; externo do triângulo = α + γ; legendas com ≈; desafio em lista quando há rótulo com mais de 10 caracteres; fórmula do fechamento quebra entre fichas. Documentado no GUIA §5.10 a §5.16 ("Acréscimos de 14/11"). Conferido por screenshot pelo coordenador.
- **Ferramenta de conferência visual:** `node scripts/captura-aula.mjs <porta> <pasta> <pilar/setor/slug>[:passos]` grava um PNG de 400 × 860 por passo (estado inicial). Usa o atalho `#/aula/<...>/aula-01?passo=N`, que só existe em modo dev. Não arrasta nem clica: para ver o estado final de um passo ainda é preciso dirigir o navegador.
- **Ferramenta de varredura automática:** com `npx vite --port <porta> --strictPort` rodando, use `node scripts/varre-aulas.mjs <porta> [filtro-de-slug]` para verificar os passos e a abertura dos treinos em 400 × 860. A execução completa grava `docs/visual/varredura-b44.md`; com filtro, o relatório sai no terminal.

**Feito em 14/11, noite (Máquina B, sessão nova do maestro; a anterior caiu às 17h30).**

- **Vestibular nas aulas:** 35 questões do ENEM em 21 aulas de geometria (62ce723), 31 em 14 aulas de aritmética e álgebra (d9c8598, 50101e9), com 5 repetidas trocadas; 39 candidatas novas em `docs/fontes-candidatas/` (4ea797c). O maestro refez a conta de todas as alternativas e reescreveu cerca de 30 feedbacks que descreviam um erro que não leva ao valor.
- **Reconferência visual completa** com foto depois de VERIFICAR em cada errada dos desafios: geometria (B8, `docs/visual/geometria-reconferencia-b8.md`) e aritmética/álgebra (B11, `docs/visual/reconferencia-b11[a-d].md`). Defeitos de conteúdo e de widget corrigidos e publicados (até 750a557).
- **Bug de schema:** a opção do desafio aceitava qualquer chave, e 4 aulas usavam `override` em vez de `figure` (a figura da errada ficava igual à inicial sem erro de lint). `ChallengeOption` agora é `.strict()`, com teste.
- **Widgets (B1, B1b, B12, B13):** etiqueta do encontro só quando o aluno chega; balão do Paco com altura reservada; `retangulo_areas` na escala do maior valor dos sliders (`WidgetProps.faixas`); fórmula do fechamento sem pontuação órfã (`gruposFormula`); `solido_3d` com `mostrar.g` e `face_destaque`; `barras` com `mostrar.raiz` e `extremos`; `grade` com `mostrar.razao_partes`; escala do `vetores_no_plano` no modo complexo. Documentados no GUIA §5.
- **Critério novo:** em desafio de 2 alternativas, o feedback da errada citar a certa não é defeito (só sobra a outra opção). Com 3 ou 4, o feedback explica o erro e dá pista sem o valor certo.
- Validação ao fim: lint ok, 126 arquivos / 1996 testes, typecheck e build ok.

**Feito em 15/11 (Máquina B; a Máquina A fica fora até terça, 17/11, e a B responde pelo projeto).**

- **Decisões do usuário (15/11):** desafios com 2 ou 3 alternativas passam a ter 4; hospedagem só preparada, sem publicar.
- **Desafios com 4 alternativas (B14):** 47 desafios tinham menos de 4 alternativas (34 de álgebra, 12 de aritmética, 1 de geometria). Feitos e publicados 33 (B14b aritmética, B14c funções e matrizes, B14d polinômios, sequências e `solidos-de-revolucao`): cada errada nova vem de um erro real, com a conta no teste do capítulo, feedback sem o valor certo e figura própria. A certa muda de posição entre os capítulos. Auditoria do maestro: contas refeitas, script que procura o valor certo nos feedbacks das erradas, foto em 400 px de cada alternativa depois de VERIFICAR (`ferramentas-b14/reconfere-b14.mjs`, fora do repositório). Corrigidas 9 figuras antigas que mostravam a certa ou eram iguais à inicial e 5 figuras novas fracas. Registros em `docs/revisao/desafios-4-alternativas-b14[b-d].md`. Depois, as 7 `equacoes-*` (B14a1, Claude Code #2) também auditadas e publicadas: 40 de 47. Por fim, a B14a2 (expressões, fatoração e as 5 `inequacoes-*`, Claude Code #2, porque os Codex seguiram sem permissão): **47 de 47; todos os 104 desafios do app (103 capítulos e Cones) têm 4 alternativas.**
- **Layout do desafio:** com legenda acima de 10 caracteres as opções viram lista, e a 4ª ficava abaixo do rodapé em 400 × 860. Cartões da lista agora com 44 px (`src/ui/styles.css`). Ainda rola em `solidos-de-revolucao` (enunciado de 4 linhas e figura 3D alta).
- **Hospedagem preparada (B15), não publicada:** build com base relativa (o `dist/` funciona em subcaminho), vídeos resolvidos pela base do site, workflow `.github/workflows/pages.yml` só com disparo manual e `docs/HOSPEDAGEM.md`. Testado servindo o `dist/` em `/projeto-hackathon1/`. **O repositório é privado:** GitHub Pages gratuito exige repositório público; alternativa é Netlify/Vercel.
- **Agentes:** os dois Codex abrem com permissão "Workspace (granular)", que recusa todo comando; o maestro não pode mudar isso (o classificador bloqueia). O usuário precisa rodar `/permissions` neles.

**Feito em 16/11 (Máquina B).** O PC reiniciou e os agentes de 15/11 caíram; B17b e B19 foram refeitas. As 39 imagens soltas em `public/vestibular/` eram sobras da B17a e foram para fora do repositório (`C:\Users\mkf10\projetos\sobras-b17a`).

- **Vestibular com imagem:** B17b achou 9 candidatas do ENEM em 4 capítulos de álgebra e aritmética (21 seguem sem candidata no cache); B22 aprovou a 2022/160 (robô no cubo) e manteve a 2022/143 fora (a dobra da planificação dá D, o cache diz A). B23a/B23b puseram as 10 nas aulas: `matrizes-determinantes-sistemas`, `distribuicao-de-frequencias-e-amostragem`, `inequacoes-exponenciais-logaritmicas`, `experimentos-binomial-e-repetidos`, `projecoes-cortes-e-planificacoes`. Agora **68 das 104 aulas têm vestibular** (36 sem). O maestro conferiu cada imagem de alternativa e reescreveu 4 feedbacks que não correspondiam à figura ou ao valor.
- **Layout:** o desafio de `solidos-de-revolucao` cabe em 400 × 860 (legendas curtas na grade 2 × 2; teste exige até 10 caracteres).
- **Widgets (B19 → B26):** relatório `docs/visual/pendencias-b19.md` (12 abertos). Corrigidos e publicados: `ciclo_trigonometrico` com extremo fechado (`≥` com bolinha cheia), chip de seno livre de α e de π, barras de soma sem sobreposição; `circunferencia_no_plano` com `mostrar.ponto`; `geometria_poligono` modo `paralelas` (rótulo `t` e chips de 90°); `vetores_no_plano` com `componentes_de` e rodapé sem encosto; `geometria_triangulo` modo `razoes` com `janela: "k"`; `solido_3d` com `rotulo_diagonal` e sem o número da área sobre a diagonal da base; conteúdo de `piramides` p2, `poligonos-e-quadrilateros` p2, `esferas` p2 e `funcoes-trigonometricas` p3. Cada acréscimo está no GUIA §5. A auditoria recusou uma 1ª versão do polígono (chips se cobriam e escondiam os arcos) e achou dois defeitos novos (B26).
- Validação ao fim: lint ok, 128 arquivos / 2016 testes, typecheck e build ok (f9e3d84).
- **Ainda abertos (precisam de recurso novo de widget):** gráfico de `tg x` no `ciclo_trigonometrico` (`funcoes-trigonometricas` p3), chips de área no `solido_3d` composto (`areas-e-volumes-por-composicao` p3), 4 círculos máximos na esfera (`esferas` p2). Leves: `t` meio atrás de um `90°` em `angulos-retas-paralelas` p1. Defeitos que só aparecem movendo o slider não foram reconferidos (lista no fim de `pendencias-b19.md`).

- **16/11, noite (usuário mandou prosseguir):** conferência visual das 10 questões da B23 (B27a; ENEM 2022/137 com frações em texto); 5 defeitos que só aparecem movendo o slider corrigidos (B27b); varredura "figura que entrega a resposta" em todas as aulas (B27c/d: 25 casos). Novo campo **`antes_de_concluir`** no passo interativo (GUIA §2): a figura esconde a resposta até o aluno concluir; aplicado em 23 dos 25 casos (B29a/b, B31a/b). Widgets novos: `grafico: "tg"` no ciclo, `areas` no sólido composto (B30), `valores: "ao_tocar"` nas barras, `legenda` no triângulo modo `senos`. Recusada a B28a (falas que anunciavam a resposta).
- **Parou no meio (limite do Claude):** B32, `piramides` p2 (apótema 5) e `poliedros-e-relacao-de-euler` p1 (`V − A + F = 2`): chave nova no `solido_3d` + `antes_de_concluir`. Pode haver edição não commitada em `src/widgets/common/solido/**`, nessas 2 aulas e testes e no GUIA §5.7: revisar com `git diff` antes de seguir (prova do estado concluído obrigatória).

**17/11 (Máquina B; a A volta hoje).** B32 terminada pelo maestro e publicada (efbfe1e): `solido_3d` com `rotulo_apotema` e `rotulo_euler`, fechando os 25 casos. Em curso a B33 (briefing fora do repositório `briefing-b33.md`): os 4 widgets de um capítulo só (`escala_decimal`, `grupos_inteiros`, `divisao_polinomial`, `sistema_escalonado`), cada um em pasta nova e ligado no seu capítulo no lugar da adaptação; e a B34, relatório das lacunas de widget antigas que continuam abertas.

**Feito em 18–19/11 (Máquina B).** O PC caiu em 18/11 no meio da leva B33–B36; nada se perdeu (backup em branch remoto, já apagado).

- **4 widgets de um capítulo só** (B33, 268a0d2): adaptações trocadas em `notacao-cientifica-e-ordem-grandeza`, `sistemas-numericos-e-divisibilidade`, `divisao-polinomial-e-teorema-do-resto`, `sistemas-lineares-e-escalonamento`. Revisão de código pelo Codex (B35: 2 achados altos, ~12 médios), todos corrigidos com teste que falhava antes (B39), revisão cruzada (B39r, 0158c88). `isComplete` passou a recusar métrica NaN (antes NaN concluía o passo).
- **Lacunas antigas de widget** (B34 relatório, B38, a8585cc): `t` fora dos chips 90° em paralelas; urna com bolas no desafio de `probabilidade-espaco-amostral`; `unidades-conversoes-e-escalas` p1/p5 com `retangulo_areas` modo `escala`.
- **Vestibular:** auditoria completa dos feedbacks de aritmética e álgebra (B36 + B41, 75391f1 e 87a216b): 92 questões, 458 alternativas, 78 textos corrigidos, nenhum gabarito errado. **Critério:** no treino, o feedback da errada dá a resposta certa (GUIA §2 regra 1); "não revelar o valor certo" vale só para desafios. Fontes "ENEM 2025" erradas corrigidas e 0 repetidas (77cce36). Candidatas de provas oficiais (B40, Gemini) auditadas no PDF pelo Claude Code #2: 17 aprovadas, 10 recusadas (8 do ITA por nível); 16 inseridas em 12 aulas (B42, b5c8864).
- **Em curso:** B43 (Claude Code #2, vestibular para as 25 aulas restantes), B44a (Codex, `scripts/varre-aulas.mjs`: varredura automática das 104 aulas), B44b (Codex #2, casos de borda dos widgets novos e grade 4 × 5). Briefings fora do repositório: `C:\Users\mkf10\projetos\briefing-b4x.md`.

**Feito em 19–20/11, noite (Máquina B; todos os agentes).** B43 (13 questões oficiais em 11 aulas), B45a (7 em 4 aulas de trigonometria; a de inequações ainda no `wip-20-11`), B45c (transformações e função modular), B44 (varredura automática + bordas dos widgets) com revisões cruzadas (B45r), B47 (36 falas do treino que entregavam a resposta antes de Verificar; seção de vestibular de 72 roteiros normalizada; mojibake de `taxas-equivalentes-e-inflacao.md` recuperado), B48 (37 questões novas vistas em 400 px: 0 problemas). Último commit no main: ver `git log`.

**Parada de 20/11 (pedido do usuário).** Trabalho não auditado ou pela metade está no branch remoto **`wip-20-11`** (não mesclar sem revisar): (1) `inequacoes-trigonometricas` com UFU 2021-2 Q67 (B45a, falta auditoria nos moldes da B42); (2) B46 parcial (Codex: 4 achados de `docs/revisao/codigo-b44b-revisao.md` em `escala`; terminar, com teste que falha antes); (3) B49 parte 1 parcial (`docs/visual/produto-b49.md`, revisão de produto do app pelo Claude Code #2). B45b (Antigravity #2: geometria plana) e B45d (Antigravity #4: sólidos de revolução, vetores, quartis, equações irracionais) não deixaram entrega: recomeçar. Briefings fora do repositório: `C:\Users\mkf10\projetos\briefing-b45.md` e anteriores.

**Feito em 20/11 (tarde e noite, Máquina B; 7 agentes).** Vestibular: B45a/c/d1, B45b (relações métricas), função modular, inequações trigonométricas, todas auditadas por Codex #2 ou Claude Code #2. Produto: B49 (primeira visita, pilar lembrado, convite com contagem real, aula não encontrada amigável, contraste AA), B52 (faixa de matérias, coluna no desktop, player sob demanda), B54 (armazenamento, rota e progresso blindados), B58 (falha de download com "Tentar de novo"), revisões cruzadas B53/B55/B63. B51: atalho na Área de Trabalho (`scripts/abrir-app.cmd`). B57/B59: README e `docs/DEMO.md`.

**Parada de 20/11, noite (limite do Gemini).** Não auditado, no branch remoto **`wip-20-11-noite`** (não mesclar sem revisar): (1) B46b do Codex: métricas síncronas genéricas no registro de widgets (`src/widgets/registry.ts`, `InteractiveCanvas.tsx`), substitui a 1ª versão recusada que citava o widget pelo nome; falta a varredura completa e a revisão; (2) B60 (Antigravity #2, geometria), B61 (Claude Code #2, álgebra), B62 (Antigravity Neon, aritmética): 2ª questão de vestibular nas aulas que têm só 1, parciais (4 aulas editadas: `medidas-de-dispersao`, `circunferencia-equacao-e-posicoes`, `parabola-conica`, `posicoes-relativas-de-retas`), sem auditoria; (3) B45d3 (equações irracionais) e B45b2 (circunferência, arcos e ângulos): registros parciais. Próximo: auditar e publicar (1)–(3), corrigir os 3 achados "atrapalha" da B63 (`docs/revisao/codigo-b58-revisao.md`). O branch `wip-20-11` antigo já foi todo publicado.

**O que falta para fechar o protótipo:** (1) B43 terminar o vestibular (as aulas sem questão oficial adequada ficam vazias, nunca com fonte inventada); (2) rodar a varredura B44a e corrigir o que ela achar; (3) decidir e publicar o app (`docs/HOSPEDAGEM.md`); (4) opcionais: aula 02 de Cones, vídeos.

**Decisões que esperam o usuário:** (a) publicar o app (ver `docs/HOSPEDAGEM.md`: Pages exige repositório público ou Pro; Netlify não); (c) aula 02 de Cones e vídeos. A (b), desafios com 4 alternativas, foi decidida em 15/11 e está em andamento.

**O que falta, em ordem de prioridade:**

1. **Conferência visual de aritmética e álgebra (frente 6):** em andamento em 14/11 na Máquina A (relatórios em `docs/visual/aritmetica.md`, `algebra-equacoes.md`, `algebra-funcoes.md`). Ver o estado em `EM-ANDAMENTO.md`.
2. **Defeitos de widget ainda abertos** (da lista da B em `EM-ANDAMENTO.md`): `geometria_triangulo` modo `razoes` com `k` em slider desenha o triângulo minúsculo no k mínimo, com chips empilhados (`trigonometria-no-triangulo-retangulo` passo 1); em `externo: true` o chip de α sai cortado na borda direita; altura do balão do Paco não é reservada (o layout pula quando a fala de conclusão aparece: `StepLayout.tsx`/`InteractiveCanvas.tsx`); figuras de desafio de `solido_3d_figura`, `geometria_*_figura` e `ciclo_trigonometrico_figura` ainda não têm opção para esconder a medida pedida; `retangulo_areas` continua pequeno (precisa receber os máximos dos sliders).
3. **Ligar os parâmetros novos nas demais aulas de geometria** em que o relatório visual diz que a figura entrega a resposta (só analítica foi feita).
4. **Vestibular, o que resta:** (a) geometria não tem candidatas (`docs/fontes-candidatas/` só cobre aritmética e álgebra); (b) capítulos de aritmética e álgebra sem candidata da API do ENEM; (c) candidatas de sites de exercícios (Toda Matéria etc.) precisam de conferência manual da página; (d) há questões repetidas em dois capítulos (ENEM 2023/138 e 2021/142 em `eventos-independentes` e `probabilidade-espaco-amostral`; 2022/167 em `descontos-acrescimos-e-indices` e `razao-proporcao-porcentagem`; 2019/153 em `descontos-...` e `taxas-equivalentes-e-inflacao`; 2021/178 em `fracoes-e-decimais` e `unidades-conversoes-e-escalas`): trocar uma das cópias quando houver outra candidata; (e) três roteiros com acentuação corrompida mantiveram `PENDENTE-FONTE` (ver `vestibular-aritmetica.md`); (f) `leitura-de-tabelas-e-graficos`: as 3 candidatas dependem de imagem.
5. **Auditoria por modelo forte:** o gabarito das 40 questões novas foi conferido por script, mas os resumos dos enunciados e os feedbacks dos distratores foram escritos por modelo barato e não tiveram auditoria. Repetir a amostra de `docs/revisao/auditoria-claude.md` sobre eles.
6. Reconferência visual das correções de conteúdo de geometria (pedida pela B; agora dá para fazer com `captura-aula.mjs`).
7. Fatoração e potências com `retangulo_areas`; quatro widgets pequenos (`escala_decimal`, `divisao_polinomial`, `sistema_escalonado`, `grupos_inteiros`); aula 02 de Cones; vídeos; hospedagem do app (hoje só roda com `npm run dev`).

**Cuidados aprendidos.** (1) Relato de agente não basta: validar sempre com `npm run lint:content`, `npm test`, `npm run typecheck`. (2) Revisão feita por modelo barato é branda: exigir no registro a conta executada como prova. (3) Erros que passam pelos testes: curva com parâmetros trocados, fala de conclusão que só vale para um valor do slider, feedback que descreve um erro que não produz a alternativa. (4) A Máquina A fica sem memória com sete agentes ao mesmo tempo. (5) "Conferência visual passou" dito pelo agente não basta: em 14/11 um agente declarou conferido um passo que continuava com o defeito; o coordenador abre as imagens. (6) Para publicar com agentes ainda editando: validar o HEAD numa cópia limpa (`git worktree add ../pub HEAD`, junção de `node_modules`) e então `git push`; o `npm run publicar` recusa árvore suja.

## Fila, em ordem de prioridade

As frentes são divididas por pasta para não haver conflito. A coluna "Arquivos" diz o que a frente pode editar; fora disso, não toque.

| # | Frente | Arquivos que pode editar | Quem (ver `EM-ANDAMENTO.md`) |
|---|---|---|---|
| 1 | Revisão de texto: aritmética | `content/aritmetica/**/aula-01.json`, `docs/revisao/aritmetica.md` | Máquina A |
| 2 | Revisão de texto: álgebra | `content/algebra/**/aula-01.json`, `docs/revisao/algebra-*.md` | Máquina A |
| 3 | Widgets: terminar `maquinas_funcao`, corrigir acentos trocados por "?", depois `transformacao_plano` e extensões da `reta_numerica` | `src/widgets/common/**`, GUIA §5, `WIDGETS-PENDENTES.md` | Máquina A |
| 4 | Revisão de texto: geometria | `content/geometria/**/aula-01.json`, `docs/revisao/geometria-*.md` | **Máquina B** |
| 5 | Conferência visual das aulas de geometria no navegador | relatório em `docs/visual/geometria.md`; correções só em `content/geometria/**` | **Máquina B** |
| 6 | Conferência visual das aulas de aritmética e álgebra | `docs/visual/aritmetica.md`, `docs/visual/algebra.md` | livre (depois de 1 e 2) |
| 7 | Trocar adaptações pelos widgets certos (lista abaixo) | a aula e o teste de cada capítulo listado | livre (depois de 3) |
| 8 | Fontes de vestibular (392 pendentes) | `docs/planos/*.md` (só a seção de vestibular) e `treino.vestibular` da aula | livre, **só depois** de a revisão de texto do mesmo pilar terminar |
| 9 | Aula 02 de Cones, vídeos Manim, divisão do bundle (JS acima de 1 MB) | a combinar | livre |

### Como fazer cada frente

**Revisão de texto (1, 2, 4).** Os gabaritos estão certos; o que falha é o texto. Em cada `aula-01.json`:
1. Cada `feedback` de alternativa errada precisa descrever o erro que leva *àquela* alternativa e trazer a resposta certa. O defeito mais comum é um feedback genérico ou que descreve outro erro.
2. Falas dos passos: conta errada, afirmação matemática falsa, fala que não corresponde ao que o widget mostra.
3. Edições mínimas, respeitando as regras de texto (GUIA §2.4). Não mexer em `params`, ids ou estrutura.
4. Depois de cada arquivo: `npx vitest run src/conteudo/<slug>.test.ts` e `npm run lint:content`.
5. Registrar em `docs/revisao/<frente>.md` uma linha por capítulo: slug, número de correções, um exemplo (antes → depois), e dúvidas que não resolveu.

Já revistos por modelo forte (não precisam de nova passada): os 10 capítulos de álgebra escritos em 10/11 (`equacoes-racionais`, `funcao-racional`, `funcao-definida-por-partes`, `transformacoes-graficos-de-funcoes`, `posicoes-relativas-de-retas`, `grandezas-direta-e-inversa`, `equacoes-modulares`, `equacoes-exponenciais`, `equacoes-quadraticas`, `equacoes-primeiro-grau`) e 8 de geometria espacial. Prioridade máxima dentro de cada frente: capítulos escritos pelo modelo gratuito (`razao-proporcao-porcentagem`, `fracoes-e-decimais`, `notacao-cientifica-e-ordem-grandeza`, `potencias-e-radicais`, `radianos-e-ciclo-trigonometrico`); neles conferir também se cada alternativa `correct` bate com o roteiro.

**Conferência visual (5, 6).** `npx vite --port 51xx`, abrir `/#/aula/<pilar>/<setor>/<slug>/aula-01` em 400 px de largura e percorrer todos os passos. Procurar: rótulo sobreposto ou cortado, passo que não completa, figura que não corresponde à fala, figura de erro do desafio que não mostra o erro. Defeito de conteúdo: corrigir na aula. Defeito de widget: **não corrigir**, anotar no relatório com slug, passo e descrição (quem corrige é a frente 3).

**Trocar adaptações (7).** Capítulos escritos antes de o widget certo existir: `introducao-a-funcoes` e `funcao-composta-e-inversa` (→ `maquinas_funcao`), `reta-equacao-e-inclinacao` (→ `pontos_no_plano`), `expressoes-algebricas-e-produtos-notaveis`, `fatoracao-algebrica`, `potencias-e-radicais` (→ `retangulo_areas`), `matrizes-determinantes-sistemas` e `determinantes-e-matriz-inversa` (→ `transformacao_plano`, quando existir). As lacunas que cada agente anotou estão em `docs/entregas/*.md`.

**Lacunas de widget conhecidas.** `grade_resultados`: figura `escada` sem "degraus todos em 5" e sem sinais de +; `bolinhas_e_barras` só aceita `sequencia`/`highlight`; urna sem bolas coloridas; sem grade 4 × 5. `barras`: recorrência de dois termos (Fibonacci), `categorias` com `degraus`, alerta "mediana sem ordenar". `solido_3d`: falta `corte_cone`. Widgets de 12/11 (`lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `retangulo_areas`) não tiveram conferência visual.

## Publicação

`npm run publicar` valida tudo (lint, testes, typecheck, build), rebaseia sobre o remoto e só então faz o push. Se algo falhar, nada é enviado. Use sempre esse comando em vez de `git push`.

## O que aprendemos ao delegar

- Relato de agente não basta: quem integra roda lint, testes e typecheck a cada entrega. Erros que passaram pelo relato: tipagem de teste, símbolo recusado pelo lint, `id` e `caminho.unidade` diferentes do padrão, pasta com nome errado.
- Um único dono por arquivo compartilhado (`taxonomy.json`, `src/widgets/common/`) foi o que permitiu vários agentes em paralelo sem conflito.
- O agente Codex gravou documentação com acentos trocados por "?" (GUIA §5.14 a §5.18, tabela de `WIDGETS-PENDENTES.md`). Conferir acentuação em tudo que ele escrever.
- Conferir o modelo de cada terminal imediatamente antes de mandar ordens: eles mudam de um dia para o outro.

## Fora do repositório (só na máquina A)

`C:\Users\User\Hackathon\sprites` (arte-fonte dos personagens; os recortes usados estão em `public/`) e `C:\Users\User\Hackathon\gabarito-cego` (material da conferência às cegas; resultado em `docs/REVISAO-GABARITOS.md`).
