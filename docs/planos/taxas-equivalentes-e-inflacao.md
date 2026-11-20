# Plano â€” Taxas equivalentes, inflaÃ§Ã£o e poder de compra

**Aula:** 1 â€” Taxa, Tempo e Valor Real Â· EquivalÃªncia e inflaÃ§Ã£o
**Caminho:** aritmetica / proporcionalidade / taxas-equivalentes-e-inflacao
**PrÃ©-requisitos que o aluno jÃ¡ domina:** Porcentagens sucessivas, juros compostos e razÃµes

## a) Ancoragem mecÃ¢nica

Entram taxa por perÃ­odo e duraÃ§Ã£o; sai taxa equivalente ou valor real ajustado por preÃ§os. Fatores compostos convertem horizontes.

## b) Visual de partida

Barras encadeiam fatores em perÃ­odos; marcador compara saldo nominal e nÃ­vel de preÃ§os.

## c) Caso neutro

Taxa ou inflaÃ§Ã£o 0% tem fator 1 e preserva saldo ou poder de compra.

## d) Panorama e recorte

Taxas equivalentes ligam juros compostos; Ã­ndices medem inflaÃ§Ã£o. Aqui convertemos perÃ­odos e comparamos poder de compra.

## e) ProgressÃ£o por contraste

1. 0% preserva o valor.
2. 10% semestral por dois perÃ­odos dÃ¡ 1,1Â²=1,21, ou 21%.
3. SalÃ¡rio e preÃ§os com fator 1,10 preservam a cesta.
4. Valor real divide nominal pelo fator de preÃ§os.

## f) DeduÃ§Ã£o causal da forma

Fatores sucessivos multiplicam: (1+iâ‚‘q)=(1+i)â�¿. Valor real divide nominal pelo fator de preÃ§os.

## g) SimulaÃ§Ã£o espacial e fronteiras

Taxas mensal e anual sÃ³ se comparam apÃ³s conversÃ£o Ã  mesma janela temporal.

## h) Roteiro da aula

**GlossÃ¡rio da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Taxa i | VariaÃ§Ã£o proporcional por perÃ­odo. |
| c2 | PerÃ­odos n | AplicaÃ§Ãµes do fator. |
| c3 | Fator de preÃ§os | RazÃ£o entre nÃ­veis de preÃ§os. |
| c4 | Valor real | Nominal ajustado pelo poder de compra. |

### Passo 1 â€” `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras â€” desenha cinco colunas nos Ã­ndices 1â€“5; o controle de regra altera alturas, sem ligar Ã­ndices intermediÃ¡rios; mÃ©trica `n`.
- **Sliders:** `n` Â· â€œÃ�ndiceâ€� Â· 1..5 Â· passo 1 Â· inicial 1 Â· c1.
- **Paco (abertura):** â€œCom taxa zero, a barra aumenta ou fica igual? Avance e confira.â€�
- **InteraÃ§Ã£o do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visÃ­veis.
- **ConclusÃ£o:** `n â‰¥ 4`
- **Paco (conclusÃ£o):** â€œO caso neutro mantÃ©m o valor; as barras ficam na mesma altura.â€�
- **Tati (dÃºvida):** `fim` â€” P: â€œComo a inflaÃ§Ã£o afeta o valor nominal?â€� / R: â€œPreÃ§os mudam o poder de compra; comparamos fatores no mesmo perÃ­odo.â€�

### Passo 2 â€” `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saÃ­da), 2 (visual), 5 (contraste), 6 (deduÃ§Ã£o)
- **Widget:** WIDGET NOVO: barras â€” reaplica fator por perÃ­odo e atualiza saldo; mÃ©trica `n`.
- **Sliders:** `n` Â· â€œPerÃ­odosâ€� Â· 1..5 Â· passo 1 Â· inicial 1 Â· c3.
- **Paco (abertura):** â€œ10% ao semestre por dois perÃ­odos dÃ¡ 20% ou 21%?â€�
- **InteraÃ§Ã£o do aluno:** move o controle; compara a barra nova com a referÃªncia anterior.
- **ConclusÃ£o:** `n â‰¥ 2`
- **Paco (conclusÃ£o):** â€œDÃ¡ 21%; 1,1 aplicado duas vezes produz 1,21.â€�

