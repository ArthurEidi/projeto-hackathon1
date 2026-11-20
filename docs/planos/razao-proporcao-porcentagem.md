# Plano — Razão, proporção e porcentagem

**Aula:** 1 — Comparar por Divisão · Razão e proporção
**Caminho:** aritmetica / proporcionalidade / razao-proporcao-porcentagem
**Pré-requisitos que o aluno já domina:** `fracoes-e-decimais`; contagem e leitura da reta numérica.

## a) Ancoragem mecânica

O aluno controla uma parte e o todo que a contém. A razão depende dos dois; o percentual reexpressa essa razão por cem.

## b) Visual de partida

WIDGET NOVO: barras-percentuais — todo T=4 c2, parte P c1, razão c4 e percentual c3; barra cheia de referência muted; emite P.
Controles: P · Parte · 0..4 · passo 1 · inicial 4 · c1.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Parte igual ao todo dá razão 1 e 100%; acrescentar 0% mantém a quantidade original.

## d) Panorama e recorte

Razões comparam quantidades, proporções igualam razões e porcentagens usam cem como referência; aqui mantemos o todo explícito.

## e) Progressão por contraste

1. Referência visual: Reduz P até 2; metade da barra fica pintada.
2. Em contraste com a referência: Compara 2/4 com 4/8, ambos metade.
3. Depois, teste de fronteira: Reduz o todo até 2, preenchendo a barra inteira.

## f) Dedução causal da forma

Dividir parte por todo mede que fração foi ocupada. Multiplicar a razão por 100 dá a porcentagem; comparar frações por produtos cruzados exige denominadores não nulos. Aplicar p% de T dá T·p/100.

Fórmula deduzida: p=100·P/T; P=(p/100)·T, T>0.

## g) Simulação espacial e fronteiras

O todo não pode ser zero nesta interpretação; razões podem exceder 1, mas uma parte contida no todo fica entre 0% e 100%. Aumentos e descontos sucessivos usam bases diferentes.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Parte P | Quantidade comparada com o todo. |
| c2 | Todo T | Quantidade usada como base da comparação. |
| c3 | Percentual p | Razão reescrita para cada cem unidades. |
| c4 | Razão P/T | Fração do todo ocupada pela parte. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras-percentuais — todo T=4 c2, parte P c1, razão c4 e percentual c3; barra cheia de referência muted; emite P.
- **Sliders:** P · Parte · 0..4 · passo 1 · inicial 4 · c1
- **Paco (abertura):** "No caso neutro, o todo vale 100%; ao pintar só 2 das 4 partes, qual fração permanece?"
- **Interação do aluno:** Reduz P até 2; metade da barra fica pintada.
- **Conclusão:** `P ≤ 2`
- **Paco (conclusão):** "Permanece 1/2=50%, pois 2/4=0,5 e 0,5·100=50."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Razões comparam quantidades, proporções igualam razões e porcentagens usam cem como referência; aqui mantemos o todo explícito."

### Passo 2 — `escalar-os-dois`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras-percentuais — P=2k c1,T=4k c2, referência 2/4 muted, percentual c3; emite k.
- **Sliders:** k · Escala comum · 1..3 · passo 1 · inicial 1 · ink
- **Paco (abertura):** "Se parte e todo dobrarem juntos, o percentual dobra? Leve k a 2."
- **Interação do aluno:** Compara 2/4 com 4/8, ambos metade.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Não; 4/8=2/4, por isso multiplicar os dois termos pelo mesmo fator preserva a proporção."

