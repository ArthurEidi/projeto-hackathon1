# Plano — Área do círculo, setores e coroas circulares

**Aula:** 1 — Fatiar a Pizza em Paralelogramo · De 2πr para πr², setores e coroas
**Caminho:** geometria / geometria-plana / area-do-circulo-e-setores
**Pré-requisitos que o aluno já domina:** `perimetro-e-area-de-figuras-planas`, `circunferencia-arcos-e-angulos`, `comprimento-da-circunferencia`.

## a) Ancoragem mecânica
Três máquinas operam a partir do raio `r`: primeiro, fatiar o círculo em `N` setores finos e encaixá-los alternadamente (metade apontando para cima, metade para baixo) transforma o disco num **retângulo/paralelogramo** de base igual à meia circunferência (`πr`) e altura igual ao raio (`r`), entregando a área `A = πr · r = πr²`. Segundo, o **setor circular** de ângulo `α` seleciona a fração `α / 360°` dessa área. Terceiro, a **coroa circular** subtrai um disco interno `πr²` de um externo `πR²`, restando `A = π(R² − r²)`.

## b) Visual de partida
WIDGET NOVO: `geometria_plana` (modo área do círculo, setor e coroa) — disco de raio `r` (`c1`) fatiado em `N` setores (slider `N` de `4` a `32`) que se abrem e se encaixam num paralelogramo de base `πr` (`c2`) e altura `r`, além de controle do ângulo do setor `α` (`0°` a `360°` em `c3`) e do furo central da coroa (`R` e `r` em `c4`).

## c) Caso neutro
Para a área do círculo, o disco de raio unitário `r = 1`, onde a área vale exatamente `π · 1² = π`. Para o setor circular, a volta completa `α = 360°` (fração `360°/360° = 1`, o círculo inteiro), antes de recortar fatias de `180°` (`1/2`), `90°` (`1/4`) ou `60°` (`1/6`).

## d) Panorama e recorte
Estudamos a dedução visual da área do círculo `A = πr²`, o contraste quadrático ao dobrar o raio (`4x`), a área do setor circular como fração `α / 360°` e a área da coroa circular `π(R² − r²)`. Deixamos segmentos circulares com trigonometria para aprofundamento.

## e) Progressão por contraste
1. Círculo fatiado em 4 partes (bordas ainda bem curvas) contra 32 partes: quanto mais fina a fatia, mais o encaixe vira um retângulo perfeito de base `πr` e altura `r` (`A = πr²`).
2. Dobrar o raio de `r` para `2r`: o comprimento da borda dobra (`2πr`), mas a **área quadruplica** (`π(2r)² = 4πr²`: uma pizza de diâmetro duplo alimenta 4 vezes mais!).
3. Círculo inteiro (`360°`) contra **setor circular** de `90°` (`1/4` da área) ou `60°` (`1/6` da área).
4. Disco maciço `πR²` contra **coroa circular** (arruela/pista circular): retira-se o miolo `πr²`, sobrando `π(R² − r²)` — que **não** é `π(R − r)²`!

## f) Dedução causal da forma
Por que a área do círculo é `πr²`? Porque a borda inteira do círculo mede `2πr`; quando abrimos o círculo em fatias triangulares e encaixamos metade com a casca embaixo e metade com a casca em cima, a base de baixo fica com metade da borda (`πr`) e a altura vertical é o raio `r`. Multiplicando `base × altura`, nasce inevitavelmente `A = (πr) · r = πr²`!

## g) Simulação espacial e fronteiras
Na coroa circular de raios `R` e `r`, quando `r → 0` recuperamos o disco cheio `πR²`, e na fronteira `r = R` a largura da pista zera e a área é `0`. No setor circular, `0° < α ≤ 360°`; o erro clássico de somar/subtrair raios antes de elevar ao quadrado (`(R − r)² ≠ R² − r²`) aparece visualmente comparando os discos.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Raio (r) | Altura de cada fatia do círculo, do centro até a borda. |
| c2 | Meia borda (πr) | Base do retângulo formado ao encaixar metade das fatias embaixo. |
| c3 | Setor circular | Fatia de pizza com ângulo α: fração (α / 360°) de πr². |
| c4 | Coroa circular | Anel entre dois círculos concêntricos: π(R² − r²). |

