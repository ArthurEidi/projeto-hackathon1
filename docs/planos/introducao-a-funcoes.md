# Plano — Introdução a funções

**Aula:** 1 — A Máquina de Saídas · Entrada, regra e saída
**Caminho:** algebra / funcoes / introducao-a-funcoes
**Pré-requisitos que o aluno já domina:** conjuntos-e-intervalos

## a) Ancoragem mecânica

A entrada x é a escolha do aluno; a regra transforma x numa única saída f(x). Domínio reúne entradas permitidas, contradomínio é o conjunto de saídas declarado e imagem reúne as saídas realmente alcançadas.

## b) Visual de partida

Começamos em plano_cartesiano com y=x, ponto arrastável, coordenadas e tabela curta. Um diagrama auxiliar marca domínio, setas de saída e imagem; a entrada muda e o ponto acompanha a regra.

## c) Caso neutro

O caso neutro é f(x)=x: a máquina devolve a entrada sem alteração e o gráfico fica em y=x. Depois comparamos uma saída deslocada e uma regra quadrática, mudando uma coisa por vez.

## d) Panorama e recorte

Funções podem aparecer em diagramas, tabelas, fórmulas e gráficos; domínio, imagem e teste da reta vertical se conectam a composição e inversa. Aqui identificamos uma saída por entrada e lemos domínio e imagem.

## e) Progressão por contraste

1. Começamos em y=x; depois f(x)=x+1 desloca somente a saída.
2. Com f(x)=x², entradas opostas podem chegar à mesma saída, mas cada entrada ainda tem uma só saída.
3. Duas setas saindo da mesma entrada quebram a condição; uma vertical também encontra dois pontos.
4. Restringir o domínio apaga entradas do gráfico e pode reduzir a imagem sem mudar a regra.

## f) Dedução causal da forma

Cada entrada permitida escolhe uma única altura; por isso o gráfico passa no teste da reta vertical. Entradas diferentes podem compartilhar uma saída. Assim, cada x do domínio tem exatamente uma saída f(x).

## g) Simulação espacial e fronteiras

Percorremos x de −2 a 2: em x², ambos chegam a 4. Se o domínio vira [0; 2], o ramo x<0 some. Uma vertical com dois pontos ou uma entrada com duas setas marca a fronteira entre função e relação.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Valor que percorre a máquina e determina qual regra será aplicada. |
| c2 | Saída f(x) | Único resultado produzido para cada entrada permitida. |
| c3 | Regra da função | Transformação que liga cada valor de x à sua saída. |
| c4 | Teste vertical | Duas alturas para um mesmo x indicam que a relação não é função. |

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — Mostra y=x e ponto móvel na diagonal.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? f(x)=x; em x=2 a saída é 2?"
- **Interação do aluno:** Arraste x de 0 até 2; coordenadas e tabela acompanham entrada e saída.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "x e f(x) valem 2; a máquina neutra devolve a entrada."
- **Tati (dúvida):** `fim` — P: "Duas entradas podem ter a mesma saída?" / R: "Sim; uma função exige uma saída por entrada, não entradas distintas."

### Passo 2 — `setas-uma-saida`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `WIDGET NOVO: diagrama-funcao` — Desenha conjuntos de entrada/saída e setas; aluno liga cada entrada. Métrica: entradas_com_uma_saida ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Uma entrada pode apontar a duas saídas?"
- **Interação do aluno:** Ligue duas entradas a saídas; setas e imagem mudam ao vivo.
- **Conclusão:** `entradas_com_uma_saida ≥ 2`
- **Paco (conclusão):** "Cada entrada aponta a uma saída; entradas distintas podem compartilhar saída."

