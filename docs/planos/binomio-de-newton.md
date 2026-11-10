# Plano — Binômio de Newton e coeficientes binomiais

**Aula:** 1 — Caminhos que Viram Coeficientes · Expansão de (a + b)ⁿ e triângulo de Pascal
**Caminho:** aritmetica / combinatoria-e-probabilidade / binomio-de-newton
**Pré-requisitos que o aluno já domina:** combinações C(n, k), produtos notáveis (a + b)².

## a) Ancoragem mecânica
A máquina recebe o expoente n e devolve a expansão de (a + b)ⁿ. Cada um dos n fatores (a + b) contribui com um a ou um b; o coeficiente de aⁿ⁻ᵏbᵏ é quantas vezes a máquina escolheu b exatamente k vezes. A entrada é n (e k para um termo); a saída é o coeficiente C(n, k).

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo árvore: cada nível é um fator (a + b) e se abre em "a" (c1) ou "b" (c2). As pontas são palavras como aab; abaixo, as pontas se agrupam pelo número de b's, formando barras com os coeficientes. Slider de n (0 a 5). Um painel ao lado empilha as linhas no triângulo de Pascal.

## c) Caso neutro
n = 0: (a + b)⁰ = 1, uma ponta só, nenhuma escolha. n = 1: dois caminhos, a e b, coeficientes 1 e 1. Daí em diante cada fator novo dobra os caminhos.

## d) Panorama e recorte
O binômio aparece em probabilidade (distribuição binomial), em aproximações e em polinômios. Aqui: expandir (a + b)ⁿ, achar um termo específico e ler o triângulo de Pascal.

## e) Progressão por contraste
1. n = 1: a + b (referência).
2. n = 2: ab e ba são caminhos diferentes que dão o mesmo termo; por isso 2ab.
3. n = 3: barras 1, 3, 3, 1; o coeficiente conta posições do b.
4. Triângulo de Pascal: cada número é a soma dos dois de cima.
5. a = b = 1: a soma dos coeficientes é o total de caminhos, 2ⁿ.

