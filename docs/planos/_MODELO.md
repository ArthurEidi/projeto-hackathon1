# MODELO DE PLANO DE CAPÍTULO

> **Para que serve:** este é o modelo canônico que todo plano em `docs/planos/<unidade>.md` segue. Um plano preenchido aqui vira o JSON da aula **sem decisões novas**: quem implementar só traduz.
> **Leia antes:** `docs/METODO.md` (os 7 pilares), `docs/GUIA-CAPITULOS.md` (formato do JSON e widgets) e a aula modelo `content/algebra/funcoes/funcao-afim/aula-01.json` (+ Cones em `content/geometria/geometria-espacial/cones/aula-01.json`).
> **Como usar:** copie tudo da linha `# Plano — <Unidade>` até o fim da seção i) para `docs/planos/<id-da-unidade>.md`, troque cada `<...>` e apague as linhas de instrução (as que começam com `>`). O id da unidade é o mesmo da taxonomia (`content/taxonomy.json`).

---

## Regras que valem para o plano inteiro

**Texto (o lint recusa o que violar):**
- Toda fala, enunciado e feedback tem **no máximo 140 caracteres e 2 frases**. "R$ 3,45 fixos. Táxi B…" já conta como duas frases; use ";" para juntar.
- Sem emoji. Proibido: "vamos mergulhar", "fascinante", "desvende", "jornada", "mágico/mágica", "é importante notar", "prepare-se".
- Tom de Cones e Afim: conversacional e investigativo, **pergunta antes da resposta**. A fala de abertura do passo pergunta ou pede uma previsão; a fala de conclusão responde com o porquê. Números pequenos, calculáveis de cabeça.
- Matemática no texto: sinal de menos tipográfico `−`, vírgula decimal (`2,5`), multiplicação `·`, potência `x²`, coordenadas `(2; 3)`.

**Cores (marcas):** cada grandeza do capítulo recebe uma marca fixa, usada no slider, no rótulo do gráfico, na letra da fórmula e na dica. `c1` azul, `c2` laranja, `c3` rosa, `c4` violeta (`h/r/g` são reservadas ao cone). Toda marca usada precisa de entrada no **glossário** (nome + resumo de 1 frase). O que não tem significado leva `ink` (cinza escuro) ou `muted` (cinza claro).

**Widgets disponíveis hoje** (detalhes em GUIA §5):
| Widget (passo interativo) | Figura (desafio, fechamento, treino) | Serve para |
|---|---|---|
| `plano_cartesiano` | `plano_figura` | funções (afim, quadrática, modular, exponencial, logaritmo, seno, cosseno), retas, encontros, raízes, quadrantes |
| `reta_numerica` | `reta_figura` | conjuntos, intervalos, inequações, módulo |
| `revolution`, `generatrix` | `cone_figure` | só Cones |

Precisa de algo que não existe (ciclo trigonométrico, polígono arrastável, sólido 3D, barras, árvore)? Escreva **"WIDGET NOVO: <nome>"** no passo, descreva o que ele desenha, o que o aluno manipula e qual métrica emite. O coordenador decide quem faz.

**Métricas para a condição de conclusão (`complete_when`, sempre `≥` e/ou `≤` um número):**
- Qualquer slider, pelo id (ex.: `a ≥ 2`, `a ≤ −1`). O valor inicial do slider **não** pode já cumprir a condição.
- `plano_cartesiano`: `ponto_x`, `quadrantes` (0–4 visitados), `faixa_x` (largura percorrida), `na_raiz` (0/1), `no_encontro` (0/1, curvas 0 e 1).
- `reta_numerica`: `ponto_x`, `dentro` (0/1), `faixa_x`.

---

# Plano — <Unidade>

> Título da aula e subtítulo como na taxonomia. Uma aula por plano; se a unidade tiver várias aulas, faça um plano por aula (`<unidade>-aula-02.md`).

**Aula:** <número> — <Título> · <Subtítulo>
**Caminho:** <pilar> / <setor> / <unidade>
**Pré-requisitos que o aluno já domina:** <ex.: regra de sinais, Pitágoras> (o pilar 6 se apoia neles)

## a) Ancoragem mecânica
> O conceito como máquina: entrada → processamento → saída. Diga quem é a variável independente (o que o aluno controla) e quem é a dependente (o que sofre a ação). 2 a 4 frases.

<texto>

## b) Visual de partida
> O palco onde tudo acontece **antes** de qualquer fórmula: qual widget, o que aparece na tela, o que o aluno manipula, faixas dos sliders. A figura é o ponto de partida, não o resultado de uma conta.

