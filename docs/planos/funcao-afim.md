# Plano — Função afim

**Aula:** 1 — A Reta Viva · Inclinação, deslocamento e raiz
**Caminho:** algebra / funcoes / funcao-afim
**Pré-requisitos que o aluno já domina:** operações com sinais, coordenadas e equações do primeiro grau.

**Espelho da implementação:** content/algebra/funcoes/funcao-afim/aula-01.json; passos, parâmetros, condições e questões preservados; o feedback de M2 para a opção Duas foi precisado.
Os IDs de questão e de opção recebem prefixo de treino para serem únicos neste documento; os sufixos mantêm a correspondência com o JSON.

## a) Ancoragem mecânica
A máquina `f(x)=ax+b` aplica dois gestos: multiplica a entrada por a (inclinação) e depois soma b (deslocamento vertical). x é a entrada independente; y=f(x), a saída dependente. a mede quanto y muda por unidade de x; b é a saída quando x=0.

## b) Visual de partida
Palco: gráfico cartesiano de uma reta viva. Sliders para a e b; um ponto de entrada x também pode ser arrastado. O ponto imagem percorre a reta. Exibir inclinação como triângulo “anda 1, sobe a” e intercepto no eixo y. Faixa sugerida: a,b de −4 a 4.

## c) Caso neutro
`f(x)=x` (a=1, b=0): cada entrada sai intacta; reta diagonal de referência. Depois zerar a (saída constante 0) e, separadamente, zerar b para isolar cada efeito.

## d) Panorama e recorte
Não: existem parábolas, exponenciais e muitas outras. Hoje ficamos nas retas, as funções afins.

O recorte inclui parâmetros, raiz e encontro de duas retas, como nos passos implementados.

## e) Progressão por contraste
1. Variar b com a=1: reta sobe/desce sem inclinação mudar.
2. Variar a com b=0: a reta gira ao redor da origem; sinal de a decide subida ou descida.
3. Comparar a=0 (horizontal), a>0 e a<0.
4. Sobrepor `x` e `2x+1`, ler onde as saídas coincidem.

## f) Dedução causal da forma
Para qualquer passo Δx, a saída muda `a·Δx`; por isso a taxa é constante e o gráfico é uma reta. O termo b desloca toda saída igualmente, então não muda a inclinação. Se a>0, aumentar x aumenta y; se a<0, diminui; se a=0, não muda. A raiz vem de pedir saída zero: `ax+b=0`, isto é, `x=−b/a` quando a≠0.

## g) Simulação espacial e fronteiras
Arrastar x evidencia deslocamento constante. Marcar quadrantes e cruzamentos dos eixos; para a≠0 há uma raiz, para a=0 e b≠0 nenhuma, e para a=b=0 todos os x são raízes. A função afim tem domínio R; uma situação real pode impor recorte (ex.: tempo não negativo), que deve ser desenhado como restrição do modelo, não da fórmula.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Coeficiente a | Quanto a saída muda quando a entrada anda 1. |
| c2 | Coeficiente b | A saída quando a entrada é zero: onde a reta corta o eixo y. |
| c3 | Gráfico de f | Todos os pontos (x, f(x)) que a máquina produz. |
| c4 | Raiz | Entrada que faz a saída valer zero. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa, c4 violeta; eixos em ink e curvas fantasma em muted.
Janelas não especificadas usam x e y de −5 a 5; o ponto começa onde indicado e respeita o passo.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (identidade como caso neutro), 4 (panorama), 7 (quadrantes)
- **Widget:** `plano_cartesiano` — curvas: curva 0 (tipo=afim; a=1; b=0; cor=c3; rotulo=y = x); ponto (x=1; passo=0,5); marcar (quadrantes=true).
- **Sliders:** nenhum
- **Paco (abertura):** "Esta máquina devolve a entrada sem mexer: f(x) = x. Arraste o ponto para os dois lados e veja onde a saída vai parar."
- **Interação do aluno:** Arrasta o ponto pela identidade até visitar os quadrantes I e III; ambas as coordenadas permanecem iguais.
- **Conclusão:** `quadrantes ≥ 2`
- **Paco (conclusão):** "Entrada 3, saída 3; entrada −2, saída −2. Sem nada agindo, a máquina desenha a diagonal."
- **Tati (dúvida):** `fim` — P: "Toda função vira uma reta assim?" / R: "Não: existem parábolas, exponenciais e muitas outras. Hoje ficamos nas retas, as funções afins."

