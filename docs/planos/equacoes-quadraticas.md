# Plano — Equações quadráticas e interpretação das raízes

**Aula:** 1 — Equações quadráticas e interpretação das raízes · Contar encontros com o eixo
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-quadraticas
**Pré-requisitos que o aluno já domina:** `funcao-quadratica`, `fatoracao-algebrica`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla a altura c de uma parábola. A quantidade de encontros com o eixo depende dessa altura.

## b) Visual de partida

plano_cartesiano — quadrática a=1,b=0,c variável,c3; fantasma x²; raízes c4; janela −4..4.
Controles: c · Altura · −1..1 · passo 1 · inicial 0 · c2.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

x²=0 começa com uma raiz dupla em 0; o contorno de y=x² permanece em muted.

## d) Panorama e recorte

Há quadráticas completas e incompletas; aqui ligamos fatoração, quadrado completo e quantidade de raízes.

## e) Progressão por contraste

1. Referência visual: Eleva a parábola uma unidade.
2. Em contraste com a referência: Baixa até −1; lê raízes simétricas −1 e 1.
3. Aprofundamento e fronteiras: Baixa c; o toque em 1 se divide nas raízes 0 e 2.
4. Depois, teste de fronteira: Lê o vértice (1;−1) e uma raiz em 2; outra em 0.

## f) Dedução causal da forma

Completar quadrados dá (x+b/(2a))²=(b²−4ac)/(4a²). Um quadrado real é não negativo: Δ<0 impede raízes, Δ=0 dá uma e Δ>0 dá duas distintas. A simetria fornece os dois sinais da raiz.

Fórmula deduzida: x=(−b±√Δ)/(2a); Δ=b²−4ac; a≠0.

## g) Simulação espacial e fronteiras

Testar c=0, c=1 e c=−1 em x²+c. Em a=0 a equação deixa de ser quadrática; raízes complexas ficam para outro capítulo.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Coordenada horizontal da parábola. |
| c2 | Altura c | Deslocamento vertical da parábola. |
| c3 | Parábola | Altura da expressão quadrática. |
| c4 | Raízes | Entradas em que a parábola encontra o eixo. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — quadrática a=1,b=0,c variável,c3; fantasma x²; raízes c4; janela −4..4.
- **Sliders:** c · Altura · −1..1 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "No caso neutro x²=0, a curva só toca o eixo; ao levar c a 1, ainda haverá encontro?"
- **Interação do aluno:** Eleva a parábola uma unidade.
- **Conclusão:** `c ≥ 1`
- **Paco (conclusão):** "Não; x²+1≥1, então a saída nunca zera."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há quadráticas completas e incompletas; aqui ligamos fatoração, quadrado completo e quantidade de raízes."

### Passo 2 — `abrir-duas-raizes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — quadrática a=1,b=0,c variável,c3; fantasma x²; raízes c4; janela −4..4.
- **Sliders:** c · Altura · −1..1 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Ao baixar c até −1, quantas raízes surgem?"
- **Interação do aluno:** Baixa até −1; lê raízes simétricas −1 e 1.
- **Conclusão:** `c ≤ −1`
- **Paco (conclusão):** "Surgem duas: x²=1 aceita −1 e 1, porque ambos têm quadrado 1."

### Passo 3 — `contar-pelo-discriminante`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — quadrática a=1,b=−2,c variável em c3; referência (x−1)² fantasma; raízes c4; janela x −1..3,y −2..5.
- **Sliders:** c · Termo constante · 0..2 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Com x²−2x+c=(x−1)²+c−1, baixar c de 1 para 0 cria quantas raízes?"
- **Interação do aluno:** Baixa c; o toque em 1 se divide nas raízes 0 e 2.
- **Conclusão:** `c ≤ 0`
- **Paco (conclusão):** "Cria duas: (x−1)²=1; em geral, (x+b/(2a))²=Δ/(4a²), por isso o sinal de Δ decide a quantidade."

