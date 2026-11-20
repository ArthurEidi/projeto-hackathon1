# Plano — Transformações de gráficos de funções

**Aula:** 1 — Translações, reflexões e escalas de gráficos · Transformações de gráficos de funções
**Caminho:** algebra / funcoes / transformacoes-graficos-de-funcoes
**Pré-requisitos que o aluno já domina:** introducao-a-funcoes, funcao-afim

## a) Ancoragem mecânica

A entrada x percorre a curva original; parâmetros de translação, reflexão e escala mudam as coordenadas do ponto. A curva transformada mantém relação com a original, exibida como fantasma.

## b) Visual de partida

O palco mostra y=x² e sua imagem com controles h,k,a,b. O widget atual não aplica todas as transformações a qualquer curva; o controle unificado será WIDGET NOVO.

## c) Caso neutro

O caso neutro é g(x)=f(x): escala 1 e deslocamentos 0. A curva ativa coincide com o fantasma; depois isolamos uma transformação de cada vez.

## d) Panorama e recorte

Transformações abrangem translações, reflexões e escalas em várias famílias. Aqui observamos g(x)=a·f(b(x−h))+k, sem funções trigonométricas.

## e) Progressão por contraste

1. A curva original g=f é referência sem transformação.
2. Somar k desloca verticalmente; trocar x por x−h move horizontalmente.
3. −f reflete no eixo x; f(−x) reflete no eixo y.
4. Fatores mudam altura ou largura e devem preservar o domínio da função original.

## f) Dedução causal da forma

Se g=f+k, cada saída aumenta k; se g=f(x−h), a curva move h à direita. −f reflete alturas; f(−x) troca lados. Por isso g(x)=a·f(b(x−h))+k reúne as transformações.

## g) Simulação espacial e fronteiras

Domínio e imagem dependem da família. b=0 colapsa entradas; b<0 reflete. Em logaritmos e racionais, entradas transformadas ainda devem respeitar o domínio original.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Entrada x | Coordenada horizontal percorrida na curva transformada. |
| c2 | Saída g(x) | Coordenada vertical após escala e deslocamentos. |
| c3 | Deslocamento h | Move a curva horizontalmente por meio de x−h. |
| c4 | Escala a | Módulo muda alturas; sinal negativo reflete no eixo x. |

### Passo 1 — `curva-neutra`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `WIDGET NOVO: transformador-de-graficos` — Desenha curva original e cópia coincidentes; aluno move x. Métrica: ponto_movel ≥ 2.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? g(x)=f(x); as curvas coincidem?"
- **Interação do aluno:** Percorra dois pontos e confirme que as curvas coincidem.
- **Conclusão:** `ponto_movel ≥ 2`
- **Paco (conclusão):** "Com fatores 1 e deslocamentos zero, a curva não se altera."
- **Tati (dúvida):** `fim` — P: "Toda transformação preserva o domínio?" / R: "Não; as entradas ainda precisam ser aceitas pela função original."

### Passo 2 — `transladar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `WIDGET NOVO: transformador-de-graficos` — Desenha f=x² e g=f(x−h)+k; aluno altera h,k. Métrica: parametros_testados ≥ 2.
- **Sliders:** h,k · deslocamentos · −2..2 · passo 1 · iniciais 0 · c3
- **Paco (abertura):** "Para onde vai o vértice ao alterar h e k?"
- **Interação do aluno:** Ajuste h=1,k=2; vértice vai de (0;0) a (1;2).
- **Conclusão:** `parametros_testados ≥ 2`
- **Paco (conclusão):** "x−1 move à direita; +2 move para cima."

### Passo 3 — `refletir-escalar`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `WIDGET NOVO: transformador-de-graficos` — Desenha f e g=−2f; aluno move escala vertical. Métrica: reflexao_confirmada ≥ 1.
- **Sliders:** a · escala vertical · −3..3 · passo 1 · inicial 1 · c4
- **Paco (abertura):** "O que faz o sinal negativo diante de f?"
- **Interação do aluno:** Leve a de 1 a −2; compare alturas para o mesmo x.
- **Conclusão:** `reflexao_confirmada ≥ 1`
- **Paco (conclusão):** "O sinal negativo reflete no eixo x e 2 dobra a distância vertical."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=x² e y=−(x−1)²+2
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Onde vai o vértice de y=x² após g(x)=−f(x−1)+2?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | (−1;−2) | não | "Inverte os sentidos das translações; O vértice (0;0) vai 1 à direita e 2 para cima: (1;2)." | Marca o vértice incorreto (−1;−2) para expor os sinais trocados. |
| `certa` | (1;2) | **sim** | "O vértice (0;0) vai 1 à direita e 2 para cima: (1;2)." | marca a resposta no gráfico. |
- **Paco (conclusão):** "O vértice (0;0) vai 1 à direita e 2 para cima: (1;2)."
- **Tati (dúvida):** `fim` — P: "E se a entrada estiver na fronteira?" / R: "A condição do domínio decide se o ponto entra e qual regra vale."

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=x² e g=−2(x−1)²+3, vértices (0;0) e (1;3).
- **Fórmula:** g(x)→c2 = a→c4 · f(b(x−h→c3)) + k
- **Definições:**
  - "h,k: deslocamentos horizontal e vertical."
  - "Sinal de a: reflexão vertical; |a| escala altura."
  - "Sinal de b: reflexão horizontal; |b| escala largura."
