# Plano — Logaritmos

**Aula:** 1 — A Pergunta Inversa · Logaritmo como expoente procurado
**Caminho:** algebra / funcoes / logaritmos
**Pré-requisitos que o aluno já domina:** funcao-exponencial

## a) Ancoragem mecânica

A entrada x é um resultado positivo; a base b define a potência e a máquina devolve o expoente y tal que bʸ=x. log_b(x)=y desfaz bʸ=x, com b>0 e b≠1.

## b) Visual de partida

Plano_cartesiano mostra y=2ˣ e y=log₂(x), com y=x como espelho. O argumento percorre apenas x>0; pontos da exponencial trocam coordenadas no log.

## c) Caso neutro

O caso neutro é 2⁰=1 e, na volta, log₂(1)=0. Mostramos 2¹=2 antes de 2³=8; cada par liga entrada e expoente.

## d) Panorama e recorte

Logaritmos invertem exponenciais e sustentam propriedades de produto e potência. Aqui interpretamos a definição, valores simples, domínio e reflexão, sem equações longas.

## e) Progressão por contraste

1. A pergunta direta 2³=8 vira log₂(8)=3.
2. log₂(1)=0 é o caso neutro; log₂(2)=1 confirma a unidade de expoente.
3. A curva log espelha a exponencial em y=x e tem domínio x>0.
4. Base maior que 1 gera log crescente; entre 0 e 1 gera log decrescente.

## f) Dedução causal da forma

Se y=log_b(x), então bʸ=x; por isso os pontos trocam coordenadas e refletem em y=x. O argumento é positivo porque potência de base positiva não produz zero nem negativo. Como b⁰=1, log_b(1)=0.

## g) Simulação espacial e fronteiras

Domínio x>0; imagem R se b>0 e b≠1. Base 1 não serve, pois 1ʸ só dá 1. Para b>1 o log cresce; para 0<b<1 decresce. x=0 é fronteira não incluída.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo (1 frase) |
|---|---|---|
| c1 | Argumento x | Saída positiva da potência que o logaritmo desfaz. |
| c2 | Expoente y | Resposta à pergunta: a que potência elevar b para obter x. |
| c3 | Base b | Precisa ser positiva e diferente de 1 para ter inversa. |
| c4 | Diagonal y=x | Espelho que troca coordenadas entre exponencial e log. |

### Passo 1 — `volta-potencia`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** `plano_cartesiano` — Mostra y=2ˣ, y=log₂(x) e y=x.
- **Sliders:** nenhum
- **Paco (abertura):** "Que saída prevê no caso neutro? 2⁰=1; quanto vale log₂(1)?"
- **Interação do aluno:** Arraste (3;8) e veja surgir (8;3) no inverso.
- **Conclusão:** `faixa_x ≥ 2`
- **Paco (conclusão):** "Exponencial e log trocam entrada e saída; os pontos se espelham."
- **Tati (dúvida):** `fim` — P: "O logaritmo pode receber zero?" / R: "Não; seu argumento precisa ser positivo."

### Passo 2 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa)
- **Widget:** `plano_cartesiano` — Destaca (0;1) na exponencial e (1;0) no log.
- **Sliders:** nenhum
- **Paco (abertura):** "Que expoente de 2 produz 1?"
- **Interação do aluno:** Mova o argumento até x=1 e leia saída zero.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "log₂(1)=0, pois 2⁰=1."

### Passo 3 — `dominio-positivo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 7 (simulação e fronteira)
- **Widget:** `plano_cartesiano` — Mostra curva log com x>0 e fronteira x=0.
- **Sliders:** nenhum
- **Paco (abertura):** "O argumento pode chegar a zero?"
- **Interação do aluno:** Arraste o argumento para perto de zero sem cruzar.
- **Conclusão:** `faixa_x ≥ 1`
- **Paco (conclusão):** "Log aceita argumento positivo; zero não pertence ao domínio."

