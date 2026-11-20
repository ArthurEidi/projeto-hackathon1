# Plano — Função quadrática

**Aula:** 1 — A Reta que Dobra · Parábola, concavidade e vértice
**Caminho:** algebra / funcoes / funcao-quadratica
**Pré-requisitos que o aluno já domina:** funcao-afim, expressoes-algebricas-e-produtos-notaveis

## a) Ancoragem mecânica

A entrada independente x é elevada ao quadrado e combinada com termos linear e constante; a máquina entrega f(x)=ax²+bx+c. O coeficiente a controla orientação e abertura; f(x) é a saída dependente.

## b) Visual de partida

Plano_cartesiano com y=x², reta y=x como fantasma, ponto arrastável, vértice e raízes. Sliders a,b,c começam em 1,0,0 e variam de −3 a 3 em passos inteiros.

## c) Caso neutro

Começamos com f(x)=x²: vértice (0;0), simetria e abertura para cima. O ponto x=0 fica fixo; depois isolamos a, c e b.

## d) Panorama e recorte

Parábolas ligam curvatura, raízes, vértice e sinal da função; são vizinhas de retas e polinômios. Aqui usamos formas simples, sem resolver casos algébricos extensos.

## e) Progressão por contraste

1. y=x é referência constante; y=x² curva porque a variação cresce com |x|.
2. Trocar a de 1 para 2 estica a parábola; a=−1 a reflete.
3. Somar c desloca as saídas igualmente; acrescentar bx desloca o vértice.
4. A parábola pode cruzar, tocar ou não encontrar o eixo x.

## f) Dedução causal da forma

Em x², entradas opostas têm o mesmo quadrado; longe do zero, o quadrado cresce mais rápido que x, então surge curvatura. Completando o quadrado, ax²+bx+c=a(x+b/(2a))²+c−b²/(4a), e x_v=−b/(2a).

## g) Simulação espacial e fronteiras

Domínio R. Se a>0, a imagem começa no y do vértice; se a<0, termina nele. Há duas, uma ou nenhuma raiz real. Em a=0, o termo quadrático desaparece.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Valor independente que a função eleva ao quadrado e combina. |
| c2 | Saída f(x) | Altura da parábola correspondente à entrada x. |
| c3 | Coeficiente a | Sinal de a define a concavidade; seu módulo muda a abertura. |
| c4 | Vértice | Ponto extremo que determina eixo de simetria e limite da imagem. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — Mostra y=x², reta y=x fantasma e ponto x=1.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? f(x)=x²; qual é o ponto mínimo?"
- **Interação do aluno:** Arraste x até −2 e depois 2; compare as alturas.
- **Conclusão:** `faixa_x ≥ 4` (corrigido: de x = −2 a 2 a faixa é 4)
- **Paco (conclusão):** "Nos dois lados x² dá 4; o quadrado apaga o sinal."
- **Tati (dúvida):** `fim` — P: "Toda parábola abre para cima?" / R: "Não; a<0 reflete a curva e ela abre para baixo."

### Passo 2 — `mudar-a`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `plano_cartesiano` — y=x² fica fantasma; slider a multiplica x².
- **Sliders:** `a` · Coeficiente quadrático · −3..3 · passo 1 · inicial 1 · c3 (corrigido: c1 é Entrada x; a é c3)
- **Paco (abertura):** "O que muda quando a fica negativa?"
- **Interação do aluno:** Leve a a −1; a curva espelha-se no eixo x.
- **Conclusão:** `a ≤ −1`
- **Paco (conclusão):** "a negativo inverte as saídas; a parábola abre para baixo."

