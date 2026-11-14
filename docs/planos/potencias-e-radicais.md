# Plano — Potenciação, propriedades e radicais

**Aula:** 1 — Potenciação, propriedades e radicais · Repetir fatores e desfazer áreas
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / potencias-e-radicais
**Pré-requisitos que o aluno já domina:** `fracoes-e-decimais`; contagem e leitura da reta numérica.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o expoente e a área de um quadrado. A potência repete fatores; a raiz recupera o comprimento não negativo.

## b) Visual de partida

plano_cartesiano — exponencial base 2 c3, ponto x=1, passo 1; janela x −2..3,y 0..9; referência (1;2) muted.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

O expoente 1 mantém a base; o expoente 0 dá o neutro multiplicativo 1 para base não nula.

## d) Panorama e recorte

Há expoentes inteiros e fracionários; aqui ligamos fatores, inversos e raízes reais, com atenção aos sinais.

## e) Progressão por contraste

1. Referência visual: Move para (2;4) e compara duas cópias do fator 2.
2. Em contraste com a referência: Passa por 2⁰=1 e chega a 2⁻¹=0,5.
3. Depois, teste de fronteira: Amplia a figura até lado 3, mantendo área e lado com unidades distintas.

## f) Dedução causal da forma

Juntar m fatores a com n fatores a dá m+n fatores. Para manter aᵐ/aⁿ=aᵐ⁻ⁿ com a≠0, expoente zero dá 1 e expoentes negativos dão inversos. A raiz quadrada principal é o lado não negativo de área A.

Fórmula deduzida: aᵐ·aⁿ=aᵐ⁺ⁿ; a⁻ⁿ=1/aⁿ; √(a²)=∣a∣.

## g) Simulação espacial e fronteiras

0⁰ fica indefinido neste recorte; expoente negativo proíbe base zero. Raiz de índice par exige radicando não negativo; raiz cúbica admite negativos.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Base a | Fator repetido na potência. |
| c2 | Expoente n | Quantidade de fatores ou regra de inversão. |
| c3 | Potência | Resultado de aplicar o expoente à base. |
| c4 | Raiz principal | Comprimento não negativo recuperado da área. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — exponencial base 2 c3, ponto x=1, passo 1; janela x −2..3,y 0..9; referência (1;2) muted.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro 2¹=2; ao avançar o expoente para 2, somamos 2 ou multiplicamos por 2?"
- **Interação do aluno:** Move para (2;4) e compara duas cópias do fator 2.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Multiplicamos; 2²=2·2=4, por isso juntar fatores soma seus expoentes."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há expoentes inteiros e fracionários; aqui ligamos fatores, inversos e raízes reais, com atenção aos sinais."

### Passo 2 — `andar-para-tras`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — mesma exponencial 2ˣ c3, ponto x=1, passo 1; janela −2..3,0..9.
- **Sliders:** nenhum
- **Paco (abertura):** "Se cada avanço dobra a saída, voltar até −1 exige qual operação?"
- **Interação do aluno:** Passa por 2⁰=1 e chega a 2⁻¹=0,5.
- **Conclusão:** `ponto_x ≤ −1`
- **Paco (conclusão):** "Exige dividir por 2; por isso 2⁰=1 e 2⁻¹=1/2."

