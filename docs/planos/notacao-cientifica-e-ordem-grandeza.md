# Plano — Notação científica, estimativa e arredondamento

**Aula:** 1 — Notação científica, estimativa e arredondamento · Mover a vírgula sem mudar o número
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / notacao-cientifica-e-ordem-grandeza
**Pré-requisitos que o aluno já domina:** `potencias-e-radicais`; contagem e leitura da reta numérica.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o expoente de dez. A potência muda a escala; ajustar o coeficiente em sentido contrário preserva o valor representado.

## b) Visual de partida

WIDGET NOVO: escala-decimal — quadro de ordens e régua com posições igualmente espaçadas para 10ⁿ; coeficiente a=2 c1, expoente n c2, valor c3; referência n=0 muted; emite n.
Controles: n · Expoente de dez · −2..2 · passo 1 · inicial 0 · c2.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

10⁰=1 deixa o coeficiente inalterado; o valor inicial 2 fica em muted como referência.

## d) Panorama e recorte

Notação científica organiza escalas grandes e pequenas; aqui normalizamos, estimamos e arredondamos sem confundir expoente e valor.

## e) Progressão por contraste

1. Referência visual: Move n a 1 e desloca o algarismo 2 da unidade para a dezena.
2. Em contraste com a referência: O coeficiente passa de 20 para 2, compensando o fator 10.
3. Depois, teste de fronteira: Passa por a=3 abaixo do corte e a=4 acima; marca ordem de 400 como 10³.

## f) Dedução causal da forma

Multiplicar por 10 desloca cada algarismo uma casa para a esquerda no quadro de ordens. Para conservar o valor, elevar o expoente exige dividir o coeficiente por 10. Para N>0, a notação normalizada tem 1≤a<10. A ordem de grandeza é a potência mais próxima em escala logarítmica: corte em √10.

Fórmula deduzida: N=a·10ⁿ, 1≤a<10; ordem 10ⁿ se a<√10, senão 10ⁿ⁺¹.

## g) Simulação espacial e fronteiras

Zero não possui forma normalizada com 1≤a<10; para negativos, aplicar a convenção ao módulo e manter o sinal. No empate a=√10, adotamos a ordem superior. Arredondar pode exigir renormalizar.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Coeficiente a | Fator normalizado entre 1 e 10. |
| c2 | Expoente n | Potência de dez que define a escala. |
| c3 | Valor N | Número representado pelo produto. |
| c4 | Ordem de grandeza | Potência de dez mais próxima em escala logarítmica. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: escala-decimal — quadro de ordens e régua com posições igualmente espaçadas para 10ⁿ; coeficiente a=2 c1, expoente n c2, valor c3; referência n=0 muted; emite n.
- **Sliders:** n · Expoente de dez · −2..2 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "No caso neutro 2·10⁰=2; ao levar n a 1, o valor aumenta 1 ou multiplica por 10?"
- **Interação do aluno:** Move n a 1 e desloca o algarismo 2 da unidade para a dezena.
- **Conclusão:** `n ≥ 1`
- **Paco (conclusão):** "Multiplica por 10; o valor vira 20 porque cada posição vale dez vezes a anterior."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Notação científica organiza escalas grandes e pequenas; aqui normalizamos, estimamos e arredondamos sem confundir expoente e valor."

### Passo 2 — `normalizar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: escala-decimal — valor fixo 20, representação (20/10ⁿ)·10ⁿ; faixa 1≤a<10 destacada c1; referência 20·10⁰ muted; emite n.
- **Sliders:** n · Expoente compensado · 0..2 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Como escrever 20 com coeficiente entre 1 e 10? Leve n a 1 sem mudar o valor."
- **Interação do aluno:** O coeficiente passa de 20 para 2, compensando o fator 10.
- **Conclusão:** `n ≥ 1`
- **Paco (conclusão):** "Fica 2·10¹; por isso dividir o coeficiente por 10 e somar 1 ao expoente conserva o número."

