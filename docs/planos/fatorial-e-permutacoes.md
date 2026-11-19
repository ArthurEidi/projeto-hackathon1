# Plano — Fatorial e permutações

**Aula:** 1 — A Fila que Encolhe · Fatorial, permutações e letras repetidas
**Caminho:** aritmetica / combinatoria-e-probabilidade / fatorial-e-permutacoes
**Pré-requisitos que o aluno já domina:** princípio fundamental da contagem (etapas multiplicam), divisão.

## a) Ancoragem mecânica
A máquina recebe n objetos distintos e n lugares em fila e devolve quantas ordens diferentes existem. A entrada é n; a saída é n!. Cada lugar preenchido tira um objeto das opções do lugar seguinte, por isso as opções descem de uma em uma.

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo fila: caixas numeradas (lugares) e fichas arrastáveis (pessoas ou letras). Ao lado, uma "escada" de barras mostra as opções de cada lugar (n, n − 1, …, 1) e o produto. Slider de n (1 a 6).

## c) Caso neutro
Uma pessoa só, um lugar só: existe 1 fila, e 1! = 1. Nada se reorganiza. Depois aumentamos n de um em um.

## d) Panorama e recorte
Contar ordens leva a arranjos (escolher parte e ordenar), combinações (grupos sem ordem) e permutações circulares. Aqui ordenamos todos os objetos, distintos ou com letras repetidas.

## e) Progressão por contraste
1. n = 1: uma fila (referência).
2. n = 3: escada 3, 2, 1 e 6 filas.
3. n = 4: a escada ganha um degrau maior, 4! = 4 · 3! = 24.
4. Letras repetidas (OVO): as filas que só trocam letras iguais se colam, dividindo pelo número dessas trocas.
5. Restrição (começar com A): uma casa presa reduz a escada em um degrau.

## f) Dedução causal da forma
No 1º lugar cabe qualquer um dos n; no 2º, só os n − 1 que restaram; e assim até 1. Pelo princípio multiplicativo, o total é n · (n − 1) · … · 1 = n!. Com letras iguais, cada ordem aparece repetida a! vezes (as trocas entre as iguais), então dividimos: n! / (a! · b! · …).

## g) Simulação espacial e fronteiras
n! cresce muito rápido: 5! = 120, 6! = 720. A fila vazia tem um único arranjo, então 0! = 1. Letras todas iguais (AAA) dão um anagrama só: 3!/3! = 1. Prender objetos (começar por A, ficar juntos) muda a escada antes de multiplicar.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Número de objetos | Quantos objetos distintos entram na fila (n). |
| c2 | Opções do lugar | Quantos objetos ainda podem ocupar este lugar. |
| c3 | Total de ordens | Quantas filas diferentes existem: n! quando todos são distintos. |
| c4 | Letras repetidas | Objetos iguais, cuja troca não cria fila nova. |

### Passo 1 — `tres-amigos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 6
- **Widget:** WIDGET NOVO `grade_resultados` (modo fila) — 3 cadeiras, 3 fichas (Ana, Bia, Caio); cada cadeira mostra quantas fichas ainda cabem nela (c2); lista de filas já montadas. Emite `filas_montadas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Três amigos vão sentar em fila. Quantos podem ocupar a primeira cadeira, e quantos sobram para a segunda?"
- **Interação do aluno:** arrasta fichas para as cadeiras; cada fila completa entra na lista e as fichas voltam.
- **Conclusão:** `filas_montadas ≥ 3`
- **Paco (conclusão):** "3, depois 2, depois 1: são 3 · 2 · 1 = 6 filas. Cada cadeira tem uma opção a menos que a anterior."
- **Tati (dúvida):** `fim` — P: "Isso vale para escolher só alguns da fila?" / R: "Aí viram arranjos e combinações, na próxima aula. Hoje todo mundo entra na fila."

### Passo 2 — `escada`
- **Tipo:** `interactive_canvas`
- **Pilares:** 3 (caso neutro), 5, 6
- **Widget:** `grade_resultados` (modo escada) — barras de altura n, n − 1, …, 1 em c2 e o produto em c3.
- **Sliders:** `n` · "Pessoas na fila" · 1..6 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Com uma pessoa só, quantas filas existem? Agora aumente n e veja a escada de opções crescer."
- **Interação do aluno:** move n; cada pessoa nova acrescenta um degrau mais alto na frente da escada.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** "Com 4 pessoas: 4 · 3 · 2 · 1 = 24. Esse produto em escada se chama fatorial: 4! = 24."
- **Tati (dúvida):** `fim` — P: "Por que cresce tão rápido?" / R: "Cada pessoa nova multiplica tudo pelo maior degrau. 5! = 5 · 4! = 120."

### Passo 3 — `letras-iguais`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6
- **Widget:** `grade_resultados` (modo fila) — as 6 ordens de O₁, V, O₂; chave "os O são iguais": ligada, as ordens que só trocam O₁ e O₂ se colam (c4). Emite `iguais_ligado`.
- **Sliders:** nenhum
- **Paco (abertura):** "OVO tem 3 letras. Se os dois O fossem diferentes, seriam 6 ordens; quantas sobram quando eles são iguais?"
- **Interação do aluno:** liga a chave e vê as 6 ordens se juntarem de duas em duas.
- **Conclusão:** `iguais_ligado ≥ 1`
- **Paco (conclusão):** "Sobram 3: trocar um O pelo outro não muda nada. Dividimos 3! = 6 pelas 2! = 2 trocas dos O."

### Passo 4 — `letra-presa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (restrição)
- **Widget:** `grade_resultados` (modo fila) — AMOR com 4 casas; o aluno prende o A na 1ª casa (cadeado c4) e a escada vira 3, 2, 1. Emite `letra_presa`.
- **Sliders:** nenhum
- **Paco (abertura):** "Quantos anagramas de AMOR começam com A? Prenda o A na primeira casa e conte o resto."
- **Interação do aluno:** arrasta o A para a 1ª casa e toca no cadeado.
- **Conclusão:** `letra_presa ≥ 1`
- **Paco (conclusão):** "Com o A preso, sobram 3 letras para 3 casas: 3! = 6."

