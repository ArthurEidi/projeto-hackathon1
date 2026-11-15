# Plano — Equações exponenciais

**Aula:** 1 — Equações exponenciais · A altura revela o expoente
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-exponenciais
**Pré-requisitos que o aluno já domina:** `funcao-exponencial`, `potencias-e-radicais`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o expoente x. A potência de base fixa produz uma altura; a solução iguala essa altura ao alvo.

## b) Visual de partida

plano_cartesiano — exponencial a=1,b=2,c=0,c3; ponto x=0, passo 1; janela x −2..4,y 0..17.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Em x=0, a potência vale 1, o elemento neutro da multiplicação; cada passo à direita aplica mais um fator.

## d) Panorama e recorte

Equações exponenciais podem exigir logaritmos; aqui usamos bases iguais e substituições simples.

## e) Progressão por contraste

1. Referência visual: Avança duas unidades; lê alturas 1, 2 e 4.
2. Em contraste com a referência: Move até (3;8), com referência (0;1) em muted.
3. Aprofundamento e fronteiras: Reduz b até 1; curva coincide com y=1.

## f) Dedução causal da forma

Para b>1, cada passo multiplica por b e as saídas crescem; para 0<b<1, diminuem. Com b>0 e b≠1, alturas iguais só ocorrem com expoentes iguais.

Fórmula deduzida: bᵘ=bᵛ ⇔ u=v, com b>0 e b≠1.

## g) Simulação espacial e fronteiras

Base 1 produz saída constante, sem unicidade; base não positiva não define a função exponencial real em todo R. Saída nunca é zero.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Expoente x | Número que controla quantas vezes a escala atua. |
| c2 | Base b | Fator aplicado em cada avanço de uma unidade. |
| c3 | Potência | Altura produzida pela exponencial. |
| c4 | Solução | Expoente que atinge a altura pedida. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — exponencial a=1,b=2,c=0,c3; ponto x=0, passo 1; janela x −2..4,y 0..17.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro x=0 a saída é 1; quanto sai após dois passos? Arraste até 2."
- **Interação do aluno:** Avança duas unidades; lê alturas 1, 2 e 4.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sai 4 porque cada passo multiplica por 2: 1·2·2=4."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Equações exponenciais podem exigir logaritmos; aqui usamos bases iguais e substituições simples."

### Passo 2 — `mesma-altura`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — exponencial a=1,b=2,c=0,c3 e y=8 ink; ponto x=0, passo 1; encontro c4; janela −2..4,0..17.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual expoente produz 8? Arraste até o encontro."
- **Interação do aluno:** Move até (3;8), com referência (0;1) em muted.
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "É 3; como 8=2³ e a curva cresce, então 2ˣ=8 só aceita x=3."

### Passo 3 — `base-neutra`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — exponencial a=1,b variável,c=0,c3; fantasma 2ˣ; horizontal y=1 ink.
- **Sliders:** b · Base · 1..2 · passo 1 · inicial 2 · c2
- **Paco (abertura):** "Se a base cair para 1, ainda há uma única entrada para saída 1?"
- **Interação do aluno:** Reduz b até 1; curva coincide com y=1.
- **Conclusão:** `b ≤ 1`
- **Paco (conclusão):** "Não; 1ˣ=1 para todo x, por isso a regra de igualar expoentes exige b≠1."
- **Tati (dúvida):** `fim` — P: "A potência pode ser zero?" / R: "Para base positiva, não; ela se aproxima de zero, mas não o alcança."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — 2ˣ c3 e y=8 ink; janela x −2..4,y 0..17; encontro c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é x em 2ˣ=8?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 4 | não | "Você dividiu 8 por 2; exponenciação pede 2³=8, então x=3." | Coloca o ponto (4;16), acima do alvo 8. |
| `micro-acerto` | 3 | **sim** | "Certo: 3; 2³=8." | Marca o encontro (3;8). |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — 2ˣ c3 e y=8 ink; b=2 em c2, expoente x=3 em c1, encontro (3;8) em c4.
- **Fórmula:** `b`→c2 · `ᵘ=bᵛ ⇔ u=v, b>0 e b≠1`
- **Definições:**
  - "Expoente x: Número que controla quantas vezes a escala atua."
  - "Potência: Altura produzida pela exponencial."
  - "Solução: Expoente que atinge a altura pedida."
- **Paco (abertura):** "A potência de base válida é estritamente monótona; por isso alturas iguais exigem expoentes iguais."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-exponenciais`
- **Enunciado:** "Quanto vale 2⁰?"
- **Figura:** nenhuma
- **Conta de conferência:** b⁰=1 para b≠0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-exponenciais-erro` | 0 | não | "Você confundiu expoente zero com base zero. O certo é 1; b⁰=1 para b≠0." |
| `f1-equacoes-exponenciais-certa` | 1 | **sim** | "Certo: 1; b⁰=1 para b≠0." |

