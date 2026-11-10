# Plano — Vetores no plano e operações

**Aula:** 1 — Setas que se Encaixam · Vetores, soma, escalar e módulo
**Caminho:** geometria / geometria-analitica / vetores-no-plano
**Pré-requisitos que o aluno já domina:** coordenadas, distância entre pontos (Pitágoras).

## a) Ancoragem mecânica
A máquina recebe deslocamentos (setas) e devolve o deslocamento total. Um vetor (a; b) é a ordem "ande a na horizontal e b na vertical", em qualquer lugar do plano. Somar vetores é fazer um deslocamento depois do outro; multiplicar por um número k estica ou inverte a seta. Os componentes são as entradas; a seta resultante e seu comprimento são as saídas.

## b) Visual de partida
WIDGET NOVO `vetores_no_plano`: plano com malha; setas com cauda e ponta arrastáveis (encaixe em inteiros). Cada seta mostra seus componentes como degraus (c1 horizontal, c2 vertical). A soma aparece como seta resultante (c3) ligando a cauda da primeira à ponta da última. Sliders opcionais para k. Métricas: `origens_vistas`, `v_comprimento`, `k`, `modulo_ligado`.

## c) Caso neutro
O vetor nulo (0; 0) é "não andar": somá-lo a u deixa u igual. Na tela, v começa nulo e a soma coincide com u. Depois v ganha comprimento.

## d) Panorama e recorte
Vetores descrevem força, velocidade e deslocamento, e existem em 3D; há produto escalar e ângulo entre vetores. Aqui: vetores no plano, soma, subtração, produto por número e módulo.

## e) Progressão por contraste
1. Mesmo vetor em vários pontos de partida: seta igual, lugar diferente (referência).
2. v nulo: u + v = u; v cresce: a soma anda componente a componente.
3. k · u: k = 2 estica; k negativo inverte; k = 0 zera.
4. Módulo: os componentes são os catetos; o comprimento é a hipotenusa.

## f) Dedução causal da forma
Andar a₁ e depois a₂ na horizontal é andar a₁ + a₂; o mesmo vale na vertical, e as duas direções não se misturam. Por isso (a; b) + (c; d) = (a + c; b + d). Repetir u k vezes multiplica cada componente: k(a; b) = (ka; kb). E como os componentes formam um ângulo reto, |u| = √(a² + b²).

## g) Simulação espacial e fronteiras
k negativo vira a seta para o lado oposto; k = 0 dá o vetor nulo. u + (−u) = (0; 0). Vetores paralelos são múltiplos um do outro. Percorrer os lados de um triângulo e voltar ao início soma zero.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Componente horizontal | Quanto o vetor anda em x (a, em (a; b)). |
| c2 | Componente vertical | Quanto o vetor anda em y (b, em (a; b)). |
| c3 | Resultante | A seta da soma: da cauda da primeira à ponta da última. |
| c4 | Módulo | Comprimento da seta: √(a² + b²). |

### Passo 1 — `mesmo-vetor`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 4 (panorama)
- **Widget:** WIDGET NOVO `vetores_no_plano` — u = (3; 1) com degraus c1 e c2; a cauda é arrastável e a seta acompanha sem mudar. Emite `origens_vistas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Esta seta manda andar 3 para a direita e 1 para cima. Se você mudar o ponto de partida, a seta muda?"
- **Interação do aluno:** arrasta a cauda por três lugares diferentes.
- **Conclusão:** `origens_vistas ≥ 3`
- **Paco (conclusão):** "Muda de lugar, não de efeito: é sempre (3; 1). Um vetor é um deslocamento, não um lugar."
- **Tati (dúvida):** `fim` — P: "Para que servem vetores?" / R: "Força, velocidade, deslocamento, até em 3D. Hoje: somar, esticar e medir no plano."

### Passo 2 — `somar-encaixando`
- **Tipo:** `interactive_canvas`
- **Pilares:** 3 (caso neutro), 6
- **Widget:** `vetores_no_plano` — u = (3; 1); v começa nulo, com a cauda presa na ponta de u e a ponta arrastável; resultante u + v em c3.
- **Sliders:** nenhum
- **Paco (abertura):** "v começa nulo: quanto dá u + v? Agora arraste a ponta de v e veja a soma andar."
- **Interação do aluno:** vê a resultante sobre u e depois puxa v até (1; 2).
- **Conclusão:** `v_comprimento ≥ 2`
- **Paco (conclusão):** "Com v nulo, u + v = u. Com v = (1; 2), a soma chega em (4; 3): componente com componente."

### Passo 3 — `esticar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7
- **Widget:** `vetores_no_plano` — u = (3; 1) em cinza e k · u em c3.
- **Sliders:** `k` · "Multiplica por k" · −2..3 · passo 1 · inicial 1 · c3
- **Paco (abertura):** "Multiplique u por k. Com k = 2, a seta muda de direção ou só de tamanho?"
- **Interação do aluno:** move k até 2 e depois experimenta valores negativos.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Só de tamanho: 2u = (6; 2), mesma direção e o dobro do comprimento."
- **Tati (dúvida):** `fim` — P: "E com k negativo?" / R: "A seta vira para o lado oposto. Com k = 0, vira o vetor nulo, um ponto."

