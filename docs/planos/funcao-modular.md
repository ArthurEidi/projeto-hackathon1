# Plano — Função modular

**Aula:** 1 — A Distância Até o Zero · Módulo e o gráfico em V
**Caminho:** algebra / funcoes / funcao-modular
**Pré-requisitos que o aluno já domina:** valor-absoluto-e-distancia, introducao-a-funcoes

## a) Ancoragem mecânica

A entrada x é comparada à referência h; |x−h| mede a distância sem sinal. A regra multiplica essa distância por a e soma k, produzindo f(x)=a|x−h|+k.

## b) Visual de partida

Reta_numerica e plano_cartesiano: ponto x arrastável, referência h=0 e gráfico |x| em V. Sliders h,a,k começam em 0,1,0; cada controle altera uma causa.

## c) Caso neutro

Caso neutro f(x)=|x|: distância até zero, sem escala nem deslocamento. O vértice é (0;0); isolamos h, k e a em etapas.

## d) Panorama e recorte

Módulo é distância e se relaciona a gráficos em V, funções por partes e equações de distância. Aqui estudamos f(x)=a|x−h|+k e limites básicos.

## e) Progressão por contraste

1. A reta y=x serve de contraste; |x| troca o sinal à esquerda.
2. Mover h de 0 para 1 muda onde a distância zera.
3. Somar k desloca o V verticalmente sem mudar os ramos.
4. Multiplicar por a estica ou reflete; a=0 achata o gráfico.

## f) Dedução causal da forma

Se x≥h, |x−h|=x−h; se x<h, |x−h|=h−x, pois distância não é negativa. Os ramos se encontram em x=h; portanto f(x)=a|x−h|+k.

## g) Simulação espacial e fronteiras

Domínio R. Se a>0, imagem [k;∞); se a<0, (−∞;k]; se a=0, {k}. |x−h|=r tem duas soluções para r>0, uma para r=0 e nenhuma para r<0.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Posição cuja distância até h alimenta a função. |
| c2 | Saída f(x) | Distância escalada por a e deslocada por k. |
| c3 | Escala a | Sinal orienta o V; módulo de a altera a abertura. |
| c4 | Referência h | Entrada em que a distância |x−h| zera. |

### Passo 1 — `distancia-zero`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — Mostra y=|x| e ponto móvel no V.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? f(x)=|x|; onde a distância zera?"
- **Interação do aluno:** Arraste x de −2 a 2; veja alturas iguais em entradas opostas.
- **Conclusão:** `faixa_x ≥ 4` (corrigido: de x = −2 a 2 a faixa é 4)
- **Paco (conclusão):** "A distância de −2 e 2 até zero é 2."
- **Tati (dúvida):** `fim` — P: "A distância pode ser negativa?" / R: "Não; a escala pode refletir a saída, mas a distância segue não negativa."

### Passo 2 — `mover-referencia`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `plano_cartesiano` — Mostra |x| fantasma e |x−h| ativa.
- **Sliders:** `h` · Referência · −2..2 · passo 1 · inicial 0 · c3
- **Paco (abertura):** "Onde zera a distância até h=1?"
- **Interação do aluno:** Leve h a 1; a dobra muda para x=1.
- **Conclusão:** `h ≥ 1`
- **Paco (conclusão):** "O vértice vai a x=1 porque |x−1| só zera ali."

### Passo 3 — `duas-distancias`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `reta_numerica` — Marca h=1 e raio 2 na reta; soluções −1 e 3.
- **Sliders:** nenhum
- **Paco (abertura):** "Quais pontos ficam a duas unidades de h=1?"
- **Interação do aluno:** Posicione pontos a distância 2 de h.
- **Conclusão:** `faixa_x ≥ 4` (corrigido: de x = −1 a 3 a faixa é 4; exige visitar os dois lados)
- **Paco (conclusão):** "As soluções ficam duas unidades de cada lado da referência."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=−|x−1|+2 com vértice
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Qual é o vértice de f(x)=−|x−1|+2?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | (−1;−2) | não | "Inverte os sinais de h e k; A distância zera em x=1 e a saída ali é 2; V=(1;2)." | Marca (−1;−2), o vértice errado com sinais trocados. |
| `certa` | (1;2) | **sim** | "A distância zera em x=1 e a saída ali é 2; V=(1;2)." | marca a resposta no gráfico. |
- **Paco (conclusão):** "A distância zera em x=1 e a saída ali é 2; V=(1;2)."
- **Tati (dúvida):** `fim` — P: "E se a for negativo?" / R: "O V se inverte e o vértice é o ponto mais alto." (reescrito: texto genérico não se aplicava)

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=2|x−1|−1, vértice (1;−1), raízes 0,5 e 1,5.
- **Fórmula:** f(x)→c2 = a→c3 · |x−h→c4| + k
- **Definições:**
  - "|x−h|: distância entre x e h."
  - "Vértice: (h;k)."
  - "a decide orientação e escala vertical."
- **Paco (abertura):** "Como a figura explica a regra? Por isso f(x)=a|x−h|+k."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "Por que o gráfico tem uma quina?" / R: "A regra troca de lado em x = h." (reescrito)

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso f(x)=a|x−h|+k."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-funcao-modular`
- **Enunciado:** "Quanto vale |−4|?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Distância até zero: |−4|=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-funcao-modular-e` | −4 | não | "Resposta: 4; Confunde posição com distância; conferência: Distância até zero: |−4|=4." |
| `f1-funcao-modular-c` | 4 | **sim** | "Certo: resposta 4; conferência: Distância até zero: |−4|=4." |

