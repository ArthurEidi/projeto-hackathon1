# Plano — Poliedros, elementos e relação de Euler

**Aula:** 1 — A Contabilidade das Quinas · Vértices, arestas, faces e V − A + F = 2
**Caminho:** geometria / geometria-espacial / poliedros-e-relacao-de-euler
**Pré-requisitos que o aluno já domina:** `projecoes-cortes-e-planificacoes`, `poligonos-e-quadrilateros`.

## a) Ancoragem mecânica
Duas máquinas de contagem governam qualquer poliedro convexo: primeiro, a **costura das arestas** — como cada aresta do sólido fechado é a costura entre exatamente **2 faces**, somar os lados de todas as faces conta cada aresta duas vezes (`2A = soma dos lados das faces`). Segundo, o **invariante de Euler** (`V − A + F = 2`): cortar uma quina ou dividir uma face sempre cria 1 aresta nova para cada vértice ou face nova, mantendo o saldo `V − A + F` cravado em `2`.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo poliedros e Euler) — poliedro convexo interativo (começando no tetraedro `V=4, A=6, F=4` e evoluindo para cubo, octaedro, dodecaedro e bola de futebol truncada) com placar vivo `V`, `A`, `F` e a balança `V − A + F = 2`, além de botão "Cortar quina / Dividir face".

## c) Caso neutro
O poliedro mais simples do espaço: o **tetraedro** (pirâmide de base triangular, com `4` faces triangulares). Nele, `V = 4`, `A = 6`, `F = 4`, e o saldo inicial já marca `4 − 6 + 4 = 2`. É o bloco mínimo fechado por polígonos planos.

## d) Panorama e recorte
Estudamos elementos do poliedro (vértices `V`, arestas `A`, faces `F`), relação de Euler (`V − A + F = 2`), contagem de arestas pelos lados das faces e os 5 Poliedros de Platão (tetraedro, hexaedro/cubo, octaedro, dodecaedro, icosaedro). Deixamos poliedros não convexos com furos (onde a característica de Euler muda) apenas como contraste de fronteira.

## e) Progressão por contraste
1. Tetraedro (`V=4, A=6, F=4`): saldo `4 − 6 + 4 = 2` (referência mínima).
2. Dividir uma face com uma diagonal: nasce `+1` face e `+1` aresta (`+1 − 1 = 0`), então `V − A + F` continua `2`.
3. Cortar um vértice (truncar uma quina triangular): some `1` vértice e nascem `3` vértices novos (`ΔV = +2`), `3` arestas novas (`ΔA = +3`) e `1` face nova (`ΔF = +1`); saldo `+2 − 3 + 1 = 0`, mantendo `2`.
4. Somar lados das faces soltas (`4 × 3 = 12` lados no tetraedro) contra o sólido colado (`A = 12 / 2 = 6` arestas, pois cada costura junta 2 lados).

## f) Dedução causal da forma
Por que `2A` é igual à soma dos lados de todas as faces? Porque antes de colar o molde, cada polígono tem seus lados separados; ao fechar o poliedro, cada aresta cola exatamente **2 lados** vizinhos, logo `A = (soma dos lados) / 2`. E por que `V − A + F = 2` nunca muda em qualquer poliedro convexo? Porque se abrirmos 1 face removendo-a (sobram `F − 1` faces no plano), cada passo para desmontar a rede apaga 1 face e 1 aresta juntas, ou 1 vértice da ponta e 1 aresta juntas, até sobrar 1 único ponto (`1 − 0 + 0 = 1`; devolvendo a face retirada, `1 + 1 = 2`).

## g) Simulação espacial e fronteiras
Testar por que só existem **5 poliedros regulares (Platão)**: para fechar uma quina 3D, precisam se encontrar pelo menos 3 faces no mesmo vértice, e a soma dos ângulos internos ali tem de ser **menor que 360°** (se atingir `360°`, como 3 hexágonos `3 × 120° = 360°`, vira ladrilho plano e nunca fecha sólido). Em sólidos com furo (como uma moldura vazada), a fronteira da convexidade é rompida e `V − A + F` dá `0` em vez de `2`.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Vértices (V) | Quinas (pontos) onde 3 ou mais arestas se encontram. |
| c2 | Arestas (A) | Costuras (segmentos) onde exatamente 2 faces se juntam. |
| c3 | Faces (F) | Polígonos planos que formam a casca do poliedro. |
| c4 | Saldo de Euler | O valor constante V − A + F = 2 nos poliedros convexos. |

