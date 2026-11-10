# Plano — Matemática financeira

**Aula:** 1 — Juro Sobre Juro · Juros simples e compostos
**Caminho:** aritmetica / proporcionalidade / matematica-financeira
**Pré-requisitos que o aluno já domina:** Porcentagem como fração de 100; fator multiplicativo

## a) Ancoragem mecânica

Entram capital C, taxa i por período e duração t; sai o montante M. No simples a parcela usa C; no composto a base é o saldo atualizado.

## b) Visual de partida

Barras começam em C=100; controles de taxa e períodos separam capital e juros acumulados.

## c) Caso neutro

Em t=0, M=C. Com i=0 o saldo também permanece C.

## d) Panorama e recorte

Porcentagem sustenta juros simples e compostos; descontos e inflação são capítulos vizinhos. Aqui não tratamos anuidades.

## e) Progressão por contraste

1. t=0 mantém o capital.
2. A 10%, ambos chegam a 110 após um período.
3. Simples soma 10; composto rende 11 no segundo período.
4. Taxa e tempo precisam da mesma unidade.

## f) Dedução causal da forma

Simples: J=C·i·t e M=C(1+i·t). Composto: M=C(1+i)ᵗ, pois o fator age em cada saldo.

## g) Simulação espacial e fronteiras

t inteiro não negativo; C≥0 e i por período. Tarifas e contratos ficam fora.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Capital C | Saldo inicial. |
| c2 | Taxa i | Fração aplicada em cada período. |
| c3 | Período t | Número de aplicações da taxa. |
| c4 | Montante M | Capital mais juros ao final. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Em t=0, o saldo já ganhou juros? Avance o tempo e confira.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Taxas e descontos aparecem no mesmo modelo?” / R: “Usam fatores percentuais; hoje isolamos juros simples e compostos.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — aplica taxa por período e atualiza o saldo; métrica `t`.
- **Sliders:** `t` · “Períodos” · 0..5 · passo 1 · inicial 0 · c3.
- **Paco (abertura):** “R$100 a 10% simples rende quanto no primeiro período?”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `t ≥ 2`
- **Paco (conclusão):** “Rende R$10; a base continua sendo o capital inicial.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “No composto, após um período, a taxa incide em 100 ou 110?”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Incide em 110; o saldo atualizado vira a nova base.”
- **Tati (dúvida):** `fim` — P: “No composto, após um período, a taxa incide em 100 ou 110?” / R: “Incide em 110; o saldo atualizado vira a nova base.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “R$100 a 10% simples rende quanto no primeiro período?”
- **Enunciado:** “R$100 a 10% composto por dois períodos. Qual montante?”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | R$121 | **sim** | “Certo. 100·1,1²=121; o segundo juro incide em 110.” | Mostra 100→110→121. |
| `erro` | R$120 | não | “R$120 é simples; composto dá 100·1,1²=121.” | Compara juros 10 e 11 até 121. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** J=C·i·t; Mₛ=C(1+i·t); M꜀=C(1+i)ᵗ
- **Marcas da fórmula:** c1→C; c2→i; c3→t; c4→M.
- **Definições:**
  - “Simples: taxa incide no capital inicial.”
  - “Composto: taxa incide no saldo atualizado.”
  - “Montante: capital acrescido de juros.”
- **Paco (abertura):** “No simples a parcela usa C; no composto 1+i age no saldo. Por isso as fórmulas diferem.”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você comparou parcela fixa e fator reaplicado; os saldos coincidem no primeiro período e se separam depois.”

## i) Treino pós-aula

### Fáceis

#### F1 — `matematica-financeira-f1`
- **Enunciado:** “Sem períodos transcorridos, quanto vale M se C=100?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** t=0; M=C=100.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-f1-a` | 100 | **sim** | “Certo. t=0; M=C=100.” |
| `matematica-financeira-f1-b` | 110 | não | “Acrescentou juros antes do tempo. Resposta: 100; t=0; M=C=100.” |

#### F2 — `matematica-financeira-f2`
- **Enunciado:** “Quanto é 10% de R$100?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0,10·100=10.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-f2-a` | R$10 | **sim** | “Certo. 0,10·100=10.” |
| `matematica-financeira-f2-b` | R$1 | não | “Dividiu por 100 duas vezes. Resposta: R$10; 0,10·100=10.” |

#### F3 — `matematica-financeira-f3`
- **Enunciado:** “R$100 a 10% simples por 2 períodos. Qual montante?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** J=100·0,1·2=20; M=120.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-f3-a` | R$120 | **sim** | “Certo. J=100·0,1·2=20; M=120.” |
| `matematica-financeira-f3-b` | R$121 | não | “Usou capitalização composta. Resposta: R$120; J=100·0,1·2=20; M=120.” |

#### F4 — `matematica-financeira-f4`
- **Enunciado:** “R$100 a 10% composto por 2 períodos. Montante?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100·1,1²=121.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-f4-a` | R$121 | **sim** | “Certo. 100·1,1²=121.” |
| `matematica-financeira-f4-b` | R$120 | não | “Manteve a base inicial em vez de atualizar. Resposta: R$121; 100·1,1²=121.” |

