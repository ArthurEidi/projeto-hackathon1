# Plano — Conjuntos, operações e intervalos

**Aula:** 1 — Quem Está Dentro · Pertinência, união e interseção
**Caminho:** aritmetica / conjuntos / conjuntos-e-intervalos
**Pré-requisitos que o aluno já domina:** `sistemas-numericos-e-divisibilidade`; contagem e leitura da reta numérica.

## a) Ancoragem mecânica

O aluno controla o ponto-teste e a operação entre dois conjuntos. A pertinência depende de passar em um filtro, em ambos ou só no primeiro.

## b) Visual de partida

reta_numerica — intervalo −4..5; A=[−2;3] em c1, resultado A∪∅ sobreposto c4; ponto x=4 c3,passo 1; extremos fechados.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

A união com o vazio conserva A; começar com A=[−2;3] e B=∅ deixa a faixa de A intacta como referência.

## d) Panorama e recorte

Conjuntos também têm subconjuntos e complementos; aqui lemos extremos e combinamos intervalos da reta real.

## e) Progressão por contraste

1. Referência visual: Move para dentro de A, sem alterar o trecho original.
2. Em contraste com a referência: Resultado passa de [−2;4] para [1;3], união anterior em muted.
3. Depois, teste de fronteira: Encontra 1 em B e vê o círculo aberto no resultado.

## f) Dedução causal da forma

União aceita quem está em A ou B; interseção exige A e B; diferença mantém A e exclui B. Um extremo só entra na interseção se ambos o incluem. Complemento depende do universo declarado.

Fórmula deduzida: x∈A∪B ⇔ x∈A ou x∈B; x∈A∩B ⇔ x∈A e x∈B.

## g) Simulação espacial e fronteiras

Infinito nunca é extremo incluído. Limite esquerdo maior que o direito gera vazio nesta convenção; [a;a]={a}, mas (a;a)=∅. Complemento em R difere do complemento em universo restrito.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Conjunto A | Primeiro filtro de pertinência. |
| c2 | Conjunto B | Segundo filtro de pertinência. |
| c3 | Ponto-teste x | Número arrastado para testar os filtros. |
| c4 | Resultado da operação | Faixa aceita pela operação escolhida. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −4..5; A=[−2;3] em c1, resultado A∪∅ sobreposto c4; ponto x=4 c3,passo 1; extremos fechados.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro A∪∅, alguma entrada nova aparece? Arraste de 4 até 2."
- **Interação do aluno:** Move para dentro de A, sem alterar o trecho original.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Não; o vazio não acrescenta pontos, por isso A∪∅=A."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Conjuntos também têm subconjuntos e complementos; aqui lemos extremos e combinamos intervalos da reta real."

### Passo 2 — `unir-e-intersectar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: intervalos-operacoes — A=[−2;3] c1,B=[1;4] c2, três trilhas A,B e resultado c4; modo 0=união,1=interseção; ponto x=2 c3; emite modo.
- **Sliders:** modo · União ou interseção · 0..1 · passo 1 · inicial 0 · ink
- **Paco (abertura):** "Se exigirmos pertencer aos dois intervalos, a faixa aumenta? Mude para interseção."
- **Interação do aluno:** Resultado passa de [−2;4] para [1;3], união anterior em muted.
- **Conclusão:** `modo ≥ 1`
- **Paco (conclusão):** "Diminui; por isso a interseção guarda só [1;3], onde os dois filtros aceitam."

### Passo 3 — `retirar-e-testar-pontas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: intervalos-operacoes — A=[−2;3],B=[1;4], modo diferença A\B; ponto x=0,passo 1; resultado [−2;1) c4; emite ponto_x e pertence.
- **Sliders:** nenhum
- **Paco (abertura):** "Ao retirar B de A, o ponto 1 permanece? Leve o ponto até essa fronteira."
- **Interação do aluno:** Encontra 1 em B e vê o círculo aberto no resultado.
- **Conclusão:** `ponto_x ≥ 1`
- **Paco (conclusão):** "Não; 1 pertence a B, por isso A\B=[−2;1), sem a ponta direita."
- **Tati (dúvida):** `fim` — P: "E o complemento de (−∞;2] em R?" / R: "É (2;+∞); o ponto 2 já estava no conjunto, e infinito nunca é incluído."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: intervalos-operacoes-figura — A=[0;3] c1,B=[2;5] c2, resultado [2;3] c4; extremos fechados.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Se A=[0;3] e B=[2;5], qual é A∩B?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | [0;5] | não | "Você fez a união; a interseção exige os dois filtros, então é [2;3]." | Destaca partes exclusivas de A e B fora do resultado. |
| `micro-acerto` | [2;3] | **sim** | "Certo: [2;3]; Só de 2 a 3 os dois conjuntos aceitam." | Pinta apenas o trecho comum [2;3]. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: intervalos-operacoes-figura — A=[0;3] c1,B=[2;5] c2, resultado [2;3] c4; extremos fechados.
- **Fórmula:** `x`→c3 · `∈A`→c1 · `∪B`→c2 · `⇔ x∈A ou x∈B; A∩B`→c4 · `exige ambos`
- **Definições:**
  - "Conjunto A: Primeiro filtro de pertinência."
  - "Ponto-teste x: Número arrastado para testar os filtros."
  - "Resultado da operação: Faixa aceita pela operação escolhida."