<texto>

## c) Caso neutro
> O caso em que a máquina não altera nada (ex.: f(x) = x, a = 1, b = 0; ângulo 0; conjunto vazio). Diga como ele aparece na tela (curva fantasma, valor inicial) e qual efeito será isolado depois, um de cada vez.

<texto>

## d) Panorama e recorte
> Mapa do território em 1–2 frases (as variações e os temas vizinhos) e o recorte desta aula. Isto vira **uma** fala da aula (em geral a dúvida da Tati no 1º passo).

<texto>

## e) Progressão por contraste
> Lista numerada do simples ao complexo. Cada item diz **o que muda em relação ao anterior** e o que o aluno deve notar. O primeiro item é a estrutura de referência (ex.: a reta) que fica visível como fantasma.

1. <…>
2. <…>

## f) Dedução causal da forma
> Por que o desenho é inevitável, usando só o que o aluno já sabe. Nada de "regra pronta". Termine com a fórmula que o fechamento vai mostrar.

<texto>

## g) Simulação espacial e fronteiras
> O que o aluno arrasta para testar os limites: quadrantes percorridos, casos com 0, 1 ou infinitas soluções, onde a regra deixa de valer (domínio, a = 0, base 1…), restrições do mundo real (tempo ≥ 0).

<texto>

## h) Roteiro da aula

> **Forma obrigatória** (espelha Cones e Afim): de **4 a 8 passos**; o 1º é `interactive_canvas` (visual primeiro); pelo menos um `micro_challenge`; o último é `concept_lock`. `manim_video` é opcional (só se uma animação explicar o que a interação não explica). Ids de passo em minúsculas com hífen. Cada pilar de a)–g) precisa aparecer em algum passo: indique na linha "Pilares".
> **Dúvida da Tati:** no máximo uma por passo; é a pergunta que o aluno faria. `fim` aparece depois do passo concluído; `início` aparece já na abertura (no fechamento só existe `início`). Use-a para o panorama (d) e para as fronteiras (g).

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase, ≤ 140 caracteres com o nome) |
|---|---|---|
| c1 | <ex.: Coeficiente a> | <ex.: Quanto a saída muda quando a entrada anda 1.> |
| c2 | <…> | <…> |

### Passo 1 — `<id>`
- **Tipo:** `interactive_canvas`
- **Pilares:** <ex.: 3 (caso neutro), 4 (panorama na dúvida)>
- **Widget:** `<plano_cartesiano | reta_numerica | WIDGET NOVO: …>` — <o que aparece: curvas com tipo, coeficientes e cor; fantasma; ponto (início, passo); triângulo; marcações>
- **Sliders:** <id · rótulo · mín..máx · passo inteiro · inicial · marca> ou "nenhum"
- **Paco (abertura):** "<pergunta ou pedido de previsão + o que fazer>"
- **Interação do aluno:** <o que ele arrasta/move e o que vê mudar>
- **Conclusão:** `<métrica> ≥ <valor>` (ou `≤`)
- **Paco (conclusão):** "<resposta da pergunta + o porquê>"
- **Tati (dúvida, opcional):** `<fim|início>` — P: "<pergunta do aluno>" / R: "<resposta do Paco>"

### Passo 2 — `<id>`
> Repita o bloco do Passo 1 para cada passo interativo.

### Passo N−1 — `<id>` (desafio)
- **Tipo:** `micro_challenge`
- **Pilares:** <…>
- **Figura:** `<plano_figura | reta_figura>` — <estado inicial>
- **Paco (abertura):** "<…>"
- **Enunciado:** "<…>"
- **Opções** (2 a 4, exatamente 1 certa; o aluno pode tentar de novo, então o feedback do erro explica o erro):

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `<id>` | <…> | não | "<qual erro foi cometido + caminho certo>" | <ex.: liga a raiz e destaca c4 / mostra o triângulo / põe o ponto em x = 0> |
| `<id>` | <…> | **sim** | "<confirma e diz por quê>" | <…> |

- **Tati (dúvida, opcional):** `fim` — P: "<…>" / R: "<…>"

### Passo N — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo)
- **Figura:** `<plano_figura | …>` — <estado que mostra todos os elementos da fórmula>
- **Fórmula:** <tokens em ordem; letras tocáveis com a marca, ex.: `f(x)`→c3 · `=` · `a`→c1 · `x` · `+` · `b`→c2>
- **Definições** (até 3): "<Termo>: <texto>"
- **Paco (abertura):** "<a frase-síntese com 'por isso'>"
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."
- **Tati (dúvida, opcional):** `início` — P / R

