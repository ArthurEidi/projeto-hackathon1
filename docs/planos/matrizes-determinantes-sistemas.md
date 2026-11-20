# Plano — Matrizes, determinantes e sistemas lineares 2×2

**Aula:** 1 — Tabelas que Operam · Matrizes e suas operações
**Caminho:** algebra / matrizes-e-sistemas / matrizes-determinantes-sistemas
**Pré-requisitos que o aluno já domina:** `funcao-afim`, `equacoes-primeiro-grau`; operações com sinais e leitura de coordenadas.

**Nota editorial:** o currículo reúne este conteúdo em um capítulo; este plano consolida as duas aulas antigas no slug oficial.

## a) Ancoragem mecânica

O aluno escolhe um vetor e os coeficientes de uma matriz. A máquina combina as colunas e devolve outro vetor; um sistema pede inverter essa relação.

## b) Visual de partida

WIDGET NOVO: transformacao_plano — A=I, vetor (x;1) c1, imagem c3 sobreposta; malha e quadrado unitário; emite x.
Controles: x · Entrada horizontal · −2..2 · passo 1 · inicial 0 · c1.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

A identidade I mantém cada vetor e o quadrado unitário; a malha inicial fica fantasma.

## d) Panorama e recorte

Matrizes têm soma, produto e inversa; aqui usamos máquinas 2×2, área e um sistema de duas equações.

## e) Progressão por contraste

1. Referência visual: Arrasta vetor de (0;1) para (2;1), com imagem sobreposta.
2. Em contraste com a referência: Estica só a malha horizontal; área passa de 1 para 2.
3. Aprofundamento e fronteiras: Observa (1;1)→(2;1)→(4;1), com cadeia anterior a=1 em muted.
4. Depois, teste de fronteira: Chega a (2;1), solução de A=[[1,1],[1,−1]], saída (3;1).

## f) Dedução causal da forma

A primeira coluna é a imagem de (1;0), a segunda de (0;1). Distribuir x e y pelas colunas dá (ax+by;cx+dy); resolver Av=u busca as coordenadas de entrada. A área orientada do paralelogramo é ad−bc.

Fórmula deduzida: A(x;y)=(ax+by;cx+dy); det A=ad−bc.

## g) Simulação espacial e fronteiras

det A=0 indica perda de direção; um sistema associado pode ter nenhuma ou infinitas soluções. Soma de matrizes exige mesma ordem; produto exige dimensões internas iguais.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Vetor de entrada | Par de coordenadas antes da transformação. |
| c2 | Matriz A | Tabela que combina as coordenadas de entrada. |
| c3 | Vetor de saída | Par de coordenadas depois da transformação. |
| c4 | Determinante | Fator de área orientada da transformação. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: transformacao_plano — A=I, vetor (x;1) c1, imagem c3 sobreposta; malha e quadrado unitário; emite x.
- **Sliders:** x · Entrada horizontal · −2..2 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "No caso neutro A=I, o vetor muda? Leve x até 2."
- **Interação do aluno:** Arrasta vetor de (0;1) para (2;1), com imagem sobreposta.
- **Conclusão:** `x ≥ 2`
- **Paco (conclusão):** "Não; cada coluna da identidade preserva sua direção."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Matrizes têm soma, produto e inversa; aqui usamos máquinas 2×2, área e um sistema de duas equações."

### Passo 2 — `esticar-coluna`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: transformacao_plano — A=diag(a;1) c2; vetor (1;1) c1, imagem (a;1) c3; quadrado imagem e det em c4; identidade fantasma; emite a.
- **Sliders:** a · Escala horizontal · 0..2 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "Se a primeira coluna dobrar, a altura também dobra? Leve a a 2."
- **Interação do aluno:** Estica só a malha horizontal; área passa de 1 para 2.
- **Conclusão:** `a ≥ 2`
- **Paco (conclusão):** "Não; só x dobra, por isso (1;1) vira (2;1) e a área dobra."

