# Plano — Fatoração e zeros de expressões

**Aula:** 1 — Fatoração e zeros de expressões · Os fatores mostram onde zerar
**Caminho:** algebra / equacoes-e-inequacoes / fatoracao-algebrica
**Pré-requisitos que o aluno já domina:** `expressoes-algebricas-e-produtos-notaveis`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla a entrada x. A máquina multiplica x por x−2; a saída muda de sinal conforme os fatores.

## b) Visual de partida

plano_cartesiano — reta afim a=1,b=0,c3; ponto x=0, passo 1; janela x e y de −3 a 4.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

A reta y=x é a máquina identidade e permanece como fantasma. Multiplicar por outro fator cria uma parábola.

## d) Panorama e recorte

Há fator comum, agrupamento e produtos notáveis; aqui usamos fatores para localizar zeros e conferir expansões.

## e) Progressão por contraste

1. Referência visual: Arrasta de 0 até 2; lê (2; 2).
2. Em contraste com a referência: Arrasta até a primeira raiz em 0; compara a curva à reta fantasma.
3. Aprofundamento e fronteiras: Move de 1 até 2; a saída sobe de −1 para 0.

## f) Dedução causal da forma

A distributiva permite tirar x de x²−2x, sem dividir por x. Um produto de números reais só zera quando algum fator é zero; isso preserva a raiz x=0. Diferença de quadrados vem de cancelar os termos cruzados: x²−4=(x−2)(x+2).

Fórmula deduzida: x²−2x = x(x−2); x(x−2)=0 ⇔ x=0 ou x=2.

## g) Simulação espacial e fronteiras

Testar x=0, x=1 e x=2. Dividir a equação por x apagaria uma raiz; fatorar não altera o domínio real.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número que entra nos fatores. |
| c2 | Fator x−2 | Fator que zera quando x=2. |
| c3 | Produto P(x) | Resultado de multiplicar os fatores. |
| c4 | Zeros do produto | Entradas que fazem o produto valer zero. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — reta afim a=1,b=0,c3; ponto x=0, passo 1; janela x e y de −3 a 4.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro y = x, o que sai quando x chega a 2? Arraste o ponto."
- **Interação do aluno:** Arrasta de 0 até 2; lê (2; 2).
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sai 2 porque a identidade conserva cada entrada."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há fator comum, agrupamento e produtos notáveis; aqui usamos fatores para localizar zeros e conferir expansões."

### Passo 2 — `ligar-fator`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — quadrática a=1,b=−2,c=0 em c3; y=x fantasma; ponto x=−1, passo 1; raízes marcadas em c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Ao multiplicar x por x−2, onde o produto zera? Leve o ponto até 0."
- **Interação do aluno:** Arrasta até a primeira raiz em 0; compara a curva à reta fantasma.
- **Conclusão:** `na_raiz ≥ 1`
- **Paco (conclusão):** "Em 0 o primeiro fator zera; por isso x²−2x e x(x−2) têm a mesma raiz."

### Passo 3 — `segunda-raiz`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — quadrática a=1,b=−2,c=0 em c3; ponto x=1, passo 1; raízes em c4.
- **Sliders:** nenhum
- **Paco (abertura):** "O produto já é negativo em 1; o que acontece em 2? Arraste até lá."
- **Interação do aluno:** Move de 1 até 2; a saída sobe de −1 para 0.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Em 2 o segundo fator zera; dividir antes por x perderia a outra solução, x=0."
- **Tati (dúvida):** `fim` — P: "Posso cancelar x na equação?" / R: "Só se x≠0; esse cancelamento excluiria a raiz zero."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — quadrática a=1,b=−2,c=0, janela −3..4 nos eixos, cor c3, raízes em c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Quais entradas zeram x(x−2)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | Só 2 | não | "Você dividiu por x e perdeu zero; as raízes são 0 e 2." | Mostra o ponto (0; 0) em c4. |
| `micro-acerto` | 0 e 2 | **sim** | "Certo: 0 e 2; Um produto zera se um dos fatores zera." | Marca os pontos (0; 0) e (2; 0) em c4. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — quadrática a=1,b=−2,c=0, janela −3..4 nos eixos, cor c3, raízes em c4.
- **Fórmula:** `x`→c1 · `·(x−2)`→c2 · `=` · `P(x)`→c3 · `; raízes 0 e 2`→c4
- **Definições:**
  - "Entrada x: Número que entra nos fatores."
  - "Produto P(x): Resultado de multiplicar os fatores."
  - "Zeros do produto: Entradas que fazem o produto valer zero."
