# Plano — Gráficos das funções seno, cosseno e tangente

**Aula:** 1 — Do Giro à Onda · Senoide, cossenoide, período e assíntotas
**Caminho:** geometria / trigonometria / funcoes-trigonometricas
**Pré-requisitos que o aluno já domina:** seno-cosseno-tangente-no-ciclo, introducao-a-funcoes

## a) Ancoragem mecânica
A máquina gira um ângulo x no ciclo trigonométrico à esquerda enquanto desenrola x no eixo horizontal do plano cartesiano à direita, marcando a altura y correspondente. O arco x em radianos é a entrada; o rastro da coordenada vertical desenha a onda f(x) = sen x, a horizontal desenha g(x) = cos x e a altura na reta tangente desenha h(x) = tg x.

## b) Visual de partida
WIDGET NOVO `ciclo_trigonometrico` acoplado a `plano_cartesiano`: à esquerda, o ponto P gira no ciclo unitário; uma linha pontilhada horizontal leva a altura sen x direto para o ponto (x; sen x) no gráfico cartesiano à direita, de x = 0 a x = 2π (e além, até 4π).

## c) Caso neutro
Em x = 0, a função seno parte da origem (0; 0), enquanto a função cosseno parte do topo (0; 1). A curva do seno em [0; 2π] fica como onda de referência (fantasma) para comparar com o cosseno (que é a mesma onda adiantada em π/2) e com a tangente.

## d) Panorama e recorte
Na sequência, essas ondas ganharão amplitude, deslocamento vertical e mudança de frequência para modelar fenômenos reais. Aqui construímos os três gráficos básicos (sen x, cos x e tg x), seus domínios, imagens e períodos.

## e) Progressão por contraste
1. f(x) = sen x em [0; 2π] (referência): parte de 0, sobe a 1 em π/2, zera em π, desce a −1 em 3π/2 e fecha o ciclo em 2π.
2. Mais de uma volta (período 2π): ao passar de 2π até 4π, a onda repete exatamente o mesmo desenho, sempre presa na imagem [−1; 1].
3. g(x) = cos x contra sen x: tem a mesma imagem [−1; 1] e período 2π, mas começa em 1 e zera em π/2 e 3π/2.
4. h(x) = tg x: dispara para o infinito perto de π/2 e 3π/2 (assíntotas verticais), tem imagem (−∞; +∞) e repete a cada π.

## f) Dedução causal da forma
Como dar uma volta completa de 2π radianos devolve o ponto ao mesmo lugar do ciclo, f(x + 2π) = f(x), por isso seno e cosseno são periódicos de período 2π e ficam limitados ao raio [−1; 1]. Já a tangente repete a cada meia-volta (tg(x + π) = tg x), tendo período π e assíntotas onde cos x = 0.

## g) Simulação espacial e fronteiras
O aluno arrasta x de 0 a 4π para ver dois períodos completos da senoide e testar que a curva nunca passa das linhas y = 1 e y = −1. No modo tangente, aproxima x de π/2 e 3π/2 para ver a curva subir ou descer sem limite ao longo das assíntotas verticais.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Onda do seno | Gráfico de f(x) = sen x, que parte de (0; 0) com período 2π. |
| c2 | Onda do cosseno | Gráfico de g(x) = cos x, que parte de (0; 1) com período 2π. |
| c3 | Imagem [−1; 1] | Faixa vertical entre o mínimo −1 e o máximo 1 das ondas de seno e cosseno. |
| c4 | Período | Menor intervalo em x após o qual o gráfico se repete (2π no seno/cosseno; π na tangente). |

### Passo 1 — `desenrolar-seno`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `ciclo_trigonometrico` + `plano_cartesiano` — ponto gira no ciclo e traça y = sen x (c1) entre as retas y = −1 e y = 1 (c3). Emite `x_rad`.
- **Sliders:** `x_rad` · "Arco x (em quartos de π)" · 0..8 · passo 2 · inicial 0 · c1
- **Paco (abertura):** "Em x = 0, sen 0 = 0. Gire até completar uma volta em 2π (8 quartos de π): onde a onda atinge o máximo 1 e o mínimo −1?"
- **Interação do aluno:** move `x_rad` passando por π/2 (y = 1), π (y = 0), 3π/2 (y = −1) e 2π (y = 0), desenhando a senoide.
- **Conclusão:** `x_rad ≥ 8`
- **Paco (conclusão):** "Bate no máximo 1 em π/2, zera em π, desce a −1 em 3π/2 e volta a 0 em 2π. A altura no ciclo vira a onda no gráfico."
- **Tati (dúvida):** `fim` — P: "O que acontece se a gente continuar girando depois de 2π?" / R: "A onda se repete infinitamente a cada 2π, e na próxima aula ajustaremos a altura e o ritmo dela."

