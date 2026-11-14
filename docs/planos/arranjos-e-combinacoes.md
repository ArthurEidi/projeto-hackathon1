# Plano — Arranjos e combinações

**Aula:** 1 — Quando a Ordem Some · Arranjos, combinações e a divisão por k!
**Caminho:** aritmetica / combinatoria-e-probabilidade / arranjos-e-combinacoes
**Pré-requisitos que o aluno já domina:** princípio fundamental da contagem, fatorial.

## a) Ancoragem mecânica
A máquina recebe n objetos e quantos serão escolhidos (k) e devolve quantas escolhas existem. Uma chave decide se a ordem importa: com ordem a saída é o arranjo A(n, k); sem ordem, a combinação C(n, k). n e k são as entradas; a contagem é a saída.

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo pares: 4 pessoas (A, B, C, D); para k = 2, uma grade 4 × 4 sem a diagonal mostra os pares ordenados (presidente, vice). Chave "a ordem importa?": desligada, AB e BA se fundem numa célula só. Slider de k.

## c) Caso neutro
k = 1: escolher uma pessoa com ou sem ordem dá o mesmo, 4 opções. Com um escolhido não há o que reordenar. A diferença só aparece a partir de k = 2.

## d) Panorama e recorte
Há também combinações com repetição, permutações circulares e o binômio de Newton. Aqui: escolher k de n objetos distintos, sem repetir, com e sem ordem.

## e) Progressão por contraste
1. k = 1: arranjo = combinação = 4 (referência).
2. k = 2 com ordem: 4 · 3 = 12 pares (grade sem diagonal).
3. k = 2 sem ordem: cada dupla aparecia 2 vezes, 12 / 2 = 6 (metade da grade).
4. k = 3: cada trio aparecia 3! = 6 vezes, 24 / 6 = 4.
5. Simetria: escolher quem entra = escolher quem fica de fora, C(n, k) = C(n, n − k).

## f) Dedução causal da forma
Com ordem, o princípio multiplicativo dá A(n, k) = n · (n − 1) · … · (n − k + 1) = n! / (n − k)!. Sem ordem, cada grupo de k aparece em k! ordens diferentes dentro do arranjo. Por isso C(n, k) = A(n, k) / k! = n! / (k! (n − k)!).

## g) Simulação espacial e fronteiras
k = 0 e k = n dão 1 grupo (o vazio e o completo). Os valores sobem até o meio e descem simétricos (1, 4, 6, 4, 1 para n = 4). k maior que n dá 0. "Pelo menos um" se conta pelo complemento: total menos os grupos sem ninguém do tipo pedido.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Total de objetos | De quantos objetos se escolhe (n). |
| c2 | Escolhidos | Quantos objetos entram no grupo (k). |
| c3 | Número de grupos | Quantas escolhas sem ordem existem: C(n, k). |
| c4 | Ordens repetidas | As k! ordens de um mesmo grupo, que a combinação conta como uma. |

### Passo 1 — `presidente-e-vice`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro)
- **Widget:** WIDGET NOVO `grade_resultados` (modo pares) — 4 pessoas; k = 1 mostra 4 células; k = 2 mostra a grade 4 × 4 sem diagonal (12 pares ordenados). Emite `total`.
- **Sliders:** `k` · "Escolhidos" · 1..2 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Escolher 1 de 4 pessoas dá quantas opções? Agora escolha 2, um para presidente e outro para vice."
- **Interação do aluno:** leva k para 2 e vê a grade aparecer sem a diagonal.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Presidente tem 4 opções e vice, 3: 4 · 3 = 12. Escolher em ordem tira uma opção a cada cargo."
- **Tati (dúvida):** `fim` — P: "E se pudesse repetir a mesma pessoa?" / R: "Seria outra contagem, com repetição. Hoje cada pessoa entra uma vez só."

### Passo 2 — `ordem-some`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6
- **Widget:** `grade_resultados` — mesma grade; chave "a ordem importa?" (c4). Desligada, AB e BA se fundem; a metade de cima da grade se apaga. Emite `ordem_desligada`.
- **Sliders:** nenhum
- **Paco (abertura):** "E se forem só dois representantes, sem cargo? AB e BA continuam sendo escolhas diferentes?"
- **Interação do aluno:** desliga a chave e vê os pares espelhados se juntarem.
- **Conclusão:** `ordem_desligada ≥ 1`
- **Paco (conclusão):** "Não: viram a mesma dupla. Cada dupla aparecia 2 vezes, então 12 / 2 = 6 combinações."