### Passo 4 — `desafio-fronteira`
- **Tipo:** `micro_challenge`
- **Pilares:** 1 (máquina), 2 (leitura visual), 6 (dedução), 7 (fronteira)
- **Figura:** `plano_figura` — y=2ˣ e y=log₂(x), pontos espelhados
- **Paco (abertura):** "Qual resposta a figura sustenta?"
- **Enunciado:** "Quanto vale log₂(8)?"
- **Interação do aluno:** escolha; a figura responde a cada opção e revela o raciocínio.
| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `erro` | 8 | não | "Lê o argumento como resposta em vez de procurar expoente; 2³=8; portanto log₂(8)=3." | Realça 8 como argumento e 3 como expoente procurado. |
| `certa` | 3 | **sim** | "2³=8; portanto log₂(8)=3." | marca a resposta no gráfico. |
- **Paco (conclusão):** "2³=8; portanto log₂(8)=3."
- **Tati (dúvida):** `fim` — P: "E se a entrada estiver na fronteira?" / R: "A condição do domínio decide se o ponto entra e qual regra vale."

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 5 (contraste), 6 (dedução), 7 (fronteiras)
- **Figura:** plano_figura — exponencial e log base 2 refletidos em y=x; domínio x>0.
- **Fórmula:** log_b(x)→c2 = y ⇔ b→c3ʸ = x→c1
- **Definições:**
  - "Argumento x: precisa ser positivo."
  - "Base b: positiva e diferente de 1."
  - "Logaritmo: expoente que produz o argumento."
- **Paco (abertura):** "Como a figura explica a regra? Por isso log_b(x)=y ⇔ bʸ=x."
- **Interação do aluno:** toque nas marcas c1–c4 para relacionar cada grandeza ao gráfico.
- **Paco (conclusão):** "A figura mostra como cada entrada produz a saída prevista pela regra."
- **Dica (hint):** "Toque em uma marca para ver o que ela representa no gráfico."
- **Tati (dúvida):** `início` — P: "O desenho vale fora do domínio?" / R: "Não; as condições da função limitam as entradas válidas."

**Frase de encerramento (outro):** "Você testou a entrada e a fronteira; por isso log_b(x)=y ⇔ bʸ=x."

## i) Treino pós-aula

### Fáceis

#### F1 — `f1-logaritmos`
- **Enunciado:** "Quanto vale log₂(8)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2³=8; log₂(8)=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-logaritmos-e` | 8 | não | "Resposta: 3; Confunde argumento e expoente; conferência: 2³=8; log₂(8)=3." |
| `f1-logaritmos-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2³=8; log₂(8)=3." |

#### F2 — `f2-logaritmos`
- **Enunciado:** "Quanto vale log₅(1)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 5⁰=1; log₅(1)=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-logaritmos-e` | 1 | não | "Resposta: 0; Lê o argumento como resposta; conferência: 5⁰=1; log₅(1)=0." |
| `f2-logaritmos-c` | 0 | **sim** | "Certo: resposta 0; conferência: 5⁰=1; log₅(1)=0." |

#### F3 — `f3-logaritmos`
- **Enunciado:** "log₃(9)=2 equivale a qual potência?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** Definição: 3²=9.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-logaritmos-e` | 3·2=9 | não | "Resposta: 3²=9; Troca potência por multiplicação; conferência: Definição: 3²=9." |
| `f3-logaritmos-c` | 3²=9 | **sim** | "Certo: resposta 3²=9; conferência: Definição: 3²=9." |

#### F4 — `f4-logaritmos`
- **Enunciado:** "Qual argumento está no domínio de log₂(x)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1/2>0; domínio exige x>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-logaritmos-e` | 0 | não | "Resposta: 1/2; Permite argumento zero; conferência: 1/2>0; domínio exige x>0." |
| `f4-logaritmos-c` | 1/2 | **sim** | "Certo: resposta 1/2; conferência: 1/2>0; domínio exige x>0." |

### Médias

#### M1 — `m1-logaritmos`
- **Enunciado:** "log₂(4)+log₂(2) vale?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 2+1=3; também log₂(8)=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-logaritmos-e` | 6 | não | "Resposta: 3; Soma argumentos em vez de expoentes; conferência: 2+1=3; também log₂(8)=3." |
| `m1-logaritmos-c` | 3 | **sim** | "Certo: resposta 3; conferência: 2+1=3; também log₂(8)=3." |

