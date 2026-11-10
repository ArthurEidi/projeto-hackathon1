# Plano — Função racional

**Aula:** 1 — Funções racionais e assíntotas simples · Função racional
**Caminho:** algebra / funcoes / funcao-racional
**Pré-requisitos que o aluno já domina:** polinomios, introducao-a-funcoes

## a) Ancoragem mecânica

A entrada x passa por uma razão entre polinômios; a saída depende do numerador e do denominador. Valores que anulam o denominador são proibidos, mesmo após simplificar.

## b) Visual de partida

y=1/x aparece com assíntotas x=0 e y=0. Como esse gráfico não existe nos widgets atuais, o primeiro passo pede WIDGET NOVO para desenhar e percorrer os ramos.

## c) Caso neutro

Em f(x)=1/x, x=1 dá 1 e x=−1 dá −1. O zero do denominador x=0 fica fora do domínio e separa os ramos.

## d) Panorama e recorte

Funções racionais relacionam quocientes, zeros do denominador, buracos e assíntotas; conectam-se a polinômios e limites. Aqui ficamos em 1/x e deslocamentos simples.

## e) Progressão por contraste

1. y=x é referência; y=1/x tem dois ramos em quadrantes opostos.
2. Em 1/(x−1), o denominador zera em x=1 e a assíntota se desloca.
3. Somar 2 move a assíntota horizontal para y=2.
4. Cancelar fatores não restaura o valor proibido; pode surgir buraco.

## f) Dedução causal da forma

Em 1/x, aproximar x de zero faz o quociente crescer em módulo; x=0 não entra. Para x grande, 1/x se aproxima de zero. Por isso as assíntotas são x=0 e y=0.

## g) Simulação espacial e fronteiras

Domínio exclui zeros do denominador. Em 1/(x−h)+k, assíntotas são x=h e y=k. Em (x−1)/(x−1), x=1 continua excluído e é um buraco.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Valor que substitui a variável nos polinômios. |
| c2 | Saída f(x) | Quociente definido quando o denominador não zera. |
| c3 | Denominador Q(x) | Seus zeros ficam fora do domínio da função. |
| c4 | Assíntota | Linha que um ramo aproxima sem necessariamente alcançar. |

### Passo 1 — `dois-ramos`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `WIDGET NOVO: grafico-racional` — Desenha y=1/x, assíntotas x=0,y=0 e ponto; aluno percorre ramos. Métrica: ramos_visitados ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? f(x)=1/x; x=0 é permitido?"
- **Interação do aluno:** Passe x=−1 e x=1 sem tocar x=0; observe sinais.
- **Conclusão:** `ramos_visitados ≥ 2`
- **Paco (conclusão):** "O denominador separa ramos; x=0 não pertence ao domínio."
- **Tati (dúvida):** `fim` — P: "Posso usar zero no denominador?" / R: "Não; esses valores ficam fora do domínio."

### Passo 2 — `mover-assintotas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `WIDGET NOVO: grafico-racional` — Desenha 1/(x−h)+k com assíntotas; aluno move h,k. Métrica: assintotas_testadas ≥ 2.
- **Sliders:** h,k · deslocamentos · −2..2 · passo 1 · iniciais 0 · c3
- **Paco (abertura):** "Onde o denominador zera após mover h?"
- **Interação do aluno:** Ajuste h=1,k=2; veja assíntotas x=1 e y=2.
- **Conclusão:** `assintotas_testadas ≥ 2`
- **Paco (conclusão):** "O denominador zera em 1; +2 fixa a assíntota horizontal."

### Passo 3 — `buraco-ou-assintota`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `WIDGET NOVO: grafico-racional` — Desenha (x−1)/(x−1), mantém x=1 excluído e marca buraco. Métrica: fronteira_identificada ≥ 1.
- **Sliders:** nenhum
- **Paco (abertura):** "O cancelamento recoloca x=1 no domínio?"
- **Interação do aluno:** Aproxime x de 1 e selecione o ponto ausente.
- **Conclusão:** `fronteira_identificada ≥ 1`
- **Paco (conclusão):** "A expressão vale 1 fora de x=1; o cancelamento não inclui essa entrada."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=1/(x−2)+1, assíntotas tracejadas
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Quais são as assíntotas de f(x)=1/(x−2)+1?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | x=−2 e y=−1 | não | "Troca os sinais dos deslocamentos; x−2 zera em 2; +1 fixa y=1." | Move as assíntotas para os valores errados x=−2 e y=−1. |
| `certa` | x=2 e y=1 | **sim** | "x−2 zera em 2; +1 fixa y=1." | marca a resposta no gráfico. |
- **Paco (conclusão):** "x−2 zera em 2; +1 fixa y=1."
- **Tati (dúvida):** `fim` — P: "E se a entrada estiver na fronteira?" / R: "A condição do domínio decide se o ponto entra e qual regra vale."

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=1/(x−2)+1, assíntotas x=2 e y=1.
- **Fórmula:** f(x)→c2 = P(x) / Q(x)→c3, Q(x)≠0
- **Definições:**
  - "Domínio exclui zeros do denominador."
  - "Assíntota: linha que o ramo aproxima."
  - "Cancelamento não restaura entrada excluída."
- **Paco (abertura):** "Como a figura explica a regra? Por isso f(x)=P(x)/Q(x), Q(x)≠0."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "O desenho vale fora do domínio?" / R: "Não; as condições da função limitam as entradas válidas."

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso f(x)=P(x)/Q(x), Q(x)≠0."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-funcao-racional`
- **Enunciado:** "Em 1/x, qual x é proibido?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Denominador x=0 em x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-funcao-racional-e` | 1 | não | "Resposta: 0; Confunde ponto do gráfico com zero do denominador; conferência: Denominador x=0 em x=0." |
| `f1-funcao-racional-c` | 0 | **sim** | "Certo: resposta 0; conferência: Denominador x=0 em x=0." |

