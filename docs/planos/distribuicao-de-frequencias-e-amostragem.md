# Plano — Frequências, população, amostra e amostragem

**Aula:** 1 — Cada Resposta Ajeita as Barras · Frequência absoluta, relativa e amostras
**Caminho:** aritmetica / estatistica / distribuicao-de-frequencias-e-amostragem
**Pré-requisitos que o aluno já domina:** leitura de gráficos de barras, porcentagem.

## a) Ancoragem mecânica
A máquina recebe respostas uma a uma e devolve, para cada categoria, quantas vezes ela apareceu (frequência absoluta) e que fração do total ela é (frequência relativa). Cada resposta nova é a entrada que age; as barras e as porcentagens são a saída. Uma segunda máquina escolhe quem responde: a amostra.

## b) Visual de partida
WIDGET NOVO `barras` em modo coleta: botões para adicionar respostas (frutas), barras que crescem a cada resposta e uma chave entre régua absoluta (contagem) e relativa (%). Um modo amostragem sorteia n pessoas de uma população de 1000 e mostra a % medida contra a % real.

## c) Caso neutro
Com uma resposta só, a única categoria marcada tem 100%. A frequência relativa ainda não compara nada. Cada resposta nova redistribui as porcentagens.

## d) Panorama e recorte
Há histogramas de classes, frequência acumulada, técnicas de amostragem estratificada e margem de erro. Aqui: frequências absolutas e relativas, classes simples e por que amostras grandes e sem vício representam melhor a população.

## e) Progressão por contraste
1. Uma resposta: 100% numa categoria (referência).
2. Vinte respostas: régua absoluta contra relativa; a ordem das barras não muda.
3. Amostra pequena contra grande: a % medida balança muito e depois se estabiliza perto da real.
4. Amostra grande mas viciada: continua errando.

## f) Dedução causal da forma
A frequência relativa é a contagem dividida pelo total, fr = f / n. Como todas as contagens somam n, as frações somam 1, ou 100%. Mudar de régua divide todas as barras pelo mesmo n, por isso o formato do gráfico não muda.

## g) Simulação espacial e fronteiras
Amostra viciada (pesquisa de esporte na porta do estádio) erra mesmo com n grande. Amostras muito pequenas podem dar 0% ou 100% por acaso. Comparar turmas de tamanhos diferentes exige frequência relativa, não absoluta.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Frequência absoluta | Quantas vezes uma categoria apareceu (f). |
| c2 | Total | Quantas respostas existem na tabela (n). |
| c3 | Frequência relativa | Fração do total: f dividido por n. |
| c4 | Amostra | Parte da população que efetivamente respondeu. |

### Passo 1 — `uma-resposta`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `barras` (modo coleta) — categorias maçã, banana, uva, pera; botões adicionam respostas; a régua mostra %. Emite `respostas`.
- **Sliders:** nenhum
- **Paco (abertura):** "Com uma resposta só, que porcentagem a fruta escolhida tem? Adicione mais respostas e veja as barras se ajeitarem."
- **Interação do aluno:** toca os botões de fruta; a primeira barra começa em 100% e as outras crescem.
- **Conclusão:** `respostas ≥ 5`
- **Paco (conclusão):** "Com uma resposta, uma fruta tinha 100%. Com mais, cada barra mostra a fração do total: a frequência relativa."
- **Tati (dúvida):** `fim` — P: "E quando os dados são números, como altura?" / R: "Aí agrupamos em classes e fazemos histogramas. Hoje ficamos em categorias e amostras."

### Passo 2 — `absoluta-relativa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6
- **Widget:** `barras` — 20 respostas: maçã 8, banana 6, uva 4, pera 2; chave "contagem / %". Emite `regua_relativa`.
- **Sliders:** nenhum
- **Paco (abertura):** "A absoluta conta quantos; a relativa divide pelo total. Troque a régua: a ordem das barras muda?"
- **Interação do aluno:** alterna a chave e vê os rótulos mudarem de 8, 6, 4, 2 para 40%, 30%, 20%, 10%.
- **Conclusão:** `regua_relativa ≥ 1`
- **Paco (conclusão):** "Não muda: só a régua. 8 de 20 vira 40%, e todas juntas somam 100%."

