# Plano — Valor absoluto como distância

**Aula:** 1 — Valor absoluto como distância · Distância não tem lado negativo
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / valor-absoluto-e-distancia
**Pré-requisitos que o aluno já domina:** `conjuntos-e-intervalos`; contagem e leitura da reta numérica.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla a posição x. A distância até uma referência depende da separação entre os pontos, não da direção do deslocamento.

## b) Visual de partida

reta_numerica — intervalo −4..4; ponto x=0 c1, passo 1; distanciaZero ligada,c4, origem c2.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

No ponto de referência x=0, a distância é zero; o segmento desaparece e depois cresce nos dois sentidos.

## d) Panorama e recorte

Módulo também aparece em funções e equações; aqui medimos distância até zero e entre dois pontos da reta.

## e) Progressão por contraste

1. Referência visual: Arrasta para 2 e vê o segmento crescer.
2. Em contraste com a referência: Arrasta pelo zero até −2, medindo o comprimento.
3. Depois, teste de fronteira: Move x de 1 até −2, com diferença −3 e distância 3.

## f) Dedução causal da forma

À direita do centro c a diferença x−c é não negativa; à esquerda, c−x é não negativa. As duas expressões medem o mesmo comprimento orientado de formas opostas, por isso usamos o módulo.

Fórmula deduzida: d(x;c)=∣x−c∣.

## g) Simulação espacial e fronteiras

Distância zero exige pontos coincidentes; trocar a ordem dos pontos muda o deslocamento, mas preserva a distância. Para c=0, ∣x∣=−x quando x<0.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Posição x | Lugar do ponto móvel na reta. |
| c2 | Referência c | Ponto a partir do qual medimos. |
| c3 | Deslocamento x−c | Diferença com sinal entre as posições. |
| c4 | Distância d | Comprimento não negativo entre os pontos. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −4..4; ponto x=0 c1, passo 1; distanciaZero ligada,c4, origem c2.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro x=0, a distância é zero; ao ir até 2, quanto o segmento mede?"
- **Interação do aluno:** Arrasta para 2 e vê o segmento crescer.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Mede 2 porque há duas unidades entre a origem e o ponto."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Módulo também aparece em funções e equações; aqui medimos distância até zero e entre dois pontos da reta."

### Passo 2 — `espelhar-ponto`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** reta_numerica — intervalo −4..4; ponto x=2, passo 1; distanciaZero c4; referência anterior 2 muted.
- **Sliders:** nenhum
- **Paco (abertura):** "Se você levar o ponto de 2 a −2, a distância fica negativa?"
- **Interação do aluno:** Arrasta pelo zero até −2, medindo o comprimento.
- **Conclusão:** `ponto_x ≤ −2`
- **Paco (conclusão):** "Não; mede 2 de novo, por isso ∣−2∣=2, embora o deslocamento seja −2."

### Passo 3 — `trocar-referencia`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: distancia-na-reta — intervalo −4..5; c=1 c2 e x variável c1; seta x−c c3 e segmento ∣x−c∣ c4; emite x.
- **Sliders:** x · Posição · −2..4 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Com referência em 1, ir até −2 exige percorrer 1 ou 3 unidades? Arraste."
- **Interação do aluno:** Move x de 1 até −2, com diferença −3 e distância 3.
- **Conclusão:** `x ≤ −2`
- **Paco (conclusão):** "São 3; a diferença é −2−1=−3, por isso a distância vale ∣−3∣=3."
- **Tati (dúvida):** `fim` — P: "Trocar os pontos muda a distância?" / R: "Não; ∣x−c∣=∣c−x∣, pois apenas a direção da seta se inverte."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: distancia-na-reta-figura — pontos −2 c1 e 1 c2, seta −3 c3, segmento 3 c4; versão estática.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a distância entre −2 e 1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | −3 | não | "Você respondeu o deslocamento; a distância é ∣−2−1∣=3." | Destaca seta orientada −3 em c3, separada do comprimento. |
| `micro-acerto` | 3 | **sim** | "Certo: 3; ∣−2−1∣=3." | Destaca segmento de comprimento 3 em c4. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: distancia-na-reta-figura — pontos −2 c1 e 1 c2, seta −3 c3, segmento 3 c4; versão estática.
- **Fórmula:** `d`→c4 · `(x`→c1 · `;c`→c2 · `)=∣x−c∣`
- **Definições:**
  - "Posição x: Lugar do ponto móvel na reta."
  - "Deslocamento x−c: Diferença com sinal entre as posições."
  - "Distância d: Comprimento não negativo entre os pontos."
