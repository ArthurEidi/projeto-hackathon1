# Plano — Inequações trigonométricas

**Aula:** 1 — Inequações trigonométricas · Arcos que satisfazem a comparação
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-trigonometricas
**Pré-requisitos que o aluno já domina:** `equacoes-trigonometricas`, `radianos-e-ciclo-trigonometrico`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla θ no ciclo. O sinal da projeção seleciona arcos inteiros em vez de pontos isolados.

## b) Visual de partida

WIDGET NOVO: ciclo_trigonometrico — ciclo unitário, seno c3, arco (0°;180°) c4; ângulo 0 fantasma; emite angulo.
Controles: angulo · Giro em graus · 0..360 · passo 30 · inicial 0 · c1.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Em θ=0 não há giro e o seno é zero; a desigualdade estrita deixa esse extremo fora.

## d) Panorama e recorte

Seno, cosseno e tangente geram arcos distintos; aqui resolvemos uma volta e estendemos pelo período.

## e) Progressão por contraste

1. Referência visual: Gira para o topo, dentro do arco destacado.
2. Em contraste com a referência: Cruza a fronteira e desce ao ponto (0;−1).
3. Aprofundamento e fronteiras: Encosta no limite inferior do arco e lê igualdade.

## f) Dedução causal da forma

O seno é a altura do ponto: acima do eixo é positivo. O cosseno é a coordenada horizontal; a tangente é seno dividido por cosseno e herda seus sinais e suas exclusões.

Fórmula deduzida: sen θ>0 ⇔ 2kπ<θ<π+2kπ, k∈Z.

## g) Simulação espacial e fronteiras

Extremos com igualdade entram em ≥ e saem em >; para tangente, π/2 e 3π/2 continuam proibidos. Intervalos com 2π fechado exigem analisar esse ponto.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Ângulo θ | Giro do raio unitário. |
| c2 | Limite comparado | Altura ou coordenada usada como fronteira. |
| c3 | Projeção | Seno, cosseno ou tangente da posição. |
| c4 | Arcos-solução | Partes do ciclo que satisfazem a comparação. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: ciclo_trigonometrico — ciclo unitário, seno c3, arco (0°;180°) c4; ângulo 0 fantasma; emite angulo.
- **Sliders:** angulo · Giro em graus · 0..360 · passo 30 · inicial 0 · c1
- **Paco (abertura):** "No caso neutro θ=0, o seno é zero; ao girar até 90°, ele se torna positivo?"
- **Interação do aluno:** Gira para o topo, dentro do arco destacado.
- **Conclusão:** `angulo ≥ 90`
- **Paco (conclusão):** "Sim; acima do eixo a altura é positiva, por isso todo o arco superior serve."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Seno, cosseno e tangente geram arcos distintos; aqui resolvemos uma volta e estendemos pelo período."

### Passo 2 — `cruzar-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: ciclo_trigonometrico — arco superior aberto c4; projeção seno c3; referência 90° muted; emite angulo.
- **Sliders:** angulo · Giro em graus · 90..360 · passo 30 · inicial 90 · c1
- **Paco (abertura):** "Depois de passar 180°, o seno ainda é positivo? Leve o raio a 270°."
- **Interação do aluno:** Cruza a fronteira e desce ao ponto (0;−1).
- **Conclusão:** `angulo ≥ 270`
- **Paco (conclusão):** "Não; o ponto está abaixo do eixo, então a altura é negativa."

### Passo 3 — `limite-meio`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: ciclo_trigonometrico — horizontal y=0,5 c2; arco fechado [30°;150°] c4; emite angulo e dentro (0/1).
- **Sliders:** angulo · Giro em graus · 0..180 · passo 30 · inicial 0 · c1
- **Paco (abertura):** "Para sen θ≥0,5, 30° entra? Arraste até essa fronteira."
- **Interação do aluno:** Encosta no limite inferior do arco e lê igualdade.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Entra; a comparação aceita igualdade, por isso o arco inclui 30° e 150°."
- **Tati (dúvida):** `fim` — P: "Tangente também existe em 90°?" / R: "Não; ali o cosseno zera, e dividir por ele é proibido."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: ciclo-figura — ciclo unitário, arco superior e extremos 0 e π abertos; projeção vertical c3.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Em [0;2π), onde sen θ>0?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | [0;π] | não | "Você incluiu seno zero; a solução é (0;π), com extremos abertos." | Destaca θ=0 e θ=π, onde a altura é zero. |
| `micro-acerto` | (0;π) | **sim** | "Certo: (0;π); A altura é positiva apenas no arco superior aberto." | Sombreia apenas o arco superior sem extremos. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: ciclo-figura — arco (0;π) c4, alturas positivas c3, extremos abertos e rótulo repetição 2kπ em ink.
- **Fórmula:** `sen θ`→c3 · `>0 ⇔ 2kπ<θ<π+2kπ`→c4 · `, k∈Z`
- **Definições:**
  - "Ângulo θ: Giro do raio unitário."
  - "Projeção: Seno, cosseno ou tangente da posição."
  - "Arcos-solução: Partes do ciclo que satisfazem a comparação."