### Passo 3 — `mudar-a-base`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras-percentuais — P=2 fixo c1, todo T variável c2; barra anterior T=4 muted, razão c4 e percentual c3; emite T.
- **Sliders:** T · Todo · 2..4 · passo 1 · inicial 4 · c2
- **Paco (abertura):** "Se a parte continuar 2 mas o todo cair para 2, o percentual continua 50%?"
- **Interação do aluno:** Reduz o todo até 2, preenchendo a barra inteira.
- **Conclusão:** `T ≤ 2`
- **Paco (conclusão):** "Não; agora 2/2=1, por isso a mesma parte passa a representar 100%."
- **Tati (dúvida):** `fim` — P: "Aumentar 10% e depois reduzir 10% desfaz tudo?" / R: "Não; 100 vira 110 e depois 99, pois o desconto usa o novo todo."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: barras-percentuais-figura — todo 8 dividido em quatro partes iguais, uma parte 2 destacada; p=25%, razão 1/4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Quanto é 25% de 8?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 4 | não | "Você calculou metade; 25%=1/4, então 8/4=2." | Destaca duas de quatro partes como 50%, não 25%. |
| `micro-acerto` | 2 | **sim** | "Certo: 2; 25/100·8=2." | Destaca uma de quatro partes, com valor 2. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: barras-percentuais-figura — todo 8 dividido em quatro partes iguais, uma parte 2 destacada; p=25%, razão 1/4.
- **Fórmula:** `p`→c3 · `=100·P`→c1 · `/T`→c2 · `; P/T`→c4 · `=p/100`
- **Definições:**
  - "Parte P: Quantidade comparada com o todo."
  - "Percentual p: Razão reescrita para cada cem unidades."
  - "Razão P/T: Fração do todo ocupada pela parte."
- **Paco (abertura):** "A parte é comparada ao todo; por isso o percentual é 100 vezes a razão P/T."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-razao-proporcao-porcentagem`
- **Enunciado:** "Se parte e todo são iguais, qual é o percentual?"
- **Figura:** nenhuma
- **Conta de conferência:** 1·100=100%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-razao-proporcao-porcentagem-erro` | 1% | não | "Você confundiu razão 1 com percentual 1. O certo é 100%; 1·100=100%." |
| `f1-razao-proporcao-porcentagem-certa` | 100% | **sim** | "Certo: 100%; 1·100=100%." |

#### F2 — `f2-razao-proporcao-porcentagem`
- **Enunciado:** "Que fração representa 50%?"
- **Figura:** nenhuma
- **Conta de conferência:** 50/100=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-razao-proporcao-porcentagem-certa` | 1/2 | **sim** | "Certo: 1/2; 50/100=1/2." |
| `f2-razao-proporcao-porcentagem-erro` | 1/50 | não | "Por cento significa dividir por 100. O certo é 1/2; 50/100=1/2." |

#### F3 — `f3-razao-proporcao-porcentagem`
- **Enunciado:** "Se parte e todo dobram juntos, a razão muda?"
- **Figura:** nenhuma
- **Conta de conferência:** 2P/(2T)=P/T.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-razao-proporcao-porcentagem-erro` | Sim | não | "Você dobrou só um termo na comparação. O certo é Não; 2P/(2T)=P/T." |
| `f3-razao-proporcao-porcentagem-certa` | Não | **sim** | "Certo: Não; 2P/(2T)=P/T." |

#### F4 — `f4-razao-proporcao-porcentagem`
- **Enunciado:** "O todo pode ser zero ao calcular P/T?"
- **Figura:** nenhuma
- **Conta de conferência:** T≠0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-razao-proporcao-porcentagem-certa` | Não | **sim** | "Certo: Não; T≠0." |
| `f4-razao-proporcao-porcentagem-erro` | Sim | não | "A razão exigiria divisão por zero. O certo é Não; T≠0." |

### Médias

#### M1 — `m1-razao-proporcao-porcentagem`
- **Enunciado:** "Quanto é 25% de 8?"
- **Figura:** nenhuma
- **Conta de conferência:** 8·25/100=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-razao-proporcao-porcentagem-erro` | 4 | não | "Você calculou 50%. O certo é 2; 8·25/100=2." |
| `m1-razao-proporcao-porcentagem-certa` | 2 | **sim** | "Certo: 2; 8·25/100=2." |

