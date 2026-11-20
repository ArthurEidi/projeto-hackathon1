# Plano — Inequações-produto e inequações-quociente

**Aula:** 1 — Inequações-produto e inequações-quociente · Zeros não são buracos
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-produto-quociente
**Pré-requisitos que o aluno já domina:** `fatoracao-algebrica`, `inequacoes-primeiro-grau`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla x e observa o sinal de dois fatores. O produto ou quociente depende dos sinais; o denominador também limita o domínio.

## b) Visual de partida

reta_numerica — intervalo −4..4; trecho [1;+∞) c4; ponto x=0, passo 1; fronteira 1 fechada.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

O fator neutro 1 conserva x−1; depois entra x+1 no produto ou no denominador.

## d) Panorama e recorte

Produtos e quocientes compartilham uma tabela de sinais; aqui distinguimos raízes permitidas e denominadores proibidos.

## e) Progressão por contraste

1. Referência visual: Arrasta até a raiz 1 e vê o início do trecho.
2. Em contraste com a referência: Move para 2; identifica que ambos os fatores são positivos.
3. Aprofundamento e fronteiras: Cruza −1, explicitamente excluído, até a região negativa de x.

## f) Dedução causal da forma

Um produto ou quociente de sinais iguais é positivo; sinais diferentes dão negativo. Os sinais só podem mudar ao cruzar zeros dos fatores; no quociente, o denominador zero nunca pertence à solução.

Fórmula deduzida: (x−1)/(x+1)≥0 ⇔ x<−1 ou x≥1.

## g) Simulação espacial e fronteiras

Em x=−1 o quociente não existe; x=1 pode entrar se a igualdade for permitida. Fator com multiplicidade par não troca o sinal.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número usado nos dois fatores. |
| c2 | Fator x+1 | Fator que zera em −1. |
| c3 | Sinal do resultado | Sinal obtido ao multiplicar ou dividir. |
| c4 | Conjunto-solução | Entradas válidas, sem denominadores nulos. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −4..4; trecho [1;+∞) c4; ponto x=0, passo 1; fronteira 1 fechada.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro, multiplicar x−1 por 1 nada muda; quando a saída fica não negativa? Leve x a 1."
- **Interação do aluno:** Arrasta até a raiz 1 e vê o início do trecho.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Em 1 ela zera; acima de 1 o fator x−1 é positivo."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Produtos e quocientes compartilham uma tabela de sinais; aqui distinguimos raízes permitidas e denominadores proibidos."

### Passo 2 — `produto-de-sinais`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** reta_numerica — intervalo −4..4; trechos (−∞;−1] e [1;+∞) c4; pontos −1 e 1 fechados; ponto x=0, passo 1.
- **Sliders:** nenhum
- **Paco (abertura):** "Se o outro fator for x+1, qual sinal aparece à direita de 1? Arraste até 2."
- **Interação do aluno:** Move para 2; identifica que ambos os fatores são positivos.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "O produto é positivo porque os fatores 1 e 3 têm o mesmo sinal."

### Passo 3 — `excluir-denominador`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** reta_numerica — intervalo −4..4; trechos (−∞;−1) e [1;+∞) c4; −1 aberto e 1 fechado; ponto x=0, passo 1.
- **Sliders:** nenhum
- **Paco (abertura):** "No quociente, −1 continua permitido? Arraste até −2 e observe o buraco em −1."
- **Interação do aluno:** Cruza −1, explicitamente excluído, até a região negativa de x.
- **Conclusão:** `ponto_x ≤ −2`
- **Paco (conclusão):** "Não; em −1 o denominador zera, por isso o extremo fica aberto mesmo com ≥."
- **Tati (dúvida):** `fim` — P: "E se o fator estiver ao quadrado?" / R: "O sinal não troca ao passar pelo zero duplo; teste os intervalos em vez de alternar às cegas."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** reta_figura — intervalo −4..4; trechos (−∞;−1) e [1;+∞) c4; extremos −1 aberto e 1 fechado.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Em (x−1)/(x+1)≥0, x=−1 é solução?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | Sim | não | "Igualdade não permite dividir por zero; −1 não é solução." | Destaca denominador x+1=0 e o círculo aberto em −1. |
| `micro-acerto` | Não | **sim** | "Certo: Não; O denominador x+1 zera em −1." | Mantém −1 aberto e destaca o trecho x<−1. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** reta_figura — trechos x<−1 e x≥1 em c4; polo −1 aberto, zero 1 fechado; exemplos x=−2,0,2 com sinais +,−,+ em ink.
- **Fórmula:** `(x`→c1 · `−1)/` · `(x+1)`→c2 · `≥0 ⇔ x<−1 ou x≥1`→c4
- **Definições:**
  - "Entrada x: Número usado nos dois fatores."
  - "Sinal do resultado: Sinal obtido ao multiplicar ou dividir."
  - "Conjunto-solução: Entradas válidas, sem denominadores nulos."