### Passo 5 — `desafio-prateleira`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — prateleira com 5 livros coloridos.
- **Paco (abertura):** "Pense na escada: quantas opções tem cada lugar da prateleira?"
- **Enunciado:** "De quantos jeitos 5 livros diferentes podem ficar lado a lado numa prateleira?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a25` | 25 | não | "25 é 5 · 5, como se todo lugar tivesse 5 livros. Cada livro usado sai: 5! = 120." | escada com todos os degraus em 5, riscados |
| `a15` | 15 | não | "15 soma 5 + 4 + 3 + 2 + 1. Os degraus se multiplicam: 120." | escada com sinais de + trocando por · |
| `a120` | 120 | **sim** | "Isso. 5 · 4 · 3 · 2 · 1 = 120." | escada 5, 4, 3, 2, 1 com produto 120 |
| `a5` | 5 | não | "5 é o número de livros. As ordens são 5! = 120." | só o primeiro degrau aceso |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — escada 4, 3, 2, 1 com produto 24.
- **Fórmula:** `n!`→c3 · `=` · `n`→c1 · `· (n − 1) · … · 2 · 1`
- **Definições:** "Fatorial: n! = n · (n − 1) · … · 1, e 0! = 1." · "Permutação simples: ordens de n objetos distintos, n!." · "Com repetição: n! dividido pelo fatorial de cada grupo de iguais."
- **Paco (abertura):** "Cada lugar usa um objeto e o próximo tem um a menos. Por isso as ordens são o produto em escada, n!."
- **Dica (hint):** "Toque em uma letra para ver a parte da escada que ela representa."
- **Tati (dúvida):** `início` — P: "E quanto vale 0!?" / R: "Vale 1: existe um único jeito de organizar nada, a fila vazia."

**Frase de encerramento (outro):** "Você viu a fila encolher lugar por lugar: n objetos distintos fazem n! ordens, e letras iguais dividem esse total."

## i) Treino pós-aula

### Fáceis

#### F1 — `tres-fatorial`
- **Enunciado:** "De quantas ordens 3 pessoas podem formar uma fila?"
- **Conta de conferência:** 3! = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | não | "3 é o número de pessoas. As ordens são 3 · 2 · 1 = 6." |
| `a6` | 6 | **sim** | "Isso. 3 · 2 · 1 = 6, como na aula." |
| `a9` | 9 | não | "9 é 3 · 3, deixando repetir pessoa. Sem repetir: 3 · 2 · 1 = 6." |
| `a1` | 1 | não | "Há muitas ordens, não uma. São 3! = 6." |

#### F2 — `primeiro-lugar`
- **Enunciado:** "Numa fila de 4 pessoas, quantas opções há para o primeiro lugar?"
- **Conta de conferência:** 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | **sim** | "Certo. Qualquer uma das 4 pode começar a fila." |
| `a3` | 3 | não | "3 são as opções do segundo lugar. O primeiro tem as 4." |
| `a24` | 24 | não | "24 é o total de filas, 4!. O primeiro lugar tem 4 opções." |
| `a1` | 1 | não | "1 é o último lugar, que recebe quem sobrou. O primeiro tem 4 opções." |

