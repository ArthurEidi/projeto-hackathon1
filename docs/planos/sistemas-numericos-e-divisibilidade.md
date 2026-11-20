# Plano — Conjuntos numéricos, divisibilidade e fatoração prima

**Aula:** 1 — Conjuntos numéricos, divisibilidade e fatoração prima · Números que cabem em grupos
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / sistemas-numericos-e-divisibilidade
**Pré-requisitos que o aluno já domina:** contagem, adição e subtração com números pequenos.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe um número e o tamanho dos grupos. A posição na reta e o resto da divisão mostram a família numérica e a divisibilidade.

## b) Visual de partida

reta_numerica — intervalo −3..4, ponto x=0 em c1, passo 0,5; origem em muted; marcas inteiras e meio.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Somar zero mantém a posição; dividir por 1 organiza as unidades sem sobras. A posição inicial fica em muted.

## d) Panorama e recorte

Naturais, inteiros, racionais e irracionais ampliam a reta; aqui também agrupamos inteiros e encontramos fatores primos.

## e) Progressão por contraste

1. Referência visual: Move do zero até a metade da unidade, distinguindo posição racional não inteira.
2. Em contraste com a referência: Reorganiza seis unidades em dois grupos completos.
3. Depois, teste de fronteira: Testa 4, 8 e 12; só em 12 os dois restos zeram.
4. Depois, teste de fronteira: Forma dois grupos de cinco e vê duas unidades restantes.

## f) Dedução causal da forma

Adotamos N={0,1,2,…}; Z acrescenta opostos, Q inclui razões de inteiros com denominador não nulo, e R inclui irracionais. Grupos completos dão n=dq+r, 0≤r<d; d divide n quando r=0. Repetir divisões por primos decompõe n>1. O MDC reúne fatores primos comuns com menores expoentes; o MMC reúne todos com maiores expoentes.

Fórmula deduzida: n=dq+r, 0≤r<d; d∣n ⇔ r=0.

## g) Simulação espacial e fronteiras

Divisor zero é proibido; 1 não é primo, e 2 é o único primo par. Zero é múltiplo de todo inteiro não nulo. √2 é real e irracional.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Número n | Inteiro a organizar ou localizar na reta. |
| c2 | Divisor d | Tamanho positivo de cada grupo. |
| c3 | Quociente q | Quantidade de grupos completos. |
| c4 | Resto r | Unidades que não completaram outro grupo. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −3..4, ponto x=0 em c1, passo 0,5; origem em muted; marcas inteiras e meio.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro, somar zero mantém a posição; ao ir até 0,5, você ainda está num inteiro?"
- **Interação do aluno:** Move do zero até a metade da unidade, distinguindo posição racional não inteira.
- **Conclusão:** `ponto_x ≥ 0,5`
- **Paco (conclusão):** "Não; 0,5=1/2 é racional, mas fica entre os inteiros 0 e 1."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Naturais, inteiros, racionais e irracionais ampliam a reta; aqui também agrupamos inteiros e encontramos fatores primos."

### Passo 2 — `agrupar-unidades`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: grupos-inteiros — 6 fichas em linhas de d unidades; n c1,d c2,q c3,r c4; referência d=1 muted; emite d e resto.
- **Sliders:** d · Tamanho do grupo · 1..4 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Se cada grupo tiver 3 unidades, as 6 fichas deixam sobra? Leve d a 3."
- **Interação do aluno:** Reorganiza seis unidades em dois grupos completos.
- **Conclusão:** `d ≥ 3`
- **Paco (conclusão):** "Não; 6=3·2+0, por isso 3 divide 6."

### Passo 3 — `divisores-e-multiplos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: grupos-inteiros — duas trilhas de m fichas agrupadas de 4 e de 6; restos c4; fatorações 4=2² e 6=2·3; emite m.
- **Sliders:** m · Total comum · 4..12 · passo 4 · inicial 4 · c1
- **Paco (abertura):** "Qual primeiro total cabe em grupos de 4 e de 6 sem sobras? Leve m de 4 até 12."
- **Interação do aluno:** Testa 4, 8 e 12; só em 12 os dois restos zeram.
- **Conclusão:** `m ≥ 12`
- **Paco (conclusão):** "É 12=2²·3; o MMC usa fatores suficientes para ambos, enquanto o MDC de 4 e 6 é 2."

