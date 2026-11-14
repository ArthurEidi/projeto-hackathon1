# Plano — Comprimento da circunferência

**Aula:** 1 — A Roda Desenrolada · O número π, o perímetro 2πr e o comprimento de arco
**Caminho:** geometria / geometria-plana / comprimento-da-circunferencia
**Pré-requisitos que o aluno já domina:** circunferência, arcos e ângulos, razão, proporção e porcentagem.

## a) Ancoragem mecânica
A máquina pega uma roda de raio r (e diâmetro d = 2r) e a faz dar uma volta completa sobre uma reta graduada, esticando a sua borda. O aluno controla o diâmetro d e o ângulo central α; a saída é o rastro retilíneo deixado no chão, que mede sempre π ≈ 3,14 diâmetros numa volta inteira e uma fração proporcional α / 360° num arco parcial.

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo roda desenrolada: circunferência de raio r (c1) e diâmetro d = 2r (c2) que rola sem deslizar sobre uma pista graduada em múltiplos de d, deixando no chão o rastro do comprimento C (c3) ou de um arco de ângulo α (c4).

## c) Caso neutro
Para uma roda de diâmetro unitário d = 1 (raio r = 0,5), uma volta completa deixa na pista um rastro de comprimento exatamente igual a π ≈ 3,14 unidades. Essa é a assinatura fundamental: o número π é o próprio comprimento da circunferência de diâmetro 1.

## d) Panorama e recorte
Existem áreas de círculos e setores, velocidade linear e angular em rotações e radianos na trigonometria. Aqui: significado geométrico de π como razão C / d, fórmula C = π·d = 2πr, contagem de voltas de uma roda e comprimento de arco proporcional ao ângulo.

## e) Progressão por contraste
1. Roda de diâmetro d = 1 desenrolada: o contorno esticado cabe 3 vezes o diâmetro mais um pedacinho de 0,14, definindo π ≈ 3,14 (referência).
2. Rodas de diâmetros d = 2 e d = 3: o comprimento cresce para 2π e 3π, mas a razão C / d permanece cravada em π ≈ 3,14.
3. Escrita em função do raio r: como o diâmetro vale dois raios (d = 2r), uma volta inteira mede C = 2·π·r.
4. Giro parcial de ângulo α: meia volta (180°) desenrola metade de C, e um arco de ângulo α desenrola a fração (α / 360°)·2πr.

## f) Dedução causal da forma
Todas as circunferências têm exatamente a mesma forma, mudando apenas de escala. Por semelhança, quando multiplicamos o diâmetro por d, o contorno também é multiplicado por d, mantendo constante o quociente C / d = π. Logo C = π·d; substituindo d = 2r, resulta C = 2πr, e para uma fração α / 360° da volta completa o arco mede L = (α / 360°)·2πr.

## g) Simulação espacial e fronteiras
Se o giro é α = 0°, a roda não sai do lugar e L = 0; em α = 360° fecha uma volta (L = 2πr); se a roda dá N voltas (α > 360°), a distância percorrida é N·2πr. Numa pista curva, a roda externa percorre um raio maior e anda mais que a interna.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Raio (r) | Distância do centro até a borda; metade do diâmetro (r = d / 2). |
| c2 | Diâmetro (d) | Largura total da roda passando pelo centro (d = 2r). |
| c3 | Comprimento (C) | Contorno total esticado após uma volta completa: C = π·d = 2πr. |
| c4 | Arco (L) | Parte do contorno correspondente a um giro parcial de ângulo α. |

### Passo 1 — `desenrolar-pi`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro: d = 1), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo roda na reta) — roda de diâmetro d = 1 (c2); pista graduada com marcas em 1, 2, 3 e π ≈ 3,14; slider gira a roda deixando o rastro `C` (c3). Emite `giro`.
- **Sliders:** `giro` · "Girar a roda (°)" · 0..360 · passo 45 · inicial 0 · c3
- **Paco (abertura):** "Esta roda tem diâmetro 1. Gire até completar uma volta de 360°: quantos diâmetros cabem no rastro deixado no chão?"
- **Interação do aluno:** move o slider até 360°; a roda rola na reta e para logo depois da marca 3, em 3,14.
- **Conclusão:** `giro ≥ 360`
- **Paco (conclusão):** "Cabem 3 diâmetros inteiros e mais um pedacinho: cerca de 3,14. Esse número fixo é o π (pi)."
- **Tati (dúvida):** `fim` — P: "Esse 3,14 serve também para calcular a área de dentro do círculo?" / R: "Serve sim, na aula de área veremos A = π·r². Hoje medimos o contorno esticado e as voltas da roda."

