# Plano — Unidades, conversões, escala e erro de medida

**Aula:** 1 — Unidades, conversões, escala e erro de medida · A unidade muda, o objeto permanece
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / unidades-conversoes-e-escalas
**Pré-requisitos que o aluno já domina:** `razao-proporcao-porcentagem`; contagem e leitura da reta numérica.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla a unidade e o fator de escala. A medida numérica ou o tamanho da figura muda conforme a operação escolhida.

## b) Visual de partida

WIDGET NOVO: figura-escala — quadrado lado L=2 c1, área 4 c3, escala k c2; original em muted; emite k.
Controles: k · Ampliação · 1..3 · passo 1 · inicial 1 · c2.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Escala 1:1 mantém a figura; trocar centímetros por metros muda só o número, não o comprimento físico.

## d) Panorama e recorte

Comprimento, área e volume têm fatores distintos; aqui convertemos unidades, ampliamos figuras e indicamos intervalos de arredondamento.

## e) Progressão por contraste

1. Referência visual: Amplia k para 2 e conta quatro cópias do quadrado original.
2. Em contraste com a referência: Rótulo muda 2 m→20 dm→200 cm; segmento fica imóvel.
3. Depois, teste de fronteira: Entra na faixa de valores que arredondam para 2,0.

## f) Dedução causal da forma

Um metro contém 100 centímetros, então 2 m e 200 cm medem o mesmo segmento. Ampliar cada lado por k multiplica a área por k² e o volume por k³. Uma medida arredondada informa uma faixa, não um valor exato.

Fórmula deduzida: L′=kL; A′=k²A; V′=k³V; escala=L desenho/L real.

## g) Simulação espacial e fronteiras

Converter área exige quadrado do fator, e volume exige cubo; comparar escala requer mesma unidade. Para arredondamento ao mais próximo com empate para cima, 2,0 cm representa [1,95;2,05) cm.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Comprimento L | Medida linear da figura ou segmento. |
| c2 | Escala k | Fator aplicado a todas as dimensões lineares. |
| c3 | Área A | Medida da superfície da figura. |
| c4 | Faixa de medida | Valores compatíveis com a precisão informada. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: figura-escala — quadrado lado L=2 c1, área 4 c3, escala k c2; original em muted; emite k.
- **Sliders:** k · Ampliação · 1..3 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "No caso neutro k=1 a figura não muda; ao dobrar cada lado, a área só dobra?"
- **Interação do aluno:** Amplia k para 2 e conta quatro cópias do quadrado original.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Não; o lado vai a 4 e a área a 16, por isso área multiplica por k²."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Comprimento, área e volume têm fatores distintos; aqui convertemos unidades, ampliamos figuras e indicamos intervalos de arredondamento."

### Passo 2 — `converter-unidade`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: figura-escala — segmento fixo de 2 m; controle e escolhe 0=m,1=dm,2=cm; rótulo 2·10ᵉ, unidade correspondente; emite e.
- **Sliders:** e · Casas da unidade · 0..2 · passo 1 · inicial 0 · ink
- **Paco (abertura):** "Se o mesmo segmento for medido em centímetros, ele aumenta? Leve e a 2."
- **Interação do aluno:** Rótulo muda 2 m→20 dm→200 cm; segmento fica imóvel.
- **Conclusão:** `e ≥ 2`
- **Paco (conclusão):** "Não; apenas a unidade encolhe, por isso o número de unidades cresce."

