# Plano — Circunferência, arcos e ângulos

**Aula:** 1 — Do Centro à Borda · Ângulo central, ângulo inscrito e arco capaz de 90°
**Caminho:** geometria / geometria-plana / circunferencia-arcos-e-angulos
**Pré-requisitos que o aluno já domina:** polígonos regulares, soma dos ângulos de um triângulo.

## a) Ancoragem mecânica
A máquina prende dois pontos A e B na circunferência, definindo um arco AB e seu ângulo central α, e deixa o aluno passear com um terceiro ponto V pela borda. A entrada é a abertura do arco AB e a posição de V; a saída é o ângulo inscrito β, que vale sempre metade de α enquanto V está fora do arco AB.

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo circunferência: centro O, pontos A e B arrastáveis na borda determinando o arco AB (c1) e o ângulo central α = AÔB (c2), e vértice V na borda formando o ângulo inscrito β = AV̂B (c3), além de cordas e diâmetro (c4).

## c) Caso neutro
Quando A e B coincidem, o arco AB mede 0° e tanto o ângulo central α quanto o inscrito β valem 0°. Ao afastar B de A, o arco abre e os dois ângulos crescem juntos na razão de 2 para 1.

## d) Panorama e recorte
Existem ângulos excêntricos interiores e exteriores, potência de ponto e quadriláteros inscritíveis. Aqui: elementos da circunferência (raio, corda, diâmetro, arco), relação β = α / 2 entre ângulo inscrito e central, e o triângulo retângulo inscrito na semicircunferência.

## e) Progressão por contraste
1. Arco AB e ângulo central α = AÔB: no centro, o ângulo tem exatamente a mesma medida em graus que o arco (referência).
2. Vértice V recuado até a borda oposta: o ângulo inscrito β = AV̂B cai exatamente para a metade, β = α / 2.
3. Passeio de V pela borda mantendo A e B fixos: o ângulo inscrito β permanece constante em qualquer ponto do arco maior.
4. Caso especial AB como diâmetro (α = 180°): o ângulo inscrito β trava em 90°, formando sempre um triângulo retângulo.

## f) Dedução causal da forma
Ligando o vértice V ao centro O, os segmentos OA, OB e OV são todos raios e têm a mesma medida. Assim, o triângulo OAV é isósceles de base AV (dois ângulos iguais a x) e OBV é isósceles de base BV (dois ângulos iguais a y). Pelo teorema do ângulo externo no centro O, o ângulo central soma 2x + 2y = 2(x + y); como o ângulo inscrito é β = x + y, concluímos que α = 2β, ou seja, β = α / 2.

## g) Simulação espacial e fronteiras
Enquanto V passeia pelo arco maior AB, β vale α / 2 constante. Se V atravessa A ou B e entra no arco menor AB, ele passa a enxergar o arco reentrante de 360° − α, e o ângulo inscrito salta para (360° − α) / 2 = 180° − β (suplementar).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Arco AB | Trecho da circunferência compreendido entre os pontos A e B. |
| c2 | Ângulo central (α) | Ângulo com vértice no centro O; tem a mesma medida em graus do arco AB. |
| c3 | Ângulo inscrito (β) | Ângulo com vértice V na borda; vale metade do ângulo central (α / 2). |
| c4 | Diâmetro / Corda | Segmento que une dois pontos da borda; passando por O, é o diâmetro (2r). |

### Passo 1 — `arco-e-central`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo circunferência) — centro O, ponto A fixo em 0° e ponto B arrastável; arco AB (c1) e ângulo central `alfa` (c2) começando em 0°. Emite `alfa`.
- **Sliders:** `alfa` · "Arco AB (α)" · 0..180 · passo 10 · inicial 0 · c2
- **Paco (abertura):** "Com A e B juntos, o arco é 0°. Abra o arco até 80°: quanto mede o ângulo central lá no centro O?"
- **Interação do aluno:** move o slider (ou arrasta B na borda) de 0° até 80° e vê o arco e o ângulo no centro crescerem juntos.
- **Conclusão:** `alfa ≥ 80`
- **Paco (conclusão):** "Mede os mesmos 80°. Por definição, a medida em graus do arco AB é igual à do ângulo central α que o enxerga."
- **Tati (dúvida):** `fim` — P: "E se o vértice do ângulo sair do centro?" / R: "Ele pode ir para a borda (inscrito), para dentro ou para fora da circunferência. Hoje investigamos o ângulo inscrito na borda."

