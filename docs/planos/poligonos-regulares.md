# Plano — Polígonos regulares e ladrilhamentos

**Aula:** 1 — Dividir a Volta por Igual · Ângulos do polígono regular e os 3 ladrilhos do plano
**Caminho:** geometria / geometria-plana / poligonos-regulares
**Pré-requisitos que o aluno já domina:** `poligonos-e-quadrilateros`.

## a) Ancoragem mecânica
Num polígono **regular** de `n` lados (todos os lados iguais e todos os ângulos iguais), a volta completa de `360°` é repartida em `n` partes idênticas: o número `n` entra como divisor e entrega imediatamente o **ângulo central** e o **ângulo externo** `a_c = a_e = 360° / n`. Como o ângulo interno `a_i` e o externo `a_e` formam meia-volta numa linha reta, o ângulo interno sai na hora por `a_i = 180° − 360°/n`. Para ladrilhar o piso com peças regulares iguais sem sobrar buraco, `k` ângulos internos juntos num vértice precisam somar exatamente `360°`.

## b) Visual de partida
WIDGET NOVO: `geometria_plana` (modo polígonos regulares e ladrilho) — polígono regular inscrito numa circunferência com slider `n` (`3` a `12`), exibindo as `n` fatias centrais (`a_c = 360°/n` em `c1`), o ângulo externo (`a_e` em `c2`), o ângulo interno (`a_i = 180° − a_e` em `c3`), e ao lado uma bancada de ladrilhamento que encaixa cópias do polígono em torno de um ponto para testar se fecham `360°` (`c4`).

## c) Caso neutro
O **quadrado** (`n = 4`): divide a volta de `360°` nas 4 direções perpendiculares (`a_c = a_e = 360° / 4 = 90°`), de modo que o ângulo interno e o externo são iguais (`a_i = 180° − 90° = 90°`), e `4` quadrados ao redor de um ponto fecham `4 · 90° = 360°` (a malha quadriculada padrão).

## d) Panorama e recorte
Estudamos ângulo central, externo e interno de polígonos regulares, decomposição do hexágono regular em **6 triângulos equiláteros** e a condição de ladrilhamento regular do plano (`k · a_i = 360°`, satisfeita apenas por `n = 3, 4` e `6`).

## e) Progressão por contraste
1. Quadrado (`n = 4`): `a_e = 90°`, `a_i = 90°`, e `4` quadrados fecham `360°` no vértice (referência).
2. Triângulo equilátero (`n = 3`) e Hexágono regular (`n = 6`): `a_i = 60°` (cabem `6` no vértice: `6 · 60° = 360°`) e `a_i = 120°` (cabem `3` no vértice: `3 · 120° = 360°`).
3. Pentágono regular (`n = 5`): `a_e = 360° / 5 = 72°`, logo `a_i = 180° − 72° = 108°`; tentar encaixar no piso dá `3 · 108° = 324°` (sobra fresta de `36°`) e `4 · 108° = 432°` (sobrepõe!).
4. Hexágono regular por dentro: como o ângulo central vale `360° / 6 = 60°`, os 6 triângulos do centro são **equiláteros** (lado do hexágono = raio `R`).

## f) Dedução causal da forma
Em vez de calcular `(n − 2) · 180° / n` com conta grande, é muito mais rápido achar primeiro o ângulo externo `a_e = 360° / n` (porque todos os `n` ângulos externos são iguais e somam `360°`) e depois subtrair de `180°`: `a_i = 180° − a_e`. E por que só existem **3 ladrilhamentos regulares** (triângulo, quadrado e hexágono)? Porque para `n ≥ 7`, o ângulo interno passa de `120°`, então nem 3 peças cabem num vértice (`3 · a_i > 360°`), e para `n = 5` o número `108°` não divide `360°`!

## g) Simulação espacial e fronteiras
Aumentar `n` para `10, 20, 100` mostra que `a_e = 360° / n` se aproxima de `0°` e `a_i` se aproxima de `180°`, fazendo o polígono regular colar na circunferência circunscrita (`a_i < 180°` é a fronteira estrita). Combinando dois tipos de polígonos (ladrilhamento semirregular), `n = 8` (octógono, `a_i = 135°`) consegue ladrilhar se juntarmos `2` octógonos (`2 · 135° = 270°`) com `1` quadrado (`90°`) em cada esquina (`270° + 90° = 360°`).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Ângulo central (a_c) | Fatia da volta no centro: 360° / n. |
| c2 | Ângulo externo (a_e) | Desvio em cada quina: também vale 360° / n. |
| c3 | Ângulo interno (a_i) | Suplementar do externo: a_i = 180° − 360°/n. |
| c4 | Encontro no vértice | Soma dos ângulos das peças num canto; ladrilha se der 360°. |