### Médias

#### M1 — `matematica-financeira-m1`
- **Enunciado:** “R$200 rende 5% simples em um período. Juro?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 200·0,05=10.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-m1-a` | R$10 | **sim** | “Certo. 200·0,05=10.” |
| `matematica-financeira-m1-b` | R$5 | não | “Confundiu percentual com valor em reais. Resposta: R$10; 200·0,05=10.” |

#### M2 — `matematica-financeira-m2`
- **Enunciado:** “R$50 a 20% simples por 3 períodos. Montante?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** J=50·0,2·3=30; M=80.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-m2-a` | R$80 | **sim** | “Certo. J=50·0,2·3=30; M=80.” |
| `matematica-financeira-m2-b` | R$65 | não | “Calculou somente um período. Resposta: R$80; J=50·0,2·3=30; M=80.” |

#### M3 — `matematica-financeira-m3`
- **Enunciado:** “R$200 a 5% composto por 2 períodos. Montante?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 200·1,05²=220,50.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-m3-a` | R$220,50 | **sim** | “Certo. 200·1,05²=220,50.” |
| `matematica-financeira-m3-b` | R$220 | não | “Usou juro simples no segundo período. Resposta: R$220,50; 200·1,05²=220,50.” |

### Desafios

#### D1 — `matematica-financeira-d1`
- **Enunciado:** “R$100 a 10% composto por 3 períodos. Montante?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100·1,1³=133,10.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-d1-a` | R$133,10 | **sim** | “Certo. 100·1,1³=133,10.” |
| `matematica-financeira-d1-b` | R$130 | não | “Somou 10 três vezes na base inicial. Resposta: R$133,10; 100·1,1³=133,10.” |

#### D2 — `matematica-financeira-d2`
- **Enunciado:** “R$300 a 4% simples por 5 períodos. Juros?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 300·0,04·5=60.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-d2-a` | R$60 | **sim** | “Certo. 300·0,04·5=60.” |
| `matematica-financeira-d2-b` | R$12 | não | “Calculou apenas um período. Resposta: R$60; 300·0,04·5=60.” |

#### D3 — `matematica-financeira-d3`
- **Enunciado:** “Saldo 100 cresce 10% composto. Juro no segundo período?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0,10·110=11.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-d3-a` | R$11 | **sim** | “Certo. 0,10·110=11.” |
| `matematica-financeira-d3-b` | R$10 | não | “Aplicou 10% em 100, não em 110. Resposta: R$11; 0,10·110=11.” |

#### D4 — `matematica-financeira-d4`
- **Enunciado:** “Após 2 períodos a 10%, simples e composto diferem quanto em C=100?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Mₛ=120; M꜀=121; diferença 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-d4-a` | R$1 | **sim** | “Certo. Mₛ=120; M꜀=121; diferença 1.” |
| `matematica-financeira-d4-b` | R$0 | não | “Supôs que continuam iguais após o primeiro. Resposta: R$1; Mₛ=120; M꜀=121; diferença 1.” |

#### D5 — `matematica-financeira-d5`
- **Enunciado:** “R$100 perde 10% do saldo por período. Saldo após 2?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 100·0,9²=81.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `matematica-financeira-d5-a` | R$81 | **sim** | “Certo. 100·0,9²=81.” |
| `matematica-financeira-d5-b` | R$80 | não | “Subtraiu R$10 fixos em cada etapa. Resposta: R$81; 100·0,9²=81.” |

### Vestibular

> PENDENTE-FONTE: quatro questões reais não foram pesquisadas e conferidas para este capítulo; não foram inventados enunciados, bancas, anos, opções, gabaritos ou URLs.

#### V1 — `pendente-fonte-matematica-financeira-v1`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V2 — `pendente-fonte-matematica-financeira-v2`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V3 — `pendente-fonte-matematica-financeira-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-matematica-financeira-v4`
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
**Notas da implementação (JSON):** `barras` modo `sequencia` (nome "M"): simples = PA a1 100 d 10; composto = PG a1 100 q 1,1 com o simples como `fantasma`; slider `t` 0..5 mapeado em `n: "1+$t"` (a barra 1 é t = 0, pois o widget indexa de 1). Correções: M2 distrator 65->60 (um período); passo 3 trocou a Tati duplicada por taxa/tempo na mesma unidade; fechamento com Tati nova; passo 3 conclui em t >= 2 (o segundo período) em vez de n >= 5. Vestibular `[]`.
