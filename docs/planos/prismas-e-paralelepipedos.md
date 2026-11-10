# Plano — Prismas e paralelepípedos

**Aula:** 1 — Empilhar Fatias Iguais · Área, volume e diagonal de prismas e blocos
**Caminho:** geometria / geometria-espacial / prismas-e-paralelepipedos
**Pré-requisitos que o aluno já domina:** `poliedros-e-relacao-de-euler`, `perimetro-e-area-de-figuras-planas`, `teorema-de-pitagoras`.

## a) Ancoragem mecânica
O prisma reto funciona como um elevador geométrico: um polígono de área `A_b` entra no piso e sobe sem afunilar por uma altura `h` (variável independente), empilhando camadas idênticas até produzir o volume `V = A_b · h`. Nas paredes laterais, cada lado da base levanta um retângulo de altura `h`, enquanto no paralelepípedo `a × b × c` dois triângulos retângulos encadeados (um no chão e outro em pé) determinam a diagonal espacial `D = √(a² + b² + c²)`.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo prismas) — base poligonal quadriculada no piso que se eleva em camadas de cubos unitários conforme o slider de altura `h`, seletor de base (retangular `a × b`, triangular, hexagonal), botão de abrir a planificação lateral e destaque interno da diagonal do piso `d` e da diagonal espacial `D`.

## c) Caso neutro
A camada unitária `h = 1` (ou o cubo `1 × 1 × 1`): quando a altura vale `1`, o número de cubos de volume é numericamente idêntico à própria área da base (`V = A_b · 1`). Subir `h` apenas multiplica essa primeira camada pelo número de andares.

## d) Panorama e recorte
Estudamos paralelepípedo retângulo, cubo, prismas retos de base triangular, quadrangular e hexagonal regular, área lateral, área total, volume `V = A_b · h`, princípio de Cavalieri e diagonal do bloco. Deixamos prismas truncados para capítulos avançados.

## e) Progressão por contraste
1. Camada única `h = 1` sobre base `3 × 4` (`12` cubinhos, igual à área da base) como referência.
2. Subir para `h = 5` andares: a base não muda, e o volume multiplica por 5 (`12 · 5 = 60`).
3. Trocar a base retangular por triangular ou hexagonal: a fórmula da base muda, mas a regra do volume continua sendo `A_b · h`.
4. Diagonal da face no chão `d = √(a² + b²)` (Pitágoras 2D) contra a diagonal espacial `D = √(d² + c²) = √(a² + b² + c²)` que atravessa o bloco por dentro.

## f) Dedução causal da forma
Como as arestas laterais sobem paralelas entre si, toda fatia horizontal tem exatamente a mesma área `A_b` da base; empilhar `h` unidades de altura acumula `V = A_b · h`. Ao abrir as paredes laterais num plano, os retângulos de altura `h` ficam lado a lado formando um único retângulo comprido de base igual ao perímetro da base (`2p_b · h`). E para achar a diagonal `D` do bloco `a × b × c`, aplicamos Pitágoras no chão (`d² = a² + b²`) e, como a aresta vertical `c` faz `90°` com o chão, aplicamos Pitágoras de novo no triângulo vertical: `D² = d² + c² = a² + b² + c²`.

## g) Simulação espacial e fronteiras
Inclinar a pilha de fatias para o lado (prisma oblíquo / princípio de Cavalieri) mantém a área de cada fatia `A_b` e a altura vertical `h`, conservando o volume `V = A_b · h`, mas estica as arestas laterais (que deixam de medir `h`). Em problemas reais de caixas ou piscinas abertas no topo, a área total perde `1` base (`A = A_b + A_l`, e não `2A_b + A_l`).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Área da base (A_b) | Quantidade de quadrados unitários no piso do prisma. |
| c2 | Altura (h) | Distância vertical entre as duas bases paralelas. |
| c3 | Área lateral (A_l) | Soma dos retângulos que formam as paredes verticais. |
| c4 | Diagonal espacial (D) | Segmento que atravessa o interior de um canto ao canto oposto. |

