# Plano — Vistas, projeções, cortes e planificações

**Aula:** 1 — Desmontar e Fatiar o 3D · Vistas ortogonais, cortes planos e moldes
**Caminho:** geometria / geometria-espacial / projecoes-cortes-e-planificacoes
**Pré-requisitos que o aluno já domina:** `posicoes-relativas-no-espaco`, `poligonos-e-quadrilateros`.

## a) Ancoragem mecânica
Três máquinas conectam o sólido 3D ao plano 2D: a **projeção ortogonal** achata o objeto contra uma parede (frente, topo ou lado), zerando a profundidade daquele eixo; o **plano de corte** funciona como uma lâmina que fatia o sólido e revela a figura plana do interior; e a **planificação** gira todas as faces pelas arestas-dobradiça até espalhá-las numa única folha sem rasgar nem sobrepor.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo vistas, corte e molde) — palco principal com sólido 3D (cubo, pirâmide, cilindro ou bloco em L), três painéis de sombra ortogonal (vista frontal, superior e lateral), slider de plano de corte e slider de abertura da planificação (de `0%` fechado a `100%` aberto no chão).

## c) Caso neutro
Um cubo apoiado de frente: suas três vistas ortogonais (frente, cima e lado) são exatamente o mesmo quadrado, todo corte paralelo à base também dá o mesmo quadrado, e sua planificação padrão em cruz exibe os 6 quadrados iguais ligados por 5 dobras.

## d) Panorama e recorte
O tema abrange vistas técnicas (frontal, superior, lateral), projeção de caminhos sobre faces, seções planas (paralelas, meridianas e inclinadas) e moldes de poliedros e corpos redondos. Aqui focamos em ler as 3 vistas, prever a figura de um corte e identificar quais faces ficam opostas ao dobrar um molde.

## e) Progressão por contraste
1. Cubo: vista frontal, superior e lateral são todas quadradas (referência simétrica).
2. Cilindro e cone em pé: vista superior é círculo, mas vista frontal é retângulo (no cilindro) ou triângulo (no cone).
3. Corte paralelo à base da pirâmide (gera polígono semelhante menor) contra corte passando pelo vértice (gera triângulo).
4. Molde em cruz que fecha o cubo (6 faces sem colisão) contra molde com 4 faces em linha e 2 abas do mesmo lado (sobrepõe uma tampa e deixa a outra aberta).

## f) Dedução causal da forma
Ao dobrar uma planificação em `90°` a cada aresta, duas faces separadas por uma face intermediária (pula 1 quadrado na fita) ficam paralelas e **opostas** no cubo fechado. Na vista ortogonal, raios de luz perpendiculares à parede ignoram o relevo que vem na direção do observador: por isso uma rampa inclinada ou uma face curva de cilindro projetam um simples retângulo na vista frontal.

## g) Simulação espacial e fronteiras
Testar moldes inválidos mostra a fronteira geométrica: ter 6 quadrados **não basta** para formar um cubo (existem só 11 planificações válidas; se duas abas caem na mesma posição, uma face fica dupla e outra vazia). Nos cortes do cubo, um plano pode tocar 3 arestas (corte triangular no canto), 4 (quadrilátero) ou até 6 faces (corte hexagonal pelo centro).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Vista ortogonal | Sombra do sólido olhada de frente, de cima ou de lado. |
| c2 | Seção de corte | Figura plana que nasce onde o plano fatia o sólido. |
| c3 | Planificação | Molde 2D de todas as faces abertas pelas arestas. |
| c4 | Faces opostas | Par de faces que ficam frente a frente ao fechar o molde. |

### Passo 1 — `tres-vistas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — cubo inicial (caso neutro: 3 sombras quadradas) que alterna para cilindro e pirâmide; câmera trava nas posições Frente (`0°`), Lado (`90°`) e Topo (`90°` vertical) em `c1`. Emite `vistas_visitadas`.
- **Sliders:** nenhum
- **Paco (abertura):** "No cubo, frente, topo e lado dão sempre um quadrado. E na pirâmide de base quadrada: o que aparece olhando de cima e de frente? Gire pelas 3 vistas."
- **Interação do aluno:** visita as vistas frontal, lateral e superior, vendo o triângulo virar um quadrado com um X visto de cima.
- **Conclusão:** `vistas_visitadas ≥ 3`
- **Paco (conclusão):** "De frente é triângulo; de cima é o quadrado da base com as 4 arestas encontrando o vértice no centro."
- **Tati (dúvida):** `fim` — P: "Por que a gente estuda sombra, corte e molde juntos?" / R: "São os três jeitos de traduzir um objeto 3D para o papel 2D: olhar de fora, fatiar por dentro ou abrir a casca."