### Passo 1 — `tetraedro-base`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — tetraedro inicial (`V=4` em `c1`, `A=6` em `c2`, `F=4` em `c3`) com placar `V − A + F = 2` (`c4`); seletor avança por pirâmide quadrada, cubo e octaedro. Emite `solidos_vistos`.
- **Sliders:** nenhum
- **Paco (abertura):** "No tetraedro, quanto dá 4 vértices menos 6 arestas mais 4 faces? Troque de sólido e veja se esse resultado muda."
- **Interação do aluno:** alterna entre os poliedros e vê que `V`, `A` e `F` mudam, mas `V − A + F` crava sempre em `2`.
- **Conclusão:** `solidos_vistos ≥ 3`
- **Paco (conclusão):** "4 − 6 + 4 = 2 no tetraedro, e 8 − 12 + 6 = 2 no cubo! Muda tudo, menos o saldo 2."
- **Tati (dúvida):** `fim` — P: "Por que esse saldo dá sempre 2?" / R: "Porque vértices, arestas e faces nascem amarrados: toda nova divisão acrescenta a mesma quantidade em V + F e em A."

### Passo 2 — `cortar-quina`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (dedução da invariância)
- **Widget:** WIDGET NOVO: `solido_3d` — cubo (`V=8, A=12, F=6`) com botão/slider que serra uma quina (`ΔV = +2`, `ΔA = +3`, `ΔF = +1`), atualizando para `V=10, A=15, F=7`.
- **Sliders:** `corte_quina` · "Cortar quina" · 0..1 · passo 1 · inicial 0 · c4
- **Paco (abertura):** "Se serrarmos um vértice do cubo, trocamos 1 quina por um triângulo novo. O saldo V − A + F vai mudar?"
- **Interação do aluno:** aciona o corte da quina e vê o placar somar `+2` em `V`, `+3` em `A` e `+1` em `F`.
- **Conclusão:** `corte_quina ≥ 1`
- **Paco (conclusão):** "Ganhamos 2 vértices e 1 face (+3), mas também 3 arestas (−3). Os acréscimos se anulam e o saldo continua 2."

### Passo 3 — `costura-das-arestas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6 (dedução de `2A`), 7 (fronteira dos 5 de Platão)
- **Widget:** WIDGET NOVO: `solido_3d` — cubo aberto em 6 quadrados soltos (`6 × 4 = 24` lados) que se colam dois a dois formando `A = 24 / 2 = 12` arestas (`c2`).
- **Sliders:** `colar` · "Colar lados em arestas" · 0..100 · passo 50 · inicial 0 · c2
- **Paco (abertura):** "Se o cubo tem 6 faces quadradas de 4 lados, por que ele não tem 6·4 = 24 arestas? Feche o molde para ver."
- **Interação do aluno:** fecha o molde e vê cada par de lados se fundir numa única aresta.
- **Conclusão:** `colar ≥ 100`
- **Paco (conclusão):** "Cada aresta costura exatamente 2 lados vizinhos! Por isso o total de arestas é metade da soma dos lados: A = 24 / 2 = 12."
- **Tati (dúvida):** `fim` — P: "Podemos fazer um poliedro regular só de hexágonos?" / R: "Não! Três hexágonos juntos já somam 3·120° = 360° e ficam retos no chão sem dobrar: por isso só existem 5 poliedros de Platão."

