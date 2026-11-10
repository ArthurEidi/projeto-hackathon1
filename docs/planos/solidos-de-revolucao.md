# Plano — Sólidos de revolução e secções

**Aula:** 1 — Qualquer Perfil no Torno · Da figura plana ao sólido 3D e ao teorema de Pappus
**Caminho:** geometria / geometria-espacial / solidos-de-revolucao
**Pré-requisitos que o aluno já domina:** `projecoes-cortes-e-planificacoes`, `perimetro-e-area-de-figuras-planas`, `cilindros`, `cones`, `esferas`.

## a) Ancoragem mecânica
A máquina do torno geométrico recebe como entrada uma **figura plana geratriz** e a distância dela ao **eixo de rotação**: ao girar `360°`, cada ponto a uma distância `r` do eixo varre uma circunferência de raio `r`. Mudar o perfil plano muda o sólido de saída (retângulo → cilindro, triângulo retângulo → cone, trapézio → tronco, semicírculo → esfera), e afastar a figura do eixo abre um **furo cilíndrico/cônico central** cujo volume é descontado.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo torno de revolução) — seletor de perfil plano 2D (retângulo, triângulo retângulo em duas posições de cateto, trapézio, semicírculo) com slider de afastamento `d` até o eixo vertical e slider de giro `θ` de `0°` a `360°`, exibindo a seção meridiana e o sólido varrido.

## c) Caso neutro
Um retângulo de largura `r` e altura `h` colado no eixo (`afastamento d = 0`): com `θ = 0°` vemos apenas a lâmina plana 2D; ao girar `360°`, nasce o cilindro maciço padrão `V = πr²h`, sem furo central.

## d) Panorama e recorte
Reunimos todos os sólidos de revolução elementares (cilindro, cone, tronco de cone, esfera, dois cones colados e anéis/tubos vazados quando o perfil se afasta do eixo) e a intuição do caminho do centroide (Pappus-Guldin). Focamos em prever qual sólido nasce de cada perfil/eixo e calcular seu volume por composição ou subtração.

## e) Progressão por contraste
1. Retângulo colado no eixo (`d = 0`): gera cilindro maciço de raio `r` (referência).
2. Mesmo retângulo afastado a uma distância `d > 0` do eixo: gera um **tubo oco** (cilindro externo de raio `d + r` menos o furo cilíndrico de raio `d`).
3. Triângulo retângulo de catetos `3` e `4`: girar em torno do cateto `4` dá um cone alto (`h = 4, r = 3, V = 12π`); girar em torno do cateto `3` dá um cone largo (`h = 3, r = 4, V = 16π`).
4. Girar o mesmo triângulo em torno da **hipotenusa**: nascem **dois cones colados pela base**!

## f) Dedução causal da forma
Por que trocar o cateto que fica no eixo muda o volume do cone gerado pelo mesmo triângulo `3-4-5`? Porque o cateto parado no eixo vira a altura `h` (que entra linearmente), enquanto o cateto perpendicular ao eixo faz a volta de `360°` e vira o raio `r` (que entra ao quadrado em `πr²h / 3`). Quem fica longe do eixo percorre um círculo muito maior e gera mais volume!

## g) Simulação espacial e fronteiras
Testar o afastamento `d` da figura ao eixo: enquanto `d = 0` o sólido é maciço; para qualquer `d > 0` surge um furo central de raio `d`, e o volume do anel gerado é `V_externo − V_interno` (ou área da figura vezes o comprimento da volta do seu centro: `A · 2π · r_centro`).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Eixo de rotação | Reta fixa ao redor da qual a figura plana gira 360°. |
| c2 | Perfil gerador | Figura plana 2D que varre o espaço durante o giro. |
| c3 | Raio varrido (r) | Distância perpendicular de cada ponto do perfil até o eixo. |
| c4 | Sólido gerado | Corpo 3D resultante da volta completa (maciço ou vazado). |

