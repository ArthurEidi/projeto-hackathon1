# Plano — Áreas e volumes de sólidos compostos

**Aula:** 1 — Somar Volumes, Descontar Colagens · Silos, cápsulas, peças cavadas e imersão
**Caminho:** geometria / geometria-espacial / areas-e-volumes-por-composicao
**Pré-requisitos que o aluno já domina:** `prismas-e-paralelepipedos`, `cilindros`, `cones`, `esferas`.

## a) Ancoragem mecânica
A máquina de composição constrói objetos reais (silos, cápsulas de remédio, troféus, peças furadas) combinando blocos fundamentais: no **volume**, colar dois sólidos **soma** seus volumes (`V = V₁ + V₂`) e cavar um buraco **subtrai** (`V = V_ext − V_cava`). Já na **área da superfície exposta**, há uma regra de ouro diferente: toda face que fica **colada por dentro** deixa de ser casca externa e precisa ser descontada, enquanto **cavar** um buraco expõe novas paredes internas e **aumenta** a área de contato!

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo composição e cavidade) — oficina 3D com três montagens interativas: (1) silo = cilindro + cone no topo, (2) cápsula = cilindro + 2 semiesferas nas pontas, e (3) bloco/cilindro com cavidade cônica ou cilíndrica; slider aproxima/separa as peças e destaca em vermelho a tampa interna que desaparece da área externa ao colar.

## c) Caso neutro
Duas peças separadas antes da colagem (distância `d > 0`, ex.: um cubo e uma pirâmide de mesma base quadrada): enquanto estão separadas, tanto o volume quanto a área total são a soma simples das duas peças; ao encostar (`d = 0`), o volume continua sendo a soma, mas as duas bases coladas somem da superfície externa!

## d) Panorama e recorte
Estudamos decomposição de sólidos em prismas, pirâmides, cilindros, cones e semiesferas, diferença entre somar volumes e somar áreas expostas (desconto de faces ocultas e acréscimo de paredes cavadas) e deslocamento de líquidos entre recipientes.

## e) Progressão por contraste
1. Peças separadas versus peças coladas (ex.: silo = cilindro sem tampa superior + telhado cônico sem fundo): o volume soma (`V_cil + V_cone`), mas a área externa perde o círculo da junção.
2. Cápsula (cilindro + 2 semiesferas de mesmo raio `r`): as duas semiesferas juntas formam **1 esfera inteira** de raio `r`, sem as bases planas internas!
3. Sólido com saliência colada versus sólido com **cavidade escavada** (ex.: cilindro com um cone cavado para dentro): o volume **diminui** (`V_cil − V_cone`), mas a área superficial **aumenta** (troca a tampa plana `πr²` pela lateral interna maior `πrg` do cone!).
4. Transferência de líquido / imersão: a forma muda (ex.: de esfera para cilindro), mas o volume de líquido conserva-se invariante.

## f) Dedução causal da forma
Por que a área total de dois sólidos colados **não** é a soma das áreas totais de cada um? Porque a "área superficial" mede apenas o que pode ser pintado ou molhado por fora: quando a base do cone cola no topo do cilindro, aquele círculo `πr²` fica preso no interior da peça — desaparece `1` círculo do cone e `1` círculo do cilindro (`−2πr²`). Pelo mesmo motivo, quando escavamos um cone dentro de um cilindro maciço, o volume perde `(1/3)πr²h`, mas o pincel agora precisa pintar toda a rampa cônica interna `πrg`!

## g) Simulação espacial e fronteiras
Testar o limite de uma cápsula quando o corpo cilíndrico encolhe até `h = 0`: sobram apenas as duas semiesferas coladas, recuperando exatamente a esfera de área `4πr²` e volume `(4/3)πr³`. Em problemas de transbordamento, o volume máximo que cabe sem derramar é a diferença entre o volume do recipiente e o volume das peças mergulhadas.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Peça 1 (corpo) | Sólido principal da montagem (ex.: cilindro ou cubo). |
| c2 | Peça 2 (topo/cava) | Sólido acoplado (soma volume) ou escavado (subtrai volume). |
| c3 | Face oculta | Tampa onde as peças se colam; não entra na área externa. |
| c4 | Superfície exposta | Casca externa real que pode ser pintada ou tocada. |