### Passo 2 — `somar-b`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5
- **Widget:** `plano_cartesiano` — curvas: curva 0 (tipo=afim; a=1; b=0; fantasma=true; rotulo=y = x) / curva 1 (tipo=afim; a=1; b=controle b; cor=c3); marcar (interceptoY=true).
- **Sliders:** `b` · Soma b · −4..4 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Agora a máquina soma b no fim. Antes de mexer: com b = 2, a reta vai girar ou só subir?"
- **Interação do aluno:** Move b de 0 a 2; compara a reta ativa com a identidade fantasma, lendo o novo intercepto.
- **Conclusão:** `b ≥ 2`
- **Paco (conclusão):** "Só subiu. Cada saída ganhou 2, então a reta inteira subiu 2 sem mudar a inclinação."
- **Tati (dúvida):** `fim` — P: "E com b negativo?" / R: "A reta inteira desce. Com x = 0 a saída é exatamente b, por isso é ali que a reta corta o eixo y."

### Passo 3 — `multiplicar-a`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6
- **Widget:** `plano_cartesiano` — curvas: curva 0 (tipo=afim; a=1; b=0; fantasma=true; rotulo=y = x) / curva 1 (tipo=afim; a=controle a; b=0; cor=c3); triangulo (curva=1; x=0; cor=c1).
- **Sliders:** `a` · Multiplica por a · −4..4 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Agora a entrada é multiplicada por a. Leve a até 2: andando 1 para a direita, quanto a saída sobe?"
- **Interação do aluno:** Move a de 1 a 2; observa o triângulo horizontal de base 1 e altura a.
- **Conclusão:** `a ≥ 2`
- **Paco (conclusão):** "Sobe 2 a cada passo de 1, em qualquer lugar. Como a subida por passo nunca muda, o desenho só pode ser reto."
- **Tati (dúvida):** `fim` — P: "Por que não sai uma curva?" / R: "Curva seria a subida mudar no caminho. Aqui todo passo de 1 soma o mesmo a, então a inclinação é constante."

### Passo 4 — `a-negativo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7
- **Widget:** `plano_cartesiano` — curvas: curva 0 (tipo=afim; a=1; b=0; fantasma=true; rotulo=y = x) / curva 1 (tipo=afim; a=controle a; b=0; cor=c3); triangulo (curva=1; x=0; cor=c1).
- **Sliders:** `a` · Multiplica por a · −4..4 · passo 1 · inicial 2 · c1
- **Paco (abertura):** "Faça uma previsão antes de mexer: com a = −1, a reta sobe ou desce para a direita? Depois leve a até −1."
- **Interação do aluno:** Move a de 2 até −1, passando pelo caso constante a=0; a reta passa a descer.
- **Conclusão:** `a ≤ −1`
- **Paco (conclusão):** "Desce. Entrada positiva vezes número negativo dá saída negativa, então andar para a direita derruba a saída."
- **Tati (dúvida):** `fim` — P: "E se a for zero?" / R: "Aí toda entrada vira zero antes de somar b. A saída fica constante e a reta deita."

