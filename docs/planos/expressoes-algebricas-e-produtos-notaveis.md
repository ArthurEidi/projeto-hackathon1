# Plano — Expressões algébricas e produtos notáveis

**Aula:** 1 — Expressões algébricas e produtos notáveis · Desmontar um quadrado
**Caminho:** algebra / equacoes-e-inequacoes / expressoes-algebricas-e-produtos-notaveis
**Pré-requisitos que o aluno já domina:** `potencias-e-radicais`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o acréscimo b no lado de um quadrado de lado a = 2. A máquina recorta a área em quatro peças; a área total depende de b.

## b) Visual de partida

WIDGET NOVO: areas-produtos — quadrado a=2 e acréscimo b; peças a², ab, ab, b², áreas em c3; a em c1, b em c2; contorno b=0 em muted; emite b.
Controles: b · Acréscimo · 0..3 · passo 1 · inicial 0 · c2.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

b = 0 mantém apenas o quadrado de lado 2; contorno original fica em muted. Depois entram duas faixas e um canto.

## d) Panorama e recorte

Produtos notáveis também incluem diferenças e cubos; aqui vamos montar quadrados e desfazer áreas.

## e) Progressão por contraste

1. Referência visual: Arrasta b até 1; vê duas faixas 2×1 e um canto 1×1.
2. Em contraste com a referência: Leva b a 2; duas faixas de área 4 ficam entre os quadrados.
3. Aprofundamento e fronteiras: Arrasta b até 2; a área restante se reduz a zero.

## f) Dedução causal da forma

Cada lado mede a+b. A divisória em a cria áreas a², ab, ab e b²; as duas faixas são distintas, logo não se pode omitir uma. Para a≥b≥0, retirar faixas explica (a−b)²; juntar retângulos explica (a+b)(a−b)=a²−b². A distributiva estende as identidades aos reais.

Fórmula deduzida: (a+b)² = a² + 2ab + b².

## g) Simulação espacial e fronteiras

O modelo de comprimentos exige a≥0 e b≥0; a identidade algébrica continua válida com sinais. No modo diferença, b≤a; em b=a sobra área zero.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Lado a | Lado do quadrado inicial. |
| c2 | Acréscimo b | Quanto se acrescenta a cada lado. |
| c3 | Área total | Soma das áreas das quatro peças. |
| c4 | Área de referência | Área anterior, usada para comparar. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: areas-produtos — quadrado a=2 e acréscimo b; peças a², ab, ab, b², áreas em c3; a em c1, b em c2; contorno b=0 em muted; emite b.
- **Sliders:** b · Acréscimo · 0..3 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "No caso neutro, b = 0, só há o quadrado inicial; ao levar b a 1, quantas peças novas aparecem?"
- **Interação do aluno:** Arrasta b até 1; vê duas faixas 2×1 e um canto 1×1.
- **Conclusão:** `b ≥ 1`
- **Paco (conclusão):** "Aparecem três peças: 2, 2 e 1; por isso a área passa de 4 para 9."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Produtos notáveis também incluem diferenças e cubos; aqui vamos montar quadrados e desfazer áreas."

### Passo 2 — `separar-faixas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: areas-produtos — mesmo quadrado; a=2, b variável; exibe quatro parcelas e soma, com contorno anterior b=1 em muted; emite b.
- **Sliders:** b · Acréscimo · 0..3 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Se b chegar a 2, somar apenas a² e b² cobre tudo? Faça a previsão e arraste."
- **Interação do aluno:** Leva b a 2; duas faixas de área 4 ficam entre os quadrados.
- **Conclusão:** `b ≥ 2`
- **Paco (conclusão):** "Não; faltam duas faixas de área ab, por isso (a+b)² = a² + 2ab + b²."

### Passo 3 — `testar-diferenca`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: areas-produtos — modo retirar; a=2, b de 0 a 2; destaca quadrado restante (a−b)²; mantém contorno a²; emite b.
- **Sliders:** b · Retirada · 0..2 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Ao retirar b = 2 de um lado de tamanho 2, sobra algum quadrado?"
- **Interação do aluno:** Arrasta b até 2; a área restante se reduz a zero.
- **Conclusão:** `b ≥ 2`
- **Paco (conclusão):** "Não sobra área porque o novo lado é zero; retirar mais sairia do modelo de comprimentos."
- **Tati (dúvida):** `fim` — P: "Posso usar b negativo?" / R: "Na álgebra, sim; no desenho, comprimentos negativos precisam de outra representação."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: areas-produtos-figura — a=2, b=1, quatro peças e contorno de lado 3; versão estática do widget.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a área do quadrado de lado 2+1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 5 | não | "Faltaram as duas faixas; 4+2+2+1 = 9." | Destaca só a² e b², deixando as duas faixas sem preenchimento. |
| `micro-acerto` | 9 | **sim** | "Certo: 9; 4+2+2+1=9." | Destaca as quatro peças e o total 9. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: areas-produtos-figura — a=2, b=1, quatro peças e contorno de lado 3; versão estática do widget.
- **Fórmula:** `(a`→c1 · `+b`→c2 · `)² = a² + 2ab + b²`→c3
- **Definições:**
  - "Lado a: Lado do quadrado inicial."
  - "Área total: Soma das áreas das quatro peças."
  - "Área de referência: Área anterior, usada para comparar."
