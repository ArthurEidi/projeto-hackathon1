# Plano — Inequações do primeiro grau e intervalos-solução

**Aula:** 1 — Inequações do primeiro grau e intervalos-solução · A fronteira separa os lados
**Caminho:** algebra / equacoes-e-inequacoes / inequacoes-primeiro-grau
**Pré-requisitos que o aluno já domina:** `equacoes-primeiro-grau`, `conjuntos-e-intervalos`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno controla x numa reta. A comparação 2x−2>0 escolhe quais entradas acendem o intervalo-solução.

## b) Visual de partida

reta_numerica — intervalo −4..4; trecho (0;+∞) em c4; ponto x=−1, passo 1, distância ao zero desligada.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Na comparação x>0, a entrada passa sem mudança; zero é a fronteira aberta. Depois a fronteira anda para 1.

## d) Panorama e recorte

Inequações também envolvem produtos e curvas; aqui comparamos retas e observamos a troca de ordem com sinal negativo.

## e) Progressão por contraste

1. Referência visual: Arrasta de −1 até 1; ponto cruza círculo aberto em zero.
2. Em contraste com a referência: Arrasta para 2 e vê a região solução à direita da fronteira.
3. Aprofundamento e fronteiras: Cruza 1 rumo à esquerda; compara com o trecho anterior descrito na fala.

## f) Dedução causal da forma

Para x>1, 2x−2 fica positivo. Multiplicar uma reta numérica por −1 espelha a ordem: se x está à direita de 1, −x está à esquerda de −1. Portanto dividir por coeficiente negativo inverte o sinal da desigualdade.

Fórmula deduzida: ax+b>0 ⇔ x>−b/a se a>0; x<−b/a se a<0.

## g) Simulação espacial e fronteiras

Testar x na fronteira: > exclui e ≥ inclui. Para a=0, a desigualdade inteira é verdadeira ou falsa conforme b; não dividir por a.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número escolhido na reta. |
| c2 | Coeficiente a | Fator cujo sinal decide a ordem. |
| c3 | Valor comparado | Resultado da expressão comparada com zero. |
| c4 | Intervalo-solução | Entradas que tornam a desigualdade verdadeira. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo −4..4; trecho (0;+∞) em c4; ponto x=−1, passo 1, distância ao zero desligada.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro x>0, zero entra na solução? Atravesse a fronteira até 1."
- **Interação do aluno:** Arrasta de −1 até 1; ponto cruza círculo aberto em zero.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Zero não entra porque a comparação é estrita; em 1 ela é verdadeira."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Inequações também envolvem produtos e curvas; aqui comparamos retas e observamos a troca de ordem com sinal negativo."

### Passo 2 — `mover-fronteira`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** reta_numerica — intervalo −4..5; trecho (1;+∞) em c4, ponto aberto em 1; ponto móvel x=0, passo 1; referência 0 em muted.
- **Sliders:** nenhum
- **Paco (abertura):** "Em 2x−2>0, qual lado de 1 serve? Leve o ponto até 2."
- **Interação do aluno:** Arrasta para 2 e vê a região solução à direita da fronteira.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "2x−2>0 equivale a 2x>2; por isso x>1, com fronteira aberta."

### Passo 3 — `espelhar-ordem`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** reta_numerica — intervalo −4..5; trecho (−∞;1) em c4, fronteira 1 aberta; ponto x=2, passo 1.
- **Sliders:** nenhum
- **Paco (abertura):** "Agora −2x+2>0; o lado válido muda? Arraste de 2 até 0."
- **Interação do aluno:** Cruza 1 rumo à esquerda; compara com o trecho anterior descrito na fala.
- **Conclusão:** `dentro ≥ 1`
- **Paco (conclusão):** "Muda: dividir −2x>−2 por −2 inverte a ordem, por isso x<1."
- **Tati (dúvida):** `fim` — P: "Se trocar > por ≥, o que muda?" / R: "O ponto 1 passa a entrar; a igualdade também é permitida."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** reta_figura — intervalo −3..5; marca 1 aberta em c4, sem trecho preenchido.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a solução de −2x+2>0?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | x>1 | não | "Faltou inverter a ordem ao dividir por −2; a solução é x<1." | Mostra ponto x=2 fora do trecho (−∞;1). |
| `micro-acerto` | x<1 | **sim** | "Certo: x<1; Dividir por −2 inverte a ordem." | Preenche (−∞;1) em c4, com círculo aberto. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** reta_figura — intervalo −3..5; marca 1 aberta em c4, sem trecho preenchido.
- **Fórmula:** `a`→c2 · `x`→c1 · `+b > 0 ⇔ x`→c4 · `> −b/a (a>0)`
- **Definições:**
  - "Entrada x: Número escolhido na reta."
  - "Valor comparado: Resultado da expressão comparada com zero."
  - "Intervalo-solução: Entradas que tornam a desigualdade verdadeira."
- **Paco (abertura):** "Multiplicar por um negativo espelha a reta; por isso a ordem da desigualdade se inverte."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você encontrou a fronteira e escolheu o lado válido sem incluir igualdades proibidas."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-inequacoes-primeiro-grau`
- **Enunciado:** "Em x>0, zero entra na solução?"
- **Figura:** nenhuma
- **Conta de conferência:** 0>0 é falso.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-inequacoes-primeiro-grau-erro` | Sim | não | "O sinal estrito exclui a igualdade. O certo é Não; 0>0 é falso." |
| `f1-inequacoes-primeiro-grau-certa` | Não | **sim** | "Certo: Não; 0>0 é falso." |

#### F2 — `f2-inequacoes-primeiro-grau`
- **Enunciado:** "Na reta, x>1 fica de qual lado de 1?"
- **Figura:** nenhuma
- **Conta de conferência:** 2>1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-inequacoes-primeiro-grau-certa` | Direita | **sim** | "Certo: Direita; 2>1." |
| `f2-inequacoes-primeiro-grau-erro` | Esquerda | não | "Você inverteu a ordem dos números. O certo é Direita; 2>1." |

