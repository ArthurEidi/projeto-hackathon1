# Plano — Taxas equivalentes, inflação e poder de compra

**Aula:** 1 — Taxa, Tempo e Valor Real · Equivalência e inflação
**Caminho:** aritmetica / proporcionalidade / taxas-equivalentes-e-inflacao
**Pré-requisitos que o aluno já domina:** Porcentagens sucessivas, juros compostos e razões

## a) Ancoragem mecânica

Entram taxa por período e duração; sai taxa equivalente ou valor real ajustado por preços. Fatores compostos convertem horizontes.

## b) Visual de partida

Barras encadeiam fatores em períodos; marcador compara saldo nominal e nível de preços.

## c) Caso neutro

Taxa ou inflação 0% tem fator 1 e preserva saldo ou poder de compra.

## d) Panorama e recorte

Taxas equivalentes ligam juros compostos; índices medem inflação. Aqui convertemos períodos e comparamos poder de compra.

## e) Progressão por contraste

1. 0% preserva o valor.
2. 10% semestral por dois períodos dá 1,1²=1,21, ou 21%.
3. Salário e preços com fator 1,10 preservam a cesta.
4. Valor real divide nominal pelo fator de preços.

## f) Dedução causal da forma

Fatores sucessivos multiplicam: (1+iₑq)=(1+i)ⁿ. Valor real divide nominal pelo fator de preços.

## g) Simulação espacial e fronteiras

Taxas mensal e anual só se comparam após conversão à mesma janela temporal.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Taxa i | Variação proporcional por período. |
| c2 | Períodos n | Aplicações do fator. |
| c3 | Fator de preços | Razão entre níveis de preços. |
| c4 | Valor real | Nominal ajustado pelo poder de compra. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Com taxa zero, a barra aumenta ou fica igual? Avance e confira.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Como a inflação afeta o valor nominal?” / R: “Preços mudam o poder de compra; comparamos fatores no mesmo período.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — reaplica fator por período e atualiza saldo; métrica `n`.
- **Sliders:** `n` · “Períodos” · 1..5 · passo 1 · inicial 1 · c3.
- **Paco (abertura):** “10% ao semestre por dois períodos dá 20% ou 21%?”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `n ≥ 2`
- **Paco (conclusão):** “Dá 21%; 1,1 aplicado duas vezes produz 1,21.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Taxas mensal e anual podem ser comparadas sem alinhar períodos?”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Não. Converta ambas para a mesma janela.”
- **Tati (dúvida):** `fim` — P: “Taxas mensal e anual podem ser comparadas sem alinhar períodos?” / R: “Não. Converta ambas para a mesma janela.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “10% ao semestre por dois períodos dá 20% ou 21%?”
- **Enunciado:** “Nominal 10%, inflação 5%. Qual ganho real exato?”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | 1/21≈4,76% | **sim** | “Certo. 1,10/1,05−1=1/21≈4,76%.” | Divide fator nominal pelo fator de preços. |
| `erro` | 5% | não | “Subtrair dá aproximação; o exato é 1/21≈4,76%.” | Compara subtração com quociente de fatores. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** iₑq=(1+i)ⁿ−1; valor real=valor nominal/fator de preços
- **Marcas da fórmula:** c1→i; c2→n; c3→fator de preços; c4→valor real.
- **Definições:**
  - “Taxas equivalentes geram mesmo fator no horizonte.”
  - “Inflação: alta do nível de preços.”
  - “Valor real ajusta nominal pelo fator de preços.”
- **Paco (abertura):** “Taxas equivalentes encadeiam fatores; valor real divide fator nominal pelo de preços.”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você alinhou períodos e comparou fatores; taxas e poder de compra exigem a mesma janela.”

## i) Treino pós-aula

### Fáceis

