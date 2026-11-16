# Plano — Inequações exponenciais e logarítmicas

**Aula:** 1 — Inequações exponenciais e logarítmicas · A base decide a ordem
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-exponenciais-logaritmicas
**Pré-requisitos que o aluno já domina:** `equacoes-exponenciais`, `equacoes-logaritmicas`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe x e a base. A comparação das alturas depende de a curva ser crescente ou decrescente.

## b) Visual de partida

plano_cartesiano — exponencial a=1,b=2,c=0,c3 e y=1 ink; ponto x=0, passo 1; janela −3..3,0..9.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

A referência 2ˣ passa por (0;1); comparar com 2⁰ fornece a fronteira x=0 antes de mudar a base.

## d) Panorama e recorte

Inequações exponenciais e logarítmicas usam monotonicidade; aqui cuidamos da base e do domínio.

## e) Progressão por contraste

1. Referência visual: Move para (1;2), acima do alvo neutro 1.
2. Em contraste com a referência: Move para altura 0,5, abaixo de 1.
3. Aprofundamento e fronteiras: Move para (0,5;1), sem cruzar o domínio proibido.

## f) Dedução causal da forma

Se b>1, aumentar o expoente aumenta a potência; se 0<b<1, o mesmo avanço diminui a altura. O logaritmo inverso conserva essa direção, mas só aceita argumentos positivos.

Fórmula deduzida: bᵘ>bᵛ ⇔ u>v se b>1; u<v se 0<b<1.

## g) Simulação espacial e fronteiras

Base 1 é excluída para logaritmo e quebra a comparação de expoentes; log_b x só existe para x>0. Testar limites abertos.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número comparado nas curvas. |
| c2 | Base b | Fator que decide crescimento ou decrescimento. |
| c3 | Altura da função | Valor produzido pela exponencial ou logaritmo. |
| c4 | Intervalo-solução | Entradas válidas que satisfazem a comparação. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — exponencial a=1,b=2,c=0,c3 e y=1 ink; ponto x=0, passo 1; janela −3..3,0..9.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso-base 2⁰=1, ir para x=1 aumenta a saída? Arraste."
- **Interação do aluno:** Move para (1;2), acima do alvo neutro 1.
- **Conclusão:** `ponto_x ≥ 1`
- **Paco (conclusão):** "Sim; multiplicar por 2 aumenta a saída, então 2ˣ>1 pede x>0."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Inequações exponenciais e logarítmicas usam monotonicidade; aqui cuidamos da base e do domínio."

### Passo 2 — `base-fracionaria`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — exponencial a=1,b=0,5,c=0,c3; fantasma 2ˣ; y=1 ink; ponto x=0, passo 1.
- **Sliders:** nenhum
- **Paco (abertura):** "Com base 0,5, o mesmo passo aumenta ou diminui? Leve x a 1."
- **Interação do aluno:** Move para altura 0,5, abaixo de 1.
- **Conclusão:** `ponto_x ≥ 1`
- **Paco (conclusão):** "Diminui; dividir por 2 em cada passo inverte a ordem dos expoentes."

### Passo 3 — `log-com-dominio`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — logaritmo a=1,b=0,5,c=0,c3 e y=0 ink; ponto x=2, passo 0,5; janela x −1..4,y −3..3.
- **Sliders:** nenhum
- **Paco (abertura):** "Para log de base 0,5 ser positivo, x fica entre 0 e 1? Arraste até 0,5."
- **Interação do aluno:** Move para (0,5;1), sem cruzar o domínio proibido.
- **Conclusão:** `ponto_x ≤ 0,5`
- **Paco (conclusão):** "Sim; como a curva decresce e zera em 1, então 0<x<1 dá saída positiva."
- **Tati (dúvida):** `fim` — P: "O intervalo pode incluir zero?" / R: "Não; o argumento do logaritmo deve ser positivo."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — exponencial a=1,b=0,5,c=0,c3 e y=1 ink; janela −3..3,0..9.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual solução tem (0,5)ˣ>1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | x>0 | não | "Você manteve a ordem de uma base crescente; a solução é x<0." | Marca (1;0,5), abaixo da altura 1. |
| `micro-acerto` | x<0 | **sim** | "Certo: x<0; A base 0,5 é decrescente." | Marca (−1;2), acima da altura 1. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — (0,5)ˣ c3 e y=1 ink; base 0,5 c2, pontos (−1;2),(0;1),(1;0,5), janela −3..3,0..9.
- **Fórmula:** `b`→c2 · `ᵘ>bᵛ ⇔ u>v se b>1; u<v se 0<b<1`
- **Definições:**
  - "Entrada x: Número comparado nas curvas."
  - "Altura da função: Valor produzido pela exponencial ou logaritmo."
  - "Intervalo-solução: Entradas válidas que satisfazem a comparação."
