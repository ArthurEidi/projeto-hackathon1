# Plano — Equações trigonométricas

**Aula:** 1 — Equações trigonométricas · Uma projeção, vários ângulos
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-trigonometricas
**Pré-requisitos que o aluno já domina:** `funcoes-trigonometricas`, `radianos-e-ciclo-trigonometrico`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o ângulo θ no ciclo. A projeção vertical ou horizontal depende desse giro; a mesma altura pode ocorrer várias vezes.

## b) Visual de partida

WIDGET NOVO: ciclo_trigonometrico — raio unitário, θ em graus e radianos, projeção vertical c3; θ=0 fantasma; emite angulo.
Controles: angulo · Giro em graus · 0..360 · passo 30 · inicial 0 · c1.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

θ=0 deixa o raio em (1;0), sem giro; essa posição permanece fantasma.

## d) Panorama e recorte

Seno, cosseno e tangente repetem valores; aqui encontramos soluções em uma volta e depois somamos períodos.

## e) Progressão por contraste

1. Referência visual: Gira até 90°; ponto (0;1) e rótulo π/2 aparecem.
2. Em contraste com a referência: Gira até o ponto simétrico no segundo quadrante.
3. Aprofundamento e fronteiras: Completa uma volta e compara posições coincidentes.

## f) Dedução causal da forma

A reflexão do ponto no eixo vertical conserva o seno: θ e π−θ têm a mesma altura. Uma volta inteira repete o ponto; tangente repete após meia-volta e não existe com cosseno zero.

Fórmula deduzida: sen θ=sen α ⇒ θ=α+2kπ ou θ=π−α+2kπ, k∈Z.

## g) Simulação espacial e fronteiras

No intervalo [0;2π), 2π não entra. Valores de seno fora de [−1;1] são impossíveis; tg θ exige cos θ≠0.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Ângulo θ | Giro do raio, mostrado em graus e radianos. |
| c2 | Altura-alvo | Valor pedido para a projeção. |
| c3 | Projeção | Coordenada lida no ciclo. |
| c4 | Ângulos-solução | Giros que produzem a projeção pedida. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: ciclo_trigonometrico — raio unitário, θ em graus e radianos, projeção vertical c3; θ=0 fantasma; emite angulo.
- **Sliders:** angulo · Giro em graus · 0..360 · passo 30 · inicial 0 · c1
- **Paco (abertura):** "No caso neutro, sem giro, a altura é zero; onde ela chega em 90°? Arraste."
- **Interação do aluno:** Gira até 90°; ponto (0;1) e rótulo π/2 aparecem.
- **Conclusão:** `angulo ≥ 90`
- **Paco (conclusão):** "Chega a 1 porque o raio aponta todo para cima."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Seno, cosseno e tangente repetem valores; aqui encontramos soluções em uma volta e depois somamos períodos."

### Passo 2 — `altura-repetida`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: ciclo_trigonometrico — alvo sen θ=0,5 em c2, pontos 30° e 150° marcáveis c4; referência 30° em muted; emite angulo.
- **Sliders:** angulo · Giro em graus · 30..180 · passo 30 · inicial 30 · c1
- **Paco (abertura):** "A altura de 30° reaparece antes de 180°? Leve o raio até 150°."
- **Interação do aluno:** Gira até o ponto simétrico no segundo quadrante.
- **Conclusão:** `angulo ≥ 150`
- **Paco (conclusão):** "Sim; 150°=180°−30° tem a mesma altura, por isso há duas soluções nessa volta."

### Passo 3 — `repetir-volta`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: ciclo_trigonometrico — alvo 0,5; contador de voltas, posições 30° e 390° sobrepostas; emite angulo.
- **Sliders:** angulo · Giro em graus · 30..390 · passo 30 · inicial 30 · c1
- **Paco (abertura):** "Após uma volta, 390° muda a altura de 30°? Arraste até 390°."
- **Interação do aluno:** Completa uma volta e compara posições coincidentes.
- **Conclusão:** `angulo ≥ 390`
- **Paco (conclusão):** "Não; somar 360° repete o ponto, por isso somamos 2kπ às soluções."
- **Tati (dúvida):** `fim` — P: "E se o seno pedido for 2?" / R: "Não há solução real; a projeção no ciclo fica entre −1 e 1."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: ciclo-figura — círculo unitário e horizontal y=0,5; dois encontros; versão estática do ciclo.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Em [0;2π), sen θ=0,5 tem quais soluções?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | Só π/6 | não | "Você esqueceu a simetria; as soluções são π/6 e 5π/6." | Mostra o ponto simétrico de 30° em 150°. |
| `micro-acerto` | π/6 e 5π/6 | **sim** | "Certo: π/6 e 5π/6; Os pontos de 30° e 150° têm a mesma altura." | Destaca 30° e 150°, com altura comum 0,5. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: ciclo-figura — ângulos α=π/6 e π−α=5π/6 em c4, projeção 0,5 em c2, volta completa 2π em ink.
- **Fórmula:** `sen θ`→c3 · `=sen α`→c2 · `⇒ θ=α+2kπ ou θ=π−α+2kπ`→c4 · `, k∈Z`
- **Definições:**
  - "Ângulo θ: Giro do raio, mostrado em graus e radianos."
  - "Projeção: Coordenada lida no ciclo."
  - "Ângulos-solução: Giros que produzem a projeção pedida."
- **Paco (abertura):** "A simetria conserva a altura e a volta repete o ponto; por isso juntamos as duas famílias com período 2π."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-trigonometricas`
- **Enunciado:** "No ciclo, quanto vale sen 0?"
- **Figura:** nenhuma
- **Conta de conferência:** (cos 0;sen 0)=(1;0).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-trigonometricas-erro` | 1 | não | "Você leu a coordenada horizontal. O certo é 0; (cos 0;sen 0)=(1;0)." |
| `f1-equacoes-trigonometricas-certa` | 0 | **sim** | "Certo: 0; (cos 0;sen 0)=(1;0)." |

