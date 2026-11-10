# Plano — Números complexos no plano

**Aula:** 1 — Girar no Plano · A unidade imaginária e o plano complexo
**Caminho:** algebra / polinomios-e-complexos / numeros-complexos
**Pré-requisitos que o aluno já domina:** `potencias-e-radicais`, `raizes-polinomiais-e-multiplicidade`; operações com sinais e leitura de coordenadas.

## a) Ancoragem mecânica

O aluno controla as coordenadas de z e a operação aplicada. O ponto resultante depende de soma, conjugação ou multiplicação.

## b) Visual de partida

WIDGET NOVO: plano-complexo — z=(a;1), eixo real horizontal, imaginário vertical; imagem z·1 sobreposta c3 e z fantasma; emite a.
Controles: a · Parte real · 0..2 · passo 1 · inicial 0 · c1.
A figura aparece antes das expressões; a fala acompanha o gesto descrito no passo 1.

## c) Caso neutro

Somar 0 e multiplicar por 1 deixam o vetor intacto; ele permanece fantasma durante as transformações.

## d) Panorama e recorte

Complexos têm forma algébrica e polar; aqui usamos soma, produto, conjugado, módulo e divisão, com raízes quadráticas simples.

## e) Progressão por contraste

1. Referência visual: Entrada e imagem se movem juntas de i para 2+i.
2. Em contraste com a referência: Gira duas vezes 90° anti-horário e chega a −1.
3. Aprofundamento e fronteiras: Soma vetores; as partes imaginárias 1 e −1 se cancelam, resultando 3.
4. Depois, teste de fronteira: Arrasta b até 4; vê pontos (3;4) e (3;−4), ambos com módulo 5.

## f) Dedução causal da forma

A distributiva e i²=−1 dão (a+bi)(c+di)=(ac−bd)+(ad+bc)i. Multiplicar por i leva (a;b) a (−b;a), um giro de 90°. O produto z·z̄=a²+b² vem do cancelamento dos termos imaginários, logo fornece módulo e divisão.

Fórmula deduzida: z=a+bi; z·z̄=a²+b²; ∣z∣=√(a²+b²).

## g) Simulação espacial e fronteiras

Divisão só por complexo não nulo; módulo é real não negativo. Não ordenar complexos por maior/menor como na reta; comparar seus módulos é outra operação.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Parte real a | Coordenada no eixo real. |
| c2 | Parte imaginária b | Coeficiente de i, lido no eixo vertical. |
| c3 | Complexo z | Ponto ou vetor a+bi. |
| c4 | Módulo | Distância do ponto à origem. |

**Convenções visuais:** c1 azul, c2 laranja, c3 rosa e c4 violeta; eixos em ink e referências em muted.
Cada letra tocável destaca somente a grandeza correspondente; dicas usam o texto do glossário.
Nos widgets novos, a figura homônima é a versão estática, com os mesmos parâmetros e destaques; treino não reage à resposta.

### Passo 1 — `caso-neutro`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1 (máquina), 2 (visual), 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO: plano-complexo — z=(a;1), eixo real horizontal, imaginário vertical; imagem z·1 sobreposta c3 e z fantasma; emite a.
- **Sliders:** a · Parte real · 0..2 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "No caso neutro z·1, o ponto se move em relação à entrada? Leve a até 2."
- **Interação do aluno:** Entrada e imagem se movem juntas de i para 2+i.
- **Conclusão:** `a ≥ 2`
- **Paco (conclusão):** "Não; multiplicar por 1 preserva ambas as coordenadas."
- **Tati (dúvida):** `fim` — P: "Esse assunto tem outras versões?" / R: "Complexos têm forma algébrica e polar; aqui usamos soma, produto, conjugado, módulo e divisão, com raízes quadráticas simples."