#### F3 — `quatro-fatorial`
- **Enunciado:** "Quanto vale 4!?"
- **Conta de conferência:** 4 · 3 · 2 · 1 = 24

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | não | "10 é 4 + 3 + 2 + 1. Fatorial multiplica: 24." |
| `a16` | 16 | não | "16 é 4 · 4. Os degraus descem: 4 · 3 · 2 · 1 = 24." |
| `a24` | 24 | **sim** | "Isso. 4 · 3 · 2 · 1 = 24." |
| `a12` | 12 | não | "12 é 4 · 3, faltaram degraus. 4 · 3 · 2 · 1 = 24." |

#### F4 — `anagramas-sol`
- **Enunciado:** "Quantos anagramas tem a palavra SOL?"
- **Conta de conferência:** 3! = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | não | "3 é o número de letras. As ordens são 3! = 6." |
| `a6` | 6 | **sim** | "Certo. Letras todas diferentes: 3! = 6." |
| `a9` | 9 | não | "9 deixaria repetir letra. São 3 · 2 · 1 = 6." |
| `a27` | 27 | não | "27 é 3 · 3 · 3. Cada letra é usada uma vez só: 6." |

### Médias

#### M1 — `razao-fatoriais`
- **Enunciado:** "Quanto vale 5! / 3!?"
- **Fala do Paco:** "Escreva as duas escadas e corte o que é igual."
- **Conta de conferência:** 120 / 6 = 20 = 5 · 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | não | "Fatoriais não se dividem como 5/3 ou 2!. Corte 3 · 2 · 1: sobra 5 · 4 = 20." |
| `a20` | 20 | **sim** | "Isso. 5 · 4 · 3! / 3! = 5 · 4 = 20." |
| `a40` | 40 | não | "Sobra só 5 · 4 depois de cortar o 3!. Dá 20." |
| `a120` | 120 | não | "120 é só o 5!. Dividindo por 3! = 6, fica 20." |

#### M2 — `bola-com-b`
- **Enunciado:** "Quantos anagramas de BOLA começam com B?"
- **Conta de conferência:** 3! = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Certo. B preso, sobram 3 letras: 3! = 6." |
| `a24` | 24 | não | "24 são todos os anagramas. Com o B preso: 3! = 6." |
| `a4` | 4 | não | "4 é o número de letras. Com o B fixo, as outras 3 fazem 3! = 6." |
| `a18` | 18 | não | "Com B na frente, só as 3 letras de trás mudam: 3! = 6." |

#### M3 — `anagramas-ana`
- **Enunciado:** "Quantos anagramas tem a palavra ANA?"
- **Conta de conferência:** 3! / 2! = 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | não | "6 trata os dois A como diferentes. Dividindo pelas 2! trocas: 3." |
| `a3` | 3 | **sim** | "Isso. ANA, AAN e NAA: 3! / 2! = 3." |
| `a2` | 2 | não | "Falta um: ANA, AAN e NAA. São 3! / 2! = 3." |
| `a1` | 1 | não | "Há mais de um: AAN e NAA também valem. 3! / 2! = 3." |

### Desafios

#### D1 — `banana`
- **Enunciado:** "Quantos anagramas tem a palavra BANANA?"
- **Fala do Paco:** "Conte as letras repetidas: quantos A e quantos N?"
- **Conta de conferência:** 6! / (3! · 2!) = 720 / 12 = 60

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a720` | 720 | não | "720 trata todas as letras como diferentes. Divida por 3! dos A e 2! dos N: 60." |
| `a60` | 60 | **sim** | "Certo. 720 / (6 · 2) = 60." |
| `a120` | 120 | não | "120 divide só pelos A. Falta dividir pelos N: 720 / 12 = 60." |
| `a360` | 360 | não | "360 divide só pelos N. Os três A dão mais 3!: 720 / 12 = 60." |

#### D2 — `juntas-na-fila`
- **Enunciado:** "Cinco pessoas fazem fila, e Ana e Bia querem ficar juntas. Quantas filas são possíveis?"
- **Fala do Paco:** "Cole as duas num bloco só e não esqueça de trocá-las dentro do bloco."
- **Conta de conferência:** bloco + 3 pessoas = 4! = 24; dentro do bloco 2! = 2; total 48

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a48` | 48 | **sim** | "Isso. 4! ordens do bloco com as outras e 2 ordens dentro: 48." |
| `a24` | 24 | não | "Faltou trocar Ana e Bia dentro do bloco. 24 · 2 = 48." |
| `a120` | 120 | não | "120 são todas as filas, sem exigir que fiquem juntas. Com o bloco: 4! · 2 = 48." |
| `a96` | 96 | não | "Com o bloco há 4 itens, não 5. 4! · 2 = 48." |