### Passo 2 — `razao-constante-d`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — roda de diâmetro d = 1 como fantasma (C ≈ 3,14); roda ativa com diâmetro `d` (c2) e raio `r = d / 2` (c1), mostrando o rastro esticado `C` (c3) e o painel `C / d = 3,14`. Emite `d`.
- **Sliders:** `d` · "Diâmetro d" · 1..4 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Aumente o diâmetro da roda para 2 e para 4. O comprimento C aumenta, mas o que acontece com a divisão C / d?"
- **Interação do aluno:** altera d até 3 ou 4 e vê a barra de diâmetros continuar cabendo exatamente 3,14 vezes dentro de C.
- **Conclusão:** `d ≥ 3`
- **Paco (conclusão):** "A divisão C / d dá sempre π ≈ 3,14, porque toda circunferência tem a mesma forma. Como d = 2r, temos C = π·d = 2πr."

### Passo 3 — `comprimento-de-arco`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (frações da volta)
- **Widget:** `geometria_plana` — circunferência de raio r = 3 (c1), volta completa como fantasma (C = 6π ≈ 18,84) e arco ativo `L` (c4) controlado pelo ângulo `alfa`. Emite `alfa`.
- **Sliders:** `alfa` · "Ângulo α (°)" · 0..360 · passo 30 · inicial 360 · c4
- **Paco (abertura):** "A volta inteira (360°) mede 6π. Reduza o ângulo α para 180° e depois 90°: que fração da volta o arco L percorre?"
- **Interação do aluno:** reduz α até 90° e observa o rastro encolher para metade (3π) em 180° e um quarto (1,5π) em 90°.
- **Conclusão:** `alfa ≤ 90`
- **Paco (conclusão):** "Em 180° é metade da volta e em 90° é um quarto. O arco é proporcional ao ângulo: L = (α / 360°)·2πr."

### Passo 4 — `voltas-da-roda`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação do mundo real: N voltas)
- **Widget:** `geometria_plana` — bicicleta com roda de diâmetro d = 1 m (C ≈ 3,14 m) percorrendo uma pista mediante o número de `voltas`. Emite `voltas`.
- **Sliders:** `voltas` · "Número de voltas" · 1..10 · passo 1 · inicial 1 · c3
- **Paco (abertura):** "Cada volta de uma roda de 1 m de diâmetro avança 3,14 m. Leve até 10 voltas: que distância a bicicleta percorre?"
- **Interação do aluno:** move o slider até 10 voltas e vê a marca na pista chegar a 31,4 m.
- **Conclusão:** `voltas ≥ 10`
- **Paco (conclusão):** "Em 10 voltas ela avança 10·3,14 = 31,4 m. A distância total é sempre o número de voltas vezes 2πr."
- **Tati (dúvida):** `fim` — P: "Se a roda for menor, ela precisa dar mais voltas na mesma rua?" / R: "Sim: com raio metade, cada volta avança metade da distância, então ela precisa dar o dobro de voltas."

### Passo 5 — `desafio-comprimento`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `geometria_plana_figura` — pista circular de raio r = 10 m (c1) com um corredor dando 1 volta completa (c3).
- **Paco (abertura):** "Lembre-se de que o diâmetro é o dobro do raio (2r) antes de multiplicar por π ≈ 3,14."
- **Enunciado:** "Uma praça circular tem raio de 10 m. Usando π = 3,14, qual é o comprimento de uma volta completa?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a628` | 62,8 m | **sim** | "Isso. C = 2·3,14·10 = 62,8 m." | circunferência desenrolada mostrando diâmetro 20 m multiplicado por 3,14 = 62,8 m |
| `a314` | 31,4 m | não | "31,4 m usa só um raio (π·r). Uma volta usa o diâmetro 2r = 20 m: 62,8 m." | meia volta destacada em 31,4 m e volta completa em 62,8 m |
| `a3140` | 314 m | não | "314 m² é a área (π·r²). O comprimento é 2·π·r = 2·3,14·10 = 62,8 m." | contraste entre o contorno (62,8 m) e o preenchimento interno |
| `a20` | 20 m | não | "20 m é o diâmetro em linha reta. Pela borda circular, multiplica-se por 3,14: 62,8 m." | corda do diâmetro (20 m) comparada com a curva externa (62,8 m) |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — roda de raio r (c1) e diâmetro d = 2r (c2) desenrolada na reta com comprimento C = 2πr (c3) e arco L (c4).
- **Fórmula:** `C`→c3 · `=` · `2` · `·` · `π` · `·` · `r`→c1
- **Definições:** "Número π (≈ 3,14): quantas vezes o diâmetro cabe no comprimento da circunferência (C / d)." · "Comprimento total: C = π·d = 2πr." · "Comprimento de arco de ângulo α: L = (α / 360°)·2πr."
- **Paco (abertura):** "O contorno esticado de qualquer circunferência cabe sempre π diâmetros, e como o diâmetro vale 2 raios, por isso C = 2πr."
- **Dica (hint):** "Toque em cada símbolo para ver o raio, o diâmetro e a volta esticada."