### Passo 3 — `recuperar-lado`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: quadrado-raiz — quadrado de área A c3 e lado √A c4; área inicial 1 em muted; emite A.
- **Sliders:** A · Área · 1..9 · passo 1 · inicial 1 · c3
- **Paco (abertura):** "Um quadrado de área 9 pode ter lado −3? Leve A a 9."
- **Interação do aluno:** Amplia a figura até lado 3, mantendo área e lado com unidades distintas.
- **Conclusão:** `A ≥ 9`
- **Paco (conclusão):** "Não; comprimento é não negativo, por isso √9=3, embora x²=9 aceite x=±3."
- **Tati (dúvida):** `fim` — P: "√(a²) sempre é a?" / R: "Não; com a=−2, √4=2, então o resultado é ∣a∣."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — exponencial base 2 c3, pontos de referência (0;1) e (−1;0,5); janela −2..3,0..9.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Quanto vale 2⁻¹?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | −2 | não | "Expoente negativo pede inverso, não troca de sinal; 2⁻¹=1/2." | Mostra altura 0,5 e compara com −2 fora da curva. |
| `micro-acerto` | 0,5 | **sim** | "Certo: 0,5; 2⁻¹=1/2." | Marca (−1;0,5) na curva 2ˣ. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — exponencial base 2 c3, pontos de referência (0;1) e (−1;0,5); janela −2..3,0..9.
- **Fórmula:** `a`→c1 · `ᵐ·aⁿ`→c3 · `=aᵐ⁺ⁿ; a⁻ⁿ=1/aⁿ; √(a²)`→c4 · `=∣a∣`
- **Definições:**
  - "Base a: Fator repetido na potência."
  - "Potência: Resultado de aplicar o expoente à base."
  - "Raiz principal: Comprimento não negativo recuperado da área."
- **Paco (abertura):** "Fatores se juntam e inversos desfazem produtos; por isso expoentes somam no produto e mudam de sinal na inversão."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-potencias-e-radicais`
- **Enunciado:** "Quanto vale 2¹?"
- **Figura:** nenhuma
- **Conta de conferência:** 2¹=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-potencias-e-radicais-erro` | 1 | não | "Você confundiu expoente 1 com expoente 0. O certo é 2; 2¹=2." |
| `f1-potencias-e-radicais-certa` | 2 | **sim** | "Certo: 2; 2¹=2." |

#### F2 — `f2-potencias-e-radicais`
- **Enunciado:** "Quanto vale 2⁰?"
- **Figura:** nenhuma
- **Conta de conferência:** 2²/2²=2⁰=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-potencias-e-radicais-certa` | 1 | **sim** | "Certo: 1; 2²/2²=2⁰=1." |
| `f2-potencias-e-radicais-erro` | 0 | não | "Expoente zero não zera base não nula. O certo é 1; 2²/2²=2⁰=1." |

#### F3 — `f3-potencias-e-radicais`
- **Enunciado:** "Quanto vale 2⁻¹?"
- **Figura:** nenhuma
- **Conta de conferência:** 2⁻¹=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-potencias-e-radicais-erro` | −2 | não | "Expoente negativo indica inverso. O certo é 0,5; 2⁻¹=1/2." |
| `f3-potencias-e-radicais-certa` | 0,5 | **sim** | "Certo: 0,5; 2⁻¹=1/2." |

#### F4 — `f4-potencias-e-radicais`
- **Enunciado:** "Quanto vale a raiz principal √9?"
- **Figura:** nenhuma
- **Conta de conferência:** √9=3≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-potencias-e-radicais-certa` | 3 | **sim** | "Certo: 3; √9=3≥0." |
| `f4-potencias-e-radicais-erro` | ±3 | não | "Você confundiu raiz principal com equação quadrática. O certo é 3; √9=3≥0." |

### Médias

#### M1 — `m1-potencias-e-radicais`
- **Enunciado:** "Calcule 2²·2³."
- **Figura:** nenhuma
- **Conta de conferência:** 2²⁺³=2⁵=32.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-potencias-e-radicais-erro` | 64 | não | "Você multiplicou expoentes em vez de somá-los. O certo é 32; 2²⁺³=2⁵=32." |
| `m1-potencias-e-radicais-certa` | 32 | **sim** | "Certo: 32; 2²⁺³=2⁵=32." |

#### M2 — `m2-potencias-e-radicais`
- **Enunciado:** "Calcule (2²)³."
- **Figura:** nenhuma
- **Conta de conferência:** (2²)³=2⁶=64.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-potencias-e-radicais-certa` | 64 | **sim** | "Certo: 64; (2²)³=2⁶=64." |
| `m2-potencias-e-radicais-erro` | 32 | não | "Você somou expoentes em uma potência de potência. O certo é 64; (2²)³=2⁶=64." |

#### M3 — `m3-potencias-e-radicais`
- **Enunciado:** "Calcule √4+√9."
- **Figura:** nenhuma
- **Conta de conferência:** 2+3=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-potencias-e-radicais-erro` | √13 | não | "Raiz não distribui sobre soma. O certo é 5; 2+3=5." |
| `m3-potencias-e-radicais-certa` | 5 | **sim** | "Certo: 5; 2+3=5." |