#### F2 — `f2-funcao-racional`
- **Enunciado:** "Quanto vale 1/(−2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1÷(−2)=−1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-funcao-racional-e` | 1/2 | não | "Resposta: −1/2; Ignora o sinal do denominador; conferência: 1÷(−2)=−1/2." |
| `f2-funcao-racional-c` | −1/2 | **sim** | "Certo: resposta −1/2; conferência: 1÷(−2)=−1/2." |

#### F3 — `f3-funcao-racional`
- **Enunciado:** "Assíntota vertical de 1/(x−3)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x−3=0 ⇒ x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-funcao-racional-e` | x=−3 | não | "Resposta: x=3; Erra sinal ao resolver x−3=0; conferência: x−3=0 ⇒ x=3." |
| `f3-funcao-racional-c` | x=3 | **sim** | "Certo: resposta x=3; conferência: x−3=0 ⇒ x=3." |

#### F4 — `f4-funcao-racional`
- **Enunciado:** "Domínio de 1/(x+2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x+2=0 ⇒ x=−2; exclua.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-funcao-racional-e` | x≠2 | não | "Resposta: x≠−2; Erra sinal da raiz do denominador; conferência: x+2=0 ⇒ x=−2; exclua." |
| `f4-funcao-racional-c` | x≠−2 | **sim** | "Certo: resposta x≠−2; conferência: x+2=0 ⇒ x=−2; exclua." |

### Médias

#### M1 — `m1-funcao-racional`
- **Enunciado:** "Quanto vale 1/2+1?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1/2+2/2=3/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-funcao-racional-e` | 2 | não | "Resposta: 3/2; Soma denominadores sem equivalência; conferência: 1/2+2/2=3/2." |
| `m1-funcao-racional-c` | 3/2 | **sim** | "Certo: resposta 3/2; conferência: 1/2+2/2=3/2." |

#### M2 — `m2-funcao-racional`
- **Enunciado:** "Assíntota horizontal de 1/x+2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1/x→0; então y→2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-funcao-racional-e` | y=0 | não | "Resposta: y=2; Ignora a translação vertical; conferência: 1/x→0; então y→2." |
| `m2-funcao-racional-c` | y=2 | **sim** | "Certo: resposta y=2; conferência: 1/x→0; então y→2." |

#### M3 — `m3-funcao-racional`
- **Enunciado:** "Simplifique (x−1)/(x−1), x≠1."
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Para x≠1, razão de iguais vale 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-funcao-racional-e` | 0 | não | "Resposta: 1; Subtrai em vez de dividir termos iguais; conferência: Para x≠1, razão de iguais vale 1." |
| `m3-funcao-racional-c` | 1 | **sim** | "Certo: resposta 1; conferência: Para x≠1, razão de iguais vale 1." |

### Desafios

#### D1 — `d1-funcao-racional`
- **Enunciado:** "Domínio de (x+1)/(x−2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x−2=0 ⇒ x=2 proibido.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-funcao-racional-e` | x≠−1 | não | "Resposta: x≠2; Exclui zero do numerador, não do denominador; conferência: x−2=0 ⇒ x=2 proibido." |
| `d1-funcao-racional-c` | x≠2 | **sim** | "Certo: resposta x≠2; conferência: x−2=0 ⇒ x=2 proibido." |

#### D2 — `d2-funcao-racional`
- **Enunciado:** "Quanto vale 2/(x−1) em x=3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2/(3−1)=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-funcao-racional-e` | 2 | não | "Resposta: 1; Não subtrai 1 no denominador; conferência: 2/(3−1)=1." |
| `d2-funcao-racional-c` | 1 | **sim** | "Certo: resposta 1; conferência: 2/(3−1)=1." |

#### D3 — `d3-funcao-racional`
- **Enunciado:** "Assíntota horizontal de 1/(x+1)−2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1/(x+1)→0; logo y→−2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-funcao-racional-e` | y=2 | não | "Resposta: y=−2; Inverte sinal da constante; conferência: 1/(x+1)→0; logo y→−2." |
| `d3-funcao-racional-c` | y=−2 | **sim** | "Certo: resposta y=−2; conferência: 1/(x+1)→0; logo y→−2." |

#### D4 — `d4-funcao-racional`
- **Enunciado:** "Buraco de (x−2)/(x−2), x≠2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Fora de x=2, f=1; falta (2;1).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-funcao-racional-e` | (2;0) | não | "Resposta: (2;1); Confunde valor removido com zero; conferência: Fora de x=2, f=1; falta (2;1)." |
| `d4-funcao-racional-c` | (2;1) | **sim** | "Certo: resposta (2;1); conferência: Fora de x=2, f=1; falta (2;1)." |

#### D5 — `d5-funcao-racional`
- **Enunciado:** "Resolva 3/(x−1)=1."
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3=x−1 ⇒ x=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-funcao-racional-e` | 2 | não | "Resposta: 4; Não multiplica ambos os lados pelo denominador; conferência: 3=x−1 ⇒ x=4." |
| `d5-funcao-racional-c` | 4 | **sim** | "Certo: resposta 4; conferência: 3=x−1 ⇒ x=4." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

#### V1 — `pendente-fonte-funcao-racional-1`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V2 — `pendente-fonte-funcao-racional-2`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V3 — `pendente-fonte-funcao-racional-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V4 — `pendente-fonte-funcao-racional-4`
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
