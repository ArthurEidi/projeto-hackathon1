# Plano — Divisão de polinômios e teorema do resto

**Aula:** 1 — Divisão de polinômios e teorema do resto · O resto aparece como altura
**Caminho:** algebra / polinomios-e-complexos / divisao-polinomial-e-teorema-do-resto
**Pré-requisitos que o aluno já domina:** `polinomios`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o candidato r de um divisor x−r. A altura P(r) depende dessa entrada e coincide com o resto da divisão.

## b) Visual de partida

WIDGET NOVO: divisao-polinomial — P=x²−1, divisor constante d, exibe quociente P/d e resto 0; gráfico original fantasma; emite d.
Controles: d · Divisor constante · 1..2 · passo 1 · inicial 1 · c2.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Dividir P por 1 deixa P inalterado e resto zero; no divisor x−r, começar com r=0 lê o termo constante.

## d) Panorama e recorte

Há divisão longa e divisores de graus maiores; aqui dividimos por x−r e ligamos o resto à avaliação.

## e) Progressão por contraste

1. Referência visual: Leva d a 2; os coeficientes do quociente ficam pela metade.
2. Em contraste com a referência: Move para (2;3); a altura é lida como resto.
3. Aprofundamento e fronteiras: Retira x²−2x, deixando 2x−1; depois retira 2x−4, deixando 3; Q=x+2.
4. Depois, teste de fronteira: Chega a (1;0).

## f) Dedução causal da forma

A divisão escreve P(x)=(x−r)Q(x)+R, com R constante. Substituir x=r elimina o produto, então R=P(r); resto zero significa que x−r é fator.

Fórmula deduzida: P(x)=(x−r)Q(x)+P(r).

## g) Simulação espacial e fronteiras

Divisor zero é proibido; em divisor ax−b com a≠0, avaliar em b/a. Para divisor quadrático o resto pode ser linear; uma avaliação isolada não o determina.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Candidato r | Raiz do divisor linear x−r. |
| c2 | Divisor x−r | Polinômio pelo qual dividimos. |
| c3 | Valor P(r) | Altura do polinômio no candidato r. |
| c4 | Resto | Parcela que sobra após a divisão. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: divisao-polinomial — P=x²−1, divisor constante d, exibe quociente P/d e resto 0; gráfico original fantasma; emite d.
- **Sliders:** d · Divisor constante · 1..2 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "No caso neutro, dividir por 1 mantém P; ao dividir por 2 aparece resto?"
- **Interação do aluno:** Leva d a 2; os coeficientes do quociente ficam pela metade.
- **Conclusão:** `d ≥ 2`
- **Paco (conclusão):** "Não; nos reais, (x²−1)/2 é polinômio e o resto é zero."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há divisão longa e divisores de graus maiores; aqui dividimos por x−r e ligamos o resto à avaliação."

### Passo 2 — `ler-resto`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — quadrática a=1,b=0,c=−1,c3; ponto x=0, passo 1, cor c1; janela −2..3,−2..9.
- **Sliders:** nenhum
- **Paco (abertura):** "Ao dividir x²−1 por x−2, o resto é a altura em 2? Arraste até lá."
- **Interação do aluno:** Move para (2;3); a altura é lida como resto.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sim; P(2)=3 porque o termo (x−2)Q zera em 2, por isso sobra apenas o resto."

### Passo 3 — `montar-quociente`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: divisao-polinomial — tabela da divisão de x²−1 por x−2; etapa 0 exibe dividendos, 1 retira x(x−2), 2 retira 2(x−2); rótulos Q e R; emite etapa.
- **Sliders:** etapa · Parcela retirada · 0..2 · passo 1 · inicial 0 · ink
- **Paco (abertura):** "Qual termo anula x² primeiro e qual elimina o 2x restante? Avance as duas retiradas."
- **Interação do aluno:** Retira x²−2x, deixando 2x−1; depois retira 2x−4, deixando 3; Q=x+2.
- **Conclusão:** `etapa ≥ 2`
- **Paco (conclusão):** "Primeiro x, depois 2; por isso x²−1=(x−2)(x+2)+3, e o resto coincide com P(2)."