### Passo 3 — `ordem-e-arredondamento`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: escala-decimal — N=a·10² c3; régua logarítmica entre 10² e 10³, corte √10·10², ordem c4; emite a.
- **Sliders:** a · Coeficiente · 2..4 · passo 1 · inicial 2 · c1
- **Paco (abertura):** "300 e 400 têm a mesma ordem mais próxima? Leve a de 2 até 4 e observe o corte √10."
- **Interação do aluno:** Passa por a=3 abaixo do corte e a=4 acima; marca ordem de 400 como 10³.
- **Conclusão:** `a ≥ 4`
- **Paco (conclusão):** "Não; 3<√10<4, por isso 300 tem ordem 10² e 400 tem ordem 10³."
- **Tati (dúvida):** `fim` — P: "Arredondar 9,96 para duas casas significativas dá 10?" / R: "Dá 10, que precisa ser reescrito como 1,0·10¹ para ficar normalizado."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: escala-decimal-figura — 200 no quadro de ordens, decomposição 2·10² e faixa de normalização; versão estática.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a notação científica de 200?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 20·10¹ | não | "O valor coincide, mas o coeficiente 20 não está normalizado; use 2·10²." | Destaca o coeficiente 20 fora de [1;10). |
| `micro-acerto` | 2·10² | **sim** | "Certo: 2·10²; 200=2·10², com 1≤2<10." | Destaca 2 em c1 e expoente 2 em c2. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: escala-decimal-figura — 200 no quadro de ordens, decomposição 2·10² e faixa de normalização; versão estática.
- **Fórmula:** `N`→c3 · `=a`→c1 · `·10ⁿ`→c2 · `; 1≤a<10; ordem`→c4 · `=10ⁿ se a<√10, senão 10ⁿ⁺¹`
- **Definições:**
  - "Coeficiente a: Fator normalizado entre 1 e 10."
  - "Valor N: Número representado pelo produto."
  - "Ordem de grandeza: Potência de dez mais próxima em escala logarítmica."
- **Paco (abertura):** "Mudar a escala exige compensar o coeficiente; por isso a·10ⁿ representa o mesmo valor após a normalização."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Quanto vale 10⁰?"
- **Figura:** nenhuma
- **Conta de conferência:** 10⁰=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-notacao-cientifica-e-ordem-grandeza-erro` | 0 | não | "Você confundiu expoente zero com valor zero. O certo é 1; 10⁰=1." |
| `f1-notacao-cientifica-e-ordem-grandeza-certa` | 1 | **sim** | "Certo: 1; 10⁰=1." |

#### F2 — `f2-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Em 2·10³, qual é o expoente?"
- **Figura:** nenhuma
- **Conta de conferência:** n=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-notacao-cientifica-e-ordem-grandeza-certa` | 3 | **sim** | "Certo: 3; n=3." |
| `f2-notacao-cientifica-e-ordem-grandeza-erro` | 2 | não | "Você trocou coeficiente e expoente. O certo é 3; n=3." |

#### F3 — `f3-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Qual coeficiente está normalizado: 2 ou 20?"
- **Figura:** nenhuma
- **Conta de conferência:** 1≤2<10.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-notacao-cientifica-e-ordem-grandeza-erro` | 20 | não | "O coeficiente deve ficar entre 1 e 10. O certo é 2; 1≤2<10." |
| `f3-notacao-cientifica-e-ordem-grandeza-certa` | 2 | **sim** | "Certo: 2; 1≤2<10." |

#### F4 — `f4-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Multiplicar por 10 desloca a vírgula para qual lado?"
- **Figura:** nenhuma
- **Conta de conferência:** 2,5·10=25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-notacao-cientifica-e-ordem-grandeza-certa` | Direita | **sim** | "Certo: Direita; 2,5·10=25." |
| `f4-notacao-cientifica-e-ordem-grandeza-erro` | Esquerda | não | "Você fez a operação inversa. O certo é Direita; 2,5·10=25." |

### Médias

#### M1 — `m1-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Escreva 300 em notação científica."
- **Figura:** nenhuma
- **Conta de conferência:** 3·100=300.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-notacao-cientifica-e-ordem-grandeza-erro` | 3·10³ | não | "Você contou uma casa a mais. O certo é 3·10²; 3·100=300." |
| `m1-notacao-cientifica-e-ordem-grandeza-certa` | 3·10² | **sim** | "Certo: 3·10²; 3·100=300." |

#### M2 — `m2-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Escreva 0,02 em notação científica."
- **Figura:** nenhuma
- **Conta de conferência:** 2/100=0,02.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-notacao-cientifica-e-ordem-grandeza-certa` | 2·10⁻² | **sim** | "Certo: 2·10⁻²; 2/100=0,02." |
| `m2-notacao-cientifica-e-ordem-grandeza-erro` | 2·10² | não | "Você trocou o sinal do expoente. O certo é 2·10⁻²; 2/100=0,02." |

#### M3 — `m3-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Quanto vale (2·10²)·(3·10¹)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2·3=6; 10²·10¹=10³.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-notacao-cientifica-e-ordem-grandeza-erro` | 5·10³ | não | "Você somou coeficientes em um produto. O certo é 6·10³; 2·3=6; 10²·10¹=10³." |
| `m3-notacao-cientifica-e-ordem-grandeza-certa` | 6·10³ | **sim** | "Certo: 6·10³; 2·3=6; 10²·10¹=10³." |

### Desafios

#### D1 — `d1-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Arredonde 9,96·10² para dois algarismos significativos."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 9,96→10; 10·10²=1,0·10³.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-notacao-cientifica-e-ordem-grandeza-certa` | 1,0·10³ | **sim** | "Certo: 1,0·10³; 9,96→10; 10·10²=1,0·10³." |
| `d1-notacao-cientifica-e-ordem-grandeza-erro` | 9,9·10² | não | "Você truncou em vez de arredondar. O certo é 1,0·10³; 9,96→10; 10·10²=1,0·10³." |