### Passo 1 — `colar-silo-volume-e-area`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (colagem como processo), 2 (visual), 3 (caso neutro separado), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — cilindro (`r = 3, h = 4`, `V = 36π` em `c1`) e cone (`r = 3, h = 4, g = 5`, `V = 12π` em `c2`) começando separados e colando com o slider, piscando o disco de encontro `9π` (`c3`) que some da casca externa (`c4`).
- **Sliders:** `colar` · "Colar telhado cônico" · 0..100 · passo 50 · inicial 0 · c2
- **Paco (abertura):** "Ao colar o telhado cônico (12π) sobre o cilindro (36π), o volume soma 48π. E o disco de encontro entre eles: ainda fica exposto por fora?"
- **Interação do aluno:** junta o cone ao topo do cilindro e vê o círculo intermediário ficar oculto por dentro.
- **Conclusão:** `colar ≥ 100`
- **Paco (conclusão):** "O disco do meio fica escondido! Por fora sobram só o fundo do cilindro (9π), a parede cilíndrica (24π) e a lateral do cone (15π)."
- **Tati (dúvida):** `fim` — P: "Então no volume a gente soma tudo, mas na área só conta o que dá para pintar?" / R: "Exatamente! Volume mede o recheio; área superficial mede a pintura externa."

### Passo 2 — `capsula-duas-semiesferas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste peças soltas × esfera recomposta), 6 (dedução)
- **Widget:** WIDGET NOVO: `solido_3d` — cápsula formada por um cilindro central (`r = 3, h = 5` em `c1`) e duas semiesferas nas pontas (`r = 3` em `c2`); slider junta as duas semiesferas para mostrar que equivalem a **1 esfera inteira**.
- **Sliders:** `juntar_pontas` · "Juntar as 2 semiesferas" · 0..100 · passo 50 · inicial 0 · c2
- **Paco (abertura):** "Uma cápsula tem um cilindro no meio e duas semiesferas de raio 3 nas pontas. Juntando as duas pontas, que sólido único elas formam?"
- **Interação do aluno:** desliza o comparador e vê as duas semiesferas fecharem 1 esfera completa de raio 3 (`V = 36π`, casca `36π`).
- **Conclusão:** `juntar_pontas ≥ 100`
- **Paco (conclusão):** "Duas semiesferas formam 1 esfera inteira! Assim o volume é V_cilindro + V_esfera, e a área externa é só A_lateral_cil + A_esfera."

### Passo 3 — `cavar-diminui-volume-aumenta-area`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (colar × cavar), 6 (dedução da área cavada), 7 (fronteira)
- **Widget:** WIDGET NOVO: `solido_3d` — cilindro maciço (`r = 3, h = 4, V = 36π`) do qual se retira um cone invertido no topo (`r = 3, h = 4, g = 5, V = 12π` em `c2`), trocando a tampa plana `9π` (`c3`) pela parede cônica interna `15π` (`c4`).
- **Sliders:** `cavar` · "Escavar cone no topo" · 0..100 · passo 50 · inicial 0 · c4
- **Paco (abertura):** "Se cavarmos um buraco em forma de cone no topo do cilindro, o volume diminui. E a área total da peça: diminui também ou aumenta?"
- **Interação do aluno:** escava o cone do cilindro, vendo o volume cair de `36π` para `24π`, mas a área subir porque perdeu a tampa `9π` e ganhou o funil interno `15π`.
- **Conclusão:** `cavar ≥ 100`
- **Paco (conclusão):** "A área AUMENTA! Tiramos a tampa plana de 9π, mas abrimos uma parede inclinada maior (πrg = 15π) lá dentro."
- **Tati (dúvida):** `fim` — P: "Por que isso sempre cai nas provas?" / R: "Porque todo mundo acha que tirar volume sempre tira área. Mas fazer um furo abre paredes novas que também precisam de tinta!"

