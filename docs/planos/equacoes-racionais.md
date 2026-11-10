# Plano — Equações racionais e restrições do denominador

**Aula:** 1 — Equações racionais e restrições do denominador · Conferir antes de cancelar
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-racionais
**Pré-requisitos que o aluno já domina:** `funcao-racional`, `equacoes-primeiro-grau`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe x para duas expressões racionais. As alturas dependem de x; pontos que anulam denominadores ficam bloqueados.

## b) Visual de partida

plano_cartesiano — afim a=1,b=0,c3, rótulo x/1; ponto x=0, passo 1; janela −3..4.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Dividir x por 1 mantém a identidade; a reta y=x fica fantasma ao introduzir um denominador variável.

## d) Panorama e recorte

Equações racionais podem virar polinomiais; aqui preservamos as restrições antes de multiplicar ou cancelar.

## e) Progressão por contraste

1. Referência visual: Move na identidade sem interrupção.
2. Em contraste com a referência: Arrasta até 2; em x=1 exibe indefinido, sem conectar os ramos.
3. Aprofundamento e fronteiras: Cursor chega ao furo; valor original permanece indefinido.

## f) Dedução causal da forma

Se D(x)≠0, multiplicar os dois lados por D(x) é reversível. Se D(x)=0, a expressão original não existe, mesmo que o fator desapareça após cancelar.

Fórmula deduzida: N(x)/D(x)=k ⇔ N(x)=kD(x), com D(x)≠0.

## g) Simulação espacial e fronteiras

Em (x²−1)/(x−1)=2, a conta reduzida dá x=1, mas o original o proíbe; o conjunto-solução é vazio.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número testado na equação. |
| c2 | Denominador D | Expressão que não pode ser zero. |
| c3 | Valor racional | Altura da fração onde ela existe. |
| c4 | Soluções válidas | Entradas do domínio que satisfazem a igualdade. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — afim a=1,b=0,c3, rótulo x/1; ponto x=0, passo 1; janela −3..4.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro x/1, há alguma entrada proibida? Arraste até 2."
- **Interação do aluno:** Move na identidade sem interrupção.
- **Conclusão:** `ponto_x ≥ 2`
- **Paco (conclusão):** "Não; o denominador 1 nunca zera."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Equações racionais podem virar polinomiais; aqui preservamos as restrições antes de multiplicar ou cancelar."

### Passo 2 — `encontrar-fracao`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: plano-racional — curvas 1/(x−1) em c3 e y=1 em ink, x=1 excluído; x de −2 a 4; ponto x=0, passo 1; emite ponto_x e no_encontro.
- **Sliders:** nenhum
- **Paco (abertura):** "Onde 1/(x−1)=1? Atravesse o ponto proibido e procure o encontro em x=2."
- **Interação do aluno:** Arrasta até 2; em x=1 exibe indefinido, sem conectar os ramos.
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Em 2, 1/(2−1)=1; multiplicar por x−1 é válido porque ele não é zero."

### Passo 3 — `candidato-proibido`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: plano-racional — (x²−1)/(x−1), reta reduzida x+1 fantasma e y=2; furo em (1;2); cursor independente x=0, passo 1; emite ponto_x.
- **Sliders:** nenhum
- **Paco (abertura):** "A reta reduzida encontra y=2 em 1; esse ponto resolve o original? Leve o cursor até lá."
- **Interação do aluno:** Cursor chega ao furo; valor original permanece indefinido.
- **Conclusão:** `ponto_x ≥ 1`
- **Paco (conclusão):** "Não; em 1 o denominador é zero, por isso o encontro da reta reduzida deve ser descartado."
- **Tati (dúvida):** `fim` — P: "Cancelar o fator preenche o furo?" / R: "Não; o domínio continua excluindo x=1."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-racional-figura — versão estática de (x²−1)/(x−1) e y=2, furo (1;2), janela −2..4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a solução de (x²−1)/(x−1)=2?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | {1} | não | "Você aceitou o denominador zero; x=1 é proibido, então a solução é ∅." | Destaca o furo (1;2) e o denominador zero. |
| `micro-acerto` | ∅ | **sim** | "Certo: ∅; O único candidato x=1 é proibido." | Mantém o furo e indica ausência de interseções válidas. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: plano-racional-figura — N=1,D=x−1,k=1, encontro (2;1) c4 e polo x=1 aberto; janela −2..4.
- **Fórmula:** `N(x)/` · `D(x)`→c2 · `=k ⇔ N(x)=kD(x), D(x)≠0`
- **Definições:**
  - "Entrada x: Número testado na equação."
  - "Valor racional: Altura da fração onde ela existe."
  - "Soluções válidas: Entradas do domínio que satisfazem a igualdade."
- **Paco (abertura):** "Multiplicar por um denominador exige que ele não zere; por isso conferimos o domínio antes de aceitar candidatos."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-racionais`
- **Enunciado:** "Qual valor é proibido em 1/(x−1)?"
- **Figura:** nenhuma
- **Conta de conferência:** x−1=0 ⇒ x=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-racionais-erro` | 0 | não | "Você zerou o numerador inexistente. O certo é 1; x−1=0 ⇒ x=1." |
| `f1-equacoes-racionais-certa` | 1 | **sim** | "Certo: 1; x−1=0 ⇒ x=1." |