### Passo 4 — `desafio-euler`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — poliedro convexo com `F = 8` faces destacadas em `c3` e `A = 12` arestas em `c2` (octaedro).
- **Paco (abertura):** "Use a balança de Euler: V − A + F = 2."
- **Enunciado:** "Um poliedro convexo tem 8 faces e 12 arestas. Quantos vértices (V) ele possui?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `v6` | 6 | **sim** | "Isso. V − 12 + 8 = 2 ⇒ V − 4 = 2 ⇒ V = 6 vértices." | acende os 6 vértices do octaedro em `c1` |
| `v4` | 4 | não | "Você fez 12 − 8 = 4 e esqueceu o + 2 da fórmula. V = 12 − 8 + 2 = 6." | mostra a equação `V − 12 + 8 = 2` |
| `v18` | 18 | não | "Você somou 12 + 8 − 2. Na relação V − A + F = 2, temos V = 12 − 8 + 2 = 6." | destaca A com sinal negativo na fórmula |
| `v22` | 22 | não | "22 é 12 + 8 + 2. Como F soma com V, temos V = 2 + 12 − 8 = 6." | destaca os 6 vértices reais |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cubo e octaedro exibindo vértices (`c1`), arestas (`c2`) e faces (`c3`).
- **Fórmula:** `V`→c1 · `−` · `A`→c2 · `+` · `F`→c3 · `=` · `2`→c4 · `e` · `2A = ∑ lados`→c2
- **Definições:** "Relação de Euler: em todo poliedro convexo, V − A + F = 2." · "Costura das faces: cada aresta une 2 lados, logo 2A é a soma dos lados de todas as faces." · "Poliedros de Platão: apenas 5 (tetraedro, cubo, octaedro, dodecaedro e icosaedro)."
- **Paco (abertura):** "Cada costura junta dois lados e cada corte compensa arestas com faces ou vértices; por isso 2A soma os lados e V − A + F vale sempre 2."
- **Dica (hint):** "Toque em V, A ou F para iluminar as quinas, arestas ou faces no sólido."

**Frase de encerramento (outro):** "Você contou lados pela costura das arestas, testou a invariância de V − A + F = 2 e viu por que só existem 5 sólidos de Platão."

## i) Treino pós-aula

### Fáceis

#### F1 — `elementos-cubo`
- **Enunciado:** "Quantos vértices (V), arestas (A) e faces (F) tem um cubo?"
- **Conta de conferência:** V = 8, A = 12, F = 6 (8 − 12 + 6 = 2)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c8126` | V = 8, A = 12, F = 6 | **sim** | "Exato: 8 cantos, 12 arestas e 6 faces quadradas (8 − 12 + 6 = 2)." |
| `c6128` | V = 6, A = 12, F = 8 | não | "6 faces e 8 vértices foram invertidos (esse é o octaedro). No cubo: V = 8, A = 12, F = 6." |
| `c8612` | V = 8, A = 6, F = 12 | não | "6 são as faces e 12 são as arestas. O certo é V = 8, A = 12, F = 6." |

#### F2 — `achar-faces-euler`
- **Enunciado:** "Um poliedro convexo tem 6 vértices e 10 arestas. Quantas faces ele tem?"
- **Conta de conferência:** 6 − 10 + F = 2 ⇒ F = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f6` | 6 | **sim** | "Isso. 6 − 10 + F = 2 ⇒ −4 + F = 2 ⇒ F = 6 faces." |
| `f4` | 4 | não | "Você fez 10 − 6 = 4 e esqueceu de somar 2. F = 10 − 6 + 2 = 6." |
| `f14` | 14 | não | "Pela relação V − A + F = 2, temos 6 − 10 + F = 2, logo F = 6." |

#### F3 — `achar-arestas-euler`
- **Enunciado:** "Um poliedro convexo possui 5 faces e 5 vértices. Quantas arestas ele tem?"
- **Conta de conferência:** 5 − A + 5 = 2 ⇒ A = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | **sim** | "Certo. 5 − A + 5 = 2 ⇒ 10 − A = 2 ⇒ A = 8 arestas (pirâmide quadrada)." |
| `a10` | 10 | não | "10 é V + F. Descontando o 2 da fórmula de Euler: A = 5 + 5 − 2 = 8." |
| `a12` | 12 | não | "Você somou 2 em vez de subtrair. Como V + F = A + 2, temos A = 10 − 2 = 8." |