### Passo 4 — `desafio-volume-silo`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — silo composto por um cilindro de raio `r = 3 m` e altura `h_cil = 5 m` (`c1`) encimado por um cone de mesmo raio `r = 3 m` e altura `h_cone = 3 m` (`c2`).
- **Paco (abertura):** "Some o cilindro de baixo com o cone do telhado (lembre do 1/3 no cone!)."
- **Enunciado:** "Qual é o volume total de um silo formado por um cilindro (r = 3 m, h = 5 m) e um telhado cônico (r = 3 m, h = 3 m)?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `v54p` | 54π m³ | **sim** | "Exato. Cilindro: π·3²·5 = 45π; cone: (π·3²·3)/3 = 9π. Total: 45π + 9π = 54π m³." | destaca 45π no corpo e 9π no telhado |
| `v72p` | 72π m³ | não | "Você esqueceu de dividir o volume do cone por 3 (fez 45π + 27π). O certo é 45π + 9π = 54π m³." | mostra o fator 1/3 no cone do topo |
| `v45p` | 45π m³ | não | "45π m³ é só a parte cilíndrica. Somando o cone de 9π m³, dá 54π m³." | pisca o telhado cônico de 9π m³ |
| `v36p` | 36π m³ | não | "Você subtraiu 45π − 9π como se fosse buraco. Como o cone está em cima, soma-se: 54π m³." | aponta a seta de soma `45π + 9π` |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — comparativo de colagem (silo/cápsula) e escavação (bloco cavado) com destaque para as faces ocultas (`c3`) e expostas (`c4`).
- **Fórmula:** `V = V₁ ± V₂`→c1 · `e` · `A_exposta = ∑ faces externas (sem tampas coladas)`→c4
- **Definições:** "Volume por composição: soma os sólidos acoplados e subtrai as cavidades escavadas." · "Área de sólidos colados: descarta todas as faces que ficaram escondidas na colagem." · "Área de sólido escavado: perde a tampa onde o furo abriu, mas ganha toda a parede interna da cavidade."
- **Paco (abertura):** "Faces coladas ficam presas por dentro e cavidades abrem paredes novas; por isso o volume segue soma/subtração direta, mas a área conta apenas a casca exposta."
- **Dica (hint):** "Toque em cada parte da regra para ver o efeito no volume e na pintura externa."

**Frase de encerramento (outro):** "Você combinou cilindros, cones e esferas, descontou tampas ocultas na colagem e viu por que cavar um buraco aumenta a área."

## i) Treino pós-aula

### Fáceis

#### F1 — `volume-cubo-mais-piramide`
- **Enunciado:** "Um troféu é formado por um cubo de volume 64 cm³ com uma pirâmide de volume 16 cm³ colada no topo. Qual é o volume total do troféu?"
- **Conta de conferência:** V = 64 + 16 = 80 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v80` | 80 cm³ | **sim** | "Isso. Como as peças estão acopladas para fora, basta somar os volumes: 64 + 16 = 80 cm³." |
| `v48` | 48 cm³ | não | "48 seria se a pirâmide fosse cavada para dentro. Colada no topo, soma-se: 64 + 16 = 80 cm³." |
| `v64` | 64 cm³ | não | "64 cm³ é só o cubo. Com a pirâmide de 16 cm³, o total é 80 cm³." |

#### F2 — `volume-bloco-com-furo`
- **Enunciado:** "De um bloco de madeira de 200 cm³ é escavado um furo cilíndrico de 50 cm³. Qual é o volume de madeira restante?"
- **Conta de conferência:** V = 200 − 50 = 150 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v150` | 150 cm³ | **sim** | "Certo. Na cavidade retiramos material: 200 − 50 = 150 cm³." |
| `v250` | 250 cm³ | não | "O furo retira madeira, então subtraímos: 200 − 50 = 150 cm³." |
| `v100` | 100 cm³ | não | "Basta subtrair o volume do furo: 200 − 50 = 150 cm³." |

#### F3 — `faces-dois-cubos-colados`
- **Enunciado:** "Dois cubos idênticos (6 faces cada) são colados perfeitamente por uma face inteira. Quantas faces quadradas unitárias ficam EXPOSTAS por fora?"
- **Conta de conferência:** 6 + 6 − 2 faces coladas = 10 faces expostas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f10` | 10 | **sim** | "Exato. Das 12 faces (6 + 6), as 2 que se encostaram ficam escondidas no meio: 12 − 2 = 10." |
| `f12` | 12 | não | "12 é antes de colar. Ao colar, 1 face de cada cubo fica presa por dentro: 12 − 2 = 10." |
| `f11` | 11 | não | "Escondem-se 2 faces (uma do 1º cubo e uma do 2º): 12 − 2 = 10." |

#### F4 — `volume-capsula-pronta`
- **Enunciado:** "Uma cápsula tem um corpo cilíndrico de volume 30 mm³ e duas pontas semiesféricas de 10 mm³ cada. Qual é o volume total da cápsula?"
- **Conta de conferência:** 30 + 10 + 10 = 50 mm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v50` | 50 mm³ | **sim** | "Isso. Corpo (30) mais as duas semiesferas (10 + 10) somam 50 mm³." |
| `v40` | 40 mm³ | não | "Há duas pontas semiesféricas de 10 mm³ cada: 30 + 10 + 10 = 50 mm³." |
| `v20` | 20 mm³ | não | "20 mm³ são só as duas pontas. Somando o cilindro de 30 mm³, dá 50 mm³." |