**Frase de encerramento (outro):** "<o que o aluno fez e descobriu, ≤ 140 caracteres>"

## i) Treino pós-aula

> **Estrutura fixa do app:** 4 fáceis + 3 médias (etapa básica, 7 perguntas), 5 desafios, 4 de vestibular. Nada a mais, nada a menos.
> **Sem segunda tentativa no treino:** o feedback de **toda opção errada diz a resposta certa** (com a conta curta). O feedback da certa confirma e diz por quê.
> **Distratores = erros típicos**, cada um diagnosticado: trocar papéis (a por b), esquecer um termo, errar o sinal, parar no meio da conta (dar x² em vez de x), confundir com o conceito vizinho.
> **Opções:** 2 a 4 (vestibular 2 a 5), exatamente 1 certa, sem "todas as anteriores". Rótulos curtos; até 4 caracteres viram grade, maiores viram lista.
> **Figura no treino:** opcional e **estática** (não reage à resposta; quem reage é só o desafio da aula). Use quando ler o gráfico faz parte da pergunta.
> **Fala do Paco:** opcional nas fáceis/médias (há uma fala padrão), recomendada nos desafios quando houver uma dica útil, **obrigatória no vestibular** (vocabulário da prova, o que separar primeiro).
> **Conta de conferência:** toda questão traz a conta que prova o gabarito; ela vira o teste automático do capítulo.
> **Níveis:** fáceis = reconhecer o que o aluno fez na aula ("lembra do ponto que você arrastou?"); médias = uma conta direta; desafios = um passo a mais (inverter, combinar dois dados, caso de fronteira, resposta não inteira); vestibular = questão real.

### Fáceis

#### F1 — `<id>`
- **Enunciado:** "<…>"
- **Figura (opcional):** <widget + estado> ou "nenhuma"
- **Fala do Paco (opcional):** "<…>"
- **Conta de conferência:** <…>

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `<id>` | <…> | não | "<diagnóstico do erro + resposta certa>" |
| `<id>` | <…> | **sim** | "<confirmação + porquê>" |
| `<id>` | <…> | não | "<…>" |
| `<id>` | <…> | não | "<…>" |

#### F2 — `<id>` · F3 — `<id>` · F4 — `<id>`
> Mesmo bloco.

### Médias
#### M1 — `<id>` · M2 · M3
> Mesmo bloco.

### Desafios
#### D1 — `<id>` · D2 · D3 · D4 · D5
> Mesmo bloco. Inclua pelo menos um caso de fronteira (pilar 7) e uma resposta não inteira, quando o tema permitir. O D5 é o mais longo.

### Vestibular
> Só questões **reais** de vestibular ou ENEM, conferidas na fonte (enunciado, alternativas e gabarito). Nunca invente nem "complete" uma questão. Se não conseguir conferir, escreva **PENDENTE-FONTE** e siga em frente.
> O enunciado quase sempre precisa ser resumido para caber em 140 caracteres e 2 frases: então `adaptada: sim`, e o app mostra **"Banca Ano (adaptada)"**. Mantenha as alternativas originais (2 a 5) e o gabarito oficial; se mudou alternativas, diga em "Adaptação".
> Ordem: da mais fácil para a mais longa.

#### V1 — `<id>` (ex.: `enem-2014-taxi`)
- **Enunciado (resumido):** "<…>"
- **Fala do Paco:** "<…>"
- **Fonte:** <Banca> <Ano> <edição opcional, ex.: PPL> (adaptada) — **Adaptação:** <o que mudou: ex. "enunciado resumido; alternativas e gabarito mantidos"> — **URL(s):** <link onde o enunciado e o gabarito foram conferidos>
- **Conta de conferência:** <…>

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `<id>` | <…> | não | "<…>" |
| `<id>` | <…> | **sim** | "<…>" |

#### V2 · V3 · V4
> Mesmo bloco.

---

# Exemplo preenchido (trecho real de Função Afim · Aula 01)

> Recorte de `content/algebra/funcoes/funcao-afim/aula-01.json`: 2 passos e 1 questão de cada nível. Use como régua de tom, tamanho e precisão.

