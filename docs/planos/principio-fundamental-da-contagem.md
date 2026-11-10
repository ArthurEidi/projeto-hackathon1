# Plano — Princípio fundamental da contagem

**Aula:** 1 — A Grade de Escolhas · Contar etapas multiplicando
**Caminho:** aritmetica / combinatoria-e-probabilidade / principio-fundamental-da-contagem
**Pré-requisitos que o aluno já domina:** multiplicação como área de retângulo, tabuada.

## a) Ancoragem mecânica
A máquina recebe uma lista de etapas, cada uma com um número de opções, e devolve quantos resultados completos existem. As opções de cada etapa são as entradas independentes; o total de resultados é a saída. Cada etapa nova copia tudo o que já existia uma vez para cada opção dela.

## b) Visual de partida
WIDGET NOVO `grade_resultados` em modo grade: camisetas nas linhas, bermudas nas colunas, cada célula é um look. Sliders de opções por etapa (1 a 4). Um modo árvore mostra a mesma contagem como galhos; um botão alterna "e" (combinar) e "ou" (escolher uma coisa só).

## c) Caso neutro
Uma etapa com 1 opção só: 3 camisetas e 1 bermuda dão 3 looks, a grade é uma coluna. Multiplicar por 1 não muda nada. Depois aumentamos uma etapa por vez.

## d) Panorama e recorte
Permutações, arranjos, combinações e probabilidade nascem deste princípio. Aqui só contamos escolhas feitas em etapas, com ou sem repetição.

## e) Progressão por contraste
1. 3 camisetas × 1 bermuda: uma coluna, 3 looks (referência).
2. 2 bermudas: a coluna é copiada, 6 looks; o total dobra.
3. Terceira etapa (boné): cada look vira dois caminhos na árvore, 12.
4. "Ou" contra "e": 3 + 2 = 5 lado a lado, contra 3 · 2 = 6 combinados.
5. Sem repetição: a grade perde a diagonal (3 · 3 = 9 vira 3 · 2 = 6).

## f) Dedução causal da forma
Cada opção da primeira etapa abre o mesmo número de galhos na segunda. Por isso o desenho é um retângulo cheio, e contar um retângulo é multiplicar lados. Com mais etapas o retângulo vira caixa, e a regra continua: total = n₁ · n₂ · … · nₖ.

## g) Simulação espacial e fronteiras
Zerar uma etapa apaga a grade inteira: sem bermuda, não há look completo. Proibir repetição tira exatamente uma opção da etapa seguinte. Pedir mais posições distintas do que há símbolos dá zero (4 algarismos distintos só com 1, 2 e 3). Com restrição numa vaga (o primeiro algarismo não pode ser 0, o último tem de ser par), preenche-se primeiro a vaga restrita; no widget, essa vaga aparece com cadeado c4 e é a primeira a pedir escolha.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Opções da 1ª etapa | Quantas escolhas existem no primeiro passo. |
| c2 | Opções da 2ª etapa | Quantas escolhas existem no segundo passo, para cada escolha do primeiro. |
| c3 | Total de resultados | Quantos resultados completos a máquina produz. |
| c4 | Opção bloqueada | Escolha proibida por uma regra, como não repetir. |

### Passo 1 — `uma-coluna`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama na dúvida)
- **Widget:** WIDGET NOVO `grade_resultados` (modo grade) — linhas = camisetas (c1), colunas = bermudas (c2), células preenchidas = looks (c3), contador do total. Emite `total`, `celulas_tocadas`.
- **Sliders:** `camisetas` · "Camisetas" · 1..4 · passo 1 · inicial 3 · c1; `bermudas` · "Bermudas" · 1..3 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Com 3 camisetas e uma bermuda só, quantos looks dá para montar? Depois aumente as bermudas e veja a grade."
- **Interação do aluno:** move o slider de bermudas; a coluna de looks é copiada ao lado.
- **Conclusão:** `bermudas ≥ 2`
- **Paco (conclusão):** "Cada bermuda nova copia a coluna inteira de camisetas. Por isso 3 camisetas e 2 bermudas dão 3 · 2 = 6 looks."
- **Tati (dúvida):** `fim` — P: "Toda contagem é multiplicar?" / R: "Não: há casos de 'ou', de ordem e de grupos. Hoje ficamos nas escolhas feitas em etapas."