### Passo 2 — `comparar-seno-cosseno`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `plano_cartesiano` — fantasma y = sen x (c1) em [0; 4π]; curva y = cos x (c2) sendo traçada; período 2π destacado em c4. Emite `x_rad`.
- **Sliders:** `x_rad` · "Arco x (em meios de π)" · 0..8 · passo 2 · inicial 0 · c2
- **Paco (abertura):** "O seno começou em 0, mas cos 0 = 1. Leve x até 4π (duas voltas): quantas ondas completas o cosseno faz em 4π?"
- **Interação do aluno:** arrasta `x_rad` até 8 (4π); vê duas ondas completas de cos x, ambas entre −1 e 1, deslocadas em relação ao seno.
- **Conclusão:** `x_rad ≥ 8`
- **Paco (conclusão):** "Faz duas ondas completas, pois cada período mede 2π. Seno e cosseno têm a mesma forma, período 2π e imagem [−1; 1]."

### Passo 3 — `grafico-tangente`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (fronteira / assíntotas)
- **Widget:** `plano_cartesiano` — gráfico de y = tg x com assíntotas verticais tracejadas em x = π/2 e x = 3π/2; marca o período π (c4). Emite `x_graus`.
- **Sliders:** `x_graus` · "Arco x (graus)" · 0..180 · passo 45 · inicial 0 · c4
- **Paco (abertura):** "Na tangente, cos 90° = 0 cria uma barreira vertical em π/2 (90°). Avance até 180° (π): a curva já começou a se repetir?"
- **Interação do aluno:** move `x_graus` de 0° a 180°; vê a curva subir rumo à assíntota em 90°, reaparecer vindo de −∞ e zerar em 180°.
- **Conclusão:** `x_graus ≥ 180`
- **Paco (conclusão):** "Sim: a tangente se repete a cada π (180°), metade do período do seno. E como sobe e desce sem fim, sua imagem é todos os reais."
- **Tati (dúvida):** `fim` — P: "A curva da tangente chega a encostar na linha tracejada de π/2?" / R: "Nunca encosta: essa linha é uma assíntota vertical, porque em π/2 a tangente não existe."

### Passo 4 — `desafio-identificar-curva`
- **Tipo:** `micro_challenge`
- **Pilares:** 5, 6
- **Figura:** `plano_figura` — curva trigonométrica em [0; 2π] que começa em (0; 1), passa por (π/2; 0), atinge (π; −1) e volta a (2π; 1) (c2).
- **Paco (abertura):** "Olhe para o ponto onde a curva corta o eixo y (em x = 0)."
- **Enunciado:** "O gráfico da figura começa em (0; 1), vale −1 em x = π e volta a 1 em x = 2π. Qual é essa função?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `cos` | f(x) = cos x | **sim** | "Isso. Como cos 0 = 1 e cos π = −1, essa é a curva do cosseno." | destaca os pontos (0; 1) e (π; −1) em c2 |
| `sen` | f(x) = sen x | não | "O seno começa em (0; 0). Quem começa em (0; 1) é f(x) = cos x." | mostra a curva fantasma de sen x saindo de (0; 0) |
| `tg` | f(x) = tg x | não | "A tangente começa em (0; 0) e tem assíntotas. Essa onda é f(x) = cos x." | destaca a faixa limitada entre −1 e 1 (c3) |
| `msen` | f(x) = −sen x | não | "−sen x também vale 0 em x = 0. Quem vale 1 em x = 0 é f(x) = cos x." | destaca o ponto inicial (0; 1) no eixo y |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `plano_figura` — ondas de sen x (c1) e cos x (c2) em [0; 2π] com faixa de imagem [−1; 1] (c3) e período 2π (c4).
- **Fórmula:** `sen(x + 2π)`→c1 · `=` · `sen x`→c1 · `;` · `Im` · `=` · `[−1; 1]`→c3 · `;` · `T`→c4 · `=` · `2π`→c4
- **Definições:** "Seno e cosseno: domínio ℝ, imagem [−1; 1] e período T = 2π." · "Raízes em [0; 2π]: sen x zera em 0, π e 2π; cos x zera em π/2 e 3π/2." · "Tangente: imagem ℝ, período T = π e assíntotas em π/2 + kπ."
- **Paco (abertura):** "Cada volta de 2π no ciclo repete exatamente as coordenadas do ponto, por isso sen x e cos x formam ondas de período 2π e imagem [−1; 1]."
- **Dica (hint):** "Toque nos elementos da fórmula para destacar as ondas, a imagem e o período no gráfico."

