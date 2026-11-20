# Plano — Posições relativas, ângulos e interseções de retas

**Aula:** 1 — Cruzar, Correr ao Lado ou Coincidir · Posições relativas de retas
**Caminho:** geometria / geometria-analitica / posicoes-relativas-de-retas
**Pré-requisitos que o aluno já domina:** equação da reta y = mx + n, coeficiente angular.

## a) Ancoragem mecânica
A máquina recebe duas retas (cada uma com m e n) e devolve como elas se encontram: em um ponto (concorrentes), em nenhum (paralelas) ou em todos (coincidentes), e se o cruzamento é em ângulo reto (perpendiculares). As inclinações e os cortes são as entradas; o número de pontos comuns e o ponto de encontro são as saídas.

## b) Visual de partida
`plano_cartesiano` com duas curvas afins ligadas a sliders (`a: "$m2"`, `b: "$n2"`), `marcar.encontro` e ponto arrastável na curva 0 (métrica `no_encontro`). WIDGET NOVO (extensão do `plano_cartesiano`): `marcar.angulo` desenha o ângulo entre as retas e acende um quadradinho de ângulo reto quando m₁ · m₂ = −1; e `coincidentes` (0/1) emite quando as duas retas são iguais.

## c) Caso neutro
As duas retas iguais (y = x + 1 duas vezes): nada separa uma da outra, todos os pontos são comuns. É a segunda máquina sem nenhuma diferença da primeira. Depois mudamos um coeficiente de cada vez.

## d) Panorama e recorte
Há ângulo entre retas por tangente, distância entre paralelas e posições de retas no espaço (reversas). Aqui: no plano, paralelas, coincidentes, concorrentes, perpendiculares e o ponto de encontro.

## e) Progressão por contraste
1. Retas iguais: infinitos pontos comuns (referência).
2. Mesmo m, outro n: paralelas, nenhum ponto.
3. m diferente: concorrentes, exatamente um ponto.
4. Achar o encontro: igualar as alturas.
5. Perpendiculares: m₁ · m₂ = −1.

## f) Dedução causal da forma
Duas retas com a mesma inclinação sobem no mesmo ritmo: a distância vertical entre elas (n₂ − n₁) nunca muda, então ou nunca se encontram ou são a mesma. Com inclinações diferentes, uma sobe mais rápido e a diferença de alturas muda de sinal uma única vez: há exatamente um encontro, onde m₁x + n₁ = m₂x + n₂. Girar uma reta 90° troca os degraus (Δx; Δy) por (−Δy; Δx), por isso a nova inclinação é −1/m: m₁ · m₂ = −1.

## g) Simulação espacial e fronteiras
A regra m₁ · m₂ = −1 não vale para o par horizontal–vertical (a vertical não tem m), embora elas sejam perpendiculares. Um sistema de duas equações lineares sem solução corresponde a retas paralelas; com infinitas soluções, a retas coincidentes.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Primeira reta | A reta de referência, y = m₁x + n₁. |
| c2 | Segunda reta | A reta que o aluno modifica, y = m₂x + n₂. |
| c3 | Ponto de encontro | Onde as duas retas têm a mesma altura. |
| c4 | Ângulo reto | Cruzamento perpendicular: m₁ · m₂ = −1. |

### Passo 1 — `coincidentes-e-paralelas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — curva 0: afim a = 1, b = 1, cor c1; curva 1: afim a = 1, b = "$n2", cor c2 (tracejada quando coincide com a 0).
- **Sliders:** `n2` · "Corte da segunda" · −3..4 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "As duas retas são y = x + 1: quantos pontos em comum elas têm? Agora mude o corte da segunda."
- **Interação do aluno:** move n2; a segunda reta se descola e corre paralela.
- **Conclusão:** `n2 ≥ 3`
- **Paco (conclusão):** "Iguais, tinham todos os pontos em comum. Com o mesmo m e outro corte, viraram paralelas: nenhum ponto comum."
- **Tati (dúvida):** `fim` — P: "No espaço também é assim?" / R: "No espaço há retas que nem se cruzam nem são paralelas, as reversas. Hoje ficamos no plano."

