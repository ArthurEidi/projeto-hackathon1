# Plano — Elipse como lugar geométrico

**Aula:** 1 — O Barbante Preso em Dois Pontos · A elipse como lugar geométrico
**Caminho:** geometria / geometria-analitica / elipse
**Pré-requisitos que o aluno já domina:** distância entre pontos, equação da circunferência, teorema de Pitágoras.

## a) Ancoragem mecânica
A máquina recebe dois pontos fixos (focos F₁ e F₂) e um comprimento 2a e devolve todos os pontos P cuja soma das distâncias aos focos é 2a. É o barbante preso nos focos e esticado por um lápis. Focos e comprimento são as entradas; a curva traçada é a saída.

## b) Visual de partida
WIDGET NOVO `lugar_geometrico` (modo elipse): dois focos no eixo x em (±c; 0) (c3), um "barbante" de comprimento 2a (c4) e o lápis P, que só se move com o barbante esticado e deixa rastro (curva). Os segmentos PF₁ e PF₂ mostram suas medidas e a soma. Slider para c com a fixo em 5. Métricas: `c`, `pontos_sobre`, `topo_tocado`.

## c) Caso neutro
Focos juntos (c = 0): as duas distâncias são iguais, cada uma vale a, e o barbante desenha uma circunferência de raio a. A circunferência é a elipse sem achatamento nenhum. Depois separamos os focos.

## d) Panorama e recorte
Elipses descrevem órbitas de planetas e aparecem em espelhos e arcos; há também excentricidade, elipses com centro fora da origem e o corte de um cone. Aqui: centro na origem, eixo maior horizontal ou vertical, x²/a² + y²/b² = 1 e a² = b² + c².

## e) Progressão por contraste
1. Focos juntos: circunferência de raio 5 (referência).
2. Focos separados (c = 3): a curva se achata; PF₁ + PF₂ = 10 em todo ponto.
3. Topo da elipse: distâncias iguais a 5; Pitágoras dá a altura b = 4.
4. Focos quase nas pontas: a elipse fica muito achatada.

## f) Dedução causal da forma
No topo (0; b), P está à mesma distância dos dois focos, então cada distância vale a; o triângulo com catetos b e c tem hipotenusa a, e por isso a² = b² + c². Nas pontas (±a; 0), as distâncias são a − c e a + c, que somam 2a. Escrevendo PF₁ + PF₂ = 2a para (x; y) e simplificando, chega-se a x²/a² + y²/b² = 1: a circunferência x² + y² = a² "esticada" de fator b/a na vertical.

## g) Simulação espacial e fronteiras
c = 0 dá circunferência; c perto de a dá elipse quase segmento; c = a reduz a curva ao segmento F₁F₂; 2a menor que a distância entre os focos não desenha nada. Se o maior denominador estiver sob y², o eixo maior é vertical e os focos ficam no eixo y.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Semieixo maior | a: metade do eixo maior, metade do barbante. |
| c2 | Semieixo menor | b: a meia altura da elipse. |
| c3 | Distância focal | c: do centro até cada foco. |
| c4 | Soma das distâncias | PF₁ + PF₂, sempre igual a 2a. |

### Passo 1 — `focos-juntos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `lugar_geometrico` (modo elipse) — a = 5 fixo; focos em (±c; 0) (c3); a curva se redesenha com o slider; a circunferência de raio 5 fica como fantasma.
- **Sliders:** `c` · "Afastar os focos" · 0..3 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "Com os dois focos juntos, um barbante de 10 desenha que curva? Depois separe os focos."
- **Interação do aluno:** vê a circunferência e afasta os focos até c = 3; a curva se achata.
- **Conclusão:** `c ≥ 3`
- **Paco (conclusão):** "Juntos, desenham uma circunferência de raio 5. Separados, a curva se achata: é uma elipse."
- **Tati (dúvida):** `fim` — P: "Onde aparece uma elipse de verdade?" / R: "Nas órbitas dos planetas, com o Sol num foco. Hoje: a elipse com centro na origem."