### Passo 2 — `angulo-inscrito-metade`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — arco AB (c1) com ângulo central `alfa` (c2) e vértice V na borda oposta formando o ângulo inscrito `beta` (c3); chave mostra o raio OV e os triângulos isósceles. Emite `alfa`.
- **Sliders:** `alfa` · "Ângulo central α" · 40..160 · passo 20 · inicial 80 · c2
- **Paco (abertura):** "O vértice V recuou do centro para a borda oposta. Leve α até 120°: quanto vale o ângulo inscrito β em relação a α?"
- **Interação do aluno:** varia α até 120° e compara o marcador de α no centro com o de β no vértice V.
- **Conclusão:** `alfa ≥ 120`
- **Paco (conclusão):** "Vale 60°, exatamente a metade. Como os raios OA, OB e OV são iguais, os triângulos isósceles dobram o ângulo ao chegar no centro: β = α / 2."

### Passo 3 — `passeio-na-borda`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 7 (invariância e fronteira do arco menor)
- **Widget:** `geometria_plana` — arco AB fixo em α = 100° (c1, c2); ponto V arrastável pela circunferência inteira (posição `pos_v` em graus), exibindo `beta` (c3). Emite `pos_v`.
- **Sliders:** `pos_v` · "Posição de V" · 120..300 · passo 20 · inicial 180 · c3
- **Paco (abertura):** "Deixe o arco AB fixo em 100° e passeie com o vértice V pela borda. O ângulo inscrito β muda de valor no caminho?"
- **Interação do aluno:** move V ao longo do arco maior e observa o rótulo de β travado em 50°.
- **Conclusão:** `pos_v ≥ 260`
- **Paco (conclusão):** "Não muda: fica cravado em 50° em todo o arco maior, pois V continua enxergando o mesmo arco de 100°."
- **Tati (dúvida):** `fim` — P: "E se V entrar dentro do próprio arco de 100°?" / R: "Aí ele passa a enxergar o arco de trás, de 260°, e o ângulo vira 260° / 2 = 130°, o suplementar de 50°."

### Passo 4 — `semicircunferencia-90`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6, 7 (caso limite: diâmetro)
- **Widget:** `geometria_plana` — corda AB (c4) ajustável até virar diâmetro (α = 180°); triângulo inscrito AVB com marcador de ângulo reto quando α = 180°. Emite `alfa`.
- **Sliders:** `alfa` · "Abertura AB (α)" · 100..180 · passo 20 · inicial 120 · c4
- **Paco (abertura):** "Abra a corda AB até ela passar pelo centro e virar um diâmetro (α = 180°). Que ângulo aparece no vértice V?"
- **Interação do aluno:** leva α até 180° e vê o símbolo de 90° acender em V para qualquer posição na semicircunferência.
- **Conclusão:** `alfa ≥ 180`
- **Paco (conclusão):** "Aparece um ângulo reto de 180° / 2 = 90°. Todo triângulo inscrito numa semicircunferência, com o diâmetro como lado, é retângulo."