### Passo 2 — `concorrentes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6
- **Widget:** `plano_cartesiano` — curva 0: afim a = 1, b = 1 (c1); curva 1: afim a = "$m2", b = 3 (c2); `marcar.encontro` com cor c3.
- **Sliders:** `m2` · "Inclinação da segunda" · −3..3 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Agora mude a inclinação da segunda. Elas passam a se cruzar, e em quantos pontos?"
- **Interação do aluno:** move m2; o marcador de encontro aparece assim que m2 ≠ 1.
- **Conclusão:** `m2 ≥ 2`
- **Paco (conclusão):** "Com inclinações diferentes, uma sobe mais rápido e alcança a outra: sempre exatamente um ponto."

### Passo 3 — `achar-encontro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7, 6
- **Widget:** `plano_cartesiano` — curva 0: afim a = 1, b = 1 (c1, rótulo "y = x + 1"); curva 1: afim a = −1, b = 5 (c2, rótulo "y = −x + 5"); ponto arrastável na curva 0, passo 0,5, quadrantes marcados.
- **Sliders:** nenhum
- **Paco (abertura):** "Onde y = x + 1 e y = −x + 5 se encontram? Arraste o ponto pela primeira até achar."
- **Interação do aluno:** arrasta o ponto até (2; 3).
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Em (2; 3): x + 1 = −x + 5 dá x = 2. O encontro é a solução do sistema das duas equações."

### Passo 4 — `angulo-reto`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 7
- **Widget:** `plano_cartesiano` + extensão `marcar.angulo` — curva 0: afim a = 1, b = 0 (c1); curva 1: afim a = "$m2", b = 0 (c2); o quadradinho de ângulo reto (c4) acende em m2 = −1.
- **Sliders:** `m2` · "Inclinação da segunda" · −3..3 · passo 1 · inicial 2 · c2
- **Paco (abertura):** "A primeira reta tem m = 1. Gire a segunda até formar um ângulo reto: quanto vale m₂?"
- **Interação do aluno:** desce m2 até −1 e vê o quadradinho acender.
- **Conclusão:** `m2 ≤ −1`
- **Paco (conclusão):** "Com m₂ = −1: m₁ · m₂ = 1 · (−1) = −1. Perpendiculares têm inclinações cujo produto é −1."
- **Tati (dúvida):** `fim` — P: "E se m₁ fosse 2?" / R: "Aí m₂ = −1/2: inverte e troca o sinal. Girar 90° troca os degraus de lugar."

### Passo 5 — `desafio-posicao`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** `plano_figura` — curvas afins a = 2, b = 1 (c1) e a = 2, b = −3 (c2).
- **Paco (abertura):** "Compare as inclinações antes dos cortes."
- **Enunciado:** "Qual a posição das retas y = 2x + 1 e y = 2x − 3?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `paralelas` | Paralelas | **sim** | "Isso. Mesmo m, cortes diferentes: nunca se encontram." | triângulos de inclinação iguais nas duas (`triangulo` c1) |
| `concorrentes` | Concorrentes | não | "Concorrentes precisam de m diferentes. Aqui ambos são 2: paralelas." | `marcar.encontro` ligado, sem ponto |
| `coincidentes` | Coincidentes | não | "Os cortes são 1 e −3, então não são a mesma reta. Paralelas." | `marcar.interceptoY` nas duas |
| `perpendiculares` | Perpendiculares | não | "2 · 2 = 4, não −1. Com o mesmo m, são paralelas." | quadradinho de ângulo apagado |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `plano_figura` — curvas a = 1, b = 0 (c1) e a = −1, b = 0 (c2) com o ângulo reto (c4).
- **Fórmula:** `m₁`→c1 · `·` · `m₂`→c2 · `=` · `−1`→c4
- **Definições:** "Paralelas: mesmo m e cortes diferentes; nenhum ponto comum." · "Concorrentes: m diferentes; exatamente um ponto comum." · "Coincidentes: mesmo m e mesmo corte; todos os pontos comuns."
- **Paco (abertura):** "Mesmo ritmo nunca alcança, ritmos diferentes se cruzam uma vez. E girar 90° inverte a inclinação e troca o sinal."
- **Dica (hint):** "Toque em uma letra para ver a reta correspondente."

