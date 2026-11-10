# Plano — Teorema de Pitágoras

**Aula:** 1 — Três Quadrados nos Lados · Catetos, hipotenusa, ternas e diagonal
**Caminho:** geometria / geometria-plana / teorema-de-pitagoras
**Pré-requisitos que o aluno já domina:** triangulos-congruencia-e-propriedades.

## a) Ancoragem mecânica
A máquina constrói um quadrado sobre cada lado de um triângulo retângulo. As entradas são os dois catetos b e c (que formam 90°); a saída é que a soma das áreas dos quadrados dos catetos (b² + c²) preenche exatamente a área do quadrado da hipotenusa (a²).

## b) Visual de partida
WIDGET NOVO `geometria_plana` em modo Pitágoras: um triângulo retângulo com ângulo reto marcado e três quadrados quadriculados desenhados sobre os lados b (c1), c (c2) e a hipotenusa a (c3), mostrando as áreas b², c² e a².

## c) Caso neutro
Quando um dos catetos encolhe até c = 0, o triângulo fecha sobre o cateto b e a hipotenusa empata com ele: a² = b² + 0², logo a = b. Ao abrir o segundo cateto a 90°, a hipotenusa passa a ser maior que cada cateto isolado.

## d) Panorama e recorte
Existe a lei dos cossenos para triângulos com qualquer ângulo e a distância no espaço 3D. Aqui estudamos exclusivamente o triângulo retângulo (90°): a relação entre áreas a² = b² + c², as ternas 3-4-5 e 6-8-10, e a diagonal do quadrado.

## e) Progressão por contraste
1. Cateto c = 0: hipotenusa colada em b (a = b, referência).
2. Terna clássica b = 3, c = 4: os quadrados de áreas 9 e 16 somam 25 quadradinhos, dando hipotenusa a = 5.
3. Dobrar a terna para b = 6, c = 8: áreas 36 + 64 = 100, hipotenusa dobra para a = 10.
4. Catetos iguais no quadrado (b = c = L): a diagonal d satisfaz d² = L² + L² = 2L².

## f) Dedução causal da forma
Encaixando 4 cópias do triângulo retângulo dentro de um quadradão de lado b + c, sobra no meio uma área vazia: arrumando os triângulos de um jeito, essa sobra é o quadrado a²; arrumando em dois retângulos, a sobra são os dois quadrados b² e c². Como o quadradão e os 4 triângulos não mudaram, por isso a² = b² + c².

## g) Simulação espacial e fronteiras
A hipotenusa (oposta a 90°) é sempre o maior lado (a > b e a > c), mas menor que b + c. Se o ângulo deixa de ser 90°, a igualdade quebra: abaixo de 90° (agudo) temos a² < b² + c², e acima de 90° (obtuso) temos a² > b² + c².

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Cateto b | Um dos lados que formam o ângulo reto (90°); gera o quadrado b². |
| c2 | Cateto c | O outro lado que forma 90°; gera o quadrado c². |
| c3 | Hipotenusa a | Lado oposto ao ângulo de 90° (o maior lado); gera o quadrado a². |
| c4 | Diagonal d | Hipotenusa quando os dois catetos são lados iguais de um quadrado. |

### Passo 1 — `quadrados-3-4-5`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` (modo Pitágoras) — cateto b = 3 fixo (c1) e slider do cateto c (c2) começando em 0 (caso neutro a = 3); quadrados quadriculados nos 3 lados mostrando b², c² e a² (c3).
- **Sliders:** `c` · "Cateto c" · 0..4 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Com c = 0, a hipotenusa empata com b = 3. Leve c até 4: quantos quadradinhos somam os dois catetos no quadrado da hipotenusa?"
- **Interação do aluno:** move `c` de 0 até 4; vê 9 + 16 = 25 quadradinhos preencherem o quadrado de lado a = 5.
- **Conclusão:** `c ≥ 4`
- **Paco (conclusão):** "9 + 16 = 25 quadradinhos, que formam um quadrado de lado 5. É a famosa terna 3-4-5."
- **Tati (dúvida):** `fim` — P: "Por que a gente soma os quadrados (b² + c²) e não os lados direto?" / R: "Somar lados (3 + 4 = 7) seria andar pela esquina. O atalho a = 5 fecha a igualdade nas áreas dos quadrados."