### Passo 5 — `achar-raiz`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6, 7
- **Widget:** `plano_cartesiano` — curvas: curva 0 (tipo=afim; a=−1; b=2; cor=c3; rotulo=f(x) = −x + 2); ponto (x=−2; passo=0,5); marcar (quadrantes=true).
- **Sliders:** nenhum
- **Paco (abertura):** "Em f(x) = −x + 2, para qual entrada a saída vale zero? Arraste o ponto até descobrir."
- **Interação do aluno:** Arrasta o ponto de x=−2 até x=2, onde a saída zera.
- **Conclusão:** `na_raiz ≥ 1`
- **Paco (conclusão):** "Em x = 2 a saída é zero, pois −2 + 2 = 0. Essa entrada se chama raiz, e é onde a reta cruza o eixo x."
- **Tati (dúvida):** `fim` — P: "Toda reta tem raiz?" / R: "Se a não for zero, tem exatamente uma. A reta deitada y = 5 nunca encosta no eixo x."

### Passo 6 — `duas-maquinas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 7
- **Widget:** `plano_cartesiano` — curvas: curva 0 (tipo=afim; a=1; b=0; cor=c3; rotulo=f(x) = x) / curva 1 (tipo=afim; a=2; b=1; cor=ink; rotulo=g(x) = 2x + 1); ponto (curva=0; x=2; passo=0,5).
- **Sliders:** nenhum
- **Paco (abertura):** "Duas máquinas: f(x) = x e g(x) = 2x + 1. Arraste o ponto por f e ache a entrada em que as duas dão a mesma saída."
- **Interação do aluno:** Arrasta na curva 0 de x=2 até −1, onde as duas saídas coincidem.
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Em x = −1, as duas devolvem −1. No gráfico, mesma entrada com mesma saída é o ponto onde as retas se cruzam."

### Passo 7 — `desafio-raiz`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** `plano_figura` — curvas: curva 0 (tipo=afim; a=−2; b=4; cor=c3; rotulo=f(x) = −2x + 4).
- **Paco (abertura):** "Agora sem arrastar: leia a lei da função e pense em qual entrada zera a saída."
- **Enunciado:** "Em f(x) = −2x + 4, em que valor de x a reta cruza o eixo x?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-a4` | 4 | não | "4 é a saída em x = 0, onde a reta corta o eixo y. No eixo x quem vale zero é a saída." | marcar (interceptoY=true); highlight=[c2]. |
| `micro-am2` | −2 | não | "−2 é o a: a reta desce 2 a cada passo. Para a raiz, peça saída zero: −2x + 4 = 0." | triangulo (x=0; cor=c1); highlight=[c1]. |
| `micro-a2` | 2 | **sim** | "Exato. −2·2 + 4 = 0: a entrada 2 zera a saída." | marcar (raizes=true); highlight=[c4]. |
| `micro-a0` | 0 | não | "Com x = 0 a saída é 4, não zero. A raiz é a entrada que zera a saída." | ponto (x=0). |
- **Tati (dúvida):** `fim` — P: "Dá para achar a raiz sem desenhar?" / R: "Dá: peça saída zero e resolva ax + b = 0. Com a diferente de zero, a raiz é x = −b/a."

### Passo 8 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo)
- **Figura:** `plano_figura` — curvas: curva 0 (tipo=afim; a=2; b=1; cor=c3; rotulo=f(x) = 2x + 1); triangulo (x=0; cor=c1); marcar (interceptoY=true; raizes=true).
- **Fórmula:** `f(x)`→c3 · `=` · `a`→c1 · `x` · `+` · `b`→c2
- **Definições:**
  - "Função afim: f(x) = ax + b, com a e b reais; o gráfico é sempre uma reta."
  - "Raiz: entrada que zera a saída; com a diferente de zero, x = −b/a."
  - "Sinal de a: com a > 0 a reta sobe, com a < 0 desce e com a = 0 fica deitada."
- **Paco (abertura):** "A máquina multiplica a entrada por a e depois soma b. Por isso a dita o ritmo da reta e b, o ponto de partida."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você montou a máquina f(x) = ax + b: a decide a inclinação, b o ponto de partida, e a raiz é onde a saída zera."