### Passo 1 — `empilhar-camadas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (h como entrada), 2 (visual), 3 (caso neutro h = 1), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — base retangular `4 × 3` (`A_b = 12` em `c1`) começando no caso neutro de `1` camada (`h = 1`, `V = 12` fantasma); slider ergue até `h = 5` camadas.
- **Sliders:** `h` · "Andares de altura (h)" · 1..5 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Com 1 andar de altura, cabem 12 cubinhos — o mesmo número da área da base. Se subirmos para 4 andares, quantos cubinhos teremos?"
- **Interação do aluno:** sobe `h` até 4 e vê 4 camadas iguais de 12 cubos totalizarem 48.
- **Conclusão:** `h ≥ 4`
- **Paco (conclusão):** "Cada andar repete os mesmos 12 cubos da base: 12 · 4 = 48. Volume de prisma é sempre área da base vezes altura."
- **Tati (dúvida):** `fim` — P: "Vale mesmo se a base for um triângulo ou um hexágono?" / R: "Vale para qualquer prisma! Só muda como você calcula a área do piso, porque todas as fatias até o teto continuam iguais à base."

### Passo 2 — `paredes-e-tampas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste área lateral × total)
- **Widget:** WIDGET NOVO: `solido_3d` — prisma triangular reto de lados da base `3, 4, 5` (`A_b = 6` em `c1`) e altura `h = 4` (`c2`) que abre as 3 paredes numa faixa retangular `(3+4+5) × 4` (`c3`).
- **Sliders:** `abrir` · "Abrir paredes" · 0..100 · passo 25 · inicial 0 · c3
- **Paco (abertura):** "Ao abrir as 3 paredes de altura 4 em volta da base de lados 3, 4 e 5, que figura plana aparece?"
- **Interação do aluno:** abre a planificação e vê um retângulo único de largura `3 + 4 + 5 = 12` e altura `4` (`A_l = 48`).
- **Conclusão:** `abrir ≥ 100`
- **Paco (conclusão):** "As paredes formam um retângulo de largura igual ao perímetro da base (12 · 4 = 48), mais as 2 tampas de área 6."

### Passo 3 — `diagonal-do-bloco`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (2D vs 3D), 6 (dedução por Pitágoras duplo), 7 (fronteira)
- **Widget:** WIDGET NOVO: `solido_3d` — paralelepípedo transparente `3 × 4 × 12` com o triângulo do chão (`3, 4` → diagonal `d = 5` em `c1`) e o triângulo vertical (`d = 5`, altura `12` em `c2` → diagonal espacial `D = 13` em `c4`). Emite `etapa_pitagoras`.
- **Sliders:** `etapa_pitagoras` · "Destacar Pitágoras" · 1..2 · passo 1 · inicial 1 · c4
- **Paco (abertura):** "No chão 3 por 4, a diagonal mede 5. Agora suba 12 na vertical até o teto: quanto mede a diagonal D que corta o ar?"
- **Interação do aluno:** ativa o 2º triângulo retângulo em pé (catetos 5 e 12) e lê a hipotenusa `D = 13`.
- **Conclusão:** `etapa_pitagoras ≥ 2`
- **Paco (conclusão):** "A diagonal do chão (5) e a altura (12) formam outro triângulo retângulo: 5² + 12² = 169, logo D = 13!"
- **Tati (dúvida):** `fim` — P: "E se uma caixa não tiver tampa, o que muda?" / R: "O volume não muda nada, mas na área da superfície contamos só 1 base (o fundo) em vez de 2."

