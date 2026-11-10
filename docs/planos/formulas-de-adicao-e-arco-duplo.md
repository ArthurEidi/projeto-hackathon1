# Plano — Fórmulas de adição e arco duplo

**Aula:** 1 — Somar Giros Não É Somar Sombras · Adição de arcos e arco duplo
**Caminho:** geometria / trigonometria / formulas-de-adicao-e-arco-duplo
**Pré-requisitos que o aluno já domina:** identidades-trigonometricas, funcoes-trigonometricas

## a) Ancoragem mecânica
A máquina empilha dois giros α e β no ciclo trigonométrico de raio 1 e projeta a posição final do arco somado α + β nos eixos. Os ângulos α e β são as duas entradas independentes; porque o segundo giro β parte de um eixo já inclinado por α, as sombras de saída misturam senos e cossenos: sen(α + β) = sen α·cos β + sen β·cos α e cos(α + β) = cos α·cos β − sen α·sen β.

## b) Visual de partida
WIDGET NOVO `ciclo_trigonometrico`: dois setores angulares empilhados — o primeiro de ângulo α (a partir do eixo x) e o segundo de ângulo β apoiado sobre o raio final de α. Ao lado, uma barra compara a altura real sen(α + β) com a soma ingênua sen α + sen β, mostrando visualmente a diferença.

## c) Caso neutro
Quando o segundo giro é zero (β = 0°), temos cos 0° = 1 e sen 0° = 0: as fórmulas devolvem sen(α + 0°) = sen α·1 + 0 = sen α e cos(α + 0°) = cos α·1 − 0 = cos α. Esse estado inicial mostra o arco α sozinho antes de somarmos β.

## d) Panorama e recorte
Das fórmulas de adição saem também o arco metade, o arco triplo e a prostaférese (soma em produto). Nesta aula desconstruímos o erro clássico sen(α + β) ≠ sen α + sen β, deduzimos o seno e o cosseno da soma/diferença e chegamos ao arco duplo (quando β = α).

## e) Progressão por contraste
1. β = 0° (referência): só o arco α age; sen(α + 0°) = sen α.
2. α = 30° e β = 60° (contraste contra o erro comum): sen(30° + 60°) = sen 90° = 1, enquanto sen 30° + sen 60° = 0,5 + 0,87 = 1,37 (que passa de 1!).
3. Decomposição geométrica de α + β: projetar o triângulo inclinado de β nos eixos revela os dois blocos sen α·cos β + sen β·cos α e cos α·cos β − sen α·sen β.
4. Caso α = β (arco duplo): colapsar β sobre α transforma as somas em sen(2α) = 2·sen α·cos α e cos(2α) = cos²α − sen²α.

## f) Dedução causal da forma
No ciclo de raio 1, o ponto em α + β tem catetos cos β e sen β num sistema de eixos girado de α. Projetando esses dois catetos nos eixos originais x e y, as alturas se somam e o recuo horizontal se subtrai, por isso sen(α + β) = sen α·cos β + sen β·cos α e cos(α + β) = cos α·cos β − sen α·sen β; fazendo β = α, nascem as fórmulas do arco duplo.

## g) Simulação espacial e fronteiras
O aluno testa α = 45° e β = 45° (onde o arco duplo bate em 90°: sen 90° = 2·(√2/2)·(√2/2) = 1 e cos 90° = 1/2 − 1/2 = 0) e calcula ângulos novos como 75° = 45° + 30° e 15° = 45° − 30° usando apenas os notáveis.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Primeiro giro α | Ângulo base a partir do eixo horizontal positivo. |
| c2 | Segundo giro β | Ângulo somado (ou subtraído) a partir de onde o giro α parou. |
| c3 | Seno da soma | Altura final sen(α + β) = sen α·cos β + sen β·cos α. |
| c4 | Cosseno da soma | Posição horizontal cos(α + β) = cos α·cos β − sen α·sen β. |