### Passo 3 — `amostra-cresce`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7, 5
- **Widget:** `barras` (modo amostragem) — população de 1000 com 30% "azul"; cada valor de n sorteia uma amostra nova e marca a % medida (c3) contra a linha dos 30% reais; pontos anteriores ficam como rastro.
- **Sliders:** `n` · "Tamanho da amostra" · 10..200 · passo 10 · inicial 10 · c4
- **Paco (abertura):** "Na cidade, 30% preferem azul, mas só perguntamos a alguns. Aumente a amostra: a porcentagem medida chega perto de 30%?"
- **Interação do aluno:** move n e vê o rastro de pontos se apertar em volta da linha.
- **Conclusão:** `n ≥ 150`
- **Paco (conclusão):** "Amostras pequenas balançam muito; as grandes ficam perto de 30%. Por isso pesquisas sérias usam amostras grandes."

### Passo 4 — `amostra-viciada`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (fronteira)
- **Widget:** `barras` (modo amostragem) — esporte favorito; chave "perguntar só na porta do estádio". Ligada, futebol dispara mesmo com n = 200. Emite `vicio_ligado`.
- **Sliders:** nenhum
- **Paco (abertura):** "E se a pesquisa sobre esporte favorito for feita só na porta de um estádio de futebol? Ligue e compare."
- **Interação do aluno:** liga a chave e vê a barra do futebol subir muito acima da real.
- **Conclusão:** `vicio_ligado ≥ 1`
- **Paco (conclusão):** "O futebol dispara mesmo com amostra grande. Amostra viciada erra no método, e tamanho não conserta isso."
- **Tati (dúvida):** `fim` — P: "Então como escolher uma boa amostra?" / R: "Sorteando gente de toda a população, para cada grupo ter a sua chance de entrar."

### Passo 5 — `desafio-relativa`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `barras_figura` — notas de uma turma: A 10, B 8, C 7 (régua absoluta).
- **Paco (abertura):** "Primeiro descubra o total da turma."
- **Enunciado:** "Numa turma de 25 alunos, 10 tiraram nota A. Qual a frequência relativa da nota A?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `a40` | 40% | **sim** | "Isso. 10 de 25 = 0,4 = 40%." | régua relativa, barra A em 40% |
| `a10` | 10% | não | "10 é a frequência absoluta. Dividindo por 25: 40%." | barra A com rótulo 10 piscando |
| `a25` | 25% | não | "25 é o total. A relativa é 10 / 25 = 40%." | total 25 destacado em c2 |
| `a25d` | 2,5% | não | "Você dividiu 25 por 10. É 10 / 25 = 40%." | fração 10/25 aparecendo sobre a barra |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `barras_figura` — maçã 8, banana 6, uva 4, pera 2 em régua relativa.
- **Fórmula:** `fr`→c3 · `=` · `f`→c1 · `/` · `n`→c2
- **Definições:** "População: todos sobre quem queremos saber algo." · "Amostra: a parte que foi pesquisada; deve ser grande e sem vício." · "As frequências relativas somam 100%."
- **Paco (abertura):** "Dividir todas as contagens pelo mesmo total muda a régua, não a forma. Por isso a relativa permite comparar grupos de tamanhos diferentes."
- **Dica (hint):** "Toque em uma letra para ver o que ela conta no gráfico."

**Frase de encerramento (outro):** "Você contou respostas, trocou a régua para porcentagens e viu que amostras boas são grandes e sem vício."

## i) Treino pós-aula

### Fáceis

#### F1 — `contar-azul`
- **Enunciado:** "Respostas: azul, verde, azul, azul, vermelho. Qual a frequência absoluta de azul?"
- **Conta de conferência:** 3

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3` | 3 | **sim** | "Isso. Azul aparece 3 vezes." |
| `a5` | 5 | não | "5 é o total de respostas. Azul aparece 3 vezes." |
| `a60` | 60% | não | "60% é a relativa. A absoluta é a contagem: 3." |
| `a1` | 1 | não | "Azul aparece na 1ª, na 3ª e na 4ª resposta: 3 vezes." |

#### F2 — `relativa-3-de-5`
- **Enunciado:** "E qual a frequência relativa de azul?"
- **Conta de conferência:** 3 / 5 = 60%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a60` | 60% | **sim** | "Certo. 3 de 5." |
| `a3` | 3% | não | "3 é a contagem. Dividindo por 5: 60%." |
| `a30` | 30% | não | "3 / 5 = 0,6, ou seja 60%." |
| `a20` | 20% | não | "20% seria 1 de 5. Azul é 3 de 5: 60%." |

