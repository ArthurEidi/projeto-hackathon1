# Plano — Função composta e inversa

**Aula:** 1 — Função composta e função inversa · Função composta e inversa
**Caminho:** algebra / funcoes / funcao-composta-e-inversa
**Pré-requisitos que o aluno já domina:** introducao-a-funcoes, funcao-afim

## a) Ancoragem mecânica

Na composição, x entra em g e a saída g(x) vira entrada de f; resultado (f∘g)(x). A inversa desfaz a regra original, trocando entrada e saída quando há bijeção.

## b) Visual de partida

O plano mostra f,g e y=x. Como não há diagrama de máquinas encadeadas nem troca automática de coordenadas, usamos WIDGET NOVO para entrada e saídas em cada etapa.

## c) Caso neutro

A identidade f(x)=x devolve x e é sua própria inversa. Para composição, g(x)=x+1 seguida de f(x)=2x mostra que a ordem das etapas importa.

## d) Panorama e recorte

Composição encadeia funções; inversa desfaz uma função e reflete seu gráfico em y=x. Aqui calculamos regras simples; funções não injetivas precisam de restrição de domínio.

## e) Progressão por contraste

1. A identidade é o caso neutro.
2. g=x+1 e depois f=2x dá 2(x+1); inverter a ordem dá 2x+1.
3. Trocar coordenadas de (x;y) reflete o gráfico em y=x.
4. Se uma horizontal cruza o gráfico mais de uma vez, não há inversa global sem restringir domínio.

## f) Dedução causal da forma

A composição substitui a saída interna na regra externa: f(g(x)). Com f=2x e g=x+1, sai 2(x+1). Para inversa, trocamos x,y em y=2x+1 e isolamos y; f⁻¹(x)=(x−1)/2.

## g) Simulação espacial e fronteiras

Composição exige que a saída da primeira regra pertença ao domínio da segunda. Inversa só é função quando cada saída vem de uma entrada única. Em x², restringir a x≥0 permite inversa √x.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Valor inicial que percorre a primeira máquina. |
| c2 | Saída composta | Resultado de f após receber a saída g(x). |
| c3 | Máquina interna g | Regra aplicada primeiro na composição f(g(x)). |
| c4 | Diagonal y=x | Espelho de pontos correspondentes da função e sua inversa. |

### Passo 1 — `identidade`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `WIDGET NOVO: encadeador-de-funcoes` — Desenha máquina identidade e y=x; aluno testa entradas. Métrica: entradas_testadas ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? f(x)=x; a entrada muda?"
- **Interação do aluno:** Passe −1 e 2 pela máquina e compare entrada e saída.
- **Conclusão:** `entradas_testadas ≥ 2`
- **Paco (conclusão):** "A identidade devolve x e é sua própria inversa."
- **Tati (dúvida):** `fim` — P: "A ordem das máquinas importa?" / R: "Sim; trocar a ordem pode mudar a saída."

### Passo 2 — `ordem-maquinas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `WIDGET NOVO: encadeador-de-funcoes` — Desenha g=x+1 e f=2x em sequência; aluno escolhe ordem. Métrica: ordens_testadas ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Trocar a ordem das máquinas muda a saída?"
- **Interação do aluno:** Compare g depois f com f depois g em x=1.
- **Conclusão:** `ordens_testadas ≥ 2`
- **Paco (conclusão):** "Uma ordem dá 4 e a outra 3; composição depende da ordem."

### Passo 3 — `reflexao-inversa`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `plano_cartesiano` — Mostra y=2x+1 e candidata inversa com y=x como espelho.
- **Sliders:** nenhum
- **Paco (abertura):** "Que ponto espelha (1;3) em y=x?"
- **Interação do aluno:** Arraste (1;3) e acompanhe a troca para (3;1).
- **Conclusão:** `faixa_x ≥ 2`
- **Paco (conclusão):** "A inversa troca entrada e saída; os gráficos refletem em y=x."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=2x+1 e y=x
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Qual é a inversa de f(x)=2x+1?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | 2x−1 | não | "Não desfaz as operações na ordem inversa; y=2x+1 ⇒ x=(y−1)/2; logo f⁻¹(x)=(x−1)/2." | Plota a falsa inversa 2x−1 e mostra que não é reflexo de f. |
| `certa` | (x−1)/2 | **sim** | "y=2x+1 ⇒ x=(y−1)/2; logo f⁻¹(x)=(x−1)/2." | marca a resposta no gráfico. |
- **Paco (conclusão):** "y=2x+1 ⇒ x=(y−1)/2; logo f⁻¹(x)=(x−1)/2."
- **Tati (dúvida):** `fim` — P: "E se a entrada estiver na fronteira?" / R: "A condição do domínio decide se o ponto entra e qual regra vale."

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=2x+1 e y=(x−1)/2, refletidos em y=x.
- **Fórmula:** (f∘g)(x)→c2 = f(g(x)); f⁻¹(f(x))=x
- **Definições:**
  - "Composição: saída interna vira entrada externa."
  - "Inversa: troca entrada e saída."
  - "Inversa exige correspondência única."