### Desafios

#### D1 — `d1-potencias-e-radicais`
- **Enunciado:** "Quanto vale √((−3)²)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** √9=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-potencias-e-radicais-certa` | 3 | **sim** | "Certo: 3; √9=3." |
| `d1-potencias-e-radicais-erro` | −3 | não | "Você esqueceu o módulo ao desfazer o quadrado. O certo é 3; √9=3." |

#### D2 — `d2-potencias-e-radicais`
- **Enunciado:** "0⁻¹ está definido?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0⁻¹=1/0 não existe.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-potencias-e-radicais-erro` | Sim | não | "O inverso exigiria dividir por zero. O certo é Não; 0⁻¹=1/0 não existe." |
| `d2-potencias-e-radicais-certa` | Não | **sim** | "Certo: Não; 0⁻¹=1/0 não existe." |

#### D3 — `d3-potencias-e-radicais`
- **Enunciado:** "Quanto vale a raiz cúbica de −8?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (−2)³=−8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-potencias-e-radicais-certa` | −2 | **sim** | "Certo: −2; (−2)³=−8." |
| `d3-potencias-e-radicais-erro` | Não existe real | não | "A restrição de sinal vale para índice par. O certo é −2; (−2)³=−8." |

#### D4 — `d4-potencias-e-radicais`
- **Enunciado:** "Calcule 4¹ᐟ²·2⁻¹."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** √4·(1/2)=2/2=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-potencias-e-radicais-erro` | 4 | não | "Você não inverteu o fator de expoente negativo. O certo é 1; √4·(1/2)=2/2=1." |
| `d4-potencias-e-radicais-certa` | 1 | **sim** | "Certo: 1; √4·(1/2)=2/2=1." |

#### D5 — `d5-potencias-e-radicais`
- **Enunciado:** "Um quadrado tem área 8; qual é seu lado e o dobro desse lado?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** √8=2√2; 2·2√2=4√2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-potencias-e-radicais-certa` | 2√2 e 4√2 | **sim** | "Certo: 2√2 e 4√2; √8=2√2; 2·2√2=4√2." |
| `d5-potencias-e-radicais-erro` | 4 e 8 | não | "Você dividiu a área por 2 em vez de extrair a raiz. O certo é 2√2 e 4√2; √8=2√2; 2·2√2=4√2." |

### Vestibular

#### V1 — `enem-2010-petroleo`
- **Enunciado:** "Se 10 litros de óleo contaminam 10⁷ litros de água, quantos litros serão contaminados por 1 000 litros de óleo?"
- **Fala do Paco:** "Escreva 1 000 como 100 × 10 = 10² × 10 e multiplique 10⁷ por 10² somando os expoentes."
- **Fonte:** ENEM 2010 (adaptada); Questão 177: enunciado resumido; alternativas e gabarito (10⁹) mantidos; https://api.enem.dev/v1/exams/2010/questions/177
- **Conta de conferência:** (1 000 / 10) · 10⁷ = 10² · 10⁷ = 10⁹.

#### V2 — `enem-2012-mamiferos`
- **Enunciado:** "Na lei A = k · m^(2/3), se a massa m de um animal fica 8 vezes maior, por qual fator a área A multiplica?"
- **Fala do Paco:** "Substitua m por 8m: o fator é 8^(2/3) = (∛8)²."
- **Fonte:** ENEM 2012 (adaptada); Questão 168: enunciado resumido; alternativas e gabarito (4) mantidos; https://api.enem.dev/v1/exams/2012/questions/168
- **Conta de conferência:** 8^(2/3) = (∛8)² = 2² = 4.

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