### Passo 2 — `barbante`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6
- **Widget:** `lugar_geometrico` — c = 3; o aluno arrasta o lápis P com o barbante esticado; PF₁, PF₂ e a soma (c4) aparecem; o rastro desenha a curva. Emite `pontos_sobre`.
- **Sliders:** nenhum
- **Paco (abertura):** "O barbante tem 10 e as pontas presas nos focos. Estique com o lápis e dê a volta: as duas distâncias mudam, e a soma?"
- **Interação do aluno:** arrasta P em volta; as medidas mudam e a soma fica 10.
- **Conclusão:** `pontos_sobre ≥ 4`
- **Paco (conclusão):** "A soma é sempre 10, o comprimento do barbante. Esse é o teste da elipse: PF₁ + PF₂ = 2a."

### Passo 3 — `topo-e-pitagoras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6
- **Widget:** `lugar_geometrico` — c = 3; tocar no topo da elipse desenha o triângulo de catetos c (c3) e b (c2) e hipotenusa a (c1). Emite `topo_tocado`.
- **Sliders:** nenhum
- **Paco (abertura):** "No topo da elipse, P está à mesma distância dos dois focos. Quanto vale cada distância, e qual é a altura?"
- **Interação do aluno:** toca o ponto mais alto.
- **Conclusão:** `topo_tocado ≥ 1`
- **Paco (conclusão):** "Cada distância vale 5, metade de 10. Com c = 3, Pitágoras dá a altura 4: a² = b² + c²."

### Passo 4 — `achatar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7
- **Widget:** `lugar_geometrico` — a = 5; c aumenta; a altura b é mostrada; fantasma da elipse c = 3.
- **Sliders:** `c` · "Afastar os focos" · 3..4 · passo 1 · inicial 3 · c3
- **Paco (abertura):** "Afaste os focos para perto das pontas. O que acontece com a altura?"
- **Interação do aluno:** leva c a 4 e vê b cair de 4 para 3.
- **Conclusão:** `c ≥ 4`
- **Paco (conclusão):** "Com c = 4, b = 3: a elipse achata. Se os focos chegassem às pontas, ela viraria um segmento."
- **Tati (dúvida):** `fim` — P: "E se o barbante for menor que a distância entre os focos?" / R: "Aí não dá para esticar: não existe elipse."

### Passo 5 — `desafio-focos`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `lugar_figura` — elipse x²/25 + y²/9 = 1, sem focos.
- **Paco (abertura):** "Leia a e b; depois use Pitágoras para achar c."
- **Enunciado:** "Onde ficam os focos de x²/25 + y²/9 = 1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `f4` | (±4; 0) | **sim** | "Isso. c² = 25 − 9 = 16." | focos em (±4; 0) e triângulo 3, 4, 5 |
| `f5` | (±5; 0) | não | "(±5; 0) são as pontas, os vértices. c = √(25 − 9) = 4." | pontas acesas em c1 |
| `f3` | (±3; 0) | não | "3 é b, a meia altura. c = 4." | meia altura acesa em c2 |
| `f34` | (±√34; 0) | não | "Você somou 25 + 9. Na elipse, c² = a² − b² = 16." | triângulo com hipotenusa a destacada |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `lugar_figura` — elipse a = 5, b = 4, c = 3 com o triângulo e um ponto P com PF₁ + PF₂.
- **Fórmula:** `x²/a²`→c1 · `+` · `y²/b²`→c2 · `=` · `1` ; `a² = b² + c²`→c3
- **Definições:** "Elipse: pontos com PF₁ + PF₂ = 2a." · "a² = b² + c², pelo triângulo do topo." · "Focos juntos (c = 0): a elipse é uma circunferência."
- **Paco (abertura):** "No topo, cada distância vale a e forma um triângulo com b e c. Por isso a² = b² + c²."
- **Dica (hint):** "Toque em uma letra para ver o segmento na elipse."