### Passo 4 — `encontrar-fator`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** plano_cartesiano — quadrática a=1,b=0,c=−1,c3; ponto x=0, passo 1; raízes c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Se o candidato for 1, ainda sobra resto? Arraste até a raiz."
- **Interação do aluno:** Chega a (1;0).
- **Conclusão:** `na_raiz ≥ 1`
- **Paco (conclusão):** "Não; P(1)=0, então x−1 é fator e o quociente é x+1."
- **Tati (dúvida):** `fim` — P: "E se o divisor for 2x−2?" / R: "O resto ainda é P(1); o quociente muda para (x+1)/2."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — quadrática a=1,b=0,c=−1,c3; ponto em (2;3); janela −2..3,−2..9.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual resto deixa x²−1 ao dividir por x−2?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 0 | não | "Você confundiu 2 com raiz; P(2)=4−1=3, então o resto é 3." | Mostra (2;3), separado do eixo por altura 3. |
| `micro-acerto` | 3 | **sim** | "Certo: 3; P(2)=4−1=3." | Destaca altura 3 em c4 e a identidade P=(x−2)(x+2)+3. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — P=x²−1, r=2 c1, altura P(2)=3 c4; legenda P=(x−2)(x+2)+3 com divisor c2 e valor c3.
- **Fórmula:** `P(x)=` · `(x−r)`→c2 · `Q(x)+P(r)`→c4
- **Definições:**
  - "Candidato r: Raiz do divisor linear x−r."
  - "Valor P(r): Altura do polinômio no candidato r."
  - "Resto: Parcela que sobra após a divisão."