### Médias

#### M1 — `volume-capsula-por-medidas`
- **Enunciado:** "Uma cápsula é formada por um cilindro de raio r = 3 mm e comprimento h = 4 mm, fechado por duas semiesferas de raio 3 mm. Qual é o volume total?"
- **Conta de conferência:** V_cil = π·3²·4 = 36π; 2 semiesferas = 1 esfera = (4/3)π·3³ = 36π; Total = 36π + 36π = 72π mm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v72p` | 72π mm³ | **sim** | "Certo. O cilindro tem 36π e as duas semiesferas formam 1 esfera de 36π: 36π + 36π = 72π mm³." |
| `v54p` | 54π mm³ | não | "54π soma apenas 1 semiesfera (18π). Com as 2 pontas (36π), dá 36π + 36π = 72π mm³." |
| `v36p` | 36π mm³ | não | "36π é só o cilindro (ou só a esfera). Juntos somam 72π mm³." |

#### M2 — `area-externa-capsula`
- **Enunciado:** "Na mesma cápsula (cilindro de r = 3 mm e h = 4 mm + duas semiesferas de r = 3 mm), qual é a ÁREA EXTERNA total?"
- **Conta de conferência:** A_lat_cil = 2π·3·4 = 24π + A_esfera = 4π·3² = 36π ⇒ 24π + 36π = 60π mm² (sem os círculos internos)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60p` | 60π mm² | **sim** | "Exato. Lateral do cilindro (24π) mais a casca das 2 semiesferas (4π·3² = 36π) dão 60π mm²." |
| `a78p` | 78π mm² | não | "Você incluiu as 2 tampas circulares internas (18π), que ficam ocultas na colagem! O certo é 60π mm²." |
| `a42p` | 42π mm² | não | "As 2 semiesferas somam 4π·3² = 36π (não 18π); com a lateral 24π, dá 60π mm²." |

#### M3 — `sorvete-casquinha-mais-bola`
- **Enunciado:** "Uma casquinha cônica de raio r = 3 cm e altura h = 6 cm está totalmente cheia de sorvete e tem ainda 1 semiesfera de raio 3 cm em cima. Qual o volume de sorvete?"
- **Conta de conferência:** V_cone = (π·9·6)/3 = 18π; V_semiesfera = (2/3)π·27 = 18π; Total = 18π + 18π = 36π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v36p` | 36π cm³ | **sim** | "Isso. No cone há (π·9·6)/3 = 18π e na semiesfera há (2/3)π·27 = 18π, somando 36π cm³." |
| `v54p` | 54π cm³ | não | "Em cima há metade de uma esfera (18π), não a esfera inteira (36π). Total: 18π + 18π = 36π cm³." |
| `v18p` | 18π cm³ | não | "18π é só o cone (ou só a semiesfera). Somando as duas partes: 36π cm³." |

### Desafios

#### D1 — `area-silo-com-fundo`
- **Enunciado:** "Um silo apoiado no chão tem corpo cilíndrico (r = 3 m, h = 4 m) e teto cônico (r = 3 m, h = 4 m, geratriz g = 5 m). Qual é a área EXTERNA lateral + teto (sem o piso)?"
- **Fala do Paco:** "Some a parede do cilindro (`2πrh`) com o chapéu do cone (`πrg`), sem a tampa do meio!"
- **Conta de conferência:** A_lat_cil = 2π·3·4 = 24π; A_lat_cone = π·3·5 = 15π; Total = 24π + 15π = 39π m²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a39p` | 39π m² | **sim** | "Exato. Parede cilíndrica 2π·3·4 = 24π mais teto cônico π·3·5 = 15π somam 39π m²." |
| `a48p` | 48π m² | não | "Você somou o círculo interno de colagem (9π). Por fora são apenas 24π + 15π = 39π m²." |
| `a36p` | 36π m² | não | "No teto cônico usa-se a geratriz g = 5 (π·3·5 = 15π), não h = 4. Total: 24π + 15π = 39π m²." |