### Passo 2 — `plano-de-corte`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste)
- **Widget:** WIDGET NOVO: `solido_3d` — pirâmide quadrangular sendo cortada por um plano horizontal (`c2`); chave alterna entre corte horizontal (quadrado) e corte vertical pelo topo (triângulo).
- **Sliders:** `altura_corte` · "Altura do corte" · 1..3 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Fatie a pirâmide paralelamente à base e suba a lâmina: o formato do corte muda ou só encolhe?"
- **Interação do aluno:** move a altura do corte e vê quadrados cada vez menores até perto do vértice.
- **Conclusão:** `altura_corte ≥ 3`
- **Paco (conclusão):** "Paralelo à base, o corte imita a base em miniatura; já se a lâmina descer pelo vértice, o corte vira triângulo."

### Passo 3 — `abrir-e-fechar-molde`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6 (dedução de faces opostas), 7 (fronteira de molde inválido)
- **Widget:** WIDGET NOVO: `solido_3d` — planificação em cruz de um dado numerado de 1 a 6 (`c3`), com pares opostos pintados na mesma cor (`c4`); slider fecha o molde de `0%` a `100%`.
- **Sliders:** `dobrar` · "Dobrar molde" · 0..100 · passo 25 · inicial 0 · c3
- **Paco (abertura):** "Na fita central do molde há 4 quadrados seguidos. Quando dobramos em 90°, quem fica frente a frente com o 1º quadrado?"
- **Interação do aluno:** dobra o molde até 100% e vê que pular 1 casa na linha deixa as duas faces paralelas e opostas.
- **Conclusão:** `dobrar ≥ 100`
- **Paco (conclusão):** "Pular uma casa soma duas dobras de 90°, totalizando 180°: por isso faces que pulam uma casa ficam opostas."
- **Tati (dúvida):** `fim` — P: "Qualquer desenho com 6 quadrados fecha um cubo?" / R: "Não! Se as duas tampas ficarem do mesmo lado da faixa, elas batem na mesma face e o outro lado fica aberto."

### Passo 4 — `desafio-face-oposta`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — planificação em cruz com a fita vertical `[1] - [2] - [3] - [4]` e abas laterais `[5]` e `[6]` presas ao quadrado `[2]`.
- **Paco (abertura):** "Use a regra de pular uma casa na mesma faixa."
- **Enunciado:** "Quando dobrarmos este molde em cruz para fechar o cubo, qual face ficará oposta à face 1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `f3` | Face 3 | **sim** | "Exato. Na fita 1-2-3-4, a face 2 dobra 90° e a 3 fica paralela e oposta à 1." | dobra o molde destacando 1 e 3 frente a frente em `c4` |
| `f2` | Face 2 | não | "A face 2 é vizinha de aresta da 1 (faz 90°). Pulando a 2, a oposta é a 3." | mostra a dobra de 90° entre 1 e 2 |
| `f4` | Face 4 | não | "A face 4 dá a volta e encosta na borda da 1. A oposta à 1 é a 3 (e a 4 é oposta à 2)." | dobra 1, 2, 3 e 4 mostrando 4 vizinha de 1 |
| `f5` | Face 5 | não | "5 e 6 são as abas laterais opostas entre si. Na faixa vertical, a oposta à 1 é a 3." | destaca o par lateral 5-6 |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cilindro e cubo lado a lado com suas vistas (`c1`), corte (`c2`) e planificação (`c3`) indicando faces opostas (`c4`).
- **Fórmula:** `Sólido 3D` · `↔` · `Vistas`→c1 · `+` · `Cortes`→c2 · `+` · `Planificação (opostas pulam 1)`→c4
- **Definições:** "Vista ortogonal: projeção perpendicular sem profundidade." · "Seção plana: figura 2D revelada pelo corte." · "Faces opostas no cubo: ficam separadas por 1 face na mesma fila do molde."
- **Paco (abertura):** "Duas dobras seguidas de 90° somam 180°; por isso, no molde do cubo, pular uma casa na fila garante faces paralelas e opostas."
- **Dica (hint):** "Toque em cada conceito para destacar a vista, o corte ou o molde."

**Frase de encerramento (outro):** "Você leu as 3 sombras ortogonais, fatiou sólidos por dentro e dobrou moldes 2D sem perder a posição das faces."

## i) Treino pós-aula

### Fáceis

#### F1 — `vista-superior-cilindro`
- **Enunciado:** "Uma lata cilíndrica está em pé sobre a mesa. Qual é a sua vista superior (olhando de cima)?"
- **Conta de conferência:** projeção da base circular ⇒ círculo

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `circ` | Um círculo | **sim** | "Isso. Olhando de cima, vemos a tampa circular da lata." |
| `ret` | Um retângulo | não | "Retângulo é a vista frontal da lata em pé. De cima, vemos um círculo." |
| `tri` | Um triângulo | não | "Triângulo é a vista frontal de um cone. A lata vista de cima é um círculo." |