#### F2 — `f2-equacoes-exponenciais`
- **Enunciado:** "De 2ˣ para 2ˣ⁺¹, a saída é multiplicada por quanto?"
- **Figura:** nenhuma
- **Conta de conferência:** 2ˣ⁺¹=2·2ˣ.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-exponenciais-certa` | 2 | **sim** | "Certo: 2; 2ˣ⁺¹=2·2ˣ." |
| `f2-equacoes-exponenciais-erro` | 1 | não | "Avançar o expoente multiplica pela base. O certo é 2; 2ˣ⁺¹=2·2ˣ." |

#### F3 — `f3-equacoes-exponenciais`
- **Enunciado:** "Na base 2, duas alturas iguais têm expoentes iguais?"
- **Figura:** nenhuma
- **Conta de conferência:** 2ᵘ=2ᵛ ⇒ u=v.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-exponenciais-erro` | Não | não | "A curva é estritamente crescente. O certo é Sim; 2ᵘ=2ᵛ ⇒ u=v." |
| `f3-equacoes-exponenciais-certa` | Sim | **sim** | "Certo: Sim; 2ᵘ=2ᵛ ⇒ u=v." |

#### F4 — `f4-equacoes-exponenciais`
- **Enunciado:** "A potência 2ˣ pode valer zero?"
- **Figura:** nenhuma
- **Conta de conferência:** 2ˣ>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-exponenciais-certa` | Não | **sim** | "Certo: Não; 2ˣ>0." |
| `f4-equacoes-exponenciais-erro` | Sim | não | "Aproximar-se de zero não é alcançá-lo. O certo é Não; 2ˣ>0." |

### Médias

#### M1 — `m1-equacoes-exponenciais`
- **Enunciado:** "Resolva 2ˣ=8."
- **Figura:** nenhuma
- **Conta de conferência:** 8=2³.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-exponenciais-erro` | 4 | não | "Você dividiu a altura pela base. O certo é 3; 8=2³." |
| `m1-equacoes-exponenciais-certa` | 3 | **sim** | "Certo: 3; 8=2³." |

#### M2 — `m2-equacoes-exponenciais`
- **Enunciado:** "Resolva 3ˣ=9."
- **Figura:** nenhuma
- **Conta de conferência:** 9=3².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-exponenciais-certa` | 2 | **sim** | "Certo: 2; 9=3²." |
| `m2-equacoes-exponenciais-erro` | 3 | não | "Você usou divisão no lugar de potência. O certo é 2; 9=3²." |

#### M3 — `m3-equacoes-exponenciais`
- **Enunciado:** "Resolva 2ˣ⁺¹=8."
- **Figura:** nenhuma
- **Conta de conferência:** x+1=3; x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-exponenciais-erro` | 3 | não | "Você esqueceu o +1 do expoente. O certo é 2; x+1=3; x=2." |
| `m3-equacoes-exponenciais-certa` | 2 | **sim** | "Certo: 2; x+1=3; x=2." |

### Desafios

#### D1 — `d1-equacoes-exponenciais`
- **Enunciado:** "Resolva 4ˣ=8."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2²ˣ=2³; x=3/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-exponenciais-certa` | 1,5 | **sim** | "Certo: 1,5; 2²ˣ=2³; x=3/2." |
| `d1-equacoes-exponenciais-erro` | 2 | não | "Você igualou bases diferentes diretamente. O certo é 1,5; 2²ˣ=2³; x=3/2." |

#### D2 — `d2-equacoes-exponenciais`
- **Enunciado:** "Quais soluções reais tem 1ˣ=1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1ˣ=1 para todo x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-exponenciais-erro` | Só 0 | não | "A base 1 é constante. O certo é Todas; 1ˣ=1 para todo x." |
| `d2-equacoes-exponenciais-certa` | Todas | **sim** | "Certo: Todas; 1ˣ=1 para todo x." |

#### D3 — `d3-equacoes-exponenciais`
- **Enunciado:** "Resolva 2ˣ=−2."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2ˣ>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-exponenciais-certa` | ∅ | **sim** | "Certo: ∅; 2ˣ>0." |
| `d3-equacoes-exponenciais-erro` | {−1} | não | "Expoente negativo não produz valor negativo. O certo é ∅; 2ˣ>0." |

#### D4 — `d4-equacoes-exponenciais`
- **Enunciado:** "Resolva 2²ˣ−3·2ˣ+2=0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** t=2ˣ; t=1 ou 2; x=0 ou 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-exponenciais-erro` | 1 e 2 | não | "Você parou nos valores de 2ˣ. O certo é 0 e 1; t=2ˣ; t=1 ou 2; x=0 ou 1." |
| `d4-equacoes-exponenciais-certa` | 0 e 1 | **sim** | "Certo: 0 e 1; t=2ˣ; t=1 ou 2; x=0 ou 1." |

#### D5 — `d5-equacoes-exponenciais`
- **Enunciado:** "Uma população começa em 2 e dobra por dia; em quantos dias chega a 16?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2·2ᵗ=16; 2ᵗ=8; t=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-exponenciais-certa` | 3 | **sim** | "Certo: 3; 2·2ᵗ=16; 2ᵗ=8; t=3." |
| `d5-equacoes-exponenciais-erro` | 4 | não | "Você esqueceu a população inicial. O certo é 3; 2·2ᵗ=16; 2ᵗ=8; t=3." |

### Vestibular

**Auditoria B18 (15/11/2026):** nenhuma candidata integralmente verificável no cache ENEM obrigatório. Mantido PENDENTE-FONTE; contas e impedimentos em `docs/revisao/vestibular-b18.md`.

#### V1 — `v1-equacoes-exponenciais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações exponenciais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-exponenciais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações exponenciais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-exponenciais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações exponenciais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-exponenciais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações exponenciais.
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
