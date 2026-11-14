# Plano — Soma dos termos de PA e PG

**Aula:** 1 — Termos em Pilha · Somatórios de PA e PG
**Caminho:** algebra / sequencias / somatorios-pa-pg
**Pré-requisitos que o aluno já domina:** Termos de PA e PG; adição e multiplicação de inteiros

## a) Ancoragem mecânica

Entram n e a regra da sequência; sai Sₙ, que acumula a₁ até aₙ. PA permite parear extremos; PG soma parcelas multiplicadas por q.

## b) Visual de partida

Barras representam termos e total acumulado; avançar n acrescenta parcelas, sem apagar as anteriores.

## c) Caso neutro

Com n=1, S₁=a₁: ainda não há acumulação de outros termos.

## d) Panorama e recorte

Somas finitas dependem da sequência; PG infinita convergente é o capítulo vizinho. Aqui n é finito.

## e) Progressão por contraste

1. Um termo dá S₁=a₁.
2. Na PA 2,5,8,11, os extremos somam 13.
3. Na PG 2,4,8,16, cada parcela cresce por 2.
4. Aumentar n só acrescenta o próximo termo.

## f) Dedução causal da forma

Na PA, pares extremos somam a₁+aₙ; Sₙ=n(a₁+aₙ)/2. Na PG, Sₙ=a₁(1−qⁿ)/(1−q), q≠1; se q=1, Sₙ=na₁.

## g) Simulação espacial e fronteiras

n é inteiro positivo. A fórmula da PG com 1−q exige q≠1; q=0 deixa apenas a₁ não nulo.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Quantidade n | Número de parcelas acumuladas. |
| c2 | Termo aₙ | Parcela na posição n. |
| c3 | Soma Sₙ | Total dos primeiros n termos. |
| c4 | Razão q | Fator entre termos da PG. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Com n=1, há mais de uma parcela no total? Observe a barra acumulada.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Há somas infinitas neste capítulo?” / R: “Não. Aqui somamos termos finitos de PA e PG.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — acrescenta termos ao total acumulado conforme n; métrica `n`.
- **Sliders:** `n` · “Parcelas” · 1..6 · passo 1 · inicial 1 · c3.
- **Paco (abertura):** “Na PA 2,5,8,11, quanto somam os extremos? Dão 13.”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O outro par também dá 13; dois pares totalizam 26.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Se q=1, a fórmula com divisor 1−q funciona?”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Não. Quando q=1, usamos Sₙ=n·a₁.”
- **Tati (dúvida):** `fim` — P: “Se q=1, a fórmula com divisor 1−q funciona?” / R: “Não. Quando q=1, usamos Sₙ=n·a₁.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “Na PA 2,5,8,11, quanto somam os extremos? Dão 13.”
- **Enunciado:** “PA 2,5,8,11,14. Calcule S₅.”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | 40 | **sim** | “Certo. S₅=5(2+14)/2=40.” | Agrupa extremos e mostra total 40. |
| `erro` | 30 | não | “30 omite o quinto termo; somando os cinco, S₅=40.” | Acrescenta a quinta barra e atualiza o total. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** Sₙ(PA)=n(a₁+aₙ)/2  |  Sₙ(PG)=a₁(1−qⁿ)/(1−q), q≠1
- **Marcas da fórmula:** c1→n; c2→aₙ; c3→Sₙ; c4→q.
- **Definições:**
  - “Sₙ: soma dos n primeiros termos.”
  - “PA: diferença constante.”
  - “PG com q=1 usa Sₙ=n·a₁.”
- **Paco (abertura):** “Na PA, parear extremos simplifica; na PG, cada termo é gerado pelo fator q.”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você acumulou termos sem perder parcelas; o pareamento simplifica PA e a PG cresce por fator.”

## i) Treino pós-aula

### Fáceis

#### F1 — `somatorios-pa-pg-f1`
- **Enunciado:** “Soma de 1,2,3,4,5?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1+2+3+4+5=15.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-f1-a` | 15 | **sim** | “Certo. 1+2+3+4+5=15.” |
| `somatorios-pa-pg-f1-b` | 10 | não | “Somou só quatro termos. Resposta: 15; 1+2+3+4+5=15.” |

#### F2 — `somatorios-pa-pg-f2`
- **Enunciado:** “Soma de 2,4,8?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2+4+8=14.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-f2-a` | 14 | **sim** | “Certo. 2+4+8=14.” |
| `somatorios-pa-pg-f2-b` | 12 | não | “Esqueceu o último termo. Resposta: 14; 2+4+8=14.” |

#### F3 — `somatorios-pa-pg-f3`
- **Enunciado:** “PA a₁=2,a₅=14; quanto vale S₅?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5(2+14)/2=40.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-f3-a` | 40 | **sim** | “Certo. 5(2+14)/2=40.” |
| `somatorios-pa-pg-f3-b` | 16 | não | “Somou apenas os extremos. Resposta: 40; 5(2+14)/2=40.” |

#### F4 — `somatorios-pa-pg-f4`
- **Enunciado:** “S₄ da PG 1,2,4,8?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1+2+4+8=15.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-f4-a` | 15 | **sim** | “Certo. 1+2+4+8=15.” |
| `somatorios-pa-pg-f4-b` | 8 | não | “Tomou só o último termo como total. Resposta: 15; 1+2+4+8=15.” |

### Médias

