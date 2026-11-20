# Plano — Soma de uma PG infinita convergente

**Aula:** 1 — Acréscimos que Encolhem · Soma de PG infinita
**Caminho:** algebra / sequencias / soma-da-pg-infinita
**Pré-requisitos que o aluno já domina:** Termo geral e soma finita de PG; frações simples

## a) Ancoragem mecânica

Entram a₁ e q; sai o total-limite. Cada passo acrescenta a₁qⁿ⁻¹; para |q|<1, os acréscimos encolhem.

## b) Visual de partida

Barras exibem 8,4,2,1,…; uma barra acumulada cresce e o índice acrescenta parcelas.

## c) Caso neutro

Com a₁=0, toda parcela e o total são zero; depois iniciamos com a₁ positivo.

## d) Panorama e recorte

PG finita sempre tem soma; infinita converge só se |q|<1. Aqui observamos o limite, não séries avançadas.

## e) Progressão por contraste

1. Uma parcela: total 8.
2. q=1/2 acrescenta 4,2,1,…
3. O total aproxima 16 sem atingi-lo em finitos passos.
4. q=1 ou q=2 não gera soma finita.

## f) Dedução causal da forma

Sₙ=a₁(1−qⁿ)/(1−q). Se |q|<1, qⁿ→0; logo S∞=a₁/(1−q).

## g) Simulação espacial e fronteiras

A fórmula exige |q|<1. q=1 repete parcelas; q=−1 alterna sem encolher; ambos divergem.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Primeiro termo a₁ | Parcela inicial da PG. |
| c2 | Razão q | Fator que gera a parcela seguinte. |
| c3 | Soma parcial Sₙ | Total das primeiras n parcelas. |
| c4 | Limite S∞ | Valor-limite das somas parciais. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Se a₁=0, alguma parcela seguinte pode ficar positiva? Avance e confira.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Toda PG infinita tem soma finita?” / R: “Não. É preciso que |q|<1.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — q=1/m controla a razão e altura das parcelas; métrica `m`.
- **Sliders:** `m` · “Divisor da razão q=1/m” · 1..4 · passo 1 · inicial 1 · c3.
- **Paco (abertura):** “Com a₁=8 e q=1/2, quanto vale o segundo termo?”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `m ≥ 2`
- **Paco (conclusão):** “Vale 4; cada parcela é metade da anterior.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Com q=1, as parcelas desaparecem?”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Não. Elas ficam iguais e a soma diverge.”
- **Tati (dúvida):** `fim` — P: “Com q=1, as parcelas desaparecem?” / R: “Não. Elas ficam iguais e a soma diverge.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “Com a₁=8 e q=1/2, quanto vale o segundo termo?”
- **Enunciado:** “Calcule a soma infinita 8+4+2+…”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | 16 | **sim** | “Certo. S∞=8/(1−1/2)=16.” | Mostra parcelas decrescentes e barra-limite 16. |
| `erro` | 14 | não | “14 é a soma até 2; a cauda soma 2, total 16.” | Estende a barra com a cauda até 16. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** S∞=a₁/(1−q), somente quando |q|<1
- **Marcas da fórmula:** c1→a₁; c2→q; c3→Sₙ; c4→S∞.
- **Definições:**
  - “Soma parcial: total após n parcelas.”
  - “Convergência: limite finito das somas parciais.”
  - “Condição: |q|<1.”
- **Paco (abertura):** “Como |q|<1 faz qⁿ tender a zero, a soma parcial aproxima a₁/(1−q).”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você viu parcelas encolherem até um limite; a condição |q|<1 é indispensável.”

## i) Treino pós-aula

### Fáceis