### Passo 1 — `atalho-pelo-externo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (n como entrada), 2 (visual), 3 (caso neutro n = 4), 4 (panorama)
- **Widget:** WIDGET NOVO: `geometria_plana` — polígono regular começando no quadrado (`n = 4`, `a_e = 90°` em `c2`, `a_i = 90°` em `c3`); slider avança `n` até `6` (hexágono: `a_e = 60°` e `a_i = 120°`).
- **Sliders:** `n` · "Número de lados (n)" · 3..8 · passo 1 · inicial 4 · c1
- **Paco (abertura):** "No quadrado, dividir 360° por 4 dá a_e = 90° e a_i = 90°. Leve n até 6: se o externo vira 360°/6 = 60°, quanto vale cada ângulo interno?"
- **Interação do aluno:** muda `n` para 6 e vê o arco de meia-volta (`180°`) na quina dividir-se em `a_e = 60°` e `a_i = 120°`.
- **Conclusão:** `n ≥ 6`
- **Paco (conclusão):** "Vale 180° − 60° = 120°! Achar primeiro o externo 360°/n e tirar de 180° é o atalho mais rápido para qualquer polígono regular."
- **Tati (dúvida):** `fim` — P: "O ângulo central no meio do polígono também vale 360°/n?" / R: "Sim! As n fatias no centro dividem a volta de 360° igualzinho aos n ângulos externos."

### Passo 2 — `hexagono-seis-equilateros`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 6 (dedução do hexágono regular)
- **Widget:** WIDGET NOVO: `geometria_plana` — hexágono regular inscrito no círculo de raio `R = 4`, dividindo-se nos `6` triângulos centrais de ângulo `60°` (`c1`) e lados todos iguais a `4`.
- **Sliders:** `dividir_hex` · "Revelar 6 triângulos" · 0..1 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "No hexágono regular, cada fatia central tem ângulo 360°/6 = 60° entre dois raios iguais R. Que tipo de triângulo são essas 6 fatias?"
- **Interação do aluno:** ativa as diagonais pelo centro e vê 6 triângulos equiláteros de ângulos `60°-60°-60°` e lado igual ao raio `R`.
- **Conclusão:** `dividir_hex ≥ 1`
- **Paco (conclusão):** "São 6 triângulos equiláteros perfeitos! Por isso o lado do hexágono regular tem exatamente a mesma medida do raio R."

### Passo 3 — `teste-do-ladrilho`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (hexágono fecha × pentágono sobra fresta), 6 (dedução de k·a_i = 360°), 7 (fronteira)
- **Widget:** WIDGET NOVO: `geometria_plana` — bancada de piso onde o aluno escolhe pentágonos (`a_i = 108°`, sobrando fresta de `36°` em `c4`) e depois troca para hexágonos (`a_i = 120°`, `3 · 120° = 360°` fechando a colmeia). Emite `ladrilho_fechado`.
- **Sliders:** `peca_piso` · "Testar peça no piso (n)" · 5..6 · passo 1 · inicial 5 · c4
- **Paco (abertura):** "Três pentágonos regulares (108° cada) juntos num canto somam 324° e deixam um buraco de 36°. Troque para n = 6 (hexágonos): o buraco fecha?"
- **Interação do aluno:** muda de `n = 5` para `n = 6` e vê 3 hexágonos de `120°` fecharem `360°` sem nenhuma fresta.
- **Conclusão:** `peca_piso ≥ 6`
- **Paco (conclusão):** "3 · 120° = 360° cravado! Só ladrilham sozinhos os regulares cujo ângulo divide 360°: triângulo (60°), quadrado (90°) e hexágono (120°)."
- **Tati (dúvida):** `fim` — P: "E se misturarmos octógonos (135°) com quadrados (90°)?" / R: "Aí fecha! 2 octógonos (270°) mais 1 quadrado (90°) somam exatos 360° em cada quina."

