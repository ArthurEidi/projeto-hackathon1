# Plano — Inequações quadráticas

**Aula:** 1 — Inequações quadráticas · Ler o sinal entre raízes
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-quadraticas
**Pré-requisitos que o aluno já domina:** `equacoes-quadraticas`, `conjuntos-e-intervalos`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe a entrada x. A altura da parábola decide se x entra no intervalo que resolve a inequação.

## b) Visual de partida

plano_cartesiano — quadrática a=1,b=0,c=0,c3; ponto x=0, passo 1; janela −3..3.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

A curva y=x² toca zero; fora da origem a saída é positiva. Ela fica como fantasma ao baixar a curva.

## d) Panorama e recorte

Há desigualdades estritas e inclusivas; aqui lemos o sinal de quadráticas a partir das raízes.

## e) Progressão por contraste

1. Referência visual: Sai do único zero para o ponto (1;1).
2. Em contraste com a referência: Arrasta de −2 até 0, cruzando uma raiz.
3. Aprofundamento e fronteiras: Percorre raiz 1 e chega a (2;−3).

## f) Dedução causal da forma

Em (x−1)(x+1), entre −1 e 1 há um fator positivo e outro negativo; fora, os sinais coincidem. A multiplicação por a<0 troca todos os sinais. Raízes duplas não provocam troca de sinal.

Fórmula deduzida: a(x−r₁)(x−r₂)≤0; se a>0 e r₁<r₂: r₁≤x≤r₂.

## g) Simulação espacial e fronteiras

Testar raiz dupla e ausência de raízes: x²≤0 só em 0; x²+1<0 nunca. Raízes entram somente em ≤ ou ≥.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número usado na comparação. |
| c2 | Coeficiente a | Fator que decide a concavidade e o sinal. |
| c3 | Valor da quadrática | Altura da parábola, comparada com zero. |
| c4 | Intervalo-solução | Entradas aceitas pela desigualdade. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — quadrática a=1,b=0,c=0,c3; ponto x=0, passo 1; janela −3..3.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro x², a saída pode ser negativa? Arraste até 1."
- **Interação do aluno:** Sai do único zero para o ponto (1;1).
- **Conclusão:** `ponto_x ≥ 1`
- **Paco (conclusão):** "Não; multiplicar um real por ele mesmo dá valor não negativo."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há desigualdades estritas e inclusivas; aqui lemos o sinal de quadráticas a partir das raízes."

### Passo 2 — `entre-raizes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — quadrática a=1,b=0,c=−1,c3; x² fantasma; ponto x=−2, passo 1; raízes c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Entre −1 e 1, x²−1 fica acima ou abaixo do eixo? Leve x até 0."
- **Interação do aluno:** Arrasta de −2 até 0, cruzando uma raiz.
- **Conclusão:** `ponto_x ≥ 0`
- **Paco (conclusão):** "Fica abaixo; em 0 vale −1, e os fatores têm sinais opostos nesse intervalo."

### Passo 3 — `inverter-concavidade`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — quadrática a=−1,b=0,c=1,c3; fantasma x²−1; ponto x=0, passo 1; raízes c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Ao trocar a saída pelo oposto, o exterior passa a ser negativo? Arraste até 2."
- **Interação do aluno:** Percorre raiz 1 e chega a (2;−3).
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sim; a reflexão vertical troca o sinal, por isso 1−x²<0 fora de [−1;1]."
- **Tati (dúvida):** `fim` — P: "E em x²≤0?" / R: "Só x=0 serve; a raiz dupla não cria um trecho negativo."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — quadrática a=1,b=0,c=−1,c3; raízes c4; janela −3..3.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Onde x²−1≤0?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | Fora de [−1;1] | não | "Você escolheu o sinal positivo; a solução é [−1;1], incluindo as raízes." | Mostra ponto x=2 com saída 3 positiva. |
| `micro-acerto` | [−1;1] | **sim** | "Certo: [−1;1]; O produto (x−1)(x+1) é não positivo entre as raízes." | Marca raízes e o ponto (0;−1). |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — y=(x−1)(x+1), a=1, raízes −1 e 1 em c4, ponto (0;−1) em c3; janela −3..3.
- **Fórmula:** `a`→c2 · `(x`→c1 · `−r₁)(x−r₂)≤0 ⇔ r₁≤x≤r₂`→c4 · `, se a>0 e r₁<r₂`
- **Definições:**
  - "Entrada x: Número usado na comparação."
  - "Valor da quadrática: Altura da parábola, comparada com zero."
  - "Intervalo-solução: Entradas aceitas pela desigualdade."