**Frase de encerramento (outro):** "Você fez retas coincidirem, correrem lado a lado e se cruzarem; perpendiculares têm m₁ · m₂ = −1."

## i) Treino pós-aula

### Fáceis

#### F1 — `paralelas-3x`
- **Enunciado:** "Qual a posição de y = 3x + 1 e y = 3x + 5?"
- **Conta de conferência:** m iguais, n diferentes

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `paralelas` | Paralelas | **sim** | "Isso. Mesmo ritmo, alturas diferentes." |
| `concorrentes` | Concorrentes | não | "Os dois m valem 3. Mesmo ritmo, cortes diferentes: paralelas." |
| `coincidentes` | Coincidentes | não | "Os cortes 1 e 5 são diferentes. Paralelas." |
| `perpendiculares` | Perpendiculares | não | "3 · 3 = 9, não −1. São paralelas." |

#### F2 — `x-e-menos-x`
- **Enunciado:** "Quantos pontos em comum têm y = x e y = −x?"
- **Conta de conferência:** m diferentes ⇒ 1 ponto (a origem)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 | **sim** | "Certo. Elas se cruzam só na origem." |
| `a0` | 0 | não | "Inclinações diferentes sempre se cruzam na origem. O certo é 1." |
| `a2` | 2 | não | "Duas retas distintas se cruzam no máximo em 1 ponto." |
| `inf` | Infinitos | não | "Infinitos seria se fossem a mesma reta. É 1 ponto." |

#### F3 — `coincidentes-disfarcadas`
- **Enunciado:** "Quantos pontos em comum têm y = 2x + 2 e 2y = 4x + 4?"
- **Fala do Paco:** "Divida a segunda equação por 2."
- **Conta de conferência:** 2y = 4x + 4 ⇔ y = 2x + 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `inf` | Infinitos | **sim** | "Isso. Dividindo por 2, é a mesma reta." |
| `a0` | 0 | não | "Simplificada, a segunda é y = 2x + 2: a mesma reta, infinitos pontos." |
| `a1` | 1 | não | "Não são retas diferentes: 2y = 4x + 4 é y = 2x + 2, infinitos pontos." |
| `a2` | 2 | não | "É a mesma reta escrita de outro jeito: infinitos pontos." |

#### F4 — `perp-a-1`
- **Enunciado:** "Uma reta tem m = 1. Qual a inclinação de uma perpendicular a ela?"
- **Conta de conferência:** −1/1 = −1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am1` | −1 | **sim** | "Certo. 1 · (−1) = −1." |
| `a1` | 1 | não | "m = 1 de novo seria paralela. Perpendicular: −1." |
| `a0` | 0 | não | "0 é horizontal, que faz 45° com ela. Perpendicular: −1." |
| `a2` | 2 | não | "1 · 2 = 2, não −1. A perpendicular tem m = −1." |

### Médias

#### M1 — `encontro-x-e-4-x`
- **Enunciado:** "Onde se encontram y = x e y = −x + 4?"
- **Conta de conferência:** x = −x + 4 ⇒ x = 2; (2; 2)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p22` | (2; 2) | **sim** | "Isso. 2x = 4, x = 2 e y = 2." |
| `p44` | (4; 4) | não | "Em x = 4 a segunda dá 0. Igualando: (2; 2)." |
| `p04` | (0; 4) | não | "(0; 4) é o corte da segunda reta. O encontro é (2; 2)." |
| `p40` | (4; 0) | não | "(4; 0) é onde a segunda corta o eixo x. Encontro: (2; 2)." |

