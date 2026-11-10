# Plano — Esferas, secções, área e volume

**Aula:** 1 — O Semicírculo que Gira · Cortes planos, 4 círculos máximos e o cilindro de Arquimedes
**Caminho:** geometria / geometria-espacial / esferas
**Pré-requisitos que o aluno já domina:** `circunferencia-arcos-e-angulos`, `area-do-circulo-e-setores`, `teorema-de-pitagoras`, `cilindros`.

## a) Ancoragem mecânica
A esfera de raio `R` nasce do giro completo (`360°`) de um semicírculo ao redor de seu diâmetro, mantendo todos os pontos da casca exatamente à distância `R` do centro. Quando um plano corta a esfera a uma distância `d` do centro (`0 ≤ d < R`), o raio `r` do círculo da seção depende de `d` pelo triângulo retângulo `r² + d² = R²`. Para a superfície e o volume, o raio `R` governa tudo: a casca inteira vale **4 círculos máximos** (`A = 4πR²`) e o volume vale `V = (4/3)πR³` (exatamente `2/3` do cilindro circunscrito).

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo esfera) — semicírculo de raio `R` (`c1`) que gira `360°` varrendo a esfera, plano de corte horizontal à distância `d` do centro (`c2`) revelando o círculo de seção de raio `r` (`c3`) e o triângulo retângulo interno `d-r-R`, além da comparação com o cilindro equilátero circunscrito (`r = R, h = 2R`).

## c) Caso neutro
Corte passando exatamente pelo centro (`d = 0`, linha do equador): sem afastamento do centro, o raio da seção é máximo e igual ao próprio raio da esfera (`r = R`), formando o **círculo máximo** de área `πR²`.

## d) Panorama e recorte
Estudamos a esfera como sólido de revolução, seção plana (`R² = d² + r²`), área da superfície esférica (`4πR²`), volume (`(4/3)πR³`), relação `2/3` com o cilindro de Arquimedes e fuso/cunha esférica por proporção com `360°`. Deixamos calota e zona esférica para complemento.

## e) Progressão por contraste
1. Corte no equador (`d = 0`): círculo máximo de raio `r = R` e área `πR²` (referência).
2. Afastar o plano do centro (`0 < d < R`): o círculo do corte encolhe segundo `r = √(R² − d²)` até virar um único ponto de tangência no polo (`d = R ⇒ r = 0`).
3. Sombra plana da esfera (1 círculo máximo `πR²`) contra a casca 3D inteira (`4πR²`, exatamente 4 círculos máximos).
4. Cilindro circunscrito de raio `R` e altura `2R` (`V = 2πR³`) contra a esfera inscrita nele (`V = (4/3)πR³`, ocupando `2/3` do cilindro).

## f) Dedução causal da forma
Por que todo corte plano a distância `d` do centro tem raio `r = √(R² − d²)`? Porque a linha que desce perpendicular do centro ao meio do corte mede `d`, o raio do corte mede `r`, e a distância do centro até a borda na casca é sempre `R` (hipotenusa): logo `d² + r² = R²`. E como ligar a área `4πR²` ao volume `(4/3)πR³`? Imaginando a esfera dividida em inúmeras pirâmides bem finas com vértice no centro e altura `R`: somando `V = (A_base · h) / 3` de todas elas, a soma das bases é a casca `4πR²` e a altura é `R`, resultando em `V = (4πR² · R) / 3 = (4/3)πR³`.

## g) Simulação espacial e fronteiras
Testar o limite de `d`: para `0 ≤ d < R` a interseção é um círculo; na fronteira `d = R` é um único ponto (plano tangente, perpendicular ao raio); para `d > R` é vazia. Ao multiplicar o raio por `k` (ex.: dobrar `R`), a área cresce com `k²` (`4x`) e o volume dispara com `k³` (`8x`: uma laranja com o dobro do diâmetro tem **8 vezes** mais volume!).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Raio da esfera (R) | Distância constante do centro a qualquer ponto da casca. |
| c2 | Distância do corte (d) | Afastamento perpendicular entre o centro e o plano secante. |
| c3 | Raio da seção (r) | Raio do círculo formado pelo corte: r² + d² = R². |
| c4 | Casca e Volume | Superfície 4πR² (4 discos máximos) e volume (4/3)πR³. |