### Passo 1 — `ilusao-da-soma`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `ciclo_trigonometrico` — giro α = 30° fixo (c1) e slider para o segundo giro β (c2); compara a barra sen(α + β) (c3) com a barra sen α + sen β. Emite `beta`.
- **Sliders:** `beta` · "Segundo giro β (graus)" · 0..60 · passo 30 · inicial 0 · c2
- **Paco (abertura):** "Com α = 30° e β = 0°, sen(30° + 0°) = 0,5. Leve β até 60°: sen(30° + 60°) é igual a sen 30° + sen 60°?"
- **Interação do aluno:** move `beta` até 60°; vê o arco chegar a 90° com sen 90° = 1, enquanto a barra da soma separada sen 30° + sen 60° passa de 1 (dá 1,37).
- **Conclusão:** `beta ≥ 60`
- **Paco (conclusão):** "Não é igual: sen 90° = 1, mas sen 30° + sen 60° ≈ 1,37. Como o ciclo curva, somar giros nunca é somar senos separados."
- **Tati (dúvida):** `fim` — P: "Então como fazemos para calcular o seno de 75° = 45° + 30°?" / R: "Usando as fórmulas de adição de arcos, que também nos darão o arco duplo 2α."

### Passo 2 — `blocos-da-adicao`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `ciclo_trigonometrico` — exibe o retângulo circunscrito aos triângulos de α (c1) e β (c2), destacando os segmentos sen α·cos β e sen β·cos α na vertical (c3) e cos α·cos β − sen α·sen β na horizontal (c4). Emite `mostrar_blocos`.
- **Sliders:** `mostrar_blocos` · "Decompor projeções" · 0..1 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "O triângulo do giro β está inclinado sobre α. Ligue a decomposição: quais dois pedaços formam a altura vertical sen(α + β)?"
- **Interação do aluno:** muda `mostrar_blocos` para 1 e vê os dois segmentos verticais sen α·cos β e sen β·cos α encaixarem para formar sen(α + β).
- **Conclusão:** `mostrar_blocos ≥ 1`
- **Paco (conclusão):** "A altura soma sen α·cos β + sen β·cos α. Já na horizontal o segundo giro recua para a esquerda, dando cos α·cos β − sen α·sen β."

### Passo 3 — `arco-duplo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (fronteira em 2α = 90°)
- **Widget:** `ciclo_trigonometrico` — modo arco duplo onde β = α, mostrando o arco 2α e os valores de 2·sen α·cos α (c3) e cos²α − sen²α (c4). Emite `alfa`.
- **Sliders:** `alfa` · "Ângulo α (graus)" · 15..45 · passo 15 · inicial 15 · c1
- **Paco (abertura):** "Quando β = α, somamos α + α = 2α. Leve α para 45° (onde 2α = 90°): quanto dão 2·sen α·cos α e cos²α − sen²α?"
- **Interação do aluno:** move `alfa` para 45°; vê sen(90°) = 2·(√2/2)·(√2/2) = 1 e cos(90°) = 0,5 − 0,5 = 0.
- **Conclusão:** `alfa ≥ 45`
- **Paco (conclusão):** "Em α = 45°, sen(2α) = 2·sen 45°·cos 45° = 1 e cos(2α) = cos²45° − sen²45° = 0, cravando o ponto de 90°."
- **Tati (dúvida):** `fim` — P: "E se em vez de somar α + β a gente subtrair α − β?" / R: "Basta trocar o sinal de β: no seno fica sen α·cos β − sen β·cos α, e no cosseno vira soma cos α·cos β + sen α·sen β."

### Passo 4 — `desafio-arco-duplo`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `ciclo_trigonometrico_figura` — arco α no 1º quadrante com sen α = 3/5, cos α = 4/5 (c1) e o arco duplo 2α destacado.
- **Paco (abertura):** "Cuidado para não dobrar o 3/5 direto: use sen(2α) = 2 · sen α · cos α."
- **Enunciado:** "Sabendo que sen α = 3/5 e cos α = 4/5, quanto vale sen(2α)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `s2425` | 24/25 | **sim** | "Isso. sen(2α) = 2 · sen α · cos α = 2 · (3/5) · (4/5) = 24/25." | destaca o arco 2α com altura 24/25 = 0,96 em c3 |
| `s65` | 6/5 | não | "sen(2α) não é 2·sen α (6/5 até passa de 1!). Use 2 · (3/5) · (4/5) = 24/25." | mostra que 6/5 = 1,2 sai para fora do ciclo de raio 1 |
| `s1225` | 12/25 | não | "12/25 é apenas sen α · cos α; faltou multiplicar por 2: 24/25." | mostra os dois blocos iguais de 12/25 somando 24/25 |
| `s725` | 7/25 | não | "7/25 é cos(2α) = cos²α − sen²α. Para o seno: 2 · (3/5) · (4/5) = 24/25." | destaca cos(2α) = 7/25 no eixo x e sen(2α) = 24/25 no y |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `ciclo_trigonometrico_figura` — arcos α (c1), β (c2) e α + β com projeções sen(α + β) (c3) e cos(α + β) (c4).
- **Fórmula:** `sen(α + β)`→c3 · `=` · `sen α·cos β + sen β·cos α` · `;` · `cos(α + β)`→c4 · `=` · `cos α·cos β − sen α·sen β` · `;` · `sen(2α)`→c3 · `=` · `2·sen α·cos α`
- **Definições:** "Seno da soma/diferença: sen(α ± β) = sen α·cos β ± sen β·cos α (mantém o sinal)." · "Cosseno da soma/diferença: cos(α ± β) = cos α·cos β ∓ sen α·sen β (inverte o sinal)." · "Arco duplo: sen(2α) = 2·sen α·cos α e cos(2α) = cos²α − sen²α."
- **Paco (abertura):** "O segundo giro β acontece sobre um raio já inclinado de α, por isso suas projeções misturam senos e cossenos dos dois arcos."
- **Dica (hint):** "Toque em cada fórmula para ver os blocos geométricos correspondentes no ciclo."