**Frase de encerramento (outro):** "Você esticou um barbante entre dois focos: a soma das distâncias é 2a, e a² = b² + c² sai do triângulo do topo."

## i) Treino pós-aula

### Fáceis

#### F1 — `definicao`
- **Enunciado:** "Na elipse, o que é constante para todo ponto P?"
- **Conta de conferência:** PF₁ + PF₂ = 2a

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma` | A soma das distâncias aos focos | **sim** | "Isso. É o comprimento do barbante." |
| `diferenca` | A diferença das distâncias | não | "Diferença constante é a hipérbole. Na elipse, a soma." |
| `distancia-centro` | A distância ao centro | não | "Isso seria circunferência. Na elipse, a soma aos focos." |
| `foco-reta` | A distância a um foco e a uma reta | não | "Isso é a parábola. Na elipse, a soma aos dois focos." |

#### F2 — `semieixo-maior`
- **Enunciado:** "Qual o semieixo maior de x²/25 + y²/16 = 1?"
- **Conta de conferência:** a² = 25 ⇒ a = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. O maior denominador é a² = 25." |
| `a25` | 25 | não | "25 é a². a = 5." |
| `a4` | 4 | não | "4 é b, o semieixo menor. a = 5." |
| `a3` | 3 | não | "3 é c. O semieixo maior é 5." |

#### F3 — `focos-juntos`
- **Enunciado:** "Uma elipse com os dois focos no mesmo ponto é:"
- **Conta de conferência:** c = 0 ⇒ a = b

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `circ` | Uma circunferência | **sim** | "Isso. Distâncias iguais a a: raio a." |
| `segmento` | Um segmento | não | "Segmento é com os focos nas pontas. Juntos: circunferência." |
| `parabola` | Uma parábola | não | "Com focos juntos, a curva fica redonda: circunferência." |
| `nada` | Nada | não | "Ainda existe curva: uma circunferência de raio a." |

#### F4 — `soma-x2-9`
- **Enunciado:** "Na elipse x²/9 + y²/4 = 1, quanto vale PF₁ + PF₂?"
- **Conta de conferência:** 2a = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Certo. a = 3, soma 2a = 6." |
| `a3` | 3 | não | "3 é a. A soma é 2a = 6." |
| `a9` | 9 | não | "9 é a². A soma é 6." |
| `a4` | 4 | não | "4 é 2b. A soma das distâncias é 2a = 6." |

### Médias

#### M1 — `c-de-25-16`
- **Enunciado:** "Na elipse x²/25 + y²/16 = 1, quanto vale c?"
- **Conta de conferência:** c² = 25 − 16 = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. c² = 9." |
| `a9` | 9 | não | "9 é c². c = 3." |
| `a-raiz41` | √41 | não | "Você somou. Na elipse, c² = a² − b² = 9." |
| `a1` | 1 | não | "5 − 4 não é a conta. c² = 25 − 16 = 9, c = 3." |

#### M2 — `vertices`
- **Enunciado:** "Quais os vértices no eixo x de x²/16 + y²/9 = 1?"
- **Conta de conferência:** a = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v4` | (±4; 0) | **sim** | "Certo. a = √16." |
| `v16` | (±16; 0) | não | "16 é a². Vértices em (±4; 0)." |
| `v3` | (±3; 0) | não | "3 é b, no eixo y. No eixo x: (±4; 0)." |
| `v-raiz7` | (±√7; 0) | não | "√7 é c, os focos. Vértices: (±4; 0)." |

#### M3 — `b-por-pitagoras`
- **Enunciado:** "Uma elipse tem a = 10 e c = 6. Quanto vale b?"
- **Conta de conferência:** b² = 100 − 36 = 64

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | **sim** | "Isso. Triângulo 6, 8, 10." |
| `a4` | 4 | não | "10 − 6 não é Pitágoras. b² = 100 − 36 = 64." |
| `a-raiz136` | √136 | não | "Somou. b² = a² − c² = 64, b = 8." |
| `a64` | 64 | não | "64 é b². b = 8." |