### Passo 1 — `corte-no-equador-e-acima`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (d como entrada), 2 (visual), 3 (caso neutro d = 0), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — esfera de raio `R = 5` (`c1`) com plano de corte horizontal começando no caso neutro do equador (`d = 0`, círculo máximo `r = 5` fantasma); ao subir `d` (`c2`) até `3`, o triângulo retângulo interno mostra `r = 4` (`c3`).
- **Sliders:** `d` · "Distância do corte ao centro (d)" · 0..5 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "No equador (d = 0), o corte tem o mesmo raio R = 5 da esfera. Suba o corte para d = 3: quanto passa a medir o raio r da fatia?"
- **Interação do aluno:** move `d` de 0 até 3 e vê o triângulo retângulo `d = 3, r = 4, R = 5` aparecer dentro da esfera.
- **Conclusão:** `d ≥ 3`
- **Paco (conclusão):** "Mede 4! Do centro até a borda do corte continua sendo o raio R = 5 da esfera, então d = 3, r = 4 e R = 5 formam Pitágoras."
- **Tati (dúvida):** `fim` — P: "E se a gente subir o plano até d = 5?" / R: "Em d = R o raio da fatia zera (5² − 5² = 0): o plano só encosta num pontinho no polo, virando plano tangente."

### Passo 2 — `quatro-circulos-maximos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (sombra 2D × casca 3D), 6 (ligação casca → volume)
- **Widget:** WIDGET NOVO: `solido_3d` — esfera de raio `R` inscrita num cilindro de altura `2R` cuja área lateral (`2πR · 2R = 4πR²`) se abre em **4 círculos máximos** de área `πR²` (`c4`), mais fatiamento piramidal até o centro.
- **Sliders:** `abrir_casca` · "Comparar casca com discos" · 0..100 · passo 25 · inicial 0 · c4
- **Paco (abertura):** "A sombra da esfera no chão vale 1 círculo máximo (πR²). Quantas dessas sombras cabem para cobrir a casca 3D inteira da esfera?"
- **Interação do aluno:** abre a projeção cilíndrica até 100% e vê a área da casca preencher exatamente 4 discos de área `πR²`.
- **Conclusão:** `abrir_casca ≥ 100`
- **Paco (conclusão):** "Cabem 4 círculos máximos: A = 4πR²! Ligando a casca ao centro em pirâmides de altura R, o volume dá (4πR²·R)/3 = (4/3)πR³."

### Passo 3 — `dobrar-raio-oito-esferas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste linear × cúbico), 7 (fronteira de escala)
- **Widget:** WIDGET NOVO: `solido_3d` — esfera de raio `R = 1` (fantasma) ao lado de uma esfera cujo raio sobe para `2R`, mostrando a área multiplicar por `2² = 4` e o volume caber **8 bolinhas** de raio `R` (`2³ = 8`).
- **Sliders:** `escala_r` · "Multiplicar raio R" · 1..2 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Se fundirmos bolinhas de chumbo de raio 1 para fazer uma bola com o dobro do raio (R = 2), quantas bolinhas pequenas serão necessárias?"
- **Interação do aluno:** muda `escala_r` para 2 e vê 8 esferas pequenas preencherem o volume da esfera de raio duplo.
- **Conclusão:** `escala_r ≥ 2`
- **Paco (conclusão):** "Precisa de 8 bolinhas! Como o volume tem R³, dobrar o raio multiplica o volume por 2³ = 8."
- **Tati (dúvida):** `fim` — P: "E se a gente pegar só um gomo da laranja, como 90° dos 360°?" / R: "É proporcional ao ângulo: 90° é 1/4 da volta, então o fuso tem 1/4 da área e a cunha tem 1/4 do volume."