### Passo 2 — `terceira-etapa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `grade_resultados` (modo árvore) — raiz → 3 camisetas → 2 bermudas → 2 bonés; o aluno toca as pontas finais e o caminho acende. Emite `pontas_tocadas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora entra um boné, com 2 opções. Antes de tocar: o total soma 2 ou dobra?"
- **Interação do aluno:** toca pontas da árvore; cada toque acende um caminho completo camiseta → bermuda → boné.
- **Conclusão:** `pontas_tocadas ≥ 4`
- **Paco (conclusão):** "Dobrou: 6 · 2 = 12. Cada look ganhou dois finais diferentes, um para cada boné."

### Passo 3 — `e-ou`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6
- **Widget:** `grade_resultados` com chave "e / ou": em "e", grade 3 × 2; em "ou", as opções ficam numa fila só (3 camisetas + 2 bonés). Emite `modo_ou` (0/1).
- **Sliders:** nenhum
- **Paco (abertura):** "E se você usasse camiseta OU boné, só uma peça? Ligue o modo 'ou' e compare com o 'e'."
- **Interação do aluno:** alterna a chave e vê a grade virar fila.
- **Conclusão:** `modo_ou ≥ 1`
- **Paco (conclusão):** "No 'ou' as opções ficam lado a lado: 3 + 2 = 5. No 'e' cada uma se combina com todas: 3 · 2 = 6."

### Passo 4 — `sem-repetir`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira), 6
- **Widget:** `grade_resultados` — senhas de 2 dígitos com {1, 2, 3}: grade 3 × 3; chave "pode repetir". Desligada, a diagonal (11, 22, 33) fica cinza com marca c4. Emite `repetir_desligado` (0/1).
- **Sliders:** nenhum
- **Paco (abertura):** "Uma senha de 2 dígitos usa 1, 2 ou 3. Se não pode repetir, quantas opções sobram para o segundo dígito?"
- **Interação do aluno:** desliga a repetição e vê a diagonal apagar.
- **Conclusão:** `repetir_desligado ≥ 1`
- **Paco (conclusão):** "Sobram 2, porque um dígito já foi usado. Fica 3 · 2 = 6 em vez de 3 · 3 = 9: a grade perde a diagonal."
- **Tati (dúvida):** `fim` — P: "E se uma etapa não tiver nenhuma opção?" / R: "Aí o produto zera. Sem bermuda, não existe nenhum look completo."

### Passo 5 — `desafio-lanche`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `grade_figura` — três colunas de ícones: 3 pães (c1), 4 recheios (c2), 2 molhos.
- **Paco (abertura):** "Sem desenhar tudo: pense em quantas vezes cada escolha se repete."
- **Enunciado:** "Um lanche tem 3 pães, 4 recheios e 2 molhos, um de cada. Quantos lanches diferentes existem?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a9` | 9 | não | "Você somou as opções. Um lanche usa pão E recheio E molho, então multiplica." | as três colunas viram uma fila só (modo "ou") |
| `a12` | 12 | não | "12 é pão com recheio. Falta o molho: cada um dos 12 vira 2 lanches." | grade 3 × 4 com o molho piscando ao lado |
| `a24` | 24 | **sim** | "Isso. 3 · 4 · 2 = 24: cada etapa multiplica o que já existia." | grade 3 × 4 duplicada em duas camadas |
| `a14` | 14 | não | "Somar o molho no fim não basta: ele se combina com cada um dos 12. Fica 24." | grade 3 × 4 + 2 células soltas |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `grade_figura` — grade 3 × 2 com contador 6.
- **Fórmula:** `total`→c3 · `=` · `n₁`→c1 · `·` · `n₂`→c2 · `· … · nₖ`
- **Definições:** "Princípio multiplicativo: etapas feitas uma após a outra multiplicam as opções." · "Princípio aditivo: escolher uma coisa OU outra soma as opções." · "Sem repetição: cada etapa perde as opções já usadas."
- **Paco (abertura):** "Cada opção abre o mesmo número de galhos na etapa seguinte. Por isso o total é o produto das opções."
- **Dica (hint):** "Toque em uma letra para ver a parte da grade que ela conta."

**Frase de encerramento (outro):** "Você viu a grade crescer etapa por etapa: multiplicar conta escolhas combinadas, somar conta escolhas alternativas."

## i) Treino pós-aula

### Fáceis

#### F1 — `looks-4-2`
- **Enunciado:** "Com 4 camisetas e 2 calças, quantos looks diferentes dá para montar?"
- **Conta de conferência:** 4 · 2 = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | não | "6 é a soma das peças. Cada camiseta vai com cada calça: 4 · 2 = 8." |
| `a8` | 8 | **sim** | "Isso. A grade tem 4 linhas e 2 colunas: 8 looks." |
| `a2` | 2 | não | "2 é só o número de calças. Cada uma serve para 4 camisetas: 8 looks." |
| `a16` | 16 | não | "16 seria 4 · 4. São 2 calças, então 4 · 2 = 8." |