### Desafios

#### D1 — `montar-equacao`
- **Enunciado:** "Qual a equação da elipse com centro na origem, a = 5 e focos em (±4; 0)?"
- **Conta de conferência:** b² = 25 − 16 = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `e25-9` | x²/25 + y²/9 = 1 | **sim** | "Certo. b² = 9." |
| `e25-16` | x²/25 + y²/16 = 1 | não | "16 é c². No denominador vai b² = 25 − 16 = 9." |
| `e5-3` | x²/5 + y²/3 = 1 | não | "Os denominadores são a² e b²: 25 e 9." |
| `e9-25` | x²/9 + y²/25 = 1 | não | "Assim o eixo maior seria vertical. Focos no eixo x: x²/25 + y²/9 = 1." |

#### D2 — `vertical`
- **Enunciado:** "Onde ficam os focos de x²/9 + y²/25 = 1?"
- **Fala do Paco:** "Veja sob qual letra está o maior denominador."
- **Conta de conferência:** a² = 25 sob y²; c = 4: (0; ±4)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f0m4` | (0; ±4) | **sim** | "Isso. O eixo maior é vertical." |
| `fm40` | (±4; 0) | não | "O 25 está sob y²: o eixo maior é vertical. Focos (0; ±4)." |
| `f0m5` | (0; ±5) | não | "(0; ±5) são os vértices. Focos em c = 4." |
| `f0m3` | (0; ±3) | não | "3 é b. c = √(25 − 9) = 4." |

#### D3 — `forma-inteira`
- **Enunciado:** "Qual o semieixo maior da elipse 9x² + 16y² = 144?"
- **Fala do Paco:** "Divida tudo por 144 para chegar à forma com 1."
- **Conta de conferência:** x²/16 + y²/9 = 1 ⇒ a = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Certo. Dividindo por 144: x²/16 + y²/9 = 1." |
| `a16` | 16 | não | "16 é a². a = 4." |
| `a12` | 12 | não | "12 é √144. Dividindo tudo por 144: a = 4." |
| `a3` | 3 | não | "3 é o semieixo menor. O maior é 4." |

#### D4 — `mais-achatada`
- **Enunciado:** "Duas elipses têm a = 5; uma tem c = 1 e a outra c = 4. Qual é mais achatada?"
- **Conta de conferência:** b = √24 ≈ 4,9 contra b = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c4` | A de c = 4 | **sim** | "Isso. Focos longe do centro: b = 3, bem achatada." |
| `c1` | A de c = 1 | não | "Com c = 1 a elipse quase é uma circunferência. A de c = 4 é mais achatada." |
| `iguais` | Iguais | não | "O mesmo a não basta. Com c = 4, b = 3: mais achatada." |

#### D5 — `orbita`
- **Enunciado:** "Uma órbita é uma elipse com a = 5 e c = 3, com o Sol num foco. Qual a menor distância do planeta ao Sol?"
- **Fala do Paco:** "Última. O ponto mais próximo é a ponta do lado do Sol."
- **Conta de conferência:** a − c = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | **sim** | "Certo. Da ponta (5; 0) ao foco (3; 0): 2." |
| `a8` | 8 | não | "8 = a + c é a maior distância. A menor é a − c = 2." |
| `a4` | 4 | não | "4 é b. A menor distância ao foco é 5 − 3 = 2." |
| `a5` | 5 | não | "5 é a distância do centro à ponta. Até o foco: 2." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** focos e eixos a partir da equação.
- **Onde procurar:** UFRGS, UEL, PUC-Rio (lista de cônicas do Projeto Agatha; precisam de ano).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** equação a partir de focos e vértices.
- **Onde procurar:** Unesp, UFPR.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** elipse em contexto (órbita, arco, mesa de bilhar).
- **Onde procurar:** ENEM, Unicamp.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** reconhecer elipse na forma Ax² + By² = C.
- **Onde procurar:** ENEM (questão 9x² + 16y² = 144 citada em lista; conferir edição e caderno).