### Passo 4 — `desafio-corte-esfera`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — esfera de raio `R = 10 cm` (`c1`) cortada por um plano a distância `d = 6 cm` do centro (`c2`), pedindo o raio `r` (`c3`).
- **Paco (abertura):** "Olhe o triângulo retângulo de hipotenusa R = 10 e cateto d = 6."
- **Enunciado:** "Uma esfera de raio R = 10 cm é cortada a d = 6 cm do centro. Qual é o raio r do círculo da seção?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `r8` | 8 cm | **sim** | "Exato. Por Pitágoras, r² + 6² = 10² ⇒ r² = 100 − 36 = 64 ⇒ r = 8 cm." | acende o triângulo 6-8-10 dentro da esfera |
| `r4` | 4 cm | não | "Você subtraiu 10 − 6. Como formam um triângulo retângulo, r = √(10² − 6²) = 8 cm." | mostra o ângulo de 90° entre d e r |
| `r10` | 10 cm | não | "10 cm é só no equador (d = 0). A 6 cm do centro, r = √(100 − 36) = 8 cm." | compara o equador com a seção em d = 6 |
| `r64` | 64 cm | não | "64 é r²; tirando a raiz quadrada, o raio da seção é r = 8 cm." | destaca `r = √64 = 8 cm` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — esfera mostrando `R` (`c1`), corte com `d` (`c2`) e `r` (`c3`), casca `4πR²` e volume `(4/3)πR³` (`c4`).
- **Fórmula:** `R²`→c1 · `=` · `d²`→c2 · `+` · `r²`→c3 · `,` · `A = 4πR²`→c4 · `e` · `V = (4/3)πR³`→c4
- **Definições:** "Seção plana da esfera: todo corte a distância d < R gera um círculo de raio r com r² + d² = R²." · "Área da superfície esférica: equivale a 4 círculos máximos (A = 4πR²)." · "Volume da esfera: V = (4/3)πR³ (ou 2/3 do cilindro circunscrito)."
- **Paco (abertura):** "A borda do corte dista R do centro e a casca equivale a quatro discos máximos; por isso r² + d² = R², A = 4πR² e V = (4/3)πR³."
- **Dica (hint):** "Toque em cada parte da fórmula para destacá-la na esfera."

**Frase de encerramento (outro):** "Você usou Pitágoras nos cortes da esfera, viu que a casca vale 4 discos máximos e descobriu o salto cúbico do volume."

## i) Treino pós-aula

### Fáceis

#### F1 — `area-esfera-r3`
- **Enunciado:** "Qual é a área da superfície de uma esfera de raio R = 3 cm?"
- **Conta de conferência:** A = 4π · 3² = 4π · 9 = 36π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a36p` | 36π cm² | **sim** | "Isso. A = 4πR² = 4π · 3² = 36π cm²." |
| `a9p` | 9π cm² | não | "9π é apenas 1 círculo máximo. A casca inteira vale 4 deles: 36π cm²." |
| `a12p` | 12π cm² | não | "Você fez 4·3 sem elevar o raio ao quadrado: 4π · 3² = 36π cm²." |

#### F2 — `volume-esfera-r3`
- **Enunciado:** "Qual é o volume de uma esfera de raio R = 3 cm?"
- **Conta de conferência:** V = (4/3)π · 3³ = (4/3)π · 27 = 36π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v36p` | 36π cm³ | **sim** | "Certo. V = (4/3)π · 3³ = (4/3)π · 27 = 36π cm³." |
| `v27p` | 27π cm³ | não | "Faltou multiplicar por 4/3: (4/3)π · 27 = 36π cm³." |
| `v108p` | 108π cm³ | não | "Faltou dividir por 3 na fórmula (4/3)πR³: 108π / 3 = 36π cm³." |

#### F3 — `secao-esfera-345`
- **Enunciado:** "Uma esfera de raio R = 5 cm é cortada por um plano a d = 4 cm do centro. Qual é o raio r da seção circular?"
- **Conta de conferência:** r² + 4² = 5² ⇒ r² = 9 ⇒ r = 3 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r3` | 3 cm | **sim** | "Exato. Pelo triângulo retângulo 3-4-5, r = √(5² − 4²) = 3 cm." |
| `r1` | 1 cm | não | "Não subtraia 5 − 4; aplique Pitágoras: r = √(25 − 16) = 3 cm." |
| `r5` | 5 cm | não | "5 cm é o raio da esfera no centro. A 4 cm do centro, r = 3 cm." |

#### F4 — `esfera-inscrita-no-cubo`
- **Enunciado:** "Uma esfera está perfeitamente inscrita num cubo de aresta 8 cm (tocando as 6 faces). Quanto mede o raio R da esfera?"
- **Conta de conferência:** diâmetro 2R = aresta 8 cm ⇒ R = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r4` | 4 cm | **sim** | "Isso. O diâmetro da esfera inscrita cabe justo na aresta 8 cm, logo R = 4 cm." |
| `r8` | 8 cm | não | "8 cm é o diâmetro inteiro (de uma face à oposta). O raio é a metade: 4 cm." |
| `r2` | 2 cm | não | "O raio é metade da aresta de 8 cm: 8 / 2 = 4 cm." |

