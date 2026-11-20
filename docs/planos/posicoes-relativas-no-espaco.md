# Plano — Retas, planos, paralelismo e perpendicularidade no espaço

**Aula:** 1 — Quando Sair do Papel Muda Tudo · Paralelas, concorrentes, reversas e planos
**Caminho:** geometria / geometria-espacial / posicoes-relativas-no-espaco
**Pré-requisitos que o aluno já domina:** `angulos-retas-paralelas`, leitura de cubos e ângulo reto.

## a) Ancoragem mecânica
A máquina espacial controla a altura `z` e o giro de retas e planos sobre uma estrutura cúbica de referência: enquanto duas retas moram no mesmo plano (coplanares), elas só podem ser paralelas ou concorrentes; ao levantar uma das retas para outro andar e girá-la, surge uma saída exclusiva do 3D — as retas **reversas** (não se cruzam e não são paralelas). Uma reta só é perpendicular a um plano quando forma `90°` com duas retas concorrentes daquele plano.

## b) Visual de partida
WIDGET NOVO: `solido_3d` (modo posições no espaço) — esqueleto de um cubo transparente `ABCD-EFGH` com câmera giratória, duas retas destacáveis (`r` no piso em `c1`, `s` móvel em `c2` com sliders de altura e giro) e dois planos destacáveis (`α` e `β`). Emite `altura_s`, `giro_s` e `camera_girada`.

## c) Caso neutro
As duas retas começam no mesmo plano do piso (`z = 0`) e na mesma direção (`giro = 0°`): são retas paralelas coplanares (como duas bordas opostas da mesa), o comportamento que o aluno já conhece da geometria plana.

## d) Panorama e recorte
Na geometria espacial estudamos axiomas de determinação de planos, posições entre duas retas, entre reta e plano, entre dois planos e projeções ortogonais. Aqui focamos em distinguir visualmente retas paralelas, concorrentes e reversas nas arestas do cubo, além de paralelismo e perpendicularidade entre planos e retas.

## e) Progressão por contraste
1. Duas retas no piso com mesma direção: paralelas coplanares (referência 2D).
2. Girar uma reta ainda no piso (`z = 0`): elas se cruzam num ponto — concorrentes.
3. Subir a reta girada para o teto (`z = 1`): ela deixa de tocar a reta do piso sem ter a mesma direção — nascem as **retas reversas**.
4. Reta que fura o piso formando `90°` com duas arestas da base: reta perpendicular ao plano.

## f) Dedução causal da forma
No plano 2D, não se cruzar obriga duas retas a terem a mesma direção (paralelas). No espaço 3D existe uma terceira dimensão (altura): uma reta pode passar por cima da outra em direção diferente, como um viaduto sobre uma avenida. Por isso, não ter ponto em comum no 3D divide-se em dois casos: **paralelas** (coplanares, mesma direção) ou **reversas** (não coplanares, direções diferentes).

## g) Simulação espacial e fronteiras
Girar a câmera mostra uma armadilha visual importante: vistas de frente, duas retas reversas parecem se cruzar na tela 2D, mas ao girar o cubo vê-se o vão entre elas. Dois pontos determinam apenas uma reta; para travar um plano único são necessários **3 pontos não alinhados** (um tripé nunca bambaleia).

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Reta r (base) | Reta de referência fixa no plano do piso. |
| c2 | Reta s (móvel) | Segunda reta cuja altura e direção o aluno altera. |
| c3 | Plano α | Superfície plana determinada por 3 pontos não alinhados. |
| c4 | Distância / Ângulo | Vão vertical ou ângulo de 90° entre reta e plano. |