- **Paco (abertura):** "Basta um fator zerar; por isso x(x−2) tem raízes 0 e 2."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você trocou soma por produto sem perder raízes e leu os zeros em cada fator."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-fatoracao-algebrica`
- **Enunciado:** "Em x(x−2), x=0 zera qual fator?"
- **Figura:** nenhuma
- **Conta de conferência:** x=0; x−2=−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-fatoracao-algebrica-erro` | x−2 | não | "Você trocou os fatores. O certo é x; x=0; x−2=−2." |
| `f1-fatoracao-algebrica-certa` | x | **sim** | "Certo: x; x=0; x−2=−2." |

#### F2 — `f2-fatoracao-algebrica`
- **Enunciado:** "Qual entrada zera x−2?"
- **Figura:** nenhuma
- **Conta de conferência:** 2−2=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-fatoracao-algebrica-certa` | 2 | **sim** | "Certo: 2; 2−2=0." |
| `f2-fatoracao-algebrica-erro` | −2 | não | "O sinal foi trocado. O certo é 2; 2−2=0." |

#### F3 — `f3-fatoracao-algebrica`
- **Enunciado:** "Como fatorar x²−2x?"
- **Figura:** nenhuma
- **Conta de conferência:** x·x−x·2=x²−2x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-fatoracao-algebrica-erro` | x(x−1) | não | "O coeficiente 2 foi perdido. O certo é x(x−2); x·x−x·2=x²−2x." |
| `f3-fatoracao-algebrica-certa` | x(x−2) | **sim** | "Certo: x(x−2); x·x−x·2=x²−2x." |

#### F4 — `f4-fatoracao-algebrica`
- **Enunciado:** "Um produto zero exige que todos os fatores sejam zero?"
- **Figura:** nenhuma
- **Conta de conferência:** 0·3=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-fatoracao-algebrica-certa` | Não | **sim** | "Certo: Não; 0·3=0." |
| `f4-fatoracao-algebrica-erro` | Sim | não | "Basta um fator nulo. O certo é Não; 0·3=0." |

### Médias

#### M1 — `m1-fatoracao-algebrica`
- **Enunciado:** "Quais são as raízes de (x−1)(x+2)?"
- **Figura:** nenhuma
- **Conta de conferência:** 1−1=0; −2+2=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-fatoracao-algebrica-erro` | −1 e 2 | não | "Você trocou os sinais das raízes. O certo é 1 e −2; 1−1=0; −2+2=0." |
| `m1-fatoracao-algebrica-certa` | 1 e −2 | **sim** | "Certo: 1 e −2; 1−1=0; −2+2=0." |

#### M2 — `m2-fatoracao-algebrica`
- **Enunciado:** "Fatore x²−9."
- **Figura:** nenhuma
- **Conta de conferência:** 9=3².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-fatoracao-algebrica-certa` | (x−3)(x+3) | **sim** | "Certo: (x−3)(x+3); 9=3²." |
| `m2-fatoracao-algebrica-erro` | (x−9)(x+9) | não | "Você usou a área como lado. O certo é (x−3)(x+3); 9=3²." |

#### M3 — `m3-fatoracao-algebrica`
- **Enunciado:** "Quanto vale x(x−2) em x=1?"
- **Figura:** nenhuma
- **Conta de conferência:** 1·(1−2)=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-fatoracao-algebrica-erro` | 1 | não | "Faltou o sinal do segundo fator. O certo é −1; 1·(1−2)=−1." |
| `m3-fatoracao-algebrica-certa` | −1 | **sim** | "Certo: −1; 1·(1−2)=−1." |

### Desafios

#### D1 — `d1-fatoracao-algebrica`
- **Enunciado:** "Resolver x²=2x dividindo por x perde qual solução?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x(x−2)=0; x=0 ou 2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-fatoracao-algebrica-certa` | 0 | **sim** | "Certo: 0; x(x−2)=0; x=0 ou 2." |
| `d1-fatoracao-algebrica-erro` | 2 | não | "A divisão exclui x=0. O certo é 0; x(x−2)=0; x=0 ou 2." |

