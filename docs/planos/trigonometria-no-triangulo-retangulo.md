# Plano — Trigonometria no triângulo retângulo

**Aula:** 1 — Razões que Não Mudam · Seno, cosseno, tangente e ângulos notáveis
**Caminho:** geometria / trigonometria / trigonometria-no-triangulo-retangulo
**Pré-requisitos que o aluno já domina:** teorema-de-pitagoras, semelhanca-e-teorema-de-tales

## a) Ancoragem mecânica
A máquina recebe um ângulo agudo θ e um fator de escala k, e devolve um triângulo retângulo com cateto oposto, cateto adjacente e hipotenusa. O ângulo θ é a entrada que determina as razões entre os lados; a escala k altera o tamanho dos lados na mesma proporção, deixando seno, cosseno e tangente invariantes.

## b) Visual de partida
WIDGET NOVO `geometria_plana`: um triângulo retângulo vivo sobre malha quadriculada, com ângulo agudo θ ajustável de 15° a 75° e escala k de 1 a 3. Mostra cateto oposto (c1), cateto adjacente (c2), hipotenusa (c3) e um painel lateral com as razões sen θ, cos θ e tg θ calculadas em tempo real.

## c) Caso neutro
Com θ = 45° e k = 1, o triângulo retângulo é isósceles: o cateto oposto e o cateto adjacente têm medidas iguais, tornando a razão tg 45° = 1. Ele fica desenhado como fantasma para contrastar quando θ diminui para 30° ou sobe para 60°.

## d) Panorama e recorte
A trigonometria se estende a triângulos quaisquer, ao ciclo trigonométrico e às funções periódicas. Aqui focamos nas três razões do triângulo retângulo e nos ângulos notáveis de 30°, 45° e 60°.

## e) Progressão por contraste
1. θ = 45° (referência): cateto oposto igual ao adjacente, tg 45° = 1 e sen 45° = cos 45°.
2. Escala k variando com θ fixo: os três lados dobram ou triplicam, mas as divisões CO/HIP, CA/HIP e CO/CA não mudam.
3. θ mudando de 30° para 60°: o cateto oposto cresce enquanto o adjacente encolhe; o seno de 30° vira o cosseno de 60°.
4. Fronteira de ângulos complementares: em qualquer triângulo retângulo, sen θ = cos(90° − θ) porque o oposto de um ângulo é o adjacente do outro.

## f) Dedução causal da forma
Por semelhança de triângulos, fixado o ângulo agudo θ, multiplicar um lado por k multiplica os outros dois pelo mesmo k. Na divisão entre dois lados, o fator k cancela, por isso sen θ = CO / HIP, cos θ = CA / HIP e tg θ = CO / CA dependem apenas de θ.

## g) Simulação espacial e fronteiras
O aluno arrasta k para testar que o tamanho do triângulo não afeta as razões. Ao aproximar θ de 0° ou 90°, vê que no triângulo retângulo 0 < sen θ < 1 e 0 < cos θ < 1, pois a hipotenusa é sempre maior que qualquer cateto.

## h) Roteiro da aula

**Glossário da aula:**
| Marca | Nome | Resumo |
|---|---|---|
| c1 | Cateto oposto | Lado que fica de frente para o ângulo θ escolhido (CO). |
| c2 | Cateto adjacente | Lado que forma o ângulo θ junto com a hipotenusa (CA). |
| c3 | Hipotenusa | Maior lado do triângulo, oposto ao ângulo reto de 90° (HIP). |
| c4 | Ângulo agudo θ | Abertura que define o valor do seno, do cosseno e da tangente. |