### Passo 4 — `desafio-prisma`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — bloco retangular de base `5 cm × 2 cm` (`A_b = 10` em `c1`) e altura `h = 6 cm` (`c2`).
- **Paco (abertura):** "Calcule primeiro quantos quadradinhos cabem no piso."
- **Enunciado:** "Qual é o volume de um paralelepípedo retângulo de dimensões 5 cm, 2 cm e 6 cm?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `v60` | 60 cm³ | **sim** | "Exato. A base tem 5·2 = 10 cm²; empilhando 6 andares, V = 10·6 = 60 cm³." | preenche os 6 andares de 10 cubinhos |
| `v13` | 13 cm³ | não | "Você somou 5 + 2 + 6 = 13. Para empilhar camadas, multiplique: 5·2·6 = 60 cm³." | destaca a camada da base `5 × 2 = 10` |
| `v104` | 104 cm² | não | "104 é a área total das 6 faces. O volume é o produto das 3 dimensões: 60 cm³." | alterna da casca externa para os cubos internos |
| `v30` | 30 cm³ | não | "Você dividiu por 2 como se fosse triângulo. No bloco retangular, 5·2·6 = 60 cm³." | mostra a base retangular completa `5 × 2 = 10` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — prisma reto e paralelepípedo mostrando base (`c1`), altura (`c2`), paredes (`c3`) e diagonal (`c4`).
- **Fórmula:** `V` · `=` · `A_b`→c1 · `·` · `h`→c2 · `;` · `D`→c4 · `=` · `√(a² + b² + c²)`
- **Definições:** "Volume do prisma: área da base multiplicada pela altura (V = A_b · h)." · "Área total: soma da área lateral com as duas bases (A_t = A_l + 2·A_b)." · "Diagonal do paralelepípedo: Pitágoras nas 3 dimensões, D = √(a² + b² + c²)."
- **Paco (abertura):** "Toda fatia horizontal do prisma repete a base e a altura faz 90° com a diagonal do piso; por isso V = A_b · h e D² = a² + b² + c²."
- **Dica (hint):** "Toque em cada símbolo para iluminar a base, a altura ou a diagonal no bloco."

**Frase de encerramento (outro):** "Você empilhou fatias para achar o volume, abriu as paredes laterais e usou Pitágoras duas vezes para medir a diagonal 3D."

## i) Treino pós-aula

### Fáceis

#### F1 — `volume-cubo-4`
- **Enunciado:** "Qual é o volume de um cubo de aresta 4 cm?"
- **Conta de conferência:** 4³ = 4 · 4 · 4 = 64 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v64` | 64 cm³ | **sim** | "Isso. Base 4·4 = 16 cm² vezes altura 4 cm: V = 64 cm³." |
| `v12` | 12 cm³ | não | "Você fez 4·3 = 12. O volume é 4·4·4 = 64 cm³." |
| `v16` | 16 cm³ | não | "16 cm² é a área de 1 face. Multiplicando pela altura 4: 64 cm³." |
| `v96` | 96 cm³ | não | "96 cm² é a área total das 6 faces (6·16). O volume é 4³ = 64 cm³." |

#### F2 — `volume-prisma-base-pronta`
- **Enunciado:** "Um prisma reto tem base de área 15 cm² e altura de 6 cm. Qual é o seu volume?"
- **Conta de conferência:** V = A_b · h = 15 · 6 = 90 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v90` | 90 cm³ | **sim** | "Certo. V = A_b · h = 15 · 6 = 90 cm³." |
| `v21` | 21 cm³ | não | "Você somou 15 + 6. O volume multiplica base por altura: 15·6 = 90 cm³." |
| `v30` | 30 cm³ | não | "30 seria se dividisse por 3 (pirâmide). No prisma, V = 15·6 = 90 cm³." |

