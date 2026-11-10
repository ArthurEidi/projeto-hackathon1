# Plano — Determinantes, área orientada e matriz inversa

**Aula:** 1 — Determinantes, área orientada e matriz inversa · Área revela a possibilidade de voltar
**Caminho:** algebra / matrizes-e-sistemas / determinantes-e-matriz-inversa
**Pré-requisitos que o aluno já domina:** `matrizes-determinantes-sistemas`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla uma transformação matricial. A área orientada depende das colunas; perder área impede recuperar toda entrada.

## b) Visual de partida

WIDGET NOVO: transformacao_plano — A=diag(a;1), quadrado unitário e imagem; A em c2, área orientada c4; identidade fantasma; emite a.
Controles: a · Escala horizontal · 0..2 · passo 1 · inicial 1 · c2.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

A identidade conserva área 1 e é sua própria inversa; o quadrado original permanece fantasma.

## d) Panorama e recorte

Determinantes existem em ordens maiores; aqui usamos área orientada, inversa 2×2 e o caso singular.

## e) Progressão por contraste

1. Referência visual: Estica a largura do quadrado até 2.
2. Em contraste com a referência: Passa pelo colapso e reflete a primeira coluna.
3. Aprofundamento e fronteiras: Leva a a zero; imagens coincidem em (0;1).

## f) Dedução causal da forma

As colunas (a;c) e (b;d) formam um paralelogramo de área orientada ad−bc. A matriz [[d,−b],[−c,a]] multiplicada por A produz det(A)I; dividir por det(A) desfaz A somente se det(A)≠0.

Fórmula deduzida: A⁻¹=(1/(ad−bc))·[[d,−b],[−c,a]], ad−bc≠0.

## g) Simulação espacial e fronteiras

det negativo muda orientação, mas área geométrica é seu módulo. det=0 impede inversa; determinante 1 conserva área, mas não garante conservar comprimentos.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Vetor de entrada | Par de coordenadas que a máquina recebe. |
| c2 | Matriz A | Transformação que pode ou não ter inversa. |
| c3 | Imagem | Ponto produzido pela transformação. |
| c4 | Determinante | Área orientada da imagem do quadrado unitário. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: transformacao_plano — A=diag(a;1), quadrado unitário e imagem; A em c2, área orientada c4; identidade fantasma; emite a.
- **Sliders:** a · Escala horizontal · 0..2 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "No caso neutro A=I, a área é 1; se a for 2, qual área aparece?"
- **Interação do aluno:** Estica a largura do quadrado até 2.
- **Conclusão:** `a ≥ 2`
- **Paco (conclusão):** "A área vira 2 porque a largura dobrou e a altura permaneceu 1."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Determinantes existem em ordens maiores; aqui usamos área orientada, inversa 2×2 e o caso singular."

### Passo 2 — `inverter-orientacao`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: transformacao_plano — A=diag(a;1), setas das colunas e quadrado orientado; identidade fantasma; emite a e determinante.
- **Sliders:** a · Escala horizontal · −1..1 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Com a=−1, a área geométrica fica negativa? Arraste até −1."
- **Interação do aluno:** Passa pelo colapso e reflete a primeira coluna.
- **Conclusão:** `a ≤ −1`
- **Paco (conclusão):** "Não; a área é 1, mas o determinante é −1 porque a orientação se inverteu."

### Passo 3 — `perder-informacao`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: transformacao_plano — A=diag(a;1), entradas (1;1) e (2;1), imagens; área c4; emite a.
- **Sliders:** a · Escala horizontal · 0..1 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Se a zerar, dá para descobrir qual das duas entradas gerou a imagem?"
- **Interação do aluno:** Leva a a zero; imagens coincidem em (0;1).
- **Conclusão:** `a ≤ 0`
- **Paco (conclusão):** "Não; duas entradas viram o mesmo ponto, por isso a matriz com determinante zero não tem inversa."
- **Tati (dúvida):** `fim` — P: "Determinante 1 conserva todo comprimento?" / R: "Não; uma deformação pode conservar a área e mudar lados e ângulos."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: transformacao-figura — quadrado unitário, imagem por diag(2;1) e retorno por diag(0,5;1); área c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a inversa de diag(2;1)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | diag(−2;−1) | não | "Você trocou sinais; desfazer a escala pede 2·0,5=1, então a inversa é diag(0,5;1)." | Mostra a composição com a opção errada, diag(−4;−1). |
| `micro-acerto` | diag(0,5;1) | **sim** | "Certo: diag(0,5;1); 2·0,5=1 e 1·1=1." | Compõe diag(0,5;1) com diag(2;1) e mostra a identidade. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: transformacao-figura — A=diag(2;1), inversa diag(0,5;1) em c2, det=2 c4, quadrado original e imagem de área 2.
- **Fórmula:** `A⁻¹`→c2 · `=1/` · `(ad−bc)`→c4 · `·[[d,−b],[−c,a]], ad−bc≠0`
- **Definições:**
  - "Vetor de entrada: Par de coordenadas que a máquina recebe."
  - "Imagem: Ponto produzido pela transformação."
  - "Determinante: Área orientada da imagem do quadrado unitário."