### Médias

#### M1 — `area-da-secao-plana`
- **Enunciado:** "Uma esfera de raio R = 5 cm é cortada a d = 3 cm do centro. Qual é a ÁREA do círculo formado no corte?"
- **Conta de conferência:** r = √(5² − 3²) = 4 cm ⇒ A_seção = πr² = 16π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a16p` | 16π cm² | **sim** | "Certo. O raio do corte é r = √(25 − 9) = 4 cm, e sua área é π·4² = 16π cm²." |
| `a4p` | 4π cm² | não | "4 cm é o raio r. A área do disco é πr² = π·4² = 16π cm²." |
| `a25p` | 25π cm² | não | "25π é no equador (d = 0). Em d = 3 cm, r = 4 cm e a área é 16π cm²." |

#### M2 — `hemisferio-volume`
- **Enunciado:** "Uma tigela tem a forma de uma semiesfera (metade de uma esfera) de raio R = 3 cm. Qual é a capacidade interna da tigela?"
- **Conta de conferência:** V_esfera = 36π cm³ ⇒ V_semiesfera = 36π / 2 = 18π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v18p` | 18π cm³ | **sim** | "Exato. A esfera inteira tem (4/3)π·27 = 36π cm³; metade disso é 18π cm³." |
| `v36p` | 36π cm³ | não | "36π cm³ é a esfera inteira. Na semiesfera dividimos por 2: 18π cm³." |
| `v9p` | 9π cm³ | não | "Metade de (4/3)π·3³ é (2/3)π·27 = 18π cm³." |

#### M3 — `fuso-esferico-60-graus`
- **Enunciado:** "Um gomo (fuso esférico) de 60° numa esfera de raio R = 3 cm tem qual área de casca?"
- **Conta de conferência:** 60° / 360° = 1/6 da casca total 36π ⇒ 36π / 6 = 6π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6p` | 6π cm² | **sim** | "Isso. 60° é 1/6 de 360°, então a área do fuso é (1/6)·(4π·3²) = 36π / 6 = 6π cm²." |
| `a36p` | 36π cm² | não | "36π é a esfera toda (360°). Para 60° (1/6 da volta), dá 6π cm²." |
| `a12p` | 12π cm² | não | "12π seria para 120° (1/3). Para 60° (1/6 de 36π), dá 6π cm²." |

### Desafios

#### D1 — `fundir-oito-esferas`
- **Enunciado:** "Oito esferas maciças de metal de raio r = 1 cm são derretidas para formar uma única esfera maior de raio R. Quanto vale R?"
- **Fala do Paco:** "Volume total antes = volume depois: se o volume multiplicou por 8, por quanto multiplicou o raio?"
- **Conta de conferência:** R³ = 8 · 1³ = 8 ⇒ R = ∛8 = 2 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r2` | 2 cm | **sim** | "Exato. Como V é proporcional a R³, ter 8 vezes o volume significa R = ∛8 = 2 cm." |
| `r8` | 8 cm | não | "Raio 8 teria volume 8³ = 512 vezes maior! Para 8 vezes o volume, R = ∛8 = 2 cm." |
| `r4` | 4 cm | não | "Raio 4 daria volume 4³ = 64 vezes maior. Como 2³ = 8, o novo raio é 2 cm." |