#### F2 — `f2-funcao-modular`
- **Enunciado:** "Vértice de |x−3|?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** |x−3| zera em x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-funcao-modular-e` | (−3;0) | não | "Resposta: (3;0); Inverte sinal dentro do módulo; conferência: |x−3| zera em x=3." |
| `f2-funcao-modular-c` | (3;0) | **sim** | "Certo: resposta (3;0); conferência: |x−3| zera em x=3." |

#### F3 — `f3-funcao-modular`
- **Enunciado:** "Quanto vale |0|+2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** |0|+2=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-funcao-modular-e` | 0 | não | "Resposta: 2; Esquece o deslocamento +2; conferência: |0|+2=2." |
| `f3-funcao-modular-c` | 2 | **sim** | "Certo: resposta 2; conferência: |0|+2=2." |

#### F4 — `f4-funcao-modular`
- **Enunciado:** "Quais x satisfazem |x|=3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Distância 3 de zero: x=±3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-funcao-modular-e` | 3 | não | "Resposta: −3 e 3; Conta só a solução positiva; conferência: Distância 3 de zero: x=±3." |
| `f4-funcao-modular-c` | −3 e 3 | **sim** | "Certo: resposta −3 e 3; conferência: Distância 3 de zero: x=±3." |

### Médias

#### M1 — `m1-funcao-modular`
- **Enunciado:** "Imagem de |x|+1?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** |x|≥0; logo |x|+1≥1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-funcao-modular-e` | y≤1 | não | "Resposta: y≥1; Supõe abertura para baixo; conferência: |x|≥0; logo |x|+1≥1." |
| `m1-funcao-modular-c` | y≥1 | **sim** | "Certo: resposta y≥1; conferência: |x|≥0; logo |x|+1≥1." |

#### M2 — `m2-funcao-modular`
- **Enunciado:** "−|x| abre para onde?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** −|x|≤0; o vértice é máximo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-funcao-modular-e` | Para cima | não | "Resposta: Para baixo; Ignora o fator −1; conferência: −|x|≤0; o vértice é máximo." |
| `m2-funcao-modular-c` | Para baixo | **sim** | "Certo: resposta Para baixo; conferência: −|x|≤0; o vértice é máximo." |

#### M3 — `m3-funcao-modular`
- **Enunciado:** "Quantas soluções tem |x−2|=0?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** |x−2|=0 só em x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-funcao-modular-e` | Duas | não | "Resposta: Uma; Usa duas soluções com raio zero; conferência: |x−2|=0 só em x=2." |
| `m3-funcao-modular-c` | Uma | **sim** | "Certo: resposta Uma; conferência: |x−2|=0 só em x=2." |

### Desafios

#### D1 — `d1-funcao-modular`
- **Enunciado:** "Vértice de 2|x+1|−3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x+1 zera em −1; saída mínima −3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-funcao-modular-e` | (1;3) | não | "Resposta: (−1;−3); Troca sinais de h e k; conferência: x+1 zera em −1; saída mínima −3." |
| `d1-funcao-modular-c` | (−1;−3) | **sim** | "Certo: resposta (−1;−3); conferência: x+1 zera em −1; saída mínima −3." |

#### D2 — `d2-funcao-modular`
- **Enunciado:** "Soluções de |x−1|=4?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x=1−4=−3 ou 1+4=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-funcao-modular-e` | 3 e 5 | não | "Resposta: −3 e 5; Põe ambos os pontos à direita; conferência: x=1−4=−3 ou 1+4=5." |
| `d2-funcao-modular-c` | −3 e 5 | **sim** | "Certo: resposta −3 e 5; conferência: x=1−4=−3 ou 1+4=5." |

#### D3 — `d3-funcao-modular`
- **Enunciado:** "Quantas soluções tem |x|=−2?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** |x|≥0, nunca vale −2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-funcao-modular-e` | Duas | não | "Resposta: Nenhuma; Admite distância negativa; conferência: |x|≥0, nunca vale −2." |
| `d3-funcao-modular-c` | Nenhuma | **sim** | "Certo: resposta Nenhuma; conferência: |x|≥0, nunca vale −2." |

#### D4 — `d4-funcao-modular`
- **Enunciado:** "Imagem de −2|x−3|+1?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** |x−3|≥0; então −2|x−3|+1≤1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-funcao-modular-e` | y≥1 | não | "Resposta: y≤1; Confunde máximo e mínimo; conferência: |x−3|≥0; então −2|x−3|+1≤1." |
| `d4-funcao-modular-c` | y≤1 | **sim** | "Certo: resposta y≤1; conferência: |x−3|≥0; então −2|x−3|+1≤1." |

#### D5 — `d5-funcao-modular`
- **Enunciado:** "Resolva |2x−4|=6."
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2x−4=±6 ⇒ x=5 ou −1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-funcao-modular-e` | 1 e 5 | não | "Resposta: −1 e 5; (corrigido: o erro é de sinal em 2x = −2, não de esquecer a divisão por 2); conferência: 2x−4=±6 ⇒ x=5 ou −1." |
| `d5-funcao-modular-c` | −1 e 5 | **sim** | "Certo: resposta −1 e 5; conferência: 2x−4=±6 ⇒ x=5 ou −1." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

#### V1 — `pendente-fonte-funcao-modular-1`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V2 — `pendente-fonte-funcao-modular-2`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V3 — `pendente-fonte-funcao-modular-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V4 — `pendente-fonte-funcao-modular-4`
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

---
**Notas da implementação (JSON):** panorama (equações e funções por partes) como dúvida de `mover-referencia`; fronteira (distância negativa/zero) como dúvida de `duas-distancias`. Passo 1 começa em x = 1. Vestibular `[]`. Lacunas de widget: `reta_numerica` só desenha a distância até zero (`distanciaZero`), não até h = 1, então o passo 3 marca h como ponto fixo e conta a faixa percorrida (−1 a 3); sem marcador de vértice.