- **Paco (abertura):** "Como a figura explica a regra? Por isso (f∘g)(x)=f(g(x)); f⁻¹ desfaz f."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "O desenho vale fora do domínio?" / R: "Não; as condições da função limitam as entradas válidas."

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso (f∘g)(x)=f(g(x)); f⁻¹ desfaz f."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-funcao-composta-e-inversa`
- **Enunciado:** "f(x)=x e g(x)=3. Quanto vale (f∘g)(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** g(2)=3; f(3)=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-funcao-composta-e-inversa-e` | 2 | não | "Resposta: 3; Usa entrada original sem aplicar g; conferência: g(2)=3; f(3)=3." |
| `f1-funcao-composta-e-inversa-c` | 3 | **sim** | "Certo: resposta 3; conferência: g(2)=3; f(3)=3." |

#### F2 — `f2-funcao-composta-e-inversa`
- **Enunciado:** "f=2x e g=x+1. Quanto vale f(g(1))?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** g(1)=2; f(2)=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-funcao-composta-e-inversa-e` | 3 | não | "Resposta: 4; Aplica as máquinas em ordem inversa; conferência: g(1)=2; f(2)=4." |
| `f2-funcao-composta-e-inversa-c` | 4 | **sim** | "Certo: resposta 4; conferência: g(1)=2; f(2)=4." |

#### F3 — `f3-funcao-composta-e-inversa`
- **Enunciado:** "Inversa de f(x)=x+2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** y=x+2 ⇒ x=y−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-funcao-composta-e-inversa-e` | x+2 | não | "Resposta: x−2; Repete deslocamento em vez de desfazê-lo; conferência: y=x+2 ⇒ x=y−2." |
| `f3-funcao-composta-e-inversa-c` | x−2 | **sim** | "Certo: resposta x−2; conferência: y=x+2 ⇒ x=y−2." |

#### F4 — `f4-funcao-composta-e-inversa`
- **Enunciado:** "Se f(x)=2x, quanto vale f⁻¹(6)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2x=6 ⇒ x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-funcao-composta-e-inversa-e` | 12 | não | "Resposta: 3; Multiplica em vez de dividir; conferência: 2x=6 ⇒ x=3." |
| `f4-funcao-composta-e-inversa-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2x=6 ⇒ x=3." |

### Médias

#### M1 — `m1-funcao-composta-e-inversa`
- **Enunciado:** "f=x+1, g=2x. Quanto vale (g∘f)(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** f(2)=3; g(3)=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-funcao-composta-e-inversa-e` | 5 | não | "Resposta: 6; Calcula f∘g, não g∘f; conferência: f(2)=3; g(3)=6." |
| `m1-funcao-composta-e-inversa-c` | 6 | **sim** | "Certo: resposta 6; conferência: f(2)=3; g(3)=6." |

#### M2 — `m2-funcao-composta-e-inversa`
- **Enunciado:** "Qual função é sua própria inversa?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Identidade composta consigo continua x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-funcao-composta-e-inversa-e` | f(x)=x+1 | não | "Resposta: f(x)=x; Translação não se desfaz sem mudar sinal; conferência: Identidade composta consigo continua x." |
| `m2-funcao-composta-e-inversa-c` | f(x)=x | **sim** | "Certo: resposta f(x)=x; conferência: Identidade composta consigo continua x." |

#### M3 — `m3-funcao-composta-e-inversa`
- **Enunciado:** "Inversa de 3x?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** y=3x ⇒ x=y/3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-funcao-composta-e-inversa-e` | 3x | não | "Resposta: x/3; Repete multiplicação em vez de dividir; conferência: y=3x ⇒ x=y/3." |
| `m3-funcao-composta-e-inversa-c` | x/3 | **sim** | "Certo: resposta x/3; conferência: y=3x ⇒ x=y/3." |

### Desafios

#### D1 — `d1-funcao-composta-e-inversa`
- **Enunciado:** "Se f=x², domínio x≥0, qual inversa?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** y=x²,x≥0 ⇒ x=√y.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-funcao-composta-e-inversa-e` | ±√x | não | "Resposta: √x; Mantém dois ramos apesar do domínio restrito; conferência: y=x²,x≥0 ⇒ x=√y." |
| `d1-funcao-composta-e-inversa-c` | √x | **sim** | "Certo: resposta √x; conferência: y=x²,x≥0 ⇒ x=√y." |

