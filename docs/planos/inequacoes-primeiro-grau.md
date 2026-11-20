# Plano — Inequações do primeiro grau e intervalos-solução

**Aula:** 1 — Inequações do primeiro grau e intervalos-solução · A fronteira separa os lados
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-primeiro-grau
**Pré-requisitos que o aluno já domina:** `equacoes-primeiro-grau`, `conjuntos-e-intervalos`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla x numa reta. A comparação 2x−2>0 escolhe quais entradas acendem o intervalo-solução.

## b) Visual de partida

reta_numerica — intervalo −4..4; trecho (0;+∞) em c4; ponto x=−1, passo 1, distância ao zero desligada.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Na comparação x>0, a entrada passa sem mudança; zero é a fronteira aberta. Depois a fronteira anda para 1.

## d) Panorama e recorte

Inequações também envolvem produtos e curvas; aqui comparamos retas e observamos a troca de ordem com sinal negativo.

## e) Progressão por contraste

1. Referência visual: Arrasta de −1 até 1; ponto cruza círculo aberto em zero.
2. Em contraste com a referência: Arrasta para 2 e vê a região solução à direita da fronteira.
3. Aprofundamento e fronteiras: Cruza 1 rumo à esquerda; compara com o trecho anterior descrito na fala.

## f) Dedução causal da forma

Para x>1, 2x−2 fica positivo. Multiplicar uma reta numérica por −1 espelha a ordem: se x está à direita de 1, −x está à esquerda de −1. Portanto dividir por coeficiente negativo inverte o sinal da desigualdade.

Fórmula deduzida: ax+b>0 ⇔ x>−b/a se a>0; x<−b/a se a<0.

## g) Simulação espacial e fronteiras

Testar x na fronteira: > exclui e ≥ inclui. Para a=0, a desigualdade inteira é verdadeira ou falsa conforme b; não dividir por a.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número escolhido na reta. |
| c2 | Coeficiente a | Fator cujo sinal decide a ordem. |
| c3 | Valor comparado | Resultado da expressão comparada com zero. |
| c4 | Intervalo-solução | Entradas que tornam a desigualdade verdadeira. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −4..4; trecho (0;+∞) em c4; ponto x=−1, passo 1, distância ao zero desligada.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro x>0, zero entra na solução? Atravesse a fronteira até 1."
- **Interação do aluno:** Arrasta de −1 até 1; ponto cruza círculo aberto em zero.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Zero não entra porque a comparação é estrita; em 1 ela é verdadeira."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Inequações também envolvem produtos e curvas; aqui comparamos retas e observamos a troca de ordem com sinal negativo."

### Passo 2 — `mover-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** reta_numerica — intervalo −4..5; trecho (1;+∞) em c4, ponto aberto em 1; ponto móvel x=0, passo 1; referência 0 em muted.
- **Sliders:** nenhum
- **Paco (abertura):** "Em 2x−2>0, qual lado de 1 serve? Leve o ponto até 2."
- **Interação do aluno:** Arrasta para 2 e vê a região solução à direita da fronteira.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "2x−2>0 equivale a 2x>2; por isso x>1, com fronteira aberta."

### Passo 3 — `espelhar-ordem`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** reta_numerica — intervalo −4..5; trecho (−∞;1) em c4, fronteira 1 aberta; ponto x=2, passo 1.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora −2x+2>0; o lado válido muda? Arraste de 2 até 0."
- **Interação do aluno:** Cruza 1 rumo à esquerda; compara com o trecho anterior descrito na fala.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Muda: dividir −2x>−2 por −2 inverte a ordem, por isso x<1."
- **Tati (dúvida):** `fim` — P: "Se trocar > por ≥, o que muda?" / R: "O ponto 1 passa a entrar; a igualdade também é permitida."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** reta_figura — intervalo −3..5; marca 1 aberta em c4, sem trecho preenchido.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a solução de −2x+2>0?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | x>1 | não | "Faltou inverter a ordem ao dividir por −2; a solução é x<1." | Mostra ponto x=2 fora do trecho (−∞;1). |
| `micro-acerto` | x<1 | **sim** | "Certo: x<1; Dividir por −2 inverte a ordem." | Preenche (−∞;1) em c4, com círculo aberto. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** reta_figura — intervalo −3..5; marca 1 aberta em c4, sem trecho preenchido.
- **Fórmula:** `a`→c2 · `x`→c1 · `+b > 0 ⇔ x`→c4 · `> −b/a (a>0)`
- **Definições:**
  - "Entrada x: Número escolhido na reta."
  - "Valor comparado: Resultado da expressão comparada com zero."
  - "Intervalo-solução: Entradas que tornam a desigualdade verdadeira."