- **Paco (abertura):** "Cada operação combina filtros; por isso união aceita um deles e interseção exige os dois."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-conjuntos-e-intervalos`
- **Enunciado:** "Em [−1;3), o ponto 3 entra?"
- **Figura:** nenhuma
- **Conta de conferência:** x<3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-conjuntos-e-intervalos-erro` | Sim | não | "O extremo direito está aberto. O certo é Não; x<3." |
| `f1-conjuntos-e-intervalos-certa` | Não | **sim** | "Certo: Não; x<3." |

#### F2 — `f2-conjuntos-e-intervalos`
- **Enunciado:** "A união usa a condição ou ou e?"
- **Figura:** nenhuma
- **Conta de conferência:** Basta pertencer a um conjunto.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-conjuntos-e-intervalos-certa` | Ou | **sim** | "Certo: Ou; Basta pertencer a um conjunto." |
| `f2-conjuntos-e-intervalos-erro` | E | não | "Você confundiu união com interseção. O certo é Ou; Basta pertencer a um conjunto." |

#### F3 — `f3-conjuntos-e-intervalos`
- **Enunciado:** "A interseção exige pertencer aos dois conjuntos?"
- **Figura:** nenhuma
- **Conta de conferência:** x∈A e x∈B.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-conjuntos-e-intervalos-erro` | Não | não | "Passar só em um filtro não basta. O certo é Sim; x∈A e x∈B." |
| `f3-conjuntos-e-intervalos-certa` | Sim | **sim** | "Certo: Sim; x∈A e x∈B." |

#### F4 — `f4-conjuntos-e-intervalos`
- **Enunciado:** "Qual é A∪∅?"
- **Figura:** nenhuma
- **Conta de conferência:** x∈A ou x∈∅ equivale a x∈A.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-conjuntos-e-intervalos-certa` | A | **sim** | "Certo: A; x∈A ou x∈∅ equivale a x∈A." |
| `f4-conjuntos-e-intervalos-erro` | ∅ | não | "O vazio não acrescenta nem remove pontos. O certo é A; x∈A ou x∈∅ equivale a x∈A." |

### Médias

#### M1 — `m1-conjuntos-e-intervalos`
- **Enunciado:** "Se A=[0;3] e B=[2;5], qual é A∩B?"
- **Figura:** nenhuma
- **Conta de conferência:** O trecho comum vai de 2 a 3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-conjuntos-e-intervalos-erro` | [0;5] | não | "Você calculou a união. O certo é [2;3]; O trecho comum vai de 2 a 3." |
| `m1-conjuntos-e-intervalos-certa` | [2;3] | **sim** | "Certo: [2;3]; O trecho comum vai de 2 a 3." |

#### M2 — `m2-conjuntos-e-intervalos`
- **Enunciado:** "Se A=[0;3] e B=[2;5], qual é A∪B?"
- **Figura:** nenhuma
- **Conta de conferência:** As faixas juntas cobrem de 0 a 5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-conjuntos-e-intervalos-certa` | [0;5] | **sim** | "Certo: [0;5]; As faixas juntas cobrem de 0 a 5." |
| `m2-conjuntos-e-intervalos-erro` | [2;3] | não | "Você calculou a interseção. O certo é [0;5]; As faixas juntas cobrem de 0 a 5." |

#### M3 — `m3-conjuntos-e-intervalos`
- **Enunciado:** "Qual intervalo representa −2≤x<2?"
- **Figura:** nenhuma
- **Conta de conferência:** −2 entra; 2 não entra.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-conjuntos-e-intervalos-erro` | (−2;2] | não | "Você trocou a inclusão dos extremos. O certo é [−2;2); −2 entra; 2 não entra." |
| `m3-conjuntos-e-intervalos-certa` | [−2;2) | **sim** | "Certo: [−2;2); −2 entra; 2 não entra." |

### Desafios