### Passo 3 — `compor-maquinas`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: transformacao_plano — B=[[1,1],[0,1]], A=diag(a;1), vetor v=(1;1), três painéis v, Bv e A(Bv); vetores c1,c3, matrizes c2; emite a.
- **Sliders:** a · Escala após B · 1..2 · passo 1 · inicial 1 · c2
- **Paco (abertura):** "B soma y ao x; se A dobrar o x depois disso, (1;1) chega onde? Leve a a 2."
- **Interação do aluno:** Observa (1;1)→(2;1)→(4;1), com cadeia anterior a=1 em muted.
- **Conclusão:** `a ≥ 2`
- **Paco (conclusão):** "Chega a (4;1); o produto AB aplica B primeiro e A depois, por isso a ordem importa."
- **Tati (dúvida):** `fim` — P: "Como se somam matrizes da mesma ordem?" / R: "Entrada por entrada; por exemplo, I+diag(2;3)=diag(3;4)."

### Passo 4 — `resolver-sistema`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** plano_cartesiano — afins y=−x+3,c3 e y=x−1,ink; ponto curva 0,x=0,passo 1; encontro c1; janela −1..4.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual entrada satisfaz x+y=3 e x−y=1? Arraste até o encontro."
- **Interação do aluno:** Chega a (2;1), solução de A=[[1,1],[1,−1]], saída (3;1).
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "É (2;1), pois 2+1=3 e 2−1=1; as duas condições valem juntas."
- **Tati (dúvida):** `fim` — P: "Determinante zero significa nenhuma solução?" / R: "Não; também pode haver infinitas, se as condições forem dependentes e compatíveis."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: transformacao-figura — A=diag(2;1), vetor (1;3), imagem (2;3), malha identidade fantasma e área 2 em c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "A=diag(2;1) leva (1;3) a qual vetor?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | (2;6) | não | "Você dobrou as duas direções; só x dobra, então a imagem é (2;3)." | Desenha (2;6) em muted e a imagem real (2;3) c3. |
| `micro-acerto` | (2;3) | **sim** | "Certo: (2;3); (2·1;1·3)=(2;3)." | Destaca vetor (2;3) c3 e a primeira coluna c2. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: transformacao-figura — A=diag(2;1) em c2, entrada (1;3) c1, saída (2;3) c3, colunas (2;0),(0;1), det=2 c4.
- **Fórmula:** `A`→c2 · `(x;y)`→c1 · `=(ax+by;cx+dy)`→c3 · `; det A`→c4 · `=ad−bc`
- **Definições:**
  - "Vetor de entrada: Par de coordenadas antes da transformação."
  - "Vetor de saída: Par de coordenadas depois da transformação."
  - "Determinante: Fator de área orientada da transformação."
- **Paco (abertura):** "Cada coluna move uma direção; por isso a imagem é a combinação das colunas com pesos x e y."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-matrizes-determinantes-sistemas`
- **Enunciado:** "O que a matriz identidade faz a um vetor?"
- **Figura:** nenhuma
- **Conta de conferência:** I·v=v.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-matrizes-determinantes-sistemas-erro` | Zera | não | "Você confundiu identidade com matriz nula. O certo é Mantém; I·v=v." |
| `f1-matrizes-determinantes-sistemas-certa` | Mantém | **sim** | "Certo: Mantém; I·v=v." |

#### F2 — `f2-matrizes-determinantes-sistemas`
- **Enunciado:** "Na matriz A, a primeira coluna é imagem de qual vetor?"
- **Figura:** nenhuma
- **Conta de conferência:** A(1;0)=coluna 1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-matrizes-determinantes-sistemas-certa` | (1;0) | **sim** | "Certo: (1;0); A(1;0)=coluna 1." |
| `f2-matrizes-determinantes-sistemas-erro` | (0;1) | não | "Você trocou as colunas. O certo é (1;0); A(1;0)=coluna 1." |

#### F3 — `f3-matrizes-determinantes-sistemas`
- **Enunciado:** "diag(2;1) dobra qual coordenada?"
- **Figura:** nenhuma
- **Conta de conferência:** (x;y)→(2x;y).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-matrizes-determinantes-sistemas-erro` | y | não | "Você trocou as posições da diagonal. O certo é x; (x;y)→(2x;y)." |
| `f3-matrizes-determinantes-sistemas-certa` | x | **sim** | "Certo: x; (x;y)→(2x;y)." |