#### F3 — `f3-inequacoes-primeiro-grau`
- **Enunciado:** "Ao dividir uma desigualdade por −2, o sinal muda?"
- **Figura:** nenhuma
- **Conta de conferência:** 2>0 ⇒ −1<0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-inequacoes-primeiro-grau-erro` | Não | não | "Um fator negativo inverte a ordem. O certo é Sim; 2>0 ⇒ −1<0." |
| `f3-inequacoes-primeiro-grau-certa` | Sim | **sim** | "Certo: Sim; 2>0 ⇒ −1<0." |

#### F4 — `f4-inequacoes-primeiro-grau`
- **Enunciado:** "Em x≥1, o ponto 1 é aberto ou fechado?"
- **Figura:** nenhuma
- **Conta de conferência:** 1≥1 é verdadeiro.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-inequacoes-primeiro-grau-certa` | Fechado | **sim** | "Certo: Fechado; 1≥1 é verdadeiro." |
| `f4-inequacoes-primeiro-grau-erro` | Aberto | não | "Você excluiu uma igualdade permitida. O certo é Fechado; 1≥1 é verdadeiro." |

### Médias

#### M1 — `m1-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x−2>0."
- **Figura:** nenhuma
- **Conta de conferência:** 2x>2; x>1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-inequacoes-primeiro-grau-erro` | x<1 | não | "Você inverteu ao dividir por positivo. O certo é x>1; 2x>2; x>1." |
| `m1-inequacoes-primeiro-grau-certa` | x>1 | **sim** | "Certo: x>1; 2x>2; x>1." |

#### M2 — `m2-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva −2x+2>0."
- **Figura:** nenhuma
- **Conta de conferência:** −2x>−2; x<1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-inequacoes-primeiro-grau-certa` | x<1 | **sim** | "Certo: x<1; −2x>−2; x<1." |
| `m2-inequacoes-primeiro-grau-erro` | x>1 | não | "Faltou inverter ao dividir por negativo. O certo é x<1; −2x>−2; x<1." |

#### M3 — `m3-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva 3x≤6."
- **Figura:** nenhuma
- **Conta de conferência:** 3·2=6.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-inequacoes-primeiro-grau-erro` | x<2 | não | "Você retirou a igualdade. O certo é x≤2; 3·2=6." |
| `m3-inequacoes-primeiro-grau-certa` | x≤2 | **sim** | "Certo: x≤2; 3·2=6." |

### Desafios

#### D1 — `d1-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x+1≤x+3."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x≤3−1=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-inequacoes-primeiro-grau-certa` | x≤2 | **sim** | "Certo: x≤2; x≤3−1=2." |
| `d1-inequacoes-primeiro-grau-erro` | x≥2 | não | "Você trocou o lado da solução. O certo é x≤2; x≤3−1=2." |

#### D2 — `d2-inequacoes-primeiro-grau`
- **Enunciado:** "Quais reais satisfazem 0x+1>0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1>0 sempre.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-inequacoes-primeiro-grau-erro` | Nenhum | não | "A variável não muda a verdade da comparação. O certo é Todos; 1>0 sempre." |
| `d2-inequacoes-primeiro-grau-certa` | Todos | **sim** | "Certo: Todos; 1>0 sempre." |

#### D3 — `d3-inequacoes-primeiro-grau`
- **Enunciado:** "Quais reais satisfazem 0x−1≥0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** −1≥0 é falso.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-inequacoes-primeiro-grau-certa` | Nenhum | **sim** | "Certo: Nenhum; −1≥0 é falso." |
| `d3-inequacoes-primeiro-grau-erro` | Todos | não | "A saída constante é negativa. O certo é Nenhum; −1≥0 é falso." |

#### D4 — `d4-inequacoes-primeiro-grau`
- **Enunciado:** "Resolva −2x<1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x>1/(−2)=−0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-inequacoes-primeiro-grau-erro` | x<−0,5 | não | "Faltou inverter ao dividir por −2. O certo é x>−0,5; x>1/(−2)=−0,5." |
| `d4-inequacoes-primeiro-grau-certa` | x>−0,5 | **sim** | "Certo: x>−0,5; x>1/(−2)=−0,5." |

#### D5 — `d5-inequacoes-primeiro-grau`
- **Enunciado:** "Uma corrida custa 3+2x reais, com x≥0; com até 8 reais, qual intervalo de x é possível?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 3+2x≤8; 0≤x≤2,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-inequacoes-primeiro-grau-certa` | [0;2,5] | **sim** | "Certo: [0;2,5]; 3+2x≤8; 0≤x≤2,5." |
| `d5-inequacoes-primeiro-grau-erro` | (−∞;2,5] | não | "Você aceitou distância negativa. O certo é [0;2,5]; 3+2x≤8; 0≤x≤2,5." |

### Vestibular

#### V1 — `v1-inequacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema inequações do primeiro grau e intervalos-solução.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-inequacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema inequações do primeiro grau e intervalos-solução.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-inequacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema inequações do primeiro grau e intervalos-solução.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-inequacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema inequações do primeiro grau e intervalos-solução.
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