**Aula:** 1 — A Reta Viva · Inclinação, deslocamento e raiz
**Caminho:** algebra / funcoes / funcao-afim

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Coeficiente a | Quanto a saída muda quando a entrada anda 1. |
| c2 | Coeficiente b | A saída quando a entrada é zero: onde a reta corta o eixo y. |
| c3 | Gráfico de f | Todos os pontos (x, f(x)) que a máquina produz. |
| c4 | Raiz | Entrada que faz a saída valer zero. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 3 (caso neutro), 4 (panorama na dúvida), 7 (quadrantes)
- **Widget:** `plano_cartesiano` — curva afim a = 1, b = 0, cor c3, rótulo "y = x"; ponto arrastável começando em x = 1, passo 0,5; quadrantes marcados
- **Sliders:** nenhum
- **Paco (abertura):** "Esta máquina devolve a entrada sem mexer: f(x) = x. Arraste o ponto para os dois lados e veja onde a saída vai parar."
- **Interação do aluno:** arrasta o ponto pela reta; as coordenadas aparecem e os quadrantes visitados ficam tingidos.
- **Conclusão:** `quadrantes ≥ 2`
- **Paco (conclusão):** "Entrada 3, saída 3; entrada −2, saída −2. Sem nada agindo, a máquina desenha a diagonal."
- **Tati (dúvida):** `fim` — P: "Toda função vira uma reta assim?" / R: "Não: existem parábolas, exponenciais e muitas outras. Hoje ficamos nas retas, as funções afins."

### Passo 3 — `multiplicar-a`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (a como agente), 5 (contraste com a fantasma), 6 (taxa constante ⇒ reta)
- **Widget:** `plano_cartesiano` — fantasma y = x; curva afim a = "$a", b = 0, cor c3; triângulo "anda 1, sobe a" em x = 0, cor c1
- **Sliders:** `a` · "Multiplica por a" · −4..4 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Agora a entrada é multiplicada por a. Leve a até 2: andando 1 para a direita, quanto a saída sobe?"
- **Interação do aluno:** move o slider; a reta gira em torno da origem e o lado vertical do triângulo mostra +2.
- **Conclusão:** `a ≥ 2`
- **Paco (conclusão):** "Sobe 2 a cada passo de 1, em qualquer lugar. Como a subida por passo nunca muda, o desenho só pode ser reto."
- **Tati (dúvida):** `fim` — P: "Por que não sai uma curva?" / R: "Curva seria a subida mudar no caminho. Aqui todo passo de 1 soma o mesmo a, então a inclinação é constante."

### F1 — `f-de-zero`
- **Enunciado:** "Em f(x) = 2x + 1, quanto vale f(0)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2·0 + 1 = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | não | "Com x = 0 o termo 2x some, mas o b fica. f(0) = 1." |
| `a1` | 1 | **sim** | "Isso. Com entrada zero, sobra só o ponto de partida b." |
| `a2` | 2 | não | "2 é o a, que multiplica a entrada. Com x = 0 sobra b: f(0) = 1." |
| `a3` | 3 | não | "3 é f(1). Com x = 0 o 2x some, e f(0) = 1." |

### M1 — `raiz-3x-6`
- **Enunciado:** "Em f(x) = 3x − 6, qual é a raiz?"
- **Figura:** `plano_figura` — afim a = 3, b = −6, cor c3, rótulo "f(x) = 3x − 6", y de −7 a 3
- **Conta de conferência:** 3x − 6 = 0 ⇒ x = 2

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `am6` | −6 | não | "−6 é f(0), onde a reta corta o eixo y. A raiz pede saída zero: 3x − 6 = 0, x = 2." |
| `a3` | 3 | não | "3 é o a. Para a raiz, resolva 3x − 6 = 0: x = 2." |
| `a2` | 2 | **sim** | "Certo. 3·2 − 6 = 0, então a reta cruza o eixo x em 2." |
| `am2` | −2 | não | "Cuidado com o sinal: 3x = 6, então x = 2, não −2." |