#### F4 — `f4-matrizes-determinantes-sistemas`
- **Enunciado:** "Duas retas paralelas distintas têm quantos pontos comuns?"
- **Figura:** nenhuma
- **Conta de conferência:** Não há interseção.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-matrizes-determinantes-sistemas-certa` | 0 | **sim** | "Certo: 0; Não há interseção." |
| `f4-matrizes-determinantes-sistemas-erro` | Infinitos | não | "Você confundiu paralelas distintas com coincidentes. O certo é 0; Não há interseção." |

### Médias

#### M1 — `m1-matrizes-determinantes-sistemas`
- **Enunciado:** "A=diag(2;1) envia (1;3) a qual vetor?"
- **Figura:** nenhuma
- **Conta de conferência:** (2·1;1·3)=(2;3).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-matrizes-determinantes-sistemas-erro` | (2;6) | não | "Você dobrou também a segunda coordenada. O certo é (2;3); (2·1;1·3)=(2;3)." |
| `m1-matrizes-determinantes-sistemas-certa` | (2;3) | **sim** | "Certo: (2;3); (2·1;1·3)=(2;3)." |

#### M2 — `m2-matrizes-determinantes-sistemas`
- **Enunciado:** "Qual det de diag(2;3)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2·3−0=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-matrizes-determinantes-sistemas-certa` | 6 | **sim** | "Certo: 6; 2·3−0=6." |
| `m2-matrizes-determinantes-sistemas-erro` | 5 | não | "Você somou os fatores de área. O certo é 6; 2·3−0=6." |

#### M3 — `m3-matrizes-determinantes-sistemas`
- **Enunciado:** "Resolva x+y=3 e x−y=1."
- **Figura:** nenhuma
- **Conta de conferência:** 2x=4; x=2; y=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-matrizes-determinantes-sistemas-erro` | (1;2) | não | "Você trocou x e y. O certo é (2;1); 2x=4; x=2; y=1." |
| `m3-matrizes-determinantes-sistemas-certa` | (2;1) | **sim** | "Certo: (2;1); 2x=4; x=2; y=1." |

### Desafios

#### D1 — `d1-matrizes-determinantes-sistemas`
- **Enunciado:** "Qual entrada gera (1;1) por diag(2;1)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x=1; y=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-matrizes-determinantes-sistemas-certa` | (0,5;1) | **sim** | "Certo: (0,5;1); 2x=1; y=1." |
| `d1-matrizes-determinantes-sistemas-erro` | (2;1) | não | "Você aplicou a matriz em vez de desfazê-la. O certo é (0,5;1); 2x=1; y=1." |

#### D2 — `d2-matrizes-determinantes-sistemas`
- **Enunciado:** "det A=0 garante sistema sem solução?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x+y=2 e 2x+2y=4 têm infinitas.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-matrizes-determinantes-sistemas-erro` | Sim | não | "Sistemas singulares também podem ser compatíveis. O certo é Não; x+y=2 e 2x+2y=4 têm infinitas." |
| `d2-matrizes-determinantes-sistemas-certa` | Não | **sim** | "Certo: Não; x+y=2 e 2x+2y=4 têm infinitas." |

#### D3 — `d3-matrizes-determinantes-sistemas`
- **Enunciado:** "Qual produto resulta de [[1,1],[0,1]] aplicado a (1;2)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (1+2;2)=(3;2).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-matrizes-determinantes-sistemas-certa` | (3;2) | **sim** | "Certo: (3;2); (1+2;2)=(3;2)." |
| `d3-matrizes-determinantes-sistemas-erro` | (1;3) | não | "Você trocou as linhas no cálculo. O certo é (3;2); (1+2;2)=(3;2)." |