- **Paco (abertura):** "O determinante mede a área orientada; por isso só uma transformação sem colapso pode ter inversa."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-determinantes-e-matriz-inversa`
- **Enunciado:** "Qual é o determinante da identidade 2×2?"
- **Figura:** nenhuma
- **Conta de conferência:** 1·1−0·0=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-determinantes-e-matriz-inversa-erro` | 0 | não | "Você esqueceu o produto da diagonal principal. O certo é 1; 1·1−0·0=1." |
| `f1-determinantes-e-matriz-inversa-certa` | 1 | **sim** | "Certo: 1; 1·1−0·0=1." |

#### F2 — `f2-determinantes-e-matriz-inversa`
- **Enunciado:** "Determinante negativo significa área geométrica negativa?"
- **Figura:** nenhuma
- **Conta de conferência:** Área=∣det A∣≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-determinantes-e-matriz-inversa-certa` | Não | **sim** | "Certo: Não; Área=∣det A∣≥0." |
| `f2-determinantes-e-matriz-inversa-erro` | Sim | não | "Você confundiu área com orientação. O certo é Não; Área=∣det A∣≥0." |

#### F3 — `f3-determinantes-e-matriz-inversa`
- **Enunciado:** "Uma matriz com det=0 tem inversa?"
- **Figura:** nenhuma
- **Conta de conferência:** det(A)·det(A⁻¹)=1 seria impossível.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-determinantes-e-matriz-inversa-erro` | Sim | não | "O colapso perde informação de entrada. O certo é Não; det(A)·det(A⁻¹)=1 seria impossível." |
| `f3-determinantes-e-matriz-inversa-certa` | Não | **sim** | "Certo: Não; det(A)·det(A⁻¹)=1 seria impossível." |

#### F4 — `f4-determinantes-e-matriz-inversa`
- **Enunciado:** "Qual é a inversa da identidade?"
- **Figura:** nenhuma
- **Conta de conferência:** I·I=I.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-determinantes-e-matriz-inversa-certa` | A própria identidade | **sim** | "Certo: A própria identidade; I·I=I." |
| `f4-determinantes-e-matriz-inversa-erro` | Matriz nula | não | "A matriz nula não recupera a entrada. O certo é A própria identidade; I·I=I." |

### Médias

#### M1 — `m1-determinantes-e-matriz-inversa`
- **Enunciado:** "Calcule det [[1,2],[0,3]]."
- **Figura:** nenhuma
- **Conta de conferência:** 1·3−2·0=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-determinantes-e-matriz-inversa-erro` | 5 | não | "Você somou entradas em vez de cruzar produtos. O certo é 3; 1·3−2·0=3." |
| `m1-determinantes-e-matriz-inversa-certa` | 3 | **sim** | "Certo: 3; 1·3−2·0=3." |

#### M2 — `m2-determinantes-e-matriz-inversa`
- **Enunciado:** "Qual é a inversa de diag(2;1)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2·0,5=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-determinantes-e-matriz-inversa-certa` | diag(0,5;1) | **sim** | "Certo: diag(0,5;1); 2·0,5=1." |
| `m2-determinantes-e-matriz-inversa-erro` | diag(−2;−1) | não | "Negar entradas não desfaz uma escala. O certo é diag(0,5;1); 2·0,5=1." |

#### M3 — `m3-determinantes-e-matriz-inversa`
- **Enunciado:** "Calcule det [[0,1],[1,0]]."
- **Figura:** nenhuma
- **Conta de conferência:** 0·0−1·1=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-determinantes-e-matriz-inversa-erro` | 1 | não | "Você esqueceu o sinal do produto secundário. O certo é −1; 0·0−1·1=−1." |
| `m3-determinantes-e-matriz-inversa-certa` | −1 | **sim** | "Certo: −1; 0·0−1·1=−1." |

### Desafios

#### D1 — `d1-determinantes-e-matriz-inversa`
- **Enunciado:** "Qual k torna [[1,2],[2,k]] singular?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** det=k−4=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-determinantes-e-matriz-inversa-certa` | 4 | **sim** | "Certo: 4; det=k−4=0." |
| `d1-determinantes-e-matriz-inversa-erro` | 2 | não | "Você igualou entradas em vez de zerar o determinante. O certo é 4; det=k−4=0." |

#### D2 — `d2-determinantes-e-matriz-inversa`
- **Enunciado:** "Se det A=−2, qual área resulta de um quadrado unitário?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣−2∣=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-determinantes-e-matriz-inversa-erro` | −2 | não | "Você usou área orientada como área geométrica. O certo é 2; ∣−2∣=2." |
| `d2-determinantes-e-matriz-inversa-certa` | 2 | **sim** | "Certo: 2; ∣−2∣=2." |

