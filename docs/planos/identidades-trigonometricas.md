# Plano — Relações fundamentais e identidades trigonométricas

**Aula:** 1 — A Soma que Sempre Dá Um · Pitágoras no ciclo, tangente e secante
**Caminho:** geometria / trigonometria / identidades-trigonometricas
**Pré-requisitos que o aluno já domina:** seno-cosseno-tangente-no-ciclo

## a) Ancoragem mecânica
A máquina gira o ponto P no ciclo de raio 1 e constrói dois quadrados sobre os catetos |cos θ| e |sen θ| do triângulo retângulo interno. O ângulo θ é a entrada que redistribui as áreas entre os dois quadrados; a soma sen²θ + cos²θ = 1 é a saída invariante, da qual derivam tg θ = sen θ / cos θ e sec²θ = 1 + tg²θ.

## b) Visual de partida
WIDGET NOVO `ciclo_trigonometrico`: ciclo de raio 1 com o triângulo retângulo de hipotenusa 1, cateto horizontal |cos θ| e vertical |sen θ|. Ao lado, duas barras de área sen²θ (c1) e cos²θ (c2) empilhadas que somam sempre 1 (c3), independentemente do giro de θ.

## c) Caso neutro
Em θ = 0°, cos 0° = 1 e sen 0° = 0: toda a área 1 está concentrada no quadrado do cosseno (1² + 0² = 1). Em θ = 45°, os dois quadrados empatam com área 0,5 cada (0,5 + 0,5 = 1), servindo de referência de equilíbrio.

## d) Panorama e recorte
Identidades trigonométricas incluem fórmulas de adição, arco duplo e transformações em produto. Aqui estudamos a relação fundamental sen²θ + cos²θ = 1, as razões inversas (secante, cossecante e cotangente) e a identidade 1 + tg²θ = sec²θ.

## e) Progressão por contraste
1. θ = 0° e θ = 45° (referência): a área passa de 1 + 0 = 1 para 0,5 + 0,5 = 1 sem alterar o total.
2. Giro livre pelos 4 quadrantes: como elevar ao quadrado elimina o sinal negativo, sen²θ + cos²θ continua valendo 1 em qualquer quadrante.
3. Achar uma razão a partir da outra: sabendo sen θ e o quadrante, cos²θ = 1 − sen²θ determina cos θ e tg θ = sen θ / cos θ.
4. Dividir tudo por cos²θ (com cos θ ≠ 0): o triângulo ampliado até a reta tangente revela 1 + tg²θ = sec²θ.

## f) Dedução causal da forma
No ciclo unitário, as coordenadas do ponto formam um triângulo retângulo de catetos |cos θ| e |sen θ| e hipotenusa 1. Pelo Teorema de Pitágoras, a soma dos quadrados dos catetos é o quadrado da hipotenusa, por isso sen²θ + cos²θ = 1 para qualquer θ, e dividir os dois lados por cos²θ produz tan²θ + 1 = sec²θ.

## g) Simulação espacial e fronteiras
O aluno gira θ para quadrantes onde seno ou cosseno é negativo, verificando que na hora de extrair a raiz ±√(1 − sen²θ) é o quadrante que decide o sinal. Também testa θ = 90° e 270°, onde cos θ = 0 impede a divisão para tangente e secante.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Quadrado do seno | Valor de sen²θ, sempre entre 0 e 1 (nunca negativo). |
| c2 | Quadrado do cosseno | Valor de cos²θ, que completa sen²θ para somar 1. |
| c3 | Relação fundamental | A soma invariante sen²θ + cos²θ = 1 (hipotenusa ao quadrado). |
| c4 | Secante (sec θ) | Inverso do cosseno (1 / cos θ); hipotenusa até a reta tangente. |

