# Plano — Cilindros, área e volume

**Aula:** 1 — O Retângulo que Gira e Desenrola · Revolução, casca 2πrh e volume πr²h
**Caminho:** geometria / geometria-espacial / cilindros
**Pré-requisitos que o aluno já domina:** `comprimento-da-circunferencia`, `area-do-circulo-e-setores`, `prismas-e-paralelepipedos`.

## a) Ancoragem mecânica
O cilindro circular reto opera por dois mecanismos equivalentes: como **revolução**, um retângulo de largura `r` e altura `h` gira `360°` em torno de um lado fixo, varrendo discos circulares de raio `r`; como **empilhamento**, a base circular de área `πr²` sobe por `h`, acumulando o volume `V = πr²h`. Quando cortamos a parede curva verticalmente e a desenrolamos na mesa, o contorno da circunferência `2πr` vira a base de um simples retângulo de área lateral `A_l = 2πrh`.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo cilindro) — retângulo `r × h` que gira `360°` formando o cilindro reto, com sliders para o raio `r` (`c1`), a altura `h` (`c2`) e a abertura da planificação (desenrolando a lateral em um retângulo `2πr × h` em `c3` e rebatendo as duas tampas `πr²`), além do corte meridiano (`2r × h`).

## c) Caso neutro
Disco unitário `r = 1, h = 1` (ou o retângulo parado antes do giro, `θ = 0°`): com `r = 1` e `h = 1`, a área da base vale `π`, o volume vale `π` e a área lateral desenrolada vale `2π`. Serve de padrão visual para comparar o efeito linear de mudar `h` contra o efeito quadrático de mudar `r`.

## d) Panorama e recorte
Estudamos cilindro circular reto como sólido de revolução, seção meridiana (inclusive o cilindro equilátero, onde `h = 2r`), área lateral `2πrh`, área total `2πr(h + r)` e volume `πr²h`. Deixamos troncos oblíquos de cilindro fora do recorte.

## e) Progressão por contraste
1. Retângulo plano `r × h` (`θ = 0°`) girando até `360°` para fechar o cilindro 3D.
2. Parede lateral curva no 3D contra parede **desenrolada no 2D**: a largura do rótulo da lata não é `r` nem `2r`, mas todo o comprimento da volta `2πr`.
3. Dobrar a altura `h` (`2h` → volume dobra: `2V`) contra dobrar o raio `r` (`2r` → área do disco quadruplica e o volume quadruplica: `4V`).
4. Cilindro comum (`h ≠ 2r`, seção meridiana retangular) contra **cilindro equilátero** (`h = 2r`, seção meridiana é um quadrado de lado `2r`).

## f) Dedução causal da forma
Por que a área lateral do cilindro é `2πrh`? Imagine descolar o rótulo de papel de uma lata de altura `h`: ao esticar na mesa, a tira forma um retângulo cuja altura é `h` e cuja base dava a volta inteira na borda do círculo de raio `r`, medindo exatamente `2πr`. E por que o volume é `πr²h`? Porque, assim como no prisma, todas as fatias horizontais são círculos congruentes de área `A_b = πr²` empilhados ao longo da altura `h`.

## g) Simulação espacial e fronteiras
Comparar duas folhas retangulares iguais `A × B` enroladas de dois jeitos diferentes (uma fazendo `2πr₁ = A, h₁ = B` e a outra `2πr₂ = B, h₂ = A`): elas têm exatamente a **mesma área lateral**, mas volumes diferentes — ganha mais volume o cilindro mais "baixo e largo" (maior raio `r`), porque o raio entra ao quadrado no volume!

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Raio da base (r) | Distância do eixo central até a borda circular. |
| c2 | Altura (h) | Distância entre as duas tampas circulares. |
| c3 | Área lateral (2πrh) | Rótulo retangular aberto de base 2πr e altura h. |
| c4 | Volume (πr²h) | Área do disco da base (πr²) multiplicada pela altura h. |