- **Paco (abertura):** "Como a figura explica a regra? Por isso g(x)=a·f(b(x−h))+k."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "O desenho vale fora do domínio?" / R: "Não; as condições da função limitam as entradas válidas."

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso g(x)=a·f(b(x−h))+k."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Se g=f+2, para onde move a curva?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Cada saída recebe +2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-transformacoes-graficos-de-funcoes-e` | 2 para baixo | não | "Resposta: 2 para cima; Lê sinal positivo como deslocamento descendente; conferência: Cada saída recebe +2." |
| `f1-transformacoes-graficos-de-funcoes-c` | 2 para cima | **sim** | "Certo: resposta 2 para cima; conferência: Cada saída recebe +2." |

#### F2 — `f2-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Se g=f(x−3), qual deslocamento horizontal?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x−3 move 3 unidades à direita.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-transformacoes-graficos-de-funcoes-e` | 3 à esquerda | não | "Resposta: 3 à direita; Confunde sinal interno e sentido; conferência: x−3 move 3 unidades à direita." |
| `f2-transformacoes-graficos-de-funcoes-c` | 3 à direita | **sim** | "Certo: resposta 3 à direita; conferência: x−3 move 3 unidades à direita." |

#### F3 — `f3-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Qual transformação é −f(x)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** O sinal externo troca y por −y.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-transformacoes-graficos-de-funcoes-e` | Reflexão no eixo y | não | "Resposta: Reflexão no eixo x; Aplica sinal à entrada, não à saída; conferência: O sinal externo troca y por −y." |
| `f3-transformacoes-graficos-de-funcoes-c` | Reflexão no eixo x | **sim** | "Certo: resposta Reflexão no eixo x; conferência: O sinal externo troca y por −y." |

#### F4 — `f4-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Vértice (0;0): qual é de f(x−2)+1?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x−2 move à direita 2; +1 sobe 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-transformacoes-graficos-de-funcoes-e` | (−2;−1) | não | "Resposta: (2;1); Inverte ambos deslocamentos; conferência: x−2 move à direita 2; +1 sobe 1." |
| `f4-transformacoes-graficos-de-funcoes-c` | (2;1) | **sim** | "Certo: resposta (2;1); conferência: x−2 move à direita 2; +1 sobe 1." |

### Médias

#### M1 — `m1-transformacoes-graficos-de-funcoes`
- **Enunciado:** "O que faz f(−x)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Trocar x por −x espelha horizontalmente.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-transformacoes-graficos-de-funcoes-e` | Reflete no eixo x | não | "Resposta: Reflete no eixo y; Confunde entrada com saída; conferência: Trocar x por −x espelha horizontalmente." |
| `m1-transformacoes-graficos-de-funcoes-c` | Reflete no eixo y | **sim** | "Certo: resposta Reflete no eixo y; conferência: Trocar x por −x espelha horizontalmente." |

#### M2 — `m2-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Se g=2f, o que muda?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Cada saída y vira 2y.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-transformacoes-graficos-de-funcoes-e` | Entradas dobram | não | "Resposta: Alturas dobram; Confunde fator externo e horizontal; conferência: Cada saída y vira 2y." |
| `m2-transformacoes-graficos-de-funcoes-c` | Alturas dobram | **sim** | "Certo: resposta Alturas dobram; conferência: Cada saída y vira 2y." |

#### M3 — `m3-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Vértice de x² vai aonde em (x−1)²+3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x−1 dá h=1 e +3 dá k=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-transformacoes-graficos-de-funcoes-e` | (−1;−3) | não | "Resposta: (1;3); Lê deslocamentos com sinais invertidos; conferência: x−1 dá h=1 e +3 dá k=3." |
| `m3-transformacoes-graficos-de-funcoes-c` | (1;3) | **sim** | "Certo: resposta (1;3); conferência: x−1 dá h=1 e +3 dá k=3." |

### Desafios

#### D1 — `d1-transformacoes-graficos-de-funcoes`
- **Enunciado:** "−f(x) leva ponto (2;5) aonde?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x fica 2 e y=5 vira −5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-transformacoes-graficos-de-funcoes-e` | (−2;5) | não | "Resposta: (2;−5); Muda entrada apesar da reflexão externa; conferência: x fica 2 e y=5 vira −5." |
| `d1-transformacoes-graficos-de-funcoes-c` | (2;−5) | **sim** | "Certo: resposta (2;−5); conferência: x fica 2 e y=5 vira −5." |