### Passo 4 — `desafio-angulo-octogono`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — placa de "PARE" em forma de octógono regular (`n = 8`) destacando um ângulo externo `a_e` (`c2`) e seu ângulo interno `a_i` (`c3`).
- **Paco (abertura):** "Use o atalho: calcule primeiro o ângulo externo `360° / 8` e tire de `180°`!"
- **Enunciado:** "Quanto mede cada ângulo INTERNO de um octógono regular (n = 8)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `g135` | 135° | **sim** | "Exato. O externo vale 360° / 8 = 45°, e o interno vale 180° − 45° = 135°." | mostra `a_e = 45°` e `a_i = 180° − 45° = 135°` |
| `g45` | 45° | não | "45° é o ângulo externo (360°/8). O interno é o suplementar: 180° − 45° = 135°." | destaca a diferença entre o giro externo (45°) e a abertura interna (135°) |
| `g120` | 120° | não | "120° é do hexágono (n = 6). No octógono (n = 8), 180° − 45° = 135°." | compara a quina de 6 lados (120°) com a de 8 lados (135°) |
| `g1080` | 1080° | não | "1080° é a soma de todos os 8 ângulos; dividindo por 8, cada um mede 135°." | divide os 8 cantos iguais de 135° |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — hexágono regular com fatia central `a_c` (`c1`), externo `a_e` (`c2`), interno `a_i` (`c3`) e encontro de 3 hexágonos (`360°` em `c4`).
- **Fórmula:** `a_e = a_c = 360°/n`→c2 · `,` · `a_i = 180° − a_e`→c3 · `e` · `Ladrilho: k · a_i = 360°`→c4
- **Definições:** "Ângulo externo e central: dividem a volta de 360° em n partes iguais (360°/n)." · "Ângulo interno do regular: suplementar do externo (180° − 360°/n)." · "Ladrilhamento regular: só ocorre para n = 3 (60°), n = 4 (90°) e n = 6 (120°)."
- **Paco (abertura):** "Os n cantos dividem 360° por igual e o piso exige fechar 360° no vértice; por isso a_e = 360°/n e só 60°, 90° e 120° ladrilham sós."
- **Dica (hint):** "Toque em cada ângulo para destacá-lo no polígono e no ladrilho."

**Frase de encerramento (outro):** "Você calculou ângulos regulares pelo atalho do externo, abriu o hexágono em 6 equiláteros e descobriu por que as abelhas usam hexágonos."

## i) Treino pós-aula

### Fáceis

#### F1 — `angulo-externo-hexagono`
- **Enunciado:** "Quanto mede cada ângulo EXTERNO de um hexágono regular (n = 6)?"
- **Conta de conferência:** a_e = 360° / 6 = 60°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g60` | 60° | **sim** | "Isso. Os 6 ângulos externos são iguais e somam 360°: 360° / 6 = 60°." |
| `g120` | 120° | não | "120° é o ângulo interno. O externo é 360° / 6 = 60°." |
| `g30` | 30° | não | "Divida a volta completa de 360° por 6: 360° / 6 = 60°." |

#### F2 — `angulo-interno-pentagono-regular`
- **Enunciado:** "Em um pentágono regular (n = 5), o ângulo externo mede 360°/5 = 72°. Quanto mede cada ângulo INTERNO?"
- **Conta de conferência:** a_i = 180° − 72° = 108°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g108` | 108° | **sim** | "Certo. Interno e externo somam 180°: 180° − 72° = 108°." |
| `g72` | 72° | não | "72° é o externo; o interno é 180° − 72° = 108°." |
| `g120` | 120° | não | "120° é do hexágono. No pentágono é 180° − 72° = 108°." |

#### F3 — `quais-ladrilham-sozinhos`
- **Enunciado:** "Qual dos polígonos regulares abaixo NÃO consegue ladrilhar o plano usando apenas peças iguais a ele (sem deixar frestas)?"
- **Conta de conferência:** pentágono regular tem a_i = 108°, que não divide 360°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pent` | Pentágono regular | **sim** | "Exato. Seu ângulo interno é 108°, e 3·108° = 324° deixa uma fresta de 36°." |
| `tri` | Triângulo equilátero | não | "6 triângulos de 60° somam 360° e ladrilham perfeitamente. Quem falha é o pentágono." |
| `hex` | Hexágono regular | não | "3 hexágonos de 120° somam 360° (colmeia). Quem não ladrilha é o pentágono." |

#### F4 — `hexagono-inscrito-raio`
- **Enunciado:** "Um hexágono regular está inscrito numa circunferência de raio R = 5 cm. Quanto mede o lado desse hexágono?"
- **Conta de conferência:** o hexágono regular divide-se em 6 triângulos equiláteros ⇒ lado = R = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l5` | 5 cm | **sim** | "Isso. Como é formado por 6 triângulos equiláteros, o lado do hexágono é igual ao raio: 5 cm." |
| `l10` | 10 cm | não | "10 cm é o diâmetro (a maior diagonal). O lado do hexágono regular mede R = 5 cm." |
| `l25` | 2,5 cm | não | "O lado do hexágono regular é igual ao próprio raio R = 5 cm." |