### Passo 1 — `soma-constante-1`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `ciclo_trigonometrico` — triângulo no ciclo com hipotenusa 1 (c3) e barras empilhadas de sen²θ (c1) e cos²θ (c2); começa em θ = 0°. Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 0..90 · passo 15 · inicial 0 · ink
- **Paco (abertura):** "Em 0°, cos²θ = 1 e sen²θ = 0. Gire θ até 45° e depois 90°: quanto dá a soma sen²θ + cos²θ durante o giro?"
- **Interação do aluno:** move `theta` até 90°; vê a barra c2 descer e a c1 subir na mesma medida, mantendo a pilha total cravada em 1.
- **Conclusão:** `theta ≥ 90`
- **Paco (conclusão):** "Dá sempre 1: em 45° fica 0,5 + 0,5 = 1, e em 90° fica 1 + 0 = 1. É o Teorema de Pitágoras dentro do ciclo de raio 1."
- **Tati (dúvida):** `fim` — P: "Para que serve saber que sen²θ + cos²θ = 1?" / R: "Serve para descobrir o cosseno e a tangente conhecendo só o seno, e para simplificar expressões."

### Passo 2 — `sinal-pelo-quadrante`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (sinal em cada quadrante)
- **Widget:** `ciclo_trigonometrico` — ponto movendo-se do 1º ao 2º quadrante com módulo |sen θ| = 0,6 fixado nas paradas; exibe cos²θ = 0,64 e o sinal de cos θ. Emite `quad`.
- **Sliders:** `quad` · "Quadrante do arco" · 1..4 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Se sen θ = 0,6, temos cos²θ = 1 − 0,36 = 0,64. Mude para o 2º quadrante: cos θ vale +0,8 ou −0,8?"
- **Interação do aluno:** passa `quad` pelo 2º, 3º e 4º quadrantes; no 2º Q vê x < 0, marcando cos θ = −0,8.
- **Conclusão:** `quad ≥ 2`
- **Paco (conclusão):** "No 2º quadrante vale −0,8. A relação sen²θ + cos²θ = 1 dá o módulo 0,8, mas quem escolhe o sinal + ou − é o quadrante."

### Passo 3 — `tangente-e-secante`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (fronteira cos θ = 0)
- **Widget:** `ciclo_trigonometrico` — mostra o triângulo ampliado de base 1, altura tg θ e hipotenusa sec θ = 1 / cos θ (c4). Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 0..60 · passo 30 · inicial 0 · c4
- **Paco (abertura):** "Dividindo sen²θ + cos²θ = 1 por cos²θ, surge sec θ = 1 / cos θ. Leve θ a 60° (cos 60° = 0,5): quanto vale sec 60°?"
- **Interação do aluno:** leva `theta` a 60°; vê cos 60° = 1/2, sec 60° = 2 e 1 + tg²60° = 1 + 3 = 4 = 2².
- **Conclusão:** `theta ≥ 60`
- **Paco (conclusão):** "Vale 2, que é o inverso de 1/2. No triângulo da tangente, Pitágoras garante que 1 + tg²θ = sec²θ."
- **Tati (dúvida):** `fim` — P: "A secante existe para qualquer ângulo?" / R: "Não: como sec θ = 1 / cos θ, ela não existe em 90° e 270°, onde cos θ = 0."

### Passo 4 — `desafio-achar-cosseno`
- **Tipo:** `micro_challenge`
- **Pilares:** 6, 7
- **Figura:** WIDGET NOVO `ciclo_trigonometrico_figura` — arco θ no 1º quadrante com altura sen θ = 3/5 (c1) e base cos θ (c2) destacada.
- **Paco (abertura):** "Use sen²θ + cos²θ = 1 e lembre que no 1º quadrante o cosseno é positivo."
- **Enunciado:** "Sabendo que sen θ = 3/5 e que θ está no 1º quadrante, quanto vale cos θ?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `c45` | 4/5 | **sim** | "Isso. cos²θ = 1 − 9/25 = 16/25; no 1º quadrante, cos θ = 4/5." | destaca cos θ = 4/5 em c2 e mostra 9/25 + 16/25 = 1 |
| `c25` | 2/5 | não | "Não faça 1 − 3/5: eleve ao quadrado! 1 − 9/25 = 16/25, raiz = 4/5." | mostra a barra sen²θ = 9/25 e cos²θ = 16/25 |
| `c1625` | 16/25 | não | "16/25 é cos²θ. Tirando a raiz quadrada, cos θ = 4/5." | destaca √(16/25) = 4/5 na base do triângulo |
| `cm45` | −4/5 | não | "No 1º quadrante o cosseno é positivo: cos θ = +4/5." | destaca o 1º quadrante com sinal x > 0 |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `ciclo_trigonometrico_figura` — triângulo interno com sen θ (c1), cos θ (c2), raio 1 (c3) e triângulo externo com tg θ e sec θ (c4).
- **Fórmula:** `sen²θ`→c1 · `+` · `cos²θ`→c2 · `=` · `1`→c3 · `;` · `1 + tg²θ` · `=` · `sec²θ`→c4
- **Definições:** "Relação fundamental: sen²θ + cos²θ = 1 vale para qualquer θ real." · "Secante e cossecante: sec θ = 1 / cos θ e cossec θ = 1 / sen θ." · "Identidade da tangente: 1 + tg²θ = sec²θ (para cos θ ≠ 0)."
- **Paco (abertura):** "Os catetos do ciclo unitário medem |sen θ| e |cos θ| com hipotenusa 1, por isso a soma de seus quadrados é sempre igual a 1."
- **Dica (hint):** "Toque em cada termo da fórmula para ver o segmento e o quadrado correspondente no ciclo."

