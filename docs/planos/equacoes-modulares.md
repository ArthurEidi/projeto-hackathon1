# Plano — Equações modulares

**Aula:** 1 — Equações modulares · Duas posições, uma distância
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-modulares
**Pré-requisitos que o aluno já domina:** `funcao-modular`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla x na reta. A distância ao centro c depende de x; resolver pede alcançar uma distância r.

## b) Visual de partida

reta_numerica — intervalo −5..5; origem c4; ponto x=1, passo 1; distanciaZero ligada,c3.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Com centro c=0 e raio r=0, só a origem serve; depois o raio cresce e surgem dois lados.

## d) Panorama e recorte

Módulo também aparece em inequações e funções; aqui buscamos pontos a uma distância fixa.

## e) Progressão por contraste

1. Referência visual: Arrasta e vê o segmento de distância encolher a zero.
2. Em contraste com a referência: Arrasta à esquerda e lê distância 2.
3. Aprofundamento e fronteiras: Move do vértice (1;0) ao encontro (3;2).

## f) Dedução causal da forma

Se x está à direita de c, a distância é x−c; à esquerda, c−x. Igualar a r≥0 dá x=c+r ou x=c−r; se r<0, nenhuma distância serve.

Fórmula deduzida: ∣x−c∣=r ⇒ x=c±r, r≥0.

## g) Simulação espacial e fronteiras

r=0 junta os dois candidatos num só; r<0 dá conjunto vazio. Deslocar o centro não muda a distância entre soluções, 2r.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Posição do ponto na reta. |
| c2 | Centro c | Referência a partir da qual medimos distância. |
| c3 | Distância | Comprimento entre a entrada e o centro. |
| c4 | Soluções | Pontos à distância pedida do centro. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −5..5; origem c4; ponto x=1, passo 1; distanciaZero ligada,c3.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro ∣x∣=0, existe outro ponto além da origem? Arraste até 0."
- **Interação do aluno:** Arrasta e vê o segmento de distância encolher a zero.
- **Conclusão:** `ponto_x ≤ 0`
- **Paco (conclusão):** "Não; só a origem tem distância zero dela mesma."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Módulo também aparece em inequações e funções; aqui buscamos pontos a uma distância fixa."

### Passo 2 — `dois-lados`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** reta_numerica — intervalo −5..5; pontos −2 e 2 c4; ponto x=0, passo 1; distanciaZero ligada,c3.
- **Sliders:** nenhum
- **Paco (abertura):** "Para ∣x∣=2, o lado negativo também serve? Arraste até −2."
- **Interação do aluno:** Arrasta à esquerda e lê distância 2.
- **Conclusão:** `ponto_x ≤ −2`
- **Paco (conclusão):** "Serve; −2 e 2 ficam a duas unidades de zero."

### Passo 3 — `mover-centro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — modular a=1,b=1,c=0,c3; horizontal y=2 ink; ponto x=1, passo 1; encontro c4; fantasma ∣x∣.
- **Sliders:** nenhum
- **Paco (abertura):** "Ao mudar o centro para 1, onde fica a solução da direita? Arraste até 3."
- **Interação do aluno:** Move do vértice (1;0) ao encontro (3;2).
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Fica em 3 porque 3−1=2; a outra é −1, por isso x=c±r."
- **Tati (dúvida):** `fim` — P: "E se a distância pedida for −2?" / R: "Não existe solução, pois distâncias não são negativas."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — modular a=1,b=1,c=0,c3 e y=2 ink; janela x −3..5, y −1..4; encontros c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Quais soluções tem ∣x−1∣=2?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 1 e 3 | não | "Faltou andar duas unidades à esquerda; as soluções são −1 e 3." | Marca x=1 no vértice, onde a distância é zero. |
| `micro-acerto` | −1 e 3 | **sim** | "Certo: −1 e 3; 1−2=−1 e 1+2=3." | Marca encontros em x=−1 e x=3. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — ∣x−1∣ e y=2; c=1 em c2, r=2 em c3, soluções −1 e 3 em c4; janela x −3..5,y −1..4.
- **Fórmula:** `∣x`→c1 · `−c`→c2 · `∣=r ⇒ x=c±r`→c4 · `, r≥0`
- **Definições:**
  - "Entrada x: Posição do ponto na reta."
  - "Distância: Comprimento entre a entrada e o centro."
  - "Soluções: Pontos à distância pedida do centro."