### Passo 2 — `girar-por-i`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2 (visual), 5 (contraste), 6 (dedução)
- **Widget:** WIDGET NOVO: plano-complexo — z=1, aplica iⁿ, rastro 1,i,−1; vetor original fantasma; emite n; coordenadas a c1,b c2, vetor c3.
- **Sliders:** n · Giros por i · 0..4 · passo 1 · inicial 0 · ink
- **Paco (abertura):** "Duas multiplicações por i levam 1 a qual ponto? Leve n a 2."
- **Interação do aluno:** Gira duas vezes 90° anti-horário e chega a −1.
- **Conclusão:** `n ≥ 2`
- **Paco (conclusão):** "Chegam a −1; por isso i²=−1 representa meia-volta."

### Passo 3 — `somar-e-dividir`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5 (contraste), 6 (causa), 7 (fronteira)
- **Widget:** WIDGET NOVO: plano-complexo — z=2+i e w=t−i; soma ponta-cauda em c3; coordenadas reais c1 e imaginárias c2, referência z muted; emite t.
- **Sliders:** t · Parte real de w · 0..1 · passo 1 · inicial 0 · c1
- **Paco (abertura):** "Se somarmos 1−i a 2+i, o resultado fica no eixo real? Leve t até 1."
- **Interação do aluno:** Soma vetores; as partes imaginárias 1 e −1 se cancelam, resultando 3.
- **Conclusão:** `t ≥ 1`
- **Paco (conclusão):** "Sim; (2+1)+(1−1)i=3, porque somamos cada coordenada separadamente."
- **Tati (dúvida):** `fim` — P: "Como dividir 1 por 1+i?" / R: "Multiplique por (1−i)/(1−i); o resultado é (1−i)/2, pois (1+i)(1−i)=2."

### Passo 4 — `conjugado-e-modulo`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 2, 5, 6, 7
- **Widget:** WIDGET NOVO: plano-complexo — z=3+bi,c3, conjugado 3−bi em muted, triângulo de catetos 3 e b, módulo c4; emite b.
- **Sliders:** b · Parte imaginária · 0..4 · passo 1 · inicial 0 · c2
- **Paco (abertura):** "Ao levar b a 4, o conjugado muda a distância até zero?"
- **Interação do aluno:** Arrasta b até 4; vê pontos (3;4) e (3;−4), ambos com módulo 5.
- **Conclusão:** `b ≥ 4`
- **Paco (conclusão):** "Não; 3²+4²=25 nos dois casos, por isso o módulo é 5 e z·z̄=25."
- **Tati (dúvida):** `fim` — P: "Posso dividir por z=0?" / R: "Não; o denominador a²+b² zera e a divisão deixa de existir."

### Passo 5 — `conferir-previsao`
- **Tipo:** `micro_challenge`
- **Pilares:** 2, 6, 7
- **Figura:** WIDGET NOVO: plano-complexo-figura — z=3+4i e conjugado, triângulo 3–4–5, módulo c4; versão estática.
- **Paco (abertura):** "Que previsão você faz ao comparar a figura com as condições do problema?"
- **Enunciado:** "Qual é o módulo de 3+4i?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `micro-erro` | 7 | não | "Você somou os catetos; √(9+16)=5, então o módulo é 5." | Destaca o caminho pelos catetos 3 e 4, diferente do segmento direto. |
| `micro-acerto` | 5 | **sim** | "Certo: 5; √(3²+4²)=√25=5." | Destaca hipotenusa 5 em c4. |

### Passo 6 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6 (+ resumo de 1 a 7)
- **Figura:** WIDGET NOVO: plano-complexo-figura — z=3+4i c3, conjugado 3−4i muted, a=3 c1,b=4 c2,módulo 5 c4 e produto 25 ink.
- **Fórmula:** `z`→c3 · `=a`→c1 · `+b`→c2 · `i; z·z̄=a²+b²; ∣z∣`→c4 · `=√(a²+b²)`
- **Definições:**
  - "Parte real a: Coordenada no eixo real."
  - "Complexo z: Ponto ou vetor a+bi."
  - "Módulo: Distância do ponto à origem."