#### F2 — `pontas-da-arvore`
- **Enunciado:** "Uma árvore tem 3 galhos, e cada galho se abre em 2. Quantas pontas há no fim?"
- **Conta de conferência:** 3 · 2 = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | não | "5 seria somar. Cada um dos 3 galhos abre 2 pontas: 3 · 2 = 6." |
| `a6` | 6 | **sim** | "Certo. Três galhos com duas pontas cada: 6." |
| `a8` | 8 | não | "8 seria 2 · 2 · 2. Aqui são 3 galhos de 2 pontas: 6." |
| `a9` | 9 | não | "9 seria 3 · 3. Cada galho abre só 2: 3 · 2 = 6." |

#### F3 — `sobremesa-ou`
- **Enunciado:** "Você vai pegar UMA sobremesa: há 3 doces e 2 frutas. Quantas escolhas possíveis?"
- **Fala do Paco:** "Repare: é uma sobremesa só."
- **Conta de conferência:** 3 + 2 = 5

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | não | "6 seria doce E fruta juntos. É um ou outro, então soma: 3 + 2 = 5." |
| `a5` | 5 | **sim** | "Isso. No 'ou' as opções ficam lado a lado: 3 + 2 = 5." |
| `a3` | 3 | não | "Faltaram as frutas. Doce ou fruta: 3 + 2 = 5." |
| `a1` | 1 | não | "Você pega uma, mas pode escolher entre 5 opções: 3 doces + 2 frutas." |

#### F4 — `etapa-de-um`
- **Enunciado:** "Uma das etapas tem uma única opção. O que acontece com o total?"
- **Conta de conferência:** n · 1 = n

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `nao-muda` | Não muda | **sim** | "Certo. Multiplicar por 1 deixa o total igual, como a coluna única da aula." |
| `zera` | Zera | não | "Zeraria com 0 opções. Com 1 opção o total não muda." |
| `dobra` | Dobra | não | "Dobraria com 2 opções. Com 1 opção, o total fica igual." |
| `soma1` | Soma 1 | não | "Etapas multiplicam, não somam. Vezes 1, o total não muda." |

### Médias

#### M1 — `senha-3-com-repeticao`
- **Enunciado:** "Uma senha tem 3 dígitos de 0 a 9, podendo repetir. Quantas senhas existem?"
- **Conta de conferência:** 10 · 10 · 10 = 1000

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a30` | 30 | não | "30 é a soma das opções. Cada dígito multiplica: 10 · 10 · 10 = 1000." |
| `a720` | 720 | não | "720 seria sem repetir. Repetindo, cada dígito tem 10 opções: 1000." |
| `a1000` | 1000 | **sim** | "Isso. De 000 a 999 são 1000 senhas." |
| `a999` | 999 | não | "Faltou o 000. São 10 · 10 · 10 = 1000 senhas." |

#### M2 — `senha-3-sem-repeticao`
- **Enunciado:** "E se os 3 dígitos tiverem de ser diferentes entre si?"
- **Conta de conferência:** 10 · 9 · 8 = 720

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a1000` | 1000 | não | "1000 permite repetir. Sem repetir: 10 · 9 · 8 = 720." |
| `a720` | 720 | **sim** | "Certo. Cada dígito usado sai das opções: 10 · 9 · 8 = 720." |
| `a504` | 504 | não | "504 é 9 · 8 · 7: você tirou uma opção logo no primeiro dígito. É 10 · 9 · 8 = 720." |
| `a27` | 27 | não | "Somar 10 + 9 + 8 não conta senhas. Multiplique: 10 · 9 · 8 = 720." |

#### M3 — `moeda-3-vezes`
- **Enunciado:** "Uma moeda é lançada 3 vezes. Quantas sequências de cara e coroa podem sair?"
- **Conta de conferência:** 2 · 2 · 2 = 8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | não | "6 é 2 + 2 + 2. Cada lançamento dobra as sequências: 2 · 2 · 2 = 8." |
| `a8` | 8 | **sim** | "Isso. A árvore dobra três vezes: 8 sequências." |
| `a4` | 4 | não | "4 conta só dois lançamentos. Com três: 2 · 2 · 2 = 8." |
| `a3` | 3 | não | "3 é o número de lançamentos. Cada um tem 2 resultados: 8 sequências." |

### Desafios

