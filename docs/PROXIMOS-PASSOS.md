# Próximos passos

Atualizado em 13/11/2026. Quem trabalhar no projeto atualiza este arquivo ao fim da sessão.
**Antes de pegar qualquer tarefa, leia `docs/EM-ANDAMENTO.md`**: é lá que cada máquina reserva a sua frente, para duas máquinas não mexerem nos mesmos arquivos.

## Estado

- **103 de 103 capítulos** têm aula no app (mais Cones, o capítulo-modelo). Cada um tem `aula-01.json` e teste próprio.
- **Validações em 13/11:** `lint:content` ok, 124 arquivos de teste / 1913 testes passando, `typecheck` limpo, `build` ok.
- **Widgets** (`src/widgets/common/`, documentação no GUIA §5): `plano_cartesiano`, `reta_numerica`, `barras`, `grade_resultados`, `solido_3d`, `geometria_triangulo`, `ciclo_trigonometrico`, `geometria_poligono`, `geometria_circulo`, `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `retangulo_areas`, `maquinas_funcao`, `transformacao_plano`.
- **Roteiros:** 103 planos em `docs/planos/`; gabaritos conferidos às cegas (1359/1359).
- **Vestibular:** cerca de 20 questões com fonte real; 392 marcadas `PENDENTE-FONTE` nos roteiros.

O conteúdo existe; o trabalho agora é **qualidade**: texto, visual, widgets que foram substituídos por adaptações, fontes de vestibular.

## O que foi feito em 13/11 (Máquina A)

- Registrados os 2 últimos capítulos (103/103) e publicado tudo no GitHub.
- Widgets novos: `maquinas_funcao` (refeito), `transformacao_plano`, extensões da `reta_numerica`; lacunas fechadas em `grade_resultados`, `barras` e `solido_3d` (`corte_cone`). Do inventário só faltam os quatro pequenos de um capítulo (`escala_decimal`, `divisao_polinomial`, `sistema_escalonado`, `grupos_inteiros`).
- **Revisão de texto de aritmética e álgebra concluída** (frentes 1 e 2): 60 capítulos lidos, 21 correções, quase todas nos capítulos do modelo gratuito. Registro em `docs/revisao/`.
- **Distratores:** 905 alternativas novas em aritmética e álgebra; as questões deixaram de ter só 2 alternativas (ficaram binárias só as de resposta sim/não). **Geometria ainda tem questões binárias.**
- **Conferência dos passos interativos (params × falas):** equações e inequações completa (7 correções); aritmética completa (14 correções em 8 capítulos); funções/sequências/matrizes/polinômios **parcial**: 12 de 21 capítulos conferidos (3 correções), faltam `funcao-afim`, `funcao-quadratica`, `funcao-modular`, `funcao-exponencial`, `logaritmos` e os 4 de sequências. O agente parou por limite de uso.
- `introducao-a-funcoes`, `funcao-composta-e-inversa` e `expressoes-algebricas-e-produtos-notaveis` passaram a usar os widgets certos.

### Pendências imediatas da Máquina A (retomar daqui)

1. **Qualidade visual dos widgets do Codex** (não começou): `retangulo_areas` desenha pequeno, descentralizado e sem rótulo nas peças (visto no navegador em `expressoes-algebricas-e-produtos-notaveis`); conferir com imagem também `lugar_geometrico`, `pontos_no_plano`, `circunferencia_no_plano`, `vetores_no_plano`, `maquinas_funcao` modo `maquinas`, `transformacao_plano`. A conferência feita em 13/11 só verificou botões e largura, sem ver os pixels.
2. Terminar a conferência de passos nos 9 capítulos listados acima (`docs/revisao/algebra-funcoes-passos.md`).
3. Piloto de fontes de vestibular (frente 8): o agente tinha acesso à web e parou por limite de uso antes de gravar qualquer arquivo. Refazer: candidatos em `docs/fontes-candidatas/<slug>.md`, com URL de enunciado e gabarito, para o coordenador conferir.
4. Trocar adaptações restantes (frente 7): `fatoracao-algebrica` e `potencias-e-radicais` (→ `retangulo_areas`, depois do item 1), `matrizes-determinantes-sistemas` e `determinantes-e-matriz-inversa` (→ `transformacao_plano`), `conjuntos-e-intervalos` e `valor-absoluto-e-distancia` (→ modos novos da `reta_numerica`).
5. Conferência visual das aulas de aritmética e álgebra (frente 6).

Lição do dia: dois tipos de erro passaram pela revisão de texto e pelos testes e só apareceram ao comparar params com falas: curva rotulada "2ˣ" que desenhava y = 2 (a e b trocados) e falas de conclusão que só valiam para um valor do slider. A conferência "params × falas" deve ser feita em geometria também.

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