### Passo 1 — `girar-retangulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (giro como processo), 2 (visual), 3 (caso neutro θ = 0°), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — retângulo de largura `r = 3` (`c1`) e altura `h = 4` (`c2`) parado em `giro = 0°` (caso neutro plano); ao girar até `360°`, varre o cilindro reto.
- **Sliders:** `giro` · "Girar retângulo" · 0..360 · passo 45 · inicial 0 · c1
- **Paco (abertura):** "Se o triângulo girando gerava o cone, que sólido nasce quando giramos um retângulo de largura r = 3 e altura h = 4? Gire até 360°."
- **Interação do aluno:** gira o retângulo até 360° e vê o rastro circular formar as duas tampas de raio 3 e a parede vertical.
- **Conclusão:** `giro ≥ 360`
- **Paco (conclusão):** "Nasce o cilindro reto! Como a largura r = 3 é a mesma de cima a baixo, todas as fatias circulares têm o mesmo raio."
- **Tati (dúvida):** `fim` — P: "E se cortarmos o cilindro bem pelo meio, de cima a baixo?" / R: "Aparece um retângulo de base 2r e altura h; quando h = 2r, esse corte é um quadrado e o cilindro se chama equilátero."

### Passo 2 — `desenrolar-rotulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (3D curvo × 2D plano), 6 (dedução de 2πrh)
- **Widget:** WIDGET NOVO: `solido_3d` — cilindro de raio `r = 3` (`c1`) e altura `h = 4` (`c2`) cujo rótulo lateral se desenrola em um retângulo plano de base `2πr = 6π` e altura `4` (`c3`), mais os 2 discos de área `9π`.
- **Sliders:** `desenrolar` · "Desenrolar rótulo" · 0..100 · passo 25 · inicial 0 · c3
- **Paco (abertura):** "Ao cortar e esticar o rótulo da lata na mesa, ele vira um retângulo de altura 4. Quanto mede a base desse retângulo?"
- **Interação do aluno:** desenrola o rótulo até 100% e vê a borda do círculo de raio 3 esticar-se no segmento `2π·3 = 6π`.
- **Conclusão:** `desenrolar ≥ 100`
- **Paco (conclusão):** "A base do rótulo dava a volta no círculo, por isso mede o comprimento da circunferência: 2πr! Logo a área lateral é 2πr · h."

### Passo 3 — `dobrar-altura-vs-dobrar-raio`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste linear × quadrático), 6 (dedução do volume), 7 (fronteira de otimização)
- **Widget:** WIDGET NOVO: `solido_3d` — cilindro de referência fantasma (`r = 2, h = 3 → V = 12π` em `c4`); sliders permitem testar dobrar `h` para `6` (`V = 24π`) ou dobrar `r` para `4` (`V = 48π`).
- **Sliders:** `r` · "Raio (r)" · 2..4 · passo 2 · inicial 2 · c1
- **Paco (abertura):** "No cilindro de raio 2 e altura 3, o volume é π·2²·3 = 12π. Se você dobrar o raio para 4, o volume dobra para 24π ou quadruplica para 48π?"
- **Interação do aluno:** dobra o raio `r` de 2 para 4 e vê a base circular quadruplicar de `4π` para `16π`, levando o volume a `48π`.
- **Conclusão:** `r ≥ 4`
- **Paco (conclusão):** "Quadruplica para 48π! A altura entra uma vez só, mas o raio está ao quadrado na área do disco (πr²): dobrar r multiplica o volume por 4."
- **Tati (dúvida):** `fim` — P: "Então, com a mesma folha de papel, enrolar baixinho e largo guarda mais volume?" / R: "Sim! Quem tem maior raio vence no volume, porque o r² pesa mais do que a altura h."

### Passo 4 — `desafio-volume-cilindro`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cilindro reto com raio `r = 3 cm` (`c1`) e altura `h = 5 cm` (`c2`).
- **Paco (abertura):** "Calcule primeiro a área do disco da base (πr²)."
- **Enunciado:** "Qual é o volume de um cilindro reto de raio r = 3 cm e altura h = 5 cm?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `v45p` | 45π cm³ | **sim** | "Exato. A base tem área π·3² = 9π cm²; vezes a altura 5 cm, dá 45π cm³." | empilha 5 camadas de área 9π em `c4` |
| `v30p` | 30π cm³ | não | "30π é a área lateral (2π·3·5). No volume usamos πr²h = π·9·5 = 45π cm³." | destaca o disco cheio `π·3² = 9π` contra a borda `2π·3` |
| `v15p` | 15π cm³ | não | "Você esqueceu de elevar o raio ao quadrado (fez 3·5) ou dividiu por 3. É π·3²·5 = 45π cm³." | mostra `r² = 3² = 9` na base |
| `v75p` | 75π cm³ | não | "Você trocou os papéis e elevou a altura ao quadrado (3·5²). É π·3²·5 = 45π cm³." | destaca `r = 3` na base circular e `h = 5` na vertical |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cilindro com sua planificação ao lado mostrando `r` (`c1`), `h` (`c2`), rótulo `2πrh` (`c3`) e volume `πr²h` (`c4`).
- **Fórmula:** `A_l`→c3 · `=` · `2π` · `r`→c1 · `h`→c2 · `e` · `V`→c4 · `=` · `π` · `r²`→c1 · `h`→c2
- **Definições:** "Área lateral (2πrh): retângulo aberto cuja base é o comprimento da circunferência 2πr." · "Área total: rótulo lateral mais as duas tampas circulares (2πrh + 2πr²)." · "Volume do cilindro: área do círculo da base vezes a altura (πr²h)."
- **Paco (abertura):** "O rótulo aberto tem largura 2πr e cada fatia horizontal tem área πr²; por isso A_l = 2πrh e V = πr²h."
- **Dica (hint):** "Toque em cada letra para ver o raio, a altura, o rótulo ou o volume."