#### M2 — `m2-razao-proporcao-porcentagem`
- **Enunciado:** "2 é quantos por cento de 8?"
- **Figura:** nenhuma
- **Conta de conferência:** 100·2/8=25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-razao-proporcao-porcentagem-certa` | 25% | **sim** | "Certo: 25%; 100·2/8=25." |
| `m2-razao-proporcao-porcentagem-erro` | 400% | não | "Você inverteu parte e todo. O certo é 25%; 100·2/8=25." |

#### M3 — `m3-razao-proporcao-porcentagem`
- **Enunciado:** "Se x/6=1/2, quanto vale x?"
- **Figura:** nenhuma
- **Conta de conferência:** x=6/2=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-razao-proporcao-porcentagem-erro` | 12 | não | "Você multiplicou pelo inverso da razão. O certo é 3; x=6/2=3." |
| `m3-razao-proporcao-porcentagem-certa` | 3 | **sim** | "Certo: 3; x=6/2=3." |

### Desafios

#### D1 — `d1-razao-proporcao-porcentagem`
- **Enunciado:** "Um preço de 20 sobe 10%; qual é o novo preço?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 20·1,1=22.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-razao-proporcao-porcentagem-certa` | 22 | **sim** | "Certo: 22; 20·1,1=22." |
| `d1-razao-proporcao-porcentagem-erro` | 30 | não | "Você somou 10 unidades em vez de 10%. O certo é 22; 20·1,1=22." |

#### D2 — `d2-razao-proporcao-porcentagem`
- **Enunciado:** "Um preço 100 sobe 10% e cai 10%; volta a 100?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 100·1,1·0,9=99.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-razao-proporcao-porcentagem-erro` | Sim, fica 100 | não | "Os percentuais usam bases diferentes. O certo é Não, fica 99; 100·1,1·0,9=99." |
| `d2-razao-proporcao-porcentagem-certa` | Não, fica 99 | **sim** | "Certo: Não, fica 99; 100·1,1·0,9=99." |

#### D3 — `d3-razao-proporcao-porcentagem`
- **Enunciado:** "Quanto é 12,5% de 4?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 12,5%=1/8; 4/8=0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-razao-proporcao-porcentagem-certa` | 0,5 | **sim** | "Certo: 0,5; 12,5%=1/8; 4/8=0,5." |
| `d3-razao-proporcao-porcentagem-erro` | 2 | não | "Você confundiu 12,5% com 50%. O certo é 0,5; 12,5%=1/8; 4/8=0,5." |

#### D4 — `d4-razao-proporcao-porcentagem`
- **Enunciado:** "Um preço após desconto de 20% é 8; qual era o preço?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0,8T=8; T=10.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-razao-proporcao-porcentagem-erro` | 9,6 | não | "Você somou 20% sobre a base errada. O certo é 10; 0,8T=8; T=10." |
| `d4-razao-proporcao-porcentagem-certa` | 10 | **sim** | "Certo: 10; 0,8T=8; T=10." |

#### D5 — `d5-razao-proporcao-porcentagem`
- **Enunciado:** "Uma turma tem 8 alunos e 25% faltam; depois chega metade dos ausentes; qual percentual continua ausente?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Faltavam 2; sobra 1; 1/8=12,5%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-razao-proporcao-porcentagem-certa` | 12,5% | **sim** | "Certo: 12,5%; Faltavam 2; sobra 1; 1/8=12,5%." |
| `d5-razao-proporcao-porcentagem-erro` | 50% | não | "Você usou só os ausentes como novo todo. O certo é 12,5%; Faltavam 2; sobra 1; 1/8=12,5%." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2023-papel`
- **Enunciado (resumido):** "Escola comprava 6 000 folhas para 1 200 alunos e agora tem 1 150, a R$ 4 por 100; para gastar R$ 220, qual o desconto (%)?"
- **Fala do Paco:** "Ache o total de folhas por aluno, arredonde para pacotes inteiros de 100 e calcule o desconto sobre o valor cheio."
- **Fonte:** ENEM 2023 (adaptada) — **Adaptação:** Questão 167: enunciado resumido; alternativas e gabarito ((5,0 ; 5,5)) mantidos. — **URL:** https://api.enem.dev/v1/exams/2023/questions/167
- **Conta de conferência:** 1 150 × 5 = 5 750 => 58 pacotes × R$ 4 = R$ 232; (232 − 220)/232 ≈ 5,17%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a50` | (5,0 ; 5,5) | **sim** | "Exato. 1 150 × 5 = 5 750 folhas exigem 58 pacotes (R$ 232); 12/232 ≈ 5,17%." |
| `a80` | (8,0 ; 8,5) | não | "8% usaria o valor antigo de 60 pacotes (R$ 240); para 58 pacotes (R$ 232) o desconto é 5,17%." |
| `a115` | (11,5 ; 12,5) | não | "12 é o desconto em reais (232 − 220), não em porcentagem; 12/232 ≈ 5,17%." |
| `a195` | (19,5 ; 20,5) | não | "20% seria R$ 46,40 de desconto; aqui faltam só R$ 12 em R$ 232, cerca de 5,17%." |
| `a35` | (3,5 ; 4,0) | não | "3,5% arredonda 57,5 pacotes para baixo: 57 · 4 = 228 e 8/228 ≈ 3,5%. Faltariam folhas: são 58 pacotes, 12/232 ≈ 5,17%." |

