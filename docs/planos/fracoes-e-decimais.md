# Plano — Frações, decimais e comparação de racionais

**Aula:** 1 — Frações, decimais e comparação de racionais · O mesmo ponto, várias escritas
**Caminho:** aritmetica / conjuntos-numeros-razoes-medidas / fracoes-e-decimais
**Pré-requisitos que o aluno já domina:** `sistemas-numericos-e-divisibilidade`; contagem e leitura da reta numérica.

**Nota editorial:** unidade nova do CURRICULO.md; título e subtítulo propostos acima, sem alterar a taxonomia.

## a) Ancoragem mecânica

O aluno escolhe em quantas partes iguais a unidade se divide e quantas partes toma. A posição racional depende da razão entre essas contagens.

## b) Visual de partida

reta_numerica — intervalo 0..2; ponto x=1 c3, passo 0,5; marcas de meio; ponto fixo 1 em c4.
Controles: nenhum.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Uma unidade inteira é 1/1; subdividir cada parte sem mudar o total mantém a posição, que fica fantasma.

## d) Panorama e recorte

Frações podem gerar decimais finitos ou periódicos; aqui comparamos, somamos e reconhecemos escritas equivalentes.

## e) Progressão por contraste

1. Referência visual: Move o ponto para o meio do segmento unitário.
2. Em contraste com a referência: A faixa passa de 1/2 para 2/4; o ponto na reta fica imóvel.
3. Depois, teste de fronteira: Compara três quartos com duas peças por meia: cabe uma meia e metade de outra.
4. Depois, teste de fronteira: Pinta um quarto após os dois quartos iniciais.

## f) Dedução causal da forma

Se cada pedaço vira k pedaços menores, numerador e denominador multiplicam por k e o comprimento não muda. Somar frações exige a mesma unidade de partição; dividir pelo denominador produz a escrita decimal. Multiplicar por uma fração toma uma parte da quantidade; dividir por c/d mede quantas partes desse tamanho cabem, por isso multiplica por d/c, com c≠0.

Fórmula deduzida: a/b=(ka)/(kb), b≠0 e k≠0.

## g) Simulação espacial e fronteiras

Denominador zero não define número; sinais negativos representam o lado oposto da reta. Decimal finito ou periódico é racional; 0,999…=1.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Numerador a | Quantidade de partes tomadas. |
| c2 | Denominador b | Quantidade de partes iguais em uma unidade. |
| c3 | Valor da fração | Ponto da reta representado pela divisão. |
| c4 | Referência equivalente | Outra escrita que ocupa o mesmo ponto. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** reta_numerica — intervalo 0..2; ponto x=1 c3, passo 0,5; marcas de meio; ponto fixo 1 em c4.
- **Sliders:** nenhum
- **Paco (abertura):** "No caso neutro 1/1 temos uma unidade; onde fica metade dela? Arraste de 1 até 0,5."
- **Interação do aluno:** Move o ponto para o meio do segmento unitário.
- **Conclusão:** `ponto_x ≤ 0,5`
- **Paco (conclusão):** "Fica em 0,5; metade é uma de duas partes iguais, por isso 1/2=0,5."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Frações podem gerar decimais finitos ou periódicos; aqui comparamos, somamos e reconhecemos escritas equivalentes."

### Passo 2 — `subdividir-sem-mover`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: faixas-fracionarias — faixa unitária com metade pintada c3; k subdivide cada metade; a=k c1,b=2k c2; ponto 1/2 c4; emite k.
- **Sliders:** k · Subdivisões · 1..4 · passo 1 · inicial 1 · ink
- **Paco (abertura):** "Se cada metade se partir em duas, a parte pintada muda? Leve k a 2."
- **Interação do aluno:** A faixa passa de 1/2 para 2/4; o ponto na reta fica imóvel.
- **Conclusão:** `k ≥ 2`
- **Paco (conclusão):** "Não; duplicamos peças pintadas e peças totais, por isso 1/2=2/4."