### Passo 5 — `desafio-inscrito`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `geometria_plana_figura` — circunferência com ângulo inscrito β = 35° (c3) enxergando o arco AB (c1) e o ângulo central α = AÔB (c2) com ponto de interrogação.
- **Paco (abertura):** "Veja quem está na borda e quem está no centro antes de fazer a conta."
- **Enunciado:** "O ângulo inscrito AV̂B mede 35°. Quanto mede o ângulo central AÔB que enxerga o mesmo arco?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a70` | 70° | **sim** | "Isso. O central é o dobro do inscrito: 2·35° = 70°." | raio OV tracejado mostrando dois triângulos isósceles e α = 70° no centro |
| `a175` | 17,5° | não | "Você dividiu por 2, mas 35° já é o inscrito na borda. O central é o dobro: 70°." | destaque em V na borda (35°) e seta dobrando até O (70°) |
| `a35` | 35° | não | "35° é o inscrito na borda. No centro o ângulo dobra: 2·35° = 70°." | arco AB e centro O piscando com α = 2·β = 70° |
| `a145` | 145° | não | "145° é o suplementar (180° − 35°). O central vale o dobro do inscrito: 70°." | comparação visual entre 70° (agudo) e 145° (obtuso) |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — circunferência com arco AB = 100° (c1), central α = 100° (c2), inscrito β = 50° (c3) e diâmetro tracejado (c4).
- **Fórmula:** `β`→c3 · `=` · `α`→c2 · `/` · `2`
- **Definições:** "Ângulo central (α): vértice no centro; mede o mesmo que o arco AB." · "Ângulo inscrito (β): vértice na borda; vale metade do central (α / 2)." · "Semicircunferência (α = 180°): todo ângulo inscrito sobre o diâmetro é reto (90°)."
- **Paco (abertura):** "Os raios formam triângulos isósceles do centro até a borda, por isso o ângulo inscrito vale sempre metade do ângulo central."
- **Dica (hint):** "Toque em cada letra para destacar o arco, o ângulo central e o ângulo inscrito."

**Frase de encerramento (outro):** "Você relacionou arco, ângulo central e ângulo inscrito e descobriu por que o diâmetro sempre enxerga 90° na borda."

## i) Treino pós-aula

### Fáceis

#### F1 — `central-para-inscrito`
- **Enunciado:** "Em uma circunferência, o ângulo central AÔB mede 80°. Quanto mede o ângulo inscrito AV̂B no mesmo arco?"
- **Conta de conferência:** 80° / 2 = 40°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a40` | 40° | **sim** | "Certo. O ângulo inscrito é metade do central: 80° / 2 = 40°." |
| `a80` | 80° | não | "80° é o central e o arco. Na borda, o inscrito vale metade: 40°." |
| `a160` | 160° | não | "160° dobra o central. O inscrito divide por 2: 80° / 2 = 40°." |
| `a100` | 100° | não | "100° é 180° − 80°. O inscrito vale metade do central: 40°." |

#### F2 — `inscrito-para-arco`
- **Enunciado:** "Um ângulo inscrito mede 25°. Qual é a medida em graus do arco que ele enxerga?"
- **Conta de conferência:** 2·25° = 50°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50° | **sim** | "Isso. O arco tem o dobro do ângulo inscrito: 2·25° = 50°." |
| `a25` | 25° | não | "25° é na borda. O arco e o ângulo central valem o dobro: 50°." |
| `a125` | 12,5° | não | "Não divida por 2; do inscrito para o arco multiplica-se por 2: 50°." |
| `a75` | 75° | não | "O arco mede o dobro do inscrito: 2·25° = 50°." |

#### F3 — `diametro-e-raio`
- **Enunciado:** "Uma circunferência tem raio de 6 cm. Qual é o comprimento da maior corda que podemos traçar nela?"
- **Conta de conferência:** diâmetro = 2·6 = 12 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 cm | **sim** | "Exato. A maior corda é o diâmetro, que vale dois raios: 2·6 = 12 cm." |
| `a6` | 6 cm | não | "6 cm é o raio. A maior corda passa pelo centro (diâmetro): 2·6 = 12 cm." |
| `a3` | 3 cm | não | "3 cm é metade do raio. O diâmetro vale o dobro do raio: 12 cm." |
| `a36` | 36 cm | não | "36 é 6². O diâmetro é o dobro do raio: 2·6 = 12 cm." |

#### F4 — `triangulo-no-diametro`
- **Enunciado:** "Um triângulo está inscrito numa circunferência e um de seus lados é o diâmetro. Quanto mede o ângulo oposto ao diâmetro?"
- **Conta de conferência:** 180° / 2 = 90°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a90` | 90° | **sim** | "Certo. O diâmetro determina um arco de 180°, e o inscrito vale 180° / 2 = 90°." |
| `a180` | 180° | não | "180° é o arco da semicircunferência. O ângulo inscrito vale metade: 90°." |
| `a60` | 60° | não | "60° é do triângulo equilátero. Sobre o diâmetro, o ângulo é sempre 90°." |
| `a45` | 45° | não | "45° são os outros ângulos se for isósceles. O oposto ao diâmetro mede 90°." |

