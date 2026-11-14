# Próximos passos

Atualizado em 14/11/2026. Quem trabalhar no projeto atualiza este arquivo ao fim da sessão.
**Antes de pegar qualquer tarefa, leia `docs/EM-ANDAMENTO.md`**: é lá que cada máquina reserva a sua frente, para duas máquinas não mexerem nos mesmos arquivos.

## Estado

- **103 de 103 capítulos** têm aula no app (mais Cones, o capítulo-modelo). Cada um tem `aula-01.json` e teste próprio.
- **Validações em 13/11:** `lint:content` ok, 124 arquivos de teste / 1913 testes passando, `typecheck` limpo, `build` ok.
- **Widgets** (`src/widgets/common/`, documentação no GUIA §5): `plano_cartesiano`, `reta_numerica`, `barras`, `grade_resultados`, `solido_3d`, `geometria_triangulo`, `ciclo_trigonometrico`, `geometria_poligono`, `geometria_circulo`, `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `retangulo_areas`, `maquinas_funcao`, `transformacao_plano`.
- **Roteiros:** 103 planos em `docs/planos/`; gabaritos conferidos às cegas (1359/1359).
- **Vestibular:** 26 aulas têm questões reais (40 do ENEM entraram em 14/11); o restante segue `PENDENTE-FONTE` nos roteiros.

O conteúdo existe; o trabalho agora é **qualidade**: texto, visual, widgets que foram substituídos por adaptações, fontes de vestibular.

## Resumo para quem chega agora (atualizado em 14/11)

**Feito até 13/11.** 103/103 capítulos no app; todos os widgets principais; nos três pilares: revisão de texto, distratores, conferência dos passos interativos (params × falas) e segunda passada nos feedbacks. Geometria (Máquina B): conferência visual 42/42 com 139 achados (`docs/visual/geometria.md`) e correções de conteúdo publicadas.

**Feito em 14/11 (Máquina A).**

- **Vestibular:** 40 questões do ENEM entraram em 19 aulas de aritmética e álgebra (antes, 9 aulas tinham vestibular; agora 26). Registro em `docs/revisao/vestibular-aritmetica.md` e `vestibular-algebra.md`. O gabarito de cada uma foi comparado com a `api.enem.dev` por script do coordenador: 40 de 40 batem.
- **Widgets (pedidos da B):** `pontos_no_plano`, `lugar_geometrico` e `circunferencia_no_plano` ganharam `mostrar.distancia`, `mostrar.dimensoes`, `mostrar.equacao` e `rotulos`, já ligados em `plano-cartesiano-distancia-e-ponto-medio`, `elipse`, `hiperbole` e `parabola-conica`; modo `reta` sem botões e sem `d`; marcos de radiano como fração de π; externo do triângulo = α + γ; legendas com ≈; desafio em lista quando há rótulo com mais de 10 caracteres; fórmula do fechamento quebra entre fichas. Documentado no GUIA §5.10 a §5.16 ("Acréscimos de 14/11"). Conferido por screenshot pelo coordenador.
- **Ferramenta de conferência visual:** `node scripts/captura-aula.mjs <porta> <pasta> <pilar/setor/slug>[:passos]` grava um PNG de 400 × 860 por passo (estado inicial). Usa o atalho `#/aula/<...>/aula-01?passo=N`, que só existe em modo dev. Não arrasta nem clica: para ver o estado final de um passo ainda é preciso dirigir o navegador.

**Feito em 14/11, noite (Máquina B, sessão nova do maestro; a anterior caiu às 17h30).**

- **Vestibular nas aulas:** 35 questões do ENEM em 21 aulas de geometria (62ce723), 31 em 14 aulas de aritmética e álgebra (d9c8598, 50101e9), com 5 repetidas trocadas; 39 candidatas novas em `docs/fontes-candidatas/` (4ea797c). O maestro refez a conta de todas as alternativas e reescreveu cerca de 30 feedbacks que descreviam um erro que não leva ao valor.
- **Reconferência visual completa** com foto depois de VERIFICAR em cada errada dos desafios: geometria (B8, `docs/visual/geometria-reconferencia-b8.md`) e aritmética/álgebra (B11, `docs/visual/reconferencia-b11[a-d].md`). Defeitos de conteúdo e de widget corrigidos e publicados (até 750a557).
- **Bug de schema:** a opção do desafio aceitava qualquer chave, e 4 aulas usavam `override` em vez de `figure` (a figura da errada ficava igual à inicial sem erro de lint). `ChallengeOption` agora é `.strict()`, com teste.
- **Widgets (B1, B1b, B12, B13):** etiqueta do encontro só quando o aluno chega; balão do Paco com altura reservada; `retangulo_areas` na escala do maior valor dos sliders (`WidgetProps.faixas`); fórmula do fechamento sem pontuação órfã (`gruposFormula`); `solido_3d` com `mostrar.g` e `face_destaque`; `barras` com `mostrar.raiz` e `extremos`; `grade` com `mostrar.razao_partes`; escala do `vetores_no_plano` no modo complexo. Documentados no GUIA §5.
- **Critério novo:** em desafio de 2 alternativas, o feedback da errada citar a certa não é defeito (só sobra a outra opção). Com 3 ou 4, o feedback explica o erro e dá pista sem o valor certo.
- Validação ao fim: lint ok, 126 arquivos / 1996 testes, typecheck e build ok.

**Decisões que esperam o usuário (próximo passo grande):** (a) hospedar o app (hoje só roda com `npm run dev`); (b) passar os desafios de álgebra de 2 para 3 ou 4 alternativas (34 de 35 têm só 2: metade se acerta no chute); (c) aula 02 de Cones e vídeos.

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