- **Paco (abertura):** "Multiplicar por um negativo espelha a reta; por isso a ordem da desigualdade se inverte."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você encontrou a fronteira e escolheu o lado válido sem incluir igualdades proibidas."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-inequacoes-primeiro-grau`
- **Enunciado:** "Em x>0, zero entra na solução?"
- **Figura:** nenhuma
- **Conta de conferência:** 0>0 é falso.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-primeiro-grau-erro` | Sim | não | "O sinal estrito exclui a igualdade. O certo é Não; 0>0 é falso." |
| `f1-inequacoes-primeiro-grau-certa` | Não | **sim** | "Certo: Não; 0>0 é falso." |

#### F2 — `f2-inequacoes-primeiro-grau`
- **Enunciado:** "Na reta, x>1 fica de qual lado de 1?"
- **Figura:** nenhuma
- **Conta de conferência:** 2>1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-primeiro-grau-certa` | Direita | **sim** | "Certo: Direita; 2>1." |
| `f2-inequacoes-primeiro-grau-erro` | Esquerda | não | "Você inverteu a ordem dos números. O certo é Direita; 2>1." |

#### F3 — `f3-inequacoes-primeiro-grau`
- **Enunciado:** "Ao dividir uma desigualdade por −2, o sinal muda?"
- **Figura:** nenhuma
- **Conta de conferência:** 2>0 ⇒ −1<0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-primeiro-grau-erro` | Não | não | "Um fator negativo inverte a ordem. O certo é Sim; 2>0 ⇒ −1<0." |
| `f3-inequacoes-primeiro-grau-certa` | Sim | **sim** | "Certo: Sim; 2>0 ⇒ −1<0." |

#### F4 — `f4-inequacoes-primeiro-grau`
- **Enunciado:** "Em x≥1, o ponto 1 é aberto ou fechado?"
- **Figura:** nenhuma
- **Conta de conferência:** 1≥1 é verdadeiro.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-primeiro-grau-certa` | Fechado | **sim** | "Certo: Fechado; 1≥1 é verdadeiro." |
| `f4-inequacoes-primeiro-grau-erro` | Aberto | não | "Você excluiu uma igualdade permitida. O certo é Fechado; 1≥1 é verdadeiro." |

### Médias

#### M1 — `m1-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x−2>0."
- **Figura:** nenhuma
- **Conta de conferência:** 2x>2; x>1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-primeiro-grau-erro` | x<1 | não | "Você inverteu ao dividir por positivo. O certo é x>1; 2x>2; x>1." |
| `m1-inequacoes-primeiro-grau-certa` | x>1 | **sim** | "Certo: x>1; 2x>2; x>1." |

#### M2 — `m2-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva −2x+2>0."
- **Figura:** nenhuma
- **Conta de conferência:** −2x>−2; x<1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-primeiro-grau-certa` | x<1 | **sim** | "Certo: x<1; −2x>−2; x<1." |
| `m2-inequacoes-primeiro-grau-erro` | x>1 | não | "Faltou inverter ao dividir por negativo. O certo é x<1; −2x>−2; x<1." |

#### M3 — `m3-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva 3x≤6."
- **Figura:** nenhuma
- **Conta de conferência:** 3·2=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-primeiro-grau-erro` | x<2 | não | "Você retirou a igualdade. O certo é x≤2; 3·2=6." |
| `m3-inequacoes-primeiro-grau-certa` | x≤2 | **sim** | "Certo: x≤2; 3·2=6." |

### Desafios

#### D1 — `d1-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x+1≤x+3."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x≤3−1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-primeiro-grau-certa` | x≤2 | **sim** | "Certo: x≤2; x≤3−1=2." |
| `d1-inequacoes-primeiro-grau-erro` | x≥2 | não | "Você trocou o lado da solução. O certo é x≤2; x≤3−1=2." |

#### D2 — `d2-inequacoes-primeiro-grau`
- **Enunciado:** "Quais reais satisfazem 0x+1>0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1>0 sempre.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-primeiro-grau-erro` | Nenhum | não | "A variável não muda a verdade da comparação. O certo é Todos; 1>0 sempre." |
| `d2-inequacoes-primeiro-grau-certa` | Todos | **sim** | "Certo: Todos; 1>0 sempre." |