### Médias

#### M1 — `achar-n-pelo-angulo-externo`
- **Enunciado:** "Cada ângulo externo de um polígono regular mede 36°. Quantos lados (n) tem esse polígono?"
- **Conta de conferência:** 360° / n = 36° ⇒ n = 360° / 36° = 10 lados (decágono)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n10` | 10 | **sim** | "Certo. Como n · 36° = 360°, temos n = 360° / 36° = 10 lados." |
| `n8` | 8 | não | "No de 8 lados o externo é 45°. Para 36°, n = 360° / 36° = 10." |
| `n12` | 12 | não | "No de 12 lados o externo é 30°. Dividindo 360° por 36°, achamos 10." |

#### M2 — `achar-n-pelo-angulo-interno`
- **Enunciado:** "Cada ângulo interno de um polígono regular mede 150°. Quantos lados (n) ele possui?"
- **Conta de conferência:** a_e = 180° − 150° = 30° ⇒ n = 360° / 30° = 12 lados (dodecágono)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n12` | 12 | **sim** | "Exato! Se o interno é 150°, o externo é 180° − 150° = 30°; logo n = 360° / 30° = 12." |
| `n10` | 10 | não | "No de 10 lados o interno é 144°. Com a_e = 30°, temos n = 360° / 30° = 12." |
| `n15` | 15 | não | "Use o suplementar: a_e = 180° − 150° = 30°, e 360° / 30° = 12 lados." |

#### M3 — `area-hexagono-seis-triangulos`
- **Enunciado:** "Se cada um dos 6 triângulos equiláteros que formam um hexágono regular tem área de 7 cm², qual é a área total do hexágono?"
- **Conta de conferência:** 6 · 7 = 42 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a42` | 42 cm² | **sim** | "Isso. O hexágono regular é a união de 6 triângulos equiláteros iguais: 6 · 7 = 42 cm²." |
| `a28` | 28 cm² | não | "São 6 triângulos (não 4): 6 · 7 = 42 cm²." |
| `a35` | 35 cm² | não | "Multiplicando os 6 triângulos por 7 cm², temos 42 cm²." |

### Desafios

#### D1 — `fresta-entre-tres-pentagonos`
- **Enunciado:** "Três pentágonos regulares (108° cada) encostam num mesmo vértice sobre uma mesa. Qual é o ângulo da fresta vazia que sobra?"
- **Fala do Paco:** "Some os três ângulos de 108° e veja quanto falta para fechar a volta de 360°!"
- **Conta de conferência:** 360° − 3 · 108° = 360° − 324° = 36°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g36` | 36° | **sim** | "Exato. Os 3 pentágonos ocupam 3 · 108° = 324°; para completar 360°, sobram 36°." |
| `g72` | 72° | não | "72° é o suplementar de 1 pentágono só (180° − 108°). Entre os 3 pentágonos sobram 360° − 324° = 36°." |
| `g54` | 54° | não | "3 · 108° = 324°, e 360° − 324° = 36°." |

#### D2 — `ladrilho-octogonos-e-quadrado`
- **Enunciado:** "Num piso, dois octógonos regulares (a_i = 135° cada) encontram outra peça regular no mesmo vértice. Qual é o ângulo dessa peça?"
- **Conta de conferência:** 360° − 2 · 135° = 360° − 270° = 90° (um quadrado)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g90` | 90° (quadrado) | **sim** | "Certo! Dois octógonos somam 2 · 135° = 270°; faltam 360° − 270° = 90° (um quadrado)." |
| `g60` | 60° (triângulo) | não | "270° + 60° daria só 330°. Para fechar 360°, faltam 90° (quadrado)." |
| `g120` | 120° (hexágono) | não | "270° + 120° = 390° (passa de 360°). O encaixe exato pede 90°." |

#### D3 — `interno-triplo-do-externo`
- **Enunciado:** "Em um polígono regular, o ângulo interno mede o TRIPLO do ângulo externo (`a_i = 3·a_e`). Quantos lados (n) tem esse polígono?"
- **Conta de conferência:** a_i + a_e = 180° ⇒ 3·a_e + a_e = 180° ⇒ 4·a_e = 180° ⇒ a_e = 45° ⇒ n = 360° / 45° = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `n8` | 8 | **sim** | "Exato. Como 3·a_e + a_e = 180°, temos a_e = 45°; logo n = 360° / 45° = 8 lados." |
| `n6` | 6 | não | "No hexágono a_i = 120° é o dobro de a_e = 60°. Para o triplo, a_e = 45° e n = 8." |
| `n12` | 12 | não | "No de 12 lados a_i = 150° é 5 vezes a_e = 30°. Para o triplo, n = 8." |

#### D4 — `maior-diagonal-hexagono`
- **Enunciado:** "Em um hexágono regular de lado L = 6 cm, quanto mede uma diagonal que passa pelo CENTRO do hexágono?"
- **Conta de conferência:** a diagonal pelo centro atravessa 2 triângulos equiláteros de lado L ⇒ D = 2L = 12 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d12` | 12 cm | **sim** | "Isso. A diagonal pelo centro soma dois raios dos triângulos equiláteros: 2 · 6 = 12 cm." |
| `d6` | 6 cm | não | "6 cm é só até o centro (raio). De um vértice ao oposto mede 2 · 6 = 12 cm." |
| `d18` | 18 cm | não | "A diagonal maior equivale a 2 lados: 2 · 6 = 12 cm." |