**Frase de encerramento (outro):** "Você gerou o cilindro girando um retângulo, desenrolou o rótulo 2πrh e viu por que dobrar o raio quadruplica o volume πr²h."

## i) Treino pós-aula

### Fáceis

#### F1 — `volume-cilindro-r2-h5`
- **Enunciado:** "Qual é o volume de um cilindro reto de raio r = 2 cm e altura h = 5 cm?"
- **Conta de conferência:** V = π · 2² · 5 = 20π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v20p` | 20π cm³ | **sim** | "Isso. A base tem π·2² = 4π cm²; multiplicando por h = 5 cm, V = 20π cm³." |
| `v10p` | 10π cm³ | não | "Você fez 2·5 sem elevar o raio ao quadrado. O certo é π·2²·5 = 20π cm³." |
| `v50p` | 50π cm³ | não | "Você elevou a altura ao quadrado (2·5²). O raio é 2: π·2²·5 = 20π cm³." |

#### F2 — `area-lateral-cilindro`
- **Enunciado:** "Uma lata cilíndrica tem raio r = 3 cm e altura h = 10 cm. Qual é a área do seu rótulo lateral (A_l = 2πrh)?"
- **Conta de conferência:** A_l = 2π · 3 · 10 = 60π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60p` | 60π cm² | **sim** | "Certo. O rótulo aberto mede 2π·3 = 6π de largura por 10 de altura: 60π cm²." |
| `a30p` | 30π cm² | não | "Faltou o 2 do comprimento da circunferência (2πr): 2π·3·10 = 60π cm²." |
| `a90p` | 90π cm² | não | "90π é o volume (πr²h). A área lateral é 2πrh = 60π cm²." |

#### F3 — `diametro-para-raio`
- **Enunciado:** "Um tambor cilíndrico tem DIÂMETRO de 6 m e altura de 2 m. Qual é o seu volume?"
- **Conta de conferência:** d = 6 ⇒ r = 3 m; V = π · 3² · 2 = 18π m³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v18p` | 18π m³ | **sim** | "Exato. Diâmetro 6 m significa raio r = 3 m; logo V = π·3²·2 = 18π m³." |
| `v72p` | 72π m³ | não | "Você usou o diâmetro 6 como raio! O raio é a metade (3 m): π·3²·2 = 18π m³." |
| `v12p` | 12π m³ | não | "12π é a área lateral. Com r = 3 m, o volume é π·3²·2 = 18π m³." |

#### F4 — `comparar-cilindro-cone`
- **Enunciado:** "Um cilindro e um cone têm o mesmo raio e a mesma altura. Se o cone tem volume 15 cm³, qual é o volume do cilindro?"
- **Conta de conferência:** V_cilindro = 3 · V_cone = 3 · 15 = 45 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v45` | 45 cm³ | **sim** | "Isso. O cilindro comporta exatamente 3 cones de mesma base e altura: 3·15 = 45 cm³." |
| `v30` | 30 cm³ | não | "A relação é o triplo (não o dobro): 3 · 15 = 45 cm³." |
| `v15` | 15 cm³ | não | "O cone afunila para 1/3; o cilindro inteiro tem 3 · 15 = 45 cm³." |

### Médias

