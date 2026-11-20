# Plano — Polinômios: grau, termos e raízes

**Aula:** 1 — Somas de Potências · Grau, raízes e divisão
**Caminho:** algebra / polinomios-e-complexos / polinomios
**Pré-requisitos que o aluno já domina:** `expressoes-algebricas-e-produtos-notaveis`, `fatoracao-algebrica`; operações com sinais e leitura de coordenadas.

## a) Ancoragem mecânica

O aluno controla x e os coeficientes. A máquina soma potências da entrada; o valor e a forma da curva dependem dessas parcelas.

## b) Visual de partida

plano_cartesiano — afim a=1,b=0,c3; ponto x=0,passo 1; janela −3..4.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

P(x)=x é a identidade; a reta fica fantasma quando o termo quadrático entra.

## d) Panorama e recorte

Polinômios têm grau, raízes e divisão; aqui lemos termos, valores e zeros, deixando divisão e multiplicidade para os próximos capítulos.

## e) Progressão por contraste

1. Referência visual: Move para (−1;−1).
2. Em contraste com a referência: Curva troca reta por parábola; para ±2, soma-se 4 à saída anterior.
3. Aprofundamento e fronteiras: A curva cúbica vira a reta x.

## f) Dedução causal da forma

Cada potência recebe seu coeficiente e as parcelas se somam. O grau é o maior expoente de coeficiente não nulo após reduzir termos semelhantes; uma raiz r satisfaz P(r)=0. Um polinômio não nulo de grau n tem no máximo n raízes reais distintas.

Fórmula deduzida: P(x)=aₙxⁿ+…+a₁x+a₀; aₙ≠0.

## g) Simulação espacial e fronteiras

Cancelar termos pode reduzir o grau; o polinômio zero não tem grau definido nesta convenção. Nem toda raiz é real; a janela do gráfico não prova ausência de outras raízes.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número usado em todas as parcelas. |
| c2 | Coeficientes | Fatores que multiplicam as potências de x. |
| c3 | Valor P(x) | Soma das parcelas do polinômio. |
| c4 | Raízes | Entradas em que a soma vale zero. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — afim a=1,b=0,c3; ponto x=0,passo 1; janela −3..4.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro P(x)=x, qual saída aparece em −1? Arraste até lá."
- **Interação do aluno:** Move para (−1;−1).
- **Conclusão:** `ponto_x ≤ −1`
- **Paco (conclusão):** "Sai −1 porque a identidade conserva a entrada."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Polinômios têm grau, raízes e divisão; aqui lemos termos, valores e zeros, deixando divisão e multiplicidade para os próximos capítulos."

### Passo 2 — `somar-quadrado`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — quadrática a variável,b=1,c=0,c3; identidade fantasma; raízes c4; janela x −3..3,y −3..12.
- **Sliders:** a · Coeficiente de x² · 0..1 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Ao ligar x², o que muda em x=−2 e x=2? Leve a a 1."
- **Interação do aluno:** Curva troca reta por parábola; para ±2, soma-se 4 à saída anterior.
- **Conclusão:** `a ≥ 1`
- **Paco (conclusão):** "As duas saídas ganham 4; por isso somar potências muda a curva sem exigir simetria da soma."

### Passo 3 — `raizes-e-grau`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: plano-polinomial — P(x)=a·x³+x, identidade fantasma; coeficientes c2, saída c3 e raízes c4; emite a.
- **Sliders:** a · Coeficiente de x³ · 0..1 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Se o coeficiente cúbico zerar, o grau continua 3? Reduza a até 0."
- **Interação do aluno:** A curva cúbica vira a reta x.
- **Conclusão:** `a ≤ 0`
- **Paco (conclusão):** "Não; o maior termo restante é x, por isso o grau cai para 1."
- **Tati (dúvida):** `fim` — P: "Grau 3 garante três raízes reais?" / R: "Não; x³+x só zera em 0 nos reais, pois x²+1 nunca zera."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-polinomial-figura — P(x)=3x³−2x+1, coeficientes c2 e curva c3, janela −2..2, tabela de termos e graus.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é o grau de 3x³−2x+1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 6 | não | "Você somou expoentes; o maior expoente não nulo é 3, então o grau é 3." | Destaca x³ e separa os termos de graus 1 e 0. |
| `micro-acerto` | 3 | **sim** | "Certo: 3; O maior expoente com coeficiente não nulo é 3." | Destaca o termo 3x³ e o indicador grau 3. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — P(x)=x²+x, coeficientes a₂=1,a₁=1,a₀=0 em c2, curva c3, raízes −1 e 0 em c4, grau 2 em ink.
- **Fórmula:** `P(x)`→c3 · `=aₙ`→c2 · `xⁿ`→c1 · `+…+a₁x+a₀; aₙ≠0`
- **Definições:**
  - "Entrada x: Número usado em todas as parcelas."
  - "Valor P(x): Soma das parcelas do polinômio."
  - "Raízes: Entradas em que a soma vale zero."