#### F1 — `soma-da-pg-infinita-f1`
- **Enunciado:** “PG infinita a₁=8,q=1/2; qual soma?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 8/(1−1/2)=16.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-f1-a` | 16 | **sim** | “Certo. 8/(1−1/2)=16.” |
| `soma-da-pg-infinita-f1-b` | 12 | não | “Parou após duas parcelas. Resposta: 16; 8/(1−1/2)=16.” |

#### F2 — `soma-da-pg-infinita-f2`
- **Enunciado:** “a₁=3,q=0; soma infinita?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3+0+0+…=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-f2-a` | 3 | **sim** | “Certo. 3+0+0+…=3.” |
| `soma-da-pg-infinita-f2-b` | 0 | não | “Confundiu razão zero com primeiro termo zero. Resposta: 3; 3+0+0+…=3.” |

#### F3 — `soma-da-pg-infinita-f3`
- **Enunciado:** “Qual condição dá S∞=a₁/(1−q)?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** qⁿ→0 exige |q|<1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-f3-a` | &#124;q&#124;<1 | **sim** | “Certo. qⁿ→0 exige \|q\|<1.” |
| `soma-da-pg-infinita-f3-b` | q>1 | não | “Tomou crescimento como convergência. Resposta: \|q\|<1; qⁿ→0 exige \|q\|<1.” |

#### F4 — `soma-da-pg-infinita-f4`
- **Enunciado:** “Soma de 4+2+1+…?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 4/(1−1/2)=8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-f4-a` | 8 | **sim** | “Certo. 4/(1−1/2)=8.” |
| `soma-da-pg-infinita-f4-b` | 7 | não | “Somou só três parcelas. Resposta: 8; 4/(1−1/2)=8.” |

### Médias

#### M1 — `soma-da-pg-infinita-m1`
- **Enunciado:** “Soma de 6+3+1,5+…?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 6/(1−1/2)=12.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-m1-a` | 12 | **sim** | “Certo. 6/(1−1/2)=12.” |
| `soma-da-pg-infinita-m1-b` | 10,5 | não | “Parou na terceira parcela. Resposta: 12; 6/(1−1/2)=12.” |

#### M2 — `soma-da-pg-infinita-m2`
- **Enunciado:** “5+1+0,2+…; q=0,2. Qual soma?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5/(1−0,2)=6,25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-m2-a` | 6,25 | **sim** | “Certo. 5/(1−0,2)=6,25.” |
| `soma-da-pg-infinita-m2-b` | 5,2 | não | “Somou apenas duas parcelas. Resposta: 6,25; 5/(1−0,2)=6,25.” |

#### M3 — `soma-da-pg-infinita-m3`
- **Enunciado:** “PG a₁=10,q=−1/2; soma?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 10/(1+1/2)=20/3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-m3-a` | 20/3 | **sim** | “Certo. 10/(1+1/2)=20/3.” |
| `soma-da-pg-infinita-m3-b` | 20 | não | “Ignorou o sinal de q. Resposta: 20/3; 10/(1+1/2)=20/3.” |

### Desafios

#### D1 — `soma-da-pg-infinita-d1`
- **Enunciado:** “7+7+7+… converge?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** q=1; soma parcial cresce sem limite.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-d1-a` | Não | **sim** | “Certo. q=1; soma parcial cresce sem limite.” |
| `soma-da-pg-infinita-d1-b` | Sim, vale 7 | não | “Supôs parcelas constantes tendendo a zero. Resposta: Não; q=1; soma parcial cresce sem limite.” |

#### D2 — `soma-da-pg-infinita-d2`
- **Enunciado:** “PG a₁=12,q=1/3; soma?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 12/(1−1/3)=18.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-d2-a` | 18 | **sim** | “Certo. 12/(1−1/3)=18.” |
| `soma-da-pg-infinita-d2-b` | 16 | não | “Usou denominador incorreto. Resposta: 18; 12/(1−1/3)=18.” |

#### D3 — `soma-da-pg-infinita-d3`
- **Enunciado:** “2+6+18+… converge?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** q=3; termos crescem.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-d3-a` | Não converge | **sim** | “Certo. q=3; termos crescem.” |
| `soma-da-pg-infinita-d3-b` | 26 | não | “Confundiu soma parcial e infinita. Resposta: Não converge; q=3; termos crescem.” |