- **Paco (abertura):** "As quatro peças cobrem o quadrado; por isso (a+b)² contém duas faixas ab."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você montou produtos por áreas e viu por que o termo 2ab ocupa duas faixas."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "No quadrado (a+b)², quantas faixas de área ab aparecem?"
- **Figura:** nenhuma
- **Conta de conferência:** ab+ab=2ab.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-expressoes-algebricas-e-produtos-notaveis-erro` | 1 | não | "Faltou uma faixa. O certo é 2; ab+ab=2ab." |
| `f1-expressoes-algebricas-e-produtos-notaveis-certa` | 2 | **sim** | "Certo: 2; ab+ab=2ab." |

#### F2 — `f2-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Se b=0, quanto vale (a+b)²?"
- **Figura:** nenhuma
- **Conta de conferência:** (a+0)²=a².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-expressoes-algebricas-e-produtos-notaveis-certa` | a² | **sim** | "Certo: a²; (a+0)²=a²." |
| `f2-expressoes-algebricas-e-produtos-notaveis-erro` | 0 | não | "Você apagou o lado a. O certo é a²; (a+0)²=a²." |

#### F3 — `f3-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Qual termo ocupa o canto de lado b?"
- **Figura:** nenhuma
- **Conta de conferência:** b·b=b².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-expressoes-algebricas-e-produtos-notaveis-erro` | 2b | não | "Você confundiu área com soma de lados. O certo é b²; b·b=b²." |
| `f3-expressoes-algebricas-e-produtos-notaveis-certa` | b² | **sim** | "Certo: b²; b·b=b²." |

#### F4 — `f4-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Qual expansão representa (x+1)²?"
- **Figura:** nenhuma
- **Conta de conferência:** x·1+1·x=2x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-expressoes-algebricas-e-produtos-notaveis-certa` | x²+2x+1 | **sim** | "Certo: x²+2x+1; x·1+1·x=2x." |
| `f4-expressoes-algebricas-e-produtos-notaveis-erro` | x²+1 | não | "Faltaram os termos cruzados. O certo é x²+2x+1; x·1+1·x=2x." |

### Médias

#### M1 — `m1-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Quanto vale (2+1)²?"
- **Figura:** nenhuma
- **Conta de conferência:** 4+4+1=9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-expressoes-algebricas-e-produtos-notaveis-erro` | 5 | não | "Você somou só os quadrados. O certo é 9; 4+4+1=9." |
| `m1-expressoes-algebricas-e-produtos-notaveis-certa` | 9 | **sim** | "Certo: 9; 4+4+1=9." |

#### M2 — `m2-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Quanto vale (3−1)²?"
- **Figura:** nenhuma
- **Conta de conferência:** (3−1)²=2²=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-expressoes-algebricas-e-produtos-notaveis-certa` | 4 | **sim** | "Certo: 4; (3−1)²=2²=4." |
| `m2-expressoes-algebricas-e-produtos-notaveis-erro` | 8 | não | "Diferença de quadrados não é quadrado da diferença. O certo é 4; (3−1)²=2²=4." |

#### M3 — `m3-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Simplifique (x+2)(x−2)."
- **Figura:** nenhuma
- **Conta de conferência:** 2x−2x=0; 2·(−2)=−4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-expressoes-algebricas-e-produtos-notaveis-erro` | x²+4 | não | "O produto das constantes tem sinal negativo. O certo é x²−4; 2x−2x=0; 2·(−2)=−4." |
| `m3-expressoes-algebricas-e-produtos-notaveis-certa` | x²−4 | **sim** | "Certo: x²−4; 2x−2x=0; 2·(−2)=−4." |

### Desafios

#### D1 — `d1-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Um quadrado tem área 9 e lado 2+b, com b≥0; qual é b?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2+b=3; b=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-expressoes-algebricas-e-produtos-notaveis-certa` | 1 | **sim** | "Certo: 1; 2+b=3; b=1." |
| `d1-expressoes-algebricas-e-produtos-notaveis-erro` | 7 | não | "Você subtraiu lados de uma área. O certo é 1; 2+b=3; b=1." |

#### D2 — `d2-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Para a=b=2, quanto vale (a−b)²?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (2−2)²=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-expressoes-algebricas-e-produtos-notaveis-erro` | 4 | não | "A diferença dos lados deve ser feita antes. O certo é 0; (2−2)²=0." |
| `d2-expressoes-algebricas-e-produtos-notaveis-certa` | 0 | **sim** | "Certo: 0; (2−2)²=0." |

#### D3 — `d3-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Quanto vale (1+0,5)²?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1+1+0,25=2,25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-expressoes-algebricas-e-produtos-notaveis-certa` | 2,25 | **sim** | "Certo: 2,25; 1+1+0,25=2,25." |
| `d3-expressoes-algebricas-e-produtos-notaveis-erro` | 1,25 | não | "Faltou o termo 2ab. O certo é 2,25; 1+1+0,25=2,25." |

#### D4 — `d4-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "A identidade (a+b)²=a²+2ab+b² vale para a=−2 e b=1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (−1)²=4−4+1=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-expressoes-algebricas-e-produtos-notaveis-erro` | Não | não | "Comprimento negativo limita o desenho, não a identidade. O certo é Sim; (−1)²=4−4+1=1." |
| `d4-expressoes-algebricas-e-produtos-notaveis-certa` | Sim | **sim** | "Certo: Sim; (−1)²=4−4+1=1." |