- **Paco (abertura):** "As potências se somam com pesos; por isso o maior expoente não cancelado define o grau."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-polinomios`
- **Enunciado:** "Em P(x)=x, quanto vale P(−1)?"
- **Figura:** nenhuma
- **Conta de conferência:** P(−1)=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-polinomios-erro` | 1 | não | "Você aplicou módulo sem ele existir. O certo é −1; P(−1)=−1." |
| `f1-polinomios-certa` | −1 | **sim** | "Certo: −1; P(−1)=−1." |

#### F2 — `f2-polinomios`
- **Enunciado:** "Qual é o grau de 3x³−2x+1?"
- **Figura:** nenhuma
- **Conta de conferência:** Maior expoente não nulo: 3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-polinomios-certa` | 3 | **sim** | "Certo: 3; Maior expoente não nulo: 3." |
| `f2-polinomios-erro` | 6 | não | "Você somou expoentes. O certo é 3; Maior expoente não nulo: 3." |

#### F3 — `f3-polinomios`
- **Enunciado:** "Em P(x)=x²+3x−2, quanto vale P(0)?"
- **Figura:** nenhuma
- **Conta de conferência:** 0+0−2=−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-polinomios-erro` | 0 | não | "O termo constante não desaparece. O certo é −2; 0+0−2=−2." |
| `f3-polinomios-certa` | −2 | **sim** | "Certo: −2; 0+0−2=−2." |

#### F4 — `f4-polinomios`
- **Enunciado:** "Ser raiz de P significa produzir qual saída?"
- **Figura:** nenhuma
- **Conta de conferência:** P(r)=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-polinomios-certa` | 0 | **sim** | "Certo: 0; P(r)=0." |
| `f4-polinomios-erro` | 1 | não | "Você confundiu raiz com identidade. O certo é 0; P(r)=0." |

### Médias

#### M1 — `m1-polinomios`
- **Enunciado:** "Quanto vale P(2) em P(x)=x²−1?"
- **Figura:** nenhuma
- **Conta de conferência:** 2²−1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-polinomios-erro` | 1 | não | "Você esqueceu de elevar 2 ao quadrado. O certo é 3; 2²−1=3." |
| `m1-polinomios-certa` | 3 | **sim** | "Certo: 3; 2²−1=3." |

#### M2 — `m2-polinomios`
- **Enunciado:** "Quais são as raízes de x(x−2)?"
- **Figura:** nenhuma
- **Conta de conferência:** x=0 ou x−2=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-polinomios-certa` | 0 e 2 | **sim** | "Certo: 0 e 2; x=0 ou x−2=0." |
| `m2-polinomios-erro` | Só 2 | não | "Você cancelou o fator x. O certo é 0 e 2; x=0 ou x−2=0." |

#### M3 — `m3-polinomios`
- **Enunciado:** "Qual é o grau de x³−x³+2x?"
- **Figura:** nenhuma
- **Conta de conferência:** x³−x³=0; sobra 2x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-polinomios-erro` | 3 | não | "Você não reduziu os termos semelhantes. O certo é 1; x³−x³=0; sobra 2x." |
| `m3-polinomios-certa` | 1 | **sim** | "Certo: 1; x³−x³=0; sobra 2x." |

### Desafios