- **Paco (abertura):** "Seno é altura; por isso sua positividade ocupa o arco superior, repetido a cada volta."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

O treino reúne 12 questões autorais e uma de vestibular conferida. Os três espaços restantes de vestibular aguardam fonte.

### Fáceis

#### F1 — `f1-inequacoes-trigonometricas`
- **Enunciado:** "Em qual metade do ciclo sen θ é positivo?"
- **Figura:** nenhuma
- **Conta de conferência:** Acima do eixo: y>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-trigonometricas-erro` | Inferior | não | "Você trocou o sinal da altura. O certo é Superior; Acima do eixo: y>0." |
| `f1-inequacoes-trigonometricas-certa` | Superior | **sim** | "Certo: Superior; Acima do eixo: y>0." |

#### F2 — `f2-inequacoes-trigonometricas`
- **Enunciado:** "Em sen θ>0, θ=0 entra?"
- **Figura:** nenhuma
- **Conta de conferência:** sen 0=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-trigonometricas-certa` | Não | **sim** | "Certo: Não; sen 0=0." |
| `f2-inequacoes-trigonometricas-erro` | Sim | não | "O sinal estrito não permite zero. O certo é Não; sen 0=0." |

#### F3 — `f3-inequacoes-trigonometricas`
- **Enunciado:** "O cosseno é positivo no lado direito do ciclo?"
- **Figura:** nenhuma
- **Conta de conferência:** x>0 no lado direito.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-trigonometricas-erro` | Não | não | "Cosseno é a coordenada horizontal. O certo é Sim; x>0 no lado direito." |
| `f3-inequacoes-trigonometricas-certa` | Sim | **sim** | "Certo: Sim; x>0 no lado direito." |

#### F4 — `f4-inequacoes-trigonometricas`
- **Enunciado:** "Tangente existe em θ=π/2?"
- **Figura:** nenhuma
- **Conta de conferência:** tg θ=sen θ/cos θ.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-trigonometricas-certa` | Não | **sim** | "Certo: Não; tg θ=sen θ/cos θ." |
| `f4-inequacoes-trigonometricas-erro` | Sim | não | "O denominador cosseno zera. O certo é Não; tg θ=sen θ/cos θ." |

### Médias

#### M1 — `m1-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen θ>0."
- **Figura:** nenhuma
- **Conta de conferência:** Parte superior sem extremos.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-trigonometricas-erro` | [0;π] | não | "Você incluiu as alturas zero. O certo é (0;π); Parte superior sem extremos." |
| `m1-inequacoes-trigonometricas-certa` | (0;π) | **sim** | "Certo: (0;π); Parte superior sem extremos." |

#### M2 — `m2-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen θ≤0."
- **Figura:** nenhuma
- **Conta de conferência:** sen 0=0 e seno≤0 na metade inferior.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-trigonometricas-certa` | {0}∪[π;2π) | **sim** | "Certo: {0}∪[π;2π); sen 0=0 e seno≤0 na metade inferior." |
| `m2-inequacoes-trigonometricas-erro` | [π;2π) | não | "Você esqueceu a igualdade em zero. O certo é {0}∪[π;2π); sen 0=0 e seno≤0 na metade inferior." |

#### M3 — `m3-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva cos θ<0."
- **Figura:** nenhuma
- **Conta de conferência:** Lado esquerdo do ciclo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-trigonometricas-erro` | (0;π) | não | "Você leu altura em vez de coordenada horizontal. O certo é (π/2;3π/2); Lado esquerdo do ciclo." |
| `m3-inequacoes-trigonometricas-certa` | (π/2;3π/2) | **sim** | "Certo: (π/2;3π/2); Lado esquerdo do ciclo." |

### Desafios

#### D1 — `d1-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen θ≥0,5."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Arco acima de y=0,5, com extremos.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-trigonometricas-certa` | [π/6;5π/6] | **sim** | "Certo: [π/6;5π/6]; Arco acima de y=0,5, com extremos." |
| `d1-inequacoes-trigonometricas-erro` | (π/6;5π/6) | não | "Você retirou a igualdade. O certo é [π/6;5π/6]; Arco acima de y=0,5, com extremos." |