### Passo 1 — `no-mesmo-plano`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: `solido_3d` — cubo com plano do piso `ABCD` aceso em `c3`; reta `r` na aresta `AB` (`c1`) e reta `s` no piso começando paralela em `CD` (`c2`, fantasma inicial); slider gira `s` no piso.
- **Sliders:** `giro_s` · "Girar reta s no piso" · 0..90 · passo 15 · inicial 0 · c2
- **Paco (abertura):** "No piso, r e s começam paralelas. Se você girar s sem sair do chão, elas continuam sem se tocar?"
- **Interação do aluno:** gira `s` no piso e vê o ponto de encontro aparecer dentro do plano `ABCD`.
- **Conclusão:** `giro_s ≥ 45`
- **Paco (conclusão):** "No mesmo plano, girou, cruzou: viram concorrentes. Até aqui vale tudo o que você via no papel."
- **Tati (dúvida):** `fim` — P: "O que muda quando saímos para o espaço 3D?" / R: "Ganhamos altura: retas podem passar uma por cima da outra e planos podem se cruzar. Vamos testar isso no cubo."

### Passo 2 — `retas-reversas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 5 (contraste), 7 (fronteira da visão 2D)
- **Widget:** WIDGET NOVO: `solido_3d` — reta `r` na aresta frontal do piso `AB` (`c1`); reta `s` transversal começando no piso (`z = 0`, concorrente fantasma) e subindo com o slider até a aresta lateral do teto `FG` (`c2`).
- **Sliders:** `altura_s` · "Subir reta s" · 0..4 · passo 1 · inicial 0 · c4
- **Paco (abertura):** "Com s girada a 90° de r, levante s até o teto do cubo: elas ainda se cruzam ou são paralelas?"
- **Interação do aluno:** sobe `s` até o teto e gira o cubo para enxergar o vão vertical entre `AB` e `FG`.
- **Conclusão:** `altura_s ≥ 4`
- **Paco (conclusão):** "Nem se cruzam nem têm a mesma direção! Como moram em planos diferentes, são retas reversas."
- **Tati (dúvida):** `fim` — P: "Então não se cruzar no espaço não garante paralelismo?" / R: "Exato: paralelas têm a mesma direção e dividem um plano; reversas apontam diferente em andares separados."

### Passo 3 — `reta-perpendicular-plano`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6 (dedução)
- **Widget:** WIDGET NOVO: `solido_3d` — haste vertical `AE` (`c2`) apoiada no canto `A` do piso `ABCD` (`c3`), com esquadros de 90° nas duas arestas da base `AB` e `AD` (`c4`).
- **Sliders:** `inclinacao` · "Aprumar haste" · 30..90 · passo 15 · inicial 30 · c4
- **Paco (abertura):** "Para o poste ficar em pé no chão, basta fazer 90° com uma linha do piso ou precisa de duas direções?"
- **Interação do aluno:** leva a inclinação a 90° e vê os dois esquadros perpendiculares (`AB` e `AD`) travarem o poste.
- **Conclusão:** `inclinacao ≥ 90`
- **Paco (conclusão):** "Com uma reta só ele ainda tomba para o lado. Fazendo 90° com duas concorrentes do piso, fica perpendicular ao plano todo."

### Passo 4 — `desafio-cubo`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cubo `ABCD-EFGH` (base `ABCD`, topo `EFGH` diretamente acima) com aresta `AB` em `c1` e `CG` em `c2`.
- **Paco (abertura):** "Olhe para a frente do piso (AB) e o pilar de trás à direita (CG)."
- **Enunciado:** "No cubo ABCD-EFGH, as retas das arestas AB e CG são:"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `par` | Paralelas | não | "AB é horizontal e CG é vertical; direções diferentes. São reversas." | destaca direções ortogonais de AB e CG |
| `conc` | Concorrentes | não | "AB passa na frente e CG sobe lá atrás; não se tocam. São reversas." | gira a câmera mostrando o vão `BC` entre elas |
| `rev` | Reversas | **sim** | "Isso. Não se cruzam e não têm a mesma direção: são reversas." | mostra o segmento distância `BC` em `c4` |
| `coin` | Coincidentes | não | "São arestas distintas e separadas pela largura do cubo: reversas." | destaca os dois planos separados |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** WIDGET NOVO: `solido_3d_figura` — cubo exibindo par paralelo (`AB // CD`), par concorrente (`AB` e `BC`) e par reverso (`AB` e `CG`).
- **Fórmula:** `r ∩ s = ∅` · `⇒` · `paralelas (mesmo plano)`→c1 · `ou` · `reversas (planos distintos)`→c2
- **Definições:** "Paralelas: não se cruzam e estão no mesmo plano." · "Reversas: não se cruzam e não existe plano que contenha as duas." · "Perpendicular ao plano: forma 90° com duas concorrentes dele."
- **Paco (abertura):** "No espaço 3D uma reta pode passar por cima da outra em outra direção; por isso retas sem encontro podem ser paralelas ou reversas."
- **Dica (hint):** "Toque em cada caso para destacar as arestas correspondentes no cubo."

