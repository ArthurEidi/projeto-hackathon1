# Plano — Equações polinomiais, raízes e multiplicidade

**Aula:** 1 — Equações polinomiais, raízes e multiplicidade · Cruzar ou encostar no eixo
**Caminho:** algebra / polinomios-e-complexos / raizes-polinomiais-e-multiplicidade
**Pré-requisitos que o aluno já domina:** `polinomios`, `divisao-polinomial-e-teorema-do-resto`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla a multiplicidade de um fator. A potência muda o sinal nos lados da raiz e, portanto, como a curva encontra o eixo.

## b) Visual de partida

plano_cartesiano — afim a=1,b=−1,c3; ponto x=0,passo 1; raiz 1 c4; janela −2..4.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Multiplicidade 1 em P(x)=x−1 dá a reta de referência; a raiz simples cruza o eixo.

## d) Panorama e recorte

Raízes podem ser reais ou complexas e repetidas; aqui contamos multiplicidades e observamos o sinal perto de raízes reais.

## e) Progressão por contraste

1. Referência visual: Sai de altura −1, passa por zero e chega a 1.
2. Em contraste com a referência: Passa pela raiz e compara alturas positivas dos dois lados.
3. Aprofundamento e fronteiras: Cruza raiz 1, saindo de −1 para 1.

## f) Dedução causal da forma

P(x)=(x−r)ᵐQ(x), com Q(r)≠0. Perto de r, Q mantém o sinal; potência par mantém o sinal do fator nos dois lados, e ímpar o troca. Em C, um grau n tem n raízes contadas com multiplicidade.

Fórmula deduzida: P(x)=(x−r)ᵐQ(x), Q(r)≠0; m par toca, m ímpar cruza.

## g) Simulação espacial e fronteiras

m=0 retira o fator e pode retirar a raiz; Q(r)=0 significa que a multiplicidade foi subcontada. Contar multiplicidades difere de contar raízes distintas.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número testado perto da raiz. |
| c2 | Multiplicidade m | Quantidade de cópias do fator x−r. |
| c3 | Polinômio P | Produto dos fatores. |
| c4 | Raiz r | Entrada que anula o polinômio. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — afim a=1,b=−1,c3; ponto x=0,passo 1; raiz 1 c4; janela −2..4.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso-base m=1, a reta cruza a raiz 1? Arraste de 0 até 2."
- **Interação do aluno:** Sai de altura −1, passa por zero e chega a 1.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Cruza, pois x−1 troca de negativo para positivo."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Raízes podem ser reais ou complexas e repetidas; aqui contamos multiplicidades e observamos o sinal perto de raízes reais."

### Passo 2 — `repetir-fator`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — quadrática a=1,b=−2,c=1,c3; reta x−1 fantasma; ponto x=0, passo 1; raiz c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Com o fator ao quadrado, o sinal ainda troca? Arraste até 2."
- **Interação do aluno:** Passa pela raiz e compara alturas positivas dos dois lados.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Não; o quadrado é positivo dos dois lados, por isso a curva só toca o eixo."

### Passo 3 — `potencia-impar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: plano-polinomial — (x−1)³ c3, (x−1)² fantasma; ponto x=0,passo 1; raiz c4; emite ponto_x.
- **Sliders:** nenhum
- **Paco (abertura):** "Com três cópias do fator, o sinal volta a trocar? Arraste até 2."
- **Interação do aluno:** Cruza raiz 1, saindo de −1 para 1.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sim; potência ímpar conserva o sinal do fator, por isso a curva cruza o eixo."
- **Tati (dúvida):** `fim` — P: "Se Q também zerar em r?" / R: "Então há mais fatores x−r; precisamos contá-los antes de decidir a multiplicidade."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-polinomial-figura — P=(x−1)²(x+2), raízes −2 e 1, janela x −3..3,y −4..10; curva c3 e raízes c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Em (x−1)²(x+2), qual raiz tem multiplicidade 2?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | −2 | não | "Você confundiu o outro fator; (x−1)² repete a raiz 1 duas vezes." | Destaca raiz −2 com um fator, e raiz 1 com dois. |
| `micro-acerto` | 1 | **sim** | "Certo: 1; O fator x−1 aparece duas vezes." | Destaca raiz 1 e os dois fatores x−1. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: plano-polinomial-figura — (x−1)²(x+2), r=1 c4, m=2 c2, Q(1)=3; curva c3 toca em 1 e cruza em −2.
- **Fórmula:** `P(x)`→c3 · `=(x−r)`→c4 · `ᵐ`→c2 · `Q(x), Q(r)≠0; m par toca, m ímpar cruza`
- **Definições:**
  - "Entrada x: Número testado perto da raiz."
  - "Polinômio P: Produto dos fatores."
  - "Raiz r: Entrada que anula o polinômio."