**Frase de encerramento (outro):** "Você desenrolou a roda na reta, viu de onde vem o π ≈ 3,14 e calculou voltas inteiras e arcos parciais."

## i) Treino pós-aula

### Fáceis

#### F1 — `significado-de-pi`
- **Enunciado:** "Dividindo o comprimento C de qualquer circunferência pelo seu diâmetro d, que valor obtemos?"
- **Conta de conferência:** C / d = π ≈ 3,14

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pi` | π (cerca de 3,14) | **sim** | "Certo. O contorno cabe sempre π ≈ 3,14 diâmetros, em qualquer circunferência." |
| `dois-pi` | 2π (cerca de 6,28) | não | "6,28 é a divisão pelo raio (C / r). Pelo diâmetro d dá sempre π ≈ 3,14." |
| `r` | O raio r | não | "A razão C / d não depende do tamanho da roda: vale sempre π ≈ 3,14." |
| `d2` | Metade do diâmetro | não | "Metade do diâmetro é o raio. O quociente C / d vale π ≈ 3,14." |

#### F2 — `comprimento-diametro-10`
- **Enunciado:** "Uma roda tem diâmetro d = 10 cm. Usando π = 3,14, qual é o comprimento de uma volta?"
- **Conta de conferência:** C = 3,14·10 = 31,4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a314` | 31,4 cm | **sim** | "Isso. Como já temos o diâmetro d = 10, basta fazer C = π·d = 3,14·10 = 31,4 cm." |
| `a628` | 62,8 cm | não | "10 cm já é o diâmetro, não o raio. Não dobre de novo: C = 3,14·10 = 31,4 cm." |
| `a157` | 15,7 cm | não | "15,7 cm é meia volta. A volta inteira é 3,14·10 = 31,4 cm." |
| `a3140` | 314 cm | não | "3,14·10 desloca a vírgula uma casa: 31,4 cm." |

#### F3 — `comprimento-em-pi`
- **Enunciado:** "Em função de π, qual é o comprimento de uma circunferência de raio r = 4 cm?"
- **Conta de conferência:** C = 2·π·4 = 8π cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8pi` | 8π cm | **sim** | "Exato. C = 2·π·r = 2·π·4 = 8π cm." |
| `a4pi` | 4π cm | não | "Faltou multiplicar por 2: C = 2·π·4 = 8π cm." |
| `a16pi` | 16π cm | não | "16π é a área (π·4²). O comprimento é 2·π·4 = 8π cm." |
| `a2pi` | 2π cm | não | "2π seria para r = 1. Com r = 4, C = 2·π·4 = 8π cm." |

#### F4 — `meia-volta`
- **Enunciado:** "Uma circunferência inteira tem comprimento 20 cm. Quanto mede uma semicircunferência (arco de 180°)?"
- **Conta de conferência:** (180° / 360°)·20 = 10 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 cm | **sim** | "Certo. 180° é metade de 360°, logo o arco mede metade de 20: 10 cm." |
| `a5` | 5 cm | não | "5 cm seria um quarto de volta (90°). Em 180° é metade: 10 cm." |
| `a20` | 20 cm | não | "20 cm é a volta completa (360°). Meia volta mede 10 cm." |
| `a40` | 40 cm | não | "40 cm são duas voltas. Meia volta mede 20 / 2 = 10 cm." |

### Médias

#### M1 — `cinco-voltas-pracinha`
- **Enunciado:** "Uma pista circular tem raio de 20 m. Usando π = 3, quantos metros uma pessoa percorre ao dar 5 voltas?"
- **Conta de conferência:** 1 volta = 2·3·20 = 120 m ⇒ 5 voltas = 5·120 = 600 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a600` | 600 m | **sim** | "Isso. Uma volta tem 2·3·20 = 120 m, e 5 voltas dão 5·120 = 600 m." |
| `a120` | 120 m | não | "120 m é uma volta só. Em 5 voltas: 5·120 = 600 m." |
| `a300` | 300 m | não | "Você esqueceu o fator 2 da fórmula 2πr. São 5·(2·3·20) = 600 m." |
| `a1200` | 1200 m | não | "20 m é o raio: 1 volta dá 120 m e 5 voltas dão 600 m." |