### Médias

#### M1 — `dois-inscritos-mesmo-arco`
- **Enunciado:** "Os ângulos inscritos AV̂B e AŴB enxergam o mesmo arco AB. Se AV̂B = 42°, quanto mede AŴB?"
- **Conta de conferência:** ambos valem α / 2 = 42°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a42` | 42° | **sim** | "Isso. Ângulos inscritos que enxergam o mesmo arco têm a mesma medida: 42°." |
| `a84` | 84° | não | "84° é o ângulo central e o arco AB. Na borda, AŴB também mede 42°." |
| `a21` | 21° | não | "Ambos estão na borda e valem metade do arco de 84°, logo AŴB = 42°." |
| `a138` | 138° | não | "138° seria no arco menor oposto. No mesmo arco, AŴB = 42°." |

#### M2 — `triangulo-semicirculo-angulos`
- **Enunciado:** "AB é diâmetro e C está na circunferência. Se o ângulo CÂB mede 30°, quanto mede o ângulo CBA?"
- **Conta de conferência:** AĈB = 90° ⇒ 180° − 90° − 30° = 60°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60` | 60° | **sim** | "Exato. Como AĈB = 90° (oposto ao diâmetro), sobra 90° − 30° = 60°." |
| `a90` | 90° | não | "90° é o ângulo em C. Em B sobra 180° − 90° − 30° = 60°." |
| `a30` | 30° | não | "Com 30° e 90° a soma daria 150°. Faltam 60° para completar 180°." |
| `a150` | 150° | não | "Esqueceu o ângulo reto em C (90°). O ângulo em B mede 90° − 30° = 60°." |

#### M3 — `poligono-regular-arco`
- **Enunciado:** "Um hexágono regular divide a circunferência em 6 arcos iguais. Quanto mede cada arco e o ângulo inscrito que enxerga um lado?"
- **Conta de conferência:** arco = 360° / 6 = 60°; inscrito = 60° / 2 = 30°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60-30` | Arco 60° e inscrito 30° | **sim** | "Certo. 360° / 6 = 60° por arco, e o inscrito vale metade: 30°." |
| `a60-60` | Arco 60° e inscrito 60° | não | "60° é o central. O inscrito vale metade do arco: 60° e 30°." |
| `a120-60` | Arco 120° e inscrito 60° | não | "120° é o ângulo interno do hexágono. Um arco só mede 360° / 6 = 60°, e o inscrito 30°." |
| `a30-15` | Arco 30° e inscrito 15° | não | "São 6 lados, não 12: 360° / 6 = 60° de arco e 30° de ângulo inscrito." |

### Desafios

#### D1 — `triangulo-isosceles-raios`
- **Enunciado:** "O ângulo central AÔB mede 100°. No triângulo OAB (formado por dois raios e a corda AB), quanto mede o ângulo OÂB?"
- **Conta de conferência:** OA = OB ⇒ (180° − 100°) / 2 = 40°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a40` | 40° | **sim** | "Isso. Como OA = OB (raios), o triângulo é isósceles: (180° − 100°) / 2 = 40°." |
| `a50` | 50° | não | "50° seria o ângulo inscrito na borda. No triângulo OAB, (180° − 100°) / 2 = 40°." |
| `a80` | 80° | não | "80° é a soma dos dois ângulos da base (180° − 100°). Cada um mede 40°." |
| `a100` | 100° | não | "100° é o ângulo no centro O. Na base, cada ângulo mede (180° − 100°) / 2 = 40°." |