#### F2 — `f2-equacoes-racionais`
- **Enunciado:** "Cancelar x−1 preenche o furo em x=1?"
- **Figura:** nenhuma
- **Conta de conferência:** 0/0 continua indefinido.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-racionais-certa` | Não | **sim** | "Certo: Não; 0/0 continua indefinido." |
| `f2-equacoes-racionais-erro` | Sim | não | "O domínio original precisa ser mantido. O certo é Não; 0/0 continua indefinido." |

#### F3 — `f3-equacoes-racionais`
- **Enunciado:** "A expressão x/1 admite todo x real?"
- **Figura:** nenhuma
- **Conta de conferência:** 1≠0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-racionais-erro` | Não | não | "O denominador é sempre não nulo. O certo é Sim; 1≠0." |
| `f3-equacoes-racionais-certa` | Sim | **sim** | "Certo: Sim; 1≠0." |

#### F4 — `f4-equacoes-racionais`
- **Enunciado:** "Em x=2, quanto vale 1/(x−1)?"
- **Figura:** nenhuma
- **Conta de conferência:** 1/(2−1)=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-racionais-certa` | 1 | **sim** | "Certo: 1; 1/(2−1)=1." |
| `f4-equacoes-racionais-erro` | 0,5 | não | "Você esqueceu o −1. O certo é 1; 1/(2−1)=1." |

### Médias

#### M1 — `m1-equacoes-racionais`
- **Enunciado:** "Resolva 2/x=1."
- **Figura:** nenhuma
- **Conta de conferência:** x≠0; 2=x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-racionais-erro` | 0,5 | não | "Você inverteu a razão. O certo é 2; x≠0; 2=x." |
| `m1-equacoes-racionais-certa` | 2 | **sim** | "Certo: 2; x≠0; 2=x." |

#### M2 — `m2-equacoes-racionais`
- **Enunciado:** "Resolva 1/(x−1)=2."
- **Figura:** nenhuma
- **Conta de conferência:** x−1=1/2; x=1,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-racionais-certa` | 1,5 | **sim** | "Certo: 1,5; x−1=1/2; x=1,5." |
| `m2-equacoes-racionais-erro` | 3 | não | "Você multiplicou em vez de dividir. O certo é 1,5; x−1=1/2; x=1,5." |

#### M3 — `m3-equacoes-racionais`
- **Enunciado:** "Resolva (x+1)/(x−1)=2."
- **Figura:** nenhuma
- **Conta de conferência:** x+1=2x−2; x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-racionais-erro` | 1 | não | "Você aceitou o polo e não distribuiu o 2. O certo é 3; x+1=2x−2; x=3." |
| `m3-equacoes-racionais-certa` | 3 | **sim** | "Certo: 3; x+1=2x−2; x=3." |

### Desafios

#### D1 — `d1-equacoes-racionais`
- **Enunciado:** "Resolva (x²−1)/(x−1)=2."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x+1=2; x=1 é proibido.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-racionais-certa` | ∅ | **sim** | "Certo: ∅; x+1=2; x=1 é proibido." |
| `d1-equacoes-racionais-erro` | {1} | não | "O único candidato anula o denominador. O certo é ∅; x+1=2; x=1 é proibido." |

#### D2 — `d2-equacoes-racionais`
- **Enunciado:** "Quais soluções tem (x−2)/(x−2)=1?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x−2≠0; quociente=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-racionais-erro` | R | não | "Você preencheu um furo proibido. O certo é R sem {2}; x−2≠0; quociente=1." |
| `d2-equacoes-racionais-certa` | R sem {2} | **sim** | "Certo: R sem {2}; x−2≠0; quociente=1." |

#### D3 — `d3-equacoes-racionais`
- **Enunciado:** "Resolva 1/x=−2."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1=−2x; x=−1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-racionais-certa` | −0,5 | **sim** | "Certo: −0,5; 1=−2x; x=−1/2." |
| `d3-equacoes-racionais-erro` | −2 | não | "Você confundiu valor com inverso. O certo é −0,5; 1=−2x; x=−1/2." |

#### D4 — `d4-equacoes-racionais`
- **Enunciado:** "Resolva 1/x=1/(x−1)."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x−1=x é impossível.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-racionais-erro` | {1} | não | "Você aceitou um denominador zero. O certo é ∅; x−1=x é impossível." |
| `d4-equacoes-racionais-certa` | ∅ | **sim** | "Certo: ∅; x−1=x é impossível." |

#### D5 — `d5-equacoes-racionais`
- **Enunciado:** "Duas bombas levam x e 2x horas para encher um tanque; juntas levam 1 hora, com x>0; qual x?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1/x+1/(2x)=1; 3=2x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-racionais-certa` | 1,5 | **sim** | "Certo: 1,5; 1/x+1/(2x)=1; 3=2x." |
| `d5-equacoes-racionais-erro` | 3 | não | "Você somou tempos em vez de vazões. O certo é 1,5; 1/x+1/(2x)=1; 3=2x." |

### Vestibular

#### V1 — `v1-equacoes-racionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações racionais e restrições do denominador.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-racionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações racionais e restrições do denominador.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-racionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações racionais e restrições do denominador.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-racionais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações racionais e restrições do denominador.
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