#### F1 — `taxas-equivalentes-e-inflacao-f1`
- **Enunciado:** “Taxa 0% por período muda o saldo?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Fator 1+0=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f1-a` | Não | **sim** | “Certo. Fator 1+0=1.” |
| `taxas-equivalentes-e-inflacao-f1-b` | Sim | não | “Confundiu taxa zero com aumento. Resposta: Não; Fator 1+0=1.” |

#### F2 — `taxas-equivalentes-e-inflacao-f2`
- **Enunciado:** “10% ao semestre por dois semestres dá quanto efetivo?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,1²−1=21%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f2-a` | 21% | **sim** | “Certo. 1,1²−1=21%.” |
| `taxas-equivalentes-e-inflacao-f2-b` | 20% | não | “Somou sem capitalizar o segundo período. Resposta: 21%; 1,1²−1=21%.” |

#### F3 — `taxas-equivalentes-e-inflacao-f3`
- **Enunciado:** “Salário e preços sobem 10%. Poder de compra muda?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,10/1,10=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f3-a` | Fica igual | **sim** | “Certo. 1,10/1,10=1.” |
| `taxas-equivalentes-e-inflacao-f3-b` | Sobe 10% | não | “Olhou só o salário nominal. Resposta: Fica igual; 1,10/1,10=1.” |

#### F4 — `taxas-equivalentes-e-inflacao-f4`
- **Enunciado:** “5% ao trimestre por 4 trimestres equivale a quanto?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,05⁴−1≈21,55%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f4-a` | 21,55% | **sim** | “Certo. 1,05⁴−1≈21,55%.” |
| `taxas-equivalentes-e-inflacao-f4-b` | 20% | não | “Somou taxas sem composição. Resposta: 21,55%; 1,05⁴−1≈21,55%.” |

### Médias

#### M1 — `taxas-equivalentes-e-inflacao-m1`
- **Enunciado:** “Inflação 10% leva índice 100 a quanto?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100·1,10=110.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-m1-a` | 110 | **sim** | “Certo. 100·1,10=110.” |
| `taxas-equivalentes-e-inflacao-m1-b` | 10 | não | “Indicou aumento, não índice final. Resposta: 110; 100·1,10=110.” |

#### M2 — `taxas-equivalentes-e-inflacao-m2`
- **Enunciado:** “Salário sobe 20%, preços 10%. Fator real?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,20/1,10≈1,091.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-m2-a` | 1,20/1,10≈1,091 | **sim** | “Certo. 1,20/1,10≈1,091.” |
| `taxas-equivalentes-e-inflacao-m2-b` | 1,10/1,20 | não | “Inverteu salário e preços. Resposta: 1,20/1,10≈1,091; 1,20/1,10≈1,091.” |

#### M3 — `taxas-equivalentes-e-inflacao-m3`
- **Enunciado:** “Taxa mensal 1% por 2 meses equivale a quanto?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,01²−1=2,01%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-m3-a` | 2,01% | **sim** | “Certo. 1,01²−1=2,01%.” |
| `taxas-equivalentes-e-inflacao-m3-b` | 2% | não | “Somou sem capitalização. Resposta: 2,01%; 1,01²−1=2,01%.” |

### Desafios

#### D1 — `taxas-equivalentes-e-inflacao-d1`
- **Enunciado:** “R$110 nominais; preços dobraram. Valor real?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 110/2=55.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d1-a` | R$55 | **sim** | “Certo. 110/2=55.” |
| `taxas-equivalentes-e-inflacao-d1-b` | R$220 | não | “Multiplicou pelo índice em vez de dividir. Resposta: R$55; 110/2=55.” |

#### D2 — `taxas-equivalentes-e-inflacao-d2`
- **Enunciado:** “Taxa anual efetiva 21%; igual taxa semestral?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (1+i)²=1,21; i=10%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d2-a` | 10% | **sim** | “Certo. (1+i)²=1,21; i=10%.” |
| `taxas-equivalentes-e-inflacao-d2-b` | 10,5% | não | “Dividiu anual por 2 sem fator composto. Resposta: 10%; (1+i)²=1,21; i=10%.” |

#### D3 — `taxas-equivalentes-e-inflacao-d3`
- **Enunciado:** “Índice sobe de 120 a 126. Inflação?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 6/120=5%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d3-a` | 5% | **sim** | “Certo. 6/120=5%.” |
| `taxas-equivalentes-e-inflacao-d3-b` | 6% | não | “Não dividiu o aumento pela base. Resposta: 5%; 6/120=5%.” |