#### M2 — `arco-60-graus`
- **Enunciado:** "Em uma circunferência de raio 6 cm, quanto mede um arco de 60° (use π = 3)?"
- **Conta de conferência:** L = (60° / 360°)·2·3·6 = (1 / 6)·36 = 6 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 cm | **sim** | "Exato. A volta toda é 2·3·6 = 36 cm, e 60° é 1/6 da volta: 36 / 6 = 6 cm." |
| `a36` | 36 cm | não | "36 cm é a volta inteira (360°). Para 60° divida por 6: 6 cm." |
| `a12` | 12 cm | não | "12 cm seria um arco de 120° (1/3 da volta). Para 60° é 36 / 6 = 6 cm." |
| `a3` | 3 cm | não | "Faltou o 2 na fórmula 2πr: (1/6)·2·3·6 = 6 cm." |

#### M3 — `achar-raio-pelo-comprimento`
- **Enunciado:** "Um bambolê tem 180 cm de comprimento total. Usando π = 3, qual é o seu raio?"
- **Conta de conferência:** 2·3·r = 180 ⇒ 6r = 180 ⇒ r = 30 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a30` | 30 cm | **sim** | "Certo. Como 2·π·r = 6r = 180, o raio é 180 / 6 = 30 cm." |
| `a60` | 60 cm | não | "60 cm é o diâmetro (180 / 3). O raio é metade do diâmetro: 30 cm." |
| `a90` | 90 cm | não | "90 divide só por 2. Divida por 2π = 6: 180 / 6 = 30 cm." |
| `a15` | 15 cm | não | "Você dividiu por 12. Como 2π = 6, r = 180 / 6 = 30 cm." |

### Desafios

#### D1 — `quantas-voltas-pneu`
- **Enunciado:** "O pneu de uma bicicleta tem raio 0,3 m. Usando π = 3, quantas voltas ele dá para percorrer 180 m?"
- **Conta de conferência:** C = 2·3·0,3 = 1,8 m ⇒ voltas = 180 / 1,8 = 100

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a100` | 100 voltas | **sim** | "Isso. Cada volta avança 2·3·0,3 = 1,8 m; em 180 m são 180 / 1,8 = 100 voltas." |
| `a200` | 200 voltas | não | "Você usou π·r = 0,9 m por volta. Com 2πr = 1,8 m, são 180 / 1,8 = 100 voltas." |
| `a10` | 10 voltas | não | "10 voltas dariam só 18 m. Para 180 m são 180 / 1,8 = 100 voltas." |
| `a324` | 324 voltas | não | "Não multiplique 180 por 1,8; divida pela distância de 1 volta: 180 / 1,8 = 100 voltas." |