- **Paco (abertura):** "Sinais iguais dão quociente positivo; por isso testamos os intervalos e excluímos os denominadores nulos."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-inequacoes-produto-quociente`
- **Enunciado:** "No produto (x−1)(x+1), onde o fator x+1 zera?"
- **Figura:** nenhuma
- **Conta de conferência:** −1+1=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-produto-quociente-erro` | 1 | não | "Você trocou o sinal da raiz. O certo é −1; −1+1=0." |
| `f1-inequacoes-produto-quociente-certa` | −1 | **sim** | "Certo: −1; −1+1=0." |

#### F2 — `f2-inequacoes-produto-quociente`
- **Enunciado:** "Em (x−1)/(x+1), qual entrada é proibida?"
- **Figura:** nenhuma
- **Conta de conferência:** x+1=0 ⇒ x=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-produto-quociente-certa` | −1 | **sim** | "Certo: −1; x+1=0 ⇒ x=−1." |
| `f2-inequacoes-produto-quociente-erro` | 1 | não | "Você confundiu zero do numerador com o do denominador. O certo é −1; x+1=0 ⇒ x=−1." |

#### F3 — `f3-inequacoes-produto-quociente`
- **Enunciado:** "Em x=0, (x−1)(x+1) tem qual sinal?"
- **Figura:** nenhuma
- **Conta de conferência:** (−1)·1=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-produto-quociente-erro` | Positivo | não | "Os fatores têm sinais opostos. O certo é Negativo; (−1)·1=−1." |
| `f3-inequacoes-produto-quociente-certa` | Negativo | **sim** | "Certo: Negativo; (−1)·1=−1." |

#### F4 — `f4-inequacoes-produto-quociente`
- **Enunciado:** "Na inequação quociente ≥0, denominador zero pode entrar?"
- **Figura:** nenhuma
- **Conta de conferência:** 1/0 não existe.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-produto-quociente-certa` | Não | **sim** | "Certo: Não; 1/0 não existe." |
| `f4-inequacoes-produto-quociente-erro` | Sim | não | "Igualdade não autoriza divisão por zero. O certo é Não; 1/0 não existe." |

### Médias

#### M1 — `m1-inequacoes-produto-quociente`
- **Enunciado:** "Resolva (x−1)(x+1)>0."
- **Figura:** nenhuma
- **Conta de conferência:** Fora das raízes os sinais coincidem.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-produto-quociente-erro` | −1<x<1 | não | "Você escolheu fatores de sinais opostos. O certo é x<−1 ou x>1; Fora das raízes os sinais coincidem." |
| `m1-inequacoes-produto-quociente-certa` | x<−1 ou x>1 | **sim** | "Certo: x<−1 ou x>1; Fora das raízes os sinais coincidem." |

#### M2 — `m2-inequacoes-produto-quociente`
- **Enunciado:** "Resolva (x−1)/(x+1)≥0."
- **Figura:** nenhuma
- **Conta de conferência:** x=−1 é proibido; x=1 zera.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-produto-quociente-certa` | x<−1 ou x≥1 | **sim** | "Certo: x<−1 ou x≥1; x=−1 é proibido; x=1 zera." |
| `m2-inequacoes-produto-quociente-erro` | x≤−1 ou x≥1 | não | "Você incluiu o polo −1. O certo é x<−1 ou x≥1; x=−1 é proibido; x=1 zera." |

#### M3 — `m3-inequacoes-produto-quociente`
- **Enunciado:** "Resolva x/(x−2)<0."
- **Figura:** nenhuma
- **Conta de conferência:** Em 1: 1/(−1)<0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-produto-quociente-erro` | (−∞;0)∪(2;+∞) | não | "Você escolheu sinais iguais. O certo é (0;2); Em 1: 1/(−1)<0." |
| `m3-inequacoes-produto-quociente-certa` | (0;2) | **sim** | "Certo: (0;2); Em 1: 1/(−1)<0." |

### Desafios

#### D1 — `d1-inequacoes-produto-quociente`
- **Enunciado:** "Resolva (x−1)²/(x+1)>0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x>−1 e x≠1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-produto-quociente-certa` | (−1;1)∪(1;+∞) | **sim** | "Certo: (−1;1)∪(1;+∞); x>−1 e x≠1." |
| `d1-inequacoes-produto-quociente-erro` | (−1;+∞) | não | "Você incluiu o zero do numerador. O certo é (−1;1)∪(1;+∞); x>−1 e x≠1." |