#### F3 — `area-total-cubo-3`
- **Enunciado:** "Qual é a área total da superfície de um cubo de aresta 3 cm?"
- **Conta de conferência:** 6 faces · 3² = 6 · 9 = 54 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a54` | 54 cm² | **sim** | "Exato. Cada uma das 6 faces tem área 3² = 9 cm², dando 6·9 = 54 cm²." |
| `a27` | 27 cm² | não | "27 cm³ é o volume (3³). A área total das 6 faces é 6·9 = 54 cm²." |
| `a9` | 9 cm² | não | "9 cm² é apenas 1 face. Nas 6 faces do cubo são 6·9 = 54 cm²." |
| `a36` | 36 cm² | não | "36 cm² são só as 4 paredes laterais. Com fundo e tampa (6 faces), dá 54 cm²." |

#### F4 — `area-lateral-prisma-quadrado`
- **Enunciado:** "Um prisma reto de base quadrada de lado 5 cm tem altura 10 cm. Qual é a sua área lateral?"
- **Conta de conferência:** 4 paredes retangulares de 5 × 10 = 4 · 50 = 200 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a200` | 200 cm² | **sim** | "Isso. São 4 paredes de 5·10 = 50 cm² cada: 4·50 = 200 cm²." |
| `a50` | 50 cm² | não | "50 cm² é apenas 1 parede lateral. Nas 4 paredes são 4·50 = 200 cm²." |
| `a250` | 250 cm² | não | "250 é o volume (25·10). A área lateral das 4 paredes é 4·(5·10) = 200 cm²." |

### Médias

#### M1 — `prisma-triangular-volume`
- **Enunciado:** "Um prisma reto tem como base um triângulo retângulo de catetos 3 cm e 4 cm, e altura 10 cm. Qual é o seu volume?"
- **Conta de conferência:** A_b = (3·4)/2 = 6 cm²; V = 6 · 10 = 60 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v60` | 60 cm³ | **sim** | "Certo. A base triangular tem área (3·4)/2 = 6 cm², e V = 6·10 = 60 cm³." |
| `v120` | 120 cm³ | não | "Você esqueceu de dividir a área do triângulo por 2: A_b = 6, logo V = 60 cm³." |
| `v20` | 20 cm³ | não | "Não divida por 3 (é prisma, não pirâmide). A_b = 6 e V = 6·10 = 60 cm³." |

#### M2 — `diagonal-paralelepipedo`
- **Enunciado:** "Quanto mede a diagonal espacial de um paralelepípedo retângulo de dimensões 2 cm, 3 cm e 6 cm?"
- **Conta de conferência:** D = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d7` | 7 cm | **sim** | "Exato. D = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7 cm." |
| `d11` | 11 cm | não | "11 é a soma das arestas 2 + 3 + 6. Por Pitágoras 3D, √(4 + 9 + 36) = 7 cm." |
| `d49` | 49 cm | não | "49 é D²; tirando a raiz quadrada, D = √49 = 7 cm." |

#### M3 — `altura-pelo-volume`
- **Enunciado:** "Um reservatório em forma de bloco retangular tem base de 5 m por 4 m e contém 60 m³ de água. Qual é a altura da água?"
- **Conta de conferência:** A_b = 5·4 = 20 m² ⇒ 20·h = 60 ⇒ h = 3 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h3` | 3 m | **sim** | "Isso. A base tem 5·4 = 20 m²; dividindo 60 m³ por 20 m², a altura é 3 m." |
| `h6` | 6 m | não | "A base mede 5·4 = 20 m² (não 10). Logo h = 60 / 20 = 3 m." |
| `h12` | 12 m | não | "Você dividiu só por 5. Dividindo pela área da base 20 m², h = 3 m." |

### Desafios

#### D1 — `diagonal-do-cubo`
- **Enunciado:** "Qual é a medida da diagonal espacial D de um cubo de aresta 5 cm?"
- **Fala do Paco:** "No cubo as três dimensões são iguais: a = b = c = 5."
- **Conta de conferência:** D = √(5² + 5² + 5²) = √(3 · 25) = 5√3 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5r3` | 5√3 cm | **sim** | "Exato. D = √(5² + 5² + 5²) = √(3·25) = 5√3 cm." |
| `d5r2` | 5√2 cm | não | "5√2 é a diagonal de uma face (2D). A diagonal espacial do cubo é 5√3 cm." |
| `d15` | 15 cm | não | "Não some 5 + 5 + 5; some os quadrados: √(25 + 25 + 25) = 5√3 cm." |