#### D2 — `d2-funcao-composta-e-inversa`
- **Enunciado:** "f=x+2,g=3x. Quanto vale (f∘g)(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** g(2)=6; f(6)=8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-funcao-composta-e-inversa-e` | 12 | não | "Resposta: 8; Troca ordem das máquinas; conferência: g(2)=6; f(6)=8." |
| `d2-funcao-composta-e-inversa-c` | 8 | **sim** | "Certo: resposta 8; conferência: g(2)=6; f(6)=8." |

#### D3 — `d3-funcao-composta-e-inversa`
- **Enunciado:** "Inversa de f=2x−4?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** y=2x−4 ⇒ x=(y+4)/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-funcao-composta-e-inversa-e` | (x−4)/2 | não | "Resposta: (x+4)/2; Não desfaz a subtração antes de dividir; conferência: y=2x−4 ⇒ x=(y+4)/2." |
| `d3-funcao-composta-e-inversa-c` | (x+4)/2 | **sim** | "Certo: resposta (x+4)/2; conferência: y=2x−4 ⇒ x=(y+4)/2." |

#### D4 — `d4-funcao-composta-e-inversa`
- **Enunciado:** "f(x)=x² em R tem inversa como função?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Duas entradas dão 4; inversa não é única.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-funcao-composta-e-inversa-e` | Sim | não | "Resposta: Não; Ignora f(−2)=f(2); conferência: Duas entradas dão 4; inversa não é única." |
| `d4-funcao-composta-e-inversa-c` | Não | **sim** | "Certo: resposta Não; conferência: Duas entradas dão 4; inversa não é única." |

#### D5 — `d5-funcao-composta-e-inversa`
- **Enunciado:** "Se f=2x+1, quanto vale f⁻¹(7)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2x+1=7 ⇒ x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-funcao-composta-e-inversa-e` | 4 | não | "Resposta: 3; Não divide por 2 após subtrair 1; conferência: 2x+1=7 ⇒ x=3." |
| `d5-funcao-composta-e-inversa-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2x+1=7 ⇒ x=3." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

#### V1 — `pendente-fonte-funcao-composta-e-inversa-1`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V2 — `pendente-fonte-funcao-composta-e-inversa-2`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V3 — `pendente-fonte-funcao-composta-e-inversa-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V4 — `pendente-fonte-funcao-composta-e-inversa-4`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.

---

# Checklist de qualidade

**Método (METODO.md)**
- [x] Os 7 pilares a)–g) estão escritos e cada um aparece em pelo menos um passo (linha "Pilares").
- [x] A aula abre com figura viva, não com fórmula nem definição.
- [x] O caso neutro aparece na tela e é nomeado numa fala.
- [x] O panorama ocupa uma fala e o recorte fica claro.
- [x] O contraste mostra o antes na tela.
- [x] A fórmula do fechamento foi deduzida antes por causa visual.
- [x] Há teste de fronteira: domínio, caso neutro ou restrição da regra.

**Roteiro**
- [x] De 4 a 8 passos; primeiro `interactive_canvas`, último `concept_lock`, há `micro_challenge`.
- [x] Toda abertura pergunta ou pede previsão; toda conclusão responde com o porquê.
- [x] Cada passo interativo tem métrica existente e alcançável; widget novo declara métrica.
- [x] No desafio, a opção errada tem feedback diagnóstico e figura que mostra o erro.
- [x] Toda marca c1..c4 usada tem linha no glossário.
- [x] Widgets novos estão marcados com desenho, ação do aluno e métrica.

**Treino**
- [x] Exatamente 4 fáceis, 3 médias, 5 desafios e 4 registros vestibular; ids únicos em minúsculas com hífen.
- [x] Cada questão respondível tem duas opções e exatamente uma certa; vestibular aguarda fonte.
- [x] Todo feedback errado contém resposta certa e conta curta.
- [x] Cada distrator corresponde a erro diagnosticado.
- [x] Toda questão factual tem conta de conferência revisada.
- [ ] Vestibular: 4 entradas PENDENTE-FONTE; banca, ano, enunciado, alternativas, gabarito e URL pendentes.

**Texto**
- [x] Falas, enunciados e feedback têm até 140 caracteres e duas frases; sem emoji ou termos proibidos.
- [x] Notação usa −, vírgula decimal, ·, potências e coordenadas do app.