**Frase de encerramento (outro):** "Você viu que sen²θ + cos²θ dá sempre 1 pelo Teorema de Pitágoras no ciclo e usou isso para encontrar cosseno, tangente e secante."

## i) Treino pós-aula

### Fáceis

#### F1 — `soma-quadrados-37`
- **Enunciado:** "Quanto vale o número sen²37° + cos²37°?"
- **Conta de conferência:** sen²θ + cos²θ = 1 para qualquer θ

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v1` | 1 | **sim** | "Certo. Pela relação fundamental, sen²θ + cos²θ = 1 para qualquer ângulo." |
| `v37` | 37 | não | "Não importa o ângulo: sen²θ + cos²θ vale sempre 1." |
| `v0` | 0 | não | "A soma dos quadrados dos catetos no ciclo de raio 1 dá sempre 1." |
| `v2` | 2 | não | "Cada quadrado é menor que 1, e a soma deles é sempre sen²θ + cos²θ = 1." |

#### F2 — `isolar-cos2`
- **Enunciado:** "Se sen²θ = 0,3, quanto vale cos²θ?"
- **Conta de conferência:** cos²θ = 1 − 0,3 = 0,7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c07` | 0,7 | **sim** | "Isso. Como sen²θ + cos²θ = 1, temos cos²θ = 1 − 0,3 = 0,7." |
| `c03` | 0,3 | não | "0,3 é sen²θ. O que falta para completar 1 é cos²θ = 0,7." |
| `c091` | 0,91 | não | "O dado já é sen²θ = 0,3 (não precisa elevar ao quadrado): 1 − 0,3 = 0,7." |
| `c13` | 1,3 | não | "Subtraia de 1 em vez de somar: cos²θ = 1 − 0,3 = 0,7." |

#### F3 — `calcular-secante`
- **Enunciado:** "Sabendo que sec θ = 1 / cos θ, quanto vale sec θ quando cos θ = 2/5?"
- **Conta de conferência:** 1 / (2/5) = 5/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s52` | 5/2 | **sim** | "Exato. A secante é o inverso do cosseno: basta inverter 2/5 para 5/2." |
| `s25` | 2/5 | não | "2/5 é o próprio cosseno. Invertendo a fração, sec θ = 5/2." |
| `s35` | 3/5 | não | "Não é complementar a 1; sec θ é o inverso multiplicativo: 5/2." |
| `sm25` | −2/5 | não | "Inverso não é trocar o sinal, é inverter a fração: sec θ = 5/2." |

#### F4 — `tangente-por-seno-cosseno`
- **Enunciado:** "Se para um ângulo θ temos sen θ = 0,6 e cos θ = 0,8, quanto vale tg θ?"
- **Conta de conferência:** tg θ = 0,6 / 0,8 = 6/8 = 3/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t34` | 3/4 | **sim** | "Certo. tg θ = sen θ / cos θ = 0,6 / 0,8 = 3/4." |
| `t43` | 4/3 | não | "4/3 é cos θ / sen θ (cotangente). A tangente é sen θ / cos θ = 3/4." |
| `t14` | 1,4 | não | "Divida sen θ por cos θ em vez de somar: 0,6 / 0,8 = 3/4." |
| `t048` | 0,48 | não | "Divida em vez de multiplicar: tg θ = 0,6 / 0,8 = 3/4." |