#### M2 — `m2-logaritmos`
- **Enunciado:** "Qual base é inválida?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 1ʸ=1 para todo y; base deve ser ≠1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-logaritmos-e` | 2 | não | "Resposta: 1; Permite base 1, sem inversa única; conferência: 1ʸ=1 para todo y; base deve ser ≠1." |
| `m2-logaritmos-c` | 1 | **sim** | "Certo: resposta 1; conferência: 1ʸ=1 para todo y; base deve ser ≠1." |

#### M3 — `m3-logaritmos`
- **Enunciado:** "Quanto vale log₃(27)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 3³=27.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-logaritmos-e` | 9 | não | "Resposta: 3; Multiplica base pelo argumento; conferência: 3³=27." |
| `m3-logaritmos-c` | 3 | **sim** | "Certo: resposta 3; conferência: 3³=27." |

### Desafios

#### D1 — `d1-logaritmos`
- **Enunciado:** "Resolva log₂(x)=4."
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x=2⁴=16.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-logaritmos-e` | 8 | não | "Resposta: 16; Usa 2³ em vez de 2⁴; conferência: x=2⁴=16." |
| `d1-logaritmos-c` | 16 | **sim** | "Certo: resposta 16; conferência: x=2⁴=16." |

#### D2 — `d2-logaritmos`
- **Enunciado:** "Quanto vale log₁₀(0,1)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 10⁻¹=0,1; log vale −1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-logaritmos-e` | 1 | não | "Resposta: −1; Ignora 10⁻¹=0,1; conferência: 10⁻¹=0,1; log vale −1." |
| `d2-logaritmos-c` | −1 | **sim** | "Certo: resposta −1; conferência: 10⁻¹=0,1; log vale −1." |

#### D3 — `d3-logaritmos`
- **Enunciado:** "Domínio de log₃(x−2)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** x−2>0 ⇒ x>2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-logaritmos-e` | x≥2 | não | "Resposta: x>2; Permite argumento zero; conferência: x−2>0 ⇒ x>2." |
| `d3-logaritmos-c` | x>2 | **sim** | "Certo: resposta x>2; conferência: x−2>0 ⇒ x>2." |

#### D4 — `d4-logaritmos`
- **Enunciado:** "Se log₂(x)=3, quanto vale log₂(4x)?"
- **Figura (opcional):** nenhuma
- **Conta de conferência:** 4x=32=2⁵; log₂(32)=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-logaritmos-e` | 12 | não | "Resposta: 5; Multiplica o log por 4 sem somar expoentes; conferência: 4x=32=2⁵; log₂(32)=5." |
| `d4-logaritmos-c` | 5 | **sim** | "Certo: resposta 5; conferência: 4x=32=2⁵; log₂(32)=5." |

#### D5 — `d5-logaritmos`
- **Enunciado:** "Resolva log₃(x)+log₃(3)=2."
- **Figura (opcional):** nenhuma
- **Conta de conferência:** log₃(x)+1=2 ⇒ x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-logaritmos-e` | 9 | não | "Resposta: 3; Não desconta log₃(3)=1; conferência: log₃(x)+1=2 ⇒ x=3." |
| `d5-logaritmos-c` | 3 | **sim** | "Certo: resposta 3; conferência: log₃(x)+1=2 ⇒ x=3." |

### Vestibular

> Apenas questões reais conferidas podem substituir estes registros; não foram inventados enunciados, gabaritos, alternativas ou links.

#### V1 — `pendente-fonte-logaritmos-1`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V2 — `pendente-fonte-logaritmos-2`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V3 — `pendente-fonte-logaritmos-3`
- **Enunciado (resumido):** PENDENTE-FONTE
- **Fala do Paco:** "Que questão oficial e conferida entrará neste espaço?"
- **Fonte:** PENDENTE-FONTE — banca, ano, enunciado, alternativas, gabarito e URL ainda não conferidos.
- **Adaptação:** nenhuma; questão não inserida.
- **Conta de conferência:** PENDENTE-FONTE; não há questão nem conta inventada.
- **Opções e feedback:** PENDENTE-FONTE; não criados sem fonte original.
#### V4 — `pendente-fonte-logaritmos-4`
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