### Passo 1 — `qual-perfil-gera-qual-solido`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (perfil + giro → sólido), 2 (visual), 3 (caso neutro θ = 0°), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — seletor de 4 perfis colados no eixo (`c1`): retângulo → cilindro, triângulo retângulo → cone, trapézio retângulo → tronco de cone, semicírculo → esfera. Emite `perfis_girados`.
- **Sliders:** `giro` · "Girar perfil (360°)" · 0..360 · passo 90 · inicial 0 · c2
- **Paco (abertura):** "No caso neutro θ = 0° temos só figuras planas. Gire o trapézio retângulo em 360° ao redor do lado reto: que sólido aparece?"
- **Interação do aluno:** gira os perfis até 360° e compara o cilindro, o cone, o tronco de cone e a esfera nascendo do mesmo gesto.
- **Conclusão:** `giro ≥ 360`
- **Paco (conclusão):** "Retângulo vira cilindro, triângulo vira cone, trapézio vira tronco de cone e semicírculo vira esfera!"
- **Tati (dúvida):** `fim` — P: "E se a gente mudar qual lado da figura fica encostado no eixo?" / R: "Muda tudo: até o mesmo triângulo pode dar cones de volumes diferentes ou dois cones colados. Vamos testar!"

### Passo 2 — `trocar-eixo-do-triangulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste cateto 4 × cateto 3), 6 (dedução por r² vs h)
- **Widget:** WIDGET NOVO: `solido_3d` — triângulo retângulo de catetos `3` e `4`; chave alterna o eixo (`c1`) entre o cateto `4` (`r = 3, h = 4 → V = 12π` fantasma) e o cateto `3` (`r = 4, h = 3 → V = 16π` em `c4`). Emite `eixo_trocado`.
- **Sliders:** `eixo_trocado` · "Trocar cateto do eixo" · 0..1 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "Girando o triângulo 3-4-5 no cateto 4, temos r = 3 e V = 12π. Se girarmos no cateto 3 (r = 4 e h = 3), o volume continua 12π?"
- **Interação do aluno:** troca o eixo para o cateto 3 e vê o cone ficar mais baixo e mais largo, subindo o volume para `16π`.
- **Conclusão:** `eixo_trocado ≥ 1`
- **Paco (conclusão):** "Sobe para 16π! Quem gira longe do eixo vira o raio r e entra ao quadrado: π·4²·3 / 3 = 16π ganha de π·3²·4 / 3 = 12π."

### Passo 3 — `afastar-do-eixo-furo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (maciço × vazado), 7 (fronteira d > 0)
- **Widget:** WIDGET NOVO: `solido_3d` — retângulo de largura `2` e altura `5` que se afasta `d = 1` do eixo (`c1`), gerando ao girar um cilindro externo de raio `R = 3` com um furo interno de raio `r = 1` (`V = π(3² − 1²)·5 = 40π`).
- **Sliders:** `d` · "Afastar do eixo (d)" · 0..2 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "Quando o retângulo de largura 2 descola do eixo por uma distância d = 1, o que aparece no meio do cilindro ao girar?"
- **Interação do aluno:** afasta `d` de 0 para 1 e vê abrir um furo cilíndrico de raio `r = 1` dentro do cilindro de raio `R = 1 + 2 = 3`.
- **Conclusão:** `d ≥ 1`
- **Paco (conclusão):** "Abre um furo de raio 1! O sólido vira um tubo de raio externo 3 e interno 1, com volume V_ext − V_int = π(9 − 1)·5 = 40π."
- **Tati (dúvida):** `fim` — P: "E se girarmos um triângulo isósceles ou retângulo em torno da hipotenusa?" / R: "O vértice do ângulo reto gira fazendo um círculo no meio, e nascem dois cones colados pela mesma base!"