### Passo 1 — `encaixar-fatias-retangulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (nº de fatias como entrada), 2 (visual), 3 (caso neutro r = 1), 6 (dedução de πr²)
- **Widget:** WIDGET NOVO: `geometria_plana` — círculo de raio `r` (`c1`) e borda `2πr` fatiado em `N` setores que se encaixam lado a lado formando um paralelogramo de base `πr` (`c2`) e altura `r`; slider aumenta `N` de `4` até `24`.
- **Sliders:** `fatias` · "Número de fatias (N)" · 4..24 · passo 4 · inicial 4 · c2
- **Paco (abertura):** "Cortamos a pizza e encaixamos metade das bordas embaixo (πr) e metade em cima. Aumente as fatias até 24: que figura plana aparece?"
- **Interação do aluno:** sobe `fatias` até 24 e vê o paralelogramo endireitar-se num retângulo de base `πr` e altura `r`.
- **Conclusão:** `fatias ≥ 24`
- **Paco (conclusão):** "Vira um retângulo de base πr (metade de 2πr) e altura r! Multiplicando base por altura, nasce a área do círculo: (πr) · r = πr²."
- **Tati (dúvida):** `fim` — P: "Então o 2 de 2πr some porque metade da borda foi para baixo e metade para cima?" / R: "Exatamente! A circunferência toda é 2πr, então a base do retângulo fica só com metade: πr."

### Passo 2 — `setor-fatia-da-volta`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 4 (panorama), 5 (todo 360° × fração α)
- **Widget:** WIDGET NOVO: `geometria_plana` — círculo de raio `r = 6` (`A_total = 36π`) começando inteiro (`α = 360°` fantasma) e recortando o setor `α` (`c3`) com o slider em passos de `60°`.
- **Sliders:** `alfa` · "Ângulo do setor (α)" · 60..360 · passo 60 · inicial 360 · c3
- **Paco (abertura):** "O círculo inteiro (360°) de raio 6 tem área 36π. Reduza o setor para α = 60°: que fração dos 36π sobra nessa fatia?"
- **Interação do aluno:** reduz `alfa` até `60°` e vê que cabem 6 fatias iguais na pizza, dando `36π / 6 = 6π`.
- **Conclusão:** `alfa ≤ 60`
- **Paco (conclusão):** "60° é 1/6 de 360°, então a área do setor é 1/6 de 36π = 6π! Basta multiplicar πr² pela fração α / 360°."

### Passo 3 — `coroa-circular-anel`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (disco cheio × anel vazado), 7 (fronteira R² − r² vs (R−r)²)
- **Widget:** WIDGET NOVO: `geometria_plana` — disco maior de raio `R = 5` (`25π`) do qual um furo central de raio `r` (`c4`) se abre de `0` até `3` (`9π`), deixando a coroa circular de área `25π − 9π = 16π`.
- **Sliders:** `r_int` · "Raio do furo interno (r)" · 0..3 · passo 1 · inicial 0 · c4
- **Paco (abertura):** "Num disco de raio R = 5 (área 25π), abra um furo central de raio r = 3 (área 9π): qual é a área do anel colorido que sobra?"
- **Interação do aluno:** abre o furo até `r = 3` e vê a área da coroa resultar em `25π − 9π = 16π`.
- **Conclusão:** `r_int ≥ 3`
- **Paco (conclusão):** "Sobra 25π − 9π = 16π! A área da coroa é o disco grande menos o pequeno: πR² − πr² = π(R² − r²)."
- **Tati (dúvida):** `fim` — P: "Posso subtrair os raios antes, fazendo (5 − 3)² = 4?" / R: "Nunca: um disco de raio 2 tem área 4π, bem menor que o anel de 16π. Eleve ao quadrado antes: 5² − 3² = 16."

