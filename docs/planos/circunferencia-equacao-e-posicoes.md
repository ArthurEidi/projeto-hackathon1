# Plano — Equação e posições relativas de circunferências

**Aula:** 1 — Todos à Mesma Distância · Equação da circunferência e posições relativas
**Caminho:** geometria / geometria-analitica / circunferencia-equacao-e-posicoes
**Pré-requisitos que o aluno já domina:** distância entre dois pontos, comprimento e elementos da circunferência.

## a) Ancoragem mecânica
A máquina recebe um centro (a; b) e um raio r e devolve todos os pontos cuja distância até o centro é exatamente r. Também compara outros objetos com esse raio: um ponto (dentro, sobre, fora), uma reta (secante, tangente, exterior) e outra circunferência. Centro e raio são as entradas; a curva e as posições são as saídas.

## b) Visual de partida
WIDGET NOVO `circunferencia_no_plano`: plano com centro arrastável (c1), raio por slider (c2), circunferência (c3) e um ponto P arrastável que mostra sua distância até o centro (c4) e fica verde (dentro), rosa (sobre) ou cinza (fora). Opcionais: reta horizontal y = k por slider e uma segunda circunferência. Métricas: `pontos_sobre`, `centro_x`, `estados_vistos`, `k`.

## c) Caso neutro
Centro na origem: a equação fica a mais simples, x² + y² = r², sem deslocamento nenhum. Depois movemos o centro e vemos o que a equação ganha.

## d) Panorama e recorte
Há equação geral com termos em x e y, circunferência por três pontos, retas tangentes por um ponto e cônicas. Aqui: equação reduzida, centro e raio, e posições de ponto, reta e circunferência.

## e) Progressão por contraste
1. Pontos a distância 5 da origem: a curva aparece (referência).
2. Centro movido: (x − a)² + (y − b)² = r².
3. Ponto contra raio: d < r, d = r, d > r.
4. Reta subindo: 2, 1 ou 0 pontos comuns.
5. Duas circunferências: distância entre centros contra soma dos raios.

## f) Dedução causal da forma
"Estar na circunferência" quer dizer "estar a distância r do centro". Pela fórmula da distância, √((x − a)² + (y − b)²) = r; elevando ao quadrado, (x − a)² + (y − b)² = r². O centro aparece subtraindo porque os degraus são medidos a partir dele. As posições relativas vêm todas da mesma comparação: alguma distância contra o raio.

## g) Simulação espacial e fronteiras
Raio zero reduz a curva a um ponto; r² negativo não desenha nada. A reta y = k é tangente quando |k − b| = r. Duas circunferências: d > r₁ + r₂ separadas; d = r₁ + r₂ tangentes por fora; d menor, se cruzam ou uma fica dentro da outra.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Centro | O ponto (a; b) de onde todas as distâncias são medidas. |
| c2 | Raio | A distância fixa r entre o centro e a curva. |
| c3 | Circunferência | Todos os pontos a distância r do centro. |
| c4 | Distância ao centro | Quanto um ponto está longe do centro: compara-se com r. |

### Passo 1 — `mesma-distancia`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `circunferencia_no_plano` — centro fixo na origem; curva oculta; P arrastável com encaixe em inteiros mostrando a distância (c4); cada posição com distância 5 vira um ponto rosa permanente. Emite `pontos_sobre`.
- **Sliders:** nenhum
- **Paco (abertura):** "Arraste P para lugares que ficam a 5 da origem. Que desenho esses pontos começam a formar?"
- **Interação do aluno:** encontra (5; 0), (3; 4), (0; 5), (−4; 3)…; a circunferência se completa.
- **Conclusão:** `pontos_sobre ≥ 4`
- **Paco (conclusão):** "Uma circunferência de raio 5. Todo ponto dela cumpre x² + y² = 25: é Pitágoras com a distância."
- **Tati (dúvida):** `fim` — P: "E elipse e parábola, também são assim?" / R: "São parentes, as cônicas, com regras de distância diferentes. Hoje: circunferência."