**Frase de encerramento (outro):** "Você desenrolou o ciclo trigonométrico no plano cartesiano e comparou os gráficos, períodos e imagens de seno, cosseno e tangente."

## i) Treino pós-aula

### Fáceis

#### F1 — `imagem-do-seno`
- **Enunciado:** "Qual é o conjunto imagem (valores mínimo e máximo de y) da função f(x) = sen x?"
- **Conta de conferência:** −1 ≤ sen x ≤ 1 ⇒ Im = [−1; 1]

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `im11` | [−1; 1] | **sim** | "Certo. No ciclo de raio 1, o seno varia sempre entre −1 e 1." |
| `i01` | [0; 1] | não | "No 3º e 4º quadrantes o seno é negativo, chegando a −1: a imagem é [−1; 1]." |
| `i02p` | [0; 2π] | não | "[0; 2π] é um período no eixo x. No eixo y, a imagem é [−1; 1]." |
| `ir` | Todos os reais | não | "Todos os reais é a imagem da tangente. A imagem de sen x é [−1; 1]." |

#### F2 — `periodo-cosseno`
- **Enunciado:** "Qual é o período fundamental da função g(x) = cos x?"
- **Conta de conferência:** uma volta completa = 2π rad

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p2p` | 2π | **sim** | "Isso. O cosseno repete seu ciclo a cada volta completa de 2π radianos." |
| `pp` | π | não | "π é o período da tangente. O período de cos x é 2π." |
| `p2` | 2 | não | "2 é a altura entre −1 e 1. O período horizontal é 2π." |
| `p1` | 1 | não | "1 é o valor máximo de cos x. O período é 2π." |

#### F3 — `ponto-inicial-seno-cosseno`
- **Enunciado:** "Em x = 0, os gráficos de f(x) = sen x e g(x) = cos x passam, respectivamente, pelas alturas y iguais a:"
- **Conta de conferência:** sen 0 = 0 e cos 0 = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `z0e1` | 0 e 1 | **sim** | "Exato. sen 0 = 0 (sai da origem) e cos 0 = 1 (sai do topo)." |
| `u1e0` | 1 e 0 | não | "Você inverteu: quem vale 0 é sen 0, e quem vale 1 é cos 0 (0 e 1)." |
| `z0e0` | 0 e 0 | não | "Apenas o seno sai de 0; cos 0 = 1. A resposta é 0 e 1." |
| `u1e1` | 1 e 1 | não | "Em x = 0 temos sen 0 = 0 e cos 0 = 1." |

#### F4 — `periodo-tangente`
- **Enunciado:** "Qual é o período da função h(x) = tg x?"
- **Conta de conferência:** tg(x + π) = tg x ⇒ T = π

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tp` | π | **sim** | "Certo. A tangente se repete a cada meia-volta: seu período é π." |
| `t2p` | 2π | não | "2π é o período de seno e cosseno. A tangente se repete antes, a cada π." |
| `tp2` | π/2 | não | "π/2 é onde fica a primeira assíntota; a largura de cada ramo é π." |
| `t4p` | 4π | não | "O ramo da tangente vai de −π/2 a π/2, tendo período π." |

### Médias