### Passo 3 — `duas-entradas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `plano_cartesiano` — Compara y=x² e fantasma y=x, destacando (−2;4) e (2;4).
- **Sliders:** nenhum
- **Paco (abertura):** "Entradas diferentes podem produzir a mesma saída?"
- **Interação do aluno:** Mova x entre −2 e 2; observe duas entradas alcançarem a mesma altura.
- **Conclusão:** `faixa_x ≥ 2`
- **Paco (conclusão):** "−2 e 2 dão 4; repetir uma saída não quebra a condição."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — Relação com pontos (1;2) e (1;4)
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "A relação define y como função de x?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | Sim | não | "A entrada 1 tem duas saídas; função exige uma só; A vertical x=1 cruza dois pontos; a relação não é função." | Desenha os dois pontos na vertical x=1 e destaca as saídas distintas. |
| `certa` | Não | **sim** | "A vertical x=1 cruza dois pontos; a relação não é função." | marca a resposta no gráfico. |
- **Paco (conclusão):** "A vertical x=1 cruza dois pontos; a relação não é função."
- **Tati (dúvida):** `fim` — P: "E se a entrada estiver na fronteira?" / R: "A condição do domínio decide se o ponto entra e qual regra vale."

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=x² com pontos (−2;4) e (2;4), domínio [−2;2].
- **Fórmula:** x→c1 · regra→c3 · f(x)→c2
- **Definições:**
  - "Domínio: entradas aceitas pela regra."
  - "Imagem: saídas que a regra realmente alcança."
  - "Função: cada entrada tem exatamente uma saída."
- **Paco (abertura):** "Como a figura explica a regra? Por isso x → regra → f(x)."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "O desenho vale fora do domínio?" / R: "Não; as condições da função limitam as entradas válidas."

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso x → regra → f(x)."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-introducao-a-funcoes`
- **Enunciado:** "Em f(x)=x+1, quanto vale f(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2+1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-introducao-a-funcoes-e` | 2 | não | "Resposta: 3; Esquece o termo +1; conferência: 2+1=3." |
| `f1-introducao-a-funcoes-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2+1=3." |

#### F2 — `f2-introducao-a-funcoes`
- **Enunciado:** "Em f(x)=x², quanto vale f(−1)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (−1)²=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-introducao-a-funcoes-e` | −1 | não | "Resposta: 1; Mantém o sinal após elevar ao quadrado; conferência: (−1)²=1." |
| `f2-introducao-a-funcoes-c` | 1 | **sim** | "Certo: resposta 1; conferência: (−1)²=1." |

#### F3 — `f3-introducao-a-funcoes`
- **Enunciado:** "f(x)=x+2, domínio {0;1;2}. Qual é a imagem?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** f(0)=2, f(1)=3, f(2)=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-introducao-a-funcoes-e` | {0;1;2} | não | "Resposta: {2;3;4}; Repete entradas sem aplicar a regra; conferência: f(0)=2, f(1)=3, f(2)=4." |
| `f3-introducao-a-funcoes-c` | {2;3;4} | **sim** | "Certo: resposta {2;3;4}; conferência: f(0)=2, f(1)=3, f(2)=4." |

#### F4 — `f4-introducao-a-funcoes`
- **Enunciado:** "Qual regra dá uma saída para cada x real?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** y=x² associa uma única saída a cada x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-introducao-a-funcoes-e` | x=2 | não | "Resposta: y=x²; Uma vertical x=2 teria várias saídas; conferência: y=x² associa uma única saída a cada x." |
| `f4-introducao-a-funcoes-c` | y=x² | **sim** | "Certo: resposta y=x²; conferência: y=x² associa uma única saída a cada x." |

### Médias

#### M1 — `m1-introducao-a-funcoes`
- **Enunciado:** "Em f(x)=2x, quanto vale f(3)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2·3=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-introducao-a-funcoes-e` | 5 | não | "Resposta: 6; Soma em vez de multiplicar; conferência: 2·3=6." |
| `m1-introducao-a-funcoes-c` | 6 | **sim** | "Certo: resposta 6; conferência: 2·3=6." |

