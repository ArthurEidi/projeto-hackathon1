# Plano — Equações com radicais e soluções espúrias

**Aula:** 1 — Equações com radicais e soluções espúrias · A raiz escolhe a altura positiva
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-irracionais
**Pré-requisitos que o aluno já domina:** `potencias-e-radicais`, `equacoes-primeiro-grau`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla x sob um radical. A raiz quadrada principal produz uma altura não negativa, que deve coincidir com o outro lado.

## b) Visual de partida

plano_cartesiano — modular a=1,b=0,c=0,c3, rótulo √(x²); identidade fantasma; ponto x=0, passo 1.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

√(x²) coincide com x apenas para x≥0; a referência neutra é o ramo não negativo da identidade.

## d) Panorama e recorte

Há vários índices de radicais; aqui tratamos raízes quadradas e conferimos candidatos depois de elevar ao quadrado.

## e) Progressão por contraste

1. Referência visual: Arrasta para −1 e vê saída 1, acima da reta fantasma.
2. Em contraste com a referência: Move até (2;2), encontro das curvas.
3. Aprofundamento e fronteiras: Compara √1=1 com x=−1.

## f) Dedução causal da forma

Se √A=B, então A=B² e B≥0. O caminho de volta exige também A≥0; elevar ao quadrado apaga o sinal de B e pode criar soluções falsas.

Fórmula deduzida: √A=B ⇔ A=B² e B≥0.

## g) Simulação espacial e fronteiras

Testar x=−1 na referência √(x²) e no candidato de √(x+2)=x: a raiz principal não devolve −1.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número testado nos dois lados. |
| c2 | Radicando A | Expressão dentro da raiz quadrada. |
| c3 | Raiz principal | Valor não negativo devolvido pela raiz. |
| c4 | Candidatos válidos | Candidatos que passam na equação original. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — modular a=1,b=0,c=0,c3, rótulo √(x²); identidade fantasma; ponto x=0, passo 1.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro com x≥0, √(x²)=x; o que sai se você arrastar até −1?"
- **Interação do aluno:** Arrasta para −1 e vê saída 1, acima da reta fantasma.
- **Conclusão:** `ponto_x ≤ −1`
- **Paco (conclusão):** "Sai 1 porque a raiz principal é não negativa; √(x²) é o módulo de x."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há vários índices de radicais; aqui tratamos raízes quadradas e conferimos candidatos depois de elevar ao quadrado."

### Passo 2 — `encontro-valido`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: plano-radical — √(x+2) em c3, domínio x≥−2, y=x em ink; janela −3..4; ponto x=0, passo 1; emite no_encontro.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual ponto faz √(x+2)=x? Arraste até 2."
- **Interação do aluno:** Move até (2;2), encontro das curvas.
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Em 2 os lados valem 2; como x+2=x², então os candidatos vêm de x²−x−2=0."

### Passo 3 — `rejeitar-sinal`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: plano-radical — mesmas curvas; cursor x=0, passo 1; emite ponto_x; mostra as alturas separadas em x=−1.
- **Sliders:** nenhum
- **Paco (abertura):** "A conta ao quadrado também deu −1; ele passa no original? Arraste até −1."
- **Interação do aluno:** Compara √1=1 com x=−1.
- **Conclusão:** `ponto_x ≤ −1`
- **Paco (conclusão):** "Não; 1≠−1, por isso elevar ao quadrado exige conferir o sinal no original."
- **Tati (dúvida):** `fim` — P: "Basta o radicando ser positivo?" / R: "Não; o lado igual à raiz também precisa ser não negativo."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-radical-figura — √(x+2) e y=x, domínio x≥−2, janela −3..4, versão estática.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual solução de √(x+2)=x é válida?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | −1 | não | "O lado direito ficou negativo; √1=1≠−1, então só 2 é solução." | Mostra alturas 1 e −1 no cursor x=−1. |
| `micro-acerto` | 2 | **sim** | "Certo: 2; Em 2, √4=2; em −1, √1≠−1." | Marca o encontro (2;2). |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: plano-radical-figura — A=x+2,B=x; encontro (2;2) e candidato x=−1 rejeitado; alturas 1 e −1 distintas.
- **Fórmula:** `√` · `A`→c2 · `=` · `B`→c3 · `⇔ A=B² e B≥0`
- **Definições:**
  - "Entrada x: Número testado nos dois lados."
  - "Raiz principal: Valor não negativo devolvido pela raiz."
  - "Candidatos válidos: Candidatos que passam na equação original."
- **Paco (abertura):** "O quadrado apaga sinais; por isso todo candidato precisa satisfazer a raiz principal na equação original."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-irracionais`
- **Enunciado:** "Quanto vale a raiz principal √9?"
- **Figura:** nenhuma
- **Conta de conferência:** √9=3≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-irracionais-erro` | ±3 | não | "Você confundiu raiz principal com soluções de x²=9. O certo é 3; √9=3≥0." |
| `f1-equacoes-irracionais-certa` | 3 | **sim** | "Certo: 3; √9=3≥0." |

