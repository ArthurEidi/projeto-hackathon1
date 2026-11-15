# Plano — Equações logarítmicas e condições de existência

**Aula:** 1 — Equações logarítmicas e condições de existência · O argumento precisa existir
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-logaritmicas
**Pré-requisitos que o aluno já domina:** `logaritmos`, `equacoes-exponenciais`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla o argumento x. O logaritmo devolve o expoente que produz x; somente argumentos positivos entram na máquina.

## b) Visual de partida

plano_cartesiano — logaritmo a=1,b=2,c=0,c3; ponto x=1, passo 1; janela x −1..5,y −3..3; domínio x>0.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

log₂1=0 é o caso-base: a potência sem fatores extras devolve 1; (1;0) fica marcado em muted.

## d) Panorama e recorte

Há somas e diferenças de logaritmos; aqui traduzimos para potências e filtramos o domínio.

## e) Progressão por contraste

1. Referência visual: Move de (1;0) para (2;1).
2. Em contraste com a referência: Move até o encontro (4;2).
3. Aprofundamento e fronteiras: Move até 1; a saída some e aparece argumento zero.

## f) Dedução causal da forma

log_b A=c significa bᶜ=A; a base precisa ser positiva e diferente de 1, e A precisa ser positivo. Produtos viram somas apenas quando cada argumento é positivo.

Fórmula deduzida: log_b A=c ⇔ A=bᶜ, com A>0, b>0, b≠1.

## g) Simulação espacial e fronteiras

Testar x=0 e x<0: não desenhar ponto real. Em log₂(x−1), a fronteira é x=1; soluções algébricas fora de x>1 são descartadas.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Argumento x | Valor positivo recebido pelo logaritmo. |
| c2 | Base b | Base da potência que desfaz o logaritmo. |
| c3 | Logaritmo | Expoente devolvido pela máquina. |
| c4 | Solução válida | Entrada válida que produz o valor pedido. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — logaritmo a=1,b=2,c=0,c3; ponto x=1, passo 1; janela x −1..5,y −3..3; domínio x>0.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro log₂1=0, qual saída aparece em 2? Arraste até lá."
- **Interação do aluno:** Move de (1;0) para (2;1).
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Sai 1 porque 2¹=2."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Há somas e diferenças de logaritmos; aqui traduzimos para potências e filtramos o domínio."

### Passo 2 — `inverter-potencia`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — logaritmo a=1,b=2,c=0,c3 e y=2 ink; ponto x=1, passo 1; encontro c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual argumento produz logaritmo 2? Arraste até 4."
- **Interação do aluno:** Move até o encontro (4;2).
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "É 4; por isso log₂x=2 equivale a x=2²."

### Passo 3 — `fronteira-argumento`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: plano-log-dominio — log₂(x−1) c3, assíntota x=1; cursor independente x=3, passo 1; janela −1..5; emite ponto_x, bloqueia valores x≤1.
- **Sliders:** nenhum
- **Paco (abertura):** "Em log₂(x−1), o argumento aceita x=1? Leve o cursor até a fronteira."
- **Interação do aluno:** Move até 1; a saída some e aparece argumento zero.
- **Conclusão:** `ponto_x ≤ 1`
- **Paco (conclusão):** "Não; x−1 precisa ser positivo, por isso o domínio é x>1."
- **Tati (dúvida):** `fim` — P: "Posso juntar logs de argumentos negativos?" / R: "Não nos reais; cada log precisa existir antes de aplicar propriedades."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-log-dominio-figura — log₂(x−1), y=1, domínio x>1; versão estática, janela −1..5.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual x resolve log₂(x−1)=1?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 2 | não | "Você esqueceu o deslocamento; x−1=2, então x=3." | Mostra (2;0), que não tem altura 1. |
| `micro-acerto` | 3 | **sim** | "Certo: 3; x−1=2 dá x=3." | Marca (3;1). |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — logaritmo base 2 em c3 e horizontal y=2; argumento 4 c1, base 2 c2, encontro (4;2) c4, domínio x>0.
- **Fórmula:** `log_b`→c2 · `A`→c1 · `=c`→c3 · `⇔ A=bᶜ; A>0,b>0,b≠1`
- **Definições:**
  - "Argumento x: Valor positivo recebido pelo logaritmo."
  - "Logaritmo: Expoente devolvido pela máquina."
  - "Solução válida: Entrada válida que produz o valor pedido."
- **Paco (abertura):** "O logaritmo devolve um expoente; por isso log_b A=c equivale a A=bᶜ, com base e argumento válidos."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-logaritmicas`
- **Enunciado:** "Quanto vale log₂1?"
- **Figura:** nenhuma
- **Conta de conferência:** 2⁰=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-logaritmicas-erro` | 1 | não | "Você confundiu argumento com expoente. O certo é 0; 2⁰=1." |
| `f1-equacoes-logaritmicas-certa` | 0 | **sim** | "Certo: 0; 2⁰=1." |