#### D2 — `d2-inequacoes-produto-quociente`
- **Enunciado:** "Resolva x²/(x−1)≤0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²≥0; x−1<0; zero em x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-produto-quociente-erro` | (−∞;1] | não | "Você incluiu denominador zero. O certo é (−∞;1); x²≥0; x−1<0; zero em x=0." |
| `d2-inequacoes-produto-quociente-certa` | (−∞;1) | **sim** | "Certo: (−∞;1); x²≥0; x−1<0; zero em x=0." |

#### D3 — `d3-inequacoes-produto-quociente`
- **Enunciado:** "Resolva (2x−1)/(x+1)≤0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Polo −1; zero 1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-produto-quociente-certa` | (−1;0,5] | **sim** | "Certo: (−1;0,5]; Polo −1; zero 1/2." |
| `d3-inequacoes-produto-quociente-erro` | [−1;0,5] | não | "Você fechou o ponto proibido. O certo é (−1;0,5]; Polo −1; zero 1/2." |

#### D4 — `d4-inequacoes-produto-quociente`
- **Enunciado:** "Em (x−1)²≥0, qual é a solução?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Todo quadrado real é ≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-produto-quociente-erro` | x≥1 | não | "Você alternou sinais numa raiz dupla. O certo é R; Todo quadrado real é ≥0." |
| `d4-inequacoes-produto-quociente-certa` | R | **sim** | "Certo: R; Todo quadrado real é ≥0." |

#### D5 — `d5-inequacoes-produto-quociente`
- **Enunciado:** "Resolva (x−1)(x+1)/(x−1)>0 sem perder a restrição original."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x+1>0; x≠1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-produto-quociente-certa` | (−1;1)∪(1;+∞) | **sim** | "Certo: (−1;1)∪(1;+∞); x+1>0; x≠1." |
| `d5-inequacoes-produto-quociente-erro` | (−1;+∞) | não | "O cancelamento não devolve x=1 ao domínio. O certo é (−1;1)∪(1;+∞); x+1>0; x≠1." |

### Vestibular

> B43 (19/11/2026): as vagas preenchidas abaixo trazem questões de provas oficiais conferidas no PDF e no gabarito oficial (registro em `docs/revisao/vestibular-b43.md`). As vagas PENDENTE-FONTE seguem abertas; nada foi inventado.

#### V1 — `ufrgs-2018-cubo-raiz`
- **Enunciado (resumido):** "Para f(x) = x³ e g(x) = ∛x, em que conjunto vale f(x) > g(x)?"
- **Fala do Paco:** "Elevar ao cubo mantém a desigualdade: x⁹ > x, isto é, x(x − 1)(x + 1)(x² + 1)(x⁴ + 1) > 0. Só x, x − 1 e x + 1 mudam de sinal."
- **Fonte:** UFRGS 2018 (adaptada) — **Adaptação:** Matemática, Questão 29: enunciado reescrito como pergunta; alternativas e gabarito oficial (E) mantidos. — **URL:** https://www.ufrgs.br/coperse/wp-content/uploads/2022/04/HIS-MAT-1.pdf · https://vestibular.ufrgs.br/cv2018/gabaritos/
- **Conta de conferência:** x³ > ∛x ⇔ x⁹ > x ⇔ x(x − 1)(x + 1)(x² + 1)(x⁴ + 1) > 0 ⇒ (−1; 0) ∪ (1; +∞) (E).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | (0; +∞) | não | "Em (0; 1) falha (x = 1/8 dá 1/512 < 1/2) e em (−1; 0) vale (x = −1/8 dá −1/512 > −1/2). Fica (−1; 0) ∪ (1; +∞)." |
| `b` | (−∞; −1) ∪ (0; 1) | não | "Esse é o conjunto onde f(x) < g(x), com o sinal trocado. De x(x − 1)(x + 1) > 0 vem (−1; 0) ∪ (1; +∞)." |
| `c` | (−1; 1) | não | "Em (0; 1) vale f < g: x = 1/8 dá 1/512 < 1/2. O quadro de sinais de x(x − 1)(x + 1) > 0 dá (−1; 0) ∪ (1; +∞)." |
| `d` | (−∞; −1) ∪ (1; +∞) | não | "Esquece o fator x: com x = −8, f = −512 < g = −2. Com x(x − 1)(x + 1) > 0, a resposta é (−1; 0) ∪ (1; +∞)." |
| `e` | (−1; 0) ∪ (1; +∞) | **sim** | "Isso. x³ > ∛x equivale a x⁹ > x, isto é, x(x − 1)(x + 1)(x² + 1)(x⁴ + 1) > 0, e o quadro de sinais dá (−1; 0) ∪ (1; +∞)." |

#### V2 — `v2-inequacoes-produto-quociente`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema inequações-produto e inequações-quociente.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-inequacoes-produto-quociente`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema inequações-produto e inequações-quociente.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-inequacoes-produto-quociente`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema inequações-produto e inequações-quociente.
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