#### M1 — `area-total-cilindro`
- **Enunciado:** "Qual é a área TOTAL (lateral + 2 tampas) de um cilindro reto de raio r = 2 cm e altura h = 3 cm?"
- **Conta de conferência:** A_l = 2π·2·3 = 12π; 2 bases = 2·(π·2²) = 8π; A_t = 12π + 8π = 20π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20p` | 20π cm² | **sim** | "Certo. Lateral 2π·2·3 = 12π mais 2 tampas de 4π cada (8π) somam 20π cm²." |
| `a16p` | 16π cm² | não | "Você somou só 1 tampa (12π + 4π). Com fundo e tampa são 12π + 8π = 20π cm²." |
| `a12p` | 12π cm² | não | "12π é só a lateral (ou o volume). Somando as 2 tampas (8π), dá 20π cm²." |

#### M2 — `cilindro-equilatero`
- **Enunciado:** "Um cilindro equilátero (onde a altura é igual ao diâmetro, h = 2r) tem raio r = 3 cm. Qual é o seu volume?"
- **Conta de conferência:** r = 3 ⇒ h = 2·3 = 6 cm; V = π · 3² · 6 = 54π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v54p` | 54π cm³ | **sim** | "Exato. No cilindro equilátero h = 2r = 6 cm; logo V = π·3²·6 = 54π cm³." |
| `v27p` | 27π cm³ | não | "Você usou h = r = 3 cm. No cilindro equilátero h = 2r = 6 cm, dando 54π cm³." |
| `v36p` | 36π cm³ | não | "36π cm² é a área lateral (2π·3·6). O volume é π·9·6 = 54π cm³." |

#### M3 — `achar-altura-pelo-volume-cil`
- **Enunciado:** "Um reservatório cilíndrico de raio r = 2 m contém 36π m³ de água. Qual é a altura da coluna de água?"
- **Conta de conferência:** π · 2² · h = 36π ⇒ 4π · h = 36π ⇒ h = 9 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h9` | 9 m | **sim** | "Isso. A área da base é π·2² = 4π m²; dividindo 36π por 4π, temos h = 9 m." |
| `h18` | 18 m | não | "Você dividiu por 2 em vez de 2² = 4. Como A_b = 4π, h = 36π / 4π = 9 m." |
| `h6` | 6 m | não | "Divida o volume 36π pela área da base 4π: h = 36 / 4 = 9 m." |

### Desafios

#### D1 — `dobrar-raio-metade-altura`
- **Enunciado:** "Se dobrarmos o raio da base de um cilindro (2r) e reduzirmos sua altura à metade (h/2), o que acontece com o volume?"
- **Fala do Paco:** "O raio entra ao quadrado (×4) e a altura entra simples (÷2)!"
- **Conta de conferência:** V_novo = π · (2r)² · (h/2) = 4 · (1/2) · πr²h = 2 · V

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `dobra` | Dobra (multiplica por 2) | **sim** | "Exato! Dobrar o raio multiplica por 2² = 4, e cortar a altura ao meio divide por 2: 4 / 2 = 2." |
| `igual` | Não muda (continua igual) | não | "Armadilha famosa! O raio ganha da altura porque está ao quadrado: 4 / 2 = 2 (dobra)." |
| `quad` | Quadruplica (multiplica por 4) | não | "4 seria se a altura ficasse fixa. Como a altura caiu à metade, 4 / 2 = 2." |

#### D2 — `area-secao-meridiana`
- **Enunciado:** "Um cilindro reto tem raio r = 4 cm e altura h = 7 cm. Qual é a área da sua seção meridiana (corte vertical pelo eixo)?"
- **Conta de conferência:** retângulo de largura 2r = 8 cm e altura 7 cm ⇒ A = 8 · 7 = 56 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a56` | 56 cm² | **sim** | "Certo. O corte pelo eixo é um retângulo de base 2r = 8 cm e altura 7 cm: 8·7 = 56 cm²." |
| `a28` | 28 cm² | não | "28 cm² usa só o raio 4. O corte atravessa o diâmetro todo (2r = 8 cm): 8·7 = 56 cm²." |
| `a56p` | 56π cm² | não | "56π é a área lateral curva. O corte plano interno é um retângulo comum sem π: 56 cm²." |

#### D3 — `volume-usando-pi-3`
- **Enunciado:** "Adotando π = 3, quantos LITROS cabem num tonel cilíndrico de raio r = 1 m e altura h = 2 m? (Lembre: 1 m³ = 1000 L)."
- **Conta de conferência:** V = 3 · 1² · 2 = 6 m³ = 6000 L

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l6000` | 6000 L | **sim** | "Exato. V = 3 · 1² · 2 = 6 m³; como cada m³ tem 1000 L, cabem 6000 L." |
| `l6` | 6 L | não | "6 é o volume em m³. Multiplicando por 1000 L por m³, são 6000 L." |
| `l3000` | 3000 L | não | "Com π = 3, r = 1 e h = 2, temos V = 3·1·2 = 6 m³ = 6000 L." |

#### D4 — `cano-oco-coroa`
- **Enunciado:** "Um tubo de concreto tem raio externo R = 5 cm, furo de raio r = 3 cm e altura h = 10 cm. Qual é o volume de concreto?"
- **Conta de conferência:** V = π(R² − r²)·h = π(25 − 9)·10 = 16π · 10 = 160π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v160p` | 160π cm³ | **sim** | "Isso. Cilindro externo (250π) menos o furo interno (90π): π·(25 − 9)·10 = 160π cm³." |
| `v40p` | 40π cm³ | não | "Não faça (5 − 3)²; subtraia os quadrados dos raios: (5² − 3²)·10π = 160π cm³." |
| `v250p` | 250π cm³ | não | "250π é o cilindro maciço sem descontar o furo de 90π: 250π − 90π = 160π cm³." |