#### M1 — `raizes-do-cosseno`
- **Enunciado:** "No intervalo [0; 2π], em quais valores de x o gráfico de g(x) = cos x corta o eixo x (isto é, cos x = 0)?"
- **Conta de conferência:** cos x = 0 ⇒ x = π/2 e x = 3π/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p2e3p2` | π/2 e 3π/2 | **sim** | "Isso. Em 90° (π/2) e 270° (3π/2) o cosseno vale zero." |
| `z0p2p` | 0, π e 2π | não | "0, π e 2π são as raízes do seno. O cosseno zera em π/2 e 3π/2." |
| `sop` | Apenas π | não | "Em x = π temos cos π = −1 (mínimo). Ele zera em π/2 e 3π/2." |
| `z0ep` | 0 e π | não | "Em 0 e π o cosseno vale 1 e −1. As raízes são π/2 e 3π/2." |

#### M2 — `onde-seno-decresce`
- **Enunciado:** "Em [0; 2π], o gráfico de f(x) = sen x vai do ponto mais alto (1) até o ponto mais baixo (−1) em qual intervalo?"
- **Conta de conferência:** máximo em π/2 (y = 1) e mínimo em 3π/2 (y = −1) ⇒ [π/2; 3π/2]

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p2a3p2` | De π/2 a 3π/2 | **sim** | "Certo. Ele bate 1 em π/2 e desce continuamente até −1 em 3π/2." |
| `z0ap` | De 0 a π | não | "De 0 a π/2 ele sobe (de 0 a 1). Ele desce de π/2 até 3π/2." |
| `pa2p` | De π a 2π | não | "De 3π/2 a 2π ele já está subindo de −1 para 0. Ele desce de π/2 a 3π/2." |
| `z0ap2` | De 0 a π/2 | não | "De 0 a π/2 o seno sobe de 0 até 1. Ele desce de π/2 a 3π/2." |

#### M3 — `encontro-seno-cosseno-1q`
- **Enunciado:** "No 1º quadrante (entre 0 e π/2), em qual valor de x os gráficos de sen x e cos x se cruzam?"
- **Conta de conferência:** sen x = cos x ⇒ x = π/4 (45°)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `xp4` | π/4 | **sim** | "Exato. Em π/4 (45°), sen(π/4) = cos(π/4) = √2/2." |
| `xp2` | π/2 | não | "Em π/2 o seno é 1 e o cosseno é 0. Eles empatam na metade: π/4." |
| `xp6` | π/6 | não | "Em π/6 (30°), sen = 1/2 e cos = √3/2. Eles se cruzam em π/4 (45°)." |
| `xp3` | π/3 | não | "Em π/3 (60°), sen = √3/2 e cos = 1/2. O encontro é em π/4." |

### Desafios

#### D1 — `quantas-raizes-seno`
- **Enunciado:** "Quantas vezes o gráfico de f(x) = sen x toca ou cruza o eixo x no intervalo fechado [0; 2π]?"
- **Conta de conferência:** sen x = 0 em x = 0, x = π e x = 2π ⇒ 3 vezes

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n3` | 3 vezes (0, π e 2π) | **sim** | "Isso. Nas duas pontas (0 e 2π) e bem no meio da volta (π): 3 vezes." |
| `n2` | 2 vezes (0 e π) | não | "Como o intervalo é fechado em 2π, sen 2π = 0 também entra: são 3 vezes." |
| `n1` | 1 vez (apenas π) | não | "Em x = 0 e x = 2π o seno também vale zero: são 3 vezes." |
| `n4` | 4 vezes | não | "Em π/2 e 3π/2 o seno vale 1 e −1. Ele zera em 0, π e 2π (3 vezes)." |

#### D2 — `periodicidade-grande`
- **Enunciado:** "Usando o período T = 2π da função cosseno, quanto vale f(20π + π/3) se f(x) = cos x?"
- **Conta de conferência:** 20π = 10 · 2π (10 períodos) ⇒ cos(20π + π/3) = cos(π/3) = 1/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c05` | 1/2 | **sim** | "Certo. 20π são 10 períodos completos de 2π, então cos(20π + π/3) = cos(π/3) = 1/2." |
| `cm05` | −1/2 | não | "20π é múltiplo par de π (10 voltas inteiras), logo vale +cos(π/3) = 1/2." |
| `cr3` | √3/2 | não | "√3/2 é sen(π/3). Para o cosseno, cos(π/3) = 1/2." |
| `c1` | 1 | não | "cos 20π = 1, mas somamos π/3 no arco: cos(π/3) = 1/2." |