### Passo 3 â€” `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras â€” exibe termos discretos e a fronteira; aluno avanÃ§a o Ã­ndice ou ajusta a razÃ£o; mÃ©trica `n`.
- **Sliders:** `n` Â· â€œÃ�ndiceâ€� Â· 1..6 Â· passo 1 Â· inicial 1 Â· c1.
- **Paco (abertura):** â€œTaxas mensal e anual podem ser comparadas sem alinhar perÃ­odos?â€�
- **InteraÃ§Ã£o do aluno:** avanÃ§a n; figura destaca quando a condiÃ§Ã£o deixa de valer ou requer mais dados iniciais.
- **ConclusÃ£o:** `n â‰¥ 5`
- **Paco (conclusÃ£o):** â€œNÃ£o. Converta ambas para a mesma janela.â€�
- **Tati (dÃºvida):** `fim` â€” P: â€œTaxas mensal e anual podem ser comparadas sem alinhar perÃ­odos?â€� / R: â€œNÃ£o. Converta ambas para a mesma janela.â€�

### Passo 4 â€” `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (deduÃ§Ã£o), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras â€” estado inicial mostra parcelas e regra; cada opÃ§Ã£o atualiza destaque, total e erro tÃ­pico; mÃ©trica: resposta certa.
- **Paco (abertura):** â€œ10% ao semestre por dois perÃ­odos dÃ¡ 20% ou 21%?â€�
- **Enunciado:** â€œNominal 10%, inflaÃ§Ã£o 5%. Qual ganho real exato?â€�

| id | RÃ³tulo | Certa? | Feedback | A figura muda paraâ€¦ |
|---|---|---|---|---|
| `acerto` | 1/21â‰ˆ4,76% | **sim** | â€œCerto. 1,10/1,05âˆ’1=1/21â‰ˆ4,76%.â€� | Divide fator nominal pelo fator de preÃ§os. |
| `erro` | 5% | nÃ£o | â€œSubtrair dÃ¡ aproximaÃ§Ã£o; o exato Ã© 1/21â‰ˆ4,76%.â€� | Compara subtraÃ§Ã£o com quociente de fatores. |

### Passo 5 â€” `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1â€“7 (sÃ­ntese)
- **Figura:** WIDGET NOVO: barras â€” mantÃ©m os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **FÃ³rmula:** iâ‚‘q=(1+i)â�¿âˆ’1; valor real=valor nominal/fator de preÃ§os
- **Marcas da fÃ³rmula:** c1â†’i; c2â†’n; c3â†’fator de preÃ§os; c4â†’valor real.
- **DefiniÃ§Ãµes:**
  - â€œTaxas equivalentes geram mesmo fator no horizonte.â€�
  - â€œInflaÃ§Ã£o: alta do nÃ­vel de preÃ§os.â€�
  - â€œValor real ajusta nominal pelo fator de preÃ§os.â€�
- **Paco (abertura):** â€œTaxas equivalentes encadeiam fatores; valor real divide fator nominal pelo de preÃ§os.â€�
- **Dica (hint):** â€œToque em uma marca para ver a grandeza correspondente nas barras.â€�
- **Tati (dÃºvida):** `inÃ­cio` â€” P: â€œO que determina a saÃ­da?â€� / R: â€œA entrada e a regra de avanÃ§o determinam cada termo.â€�

**Frase de encerramento (outro):** â€œVocÃª alinhou perÃ­odos e comparou fatores; taxas e poder de compra exigem a mesma janela.â€�

## i) Treino pÃ³s-aula

### FÃ¡ceis

#### F1 â€” `taxas-equivalentes-e-inflacao-f1`
- **Enunciado:** â€œTaxa 0% por perÃ­odo muda o saldo?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** Fator 1+0=1.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f1-a` | NÃ£o | **sim** | â€œCerto. Fator 1+0=1.â€� |
| `taxas-equivalentes-e-inflacao-f1-b` | Sim | nÃ£o | â€œConfundiu taxa zero com aumento. Resposta: NÃ£o; Fator 1+0=1.â€� |

#### F2 â€” `taxas-equivalentes-e-inflacao-f2`
- **Enunciado:** â€œ10% ao semestre por dois semestres dÃ¡ quanto efetivo?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,1Â²âˆ’1=21%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f2-a` | 21% | **sim** | â€œCerto. 1,1Â²âˆ’1=21%.â€� |
| `taxas-equivalentes-e-inflacao-f2-b` | 20% | nÃ£o | â€œSomou sem capitalizar o segundo perÃ­odo. Resposta: 21%; 1,1Â²âˆ’1=21%.â€� |