#### D4 — `taxas-equivalentes-e-inflacao-d4`
- **Enunciado:** “Rendimento nominal 10%, inflação 5%. Ganho real exato?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,10/1,05−1=1/21≈4,76%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d4-a` | 1/21≈4,76% | **sim** | “Certo. 1,10/1,05−1=1/21≈4,76%.” |
| `taxas-equivalentes-e-inflacao-d4-b` | 5% | não | “Subtraiu taxas em vez de dividir fatores. Resposta: 1/21≈4,76%; 1,10/1,05−1=1/21≈4,76%.” |

#### D5 — `taxas-equivalentes-e-inflacao-d5`
- **Enunciado:** “2% ao mês por 12 meses é exatamente 24% efetivos?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,02¹²−1≈26,82%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d5-a` | Não; 1,02¹²−1 | **sim** | “Certo. 1,02¹²−1≈26,82%.” |
| `taxas-equivalentes-e-inflacao-d5-b` | Sim; 24% | não | “Confundiu taxa anual nominal com efetiva. Resposta: Não; 1,02¹²−1; 1,02¹²−1≈26,82%.” |

### Vestibular

> PENDENTE-FONTE: quatro questões reais não foram pesquisadas e conferidas para este capítulo; não foram inventados enunciados, bancas, anos, opções, gabaritos ou URLs.

#### V1 — `pendente-fonte-taxas-equivalentes-e-inflacao-v1`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V2 — `pendente-fonte-taxas-equivalentes-e-inflacao-v2`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V3 — `pendente-fonte-taxas-equivalentes-e-inflacao-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-taxas-equivalentes-e-inflacao-v4`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

---

# Checklist de qualidade (marque tudo antes de entregar o plano)

**Método (METODO.md)**
- [x] Os pilares a)–g) estão escritos e cada um aparece em pelo menos um passo.
- [x] A aula abre com figura viva, não com fórmula.
- [x] O caso base aparece na tela e é nomeado em fala.
- [x] Panorama e recorte aparecem em fala.
- [x] O contraste mantém referência visual anterior.
- [x] A regra é deduzida antes da fórmula de fechamento.
- [x] O roteiro testa uma fronteira do capítulo.

**Roteiro**
- [x] Cinco passos; primeiro `interactive_canvas`, inclui `micro_challenge`, último `concept_lock`.
- [x] Aberturas perguntam ou pedem previsão; conclusões explicam.
- [x] Métricas são alcançáveis e não cumpridas inicialmente.
- [x] Opções do desafio têm feedback e mudança visual.
- [x] Marcas c1–c4 têm glossário.
- [x] WIDGET NOVO: barras descreve desenho, manipulação e métrica.

**Treino**
- [x] Há 4 fáceis, 3 médias, 5 desafios e 4 vagas vestibulares pendentes.
- [x] Questões autorais têm duas opções e exatamente uma correta.
- [x] Feedback de toda opção errada informa resposta e conta.
- [x] Cada questão autoral tem conta conferida e erro diagnosticado.
- [ ] Quatro questões reais de vestibular verificadas; PENDENTE-FONTE.
- [ ] Testes automatizados de implementação; escopo é planejamento.

**Texto**
- [x] Falas, enunciados e feedbacks curtos, sem emoji ou termos proibidos.
- [x] Notação e contas foram conferidas.

---
**Notas da implementa��o (JSON):** `barras` modo `sequencia` (PG 100 x fator; trimestres com o 20% direto como `fantasma` PA) e `categorias` no desafio/fechamento (110, 105 e 104,76). Slider `t` mapeado em `n: "1+$t"` (a barra 1 � t = 0). Tati duplicada do passo 3 trocada pela convers�o inversa (12% a.a. em mensal); fechamento com Tati nova; D2 reescrito (o enunciado "igual taxa semestral?" era amb�guo). Sem corre��o de gabarito: todas as contas conferem. Vestibular `[]`.