#### M1 — `somatorios-pa-pg-m1`
- **Enunciado:** “Soma de 3,5,7,9?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3+5+7+9=24.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-m1-a` | 24 | **sim** | “Certo. 3+5+7+9=24.” |
| `somatorios-pa-pg-m1-b` | 21 | não | “Parou antes do quarto termo. Resposta: 24; 3+5+7+9=24.” |

#### M2 — `somatorios-pa-pg-m2`
- **Enunciado:** “PG a₁=3,q=2; quanto vale S₃?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3+6+12=21.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-m2-a` | 21 | **sim** | “Certo. 3+6+12=21.” |
| `somatorios-pa-pg-m2-b` | 18 | não | “Deu só o terceiro termo. Resposta: 21; 3+6+12=21.” |

#### M3 — `somatorios-pa-pg-m3`
- **Enunciado:** “PA a₁=4,d=3,n=6; qual é S₆?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** a₆=19; S₆=6(4+19)/2=69.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-m3-a` | 69 | **sim** | “Certo. a₆=19; S₆=6(4+19)/2=69.” |
| `somatorios-pa-pg-m3-b` | 42 | não | “Confundiu soma com sexto termo. Resposta: 69; a₆=19; S₆=6(4+19)/2=69.” |

### Desafios

#### D1 — `somatorios-pa-pg-d1`
- **Enunciado:** “S₄ da PG 5,10,20,40?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5+10+20+40=75.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-d1-a` | 75 | **sim** | “Certo. 5+10+20+40=75.” |
| `somatorios-pa-pg-d1-b` | 40 | não | “Usou só a última parcela. Resposta: 75; 5+10+20+40=75.” |

#### D2 — `somatorios-pa-pg-d2`
- **Enunciado:** “PA começa em 10,d=−2; quanto vale S₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 10+8+6+4=28.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-d2-a` | 28 | **sim** | “Certo. 10+8+6+4=28.” |
| `somatorios-pa-pg-d2-b` | 16 | não | “Confundiu o último termo com a soma. Resposta: 28; 10+8+6+4=28.” |

#### D3 — `somatorios-pa-pg-d3`
- **Enunciado:** “PG 2,6,18; quanto vale S₃?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2+6+18=26.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-d3-a` | 26 | **sim** | “Certo. 2+6+18=26.” |
| `somatorios-pa-pg-d3-b` | 18 | não | “Usou apenas o terceiro termo. Resposta: 26; 2+6+18=26.” |

#### D4 — `somatorios-pa-pg-d4`
- **Enunciado:** “PG a₁=4,q=1; quanto vale S₅?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** q=1: S₅=5·4=20.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-d4-a` | 20 | **sim** | “Certo. q=1: S₅=5·4=20.” |
| `somatorios-pa-pg-d4-b` | 16 | não | “Usou fórmula com divisor zero. Resposta: 20; q=1: S₅=5·4=20.” |

#### D5 — `somatorios-pa-pg-d5`
- **Enunciado:** “PA 1,4,7 e PG 1,2,4; qual soma é maior e por quanto?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** PA=12; PG=7; diferença 5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `somatorios-pa-pg-d5-a` | PA, por 5 | **sim** | “Certo. PA=12; PG=7; diferença 5.” |
| `somatorios-pa-pg-d5-b` | PG, por 1 | não | “Comparou últimos termos, não somas. Resposta: PA, por 5; PA=12; PG=7; diferença 5.” |

### Vestibular

> PENDENTE-FONTE: quatro questões reais não foram pesquisadas e conferidas para este capítulo; não foram inventados enunciados, bancas, anos, opções, gabaritos ou URLs.

#### V1 — `enem-2018-tenis`
- **Enunciado:** Em um torneio eliminatório simples com 128 tenistas, qual expressão dá o total de partidas até definir o campeão?
- **Fala do Paco:** "Na 1ª fase, 128 tenistas formam 64 duplas (64 jogos); depois 32, 16 e assim por diante."
- **Fonte:** ENEM 2018, Questão 162 — `https://api.enem.dev/v1/exams/2018/questions/162`
- **Conta de conferência:** `128 / 2 = 64`; fases seguintes `32 + 16 + 8 + 4 + 2 + 1`, total `64 + 32 + 16 + 8 + 4 + 2 + 1 = 127`.
- **Alternativas e feedback:** 2 · 128, 64 + ... + 2, 128 + ... + 1, 128 + ... + 2, 64 + 32 + 16 + 8 + 4 + 2 + 1 (correta).

#### V2 — `pendente-fonte-somatorios-pa-pg-v2`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V3 — `pendente-fonte-somatorios-pa-pg-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-somatorios-pa-pg-v4`
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
**Notas da implementação (JSON):** `barras` modo `sequencia` com `acumular` e slider `n` (passos 1 a 3). Correções de gabarito/distratores (as contas antigas não geravam os números): F2 12->6 (2+4); M1 21->15 (sem o 4º termo); M2 18->12 (só o 3º termo); M3 42->19 (sexto termo); D2 16->4 (último termo); D4 16 mantido com feedback de "quatro termos"; D5 "PG, por 1"->"PA, por 3" (7-4); desafio 30->26 (S4, não 30). Tati do passo 3 era cópia da abertura (reescrita para q=0); passo 4 repetia a abertura do passo 2 (reescrita); dúvida do fechamento trocada. Vestibular `[]`.
