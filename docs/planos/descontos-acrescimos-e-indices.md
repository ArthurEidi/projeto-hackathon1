# Plano — Descontos, acréscimos e índices percentuais

**Aula:** 1 — Fatores em Sequência · Descontos, acréscimos e índices
**Caminho:** aritmetica / proporcionalidade / descontos-acrescimos-e-indices
**Pré-requisitos que o aluno já domina:** Porcentagem, fator multiplicativo e juros compostos

## a) Ancoragem mecânica

Entram valor-base V e percentuais; sai o valor atualizado. Cada desconto ou acréscimo multiplica o valor corrente por um fator.

## b) Visual de partida

Barras partem de V=100 e mostram valor antes/depois; o aluno aplica percentuais sucessivos.

## c) Caso neutro

Com variação 0%, o fator é 1 e o valor não muda.

## d) Panorama e recorte

Juros usam fatores sucessivos; índices comparam datas. Aqui tratamos descontos, acréscimos e índices simples.

## e) Progressão por contraste

1. 0% corresponde a fator 1.
2. −10% dá fator 0,9; +10% dá 1,1.
3. +10% e −10% dão 1,1·0,9=0,99.
4. Índice 120→132 representa alta de 10%.

## f) Dedução causal da forma

Desconto p mantém (1−p)V; acréscimo dá (1+p)V. Aplicações sucessivas multiplicam fatores porque a base muda.

## g) Simulação espacial e fronteiras

Percentuais incidem no valor corrente; índice compara uma base declarada. Trocar escala não muda a razão.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Valor V | Preço ou valor inicial. |
| c2 | Taxa p | Percentual decimal. |
| c3 | Fator | Multiplicador que atualiza o valor. |
| c4 | Índice | Número relativo a uma base. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Com variação de 0%, o preço muda? Observe a barra antes de alterar a taxa.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Como os índices comparam datas?” / R: “Eles usam uma base de referência; aqui calculamos variações percentuais simples.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — p representa dezenas de pontos percentuais e altera fator; métrica `p`.
- **Sliders:** `p` · “Dezenas de pontos percentuais” · 0..4 · passo 1 · inicial 0 · c3.
- **Paco (abertura):** “Preço 100 recebe 10% de desconto. Qual fator?”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `p ≥ 2`
- **Paco (conclusão):** “0,9; ficam 90% do preço original.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Após +10% e −10%, volta ao inicial?”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Não. 1,1·0,9=0,99; resta 99%.”
- **Tati (dúvida):** `fim` — P: “Após +10% e −10%, volta ao inicial?” / R: “Não. 1,1·0,9=0,99; resta 99%.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “Preço 100 recebe 10% de desconto. Qual fator?”
- **Enunciado:** “R$100 sobe 10% e depois cai 10%. Qual é o final?”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | R$99 | **sim** | “Certo. 100·1,1·0,9=99.” | Mostra 100→110→99. |
| `erro` | R$100 | não | “Bases diferentes impedem cancelamento; o final é R$99.” | Mostra a base 110 antes do desconto. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** Vnovo=V·(1−p) no desconto; Vnovo=V·(1+p) no acréscimo
- **Marcas da fórmula:** c1→V; c2→p; c3→fator; c4→índice.
- **Definições:**
  - “Desconto mantém 1−p do valor.”
  - “Acréscimo multiplica por 1+p.”
  - “Variações sucessivas multiplicam fatores.”
- **Paco (abertura):** “Cada percentual age no valor corrente; por isso variações sucessivas se multiplicam.”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você aplicou percentuais ao valor corrente; fatores sucessivos não se cancelam automaticamente.”

## i) Treino pós-aula

### Fáceis

#### F1 — `descontos-acrescimos-e-indices-f1`
- **Enunciado:** “R$100 recebe desconto de 10%. Preço final?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100·0,9=90.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-f1-a` | R$90 | **sim** | “Certo. 100·0,9=90.” |
| `descontos-acrescimos-e-indices-f1-b` | R$10 | não | “Respondeu o desconto, não o preço final. Resposta: R$90; 100·0,9=90.” |

#### F2 — `descontos-acrescimos-e-indices-f2`
- **Enunciado:** “R$50 aumenta 20%. Valor final?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 50·1,2=60.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-f2-a` | R$60 | **sim** | “Certo. 50·1,2=60.” |
| `descontos-acrescimos-e-indices-f2-b` | R$10 | não | “Deu apenas o acréscimo. Resposta: R$60; 50·1,2=60.” |