### Passo 1 — `caso-neutro-45`
- **Tipo:** `interactive_canvas`
- **Pilares:** 2, 3 (caso neutro), 4 (panorama)
- **Widget:** WIDGET NOVO `geometria_plana` — triângulo retângulo com θ = 45° (c4), CO = 1 (c1), CA = 1 (c2), HIP = √2 ≈ 1,41 (c3); slider de escala `k`. Emite `k`.
- **Sliders:** `k` · "Escala do triângulo" · 1..3 · passo 1 · inicial 1 · ink
- **Paco (abertura):** "Em 45°, os dois catetos são iguais e CO / CA = 1. Aumente a escala k: o que acontece com a divisão CO / CA?"
- **Interação do aluno:** move o slider `k` até 3; os catetos passam para 3 e 3, mas o painel mostra CO / CA = 1 fixo.
- **Conclusão:** `k ≥ 3`
- **Paco (conclusão):** "Os lados triplicaram, mas 3 / 3 continua dando 1. Triângulos semelhantes mantêm a mesma razão entre os lados."
- **Tati (dúvida):** `fim` — P: "Essas razões só existem em triângulos retângulos?" / R: "Começamos neles, mas depois levamos seno, cosseno e tangente para qualquer triângulo e para o ciclo."

### Passo 2 — `seno-e-cosseno`
- **Tipo:** `interactive_canvas`
- **Pilares:** 1, 5
- **Widget:** `geometria_plana` — fantasma em 45°; triângulo ativo com slider `theta` em passos de 15°; exibe sen θ = CO / HIP e cos θ = CA / HIP. Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 15..75 · passo 15 · inicial 45 · c4
- **Paco (abertura):** "Seno divide o oposto pela hipotenusa; cosseno divide o adjacente. Leve θ para 30°: qual cateto fica igual à metade da hipotenusa?"
- **Interação do aluno:** reduz `theta` para 30° e observa CO = 0,5 · HIP, com sen 30° = 0,5 = 1/2.
- **Conclusão:** `theta ≤ 30`
- **Paco (conclusão):** "Em 30°, o cateto oposto é metade da hipotenusa: sen 30° = 1/2. Enquanto θ diminui, o oposto encolhe e o adjacente cresce."

### Passo 3 — `complementares-60`
- **Tipo:** `interactive_canvas`
- **Pilares:** 5, 6, 7 (fronteira)
- **Widget:** `geometria_plana` — triângulo com destaque nos dois ângulos agudos θ e 90° − θ; tabela dos notáveis 30°, 45°, 60°. Emite `theta`.
- **Sliders:** `theta` · "Ângulo θ (graus)" · 30..60 · passo 15 · inicial 30 · c4
- **Paco (abertura):** "Se um ângulo agudo é 30°, o outro lá em cima é 60°. Suba θ para 60°: o que acontece com o seno e o cosseno?"
- **Interação do aluno:** move `theta` para 60° e vê sen 60° = √3/2 e cos 60° = 1/2, trocando os valores de 30°.
- **Conclusão:** `theta ≥ 60`
- **Paco (conclusão):** "Eles trocam de valor: cos 60° = sen 30° = 1/2. O cateto oposto a 30° é o adjacente a 60°."
- **Tati (dúvida):** `fim` — P: "O seno no triângulo retângulo pode passar de 1?" / R: "Nunca: o cateto é sempre menor que a hipotenusa, então CO / HIP fica sempre entre 0 e 1."

### Passo 4 — `desafio-rampa`
- **Tipo:** `micro_challenge`
- **Pilares:** 6
- **Figura:** WIDGET NOVO `geometria_plana_figura` — triângulo retângulo com ângulo θ = 30° (c4), hipotenusa 10 m (c3) e altura h como cateto oposto (c1).
- **Paco (abertura):** "Olhe para o ângulo de 30° e veja quem é h e quem é 10 m."
- **Enunciado:** "Uma rampa de 10 m faz 30° com o chão (sen 30° = 0,5). Qual é a altura h no topo da rampa?"

| id | Rótulo | Certa? | Feedback | A figura muda para… |
|---|---|---|---|---|
| `h5` | 5 m | **sim** | "Isso. sen 30° = h / 10 = 0,5, então h = 5 m." | destaca CO = 5 m em c1 e HIP = 10 m em c3 |
| `h10` | 10 m | não | "10 m é a hipotenusa. Como sen 30° = 0,5, a altura é 10 · 0,5 = 5 m." | pisca a hipotenusa 10 m em c3 |
| `h20` | 20 m | não | "Você dividiu por 0,5; o cateto é menor que a hipotenusa: 10 · 0,5 = 5 m." | mostra a conta h = 10 · sen 30° = 5 m |
| `h86` | 8,66 m | não | "8,66 m usa cos 30° (base no chão). A altura é o oposto: 10 · 0,5 = 5 m." | destaca o cateto adjacente no chão em c2 |