#### M2 — `perp-a-2`
- **Enunciado:** "Uma reta tem m = 2. Qual a inclinação de uma perpendicular?"
- **Conta de conferência:** −1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am1-2` | −1/2 | **sim** | "Certo. Inverte e troca o sinal: 2 · (−1/2) = −1." |
| `am2` | −2 | não | "2 · (−2) = −4. Perpendicular: −1/2." |
| `a1-2` | 1/2 | não | "Faltou trocar o sinal: −1/2." |
| `a2` | 2 | não | "Mesmo m é paralela. Perpendicular: −1/2." |

#### M3 — `paralela-por-ponto`
- **Enunciado:** "Qual reta é paralela a y = 3x − 2 e corta o eixo y em 5?"
- **Conta de conferência:** m = 3, n = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r3x5` | y = 3x + 5 | **sim** | "Isso. Mesmo m, novo corte." |
| `r5x3` | y = 5x + 3 | não | "Trocou m e n. Paralela mantém m = 3: y = 3x + 5." |
| `rm3x5` | y = −3x + 5 | não | "m = −3 cruza a original. Paralela: y = 3x + 5." |
| `r3xm2` | y = 3x − 2 | não | "Essa é a própria reta. Com corte 5: y = 3x + 5." |

### Desafios

#### D1 — `encontro-2xm1-xm2`
- **Enunciado:** "Onde se encontram y = 2x − 1 e y = x + 2?"
- **Conta de conferência:** 2x − 1 = x + 2 ⇒ x = 3, y = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p35` | (3; 5) | **sim** | "Certo. x = 3 e as duas dão 5." |
| `p13` | (1; 3) | não | "Em x = 1 dão 1 e 3. Igualando: x = 3, y = 5." |
| `pm1-1` | (−1; 1) | não | "Em x = −1 dão −3 e 1. O encontro é (3; 5)." |
| `p32` | (3; 2) | não | "x = 3 está certo, mas y = 3 + 2 = 5." |

#### D2 — `k-paralela`
- **Enunciado:** "Para qual k as retas y = kx + 1 e y = 4x − 2 são paralelas?"
- **Conta de conferência:** k = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `k4` | 4 | **sim** | "Isso. Mesmo m e cortes diferentes." |
| `km1-4` | −1/4 | não | "−1/4 deixaria perpendicular. Paralela: k = 4." |
| `km2` | −2 | não | "−2 é o corte da segunda. O m precisa ser 4." |
| `k1` | 1 | não | "Com k = 1 elas se cruzam. k = 4." |

#### D3 — `perpendicular-por-ponto`
- **Enunciado:** "Qual reta é perpendicular a y = 2x + 1 e corta o eixo y em 3?"
- **Conta de conferência:** m = −1/2, n = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rm05x3` | y = −x/2 + 3 | **sim** | "Certo. m = −1/2 e corte 3." |
| `rm2x3` | y = −2x + 3 | não | "2 · (−2) = −4. Perpendicular: m = −1/2." |
| `r2x3` | y = 2x + 3 | não | "Mesmo m é paralela. Perpendicular: y = −x/2 + 3." |
| `r05x3` | y = x/2 + 3 | não | "Faltou trocar o sinal: y = −x/2 + 3." |

#### D4 — `sistema-sem-solucao`
- **Enunciado:** "Um sistema de duas equações de retas não tem solução. Como são as retas?"
- **Conta de conferência:** nenhum ponto comum

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `paralelas` | Paralelas | **sim** | "Isso. Sem ponto comum, sem solução." |
| `coincidentes` | Coincidentes | não | "Coincidentes têm infinitas soluções. Nenhuma: paralelas." |
| `perpendiculares` | Perpendiculares | não | "Perpendiculares se cruzam num ponto. Sem solução: paralelas." |
| `concorrentes` | Concorrentes | não | "Concorrentes têm uma solução. Nenhuma: paralelas." |