- **Paco (abertura):** "O conjugado cancela a parte imaginária no produto; por isso z·z̄=a²+b² dá o quadrado do módulo."
- **Dica (hint):** "Toque em uma letra para ver o que ela faz no gráfico."

**Frase de encerramento (outro):** "Você comparou o caso neutro, testou as fronteiras e ligou o desenho à regra."

## i) Treino pós-aula

As 12 questões autorais estão prontas para tradução; os quatro espaços de vestibular seguem a exceção de fonte do modelo.

### Fáceis

#### F1 — `f1-numeros-complexos`
- **Enunciado:** "Qual ponto representa 3+2i?"
- **Figura:** nenhuma
- **Conta de conferência:** Re=3; Im=2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f1-numeros-complexos-erro` | (2;3) | não | "Você trocou os eixos real e imaginário. O certo é (3;2); Re=3; Im=2." |
| `f1-numeros-complexos-certa` | (3;2) | **sim** | "Certo: (3;2); Re=3; Im=2." |

#### F2 — `f2-numeros-complexos`
- **Enunciado:** "Quanto vale i²?"
- **Figura:** nenhuma
- **Conta de conferência:** i·i=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f2-numeros-complexos-certa` | −1 | **sim** | "Certo: −1; i·i=−1." |
| `f2-numeros-complexos-erro` | 1 | não | "Duas rotações de 90° fazem meia-volta. O certo é −1; i·i=−1." |

#### F3 — `f3-numeros-complexos`
- **Enunciado:** "Multiplicar z por 1 altera o ponto?"
- **Figura:** nenhuma
- **Conta de conferência:** z·1=z.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f3-numeros-complexos-erro` | Sim | não | "1 é o neutro multiplicativo. O certo é Não; z·1=z." |
| `f3-numeros-complexos-certa` | Não | **sim** | "Certo: Não; z·1=z." |

#### F4 — `f4-numeros-complexos`
- **Enunciado:** "Qual é o conjugado de 4−2i?"
- **Figura:** nenhuma
- **Conta de conferência:** Conjugação muda só o sinal imaginário.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `f4-numeros-complexos-certa` | 4+2i | **sim** | "Certo: 4+2i; Conjugação muda só o sinal imaginário." |
| `f4-numeros-complexos-erro` | −4+2i | não | "Você trocou também a parte real. O certo é 4+2i; Conjugação muda só o sinal imaginário." |

### Médias

#### M1 — `m1-numeros-complexos`
- **Enunciado:** "Some (2+i)+(1+3i)."
- **Figura:** nenhuma
- **Conta de conferência:** 2+1=3; 1+3=4.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m1-numeros-complexos-erro` | 3+3i | não | "Você esqueceu o primeiro i. O certo é 3+4i; 2+1=3; 1+3=4." |
| `m1-numeros-complexos-certa` | 3+4i | **sim** | "Certo: 3+4i; 2+1=3; 1+3=4." |

#### M2 — `m2-numeros-complexos`
- **Enunciado:** "Calcule i(3+2i)."
- **Figura:** nenhuma
- **Conta de conferência:** 3i+2i²=−2+3i.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m2-numeros-complexos-certa` | −2+3i | **sim** | "Certo: −2+3i; 3i+2i²=−2+3i." |
| `m2-numeros-complexos-erro` | 2+3i | não | "Você tratou i² como 1. O certo é −2+3i; 3i+2i²=−2+3i." |

#### M3 — `m3-numeros-complexos`
- **Enunciado:** "Qual é o módulo de 3+4i?"
- **Figura:** nenhuma
- **Conta de conferência:** √(9+16)=5.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `m3-numeros-complexos-erro` | 7 | não | "Você somou catetos em vez de usar Pitágoras. O certo é 5; √(9+16)=5." |
| `m3-numeros-complexos-certa` | 5 | **sim** | "Certo: 5; √(9+16)=5." |

### Desafios

#### D1 — `d1-numeros-complexos`
- **Enunciado:** "Quanto vale 1/(1+i)?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** (1−i)/(1+1)=(1−i)/2.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d1-numeros-complexos-certa` | 0,5−0,5i | **sim** | "Certo: 0,5−0,5i; (1−i)/(1+1)=(1−i)/2." |
| `d1-numeros-complexos-erro` | 1−i | não | "Você esqueceu o denominador do conjugado. O certo é 0,5−0,5i; (1−i)/(1+1)=(1−i)/2." |