### Passo 3 — `medir-em-meias`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: faixas-fracionarias — fita de k quartos, referência de meia unidade em muted, contador de meias c3; emite k.
- **Sliders:** k · Quartos da fita · 1..3 · passo 1 · inicial 1 · c1
- **Paco (abertura):** "Quantas meias unidades cabem em 3/4? Leve k de 1 a 3."
- **Interação do aluno:** Compara três quartos com duas peças por meia: cabe uma meia e metade de outra.
- **Conclusão:** `k ≥ 3`
- **Paco (conclusão):** "Cabem 1,5 meias; por isso (3/4)÷(1/2)=(3/4)·2=3/2."

### Passo 4 — `somar-partes`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** WIDGET NOVO: faixas-fracionarias — duas faixas 1/2 e 1/4, grade de quartos; controle n de quartos adicionados à metade; total (2+n)/4 c3; emite n.
- **Sliders:** n · Quartos adicionados · 0..2 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "Ao juntar 1/2 com 1/4, o denominador deve virar 6? Adicione um quarto."
- **Interação do aluno:** Pinta um quarto após os dois quartos iniciais.
- **Conclusão:** `n ≥ 1`
- **Paco (conclusão):** "Não; a unidade continua dividida em quatro, então 2/4+1/4=3/4."
- **Tati (dúvida):** `fim` — P: "Toda fração vira decimal finito?" / R: "Não; 1/3=0,333… é periódico e continua racional."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** reta_figura — segmento 0..1 dividido em décimos; ponto 0,5 c3, referência 1/2 c4.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual escrita ocupa o mesmo ponto que 1/2?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 0,2 | não | "Você leu o denominador como décimo; 1÷2=0,5." | Mostra 0,2 à esquerda da metade. |
| `micro-acerto` | 0,5 | **sim** | "Certo: 0,5; 1÷2=0,5." | Sobrepõe os rótulos 1/2 e 0,5. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** reta_figura — segmento 0..1 dividido em décimos; ponto 0,5 c3, referência 1/2 c4.
- **Fórmula:** `a`→c1 · `/b`→c2 · `=(ka)/(kb)`→c4 · `, b≠0 e k≠0`
- **Definições:**
  - "Numerador a: Quantidade de partes tomadas."
  - "Valor da fração: Ponto da reta representado pela divisão."
  - "Referência equivalente: Outra escrita que ocupa o mesmo ponto."
- **Paco (abertura):** "Subdividir cada parte conserva o comprimento; por isso multiplicar os dois termos mantém a fração."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-fracoes-e-decimais`
- **Enunciado:** "Qual decimal representa 1/2?"
- **Figura:** nenhuma
- **Conta de conferência:** 1÷2=0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-fracoes-e-decimais-erro` | 0,2 | não | "Você tomou o denominador como décimo. O certo é 0,5; 1÷2=0,5." |
| `f1-fracoes-e-decimais-certa` | 0,5 | **sim** | "Certo: 0,5; 1÷2=0,5." |

#### F2 — `f2-fracoes-e-decimais`
- **Enunciado:** "2/4 e 1/2 ocupam o mesmo ponto?"
- **Figura:** nenhuma
- **Conta de conferência:** 2/4=1/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-fracoes-e-decimais-certa` | Sim | **sim** | "Certo: Sim; 2/4=1/2." |
| `f2-fracoes-e-decimais-erro` | Não | não | "Você comparou só o número de pedaços. O certo é Sim; 2/4=1/2." |

#### F3 — `f3-fracoes-e-decimais`
- **Enunciado:** "Qual é maior: 1/4 ou 1/2?"
- **Figura:** nenhuma
- **Conta de conferência:** 0,5>0,25.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-fracoes-e-decimais-erro` | 1/4 | não | "Mais divisões tornam cada pedaço menor. O certo é 1/2; 0,5>0,25." |
| `f3-fracoes-e-decimais-certa` | 1/2 | **sim** | "Certo: 1/2; 0,5>0,25." |

#### F4 — `f4-fracoes-e-decimais`
- **Enunciado:** "É permitido usar denominador zero?"
- **Figura:** nenhuma
- **Conta de conferência:** b≠0 em a/b.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-fracoes-e-decimais-certa` | Não | **sim** | "Certo: Não; b≠0 em a/b." |
| `f4-fracoes-e-decimais-erro` | Sim | não | "Divisão por zero não define fração. O certo é Não; b≠0 em a/b." |

### Médias

#### M1 — `m1-fracoes-e-decimais`
- **Enunciado:** "Quanto é 1/2+1/4?"
- **Figura:** nenhuma
- **Conta de conferência:** 2/4+1/4=3/4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-fracoes-e-decimais-erro` | 2/6 | não | "Você somou denominadores de unidades diferentes. O certo é 3/4; 2/4+1/4=3/4." |
| `m1-fracoes-e-decimais-certa` | 3/4 | **sim** | "Certo: 3/4; 2/4+1/4=3/4." |