## i) Treino pós-aula

### Fáceis

#### F1 — `treino-f-de-zero`
- **Enunciado:** "Em f(x) = 2x + 1, quanto vale f(0)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2·0+1=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-f-de-zero-a0` | 0 | não | "Com x = 0 o termo 2x some, mas o b fica. f(0) = 1." |
| `treino-f-de-zero-a1` | 1 | **sim** | "Isso. Com entrada zero, sobra só o ponto de partida b." |
| `treino-f-de-zero-a2` | 2 | não | "2 é o a, que multiplica a entrada. Com x = 0 sobra b: f(0) = 1." |
| `treino-f-de-zero-a3` | 3 | não | "3 é f(1). Com x = 0 o 2x some, e f(0) = 1." |

#### F2 — `treino-passo-de-um`
- **Enunciado:** "Em f(x) = 3x, se a entrada aumenta 1, quanto muda a saída?"
- **Figura:** nenhuma
- **Conta de conferência:** f(x+1)−f(x)=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-passo-de-um-am3` | −3 | não | "Com a positivo a saída sobe. Ela muda +3 a cada passo de 1." |
| `treino-passo-de-um-a1` | 1 | não | "A entrada muda 1, mas a saída muda a vezes isso. Com a = 3, muda 3." |
| `treino-passo-de-um-a3` | 3 | **sim** | "Exato. É o triângulo da aula: andando 1, sobe a." |
| `treino-passo-de-um-depende` | Depende de x | não | "Na reta não depende: todo passo de 1 muda a saída em a. Aqui, sempre 3." |

#### F3 — `treino-decrescente`
- **Enunciado:** "Qual destas funções é decrescente?"
- **Figura:** nenhuma
- **Conta de conferência:** Na opção −3x+2, a=−3<0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-decrescente-f4x1` | f(x) = 4x + 1 | não | "Com a = 4 a reta sobe. A decrescente é f(x) = −3x + 2, com a negativo." |
| `treino-decrescente-fx7` | f(x) = x − 7 | não | "O −7 só desloca a reta para baixo; com a = 1 ela ainda sobe. A decrescente é −3x + 2." |
| `treino-decrescente-fm3x2` | f(x) = −3x + 2 | **sim** | "Isso. Com a = −3, cada passo para a direita derruba a saída em 3." |
| `treino-decrescente-f8` | f(x) = 8 | não | "f(x) = 8 é constante: não sobe nem desce. A decrescente é −3x + 2." |

#### F4 — `treino-trocar-b`
- **Enunciado:** "O que acontece com a reta ao trocar f(x) = x + 2 por g(x) = x − 1?"
- **Figura:** `plano_figura` — curvas: curva 0 (tipo=afim; a=1; b=2; cor=c3; rotulo=f) / curva 1 (tipo=afim; a=1; b=−1; cor=ink; rotulo=g); estática.
- **Conta de conferência:** Δb=−1−2=−3; inclinação permanece 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-trocar-b-gira` | Gira em torno da origem | não | "Girar seria mudar o a, que continua 1. Só o b mudou, de 2 para −1: a reta desce 3." |
| `treino-trocar-b-desce3` | Desce 3, sem girar | **sim** | "Exato. b caiu de 2 para −1, então toda saída perdeu 3 e a inclinação ficou igual." |
| `treino-trocar-b-sobe3` | Sobe 3, sem girar | não | "O b diminuiu, de 2 para −1. A reta desce 3, sem girar." |
| `treino-trocar-b-igual` | Fica igual | não | "Mesma inclinação não é mesma reta: b foi de 2 para −1, e a reta desceu 3." |

### Médias

#### M1 — `treino-raiz-3x-6`
- **Enunciado:** "Em f(x) = 3x − 6, qual é a raiz?"
- **Figura:** `plano_figura` — curvas: curva 0 (tipo=afim; a=3; b=−6; cor=c3; rotulo=f(x) = 3x − 6); y=[−7; 3]; estática.
- **Conta de conferência:** 3x−6=0 ⇒ x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-raiz-3x-6-am6` | −6 | não | "−6 é f(0), onde a reta corta o eixo y. A raiz pede saída zero: 3x − 6 = 0, x = 2." |
| `treino-raiz-3x-6-a3` | 3 | não | "3 é o a. Para a raiz, resolva 3x − 6 = 0: x = 2." |
| `treino-raiz-3x-6-a2` | 2 | **sim** | "Certo. 3·2 − 6 = 0, então a reta cruza o eixo x em 2." |
| `treino-raiz-3x-6-am2` | −2 | não | "Cuidado com o sinal: 3x = 6, então x = 2, não −2." |

