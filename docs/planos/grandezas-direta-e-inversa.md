# Plano — Grandezas diretamente e inversamente proporcionais

**Aula:** 1 — Grandezas diretamente e inversamente proporcionais · Razão constante ou produto constante
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / grandezas-direta-e-inversa
**Pré-requisitos que o aluno já domina:** `razao-proporcao-porcentagem`; contagem e leitura da reta numérica.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla a quantidade x. A outra grandeza y depende de manter constante a razão y/x ou o produto xy.

## b) Visual de partida

plano_cartesiano — afim a=1,b=0,c3, ponto x=1,passo 1; janela 0..5; referência (1;1) muted.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Na relação direta y=x, a entrada passa sem mudança; para a inversa, a referência é x=1 e y=k, antes de redistribuir o mesmo total.

## d) Panorama e recorte

Relações crescentes nem sempre são proporcionais; aqui distinguimos y=kx de y=k/x e testamos os invariantes.

## e) Progressão por contraste

1. Referência visual: Move de (1;1) para (2;2).
2. Em contraste com a referência: Retângulo muda de 1×6 para 2×3; produto fica 6.
3. Depois, teste de fronteira: Compara saídas 3 e 5, com valores proporcionais 2 e 4 na fantasma.

## f) Dedução causal da forma

Se y/x=k, multiplicar ambos os lados por x dá y=kx; duplicar x duplica y. Se xy=k, dividir por x≠0 dá y=k/x; duplicar x divide y por 2. Uma taxa fixa adicionada quebra a proporcionalidade direta.

Fórmula deduzida: Direta: y=kx; inversa: xy=k ⇔ y=k/x.

## g) Simulação espacial e fronteiras

No contexto de produtividade usamos x>0 e k>0; não dividir por zero. Gráfico crescente com intercepto não nulo não é diretamente proporcional. Eficiência constante é hipótese do modelo.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Grandeza x | Quantidade escolhida como entrada. |
| c2 | Constante k | Valor que não muda na razão ou no produto. |
| c3 | Grandeza y | Quantidade que responde à entrada. |
| c4 | Invariante | Razão ou produto que o modelo conserva. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — afim a=1,b=0,c3, ponto x=1,passo 1; janela 0..5; referência (1;1) muted.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro y=x, dobrar x dobra a saída? Arraste até 2."
- **Interação do aluno:** Move de (1;1) para (2;2).
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sim; a razão y/x continua 1, por isso ambas crescem na mesma proporção."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Relações crescentes nem sempre são proporcionais; aqui distinguimos y=kx de y=k/x e testamos os invariantes."

### Passo 2 — `manter-produto`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: plano-proporcional — curva y=6/x c3, domínio x>0; ponto x=1,passo 1; retângulo x·y=6 c4; referência (1;6) muted; emite ponto_x.
- **Sliders:** nenhum
- **Paco (abertura):** "Com área total 6, dobrar a largura faz a altura dobrar? Leve x a 2."
- **Interação do aluno:** Retângulo muda de 1×6 para 2×3; produto fica 6.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Não; a altura cai à metade, por isso a inversa conserva o produto, não a razão."

### Passo 3 — `testar-taxa-fixa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — afim a=2,b=1,c3, y=2x fantasma; ponto x=1,passo 1; janela 0..4,0..9.
- **Sliders:** nenhum
- **Paco (abertura):** "Em y=2x+1, dobrar x de 1 para 2 dobra y? Arraste e compare."
- **Interação do aluno:** Compara saídas 3 e 5, com valores proporcionais 2 e 4 na fantasma.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Não; 5≠2·3, por isso a parcela fixa impede proporcionalidade direta."
- **Tati (dúvida):** `fim` — P: "Posso usar x=0 na relação inversa?" / R: "Não com k≠0; dividir por zero não define uma saída."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-proporcional-figura — y=6/x, ponto (2;3), retângulo de área 6 em c4; versão estática.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Se xy=6 e x passa de 1 para 2, quanto vale y?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 12 | não | "Você aplicou proporcionalidade direta; o produto exige y=6/2=3." | Mostra retângulo 2×12 com área 24, diferente do total. |
| `micro-acerto` | 3 | **sim** | "Certo: 3; 2·3=6." | Mostra retângulo 2×3 com área 6. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: plano-proporcional-figura — y=6/x, ponto (2;3), retângulo de área 6 em c4; versão estática.
- **Fórmula:** `y`→c3 · `=k`→c2 · `x`→c1 · `; y/x=k`→c4 · `; inversa: xy=k`→c4
- **Definições:**
  - "Grandeza x: Quantidade escolhida como entrada."
  - "Grandeza y: Quantidade que responde à entrada."
  - "Invariante: Razão ou produto que o modelo conserva."
- **Paco (abertura):** "A direta conserva a razão e a inversa conserva o produto; por isso duplicar x tem efeitos diferentes sobre y."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-grandezas-direta-e-inversa`
- **Enunciado:** "Em y=2x, qual razão fica constante?"
- **Figura:** nenhuma
- **Conta de conferência:** y/x=2 para x≠0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-grandezas-direta-e-inversa-erro` | xy | não | "Você confundiu direta com inversa. O certo é y/x; y/x=2 para x≠0." |
| `f1-grandezas-direta-e-inversa-certa` | y/x | **sim** | "Certo: y/x; y/x=2 para x≠0." |