### Passo 4 — `desafio-revolucao-trapezio`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — um quadrado `2 × 2` com um triângulo retângulo de base `2` e altura `3` em cima (formando um trapézio retângulo de altura lateral `2` e `5`, e base `2` no eixo).
- **Paco (abertura):** "Separe a figura em um retângulo mais um triângulo girando juntos!"
- **Enunciado:** "Um retângulo (r = 2, h = 2) colado a um triângulo (r = 2, h = 3) gira no eixo comum. Que sólido nasce e qual seu volume?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `cc12` | Cilindro + cone (12π) | **sim** | "Exato! O retângulo gera cilindro (π·2²·2 = 8π) e o triângulo gera cone (π·2²·3/3 = 4π): 8π + 4π = 12π." | mostra o cilindro (8π) mais o chapéu cônico (4π) |
| `cc20` | Dois cilindros (20π) | não | "O triângulo no topo afunila e gera um cone (4π, não 12π). Total: 8π + 4π = 12π." | destaca o topo cônico de 1/3 |
| `co4` | Só um cone (4π) | não | "4π é só o topo cônico; somando a base cilíndrica de 8π, temos 12π." | ilumina o cilindro inferior de 8π |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — painel com os perfis geradores (`c2`), o eixo (`c1`), os raios (`c3`) e os sólidos resultantes (`c4`).
- **Fórmula:** `Retângulo → Cilindro`→c2 · `,` · `Triângulo → Cone`→c2 · `,` · `Afastado → V_ext − V_int`→c4
- **Definições:** "Lado no eixo: permanece parado e vira a altura h do sólido." · "Lado perpendicular ao eixo: dá a volta de 360° e vira o raio r da base." · "Figura afastada do eixo: gera um sólido vazado (volume externo menos o furo interno)."
- **Paco (abertura):** "Cada ponto a distância r do eixo traça um círculo; por isso o lado no eixo vira altura, o perpendicular vira raio e o vão vira furo."
- **Dica (hint):** "Toque em cada transformação para ver o perfil 2D e o sólido 3D."

**Frase de encerramento (outro):** "Você identificou qual sólido nasce de cada figura plana, comparou trocas de eixo e calculou volumes com furo central."

## i) Treino pós-aula

### Fáceis

#### F1 — `perfil-do-cone`
- **Enunciado:** "Qual figura plana, ao girar 360° em torno de um de seus lados, gera um CONE circular reto?"
- **Conta de conferência:** triângulo retângulo girando em torno de um cateto ⇒ cone reto

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tri` | Triângulo retângulo | **sim** | "Isso. Um cateto fica no eixo como altura e o outro gira formando o círculo da base." |
| `ret` | Retângulo | não | "Retângulo girando gera um cilindro. Quem gera o cone é o triângulo retângulo." |
| `semi` | Semicírculo | não | "Semicírculo girando gera uma esfera. O cone nasce do triângulo retângulo." |

#### F2 — `perfil-do-tronco`
- **Enunciado:** "Girando um trapézio retângulo 360° em torno do seu lado perpendicular às bases, obtemos um:"
- **Conta de conferência:** bases diferentes giram formando dois círculos de raios R e r ⇒ tronco de cone

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `tronco` | Tronco de cone | **sim** | "Certo. A base maior gera o círculo de raio R e a menor gera o topo de raio r." |
| `prisma` | Prisma trapezoidal | não | "Rotação de 360° sempre gera corpos redondos: aqui nasce um tronco de cone." |
| `esf` | Esfera | não | "As duas bases retas de tamanhos diferentes geram um tronco de cone." |

#### F3 — `volume-retangulo-girando`
- **Enunciado:** "Um retângulo de lados 2 cm e 5 cm gira 360° em torno do lado de 5 cm. Qual é o volume do cilindro gerado?"
- **Conta de conferência:** h = 5 cm (no eixo) e r = 2 cm ⇒ V = π · 2² · 5 = 20π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v20p` | 20π cm³ | **sim** | "Exato. O lado 5 no eixo é a altura e o lado 2 é o raio: V = π·2²·5 = 20π cm³." |
| `v50p` | 50π cm³ | não | "50π seria se girasse em torno do lado 2 (raio 5). Com o lado 5 no eixo, r = 2 e V = 20π cm³." |
| `v10p` | 10π cm³ | não | "Eleve o raio r = 2 ao quadrado: π·2²·5 = 20π cm³." |