### Passo 2 — `mover-centro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `circunferencia_no_plano` — raio 5; o centro anda pelo slider; a equação escrita se atualiza com o centro em c1.
- **Sliders:** `a` · "Centro em x" · 0..4 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "Agora mova o centro para a direita. O que muda na equação?"
- **Interação do aluno:** move a até 3; a equação passa de x² + y² = 25 para (x − 3)² + y² = 25.
- **Conclusão:** `a ≥ 3`
- **Paco (conclusão):** "A distância agora é medida a partir de (3; 0): (x − 3)² + y² = 25. O centro entra subtraindo dentro dos parênteses."

### Passo 3 — `dentro-sobre-fora`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7, 6
- **Widget:** `circunferencia_no_plano` — centro (0; 0), raio 5; P arrastável muda de cor conforme d < 5, d = 5, d > 5. Emite `estados_vistos` (0 a 3).
- **Sliders:** nenhum
- **Paco (abertura):** "Leve P para dentro, para cima da linha e para fora. Compare a distância até o centro com o raio."
- **Interação do aluno:** arrasta P pelas três regiões.
- **Conclusão:** `estados_vistos ≥ 3`
- **Paco (conclusão):** "Dentro, d < r; sobre, d = r; fora, d > r. A posição do ponto é só comparar a distância com o raio."

### Passo 4 — `reta-sobe`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `circunferencia_no_plano` — centro (0; 0), raio 3; reta horizontal y = k; os pontos comuns acendem e um rótulo diz "secante", "tangente" ou "exterior".
- **Sliders:** `k` · "Altura da reta" · 0..4 · passo 1 · inicial 0 · c4
- **Paco (abertura):** "Suba a reta y = k. Quantos pontos ela divide com a circunferência em cada altura?"
- **Interação do aluno:** sobe k de 0 a 4 e vê 2, 2, 2, 1 e 0 pontos.
- **Conclusão:** `k ≥ 4`
- **Paco (conclusão):** "Abaixo de 3 são 2 pontos, em 3 só 1 (tangente), acima nenhum. Tudo é comparar a distância do centro à reta com o raio."
- **Tati (dúvida):** `fim` — P: "E duas circunferências?" / R: "Mesma ideia: compare a distância entre os centros com a soma dos raios."

### Passo 5 — `desafio-ler-equacao`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `circunferencia_figura` — circunferência de centro (2; −1) e raio 3, sem rótulos.
- **Paco (abertura):** "O centro entra subtraindo. Cuidado com o sinal do y."
- **Enunciado:** "Quais são o centro e o raio de (x − 2)² + (y + 1)² = 9?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `c2m1r3` | (2; −1) e 3 | **sim** | "Isso. y + 1 = y − (−1), e r = √9 = 3." | centro c1 e raio c2 rotulados |
| `cm21r3` | (−2; 1) e 3 | não | "Os sinais saem trocados: x − 2 dá a = 2 e y + 1 dá b = −1." | centro errado piscando e indo para (2; −1) |
| `c2m1r9` | (2; −1) e 9 | não | "9 é r². O raio é 3." | quadrado de área 9 sobre o raio |
| `c21r3` | (2; 1) e 3 | não | "y + 1 = y − (−1): b = −1, não 1." | centro descendo de (2; 1) para (2; −1) |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `circunferencia_figura` — centro (3; 0), raio 5, um ponto P sobre a curva com os degraus.
- **Fórmula:** `(x − a)² + (y − b)²`→c4 · `=` · `r²`→c2 · `, centro (a; b)`→c1
- **Definições:** "Circunferência: pontos a distância r do centro." · "Ponto: dentro (d < r), sobre (d = r) ou fora (d > r)." · "Reta: secante, tangente ou exterior conforme a distância do centro a ela."
- **Paco (abertura):** "Estar na circunferência é estar a distância r do centro. Por isso a equação é a fórmula da distância ao quadrado."
- **Dica (hint):** "Toque em uma parte da fórmula para ver o que ela mede no plano."

