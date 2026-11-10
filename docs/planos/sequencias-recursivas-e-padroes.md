# Plano — Padrões e sequências recursivas

**Aula:** 1 — O Próximo Depende do Anterior · Recursão e padrões
**Caminho:** algebra / sequencias / sequencias-recursivas-e-padroes
**Pré-requisitos que o aluno já domina:** Termos de sequência; adição e multiplicação de inteiros

## a) Ancoragem mecânica

Entram termos anteriores e uma regra; sai o próximo termo. Cada saída reutiliza-se como entrada posterior.

## b) Visual de partida

Barras numeradas mostram termos; o aluno avança n e aplica soma, multiplicação ou regra com dois termos.

## c) Caso neutro

Uma regra que repete o termo anterior mantém 5,5,5,…; depois alteramos a regra.

## d) Panorama e recorte

PA e PG são recorrências simples; padrões podem usar vários termos ou alternar operações. Aqui usamos regras curtas.

## e) Progressão por contraste

1. Repetir o anterior conserva 5.
2. Somar 2 cria 3,5,7,9.
3. Somar dois anteriores cria 1,1,2,3,5.
4. Alternar +1 e +2 não mantém diferença única.

## f) Dedução causal da forma

A regra roda por índice. Com a₁=a₂=1 e aₙ=aₙ₋₁+aₙ₋₂, obtemos 2,3,5.

## g) Simulação espacial e fronteiras

Declare todos os termos iniciais necessários. Uma regra de dois termos requer a₁ e a₂; n é inteiro.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Índice n | Passo inteiro da sequência. |
| c2 | Termo anterior | Entrada para gerar o próximo. |
| c3 | Regra recursiva | Instrução sobre termos anteriores. |
| c4 | Novo termo | Saída no passo n. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Se a regra repete 5, qual altura terá a próxima barra? Avance e confira.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Uma recorrência pode usar mais de um termo anterior?” / R: “Sim. Declare todos os inícios que a regra exige.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — avança recorrência e revela a saída no índice n; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c3.
- **Paco (abertura):** “a₁=a₂=1; some os dois anteriores. Quanto é a₃?”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “É 2: a regra soma os dois termos iniciais.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Um termo inicial basta se a regra usar dois termos?”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Não. São necessários dois valores iniciais.”
- **Tati (dúvida):** `fim` — P: “Um termo inicial basta se a regra usar dois termos?” / R: “Não. São necessários dois valores iniciais.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “a₁=a₂=1; some os dois anteriores. Quanto é a₃?”
- **Enunciado:** “a₁=a₂=1; aₙ=aₙ₋₁+aₙ₋₂. Ache a₅.”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | 5 | **sim** | “Certo. Os termos são 1,1,2,3,5.” | Acende as barras 2 e 3 usadas na soma. |
| `erro` | 4 | não | “4 não aplica a regra ao último par; a₅=2+3=5.” | Mostra a₄=3 e acrescenta a₃=2. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** aₙ=F(aₙ₋₁,aₙ₋₂,…), com termos iniciais declarados
- **Marcas da fórmula:** c1→n; c2→termos anteriores; c3→regra F; c4→aₙ.
- **Definições:**
  - “Recorrência: regra a partir de termos anteriores.”
  - “Termos iniciais: valores que iniciam a regra.”
  - “Índice: posição inteira.”
- **Paco (abertura):** “Uma recorrência transforma termos anteriores em novos; regra e valores iniciais determinam a sequência.”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você executou uma regra passo a passo; os termos iniciais e a recorrência determinam o padrão.”

## i) Treino pós-aula

### Fáceis

#### F1 — `sequencias-recursivas-e-padroes-f1`
- **Enunciado:** “Começa em 5 e repete o termo anterior. Qual a₃?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5→5→5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-f1-a` | 5 | **sim** | “Certo. 5→5→5.” |
| `sequencias-recursivas-e-padroes-f1-b` | 10 | não | “Somou sem que a regra mandasse. Resposta: 5; 5→5→5.” |

#### F2 — `sequencias-recursivas-e-padroes-f2`
- **Enunciado:** “Começa em 2 e soma 3. Termos até a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2→5→8→11.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-f2-a` | 2,5,8,11 | **sim** | “Certo. 2→5→8→11.” |
| `sequencias-recursivas-e-padroes-f2-b` | 2,5,9,12 | não | “Somou 4 em um passo. Resposta: 2,5,8,11; 2→5→8→11.” |

#### F3 — `sequencias-recursivas-e-padroes-f3`
- **Enunciado:** “a₁=a₂=1; soma os dois anteriores. Qual a₃?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1+1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-f3-a` | 2 | **sim** | “Certo. 1+1=2.” |
| `sequencias-recursivas-e-padroes-f3-b` | 1 | não | “Copiou um termo em vez de somar ambos. Resposta: 2; 1+1=2.” |

#### F4 — `sequencias-recursivas-e-padroes-f4`
- **Enunciado:** “Alterna +1,+2, começa em 3. Qual a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3→4→6→7.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-f4-a` | 7 | **sim** | “Certo. 3→4→6→7.” |
| `sequencias-recursivas-e-padroes-f4-b` | 6 | não | “Repetiu +1 no segundo passo. Resposta: 7; 3→4→6→7.” |