#### D2 — `d2-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen θ>1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** sen θ≤1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-trigonometricas-erro` | {π/2} | não | "O máximo 1 não é maior que 1. O certo é ∅; sen θ≤1." |
| `d2-inequacoes-trigonometricas-certa` | ∅ | **sim** | "Certo: ∅; sen θ≤1." |

#### D3 — `d3-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva tg θ>0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Positiva nos quadrantes I e III.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-trigonometricas-certa` | (0;π/2)∪(π;3π/2) | **sim** | "Certo: (0;π/2)∪(π;3π/2); Positiva nos quadrantes I e III." |
| `d3-inequacoes-trigonometricas-erro` | (0;π) | não | "Tangente exige seno e cosseno com mesmo sinal. O certo é (0;π/2)∪(π;3π/2); Positiva nos quadrantes I e III." |

#### D4 — `d4-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva cos θ≥1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** cos θ≤1; 2π não entra.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-trigonometricas-erro` | {0;2π} | não | "Você incluiu o extremo excluído do domínio. O certo é {0}; cos θ≤1; 2π não entra." |
| `d4-inequacoes-trigonometricas-certa` | {0} | **sim** | "Certo: {0}; cos θ≤1; 2π não entra." |

#### D5 — `d5-inequacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen(2θ)>0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2θ∈(0;π)∪(2π;3π).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-trigonometricas-certa` | (0;π/2)∪(π;3π/2) | **sim** | "Certo: (0;π/2)∪(π;3π/2); 2θ∈(0;π)∪(2π;3π)." |
| `d5-inequacoes-trigonometricas-erro` | (0;π) | não | "Você esqueceu de dividir os arcos por 2. O certo é (0;π/2)∪(π;3π/2); 2θ∈(0;π)∪(2π;3π)." |

### Vestibular

#### V1 — `ufu-2021-cos2x-ineq`
- **Estado:** **CONFERIDA** (auditoria B45a-aud)
- **Recorte para seleção:** Inequação trigonométrica no ciclo `[0; 2π]` com redução via arco duplo (`cos(2x) = 2·cos²x − 1`).
- **Enunciado (resumido):** "Qual é o conjunto solução de cos(2x) + 3·cos(x) + 2 ≤ 0 no intervalo [0; 2π]?"
- **Fala do Paco:** "Use cos(2x) = 2·cos²(x) − 1 e trate cos(x) como a incógnita."
- **Fonte:** UFU 2021 (adaptada), Medicina, 1º dia, Tipo 1, Q67. O gabarito definitivo retificado em 13/10/2021 confirma A. [Caderno, p. 37](https://www.portalselecao.ufu.br/servicos/arquivo_administrativo/download/96752f0608aff8b3436a1b5a5099c0ce#page=37) · [Gabarito retificado, p. 2](https://www.portalselecao.ufu.br/servicos/arquivo_administrativo/download/04c7f37f2420f0532d7f0e062ff2d5b5#page=2)
- **Adaptação:** Enunciado resumido, produto explícito com `·` e intervalos escritos com ponto e vírgula e frações em linha. As quatro alternativas mantêm a ordem do caderno.
- **Conta de conferência:** Para `t = cos(x)`, a expressão vira `2t² + 3t + 1 = (2t + 1)(t + 1)`, com `−1 ≤ t ≤ 1`. Em `t = −1`, o produto zera. Para `t > −1`, `t + 1 > 0`, então a condição é `2t + 1 ≤ 0`. Assim, `−1 ≤ cos(x) ≤ −1/2`, o arco fechado `[2π/3; 4π/3]`.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | `[2π/3; 4π/3]` | **sim** | "Com t = cos(x), (2t + 1)(t + 1) zera em t = −1. Para t > −1, ele é ≤ 0 se t ≤ −1/2, o que completa o arco [2π/3; 4π/3]." |
| `b` | `[2π/3; π]` | não | "Ler só até π dá [2π/3; π]. Como cos(x) ≤ −1/2 também vale de π a 4π/3, a solução é [2π/3; 4π/3]." |
| `c` | `[π/3; 5π/3]` | não | "Usar cos(x) ≤ 1/2 dá [π/3; 5π/3]. A raiz de 2·cos(x) + 1 = 0 é −1/2, e cos(x) ≤ −1/2 dá [2π/3; 4π/3]." |
| `d` | `[0; π/3] ∪ [5π/3; 2π]` | não | "Usar cos(x) ≥ 1/2 dá [0; π/3] ∪ [5π/3; 2π]. O lado esquerdo a partir de −1/2, com cos(x) ≤ −1/2, dá [2π/3; 4π/3]." |

#### V2 — `v2-inequacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema inequações trigonométricas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-inequacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema inequações trigonométricas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-inequacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema inequações trigonométricas.
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