#### M2 — `treino-constante-5`
- **Enunciado:** "Quantas raízes reais tem f(x) = 0x + 5?"
- **Figura:** nenhuma
- **Conta de conferência:** 0x+5=5≠0 para todo x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-constante-5-nenhuma` | Nenhuma | **sim** | "Isso. A reta deitada em y = 5 nunca encosta no eixo x." |
| `treino-constante-5-uma` | Uma | não | "Com a = 0 a saída é sempre 5 e nunca zera. Não há raiz." |
| `treino-constante-5-duas` | Duas | não | "Com a=0 e b=5, a saída é sempre 5; portanto não há raiz." |
| `treino-constante-5-infinitas` | Infinitas | não | "Infinitas seria se a saída fosse sempre 0. Ela é sempre 5, então não há raiz." |

#### M3 — `treino-lei-do-grafico`
- **Enunciado:** "A reta do gráfico passa por (0; 1) e (1; 3). Qual é a lei da função?"
- **Figura:** `plano_figura` — curvas: curva 0 (tipo=afim; a=2; b=1; cor=c3); ponto (x=1); marcar (interceptoY=true); estática.
- **Conta de conferência:** b=1; a=(3−1)/(1−0)=2; f(x)=2x+1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-lei-do-grafico-f2x1` | f(x) = 2x + 1 | **sim** | "Exato. Corta o eixo y em 1, então b = 1; andando 1 sobe 2, então a = 2." |
| `treino-lei-do-grafico-fx3` | f(x) = x + 3 | não | "Assim f(0) seria 3, mas a reta corta o eixo y em 1. Saindo de 1 e subindo 2 por passo: f(x) = 2x + 1." |
| `treino-lei-do-grafico-f3x1` | f(x) = 3x + 1 | não | "3 é a saída em x = 1, não a subida. De 1 para 3 a saída sobe 2: f(x) = 2x + 1." |
| `treino-lei-do-grafico-fx2` | f(x) = x + 2 | não | "Com a = 1 a reta subiria 1 por passo, mas ela sobe 2. A lei é f(x) = 2x + 1." |

### Desafios

#### D1 — `treino-duas-maquinas`
- **Enunciado:** "Para qual entrada f(x) = x e g(x) = 2x + 1 dão a mesma saída?"
- **Figura:** nenhuma
- **Conta de conferência:** x=2x+1 ⇒ x=−1; ambas as saídas são −1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-duas-maquinas-am1` | −1 | **sim** | "Isso. f(−1) = −1 e g(−1) = −2 + 1 = −1." |
| `treino-duas-maquinas-a1` | 1 | não | "Com x = 1, f dá 1 e g dá 3. Resolvendo x = 2x + 1, sai x = −1." |
| `treino-duas-maquinas-a0` | 0 | não | "Com x = 0, f dá 0 e g dá 1. As saídas coincidem em x = −1." |
| `treino-duas-maquinas-nunca` | Nunca | não | "As inclinações são diferentes, então as retas se cruzam. x = 2x + 1 dá x = −1." |

#### D2 — `treino-zero-zero`
- **Enunciado:** "Quantas raízes reais tem f(x) = 0x + 0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Pense no que essa máquina faz com qualquer entrada."
- **Conta de conferência:** 0x+0=0 para todo x real.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-zero-zero-nenhuma` | Nenhuma | não | "Aqui a saída é 0 para toda entrada. Então todo x é raiz: infinitas." |
| `treino-zero-zero-uma` | Uma | não | "Uma raiz só acontece com a diferente de zero. Com a = b = 0, todo x zera a saída: infinitas." |
| `treino-zero-zero-duas` | Duas | não | "A reta é o próprio eixo x. Todo x é raiz: infinitas." |
| `treino-zero-zero-infinitas` | Infinitas | **sim** | "Exato. A reta coincide com o eixo x, então qualquer entrada zera a saída." |