#### V2 — `enem-2017-celular`
- **Enunciado (resumido):** "Dois motoristas na mesma velocidade digitam olhando o celular; X leva 25% do tempo de Y. Qual a razão das distâncias às cegas de X e Y?"
- **Fala do Paco:** "Com a mesma velocidade, d = v · t: como a razão dos tempos passa para a razão das distâncias?"
- **Fonte:** ENEM 2017 (adaptada) — **Adaptação:** Questão 164: enunciado resumido; alternativas e gabarito (1/4) mantidos. — **URL:** https://api.enem.dev/v1/exams/2017/questions/164
- **Conta de conferência:** d_X / d_Y = (v · t_X)/(v · t_Y) = 25% = 1/4 (troca da repetida ENEM 2022/167).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5-4` | 5/4 | não | "5/4 = 1 + 0,25 soma 25% ao inteiro em vez de tomar 25%. Como d = v·t, d_X/d_Y = 25/100 = 1/4." |
| `a1-4` | 1/4 | **sim** | "Exato. Como a velocidade é igual, d_X/d_Y = t_X/t_Y = 25% = 1/4." |
| `a4-3` | 4/3 | não | "4/3 = 1/(1 − 0,25) divide pelo complementar (75%). A razão direta é 25% = 1/4." |
| `a4-1` | 4/1 | não | "4/1 = t_Y/t_X inverte a razão pedida (de X para Y). De X para Y vale 25% = 1/4." |
| `a3-4` | 3/4 | não | "3/4 = 1 − 25% calcula o complementar (75%), não os 25%. A razão certa é 1/4." |

#### V3 — `enem-2022-caged`
- **Enunciado (resumido):** "Jan./2013: 1 794 272 admissões e 1 765 372 desligamentos, ou 28 900 vagas criadas, 75% menos que em jan./2012. Quantas vagas em jan./2012?"
- **Fala do Paco:** "Se caiu 75%, que fração do valor de 2012 sobrou em 2013?"
- **Fonte:** ENEM 2022 (adaptada) — **Adaptação:** Questão 154: enunciado resumido; alternativas e gabarito (115 600) mantidos. — **URL:** https://api.enem.dev/v1/exams/2022/questions/154
- **Conta de conferência:** 28 900 / 0,25 = 115 600.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a16514` | 16 514 | não | "16 514 divide por 1,75 (como se tivesse subido 75%); queda de 75% divide por 0,25: 115 600." |
| `a86700` | 86 700 | não | "86 700 é 3 × 28 900 (a queda); o total de 2012 é 4 × 28 900 = 115 600." |
| `a115600` | 115 600 | **sim** | "Exato. 28 900 = 0,25 × total de 2012, logo 28 900 × 4 = 115 600." |
| `a441343` | 441 343 | não | "441 343 aplica a queda aos desligamentos do mês (1 765 372 × 0,25). A queda é das vagas criadas: 28 900 ÷ 0,25 = 115 600." |
| `a448568` | 448 568 | não | "448 568 aplica a queda às admissões do mês (1 794 272 × 0,25). A queda é das vagas criadas: 28 900 ÷ 0,25 = 115 600." |

#### V4 — `v4-razao-proporcao-porcentagem`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema razão, proporção e porcentagem.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

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