### D4 — `taxi`
- **Enunciado:** "Um táxi cobra R$ 5 fixos mais R$ 2 por km. Quanto custa uma corrida de 10 km?"
- **Fala do Paco:** "Aqui x é distância, então o modelo só vale para x maior ou igual a zero." (pilar 7: restrição do mundo real)
- **Conta de conferência:** f(x) = 2x + 5 ⇒ f(10) = 25

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r25` | R$ 25 | **sim** | "Exato. f(x) = 2x + 5, e f(10) = 20 + 5 = 25." |
| `r20` | R$ 20 | não | "Faltou a parte fixa. f(x) = 2x + 5, então f(10) = 20 + 5 = 25." |
| `r52` | R$ 52 | não | "Você trocou os papéis: 5 por km e 2 fixos. O certo é 2·10 + 5 = 25." |
| `r17` | R$ 17 | não | "Somar 10 + 2 + 5 não usa o preço por km. São 2 reais a cada km: 2·10 + 5 = 25." |

### V1 — `enem-2014-taxi`
- **Enunciado (resumido):** "Táxi A: R$ 3,45 fixos + R$ 2,05 por km; táxi B: R$ 3,60 + R$ 1,90 por km. Em 6 km, qual a diferença entre os custos médios por km?"
- **Fala do Paco:** "Custo médio por km é o total da corrida dividido pelos km rodados."
- **Fonte:** ENEM 2014 PPL (adaptada) — **Adaptação:** questão 159; enunciado resumido, alternativas e gabarito (0,13) mantidos — **URL:** https://plataformaassaad.com.br/?p=27879
- **Conta de conferência:** A = 3,45 + 2,05·6 = 15,75 ⇒ 2,625/km; B = 3,60 + 1,90·6 = 15,00 ⇒ 2,50/km; diferença 0,125 ≈ 0,13

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a075` | 0,75 | não | "0,75 é a diferença dos totais, 15,75 − 15,00. Por km divide-se por 6: 2,625 − 2,50 ≈ 0,13." |
| `a045` | 0,45 | não | "Os custos médios são 15,75 ÷ 6 = 2,625 e 15,00 ÷ 6 = 2,50. A diferença é cerca de 0,13." |
| `a038` | 0,38 | não | "Confira os totais: A dá 15,75 e B dá 15,00. Por km: 2,625 − 2,50 ≈ 0,13." |
| `a033` | 0,33 | não | "A diferença por km é a dos totais dividida por 6: 0,75 ÷ 6 ≈ 0,13." |
| `a013` | 0,13 | **sim** | "Exato. A custa 15,75 e B 15,00; por km, 2,625 − 2,50 = 0,125 ≈ 0,13." |

---

# Checklist de qualidade (marque tudo antes de entregar o plano)

**Método (METODO.md)**
- [ ] Os 7 pilares a)–g) estão escritos **e** cada um aparece em pelo menos um passo (linha "Pilares").
- [ ] A aula abre com a figura viva (passo `interactive_canvas`), não com fórmula nem definição.
- [ ] O caso neutro aparece na tela e é **nomeado numa fala**.
- [ ] O panorama ocupa uma única fala (em geral a dúvida da Tati) e o recorte fica claro.
- [ ] O contraste mostra o "antes" na tela (curva fantasma ou valor de referência).
- [ ] A fórmula do fechamento foi **deduzida** antes (há uma fala com "por isso" ou "como … então").
- [ ] Há teste de fronteira: quadrantes, 0/1/infinitas soluções, domínio ou restrição real.

**Roteiro**
- [ ] De 4 a 8 passos; 1º é `interactive_canvas`, último é `concept_lock`, há pelo menos um `micro_challenge`.
- [ ] Toda abertura pergunta ou pede previsão; toda conclusão responde com o porquê.
- [ ] Cada passo interativo tem conclusão com métrica existente e alcançável (valor inicial não cumpre; arraste com passo que acerta o valor exato).
- [ ] No desafio, cada opção errada tem feedback que diagnostica o erro e uma mudança de figura que mostra o erro.
- [ ] Toda marca c1..c4 usada tem linha no glossário; o que não tem significado é `ink`/`muted`.
- [ ] Widget inexistente está marcado como **WIDGET NOVO** com o que desenha, o que o aluno manipula e a métrica.

**Treino**
- [ ] Exatamente 4 fáceis, 3 médias, 5 desafios, 4 vestibular; ids únicos, minúsculos, com hífen.
- [ ] Cada questão tem exatamente 1 opção certa e 2 a 4 opções (vestibular 2 a 5).
- [ ] Todo feedback de opção errada **contém a resposta certa**.
- [ ] Cada distrator corresponde a um erro típico nomeado no feedback.
- [ ] Toda questão tem conta de conferência, e a conta bate com o gabarito.
- [ ] Vestibular: questões reais, conferidas na URL, fonte "Banca Ano (adaptada)", adaptação descrita, fala do Paco presente.

**Texto**
- [ ] Toda fala, enunciado e feedback com ≤ 140 caracteres e ≤ 2 frases; sem emoji; sem termos proibidos.
- [ ] Números pequenos, de cabeça; notação do app (−, vírgula decimal, ·, ², (x; y)).