- **Paco (abertura):** "O sinal indica direção, não comprimento; por isso a distância entre x e c é ∣x−c∣."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-valor-absoluto-e-distancia`
- **Enunciado:** "Qual é o módulo de −2?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣−2∣=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-valor-absoluto-e-distancia-erro` | −2 | não | "Módulo mede distância não negativa. O certo é 2; ∣−2∣=2." |
| `f1-valor-absoluto-e-distancia-certa` | 2 | **sim** | "Certo: 2; ∣−2∣=2." |

#### F2 — `f2-valor-absoluto-e-distancia`
- **Enunciado:** "Quanto vale ∣0∣?"
- **Figura:** nenhuma
- **Conta de conferência:** Distância de 0 a 0 é 0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-valor-absoluto-e-distancia-certa` | 0 | **sim** | "Certo: 0; Distância de 0 a 0 é 0." |
| `f2-valor-absoluto-e-distancia-erro` | 1 | não | "Você confundiu módulo com potência de expoente zero. O certo é 0; Distância de 0 a 0 é 0." |

#### F3 — `f3-valor-absoluto-e-distancia`
- **Enunciado:** "2 e −2 estão à mesma distância de zero?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣2∣=∣−2∣=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-valor-absoluto-e-distancia-erro` | Não | não | "O lado não altera o comprimento. O certo é Sim; ∣2∣=∣−2∣=2." |
| `f3-valor-absoluto-e-distancia-certa` | Sim | **sim** | "Certo: Sim; ∣2∣=∣−2∣=2." |

#### F4 — `f4-valor-absoluto-e-distancia`
- **Enunciado:** "Distância entre dois pontos pode ser negativa?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣x−c∣≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-valor-absoluto-e-distancia-certa` | Não | **sim** | "Certo: Não; ∣x−c∣≥0." |
| `f4-valor-absoluto-e-distancia-erro` | Sim | não | "Você confundiu distância com deslocamento. O certo é Não; ∣x−c∣≥0." |

### Médias

#### M1 — `m1-valor-absoluto-e-distancia`
- **Enunciado:** "Qual é a distância entre −2 e 1?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣−2−1∣=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-valor-absoluto-e-distancia-erro` | 1 | não | "Você somou sinais sem medir a separação. O certo é 3; ∣−2−1∣=3." |
| `m1-valor-absoluto-e-distancia-certa` | 3 | **sim** | "Certo: 3; ∣−2−1∣=3." |

#### M2 — `m2-valor-absoluto-e-distancia`
- **Enunciado:** "Qual é a distância entre 4 e 1?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣4−1∣=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-valor-absoluto-e-distancia-certa` | 3 | **sim** | "Certo: 3; ∣4−1∣=3." |
| `m2-valor-absoluto-e-distancia-erro` | 5 | não | "Você somou posições. O certo é 3; ∣4−1∣=3." |

#### M3 — `m3-valor-absoluto-e-distancia`
- **Enunciado:** "Qual é o deslocamento de 1 para −2?"
- **Figura:** nenhuma
- **Conta de conferência:** −2−1=−3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-valor-absoluto-e-distancia-erro` | 3 | não | "Aqui se pede direção, não só distância. O certo é −3; −2−1=−3." |
| `m3-valor-absoluto-e-distancia-certa` | −3 | **sim** | "Certo: −3; −2−1=−3." |

### Desafios

#### D1 — `d1-valor-absoluto-e-distancia`
- **Enunciado:** "Quais pontos estão a 2 unidades de 1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1−2=−1; 1+2=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-valor-absoluto-e-distancia-certa` | −1 e 3 | **sim** | "Certo: −1 e 3; 1−2=−1; 1+2=3." |
| `d1-valor-absoluto-e-distancia-erro` | 1 e 3 | não | "Você usou o centro como solução. O certo é −1 e 3; 1−2=−1; 1+2=3." |

#### D2 — `d2-valor-absoluto-e-distancia`
- **Enunciado:** "Se a distância entre x e 3 é zero, quanto vale x?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣x−3∣=0 ⇒ x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-valor-absoluto-e-distancia-erro` | 0 | não | "Você confundiu distância zero com posição zero. O certo é 3; ∣x−3∣=0 ⇒ x=3." |
| `d2-valor-absoluto-e-distancia-certa` | 3 | **sim** | "Certo: 3; ∣x−3∣=0 ⇒ x=3." |