#### D3 — `d3-inequacoes-primeiro-grau`
- **Enunciado:** "Quais reais satisfazem 0x−1≥0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** −1≥0 é falso.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-primeiro-grau-certa` | Nenhum | **sim** | "Certo: Nenhum; −1≥0 é falso." |
| `d3-inequacoes-primeiro-grau-erro` | Todos | não | "A saída constante é negativa. O certo é Nenhum; −1≥0 é falso." |

#### D4 — `d4-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva −2x<1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x>1/(−2)=−0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-primeiro-grau-erro` | x<−0,5 | não | "Faltou inverter ao dividir por −2. O certo é x>−0,5; x>1/(−2)=−0,5." |
| `d4-inequacoes-primeiro-grau-certa` | x>−0,5 | **sim** | "Certo: x>−0,5; x>1/(−2)=−0,5." |

#### D5 — `d5-inequacoes-primeiro-grau`
- **Enunciado:** "Uma corrida custa 3+2x reais, com x≥0; com até 8 reais, qual intervalo de x é possível?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 3+2x≤8; 0≤x≤2,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-primeiro-grau-certa` | [0;2,5] | **sim** | "Certo: [0;2,5]; 3+2x≤8; 0≤x≤2,5." |
| `d5-inequacoes-primeiro-grau-erro` | (−∞;2,5] | não | "Você aceitou distância negativa. O certo é [0;2,5]; 3+2x≤8; 0≤x≤2,5." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2011-lucro`
- **Enunciado (resumido):** "Faturamento é FT(q) = 5q e custo é CT(q) = 2q + 12. Qual a quantidade mínima q para o lucro LT = FT − CT não dar prejuízo?"
- **Fala do Paco:** "Não ter prejuízo significa LT(q) ≥ 0, isto é, 5q − (2q + 12) ≥ 0."
- **Fonte:** ENEM 2011 (adaptada) — **Adaptação:** Questão 180: texto condensado mantendo as funções FT(q), CT(q) e alternativas. — **URL:** https://api.enem.dev/v1/exams/2011/questions/180
- **Conta de conferência:** 5q − (2q + 12) = 3q − 12 ≥ 0 ⇒ q ≥ 4 (gabarito D).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `q0` | 0 | não | "Para q = 0 há custo fixo 12: LT(0) = 0 − 12 = −12 (prejuízo). De 3q − 12 ≥ 0 vem q ≥ 4." |
| `q1` | 1 | não | "Para q = 1, LT(1) = 5 − 14 = −9 (prejuízo). Resolvendo 3q − 12 ≥ 0 obtemos q ≥ 4." |
| `q3` | 3 | não | "3 é a margem por unidade (5 − 2), não a quantidade: com q = 3, LT = −3. De 3q − 12 ≥ 0 vem q ≥ 4." |
| `q4` | 4 | **sim** | "Certo: LT(q) = 5q − (2q + 12) = 3q − 12 ≥ 0 ⇒ 3q ≥ 12 ⇒ q ≥ 4." |
| `q5` | 5 | não | "5 exige lucro positivo (3q − 12 > 0). Não ter prejuízo admite lucro zero: 3q − 12 ≥ 0 dá q ≥ 4." |

#### V2 — `enem-2022-reajuste`
- **Enunciado (resumido):** "60 mestres (R$ 8 mil) têm aumento de 25% e 40 doutores (R$ 12 mil) têm x%. Para média ≤ R$ 12.240, qual o x máximo?"
- **Fala do Paco:** "Compare a folha total após os aumentos com o teto 100 · 12.240 = 1.224.000."
- **Fonte:** ENEM 2022 (adaptada) — **Adaptação:** Questão 163: texto resumido mantendo os salários, quantidades e percentuais. — **URL:** https://api.enem.dev/v1/exams/2022/questions/163
- **Conta de conferência:** 60·10.000 + 40·12.000(1 + x/100) ≤ 100·12.240 ⇒ 1 + x/100 ≤ 1,30 ⇒ x ≤ 30,0% (gabarito D).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `x14_4` | 14,4% | não | "14,4% troca as quantidades: 40·10.000 + 60·12.000·(1 + x) ≤ 1.224.000. Com 60 mestres e 40 doutores, sai 30,0%." |
| `x20_7` | 20,7% | não | "20,7% usa a média simples: (10.000 + 12.000·(1 + x))/2 ≤ 12.240. Com os pesos 60 e 40, sai 30,0%." |
| `x22_0` | 22,0% | não | "Com 22,0%, a folha fica 600.000 + 480.000·1,22 = 1.185.600, abaixo do teto de 1.224.000: cabe até 30,0%." |
| `x30_0` | 30,0% | **sim** | "Exato: 600.000 + 480.000(1 + x/100) ≤ 1.224.000 ⇒ 1 + x/100 ≤ 624/480 = 1,30 ⇒ 30,0%." |
| `x37_5` | 37,5% | não | "Com 37,5%, a folha fica 600.000 + 480.000·1,375 = 1.260.000, acima do teto de 1.224.000. O máximo é 30,0%." |

#### V3 — `enem-2021-lava-rapido`
- **Enunciado (resumido):** "Um lava-rápido cobra R$ 20 (simples) e R$ 35 (completa) e precisa de receita mínima de R$ 300,00. Qual o menor número de lavagens?"
- **Fala do Paco:** "Para minimizar o total n de lavagens, suponha todas do tipo mais caro (R$ 35)."
- **Fonte:** ENEM 2021 (adaptada) — **Adaptação:** Questão 173: enunciado condensado mantendo preços, meta e alternativas. — **URL:** https://api.enem.dev/v1/exams/2021/questions/173
- **Conta de conferência:** 35n ≥ 300 ⇒ n ≥ 300/35 ≈ 8,57 ⇒ n = 9 (gabarito C).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `l6` | 6 | não | "6 é 300 ÷ 55 ≈ 5,5 arredondado: somou os dois preços como uma lavagem só. Só completas: 35n ≥ 300 dá n ≥ 8,57, logo 9." |
| `l8` | 8 | não | "8 lavagens completas dão 8·35 = R$ 280 < 300 (arredondou para baixo). O mínimo é 9 (9·35 = R$ 315)." |
| `l9` | 9 | **sim** | "Certo: 35n ≥ 300 ⇒ n ≥ 300/35 ≈ 8,57, logo o menor inteiro é 9 (R$ 315 ≥ 300)." |
| `l15` | 15 | não | "15 = 300/20 usa apenas lavagens simples (R$ 20). Usando completas (R$ 35), 35n ≥ 300 dá 9." |
| `l20` | 20 | não | "20 é o preço em reais da lavagem simples, não a quantidade mínima. De 35n ≥ 300 vem 9." |

#### V4 — `enem-2010-selos`
- **Enunciado (resumido):** "Com R$ 1.000, compram-se 500 conjuntos de R$ 1,45 (1 selo de R$ 0,65 cada) e o máximo de selos extras de R$ 0,65. Quantos de R$ 0,65 há?"
- **Fala do Paco:** "Desconte 500·1,45 dos R$ 1.000 e divida a sobra por 0,65 (parte inteira), depois some 500."
- **Fonte:** ENEM 2010 (adaptada) — **Adaptação:** Questão 155: texto resumido mantendo valores dos selos e orçamento. — **URL:** https://api.enem.dev/v1/exams/2010/questions/155
- **Conta de conferência:** 1.000 − 500·1,45 = 275; 275/0,65 = 423,07 ⇒ 423 + 500 = 923 (gabarito C).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s476` | 476 | não | "476 = 1.000 ÷ 2,10 supõe o mesmo número de folhetos dos dois tipos. São 500 do 2º; a sobra de 275 compra 423: 923." |
| `s675` | 675 | não | "675 = 1.000 − 500·0,65 subtraiu reais de 1.000. O certo é 500 + 423 = 923." |
| `s923` | 923 | **sim** | "Exato: 500 · 1,45 = 725; sobra 275; 275/0,65 ≈ 423,1, ou seja, 423 extras; total = 500 + 423 = 923." |
| `s965` | 965 | não | "965 estoura a verba: 965·0,65 + 500·0,80 = 1.027,25 > 1.000. A sobra de 275 compra 423: 500 + 423 = 923." |
| `s1538` | 1.538 | não | "1.538 = 1.000/0,65 ignora os 500 pacotes de R$ 1,45. Com a sobra de R$ 275, são 500 + 423 = 923." |

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
