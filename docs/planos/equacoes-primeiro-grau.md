# Plano — Equações do primeiro grau

**Aula:** 1 — Equações do primeiro grau · O ponto em que as saídas concordam
**Caminho:** algebra / equacoes-e-inequacoes / equacoes-primeiro-grau
**Pré-requisitos que o aluno já domina:** `expressoes-algebricas-e-produtos-notaveis`; operações com sinais e leitura de coordenadas.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe a entrada x para duas máquinas lineares. A diferença entre as saídas depende de x; resolver é fazê-la zerar.

## b) Visual de partida

plano_cartesiano — curvas 0: afim a=1,b=0,c3; 1: afim a=0,b=0,ink; ponto curva 0, x=−2, passo 1; encontro c4.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Começar com y=x e y=0; não há escala nem deslocamento na primeira máquina. A reta y=x fica como fantasma ao entrar 2x−4.

## d) Panorama e recorte

Equações podem ter potências e radicais; aqui comparamos expressões lineares e cuidamos do coeficiente zero.

## e) Progressão por contraste

1. Referência visual: Arrasta o ponto de −2 até 0; acompanha a diferença das alturas.
2. Em contraste com a referência: Arrasta até x=2; compara a nova reta com a identidade.
3. Aprofundamento e fronteiras: Reduz a até 0; reta fica horizontal em −4.

## f) Dedução causal da forma

Somar o mesmo número aos dois lados preserva a igualdade. Dividir ambos por a≠0 desfaz a escala; de ax+b=0 vem ax=−b e x=−b/a. Se a=0, verificar b decide entre todos os reais e nenhum.

Fórmula deduzida: ax+b=0 ⇒ x=−b/a, a≠0.

## g) Simulação espacial e fronteiras

Variar a até zero em ax−4=0 produz impossibilidade; em 0x+0=0 todas as entradas servem. Igualdade não autoriza dividir por zero.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Entrada x | Número testado nos dois lados. |
| c2 | Coeficiente a | Fator que multiplica a entrada. |
| c3 | Saída ax+b | Altura produzida pela expressão linear. |
| c4 | Solução | Entrada que torna a igualdade verdadeira. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** plano_cartesiano — curvas 0: afim a=1,b=0,c3; 1: afim a=0,b=0,ink; ponto curva 0, x=−2, passo 1; encontro c4.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro, y = x; qual entrada encontra a saída zero? Arraste até o encontro."
- **Interação do aluno:** Arrasta o ponto de −2 até 0; acompanha a diferença das alturas.
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "A entrada é zero porque a identidade devolve o próprio x."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Equações podem ter potências e radicais; aqui comparamos expressões lineares e cuidamos do coeficiente zero."

### Passo 2 — `desfazer-operacoes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** plano_cartesiano — curva 0 afim a=2,b=−4,c3; curva 1 afim a=0,b=0,ink; terceira y=x fantasma; ponto x=0, passo 1; encontro c4.
- **Sliders:** nenhum
- **Paco (abertura):** "Qual entrada faz 2x−4 encontrar zero? Preveja e leve o ponto ao encontro."
- **Interação do aluno:** Arrasta até x=2; compara a nova reta com a identidade.
- **Conclusão:** `no_encontro ≥ 1`
- **Paco (conclusão):** "Como 2x−4=0 pede 2x=4, então x=2; subtrair e dividir desfazem a máquina."

### Passo 3 — `coeficiente-zero`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** plano_cartesiano — afim a variável,b=−4,c3; y=0 em ink; mantém a=2,b=−4 como fantasma; sem ponto.
- **Sliders:** a · Coeficiente · 0..2 · passo 1 · inicial 2 · c2
- **Paco (abertura):** "Se a chegar a zero, ax−4 ainda alcança zero? Reduza a e observe."
- **Interação do aluno:** Reduz a até 0; reta fica horizontal em −4.
- **Conclusão:** `a ≤ 0`
- **Paco (conclusão):** "Não; 0x−4 vale −4 para qualquer entrada, por isso não existe solução."
- **Tati (dúvida):** `fim` — P: "E se a saída fosse 0x+0?" / R: "Seria zero para todo x; haveria infinitas soluções."

### Passo 4 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** plano_figura — afim a=2,b=−4,c3 e y=0 ink; janela −2..5, encontro c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é a solução de 2x−4=0?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | −2 | não | "O sinal mudou errado; 2x=4, então x=2." | Posiciona ponto em (−2; −8), com janela y de −9 a 5. |
| `micro-acerto` | 2 | **sim** | "Certo: 2; 2x=4 dá x=2." | Posiciona ponto em (2; 0) e marca encontro c4. |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** plano_figura — afim a=2,b=−4,c3 e y=0 ink; janela −2..5, encontro c4.
- **Fórmula:** `a`→c2 · `x`→c1 · `+b = 0 ⇒ x`→c4 · `= −b/a`
- **Definições:**
  - "Entrada x: Número testado nos dois lados."
  - "Saída ax+b: Altura produzida pela expressão linear."
  - "Solução: Entrada que torna a igualdade verdadeira."