#### F2 — `f2-grandezas-direta-e-inversa`
- **Enunciado:** "Em xy=6, qual quantidade fica constante?"
- **Figura:** nenhuma
- **Conta de conferência:** xy=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-grandezas-direta-e-inversa-certa` | Produto | **sim** | "Certo: Produto; xy=6." |
| `f2-grandezas-direta-e-inversa-erro` | Razão | não | "Na inversa o produto é fixo. O certo é Produto; xy=6." |

#### F3 — `f3-grandezas-direta-e-inversa`
- **Enunciado:** "Em y=x, dobrar x dobra y?"
- **Figura:** nenhuma
- **Conta de conferência:** y(2x)=2x=2y(x).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-grandezas-direta-e-inversa-erro` | Não | não | "As grandezas são diretamente proporcionais. O certo é Sim; y(2x)=2x=2y(x)." |
| `f3-grandezas-direta-e-inversa-certa` | Sim | **sim** | "Certo: Sim; y(2x)=2x=2y(x)." |

#### F4 — `f4-grandezas-direta-e-inversa`
- **Enunciado:** "Toda relação crescente é diretamente proporcional?"
- **Figura:** nenhuma
- **Conta de conferência:** y=x+1 é crescente e y/x varia.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-grandezas-direta-e-inversa-certa` | Não | **sim** | "Certo: Não; y=x+1 é crescente e y/x varia." |
| `f4-grandezas-direta-e-inversa-erro` | Sim | não | "Crescimento não basta para conservar a razão. O certo é Não; y=x+1 é crescente e y/x varia." |

### Médias

#### M1 — `m1-grandezas-direta-e-inversa`
- **Enunciado:** "Se y=3x e x=2, quanto vale y?"
- **Figura:** nenhuma
- **Conta de conferência:** y=3·2=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-grandezas-direta-e-inversa-erro` | 1,5 | não | "Você usou uma regra inversa. O certo é 6; y=3·2=6." |
| `m1-grandezas-direta-e-inversa-certa` | 6 | **sim** | "Certo: 6; y=3·2=6." |

#### M2 — `m2-grandezas-direta-e-inversa`
- **Enunciado:** "Se xy=6 e x=2, quanto vale y?"
- **Figura:** nenhuma
- **Conta de conferência:** y=6/2=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-grandezas-direta-e-inversa-certa` | 3 | **sim** | "Certo: 3; y=6/2=3." |
| `m2-grandezas-direta-e-inversa-erro` | 12 | não | "Você usou uma regra direta. O certo é 3; y=6/2=3." |

#### M3 — `m3-grandezas-direta-e-inversa`
- **Enunciado:** "Se 2 cadernos custam 6, quanto custam 3 ao mesmo preço unitário?"
- **Figura:** nenhuma
- **Conta de conferência:** Unidade=6/2=3; total=3·3=9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-grandezas-direta-e-inversa-erro` | 4 | não | "Você inverteu a proporção. O certo é 9; Unidade=6/2=3; total=3·3=9." |
| `m3-grandezas-direta-e-inversa-certa` | 9 | **sim** | "Certo: 9; Unidade=6/2=3; total=3·3=9." |

### Desafios

#### D1 — `d1-grandezas-direta-e-inversa`
- **Enunciado:** "Se y=2x+1, a relação é diretamente proporcional?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** y(1)=3; y(2)=5≠6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-grandezas-direta-e-inversa-certa` | Não | **sim** | "Certo: Não; y(1)=3; y(2)=5≠6." |
| `d1-grandezas-direta-e-inversa-erro` | Sim | não | "A taxa fixa quebra a razão constante. O certo é Não; y(1)=3; y(2)=5≠6." |

#### D2 — `d2-grandezas-direta-e-inversa`
- **Enunciado:** "Em y=6/x, x=0 é permitido?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 6/0 não existe.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-grandezas-direta-e-inversa-erro` | Sim | não | "O denominador não pode zerar. O certo é Não; 6/0 não existe." |
| `d2-grandezas-direta-e-inversa-certa` | Não | **sim** | "Certo: Não; 6/0 não existe." |

#### D3 — `d3-grandezas-direta-e-inversa`
- **Enunciado:** "Uma relação direta passa por (2;1); quanto vale y em x=1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** k=1/2; y=0,5·1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-grandezas-direta-e-inversa-certa` | 0,5 | **sim** | "Certo: 0,5; k=1/2; y=0,5·1." |
| `d3-grandezas-direta-e-inversa-erro` | 2 | não | "Você inverteu a constante de proporcionalidade. O certo é 0,5; k=1/2; y=0,5·1." |

#### D4 — `d4-grandezas-direta-e-inversa`
- **Enunciado:** "Se xy=8 e x triplica, o que acontece com y?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (3x)·(y/3)=xy.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-grandezas-direta-e-inversa-erro` | Multiplica por 3 | não | "Você não conservou o produto. O certo é Divide por 3; (3x)·(y/3)=xy." |
| `d4-grandezas-direta-e-inversa-certa` | Divide por 3 | **sim** | "Certo: Divide por 3; (3x)·(y/3)=xy." |

#### D5 — `d5-grandezas-direta-e-inversa`
- **Enunciado:** "Duas máquinas iguais terminam uma tarefa em 6 horas; com três máquinas de mesma eficiência, quantas horas são necessárias?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Trabalho=2·6=12; tempo=12/3=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-grandezas-direta-e-inversa-certa` | 4 | **sim** | "Certo: 4; Trabalho=2·6=12; tempo=12/3=4." |
| `d5-grandezas-direta-e-inversa-erro` | 9 | não | "Você aplicou proporção direta ao tempo. O certo é 4; Trabalho=2·6=12; tempo=12/3=4." |

### Vestibular

#### V1 — `v1-grandezas-direta-e-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema grandezas diretamente e inversamente proporcionais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-grandezas-direta-e-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema grandezas diretamente e inversamente proporcionais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-grandezas-direta-e-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema grandezas diretamente e inversamente proporcionais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-grandezas-direta-e-inversa`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema grandezas diretamente e inversamente proporcionais.
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