#### F4 — `costura-tetraedro`
- **Enunciado:** "Um poliedro é formado por 4 faces triangulares. Quantas arestas ele possui?"
- **Conta de conferência:** 2A = 4 · 3 = 12 ⇒ A = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Exato. 4 triângulos têm 4·3 = 12 lados; colados dois a dois, dão 12 / 2 = 6 arestas." |
| `a12` | 12 | não | "12 é o total de lados soltos. Cada aresta une 2 lados: 12 / 2 = 6." |
| `a7` | 7 | não | "Multiplique 4·3 = 12 lados e divida por 2: são 6 arestas." |

### Médias

#### M1 — `octaedro-arestas-vertices`
- **Enunciado:** "O octaedro regular tem 8 faces triangulares. Quantas arestas e quantos vértices ele tem?"
- **Conta de conferência:** A = (8·3)/2 = 12; V = 2 + 12 − 8 = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12v6` | A = 12 e V = 6 | **sim** | "Isso. A = (8·3)/2 = 12 arestas, e por Euler V = 2 + 12 − 8 = 6 vértices." |
| `a24v18` | A = 24 e V = 18 | não | "Faltou dividir os 24 lados por 2. São A = 12 arestas e V = 6 vértices." |
| `a12v8` | A = 12 e V = 8 | não | "Com A = 12 e F = 8, Euler dá V − 12 + 8 = 2 ⇒ V = 6." |

#### M2 — `faces-mistas-arestas`
- **Enunciado:** "Um poliedro convexo tem 2 faces triangulares e 3 faces quadrangulares. Quantas arestas ele tem?"
- **Conta de conferência:** soma dos lados = 2·3 + 3·4 = 6 + 12 = 18 ⇒ A = 18/2 = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9` | 9 | **sim** | "Certo. Lados = 2·3 + 3·4 = 18; dividindo por 2, temos A = 9 arestas." |
| `a18` | 18 | não | "18 é a soma dos lados antes de colar. Dividindo por 2: A = 9 arestas." |
| `a5` | 5 | não | "5 é o número de faces (2 + 3). Pelos lados: (6 + 12) / 2 = 9 arestas." |

#### M3 — `dodecaedro-vertices`
- **Enunciado:** "O dodecaedro regular tem 12 faces pentagonais (5 lados cada). Quantos vértices ele tem?"
- **Conta de conferência:** A = (12·5)/2 = 30; V = 2 + 30 − 12 = 20

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v20` | 20 | **sim** | "Exato. A = (12·5)/2 = 30 arestas; por Euler, V = 2 + 30 − 12 = 20 vértices." |
| `v30` | 30 | não | "30 é o número de arestas. Usando V − 30 + 12 = 2, achamos V = 20 vértices." |
| `v12` | 12 | não | "12 é o número de faces. Com A = 30, temos V = 2 + 30 − 12 = 20." |

### Desafios

#### D1 — `faces-quadrangulares-e-triangulares`
- **Enunciado:** "Um poliedro convexo tem 4 faces triangulares e 5 faces quadrangulares. Quantos vértices ele possui?"
- **Fala do Paco:** "Primeiro ache as arestas somando os lados e dividindo por 2; depois aplique Euler."
- **Conta de conferência:** F = 4 + 5 = 9; 2A = 4·3 + 5·4 = 32 ⇒ A = 16; V = 2 + 16 − 9 = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v9` | 9 | **sim** | "Isso. F = 9 e A = (12 + 20)/2 = 16; logo V = 2 + 16 − 9 = 9 vértices." |
| `v16` | 16 | não | "16 é o número de arestas. Com F = 9, Euler dá V = 2 + 16 − 9 = 9." |
| `v7` | 7 | não | "Você esqueceu de somar 2 na relação de Euler: V = 16 − 9 + 2 = 9." |