#### D2 — `d2-numeros-complexos`
- **Enunciado:** "É permitido dividir um complexo por zero?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 0²+0²=0.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d2-numeros-complexos-erro` | Sim | não | "O conjugado não elimina denominador zero. O certo é Não; 0²+0²=0." |
| `d2-numeros-complexos-certa` | Não | **sim** | "Certo: Não; 0²+0²=0." |

#### D3 — `d3-numeros-complexos`
- **Enunciado:** "Resolva z²+1=0 em C."
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** i²=(−i)²=−1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d3-numeros-complexos-certa` | ±i | **sim** | "Certo: ±i; i²=(−i)²=−1." |
| `d3-numeros-complexos-erro` | ±1 | não | "Você ignorou que o quadrado deve valer −1. O certo é ±i; i²=(−i)²=−1." |

#### D4 — `d4-numeros-complexos`
- **Enunciado:** "Quanto vale (1+i)²?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** 1+2i+i²=2i.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4-numeros-complexos-erro` | 2+2i | não | "Você tratou i² como 1. O certo é 2i; 1+2i+i²=2i." |
| `d4-numeros-complexos-certa` | 2i | **sim** | "Certo: 2i; 1+2i+i²=2i." |

#### D5 — `d5-numeros-complexos`
- **Enunciado:** "Se (1+i)z=2 e depois somamos i ao resultado z, qual complexo obtemos?"
- **Figura:** nenhuma
- **Fala do Paco:** "Antes de escolher, confira as condições e substitua a resposta na relação do problema."
- **Conta de conferência:** z=1−i; z+i=1.

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d5-numeros-complexos-certa` | 1 | **sim** | "Certo: 1; z=1−i; z+i=1." |
| `d5-numeros-complexos-erro` | 1+i | não | "Você esqueceu a parte imaginária negativa de z. O certo é 1; z=1−i; z+i=1." |

### Vestibular

#### V1 — `v1-numeros-complexos`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Reconhecimento visual e caso-base, no tema números complexos no plano.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V2 — `v2-numeros-complexos`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Aplicação direta em contexto, no tema números complexos no plano.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V3 — `v3-numeros-complexos`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Domínio, sinal ou caso de fronteira, no tema números complexos no plano.
- **Enunciado (resumido):** não preenchido; aguarda questão real conferida.
- **Fala do Paco:** "Quais dados a questão relaciona, e quais valores o contexto permite? Separe isso antes da conta."
- **Fonte:** banca, ano e URL ainda não conferidos; não atribuir prova.
- **Adaptação:** após conferência, resumir a até 140 caracteres e exibir “Banca Ano (adaptada)”; documentar qualquer mudança.
- **Conta de conferência:** aguarda enunciado e gabarito oficial.
- **Opções e feedback:** aguardam alternativas originais verificadas; cada erro deve informar a resposta certa e a conta.
- **Bloqueio editorial:** não publicar este espaço como questão até conferir enunciado, alternativas e gabarito na fonte.

#### V4 — `v4-numeros-complexos`
- **Estado:** **PENDENTE-FONTE**
- **Recorte para seleção:** Combinação de duas relações e interpretação, no tema números complexos no plano.
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