**Frase de encerramento (outro):** "Você desenhou pontos à mesma distância do centro: (x − a)² + (y − b)² = r², e toda posição relativa é distância contra raio."

## i) Treino pós-aula

### Fáceis

#### F1 — `raio-16`
- **Enunciado:** "Qual o raio de x² + y² = 16?"
- **Conta de conferência:** √16 = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Isso. r² = 16, então r = 4." |
| `a16` | 16 | não | "16 é r². O raio é 4." |
| `a8` | 8 | não | "16 / 2 não é raiz. r = 4." |
| `a2` | 2 | não | "2 seria com r² = 4. Aqui r = 4." |

#### F2 — `centro-1-5`
- **Enunciado:** "Qual o centro de (x − 1)² + (y − 5)² = 4?"
- **Conta de conferência:** (1; 5)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c15` | (1; 5) | **sim** | "Certo. Os números subtraídos são o centro." |
| `cm1m5` | (−1; −5) | não | "x − 1 indica a = 1, não −1. Centro (1; 5)." |
| `c00` | (0; 0) | não | "O centro foi deslocado para (1; 5)." |
| `c51` | (5; 1) | não | "O 1 vai com x e o 5 com y: (1; 5)." |

#### F3 — `ponto-3-4`
- **Enunciado:** "O ponto (3; 4) está dentro, sobre ou fora de x² + y² = 25?"
- **Conta de conferência:** 9 + 16 = 25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sobre` | Sobre | **sim** | "Isso. Distância 5, igual ao raio." |
| `dentro` | Dentro | não | "9 + 16 = 25 = r²: a distância é igual ao raio. Sobre." |
| `fora` | Fora | não | "A distância √25 = 5 é igual ao raio: sobre." |

#### F4 — `equacao-raio-2`
- **Enunciado:** "Qual a equação da circunferência de centro na origem e raio 2?"
- **Conta de conferência:** x² + y² = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `e4` | x² + y² = 4 | **sim** | "Certo. r² = 4." |
| `e2` | x² + y² = 2 | não | "À direita vai r², não r: 4." |
| `exy2` | x + y = 2 | não | "Isso é uma reta. Circunferência: x² + y² = 4." |
| `e16` | x² + y² = 16 | não | "16 seria raio 4. Com raio 2: 4." |

### Médias

#### M1 — `ponto-1-1`
- **Enunciado:** "O ponto (1; 1) está dentro, sobre ou fora de x² + y² = 9?"
- **Conta de conferência:** 1 + 1 = 2 < 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `dentro` | Dentro | **sim** | "Isso. d = √2 < 3." |
| `sobre` | Sobre | não | "1 + 1 = 2, longe de 9. Dentro." |
| `fora` | Fora | não | "d = √2 ≈ 1,4, menor que 3: dentro." |

#### M2 — `equacao-2-3-5`
- **Enunciado:** "Qual a equação da circunferência de centro (2; 3) e raio 5?"
- **Conta de conferência:** (x − 2)² + (y − 3)² = 25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `certa` | (x − 2)² + (y − 3)² = 25 | **sim** | "Certo. Centro subtraindo, r² = 25." |
| `sinal` | (x + 2)² + (y + 3)² = 25 | não | "Com + o centro seria (−2; −3). Para (2; 3): (x − 2)² + (y − 3)² = 25." |
| `r5` | (x − 2)² + (y − 3)² = 5 | não | "À direita vai r² = 25." |
| `troca` | (x − 3)² + (y − 2)² = 25 | não | "O 2 vai com x e o 3 com y." |

#### M3 — `centro-negativo`
- **Enunciado:** "Qual o centro de (x + 3)² + y² = 1?"
- **Conta de conferência:** x + 3 = x − (−3): (−3; 0)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `cm30` | (−3; 0) | **sim** | "Isso. x + 3 = x − (−3)." |
| `c30` | (3; 0) | não | "x + 3 indica a = −3: (−3; 0)." |
| `c03` | (0; 3) | não | "O 3 está com o x: (−3; 0)." |
| `cm31` | (−3; 1) | não | "y² é (y − 0)²: b = 0. Centro (−3; 0)." |