### Passo 2 — `quebra-cabeca-areas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` (modo prova visual) — quadradão de lado b + c com 4 triângulos retângulos; chave desliza os triângulos trocando a sobra de a² (c3) para b² + c² (c1 e c2). Emite `deslizou_pecas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Por que b² + c² sempre dá a²? Deslize os 4 triângulos dentro do quadradão e veja no que a área vazia a² se transforma."
- **Interação do aluno:** arrasta o controle das peças; os 4 triângulos se juntam em dois retângulos e o espaço vazio a² vira dois quadrados b² e c².
- **Conclusão:** `deslizou_pecas ≥ 1`
- **Paco (conclusão):** "O quadradão e os 4 triângulos são os mesmos, então o espaço que sobra tem que ser igual: a² = b² + c²."

### Passo 3 — `ternas-e-diagonal`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `geometria_plana` — alterna entre a terna dobrada 6-8-10 e o quadrado cortado pela diagonal (catetos iguais L, diagonal d em c4). Emite `testou_diagonal`.
- **Sliders:** `b` · "Cateto b" · 3..6 · passo 3 · inicial 3 · c1
- **Paco (abertura):** "Dobre a terna 3-4-5 para catetos 6 e 8 e veja a hipotenusa; depois toque na diagonal do quadrado de lado 5."
- **Interação do aluno:** leva `b` a 6 (vendo 6-8-10) e ativa o modo quadrado para ver d² = L² + L² = 2L².
- **Conclusão:** `testou_diagonal ≥ 1`
- **Paco (conclusão):** "Dobrando 3-4-5 nasce a terna 6-8-10. E no quadrado de lados iguais L, d² = L² + L² = 2L²."

### Passo 4 — `fora-de-90-graus`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `geometria_plana` — mantém lados b = 3 e c = 4 e permite variar o ângulo θ entre eles de 60° a 120°.
- **Sliders:** `theta` · "Ângulo entre b e c" · 60..120 · passo 15 · inicial 90 · c3
- **Paco (abertura):** "E se o canto entre 3 e 4 não for de 90°? Mude o ângulo e veja se a² continua valendo 25."
- **Interação do aluno:** move `theta` para 60° (a² < 25) e para 120° (a² > 25).
- **Conclusão:** `theta ≥ 105`
- **Paco (conclusão):** "Passou de 90°, a² passa de 25; fechou menos de 90°, a² fica menor que 25. Pitágoras exige ângulo reto cravado."
- **Tati (dúvida):** `fim` — P: "Um cateto pode ser maior que a hipotenusa?" / R: "Nunca: como a² = b² + c² soma dois quadrados positivos, a hipotenusa é sempre o maior dos três lados."

### Passo 5 — `desafio-achar-cateto`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo retângulo com hipotenusa a = 10 (c3), cateto b = 8 (c1) e cateto c = x (c2).
- **Paco (abertura):** "Atenção a quem está oposto ao ângulo de 90°: o 10 já é a hipotenusa!"
- **Enunciado:** "Num triângulo retângulo, a hipotenusa mede 10 e um dos catetos mede 8. Quanto mede o outro cateto?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a6` | 6 | **sim** | "Isso. 8² + x² = 10², então 64 + x² = 100, x² = 36 e x = 6 (terna 6-8-10)." | preenche 100 − 64 = 36 no quadrado do cateto e mostra lado 6 |
| `a36` | 36 | não | "36 é a área do quadrado (x²). Tirando a raiz quadrada de 36, o cateto mede 6." | destaca que 36 é a área x² e extrai o lado x = 6 |
| `a2` | 2 | não | "Você subtraiu os lados (10 − 8 = 2). Subtraia os quadrados: 100 − 64 = 36, cuja raiz é 6." | mostra os quadrados 100 e 64 em vez de 10 − 8 |
| `a12-8` | 12,8 | não | "Você somou 10² + 8² = 164 como se x fosse a hipotenusa. O 10 é a hipotenusa: 100 − 64 = 36, x = 6." | destaca o ângulo de 90° oposto ao 10 |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo retângulo com os quadrados b² (c1), c² (c2), a² (c3) e destaque da diagonal d (c4).
- **Fórmula:** `a²`→c3 · `=` · `b²`→c1 · `+` · `c²`→c2
- **Definições:** "Hipotenusa (a): lado oposto ao ângulo de 90°; é sempre o maior lado." · "Ternas pitagóricas: 3-4-5, 6-8-10, 5-12-13 fecham contas sem raiz." · "Diagonal do quadrado de lado L: d² = 2·L²."
- **Paco (abertura):** "Os quatro triângulos no quadradão deixam a mesma área livre nos dois arranjos, por isso o quadrado da hipotenusa vale a soma dos quadrados dos catetos."
- **Dica (hint):** "Toque em a², b² ou c² para iluminar o quadrado correspondente na figura."