### Passo 4 — `desafio-setor-90`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — setor circular de `α = 90°` (um quarto de círculo) e raio `r = 4 cm` (`c3`).
- **Paco (abertura):** "Calcule o círculo inteiro `π·4²` e pegue a fração de `90°` em `360°`!"
- **Enunciado:** "Qual é a área de um setor circular de ângulo α = 90° e raio r = 4 cm?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a4p` | 4π cm² | **sim** | "Exato. O círculo todo tem π·4² = 16π cm², e 90° é 1/4 da volta: 16π / 4 = 4π cm²." | mostra os 4 setores de 90° que fecham os 16π cm² |
| `a16p` | 16π cm² | não | "16π cm² é o círculo inteiro (360°). Para 90° (1/4), dividimos por 4: 4π cm²." | destaca apenas 1 quarto do disco |
| `a8p` | 8π cm² | não | "8π cm² é metade do círculo (180°). Para 90° (1/4 de 16π), dá 4π cm²." | compara 180° (8π) com 90° (4π) |
| `a2p` | 2π cm² | não | "2π cm é o arco da borda. Na área fazemos (π·4²) / 4 = 4π cm²." | preenche o interior do setor (4π cm²) |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `geometria_plana_figura` — círculo aberto em paralelogramo (`πr × r`), setor de ângulo `α` (`c3`) e coroa circular (`c4`).
- **Fórmula:** `A = π` · `r²`→c1 · `,` · `A_setor = (α/360°)·πr²`→c3 · `e` · `A_coroa = π(R² − r²)`→c4
- **Definições:** "Área do círculo (πr²): equivale a um retângulo de base πr e altura r." · "Setor circular: fração α/360° da área total do círculo." · "Coroa circular: área do círculo maior menos a área do círculo menor, π(R² − r²)."
- **Paco (abertura):** "As fatias montam um retângulo πr por r; por isso A = πr², o setor usa a fração α/360° e a coroa subtrai os discos."
- **Dica (hint):** "Toque em cada fórmula para ver o círculo, a fatia do setor ou o anel da coroa."

**Frase de encerramento (outro):** "Você deduziu πr² transformando o círculo num retângulo e calculou áreas de setores e coroas sem decorar regras soltas."

## i) Treino pós-aula

### Fáceis

#### F1 — `area-circulo-r5`
- **Enunciado:** "Qual é a área de um círculo de raio r = 5 cm?"
- **Conta de conferência:** A = π · 5² = 25π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a25p` | 25π cm² | **sim** | "Isso. A = πr² = π · 5² = 25π cm²." |
| `a10p` | 10π cm² | não | "10π é o comprimento da circunferência (2πr). A área é π · 5² = 25π cm²." |
| `a5p` | 5π cm² | não | "Eleve o raio ao quadrado: π · 5² = 25π cm²." |

#### F2 — `area-pelo-diametro-6`
- **Enunciado:** "Uma praça circular tem DIÂMETRO de 6 m. Qual é a sua área?"
- **Conta de conferência:** d = 6 ⇒ r = 3 m ⇒ A = π · 3² = 9π m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9p` | 9π m² | **sim** | "Certo. Diâmetro 6 m significa raio r = 3 m; logo A = π · 3² = 9π m²." |
| `a36p` | 36π m² | não | "Você usou o diâmetro 6 como raio! O raio é a metade (3 m): π · 3² = 9π m²." |
| `a6p` | 6π m² | não | "6π m é o comprimento da borda. Com r = 3 m, a área é π · 3² = 9π m²." |

#### F3 — `area-semicirculo-r4`
- **Enunciado:** "Qual é a área de um semicírculo (setor de 180°) de raio r = 4 cm?"
- **Conta de conferência:** A = (π · 4²) / 2 = 16π / 2 = 8π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8p` | 8π cm² | **sim** | "Exato. O círculo todo tem 16π cm²; a metade (180°) tem 8π cm²." |
| `a16p` | 16π cm² | não | "16π cm² é o círculo inteiro. No semicírculo dividimos por 2: 8π cm²." |
| `a4p` | 4π cm² | não | "4π cm² seria um quarto (90°). A metade de 16π cm² é 8π cm²." |

#### F4 — `coroa-simples-4-e-2`
- **Enunciado:** "Qual é a área de uma coroa circular de raio externo R = 4 cm e raio interno r = 2 cm?"
- **Conta de conferência:** A = π(4² − 2²) = π(16 − 4) = 12π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12p` | 12π cm² | **sim** | "Isso. Disco maior (16π) menos disco menor (4π) dá 12π cm²." |
| `a4p` | 4π cm² | não | "Não faça (4 − 2)²! Subtraia as áreas dos discos: 16π − 4π = 12π cm²." |
| `a20p` | 20π cm² | não | "O furo central é retirado, então subtraímos: 16π − 4π = 12π cm²." |

### Médias

