# Plano — Função exponencial

**Aula:** 1 — Multiplicar a Cada Passo · Crescimento e decaimento exponencial
**Caminho:** algebra / funcoes / funcao-exponencial
**Pré-requisitos que o aluno já domina:** potencias-e-radicais, introducao-a-funcoes

## a) Ancoragem mecânica

A entrada x conta passos de multiplicação; a base b é o fator repetido e a saída f(x)=bˣ é a quantidade acumulada. b>1 cresce; 0<b<1 encolhe.

## b) Visual de partida

Plano_cartesiano com y=bˣ, tabela e ponto arrastável. Slider b vai de 0,5 a 3 em passos 0,5; y=1 e reta y=x ficam como referências.

## c) Caso neutro

Há dois casos neutros: x=0 dá b⁰=1; b=1 dá 1ˣ=1. Começamos em b=2,x=0 e depois comparamos os casos.

## d) Panorama e recorte

A exponencial descreve fatores repetidos, crescimento e decaimento; sua inversa é o logaritmo. Aqui estudamos bˣ, b>0, sem equações avançadas.

## e) Progressão por contraste

1. A reta y=x cresce por soma constante; y=2ˣ cresce por multiplicação.
2. Para b>1 cada passo multiplica por mais de 1; para 0<b<1 a saída diminui.
3. A curva passa por (0;1), pois zero passos deixam o fator neutro.
4. b=1 produz linha constante e perde a inversa; b≤0 não serve no domínio real geral.

## f) Dedução causal da forma

Para expoentes inteiros positivos, bˣ repete multiplicação por b; avançar uma unidade multiplica por b. Voltando, divide por b, então b⁰=1 e b⁻ⁿ=1/bⁿ. A curva cresce se b>1 e decresce se 0<b<1.

## g) Simulação espacial e fronteiras

Domínio R quando b>0. Se b≠1, imagem (0;∞), sem tocar y=0; se b=1, imagem {1}. Bases 0 e negativas não servem como exponenciais reais para todo x.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Expoente x | Número de passos que repete o fator da base. |
| c2 | Saída bˣ | Quantidade acumulada após os passos indicados. |
| c3 | Base b | Fator repetido; acima de 1 cresce, entre 0 e 1 decai. |
| c4 | Nível unitário | Todas as curvas passam por (0;1), pois b⁰=1. |

### Passo 1 — `expoente-zero`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — Mostra y=2ˣ, reta y=x fantasma e (0;1).
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? b=2,x=0; qual é a saída?"
- **Interação do aluno:** Arraste até x=2 e leia as saídas sucessivas.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Em x=2 a saída é 4; cada passo duplica."
- **Tati (dúvida):** `fim` — P: "Toda exponencial cresce?" / R: "Não; bases entre zero e um fazem a saída decair."

### Passo 2 — `base-cresce`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `plano_cartesiano` — Compara y=2ˣ com curva ativa; slider b.
- **Sliders:** `b` · Base · 0,5..3 · passo 0,5 · inicial 1 · c3
- **Paco (abertura):** "Que efeito tem multiplicar por 2 a cada passo?"
- **Interação do aluno:** Ajuste b=2 e observe saídas em x=1,2,3.
- **Conclusão:** `b ≥ 2`
- **Paco (conclusão):** "A cada passo a saída se multiplica por 2."

### Passo 3 — `base-decai`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `plano_cartesiano` — Compara y=2ˣ fantasma e y=bˣ ativa.
- **Sliders:** `b` · Base · 0,5..3 · passo 0,5 · inicial 2 · c3
- **Paco (abertura):** "O que muda quando a base passa a 0,5?"
- **Interação do aluno:** Leve b a 0,5; veja (0;1), (1;0,5), (2;0,25).
- **Conclusão:** `b ≤ 0,5`
- **Paco (conclusão):** "Fator entre zero e um reduz a saída a cada passo."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=2ˣ com pontos x=0,1,2
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Quanto vale 2⁻²?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | −4 | não | "Trata expoente negativo como sinal da saída; 2⁻²=1/2²=1/4." | Destaca o sinal errado e mostra o recíproco correto 1/4. |
| `certa` | 1/4 | **sim** | "2⁻²=1/2²=1/4." | marca a resposta no gráfico. |
- **Paco (conclusão):** "2⁻²=1/2²=1/4."
- **Tati (dúvida):** `fim` — P: "A curva chega a ser negativa?" / R: "Nunca: potência de base positiva é sempre positiva." (reescrito: texto genérico de domínio não se aplicava)

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — y=2ˣ, pontos (0;1),(1;2),(2;4), assíntota y=0.
- **Fórmula:** f(x)→c2 = b→c3ˣ
- **Definições:**
  - "Base b: fator repetido a cada passo."
  - "Expoente x: número de passos."
  - "Saídas exponenciais são positivas."