### Passo 3 — `trios`
- **Tipo:** `interactive_canvas`
- **Pilares:** 6
- **Widget:** `grade_resultados` (modo lista) — os 24 arranjos de 3 pessoas agrupados por trio; cada trio mostra suas 3! = 6 ordens empilhadas (c4).
- **Sliders:** `k` · "Escolhidos" · 2..3 · passo 1 · inicial 2 · c2
- **Paco (abertura):** "Com trios, cada grupo aparece em quantas ordens? Leve k para 3 e veja os grupos colarem."
- **Interação do aluno:** move k e observa as pilhas de 6 ordens virando um trio só.
- **Conclusão:** `k ≥ 3`
- **Paco (conclusão):** "Cada trio aparece 3! = 6 vezes no arranjo. Por isso 24 / 6 = 4 trios."

### Passo 4 — `simetria`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteiras)
- **Widget:** `grade_resultados` (modo barras) — barras de C(4, k) para k = 0..4, com a barra atual acesa; ao lado, quem entra (c2) e quem fica de fora.
- **Sliders:** `k` · "Escolhidos" · 0..4 · passo 1 · inicial 2 · c2
- **Paco (abertura):** "Escolher 1 de 4 e deixar 1 de fora dão a mesma conta? Leve k até 4 e compare as barras."
- **Interação do aluno:** varre k e vê as barras 1, 4, 6, 4, 1.
- **Conclusão:** `k ≥ 4`
- **Paco (conclusão):** "Dão: escolher quem entra é escolher quem fica de fora. Por isso as barras são simétricas, 1, 4, 6, 4, 1."
- **Tati (dúvida):** `fim` — P: "Escolher zero pessoas conta?" / R: "Conta como 1: o grupo vazio. Do mesmo jeito, escolher todas dá 1."

### Passo 5 — `desafio-duplas`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — 5 alunos e a grade 5 × 5 apagada.
- **Paco (abertura):** "Dupla de trabalho não tem cargo. A ordem importa aqui?"
- **Enunciado:** "Numa turma de 5 alunos, quantas duplas diferentes podem ser formadas?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a20` | 20 | não | "20 conta AB e BA separados. Numa dupla a ordem não importa: 20 / 2 = 10." | grade sem diagonal, metade de cima piscando |
| `a25` | 25 | não | "25 inclui alguém com ele mesmo e as ordens trocadas. Sem isso: 10." | grade cheia com diagonal riscada |
| `a10` | 10 | **sim** | "Isso. 5 · 4 = 20 ordens, divididas pelas 2 ordens de cada dupla: 10." | metade de baixo da grade acesa, 10 células |
| `a5` | 5 | não | "5 é o número de alunos. As duplas são C(5, 2) = 10." | só a primeira linha acesa |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — os 24 arranjos de 3 de 4 agrupados em 4 trios.
- **Fórmula:** `C(n, k)`→c3 · `=` · `n!`→c1 · `/` · `(k!`→c4 · `(n − k)!)`
- **Definições:** "Arranjo: escolhas em que a ordem importa, A(n, k) = n! / (n − k)!." · "Combinação: grupos sem ordem, C(n, k) = A(n, k) / k!." · "Simetria: C(n, k) = C(n, n − k)."
- **Paco (abertura):** "O arranjo conta cada grupo k! vezes, uma para cada ordem. Por isso a combinação divide o arranjo por k!."
- **Dica (hint):** "Toque em uma letra para ver o que ela conta na grade."

**Frase de encerramento (outro):** "Você viu a ordem sumir: arranjos contam filas, combinações contam grupos, e a ponte entre os dois é dividir por k!."

## i) Treino pós-aula

### Fáceis

#### F1 — `presidente-vice-5`
- **Enunciado:** "Numa turma de 5, de quantos jeitos se escolhe um presidente e um vice?"
- **Conta de conferência:** 5 · 4 = 20

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 | **sim** | "Isso. Cargos diferentes, a ordem importa: 5 · 4 = 20." |
| `a10` | 10 | não | "10 trata presidente e vice como iguais. Com cargos, a ordem conta: 20." |
| `a25` | 25 | não | "25 deixa a mesma pessoa ter os dois cargos. São 5 · 4 = 20." |
| `a9` | 9 | não | "9 é a soma 5 + 4. Etapas multiplicam: 20." |

#### F2 — `duplas-de-4`
- **Enunciado:** "Com 4 amigos, quantas duplas diferentes dá para formar?"
- **Conta de conferência:** 4 · 3 / 2 = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Certo. 12 pares ordenados, cada dupla contada 2 vezes: 6." |
| `a12` | 12 | não | "12 conta AB e BA separados. Na dupla a ordem não importa: 6." |
| `a8` | 8 | não | "8 seria 4 · 2. As duplas são 4 · 3 / 2 = 6." |
| `a16` | 16 | não | "16 é a grade cheia, com alguém repetido. Sem isso e sem ordem: 6." |