#### D2 — `perimetro-semicirculo-fronteira`
- **Enunciado:** "Uma janela tem a forma de um semicírculo de raio 5 m fechado embaixo pelo diâmetro. Usando π = 3,14, qual é o seu perímetro total?"
- **Fala do Paco:** "Cuidado com a fronteira: fechar a figura exige somar o arco curvo mais o diâmetro reto."
- **Conta de conferência:** arco = 3,14·5 = 15,7 m; diâmetro = 10 m; total = 15,7 + 10 = 25,7 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a257` | 25,7 m | **sim** | "Exato. Meia circunferência (3,14·5 = 15,7 m) mais o diâmetro reto (10 m) dá 25,7 m." |
| `a157` | 15,7 m | não | "15,7 m é só a parte curva. Faltou somar a base reta (diâmetro 10 m): 25,7 m." |
| `a207` | 20,7 m | não | "A base reta é o diâmetro todo (2·5 = 10 m), não um raio: 15,7 + 10 = 25,7 m." |
| `a314` | 31,4 m | não | "31,4 m é a circunferência inteira. O semicírculo tem 15,7 m curvos + 10 m retos = 25,7 m." |

#### D3 — `pista-atletismo-raias`
- **Enunciado:** "Numa pista circular, o corredor A corre no raio de 10 m e o corredor B no raio de 12 m (use π = 3). Em 1 volta, quanto B corre a mais que A?"
- **Conta de conferência:** 2·3·12 − 2·3·10 = 72 − 60 = 12 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 m | **sim** | "Certo. B percorre 2·3·12 = 72 m e A percorre 2·3·10 = 60 m; diferença de 12 m." |
| `a2` | 2 m | não | "2 m é a diferença entre os raios. Na volta inteira, multiplica-se por 2π = 6: 12 m." |
| `a6` | 6 m | não | "6 m usa só π·Δr. Como C = 2πr, a diferença é 2·3·(12 − 10) = 12 m." |
| `a0` | Correm igual | não | "Quem corre por fora tem raio maior e percorre 2·3·(12 − 10) = 12 m a mais." |

#### D4 — `ponteiro-relogio`
- **Enunciado:** "O ponteiro dos minutos de um relógio tem 10 cm de comprimento. Usando π = 3,14, quanto a sua ponta percorre em 15 minutos?"
- **Conta de conferência:** 15 min = 1/4 de volta (90°) ⇒ (1/4)·2·3,14·10 = 62,8 / 4 = 15,7 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a157` | 15,7 cm | **sim** | "Isso. 15 min é 1/4 de hora (90°), então a ponta anda 62,8 / 4 = 15,7 cm." |
| `a628` | 62,8 cm | não | "62,8 cm é a volta de 60 minutos. Em 15 minutos é um quarto: 15,7 cm." |
| `a314` | 31,4 cm | não | "31,4 cm são 30 minutos (meia volta). Em 15 minutos é metade disso: 15,7 cm." |
| `a942` | 9,42 cm | não | "15 minutos são 1/4 de 62,8 cm, o que dá 15,7 cm." |

#### D5 — `duas-engrenagens`
- **Enunciado:** "Uma engrenagem de raio 15 cm gira acoplada a outra de raio 5 cm. Quando a grande dá 4 voltas, quantas voltas dá a pequena?"
- **Fala do Paco:** "Última. As duas bordas percorrem exatamente a mesma distância sem escorregar."
- **Conta de conferência:** 4·(2π·15) = N·(2π·5) ⇒ 60 = 5N ⇒ N = 12 voltas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 voltas | **sim** | "Exato. Com um terço do raio, a pequena precisa dar o triplo de voltas: 4·3 = 12." |
| `a4` | 4 voltas | não | "A pequena tem contorno 3 vezes menor, então gira 3 vezes mais: 4·3 = 12 voltas." |
| `a133` | 1,33 volta | não | "A menor gira mais vezes, não menos: 4·(15 / 5) = 12 voltas." |
| `a20` | 20 voltas | não | "A razão entre os raios é 15 / 5 = 3, logo 4·3 = 12 voltas." |

### Vestibular

#### V1 — `enem-2010-rolos`
- **Enunciado (resumido):** Um bloco apoia-se sobre rolos cilíndricos de raio R. Qual o deslocamento horizontal do bloco após um rolo dar 1 volta completa sem deslizar?
- **Fala do Paco:** "Some o avanço do centro do rolo sobre o chão com o avanço do bloco sobre o topo do rolo."
- **Fonte:** ENEM 2010, Questão 163 — `https://api.enem.dev/v1/exams/2010/questions/163`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`Y = 4πR`) mantidos.
- **Conta de conferência:** `2πR` (centro no chão) `+ 2πR` (bloco sobre o rolo) `= 4πR`.
- **Opções e feedback:** `Y = R`, `Y = 2R`, `Y = πR`, `Y = 2πR`, `Y = 4πR` (correta).

#### V2 — `enem-2019-catraca`
- **Enunciado (resumido):** Uma bicicleta tem catraca de 7 cm de diâmetro. Para avançar 50% a mais por pedalada, qual deve ser o diâmetro da nova catraca?
- **Fala do Paco:** "Com o mesmo comprimento de corrente puxado, mais voltas (×1,5) exigem uma catraca menor na mesma razão."
- **Fonte:** ENEM 2019, Questão 145 — `https://api.enem.dev/v1/exams/2019/questions/145`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`4,7`) mantidos.
- **Conta de conferência:** `d = 7 / 1,5 = 4,666... ≈ 4,7 cm`.
- **Opções e feedback:** `2,3`, `3,5`, `4,7` (correta), `5,3`, `10,5`.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** comprimento de arco a partir do ângulo central (ponteiros, pêndulos ou setores).
- **Onde procurar:** ENEM, Vunesp, UERJ.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** perímetro de figuras compostas por arcos de circunferência e segmentos.
- **Onde procurar:** ENEM, Unesp, UFRGS.