#### M2 — `m2-introducao-a-funcoes`
- **Enunciado:** "Domínio {−1;1}, f(x)=x². Qual imagem?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (−1)²=1 e 1²=1; imagem={1}.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-introducao-a-funcoes-e` | {−1;1} | não | "Resposta: {1}; Confunde entradas com saídas; conferência: (−1)²=1 e 1²=1; imagem={1}." |
| `m2-introducao-a-funcoes-c` | {1} | **sim** | "Certo: resposta {1}; conferência: (−1)²=1 e 1²=1; imagem={1}." |

#### M3 — `m3-introducao-a-funcoes`
- **Enunciado:** "A relação {(0;1);(0;2)} é função de x?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x=0 aponta a 1 e 2; não é função.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-introducao-a-funcoes-e` | Sim | não | "Resposta: Não; Ignora que x=0 tem duas saídas; conferência: x=0 aponta a 1 e 2; não é função." |
| `m3-introducao-a-funcoes-c` | Não | **sim** | "Certo: resposta Não; conferência: x=0 aponta a 1 e 2; não é função." |

### Desafios

#### D1 — `d1-introducao-a-funcoes`
- **Enunciado:** "Em f(x)=x²−1, quanto vale f(2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2²−1=4−1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-introducao-a-funcoes-e` | 5 | não | "Resposta: 3; Soma 1 em vez de subtrair; conferência: 2²−1=4−1=3." |
| `d1-introducao-a-funcoes-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2²−1=4−1=3." |

#### D2 — `d2-introducao-a-funcoes`
- **Enunciado:** "Imagem de x² no domínio [−2;1]?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Mínimo 0 em x=0; máximo 4 em x=−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-introducao-a-funcoes-e` | [−2;1] | não | "Resposta: [0;4]; Confunde entradas e saídas; conferência: Mínimo 0 em x=0; máximo 4 em x=−2." |
| `d2-introducao-a-funcoes-c` | [0;4] | **sim** | "Certo: resposta [0;4]; conferência: Mínimo 0 em x=0; máximo 4 em x=−2." |

#### D3 — `d3-introducao-a-funcoes`
- **Enunciado:** "f=x+1, domínio {0;1}, contradomínio {1;2;3}. Imagem?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** f(0)=1 e f(1)=2; imagem={1;2}.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-introducao-a-funcoes-e` | {1;2;3} | não | "Resposta: {1;2}; Inclui uma saída que a regra não alcança; conferência: f(0)=1 e f(1)=2; imagem={1;2}." |
| `d3-introducao-a-funcoes-c` | {1;2} | **sim** | "Certo: resposta {1;2}; conferência: f(0)=1 e f(1)=2; imagem={1;2}." |

#### D4 — `d4-introducao-a-funcoes`
- **Enunciado:** "Qual relação falha como y em função de x?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x=0 dá y=−1 e y=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-introducao-a-funcoes-e` | y=x+1 | não | "Resposta: x²+y²=1; Para x=0, a circunferência tem duas saídas; conferência: x=0 dá y=−1 e y=1." |
| `d4-introducao-a-funcoes-c` | x²+y²=1 | **sim** | "Certo: resposta x²+y²=1; conferência: x=0 dá y=−1 e y=1." |

#### D5 — `d5-introducao-a-funcoes`
- **Enunciado:** "Se f(x)=2x+1 e f(x)=7, qual é x?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2x+1=7 ⇒ 2x=6 ⇒ x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-introducao-a-funcoes-e` | 4 | não | "Resposta: 3; Não divide por 2 depois de subtrair 1; conferência: 2x+1=7 ⇒ 2x=6 ⇒ x=3." |
| `d5-introducao-a-funcoes-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2x+1=7 ⇒ 2x=6 ⇒ x=3." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

#### V1 — `pendente-fonte-introducao-a-funcoes-1`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V2 — `pendente-fonte-introducao-a-funcoes-2`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V3 — `pendente-fonte-introducao-a-funcoes-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V4 — `pendente-fonte-introducao-a-funcoes-4`
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