#### F3 — `ordem-no-sorvete`
- **Enunciado:** "Escolher 3 sabores para uma taça de sorvete misturada: a ordem importa?"
- **Conta de conferência:** a taça morango-chocolate-uva é a mesma em qualquer ordem

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sim` | Sim, é arranjo | não | "Na taça misturada, trocar a ordem dos sabores dá a mesma taça. É combinação." |
| `nao` | Não, é combinação | **sim** | "Isso. O que importa é quais sabores entram, não a ordem." |

#### F4 — `c-5-1`
- **Enunciado:** "De quantos jeitos se escolhe 1 pessoa entre 5?"
- **Conta de conferência:** C(5, 1) = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Certo. Com um escolhido não há ordem para trocar: 5 opções." |
| `a1` | 1 | não | "1 seria escolher ninguém ou todos. Para escolher 1 de 5, há 5 opções." |
| `a4` | 4 | não | "4 é quem fica de fora. Quem entra pode ser qualquer um dos 5." |
| `a10` | 10 | não | "10 é C(5, 2), duplas. Escolhendo 1: 5." |

### Médias

#### M1 — `c-6-2`
- **Enunciado:** "Quantas duplas dá para formar com 6 pessoas?"
- **Conta de conferência:** 6 · 5 / 2 = 15

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a30` | 30 | não | "30 conta as duplas em ordem. Divida pelas 2 ordens: 15." |
| `a15` | 15 | **sim** | "Isso. 6 · 5 / 2 = 15." |
| `a12` | 12 | não | "12 é 6 · 2. As duplas são 6 · 5 / 2 = 15." |
| `a36` | 36 | não | "36 é 6 · 6, com repetição e ordem. Sem os dois: 15." |

#### M2 — `podio-6`
- **Enunciado:** "Seis corredores disputam ouro, prata e bronze. Quantos pódios diferentes são possíveis?"
- **Conta de conferência:** 6 · 5 · 4 = 120

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a120` | 120 | **sim** | "Certo. Medalhas diferentes, a ordem importa: 6 · 5 · 4 = 120." |
| `a20` | 20 | não | "20 são os trios sem ordem. No pódio ouro e prata são diferentes: 120." |
| `a216` | 216 | não | "216 deixa um corredor ganhar duas medalhas. Sem repetir: 120." |
| `a18` | 18 | não | "18 é 6 · 3. As medalhas tiram um corredor por vez: 6 · 5 · 4 = 120." |

#### M3 — `c-5-3`
- **Enunciado:** "De quantos jeitos se escolhem 3 livros de uma pilha de 5 para levar na viagem?"
- **Conta de conferência:** 5 · 4 · 3 / 3! = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Isso. 60 ordens divididas pelas 3! = 6 de cada trio: 10." |
| `a60` | 60 | não | "60 conta a ordem dos livros na mala. Sem ordem: 60 / 6 = 10." |
| `a20` | 20 | não | "20 divide por 3 em vez de 3! = 6. Fica 60 / 6 = 10." |
| `a15` | 15 | não | "15 é a soma 5 + 4 + 3 + 2 + 1. A conta é 60 / 6 = 10." |

### Desafios

#### D1 — `apertos-de-mao`
- **Enunciado:** "Seis pessoas se cumprimentam, cada par uma vez. Quantos apertos de mão acontecem?"
- **Fala do Paco:** "Um aperto de mão é uma dupla: A com B é o mesmo que B com A."
- **Conta de conferência:** C(6, 2) = 15

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a15` | 15 | **sim** | "Certo. São as duplas de 6: 6 · 5 / 2 = 15." |
| `a30` | 30 | não | "30 conta cada aperto duas vezes. Dividindo por 2: 15." |
| `a36` | 36 | não | "36 inclui cada um cumprimentando a si mesmo. Sem isso e sem ordem: 15." |
| `a12` | 12 | não | "12 é 6 · 2. Os apertos são C(6, 2) = 15." |

#### D2 — `c-10-8`
- **Enunciado:** "Quanto vale C(10, 8)?"
- **Fala do Paco:** "Escolher 8 que entram é escolher 2 que ficam de fora."
- **Conta de conferência:** C(10, 8) = C(10, 2) = 45

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a45` | 45 | **sim** | "Isso. C(10, 8) = C(10, 2) = 10 · 9 / 2 = 45." |
| `a90` | 90 | não | "90 é 10 · 9, com ordem. Dividindo por 2: 45." |
| `a80` | 80 | não | "80 é 10 · 8. Pela simetria, C(10, 8) = C(10, 2) = 45." |
| `a10` | 10 | não | "10 é C(10, 1). Deixar 2 de fora dá C(10, 2) = 45." |

#### D3 — `pelo-menos-uma`
- **Enunciado:** "De 3 homens e 2 mulheres, quantas comissões de 3 pessoas têm pelo menos uma mulher?"
- **Fala do Paco:** "Conte tudo e tire o que não serve."
- **Conta de conferência:** C(5, 3) − C(3, 3) = 10 − 1 = 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a9` | 9 | **sim** | "Certo. 10 comissões ao todo, menos 1 só de homens: 9." |
| `a10` | 10 | não | "10 inclui a comissão só de homens. Tirando ela: 9." |
| `a6` | 6 | não | "6 conta só comissões com exatamente uma mulher. Com duas há mais 3: 9." |
| `a7` | 7 | não | "Pelo complemento: 10 − 1 = 9." |