### Médias

#### M1 — `cosseno-no-2q`
- **Enunciado:** "Sabendo que sen θ = 4/5 e que θ está no 2º quadrante, quanto vale cos θ?"
- **Conta de conferência:** cos²θ = 1 − 16/25 = 9/25; no 2º Q, cos θ < 0 ⇒ cos θ = −3/5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `cm35` | −3/5 | **sim** | "Isso. cos²θ = 9/25 e, como θ está no 2º quadrante, cos θ = −3/5." |
| `cp35` | 3/5 | não | "No 2º quadrante o cosseno é negativo, portanto cos θ = −3/5." |
| `cm925` | −9/25 | não | "9/25 é cos²θ. Extraindo a raiz com o sinal do 2º Q, cos θ = −3/5." |
| `cm15` | −1/5 | não | "Eleve ao quadrado: 1 − 16/25 = 9/25, logo cos θ = −3/5." |

#### M2 — `secante-pela-tangente`
- **Enunciado:** "Se tg θ = 2, quanto vale sec²θ?"
- **Conta de conferência:** sec²θ = 1 + tg²θ = 1 + 2² = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s5` | 5 | **sim** | "Certo. Pela identidade sec²θ = 1 + tg²θ, temos 1 + 4 = 5." |
| `s3` | 3 | não | "Eleve a tangente ao quadrado: 1 + 2² = 1 + 4 = 5." |
| `s4` | 4 | não | "4 é apenas tg²θ. Somando 1, sec²θ = 1 + 4 = 5." |
| `sr5` | √5 | não | "A pergunta pede sec²θ (já ao quadrado), que vale 1 + 4 = 5." |

#### M3 — `simplificar-expressao`
- **Enunciado:** "Simplificando a expressão (1 − cos²θ) / cos²θ (para cos θ ≠ 0), obtemos:"
- **Conta de conferência:** (1 − cos²θ) / cos²θ = sen²θ / cos²θ = tg²θ

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tg2` | tg²θ | **sim** | "Exato. Como 1 − cos²θ = sen²θ, fica sen²θ / cos²θ = tg²θ." |
| `sen2` | sen²θ | não | "1 − cos²θ é sen²θ, mas ainda está dividido por cos²θ, resultando em tg²θ." |
| `sec2` | sec²θ | não | "sec²θ seria 1 / cos²θ. Como o numerador é sen²θ, o resultado é tg²θ." |
| `um` | 1 | não | "1 − cos²θ vale sen²θ, e sen²θ / cos²θ = tg²θ." |

### Desafios

#### D1 — `achar-tangente-3q`
- **Enunciado:** "Se cos θ = −12/13 e θ está no 3º quadrante, quanto vale tg θ?"
- **Conta de conferência:** sen²θ = 1 − 144/169 = 25/169 ⇒ sen θ = −5/13 (3º Q) ⇒ tg θ = (−5/13)/(−12/13) = 5/12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t512` | 5/12 | **sim** | "Isso. sen θ = −5/13 e, no 3º quadrante, tg θ = (−5/13)/(−12/13) = +5/12." |
| `tm512` | −5/12 | não | "No 3º quadrante seno e cosseno são negativos, então a tangente é positiva: 5/12." |
| `t513` | −5/13 | não | "−5/13 é o sen θ. Dividindo por cos θ = −12/13, obtemos tg θ = 5/12." |
| `t125` | 12/5 | não | "12/5 é a cotangente (cos/sen). A tangente é sen/cos = 5/12." |

#### D2 — `quadrado-da-soma`
- **Enunciado:** "Sabendo que sen θ · cos θ = 0,2, quanto vale (sen θ + cos θ)²?"
- **Conta de conferência:** (sen θ + cos θ)² = sen²θ + cos²θ + 2·sen θ·cos θ = 1 + 2·0,2 = 1,4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v14` | 1,4 | **sim** | "Certo. (sen θ + cos θ)² = (sen²θ + cos²θ) + 2·sen θ·cos θ = 1 + 0,4 = 1,4." |
| `v1` | 1 | não | "Faltou o termo do meio 2·sen θ·cos θ = 0,4. O total é 1 + 0,4 = 1,4." |
| `v12` | 1,2 | não | "O termo do meio tem fator 2: 1 + 2·0,2 = 1,4." |
| `v04` | 0,4 | não | "0,4 é só 2·sen θ·cos θ; somando sen²θ + cos²θ = 1, dá 1,4." |