**Frase de encerramento (outro):** "Você viu por que somar ângulos não é somar senos, decompôs os giros de α + β e deduziu as fórmulas de adição e de arco duplo."

## i) Treino pós-aula

### Fáceis

#### F1 — `reconhecer-seno-soma`
- **Enunciado:** "A expressão sen 20° · cos 10° + sen 10° · cos 20° é igual a:"
- **Conta de conferência:** sen(20° + 10°) = sen 30° = 0,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s30` | sen 30° = 0,5 | **sim** | "Certo. É a fórmula de sen(20° + 10°) = sen 30° = 0,5." |
| `s10` | sen 10° | não | "Com sinal de + entre os produtos, somamos os arcos: sen(20° + 10°) = sen 30° = 0,5." |
| `c30` | cos 30° | não | "Mistura de seno com cosseno é a fórmula do seno da soma: sen 30° = 0,5." |
| `s200` | sen 200° | não | "Somamos 20° + 10° = 30°, resultando em sen 30° = 0,5." |

#### F2 — `reconhecer-cosseno-soma`
- **Enunciado:** "A expressão cos 40° · cos 20° − sen 40° · sen 20° equivale a:"
- **Conta de conferência:** cos(40° + 20°) = cos 60° = 0,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c60` | cos 60° = 0,5 | **sim** | "Isso. No cosseno da soma o sinal no meio é −: cos(40° + 20°) = cos 60° = 0,5." |
| `c20` | cos 20° | não | "No cosseno o sinal inverte: o sinal − indica soma dos arcos, cos(40° + 20°) = cos 60° = 0,5." |
| `s60` | sen 60° | não | "Produto cos·cos − sen·sen é o cosseno da soma: cos 60° = 0,5." |
| `cm60` | −cos 60° | não | "Pela fórmula de cos(α + β), o resultado é +cos(40° + 20°) = cos 60° = 0,5." |

#### F3 — `arco-duplo-30`
- **Enunciado:** "Pela fórmula do arco duplo, a expressão 2 · sen 15° · cos 15° vale:"
- **Conta de conferência:** 2 · sen 15° · cos 15° = sen(2 · 15°) = sen 30° = 0,5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v05` | sen 30° = 0,5 | **sim** | "Exato. 2 · sen α · cos α = sen(2α), logo vale sen 30° = 0,5." |
| `v15` | 2 · sen 15° | não | "2 · sen 15° · cos 15° fecha o arco duplo sen(30°) = 0,5." |
| `vc30` | cos 30° | não | "2 · sen α · cos α é a fórmula de sen(2α): sen 30° = 0,5." |
| `v1` | sen 60° | não | "O dobro de 15° é 30°, portanto vale sen 30° = 0,5." |

#### F4 — `cos-2a-identidade`
- **Enunciado:** "Qual das expressões abaixo representa corretamente cos(2α)?"
- **Conta de conferência:** cos(α + α) = cos²α − sen²α

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c2ms2` | cos²α − sen²α | **sim** | "Certo. Fazendo β = α em cos(α + β), temos cos α·cos α − sen α·sen α = cos²α − sen²α." |
| `c2ps2` | cos²α + sen²α | não | "cos²α + sen²α vale sempre 1. Para cos(2α), há um sinal de menos: cos²α − sen²α." |
| `dcos` | 2 · cos α | não | "O fator 2 não sai de dentro do cosseno. A fórmula é cos²α − sen²α." |
| `s2mc2` | sen²α − cos²α | não | "A ordem é cosseno primeiro: cos(2α) = cos²α − sen²α." |