#### D1 — `tres-algarismos-distintos`
- **Enunciado:** "Quantos números de 3 algarismos distintos dá para formar com 1, 2, 3, 4 e 5?"
- **Conta de conferência:** 5 · 4 · 3 = 60

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a125` | 125 | não | "125 permite repetir. Distintos: 5 · 4 · 3 = 60." |
| `a60` | 60 | **sim** | "Certo. Cada casa usa um algarismo a menos: 5 · 4 · 3 = 60." |
| `a15` | 15 | não | "15 é 5 · 3. Na segunda casa sobram 4: 5 · 4 · 3 = 60." |
| `a10` | 10 | não | "10 conta grupos sem ordem. Aqui 123 e 321 são números diferentes: 60." |

#### D2 — `pares-distintos`
- **Enunciado:** "Com 1, 2, 3 e 4, quantos números pares de 2 algarismos distintos existem?"
- **Fala do Paco:** "Comece pela etapa com regra: o último algarismo."
- **Conta de conferência:** final 2 ou 4 (2 opções) · primeiro (3 restantes) = 6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | **sim** | "Isso. O final tem 2 opções e o começo, as 3 que sobram: 6." |
| `a8` | 8 | não | "8 deixa repetir o algarismo, como 22. Distintos: 2 finais · 3 começos = 6." |
| `a12` | 12 | não | "12 conta todos os números distintos, pares ou não. Pares: 2 · 3 = 6." |
| `a16` | 16 | não | "16 é 4 · 4. Com final par e sem repetir: 2 · 3 = 6." |

#### D3 — `ida-e-volta`
- **Enunciado:** "De A a B há 3 estradas e de B a C há 2. Ida A → C e volta C → A sem repetir nenhuma estrada: quantos roteiros?"
- **Conta de conferência:** ida 3 · 2 = 6; volta 1 · 2 = 2; total 12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a36` | 36 | não | "36 deixa repetir estradas na volta. Sem repetir, a volta tem 1 · 2 = 2 opções: 6 · 2 = 12." |
| `a12` | 12 | **sim** | "Certo. Ida 3 · 2 = 6, volta 1 · 2 = 2, total 12." |
| `a6` | 6 | não | "6 é só a ida. A volta tem 1 · 2 = 2 opções: 6 · 2 = 12." |
| `a24` | 24 | não | "Na volta de C a B sobra 1 estrada, não 2. Fica 6 · 1 · 2 = 12." |

#### D4 — `placa-2-letras-1-digito`
- **Enunciado:** "Um código tem 2 letras (26 cada, pode repetir) seguidas de 1 dígito. Quantos códigos existem?"
- **Conta de conferência:** 26 · 26 · 10 = 6760

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6760` | 6760 | **sim** | "Isso. 26 · 26 · 10 = 6760." |
| `a520` | 520 | não | "520 é 26 · 2 · 10: você contou só uma letra. São 26 · 26 · 10 = 6760." |
| `a676` | 676 | não | "676 conta só as letras. Falta o dígito: 676 · 10 = 6760." |
| `a62` | 62 | não | "62 é a soma 26 + 26 + 10. Etapas multiplicam: 6760." |

#### D5 — `impossivel`
- **Enunciado:** "Quantos números de 4 algarismos distintos dá para formar usando só 1, 2 e 3?"
- **Fala do Paco:** "Última. Olhe a quarta casa antes de multiplicar."
- **Conta de conferência:** 3 · 2 · 1 · 0 = 0

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0` | 0 | **sim** | "Exato. Na quarta casa não sobra algarismo: 3 · 2 · 1 · 0 = 0." |
| `a6` | 6 | não | "6 conta só três casas. A quarta não tem opção, então o total é 0." |
| `a24` | 24 | não | "24 precisaria de 4 algarismos. Com 3, a quarta casa tem 0 opções: total 0." |
| `a81` | 81 | não | "81 deixa repetir. Distintos, a quarta casa fica sem opção: total 0." |

### Vestibular