#### F4 — `volume-triangulo-girando`
- **Enunciado:** "Um triângulo retângulo de catetos 3 cm e 6 cm gira 360° em torno do cateto de 6 cm. Qual é o volume do cone gerado?"
- **Conta de conferência:** h = 6 cm (no eixo) e r = 3 cm ⇒ V = (π · 3² · 6) / 3 = 18π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v18p` | 18π cm³ | **sim** | "Isso. Com h = 6 no eixo e raio r = 3, temos V = (π·3²·6) / 3 = 18π cm³." |
| `v54p` | 54π cm³ | não | "54π seria o cilindro; no cone dividimos por 3: 54π / 3 = 18π cm³." |
| `v36p` | 36π cm³ | não | "36π seria girando no cateto 3 (raio 6). Girando no cateto 6, o raio é 3 e V = 18π cm³." |

### Médias

#### M1 — `razao-volumes-trocando-catetos`
- **Enunciado:** "Um triângulo de catetos 2 cm e 6 cm gera V₁ ao girar no cateto 6 (r=2) e V₂ no cateto 2 (r=6). Quanto vale V₂ / V₁?"
- **Conta de conferência:** V₁ = (π·4·6)/3 = 8π; V₂ = (π·36·2)/3 = 24π ⇒ V₂ / V₁ = 24π / 8π = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rz3` | 3 | **sim** | "Certo. V₁ = 8π e V₂ = 24π; logo V₂ é 3 vezes maior que V₁ (a razão dos raios 6/2)." |
| `rz1` | 1 (volumes iguais) | não | "Trocar quem é o raio muda o volume! V₁ = 8π e V₂ = 24π, razão 3." |
| `rz9` | 9 | não | "O raio triplica (×9), mas a altura divide por 3 (÷3), resultando em 9 / 3 = 3." |

#### M2 — `retangulo-afastado-do-eixo`
- **Enunciado:** "Um retângulo de largura 2 cm e altura 4 cm gira a 1 cm do eixo (r = 1 cm e R = 3 cm). Qual é o volume do tubo gerado?"
- **Conta de conferência:** V = π(3² − 1²) · 4 = π · 8 · 4 = 32π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v32p` | 32π cm³ | **sim** | "Exato. Cilindro externo (π·3²·4 = 36π) menos o furo (π·1²·4 = 4π) dá 32π cm³." |
| `v16p` | 16π cm³ | não | "16π seria se estivesse colado no eixo (r = 2). Afastado 1 cm, faz π(3² − 1²)·4 = 32π cm³." |
| `v36p` | 36π cm³ | não | "Faltou descontar o furo central de raio 1 cm (4π): 36π − 4π = 32π cm³." |

#### M3 — `triangulo-isoceles-na-base`
- **Enunciado:** "Um triângulo isósceles de base 6 cm e altura 4 cm gira 360° em torno da sua BASE de 6 cm. Que sólido é gerado?"
- **Conta de conferência:** a altura 4 gira fazendo um círculo de raio 4 no meio, e as duas metades de 3 cm formam dois cones colados pela base

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `2con` | Dois cones colados pela base (raio 4 cm e altura 3 cm cada) | **sim** | "Isso! O vértice gira a distância 4 do eixo, criando dois cones de raio 4 e altura 3." |
| `1con` | Um único cone de raio 6 cm | não | "Como a base está no eixo e o vértice no meio, formam-se dois cones colados pela base." |
| `cil` | Um cilindro de raio 4 cm | não | "Os lados inclinados afunilam até as pontas no eixo, gerando dois cones." |

### Desafios

#### D1 — `volume-dois-cones-isoceles`
- **Enunciado:** "Calcule o volume do sólido do item anterior: dois cones colados pela base, cada um com raio r = 4 cm e altura h = 3 cm."
- **Fala do Paco:** "Calcule um cone `(π·4²·3)/3` e dobre!"
- **Conta de conferência:** V_1 = (π · 16 · 3)/3 = 16π cm³ ⇒ V_total = 2 · 16π = 32π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v32p` | 32π cm³ | **sim** | "Exato. Cada cone tem (π·16·3)/3 = 16π cm³; os dois juntos somam 32π cm³." |
| `v16p` | 16π cm³ | não | "16π é apenas uma metade (1 cone). Somando os dois cones, dá 32π cm³." |
| `v96p` | 96π cm³ | não | "Faltou dividir por 3 no volume dos cones: 96π / 3 = 32π cm³." |