#### F3 — `o-que-e-amostra`
- **Enunciado:** "Uma escola tem 5000 alunos e 100 deles responderam a uma pesquisa. Esses 100 são:"
- **Conta de conferência:** parte da população = amostra

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `amostra` | A amostra | **sim** | "Isso. A população são os 5000." |
| `populacao` | A população | não | "A população são os 5000. Os 100 que responderam são a amostra." |
| `frequencia` | A frequência | não | "Frequência é contagem de respostas. Os 100 são a amostra." |
| `total` | O censo | não | "Censo pergunta a todos. Os 100 são uma amostra." |

#### F4 — `soma-relativas`
- **Enunciado:** "Quanto dá a soma de todas as frequências relativas de uma tabela?"
- **Conta de conferência:** Σ f / n = n / n = 100%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a100` | 100% | **sim** | "Certo. Todas as partes formam o total." |
| `n` | O total n | não | "As absolutas somam n. As relativas somam 100%." |
| `depende` | Depende | não | "Sempre dá 100%: as frações dividem o mesmo total." |
| `a50` | 50% | não | "As partes cobrem o total inteiro: 100%." |

### Médias

#### M1 — `cachorro-45`
- **Enunciado:** "De 40 pessoas, 18 preferem cachorro. Qual a frequência relativa?"
- **Conta de conferência:** 18 / 40 = 45%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a45` | 45% | **sim** | "Isso. 18 / 40 = 0,45." |
| `a18` | 18% | não | "18 é a contagem. Sobre 40: 45%." |
| `a22` | 22% | não | "Divida 18 por 40: 0,45 = 45%." |
| `a40` | 40% | não | "40 é o total. 18 / 40 = 45%." |

#### M2 — `quantos-25`
- **Enunciado:** "Numa amostra de 80 pessoas, a frequência relativa de 'sim' foi 25%. Quantas responderam sim?"
- **Conta de conferência:** 0,25 · 80 = 20

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a20` | 20 | **sim** | "Certo. Um quarto de 80." |
| `a25` | 25 | não | "25 é a porcentagem. De 80: 20 pessoas." |
| `a32` | 32 | não | "25% de 80 = 80 / 4 = 20." |
| `a55` | 55 | não | "55 é 80 − 25. A conta é 0,25 · 80 = 20." |

#### M3 — `melhor-amostra`
- **Enunciado:** "Qual amostra representa melhor os alunos de uma escola?"
- **Conta de conferência:** sorteio em toda a população

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sorteados` | 100 sorteados de todas as salas | **sim** | "Isso. Grande e sem vício: todos podem entrar." |
| `uma-sala` | 10 alunos de uma sala | não | "Pequena e de um grupo só. Melhor: 100 sorteados de todas as salas." |
| `time` | 100 jogadores do time | não | "Grande, mas viciada: só atletas. Melhor sortear de todas as salas." |
| `professores` | 5 professores | não | "Nem são alunos. Melhor: 100 sorteados de todas as salas." |

### Desafios