#### F2 — `f2-equacoes-logaritmicas`
- **Enunciado:** "log₂0 existe nos reais?"
- **Figura:** nenhuma
- **Conta de conferência:** 2ˣ nunca é zero.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-logaritmicas-certa` | Não | **sim** | "Certo: Não; 2ˣ nunca é zero." |
| `f2-equacoes-logaritmicas-erro` | Sim | não | "O argumento precisa ser positivo. O certo é Não; 2ˣ nunca é zero." |

#### F3 — `f3-equacoes-logaritmicas`
- **Enunciado:** "A base do logaritmo pode ser 1?"
- **Figura:** nenhuma
- **Conta de conferência:** 1ˣ=1 sempre.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-logaritmicas-erro` | Sim | não | "Base 1 não permite inverter a potência. O certo é Não; 1ˣ=1 sempre." |
| `f3-equacoes-logaritmicas-certa` | Não | **sim** | "Certo: Não; 1ˣ=1 sempre." |

#### F4 — `f4-equacoes-logaritmicas`
- **Enunciado:** "log₂x=2 equivale a qual potência?"
- **Figura:** nenhuma
- **Conta de conferência:** log_b A=c ⇔ A=bᶜ.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-logaritmicas-certa` | x=2² | **sim** | "Certo: x=2²; log_b A=c ⇔ A=bᶜ." |
| `f4-equacoes-logaritmicas-erro` | x=2·2² | não | "Você acrescentou um fator à definição. O certo é x=2²; log_b A=c ⇔ A=bᶜ." |

### Médias

#### M1 — `m1-equacoes-logaritmicas`
- **Enunciado:** "Resolva log₂x=3."
- **Figura:** nenhuma
- **Conta de conferência:** x=2³=8.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-logaritmicas-erro` | 6 | não | "Você multiplicou base por expoente. O certo é 8; x=2³=8." |
| `m1-equacoes-logaritmicas-certa` | 8 | **sim** | "Certo: 8; x=2³=8." |

#### M2 — `m2-equacoes-logaritmicas`
- **Enunciado:** "Resolva log₂(x−1)=1."
- **Figura:** nenhuma
- **Conta de conferência:** x−1=2; x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-logaritmicas-certa` | 3 | **sim** | "Certo: 3; x−1=2; x=3." |
| `m2-equacoes-logaritmicas-erro` | 2 | não | "Você esqueceu o deslocamento. O certo é 3; x−1=2; x=3." |

#### M3 — `m3-equacoes-logaritmicas`
- **Enunciado:** "Resolva log₃x=0."
- **Figura:** nenhuma
- **Conta de conferência:** x=3⁰=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-logaritmicas-erro` | 0 | não | "Expoente zero produz 1, não zero. O certo é 1; x=3⁰=1." |
| `m3-equacoes-logaritmicas-certa` | 1 | **sim** | "Certo: 1; x=3⁰=1." |

### Desafios

#### D1 — `d1-equacoes-logaritmicas`
- **Enunciado:** "Qual é o domínio de log₂(x−1)+log₂(x+1)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x−1>0 e x+1>0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-logaritmicas-certa` | x>1 | **sim** | "Certo: x>1; x−1>0 e x+1>0." |
| `d1-equacoes-logaritmicas-erro` | x>−1 | não | "Você verificou apenas um argumento. O certo é x>1; x−1>0 e x+1>0." |

#### D2 — `d2-equacoes-logaritmicas`
- **Enunciado:** "Resolva log₂x+log₂(x−1)=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x(x−1)=2; x>1; x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-logaritmicas-erro` | {−1;2} | não | "Você aceitou argumentos negativos. O certo é {2}; x(x−1)=2; x>1; x=2." |
| `d2-equacoes-logaritmicas-certa` | {2} | **sim** | "Certo: {2}; x(x−1)=2; x>1; x=2." |

#### D3 — `d3-equacoes-logaritmicas`
- **Enunciado:** "Resolva log₄x=0,5."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x=4¹ᐟ²=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-logaritmicas-certa` | 2 | **sim** | "Certo: 2; x=4¹ᐟ²=2." |
| `d3-equacoes-logaritmicas-erro` | 0,125 | não | "Você inverteu a potência. O certo é 2; x=4¹ᐟ²=2." |

#### D4 — `d4-equacoes-logaritmicas`
- **Enunciado:** "Resolva log₂(x−1)=log₂(3−x)."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x−1=3−x; 1<x<3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-logaritmicas-erro` | {1;3} | não | "Você aceitou argumentos zero. O certo é {2}; x−1=3−x; 1<x<3." |
| `d4-equacoes-logaritmicas-certa` | {2} | **sim** | "Certo: {2}; x−1=3−x; 1<x<3." |

#### D5 — `d5-equacoes-logaritmicas`
- **Enunciado:** "Um índice é I=log₂N, com N>0; se I sobe de 1 para 3, N é multiplicado por quanto?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** N passa de 2 para 8; 8/2=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-logaritmicas-certa` | 4 | **sim** | "Certo: 4; N passa de 2 para 8; 8/2=4." |
| `d5-equacoes-logaritmicas-erro` | 2 | não | "Você confundiu variação do índice com razão das grandezas. O certo é 4; N passa de 2 para 8; 8/2=4." |

### Vestibular

**Auditoria B18 (15/11/2026):** nenhuma candidata integralmente verificável no cache ENEM obrigatório. Mantido PENDENTE-FONTE; contas e impedimentos em `docs/revisao/vestibular-b18.md`.

#### V1 — `v1-equacoes-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações logarítmicas e condições de existência.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações logarítmicas e condições de existência.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações logarítmicas e condições de existência.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-logaritmicas`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações logarítmicas e condições de existência.
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