#### D5 — `vertical-horizontal`
- **Enunciado:** "Como são as retas x = 2 e y = 3?"
- **Fala do Paco:** "Última. Desenhe as duas retas no plano cartesiano e compare as suas direções."
- **Conta de conferência:** cruzam em (2; 3) em ângulo reto; a vertical não tem m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `perp` | Perpendiculares | **sim** | "Certo. Cruzam em (2; 3) em ângulo reto, mesmo sem a regra m₁ · m₂ = −1." |
| `paralelas` | Paralelas | não | "Uma é vertical e a outra horizontal: cruzam em (2; 3), em ângulo reto." |
| `nenhum` | Não se cruzam | não | "O ponto (2; 3) está nas duas. São perpendiculares." |
| `coincidentes` | Coincidentes | não | "Uma é vertical e outra horizontal, não podem coincidir. Perpendiculares." |

### Vestibular

> B43 (19/11/2026): as vagas preenchidas abaixo trazem questões de provas oficiais conferidas no PDF e no gabarito oficial (registro em `docs/revisao/vestibular-b43.md`). As vagas PENDENTE-FONTE seguem abertas; nada foi inventado.

#### V1 — `unicamp-2021-mediatriz`
- **Enunciado (resumido):** "A reta x + 2y = 4 corta os eixos coordenados em A e B. Qual é a equação da mediatriz do segmento AB?"
- **Fala do Paco:** "A mediatriz passa pelo ponto médio de AB e é perpendicular à reta: o produto das inclinações vale −1."
- **Fonte:** Unicamp 2021 (adaptada) — **Adaptação:** 1ª fase, Questão 31: enunciado reescrito como pergunta; alternativas e gabarito oficial (a) mantidos. — **URL:** https://www.comvest.unicamp.br/wp-content/uploads/2021/09/F1-Comentada-Conhec-Gerais-Exatas-Tecno-Humanas-Artes.pdf
- **Conta de conferência:** A = (4; 0), B = (0; 2), ponto médio (2; 1); inclinação −1/2 ⇒ perpendicular 2 ⇒ y − 1 = 2(x − 2) ⇒ 2x − y = 3 (a).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | 2x − y = 3 | **sim** | "Isso. A = (4; 0), B = (0; 2) e o ponto médio é (2; 1); a perpendicular a −1/2 tem inclinação 2: y − 1 = 2(x − 2), ou 2x − y = 3." |
| `b` | 2x − y = 5 | não | "A inclinação 2 está certa, mas a mediatriz passa pelo ponto médio (2; 1), e 2 · 2 − 1 = 3, não 5. Fica 2x − y = 3." |
| `c` | 2x + y = 3 | não | "2x + y = 3 tem inclinação −2, e (−1/2) · (−2) = 1, não −1; nem passa por (2; 1). Certo: inclinação 2, 2x − y = 3." |
| `d` | 2x + y = 5 | não | "2x + y = 5 passa pelo ponto médio (2; 1), mas tem inclinação −2, e (−1/2) · (−2) = 1, não −1. Certo: 2x − y = 3." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** condição de perpendicularidade.
- **Onde procurar:** UFRGS, PUC-RJ, UFES.

#### V3 — UFPR 2022 (1ª fase, Q13) · `ufpr-2022-reta-paralela-bc`
- **Habilidade-alvo:** retas paralelas por um ponto dado.
- **Fonte:** UFPR 2022, 1ª fase, Conhecimentos Gerais, Q13 (`https://servicos.nc.ufpr.br/documentos/PS2022/provas/Geral.pdf`).
- **Gabarito:** `3x + 2y = 15` (alternativa a). `AB` tem `m = 2`, cortando o eixo `x` em `D(5; 0)`; `BC` tem `m = −3/2`, logo `r` por `D` paralela a `BC` é `3x + 2y = 15`.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** classificar um sistema 2 × 2 pela posição das retas.
- **Onde procurar:** UERJ, UFPR.