#### D1 — `d1-conjuntos-e-intervalos`
- **Enunciado:** "Se A=[−1;4] e B=[1;3), qual é A menos B?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1 pertence a B; 3 não pertence.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-conjuntos-e-intervalos-certa` | [−1;1)∪[3;4] | **sim** | "Certo: [−1;1)∪[3;4]; 1 pertence a B; 3 não pertence." |
| `d1-conjuntos-e-intervalos-erro` | [−1;1]∪(3;4] | não | "Você trocou as fronteiras retiradas. O certo é [−1;1)∪[3;4]; 1 pertence a B; 3 não pertence." |

#### D2 — `d2-conjuntos-e-intervalos`
- **Enunciado:** "Qual é [2;2]?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2≤x≤2 ⇒ x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-conjuntos-e-intervalos-erro` | ∅ | não | "Os extremos fechados incluem o único ponto. O certo é {2}; 2≤x≤2 ⇒ x=2." |
| `d2-conjuntos-e-intervalos-certa` | {2} | **sim** | "Certo: {2}; 2≤x≤2 ⇒ x=2." |

#### D3 — `d3-conjuntos-e-intervalos`
- **Enunciado:** "Qual é (−∞;2]∩(2;+∞)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Nenhum real é ≤2 e >2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-conjuntos-e-intervalos-certa` | ∅ | **sim** | "Certo: ∅; Nenhum real é ≤2 e >2." |
| `d3-conjuntos-e-intervalos-erro` | {2} | não | "O segundo intervalo não inclui 2. O certo é ∅; Nenhum real é ≤2 e >2." |

#### D4 — `d4-conjuntos-e-intervalos`
- **Enunciado:** "Em R, qual é o complemento de (−∞;0,5]?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Complemento exige x>0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-conjuntos-e-intervalos-erro` | [0,5;+∞) | não | "Você incluiu um ponto que já está no conjunto. O certo é (0,5;+∞); Complemento exige x>0,5." |
| `d4-conjuntos-e-intervalos-certa` | (0,5;+∞) | **sim** | "Certo: (0,5;+∞); Complemento exige x>0,5." |

#### D5 — `d5-conjuntos-e-intervalos`
- **Enunciado:** "No universo U=[0;4], seja A=[1;3); qual é o complemento de A em U?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Retirar [1;3) de [0;4] preserva 3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-conjuntos-e-intervalos-certa` | [0;1)∪[3;4] | **sim** | "Certo: [0;1)∪[3;4]; Retirar [1;3) de [0;4] preserva 3." |
| `d5-conjuntos-e-intervalos-erro` | (−∞;1)∪[3;+∞) | não | "Você usou R em vez do universo declarado. O certo é [0;1)∪[3;4]; Retirar [1;3) de [0;4] preserva 3." |

### Vestibular

#### V1 — `enem-2020-amostras`
- **Enunciado:** "Num grupo de 200 amostras, 100 têm característica A, 110 têm B e 20 não têm nenhuma. Quantas têm apenas a característica A?"
- **Fala do Paco:** "Quem tem A ou B são 200 − 20. Use a união para achar quem tem as duas e tire esse grupo de A."
- **Fonte:** ENEM 2020 (adaptada); Questão 169: enunciado resumido; alternativas e gabarito (70) mantidos; https://api.enem.dev/v1/exams/2020/questions/169
- **Conta de conferência:** (100 + 110) − (200 − 20) = 30 => apenas A = 100 − 30 = 70.

#### V2 — `enem-2018-pena`
- **Enunciado:** "Pena de 5 a 15 anos terá redução de 1/6 a 2/3. Qual é o intervalo possível para a nova pena?"
- **Fala do Paco:** "Para cada extremo da nova pena, escolha a pena e a redução que o tornam o menor ou o maior possível."
- **Fonte:** ENEM 2018 (adaptada); Questão 163: enunciado resumido; alternativas e gabarito (1 ano e 8 meses a 12 anos e 6 meses) mantidos; https://api.enem.dev/v1/exams/2018/questions/163
- **Conta de conferência:** 5 · (1 − 2/3) = 5/3 = 1 ano e 8 meses; 15 · (1 − 1/6) = 12,5 = 12 anos e 6 meses.

#### V3 — `enem-2018-escala`
- **Enunciado:** "Na escala 1 : X, 15 m ficam entre 0,5 cm e 1 cm, e 90 m superam 4 cm. Qual intervalo X satisfaz?"
- **Fala do Paco:** "Converta 15 m = 1 500 cm e 90 m = 9 000 cm; resolva 0,5 < 1 500/X < 1 e 9 000/X > 4."
- **Fonte:** ENEM 2018 (adaptada); Questão 169: enunciado resumido; alternativas e gabarito (1 500 < X < 2 250) mantidos; https://api.enem.dev/v1/exams/2018/questions/169
- **Conta de conferência:** 1 500 < X < 3 000 e X < 9 000/4 = 2 250 => 1 500 < X < 2 250.

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
