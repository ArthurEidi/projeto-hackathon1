# Plano — Inequações modulares

**Aula:** 1 — Inequações modulares · Dentro ou fora do alcance
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-modulares
**Pré-requisitos que o aluno já domina:** `funcao-modular`, `conjuntos-e-intervalos`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla x. A distância de x ao centro decide se ele está dentro ou fora de uma região permitida.

## b) Visual de partida

reta_numerica — intervalo −4..4; trecho [0;0] c4; ponto x=1, passo 1; distanciaZero c3.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Raio zero em ∣x∣≤0 deixa só a origem; expandir o raio cria um intervalo fechado.

## d) Panorama e recorte

Distâncias podem ser menores ou maiores que um limite; aqui distinguimos interior, exterior e extremos.

## e) Progressão por contraste

1. Referência visual: Move ao único ponto permitido.
2. Em contraste com a referência: Cruza −2 e entra no trecho interno.
3. Aprofundamento e fronteiras: Sai do centro e alcança o extremo incluído.

## f) Dedução causal da forma

Distância menor que r>0 significa andar menos de r em cada direção: c−r<x<c+r. Distância maior exige o exterior; a igualdade muda somente os extremos.

Fórmula deduzida: ∣x−c∣<r ⇔ c−r<x<c+r, r>0.

## g) Simulação espacial e fronteiras

Com r=0, ∣x−c∣≤0 dá {c}; com r<0 não há solução para ≤. Para ∣x−c∣>0, todos os reais exceto c servem.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Posição testada na reta. |
| c2 | Raio r | Limite da distância permitida. |
| c3 | Distância | Comprimento entre a entrada e o centro. |
| c4 | Região-solução | Interior ou exterior aceito pela comparação. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −4..4; trecho [0;0] c4; ponto x=1, passo 1; distanciaZero c3.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro ∣x∣≤0, o trecho tem largura? Arraste até a origem."
- **Interação do aluno:** Move ao único ponto permitido.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Não; só zero tem distância menor ou igual a zero."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Distâncias podem ser menores ou maiores que um limite; aqui distinguimos interior, exterior e extremos."

### Passo 2 — `abrir-interior`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** reta_numerica — intervalo −4..4; trecho (−2;2) c4, extremos abertos; ponto x=−3, passo 1; distanciaZero c3.
- **Sliders:** nenhum
- **Paco (abertura):** "Em ∣x∣<2, a fronteira 2 entra? Leve o ponto até 0."
- **Interação do aluno:** Cruza −2 e entra no trecho interno.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Não; a distância deve ser menor que 2, por isso −2<x<2."

### Passo 3 — `trocar-para-exterior`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** reta_numerica — intervalo −5..5; trechos (−∞;−2] e [2;+∞) c4; ponto x=0, passo 1; distanciaZero c3.
- **Sliders:** nenhum
- **Paco (abertura):** "Se pedirmos ∣x∣≥2, o centro ainda serve? Arraste até 2."
- **Interação do aluno:** Sai do centro e alcança o extremo incluído.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Não; serve o exterior, incluindo −2 e 2, porque a distância mínima pedida é 2."
- **Tati (dúvida):** `fim` — P: "Por que aparece ou no exterior?" / R: "Cada ponto pode estar à esquerda ou à direita; não precisa ocupar os dois lados."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** reta_figura — intervalo −4..4; marcas −2 e 2 abertas, trecho interno c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual conjunto resolve ∣x∣<2?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | [−2;2] | não | "Você incluiu a igualdade; o certo é (−2;2), com os extremos abertos." | Mostra x=2 com distância 2, fora do trecho. |
| `micro-acerto` | (−2;2) | **sim** | "Certo: (−2;2); A distância deve ser menor que 2." | Destaca (−2;2) e seus dois círculos abertos. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** reta_figura — c=0 em ink, intervalo aberto (−2;2) c4, raio 2 em c2; ponto x=1 e distância 1 em c3.
- **Fórmula:** `∣x`→c1 · `−c∣<r`→c2 · `⇔ c−r<x<c+r`→c4 · `, r>0`
- **Definições:**
  - "Entrada x: Posição testada na reta."
  - "Distância: Comprimento entre a entrada e o centro."
  - "Região-solução: Interior ou exterior aceito pela comparação."