#### D2 — `d2-fatoracao-algebrica`
- **Enunciado:** "Quais são as raízes de 2x²−x?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x(2x−1)=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-fatoracao-algebrica-erro` | Só 0,5 | não | "Você cancelou x e perdeu zero. O certo é 0 e 0,5; x(2x−1)=0." |
| `d2-fatoracao-algebrica-certa` | 0 e 0,5 | **sim** | "Certo: 0 e 0,5; x(2x−1)=0." |

#### D3 — `d3-fatoracao-algebrica`
- **Enunciado:** "Se (x−a)(x+1) zera em x=2, qual é a?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (2−a)·3=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-fatoracao-algebrica-certa` | 2 | **sim** | "Certo: 2; (2−a)·3=0." |
| `d3-fatoracao-algebrica-erro` | −1 | não | "O segundo fator vale 3, não zero. O certo é 2; (2−a)·3=0." |

#### D4 — `d4-fatoracao-algebrica`
- **Enunciado:** "Em x²+1=0 há raiz real?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²+1≥1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-fatoracao-algebrica-erro` | Sim | não | "Um quadrado real não pode valer −1. O certo é Não; x²+1≥1." |
| `d4-fatoracao-algebrica-certa` | Não | **sim** | "Certo: Não; x²+1≥1." |

#### D5 — `d5-fatoracao-algebrica`
- **Enunciado:** "Um retângulo tem área x²−4 e lados positivos x−2 e x+2; se a área é 5, qual x serve?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²=9; x>2; x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-fatoracao-algebrica-certa` | 3 | **sim** | "Certo: 3; x²=9; x>2; x=3." |
| `d5-fatoracao-algebrica-erro` | −3 | não | "Você aceitou um comprimento negativo. O certo é 3; x²=9; x>2; x=3." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

#### `ufrgs-2022-inverso-raizes` — UFRGS 2022
- **Enunciado:** "Se a e b são as raízes de x² − 6x + 3 = 0, quanto vale (1/(1/a + 1/b))⁻²?"
- **Fala do Paco:** "Se x² − 6x + 3 = (x − a)(x − b), então a + b = 6 e ab = 3. Some 1/a + 1/b com denominador ab."
- **Fonte:** UFRGS 2022 (adaptada); 1º dia, Questão 48: enunciado reescrito como pergunta; alternativas e gabarito oficial (B) mantidos. https://www.ufrgs.br/coperse/wp-content/uploads/2022/03/PROVAS-1o-DIA.pdf · https://vestibular.ufrgs.br/cv2022/gabaritos/
- **Alternativas:** 2 · **4** · 6 · 8 · 10
- **Conta de conferência:** a + b = 6, ab = 3 ⇒ 1/a + 1/b = 2 ⇒ (1/2)⁻² = 4 (B).

#### `ufpr-2023-triplas` — UFPR 2023
- **Enunciado:** "Quantas triplas (a, b, c) de inteiros positivos satisfazem a + b = c² e a + b + c = 20?"
- **Fala do Paco:** "Troque a + b por c²: c² + c − 20 = 0. Fatore e depois conte os pares (a, b) com a + b fixo."
- **Fonte:** UFPR 2023 (adaptada); 1ª fase, Questão 10: enunciado reescrito como pergunta; alternativas e gabarito oficial (e) mantidos. https://servicos.nc.ufpr.br/documentos/ps2023/provas/Geral.pdf
- **Alternativas:** 11 · 12 · 13 · 14 · **15**
- **Conta de conferência:** c² + c − 20 = (c + 5)(c − 4) ⇒ c = 4; a + b = 16 com a = 1, …, 15 ⇒ 15 (e).

#### V1 — `v1-fatoracao-algebrica`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema fatoração e zeros de expressões.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-fatoracao-algebrica`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema fatoração e zeros de expressões.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-fatoracao-algebrica`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema fatoração e zeros de expressões.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-fatoracao-algebrica`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema fatoração e zeros de expressões.
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