#### D4 — `soma-da-pg-infinita-d4`
- **Enunciado:** “a₁=9,q=−1/3; soma?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 9/(1+1/3)=27/4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-d4-a` | 27/4 | **sim** | “Certo. 9/(1+1/3)=27/4.” |
| `soma-da-pg-infinita-d4-b` | 27/2 | não | “Usou |q| no denominador. Resposta: 27/4; 9/(1+1/3)=27/4.” |

#### D5 — `soma-da-pg-infinita-d5`
- **Enunciado:** “a₁=8,q=1/2; quanto falta após três termos?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** S₃=14; S∞=16; falta 2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `soma-da-pg-infinita-d5-a` | 2 | **sim** | “Certo. S₃=14; S∞=16; falta 2.” |
| `soma-da-pg-infinita-d5-b` | 1 | não | “Confundiu próxima parcela e cauda toda. Resposta: 2; S₃=14; S∞=16; falta 2.” |

### Vestibular

> B43 (19/11/2026): as vagas preenchidas abaixo trazem questões de provas oficiais conferidas no PDF e no gabarito oficial (registro em `docs/revisao/vestibular-b43.md`). As vagas PENDENTE-FONTE seguem abertas; nada foi inventado.

#### V1 — `unicamp-2021-pg-1-2x`
- **Enunciado (resumido):** "Os três primeiros termos de uma PG infinita são 1, 2x e −3x + 1, e todos os termos são positivos. Qual é a soma de todos eles?"
- **Fala do Paco:** "Numa PG a razão não muda: 2x/1 = (−3x + 1)/(2x). Fique com a raiz que deixa os termos positivos."
- **Fonte:** Unicamp 2021 (adaptada) — **Adaptação:** 1ª fase, Questão 30: enunciado reescrito como pergunta; alternativas e gabarito oficial (b) mantidos. — **URL:** https://www.comvest.unicamp.br/wp-content/uploads/2021/09/F1-Comentada-Conhec-Gerais-Exatas-Tecno-Humanas-Artes.pdf
- **Conta de conferência:** 4x² + 3x − 1 = 0 ⇒ x = 1/4 (termos positivos) ⇒ razão 1/2 ⇒ soma 1/(1 − 1/2) = 2 (b).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a3-2` | 3/2 | não | "3/2 = 1 + 1/2 soma só os dois primeiros termos. A PG 1, 1/2, 1/4, … tem soma 1/(1 − 1/2) = 2." |
| `a2` | 2 | **sim** | "Isso. 4x² = −3x + 1 dá x = 1/4 ou x = −1; termos positivos pedem x = 1/4, razão 1/2 e soma 1/(1 − 1/2) = 2." |
| `a5-2` | 5/2 | não | "5/2 passa do limite. Com x = 1/4 a razão é 1/2: 1 + 1/2 + 1/4 + … se aproxima de 1/(1 − 1/2) = 2." |
| `a3` | 3 | não | "Com x = 1/4 a razão é 1/2 e a soma é 1/(1 − 1/2) = 2. (x = −1 daria 1, −2, 4: termos negativos e sem soma finita.)" |

#### V2 — `pendente-fonte-soma-da-pg-infinita-v2`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V3 — `pendente-fonte-soma-da-pg-infinita-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-soma-da-pg-infinita-v4`
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
**Notas da implementação (JSON):** `barras` modo `sequencia` (pg, `acumular`, `limite`; passo 2 com `q: "1/$m"`). Passo 1 mostra a₁ = 8 em vez do caso a₁ = 0 do plano (a₁ = 0 virou comentário na abertura). Correções: M2 5,2->6 (5+1); D2 16->36 (dividir por q em vez de 1-q); Tati duplicadas dos passos 3 e fechamento reescritas. Vestibular `[]`.