#### D2 — `area-total-semiesfera-macica`
- **Enunciado:** "Uma peça maciça tem a forma de uma semiesfera de raio R = 2 cm (casca curva + base circular plana do corte). Qual é a sua área TOTAL?"
- **Conta de conferência:** metade da casca 4πR²/2 = 2πR² + 1 círculo máximo da tampa plana πR² = 3πR² = 3π · 4 = 12π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12p` | 12π cm² | **sim** | "Certo! Metade da casca (2πR² = 8π) mais o círculo plano do corte (πR² = 4π) somam 3πR² = 12π cm²." |
| `a8p` | 8π cm² | não | "8π é só a parte curva externa. Na peça maciça soma-se o círculo plano do corte (+4π): 12π cm²." |
| `a16p` | 16π cm² | não | "16π é a esfera inteira. A semiesfera maciça tem 2πR² + πR² = 3πR² = 12π cm²." |

#### D3 — `arquimedes-cilindro-circunscrito`
- **Enunciado:** "Uma esfera de volume 20 cm³ está inscrita num cilindro reto (tocando fundo, tampa e lateral). Qual é o volume do cilindro?"
- **Conta de conferência:** V_esfera = (2/3) · V_cilindro ⇒ 20 = (2/3) · V_cil ⇒ V_cil = 30 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v30` | 30 cm³ | **sim** | "Exato. Pela relação de Arquimedes, a esfera ocupa 2/3 do cilindro; logo V_cil = 20 · (3/2) = 30 cm³." |
| `v40` | 40 cm³ | não | "A esfera é 2/3 do cilindro (não metade): 20 / 2 · 3 = 30 cm³." |
| `v60` | 60 cm³ | não | "1/3 é o cone! A esfera ocupa 2/3 do cilindro, então o cilindro tem 30 cm³." |

#### D4 — `achar-raio-igualando-area-e-volume`
- **Enunciado:** "Para qual valor numérico do raio R (em cm) a área da superfície (4πR²) e o volume ((4/3)πR³) de uma esfera têm o mesmo número?"
- **Conta de conferência:** (4/3)πR³ = 4πR² ⇒ R / 3 = 1 ⇒ R = 3 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r3` | 3 cm | **sim** | "Isso. Igualando (4/3)πR³ = 4πR² e dividindo por 4πR², sobra R/3 = 1 ⇒ R = 3 cm." |
| `r1` | 1 cm | não | "Em R = 1, área é 4π e volume é 4π/3. Eles empatam em R = 3 (ambos dão 36π)." |
| `r4` | 4 cm | não | "Cancelando 4πR² em (4/3)πR³ = 4πR², obtemos R = 3 cm." |

#### D5 — `esferas-no-cilindro-nivel`
- **Enunciado:** "Três bolas de raio R = 3 cm cabem justas num tubo cilíndrico de raio 3 cm e altura 18 cm. Que volume do tubo fica VAZIO?"
- **Fala do Paco:** "Em cada fatia de altura 2R, a esfera ocupa 2/3 e deixa 1/3 vazio!"
- **Conta de conferência:** V_tubo = π · 3² · 18 = 162π; 3 esferas = 3 · 36π = 108π; vazio = 162π − 108π = 54π cm³ (1/3 do tubo)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v54p` | 54π cm³ | **sim** | "Exato. O tubo tem 162π cm³ e as 3 esferas ocupam 2/3 (108π), deixando 1/3 vazio: 54π cm³." |
| `v108p` | 108π cm³ | não | "108π cm³ é o volume ocupado pelas 3 bolas. O espaço vazio é 162π − 108π = 54π cm³." |
| `v18p` | 18π cm³ | não | "18π é o vazio em volta de 1 bola só. Nas 3 bolas do tubo são 3·18π = 54π cm³." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular raio ou área de seção plana de uma esfera usando Pitágoras (`R² = d² + r²`).
- **Onde procurar:** ENEM, Fuvest, Unicamp, Unesp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar volumes ao fundir/dividir esferas (escala cúbica `k³`).
- **Onde procurar:** ENEM (questões de bombons esféricos, gotas ou bolas de gude).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** cálculo de área e volume de semiesferas, fusos e cunhas esféricas.
- **Onde procurar:** UFRGS, UFPR, UERJ, ENEM.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** inscrição e circunscrição entre esfera, cilindro e cubo.
- **Onde procurar:** Fuvest, Unicamp, ENEM.