- **Paco (abertura):** "Como a figura explica a regra? Por isso f(x)=bˣ, b>0."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "Todas as curvas passam por (0; 1)?" / R: "Sim, para qualquer b > 0: b⁰ = 1." (reescrito)

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso f(x)=bˣ, b>0."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-funcao-exponencial`
- **Enunciado:** "Quanto vale 2⁰?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2⁰=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-funcao-exponencial-e` | 0 | não | "Resposta: 1; Confunde expoente e saída; conferência: 2⁰=1." |
| `f1-funcao-exponencial-c` | 1 | **sim** | "Certo: resposta 1; conferência: 2⁰=1." |

#### F2 — `f2-funcao-exponencial`
- **Enunciado:** "Em 3ˣ, por qual fator a saída muda ao avançar 1?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3ˣ⁺¹=3·3ˣ.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-funcao-exponencial-e` | 1 | não | "Resposta: 3; Confunde avanço da entrada com fator de saída; conferência: 3ˣ⁺¹=3·3ˣ." |
| `f2-funcao-exponencial-c` | 3 | **sim** | "Certo: resposta 3; conferência: 3ˣ⁺¹=3·3ˣ." |

#### F3 — `f3-funcao-exponencial`
- **Enunciado:** "Quanto vale 2⁻²?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2⁻²=1/2²=1/4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-funcao-exponencial-e` | −4 | não | "Resposta: 1/4; Torna negativa a saída; conferência: 2⁻²=1/2²=1/4." |
| `f3-funcao-exponencial-c` | 1/4 | **sim** | "Certo: resposta 1/4; conferência: 2⁻²=1/2²=1/4." |

#### F4 — `f4-funcao-exponencial`
- **Enunciado:** "Qual base gera decaimento?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 0<1/2<1; as saídas encolhem.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-funcao-exponencial-e` | 2 | não | "Resposta: 1/2; Base maior que 1 cresce; conferência: 0<1/2<1; as saídas encolhem." |
| `f4-funcao-exponencial-c` | 1/2 | **sim** | "Certo: resposta 1/2; conferência: 0<1/2<1; as saídas encolhem." |

### Médias

#### M1 — `m1-funcao-exponencial`
- **Enunciado:** "5ˣ pode valer zero?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5ˣ>0 para todo x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-funcao-exponencial-e` | Sim | não | "Resposta: Não; Supõe que a curva toca o eixo x; conferência: 5ˣ>0 para todo x." |
| `m1-funcao-exponencial-c` | Não | **sim** | "Certo: resposta Não; conferência: 5ˣ>0 para todo x." |

#### M2 — `m2-funcao-exponencial`
- **Enunciado:** "4 triplica duas vezes. Total?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 4·3²=36.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-funcao-exponencial-e` | 24 | não | "Resposta: 36; Soma em vez de repetir multiplicação; conferência: 4·3²=36." |
| `m2-funcao-exponencial-c` | 36 | **sim** | "Certo: resposta 36; conferência: 4·3²=36." |

#### M3 — `m3-funcao-exponencial`
- **Enunciado:** "Quanto vale (1/2)³?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** (1/2)³=1/2³=1/8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-funcao-exponencial-e` | 1/6 | não | "Resposta: 1/8; Não eleva o denominador ao cubo; conferência: (1/2)³=1/2³=1/8." |
| `m3-funcao-exponencial-c` | 1/8 | **sim** | "Certo: resposta 1/8; conferência: (1/2)³=1/2³=1/8." |

### Desafios

#### D1 — `d1-funcao-exponencial`
- **Enunciado:** "Se f(x)=2ˣ, quanto vale f(3)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2³=8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-funcao-exponencial-e` | 6 | não | "Resposta: 8; Multiplica base pelo expoente; conferência: 2³=8." |
| `d1-funcao-exponencial-c` | 8 | **sim** | "Certo: resposta 8; conferência: 2³=8." |