#### D3 — `treino-dois-pontos`
- **Enunciado:** "Uma reta passa por (1; 5) e (3; 9). Quanto vale f(0)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Primeiro descubra quanto a reta sobe a cada passo de 1."
- **Conta de conferência:** a=(9−5)/(3−1)=2; b=5−2=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-dois-pontos-a2` | 2 | não | "2 é a subida por passo: 4 em 2 passos. Voltando um passo de (1; 5), f(0) = 5 − 2 = 3." |
| `treino-dois-pontos-a5` | 5 | não | "5 é f(1). Voltando um passo, a saída perde a = 2: f(0) = 3." |
| `treino-dois-pontos-a4` | 4 | não | "4 é a subida total, em 2 passos. Por passo são 2, e f(0) = 5 − 2 = 3." |
| `treino-dois-pontos-a3` | 3 | **sim** | "Certo. Sobe 2 por passo, então de x = 1 para x = 0 a saída cai 2: f(0) = 3." |

#### D4 — `treino-taxi`
- **Enunciado:** "Um táxi cobra R$ 5 fixos mais R$ 2 por km. Quanto custa uma corrida de 10 km?"
- **Figura:** nenhuma
- **Fala do Paco:** "Aqui x é distância, então o modelo só vale para x maior ou igual a zero."
- **Conta de conferência:** 5+2·10=25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-taxi-r25` | R$ 25 | **sim** | "Exato. f(x) = 2x + 5, e f(10) = 20 + 5 = 25." |
| `treino-taxi-r20` | R$ 20 | não | "Faltou a parte fixa. f(x) = 2x + 5, então f(10) = 20 + 5 = 25." |
| `treino-taxi-r52` | R$ 52 | não | "Você trocou os papéis: 5 por km e 2 fixos. O certo é 2·10 + 5 = 25." |
| `treino-taxi-r17` | R$ 17 | não | "Somar 10 + 2 + 5 não usa o preço por km. São 2 reais a cada km: 2·10 + 5 = 25." |