- **Paco (abertura):** "Os fatores trocam sinais nas raízes simples; por isso o intervalo-solução depende também do sinal de a."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-inequacoes-quadraticas`
- **Enunciado:** "Em x=0, x²−1 é positivo ou negativo?"
- **Figura:** nenhuma
- **Conta de conferência:** 0²−1=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-quadraticas-erro` | Positivo | não | "Você ignorou o termo −1. O certo é Negativo; 0²−1=−1." |
| `f1-inequacoes-quadraticas-certa` | Negativo | **sim** | "Certo: Negativo; 0²−1=−1." |

#### F2 — `f2-inequacoes-quadraticas`
- **Enunciado:** "Onde x²−1 zera?"
- **Figura:** nenhuma
- **Conta de conferência:** x²=1; x=±1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-quadraticas-certa` | −1 e 1 | **sim** | "Certo: −1 e 1; x²=1; x=±1." |
| `f2-inequacoes-quadraticas-erro` | 0 e 1 | não | "Você confundiu o vértice com uma raiz. O certo é −1 e 1; x²=1; x=±1." |

#### F3 — `f3-inequacoes-quadraticas`
- **Enunciado:** "Em x²−1<0, as raízes entram?"
- **Figura:** nenhuma
- **Conta de conferência:** 0<0 é falso.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-quadraticas-erro` | Sim | não | "A comparação estrita não aceita zero. O certo é Não; 0<0 é falso." |
| `f3-inequacoes-quadraticas-certa` | Não | **sim** | "Certo: Não; 0<0 é falso." |

#### F4 — `f4-inequacoes-quadraticas`
- **Enunciado:** "Trocar P por −P muda o sinal fora das raízes?"
- **Figura:** nenhuma
- **Conta de conferência:** −(3)=−3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-quadraticas-certa` | Sim | **sim** | "Certo: Sim; −(3)=−3." |
| `f4-inequacoes-quadraticas-erro` | Não | não | "Multiplicar por −1 inverte o sinal. O certo é Sim; −(3)=−3." |

### Médias

#### M1 — `m1-inequacoes-quadraticas`
- **Enunciado:** "Resolva x²−4<0."
- **Figura:** nenhuma
- **Conta de conferência:** x²<4 ⇔ −2<x<2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-quadraticas-erro` | (−∞;−2)∪(2;+∞) | não | "Você escolheu a parte positiva. O certo é (−2;2); x²<4 ⇔ −2<x<2." |
| `m1-inequacoes-quadraticas-certa` | (−2;2) | **sim** | "Certo: (−2;2); x²<4 ⇔ −2<x<2." |

#### M2 — `m2-inequacoes-quadraticas`
- **Enunciado:** "Resolva x²−1≥0."
- **Figura:** nenhuma
- **Conta de conferência:** x²≥1 ⇔ x≤−1 ou x≥1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-quadraticas-certa` | (−∞;−1]∪[1;+∞) | **sim** | "Certo: (−∞;−1]∪[1;+∞); x²≥1 ⇔ x≤−1 ou x≥1." |
| `m2-inequacoes-quadraticas-erro` | [−1;1] | não | "O interior tem sinal negativo. O certo é (−∞;−1]∪[1;+∞); x²≥1 ⇔ x≤−1 ou x≥1." |

#### M3 — `m3-inequacoes-quadraticas`
- **Enunciado:** "Resolva 1−x²≥0."
- **Figura:** nenhuma
- **Conta de conferência:** x²≤1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-quadraticas-erro` | (−1;1) | não | "Você retirou igualdades válidas. O certo é [−1;1]; x²≤1." |
| `m3-inequacoes-quadraticas-certa` | [−1;1] | **sim** | "Certo: [−1;1]; x²≤1." |