#### F2 — `f2-equacoes-trigonometricas`
- **Enunciado:** "Quanto vale sen(π/2)?"
- **Figura:** nenhuma
- **Conta de conferência:** Ponto (0;1).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-trigonometricas-certa` | 1 | **sim** | "Certo: 1; Ponto (0;1)." |
| `f2-equacoes-trigonometricas-erro` | 0 | não | "Você trocou seno por cosseno. O certo é 1; Ponto (0;1)." |

#### F3 — `f3-equacoes-trigonometricas`
- **Enunciado:** "Quantos graus equivalem a uma volta?"
- **Figura:** nenhuma
- **Conta de conferência:** 2π rad=360°.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-trigonometricas-erro` | 180° | não | "Você contou apenas meia-volta. O certo é 360°; 2π rad=360°." |
| `f3-equacoes-trigonometricas-certa` | 360° | **sim** | "Certo: 360°; 2π rad=360°." |

#### F4 — `f4-equacoes-trigonometricas`
- **Enunciado:** "A equação sen θ=2 tem solução real?"
- **Figura:** nenhuma
- **Conta de conferência:** −1≤sen θ≤1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-trigonometricas-certa` | Não | **sim** | "Certo: Não; −1≤sen θ≤1." |
| `f4-equacoes-trigonometricas-erro` | Sim | não | "A projeção unitária não chega a 2. O certo é Não; −1≤sen θ≤1." |

### Médias

#### M1 — `m1-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen θ=0."
- **Figura:** nenhuma
- **Conta de conferência:** sen θ=0 em kπ; 2π fica fora.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-trigonometricas-erro` | 0, π e 2π | não | "Você incluiu o extremo excluído. O certo é 0 e π; sen θ=0 em kπ; 2π fica fora." |
| `m1-equacoes-trigonometricas-certa` | 0 e π | **sim** | "Certo: 0 e π; sen θ=0 em kπ; 2π fica fora." |

#### M2 — `m2-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva cos θ=0."
- **Figura:** nenhuma
- **Conta de conferência:** Coordenada horizontal zero.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-trigonometricas-certa` | π/2 e 3π/2 | **sim** | "Certo: π/2 e 3π/2; Coordenada horizontal zero." |
| `m2-equacoes-trigonometricas-erro` | 0 e π | não | "Você zerou seno em vez de cosseno. O certo é π/2 e 3π/2; Coordenada horizontal zero." |

#### M3 — `m3-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen θ=0,5."
- **Figura:** nenhuma
- **Conta de conferência:** sen(π−π/6)=sen(π/6).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-trigonometricas-erro` | Só π/6 | não | "Faltou a posição simétrica. O certo é π/6 e 5π/6; sen(π−π/6)=sen(π/6)." |
| `m3-equacoes-trigonometricas-certa` | π/6 e 5π/6 | **sim** | "Certo: π/6 e 5π/6; sen(π−π/6)=sen(π/6)." |

### Desafios

#### D1 — `d1-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva sen(2θ)=0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2θ=kπ ⇒ θ=kπ/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-trigonometricas-certa` | 0, π/2, π e 3π/2 | **sim** | "Certo: 0, π/2, π e 3π/2; 2θ=kπ ⇒ θ=kπ/2." |
| `d1-equacoes-trigonometricas-erro` | 0 e π | não | "Você esqueceu a frequência dobrada. O certo é 0, π/2, π e 3π/2; 2θ=kπ ⇒ θ=kπ/2." |

#### D2 — `d2-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π], resolva cos θ=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** cos 0=cos 2π=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-trigonometricas-erro` | Só 0 | não | "O extremo final agora está incluído. O certo é 0 e 2π; cos 0=cos 2π=1." |
| `d2-equacoes-trigonometricas-certa` | 0 e 2π | **sim** | "Certo: 0 e 2π; cos 0=cos 2π=1." |

#### D3 — `d3-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva tg θ=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Período da tangente é π.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-trigonometricas-certa` | π/4 e 5π/4 | **sim** | "Certo: π/4 e 5π/4; Período da tangente é π." |
| `d3-equacoes-trigonometricas-erro` | π/4 e 3π/4 | não | "Você usou simetria do seno para tangente. O certo é π/4 e 5π/4; Período da tangente é π." |

#### D4 — `d4-equacoes-trigonometricas`
- **Enunciado:** "Resolva sen θ=0 em todos os reais."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** sen(kπ)=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-trigonometricas-erro` | θ=2kπ, k∈Z | não | "Você perdeu as meias-voltas ímpares. O certo é θ=kπ, k∈Z; sen(kπ)=0." |
| `d4-equacoes-trigonometricas-certa` | θ=kπ, k∈Z | **sim** | "Certo: θ=kπ, k∈Z; sen(kπ)=0." |

#### D5 — `d5-equacoes-trigonometricas`
- **Enunciado:** "Em [0;2π), resolva 2sen²θ−1=0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** sen θ=±√2/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-trigonometricas-certa` | π/4, 3π/4, 5π/4 e 7π/4 | **sim** | "Certo: π/4, 3π/4, 5π/4 e 7π/4; sen θ=±√2/2." |
| `d5-equacoes-trigonometricas-erro` | Só π/4 e 3π/4 | não | "Você descartou o seno negativo ao tirar a raiz. O certo é π/4, 3π/4, 5π/4 e 7π/4; sen θ=±√2/2." |

### Vestibular

#### V1 — `v1-equacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações trigonométricas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações trigonométricas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações trigonométricas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-trigonometricas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações trigonométricas.
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