**Frase de encerramento (outro):** "Você somou as áreas dos quadrados nos catetos, dominou as ternas 3-4-5 e 6-8-10 e calculou a diagonal do quadrado."

## i) Treino pós-aula

### Fáceis

#### F1 — `hipotenusa-3-4`
- **Enunciado:** "Os catetos de um triângulo retângulo medem 3 cm e 4 cm. Quanto mede a hipotenusa?"
- **Conta de conferência:** a² = 3² + 4² = 9 + 16 = 25 ⇒ a = 5 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 cm | **sim** | "Isso. 3² + 4² = 9 + 16 = 25, e a raiz de 25 é 5 cm." |
| `a7` | 7 cm | não | "7 cm é a soma 3 + 4. Em Pitágoras somamos os quadrados: 9 + 16 = 25, raiz = 5 cm." |
| `a25` | 25 cm | não | "25 é a² (a área do quadrado). A hipotenusa é a raiz de 25: 5 cm." |
| `a1` | 1 cm | não | "A hipotenusa é o maior lado: raiz de (9 + 16) = 5 cm." |

#### F2 — `quem-e-hipotenusa`
- **Enunciado:** "Num triângulo retângulo de lados 5, 12 e 13, qual medida é a hipotenusa (oposta ao ângulo de 90°)?"
- **Conta de conferência:** hipotenusa é o maior lado = 13 (5² + 12² = 25 + 144 = 169 = 13²)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a13` | 13 | **sim** | "Certo. A hipotenusa é sempre o maior lado: 5² + 12² = 13²." |
| `a12` | 12 | não | "12 é o cateto maior. A hipotenusa é o maior dos três lados: 13." |
| `a5` | 5 | não | "5 é o menor cateto. Oposta a 90° fica o maior lado: 13." |
| `a17` | 17 | não | "17 é 5 + 12. Dos lados dados (5, 12 e 13), a hipotenusa é 13." |

#### F3 — `cateto-3-5`
- **Enunciado:** "Um triângulo retângulo tem hipotenusa 5 e um cateto igual a 3. Quanto mede o outro cateto?"
- **Conta de conferência:** b² = 5² − 3² = 25 − 9 = 16 ⇒ b = 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Exato. 25 − 9 = 16, cuja raiz quadrada é 4." |
| `a2` | 2 | não | "2 é 5 − 3. Subtraia os quadrados: 5² − 3² = 16, e a raiz é 4." |
| `a16` | 16 | não | "16 é o cateto ao quadrado (b²). Tirando a raiz, o cateto vale 4." |
| `a8` | 8 | não | "O cateto é menor que a hipotenusa 5: raiz de (25 − 9) = 4." |

#### F4 — `diagonal-quadrado-area`
- **Enunciado:** "Um quadrado tem lado 3. Quanto vale d², o quadrado da sua diagonal?"
- **Conta de conferência:** d² = 3² + 3² = 9 + 9 = 18

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a18` | 18 | **sim** | "Isso. A diagonal divide o quadrado em dois catetos de 3: d² = 3² + 3² = 18." |
| `a9` | 9 | não | "9 é a área de um lado só (3²). Somando os dois catetos: 9 + 9 = 18." |
| `a6` | 6 | não | "6 é 3 + 3. Pela fórmula de Pitágoras, d² = 3² + 3² = 18." |
| `a36` | 36 | não | "36 é (3 + 3)². Somam-se os quadrados separados: 9 + 9 = 18." |

### Médias