#### D2 — `d2-funcao-exponencial`
- **Enunciado:** "3 células dobram 3 vezes. Quantas?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3·2³=24.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-funcao-exponencial-e` | 18 | não | "Resposta: 24; Soma três dobros; conferência: 3·2³=24." |
| `d2-funcao-exponencial-c` | 24 | **sim** | "Certo: resposta 24; conferência: 3·2³=24." |

#### D3 — `d3-funcao-exponencial`
- **Enunciado:** "Quantas soluções tem 2ˣ=1?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2⁰=1; curva crescente, só x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-funcao-exponencial-e` | Duas: x=±1 | não | "Resposta: Uma: x=0; Supõe expoentes opostos com saída 1; conferência: 2⁰=1; curva crescente, só x=0." |
| `d3-funcao-exponencial-c` | Uma: x=0 | **sim** | "Certo: resposta Uma: x=0; conferência: 2⁰=1; curva crescente, só x=0." |

#### D4 — `d4-funcao-exponencial`
- **Enunciado:** "Imagem de (1/3)ˣ?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Toda potência positiva é >0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-funcao-exponencial-e` | [0;∞) | não | "Resposta: (0;∞); Inclui zero, que a curva não atinge; conferência: Toda potência positiva é >0." |
| `d4-funcao-exponencial-c` | (0;∞) | **sim** | "Certo: resposta (0;∞); conferência: Toda potência positiva é >0." |

#### D5 — `d5-funcao-exponencial`
- **Enunciado:** "Se 5·2ˣ=40, x vale?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2ˣ=8=2³, logo x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-funcao-exponencial-e` | 8 (corrigido: era 4, que não bate com o feedback) | não | "Resposta: 3; Para em 40÷5=8; conferência: 2ˣ=8=2³, logo x=3." |
| `d5-funcao-exponencial-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2ˣ=8=2³, logo x=3." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2023-larvas`
- **Enunciado (resumido):** "100 larvas multiplicam-se por 10 a cada 3 dias. Os 5 L de produto (1 L por 200 000 larvas) vão de uma vez, na dose exata: em quantos dias?"
- **Fala do Paco:** "Calcule o limite de larvas para 5 L e escreva 100 · 10^(t/3) = 10⁶."
- **Fonte:** ENEM 2023 (adaptada) — **Adaptação:** Questão 159: enunciado resumido; alternativas e gabarito (12) mantidos. — **URL:** https://api.enem.dev/v1/exams/2023/questions/159
- **Conta de conferência:** `5 · 200 000 = 10⁶`; `100 · 10^(t/3) = 10⁶ => 10^(t/3) = 10⁴ => t/3 = 4 => t = 12`.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a2` | 2 | não | "2 faz 6 ÷ 3 em vez de multiplicar os 4 saltos por 3 dias. De 100 a 10⁶ são 4 saltos: 4 · 3 = 12." |
| `a4` | 4 | não | "4 são os saltos de ×10 (de 100 a 1 000 000), sem multiplicar por 3 dias. O certo é 4 · 3 = 12." |
| `a6` | 6 | não | "6 usa o expoente de 10⁶ sem descontar as 100 iniciais nem multiplicar por 3. O certo é 12." |
| `a12` | 12 | **sim** | "Isso. 5 L atendem 10⁶ larvas; 100 · 10^(t/3) = 10⁶ dá t/3 = 4, logo t = 12 dias." |
| `a18` | 18 | não | "18 multiplica 6 · 3 sem dividir 10⁶ pelas 100 larvas iniciais. O certo é 4 · 3 = 12." |

#### V2 — `pendente-fonte-funcao-exponencial-2`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.

#### V3 — `pendente-fonte-funcao-exponencial-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.

#### V4 — `pendente-fonte-funcao-exponencial-4`
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
**Notas da implementação (JSON):** panorama (inversa = logaritmo) como dúvida de `base-cresce`; fronteira b ≤ 0 / b = 1 como dúvida de `base-decai`; y = 1 e y = x como fantasmas no passo 1. M2 e D2: feedbacks dos distratores 24 e 18 reescritos (a conta do plano não explicava esses números). Vestibular `[]`. Lacunas: o slider mostra `Math.round(value)` (b = 0,5 aparece "1"); sem seta "×b" entre passos; a base b não tem elemento próprio no gráfico.