- **Paco (abertura):** "A distância limita o deslocamento nos dois sentidos; por isso o interior fica entre c−r e c+r."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-inequacoes-modulares`
- **Enunciado:** "Em ∣x∣<2, o ponto 2 entra?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣2∣=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-modulares-erro` | Sim | não | "O sinal estrito exclui a fronteira. O certo é Não; ∣2∣=2." |
| `f1-inequacoes-modulares-certa` | Não | **sim** | "Certo: Não; ∣2∣=2." |

#### F2 — `f2-inequacoes-modulares`
- **Enunciado:** "Em ∣x∣≥2, o centro zero entra?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣0∣=0<2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-modulares-certa` | Não | **sim** | "Certo: Não; ∣0∣=0<2." |
| `f2-inequacoes-modulares-erro` | Sim | não | "Você escolheu o interior em vez do exterior. O certo é Não; ∣0∣=0<2." |

#### F3 — `f3-inequacoes-modulares`
- **Enunciado:** "O conjunto ∣x∣≤0 contém quantos pontos?"
- **Figura:** nenhuma
- **Conta de conferência:** x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-modulares-erro` | 0 | não | "A igualdade admite a distância zero. O certo é 1; x=0." |
| `f3-inequacoes-modulares-certa` | 1 | **sim** | "Certo: 1; x=0." |

#### F4 — `f4-inequacoes-modulares`
- **Enunciado:** "Em ∣x−1∣<2, qual é o centro?"
- **Figura:** nenhuma
- **Conta de conferência:** x−1=0 em 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-modulares-certa` | 1 | **sim** | "Certo: 1; x−1=0 em 1." |
| `f4-inequacoes-modulares-erro` | −1 | não | "Você trocou o sinal do centro. O certo é 1; x−1=0 em 1." |

### Médias

#### M1 — `m1-inequacoes-modulares`
- **Enunciado:** "Resolva ∣x∣≤3."
- **Figura:** nenhuma
- **Conta de conferência:** −3≤x≤3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-modulares-erro` | (−3;3) | não | "Você excluiu a igualdade. O certo é [−3;3]; −3≤x≤3." |
| `m1-inequacoes-modulares-certa` | [−3;3] | **sim** | "Certo: [−3;3]; −3≤x≤3." |

#### M2 — `m2-inequacoes-modulares`
- **Enunciado:** "Resolva ∣x−1∣<2."
- **Figura:** nenhuma
- **Conta de conferência:** 1−2<x<1+2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-modulares-certa` | (−1;3) | **sim** | "Certo: (−1;3); 1−2<x<1+2." |
| `m2-inequacoes-modulares-erro` | (−2;2) | não | "Você esqueceu de deslocar o centro. O certo é (−1;3); 1−2<x<1+2." |

#### M3 — `m3-inequacoes-modulares`
- **Enunciado:** "Resolva ∣x∣>1."
- **Figura:** nenhuma
- **Conta de conferência:** Exterior de [−1;1].

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-modulares-erro` | −1<x<1 | não | "Você escolheu distâncias pequenas. O certo é x<−1 ou x>1; Exterior de [−1;1]." |
| `m3-inequacoes-modulares-certa` | x<−1 ou x>1 | **sim** | "Certo: x<−1 ou x>1; Exterior de [−1;1]." |

### Desafios

#### D1 — `d1-inequacoes-modulares`
- **Enunciado:** "Resolva ∣2x−1∣≤1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** −1≤2x−1≤1; 0≤x≤1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-modulares-certa` | [0;1] | **sim** | "Certo: [0;1]; −1≤2x−1≤1; 0≤x≤1." |
| `d1-inequacoes-modulares-erro` | [−1;1] | não | "Você ignorou a escala e o deslocamento. O certo é [0;1]; −1≤2x−1≤1; 0≤x≤1." |