#### M2 — `m2-fracoes-e-decimais`
- **Enunciado:** "Quanto é 3/4−1/2?"
- **Figura:** nenhuma
- **Conta de conferência:** 3/4−2/4=1/4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-fracoes-e-decimais-certa` | 1/4 | **sim** | "Certo: 1/4; 3/4−2/4=1/4." |
| `m2-fracoes-e-decimais-erro` | 2/2 | não | "Você subtraiu denominadores. O certo é 1/4; 3/4−2/4=1/4." |

#### M3 — `m3-fracoes-e-decimais`
- **Enunciado:** "Quanto é (1/2)·(2/3)?"
- **Figura:** nenhuma
- **Conta de conferência:** 2/6=1/3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-fracoes-e-decimais-erro` | 3/5 | não | "Você somou em vez de multiplicar. O certo é 1/3; 2/6=1/3." |
| `m3-fracoes-e-decimais-certa` | 1/3 | **sim** | "Certo: 1/3; 2/6=1/3." |

### Desafios

#### D1 — `d1-fracoes-e-decimais`
- **Enunciado:** "Quanto é (3/4)÷(1/2)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (3/4)·2=3/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-fracoes-e-decimais-certa` | 1,5 | **sim** | "Certo: 1,5; (3/4)·2=3/2." |
| `d1-fracoes-e-decimais-erro` | 0,375 | não | "Você multiplicou sem inverter o divisor. O certo é 1,5; (3/4)·2=3/2." |

#### D2 — `d2-fracoes-e-decimais`
- **Enunciado:** "A escrita 0,333… representa um racional?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0,333…=1/3.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-fracoes-e-decimais-erro` | Não | não | "Período infinito não implica irracionalidade. O certo é Sim; 0,333…=1/3." |
| `d2-fracoes-e-decimais-certa` | Sim | **sim** | "Certo: Sim; 0,333…=1/3." |

#### D3 — `d3-fracoes-e-decimais`
- **Enunciado:** "Quanto vale 0,999…?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 3·(1/3)=3·0,333…=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-fracoes-e-decimais-certa` | 1 | **sim** | "Certo: 1; 3·(1/3)=3·0,333…=1." |
| `d3-fracoes-e-decimais-erro` | Menos que 1 | não | "Você tratou a dízima como uma aproximação finita. O certo é 1; 3·(1/3)=3·0,333…=1." |

#### D4 — `d4-fracoes-e-decimais`
- **Enunciado:** "Entre −1/2 e −1/4, qual é maior?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** −0,25>−0,5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-fracoes-e-decimais-erro` | −1/2 | não | "Entre negativos, o mais perto de zero é maior. O certo é −1/4; −0,25>−0,5." |
| `d4-fracoes-e-decimais-certa` | −1/4 | **sim** | "Certo: −1/4; −0,25>−0,5." |

#### D5 — `d5-fracoes-e-decimais`
- **Enunciado:** "Uma fita mede 2 m; cortam-se 1/2 m e depois 3/4 m; quanto sobra?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 2−1/2−3/4=8/4−2/4−3/4=3/4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-fracoes-e-decimais-certa` | 3/4 m | **sim** | "Certo: 3/4 m; 2−1/2−3/4=8/4−2/4−3/4=3/4." |
| `d5-fracoes-e-decimais-erro` | 1/4 m | não | "Você descontou uma metade do total em vez de 1/2 m. O certo é 3/4 m; 2−1/2−3/4=8/4−2/4−3/4=3/4." |

### Vestibular

#### V1 — `v1-fracoes-e-decimais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema frações, decimais e comparação de racionais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-fracoes-e-decimais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema frações, decimais e comparação de racionais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-fracoes-e-decimais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema frações, decimais e comparação de racionais.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-fracoes-e-decimais`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema frações, decimais e comparação de racionais.
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