#### F3 — `descontos-acrescimos-e-indices-f3`
- **Enunciado:** “Índice vai de 100 a 110. Variação?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (110−100)/100=10%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-f3-a` | 10% | **sim** | “Certo. (110−100)/100=10%.” |
| `descontos-acrescimos-e-indices-f3-b` | 110% | não | “Tomou o índice final como variação. Resposta: 10%; (110−100)/100=10%.” |

#### F4 — `descontos-acrescimos-e-indices-f4`
- **Enunciado:** “R$200 recebe desconto de 25%. Preço final?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 200·0,75=150.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-f4-a` | R$150 | **sim** | “Certo. 200·0,75=150.” |
| `descontos-acrescimos-e-indices-f4-b` | R$50 | não | “Deu somente o valor descontado. Resposta: R$150; 200·0,75=150.” |

### Médias

#### M1 — `descontos-acrescimos-e-indices-m1`
- **Enunciado:** “R$80 aumenta 10%. Valor final?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 80·1,1=88.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-m1-a` | R$88 | **sim** | “Certo. 80·1,1=88.” |
| `descontos-acrescimos-e-indices-m1-b` | R$8 | não | “Deu o acréscimo, não o total. Resposta: R$88; 80·1,1=88.” |

#### M2 — `descontos-acrescimos-e-indices-m2`
- **Enunciado:** “Após desconto de 20%, que parte resta?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100%−20%=80%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-m2-a` | 80% | **sim** | “Certo. 100%−20%=80%.” |
| `descontos-acrescimos-e-indices-m2-b` | 20% | não | “Confundiu desconto com parte restante. Resposta: 80%; 100%−20%=80%.” |

#### M3 — `descontos-acrescimos-e-indices-m3`
- **Enunciado:** “R$100 sobe 10% e depois cai 10%. Final?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100·1,1·0,9=99.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-m3-a` | R$99 | **sim** | “Certo. 100·1,1·0,9=99.” |
| `descontos-acrescimos-e-indices-m3-b` | R$100 | não | “Supôs cancelamento com bases diferentes. Resposta: R$99; 100·1,1·0,9=99.” |

### Desafios

#### D1 — `descontos-acrescimos-e-indices-d1`
- **Enunciado:** “R$200 cai 10% duas vezes. Quanto fica?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 200·0,9²=162.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-d1-a` | R$162 | **sim** | “Certo. 200·0,9²=162.” |
| `descontos-acrescimos-e-indices-d1-b` | R$160 | não | “Somou dois descontos sobre base inicial. Resposta: R$162; 200·0,9²=162.” |

#### D2 — `descontos-acrescimos-e-indices-d2`
- **Enunciado:** “Índice sobe de 120 a 132. Variação?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 12/120=10%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-d2-a` | 10% | **sim** | “Certo. 12/120=10%.” |
| `descontos-acrescimos-e-indices-d2-b` | 12% | não | “Usou aumento sem dividir pela base. Resposta: 10%; 12/120=10%.” |

#### D3 — `descontos-acrescimos-e-indices-d3`
- **Enunciado:** “R$250 recebe acréscimo de 8%. Preço?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 250·1,08=270.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-d3-a` | R$270 | **sim** | “Certo. 250·1,08=270.” |
| `descontos-acrescimos-e-indices-d3-b` | R$258 | não | “Somou R$8, não 8% do preço. Resposta: R$270; 250·1,08=270.” |

#### D4 — `descontos-acrescimos-e-indices-d4`
- **Enunciado:** “Valor sobe 20% e cai 20%. Fator final?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,2·0,8=0,96.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-d4-a` | 0,96 | **sim** | “Certo. 1,2·0,8=0,96.” |
| `descontos-acrescimos-e-indices-d4-b` | 1 | não | “Supôs que variações opostas se cancelam. Resposta: 0,96; 1,2·0,8=0,96.” |

#### D5 — `descontos-acrescimos-e-indices-d5`
- **Enunciado:** “Preço passa de 100 a 150. Aumento percentual?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (150−100)/100=50%.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `descontos-acrescimos-e-indices-d5-a` | 50% | **sim** | “Certo. (150−100)/100=50%.” |
| `descontos-acrescimos-e-indices-d5-b` | 30% | não | “Somou apenas aumento intermediário. Resposta: 50%; (150−100)/100=50%.” |

### Vestibular

> PENDENTE-FONTE: quatro questões reais não foram pesquisadas e conferidas para este capítulo; não foram inventados enunciados, bancas, anos, opções, gabaritos ou URLs.

#### V1 — `pendente-fonte-descontos-acrescimos-e-indices-v1`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V2 — `pendente-fonte-descontos-acrescimos-e-indices-v2`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V3 — `pendente-fonte-descontos-acrescimos-e-indices-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-descontos-acrescimos-e-indices-v4`
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