#### D2 — `d2-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Zero tem forma normalizada a·10ⁿ com 1≤a<10?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** a·10ⁿ>0 nesse intervalo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-notacao-cientifica-e-ordem-grandeza-erro` | Sim | não | "Todo coeficiente permitido é não nulo. O certo é Não; a·10ⁿ>0 nesse intervalo." |
| `d2-notacao-cientifica-e-ordem-grandeza-certa` | Não | **sim** | "Certo: Não; a·10ⁿ>0 nesse intervalo." |

#### D3 — `d3-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Pela convenção do corte √10, qual é a ordem de grandeza de 400?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 4>√10; sobe uma ordem.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-notacao-cientifica-e-ordem-grandeza-certa` | 10³ | **sim** | "Certo: 10³; 4>√10; sobe uma ordem." |
| `d3-notacao-cientifica-e-ordem-grandeza-erro` | 10² | não | "Você tomou o expoente sem comparar o coeficiente. O certo é 10³; 4>√10; sobe uma ordem." |

#### D4 — `d4-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Quanto vale (3·10²)÷(6·10³) em notação científica?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 300/6000=0,05=5·10⁻².

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-notacao-cientifica-e-ordem-grandeza-erro` | 0,5·10⁻¹ | não | "O valor é igual, mas o coeficiente não está normalizado. O certo é 5·10⁻²; 300/6000=0,05=5·10⁻²." |
| `d4-notacao-cientifica-e-ordem-grandeza-certa` | 5·10⁻² | **sim** | "Certo: 5·10⁻²; 300/6000=0,05=5·10⁻²." |

#### D5 — `d5-notacao-cientifica-e-ordem-grandeza`
- **Enunciado:** "Uma amostra tem 2·10³ células por mL; em 0,5 mL, quantas células há e qual é a ordem?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2000·0,5=1000=1·10³.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-notacao-cientifica-e-ordem-grandeza-certa` | 1·10³; ordem 10³ | **sim** | "Certo: 1·10³; ordem 10³; 2000·0,5=1000=1·10³." |
| `d5-notacao-cientifica-e-ordem-grandeza-erro` | 4·10³; ordem 10⁴ | não | "Você dividiu pela metade em vez de multiplicar o volume. O certo é 1·10³; ordem 10³; 2000·0,5=1000=1·10³." |

### Vestibular

#### V1 — `enem-2019-virus`
- **Enunciado:** "O vírus influenza tem diâmetro interno de 0,00011 mm; como escrever essa medida em notação científica?"
- **Fala do Paco:** "Conte quantas casas a vírgula anda para a direita até ficar entre o 1 e o 1."
- **Fonte:** ENEM 2019 (adaptada); Questão 140: enunciado resumido; alternativas e gabarito (1,1 × 10⁻⁴) mantidos; https://api.enem.dev/v1/exams/2019/questions/140
- **Conta de conferência:** 0,00011 = 1,1 · 10⁻⁴.

#### V2 — `enem-2022-bilhao`
- **Enunciado:** "Um filme arrecadou R$ 1,35 bilhão em bilheteria; como escrever essa quantia com todos os seus algarismos?"
- **Fala do Paco:** "1 bilhão vale 10⁹ (um 1 seguido de 9 zeros)."
- **Fonte:** ENEM 2022 (adaptada); Questão 175: enunciado resumido; alternativas e gabarito (1 350 000 000,00) mantidos; https://api.enem.dev/v1/exams/2022/questions/175
- **Conta de conferência:** 1,35 · 10⁹ = 1 350 000 000,00.

#### V3 — `v3-notacao-cientifica-e-ordem-grandeza`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema notação científica, estimativa e arredondamento.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-notacao-cientifica-e-ordem-grandeza`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema notação científica, estimativa e arredondamento.
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