#### D4 — `d4-matrizes-determinantes-sistemas`
- **Enunciado:** "A soma de [[1,0],[0,1]] e [[2,0],[0,3]] é qual?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1+2=3; 1+3=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-matrizes-determinantes-sistemas-erro` | diag(2;3) | não | "Você multiplicou diagonais em vez de somar entradas. O certo é diag(3;4); 1+2=3; 1+3=4." |
| `d4-matrizes-determinantes-sistemas-certa` | diag(3;4) | **sim** | "Certo: diag(3;4); 1+2=3; 1+3=4." |

#### D5 — `d5-matrizes-determinantes-sistemas`
- **Enunciado:** "Se A=diag(2;1) e B=[[1,1],[0,1]], quanto é A(B(1;1))?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** B(1;1)=(2;1); A(2;1)=(4;1).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-matrizes-determinantes-sistemas-certa` | (4;1) | **sim** | "Certo: (4;1); B(1;1)=(2;1); A(2;1)=(4;1)." |
| `d5-matrizes-determinantes-sistemas-erro` | (3;1) | não | "Você inverteu a ordem das máquinas. O certo é (4;1); B(1;1)=(2;1); A(2;1)=(4;1)." |

### Vestibular

**B23a (16/11/2026):** V1, V2 e V4 preenchidas com questões do ENEM com imagem (B17b); V3 segue PENDENTE-FONTE. Contas em `docs/revisao/vestibular-b23a.md`.

> B47 (19/11/2026): seção normalizada a partir do JSON da aula; cada questão real ocupa uma vaga V no formato do `lint-planos`, e as vagas PENDENTE-FONTE seguem abertas (registro em `docs/revisao/falas-b47.md`).

#### V1 — `enem-2019-acertos-por-dia`
- **Enunciado (resumido):** "A matriz dá os acertos de 5 alunos (linhas) em testes de segunda a sexta (colunas). Em que dia o teste teve mais acertos?"
- **Fala do Paco:** "Cada coluna é um dia da semana: junte os acertos dos 5 alunos naquele dia."
- **Fonte:** ENEM 2019 (adaptada) — **Adaptação:** Questão 144: enunciado resumido mantendo a matriz; gabarito (A) mantido. — **URL:** https://api.enem.dev/v1/exams/2019/questions/144
- **Imagens:** `/vestibular/enem-2019-144-1.png` (Matriz 5 por 5 com os acertos de cada aluno (linha) em cada dia (coluna), valores de 0 a 4)
- **Conta de conferência:** somas das colunas 11, 10, 10, 10, 10: segunda-feira (A).
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema matrizes, determinantes e sistemas lineares 2×2 (ler linha e coluna de uma matriz).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | Segunda-feira | **sim** | "Certo: segunda soma 3 + 3 + 2 + 3 + 0 = 11; cada um dos outros dias soma 10." |
| `b` | Terça-feira | não | "Você somou linhas: a linha 2 (Bruno, 12) é um aluno, não a terça. Por colunas, a segunda soma 11 e a terça, 10." |
| `c` | Quarta-feira | não | "A quarta tem dois 4, mas também dois 0: 0 + 4 + 2 + 4 + 0 = 10. A segunda soma 11." |
| `d` | Quinta-feira | não | "Quinta: 1 + 1 + 3 + 1 + 4 = 10. A segunda soma 3 + 3 + 2 + 3 + 0 = 11." |
| `e` | Sexta-feira | não | "Sexta: 2 + 2 + 2 + 0 + 4 = 10. A segunda soma 3 + 3 + 2 + 3 + 0 = 11." |