#### D2 — `d2-inequacoes-modulares`
- **Enunciado:** "Resolva ∣x−2∣<0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣x−2∣≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-modulares-erro` | {2} | não | "Desigualdade estrita não aceita distância zero. O certo é ∅; ∣x−2∣≥0." |
| `d2-inequacoes-modulares-certa` | ∅ | **sim** | "Certo: ∅; ∣x−2∣≥0." |

#### D3 — `d3-inequacoes-modulares`
- **Enunciado:** "Resolva ∣x∣≤−1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣x∣≥0>−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-modulares-certa` | ∅ | **sim** | "Certo: ∅; ∣x∣≥0>−1." |
| `d3-inequacoes-modulares-erro` | [−1;1] | não | "Você transformou raio negativo em positivo. O certo é ∅; ∣x∣≥0>−1." |

#### D4 — `d4-inequacoes-modulares`
- **Enunciado:** "Resolva ∣2x∣<1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** −1<2x<1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-modulares-erro` | (−2;2) | não | "Você multiplicou o limite por 2. O certo é (−0,5;0,5); −1<2x<1." |
| `d4-inequacoes-modulares-certa` | (−0,5;0,5) | **sim** | "Certo: (−0,5;0,5); −1<2x<1." |

#### D5 — `d5-inequacoes-modulares`
- **Enunciado:** "Uma peça mede x cm e deve ficar a no máximo 0,5 cm de 2 cm; qual intervalo é aceito?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣x−2∣≤0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-modulares-certa` | [1,5;2,5] | **sim** | "Certo: [1,5;2,5]; ∣x−2∣≤0,5." |
| `d5-inequacoes-modulares-erro` | (1,5;2,5) | não | "A tolerância máxima admite igualdade. O certo é [1,5;2,5]; ∣x−2∣≤0,5." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `unicamp-2025-modulos`
- **Enunciado (resumido):** "Os reais x e y satisfazem |x − 2| ≤ 2 e |y − 3| ≤ 1. O que se pode concluir com certeza?"
- **Fala do Paco:** "|x − 2| ≤ 2 põe x a no máximo 2 de distância do 2; o mesmo vale para y em volta do 3, com distância 1."
- **Fonte:** Unicamp 2025 (adaptada) — **Adaptação:** 1ª fase, Questão 52: enunciado resumido; alternativas e gabarito oficial (c) mantidos. — **URL:** https://www.comvest.unicamp.br/wp-content/uploads/2025/06/F1_2025.pdf
- **Conta de conferência:** 0 ≤ x ≤ 4 e 2 ≤ y ≤ 4 ⇒ x + y ≤ 8 (c).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | x² + y² ≤ 1 | não | "y está entre 2 e 4, então y² ≥ 4 e x² + y² ≥ 4 > 1. Como x ≤ 4 e y ≤ 4, o certo é x + y ≤ 8." |
| `b` | x + y ≥ 10 | não | "x + y vale no máximo 4 + 4 = 8, nunca 10. Com x em [0, 4] e y em [2, 4]: x + y ≤ 8." |
| `c` | x + y ≤ 8 | **sim** | "Isso. ∣x − 2∣ ≤ 2 dá 0 ≤ x ≤ 4 e ∣y − 3∣ ≤ 1 dá 2 ≤ y ≤ 4; somando os máximos, x + y ≤ 8." |
| `d` | x² + y² ≥ 36 | não | "x² + y² vale no máximo 16 + 16 = 32 < 36. De x ≤ 4 e y ≤ 4 sai x + y ≤ 8." |

#### V2 — `v1-inequacoes-modulares`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema inequações modulares.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v2-inequacoes-modulares`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema inequações modulares.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v3-inequacoes-modulares`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema inequações modulares.
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