#### D3 — `zero-fatorial`
- **Enunciado:** "Quanto vale 0!?"
- **Fala do Paco:** "Pense em quantas filas existem com ninguém."
- **Conta de conferência:** 1! = 1 · 0! ⇒ 0! = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | não | "Há um jeito de organizar nada: a fila vazia. Por isso 0! = 1." |
| `a1` | 1 | **sim** | "Certo. E isso mantém 1! = 1 · 0! funcionando." |
| `indef` | Não existe | não | "Existe e vale 1: a fila vazia é um arranjo só." |
| `inf` | Infinito | não | "Não há infinitas filas vazias, há uma. 0! = 1." |

#### D4 — `dez-sobre-nove`
- **Enunciado:** "Quanto vale 10! / 9!?"
- **Conta de conferência:** 10 · 9! / 9! = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Isso. 10! = 10 · 9!, e o 9! se cancela." |
| `a1` | 1 | não | "Não se cancelam por inteiro: 10! tem um degrau a mais, o 10. Resultado 10." |
| `a9` | 9 | não | "O degrau que sobra é o maior, o 10. Resultado 10." |
| `a90` | 90 | não | "90 seria 10! / 8!. Com 9! sobra só o 10." |

#### D5 — `amor-pontas`
- **Enunciado:** "Quantos anagramas de AMOR têm A e R nas pontas, em qualquer ordem?"
- **Fala do Paco:** "Última. Primeiro as pontas, depois o meio."
- **Conta de conferência:** pontas 2! = 2; meio 2! = 2; total 4

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | não | "2 conta só as pontas (A…R ou R…A). O meio M, O também troca: 2 · 2 = 4." |
| `a4` | 4 | **sim** | "Certo. 2 ordens nas pontas vezes 2 no meio: 4." |
| `a6` | 6 | não | "6 prende só uma ponta. Com as duas presas: 2 · 2 = 4." |
| `a24` | 24 | não | "24 são todos os anagramas. Com as pontas fixas em A e R: 4." |

### Vestibular

#### V1 — `enem-2011-digitos`
- **Enunciado:** "Com os dígitos 1, 3, 5, 7 e 9 sem repetir, formam-se senhas de 5 dígitos em ordem crescente. Qual a posição de 75 913?"
- **Fala do Paco:** "Conte os números menores que 75 913 fixando os prefixos maiores: começando por 1, 3, 5, depois 71, 73, depois 751, 753."
- **Fonte:** ENEM 2011 (adaptada); Questão 174: enunciado resumido; alternativas e gabarito (89) mantidos; https://api.enem.dev/v1/exams/2011/questions/174
- **Conta de conferência:** 3·4! + 2·3! + 2·2! + 1 = 72 + 12 + 4 + 1 = 89.

#### V2 — `enem-2020-anagramas` (B42: substitui a ENEM 2012/144, que ficou só em `principio-fundamental-da-contagem`)
- **Enunciado:** "Anagramas de I AM POTTER (9 letras, sem os espaços) com vogais e consoantes sempre intercaladas: quantos são?"
- **Fala do Paco:** "São 5 consoantes e 4 vogais: a fila começa e termina em consoante. E o T aparece duas vezes."
- **Fonte:** ENEM 2020 (adaptada); Questão 163: enunciado resumido, alternativas (imagens no original) transcritas; gabarito E; https://api.enem.dev/v1/exams/2020/questions/163
- **Alternativas:** 9! · 4! · 5! · 2 · 4! · 5! · 9!/2 · **4! · 5!/2** (E).
- **Conta de conferência:** consoantes M, P, T, T, R nas 5 casas ímpares: 5!/2! = 60; vogais I, A, O, E nas 4 pares: 4! = 24; 60 · 24 = 1 440 = 4! · 5!/2.

#### V3 — `enem-2009-copa`
- **Enunciado:** "De 12 cidades, 4 são sorteadas (sem ordem) para um torneio e depois 2 delas viram mandante e visitante. Que contagens são?"
- **Fala do Paco:** "Veja se a ordem importa: o grupo de 4 cidades é sem ordem; escolher mandante e visitante tem ordem."
- **Fonte:** ENEM 2009 (adaptada); Questão 165: enunciado resumido; alternativas e gabarito (Uma combinação e um arranjo, respectivamente) mantidos; https://api.enem.dev/v1/exams/2009/questions/165
- **Conta de conferência:** C(12; 4) (sem ordem) e A(4; 2) (com ordem).
