# Plano — Sistemas lineares, classificação e escalonamento

**Aula:** 1 — Sistemas lineares, classificação e escalonamento · Eliminar sem perder soluções
**Caminho:** algebra / matrizes-e-sistemas / sistemas-lineares-e-escalonamento
**Pré-requisitos que o aluno já domina:** `matrizes-determinantes-sistemas`, `equacoes-primeiro-grau`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe uma operação entre linhas de um sistema. As equações mudam, mas operações reversíveis conservam o conjunto de pontos comuns.

## b) Visual de partida

plano_cartesiano — afins y=−x+3,c3 e y=−2x+4,ink; ponto x=0,passo 1; encontro c1.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Somar zero vezes uma linha à outra não muda o sistema; as duas retas originais ficam como referência.

## d) Panorama e recorte

Sistemas podem ter mais incógnitas; aqui escalonamos 2×2 e 3×3 e classificamos pivôs, contradições e variáveis livres.

## e) Progressão por contraste

1. Referência visual: Arrasta até (1;2).
2. Em contraste com a referência: Vê segunda linha virar [0,−1;−2] e reta y=2.
3. Aprofundamento e fronteiras: Move t até 1; recalcula y=2−t e x=3−y−t.
4. Depois, teste de fronteira: Retas coincidentes viram paralelas; linha final passa a 0=1.

## f) Dedução causal da forma

Subtrair múltiplo de outra equação preserva soluções porque a operação pode ser desfeita. Uma linha 0=0 não impõe restrição; 0=c≠0 impossibilita o sistema. Sem contradição, cada variável sem pivô fica livre.

Fórmula deduzida: L₂←L₂−kL₁; 0=0: livre; 0=c≠0: impossível.

## g) Simulação espacial e fronteiras

Não multiplicar linha por zero como operação equivalente. Ao zerar uma coluna, escolher outro pivô não nulo ou trocar linhas; em 3×3 podem existir uma ou duas variáveis livres.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Par solução | Valores que atendem a todas as equações. |
| c2 | Multiplicador k | Número de cópias de uma linha que retiramos. |
| c3 | Equações | Condições simultâneas antes e depois da operação. |
| c4 | Pivôs e classificação | Marcas que revelam solução única, livre ou impossível. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — afins y=−x+3,c3 e y=−2x+4,ink; ponto x=0,passo 1; encontro c1.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro, as linhas ainda não mudaram; onde x+y=3 e 2x+y=4 se encontram?"
- **Interação do aluno:** Arrasta até (1;2).
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Em (1;2), pois 1+2=3 e 2·1+2=4."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Sistemas podem ter mais incógnitas; aqui escalonamos 2×2 e 3×3 e classificamos pivôs, contradições e variáveis livres."

### Passo 2 — `eliminar-linha`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: sistema-escalonado — matriz aumentada [[1,1;3],[2,1;4]], L₂←L₂−kL₁; retas originais fantasma, nova equação e pivôs c4; emite k.
- **Sliders:** k · Múltiplo retirado · 0..2 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Ao retirar duas vezes L₁ de L₂, x some sem mudar o encontro? Leve k a 2."
- **Interação do aluno:** Vê segunda linha virar [0,−1;−2] e reta y=2.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Sim; sobra −y=−2, então y=2 e x=1; por isso eliminar conserva a solução."

### Passo 3 — `subir-tres-linhas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: sistema-escalonado — linhas x+y+z=3, y+z=2, z=t; mostra substituição de baixo para cima e ponto (x;y;z) em tabela, sem simular plano 3D; emite t.
- **Sliders:** t · Valor de z · 0..1 · passo 1 · inicial 0 · ink
- **Paco (abertura):** "No sistema triangular, se z passar de 0 para 1, quais valores sobram para y e x?"
- **Interação do aluno:** Move t até 1; recalcula y=2−t e x=3−y−t.
- **Conclusão:** `t ≥ 1`
- **Paco (conclusão):** "Ficam y=1 e x=1; começamos pela última linha, por isso cada substituição usa um valor já conhecido."
- **Tati (dúvida):** `fim` — P: "E se a última linha fosse 0=0?" / R: "z ficaria livre; então y=2−z e x=1, com infinitas soluções."