### Passo 4 — `fatorar-e-testar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** WIDGET NOVO: grupos-inteiros — 12 fichas; grupos de d, árvore fixa 12=2·2·3 ao lado; emite d e resto; referência grupos de 3 muted.
- **Sliders:** d · Tamanho do grupo · 3..5 · passo 1 · inicial 3 · c2
- **Paco (abertura):** "12 tem fatores 2·2·3; se o grupo tiver 5, ainda há divisão exata? Arraste até 5."
- **Interação do aluno:** Forma dois grupos de cinco e vê duas unidades restantes.
- **Conclusão:** `d ≥ 5`
- **Paco (conclusão):** "Não; 12=5·2+2, por isso 5 não divide 12."
- **Tati (dúvida):** `fim` — P: "1 é primo por dividir todos os inteiros?" / R: "Não; primo tem exatamente dois divisores positivos distintos, e 1 tem só um."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: grupos-inteiros-figura — seis fichas em dois grupos de três; n=6,d=3,q=2,r=0, com as quatro marcas.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Ao dividir 6 fichas em grupos de 3, qual é o resto?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 2 | não | "Você confundiu quociente com resto; 6=3·2+0." | Destaca os dois grupos em c3, sem fichas sobrando. |
| `micro-acerto` | 0 | **sim** | "Certo: 0; 6=3·2+0." | Destaca r=0 em c4. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: grupos-inteiros-figura — seis fichas em dois grupos de três; n=6,d=3,q=2,r=0, com as quatro marcas.
- **Fórmula:** `n`→c1 · `=d`→c2 · `q`→c3 · `+r`→c4 · `; 0≤r<d; d∣n ⇔ r=0`
- **Definições:**
  - "Número n: Inteiro a organizar ou localizar na reta."
  - "Quociente q: Quantidade de grupos completos."
  - "Resto r: Unidades que não completaram outro grupo."