#### M1 — `setor-60-graus`
- **Enunciado:** "Qual é a área de um setor circular de ângulo α = 60° numa circunferência de raio r = 6 cm?"
- **Conta de conferência:** 60°/360° = 1/6; A = (1/6) · π · 6² = 36π / 6 = 6π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6p` | 6π cm² | **sim** | "Certo. 60° é 1/6 de 360°, e 1/6 de 36π cm² vale 6π cm²." |
| `a36p` | 36π cm² | não | "36π cm² é o círculo todo (360°). Para 60° (1/6), a área é 6π cm²." |
| `a12p` | 12π cm² | não | "12π seria para 120° (1/3). Para 60° (1/6 de 36π), dá 6π cm²." |

#### M2 — `achar-raio-pela-area`
- **Enunciado:** "A área de um disco circular é 49π cm². Quanto mede o DIÂMETRO desse disco?"
- **Conta de conferência:** πr² = 49π ⇒ r = 7 cm ⇒ d = 2r = 14 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d14` | 14 cm | **sim** | "Exato. De πr² = 49π tiramos o raio r = 7 cm, e o diâmetro é o dobro: 14 cm." |
| `d7` | 7 cm | não | "7 cm é o raio (√49). O diâmetro pedido mede 2 · 7 = 14 cm." |
| `d245` | 24,5 cm | não | "Tire a raiz quadrada de 49 para achar r = 7 cm, e dobre para o diâmetro: 14 cm." |

#### M3 — `setor-120-graus`
- **Enunciado:** "Um limpador de para-brisa de 30 cm de comprimento gira 120° limpando um setor circular (desde o pivô). Qual é a área limpa?"
- **Conta de conferência:** 120°/360° = 1/3; A = (1/3) · π · 30² = 900π / 3 = 300π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a300p` | 300π cm² | **sim** | "Isso. 120° é 1/3 da volta, e (π · 30²) / 3 = 900π / 3 = 300π cm²." |
| `a900p` | 900π cm² | não | "900π seria uma volta inteira de 360°. Em 120° (1/3), dá 300π cm²." |
| `a100p` | 100π cm² | não | "30² = 900; dividindo por 3 (pois 120° = 1/3 de 360°), temos 300π cm²." |

### Desafios

#### D1 — `pizza-dobro-do-diametro`
- **Enunciado:** "Uma pizza pequena tem 20 cm de diâmetro e a grande tem 40 cm (o dobro). Quantas pequenas têm a mesma área de 1 grande?"
- **Fala do Paco:** "A área depende do raio ao quadrado. O que acontece com ela quando o raio dobra?"
- **Conta de conferência:** razão linear k = 40/20 = 2 ⇒ razão das áreas = k² = 2² = 4 pizzas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p4` | 4 | **sim** | "Exato! A pequena tem r = 10 (100π) e a grande tem R = 20 (400π): cabem 4 pequenas!" |
| `p2` | 2 | não | "Dobrar o diâmetro multiplica a área por 2² = 4 (400π contra 100π), não por 2." |
| `p8` | 8 | não | "8 seria em 3D (volume). Na área plana (πr²), dobrar o raio multiplica por 2² = 4." |

#### D2 — `pista-de-caminhada-Em-volta`
- **Enunciado:** "Uma piscina circular de raio r = 4 m é cercada por uma faixa de piso de 1 m de largura (R = 5 m). Qual é a área desse piso?"
- **Conta de conferência:** R = 4 + 1 = 5 m e r = 4 m ⇒ A_coroa = π(5² − 4²) = π(25 − 16) = 9π m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9p` | 9π m² | **sim** | "Certo! O raio externo é 4 + 1 = 5 m, e a coroa tem área π(5² − 4²) = 9π m²." |
| `a1p` | 1π m² | não | "Não faça (5 − 4)²! Subtraia os quadrados: π(25 − 16) = 9π m²." |
| `a25p` | 25π m² | não | "25π m² inclui a piscina lá dentro. Descontando os 16π m² da piscina, sobram 9π m²." |

#### D3 — `quadrado-menos-circulo-inscrito`
- **Enunciado:** "De uma chapa quadrada de lado 4 cm (área 16 cm²) recorta-se o maior círculo possível (raio 2 cm). Qual é a área das sobras?"
- **Conta de conferência:** A_quadrado − A_círculo = 4² − π · 2² = 16 − 4π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s164p` | 16 − 4π cm² | **sim** | "Exato. Quadrado de área 16 cm² menos o círculo inscrito de raio 2 cm (4π cm²): 16 − 4π cm²." |
| `s1616p` | 16 − 16π cm² | não | "O diâmetro é 4 cm, então o raio do círculo é r = 2 cm (área 4π): 16 − 4π cm²." |
| `s4p` | 4π cm² | não | "4π cm² é a área do círculo recortado. As sobras nos cantos medem 16 − 4π cm²." |