- **Paco (abertura):** "A distância mede os dois lados do centro; por isso as soluções são c−r e c+r quando r≥0."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-modulares`
- **Enunciado:** "Qual é a distância de −2 até zero?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣−2∣=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-modulares-erro` | −2 | não | "Distância não leva sinal negativo. O certo é 2; ∣−2∣=2." |
| `f1-equacoes-modulares-certa` | 2 | **sim** | "Certo: 2; ∣−2∣=2." |

#### F2 — `f2-equacoes-modulares`
- **Enunciado:** "Quantas soluções tem ∣x∣=0?"
- **Figura:** nenhuma
- **Conta de conferência:** x=±0=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-modulares-certa` | 1 | **sim** | "Certo: 1; x=±0=0." |
| `f2-equacoes-modulares-erro` | 2 | não | "Os dois candidatos coincidem em zero. O certo é 1; x=±0=0." |

#### F3 — `f3-equacoes-modulares`
- **Enunciado:** "Quais pontos ficam a 2 de zero?"
- **Figura:** nenhuma
- **Conta de conferência:** ∣−2∣=∣2∣=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-modulares-erro` | 0 e 2 | não | "O centro tem distância zero. O certo é −2 e 2; ∣−2∣=∣2∣=2." |
| `f3-equacoes-modulares-certa` | −2 e 2 | **sim** | "Certo: −2 e 2; ∣−2∣=∣2∣=2." |

#### F4 — `f4-equacoes-modulares`
- **Enunciado:** "Em ∣x−1∣=2, qual é o centro?"
- **Figura:** nenhuma
- **Conta de conferência:** x−1=0 em x=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-modulares-certa` | 1 | **sim** | "Certo: 1; x−1=0 em x=1." |
| `f4-equacoes-modulares-erro` | −1 | não | "Você confundiu a expressão com a raiz do fator. O certo é 1; x−1=0 em x=1." |

### Médias

#### M1 — `m1-equacoes-modulares`
- **Enunciado:** "Resolva ∣x∣=3."
- **Figura:** nenhuma
- **Conta de conferência:** x=±3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-modulares-erro` | Só 3 | não | "Faltou o lado esquerdo. O certo é −3 e 3; x=±3." |
| `m1-equacoes-modulares-certa` | −3 e 3 | **sim** | "Certo: −3 e 3; x=±3." |

#### M2 — `m2-equacoes-modulares`
- **Enunciado:** "Resolva ∣x−2∣=1."
- **Figura:** nenhuma
- **Conta de conferência:** x=2±1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-modulares-certa` | 1 e 3 | **sim** | "Certo: 1 e 3; x=2±1." |
| `m2-equacoes-modulares-erro` | −1 e 1 | não | "Você esqueceu o centro 2. O certo é 1 e 3; x=2±1." |

#### M3 — `m3-equacoes-modulares`
- **Enunciado:** "Resolva ∣x+1∣=2."
- **Figura:** nenhuma
- **Conta de conferência:** x=−1±2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-modulares-erro` | −1 e 3 | não | "O centro é −1, não 1. O certo é −3 e 1; x=−1±2." |
| `m3-equacoes-modulares-certa` | −3 e 1 | **sim** | "Certo: −3 e 1; x=−1±2." |

### Desafios

#### D1 — `d1-equacoes-modulares`
- **Enunciado:** "Resolva ∣2x−1∣=0."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x−1=0; x=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-modulares-certa` | 0,5 | **sim** | "Certo: 0,5; 2x−1=0; x=1/2." |
| `d1-equacoes-modulares-erro` | 1 | não | "Você não dividiu pelo coeficiente 2. O certo é 0,5; 2x−1=0; x=1/2." |

#### D2 — `d2-equacoes-modulares`
- **Enunciado:** "Resolva ∣x−2∣=−1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** ∣x−2∣≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-modulares-erro` | {1;3} | não | "Você tratou uma distância negativa como positiva. O certo é ∅; ∣x−2∣≥0." |
| `d2-equacoes-modulares-certa` | ∅ | **sim** | "Certo: ∅; ∣x−2∣≥0." |

