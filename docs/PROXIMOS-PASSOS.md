# Próximos passos

Atualizado em 13/11/2026 (noite). Quem trabalhar no projeto atualiza este arquivo ao fim da sessão.
**Antes de pegar qualquer tarefa, leia `docs/EM-ANDAMENTO.md`**: é lá que cada máquina reserva a sua frente, para duas máquinas não mexerem nos mesmos arquivos.

## Estado

- **103 de 103 capítulos** têm aula no app (mais Cones, o capítulo-modelo). Cada um tem `aula-01.json` e teste próprio.
- **Validações em 13/11:** `lint:content` ok, 124 arquivos de teste / 1913 testes passando, `typecheck` limpo, `build` ok.
- **Widgets** (`src/widgets/common/`, documentação no GUIA §5): `plano_cartesiano`, `reta_numerica`, `barras`, `grade_resultados`, `solido_3d`, `geometria_triangulo`, `ciclo_trigonometrico`, `geometria_poligono`, `geometria_circulo`, `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `retangulo_areas`, `maquinas_funcao`, `transformacao_plano`.
- **Roteiros:** 103 planos em `docs/planos/`; gabaritos conferidos às cegas (1359/1359).
- **Vestibular:** cerca de 20 questões com fonte real; 392 marcadas `PENDENTE-FONTE` nos roteiros.

O conteúdo existe; o trabalho agora é **qualidade**: texto, visual, widgets que foram substituídos por adaptações, fontes de vestibular.

## Resumo para quem chega agora (atualizado em 13/11 à noite)

**Feito.** 103/103 capítulos no app; todos os widgets principais; em aritmética e álgebra (61 capítulos): revisão de texto, distratores (as questões deixaram de ter só 2 alternativas), conferência dos passos interativos (params × falas), segunda passada nos feedbacks dos distratores (equações e funções/sequências/matrizes/polinômios concluídas; aritmética quase toda) e troca das adaptações pelos widgets certos. Registros em `docs/revisao/`.

**O que falta, em ordem de prioridade:**

1. **Geometria inteira (42 capítulos em `content/geometria/**`)**: nada do que foi feito em aritmética e álgebra foi feito aqui. Reservada para a Máquina B. Fazer, nesta ordem, por setor: (a) distratores: questões com 2 alternativas passam a 3 ou 4 (ver `docs/revisao/algebra-equacoes-distratores.md` como exemplo de registro); (b) conferência dos passos interativos, params × falas (método em "Como fazer cada frente"); (c) segunda passada nos feedbacks dos distratores: para cada alternativa errada, executar a conta que o feedback atribui ao aluno e ver se dá exatamente o rótulo; (d) trocar `reta-equacao-e-inclinacao` para `pontos_no_plano`. O arquivo `docs/revisao/hermes-geometria-alertas.md` (modelo fraco, só leitura) não achou gabarito divergente em geometria plana e trigonometria; vale como indício, não como garantia.
2. **Questões de vestibular nas aulas.** Há candidatas em `docs/fontes-candidatas/<slug>.md` para cerca de 34 capítulos. As do ENEM vêm de `api.enem.dev` e são conferidas por `python scripts/confere-fontes-enem.py` (as 21 primeiras bateram; rodar de novo, pois chegaram mais). Falta: para cada candidata que o script aprova, acrescentar em `treino.vestibular` da aula (formato no GUIA §2.3: `fonte`, URLs, `adaptada`, enunciado resumido em até 140 caracteres, alternativas e gabarito oficiais, `fala` própria) e trocar o `PENDENTE-FONTE` correspondente no roteiro. As candidatas de sites de exercícios (Toda Matéria, Brasil Escola etc.) precisam de conferência manual abrindo a página; só 2 foram conferidas. Geometria ainda não tem candidatas.
3. **Visual dos widgets** (`docs/visual/widgets.md`). `retangulo_areas` foi corrigido em parte (centralizado e com rótulos), mas continua pequeno: o widget precisa receber os máximos dos sliders, o que exige mexer em `src/widgets/types.ts` e `src/steps/InteractiveCanvas.tsx` (Máquina A). `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `maquinas_funcao` (modo `maquinas`) e `transformacao_plano` nunca foram vistos em imagem. Quem fizer precisa de navegador: o agente Codex não consegue tirar screenshot no sandbox dele.
4. **Abrir as aulas no navegador, uma por uma** (frentes 5 e 6). Só umas oito foram vistas. É onde aparecem erros que testes não pegam.
5. ~~Segunda passada nos distratores de aritmética~~: concluída em 13/11 (876 alternativas conferidas, 32 feedbacks reescritos).
6. **Auditoria por modelo forte**: uma amostra de 4 capítulos por Claude achou 3 feedbacks imprecisos que o modelo barato tinha deixado passar (`docs/revisao/auditoria-claude.md`). Depois da segunda passada, repetir a amostra em outros 4 capítulos para medir se melhorou.
7. Fatoração e potências com `retangulo_areas` (depois do item 3); quatro widgets pequenos (`escala_decimal`, `divisao_polinomial`, `sistema_escalonado`, `grupos_inteiros`); aula 02 de Cones; vídeos; hospedagem do app (hoje só roda com `npm run dev` na máquina).

**Cuidados aprendidos.** (1) Relato de agente não basta: validar sempre com `npm run lint:content`, `npm test`, `npm run typecheck`. (2) Revisão feita por modelo barato é branda: exigir no registro a conta executada como prova. (3) Erros que passam pelos testes: curva com parâmetros trocados (rótulo "2ˣ" desenhando y = 2), fala de conclusão que só vale para um valor do slider, feedback que descreve um erro que não produz a alternativa. (4) A Máquina A fica sem memória com sete agentes ao mesmo tempo (erro ENOMEM e servidor de pré-visualização derrubado).

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

- 13/11, Shell #2, pendência visual 1: retangulo_areas parcialmente corrigido e testado; não aprovado visualmente. Faltam acesso a screenshots e limites de sliders no contrato WidgetProps; outros seis widgets pendentes. Ver docs/visual/widgets.md. lint:content falhou por ENOMEM antes de validar; typecheck e 332 testes de widgets passaram.

- 13/11 (21h30), Máquina B (DESKTOP-M466PUL, Claude Code maestro): frente 4 em andamento. Levantamento: geometria já tem 4 alternativas em 510 de 511 questões (só 1 binária, em espacial), então o item 1(a) está praticamente feito; o trabalho é (b) passos params × falas e (c) segunda passada nos feedbacks. Distribuição: Antigravity (plana, 13), Antigravity #2 (espacial, 11), Antigravity #3 (trigonometria, 10), Antigravity #4 (analítica, 7), Claude Code #2 (`reta-equacao-e-inclinacao` → `pontos_no_plano`, item 1(d)). Registros em `docs/revisao/geometria-*.md`. A Máquina B usa Node 26.13.1 portátil em `C:\Users\mkf10\tools\node`.

- 13/11 (22h), Máquina B: **frente 4 concluída** (item 1 de "O que falta": a, b, c e d). Números por setor: plana 408 conferidas / 61 reescritas / 8 falas; espacial 281 / 18 / 4; trigonometria 360 / 44 / 1 (+ params de `um-radiano`); analítica 249 / 18 / 5; `reta-equacao-e-inclinacao` 39 / 21 / 1 e troca para `pontos_no_plano`. Validação completa: lint ok, 124 arquivos / 1919 testes, typecheck limpo. Em andamento na B: frente 5 (conferência visual, `docs/visual/geometria.md`, parcial). Depois dela, a B pretende: corrigir os defeitos de conteúdo do relatório visual e buscar candidatas de vestibular para geometria (item 2), se a Máquina A concordar em liberar `docs/fontes-candidatas/` para arquivos de geometria. Nota: esta máquina agora tem Node 26.12.1 instalado em `C:\Program Files
odejs`.