### Médias

#### M1 — `calcular-cos-2a`
- **Enunciado:** "Se num triângulo temos cos α = 3/5 e sen α = 4/5, quanto vale cos(2α)?"
- **Conta de conferência:** cos(2α) = cos²α − sen²α = 9/25 − 16/25 = −7/25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `cm725` | −7/25 | **sim** | "Isso. cos(2α) = (3/5)² − (4/5)² = 9/25 − 16/25 = −7/25." |
| `cp725` | 7/25 | não | "Cuidado com a ordem: cos²α − sen²α = 9/25 − 16/25 = −7/25." |
| `c2425` | 24/25 | não | "24/25 é sen(2α) = 2·sen α·cos α. Para o cosseno: 9/25 − 16/25 = −7/25." |
| `c65` | 6/5 | não | "cos(2α) não é 2·cos α. Use cos²α − sen²α = −7/25." |

#### M2 — `calcular-sen-15`
- **Enunciado:** "Escrevendo 15° = 45° − 30°, qual expressão calcula sen 15°?"
- **Conta de conferência:** sen(45° − 30°) = sen 45°·cos 30° − sen 30°·cos 45° = (√6 − √2)/4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r6mr2` | (√6 − √2) / 4 | **sim** | "Certo. (√2/2)·(√3/2) − (1/2)·(√2/2) = (√6 − √2) / 4." |
| `r6pr2` | (√6 + √2) / 4 | não | "(√6 + √2)/4 é sen 75° (soma). Na diferença 45° − 30°, fica (√6 − √2) / 4." |
| `r2m1` | (√2 − 1) / 2 | não | "Não faça sen 45° − sen 30°! Pela fórmula da diferença, dá (√6 − √2) / 4." |
| `r3m1` | √3 / 4 | não | "Substituindo os notáveis em sen 45°·cos 30° − sen 30°·cos 45°, obtemos (√6 − √2) / 4." |

#### M3 — `cosseno-complementar-soma`
- **Enunciado:** "Simplificando cos(π/2 − x) pela fórmula do cosseno da diferença (lembrando que cos π/2 = 0 e sen π/2 = 1), obtemos:"
- **Conta de conferência:** cos(π/2)·cos x + sen(π/2)·sen x = 0·cos x + 1·sen x = sen x

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `senx` | sen x | **sim** | "Exato. 0 · cos x + 1 · sen x = sen x (o cosseno do complementar é o seno)." |
| `msenx` | −sen x | não | "Em cos(α − β) o sinal do meio é +: 0·cos x + 1·sen x = +sen x." |
| `cosx` | cos x | não | "Como cos(π/2) = 0, o termo com cos x some e sobra 1 · sen x = sen x." |
| `mcosx` | −cos x | não | "cos(π/2) = 0 anula o cos x, e sen(π/2) = 1 multiplica sen x, dando sen x." |

### Desafios

#### D1 — `cos-2a-so-com-seno`
- **Enunciado:** "Sabendo apenas que sen α = 1/3, quanto vale cos(2α)? (Dica: use cos²α = 1 − sen²α)."
- **Conta de conferência:** cos(2α) = (1 − sen²α) − sen²α = 1 − 2·sen²α = 1 − 2·(1/9) = 7/9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c79` | 7/9 | **sim** | "Isso. Como cos²α = 8/9, temos cos(2α) = 8/9 − 1/9 = 7/9." |
| `c89` | 8/9 | não | "8/9 é cos²α. Ainda falta subtrair sen²α = 1/9: 8/9 − 1/9 = 7/9." |
| `cm79` | −7/9 | não | "cos²α = 8/9 é maior que sen²α = 1/9, então 8/9 − 1/9 = +7/9." |
| `c23` | 2/3 | não | "Use cos(2α) = 1 − 2·sen²α = 1 − 2/9 = 7/9." |