#### M1 — `escada-na-parede`
- **Enunciado:** "Uma escada de 10 m está apoiada numa parede, com o pé a 6 m da base da parede. A que altura da parede ela encosta?"
- **Conta de conferência:** h² = 10² − 6² = 100 − 36 = 64 ⇒ h = 8 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 m | **sim** | "Certo. Terna 6-8-10: 10² − 6² = 64, então a altura é 8 m." |
| `a4` | 4 m | não | "4 m é 10 − 6. Usando Pitágoras: 100 − 36 = 64, cuja raiz é 8 m." |
| `a16` | 16 m | não | "A altura não pode passar do tamanho da escada (10 m). Vale 8 m." |
| `a64` | 64 m | não | "64 é h². Tirando a raiz quadrada de 64, a altura é 8 m." |

#### M2 — `diagonal-retangulo-5-12`
- **Enunciado:** "Um terreno retangular mede 5 m de largura por 12 m de comprimento. Quanto mede a diagonal desse terreno?"
- **Conta de conferência:** d² = 5² + 12² = 25 + 144 = 169 ⇒ d = 13 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a13` | 13 m | **sim** | "Exato. 5² + 12² = 25 + 144 = 169, e a raiz de 169 é 13 m." |
| `a17` | 17 m | não | "17 m é o caminho pelos dois lados (5 + 12). Pela diagonal: raiz de 169 = 13 m." |
| `a7` | 7 m | não | "7 m é 12 − 5. A diagonal é a hipotenusa: 5² + 12² = 13², logo 13 m." |
| `a15` | 15 m | não | "25 + 144 = 169 (não 225). A raiz de 169 é 13 m." |

#### M3 — `altura-isosceles`
- **Enunciado:** "Um triângulo isósceles tem lados iguais de 5 cm e base de 6 cm. Quanto mede a altura relativa à base?"
- **Fala do Paco:** "No isósceles, a altura cai bem no meio da base, dividindo os 6 cm em duas metades de 3 cm."
- **Conta de conferência:** h² = 5² − 3² = 25 − 9 = 16 ⇒ h = 4 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 cm | **sim** | "Isso. Metade da base é 3 cm; no triângulo retângulo de hipotenusa 5 e cateto 3, h = 4 cm." |
| `a5` | 5 cm | não | "5 cm é o lado inclinado (hipotenusa). A altura é o cateto: raiz de (25 − 9) = 4 cm." |
| `a2` | 2 cm | não | "Use metade da base (3 cm) em Pitágoras: 5² − 3² = 16, então h = 4 cm." |
| `a3` | 3 cm | não | "3 cm é a metade da base. A altura mede raiz de (25 − 9) = 4 cm." |

### Desafios

#### D1 — `terna-decimal`
- **Enunciado:** "Os catetos de um triângulo retângulo medem 1,5 m e 2 m. Quanto mede a hipotenusa?"
- **Fala do Paco:** "Repare que 1,5 e 2 são exatamente a metade de 3 e 4."
- **Conta de conferência:** 1,5² + 2² = 2,25 + 4 = 6,25 ⇒ a = 2,5 m (metade de 3-4-5)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2-5` | 2,5 m | **sim** | "Certo. É a terna 3-4-5 dividida por 2: 2,25 + 4 = 6,25, raiz = 2,5 m." |
| `a3-5` | 3,5 m | não | "3,5 m é a soma 1,5 + 2. Pela raiz de (2,25 + 4 = 6,25), a hipotenusa é 2,5 m." |
| `a6-25` | 6,25 m | não | "6,25 é o quadrado da hipotenusa (a²). Tirando a raiz, dá 2,5 m." |
| `a2-25` | 2,25 m | não | "2,25 é só 1,5². Somando 2² = 4 dá 6,25, cuja raiz é 2,5 m." |