### Desafios

#### D1 — `d1-inequacoes-quadraticas`
- **Enunciado:** "Resolva (x−1)²≤0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (x−1)²=0 ⇔ x=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-quadraticas-certa` | {1} | **sim** | "Certo: {1}; (x−1)²=0 ⇔ x=1." |
| `d1-inequacoes-quadraticas-erro` | ∅ | não | "O quadrado pode ser zero. O certo é {1}; (x−1)²=0 ⇔ x=1." |

#### D2 — `d2-inequacoes-quadraticas`
- **Enunciado:** "Resolva x²+1<0 nos reais."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²+1≥1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-quadraticas-erro` | R | não | "Um quadrado real nunca é negativo. O certo é ∅; x²+1≥1." |
| `d2-inequacoes-quadraticas-certa` | ∅ | **sim** | "Certo: ∅; x²+1≥1." |

#### D3 — `d3-inequacoes-quadraticas`
- **Enunciado:** "Resolva 4x²−1<0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²<1/4 ⇔ −1/2<x<1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-quadraticas-certa` | (−0,5;0,5) | **sim** | "Certo: (−0,5;0,5); x²<1/4 ⇔ −1/2<x<1/2." |
| `d3-inequacoes-quadraticas-erro` | (−0,25;0,25) | não | "Você não tirou a raiz de 1/4. O certo é (−0,5;0,5); x²<1/4 ⇔ −1/2<x<1/2." |

#### D4 — `d4-inequacoes-quadraticas`
- **Enunciado:** "Resolva −(x−2)²≥0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** −(x−2)²=0 só em 2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-quadraticas-erro` | R | não | "O sinal negativo torna as outras saídas negativas. O certo é {2}; −(x−2)²=0 só em 2." |
| `d4-inequacoes-quadraticas-certa` | {2} | **sim** | "Certo: {2}; −(x−2)²=0 só em 2." |

#### D5 — `d5-inequacoes-quadraticas`
- **Enunciado:** "Uma área vale x(x+1), com x≥0; para ela ser no máximo 6, qual x serve?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (x+3)(x−2)≤0; x≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-quadraticas-certa` | [0;2] | **sim** | "Certo: [0;2]; (x+3)(x−2)≤0; x≥0." |
| `d5-inequacoes-quadraticas-erro` | [−3;2] | não | "Você aceitou uma dimensão negativa. O certo é [0;2]; (x+3)(x−2)≤0; x≥0." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

#### `unicamp-2025-composta` — Unicamp 2025
- **Enunciado:** "Com f(x) = x − 2 e g(x) = x² − 4x, quantos inteiros x satisfazem g(f(x)) < 0?"
- **Fala do Paco:** "g(f(x)) = (x − 2)² − 4(x − 2) = (x − 2)(x − 6). Leia o sinal entre as raízes."
- **Fonte:** Unicamp 2025 (adaptada); 1ª fase, Questão 54: enunciado reescrito como pergunta; alternativas e gabarito oficial (b) mantidos. https://www.comvest.unicamp.br/wp-content/uploads/2025/06/F1_2025.pdf
- **Alternativas:** 2 · **3** · 4 · 5
- **Conta de conferência:** g(f(x)) = (x − 2)(x − 6) < 0 ⇒ 2 < x < 6 ⇒ 3, 4, 5 (b).

#### V1 — `v1-inequacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema inequações quadráticas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-inequacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema inequações quadráticas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-inequacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema inequações quadráticas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-inequacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema inequações quadráticas.
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