#### V2 — `enem-2021-regiao-destino`
- **Enunciado (resumido):** "Na matriz, aᵢⱼ é o número de famílias (em dezenas) que se mudaram da região i para a região j. Qual região mais recebeu famílias?"
- **Fala do Paco:** "A linha diz de onde a família saiu e a coluna diz para onde foi."
- **Fonte:** ENEM 2021 (adaptada) — **Adaptação:** Questão 157: enunciado resumido (a construtora investe na região de destino do maior fluxo) mantendo a matriz; gabarito (E) mantido. — **URL:** https://api.enem.dev/v1/exams/2021/questions/157
- **Imagens:** `/vestibular/enem-2021-157-5.png` (Matriz A de ordem 5 com as mudanças de famílias, em dezenas, entre as cinco regiões; diagonal nula)
- **Conta de conferência:** destino = coluna; somas das colunas 4, 8, 10, 11, 12: região 5 (E). Somar linhas (origem) daria região 1 (13).
- **Recorte para seleção:** Aplicação direta em contexto, no tema matrizes, determinantes e sistemas lineares 2×2 (aᵢⱼ como fluxo de i para j).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | 1 | não | "Você somou a linha 1 (13), que conta quem saiu da região 1. Quem chegou está na coluna: a 5 soma 12, a maior." |
| `b` | 2 | não | "A região 2 é a origem do maior elemento (a₂₃ = 6). O destino é a coluna: a 2 soma 8 e a 5 soma 12." |
| `c` | 3 | não | "O maior elemento isolado (a₂₃ = 6) vai para a região 3, mas a coluna 3 inteira soma 10. A coluna 5 soma 12." |
| `d` | 4 | não | "Quase: a coluna 4 soma 2 + 2 + 3 + 0 + 4 = 11. A coluna 5 soma 5 + 3 + 0 + 4 + 0 = 12." |
| `e` | 5 | **sim** | "Certo: destino é coluna; as colunas somam 4, 8, 10, 11 e 12, e a 5 recebeu 12 dezenas." |

#### V3 — `enem-2021-mala-camisetas`
- **Enunciado (resumido):** "A tabela mostra duas malas de 10 kg; itens do mesmo tipo têm a mesma massa. Com 2 calças e 1 sapato, quantas camisetas completam os 10 kg?"
- **Fala do Paco:** "Compare as duas viagens: o que entrou numa ocupa o lugar do que saiu da outra."
- **Fonte:** ENEM 2021 (adaptada) — **Adaptação:** Questão 164: enunciado resumido (mala de 10 kg, mesmas massas por tipo, máximo de camisetas) mantendo a tabela; gabarito (B) mantido. — **URL:** https://api.enem.dev/v1/exams/2021/questions/164
- **Imagens:** `/vestibular/enem-2021-164-1.png` (Tabela com camisetas, calças e sapatos levados nas viagens I e II)
- **Conta de conferência:** 12c + 4k + 3s + m = 18c + 3k + 2s + m = 10 dá k + s = 6c; a viagem II sem 1 calça e 1 sapato fica com 18 + 6 = 24 camisetas (B).
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema matrizes, determinantes e sistemas lineares 2×2 (sistema com duas equações e uma combinação delas).

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a` | 22 | não | "Com 22 a mala fica abaixo de 10 kg. Da viagem I para a II, 6 camisetas trocam 1 calça e 1 sapato; tirando mais um par da II: 24." |
| `b` | 24 | **sim** | "Certo: 6 camisetas = 1 calça + 1 sapato; a viagem II (18, 3, 2) sem 1 calça e 1 sapato vira 24, 2, 1." |
| `c` | 26 | não | "26 passa dos 10 kg. Da I para a II, 6 camisetas trocam 1 calça e 1 sapato; a II sem mais um par dá 18 + 6 = 24." |
| `d` | 33 | não | "33 passa dos 10 kg. Da I para a II, 6 camisetas trocam 1 calça e 1 sapato; a II sem mais um par dá 18 + 6 = 24." |
| `e` | 39 | não | "39 passa dos 10 kg. Da I para a II, 6 camisetas trocam 1 calça e 1 sapato; a II sem mais um par dá 18 + 6 = 24." |

#### V4 — `v3-matrizes-determinantes-sistemas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema matrizes, determinantes e sistemas lineares 2×2.
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