#### D2 — `caixa-sem-tampa`
- **Enunciado:** "Uma piscina aberta no topo tem 4 m de comprimento, 3 m de largura e 2 m de profundidade. Qual é a área total azulejada (fundo + 4 paredes)?"
- **Conta de conferência:** fundo = 4·3 = 12 m²; paredes = 2·(4·2) + 2·(3·2) = 16 + 12 = 28 m²; total = 12 + 28 = 40 m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a40` | 40 m² | **sim** | "Certo. Fundo 4·3 = 12 m² mais as 4 paredes (16 + 12 = 28 m²) dão 40 m²." |
| `a52` | 52 m² | não | "52 m² inclui uma tampa no topo! Como a piscina é aberta, descontamos 12 m²: 40 m²." |
| `a28` | 28 m² | não | "28 m² são só as 4 paredes; somando o fundo de 12 m², temos 40 m²." |

#### D3 — `escala-dobrar-aresta-cubo`
- **Enunciado:** "Se dobrarmos a aresta de um cubo (multiplicar por 2), a sua área total e o seu volume ficam multiplicados, respectivamente, por:"
- **Conta de conferência:** área escala com k² = 2² = 4; volume escala com k³ = 2³ = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k48` | 4 e 8 | **sim** | "Exato. A área depende do quadrado (2² = 4) e o volume do cubo da escala (2³ = 8)." |
| `k22` | 2 e 2 | não | "Dobrar as 3 dimensões multiplica a área por 2² = 4 e o volume por 2³ = 8." |
| `k24` | 2 e 4 | não | "Área é 2D (multiplica por 2² = 4) e volume é 3D (multiplica por 2³ = 8)." |

#### D4 — `prisma-hexagonal-regular`
- **Enunciado:** "A base de um prisma reto é um hexágono regular composto por 6 triângulos equiláteros de área 4 cm² cada. Se a altura é 5 cm, qual é o volume?"
- **Conta de conferência:** A_b = 6 · 4 = 24 cm²; V = 24 · 5 = 120 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v120` | 120 cm³ | **sim** | "Isso. A base hexagonal tem área 6·4 = 24 cm², e V = 24·5 = 120 cm³." |
| `v20` | 20 cm³ | não | "20 cm³ é o volume sobre 1 triângulo só. Nos 6 triângulos do hexágono: 6·20 = 120 cm³." |
| `v40` | 40 cm³ | não | "Não divida por 3 (é prisma). A_b = 24 cm² e V = 24·5 = 120 cm³." |

#### D5 — `nivel-agua-pedra-arquimedes`
- **Enunciado:** "Um aquário retangular de base 20 cm × 15 cm tem água parcialmente cheia. Ao mergulhar totalmente uma pedra, o nível da água sobe 2 cm. Qual é o volume da pedra?"
- **Fala do Paco:** "O volume da pedra é exatamente a fatia de água de altura 2 cm que subiu!"
- **Conta de conferência:** V_pedra = A_b · Δh = (20 · 15) · 2 = 300 · 2 = 600 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v600` | 600 cm³ | **sim** | "Exato. A água deslocada forma um prisma de base 20·15 = 300 cm² e altura 2 cm: 600 cm³." |
| `v300` | 300 cm³ | não | "300 cm² é a área da base (ou subida de 1 cm). Com subida de 2 cm: 300·2 = 600 cm³." |
| `v70` | 70 cm³ | não | "Multiplique a área da base pela subida do nível: 20·15·2 = 600 cm³." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular volume e capacidade (em litros) de reservatórios paralelepipédicos.
- **Onde procurar:** ENEM (questões de cisternas, caixas-d'água e piscinas).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular área de papelão/azulejo em prismas com ou sem tampa.
- **Onde procurar:** ENEM, Unesp, Unicamp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar a diagonal do paralelepípedo ou cubo em problemas geométricos.
- **Onde procurar:** Fuvest, UFRGS, UFPR.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** variação do nível de líquido em prisma ao imergir objetos (princípio de Arquimedes).
- **Onde procurar:** ENEM, Unicamp, UERJ.