- **Paco (abertura):** "Grupos completos não deixam resto; por isso d divide n exatamente quando r=0."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Na convenção da aula, 0 pertence a N?"
- **Figura:** nenhuma
- **Conta de conferência:** N={0,1,2,…}.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-sistemas-numericos-e-divisibilidade-erro` | Não | não | "Você usou outra convenção. O certo é Sim; N={0,1,2,…}." |
| `f1-sistemas-numericos-e-divisibilidade-certa` | Sim | **sim** | "Certo: Sim; N={0,1,2,…}." |

#### F2 — `f2-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Qual conjunto contém −2, mas não contém 0,5?"
- **Figura:** nenhuma
- **Conta de conferência:** −2 é inteiro; 0,5 não é inteiro.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-sistemas-numericos-e-divisibilidade-certa` | Z | **sim** | "Certo: Z; −2 é inteiro; 0,5 não é inteiro." |
| `f2-sistemas-numericos-e-divisibilidade-erro` | N | não | "Naturais não incluem negativos. O certo é Z; −2 é inteiro; 0,5 não é inteiro." |

#### F3 — `f3-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "0,5 é racional?"
- **Figura:** nenhuma
- **Conta de conferência:** 0,5=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-sistemas-numericos-e-divisibilidade-erro` | Não | não | "Você confundiu não inteiro com irracional. O certo é Sim; 0,5=1/2." |
| `f3-sistemas-numericos-e-divisibilidade-certa` | Sim | **sim** | "Certo: Sim; 0,5=1/2." |

#### F4 — `f4-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "1 é primo?"
- **Figura:** nenhuma
- **Conta de conferência:** 1 tem só o divisor positivo 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-sistemas-numericos-e-divisibilidade-certa` | Não | **sim** | "Certo: Não; 1 tem só o divisor positivo 1." |
| `f4-sistemas-numericos-e-divisibilidade-erro` | Sim | não | "Primo exige dois divisores positivos distintos. O certo é Não; 1 tem só o divisor positivo 1." |

### Médias

#### M1 — `m1-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Qual resto deixa 7 dividido por 3?"
- **Figura:** nenhuma
- **Conta de conferência:** 7=3·2+1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-sistemas-numericos-e-divisibilidade-erro` | 2 | não | "Você respondeu o quociente. O certo é 1; 7=3·2+1." |
| `m1-sistemas-numericos-e-divisibilidade-certa` | 1 | **sim** | "Certo: 1; 7=3·2+1." |

#### M2 — `m2-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Qual é a fatoração prima de 12?"
- **Figura:** nenhuma
- **Conta de conferência:** 12=2·2·3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-sistemas-numericos-e-divisibilidade-certa` | 2²·3 | **sim** | "Certo: 2²·3; 12=2·2·3." |
| `m2-sistemas-numericos-e-divisibilidade-erro` | 2·6 | não | "Você deixou um fator composto. O certo é 2²·3; 12=2·2·3." |

#### M3 — `m3-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Qual é o maior divisor comum de 6 e 8?"
- **Figura:** nenhuma
- **Conta de conferência:** Divisores comuns: 1 e 2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-sistemas-numericos-e-divisibilidade-erro` | 24 | não | "Você confundiu divisor comum com múltiplo comum. O certo é 2; Divisores comuns: 1 e 2." |
| `m3-sistemas-numericos-e-divisibilidade-certa` | 2 | **sim** | "Certo: 2; Divisores comuns: 1 e 2." |

### Desafios

#### D1 — `d1-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Qual é o menor múltiplo comum positivo de 4 e 6?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 12=4·3=6·2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-sistemas-numericos-e-divisibilidade-certa` | 12 | **sim** | "Certo: 12; 12=4·3=6·2." |
| `d1-sistemas-numericos-e-divisibilidade-erro` | 2 | não | "Você calculou o máximo divisor comum. O certo é 12; 12=4·3=6·2." |

#### D2 — `d2-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Zero é múltiplo de 3?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0=3·0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-sistemas-numericos-e-divisibilidade-erro` | Não | não | "O multiplicador pode ser zero. O certo é Sim; 0=3·0." |
| `d2-sistemas-numericos-e-divisibilidade-certa` | Sim | **sim** | "Certo: Sim; 0=3·0." |

#### D3 — `d3-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "√2 pertence a Q?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** √2 é irracional.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-sistemas-numericos-e-divisibilidade-certa` | Não | **sim** | "Certo: Não; √2 é irracional." |
| `d3-sistemas-numericos-e-divisibilidade-erro` | Sim | não | "Nem todo real é uma razão de inteiros. O certo é Não; √2 é irracional." |

#### D4 — `d4-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Qual inteiro n deixa quociente 2 e resto 1 na divisão por 3?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** n=3·2+1=7.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-sistemas-numericos-e-divisibilidade-erro` | 6 | não | "Você esqueceu o resto. O certo é 7; n=3·2+1=7." |
| `d4-sistemas-numericos-e-divisibilidade-certa` | 7 | **sim** | "Certo: 7; n=3·2+1=7." |