#### D2 — `quadrilatero-inscrito-fronteira`
- **Enunciado:** "O arco menor AB mede 110°. Se o ponto V está DENTRO desse arco menor AB, quanto mede o ângulo AV̂B?"
- **Fala do Paco:** "Atenção à fronteira: quando V entra no arco menor, ele olha para o arco maior de trás."
- **Conta de conferência:** arco maior = 360° − 110° = 250° ⇒ β = 250° / 2 = 125°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a125` | 125° | **sim** | "Exato. V enxerga o arco maior de 360° − 110° = 250°, logo 250° / 2 = 125°." |
| `a55` | 55° | não | "55° é para V no arco maior. No arco menor, vale o suplementar: 180° − 55° = 125°." |
| `a110` | 110° | não | "110° é o arco menor. V enxerga os 250° restantes, dando 250° / 2 = 125°." |
| `a250` | 250° | não | "250° é o arco maior inteiro. O ângulo inscrito vale metade: 125°." |

#### D3 — `soma-central-e-inscrito`
- **Enunciado:** "A soma de um ângulo central com o ângulo inscrito que enxerga o mesmo arco é 105°. Quanto mede o ângulo inscrito?"
- **Conta de conferência:** 2β + β = 105° ⇒ 3β = 105° ⇒ β = 35°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a35` | 35° | **sim** | "Certo. Como α = 2β, temos 2β + β = 3β = 105°, logo β = 35°." |
| `a70` | 70° | não | "70° é o ângulo central (2·35°). O inscrito vale um terço da soma: 35°." |
| `a525` | 52,5° | não | "52,5° divide 105° por 2, mas α = 2β (soma 3β). Divida por 3: β = 35°." |
| `a30` | 30° | não | "Com 30° a soma seria 30° + 60° = 90°. Para dar 105°, β = 105° / 3 = 35°." |

#### D4 — `arco-nao-inteiro`
- **Enunciado:** "Uma roda-gigante tem 8 cabines igualmente espaçadas. Qual é o ângulo inscrito em uma cabine que enxerga duas cabines vizinhas (1 arco)?"
- **Conta de conferência:** arco = 360° / 8 = 45° ⇒ inscrito = 45° / 2 = 22,5°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a225` | 22,5° | **sim** | "Isso. Cada arco mede 360° / 8 = 45°, e o inscrito vale metade: 22,5°." |
| `a45` | 45° | não | "45° é o ângulo central no eixo da roda. Na cabine da borda é metade: 22,5°." |
| `a90` | 90° | não | "90° são dois arcos no centro. Um arco visto da borda mede 45° / 2 = 22,5°." |
| `a1125` | 11,25° | não | "Você dividiu 45° por 4. O inscrito é metade do arco de 45°: 22,5°." |

#### D5 — `cruzamento-diametro-inscrito`
- **Enunciado:** "AB é diâmetro e C e D estão na circunferência. Se o arco AC mede 70°, quanto mede o ângulo inscrito AD̂B mais o ângulo CD̂B?"
- **Fala do Paco:** "Última. Calcule cada ângulo inscrito pela metade do arco que ele enxerga."
- **Conta de conferência:** AD̂B = 180° / 2 = 90°; arco CB = 180° − 70° = 110° ⇒ CD̂B = 110° / 2 = 55°; soma = 90° + 55° = 145°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a145` | 145° | **sim** | "Exato. AD̂B = 90° (diâmetro) e o arco CB = 110° dá CD̂B = 55°; juntos somam 145°." |
| `a125` | 125° | não | "125° soma 90° + 35° (arco AC). O arco CB mede 180° − 70° = 110°, logo 90° + 55° = 145°." |
| `a90` | 90° | não | "90° é só AD̂B. Somando CD̂B = (180° − 70°) / 2 = 55°, temos 145°." |
| `a160` | 160° | não | "CD̂B vale metade de 110° (55°), não 70°. A soma é 90° + 55° = 145°." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** relação entre ângulo central e ângulo inscrito em problemas de relógio ou roda-gigante.
- **Onde procurar:** ENEM, Fuvest, Unicamp.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** triângulo retângulo inscrito em semicircunferência (arco capaz de 90°).
- **Onde procurar:** ENEM, Vunesp, UERJ.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** ângulos em polígonos inscritos numa circunferência.
- **Onde procurar:** Fuvest, Unicamp, UFRGS.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** quadrilátero inscrito e ângulos suplementares em arcos opostos.
- **Onde procurar:** OBMEP, Fuvest, Unesp.