#### D3 — `fronteira-dominio-tangente`
- **Enunciado:** "Qual dos valores abaixo NÃO pertence ao domínio da função h(x) = tg x?"
- **Conta de conferência:** assíntotas em π/2 + kπ ⇒ para k = 2, π/2 + 2π = 5π/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5p2` | 5π/2 | **sim** | "Exato. 5π/2 = 2π + π/2 cai no topo do ciclo (cos = 0), onde há assíntota." |
| `a2p` | 2π | não | "Em 2π temos tg 2π = 0. Quem não está no domínio é 5π/2 (onde cos = 0)." |
| `ap` | π | não | "Em π temos tg π = 0. A assíntota está em 5π/2." |
| `ap4` | π/4 | não | "Em π/4 temos tg(π/4) = 1. O ponto fora do domínio é 5π/2." |

#### D4 — `paridade-seno-cosseno`
- **Enunciado:** "Olhando para a simetria no ciclo em torno de x = 0, quanto valem sen(−x) e cos(−x)?"
- **Conta de conferência:** −x inverte a altura y mas mantém o x horizontal ⇒ sen(−x) = −sen x (ímpar) e cos(−x) = cos x (par)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `imparpar` | −sen x e cos x | **sim** | "Isso. Girar para baixo inverte o y (seno é ímpar) mas mantém o x (cosseno é par)." |
| `parimpar` | sen x e −cos x | não | "No 4º quadrante o x continua positivo e o y fica negativo: −sen x e cos x." |
| `ambosneg` | −sen x e −cos x | não | "O cosseno de −x tem a mesma projeção horizontal que x: fica −sen x e cos x." |
| `ambospos` | sen x e cos x | não | "O seno muda de sinal quando invertemos o sentido do giro: −sen x e cos x." |

#### D5 — `diferenca-max-min-intervalo`
- **Enunciado:** "Considere f(x) = sen x restrita apenas ao intervalo [0; π]. Qual é o conjunto imagem de f nesse intervalo e em qual x ocorre o máximo?"
- **Fala do Paco:** "Em [0; π] estamos só na metade de cima do ciclo (1º e 2º quadrantes)."
- **Conta de conferência:** em [0; π], sen x vai de 0 até 1 (em x = π/2) e volta a 0 ⇒ Im = [0; 1], máximo em π/2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `i01p2` | [0; 1], máximo em π/2 | **sim** | "Exato. Entre 0 e π o seno não fica negativo: varia de 0 a 1 com pico em π/2." |
| `im11p2` | [−1; 1], máximo em π/2 | não | "O seno só chega a −1 em 3π/2 (fora de [0; π]). Nesse trecho a imagem é [0; 1]." |
| `i01p` | [0; 1], máximo em π | não | "Em x = π temos sen π = 0. O máximo 1 ocorre em x = π/2." |
| `im10` | [−1; 0], máximo em 0 | não | "Entre 0 e π o seno é positivo ou zero: imagem [0; 1] e máximo em π/2." |

### Vestibular

#### V1 — `enem-2017-lago`
- **Enunciado (resumido):** A intensidade luminosa em um lago é I(x) = k·sen(x), para 0° < x ≤ 90°. Quando x = 30°, a intensidade é qual percentual do valor máximo?
- **Fala do Paco:** "Compare I(30°) = k·sen 30° com o valor máximo de sen(x) em (0°; 90°]."
- **Fonte:** ENEM 2017, Questão 138 — `https://api.enem.dev/v1/exams/2017/questions/138`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`50%`) mantidos.
- **Conta de conferência:** `I_max = I(90°) = k·1 = k`; `I(30°) = k·0,5 = 50%` de `k`.
- **Opções e feedback:** `33%`, `50%` (correta), `57%`, `70%`, `86%`.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** determinar o número de soluções (interseções) de sen x = k ou sen x = cos x num intervalo dado.
- **Onde procurar:** Fuvest, Unicamp, UFRGS.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** analisar domínio, período e assíntotas da função tangente.
- **Onde procurar:** UFRGS, Mackenzie, PUC, UFPR.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** comparar o crescimento/decrescimento e os sinais de sen x e cos x a partir de seus gráficos em [0; 2π].
- **Onde procurar:** ENEM, Unesp, Unicamp.