#### F2 — `vista-frontal-cone`
- **Enunciado:** "Um cone circular reto está apoiado pela base numa mesa. Qual é a sua vista frontal?"
- **Conta de conferência:** perfil meridiano do cone ⇒ triângulo isósceles

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tri` | Um triângulo | **sim** | "Certo. De frente, a base vira um segmento e as geratrizes fecham um triângulo." |
| `circ` | Um círculo | não | "Círculo é a vista de cima ou de baixo. De frente, o cone parece um triângulo." |
| `quad` | Um quadrado | não | "O cone afunila até um único vértice no topo: a vista frontal é um triângulo." |

#### F3 — `molde-piramide-quadrada`
- **Enunciado:** "A planificação de uma pirâmide de base quadrada é formada por:"
- **Conta de conferência:** 1 base quadrada + 4 faces laterais triangulares

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `q4t` | 1 quadrado e 4 triângulos | **sim** | "Exato. O quadrado da base cercado pelas 4 faces laterais triangulares." |
| `q3t` | 1 quadrado e 3 triângulos | não | "Cada um dos 4 lados do quadrado precisa de 1 triângulo: são 4 triângulos." |
| `q4r` | 2 quadrados e 4 retângulos | não | "2 quadrados e 4 retângulos formam um prisma. A pirâmide tem 1 quadrado e 4 triângulos." |

#### F4 — `corte-esfera`
- **Enunciado:** "Quando cortamos uma esfera (como uma laranja) com um corte plano reto, a seção formada é sempre:"
- **Conta de conferência:** toda seção plana de esfera é um círculo

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `circ` | Um círculo | **sim** | "Isso. Em qualquer direção ou altura, fatiar uma esfera produz sempre um círculo." |
| `ov` | Um retângulo | não | "A esfera é perfeitamente simétrica: qualquer corte plano gera um círculo." |
| `tri` | Um triângulo | não | "Não há quinas na esfera; todo corte plano nela é um círculo." |

### Médias

#### M1 — `oposta-no-dado`
- **Enunciado:** "Num molde em cruz com a fila `[A]-[B]-[C]-[D]` e abas `[E]` e `[F]` ao lado de `[B]`, qual face fica oposta a `[B]`?"
- **Conta de conferência:** na fila A-B-C-D, A opõe C e B opõe D

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `fd` | D | **sim** | "Certo. Pulando uma casa na fila A-B-C-D, B fica frente a frente com D." |
| `fc` | C | não | "C é vizinha de B (dobra de 90°). Pulando C, a oposta a B é D." |
| `fe` | E | não | "E é aba lateral vizinha de B (oposta a F). A oposta a B é D." |
| `fa` | A | não | "A é vizinha de B e fica oposta a C. A oposta a B é D." |

#### M2 — `corte-vertical-cilindro`
- **Enunciado:** "Um cilindro reto de raio 3 cm e altura 8 cm é cortado verticalmente passando pelo eixo central. Qual é a figura do corte?"
- **Conta de conferência:** largura = diâmetro 2r = 6 cm, altura = 8 cm ⇒ retângulo 6 × 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r68` | Retângulo 6 cm × 8 cm | **sim** | "Exato. A base do corte é o diâmetro 2·3 = 6 cm e a altura é 8 cm." |
| `r38` | Retângulo 3 cm × 8 cm | não | "3 cm é só o raio; o corte atravessa o cilindro todo (diâmetro 6 cm): 6 cm × 8 cm." |
| `c3` | Círculo de raio 3 cm | não | "Círculo é o corte horizontal. O corte vertical pelo eixo é um retângulo 6 cm × 8 cm." |