### Passo 3 — `medida-com-faixa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** reta_numerica — intervalo 1,9..2,1, marcas 0,05; trecho [1,95;2,05) c4; ponto x=1,9,passo 0,01,c1.
- **Sliders:** nenhum
- **Paco (abertura):** "Se a régua registra 2,0 cm ao décimo mais próximo, 1,96 cm é compatível? Arraste até 1,96."
- **Interação do aluno:** Entra na faixa de valores que arredondam para 2,0.
- **Conclusão:** `ponto_x ≥ 1,96`
- **Paco (conclusão):** "Sim; 1,96 fica entre 1,95 e 2,05, por isso arredonda para 2,0."
- **Tati (dúvida):** `fim` — P: "2,05 também arredonda para 2,0?" / R: "Com empate para cima, vai a 2,1; por isso o extremo direito fica aberto."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: figura-escala-figura — quadrado original 2×2 em muted, ampliado 4×4, k=2 c2 e área 16 c3.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Ao ampliar um quadrado de lado 2 por k=2, qual é a nova área?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 8 | não | "Você dobrou só uma dimensão; (2·2)²=16." | Mostra retângulo 4×2 de área 8, que não é o quadrado ampliado. |
| `micro-acerto` | 16 | **sim** | "Certo: 16; (2·2)²=16." | Mostra quadrado 4×4 e quatro cópias da área original. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: figura-escala-figura — quadrado original 2×2 em muted, ampliado 4×4, k=2 c2 e área 16 c3.
- **Fórmula:** `L′`→c1 · `=k`→c2 · `L; A′`→c3 · `=k²A; V′=k³V; escala=L desenho/L real`
- **Definições:**
  - "Comprimento L: Medida linear da figura ou segmento."
  - "Área A: Medida da superfície da figura."
  - "Faixa de medida: Valores compatíveis com a precisão informada."
- **Paco (abertura):** "Cada dimensão recebe o mesmo fator; por isso comprimento, área e volume mudam por k, k² e k³."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-unidades-conversoes-e-escalas`
- **Enunciado:** "Na escala 1:1, a figura muda de tamanho?"
- **Figura:** nenhuma
- **Conta de conferência:** k=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-unidades-conversoes-e-escalas-erro` | Sim | não | "O fator de escala é neutro. O certo é Não; k=1." |
| `f1-unidades-conversoes-e-escalas-certa` | Não | **sim** | "Certo: Não; k=1." |

#### F2 — `f2-unidades-conversoes-e-escalas`
- **Enunciado:** "Quantos centímetros há em 1 metro?"
- **Figura:** nenhuma
- **Conta de conferência:** 1 m=100 cm.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-unidades-conversoes-e-escalas-certa` | 100 | **sim** | "Certo: 100; 1 m=100 cm." |
| `f2-unidades-conversoes-e-escalas-erro` | 10 | não | "Você converteu para decímetros. O certo é 100; 1 m=100 cm." |

#### F3 — `f3-unidades-conversoes-e-escalas`
- **Enunciado:** "Ao dobrar todos os lados de um quadrado, a área multiplica por quanto?"
- **Figura:** nenhuma
- **Conta de conferência:** 2²=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-unidades-conversoes-e-escalas-erro` | 2 | não | "Você escalou uma dimensão só. O certo é 4; 2²=4." |
| `f3-unidades-conversoes-e-escalas-certa` | 4 | **sim** | "Certo: 4; 2²=4." |

#### F4 — `f4-unidades-conversoes-e-escalas`
- **Enunciado:** "Converter metros em centímetros muda o comprimento físico?"
- **Figura:** nenhuma
- **Conta de conferência:** 2 m=200 cm.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-unidades-conversoes-e-escalas-certa` | Não | **sim** | "Certo: Não; 2 m=200 cm." |
| `f4-unidades-conversoes-e-escalas-erro` | Sim | não | "Muda a unidade, não o objeto. O certo é Não; 2 m=200 cm." |

### Médias

#### M1 — `m1-unidades-conversoes-e-escalas`
- **Enunciado:** "Converta 2,5 m em centímetros."
- **Figura:** nenhuma
- **Conta de conferência:** 2,5·100=250.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-unidades-conversoes-e-escalas-erro` | 25 cm | não | "Você usou fator 10 em vez de 100. O certo é 250 cm; 2,5·100=250." |
| `m1-unidades-conversoes-e-escalas-certa` | 250 cm | **sim** | "Certo: 250 cm; 2,5·100=250." |