**Frase de encerramento (outro):** "Você saiu do plano 2D, enxergou retas reversas no cubo e viu como travar retas e planos no espaço."

## i) Treino pós-aula

### Fáceis

#### F1 — `viaduto-avenida`
- **Enunciado:** "Um viaduto reto passa por cima de uma avenida reta transversal sem tocá-la. Essas duas retas são:"
- **Conta de conferência:** direções diferentes e sem interseção ⇒ reversas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rev` | Reversas | **sim** | "Exato. Não se cruzam e têm direções diferentes em alturas distintas." |
| `par` | Paralelas | não | "Paralelas apontam na mesma direção. O viaduto cruza por cima: são reversas." |
| `conc` | Concorrentes | não | "Concorrentes se tocam num ponto. Como há vão vertical, são reversas." |
| `copl` | Coplanares | não | "Não há um único plano que contenha as duas. São reversas." |

#### F2 — `tripé-plano`
- **Enunciado:** "Quantos pontos não alinhados são necessários, no mínimo, para determinar um único plano?"
- **Conta de conferência:** 3 pontos não colineares determinam um plano

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p3` | 3 | **sim** | "Isso. Três pontos não alinhados travam um único plano, como um tripé." |
| `p2` | 2 | não | "2 pontos determinam só uma reta, e o plano ainda gira nela. São 3." |
| `p1` | 1 | não | "Por 1 ponto passam infinitos planos. São necessários 3 não alinhados." |
| `p4` | 4 | não | "Com 3 pontos não alinhados o plano já fica fixo; o 4º pode até ficar fora." |

#### F3 — `piso-teto`
- **Enunciado:** "Em uma sala em forma de bloco retangular, os planos do piso e do teto são:"
- **Conta de conferência:** planos sem pontos em comum ⇒ paralelos

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `par` | Paralelos | **sim** | "Certo. Piso e teto mantêm distância constante e nunca se encontram." |
| `sec` | Secantes | não | "Planos secantes se cortam numa reta, como piso e parede. Piso e teto são paralelos." |
| `rev` | Reversos | não | "Reversas são retas, não planos. Dois planos sem encontro são paralelos." |

#### F4 — `piso-parede`
- **Enunciado:** "A interseção entre o plano do piso e o plano de uma parede vertical é:"
- **Conta de conferência:** dois planos secantes interceptam-se numa reta (o rodapé)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `reta` | Uma reta | **sim** | "Exato: a linha do rodapé, pois dois planos secantes se cortam numa reta." |
| `ponto` | Um único ponto | não | "Dois planos que se tocam não param num ponto: cortam-se numa reta inteira." |
| `vazio` | Vazia | não | "A parede encosta no chão ao longo do rodapé: a interseção é uma reta." |

### Médias

#### M1 — `arestas-paralelas-cubo`
- **Enunciado:** "Um cubo tem 12 arestas. Dada uma aresta AB, quantas OUTRAS arestas do cubo são paralelas a AB?"
- **Conta de conferência:** 4 arestas têm a mesma direção de AB; descontando AB sobram 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. Das 4 arestas na mesma direção de AB, 3 são as outras paralelas a ela." |
| `a4` | 4 | não | "4 inclui a própria AB. As outras paralelas a ela são 3." |
| `a2` | 2 | não | "Há a oposta no piso, a oposta na frente e a diagonal no teto: são 3." |
| `a8` | 8 | não | "As outras 8 têm direções perpendiculares. Paralelas a AB são só 3." |

