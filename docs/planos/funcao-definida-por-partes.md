# Plano — Função definida por partes

**Aula:** 1 — Função definida por sentenças e gráficos · Função definida por partes
**Caminho:** algebra / funcoes / funcao-definida-por-partes
**Pré-requisitos que o aluno já domina:** introducao-a-funcoes, funcao-afim

## a) Ancoragem mecânica

A entrada x seleciona um intervalo; a sentença ligada a ele transforma x na saída f(x). A regra ativa muda ao cruzar uma fronteira, e cada entrada precisa receber uma saída.

## b) Visual de partida

O palco combina gráficos dos trechos e seletor de intervalo. O widget atual não controla sentenças e extremos; será WIDGET NOVO para escolher regra e ponto.

## c) Caso neutro

Começamos com f(x)=x em todo domínio: uma regra sem fronteiras internas. Depois dividimos em x<0 e x≥0, marcando quem inclui zero.

## d) Panorama e recorte

Funções por partes modelam tarifas, módulos e mudanças de regra; conectam-se a funções afins e continuidade. Aqui lemos sentenças e fronteiras, sem continuidade formal.

## e) Progressão por contraste

1. f(x)=x em R é referência sem troca de trecho.
2. Separar x<0 e x≥0 ativa regras diferentes.
3. Extremo aberto ou fechado decide a regra válida exatamente na fronteira.
4. Sobreposição pode criar duas saídas; lacuna pode deixar entrada sem regra.

## f) Dedução causal da forma

Cada trecho calcula a saída segundo sua condição. Em f=x se x<0 e f=2x se x≥0, −1 usa a primeira regra e 1 usa a segunda. Como x=0 está incluído na segunda, f(0)=0.

## g) Simulação espacial e fronteiras

O domínio reúne os intervalos declarados. Testamos abaixo, na fronteira e acima. Os intervalos devem cobrir o domínio sem produzir duas saídas nem deixar lacunas.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Valor que seleciona o intervalo e a sentença ativa. |
| c2 | Saída f(x) | Resultado calculado pela regra do trecho escolhido. |
| c3 | Trecho ativo | Sentença aplicada à entrada no intervalo indicado. |
| c4 | Fronteira | Extremo aberto ou fechado decide a inclusão da entrada. |

### Passo 1 — `regra-unica`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `WIDGET NOVO: seletor-por-partes` — Desenha y=x e tabela; aluno move x. Métrica: entradas_testadas ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? f(x)=x em R; uma regra vale para todo x?"
- **Interação do aluno:** Teste x=−1 e x=1; ambos usam a mesma sentença.
- **Conclusão:** `entradas_testadas ≥ 2`
- **Paco (conclusão):** "Sem fronteira, uma regra transforma qualquer entrada."
- **Tati (dúvida):** `fim` — P: "Qual regra vale exatamente na fronteira?" / R: "A condição com extremo fechado decide."

### Passo 2 — `trocar-trecho`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `WIDGET NOVO: seletor-por-partes` — Desenha x se x<0 e 2x se x≥0; aluno cruza zero. Métrica: trechos_visitados ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual regra assume quando x cruza zero?"
- **Interação do aluno:** Cruze x=0 e observe sentença e saída mudarem.
- **Conclusão:** `trechos_visitados ≥ 2`
- **Paco (conclusão):** "A entrada seleciona a regra pelo intervalo."

### Passo 3 — `ponto-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `WIDGET NOVO: seletor-por-partes` — Desenha extremos aberto/fechado e saída em x=0; aluno seleciona convenção. Métrica: fronteira_resolvida ≥ 1.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual trecho inclui o ponto x=0?"
- **Interação do aluno:** Leia círculo fechado e selecione a saída definida em zero.
- **Conclusão:** `fronteira_resolvida ≥ 1`
- **Paco (conclusão):** "O extremo fechado inclui zero; vale a sentença x≥0."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — x se x<0; 2x se x≥0, extremos em zero
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Quanto vale f(−2) na regra mostrada?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | −4 | não | "Aplica o trecho de x≥0 a uma entrada negativa; −2<0; usa f(x)=x, logo f(−2)=−2." | Realça o trecho x≥0, que não vale para a entrada negativa. |
| `certa` | −2 | **sim** | "−2<0; usa f(x)=x, logo f(−2)=−2." | marca a resposta no gráfico. |
- **Paco (conclusão):** "−2<0; usa f(x)=x, logo f(−2)=−2."
- **Tati (dúvida):** `fim` — P: "E se a entrada estiver na fronteira?" / R: "A condição do domínio decide se o ponto entra e qual regra vale."

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — trechos, círculos aberto/fechado em zero e testes −1,0,1.
- **Fórmula:** f(x)→c2 = f₁(x) se x∈I₁; f₂(x) se x∈I₂
- **Definições:**
  - "Trecho: regra válida num intervalo."
  - "Fronteira: entrada onde pode trocar a sentença."
  - "Ponto fechado: extremo incluído."