## f) Dedução causal da forma
Expandir é escolher a ou b em cada um dos n fatores. O termo aⁿ⁻ᵏbᵏ sai de todo caminho com exatamente k escolhas de b, e escolher em quais fatores o b aparece é C(n, k). Por isso (a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ, com k de 0 a n.

## g) Simulação espacial e fronteiras
São n + 1 termos, não n. Os coeficientes são simétricos (C(n, k) = C(n, n − k)). Com (a − b)ⁿ, os termos com k ímpar ficam negativos. Números como 2 em (x + 2)ⁿ entram elevados: o coeficiente de x em (x + 2)³ é C(3, 1) · 2² = 12, não 3.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Expoente | Quantos fatores (a + b) são multiplicados (n). |
| c2 | Escolhas de b | Quantas vezes o b foi escolhido num caminho (k). |
| c3 | Coeficiente binomial | Quantos caminhos dão o mesmo termo: C(n, k). |
| c4 | Linha de Pascal | Os coeficientes de um mesmo n, lidos em fila. |

### Passo 1 — `dois-fatores`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `grade_resultados` (modo árvore) — árvore de n níveis com galhos a (c1) e b (c2); pontas agrupadas por número de b's com barras de coeficiente (c3).
- **Sliders:** `n` · "Fatores (a + b)" · 1..2 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Com um fator só, (a + b) dá a + b. Leve n para 2: de quantos caminhos sai o termo ab?"
- **Interação do aluno:** move n e vê a árvore abrir; as pontas ab e ba caem na mesma barra.
- **Conclusão:** `n ≥ 2`
- **Paco (conclusão):** "Sai de 2 caminhos, ab e ba. Por isso (a + b)² = a² + 2ab + b²."
- **Tati (dúvida):** `fim` — P: "Para que serve expandir potências enormes?" / R: "Probabilidade e aproximações usam muito. Hoje ficamos em achar os coeficientes."

### Passo 2 — `tres-fatores`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `grade_resultados` (modo árvore) — n = 3; o aluno toca as pontas com exatamente um b e elas acendem. Emite `pontas_um_b`.
- **Sliders:** nenhum
- **Paco (abertura):** "Com 3 fatores, quantos caminhos escolhem b exatamente uma vez? Toque nessas pontas."
- **Interação do aluno:** toca as pontas baa, aba e aab; cada uma acende o fator de onde veio o b.
- **Conclusão:** `pontas_um_b ≥ 3`
- **Paco (conclusão):** "São 3: o b pode vir do 1º, do 2º ou do 3º fator. É C(3, 1) = 3, o coeficiente de a²b."

### Passo 3 — `triangulo-de-pascal`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6
- **Widget:** `grade_resultados` (modo Pascal) — as linhas de coeficientes empilhadas (c4); tocar num número mostra as duas setas vindas de cima.
- **Sliders:** `n` · "Linhas" · 2..5 · passo 1 · inicial 2 · c1
- **Paco (abertura):** "Empilhe as linhas de coeficientes. Que relação cada número tem com os dois logo acima?"
- **Interação do aluno:** aumenta n e toca números para ver as setas.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** "Cada número é a soma dos dois acima. Um caminho novo termina em a ou em b, e isso soma as duas contagens."

### Passo 4 — `soma-dos-coeficientes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `grade_resultados` (modo árvore) — n = 4 e chave "a = b = 1": ligada, todas as pontas viram 1 e a soma da linha aparece.  Emite `chave_ligada`.
- **Sliders:** nenhum
- **Paco (abertura):** "Se a e b valem 1, quanto dá a soma de todos os coeficientes da linha 4? Faça uma previsão e ligue a chave."
- **Interação do aluno:** liga a chave e vê 1 + 4 + 6 + 4 + 1.
- **Conclusão:** `chave_ligada ≥ 1`
- **Paco (conclusão):** "Dá 16 = 2⁴. Somar os coeficientes é contar todos os caminhos da árvore."
- **Tati (dúvida):** `fim` — P: "E com (a − b)ⁿ?" / R: "Cada b traz um sinal de menos. Os termos com b ímpar ficam negativos e os sinais alternam."

### Passo 5 — `desafio-x-quadrado`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — árvore de (x + 1)⁴ com as pontas apagadas.
- **Paco (abertura):** "Pense: em quantos fatores o x é escolhido para sair x²?"
- **Enunciado:** "Qual é o coeficiente de x² em (x + 1)⁴?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a4` | 4 | não | "4 é o expoente. x² sai escolhendo x em 2 dos 4 fatores: C(4, 2) = 6." | barra de k = 1 acesa |
| `a2` | 2 | não | "2 é o expoente do termo. Os caminhos com dois x são C(4, 2) = 6." | duas pontas acesas |
| `a6` | 6 | **sim** | "Isso. Escolher 2 dos 4 fatores para dar x: C(4, 2) = 6." | as 6 pontas com dois x acesas |
| `a1` | 1 | não | "1 é o coeficiente de x⁴. Para x² são C(4, 2) = 6 caminhos." | só a ponta xxxx acesa |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — árvore de n = 3 com barras 1, 3, 3, 1.
- **Fórmula:** `(a + b)ⁿ` · `=` · `Σ` · `C(n, k)`→c3 · `aⁿ⁻ᵏ` · `bᵏ`→c2
- **Definições:** "Coeficiente binomial: C(n, k) conta os caminhos com k escolhas de b." · "Triângulo de Pascal: cada número é a soma dos dois acima." · "Termos: (a + b)ⁿ tem n + 1 termos."
- **Paco (abertura):** "Cada termo vem de escolher b em k dos n fatores. Por isso o coeficiente é C(n, k)."
- **Dica (hint):** "Toque em uma letra para ver o que ela conta na árvore."

**Frase de encerramento (outro):** "Você viu a árvore de escolhas virar coeficientes: (a + b)ⁿ é soma de C(n, k) aⁿ⁻ᵏ bᵏ, linha do triângulo de Pascal."

## i) Treino pós-aula

### Fáceis

#### F1 — `quadrado-da-soma`
- **Enunciado:** "Qual é a expansão de (a + b)²?"
- **Conta de conferência:** caminhos aa, ab, ba, bb

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-quadrados` | a² + b² | não | "Faltaram os caminhos ab e ba. Fica a² + 2ab + b²." |
| `certa` | a² + 2ab + b² | **sim** | "Isso. ab aparece por dois caminhos, daí o 2." |
| `dobro` | 2a + 2b | não | "Isso é 2(a + b). O quadrado multiplica: a² + 2ab + b²." |
| `um-ab` | a² + ab + b² | não | "ab vem de dois caminhos, ab e ba. O coeficiente é 2: a² + 2ab + b²." |

#### F2 — `linha-3`
- **Enunciado:** "Quais são os coeficientes de (a + b)³?"
- **Conta de conferência:** C(3, 0..3) = 1, 3, 3, 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l1331` | 1, 3, 3, 1 | **sim** | "Certo. É a linha 3 do triângulo de Pascal." |
| `l1221` | 1, 2, 2, 1 | não | "Cada número é a soma dos dois acima de 1, 2, 1: fica 1, 3, 3, 1." |
| `l121` | 1, 2, 1 | não | "Essa é a linha 2. Para o cubo: 1, 3, 3, 1." |
| `l1111` | 1, 1, 1, 1 | não | "Os termos do meio vêm de 3 caminhos. Linha: 1, 3, 3, 1." |

#### F3 — `numero-de-termos`
- **Enunciado:** "Quantos termos tem a expansão de (a + b)⁵?"
- **Conta de conferência:** k de 0 a 5: 6 termos

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | não | "k vai de 0 a 5, então são 6 termos." |
| `a6` | 6 | **sim** | "Isso. n + 1 = 6 termos." |
| `a10` | 10 | não | "10 é o maior coeficiente. Os termos são n + 1 = 6." |
| `a32` | 32 | não | "32 são os caminhos. Agrupados por número de b: 6 termos." |

#### F4 — `coef-ab`
- **Enunciado:** "Qual é o coeficiente de ab em (a + b)²?"
- **Conta de conferência:** caminhos ab e ba: 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1` | 1 | não | "ab vem de ab e de ba: coeficiente 2." |
| `a2` | 2 | **sim** | "Certo. Dois caminhos dão ab." |
| `a4` | 4 | não | "4 são todos os caminhos de n = 2. Só ab e ba dão ab: 2." |
| `a0` | 0 | não | "O termo ab existe: vem de ab e ba. Coeficiente 2." |

### Médias

#### M1 — `coef-x-cubo-1`
- **Enunciado:** "Qual é o coeficiente de x em (x + 1)³?"
- **Conta de conferência:** C(3, 2) = 3 (x escolhido 1 vez)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. x sai de um fator e 1 dos outros dois: 3 caminhos." |
| `a1` | 1 | não | "1 é o coeficiente de x³. Para x: 3 caminhos." |
| `a6` | 6 | não | "6 é a soma 1 + 2 + 3. A linha é 1, 3, 3, 1: coeficiente de x é 3." |
| `a9` | 9 | não | "9 seria 3². O coeficiente é C(3, 1) = 3." |

#### M2 — `soma-linha-5`
- **Enunciado:** "Quanto dá a soma dos coeficientes de (a + b)⁵?"
- **Conta de conferência:** 2⁵ = 32

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a32` | 32 | **sim** | "Certo. Com a = b = 1: (1 + 1)⁵ = 32." |
| `a25` | 25 | não | "25 = 5². A soma é (1 + 1)⁵ = 32." |
| `a10` | 10 | não | "10 é o maior coeficiente. A soma de todos é 2⁵ = 32." |
| `a6` | 6 | não | "6 é o número de termos. A soma dos coeficientes é 32." |

#### M3 — `coef-x3-x1-5`
- **Enunciado:** "Qual é o coeficiente de x³ em (x + 1)⁵?"
- **Conta de conferência:** C(5, 3) = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Isso. Escolher 3 dos 5 fatores para x: C(5, 3) = 10." |
| `a5` | 5 | não | "5 é C(5, 1). Para x³: C(5, 3) = 10." |
| `a15` | 15 | não | "15 não está na linha 5 (1, 5, 10, 10, 5, 1). É 10." |
| `a20` | 20 | não | "20 é da linha 6. Na linha 5, o coeficiente é 10." |

### Desafios

#### D1 — `x-mais-2-cubo`
- **Enunciado:** "Qual é o coeficiente de x em (x + 2)³?"
- **Fala do Paco:** "O 2 também é escolhido nos outros fatores."
- **Conta de conferência:** C(3, 1) · 2² = 12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 | **sim** | "Certo. 3 caminhos, cada um com 2 · 2 = 4: 12." |
| `a3` | 3 | não | "3 conta os caminhos, mas cada um traz 2 · 2. Fica 3 · 4 = 12." |
| `a6` | 6 | não | "O 2 aparece duas vezes em cada caminho: 3 · 2² = 12." |
| `a8` | 8 | não | "8 = 2³ é o termo sem x. Para x: 3 · 2² = 12." |

#### D2 — `x-menos-1-quarta`
- **Enunciado:** "Qual é o coeficiente de x³ em (x − 1)⁴?"
- **Conta de conferência:** C(4, 1) · (−1)¹ = −4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am4` | −4 | **sim** | "Isso. 4 caminhos, cada um com um −1: −4." |
| `a4` | 4 | não | "O −1 entra uma vez em cada caminho. O coeficiente é −4." |
| `am6` | −6 | não | "6 é o coeficiente de x². Para x³: 4 caminhos com um −1, −4." |
| `a6` | 6 | não | "6 é de x², e sem o sinal. Para x³: −4." |

#### D3 — `termo-independente`
- **Enunciado:** "Qual é o termo sem x na expansão de (x + 1/x)⁴?"
- **Fala do Paco:** "O x some quando ele e o 1/x aparecem o mesmo número de vezes."
- **Conta de conferência:** k = 2: C(4, 2) = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Certo. Dois x e dois 1/x: C(4, 2) = 6." |
| `a4` | 4 | não | "4 é C(4, 1), que deixa x². Para cancelar: 2 de cada, C(4, 2) = 6." |
| `a1` | 1 | não | "1 é o coeficiente de x⁴. O termo sem x é C(4, 2) = 6." |
| `a0` | 0 | não | "Existe termo sem x: dois x com dois 1/x. Vale C(4, 2) = 6." |

#### D4 — `centro-linha-6`
- **Enunciado:** "Qual é o maior coeficiente de (a + b)⁶?"
- **Conta de conferência:** C(6, 3) = 20

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 | **sim** | "Isso. O meio da linha 6: C(6, 3) = 20." |
| `a15` | 15 | não | "15 = C(6, 2) é vizinho do meio. O maior é C(6, 3) = 20." |
| `a6` | 6 | não | "6 é C(6, 1). O maior fica no meio: 20." |
| `a10` | 10 | não | "10 é o maior da linha 5. Na linha 6: 20." |

#### D5 — `onze-ao-cubo`
- **Enunciado:** "Usando (10 + 1)³, quanto vale 11³?"
- **Fala do Paco:** "Última. Os coeficientes 1, 3, 3, 1 viram algarismos."
- **Conta de conferência:** 1000 + 3 · 100 + 3 · 10 + 1 = 1331

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1331` | 1331 | **sim** | "Certo. 1000 + 300 + 30 + 1: os algarismos são a linha 1, 3, 3, 1." |
| `a1111` | 1111 | não | "Os termos do meio têm coeficiente 3. Fica 1000 + 300 + 30 + 1 = 1331." |
| `a1001` | 1001 | não | "Faltaram os termos do meio: 3 · 100 + 3 · 10. Total 1331." |
| `a121` | 121 | não | "121 é 11². O cubo é 1331." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** coeficiente de um termo específico de (x + a)ⁿ.
- **Onde procurar:** Fuvest, Unesp, UFRGS ("coeficiente de x").

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** termo independente de (x + 1/x)ⁿ.
- **Onde procurar:** Mackenzie, PUC-SP, ITA.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** soma dos coeficientes (a = b = 1).
- **Onde procurar:** UFPR, UEL, Cesgranrio.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** propriedades do triângulo de Pascal.
- **Onde procurar:** ENEM, UFSC (somatória).