### Passo 4 — `modulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 2
- **Widget:** `vetores_no_plano` — w = (3; 4); chave "módulo" desenha os degraus como catetos e mostra |w| (c4). Emite `modulo_ligado`.
- **Sliders:** nenhum
- **Paco (abertura):** "Quanto mede a seta (3; 4)? Os componentes formam os degraus de um triângulo."
- **Interação do aluno:** liga a chave e vê o triângulo 3, 4, 5.
- **Conclusão:** `modulo_ligado ≥ 1`
- **Paco (conclusão):** "Módulo √(9 + 16) = 5: o comprimento é a hipotenusa dos componentes."

### Passo 5 — `desafio-soma`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `vetores_figura` — u = (2; 3) e v = (4; −1) partindo da origem.
- **Paco (abertura):** "Encaixe v na ponta de u de cabeça."
- **Enunciado:** "Quanto vale u + v, com u = (2; 3) e v = (4; −1)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `s62` | (6; 2) | **sim** | "Isso. 2 + 4 e 3 + (−1)." | v encaixado na ponta de u, resultante em c3 |
| `s8m3` | (8; −3) | não | "Isso multiplica componentes. A soma é (2 + 4; 3 − 1) = (6; 2)." | componentes lado a lado com sinal de + |
| `s2m4` | (2; −4) | não | "Isso é v − u. A soma é (6; 2)." | seta de u para v piscando |
| `s64` | (6; 4) | não | "O −1 de v desce. 3 + (−1) = 2: (6; 2)." | degrau vertical de v acendendo para baixo |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `vetores_figura` — u, v encaixados e a resultante.
- **Fórmula:** `|u|`→c4 · `=` · `√(` · `a²`→c1 · `+` · `b²`→c2 · `)` (a soma u + v aparece nas definições)
- **Definições:** "Vetor: deslocamento (a; b), igual em qualquer ponto de partida." · "Soma: ponta com cauda, componente com componente." · "Produto por k: k(a; b) = (ka; kb)."
- **Paco (abertura):** "Horizontal e vertical não se misturam. Por isso a soma é componente com componente, e o módulo é Pitágoras."
- **Dica (hint):** "Toque em uma parte da fórmula para ver a seta no plano."

**Frase de encerramento (outro):** "Você encaixou setas: vetores somam componente com componente, k estica ou inverte, e o módulo é a hipotenusa."

## i) Treino pós-aula

### Fáceis

#### F1 — `soma-simples`
- **Enunciado:** "Quanto vale (1; 2) + (3; 4)?"
- **Conta de conferência:** (4; 6)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s46` | (4; 6) | **sim** | "Isso. 1 + 3 e 2 + 4." |
| `s38` | (3; 8) | não | "Isso multiplica. A soma é (4; 6)." |
| `s10` | 10 | não | "Vetor somado é vetor: (4; 6)." |
| `s22` | (2; 2) | não | "Isso é a diferença. A soma é (4; 6)." |

#### F2 — `dobro`
- **Enunciado:** "Quanto vale 2 · (1; 3)?"
- **Conta de conferência:** (2; 6)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s26` | (2; 6) | **sim** | "Certo. Cada componente dobra." |
| `s23` | (2; 3) | não | "O 3 também dobra: (2; 6)." |
| `s35` | (3; 5) | não | "Somar 2 não é multiplicar. 2 · (1; 3) = (2; 6)." |
| `s16` | (1; 6) | não | "O 1 também dobra: (2; 6)." |

#### F3 — `modulo-vertical`
- **Enunciado:** "Qual o módulo do vetor (0; 5)?"
- **Conta de conferência:** 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. Só anda na vertical." |
| `a0` | 0 | não | "Ele anda 5 para cima: módulo 5." |
| `a25` | 25 | não | "25 é o quadrado. Módulo 5." |
| `a-raiz5` | √5 | não | "√(0 + 25) = 5." |