#### D5 — `enrolar-folha-dois-jeitos`
- **Enunciado:** "Uma folha de largura 6π cm e altura 4 cm é enrolada formando um cilindro de altura 4 cm (2πr = 6π). Qual é o volume?"
- **Fala do Paco:** "De `2πr = 6π` você descobre o raio `r` na hora!"
- **Conta de conferência:** 2πr = 6π ⇒ r = 3 cm; V = π · 3² · 4 = 36π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v36p` | 36π cm³ | **sim** | "Exato. Como a volta 2πr = 6π dá r = 3 cm, o volume é π·3²·4 = 36π cm³." |
| `v144p` | 144π cm³ | não | "6π é a circunferência inteira 2πr, então r = 3 cm (não 6): π·3²·4 = 36π cm³." |
| `v24p` | 24π cm³ | não | "24π é a área da folha (6π·4). Com r = 3 cm, o volume é π·9·4 = 36π cm³." |

### Vestibular

#### V1 — `enem-2022-caixas`
- **Enunciado (resumido):** Cilindro I tem altura P, área A_b e raio r. Qual tem maior volume: II (2P, A_b/2), III (2P, r/2), IV (P/2, 2A_b) ou V (P/2, 2r)?
- **Fala do Paco:** "Escreva o volume de cada modelo em função de V_I = πr²P."
- **Fonte:** ENEM 2022, Questão 169 — `https://api.enem.dev/v1/exams/2022/questions/169`
- **Adaptação:** enunciado resumido; alternativas e gabarito (V) mantidos.
- **Conta de conferência:** `V_I = πr²P`; `V_II = V_I`; `V_III = V_I/2`; `V_IV = V_I`; `V_V = π(2r)²(P/2) = 2V_I`.
- **Opções e feedback:** I, II, III, IV, V (correta).

#### V2 — `enem-2010-manilha`
- **Enunciado (resumido):** Um cilindro de 2 m de diâmetro e 4 m de altura recebe camada de concreto de 20 cm. A R$ 10/m³ e π = 3,1, quanto custa a manilha?
- **Fala do Paco:** "Calcule o volume da casca subtraindo o cilindro interno (r = 1 m) do externo (R = 1,2 m)."
- **Fonte:** ENEM 2010, Questão 157 — `https://api.enem.dev/v1/exams/2010/questions/157`
- **Adaptação:** enunciado resumido; alternativas e gabarito (R$ 54,56) mantidos.
- **Conta de conferência:** `r = 1 m, R = 1,2 m, h = 4 m => V = 3,1·(1,44 - 1)·4 = 5,456 m³`; `5,456 · 10 = R$ 54,56`.
- **Opções e feedback:** R$ 230,40, R$ 124,00, R$ 104,16, R$ 54,56 (correta), R$ 49,60.

#### V3 — `enem-2021-reservatorio`
- **Enunciado (resumido):** Reservatório cilíndrico de 5 m de diâmetro atende 100 pessoas por 7 dias a 120 L/dia por pessoa. Com π = 3, qual a altura mínima em m?
- **Fala do Paco:** "Converta os litros totais para m³ (1.000 L = 1 m³) e use r = 2,5 m."
- **Fonte:** ENEM 2021, Questão 167 — `https://api.enem.dev/v1/exams/2021/questions/167`
- **Adaptação:** enunciado resumido; alternativas e gabarito (4,48) mantidos.
- **Conta de conferência:** `100·120·7 = 84 000 L = 84 m³`; `3·2,5²·h = 18,75h = 84 => h = 4,48 m`.
- **Opções e feedback:** 1,12, 3,10, 4,35, 4,48 (correta), 5,60.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** cilindro equilátero e transferência de líquido entre cilindros de raios diferentes.
- **Onde procurar:** ENEM, UERJ, Unicamp.