#### D5 — `d5-sistemas-numericos-e-divisibilidade`
- **Enunciado:** "Sinais piscam a cada 4 e 6 segundos, juntos no início; em quantos segundos coincidem de novo?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** mmc(4;6)=12.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-sistemas-numericos-e-divisibilidade-certa` | 12 | **sim** | "Certo: 12; mmc(4;6)=12." |
| `d5-sistemas-numericos-e-divisibilidade-erro` | 24 | não | "Você multiplicou sem procurar o primeiro múltiplo comum. O certo é 12; mmc(4;6)=12." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2021-romano`
- **Enunciado (resumido):** "Um monumento traz a inscrição MCDLXIX (ano de inauguração). Quantos anos ele completará em 2050?"
- **Fala do Paco:** "Leia o número em blocos: letra menor antes de uma maior subtrai, como em IV. Depois faça 2050 menos o ano."
- **Fonte:** ENEM 2021 (adaptada) — **Adaptação:** Questão 176: enunciado resumido; alternativas e gabarito (581) mantidos. — **URL:** https://api.enem.dev/v1/exams/2021/questions/176
- **Conta de conferência:** 1 000 + 400 + 60 + 9 = 1 469; 2 050 − 1 469 = 581.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a379` | 379 | não | "379 = 2050 − 1 671 lê CD como 600 e IX como 11. Como CD = 400 e IX = 9, o ano é 1 469 e 2050 − 1 469 = 581." |
| `a381` | 381 | não | "381 lê CD como DC (600), achando 1 669: 2050 − 1 669 = 381. Como CD = 400, 2050 − 1 469 = 581." |
| `a579` | 579 | não | "579 lê IX como XI (11), achando 1 471: 2050 − 1 471 = 579. Como IX = 9, 2050 − 1 469 = 581." |
| `a581` | 581 | **sim** | "Exato. MCDLXIX = 1 000 + 400 + 60 + 9 = 1 469; em 2050: 2 050 − 1 469 = 581 anos." |
| `a601` | 601 | não | "601 lê LX como XL (40), achando 1 449: 2050 − 1 449 = 601. Como LX = 60, 2050 − 1 469 = 581." |

#### V2 — `enem-2012-ordens`
- **Enunciado (resumido):** "Um registro tem 8 algarismos: 1 3 _ 9 8 2 0 7, com o terceiro algarismo apagado. Qual ordem esse algarismo ocupa?"
- **Fala do Paco:** "Conte as ordens da direita para a esquerda, em grupos de três: unidades, milhares, milhões."
- **Fonte:** ENEM 2012 (adaptada) — **Adaptação:** Questão 161: enunciado resumido; alternativas e gabarito (Centena de milhar) mantidos. — **URL:** https://api.enem.dev/v1/exams/2012/questions/161
- **Conta de conferência:** 6ª ordem da direita para a esquerda em número de 8 algarismos = centena de milhar.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `centena` | Centena | não | "Centena é o 3º da direita (o dígito 2). Da direita, o 6º lugar é a centena de milhar." |
| `dez-milhar` | Dezena de milhar | não | "Dezena de milhar é o 5º da direita (o dígito 9). O dígito apagado é o 6º: centena de milhar." |
| `cen-milhar` | Centena de milhar | **sim** | "Exato. Na 6ª ordem da direita para a esquerda (3ª da classe dos milhares) fica a centena de milhar." |
| `milhao` | Milhão | não | "Unidade de milhão é o 7º da direita (o dígito 3). O apagado é o 6º: centena de milhar." |
| `cen-milhao` | Centena de milhão | não | "Centena de milhão seria o 9º da direita, mas o número tem 8 algarismos. O 6º é centena de milhar." |