#### F3 â€” `taxas-equivalentes-e-inflacao-f3`
- **Enunciado:** â€œSalÃ¡rio e preÃ§os sobem 10%. Poder de compra muda?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,10/1,10=1.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f3-a` | Fica igual | **sim** | â€œCerto. 1,10/1,10=1.â€� |
| `taxas-equivalentes-e-inflacao-f3-b` | Sobe 10% | nÃ£o | â€œOlhou sÃ³ o salÃ¡rio nominal. Resposta: Fica igual; 1,10/1,10=1.â€� |

#### F4 â€” `taxas-equivalentes-e-inflacao-f4`
- **Enunciado:** â€œ5% ao trimestre por 4 trimestres equivale a quanto?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,05â�´âˆ’1â‰ˆ21,55%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-f4-a` | 21,55% | **sim** | â€œCerto. 1,05â�´âˆ’1â‰ˆ21,55%.â€� |
| `taxas-equivalentes-e-inflacao-f4-b` | 20% | nÃ£o | â€œSomou taxas sem composiÃ§Ã£o. Resposta: 21,55%; 1,05â�´âˆ’1â‰ˆ21,55%.â€� |

### MÃ©dias

#### M1 â€” `taxas-equivalentes-e-inflacao-m1`
- **Enunciado:** â€œInflaÃ§Ã£o 10% leva Ã­ndice 100 a quanto?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 100Â·1,10=110.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-m1-a` | 110 | **sim** | â€œCerto. 100Â·1,10=110.â€� |
| `taxas-equivalentes-e-inflacao-m1-b` | 10 | nÃ£o | â€œIndicou aumento, nÃ£o Ã­ndice final. Resposta: 110; 100Â·1,10=110.â€� |

#### M2 â€” `taxas-equivalentes-e-inflacao-m2`
- **Enunciado:** â€œSalÃ¡rio sobe 20%, preÃ§os 10%. Fator real?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,20/1,10â‰ˆ1,091.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-m2-a` | 1,20/1,10â‰ˆ1,091 | **sim** | â€œCerto. 1,20/1,10â‰ˆ1,091.â€� |
| `taxas-equivalentes-e-inflacao-m2-b` | 1,10/1,20 | nÃ£o | â€œInverteu salÃ¡rio e preÃ§os. Resposta: 1,20/1,10â‰ˆ1,091; 1,20/1,10â‰ˆ1,091.â€� |

#### M3 â€” `taxas-equivalentes-e-inflacao-m3`
- **Enunciado:** â€œTaxa mensal 1% por 2 meses equivale a quanto?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,01Â²âˆ’1=2,01%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-m3-a` | 2,01% | **sim** | â€œCerto. 1,01Â²âˆ’1=2,01%.â€� |
| `taxas-equivalentes-e-inflacao-m3-b` | 2% | nÃ£o | â€œSomou sem capitalizaÃ§Ã£o. Resposta: 2,01%; 1,01Â²âˆ’1=2,01%.â€� |

### Desafios

#### D1 â€” `taxas-equivalentes-e-inflacao-d1`
- **Enunciado:** â€œR$110 nominais; preÃ§os dobraram. Valor real?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 110/2=55.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d1-a` | R$55 | **sim** | â€œCerto. 110/2=55.â€� |
| `taxas-equivalentes-e-inflacao-d1-b` | R$220 | nÃ£o | â€œMultiplicou pelo Ã­ndice em vez de dividir. Resposta: R$55; 110/2=55.â€� |

#### D2 â€” `taxas-equivalentes-e-inflacao-d2`
- **Enunciado:** â€œTaxa anual efetiva 21%; igual taxa semestral?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** (1+i)Â²=1,21; i=10%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d2-a` | 10% | **sim** | â€œCerto. (1+i)Â²=1,21; i=10%.â€� |
| `taxas-equivalentes-e-inflacao-d2-b` | 10,5% | nÃ£o | â€œDividiu anual por 2 sem fator composto. Resposta: 10%; (1+i)Â²=1,21; i=10%.â€� |

#### D3 â€” `taxas-equivalentes-e-inflacao-d3`
- **Enunciado:** â€œÃ�ndice sobe de 120 a 126. InflaÃ§Ã£o?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 6/120=5%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d3-a` | 5% | **sim** | â€œCerto. 6/120=5%.â€� |
| `taxas-equivalentes-e-inflacao-d3-b` | 6% | nÃ£o | â€œNÃ£o dividiu o aumento pela base. Resposta: 5%; 6/120=5%.â€� |