#### D1 — `d1-polinomios`
- **Enunciado:** "Se P(x)=ax²+x e a=0, qual é o grau?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** P(x)=x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-polinomios-certa` | 1 | **sim** | "Certo: 1; P(x)=x." |
| `d1-polinomios-erro` | 2 | não | "Coeficiente zero elimina o termo de grau 2. O certo é 1; P(x)=x." |

#### D2 — `d2-polinomios`
- **Enunciado:** "O polinômio zero tem grau definido nesta aula?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Nenhum coeficiente é não nulo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-polinomios-erro` | 0 | não | "Você confundiu zero com constante não nula. O certo é Não; Nenhum coeficiente é não nulo." |
| `d2-polinomios-certa` | Não | **sim** | "Certo: Não; Nenhum coeficiente é não nulo." |

#### D3 — `d3-polinomios`
- **Enunciado:** "Em P(x)=2x−1, qual é a raiz?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x=1; x=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-polinomios-certa` | 0,5 | **sim** | "Certo: 0,5; 2x=1; x=1/2." |
| `d3-polinomios-erro` | 2 | não | "Você inverteu a divisão. O certo é 0,5; 2x=1; x=1/2." |

#### D4 — `d4-polinomios`
- **Enunciado:** "P(x)=x³+x tem quantas raízes reais distintas?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x(x²+1)=0 só em x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-polinomios-erro` | 3 | não | "Grau não garante todas as raízes reais. O certo é 1; x(x²+1)=0 só em x=0." |
| `d4-polinomios-certa` | 1 | **sim** | "Certo: 1; x(x²+1)=0 só em x=0." |

#### D5 — `d5-polinomios`
- **Enunciado:** "P(x)=ax²+b passa por (0;1) e (1;3); quanto vale P(2)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** b=1; a=2; P(2)=8+1=9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-polinomios-certa` | 9 | **sim** | "Certo: 9; b=1; a=2; P(2)=8+1=9." |
| `d5-polinomios-erro` | 5 | não | "Você tratou a mudança como linear. O certo é 9; b=1; a=2; P(2)=8+1=9." |

### Vestibular

> B43 (19/11/2026): as vagas preenchidas abaixo trazem questões de provas oficiais conferidas no PDF e no gabarito oficial (registro em `docs/revisao/vestibular-b43.md`). As vagas PENDENTE-FONTE seguem abertas; nada foi inventado.

#### V1 — `unicamp-2026-grau-diferenca`
- **Enunciado (resumido):** "Dois polinômios reais p e q: p + q tem grau 3 e p · q tem grau 8. Qual é o grau de p − q?"
- **Fala do Paco:** "No produto, os graus se somam. Se p + q caiu para grau 3, o que aconteceu com os termos de maior grau?"
- **Fonte:** Unicamp 2026 (adaptada) — **Adaptação:** 1ª fase, Questão 45: enunciado reescrito como pergunta; alternativas e gabarito oficial (b) mantidos. — **URL:** https://www.comvest.unicamp.br/wp-content/uploads/2026/06/F1_2026_Prova-Q.pdf
- **Conta de conferência:** graus n + m = 8 e grau(p + q) = 3 ⇒ n = m = 4 com líderes opostos ⇒ grau(p − q) = 4 (b).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | não | "Graus 5 e 3 dariam p · q de grau 8, mas p + q de grau 5. Para a soma cair a 3, os dois têm grau 4 e líderes opostos: p − q tem grau 4." |
| `a4` | 4 | **sim** | "Isso. Os graus somam 8 e a soma caiu para 3: p e q têm grau 4 com líderes opostos, que se cancelam em p + q e se somam em p − q." |
| `a3` | 3 | não | "3 copia o grau de p + q. Os termos de grau 4 se cancelam na soma, mas na diferença eles se somam: p − q tem grau 4." |
| `a2` | 2 | não | "2 supõe que a diferença perde ainda mais grau. Os líderes opostos se cancelam em p + q e se somam em p − q: grau 4." |

#### V2 — `v2-polinomios`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema polinômios: grau, termos e raízes.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-polinomios`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema polinômios: grau, termos e raízes.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-polinomios`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema polinômios: grau, termos e raízes.
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