#### M2 — `m2-unidades-conversoes-e-escalas`
- **Enunciado:** "Converta 1 m² em cm²."
- **Figura:** nenhuma
- **Conta de conferência:** 100·100=10 000.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-unidades-conversoes-e-escalas-certa` | 10 000 cm² | **sim** | "Certo: 10 000 cm²; 100·100=10 000." |
| `m2-unidades-conversoes-e-escalas-erro` | 100 cm² | não | "Você esqueceu de converter as duas dimensões. O certo é 10 000 cm²; 100·100=10 000." |

#### M3 — `m3-unidades-conversoes-e-escalas`
- **Enunciado:** "Na escala 1:100, 2 cm no desenho representam quanto no real?"
- **Figura:** nenhuma
- **Conta de conferência:** 2·100=200 cm=2 m.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-unidades-conversoes-e-escalas-erro` | 200 m | não | "Você não converteu 200 cm para metros. O certo é 2 m; 2·100=200 cm=2 m." |
| `m3-unidades-conversoes-e-escalas-certa` | 2 m | **sim** | "Certo: 2 m; 2·100=200 cm=2 m." |

### Desafios

#### D1 — `d1-unidades-conversoes-e-escalas`
- **Enunciado:** "Ao reduzir o lado de um cubo à metade, o volume fica em qual fração?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (1/2)³=1/8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-unidades-conversoes-e-escalas-certa` | 1/8 | **sim** | "Certo: 1/8; (1/2)³=1/8." |
| `d1-unidades-conversoes-e-escalas-erro` | 1/2 | não | "Volume envolve três dimensões. O certo é 1/8; (1/2)³=1/8." |

#### D2 — `d2-unidades-conversoes-e-escalas`
- **Enunciado:** "Uma medida 2,0 cm, arredondada ao décimo com empate para cima, admite 2,05 cm?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Faixa [1,95;2,05).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-unidades-conversoes-e-escalas-erro` | Sim | não | "O extremo direito arredonda para 2,1. O certo é Não; Faixa [1,95;2,05)." |
| `d2-unidades-conversoes-e-escalas-certa` | Não | **sim** | "Certo: Não; Faixa [1,95;2,05)." |

#### D3 — `d3-unidades-conversoes-e-escalas`
- **Enunciado:** "Qual é a área de um quadrado de lado 0,5 m?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0,5·0,5=0,25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-unidades-conversoes-e-escalas-certa` | 0,25 m² | **sim** | "Certo: 0,25 m²; 0,5·0,5=0,25." |
| `d3-unidades-conversoes-e-escalas-erro` | 1 m² | não | "Você somou dois lados em vez de multiplicar. O certo é 0,25 m²; 0,5·0,5=0,25." |

#### D4 — `d4-unidades-conversoes-e-escalas`
- **Enunciado:** "Um desenho de 3 cm representa 6 m; qual é a escala?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 6 m=600 cm; 3/600=1/200.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-unidades-conversoes-e-escalas-erro` | 1:2 | não | "Você comparou unidades diferentes. O certo é 1:200; 6 m=600 cm; 3/600=1/200." |
| `d4-unidades-conversoes-e-escalas-certa` | 1:200 | **sim** | "Certo: 1:200; 6 m=600 cm; 3/600=1/200." |

#### D5 — `d5-unidades-conversoes-e-escalas`
- **Enunciado:** "Uma planta 1:100 mostra quarto de 2 cm por 3 cm; qual é a área real em m²?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Lados reais 2 m e 3 m; área=6 m².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-unidades-conversoes-e-escalas-certa` | 6 m² | **sim** | "Certo: 6 m²; Lados reais 2 m e 3 m; área=6 m²." |
| `d5-unidades-conversoes-e-escalas-erro` | 600 m² | não | "Você misturou escala linear com conversão de área. O certo é 6 m²; Lados reais 2 m e 3 m; área=6 m²." |

### Vestibular

#### V1 — `v1-unidades-conversoes-e-escalas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema unidades, conversões, escala e erro de medida.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-unidades-conversoes-e-escalas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema unidades, conversões, escala e erro de medida.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-unidades-conversoes-e-escalas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema unidades, conversões, escala e erro de medida.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-unidades-conversoes-e-escalas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema unidades, conversões, escala e erro de medida.
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