### Passo 4 — `classificar-linha`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** WIDGET NOVO: sistema-escalonado — sistema x+y=2 e 2x+2y=4+t; linhas e L₂−2L₁; pivôs c4; emite t.
- **Sliders:** t · Deslocamento · 0..1 · passo 1 · inicial 0 · ink
- **Paco (abertura):** "Se a última coluna ganhar 1, a linha 0=0 continua compatível? Leve t a 1."
- **Interação do aluno:** Retas coincidentes viram paralelas; linha final passa a 0=1.
- **Conclusão:** `t ≥ 1`
- **Paco (conclusão):** "Não; 0=1 é impossível, por isso o sistema deixa de ter infinitas soluções e fica sem solução."
- **Tati (dúvida):** `fim` — P: "Posso multiplicar uma linha por zero?" / R: "Não como operação equivalente; isso apagaria uma condição do sistema."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: sistema-escalonado-figura — linhas x+y=2, 2x+2y=5 e resultado L₂−2L₁: 0=1; versão estática.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Após escalonar, aparece 0x+0y=1; quantas soluções há?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | Infinitas | não | "Você confundiu 0=1 com 0=0; a contradição dá nenhuma solução." | Exibe retas y=−x+2 e y=−x+2,5, paralelas distintas. |
| `micro-acerto` | Nenhuma | **sim** | "Certo: Nenhuma; Zero nunca é igual a 1." | Destaca a linha 0=1 e a ausência de pontos comuns. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: sistema-escalonado-figura — x+y=3, 2x+y=4; k=2, L₂−2L₁ resulta −y=−2; pivôs 1 e −1 em c4, solução (1;2) c1.
- **Fórmula:** `L₂`→c3 · `←L₂−k`→c2 · `L₁; 0=0: livre; 0=c≠0: impossível`→c4
- **Definições:**
  - "Par solução: Valores que atendem a todas as equações."
  - "Equações: Condições simultâneas antes e depois da operação."
  - "Pivôs e classificação: Marcas que revelam solução única, livre ou impossível."
- **Paco (abertura):** "As operações reversíveis conservam as soluções; por isso pivôs e linhas nulas revelam a classificação."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-sistemas-lineares-e-escalonamento`
- **Enunciado:** "A linha 0=1 indica o quê?"
- **Figura:** nenhuma
- **Conta de conferência:** 0≠1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-sistemas-lineares-e-escalonamento-erro` | Variável livre | não | "Você confundiu contradição com linha nula. O certo é Impossibilidade; 0≠1." |
| `f1-sistemas-lineares-e-escalonamento-certa` | Impossibilidade | **sim** | "Certo: Impossibilidade; 0≠1." |