#### D5 — `d5-expressoes-algebricas-e-produtos-notaveis`
- **Enunciado:** "Um quadrado de lado 2 ganha 1 em cada lado; qual é o aumento da área?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 3²−2²=9−4=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-expressoes-algebricas-e-produtos-notaveis-certa` | 5 | **sim** | "Certo: 5; 3²−2²=9−4=5." |
| `d5-expressoes-algebricas-e-produtos-notaveis-erro` | 1 | não | "Você contou apenas o canto. O certo é 5; 3²−2²=9−4=5." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

#### `fuvest-2020-cubos` — Fuvest 2020
- **Enunciado:** "Se 3x² − 9x + 7 = (x − a)³ − (x − b)³ para todo x real, quanto vale a + b?"
- **Fala do Paco:** "(x − a)³ = x³ − 3ax² + 3a²x − a³. Subtraia as duas expansões e compare os coeficientes."
- **Fonte:** Fuvest 2020 (adaptada); 1ª fase, prova V, Questão 20: enunciado reescrito como pergunta; alternativas e gabarito oficial (A) mantidos. https://www.fuvest.br/wp-content/uploads/fuvest_2020_primeira_fase_prova_V.pdf · https://www.fuvest.br/wp-content/uploads/fuvest_2020_primeira_fase_gabaritos.pdf
- **Alternativas:** **3** · 5 · 6 · 9 · 12
- **Conta de conferência:** 3(b − a)x² + 3(a² − b²)x + b³ − a³ ⇒ b − a = 1, a² − b² = −3 ⇒ a = 1, b = 2, a + b = 3 (A).

#### `ufrgs-2022-afirmacoes-raizes` — UFRGS 2022
- **Enunciado:** "Para reais a e b: (I) √(a² + b²) = a + b; (II) √(a²) = a; (III) se 0 < b < a, √(ab) ≤ (a + b)/2. Quais estão corretas?"
- **Fala do Paco:** "Teste números: a = 3 e b = 4 em (I), a = −2 em (II). Para (III), expanda (√a − √b)² ≥ 0."
- **Fonte:** UFRGS 2022 (adaptada); 1º dia, Questão 47: afirmações numeradas entre parênteses; alternativas e gabarito oficial (B) mantidos. https://www.ufrgs.br/coperse/wp-content/uploads/2022/03/PROVAS-1o-DIA.pdf · https://vestibular.ufrgs.br/cv2022/gabaritos/
- **Alternativas:** Apenas I · **Apenas III** · Apenas I e II · Apenas II e III · I, II e III
- **Conta de conferência:** (I) √25 ≠ 7; (II) √(a²) = |a|; (III) (√a − √b)² ≥ 0 ⇒ apenas III (B).

#### V1 — `v1-expressoes-algebricas-e-produtos-notaveis`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema expressões algébricas e produtos notáveis.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-expressoes-algebricas-e-produtos-notaveis`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema expressões algébricas e produtos notáveis.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-expressoes-algebricas-e-produtos-notaveis`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema expressões algébricas e produtos notáveis.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-expressoes-algebricas-e-produtos-notaveis`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema expressões algébricas e produtos notáveis.
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