#### M3 — `molde-prisma-hexagonal`
- **Enunciado:** "Quantos retângulos e quantos hexágonos compõem a planificação de um prisma hexagonal reto?"
- **Conta de conferência:** 2 bases hexagonais + 6 faces laterais retangulares

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r6h2` | 6 retângulos e 2 hexágonos | **sim** | "Isso. 1 retângulo para cada lado do hexágono (6) mais as 2 tampas hexagonais." |
| `r6h1` | 6 retângulos e 1 hexágono | não | "O prisma tem duas bases (fundo e tampa): são 6 retângulos e 2 hexágonos." |
| `r5h2` | 5 retângulos e 2 hexágonos | não | "O hexágono tem 6 lados, então a lateral exige 6 retângulos e 2 hexágonos." |

### Desafios

#### D1 — `dado-soma-7`
- **Enunciado:** "Num dado padrão, faces opostas somam 7. Na fila `[2]-[4]-[x]-[y]` do molde, quanto valem x e y?"
- **Fala do Paco:** "Na fila, a 1ª face fica oposta à 3ª, e a 2ª fica oposta à 4ª."
- **Conta de conferência:** x é oposta a 2 ⇒ x = 7 − 2 = 5; y é oposta a 4 ⇒ y = 7 − 4 = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `x5y3` | x = 5 e y = 3 | **sim** | "Exato. x fica oposta ao 2 (7 − 2 = 5) e y fica oposta ao 4 (7 − 4 = 3)." |
| `x3y5` | x = 3 e y = 5 | não | "Você inverteu: quem pula uma casa do 2 é o x (5), e quem pula do 4 é o y (3)." |
| `x5y4` | x = 5 e y = 4 | não | "Oposto ao 4 precisa somar 7: y = 3. Logo x = 5 e y = 3." |

#### D2 — `corte-tres-pontas-cubo`
- **Enunciado:** "Se passarmos uma faca plana cortando apenas uma quina de um cubo (pegando as 3 arestas daquele vértice), a figura do corte é:"
- **Conta de conferência:** 3 planos das faces cortados pelo plano secante determinam 3 segmentos ⇒ triângulo

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tri` | Um triângulo | **sim** | "Certo. O plano corta as 3 faces que chegam naquela quina, formando 3 lados: um triângulo." |
| `quad` | Um quadrado | não | "Só 3 faces foram tocadas na quina, então nascem 3 lados: um triângulo." |
| `hex` | Um hexágono | não | "Hexágono exige cortar todas as 6 faces pelo meio do cubo. Na quina é um triângulo." |

#### D3 — `empilhamento-blocos-vistas`
- **Enunciado:** "Uma pilha de cubos vista de cima mostra 4 quadrados (2×2) e nas vistas frontal e lateral todas as colunas têm altura 2. Quantos cubos há se todas as 4 colunas tiverem altura 2?"
- **Conta de conferência:** 4 colunas na base × 2 andares = 8 cubos

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c8` | 8 | **sim** | "Isso. Base 2×2 (4 colunas) com 2 cubos de altura em cada coluna: 4·2 = 8." |
| `c4` | 4 | não | "4 é só o primeiro andar visto de cima. Com 2 andares em cada, são 8 cubos." |
| `c6` | 6 | não | "São 4 colunas de altura 2: 4·2 = 8 cubos." |

#### D4 — `molde-invalido-abas`
- **Enunciado:** "Um molde tem 4 quadrados em linha e os outros 2 quadrados presos no MESMO lado da linha. Ao dobrar, o que acontece?"
- **Conta de conferência:** as duas abas do mesmo lado dobram para a mesma tampa, sobrepondo-se

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sob` | Duas faces se sobrepõem e falta uma tampa | **sim** | "Exato. As duas abas do mesmo lado caem no mesmo topo e o fundo fica aberto." |
| `fecha` | Fecha um cubo perfeito | não | "Para fechar, precisa de 1 aba de cada lado da faixa. Do mesmo lado, elas batem." |
| `pir` | Forma uma pirâmide | não | "Faces quadradas não formam pirâmide; duas abas do mesmo lado se sobrepõem." |

#### D5 — `caminho-formiga-planificacao`
- **Enunciado:** "Uma formiga vai pelo menor caminho na casca de uma caixa `3×3×6` do canto inferior frontal ao superior traseiro, passando por duas faces `3×3` seguidas. Quanto mede o caminho?"
- **Fala do Paco:** "Abra as duas faces `3×3` num retângulo plano `6×3` e trace a reta!"
- **Conta de conferência:** retângulo planificado de base 3 + 3 = 6 e altura 3 ⇒ d = √(6² + 3²) = √45 = 3√5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r45` | √45 | **sim** | "Exato. Abrindo as duas faces 3×3 num retângulo 6×3, a diagonal mede √(6² + 3²) = √45." |
| `r9` | 9 | não | "9 é andar pelas bordas (6 + 3). Pela diagonal do molde 6×3, mede √(36 + 9) = √45." |
| `r18` | √18 | não | "√18 é a diagonal de uma face só (3×3). Pelas duas faces abertas (6×3), dá √45." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar a planificação correta de um dado/cubo ou poliedro com marcas nas faces.
- **Onde procurar:** ENEM, OBMEP, Fuvest (questões de planificação de dado/caixa).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** reconhecer vistas ortogonais (frontal, superior, lateral) de objetos 3D ou pilhas de blocos.
- **Onde procurar:** ENEM (projeções ortogonais de sólidos e edifícios).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** determinar o polígono resultante da seção plana de um poliedro ou cilindro/cone.
- **Onde procurar:** Unicamp, Unesp, ENEM.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** menor caminho na superfície de um sólido usando a planificação.
- **Onde procurar:** ENEM, Fuvest, OBMEP ("formiga na superfície do cubo/cilindro").