### Passo 3 — `mover-vertice`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `plano_cartesiano` — Mostra y=x²−2x+1, vértice e raiz.
- **Sliders:** nenhum
- **Paco (abertura):** "Onde (x−1)² zera?"
- **Interação do aluno:** Arraste x até 1 e leia o ponto mínimo.
- **Conclusão:** `na_raiz ≥ 1`
- **Paco (conclusão):** "Em x=1, (x−1)²=0; vértice e raiz coincidem."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=(x−1)²−1 com vértice
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Qual é o vértice de f(x)=(x−1)²−1?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | (−1;1) | não | "Troca os sinais dos deslocamentos horizontal e vertical; O quadrado zera em x=1 e a saída mínima é −1; V=(1;−1)." | Marca o vértice invertido (−1;1) para mostrar a troca de sinais. |
| `certa` | (1;−1) | **sim** | "O quadrado zera em x=1 e a saída mínima é −1; V=(1;−1)." | marca a resposta no gráfico. |
- **Paco (conclusão):** "O quadrado zera em x=1 e a saída mínima é −1; V=(1;−1)."
- **Tati (dúvida):** `fim` — P: "Toda parábola cruza o eixo x?" / R: "Não: pode cruzar duas vezes, tocar uma ou ficar sem raiz real." (reescrito: texto genérico de domínio não se aplicava)

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=(x−1)²−1, eixo x=1, vértice (1;−1), raízes 0 e 2.
- **Fórmula:** f(x)→c2 · = · a→c3 · x² + bx + c
- **Definições:**
  - "Vértice: ponto extremo da parábola."
  - "Raiz: entrada que produz saída zero."
  - "a>0 abre para cima; a<0 abre para baixo."
- **Paco (abertura):** "Como a figura explica a regra? Por isso f(x)=ax²+bx+c."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "A parábola tem fim?" / R: "Não: o domínio são todos os reais." (reescrito)

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso f(x)=ax²+bx+c."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-funcao-quadratica`
- **Enunciado:** "Em x², quanto vale (−3)²?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (−3)²=9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-funcao-quadratica-e` | −9 | não | "Resposta: 9; Conserva o sinal negativo; conferência: (−3)²=9." |
| `f1-funcao-quadratica-c` | 9 | **sim** | "Certo: resposta 9; conferência: (−3)²=9." |

#### F2 — `f2-funcao-quadratica`
- **Enunciado:** "Em −x², para onde abre a parábola?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** a=−1<0; concavidade para baixo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-funcao-quadratica-e` | Para cima | não | "Resposta: Para baixo; Ignora o sinal que reflete as saídas; conferência: a=−1<0; concavidade para baixo." |
| `f2-funcao-quadratica-c` | Para baixo | **sim** | "Certo: resposta Para baixo; conferência: a=−1<0; concavidade para baixo." |

#### F3 — `f3-funcao-quadratica`
- **Enunciado:** "Em x²−4, quanto vale f(0)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0²−4=−4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-funcao-quadratica-e` | 4 | não | "Resposta: −4; Troca o sinal do termo constante; conferência: 0²−4=−4." |
| `f3-funcao-quadratica-c` | −4 | **sim** | "Certo: resposta −4; conferência: 0²−4=−4." |

#### F4 — `f4-funcao-quadratica`
- **Enunciado:** "Qual é o eixo de simetria de (x−2)²?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (x−2)² zera em x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-funcao-quadratica-e` | x=−2 | não | "Resposta: x=2; Inverte o sinal dentro do quadrado; conferência: (x−2)² zera em x=2." |
| `f4-funcao-quadratica-c` | x=2 | **sim** | "Certo: resposta x=2; conferência: (x−2)² zera em x=2." |

### Médias

#### M1 — `m1-funcao-quadratica`
- **Enunciado:** "Raízes de x²−9=0?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x²=9 ⇒ x=±3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-funcao-quadratica-e` | 0 e 9 | não | "Resposta: −3 e 3; Usa 9 como raiz sem extrair as soluções; conferência: x²=9 ⇒ x=±3." |
| `m1-funcao-quadratica-c` | −3 e 3 | **sim** | "Certo: resposta −3 e 3; conferência: x²=9 ⇒ x=±3." |