- **Paco (abertura):** "A base define a direção da curva; por isso comparar expoentes exige inverter a ordem quando 0<b<1."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "A função 2ˣ cresce ou decresce?"
- **Figura:** nenhuma
- **Conta de conferência:** 2⁰=1<2¹=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-exponenciais-logaritmicas-erro` | Decresce | não | "A base é maior que 1. O certo é Cresce; 2⁰=1<2¹=2." |
| `f1-inequacoes-exponenciais-logaritmicas-certa` | Cresce | **sim** | "Certo: Cresce; 2⁰=1<2¹=2." |

#### F2 — `f2-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "A função (0,5)ˣ cresce ou decresce?"
- **Figura:** nenhuma
- **Conta de conferência:** 1>0,5>0,25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-exponenciais-logaritmicas-certa` | Decresce | **sim** | "Certo: Decresce; 1>0,5>0,25." |
| `f2-inequacoes-exponenciais-logaritmicas-erro` | Cresce | não | "Cada passo multiplica por um número menor que 1. O certo é Decresce; 1>0,5>0,25." |

#### F3 — `f3-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Em log₂x, x=0 é permitido?"
- **Figura:** nenhuma
- **Conta de conferência:** Domínio x>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-exponenciais-logaritmicas-erro` | Sim | não | "O argumento precisa ser positivo. O certo é Não; Domínio x>0." |
| `f3-inequacoes-exponenciais-logaritmicas-certa` | Não | **sim** | "Certo: Não; Domínio x>0." |

#### F4 — `f4-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Na base 0,5, maior expoente produz menor potência?"
- **Figura:** nenhuma
- **Conta de conferência:** (0,5)¹<(0,5)⁰.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-exponenciais-logaritmicas-certa` | Sim | **sim** | "Certo: Sim; (0,5)¹<(0,5)⁰." |
| `f4-inequacoes-exponenciais-logaritmicas-erro` | Não | não | "Você aplicou a regra de base maior que 1. O certo é Sim; (0,5)¹<(0,5)⁰." |

### Médias

#### M1 — `m1-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva 2ˣ>4."
- **Figura:** nenhuma
- **Conta de conferência:** 4=2².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-exponenciais-logaritmicas-erro` | x<2 | não | "Você inverteu uma função crescente. O certo é x>2; 4=2²." |
| `m1-inequacoes-exponenciais-logaritmicas-certa` | x>2 | **sim** | "Certo: x>2; 4=2²." |

#### M2 — `m2-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva (0,5)ˣ≥0,25."
- **Figura:** nenhuma
- **Conta de conferência:** 0,25=(0,5)².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-exponenciais-logaritmicas-certa` | x≤2 | **sim** | "Certo: x≤2; 0,25=(0,5)²." |
| `m2-inequacoes-exponenciais-logaritmicas-erro` | x≥2 | não | "Faltou inverter a ordem na base decrescente. O certo é x≤2; 0,25=(0,5)²." |

#### M3 — `m3-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva log₂x≤1."
- **Figura:** nenhuma
- **Conta de conferência:** x>0 e x≤2¹.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-exponenciais-logaritmicas-erro` | x≤2 | não | "Você incluiu argumentos não positivos. O certo é 0<x≤2; x>0 e x≤2¹." |
| `m3-inequacoes-exponenciais-logaritmicas-certa` | 0<x≤2 | **sim** | "Certo: 0<x≤2; x>0 e x≤2¹." |

### Desafios

#### D1 — `d1-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva log de base 0,5 de x > 0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** log₀,₅1=0; função decrescente.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-exponenciais-logaritmicas-certa` | 0<x<1 | **sim** | "Certo: 0<x<1; log₀,₅1=0; função decrescente." |
| `d1-inequacoes-exponenciais-logaritmicas-erro` | x>1 | não | "Você tratou a base como crescente. O certo é 0<x<1; log₀,₅1=0; função decrescente." |

#### D2 — `d2-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva 1ˣ>1 nos reais."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1ˣ=1, nunca maior.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-exponenciais-logaritmicas-erro` | x>0 | não | "Você usou monotonicidade na base 1. O certo é ∅; 1ˣ=1, nunca maior." |
| `d2-inequacoes-exponenciais-logaritmicas-certa` | ∅ | **sim** | "Certo: ∅; 1ˣ=1, nunca maior." |

#### D3 — `d3-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva 4ˣ<2."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2²ˣ<2¹; 2x<1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-exponenciais-logaritmicas-certa` | x<0,5 | **sim** | "Certo: x<0,5; 2²ˣ<2¹; 2x<1." |
| `d3-inequacoes-exponenciais-logaritmicas-erro` | x<2 | não | "Você não reescreveu as bases. O certo é x<0,5; 2²ˣ<2¹; 2x<1." |

#### D4 — `d4-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Resolva log₂(x−1)<1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0<x−1<2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-exponenciais-logaritmicas-erro` | x<3 | não | "Você esqueceu a condição do argumento. O certo é 1<x<3; 0<x−1<2." |
| `d4-inequacoes-exponenciais-logaritmicas-certa` | 1<x<3 | **sim** | "Certo: 1<x<3; 0<x−1<2." |

#### D5 — `d5-inequacoes-exponenciais-logaritmicas`
- **Enunciado:** "Uma dose inicial 8 cai pela metade a cada hora; a partir de qual t≥0 ela fica ≤2?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 8·(0,5)ᵗ≤2; t≥2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-exponenciais-logaritmicas-certa` | t≥2 | **sim** | "Certo: t≥2; 8·(0,5)ᵗ≤2; t≥2." |
| `d5-inequacoes-exponenciais-logaritmicas-erro` | t≤2 | não | "Você não inverteu a ordem da exponencial decrescente. O certo é t≥2; 8·(0,5)ᵗ≤2; t≥2." |

### Vestibular

#### V1 — ENEM 2017 — Questão 137 (`enem-2017-emprestimo-log`)
- **Estado:** inserida na aula (`https://api.enem.dev/v1/exams/2017/questions/137`, gabarito D: `n ≥ 15,4 ⇒ 16` parcelas).
- **Recorte:** Inequação exponencial/logarítmica em contexto de empréstimo (`P(n) ≤ 400`).

#### V2 — `v2-inequacoes-exponenciais-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema inequações exponenciais e logarítmicas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-inequacoes-exponenciais-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema inequações exponenciais e logarítmicas.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-inequacoes-exponenciais-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema inequações exponenciais e logarítmicas.
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