#### D5 — `treino-raiz-por-pontos`
- **Enunciado:** "Uma função afim tem f(1) = 1 e f(3) = −3. Qual é a raiz?"
- **Figura:** nenhuma
- **Fala do Paco:** "Última. Ache a, depois b, e só então a raiz."
- **Conta de conferência:** a=(−3−1)/(3−1)=−2; b=3; −2x+3=0 ⇒ x=3/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-raiz-por-pontos-am2` | −2 | não | "−2 é o a: cai 4 em 2 passos. Com b = 3, a raiz sai de −2x + 3 = 0: x = 3/2." |
| `treino-raiz-por-pontos-a3` | 3 | não | "3 é o b, o valor de f(0). A raiz pede −2x + 3 = 0, então x = 3/2." |
| `treino-raiz-por-pontos-a3m2` | −3/2 | não | "Cuidado com o sinal: −2x + 3 = 0 dá x = 3/2, positivo." |
| `treino-raiz-por-pontos-a3d2` | 3/2 | **sim** | "Isso. a = −2, b = 3, e −2x + 3 = 0 dá x = 3/2." |

### Vestibular

#### V1 — `treino-enem-2014-taxi`
- **Enunciado (resumido):** "Táxi A: R$ 3,45 fixos + R$ 2,05 por km; táxi B: R$ 3,60 + R$ 1,90 por km. Em 6 km, qual a diferença entre os custos médios por km?"
- **Figura:** nenhuma
- **Fala do Paco:** "Custo médio por km é o total da corrida dividido pelos km rodados."
- **Fonte:** ENEM 2014 PPL (adaptada) — **Adaptação:** Questão 159: enunciado resumido, mantidas as alternativas e o gabarito (0,13). — **URL:** https://plataformaassaad.com.br/questao-159-caderno-branco-6-enem-2014-ppl/
- **Conta de conferência:** A=3,45+2,05·6=15,75; B=3,60+1,90·6=15; (A−B)/6=0,125≈0,13.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-enem-2014-taxi-a075` | 0,75 | não | "0,75 é a diferença dos totais, 15,75 − 15,00. Por km divide-se por 6: 2,625 − 2,50 ≈ 0,13." |
| `treino-enem-2014-taxi-a045` | 0,45 | não | "Os custos médios são 15,75 ÷ 6 = 2,625 e 15,00 ÷ 6 = 2,50. A diferença é cerca de 0,13." |
| `treino-enem-2014-taxi-a038` | 0,38 | não | "Confira os totais: A dá 15,75 e B dá 15,00. Por km: 2,625 − 2,50 ≈ 0,13." |
| `treino-enem-2014-taxi-a033` | 0,33 | não | "A diferença por km é a dos totais dividida por 6: 0,75 ÷ 6 ≈ 0,13." |
| `treino-enem-2014-taxi-a013` | 0,13 | **sim** | "Exato. A custa 15,75 e B 15,00; por km, 2,625 − 2,50 = 0,125 ≈ 0,13." |

#### V2 — `treino-cefetmg-2015-taxi`
- **Enunciado (resumido):** "Um táxi cobra R$ 5,00 por corrida mais R$ 2,00 por km e arrecadou R$ 410,00 em 10 corridas. Qual a média de km por corrida?"
- **Figura:** nenhuma
- **Fala do Paco:** "Cada corrida paga a parte fixa: são 10 vezes R$ 5,00."
- **Fonte:** Cefet-MG 2015 (adaptada) — **Adaptação:** Enunciado resumido; alternativas e gabarito (18) mantidos. — **URL:** https://www.todamateria.com.br/exercicios-de-funcao-afim/
- **Conta de conferência:** Taxas fixas=10·5=50; km totais=(410−50)/2=180; média=180/10=18.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-cefetmg-2015-taxi-a14` | 14 | não | "As 10 corridas pagam 50 de parte fixa; sobram 360, que são 180 km. Em média, 18 km." |
| `treino-cefetmg-2015-taxi-a16` | 16 | não | "Tire os 10 × 5 = 50 fixos: 360 ÷ 2 = 180 km no total, ou 18 km por corrida." |
| `treino-cefetmg-2015-taxi-a18` | 18 | **sim** | "Isso. 410 − 50 = 360, que dá 180 km em 10 corridas: 18 km cada." |
| `treino-cefetmg-2015-taxi-a20` | 20 | não | "Perto de 20 sai quando se ignora a parte fixa. Sem os 50 fixos, são 18 km por corrida." |

#### V3 — `treino-enem-2012-equilibrio`
- **Enunciado (resumido):** "A oferta de um produto é QO = −20 + 4P e a demanda é QD = 46 − 2P, sendo P o preço. Qual é o preço de equilíbrio, em que QO = QD?"
- **Figura:** nenhuma
- **Fala do Paco:** "Equilíbrio é onde as duas retas se cruzam, como as máquinas da aula."
- **Fonte:** ENEM 2012 (adaptada) — **Adaptação:** Enunciado resumido, sem o texto de contexto; alternativas e gabarito (11) mantidos. — **URL:** https://www.todamateria.com.br/exercicios-de-funcao-afim/
- **Conta de conferência:** −20+4P=46−2P ⇒ 6P=66 ⇒ P=11; oferta=demanda=24.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-enem-2012-equilibrio-a5` | 5 | não | "Com P = 5, a oferta é 0 e a demanda é 36. Igualando: 6P = 66, P = 11." |
| `treino-enem-2012-equilibrio-a11` | 11 | **sim** | "Exato. 6P = 66 dá P = 11, e as duas quantidades valem 24: é onde as retas se cruzam." |
| `treino-enem-2012-equilibrio-a13` | 13 | não | "Com P = 13, a oferta (32) passa a demanda (20). Igualando: 6P = 66, P = 11." |
| `treino-enem-2012-equilibrio-a23` | 23 | não | "Igualando −20 + 4P = 46 − 2P sai 6P = 66, P = 11. Nesse preço as duas quantidades valem 24." |
| `treino-enem-2012-equilibrio-a33` | 33 | não | "33 é 66 ÷ 2, esquecendo o 4P. Juntando 4P + 2P = 6P, fica P = 11." |