- **Paco (abertura):** "Como a figura explica a regra? Por isso f(x)=regra do trecho que contém x."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "O desenho vale fora do domínio?" / R: "Não; as condições da função limitam as entradas válidas."

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso f(x)=regra do trecho que contém x."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-funcao-definida-por-partes`
- **Enunciado:** "Se f(x)=x, quanto vale f(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** f(2)=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-funcao-definida-por-partes-e` | 4 | não | "Resposta: 2; Aplica quadrado em vez da identidade; conferência: f(2)=2." |
| `f1-funcao-definida-por-partes-c` | 2 | **sim** | "Certo: resposta 2; conferência: f(2)=2." |

#### F2 — `f2-funcao-definida-por-partes`
- **Enunciado:** "x se x<0; 2x se x≥0. f(1)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1≥0; 2·1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-funcao-definida-por-partes-e` | 1 | não | "Resposta: 2; Usa trecho de x<0 para entrada positiva; conferência: 1≥0; 2·1=2." |
| `f2-funcao-definida-por-partes-c` | 2 | **sim** | "Certo: resposta 2; conferência: 1≥0; 2·1=2." |

#### F3 — `f3-funcao-definida-por-partes`
- **Enunciado:** "Mesma regra, f(−2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** −2<0; f(−2)=−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-funcao-definida-por-partes-e` | −4 | não | "Resposta: −2; Usa 2x fora do intervalo; conferência: −2<0; f(−2)=−2." |
| `f3-funcao-definida-por-partes-c` | −2 | **sim** | "Certo: resposta −2; conferência: −2<0; f(−2)=−2." |

#### F4 — `f4-funcao-definida-por-partes`
- **Enunciado:** "Qual sentença vale em x=0 se condição é x≥0?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0≥0; primeiro termo da condição é falso, segundo verdadeiro.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-funcao-definida-por-partes-e` | x<0 | não | "Resposta: x≥0; Trata extremo fechado como aberto; conferência: 0≥0; primeiro termo da condição é falso, segundo verdadeiro." |
| `f4-funcao-definida-por-partes-c` | x≥0 | **sim** | "Certo: resposta x≥0; conferência: 0≥0; primeiro termo da condição é falso, segundo verdadeiro." |

### Médias

#### M1 — `m1-funcao-definida-por-partes`
- **Enunciado:** "f=3 se x<1; f=5 se x≥1. f(1)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1≥1; f(1)=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-funcao-definida-por-partes-e` | 3 | não | "Resposta: 5; Escolhe condição estrita que exclui 1; conferência: 1≥1; f(1)=5." |
| `m1-funcao-definida-por-partes-c` | 5 | **sim** | "Certo: resposta 5; conferência: 1≥1; f(1)=5." |

#### M2 — `m2-funcao-definida-por-partes`
- **Enunciado:** "f=x+1 se x≤2; f=x−1 se x>2. f(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2≤2; 2+1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-funcao-definida-por-partes-e` | 1 | não | "Resposta: 3; Usa trecho estrito x>2 em x=2; conferência: 2≤2; 2+1=3." |
| `m2-funcao-definida-por-partes-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2≤2; 2+1=3." |

#### M3 — `m3-funcao-definida-por-partes`
- **Enunciado:** "x se x<0; 2x se x≥0. f(0)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0≥0; 2·0=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-funcao-definida-por-partes-e` | 2 | não | "Resposta: 0; Calcula 2·0 como 2; conferência: 0≥0; 2·0=0." |
| `m3-funcao-definida-por-partes-c` | 0 | **sim** | "Certo: resposta 0; conferência: 0≥0; 2·0=0." |

### Desafios