- **Paco (abertura):** "A paridade decide se o fator muda de sinal; por isso multiplicidade par toca e ímpar cruza o eixo."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "A raiz 1 de (x−1)² tem multiplicidade quanto?"
- **Figura:** nenhuma
- **Conta de conferência:** Há dois fatores x−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-raizes-polinomiais-e-multiplicidade-erro` | 1 | não | "Você contou apenas a raiz distinta. O certo é 2; Há dois fatores x−1." |
| `f1-raizes-polinomiais-e-multiplicidade-certa` | 2 | **sim** | "Certo: 2; Há dois fatores x−1." |

#### F2 — `f2-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Uma raiz simples costuma cruzar ou tocar sem cruzar o eixo?"
- **Figura:** nenhuma
- **Conta de conferência:** m=1 é ímpar.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-raizes-polinomiais-e-multiplicidade-certa` | Cruzar | **sim** | "Certo: Cruzar; m=1 é ímpar." |
| `f2-raizes-polinomiais-e-multiplicidade-erro` | Só tocar | não | "Um fator simples muda de sinal. O certo é Cruzar; m=1 é ímpar." |

#### F3 — `f3-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Na raiz de (x−1)², o sinal muda?"
- **Figura:** nenhuma
- **Conta de conferência:** Quadrado é não negativo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-raizes-polinomiais-e-multiplicidade-erro` | Sim | não | "Uma potência par preserva o sinal dos lados. O certo é Não; Quadrado é não negativo." |
| `f3-raizes-polinomiais-e-multiplicidade-certa` | Não | **sim** | "Certo: Não; Quadrado é não negativo." |

#### F4 — `f4-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Em (x−1)³, a multiplicidade é par ou ímpar?"
- **Figura:** nenhuma
- **Conta de conferência:** m=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-raizes-polinomiais-e-multiplicidade-certa` | Ímpar | **sim** | "Certo: Ímpar; m=3." |
| `f4-raizes-polinomiais-e-multiplicidade-erro` | Par | não | "Você contou apenas dois fatores. O certo é Ímpar; m=3." |

### Médias

#### M1 — `m1-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Quantas raízes reais distintas tem (x−1)²(x+2)?"
- **Figura:** nenhuma
- **Conta de conferência:** Raízes 1 e −2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-raizes-polinomiais-e-multiplicidade-erro` | 3 | não | "Você contou multiplicidade como ponto distinto. O certo é 2; Raízes 1 e −2." |
| `m1-raizes-polinomiais-e-multiplicidade-certa` | 2 | **sim** | "Certo: 2; Raízes 1 e −2." |

#### M2 — `m2-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Qual é o grau de (x−1)²(x+2)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2+1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-raizes-polinomiais-e-multiplicidade-certa` | 3 | **sim** | "Certo: 3; 2+1=3." |
| `m2-raizes-polinomiais-e-multiplicidade-erro` | 2 | não | "Você ignorou o fator linear extra. O certo é 3; 2+1=3." |

#### M3 — `m3-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Qual raiz de (x−2)(x+1)³ é tripla?"
- **Figura:** nenhuma
- **Conta de conferência:** (x+1)³ repete −1 três vezes.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-raizes-polinomiais-e-multiplicidade-erro` | 2 | não | "Você ligou a potência ao fator errado. O certo é −1; (x+1)³ repete −1 três vezes." |
| `m3-raizes-polinomiais-e-multiplicidade-certa` | −1 | **sim** | "Certo: −1; (x+1)³ repete −1 três vezes." |

### Desafios

#### D1 — `d1-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Em (2x−1)², qual é a raiz e sua multiplicidade?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x−1=0; x=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-raizes-polinomiais-e-multiplicidade-certa` | 0,5; multiplicidade 2 | **sim** | "Certo: 0,5; multiplicidade 2; 2x−1=0; x=1/2." |
| `d1-raizes-polinomiais-e-multiplicidade-erro` | 1; multiplicidade 2 | não | "Você esqueceu de dividir o coeficiente linear. O certo é 0,5; multiplicidade 2; 2x−1=0; x=1/2." |

#### D2 — `d2-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Se P=(x−1)²Q e Q=x−1, qual multiplicidade total de 1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (x−1)²·(x−1)=(x−1)³.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-raizes-polinomiais-e-multiplicidade-erro` | 2 | não | "Você não contou o fator dentro de Q. O certo é 3; (x−1)²·(x−1)=(x−1)³." |
| `d2-raizes-polinomiais-e-multiplicidade-certa` | 3 | **sim** | "Certo: 3; (x−1)²·(x−1)=(x−1)³." |

#### D3 — `d3-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Em C, x²+1 tem quantas raízes contadas com multiplicidade?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Raízes i e −i.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-raizes-polinomiais-e-multiplicidade-certa` | 2 | **sim** | "Certo: 2; Raízes i e −i." |
| `d3-raizes-polinomiais-e-multiplicidade-erro` | 0 | não | "Você restringiu a contagem aos reais. O certo é 2; Raízes i e −i." |

#### D4 — `d4-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "Ao retirar o fator x−1 de (x−1)(x+2), 1 ainda é raiz?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** P(1)=1+2=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-raizes-polinomiais-e-multiplicidade-erro` | Sim | não | "Expoente zero retira o fator. O certo é Não; P(1)=1+2=3." |
| `d4-raizes-polinomiais-e-multiplicidade-certa` | Não | **sim** | "Certo: Não; P(1)=1+2=3." |

#### D5 — `d5-raizes-polinomiais-e-multiplicidade`
- **Enunciado:** "P(x)=(x−1)²(x+2) cruza ou toca cada raiz, e qual é seu sinal em x=0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** m(−2)=1; m(1)=2; P(0)=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-raizes-polinomiais-e-multiplicidade-certa` | Cruza −2, toca 1; positivo | **sim** | "Certo: Cruza −2, toca 1; positivo; m(−2)=1; m(1)=2; P(0)=2." |
| `d5-raizes-polinomiais-e-multiplicidade-erro` | Toca −2, cruza 1; negativo | não | "Você trocou paridade e sinais. O certo é Cruza −2, toca 1; positivo; m(−2)=1; m(1)=2; P(0)=2." |

### Vestibular

#### V1 — `v1-raizes-polinomiais-e-multiplicidade`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações polinomiais, raízes e multiplicidade.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-raizes-polinomiais-e-multiplicidade`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações polinomiais, raízes e multiplicidade.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-raizes-polinomiais-e-multiplicidade`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações polinomiais, raízes e multiplicidade.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-raizes-polinomiais-e-multiplicidade`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações polinomiais, raízes e multiplicidade.
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