#### D3 — `fronteira-cossecante`
- **Enunciado:** "A cossecante é definida por cossec θ = 1 / sen θ. Qual dos valores abaixo cossec θ NUNCA pode assumir?"
- **Conta de conferência:** |sen θ| ≤ 1 ⇒ |cossec θ| = 1 / |sen θ| ≥ 1 (nunca fica entre −1 e 1)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v05` | 0,5 | **sim** | "Exato. Se 1 / sen θ = 0,5, teríamos sen θ = 2, o que é impossível." |
| `v1` | 1 | não | "Quando sen θ = 1 (em 90°), cossec θ = 1. O valor impossível é 0,5." |
| `v2` | 2 | não | "Quando sen θ = 0,5 (em 30°), cossec θ = 2. O impossível é 0,5 (entre −1 e 1)." |
| `vm2` | −2 | não | "Quando sen θ = −0,5, cossec θ = −2. O impossível é 0,5." |

#### D4 — `fatoracao-3-vezes`
- **Enunciado:** "Quanto vale a expressão 3·sen²θ + 3·cos²θ − 1 para qualquer ângulo θ?"
- **Conta de conferência:** 3·(sen²θ + cos²θ) − 1 = 3·1 − 1 = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r2` | 2 | **sim** | "Isso. Colocando 3 em evidência: 3·(sen²θ + cos²θ) − 1 = 3·1 − 1 = 2." |
| `r3` | 3 | não | "3·(sen²θ + cos²θ) dá 3, mas ainda é preciso subtrair 1: 3 − 1 = 2." |
| `r0` | 0 | não | "3·(sen²θ + cos²θ) = 3·1 = 3, e 3 − 1 = 2." |
| `r5` | 5 | não | "Não some os coeficientes 3 + 3; sen²θ + cos²θ = 1, logo 3·1 − 1 = 2." |

#### D5 — `cosseno-pela-tangente`
- **Enunciado:** "Sabendo que tg θ = √3 e que θ está no 3º quadrante, quanto valem sec θ e cos θ?"
- **Fala do Paco:** "Ache sec²θ = 1 + tg²θ, escolha o sinal do 3º quadrante e depois inverta."
- **Conta de conferência:** sec²θ = 1 + 3 = 4; no 3º Q, cos θ < 0 ⇒ sec θ = −2 e cos θ = −1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sm2cm` | −2 e −1/2 | **sim** | "Exato. sec²θ = 1 + 3 = 4; no 3º quadrante ambos são negativos: sec θ = −2 e cos θ = −1/2." |
| `sp2cp` | 2 e 1/2 | não | "No 3º quadrante o cosseno e a secante são negativos: −2 e −1/2." |
| `sm4cm` | −4 e −1/4 | não | "4 é sec²θ. Tirando a raiz no 3º quadrante: sec θ = −2 e cos θ = −1/2." |
| `sm2cp` | −2 e 1/2 | não | "Secante e cosseno têm sempre o mesmo sinal: no 3º Q, −2 e −1/2." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** usar a relação fundamental sen²θ + cos²θ = 1 e o quadrante para achar cos θ ou tg θ a partir de sen θ.
- **Onde procurar:** Fuvest, Vunesp, UFRGS, UFPR.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** simplificar uma expressão trigonométrica usando identidades fundamentais (sen²θ + cos²θ = 1, tg θ = sen θ / cos θ, sec θ = 1 / cos θ).
- **Onde procurar:** Mackenzie, PUC, UERJ, Unicamp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar tangente e secante (1 + tg²θ = sec²θ) ou calcular (sen θ + cos θ)².
- **Onde procurar:** Fuvest, ITA/IME (nível básico), Unesp.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** resolver equação trigonométrica substituindo cos²x por 1 − sen²x.
- **Onde procurar:** Unicamp, Fuvest, UFPR.