#### V1 — `enem-2019-ppl-chaves`
- **Enunciado (resumido):** "Um aparelho de som sem fio tem 4 chaves, cada uma na posição 0 ou 1. Quantas frequências diferentes ele pode transmitir?"
- **Fala do Paco:** "Cada chave é uma etapa com 2 opções."
- **Fonte:** ENEM 2019 PPL (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (16) mantidos — **URL:** https://www.projetoagathaedu.com.br/questoes-enem/matematica-3/analise-combinatoria/pfc.php
- **Conta de conferência:** 2⁴ = 16

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a6` | 6 | não | "6 lembra contar pares de chaves. Cada chave dobra as opções: 2⁴ = 16." |
| `a8` | 8 | não | "8 conta só três chaves. Com quatro: 2 · 2 · 2 · 2 = 16." |
| `a12` | 12 | não | "Cada chave multiplica por 2, não soma. 2 · 2 · 2 · 2 = 16." |
| `a16` | 16 | **sim** | "Isso. Quatro etapas de 2 opções: 2⁴ = 16." |
| `a24` | 24 | não | "24 é 4!, que ordenaria as chaves. Aqui cada uma só escolhe 0 ou 1: 16." |

#### V2 — `enem-2025-respostas`
- **Enunciado (resumido):** "Respostas: 1 de 5 objetos, 1 de 6 personagens e 1 de 9 cômodos. Quantos alunos a mais que respostas possíveis há numa turma de 280?"
- **Fala do Paco:** "Primeiro conte as respostas diferentes que existem."
- **Fonte:** ENEM 2025 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (10) mantidos — **URL:** https://www.projetoagathaedu.com.br/questoes-enem/matematica-3/analise-combinatoria/pfc.php
- **Conta de conferência:** 5 · 6 · 9 = 270; 280 − 270 = 10

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a10` | 10 | **sim** | "Certo. 5 · 6 · 9 = 270 respostas, e 280 − 270 = 10." |
| `a20` | 20 | não | "As respostas são 5 · 6 · 9 = 270. Sobram 280 − 270 = 10 alunos." |
| `a119` | 119 | não | "Parece vir de somas parciais. Multiplique: 270 respostas, 10 alunos a mais." |
| `a260` | 260 | não | "260 é 280 − 20, que soma as opções. Multiplicando dá 270, e sobram 10." |
| `a270` | 270 | não | "270 é o número de respostas. A pergunta é quantos alunos passam disso: 10." |

#### V3 — `enem-2025-montadora`
- **Enunciado (resumido):** "Uma montadora tem 7 modelos, 2 motores e 3 opcionais que podem entrar ou não. Quantas cores, no mínimo, para passar de 1000 configurações?"
- **Fala do Paco:** "Cada opcional é uma etapa de sim ou não."
- **Fonte:** ENEM 2025 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (9) mantidos — **URL:** https://www.projetoagathaedu.com.br/questoes-enem/matematica-3/analise-combinatoria/pfc.php
- **Conta de conferência:** 7 · 2 · 2³ = 112; 112 · 8 = 896 < 1000 < 1008 = 112 · 9

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a8` | 8 | não | "Sem cor há 7 · 2 · 8 = 112 versões. 112 · 8 = 896 não passa de 1000; com 9 cores, 1008." |
| `a9` | 9 | **sim** | "Isso. 112 · 9 = 1008 passa de 1000, e 112 · 8 = 896 não." |
| `a11` | 11 | não | "11 passa de 1000, mas não é o mínimo: 112 · 9 = 1008 já basta." |
| `a18` | 18 | não | "Os opcionais dão 2³ = 8 combinações, não 4. São 112 versões: bastam 9 cores." |
| `a24` | 24 | não | "Talvez tenha contado os opcionais como 3. São 2³ = 8: 112 versões, mínimo de 9 cores." |

#### V4 — `enem-2025-placas-do-2`
- **Enunciado (resumido):** "Um hotel numera os quartos de 100 a 399 com placas de um algarismo cada. Quantas placas com o algarismo 2 são necessárias?"
- **Fala do Paco:** "Última. Conte o 2 em cada casa: centena, dezena e unidade."
- **Fonte:** ENEM 2025 (adaptada) — **Adaptação:** enunciado resumido; alternativas e gabarito (160) mantidos — **URL:** https://www.projetoagathaedu.com.br/questoes-enem/matematica-3/analise-combinatoria/pfc.php
- **Conta de conferência:** centena 100 (200–299) + dezena 3 · 10 + unidade 3 · 10 = 160

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a160` | 160 | **sim** | "Certo. 100 na centena, 30 na dezena e 30 na unidade: 160." |
| `a157` | 157 | não | "Não desconte repetições: 222 usa três placas de 2. Total 100 + 30 + 30 = 160." |
| `a130` | 130 | não | "Faltou uma casa. Centena 100, dezena 30, unidade 30: 160." |
| `a120` | 120 | não | "A centena 2 aparece em 100 quartos, de 200 a 299. Com dezena e unidade: 160." |
| `a60` | 60 | não | "60 conta só dezena e unidade. A centena 2 soma mais 100: 160." |