#### M2 — `intersecao-planos-paralelos`
- **Enunciado:** "Um plano transversal corta dois planos paralelos α e β. As duas retas de interseção formadas são:"
- **Conta de conferência:** retas no mesmo plano transversal que não se encontram ⇒ paralelas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `par` | Paralelas | **sim** | "Certo. Estão no mesmo plano transversal e em planos paralelos, logo nunca se tocam." |
| `rev` | Reversas | não | "Ambas pertencem ao mesmo plano transversal, então são coplanares e paralelas." |
| `conc` | Concorrentes | não | "Se se cruzassem, os planos paralelos α e β se tocariam ali. São paralelas." |

#### M3 — `angulo-reversas-cubo`
- **Enunciado:** "No cubo ABCD-EFGH, qual é o ângulo formado pelas retas reversas AB (horizontal frontal) e CG (vertical traseira)?"
- **Conta de conferência:** transladando CG para BF, AB ⊥ BF ⇒ 90°

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `g90` | 90° | **sim** | "Exato. CG tem a mesma direção vertical de BF, que faz 90° com AB (ortogonais)." |
| `g0` | 0° | não | "0° seria se fossem paralelas. Uma é horizontal e a outra vertical: 90°." |
| `g45` | 45° | não | "45° é com a diagonal da face. Entre aresta horizontal e vertical é 90°." |

### Desafios

#### D1 — `contar-reversas-cubo`
- **Enunciado:** "Fixada uma aresta AB de um cubo, quantas das outras 11 arestas são REVERSAS a AB?"
- **Fala do Paco:** "Desconte as 3 paralelas e as que encostam nas pontas A ou B."
- **Conta de conferência:** 11 outras − 3 paralelas − 4 concorrentes nos vértices A e B = 4 reversas

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `r4` | 4 | **sim** | "Isso. Das 11 outras, 3 são paralelas e 4 tocam A ou B; sobram 4 reversas." |
| `r8` | 8 | não | "4 dessas 8 encostam em A ou B (concorrentes). Sem tocar AB, sobram 4 reversas." |
| `r3` | 3 | não | "3 são as paralelas. As reversas a AB são 4." |
| `r6` | 6 | não | "Tire de 11 as 3 paralelas e as 4 concorrentes em A e B: restam 4." |