#### D5 — `estrela-entre-dois-hexagramas`
- **Enunciado:** "Dois hexágonos regulares (120°) e um triângulo equilátero (60°) somam 300° num vértice. Que peça regular fecha os 360° ali?"
- **Fala do Paco:** "Quanto falta de 300° para 360°?"
- **Conta de conferência:** 360° − (120° + 120° + 60°) = 60° ⇒ mais 1 triângulo equilátero (2 hexágonos + 2 triângulos)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t1` | Mais 1 triângulo equilátero (60°) | **sim** | "Exato! 120° + 120° + 60° + 60° = 360°, formando o ladrilho de 2 hexágonos e 2 triângulos." |
| `q1` | 1 quadrado (90°) | não | "300° + 90° = 390° (passa de 360°). Falta exatamente 60° (1 triângulo equilátero)." |
| `h1` | Mais 1 hexágono (120°) | não | "Com o triângulo já lá, faltam só 60° (1 triângulo equilátero) para fechar 360°." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2020-azulejos-octogono`
- **Enunciado (resumido):** "Octógonos regulares deixam vãos no painel. Quais peças (1: triângulo retângulo isósceles; 2: equilátero; 3: quadrado) preenchem os vãos?"
- **Fala do Paco:** "Calcule o ângulo interno do octógono regular (135°) e veja o que falta para 360° e 180°."
- **Fonte:** ENEM 2020 (adaptada) — **Adaptação:** Questão 171: enunciado resumido listando os três formatos; gabarito (D) mantido. — **URL:** https://api.enem.dev/v1/exams/2020/questions/171
- **Imagens:** `/vestibular/enem-2020-171-1.png` (Malha retangular com octógonos regulares cinza deixando espaços quadrados internos e triangulares nas bordas)
- **Habilidade-alvo:** verificar quais polígonos regulares ou combinações ladrilham o plano (`∑ ângulos no vértice = 360°`).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | 1 | não | "Faltam os espaços internos entre 4 octógonos: 360° - 2·135° = 90° dá quadrados (3). Logo, 1 e 3." |
| `b` | 3 | não | "Faltam os cantos das bordas: 180° - 135° = 45° dá triângulo retângulo isósceles (1). Logo, 1 e 3." |
| `c` | 1 e 2 | não | "Entre octógonos o ângulo é 360° - 270° = 90° (quadrado 3), não 60° (equilátero 2). Logo, 1 e 3." |
| `d` | 1 e 3 | **sim** | "Certo: 360° - 2·135° = 90° forma quadrados (3) e 180° - 135° = 45° nas bordas forma triângulos retângulos isósceles (1)." |
| `e` | 2 e 3 | não | "Nas bordas o ângulo é 45° (triângulo retângulo isósceles 1), não 60° (equilátero 2). Logo, 1 e 3." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** usar a decomposição do hexágono regular em 6 triângulos equiláteros para calcular áreas ou distâncias.
- **Onde procurar:** ENEM (colmeias, pisos hexagonais, porcas mecânicas).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** determinar o ângulo formado entre dois polígonos regulares adjacentes (fresta).
- **Onde procurar:** Fuvest, OBMEP, UFRGS, UFPR.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** encontrar o número de lados `n` de um polígono regular a partir do seu ângulo interno ou central.
- **Onde procurar:** ENEM, UERJ, Unifesp.