#### D2 — `d2-transformacoes-graficos-de-funcoes`
- **Enunciado:** "f=x²; quanto vale f(x−2) em x=3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** f(3−2)=1²=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-transformacoes-graficos-de-funcoes-e` | 9 | não | "Resposta: 1; Não aplica deslocamento à entrada; conferência: f(3−2)=1²=1." |
| `d2-transformacoes-graficos-de-funcoes-c` | 1 | **sim** | "Certo: resposta 1; conferência: f(3−2)=1²=1." |

#### D3 — `d3-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Em g(x)=f(2x), a curva fica horizontalmente…"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Para o mesmo ponto, x cai à metade.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-transformacoes-graficos-de-funcoes-e` | mais larga | não | "Resposta: mais estreita; Confunde escala interna e largura; conferência: Para o mesmo ponto, x cai à metade." |
| `d3-transformacoes-graficos-de-funcoes-c` | mais estreita | **sim** | "Certo: resposta mais estreita; conferência: Para o mesmo ponto, x cai à metade." |

#### D4 — `d4-transformacoes-graficos-de-funcoes`
- **Enunciado:** "f=x²; quanto vale −2f(1)+3?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** f(1)=1; −2·1+3=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-transformacoes-graficos-de-funcoes-e` | 5 | não | "Resposta: 1; Esquece o sinal negativo da escala; conferência: f(1)=1; −2·1+3=1." |
| `d4-transformacoes-graficos-de-funcoes-c` | 1 | **sim** | "Certo: resposta 1; conferência: f(1)=1; −2·1+3=1." |

#### D5 — `d5-transformacoes-graficos-de-funcoes`
- **Enunciado:** "Em −(x−2)²+4, vértice e orientação?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Quadrado zera em 2; +4 fixa vértice; fator −1 abre para baixo.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-transformacoes-graficos-de-funcoes-e` | (−2;−4), para cima | não | "Resposta: (2;4), para baixo; Troca sinais e ignora reflexão; conferência: Quadrado zera em 2; +4 fixa vértice; fator −1 abre para baixo." |
| `d5-transformacoes-graficos-de-funcoes-c` | (2;4), para baixo | **sim** | "Certo: resposta (2;4), para baixo; conferência: Quadrado zera em 2; +4 fixa vértice; fator −1 abre para baixo." |

### Vestibular

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `ufrgs-2025-grafico-v`
- **Enunciado (resumido):** "f(x) forma V com vértice (0; 0) e pontas (±3; 3); g(x) forma V invertido com vértice (0; 3), raízes ±1 e pontas (±3; −6). Qual é g(x)?"
- **Fala do Paco:** "Compare os vértices e a abertura dos dois gráficos. Depois, teste x = 0 e x = 1 nas opções."
- **Fonte:** UFRGS 2025 (adaptada) — **Adaptação:** 1º dia, Questão 71: os dois gráficos originais foram descritos pelos vértices e pontos da grade; alternativas e gabarito oficial (D) mantidos. — **URL:** https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf · https://vestibular.ufrgs.br/cv2025/gabaritos/
- **Conta de conferência:** `f(x) = |x|` em `[−3, 3]`; `g(x) = −3f(x) + 3` dá `g(0) = 3`, `g(±1) = 0` e `g(±3) = −6`.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | g(x) = 3f(x + 3) − 3 | não | "3f(x + 3) − 3 desloca o vértice para (−3; −3) e mantém o V voltado para cima. Em x = 0 dá 3·3 − 3 = 6, não 3; certa: g(x) = −3f(x) + 3." |
| `b` | g(x) = −3f(x + 3) | não | "−3f(x + 3) desloca o vértice 3 unidades à esquerda, para (−3; 0), em vez de subir 3. Em x = 0 dá −9, não 3; certa: g(x) = −3f(x) + 3." |
| `c` | g(x) = 3f(x − 3) | não | "3f(x − 3) desloca o vértice 3 à direita, para (3; 0), e não reflete no eixo x. Em x = 0 dá 9, não 3; certa: g(x) = −3f(x) + 3." |
| `d` | g(x) = −3f(x) + 3 | **sim** | "Isso. −3f(x) reflete no eixo x e multiplica alturas por 3; +3 sobe o vértice para (0; 3), dando g(±1) = 0 e g(±3) = −6." |
| `e` | g(x) = −3f(x) − 3 | não | "−3f(x) − 3 desce o vértice para (0; −3) em vez de subir para (0; 3). Em x = 0 dá −3, não 3; certa: g(x) = −3f(x) + 3." |

#### V2 — PENDENTE-FONTE
> Espaços reservados caso novas questões oficiais no recorte sejam encontradas.

#### V3 — PENDENTE-FONTE
- **Estado:** vaga aberta; nenhuma questão real conferida ainda.

#### V4 — PENDENTE-FONTE
- **Estado:** vaga aberta; nenhuma questão real conferida ainda.

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