### Desafios

#### D1 — `reta-y5`
- **Enunciado:** "Qual a posição da reta y = 5 em relação a x² + y² = 25?"
- **Conta de conferência:** distância do centro à reta = 5 = r

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tangente` | Tangente | **sim** | "Certo. Ela encosta só em (0; 5)." |
| `secante` | Secante | não | "A reta está a 5 do centro, igual ao raio: toca em um ponto só." |
| `exterior` | Exterior | não | "Ela toca o topo, (0; 5). É tangente." |

#### D2 — `duas-circunferencias`
- **Enunciado:** "Duas circunferências têm raios 2 e 3, e seus centros estão a 5 de distância. Como elas ficam?"
- **Conta de conferência:** d = r₁ + r₂

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tang-ext` | Tangentes por fora | **sim** | "Isso. 2 + 3 = 5: se tocam num ponto." |
| `secantes` | Secantes | não | "Secantes pediriam d < 5. Com d = 5, se tocam por fora." |
| `separadas` | Separadas | não | "Separadas pediriam d > 5. Com d = 5, tangentes." |
| `concentricas` | Uma dentro da outra | não | "Com d = r₁ + r₂ elas ficam lado a lado, tangentes por fora." |

#### D3 — `raio-por-ponto`
- **Enunciado:** "Uma circunferência de centro na origem passa por (6; 8). Qual sua equação?"
- **Conta de conferência:** r² = 36 + 64 = 100

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `e100` | x² + y² = 100 | **sim** | "Certo. O raio é a distância até (6; 8): 10." |
| `e10` | x² + y² = 10 | não | "À direita vai r² = 100." |
| `e14` | x² + y² = 14 | não | "6 + 8 não é o raio. r² = 36 + 64 = 100." |
| `e48` | x² + y² = 48 | não | "r² = 6² + 8² = 100." |

#### D4 — `por-diametro`
- **Enunciado:** "O segmento de A(0; 0) a B(4; 0) é um diâmetro. Quais o centro e o raio?"
- **Conta de conferência:** centro = ponto médio (2; 0); r = 4/2 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c20r2` | (2; 0) e 2 | **sim** | "Isso. Centro no meio, raio metade do diâmetro." |
| `c20r4` | (2; 0) e 4 | não | "4 é o diâmetro. O raio é 2." |
| `c00r4` | (0; 0) e 4 | não | "O centro é o meio de AB, (2; 0), e o raio 2." |
| `c40r2` | (4; 0) e 2 | não | "(4; 0) é a ponta B. Centro (2; 0)." |

#### D5 — `completar-quadrado`
- **Enunciado:** "Qual o centro de x² + y² − 6x = 0?"
- **Fala do Paco:** "Última. x² − 6x é o começo de (x − 3)²."
- **Conta de conferência:** (x − 3)² + y² = 9: centro (3; 0), raio 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c30` | (3; 0) | **sim** | "Certo. x² − 6x + 9 = (x − 3)²; a equação vira (x − 3)² + y² = 9." |
| `c60` | (6; 0) | não | "O centro é metade do 6: (x − 3)². Centro (3; 0)." |
| `cm30` | (−3; 0) | não | "−6x vem de (x − 3)²: centro (3; 0)." |
| `c00` | (0; 0) | não | "O termo −6x desloca o centro para (3; 0)." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** centro e raio a partir da equação (com completar quadrado).
- **Onde procurar:** UFRGS, Fuvest, UEL.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** posição de reta e circunferência (distância do centro à reta).
- **Onde procurar:** UEL, Unesp, PUC-RJ.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** posição relativa de duas circunferências.
- **Onde procurar:** UFPR, Mackenzie.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** circunferência em contexto (alcance de antena, sinal).
- **Onde procurar:** ENEM ("raio de alcance", "antena").