#### D2 — `soma-de-dois-arcos`
- **Enunciado:** "No 1º quadrante, sen α = 3/5 (cos α = 4/5) e sen β = 5/13 (cos β = 12/13). Quanto vale sen(α + β)?"
- **Conta de conferência:** sen(α + β) = (3/5)·(12/13) + (5/13)·(4/5) = 36/65 + 20/65 = 56/65

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s5665` | 56/65 | **sim** | "Certo. (3/5)·(12/13) + (5/13)·(4/5) = 36/65 + 20/65 = 56/65." |
| `s1665` | 16/65 | não | "16/65 é 36/65 − 20/65, que seria sen(α − β). Na soma dá 36/65 + 20/65 = 56/65." |
| `s3365` | 33/65 | não | "33/65 é cos(α + β) = 48/65 − 15/65. Para sen(α + β), o valor é 56/65." |
| `s818` | 8/18 | não | "Não some as frações direto; aplique sen α·cos β + sen β·cos α = 56/65." |

#### D3 — `tangente-da-soma`
- **Enunciado:** "Pela fórmula tg(α + β) = (tg α + tg β) / (1 − tg α · tg β), se tg α = 1/2 e tg β = 1/3, quanto vale tg(α + β)?"
- **Conta de conferência:** (1/2 + 1/3) / (1 − 1/6) = (5/6) / (5/6) = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t1` | 1 | **sim** | "Exato. Numerador 1/2 + 1/3 = 5/6 e denominador 1 − 1/6 = 5/6; a divisão dá 1 (α + β = 45°)." |
| `t56` | 5/6 | não | "5/6 é apenas a soma tg α + tg β; dividindo por 1 − 1/6 = 5/6, o resultado é 1." |
| `t25` | 2/5 | não | "Some com MMC no numerador (5/6) e divida por 1 − 1/6 (5/6): dá 1." |
| `t57` | 5/7 | não | "No denominador subtrai-se o produto: 1 − 1/6 = 5/6, e (5/6)/(5/6) = 1." |

#### D4 — `simplificar-sen2x-sobre-cosx`
- **Enunciado:** "Simplificando a expressão sen(2x) / (2 · cos x), para cos x ≠ 0, encontramos:"
- **Conta de conferência:** (2 · sen x · cos x) / (2 · cos x) = sen x

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `senx` | sen x | **sim** | "Isso. Trocando sen(2x) por 2·sen x·cos x, o fator 2·cos x cancela e sobra sen x." |
| `tgx` | tg x | não | "Como sen(2x) = 2·sen x·cos x, o cos x do denominador cancela, sobrando apenas sen x." |
| `d2senx` | 2 · sen x | não | "O fator 2 do numerador cancela com o 2 do denominador, restando sen x." |
| `cosx` | cos x | não | "Quem cancela é o cos x; o que sobra no numerador é sen x." |

#### D5 — `periodo-produto-seno-cosseno`
- **Enunciado:** "Reescreva a função f(x) = 6 · sen x · cos x usando o arco duplo e determine sua imagem e seu período."
- **Fala do Paco:** "Note que 6 · sen x · cos x = 3 · (2 · sen x · cos x)."
- **Conta de conferência:** f(x) = 3 · sen(2x) ⇒ imagem [−3; 3] e período T = 2π / 2 = π

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3sp` | f(x) = 3·sen(2x); Im = [−3; 3] e T = π | **sim** | "Exato. Como 2·sen x·cos x = sen(2x), fica 3·sen(2x), com amplitude 3 e período 2π/2 = π." |
| `f6sp` | f(x) = 6·sen(2x); Im = [−6; 6] e T = π | não | "O fator 2 entra na fórmula de sen(2x), sobrando 6 / 2 = 3 na frente: Im = [−3; 3] e T = π." |
| `f3s2p` | f(x) = 3·sen(2x); Im = [−3; 3] e T = 2π | não | "Com 2x dentro do seno, o período divide por 2: T = 2π / 2 = π (e Im = [−3; 3])." |
| `f6s2p` | f(x) = 6·sen(x); Im = [−6; 6] e T = 2π | não | "Pelo arco duplo, 6·sen x·cos x = 3·sen(2x), dando Im = [−3; 3] e T = π." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular seno, cosseno ou tangente de ângulos como 15°, 75° ou 105° usando as fórmulas de adição/subtração.
- **Onde procurar:** Fuvest, Vunesp, UFRGS, UFPR.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar sen(2α) = 2·sen α·cos α ou cos(2α) = cos²α − sen²α em problemas geométricos ou algébricos.
- **Onde procurar:** Unicamp, Fuvest, Unesp, UERJ.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** reduzir uma função com produto sen x · cos x ou cos²x − sen²x a uma única senoide para achar máximo, mínimo ou período.
- **Onde procurar:** ENEM, Fuvest, Unicamp.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** usar a fórmula da tangente da soma tg(α + β) para calcular um segmento ou ângulo em figura plana.
- **Onde procurar:** Fuvest, Unicamp, ITA (nível médio), Vunesp.