#### D2 — `triangulo-retangulo-na-hipotenusa`
- **Enunciado:** "Um triângulo retângulo isósceles de hipotenusa 2 cm e altura relativa h = 1 cm gira 360° na HIPOTENUSA. Qual é o volume gerado?"
- **Conta de conferência:** dois cones de raio r = h = 1 cm e alturas somadas = hipotenusa = 2 cm ⇒ V = (1/3)π · 1² · 2 = 2π/3 cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v23p` | 2π/3 cm³ | **sim** | "Certo. São dois cones de raio 1 cm e alturas 1 cm cada: 2 · (π·1²·1)/3 = 2π/3 cm³." |
| `v2p` | 2π cm³ | não | "Faltou dividir por 3 na fórmula do cone: V = 2π/3 cm³." |
| `v43p` | 4π/3 cm³ | não | "Cada cone tem altura 1 (metade da hipotenusa 2), somando 2π/3 cm³." |

#### D3 — `semicirculo-com-furo-cilindrico`
- **Enunciado:** "Um semicírculo de raio 3 cm gira 360° em torno do seu diâmetro. Qual é o volume da esfera gerada?"
- **Conta de conferência:** V = (4/3)π · 3³ = 36π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v36p` | 36π cm³ | **sim** | "Isso. Um semicírculo de raio 3 cm girando 360° no diâmetro varre a esfera de 36π cm³." |
| `v18p` | 18π cm³ | não | "Um semicírculo já cobre de um polo ao outro; girando 360°, fecha a esfera inteira: 36π cm³." |
| `v72p` | 72π cm³ | não | "O semicírculo girando 360° forma 1 esfera (não 2): (4/3)π·27 = 36π cm³." |

#### D4 — `quadrado-girando-pela-diagonal`
- **Enunciado:** "Um quadrado de diagonal 6 cm (semidiagonal 3 cm) gira 360° em torno de uma DIAGONAL. Qual é o volume dos 2 cones gerados?"
- **Conta de conferência:** 2 cones de r = 3 e h = 3 ⇒ 2 · (π · 3² · 3)/3 = 2 · 9π = 18π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v18p` | 18π cm³ | **sim** | "Exato. A outra diagonal vale 6 (raio r = 3), formando 2 cones de altura 3: 2·9π = 18π cm³." |
| `v9p` | 9π cm³ | não | "9π é um cone só. Como são 2 cones colados pela base, V = 18π cm³." |
| `v54p` | 54π cm³ | não | "Faltou dividir por 3 na fórmula dos cones: 54π / 3 = 18π cm³." |

#### D5 — `pappus-guldin-anel-quadrado`
- **Enunciado:** "Um quadrado de área 4 cm² cujo centro dista d = 5 cm do eixo gira 360° (volta = 2π·5). Pelo teorema de Pappus, qual é o volume?"
- **Fala do Paco:** "Multiplique a área 4 pelo comprimento da circunferência de raio 5 (`2π·5`)!"
- **Conta de conferência:** V = A · (2π · d_c) = 4 · (2π · 5) = 40π cm³

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `v40p` | 40π cm³ | **sim** | "Exato! Área 4 cm² vezes a volta do centro 2π·5 = 10π cm dá 4·10π = 40π cm³." |
| `v20p` | 20π cm³ | não | "Faltou o 2 de 2π·d_c na volta do centro: 4 · (2π·5) = 40π cm³." |
| `v100p` | 100π cm³ | não | "Multiplique a área 4 pela circunferência 2π·5 = 10π: dá 40π cm³." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar visualmente o sólido de revolução gerado pela rotação de um polígono/curva em torno de um eixo.
- **Onde procurar:** ENEM (questões de cerâmica/vaso/peça de torno mecânico a partir do perfil 2D).

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular o volume gerado pela rotação de um triângulo ou trapézio no plano cartesiano.
- **Onde procurar:** Fuvest, Unicamp, Unesp, UFRGS.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** rotação de triângulo em torno da hipotenusa ou de figura afastada do eixo.
- **Onde procurar:** UFPR, UERJ, Unifesp, ITA.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** área lateral e volume de sólido de revolução composto (cilindro + cone / tronco).
- **Onde procurar:** ENEM, Unicamp, Fuvest.