#### V4 — `treino-unicamp-2016-simetria`
- **Enunciado (resumido):** "Seja f(x) = ax + b, com f(4) = 2. Quanto vale f(f(3) + f(5))?"
- **Figura:** nenhuma
- **Fala do Paco:** "Última. Some f(3) e f(5) e compare com f(4)."
- **Fonte:** Unicamp 2016 (adaptada) — **Adaptação:** Enunciado reescrito em uma linha; alternativas e gabarito (2) mantidos. — **URL:** https://www.todamateria.com.br/exercicios-de-funcao-afim/
- **Conta de conferência:** f(3)+f(5)=8a+2b=2f(4)=4; f(f(3)+f(5))=f(4)=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `treino-unicamp-2016-simetria-a5` | 5 | não | "Não precisa achar a e b: f(3) + f(5) = 8a + 2b = 2·f(4) = 4, e f(4) = 2." |
| `treino-unicamp-2016-simetria-a4` | 4 | não | "4 é f(3) + f(5), que vale 2·f(4). Falta aplicar f: f(4) = 2." |
| `treino-unicamp-2016-simetria-a3` | 3 | não | "f(3) + f(5) = 8a + 2b = 2·(4a + b) = 4. Então a resposta é f(4) = 2." |
| `treino-unicamp-2016-simetria-a2` | 2 | **sim** | "Isso. 3 e 5 ficam à mesma distância de 4, então f(3) + f(5) = 2·f(4) = 4, e f(4) = 2." |

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
- [x] Cada questão tem exatamente 1 opção certa e 2 a 4 opções (vestibular 2 a 5).
- [x] Todo feedback de opção errada **contém a resposta certa**.
- [x] Cada distrator corresponde a um erro típico nomeado no feedback.
- [x] Toda questão tem conta de conferência, e a conta bate com o gabarito.
- [x] Vestibular: questões reais, conferidas na URL, fonte "Banca Ano (adaptada)", adaptação descrita, fala do Paco presente.

**Texto**
- [x] Toda fala, enunciado e feedback com ≤ 140 caracteres e ≤ 2 frases; sem emoji; sem termos proibidos.
- [x] Números pequenos, de cabeça; notação do app (−, vírgula decimal, ·, ², (x; y)).


**Conferência editorial:** quatro questões de vestibular espelhadas do JSON; enunciados, alternativas e respostas conferidos nas URLs acima.

**Precisão em M2:** o feedback distingue a reta y=5, sem raízes, da reta y=0, que possui infinitas; o JSON não foi alterado.