#### F2 — `f2-equacoes-irracionais`
- **Enunciado:** "A raiz principal pode ser negativa?"
- **Figura:** nenhuma
- **Conta de conferência:** √A≥0 para A≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-irracionais-certa` | Não | **sim** | "Certo: Não; √A≥0 para A≥0." |
| `f2-equacoes-irracionais-erro` | Sim | não | "A definição escolhe o valor não negativo. O certo é Não; √A≥0 para A≥0." |

#### F3 — `f3-equacoes-irracionais`
- **Enunciado:** "Quanto vale √(x²) em x=−2?"
- **Figura:** nenhuma
- **Conta de conferência:** √4=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-irracionais-erro` | −2 | não | "Você retirou o quadrado sem considerar o módulo. O certo é 2; √4=2." |
| `f3-equacoes-irracionais-certa` | 2 | **sim** | "Certo: 2; √4=2." |

#### F4 — `f4-equacoes-irracionais`
- **Enunciado:** "Elevar uma equação ao quadrado pode criar candidatos falsos?"
- **Figura:** nenhuma
- **Conta de conferência:** 1²=(−1)², mas 1≠−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-irracionais-certa` | Sim | **sim** | "Certo: Sim; 1²=(−1)², mas 1≠−1." |
| `f4-equacoes-irracionais-erro` | Não | não | "O quadrado apaga a diferença de sinais. O certo é Sim; 1²=(−1)², mas 1≠−1." |

### Médias

#### M1 — `m1-equacoes-irracionais`
- **Enunciado:** "Resolva √x=2."
- **Figura:** nenhuma
- **Conta de conferência:** x=2²=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-irracionais-erro` | 2 | não | "Você não elevou o alvo ao quadrado. O certo é 4; x=2²=4." |
| `m1-equacoes-irracionais-certa` | 4 | **sim** | "Certo: 4; x=2²=4." |

#### M2 — `m2-equacoes-irracionais`
- **Enunciado:** "Resolva √(x+1)=3."
- **Figura:** nenhuma
- **Conta de conferência:** x+1=9; x=8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-irracionais-certa` | 8 | **sim** | "Certo: 8; x+1=9; x=8." |
| `m2-equacoes-irracionais-erro` | 10 | não | "Você somou 1 após elevar ao quadrado. O certo é 8; x+1=9; x=8." |

#### M3 — `m3-equacoes-irracionais`
- **Enunciado:** "Resolva √(2x)=2."
- **Figura:** nenhuma
- **Conta de conferência:** 2x=4; x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-irracionais-erro` | 4 | não | "Você esqueceu de dividir por 2. O certo é 2; 2x=4; x=2." |
| `m3-equacoes-irracionais-certa` | 2 | **sim** | "Certo: 2; 2x=4; x=2." |

### Desafios

#### D1 — `d1-equacoes-irracionais`
- **Enunciado:** "Resolva √(x+2)=x nos reais."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²−x−2=0; x≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-irracionais-certa` | {2} | **sim** | "Certo: {2}; x²−x−2=0; x≥0." |
| `d1-equacoes-irracionais-erro` | {−1;2} | não | "Você aceitou o candidato de lado direito negativo. O certo é {2}; x²−x−2=0; x≥0." |

#### D2 — `d2-equacoes-irracionais`
- **Enunciado:** "Resolva √(x−1)=−1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** √(x−1)≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-irracionais-erro` | {2} | não | "A raiz principal não pode valer −1. O certo é ∅; √(x−1)≥0." |
| `d2-equacoes-irracionais-certa` | ∅ | **sim** | "Certo: ∅; √(x−1)≥0." |

#### D3 — `d3-equacoes-irracionais`
- **Enunciado:** "Resolva √(2x+1)=2."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2x+1=4; x=3/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-irracionais-certa` | 1,5 | **sim** | "Certo: 1,5; 2x+1=4; x=3/2." |
| `d3-equacoes-irracionais-erro` | 2,5 | não | "Você somou 1 ao isolar x. O certo é 1,5; 2x+1=4; x=3/2." |

#### D4 — `d4-equacoes-irracionais`
- **Enunciado:** "Resolva √(x²)=x."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** √(x²)=∣x∣; ∣x∣=x se x≥0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-irracionais-erro` | R | não | "Para x negativo a raiz devolve −x. O certo é x≥0; √(x²)=∣x∣; ∣x∣=x se x≥0." |
| `d4-equacoes-irracionais-certa` | x≥0 | **sim** | "Certo: x≥0; √(x²)=∣x∣; ∣x∣=x se x≥0." |

#### D5 — `d5-equacoes-irracionais`
- **Enunciado:** "Resolva √(x+2)=x−4."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x²−9x+14=0; x≥4; x=7.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-irracionais-certa` | {7} | **sim** | "Certo: {7}; x²−9x+14=0; x≥4; x=7." |
| `d5-equacoes-irracionais-erro` | {2;7} | não | "Você aceitou um lado direito negativo. O certo é {7}; x²−9x+14=0; x≥4; x=7." |

### Vestibular

#### V1 — `v1-equacoes-irracionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações com radicais e soluções espúrias.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-irracionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações com radicais e soluções espúrias.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-irracionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações com radicais e soluções espúrias.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-irracionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações com radicais e soluções espúrias.
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