- **Paco (abertura):** "Em x=r, o produto (x−r)Q zera; por isso o resto da divisão é P(r)."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual avaliação dá o resto ao dividir P(x) por x−2?"
- **Figura:** nenhuma
- **Conta de conferência:** x−2=0 em 2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-divisao-polinomial-e-teorema-do-resto-erro` | P(−2) | não | "Você trocou o sinal da raiz do divisor. O certo é P(2); x−2=0 em 2." |
| `f1-divisao-polinomial-e-teorema-do-resto-certa` | P(2) | **sim** | "Certo: P(2); x−2=0 em 2." |

#### F2 — `f2-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Resto zero ao dividir por x−r significa que x−r é fator?"
- **Figura:** nenhuma
- **Conta de conferência:** P=(x−r)Q.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-divisao-polinomial-e-teorema-do-resto-certa` | Sim | **sim** | "Certo: Sim; P=(x−r)Q." |
| `f2-divisao-polinomial-e-teorema-do-resto-erro` | Não | não | "Divisão exata produz uma fatoração. O certo é Sim; P=(x−r)Q." |

#### F3 — `f3-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "O resto da divisão por um polinômio linear pode ter grau 1?"
- **Figura:** nenhuma
- **Conta de conferência:** grau R<1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-divisao-polinomial-e-teorema-do-resto-erro` | Sim | não | "O grau do resto precisa ser menor. O certo é Não; grau R<1." |
| `f3-divisao-polinomial-e-teorema-do-resto-certa` | Não | **sim** | "Certo: Não; grau R<1." |

#### F4 — `f4-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Dividir um polinômio por 1 deixa resto quanto?"
- **Figura:** nenhuma
- **Conta de conferência:** P=1·P+0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-divisao-polinomial-e-teorema-do-resto-certa` | 0 | **sim** | "Certo: 0; P=1·P+0." |
| `f4-divisao-polinomial-e-teorema-do-resto-erro` | 1 | não | "Você confundiu divisor com resto. O certo é 0; P=1·P+0." |

### Médias

#### M1 — `m1-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual é o resto de x²−1 por x−2?"
- **Figura:** nenhuma
- **Conta de conferência:** P(2)=4−1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-divisao-polinomial-e-teorema-do-resto-erro` | 0 | não | "Você presumiu que 2 fosse raiz. O certo é 3; P(2)=4−1=3." |
| `m1-divisao-polinomial-e-teorema-do-resto-certa` | 3 | **sim** | "Certo: 3; P(2)=4−1=3." |

#### M2 — `m2-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual é o resto de x²+1 por x+1?"
- **Figura:** nenhuma
- **Conta de conferência:** P(−1)=1+1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-divisao-polinomial-e-teorema-do-resto-certa` | 2 | **sim** | "Certo: 2; P(−1)=1+1=2." |
| `m2-divisao-polinomial-e-teorema-do-resto-erro` | 0 | não | "Você ignorou o termo constante positivo. O certo é 2; P(−1)=1+1=2." |

#### M3 — `m3-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual é o quociente de x²−1 por x−1?"
- **Figura:** nenhuma
- **Conta de conferência:** x²−1=(x−1)(x+1).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-divisao-polinomial-e-teorema-do-resto-erro` | x−1 | não | "Você confundiu diferença de quadrados com quadrado da diferença. O certo é x+1; x²−1=(x−1)(x+1)." |
| `m3-divisao-polinomial-e-teorema-do-resto-certa` | x+1 | **sim** | "Certo: x+1; x²−1=(x−1)(x+1)." |

### Desafios

#### D1 — `d1-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual k faz x²+k divisível por x−2?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 4+k=0; k=−4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-divisao-polinomial-e-teorema-do-resto-certa` | −4 | **sim** | "Certo: −4; 4+k=0; k=−4." |
| `d1-divisao-polinomial-e-teorema-do-resto-erro` | 4 | não | "Você trocou o sinal ao zerar o resto. O certo é −4; 4+k=0; k=−4." |

#### D2 — `d2-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual é o resto de P(x)=2x+1 por 2x−1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** P(0,5)=1+1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-divisao-polinomial-e-teorema-do-resto-erro` | 3 | não | "Você avaliou em 1, não na raiz 0,5. O certo é 2; P(0,5)=1+1=2." |
| `d2-divisao-polinomial-e-teorema-do-resto-certa` | 2 | **sim** | "Certo: 2; P(0,5)=1+1=2." |

#### D3 — `d3-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "O resto por x²−1 precisa ser constante?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** R pode ser ax+b.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-divisao-polinomial-e-teorema-do-resto-certa` | Não | **sim** | "Certo: Não; R pode ser ax+b." |
| `d3-divisao-polinomial-e-teorema-do-resto-erro` | Sim | não | "Você aplicou a regra do divisor linear. O certo é Não; R pode ser ax+b." |

#### D4 — `d4-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Qual é o resto de x³−1 por x−1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** P(1)=1−1=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-divisao-polinomial-e-teorema-do-resto-erro` | 2 | não | "Você somou em vez de subtrair 1. O certo é 0; P(1)=1−1=0." |
| `d4-divisao-polinomial-e-teorema-do-resto-certa` | 0 | **sim** | "Certo: 0; P(1)=1−1=0." |

#### D5 — `d5-divisao-polinomial-e-teorema-do-resto`
- **Enunciado:** "Se P(x)=(x−2)(x+1)+3, quais são o resto por x−2 e P(0)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** P(2)=3; P(0)=−2+3=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-divisao-polinomial-e-teorema-do-resto-certa` | 3 e 1 | **sim** | "Certo: 3 e 1; P(2)=3; P(0)=−2+3=1." |
| `d5-divisao-polinomial-e-teorema-do-resto-erro` | 0 e 3 | não | "Você confundiu a parcela do produto com o resto. O certo é 3 e 1; P(2)=3; P(0)=−2+3=1." |

### Vestibular

#### V1 — `v1-divisao-polinomial-e-teorema-do-resto`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema divisão de polinômios e teorema do resto.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-divisao-polinomial-e-teorema-do-resto`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema divisão de polinômios e teorema do resto.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-divisao-polinomial-e-teorema-do-resto`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema divisão de polinômios e teorema do resto.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-divisao-polinomial-e-teorema-do-resto`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema divisão de polinômios e teorema do resto.
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