### Médias

#### M1 — `sequencias-recursivas-e-padroes-m1`
- **Enunciado:** “a₁=a₂=1; soma dois anteriores. Qual a₅?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,1,2,3,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-m1-a` | 5 | **sim** | “Certo. 1,1,2,3,5.” |
| `sequencias-recursivas-e-padroes-m1-b` | 4 | não | “Parou em a₄. Resposta: 5; 1,1,2,3,5.” |

#### M2 — `sequencias-recursivas-e-padroes-m2`
- **Enunciado:** “Começa em 16 e divide por 2. Qual a₅?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 16→8→4→2→1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-m2-a` | 1 | **sim** | “Certo. 16→8→4→2→1.” |
| `sequencias-recursivas-e-padroes-m2-b` | 2 | não | “Fez três divisões em vez de quatro. Resposta: 1; 16→8→4→2→1.” |

#### M3 — `sequencias-recursivas-e-padroes-m3`
- **Enunciado:** “a₁=2; aₙ=2aₙ₋₁+1. Qual a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2→5→11→23.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-m3-a` | 23 | **sim** | “Certo. 2→5→11→23.” |
| `sequencias-recursivas-e-padroes-m3-b` | 11 (corrigido: era 15, que não vem da regra) | não | “11 é a₃. Falta mais um passo: 2·11+1=23.” |

### Desafios

#### D1 — `sequencias-recursivas-e-padroes-d1`
- **Enunciado:** “a₁=2,a₂=5; soma dois anteriores. Qual a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** a₃=7; a₄=5+7=12.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-d1-a` | 12 | **sim** | “Certo. a₃=7; a₄=5+7=12.” |
| `sequencias-recursivas-e-padroes-d1-b` | 10 | não | “Somou só o anterior. Resposta: 12; a₃=7; a₄=5+7=12.” |

#### D2 — `sequencias-recursivas-e-padroes-d2`
- **Enunciado:** “Começa em 10 e subtrai 3. Qual a₅?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 10→7→4→1→−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-d2-a` | −2 | **sim** | “Certo. 10→7→4→1→−2.” |
| `sequencias-recursivas-e-padroes-d2-b` | 1 | não | “Contou três subtrações, não quatro. Resposta: −2; 10→7→4→1→−2.” |

#### D3 — `sequencias-recursivas-e-padroes-d3`
- **Enunciado:** “Começa em 1; alterna ×2,+1. Qual a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1→2→3→6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-d3-a` | 6 | **sim** | “Certo. 1→2→3→6.” |
| `sequencias-recursivas-e-padroes-d3-b` | 5 | não | “Aplicou ×2 duas vezes seguidas. Resposta: 6; 1→2→3→6.” |

#### D4 — `sequencias-recursivas-e-padroes-d4`
- **Enunciado:** “aₙ=aₙ₋₁+aₙ₋₂; quantos inícios precisa?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** a₃ requer a₁ e a₂.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-d4-a` | 2 | **sim** | “Certo. a₃ requer a₁ e a₂.” |
| `sequencias-recursivas-e-padroes-d4-b` | 1 | não | “Esqueceu que consulta dois termos. Resposta: 2; a₃ requer a₁ e a₂.” |

#### D5 — `sequencias-recursivas-e-padroes-d5`
- **Enunciado:** “Começa em 1 e dobra. Em qual n aparece 16?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1,2,4,8,16; n=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-recursivas-e-padroes-d5-a` | 5 | **sim** | “Certo. 1,2,4,8,16; n=5.” |
| `sequencias-recursivas-e-padroes-d5-b` | 4 | não | “Contou avanços, não a posição inicial. Resposta: 5; 1,2,4,8,16; n=5.” |

### Vestibular

> PENDENTE-FONTE: quatro questões reais não foram pesquisadas e conferidas para este capítulo; não foram inventados enunciados, bancas, anos, opções, gabaritos ou URLs.

#### V1 — `pendente-fonte-sequencias-recursivas-e-padroes-v1`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V2 — `pendente-fonte-sequencias-recursivas-e-padroes-v2`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V3 — `pendente-fonte-sequencias-recursivas-e-padroes-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-sequencias-recursivas-e-padroes-v4`
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
**Notas da implementação (JSON):** o modo `recorrencia` do widget cobre só **um** termo anterior (aₙ₊₁ = q·aₙ + d); regras de dois termos (Fibonacci) não existem. Passos 1 e 2 usam `recorrencia` (repetir; somar 2, e=2 do plano); passo 3, desafio e fechamento mostram Fibonacci estático em `categorias` (passo 3 conclui por `barras_tocadas ≥ 3`, não por avançar n). Slider n do passo 2 em c1 (índice), não c3 como no plano. Correção: M3 distrator 15 virou 11. Tati/abertura duplicadas do plano reescritas. Vestibular `[]`.