#### M2 — `m2-funcao-quadratica`
- **Enunciado:** "Vértice de (x−1)²+2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Quadrado mínimo em x=1; saída 2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-funcao-quadratica-e` | (−1;2) | não | "Resposta: (1;2); Inverte o sinal do deslocamento em x; conferência: Quadrado mínimo em x=1; saída 2." |
| `m2-funcao-quadratica-c` | (1;2) | **sim** | "Certo: resposta (1;2); conferência: Quadrado mínimo em x=1; saída 2." |

#### M3 — `m3-funcao-quadratica`
- **Enunciado:** "Quantas raízes reais tem x²+1=0?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x²≥0; x²+1 nunca zera.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-funcao-quadratica-e` | Duas | não | "Resposta: Nenhuma; Supõe x² negativo nos reais; conferência: x²≥0; x²+1 nunca zera." |
| `m3-funcao-quadratica-c` | Nenhuma | **sim** | "Certo: resposta Nenhuma; conferência: x²≥0; x²+1 nunca zera." |

### Desafios

#### D1 — `d1-funcao-quadratica`
- **Enunciado:** "Vértice de x²−4x+3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (x−2)²−1; V=(2;−1).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-funcao-quadratica-e` | (−2;3) | não | "Resposta: (2;−1); Completa o quadrado com sinais trocados; conferência: (x−2)²−1; V=(2;−1)." |
| `d1-funcao-quadratica-c` | (2;−1) | **sim** | "Certo: resposta (2;−1); conferência: (x−2)²−1; V=(2;−1)." |

#### D2 — `d2-funcao-quadratica`
- **Enunciado:** "Raízes de x²−5x+6=0?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (x−2)(x−3)=0; raízes 2 e 3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-funcao-quadratica-e` | −2 e −3 | não | "Resposta: 2 e 3; Erra sinais ao fatorar; conferência: (x−2)(x−3)=0; raízes 2 e 3." |
| `d2-funcao-quadratica-c` | 2 e 3 | **sim** | "Certo: resposta 2 e 3; conferência: (x−2)(x−3)=0; raízes 2 e 3." |

#### D3 — `d3-funcao-quadratica`
- **Enunciado:** "Se a=0 em ax²+2x+1, é parábola?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** A expressão vira 2x+1, função afim (corrigido: "linear" exigiria b = 0).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-funcao-quadratica-e` | Sim | não | "Resposta: Não; Mantém termo quadrático com coeficiente zero; conferência: A expressão vira 2x+1, função afim (corrigido: "linear" exigiria b = 0)." |
| `d3-funcao-quadratica-c` | Não | **sim** | "Certo: resposta Não; conferência: A expressão vira 2x+1, função afim (corrigido: "linear" exigiria b = 0)." |

#### D4 — `d4-funcao-quadratica`
- **Enunciado:** "Quantas interseções com eixo x tem (x−2)²?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (x−2)²=0 só em x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-funcao-quadratica-e` | Duas | não | "Resposta: Uma; Conta raiz repetida como dois pontos; conferência: (x−2)²=0 só em x=2." |
| `d4-funcao-quadratica-c` | Uma | **sim** | "Certo: resposta Uma; conferência: (x−2)²=0 só em x=2." |

#### D5 — `d5-funcao-quadratica`
- **Enunciado:** "Soma das raízes de x²−4x+3=0?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (x−1)(x−3); raízes 1 e 3, soma 4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-funcao-quadratica-e` | 3 (corrigido: era 6; o produto é 3) | não | "Resposta: 4; Confunde soma e produto; conferência: (x−1)(x−3); raízes 1 e 3, soma 4." |
| `d5-funcao-quadratica-c` | 4 | **sim** | "Certo: resposta 4; conferência: (x−1)(x−3); raízes 1 e 3, soma 4." |

### Vestibular