### Passo 5 — `fechamento`
- **Tipo:** `concept_lock`
- **Pilares:** 6
- **Figura:** `geometria_plana_figura` — triângulo retângulo completo com θ (c4), CO (c1), CA (c2) e HIP (c3).
- **Fórmula:** `sen` · `θ`→c4 · `=` · `CO`→c1 · `/` · `HIP`→c3 · `;` · `cos` · `θ`→c4 · `=` · `CA`→c2 · `/` · `HIP`→c3 · `;` · `tg` · `θ`→c4 · `=` · `CO`→c1 · `/` · `CA`→c2
- **Definições:** "Seno: razão entre cateto oposto e hipotenusa." · "Cosseno: razão entre cateto adjacente e hipotenusa." · "Tangente: razão entre cateto oposto e cateto adjacente."
- **Paco (abertura):** "Mudar a escala multiplica todos os lados pelo mesmo fator, por isso as razões dependem só do ângulo θ."
- **Dica (hint):** "Toque em uma letra para ver o lado ou o ângulo correspondente no triângulo."

**Frase de encerramento (outro):** "Você variou o ângulo e a escala do triângulo retângulo e descobriu que seno, cosseno e tangente dependem apenas do ângulo."

## i) Treino pós-aula

### Fáceis

#### F1 — `seno-3-4-5`
- **Enunciado:** "Num triângulo retângulo de lados 3, 4 e 5, o cateto oposto a θ mede 3. Quanto vale sen θ?"
- **Conta de conferência:** CO / HIP = 3 / 5 = 0,6

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `s35` | 3/5 | **sim** | "Certo. Oposto 3 sobre a hipotenusa 5." |
| `s45` | 4/5 | não | "4/5 é o cosseno (adjacente sobre hipotenusa). O seno é 3/5." |
| `s34` | 3/4 | não | "3/4 é a tangente (oposto sobre adjacente). O seno usa a hipotenusa: 3/5." |
| `s53` | 5/3 | não | "A hipotenusa 5 fica no denominador. O seno é 3/5." |