#### D2 — `arestas-pelos-vertices`
- **Enunciado:** "Em um poliedro convexo de 8 vértices, de cada vértice partem exatamente 3 arestas. Quantas faces ele tem?"
- **Conta de conferência:** cada aresta tem 2 pontas ⇒ 2A = 8·3 = 24 ⇒ A = 12; F = 2 + 12 − 8 = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f6` | 6 | **sim** | "Exato. Como cada aresta liga 2 vértices, A = (8·3)/2 = 12; logo F = 2 + 12 − 8 = 6." |
| `f12` | 12 | não | "12 é o número de arestas. Aplicando V − A + F = 2: 8 − 12 + F = 2 ⇒ F = 6." |
| `f18` | 18 | não | "Você usou A = 24 sem dividir por 2. Com A = 12, temos F = 6 faces." |

#### D3 — `cubo-truncado-todos-vertices`
- **Enunciado:** "Se serrarmos TODAS as 8 quinas de um cubo (criando 8 novas faces triangulares sem se tocarem), quantas faces terá o novo sólido?"
- **Conta de conferência:** 6 faces originais + 8 novas faces nos cantos = 14 faces

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f14` | 14 | **sim** | "Certo. As 6 faces do cubo continuam lá (viram octógonos) e ganham mais 8 triângulos: 6 + 8 = 14." |
| `f8` | 8 | não | "8 são só os triângulos novos nas quinas. Somando as 6 faces originais: 14." |
| `f12` | 12 | não | "São 6 faces originais mais 8 quinas cortadas: 6 + 8 = 14 faces." |

#### D4 — `fronteira-hexagonos-regulares`
- **Enunciado:** "Por que não existe poliedro regular feito apenas de hexágonos regulares (ângulo interno 120°)?"
- **Conta de conferência:** 3 · 120° = 360° (fica plano, não fecha quina 3D)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g360` | 3 hexágonos num vértice já somam 360° e ficam planos | **sim** | "Exato. Com 3·120° = 360° o encontro vira ladrilho plano e não dobra no espaço." |
| `impar` | Porque 6 é número par | não | "O quadrado tem 4 lados (par) e forma o cubo. O limite é que 3·120° = 360° fica plano." |
| `euler` | Porque hexágonos não têm diagonal | não | "Eles têm diagonais; o bloqueio é que 3 ângulos de 120° já somam 360° no vértice." |

#### D5 — `bola-de-futebol-truncada`
- **Enunciado:** "Uma bola de futebol clássica tem 12 faces pentagonais e 20 hexagonais (F = 32). Quantas costuras (arestas) ela possui?"
- **Fala do Paco:** "Some os lados dos 12 pentágonos e dos 20 hexágonos e divida por 2!"
- **Conta de conferência:** 2A = 12·5 + 20·6 = 60 + 120 = 180 ⇒ A = 90

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a90` | 90 | **sim** | "Exato. Lados = 12·5 + 20·6 = 180; como cada costura une 2 lados, A = 180 / 2 = 90." |
| `a180` | 180 | não | "180 é a soma dos lados soltos. Dividindo por 2 costuras por aresta: 90." |
| `a60` | 60 | não | "60 são os vértices (2 + 90 − 32). O número de arestas é (60 + 120)/2 = 90." |

### Vestibular

#### V1 — `enem-2019-tetraedro-truncado`
- **Enunciado (resumido):** Corta-se cada quina de um tetraedro regular removendo 1/3 das arestas em cada corte paralelo à face oposta. Quais faces terá o sólido?
- **Fala do Paco:** "Conte quantos vértices foram cortados (novos triângulos) e quantos lados sobram em cada face antiga."
- **Fonte:** ENEM 2019, Questão 157 — `https://api.enem.dev/v1/exams/2019/questions/157`
- **Adaptação:** enunciado resumido; alternativas e gabarito (4 hexágonos regulares e 4 triângulos equiláteros) mantidos.
- **Conta de conferência:** 4 vértices cortados => 4 triângulos equiláteros; 4 faces originais perdem 3 cantos => 4 hexágonos regulares.
- **Opções e feedback:** 4 hex + 4 tri eq (correta), 2 hex + 4 tri eq, 4 quad + 4 tri isósc, 3 quad + 4 tri isósc, 3 hex + 4 tri eq.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular vértices e arestas de um poliedro truncado (ex.: icosaedro truncado / fulereno C60).
- **Onde procurar:** ENEM, Unicamp, UFPR ("bola de futebol", "fulereno").

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar o número de arestas que concorrem em cada vértice com `2A`.
- **Onde procurar:** Fuvest, Unifesp, UFMG.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar propriedades e dualidade entre os 5 Poliedros de Platão.
- **Onde procurar:** ENEM, UFRGS, UECE.