#### D3 — `d3-equacoes-modulares`
- **Enunciado:** "Se as soluções são −1 e 3, qual é o centro?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (−1+3)/2=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-modulares-certa` | 1 | **sim** | "Certo: 1; (−1+3)/2=1." |
| `d3-equacoes-modulares-erro` | 2 | não | "Você confundiu centro com raio. O certo é 1; (−1+3)/2=1." |

#### D4 — `d4-equacoes-modulares`
- **Enunciado:** "Resolva ∣2x∣=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x=±1; x=±1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-modulares-erro` | −2 e 2 | não | "Você multiplicou por 2 em vez de dividir. O certo é −0,5 e 0,5; 2x=±1; x=±1/2." |
| `d4-equacoes-modulares-certa` | −0,5 e 0,5 | **sim** | "Certo: −0,5 e 0,5; 2x=±1; x=±1/2." |

#### D5 — `d5-equacoes-modulares`
- **Enunciado:** "Um sensor está em x=2 e detecta pontos a distância 3; restringindo x≥0, qual ponto resta?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x=2±3; x≥0 ⇒ x=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-modulares-certa` | 5 | **sim** | "Certo: 5; x=2±3; x≥0 ⇒ x=5." |
| `d5-equacoes-modulares-erro` | −1 e 5 | não | "Você ignorou a restrição do modelo. O certo é 5; x=2±3; x≥0 ⇒ x=5." |

### Vestibular

**B42 (19/11/2026): questões de provas oficiais conferidas no PDF e inseridas na aula** (registro em `docs/revisao/vestibular-b42.md`). Os espaços PENDENTE-FONTE abaixo continuam abertos para outras questões.

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `ufrgs-2022-area-modulos`
- **Enunciado (resumido):** "Qual é a área da região entre os gráficos de f(x) = |x − 2| + 1 e g(x) = −|x| + 5?"
- **Fala do Paco:** "Os gráficos se cruzam onde |x − 2| + |x| = 4: a soma das distâncias até 2 e até 0 vale 4."
- **Fonte:** UFRGS 2022 (adaptada) — **Adaptação:** 1º dia, Questão 57: enunciado reescrito como pergunta; alternativas e gabarito oficial (B) mantidos. — **URL:** https://www.ufrgs.br/coperse/wp-content/uploads/2022/03/PROVAS-1o-DIA.pdf · https://vestibular.ufrgs.br/cv2022/gabaritos/
- **Conta de conferência:** |x − 2| + |x| = 4 ⇒ x = −1 ou 3; vértices (−1; 4), (0; 5), (3; 2), (2; 1); retângulo √2 × 3√2 = 6 (B).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a4` | 4 | não | "4 é a distância entre os cruzamentos x = −1 e x = 3, não a área. A região é um retângulo de lados √2 e 3√2: área 6." |
| `a6` | 6 | **sim** | "Isso. Os cruzamentos são x = −1 e x = 3; a região tem vértices (−1; 4), (0; 5), (3; 2) e (2; 1): retângulo √2 por 3√2, área 6." |
| `a10` | 10 | não | "10 trata a região como triângulo de base 4 (de −1 a 3) e altura 5. É um retângulo de lados √2 e 3√2: área 6." |
| `a15` | 15 | não | "Os vértices são (−1; 4), (0; 5), (3; 2) e (2; 1), e os lados medem √2 e 3√2. A área é √2 · 3√2 = 6." |
| `a20` | 20 | não | "20 = 4 · 5 multiplica a largura entre os cruzamentos pela altura do topo. É um retângulo inclinado de lados √2 e 3√2: área 6." |

#### V2 — `v1-equacoes-modulares`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações modulares.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v2-equacoes-modulares`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações modulares.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v3-equacoes-modulares`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações modulares.
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