#### D1 — `d1-funcao-definida-por-partes`
- **Enunciado:** "x² se x<0; x+2 se x≥0. f(−3)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** −3<0; (−3)²=9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-funcao-definida-por-partes-e` | −1 | não | "Resposta: 9; Escolhe regra linear para x negativo; conferência: −3<0; (−3)²=9." |
| `d1-funcao-definida-por-partes-c` | 9 | **sim** | "Certo: resposta 9; conferência: −3<0; (−3)²=9." |

#### D2 — `d2-funcao-definida-por-partes`
- **Enunciado:** "f=x² se x<0; f=x+2 se x≥0. Quanto vale f(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2≥0; f(2)=2+2=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-funcao-definida-por-partes-e` | 3 | não | "Resposta: 4; Usa o trecho quadrático para x positivo; conferência: 2≥0; f(2)=2+2=4." |
| `d2-funcao-definida-por-partes-c` | 4 | **sim** | "Certo: resposta 4; conferência: 2≥0; f(2)=2+2=4." |

#### D3 — `d3-funcao-definida-por-partes`
- **Enunciado:** "f=1 se x<0; f=−1 se x≥0. Quantos trechos valem em zero?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0 não satisfaz x<0, mas satisfaz x≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-funcao-definida-por-partes-e` | Nenhum | não | "Resposta: Um; Confunde intervalo aberto e fechado; conferência: 0 não satisfaz x<0, mas satisfaz x≥0." |
| `d3-funcao-definida-por-partes-c` | Um | **sim** | "Certo: resposta Um; conferência: 0 não satisfaz x<0, mas satisfaz x≥0." |

#### D4 — `d4-funcao-definida-por-partes`
- **Enunciado:** "2x se x≤1; x+3 se x>1. f(1)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1≤1; 2·1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-funcao-definida-por-partes-e` | 4 | não | "Resposta: 2; Aplica x>1 ao ponto 1; conferência: 1≤1; 2·1=2." |
| `d4-funcao-definida-por-partes-c` | 2 | **sim** | "Certo: resposta 2; conferência: 1≤1; 2·1=2." |

#### D5 — `d5-funcao-definida-por-partes`
- **Enunciado:** "x+1 se x<2; 3x−1 se x≥2. f(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2≥2; 3·2−1=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-funcao-definida-por-partes-e` | 3 | não | "Resposta: 5; Escolhe trecho que exclui 2; conferência: 2≥2; 3·2−1=5." |
| `d5-funcao-definida-por-partes-c` | 5 | **sim** | "Certo: resposta 5; conferência: 2≥2; 3·2−1=5." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

#### V1 — `enem-2016-cotas`
- **Enunciado (resumido):** A lei exige cota por faixa (5% acima de 1 000 empregados). Com 1 200 funcionários e 10 cotistas, quantos cotistas contratar no mínimo?
- **Fala do Paco:** "Os novos contratados aumentam também o total da empresa: 1 200 + x."
- **Fonte:** ENEM 2016, Questão 145 — `https://api.enem.dev/v1/exams/2016/questions/145`
- **Adaptação:** enunciado resumido; alternativas e gabarito (53) mantidos.
- **Conta de conferência:** `10 + x >= 0,05(1 200 + x) => 0,95x >= 50 => x >= 52,63`, logo mínimo `53`.
- **Opções e feedback:** 74, 70, 64, 60, 53 (correta).
#### V2 — `enem-2023-pescador`
- **Enunciado (resumido):** Peixe a R$ 5/kg: com 1 ajudante pesca 300 kg, e +100 kg por extra; custo R$ 900 + 250n + 4% da venda. Quantos n dão lucro ≥ R$ 800?
- **Fala do Paco:** "Para n ≥ 1, a pesca é 300 + 100(n − 1) kg e sobram 96% da venda."
- **Fonte:** ENEM 2023, Questão 158 — `https://api.enem.dev/v1/exams/2023/questions/158`
- **Adaptação:** enunciado resumido; alternativas e gabarito (4) mantidos.
- **Conta de conferência:** `n = 3: 0,96·2 500 − 900 − 750 = 750 < 800`; `n = 4: 0,96·3 000 − 900 − 1 000 = 980 >= 800`, logo `4`.
- **Opções e feedback:** 1, 2, 3, 4 (correta), 5.
#### V3 — `pendente-fonte-funcao-definida-por-partes-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V4 — `pendente-fonte-funcao-definida-por-partes-4`
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