#### D2 — `reta-paralela-plano`
- **Enunciado:** "Se uma reta r é paralela a um plano α, então r em relação às retas contidas em α é:"
- **Conta de conferência:** r nunca fura α, logo é paralela a algumas retas de α e reversa às demais

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pr` | Paralela a algumas e reversa a outras | **sim** | "Certo. Não toca nenhuma: é paralela às de mesma direção e reversa às outras." |
| `pt` | Paralela a todas | não | "Em α há retas em várias direções; r é paralela a algumas e reversa a outras." |
| `ct` | Concorrente com todas | não | "Como r não toca α, não cruza nenhuma reta de α: é paralela ou reversa." |

#### D3 — `projecao-ortogonal-segmento`
- **Enunciado:** "Um bastão vertical de 1 m está em pé, perpendicular ao chão plano. Sua projeção ortogonal (sombra a pino) no chão é:"
- **Conta de conferência:** segmento perpendicular ao plano projeta-se em um único ponto

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `pto` | Um único ponto | **sim** | "Exato. Como todo o bastão está na mesma vertical, todos os pontos caem no mesmo pé." |
| `seg1` | Um segmento de 1 m | não | "1 m seria se o bastão estivesse deitado paralelo ao chão. Em pé, projeta um ponto." |
| `seg05` | Um segmento de 0,5 m | não | "Perpendicular ao piso, o topo projeta exatamente sobre a base: um único ponto." |

#### D4 — `planos-perpendiculares-terceiro`
- **Enunciado:** "Duas paredes vizinhas (que fazem 90° no canto da sala) são ambas perpendiculares ao piso. Elas são paralelas entre si?"
- **Conta de conferência:** contraexemplo do canto da sala: α ⊥ γ e β ⊥ γ não implica α // β

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `nao` | Não, podem ser secantes | **sim** | "Isso. Duas paredes no canto fazem 90° com o chão e se cruzam na quina." |
| `sim` | Sim, sempre paralelas | não | "No canto da sala, duas paredes são perpendiculares ao chão e se cruzam." |

#### D5 — `soma-determinacao-planos`
- **Enunciado:** "4 pontos não coplanares (como os vértices de uma pirâmide triangular) determinam quantos planos distintos?"
- **Fala do Paco:** "Três pontos não alinhados determinam um plano. Quantos trios saem de 4 pontos?"
- **Conta de conferência:** C(4, 3) = 4 planos (as 4 faces do tetraedro)

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p4` | 4 | **sim** | "Exato. Cada grupo de 3 pontos forma 1 face do tetraedro: são 4 planos." |
| `p1` | 1 | não | "Eles não estão no mesmo plano. Cada trio forma um plano: são 4." |
| `p3` | 3 | não | "Há 3 faces laterais mais a base: 4 trios de pontos, logo 4 planos." |
| `p6` | 6 | não | "6 é o número de retas (arestas) C(4,2). De planos C(4,3) são 4." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2009-escultura-planos`
- **Enunciado (resumido):** "Na escultura, os prismas retos II e IV são paralelos; um plano paralelo à face α de I corta a peça em P. O que essa interseção contém?"
- **Fala do Paco:** "Um plano paralelo à base de prismas paralelos gera seções transversais com a mesma forma da base."
- **Fonte:** ENEM 2009 (adaptada) — **Adaptação:** Questão 153: enunciado resumido mantendo a posição dos prismas e do plano; gabarito (A) mantido. — **URL:** https://api.enem.dev/v1/exams/2009/questions/153
- **Imagens:** `/vestibular/enem-2009-153-1.jpg` (Escultura com prismas triangulares I, II, III e IV, indicando a face alfa em I e o ponto P em II)
- **Habilidade-alvo:** proposições verdadeiro/falso sobre paralelismo e perpendicularidade entre retas e planos.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | Dois triângulos congruentes com lados correspondentes paralelos | **sim** | "Certo: o plano paralelo a α corta os prismas triangulares paralelos II e IV gerando dois triângulos congruentes e paralelos." |
| `b` | Dois retângulos congruentes e com lados correspondentes paralelos | não | "O corte é paralelo às bases triangulares de II e IV, não às faces laterais. Forma dois triângulos congruentes." |
| `c` | Dois trapézios congruentes com lados correspondentes perpendiculares | não | "Seções paralelas à base de prismas triangulares são triângulos congruentes de lados paralelos." |
| `d` | Dois paralelogramos congruentes com lados correspondentes paralelos | não | "Os prismas II e IV têm base triangular; o corte paralelo à base gera dois triângulos congruentes." |
| `e` | Dois quadriláteros congruentes com lados correspondentes perpendiculares | não | "Prismas triangulares cortados paralelamente à base geram dois triângulos congruentes de lados paralelos." |

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** identificar retas paralelas, concorrentes e reversas nas arestas de um poliedro.
- **Onde procurar:** ENEM, Fuvest, Unicamp ("retas reversas", "arestas de um cubo").

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** projeção ortogonal de trajetórias 3D sobre um plano.
- **Onde procurar:** ENEM (questões clássicas de projeção ortogonal de globo/carrossel/pirâmide).

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** distância e ângulo entre retas reversas em prismas ou cubos.
- **Onde procurar:** ITA, Unicamp, Fuvest.