#### D1 — `acumulada`
- **Enunciado:** "Notas de 25 alunos: de 0 a 4, 5 alunos; de 5 a 7, 12; de 8 a 10, 8. Quantos tiraram menos de 8?"
- **Conta de conferência:** 5 + 12 = 17

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a17` | 17 | **sim** | "Certo. As duas primeiras classes: 5 + 12." |
| `a12` | 12 | não | "12 é só a classe de 5 a 7. Somando a de 0 a 4: 17." |
| `a8` | 8 | não | "8 são os que tiraram 8 ou mais. Menos de 8: 17." |
| `a20` | 20 | não | "5 + 12 = 17." |

#### D2 — `ultima-classe`
- **Enunciado:** "Um histograma tem 3 classes com 4, 6 e 10 pessoas. Que porcentagem está na última classe?"
- **Conta de conferência:** 10 / 20 = 50%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | 50% | **sim** | "Isso. 10 de 20." |
| `a10` | 10% | não | "10 é a contagem. O total é 20: 50%." |
| `a33` | 33% | não | "As classes não têm o mesmo tamanho. 10 / 20 = 50%." |
| `a100` | 100% | não | "A última classe é parte do total: 10 de 20, 50%." |

#### D3 — `pesquisa-online`
- **Enunciado:** "Uma pesquisa sobre uso de internet foi feita só por formulário online. O resultado tende a:"
- **Conta de conferência:** quem não usa internet não responde

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `super` | Superestimar o uso | **sim** | "Isso. Quem não usa internet nem vê o formulário." |
| `sub` | Subestimar o uso | não | "Só quem está online responde, então o uso parece maior: superestima." |
| `acertar` | Acertar, se for grande | não | "Tamanho não conserta vício. O uso será superestimado." |
| `nada` | Não ter efeito | não | "O método exclui quem não usa internet: superestima o uso." |

#### D4 — `total-pelo-percentual`
- **Enunciado:** "Numa pesquisa, 12 pessoas responderam 'não', o que corresponde a 30% do total. Quantas pessoas foram ouvidas?"
- **Conta de conferência:** 12 / 0,3 = 40

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a40` | 40 | **sim** | "Certo. Se 12 são 30%, 4 são 10% e o total é 40." |
| `a36` | 36 | não | "36 é 30% de 120. Se 12 é 30%, o total é 12 / 0,3 = 40." |
| `a42` | 42 | não | "12 + 30 = 42 mistura contagem e porcentagem. Total: 40." |
| `a3-6` | 3,6 | não | "3,6 é 30% de 12. O total é 12 / 0,3 = 40." |

#### D5 — `comparar-turmas`
- **Enunciado:** "Na turma A, 6 de 20 tocam instrumento; na B, 9 de 45. Em qual a proporção é maior?"
- **Fala do Paco:** "Última. Turmas de tamanhos diferentes pedem frequência relativa."
- **Conta de conferência:** A: 30%; B: 20%

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | Turma A | **sim** | "Isso. 30% contra 20%." |
| `b` | Turma B | não | "B tem mais músicos, 9, mas é 20% da turma. A tem 30%." |
| `igual` | Iguais | não | "6/20 = 30% e 9/45 = 20%. A é maior." |

### Vestibular

#### V1 — ENEM 2018 — Questão 145 (`enem-2018-media-acidentes`)
- **Habilidade-alvo:** ler uma tabela de frequências e ponderar cada valor pela sua frequência (média de acidentes por trabalhador).
- **Conta:** (0·50 + 1·17 + 2·15 + 3·10 + 4·6 + 5·2)/100 = 111/100 = 1,11 (D). Imagem `/vestibular/enem-2018-145-1.png`.

#### V2 — ENEM 2023 — Questão 140 (`enem-2023-media-mediana-moda`)
- **Habilidade-alvo:** ler um gráfico de frequências e comparar média, mediana e moda. (A habilidade original, amostra representativa ou viciada, ficou sem candidata do ENEM no cache.)
- **Conta:** frequências 10, 10, 55, 25, 0, 50, 10 (total 160); moda 3; 80º e 81º valores = 4; média 665/160 ≈ 4,16; moda < mediana < média (E). Imagem `/vestibular/enem-2023-140-1.png`.

#### V3 — ENEM 2021 — Questão 151 (`enem-2021-histograma-precos`)
- **Habilidade-alvo:** frequência acumulada por classes num histograma.
- **Conta:** acumulado 5, 15, 20, 35, 55 até 400, 500, 600, 700, 800 mil; metade de 105 = 52,5; menor p = 800 mil (C). Imagem `/vestibular/enem-2021-151-1.png`.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** total a partir de uma porcentagem.
- **Onde procurar:** ENEM, Fuvest.

---
**Notas da implementação (JSON):** `barras` modo `categorias` (coleta + chave relativa) e `amostragem` (vício como `vicio.populacao`). Passo 1 começa com as 4 frutas em zero (todo valor vem dos cliques). Vestibular: 3 questões do ENEM com imagem inseridas na B23a (V1, V2, V3); V4 segue PENDENTE-FONTE. Sem correção de gabarito. A conferência visual do widget ainda falta: confirmar que a coleta com total 0 não divide por zero.