#### F2 — `f2-sistemas-lineares-e-escalonamento`
- **Enunciado:** "A linha 0=0 acrescenta alguma restrição?"
- **Figura:** nenhuma
- **Conta de conferência:** 0=0 sempre.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-sistemas-lineares-e-escalonamento-certa` | Não | **sim** | "Certo: Não; 0=0 sempre." |
| `f2-sistemas-lineares-e-escalonamento-erro` | Sim | não | "Uma identidade vale para qualquer incógnita. O certo é Não; 0=0 sempre." |

#### F3 — `f3-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Multiplicar uma linha por zero é operação reversível?"
- **Figura:** nenhuma
- **Conta de conferência:** Não se recupera a linha dividindo por zero.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-sistemas-lineares-e-escalonamento-erro` | Sim | não | "Essa operação apaga informação. O certo é Não; Não se recupera a linha dividindo por zero." |
| `f3-sistemas-lineares-e-escalonamento-certa` | Não | **sim** | "Certo: Não; Não se recupera a linha dividindo por zero." |

#### F4 — `f4-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Trocar a ordem das equações muda as soluções?"
- **Figura:** nenhuma
- **Conta de conferência:** As mesmas igualdades continuam exigidas.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-sistemas-lineares-e-escalonamento-certa` | Não | **sim** | "Certo: Não; As mesmas igualdades continuam exigidas." |
| `f4-sistemas-lineares-e-escalonamento-erro` | Sim | não | "A ordem não muda as condições simultâneas. O certo é Não; As mesmas igualdades continuam exigidas." |

### Médias

#### M1 — `m1-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Resolva x+y=3 e 2x+y=4."
- **Figura:** nenhuma
- **Conta de conferência:** L₂−L₁: x=1; y=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-sistemas-lineares-e-escalonamento-erro` | (2;1) | não | "Você trocou as incógnitas. O certo é (1;2); L₂−L₁: x=1; y=2." |
| `m1-sistemas-lineares-e-escalonamento-certa` | (1;2) | **sim** | "Certo: (1;2); L₂−L₁: x=1; y=2." |

#### M2 — `m2-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Em x+y=2 e 2x+2y=4, quantas soluções há?"
- **Figura:** nenhuma
- **Conta de conferência:** L₂−2L₁ dá 0=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-sistemas-lineares-e-escalonamento-certa` | Infinitas | **sim** | "Certo: Infinitas; L₂−2L₁ dá 0=0." |
| `m2-sistemas-lineares-e-escalonamento-erro` | Uma | não | "Você contou duas equações dependentes como independentes. O certo é Infinitas; L₂−2L₁ dá 0=0." |

#### M3 — `m3-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Em x+y=2 e 2x+2y=5, quantas soluções há?"
- **Figura:** nenhuma
- **Conta de conferência:** L₂−2L₁ dá 0=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-sistemas-lineares-e-escalonamento-erro` | Infinitas | não | "Você ignorou a última coluna. O certo é Nenhuma; L₂−2L₁ dá 0=1." |
| `m3-sistemas-lineares-e-escalonamento-certa` | Nenhuma | **sim** | "Certo: Nenhuma; L₂−2L₁ dá 0=1." |

### Desafios

#### D1 — `d1-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Resolva 2x+y=2 e y=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x=1; x=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-sistemas-lineares-e-escalonamento-certa` | (0,5;1) | **sim** | "Certo: (0,5;1); 2x=1; x=1/2." |
| `d1-sistemas-lineares-e-escalonamento-erro` | (1;1) | não | "Você esqueceu o coeficiente 2. O certo é (0,5;1); 2x=1; x=1/2." |

#### D2 — `d2-sistemas-lineares-e-escalonamento`
- **Enunciado:** "No sistema x+y+z=3 e y+z=2, qual variável pode ficar livre?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x=1; y=2−z.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-sistemas-lineares-e-escalonamento-erro` | x | não | "Você escolheu uma variável determinada. O certo é z; x=1; y=2−z." |
| `d2-sistemas-lineares-e-escalonamento-certa` | z | **sim** | "Certo: z; x=1; y=2−z." |

#### D3 — `d3-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Resolva x+y+z=3, y+z=2 e z=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** z=1; y=1; x=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-sistemas-lineares-e-escalonamento-certa` | (1;1;1) | **sim** | "Certo: (1;1;1); z=1; y=1; x=1." |
| `d3-sistemas-lineares-e-escalonamento-erro` | (3;2;1) | não | "Você leu os termos independentes como incógnitas. O certo é (1;1;1); z=1; y=1; x=1." |

#### D4 — `d4-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Em x+y=2 e 2x+ky=4, qual k gera infinitas soluções?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** L₂−2L₁: (k−2)y=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-sistemas-lineares-e-escalonamento-erro` | 4 | não | "Você confundiu coeficiente com termo independente. O certo é 2; L₂−2L₁: (k−2)y=0." |
| `d4-sistemas-lineares-e-escalonamento-certa` | 2 | **sim** | "Certo: 2; L₂−2L₁: (k−2)y=0." |

#### D5 — `d5-sistemas-lineares-e-escalonamento`
- **Enunciado:** "Um sistema 3×3 escalonado dá x+y+z=3, y−z=0 e 0=0; qual é a solução geral?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** z=t; y=t; x=3−2t.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-sistemas-lineares-e-escalonamento-certa` | (3−2t;t;t), t∈R | **sim** | "Certo: (3−2t;t;t), t∈R; z=t; y=t; x=3−2t." |
| `d5-sistemas-lineares-e-escalonamento-erro` | (1;1;1) apenas | não | "Você fixou sem motivo a variável livre. O certo é (3−2t;t;t), t∈R; z=t; y=t; x=3−2t." |

### Vestibular

#### V1 — `v1-sistemas-lineares-e-escalonamento`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema sistemas lineares, classificação e escalonamento.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-sistemas-lineares-e-escalonamento`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema sistemas lineares, classificação e escalonamento.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-sistemas-lineares-e-escalonamento`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema sistemas lineares, classificação e escalonamento.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-sistemas-lineares-e-escalonamento`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema sistemas lineares, classificação e escalonamento.
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