#### D2 — `lado-pela-diagonal`
- **Enunciado:** "A diagonal de um quadrado mede 6 cm. Qual é a área (L²) desse quadrado?"
- **Fala do Paco:** "Use d² = L² + L² = 2·L²: você nem precisa achar L separado para descobrir L²!"
- **Conta de conferência:** 2·L² = 6² = 36 ⇒ L² = 18 cm²

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a18` | 18 cm² | **sim** | "Exato. Como d² = 2·L², temos 36 = 2·L² e a área L² vale 18 cm²." |
| `a36` | 36 cm² | não | "36 é d² (área do quadrado sobre a diagonal). A área do quadrado original é metade: 18 cm²." |
| `a12` | 12 cm² | não | "d² = 6² = 36, e dividindo por 2 encontramos L² = 18 cm²." |
| `a9` | 9 cm² | não | "9 cm² seria para lado 3 (diagonal raiz de 18). Com diagonal 6, L² = 36 / 2 = 18 cm²." |

#### D3 — `losango-diagonais`
- **Enunciado:** "As diagonais de um losango se cruzam a 90° no meio e medem 12 cm e 16 cm. Quanto mede cada lado do losango?"
- **Conta de conferência:** metades das diagonais = 6 e 8 ⇒ L² = 6² + 8² = 100 ⇒ L = 10 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 cm | **sim** | "Isso. As metades das diagonais são 6 cm e 8 cm (catetos), dando hipotenusa 10 cm." |
| `a20` | 20 cm | não | "20 cm usa 12 e 16 inteiros. As diagonais se cortam ao meio (6 e 8), então o lado mede 10 cm." |
| `a14` | 14 cm | não | "14 é a soma das metades (6 + 8). Pela terna 6-8-10, o lado mede 10 cm." |
| `a8` | 8 cm | não | "8 cm é metade da diagonal maior. O lado é a hipotenusa de 6 e 8: 10 cm." |

#### D4 — `classificar-angulo-pela-soma`
- **Enunciado:** "Um triângulo tem lados 3, 4 e 6. Como 6² = 36 é maior que 3² + 4² = 25, o ângulo oposto ao lado 6 é:"
- **Conta de conferência:** a² > b² + c² ⇒ ângulo obtuso (maior que 90°)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `obtuso` | Maior que 90° (obtuso) | **sim** | "Certo. Em 90° o lado seria 5; para chegar a 6, o ângulo precisou abrir além de 90°." |
| `reto` | Igual a 90° (reto) | não | "Em 90° o terceiro lado mediria 5 (3² + 4² = 25). Com lado 6, o ângulo é maior que 90°." |
| `agudo` | Menor que 90° (agudo) | não | "Menor que 90° daria lado menor que 5. Como 6 > 5, o ângulo é maior que 90° (obtuso)." |
| `imposs` | Não fecha triângulo | não | "Fecha sim, pois 3 + 4 = 7 > 6. E como 6² > 25, o ângulo é maior que 90°." |

#### D5 — `caminho-em-l`
- **Enunciado:** "Um drone voa 4 km para o norte, 6 km para o leste e mais 4 km para o norte. A que distância em linha reta ele está da partida?"
- **Fala do Paco:** "Junte todo o deslocamento para o norte num cateto só e todo o deslocamento para o leste no outro."
- **Conta de conferência:** norte total = 4 + 4 = 8 km; leste = 6 km ⇒ d² = 8² + 6² = 100 ⇒ d = 10 km

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 km | **sim** | "Exato. Ele avançou 8 km ao norte e 6 km ao leste: hipotenusa de 6 e 8 vale 10 km." |
| `a14` | 14 km | não | "14 km é o caminho percorrido (4 + 6 + 4). Em linha reta (catetos 8 e 6), dá 10 km." |
| `a8` | 8 km | não | "8 km é só o total para o norte (4 + 4). Com os 6 km ao leste, a distância é 10 km." |
| `a12` | 12 km | não | "Os catetos totais são 8 e 6: 8² + 6² = 100, então a distância é 10 km." |

### Vestibular

#### V1 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar o teorema de Pitágoras para calcular distância em linha reta ("atalho") contra trajeto em esquina.
- **Onde procurar:** ENEM, Vunesp, UERJ.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** resolver problema de escada, rampa ou cabo esticado formando triângulo retângulo (ternas 3-4-5, 5-12-13).
- **Onde procurar:** ENEM, Unicamp, UFPR, IFSP.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** calcular lado ou diagonal de quadrado, retângulo ou losango usando Pitágoras.
- **Onde procurar:** Fuvest, Vunesp, Mackenzie, UFRGS.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** montar equação quadrática a partir de Pitágoras quando dois lados dependem de x (ex.: x, x + 1, x + 2).
- **Onde procurar:** Fuvest, FGV, EPCAR, Unesp.