#### D2 — `area-cilindro-com-cone-cavado`
- **Enunciado:** "De um cilindro maciço (r = 3 cm, h = 4 cm) escava-se no topo um cone de mesmo raio 3 cm e altura 4 cm (g = 5 cm). Qual é a área total da peça resultante?"
- **Conta de conferência:** fundo plano π·3² = 9π + lateral cilíndrica 2π·3·4 = 24π + parede cônica cavada π·3·5 = 15π ⇒ 9π + 24π + 15π = 48π cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a48p` | 48π cm² | **sim** | "Certo! Fundo (9π) + parede externa (24π) + funil cônico interno (15π) = 48π cm²." |
| `a42p` | 42π cm² | não | "42π era o cilindro antes de cavar. O furo tirou a tampa 9π mas abriu o cone 15π: 48π cm²." |
| `a18p` | 18π cm² | não | "Na área a parede da cavidade SOMA (não subtrai!): 9π + 24π + 15π = 48π cm²." |

#### D3 — `transferir-esfera-para-cilindro`
- **Enunciado:** "Uma esfera de gelo de raio 3 cm derrete inteira dentro de um copo cilíndrico de raio 3 cm. Qual altura h a água atinge no copo (desprezando mudança de densidade)?"
- **Conta de conferência:** V_esfera = (4/3)π·3³ = 36π = V_cilindro = π·3²·h = 9π·h ⇒ h = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h4` | 4 cm | **sim** | "Exato. Igualando 9π·h = (4/3)π·27 = 36π, achamos h = 36π / 9π = 4 cm." |
| `h3` | 3 cm | não | "O volume da esfera é 36π e a base do copo é 9π; dividindo, h = 4 cm." |
| `h6` | 6 cm | não | "6 cm é a altura da bola inteira; como ela ocupa 2/3 daquela faixa, a água fica em 4 cm." |

#### D4 — `tres-cubos-empilhados-area`
- **Enunciado:** "Três cubos de aresta 2 cm (cada face tem 4 cm²) são colados em fila formando um bloco `2 × 2 × 6`. Qual é a área total externa desse bloco?"
- **Conta de conferência:** cada cubo tem 6 faces; 3 cubos = 18 faces − 4 faces ocultas nas 2 colagens = 14 faces de 4 cm² = 56 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a56` | 56 cm² | **sim** | "Isso. Das 18 faces (3·6), 4 ficam ocultas nas duas colagens; sobram 14 · 4 cm² = 56 cm²." |
| `a72` | 72 cm² | não | "72 cm² é a soma dos 3 cubos soltos. Descontando as 4 faces coladas (16 cm²), dá 56 cm²." |
| `a64` | 64 cm² | não | "Cada colagem esconde 2 faces (4 no total): 18 − 4 = 14 faces de 4 cm² = 56 cm²." |

#### D5 — `lapis-cilindro-mais-cone`
- **Enunciado:** "Um lápis sem apontar é um cilindro de raio 1 cm e comprimento 10 cm (V = 10π). Ao apontar, os últimos 3 cm de comprimento viram um cone de altura 3 cm. Quanto volume foi perdido?"
- **Fala do Paco:** "Na faixa de 3 cm da ponta, o cone guarda 1/3 e as aparas levam 2/3!"
- **Conta de conferência:** o trecho cilíndrico de 3 cm tinha V = π·1²·3 = 3π; o cone ficou com 1π, logo perdeu-se 3π − 1π = 2π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v2p` | 2π cm³ | **sim** | "Exato! Os 3 cm cilíndricos tinham 3π cm³ e viraram um cone de 1π cm³, perdendo 2π cm³." |
| `v1p` | 1π cm³ | não | "1π cm³ é o volume da ponta cônica que ficou. O que saiu em aparas foi 3π − 1π = 2π cm³." |
| `v8p` | 8π cm³ | não | "8π cm³ é o volume do lápis apontado (7π + 1π). O volume perdido ao apontar foi 2π cm³." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular o volume de silos, reservatórios ou cápsulas compostos por cilindro + cone ou cilindro + semiesferas.
- **Onde procurar:** ENEM (questões recorrentes de silos de grãos, cápsulas de medicamentos e caminhões-tanque).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular a área externa de sólidos colados descontando as faces de contato.
- **Onde procurar:** ENEM, Fuvest, Unicamp, Unesp.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** volume e área total de sólido com cavidade escavada (ex.: cilindro com furo cônico/semiesférico).
- **Onde procurar:** Fuvest, UFPR, UFRGS, ITA.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** conservação de volume ao derreter ou transferir líquidos entre sólidos de formatos diferentes.
- **Onde procurar:** ENEM, Unicamp, UERJ.