#### D3 — `d3-valor-absoluto-e-distancia`
- **Enunciado:** "Qual é a distância entre −0,5 e 1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣−0,5−1∣=1,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-valor-absoluto-e-distancia-certa` | 1,5 | **sim** | "Certo: 1,5; ∣−0,5−1∣=1,5." |
| `d3-valor-absoluto-e-distancia-erro` | 0,5 | não | "Você ignorou a parte à esquerda de zero. O certo é 1,5; ∣−0,5−1∣=1,5." |

#### D4 — `d4-valor-absoluto-e-distancia`
- **Enunciado:** "Para x<0, ∣x∣ vale x ou −x?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Exemplo: x=−2 ⇒ −x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-valor-absoluto-e-distancia-erro` | x | não | "Você manteve a saída negativa. O certo é −x; Exemplo: x=−2 ⇒ −x=2." |
| `d4-valor-absoluto-e-distancia-certa` | −x | **sim** | "Certo: −x; Exemplo: x=−2 ⇒ −x=2." |

#### D5 — `d5-valor-absoluto-e-distancia`
- **Enunciado:** "Uma pessoa vai de −2 a 1 e volta a 0; qual distância percorre e qual deslocamento total tem?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** Percurso=3+1=4; deslocamento=0−(−2)=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-valor-absoluto-e-distancia-certa` | 4 e 2 | **sim** | "Certo: 4 e 2; Percurso=3+1=4; deslocamento=0−(−2)=2." |
| `d5-valor-absoluto-e-distancia-erro` | 2 e 4 | não | "Você trocou percurso com posição final menos inicial. O certo é 4 e 2; Percurso=3+1=4; deslocamento=0−(−2)=2." |

### Vestibular

> B43 (19/11/2026): as vagas preenchidas abaixo trazem questões de provas oficiais conferidas no PDF e no gabarito oficial (registro em `docs/revisao/vestibular-b43.md`). As vagas PENDENTE-FONTE seguem abertas; nada foi inventado.

#### V1 — `unicamp-2026-primos-distancia`
- **Enunciado (resumido):** "A = {x ∈ ℕ : |x − 5| ≥ 2 e |x − 11| ≤ 9}. Quantos números primos pertencem a A?"
- **Fala do Paco:** "Leia |x − 5| ≥ 2 como distância até 5 de pelo menos 2, e |x − 11| ≤ 9 como distância até 11 de no máximo 9."
- **Fonte:** Unicamp 2026 (adaptada) — **Adaptação:** 1ª fase, Questão 51: enunciado mantido; alternativas e gabarito oficial (c) mantidos. — **URL:** https://www.comvest.unicamp.br/wp-content/uploads/2026/06/F1_2026_Prova-Q.pdf
- **Conta de conferência:** |x − 5| ≥ 2 ⇒ x ≤ 3 ou x ≥ 7; |x − 11| ≤ 9 ⇒ 2 ≤ x ≤ 20 ⇒ A = {2, 3} ∪ {7, …, 20} ⇒ primos 2, 3, 7, 11, 13, 17, 19: 7 (c).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a5` | 5 | não | "5 ignora o módulo e perde o lado x ≤ 3. Pelas distâncias, A = {2, 3} ∪ {7, 8, …, 20}, com 7 primos: 2, 3, 7, 11, 13, 17 e 19." |
| `a6` | 6 | não | "Falta um primo: 2 e 3 distam 3 e 2 de 5, e no máximo 9 de 11, então entram. Os primos de A são 2, 3, 7, 11, 13, 17 e 19." |
| `a7` | 7 | **sim** | "Isso. Distância até 5 de pelo menos 2 dá x ≤ 3 ou x ≥ 7; até 11 de no máximo 9 dá 2 ≤ x ≤ 20: primos 2, 3, 7, 11, 13, 17, 19." |
| `a8` | 8 | não | "8 conta todos os primos de 2 a 20, inclusive o 5. Mas o 5 está a distância 0 de 5, menos que 2, então sai de A e sobram 7 primos." |

#### V2 — `v2-valor-absoluto-e-distancia`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema valor absoluto como distância.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-valor-absoluto-e-distancia`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema valor absoluto como distância.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-valor-absoluto-e-distancia`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema valor absoluto como distância.
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