#### F4 — `vetor-ab`
- **Enunciado:** "Qual o vetor que leva A(1; 1) até B(4; 3)?"
- **Conta de conferência:** B − A = (3; 2)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s32` | (3; 2) | **sim** | "Certo. Ponta menos cauda." |
| `s54` | (5; 4) | não | "Isso soma os pontos. O vetor é B − A = (3; 2)." |
| `sm3m2` | (−3; −2) | não | "Isso vai de B para A. De A para B: (3; 2)." |
| `s43` | (4; 3) | não | "(4; 3) é o ponto B. O deslocamento é (3; 2)." |

### Médias

#### M1 — `modulo-6-8`
- **Enunciado:** "Qual o módulo do vetor (6; 8)?"
- **Conta de conferência:** √(36 + 64) = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Isso. √100." |
| `a14` | 14 | não | "14 soma os componentes. √(36 + 64) = 10." |
| `a100` | 100 | não | "100 é o quadrado do módulo. Módulo 10." |
| `a2` | 2 | não | "8 − 6 não é módulo. Pitágoras: 10." |

#### M2 — `subtracao`
- **Enunciado:** "Quanto vale (5; 2) − (1; 3)?"
- **Conta de conferência:** (4; −1)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s4m1` | (4; −1) | **sim** | "Certo. 5 − 1 e 2 − 3." |
| `s41` | (4; 1) | não | "2 − 3 = −1: (4; −1)." |
| `s65` | (6; 5) | não | "Isso é a soma. A diferença é (4; −1)." |
| `sm41` | (−4; 1) | não | "Isso é (1; 3) − (5; 2). Pedido: (4; −1)." |

#### M3 — `oposto`
- **Enunciado:** "Quanto vale −1 · (2; −3)?"
- **Conta de conferência:** (−2; 3)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sm23` | (−2; 3) | **sim** | "Isso. A seta vira para o lado oposto." |
| `s2m3` | (2; −3) | não | "Multiplicar por −1 troca os dois sinais: (−2; 3)." |
| `sm2m3` | (−2; −3) | não | "O −3 também troca de sinal: (−2; 3)." |
| `s13` | (1; −4) | não | "Somar −1 não é multiplicar. (−2; 3)." |

### Desafios

#### D1 — `achar-oposto`
- **Enunciado:** "Com u = (3; −2), qual vetor v faz u + v = (0; 0)?"
- **Conta de conferência:** v = −u = (−3; 2)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sm32` | (−3; 2) | **sim** | "Certo. O oposto anula o deslocamento." |
| `s3m2` | (3; −2) | não | "u + u = (6; −4). Para voltar ao início: (−3; 2)." |
| `s00` | (0; 0) | não | "Com v nulo, a soma seria u. Precisa de (−3; 2)." |
| `s23` | (2; 3) | não | "Trocar a ordem não anula. v = (−3; 2)." |

#### D2 — `qual-k`
- **Enunciado:** "Para qual k temos k · (2; 1) = (6; 3)?"
- **Conta de conferência:** k = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k3` | 3 | **sim** | "Isso. 2 · 3 = 6 e 1 · 3 = 3." |
| `k4` | 4 | não | "4 é 6 − 2. O fator é 3." |
| `k2` | 2 | não | "Com k = 2 dá (4; 2). Precisa k = 3." |
| `k6` | 6 | não | "Com k = 6 dá (12; 6). k = 3." |

#### D3 — `modulo-da-soma`
- **Enunciado:** "Qual o módulo de (1; 2) + (2; 2)?"
- **Conta de conferência:** (3; 4): 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. A soma é (3; 4), de módulo 5." |
| `a7` | 7 | não | "7 soma os componentes. |(3; 4)| = 5." |
| `soma-modulos` | √5 + √8 | não | "Módulos não se somam assim. Some os vetores primeiro: |(3; 4)| = 5." |
| `a25` | 25 | não | "25 é o quadrado. Módulo 5." |

#### D4 — `mesma-direcao`
- **Enunciado:** "Qual destes vetores tem a mesma direção e sentido de (1; 2)?"
- **Conta de conferência:** (3; 6) = 3 · (1; 2)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s36` | (3; 6) | **sim** | "Isso. É 3 vezes (1; 2)." |
| `s21` | (2; 1) | não | "(2; 1) troca os componentes e muda a direção. (3; 6) = 3 · (1; 2)." |
| `s34` | (3; 4) | não | "3/1 ≠ 4/2: direção diferente. (3; 6) é múltiplo." |
| `sm1m2` | (−1; −2) | não | "Mesma direção, mas sentido oposto. (3; 6) mantém o sentido." |

#### D5 — `volta-ao-inicio`
- **Enunciado:** "Num triângulo ABC, quanto vale AB + BC + CA?"
- **Fala do Paco:** "Última. Siga as setas e veja onde você termina."
- **Conta de conferência:** de A a A: (0; 0)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `nulo` | O vetor nulo | **sim** | "Certo. A volta termina onde começou." |
| `perimetro` | O perímetro | não | "O perímetro soma comprimentos. As setas somadas voltam ao início: vetor nulo." |
| `2ab` | 2 · AB | não | "Seguindo as três setas você volta para A: soma (0; 0)." |
| `ac` | AC | não | "AB + BC = AC; somando CA volta a A: vetor nulo." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** soma de vetores pelas componentes.
- **Onde procurar:** UFRGS, Unesp, PUC-RS.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** módulo de vetor.
- **Onde procurar:** Fuvest, UFSC.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** deslocamento resultante em contexto (robô, mapa).
- **Onde procurar:** ENEM ("deslocamento", "movimentos").

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** vetores paralelos (múltiplos).
- **Onde procurar:** UFPR, UECE.