#### D4 â€” `taxas-equivalentes-e-inflacao-d4`
- **Enunciado:** â€œRendimento nominal 10%, inflaÃ§Ã£o 5%. Ganho real exato?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,10/1,05âˆ’1=1/21â‰ˆ4,76%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d4-a` | 1/21â‰ˆ4,76% | **sim** | â€œCerto. 1,10/1,05âˆ’1=1/21â‰ˆ4,76%.â€� |
| `taxas-equivalentes-e-inflacao-d4-b` | 5% | nÃ£o | â€œSubtraiu taxas em vez de dividir fatores. Resposta: 1/21â‰ˆ4,76%; 1,10/1,05âˆ’1=1/21â‰ˆ4,76%.â€� |

#### D5 â€” `taxas-equivalentes-e-inflacao-d5`
- **Enunciado:** â€œ2% ao mÃªs por 12 meses Ã© exatamente 24% efetivos?â€�
- **Figura (opcional):** nenhuma
- **Conta de conferÃªncia:** 1,02Â¹Â²âˆ’1â‰ˆ26,82%.

| id | RÃ³tulo | Certa? | Feedback |
|---|---|---|---|
| `taxas-equivalentes-e-inflacao-d5-a` | NÃ£o; 1,02Â¹Â²âˆ’1 | **sim** | â€œCerto. 1,02Â¹Â²âˆ’1â‰ˆ26,82%.â€� |
| `taxas-equivalentes-e-inflacao-d5-b` | Sim; 24% | nÃ£o | â€œConfundiu taxa anual nominal com efetiva. Resposta: NÃ£o; 1,02Â¹Â²âˆ’1; 1,02Â¹Â²âˆ’1â‰ˆ26,82%.â€� |

### Vestibular

#### V1 — `enem-2011-aplicacao`
- **Enunciado:** "Um capital perdeu 30% no 1º mês e recuperou 20% do que perdeu no 2º mês, restando R$ 3 800,00. Qual era o capital inicial?"
- **Fala do Paco:** "Escreva a perda e a recuperação em função do capital C e iguale o que sobrou a R$ 3 800."
- **Fonte:** ENEM 2011 (adaptada); Questão 160: enunciado resumido; alternativas limpas e gabarito (R$ 5 000,00) mantidos; https://api.enem.dev/v1/exams/2011/questions/160
- **Conta de conferência:** (1 − 0,30 + 0,20 · 0,30) · C = 0,76C = 3 800 => C = 5 000,00 (troca da repetida ENEM 2019/153).

---

# Checklist de qualidade (marque tudo antes de entregar o plano)

**MÃ©todo (METODO.md)**
- [x] Os pilares a)â€“g) estÃ£o escritos e cada um aparece em pelo menos um passo.
- [x] A aula abre com figura viva, nÃ£o com fÃ³rmula.
- [x] O caso base aparece na tela e Ã© nomeado em fala.
- [x] Panorama e recorte aparecem em fala.
- [x] O contraste mantÃ©m referÃªncia visual anterior.
- [x] A regra Ã© deduzida antes da fÃ³rmula de fechamento.
- [x] O roteiro testa uma fronteira do capÃ­tulo.

**Roteiro**
- [x] Cinco passos; primeiro `interactive_canvas`, inclui `micro_challenge`, Ãºltimo `concept_lock`.
- [x] Aberturas perguntam ou pedem previsÃ£o; conclusÃµes explicam.
- [x] MÃ©tricas sÃ£o alcanÃ§Ã¡veis e nÃ£o cumpridas inicialmente.
- [x] OpÃ§Ãµes do desafio tÃªm feedback e mudanÃ§a visual.
- [x] Marcas c1â€“c4 tÃªm glossÃ¡rio.
- [x] WIDGET NOVO: barras descreve desenho, manipulaÃ§Ã£o e mÃ©trica.

**Treino**
- [x] HÃ¡ 4 fÃ¡ceis, 3 mÃ©dias, 5 desafios e 4 vagas vestibulares pendentes.
- [x] QuestÃµes autorais tÃªm duas opÃ§Ãµes e exatamente uma correta.
- [x] Feedback de toda opÃ§Ã£o errada informa resposta e conta.
- [x] Cada questÃ£o autoral tem conta conferida e erro diagnosticado.
- [ ] Quatro questÃµes reais de vestibular verificadas; PENDENTE-FONTE.
- [ ] Testes automatizados de implementaÃ§Ã£o; escopo Ã© planejamento.

**Texto**
- [x] Falas, enunciados e feedbacks curtos, sem emoji ou termos proibidos.
- [x] NotaÃ§Ã£o e contas foram conferidas.

---
**Notas da implementação (JSON):** `barras` modo `sequencia` (PG 100 x fator; trimestres com o 20% direto como `fantasma` PA) e `categorias` no desafio/fechamento (110, 105 e 104,76). Slider `t` mapeado em `n: "1+$t"` (a barra 1 é t = 0). Tati duplicada do passo 3 trocada pela conversão inversa (12% a.a. em mensal); fechamento com Tati nova; D2 reescrito (o enunciado "igual taxa semestral?" era ambíguo). Sem correção de gabarito: todas as contas conferem. Vestibular `[]`.
