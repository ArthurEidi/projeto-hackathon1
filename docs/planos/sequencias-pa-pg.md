# Plano — Sequências, PA e PG

**Aula:** 1 — Degraus que Somam e Multiplicam · Progressões aritmética e geométrica
**Caminho:** algebra / sequencias / sequencias-pa-pg
**Pré-requisitos que o aluno já domina:** Função como entrada e índice; operações com inteiros e frações simples

## a) Ancoragem mecânica

A entrada independente é o índice inteiro n; a saída dependente é o termo aₙ. A PA soma d a cada passo; a PG multiplica o termo atual por q.

## b) Visual de partida

Barras discretas mostram termos nos índices 1–5; controles mudam a₁, d ou q e alternam PA/PG. Não ligamos índices intermediários.

## c) Caso neutro

Na PA d=0 e na PG q=1, 4,4,4,… fica parada; depois mudamos uma regra por vez.

## d) Panorama e recorte

Há também recorrências e somatórios. Aqui identificamos PA/PG e avançamos termos; somas ficam para os capítulos seguintes.

## e) Progressão por contraste

1. PA 1,3,5,7 soma 2: diferenças iguais.
2. PG 1,2,4,8 multiplica por 2: quocientes iguais.
3. d=0 e q=1 dão constante por mecanismos distintos.
4. d<0 faz PA descer; q<0 alterna sinais.

## f) Dedução causal da forma

PA: aₙ=a₁+(n−1)d, pois somamos d n−1 vezes. PG: aₙ=a₁qⁿ⁻¹, pois reaplicamos q.

## g) Simulação espacial e fronteiras

n é inteiro positivo. Teste d=0, q=1, q=0, q<0 e a₁=0; com a₁=0, toda PG fica zero.

## h) Roteiro da aula

**Glossário da aula:**

| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Índice n | Posição inteira que escolhe o termo. |
| c2 | Termo aₙ | Valor da sequência na posição n. |
| c3 | Diferença d | Parcela somada em cada avanço da PA. |
| c4 | Razão q | Fator de cada avanço da PG. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (mecanismo), 2 (visual), 3 (neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: barras — desenha cinco colunas nos índices 1–5; o controle de regra altera alturas, sem ligar índices intermediários; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..5 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Com d=0 ou q=1, a próxima barra muda ou fica igual? Avance e confira.”
- **Interação do aluno:** arrasta n de 1 a 4; cada coluna mostra o termo e as anteriores ficam visíveis.
- **Conclusão:** `n ≥ 4`
- **Paco (conclusão):** “O caso neutro mantém o valor; as barras ficam na mesma altura.”
- **Tati (dúvida):** `fim` — P: “Há outras ideias além de PA e PG?” / R: “Sim. Hoje comparamos essas duas regras; as demais vêm depois.”

### Passo 2 — `contraste-de-regras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (entrada/saída), 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: barras — desenha a PA discreta e atualiza cada termo ao mudar d; métrica `d`.
- **Sliders:** `d` · “Diferença da PA” · −2..4 · passo 1 · inicial 0 · c3.
- **Paco (abertura):** “Na PA 1,3,5, quanto sobe por passo? Ajuste d.”
- **Interação do aluno:** move o controle; compara a barra nova com a referência anterior.
- **Conclusão:** `d ≥ 2`
- **Paco (conclusão):** “Com d=2, cada passo soma 2; na PG o avanço multiplica.”

### Passo 3 — `teste-de-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 7 (fronteira)
- **Widget:** WIDGET NOVO: barras — exibe termos discretos e a fronteira; aluno avança o índice ou ajusta a razão; métrica `n`.
- **Sliders:** `n` · “Índice” · 1..6 · passo 1 · inicial 1 · c1.
- **Paco (abertura):** “Se q=−1, a PG mantém sinal ou alterna? Avance até n=5.”
- **Interação do aluno:** avança n; figura destaca quando a condição deixa de valer ou requer mais dados iniciais.
- **Conclusão:** `n ≥ 5`
- **Paco (conclusão):** “Os sinais alternam e o módulo permanece.”
- **Tati (dúvida):** `fim` — P: “Se q=−1, a PG mantém sinal ou alterna? Avance até n=5.” / R: “Os sinais alternam e o módulo permanece.”

### Passo 4 — `micro-desafio`
- **Tipo:** `micro_challenge`
- **Pilares:** 5 (contraste), 6 (dedução), 7 (fronteira)
- **Figura:** WIDGET NOVO: barras — estado inicial mostra parcelas e regra; cada opção atualiza destaque, total e erro típico; métrica: resposta certa.
- **Paco (abertura):** “Na PA 1,3,5, quanto sobe por passo? Ajuste d.”
- **Enunciado:** “PA a₁=4,d=−2. Determine a₅.”

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `acerto` | −4 | **sim** | “Certo. Quatro passos dão 4−8=−4.” | Destaca quatro passos descendentes até −4. |
| `erro` | −6 | não | “Contou cinco avanços; são quatro, então a₅=−4.” | Mostra cinco passos e apaga o avanço extra. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1–7 (síntese)
- **Figura:** WIDGET NOVO: barras — mantém os valores-base e a regra; tocar uma marca destaca a grandeza correspondente.
- **Fórmula:** aₙ=a₁+(n−1)d  |  aₙ=a₁·qⁿ⁻¹
- **Marcas da fórmula:** c1→n; c2→aₙ; c3→d; c4→q.
- **Definições:**
  - “PA: diferença entre vizinhos constante.”
  - “PG: quociente entre vizinhos constante.”
  - “n: índice inteiro positivo.”
- **Paco (abertura):** “PA soma diferença fixa; PG reaplica razão fixa. Por isso seus termos obedecem regras diferentes.”
- **Dica (hint):** “Toque em uma marca para ver a grandeza correspondente nas barras.”
- **Tati (dúvida):** `início` — P: “O que determina a saída?” / R: “A entrada e a regra de avanço determinam cada termo.”

**Frase de encerramento (outro):** “Você comparou soma fixa e fator fixo; por isso PA e PG avançam por mecanismos diferentes.”

## i) Treino pós-aula

### Fáceis

#### F1 — `sequencias-pa-pg-f1`
- **Enunciado:** “Próximo termo da PA 2,5,8?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** d=3; 8+3=11.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-f1-a` | 11 | **sim** | “Certo. d=3; 8+3=11.” |
| `sequencias-pa-pg-f1-b` | 10 | não | “Somou 2, não 3. Resposta: 11; d=3; 8+3=11.” |

#### F2 — `sequencias-pa-pg-f2`
- **Enunciado:** “Próximo termo da PG 3,6,12?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** q=2; 12·2=24.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-f2-a` | 24 | **sim** | “Certo. q=2; 12·2=24.” |
| `sequencias-pa-pg-f2-b` | 18 | não | “Somou 6 em vez de multiplicar por 2. Resposta: 24; q=2; 12·2=24.” |

#### F3 — `sequencias-pa-pg-f3`
- **Enunciado:** “PA a₁=4,d=2; quanto vale a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 4+3·2=10.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-f3-a` | 10 | **sim** | “Certo. 4+3·2=10.” |
| `sequencias-pa-pg-f3-b` | 12 | não | “Contou quatro avanços, mas são três. Resposta: 10; 4+3·2=10.” |

#### F4 — `sequencias-pa-pg-f4`
- **Enunciado:** “PG a₁=2,q=3; quanto vale a₃?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2·3²=18.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-f4-a` | 18 | **sim** | “Certo. 2·3²=18.” |
| `sequencias-pa-pg-f4-b` | 6 | não | “Parou no segundo termo. Resposta: 18; 2·3²=18.” |

### Médias

#### M1 — `sequencias-pa-pg-m1`
- **Enunciado:** “7,5,3,1 é PA? Qual d?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5−7=−2 e 3−5=−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-m1-a` | Sim, −2 | **sim** | “Certo. 5−7=−2 e 3−5=−2.” |
| `sequencias-pa-pg-m1-b` | Sim, 2 | não | “Leu a queda como positiva. Resposta: Sim, −2; 5−7=−2 e 3−5=−2.” |

#### M2 — `sequencias-pa-pg-m2`
- **Enunciado:** “PG a₁=16,q=1/2; quanto vale a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 16→8→4→2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-m2-a` | 2 | **sim** | “Certo. 16→8→4→2.” |
| `sequencias-pa-pg-m2-b` | 4 | não | “Fez dois avanços; são três. Resposta: 2; 16→8→4→2.” |

#### M3 — `sequencias-pa-pg-m3`
- **Enunciado:** “PA a₁=3,d=4; qual é a₆?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3+5·4=23.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-m3-a` | 23 | **sim** | “Certo. 3+5·4=23.” |
| `sequencias-pa-pg-m3-b` | 27 (corrigido: era 24, que não vem de seis somas de 4) | não | “Somou seis vezes em vez de cinco: 3+6·4=27. Resposta: 23; 3+5·4=23.” |

### Desafios

#### D1 — `sequencias-pa-pg-d1`
- **Enunciado:** “PG a₁=5,q=−2; qual é a₄?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5·(−2)³=−40.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-d1-a` | −40 | **sim** | “Certo. 5·(−2)³=−40.” |
| `sequencias-pa-pg-d1-b` | 40 | não | “Ignorou o sinal da razão. Resposta: −40; 5·(−2)³=−40.” |

#### D2 — `sequencias-pa-pg-d2`
- **Enunciado:** “4,4,4,… pode ser PA e PG?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Diferença 0; quociente 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-d2-a` | Sim: d=0 e q=1 | **sim** | “Certo. Diferença 0; quociente 1.” |
| `sequencias-pa-pg-d2-b` | Não, só PA | não | “Supôs uma única regra para o mesmo padrão. Resposta: Sim: d=0 e q=1; Diferença 0; quociente 1.” |

#### D3 — `sequencias-pa-pg-d3`
- **Enunciado:** “PA a₁=10,d=−3; em qual n o termo é 1?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 10+(n−1)(−3)=1; n=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-d3-a` | 4 | **sim** | “Certo. 10+(n−1)(−3)=1; n=4.” |
| `sequencias-pa-pg-d3-b` | 3 | não | “Contou dois, não três, avanços. Resposta: 4; 10+(n−1)(−3)=1; n=4.” |

#### D4 — `sequencias-pa-pg-d4`
- **Enunciado:** “PG a₁=81,q=1/3; quanto vale a₅?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 81→27→9→3→1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-d4-a` | 1 | **sim** | “Certo. 81→27→9→3→1.” |
| `sequencias-pa-pg-d4-b` | 3 | não | “Errou a quarta divisão por 3. Resposta: 1; 81→27→9→3→1.” |

#### D5 — `sequencias-pa-pg-d5`
- **Enunciado:** “PA começa 2,d=0; PG começa 2,q=0. Termos 1–3?”
- **Figura (opcional):** nenhuma
- **Conta de conferência:** PA soma zero; PG multiplica por zero.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `sequencias-pa-pg-d5-a` | PA: 2,2,2; PG: 2,0,0 | **sim** | “Certo. PA soma zero; PG multiplica por zero.” |
| `sequencias-pa-pg-d5-b` | Ambas 2,2,2 | não | “Tratou q=0 como q=1. Resposta: PA: 2,2,2; PG: 2,0,0; PA soma zero; PG multiplica por zero.” |

### Vestibular

> PENDENTE-FONTE: quatro questões reais não foram pesquisadas e conferidas para este capítulo; não foram inventados enunciados, bancas, anos, opções, gabaritos ou URLs.

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2018-postes`
- **Enunciado (resumido):** "Postes são colocados em PA a partir de 80 m, de 20 em 20 m, até 1 380 m. A R$ 8 000 por poste, qual o gasto máximo?"
- **Fala do Paco:** "Conte os postes com 1 380 = 80 + (n − 1) · 20 e multiplique por R$ 8 000."
- **Fonte:** ENEM 2018 (adaptada) — **Adaptação:** Questão 141: enunciado resumido; alternativas e gabarito (R$ 528 000,00) mantidos. — **URL:** https://api.enem.dev/v1/exams/2018/questions/141
- **Conta de conferência:** `1 380 = 80 + (n − 1)·20 => n = 66`; `66 · 8 000 = R$ 528 000,00`.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a512` | R$ 512 000,00 | não | "512 000 usa 64 postes: contou só os de dentro dos 65 intervalos. Com as duas pontas são 66: R$ 528 000,00." |
| `a520` | R$ 520 000,00 | não | "520 000 usa 65 postes, esquecendo o primeiro poste em 80 m. São 66 postes: R$ 528 000,00." |
| `a528` | R$ 528 000,00 | **sim** | "Isso. 1 380 = 80 + (n − 1)·20 dá n = 66 postes, e 66 · 8 000 = R$ 528 000,00." |
| `a552` | R$ 552 000,00 | não | "552 000 divide 1 380 ÷ 20 = 69 postes sem descontar os 80 m iniciais. O certo é R$ 528 000,00." |
| `a584` | R$ 584 000,00 | não | "584 000 usa 73 postes ((1 380 + 80) ÷ 20), somando 80 m em vez de subtrair. O certo é R$ 528 000,00." |

#### V2 — `enem-2019-autopecas`
- **Enunciado (resumido):** "Bloco (5,4,3,2,1,2,3,4) repete com 1:rolamento, 2:pastilha, 3:direção, 4:catalisador, 5:amortecedor. Qual é o 2 015º item?"
- **Fala do Paco:** "Divida 2 015 pelo tamanho do bloco (8) e use o resto para achar a posição."
- **Fonte:** ENEM 2019 (adaptada) — **Adaptação:** Questão 155: enunciado resumido; alternativas e gabarito (Caixa de direção) mantidos. — **URL:** https://api.enem.dev/v1/exams/2019/questions/155
- **Conta de conferência:** `2 015 = 8 · 251 + 7`; 7º termo do bloco `(5,4,3,2,1,2,3,4)` é `3` (Caixa de direção).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `rol` | Rolamento | não | "Usou bloco de 5 (códigos 1 a 5): 2 015 = 5 · 403 cai no 5º termo, 1. O bloco tem 8: 2 015 = 8 · 251 + 7, termo 3, Caixa de direção." |
| `cat` | Catalisador | não | "Arredondou 2 015 ÷ 8 ≈ 251,9 para 252 blocos e caiu no último termo, 4. São 251 blocos e resto 7: termo 3, Caixa de direção." |
| `amo` | Amortecedor | não | "Amortecedor (5) é a 1ª posição do bloco. Com resto 7 de 2 015 ÷ 8, o 7º termo é Caixa de direção." |
| `pas` | Pastilha de freio | não | "Pastilha (2) é a 4ª ou 6ª posição do bloco. Na 7ª posição (resto 7) está 3: Caixa de direção." |
| `dir` | Caixa de direção | **sim** | "Certo. 2 015 = 8 · 251 + 7, e o 7º termo de (5,4,3,2,1,2,3,4) é 3: Caixa de direção." |

#### V3 — `pendente-fonte-sequencias-pa-pg-v3`
- **Enunciado:** PENDENTE-FONTE; nenhuma questão fictícia criada.
- **Fala do Paco:** PENDENTE-FONTE; preencher após selecionar questão real conferida.
- **Fonte:** PENDENTE-FONTE; banca, ano, URL de enunciado e gabarito oficial não verificados.
- **Conta de conferência:** PENDENTE-FONTE.
- **Alternativas e feedback:** PENDENTE-FONTE; não preencher sem questão e gabarito confirmados.

#### V4 — `pendente-fonte-sequencias-pa-pg-v4`
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
**Notas da implementação (JSON):** `barras` modo `sequencia` (n por slider nos passos 1 e 3; PA com `d` por slider e PG cinza como `fantasma` no passo 2). Correções: o passo 3 tinha a dúvida da Tati igual à abertura/conclusão (reescrita para a₁ ou q zero); a abertura do passo 4 repetia a do passo 2 (reescrita); dúvida do fechamento trocada por "saltar ao termo 100"; M3 distrator 24 virou 27 (seis somas de 4). Vestibular `[]`. Aula-02 provisória removida da taxonomia (decisão do coordenador).