### Passo 4 — `deslocar-centro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** plano_cartesiano — quadrática a=1,b=−2,c=0,c3; fantasma x²−1; ponto x=1, passo 1; raízes c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Em (x−1)²=1, a simetria ainda fica em zero? Arraste de 1 até 2."
- **Interação do aluno:** Lê o vértice (1;−1) e uma raiz em 2; outra em 0.
- **Conclusão:** `na_raiz ≥ 1`
- **Paco (conclusão):** "Agora o centro é 1; como x−1=±1, então as raízes são 0 e 2."
- **Tati (dúvida):** `fim` — P: "Se o coeficiente de x² zerar?" / R: "A equação perde o grau 2; a fórmula quadrática deixa de valer."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — quadrática a=1,b=0,c=1,c3; janela x −3..3 e y −1..5; eixo em ink.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Quantas raízes reais distintas tem x²+1=0?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | Duas | não | "Você tratou −1 como quadrado real; x²≥0, então não há raiz real." | Destaca o mínimo (0;1), acima do eixo. |
| `micro-acerto` | Nenhuma | **sim** | "Certo: Nenhuma; x²+1≥1 para todo real." | Destaca toda a curva acima de y=0. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — quadrática a=1,b=−2,c=0 em c3; raízes 0 e 2 em c4, vértice (1;−1), Δ=4, janela −2..4.
- **Fórmula:** `x`→c1 · `= (−b±√Δ)/(2a)` · `; Δ=b²−4ac` · `; raízes`→c4
- **Definições:**
  - "Entrada x: Coordenada horizontal da parábola."
  - "Parábola: Altura da expressão quadrática."
  - "Raízes: Entradas em que a parábola encontra o eixo."
- **Paco (abertura):** "O quadrado completo precisa ser não negativo; por isso Δ decide quantas raízes reais existem."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-quadraticas`
- **Enunciado:** "A curva y=x² encontra o eixo x em quantos pontos distintos?"
- **Figura:** nenhuma
- **Conta de conferência:** x²=0 ⇒ x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-quadraticas-erro` | 2 | não | "Você contou a raiz repetida duas vezes como ponto. O certo é 1; x²=0 ⇒ x=0." |
| `f1-equacoes-quadraticas-certa` | 1 | **sim** | "Certo: 1; x²=0 ⇒ x=0." |

#### F2 — `f2-equacoes-quadraticas`
- **Enunciado:** "A curva y=x²+1 toca o eixo x?"
- **Figura:** nenhuma
- **Conta de conferência:** x²+1≥1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-quadraticas-certa` | Não | **sim** | "Certo: Não; x²+1≥1." |
| `f2-equacoes-quadraticas-erro` | Sim | não | "O mínimo é positivo. O certo é Não; x²+1≥1." |

#### F3 — `f3-equacoes-quadraticas`
- **Enunciado:** "Quais são as raízes de x²−1?"
- **Figura:** nenhuma
- **Conta de conferência:** (−1)²=1²=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-quadraticas-erro` | Só 1 | não | "Faltou a raiz negativa. O certo é −1 e 1; (−1)²=1²=1." |
| `f3-equacoes-quadraticas-certa` | −1 e 1 | **sim** | "Certo: −1 e 1; (−1)²=1²=1." |

#### F4 — `f4-equacoes-quadraticas`
- **Enunciado:** "Se a=0 em ax²+bx+c=0, ela ainda é quadrática?"
- **Figura:** nenhuma
- **Conta de conferência:** 0x²=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-quadraticas-certa` | Não | **sim** | "Certo: Não; 0x²=0." |
| `f4-equacoes-quadraticas-erro` | Sim | não | "O termo de grau 2 desapareceu. O certo é Não; 0x²=0." |

### Médias

#### M1 — `m1-equacoes-quadraticas`
- **Enunciado:** "Resolva x²−4=0 nos reais."
- **Figura:** nenhuma
- **Conta de conferência:** x²=4; x=±2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-quadraticas-erro` | −4 e 4 | não | "Você confundiu x² com x. O certo é −2 e 2; x²=4; x=±2." |
| `m1-equacoes-quadraticas-certa` | −2 e 2 | **sim** | "Certo: −2 e 2; x²=4; x=±2." |