#### D4 — `achar-angulo-do-setor`
- **Enunciado:** "Em um círculo de raio r = 6 cm (área total 36π cm²), um setor circular tem área 9π cm². Qual é o ângulo central α desse setor?"
- **Conta de conferência:** α / 360° = 9π / 36π = 1/4 ⇒ α = 360° / 4 = 90°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g90` | 90° | **sim** | "Isso. 9π é exatamente 1/4 da área total 36π, e 1/4 de 360° vale 90°." |
| `g60` | 60° | não | "60° seria 1/6 (6π cm²). Como 9π / 36π = 1/4, o ângulo é 90°." |
| `g45` | 45° | não | "45° é 1/8 da volta. Para 1/4 da volta (9π em 36π), o ângulo é 90°." |

#### D5 — `area-setor-pelo-arco`
- **Enunciado:** "Um setor circular tem arco `L = 5π cm` e raio `r = 4 cm`. Usando `A = (L · r) / 2`, qual é a sua área?"
- **Fala do Paco:** "Basta fazer `(arco × raio) / 2`, igualzinho a `(base × altura) / 2`!"
- **Conta de conferência:** A = (L · r) / 2 = (5π · 4) / 2 = 10π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10p` | 10π cm² | **sim** | "Exato! Pela decomposição em fatias finas, A = (L · r) / 2 = (5π · 4) / 2 = 10π cm²." |
| `a20p` | 20π cm² | não | "Faltou dividir por 2: A = (L · r) / 2 = (5π · 4) / 2 = 10π cm²." |
| `a16p` | 16π cm² | não | "16π cm² é o círculo todo. Com arco 5π e raio 4, a área é (5π · 4)/2 = 10π cm²." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** comparar custo-benefício ou área de círculos de diâmetros diferentes (escala quadrática `r²`).
- **Onde procurar:** ENEM (questões clássicas de tamanhos de pizza, irrigação por pivô central e antenas).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular a área de setores circulares (alcance de farol, limpador de para-brisa, câmera de segurança).
- **Onde procurar:** ENEM, Unesp, Unicamp, UERJ.

#### V3 — `enem-2019-praca`
- **Enunciado (resumido):** Uma praça circular de 6 m de diâmetro será ampliada em 8 m no diâmetro (π = 3). Um estoque para 100 m² basta para a nova faixa?
- **Fala do Paco:** "Calcule o raio inicial e o raio final (com o aumento de 8 m no diâmetro) e subtraia as áreas dos dois círculos."
- **Fonte:** ENEM 2019, Questão 142 — `https://api.enem.dev/v1/exams/2019/questions/142`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`Não será suficiente, pois a área da nova região a ser pavimentada mede 120 m²`) mantidos.
- **Conta de conferência:** `r = 3 m`, `R = (6 + 8)/2 = 7 m`; `3·(7² − 3²) = 3·40 = 120 m² > 100 m²`.
- **Opções e feedback:** 21 m², 24 m², 48 m², 108 m², 120 m² (correta).

#### V4 — `enem-2018-chafariz`
- **Enunciado (resumido):** Numa coroa circular entre dois círculos concêntricos, uma corda tangente ao círculo interno mede 16 m. Qual é a área da coroa?
- **Fala do Paco:** "O raio interno até o ponto de tangência é perpendicular à corda e a divide ao meio: aplique Pitágoras com R, r e 8 m."
- **Fonte:** ENEM 2018, Questão 153 — `https://api.enem.dev/v1/exams/2018/questions/153`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`64π`) mantidos.
- **Conta de conferência:** `R² − r² = (16/2)² = 64 ⇒ Área = 64π m²`.
- **Opções e feedback:** `4π`, `8π`, `48π`, `64π` (correta), `192π`.

#### V5 — `enem-2021-cartao`
- **Enunciado (resumido):** Cartão custa R$ 0,01/cm² (máx 80 cm², π = 3, √3 = 1,7). Entre triângulo eq. L = 12, quadrado L = 8, retângulo 11 × 8, hexágono L = 6 e círculo d = 10, qual vence?
- **Fala do Paco:** "Calcule a área de cada opção e escolha a maior que não ultrapasse 80 cm²."
- **Fonte:** ENEM 2021, Questão 171 — `https://api.enem.dev/v1/exams/2021/questions/171`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`Círculo`) mantidos.
- **Conta de conferência:** triângulo `61,2 cm²`, quadrado `64 cm²`, retângulo `88 cm² (>80)`, hexágono `91,8 cm² (>80)`, círculo `3·5² = 75 cm²`.
- **Opções e feedback:** `Triângulo`, `Quadrado`, `Retângulo`, `Hexágono`, `Círculo` (correta).