#### D4 — `diagonais-pentagono`
- **Enunciado:** "Quantas diagonais tem um pentágono?"
- **Fala do Paco:** "Toda dupla de vértices é um segmento; alguns são lados."
- **Conta de conferência:** C(5, 2) − 5 = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | **sim** | "Isso. 10 segmentos entre vértices, menos os 5 lados: 5." |
| `a10` | 10 | não | "10 conta também os lados. Tirando os 5 lados: 5 diagonais." |
| `a20` | 20 | não | "20 conta cada segmento duas vezes e inclui os lados. Fica 10 − 5 = 5." |
| `a15` | 15 | não | "Os segmentos entre 5 vértices são C(5, 2) = 10; sem os lados, 5." |

#### D5 — `aposta-7-de-6`
- **Enunciado:** "Numa loteria se marcam 6 números. Quantas apostas simples cabem numa escolha de 7 números?"
- **Fala do Paco:** "Última. Quantos números ficam de fora em cada aposta?"
- **Conta de conferência:** C(7, 6) = C(7, 1) = 7

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a7` | 7 | **sim** | "Certo. Cada aposta deixa um dos 7 de fora: C(7, 6) = 7." |
| `a42` | 42 | não | "42 é 7 · 6. Pela simetria, C(7, 6) = C(7, 1) = 7." |
| `a5040` | 5040 | não | "5040 é 7!, ordens de 7 números. Grupos de 6 de 7: só 7." |
| `a1` | 1 | não | "1 seria escolher os 7 de uma vez. Grupos de 6: cada um deixa um de fora, 7." |

### Vestibular

#### V1 — `ueg-2005-provas`
- **Enunciado (resumido):** "Oito matérias serão divididas em duas provas de 4 matérias, uma em cada dia. De quantos modos isso pode ser feito?"
- **Fala do Paco:** "Escolha as 4 do primeiro dia; as outras vão para o segundo."
- **Fonte:** UEG 2005 (adaptada) — **Adaptação:** Processo Seletivo 2005/2; enunciado resumido (lista de matérias omitida), alternativas e gabarito (70) mantidos — **URL:** https://projetoagathaedu.com.br/questoes-vestibular/matematica/algebra/analise-combinatoria.php
- **Conta de conferência:** C(8, 4) = 70

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1680` | 1680 | não | "1680 é 8 · 7 · 6 · 5, com ordem dentro da prova. Sem ordem: 1680 / 4! = 70." |
| `a256` | 256 | não | "256 é 2⁸, sem garantir 4 por dia. Escolhendo as 4 do 1º dia: C(8, 4) = 70." |
| `a140` | 140 | não | "Os dias são distintos, mas escolher o 1º dia já define o 2º. Não dobre: 70." |
| `a128` | 128 | não | "128 é 2⁷. O certo é escolher 4 de 8: C(8, 4) = 70." |
| `a70` | 70 | **sim** | "Isso. C(8, 4) = 70, e o resto vai para o outro dia." |

#### V2 — `enem-2019-duplas`
- **Enunciado (resumido):** "Oito amigos, sendo dois canhotos, vão formar 4 duplas de vôlei sem juntar os dois canhotos na mesma dupla; de quantos modos?"
- **Fala do Paco:** "Cada canhoto escolhe um destro; depois conte os pares entre os 4 destros que sobram."
- **Fonte:** ENEM 2019 (adaptada) — **Adaptação:** Questão 156: enunciado resumido; alternativas e gabarito (90) mantidos — **URL:** https://api.enem.dev/v1/exams/2019/questions/156
- **Conta de conferência:** 6 · 5 · C(4, 2) / 2! = 6 · 5 · 3 = 90 (ou 105 − 15 = 90).

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** combinação com restrição "pelo menos um" (complemento).
- **Onde procurar:** UFRGS, PUC-RS, EsPCEx.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** combinações em loteria ou apertos de mão.
- **Onde procurar:** ENEM 2009–2015 (Mega-Sena), UERJ.