#### V3 — `enem-2009-cpf`
- **Enunciado (resumido):** "CPF: multiplique 123.456.789 por 10..2 e ache o resto r por 11 (r<2 ⇒ 0, senão 11−r) para d₁; repita em 23456789d₁ para d₂."
- **Fala do Paco:** "Some cada algarismo vezes o seu peso, ache o resto por 11 e aplique a regra; repita para d₂ com d₁ já no fim."
- **Fonte:** ENEM 2009 (adaptada) — **Adaptação:** Questão 156: enunciado resumido; alternativas e gabarito (0 e 9) mantidos. — **URL:** https://api.enem.dev/v1/exams/2009/questions/156
- **Conta de conferência:** S₁ = 210 => 210 mod 11 = 1 => d₁ = 0; S₂ = 244 => 244 mod 11 = 2 => d₂ = 11 − 2 = 9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a0-9` | 0 e 9 | **sim** | "Exato. S₁ = 210 = 19·11 + 1 ⇒ r = 1 ⇒ d₁ = 0; S₂ = 244 = 22·11 + 2 ⇒ d₂ = 11 − 2 = 9." |
| `a1-4` | 1 e 4 | não | "Usou o resto como dígito: d₁ = 1 e, com ele, S₂ = 246, resto 4. Pela regra, r = 1 < 2 dá d₁ = 0, e d₂ = 11 − 2 = 9." |
| `a1-7` | 1 e 7 | não | "Tomou d₁ = r = 1; com ele, S₂ = 246, resto 4, e d₂ = 11 − 4 = 7. Como r = 1 < 2, d₁ = 0, e S₂ = 244 dá d₂ = 9." |
| `a9-1` | 9 e 1 | não | "9 e 1 põe d₂ = 9 na frente e, no lugar de d₁ = 0, escreve o resto r = 1. Na ordem certa: d₁ = 0 e d₂ = 9." |
| `a0-1` | 0 e 1 | não | "d₁ = 0 está certo, mas d₂ = 1 não sai da regra: S₂ = 244 deixa resto 2, e 11 − 2 = 9." |

#### V4 — PENDENTE-FONTE
- **Estado:** vaga aberta; nenhuma questão real conferida ainda.

---

# Checklist de qualidade (marque tudo antes de entregar o plano)

**Método (METODO.md)**
- [x] Os 7 pilares a)–g) estão escritos **e** cada um aparece em pelo menos um passo (linha "Pilares").
- [x] A aula abre com a figura viva (passo `interactive_canvas`), não com fórmula nem definição.
- [x] O caso neutro aparece na tela e é **nomeado numa fala**.
- [x] O panorama ocupa uma única fala (em geral a dúvida da Tati) e o recorte fica claro.
- [x] O contraste mostra o "antes" na tela (curva fantasma ou valor de referência).
- [x] A fórmula do fechamento foi **deduzida** antes (há uma fala com "por isso" ou "como … então").
- [x] Há teste de fronteira: quadrantes, 0/1/infinitas soluções, domínio ou restrição real.

**Roteiro**
- [x] De 4 a 8 passos; 1º é `interactive_canvas`, último é `concept_lock`, há pelo menos um `micro_challenge`.
- [x] Toda abertura pergunta ou pede previsão; toda conclusão responde com o porquê.
- [x] Cada passo interativo tem conclusão com métrica existente e alcançável (valor inicial não cumpre; arraste com passo que acerta o valor exato).
- [x] No desafio, cada opção errada tem feedback que diagnostica o erro e uma mudança de figura que mostra o erro.
- [x] Toda marca c1..c4 usada tem linha no glossário; o que não tem significado é `ink`/`muted`.
- [x] Widget inexistente está marcado como **WIDGET NOVO** com o que desenha, o que o aluno manipula e a métrica.

**Treino**
- [x] Exatamente 4 fáceis, 3 médias, 5 desafios, 4 vestibular; ids únicos, minúsculos, com hífen.
- [ ] Cada questão tem exatamente 1 opção certa e 2 a 4 opções (vestibular 2 a 5).
- [ ] Todo feedback de opção errada **contém a resposta certa**.
- [ ] Cada distrator corresponde a um erro típico nomeado no feedback.
- [ ] Toda questão tem conta de conferência, e a conta bate com o gabarito.
- [ ] Vestibular: questões reais, conferidas na URL, fonte "Banca Ano (adaptada)", adaptação descrita, fala do Paco presente.

**Texto**
- [x] Toda fala, enunciado e feedback com ≤ 140 caracteres e ≤ 2 frases; sem emoji; sem termos proibidos.
- [x] Números pequenos, de cabeça; notação do app (−, vírgula decimal, ·, ², (x; y)).


**Ressalva do checklist:** os cinco itens em aberto dependem somente das quatro fontes de vestibular; nas 12 autorais, alternativas, diagnósticos e contas estão preenchidos.