#### D3 — `d3-determinantes-e-matriz-inversa`
- **Enunciado:** "Qual é a inversa de [[1,1],[0,1]]?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (x+y;y)→(x;y) subtraindo y.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-determinantes-e-matriz-inversa-certa` | [[1,−1],[0,1]] | **sim** | "Certo: [[1,−1],[0,1]]; (x+y;y)→(x;y) subtraindo y." |
| `d3-determinantes-e-matriz-inversa-erro` | [[−1,−1],[0,−1]] | não | "Você negou toda a matriz. O certo é [[1,−1],[0,1]]; (x+y;y)→(x;y) subtraindo y." |

#### D4 — `d4-determinantes-e-matriz-inversa`
- **Enunciado:** "Uma matriz 2×2 tem det A=3; qual é det(2A)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2²·3=12.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-determinantes-e-matriz-inversa-erro` | 6 | não | "Você escalou apenas uma direção. O certo é 12; 2²·3=12." |
| `d4-determinantes-e-matriz-inversa-certa` | 12 | **sim** | "Certo: 12; 2²·3=12." |

#### D5 — `d5-determinantes-e-matriz-inversa`
- **Enunciado:** "A=[[1,1],[0,1]] envia uma entrada para (3;2); qual era a entrada e qual área unitária resulta?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x+2=3; x=1; det A=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-determinantes-e-matriz-inversa-certa` | (1;2), área 1 | **sim** | "Certo: (1;2), área 1; x+2=3; x=1; det A=1." |
| `d5-determinantes-e-matriz-inversa-erro` | (3;2), área 2 | não | "Você ignorou o cisalhamento e confundiu lado com área. O certo é (1;2), área 1; x+2=3; x=1; det A=1." |

### Vestibular

#### V1 — `v1-determinantes-e-matriz-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema determinantes, área orientada e matriz inversa.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-determinantes-e-matriz-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema determinantes, área orientada e matriz inversa.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-determinantes-e-matriz-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema determinantes, área orientada e matriz inversa.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-determinantes-e-matriz-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema determinantes, área orientada e matriz inversa.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

---

# Checklist de qualidade (marque tudo antes de entregar o plano)

**Método (METODO.md)**
- [x] Os 7 pilares a)–g) estão escritos **e** cada um aparece em pelo menos um passo (linha "Pilares").
- [x] A aula abre com a figura viva (passo `interactive_canvas`), não com fórmula nem definição.
- [x] O caso neutro aparece na tela e é **nomeado numa fala**.
- [x] O panorama ocupa uma única fala (em geral a dúvida da Tati) e o recorte fica claro.
- [x] O contraste mostra o "antes" na tela (curva fantasma ou valor de referência).
- [x] A fórmula do fechamento foi **deduzida** antes (há uma fala com "por isso" ou "como … então").
- [x] Há teste de fronteira: quadrantes, 0/1/infinitas soluções, domínio ou restrição real.

**Roteiro**
- [x] De 4 a 8 passos; 1º é `interactive_canvas`, último é `concept_lock`, há pelo menos um `micro_challenge`.
- [x] Toda abertura pergunta ou pede previsão; toda conclusão responde com o porquê.
- [x] Cada passo interativo tem conclusão com métrica existente e alcançável (valor inicial não cumpre; arraste com passo que acerta o valor exato).
- [x] No desafio, cada opção errada tem feedback que diagnostica o erro e uma mudança de figura que mostra o erro.
- [x] Toda marca c1..c4 usada tem linha no glossário; o que não tem significado é `ink`/`muted`.
- [x] Widget inexistente está marcado como **WIDGET NOVO** com o que desenha, o que o aluno manipula e a métrica.

**Treino**
- [x] Exatamente 4 fáceis, 3 médias, 5 desafios, 4 vestibular; ids únicos, minúsculos, com hífen.
- [ ] Cada questão tem exatamente 1 opção certa e 2 a 4 opções (vestibular 2 a 5).
- [ ] Todo feedback de opção errada **contém a resposta certa**.
- [ ] Cada distrator corresponde a um erro típico nomeado no feedback.
- [ ] Toda questão tem conta de conferência, e a conta bate com o gabarito.
- [ ] Vestibular: questões reais, conferidas na URL, fonte "Banca Ano (adaptada)", adaptação descrita, fala do Paco presente.

**Texto**
- [x] Toda fala, enunciado e feedback com ≤ 140 caracteres e ≤ 2 frases; sem emoji; sem termos proibidos.
- [x] Números pequenos, de cabeça; notação do app (−, vírgula decimal, ·, ², (x; y)).


**Ressalva do checklist:** os cinco itens em aberto dependem somente das quatro fontes de vestibular; nas 12 autorais, alternativas, diagnósticos e contas estão preenchidos.