#### F2 — `tangente-45`
- **Enunciado:** "Quanto vale tg 45° num triângulo retângulo isósceles?"
- **Conta de conferência:** CO = CA ⇒ CO / CA = 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t1` | 1 | **sim** | "Isso. Em 45° os dois catetos são iguais, então CO / CA = 1." |
| `t05` | 1/2 | não | "1/2 é sen 30°. Em 45° os catetos são iguais, então tg 45° = 1." |
| `t0` | 0 | não | "Os dois catetos têm a mesma medida: a divisão deles dá 1." |
| `t2` | 2 | não | "Dividir um cateto por outro de mesma medida dá 1, não 2." |

#### F3 — `cosseno-definicao`
- **Enunciado:** "No triângulo retângulo, qual razão define cos θ?"
- **Conta de conferência:** cos θ = CA / HIP

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `cah` | CA / HIP | **sim** | "Exato. Cateto adjacente dividido pela hipotenusa." |
| `coh` | CO / HIP | não | "CO / HIP é o seno. O cosseno é CA / HIP." |
| `coca` | CO / CA | não | "CO / CA é a tangente. O cosseno é CA / HIP." |
| `hca` | HIP / CA | não | "A hipotenusa divide o cateto adjacente: cos θ = CA / HIP." |

#### F4 — `escala-dobrada`
- **Enunciado:** "Se dobrarmos todos os lados de um triângulo retângulo, o valor de sen θ:"
- **Conta de conferência:** (2·CO) / (2·HIP) = CO / HIP

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `igual` | Não muda | **sim** | "Certo. O fator 2 cancela na divisão CO / HIP." |
| `dobra` | Dobra | não | "Os dois lados dobram juntos, então a razão CO / HIP não muda." |
| `metade` | Cai pela metade | não | "Numerador e denominador dobram juntos; sen θ não muda." |
| `quad` | Quadruplica | não | "O seno depende só do ângulo; dobrar os lados não muda sen θ." |

### Médias

#### M1 — `escada-60`
- **Enunciado:** "Uma escada de 8 m apoia-se na parede fazendo 60° com o chão (cos 60° = 0,5). Qual a distância do pé da escada à parede?"
- **Conta de conferência:** CA = 8 · cos 60° = 8 · 0,5 = 4 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `d4` | 4 m | **sim** | "Isso. A distância no chão é o cateto adjacente: 8 · 0,5 = 4 m." |
| `d8` | 8 m | não | "8 m é a escada (hipotenusa). No chão: 8 · 0,5 = 4 m." |
| `d16` | 16 m | não | "Multiplique pela razão, não divida: 8 · 0,5 = 4 m." |
| `d6` | 6 m | não | "Use cos 60° = CA / 8 = 0,5, que dá CA = 4 m." |

#### M2 — `sombra-torre`
- **Enunciado:** "Uma árvore projeta sombra de 12 m quando os raios de sol formam 45° com o solo (tg 45° = 1). Qual a altura da árvore?"
- **Conta de conferência:** tg 45° = h / 12 = 1 ⇒ h = 12 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `a12` | 12 m | **sim** | "Certo. Como tg 45° = 1, a altura é igual à sombra: 12 m." |
| `a6` | 6 m | não | "Em 45°, cateto oposto e adjacente são iguais: h = 12 m." |
| `a24` | 24 m | não | "h / 12 = tg 45° = 1, logo h = 12 m." |
| `a17` | 17 m | não | "17 m seria a hipotenusa aproximada. A altura é o cateto oposto: 12 m." |

#### M3 — `complementar-seno`
- **Enunciado:** "Num triângulo retângulo, α e β são os dois ângulos agudos. Se sen α = 0,8, quanto vale cos β?"
- **Conta de conferência:** α + β = 90° ⇒ cos β = sen α = 0,8

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `c08` | 0,8 | **sim** | "Exato. O cateto oposto a α é o adjacente a β, então cos β = 0,8." |
| `c02` | 0,2 | não | "Cosseno complementar não é 1 − sen α. O oposto de α é adjacente de β: 0,8." |
| `c06` | 0,6 | não | "0,6 é cos α. Para o outro ângulo β, cos β = sen α = 0,8." |
| `c10` | 1,0 | não | "O cateto oposto a α é o adjacente a β, logo cos β = sen α = 0,8." |

### Desafios

#### D1 — `achar-hipotenusa`
- **Enunciado:** "Num triângulo retângulo, o cateto oposto a 30° mede 7 cm (sen 30° = 0,5). Quanto mede a hipotenusa?"
- **Conta de conferência:** 0,5 = 7 / HIP ⇒ HIP = 14 cm

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `h14` | 14 cm | **sim** | "Isso. Se o cateto oposto é metade da hipotenusa, ela mede 2 · 7 = 14 cm." |
| `h35` | 3,5 cm | não | "A hipotenusa é maior que o cateto: 7 / 0,5 = 14 cm." |
| `h7` | 7 cm | não | "7 cm é o cateto. A hipotenusa é o dobro em 30°: 14 cm." |
| `h105` | 10,5 cm | não | "Como sen 30° = 7 / HIP = 0,5, a hipotenusa mede 14 cm." |

#### D2 — `pitagoras-e-tangente`
- **Enunciado:** "Num triângulo retângulo, a hipotenusa mede 13 e o cateto oposto a θ mede 5. Quanto vale tg θ?"
- **Conta de conferência:** CA = √(13² − 5²) = 12 ⇒ tg θ = 5/12

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `t512` | 5/12 | **sim** | "Certo. Por Pitágoras o adjacente é 12, então tg θ = 5/12." |
| `t513` | 5/13 | não | "5/13 é o seno. O cateto adjacente é 12 (Pitágoras), então tg θ = 5/12." |
| `t1213` | 12/13 | não | "12/13 é o cosseno. A tangente é CO / CA = 5/12." |
| `t125` | 12/5 | não | "Você inverteu CA / CO. A tangente é CO / CA = 5/12." |

#### D3 — `fronteira-seno-maior-1`
- **Enunciado:** "Um aluno calculou sen θ = 1,2 num triângulo retângulo. Por que esse valor é impossível?"
- **Conta de conferência:** CO < HIP ⇒ sen θ = CO / HIP < 1

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `catmen` | O cateto é sempre menor que a hipotenusa | **sim** | "Exato. Como CO < HIP, a divisão CO / HIP nunca passa de 1." |
| `angobt` | O ângulo seria obtuso | não | "Mesmo no ciclo o seno não passa de 1; no triângulo, CO é menor que HIP." |
| `tgmen` | Nenhuma razão passa de 1 | não | "A tangente pode passar de 1; o seno não passa porque CO < HIP." |
| `catmai` | O cateto adjacente é maior | não | "O motivo é que a hipotenusa é o maior lado, então CO / HIP < 1." |

#### D4 — `altura-observador`
- **Enunciado:** "Um observador de 1,5 m de altura vê o topo de um poste sob 30° a 10 m de distância (tg 30° ≈ 0,58). Qual a altura do poste?"
- **Conta de conferência:** h = 1,5 + 10 · 0,58 = 1,5 + 5,8 = 7,3 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `p73` | 7,3 m | **sim** | "Isso. Subida de 10 · 0,58 = 5,8 m mais 1,5 m do observador: 7,3 m." |
| `p58` | 5,8 m | não | "5,8 m é só a parte acima dos olhos. Somando 1,5 m: 7,3 m." |
| `p65` | 6,5 m | não | "Use tg 30° ≈ 0,58: 10 · 0,58 + 1,5 = 7,3 m." |
| `p115` | 11,5 m | não | "Não some 10 + 1,5. Faça 10 · 0,58 + 1,5 = 7,3 m." |

#### D5 — `dois-angulos-predio`
- **Enunciado:** "Do topo de um prédio de 20 m, vê-se um barco sob 45° e outro na mesma linha sob 30° (tg 30° ≈ 0,5). Qual a distância entre os barcos?"
- **Fala do Paco:** "Ache a distância horizontal de cada barco até o prédio e subtraia."
- **Conta de conferência:** d1 = 20 / tg 45° = 20 m; d2 = 20 / 0,5 = 40 m; d2 − d1 = 20 m

| id | Rótulo | Certa? | Feedback |
|---|---|---|---|
| `b20` | 20 m | **sim** | "Exato. Os barcos estão a 20 m e 40 m do prédio; a distância entre eles é 20 m." |
| `b40` | 40 m | não | "40 m é a distância do segundo barco ao prédio. Entre os barcos: 40 − 20 = 20 m." |
| `b60` | 60 m | não | "Eles estão do mesmo lado: subtraia 40 − 20 = 20 m." |
| `b10` | 10 m | não | "Com tg 30° ≈ 0,5, d2 = 20 / 0,5 = 40 m; logo 40 − 20 = 20 m." |

### Vestibular

#### V1 — `enem-2020-pergolado`
- **Enunciado (resumido):** Vigas de pergolado têm vãos de 30 cm. Com sol a 30° da vertical, a sombra cobre metade do vão (15 cm). Qual a altura das vigas?
- **Fala do Paco:** "No triângulo retângulo da sombra, 15 cm é o cateto oposto a 30° e a altura h é o adjacente."
- **Fonte:** ENEM 2020, Questão 173 — `https://api.enem.dev/v1/exams/2020/questions/173`
- **Adaptação:** enunciado resumido; alternativas e gabarito (`26`) mantidos.
- **Conta de conferência:** `tg(30°) = 15/h ⇒ h = 15/(√3/3) = 15√3 ≈ 26 cm`.
- **Opções e feedback:** `9`, `15`, `26` (correta), `52`, `60`.

#### V2 — PENDENTE-FONTE
- **Habilidade-alvo:** aplicar tangente em problema com altura do observador ou sombra.
- **Onde procurar:** ENEM, Vunesp, Fuvest.

#### V3 — PENDENTE-FONTE
- **Habilidade-alvo:** relacionar dois triângulos retângulos que compartilham um cateto (visadas em dois ângulos).
- **Onde procurar:** Unicamp, Fuvest, ENEM.

#### V4 — PENDENTE-FONTE
- **Habilidade-alvo:** combinar Teorema de Pitágoras e razões trigonométricas num mesmo problema geométrico.
- **Onde procurar:** ENEM, UFRGS, UFPR.