- **Paco (abertura):** "Desfazemos as operações nos dois lados; por isso x=−b/a quando a≠0."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você encontrou a entrada comum e separou solução única, nenhuma e infinitas soluções."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-equacoes-primeiro-grau`
- **Enunciado:** "Na identidade y=x, que entrada produz zero?"
- **Figura:** nenhuma
- **Conta de conferência:** x=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-equacoes-primeiro-grau-erro` | 1 | não | "Você deslocou uma reta sem termo constante. O certo é 0; x=0." |
| `f1-equacoes-primeiro-grau-certa` | 0 | **sim** | "Certo: 0; x=0." |

#### F2 — `f2-equacoes-primeiro-grau`
- **Enunciado:** "Resolver uma equação no gráfico é procurar o quê?"
- **Figura:** nenhuma
- **Conta de conferência:** f(x)=g(x) no encontro.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-equacoes-primeiro-grau-certa` | Encontro | **sim** | "Certo: Encontro; f(x)=g(x) no encontro." |
| `f2-equacoes-primeiro-grau-erro` | Maior altura | não | "Altura máxima não expressa igualdade. O certo é Encontro; f(x)=g(x) no encontro." |

#### F3 — `f3-equacoes-primeiro-grau`
- **Enunciado:** "Em 2x−4=0, qual operação desfaz o −4?"
- **Figura:** nenhuma
- **Conta de conferência:** 2x−4+4=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-equacoes-primeiro-grau-erro` | Subtrair 4 nos dois lados | não | "Você repetiu a operação em vez de desfazê-la. O certo é Somar 4 nos dois lados; 2x−4+4=4." |
| `f3-equacoes-primeiro-grau-certa` | Somar 4 nos dois lados | **sim** | "Certo: Somar 4 nos dois lados; 2x−4+4=4." |

#### F4 — `f4-equacoes-primeiro-grau`
- **Enunciado:** "A reta y=−4 encontra y=0?"
- **Figura:** nenhuma
- **Conta de conferência:** −4≠0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-equacoes-primeiro-grau-certa` | Não | **sim** | "Certo: Não; −4≠0." |
| `f4-equacoes-primeiro-grau-erro` | Sim | não | "Retas horizontais distintas não se encontram. O certo é Não; −4≠0." |

### Médias

#### M1 — `m1-equacoes-primeiro-grau`
- **Enunciado:** "Resolva 3x−6=0."
- **Figura:** nenhuma
- **Conta de conferência:** 3x=6; x=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-equacoes-primeiro-grau-erro` | −2 | não | "O sinal de 6 foi trocado. O certo é 2; 3x=6; x=2." |
| `m1-equacoes-primeiro-grau-certa` | 2 | **sim** | "Certo: 2; 3x=6; x=2." |

#### M2 — `m2-equacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x+1=7."
- **Figura:** nenhuma
- **Conta de conferência:** 2x=6; x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-equacoes-primeiro-grau-certa` | 3 | **sim** | "Certo: 3; 2x=6; x=3." |
| `m2-equacoes-primeiro-grau-erro` | 4 | não | "Você somou 1 ao alvo. O certo é 3; 2x=6; x=3." |

#### M3 — `m3-equacoes-primeiro-grau`
- **Enunciado:** "Resolva x+3=2x."
- **Figura:** nenhuma
- **Conta de conferência:** 3=2x−x=x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-equacoes-primeiro-grau-erro` | −3 | não | "Ao isolar x você trocou o sinal. O certo é 3; 3=2x−x=x." |
| `m3-equacoes-primeiro-grau-certa` | 3 | **sim** | "Certo: 3; 3=2x−x=x." |

### Desafios

#### D1 — `d1-equacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x+1=x+4."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x=4−1=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-equacoes-primeiro-grau-certa` | 3 | **sim** | "Certo: 3; x=4−1=3." |
| `d1-equacoes-primeiro-grau-erro` | 5 | não | "Você somou as constantes indevidamente. O certo é 3; x=4−1=3." |

#### D2 — `d2-equacoes-primeiro-grau`
- **Enunciado:** "Quantas soluções reais tem 0x=0?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0·x=0 para todo x.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-equacoes-primeiro-grau-erro` | Uma | não | "Zero multiplicado por qualquer real é zero. O certo é Infinitas; 0·x=0 para todo x." |
| `d2-equacoes-primeiro-grau-certa` | Infinitas | **sim** | "Certo: Infinitas; 0·x=0 para todo x." |

#### D3 — `d3-equacoes-primeiro-grau`
- **Enunciado:** "Quantas soluções reais tem 0x=2?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0≠2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-equacoes-primeiro-grau-certa` | Nenhuma | **sim** | "Certo: Nenhuma; 0≠2." |
| `d3-equacoes-primeiro-grau-erro` | Infinitas | não | "Você confundiu igualdade verdadeira com contradição. O certo é Nenhuma; 0≠2." |

#### D4 — `d4-equacoes-primeiro-grau`
- **Enunciado:** "Resolva 2x=1."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** x=1/2=0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-equacoes-primeiro-grau-erro` | 2 | não | "Você inverteu a divisão. O certo é 0,5; x=1/2=0,5." |
| `d4-equacoes-primeiro-grau-certa` | 0,5 | **sim** | "Certo: 0,5; x=1/2=0,5." |

#### D5 — `d5-equacoes-primeiro-grau`
- **Enunciado:** "Dois planos cobram 2+2x e 5+x reais; para qual x≥0 os custos coincidem?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2+2x=5+x; x=3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-equacoes-primeiro-grau-certa` | 3 | **sim** | "Certo: 3; 2+2x=5+x; x=3." |
| `d5-equacoes-primeiro-grau-erro` | 7 | não | "Você somou taxas fixas em vez de comparar. O certo é 3; 2+2x=5+x; x=3." |

### Vestibular

#### V1 — `v1-equacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema equações do primeiro grau.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-equacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema equações do primeiro grau.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-equacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema equações do primeiro grau.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-equacoes-primeiro-grau`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema equações do primeiro grau.
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