#### M2 — `m2-equacoes-quadraticas`
- **Enunciado:** "Resolva x²−3x+2=0."
- **Figura:** nenhuma
- **Conta de conferência:** (x−1)(x−2)=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-quadraticas-certa` | 1 e 2 | **sim** | "Certo: 1 e 2; (x−1)(x−2)=0." |
| `m2-equacoes-quadraticas-erro` | −1 e −2 | não | "Você trocou os sinais dos fatores. O certo é 1 e 2; (x−1)(x−2)=0." |

#### M3 — `m3-equacoes-quadraticas`
- **Enunciado:** "Quantas raízes reais distintas tem x²−2x+1=0?"
- **Figura:** nenhuma
- **Conta de conferência:** (x−1)²=0; x=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-quadraticas-erro` | 0 | não | "O quadrado pode valer zero. O certo é 1; (x−1)²=0; x=1." |
| `m3-equacoes-quadraticas-certa` | 1 | **sim** | "Certo: 1; (x−1)²=0; x=1." |

### Desafios

#### D1 — `d1-equacoes-quadraticas`
- **Enunciado:** "Qual k faz x²−2x+k=0 ter raiz dupla?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Δ=4−4k=0; k=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-quadraticas-certa` | 1 | **sim** | "Certo: 1; Δ=4−4k=0; k=1." |
| `d1-equacoes-quadraticas-erro` | 2 | não | "Você confundiu o coeficiente linear com o termo constante. O certo é 1; Δ=4−4k=0; k=1." |

#### D2 — `d2-equacoes-quadraticas`
- **Enunciado:** "Resolva 4x²−1=0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²=1/4; x=±1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-quadraticas-erro` | −0,25 e 0,25 | não | "Você parou no valor de x². O certo é −0,5 e 0,5; x²=1/4; x=±1/2." |
| `d2-equacoes-quadraticas-certa` | −0,5 e 0,5 | **sim** | "Certo: −0,5 e 0,5; x²=1/4; x=±1/2." |

#### D3 — `d3-equacoes-quadraticas`
- **Enunciado:** "Em x²+2x+2=0, qual é o conjunto real de soluções?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (x+1)²+1>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-quadraticas-certa` | ∅ | **sim** | "Certo: ∅; (x+1)²+1>0." |
| `d3-equacoes-quadraticas-erro` | {−1} | não | "Você confundiu vértice com raiz. O certo é ∅; (x+1)²+1>0." |

#### D4 — `d4-equacoes-quadraticas`
- **Enunciado:** "Se as raízes são 1 e 3 e a=1, qual equação aparece?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (x−1)(x−3)=x²−4x+3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-quadraticas-erro` | x²+4x+3=0 | não | "A soma das raízes entra com sinal negativo. O certo é x²−4x+3=0; (x−1)(x−3)=x²−4x+3." |
| `d4-equacoes-quadraticas-certa` | x²−4x+3=0 | **sim** | "Certo: x²−4x+3=0; (x−1)(x−3)=x²−4x+3." |

#### D5 — `d5-equacoes-quadraticas`
- **Enunciado:** "Um retângulo de lados x e x+1 tem área 6; qual comprimento x>0 serve?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²+x−6=(x−2)(x+3)=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-quadraticas-certa` | 2 | **sim** | "Certo: 2; x²+x−6=(x−2)(x+3)=0." |
| `d5-equacoes-quadraticas-erro` | −3 | não | "Você aceitou comprimento negativo. O certo é 2; x²+x−6=(x−2)(x+3)=0." |

### Vestibular

#### V1 — `v1-equacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações quadráticas e interpretação das raízes.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações quadráticas e interpretação das raízes.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações quadráticas e interpretação das raízes.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-quadraticas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações quadráticas e interpretação das raízes.
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