#### V1 — `enem-2022-saque-volei`
- **Enunciado (resumido):** Saque a 1,5 m do piso segue y = −x²/6 − 7x/3 + 12. Com tetos de 17, 18, 19, 21 e 40 m (I a V), onde a bola bate?
- **Fala do Paco:** "Calcule y_v = −Δ/(4a) da parábola e some os 1,5 m da altura inicial em relação ao piso."
- **Fonte:** ENEM 2022 — Questão 150 (`https://api.enem.dev/v1/exams/2022/questions/150`).
- **Adaptação:** equação transcrita para texto e rótulos explicitando as alturas dos ginásios I a V.
- **Conta de conferência:** Δ = 49/9 + 8 = 121/9; y_v = 121/6 ≈ 20,17 m; 20,17 + 1,5 = 21,67 m > 21 m (I a IV, gabarito D).

#### V2 — `enem-2009-alcool`
- **Enunciado (resumido):** Um posto vende 10.000 L a R$ 1,50/L; cada R$ 0,01 de desconto (x centavos) soma 100 L nas vendas. Qual é a receita V(x)?
- **Fala do Paco:** "Escreva a nova quantidade e o novo preço, em reais, em função de x; a receita é quantidade × preço."
- **Fonte:** ENEM 2009 — Questão 155 (`https://api.enem.dev/v1/exams/2009/questions/155`).
- **Adaptação:** enunciado condensado mantendo os dados e as 5 expressões.
- **Conta de conferência:** V(x) = (10.000 + 100x)(1,50 − 0,01x) = 15.000 + 50x − x² (gabarito D).

#### V3 e V4
- **Estado:** **PENDENTE-FONTE** (candidatas UNESP 2017 e ENEM sem ano ficaram fora por não constarem no cache ENEM).

---

# Checklist de qualidade

**Método (METODO.md)**
- [x] Os 7 pilares a)–g) estão escritos e cada um aparece em pelo menos um passo (linha "Pilares").
- [x] A aula abre com figura viva, não com fórmula nem definição.
- [x] O caso neutro aparece na tela e é nomeado numa fala.
- [x] O panorama ocupa uma fala e o recorte fica claro.
- [x] O contraste mostra o antes na tela.
- [x] A fórmula do fechamento foi deduzida antes por causa visual.
- [x] Há teste de fronteira: domínio, caso neutro ou restrição da regra.

**Roteiro**
- [x] De 4 a 8 passos; primeiro `interactive_canvas`, último `concept_lock`, há `micro_challenge`.
- [x] Toda abertura pergunta ou pede previsão; toda conclusão responde com o porquê.
- [x] Cada passo interativo tem métrica existente e alcançável; widget novo declara métrica.
- [x] No desafio, a opção errada tem feedback diagnóstico e figura que mostra o erro.
- [x] Toda marca c1..c4 usada tem linha no glossário.
- [x] Widgets novos estão marcados com desenho, ação do aluno e métrica.

**Treino**
- [x] Exatamente 4 fáceis, 3 médias, 5 desafios e 4 registros vestibular; ids únicos em minúsculas com hífen.
- [x] Cada questão respondível tem duas opções e exatamente uma certa; vestibular aguarda fonte.
- [x] Todo feedback errado contém resposta certa e conta curta.
- [x] Cada distrator corresponde a erro diagnosticado.
- [x] Toda questão factual tem conta de conferência revisada.
- [ ] Vestibular: 4 entradas PENDENTE-FONTE; banca, ano, enunciado, alternativas, gabarito e URL pendentes.

**Texto**
- [x] Falas, enunciados e feedback têm até 140 caracteres e duas frases; sem emoji ou termos proibidos.
- [x] Notação usa −, vírgula decimal, ·, potências e coordenadas do app.

---
**Notas da implementação (JSON):** panorama colocado como dúvida do passo `mudar-a`; a = 0 como dúvida de `mover-vertice`; vestibular `[]` (PENDENTE-FONTE fora). Lacunas de widget: sem marcador de vértice nem eixo de simetria (usado `ponto` na cor c4); as opções de treino ficaram com 2 alternativas como no plano.
