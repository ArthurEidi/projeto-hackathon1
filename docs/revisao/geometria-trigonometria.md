# Revisão de geometria — `content/geometria/trigonometria`

Critério: segunda passada nos feedbacks de distratores (`treino.faceis`, `medias`, `desafios`), conferência de passos interativos (`params` × falas) e texto geral (GUIA §2.4). Todos os capítulos validados com `npx vitest run --configLoader runner src/conteudo/<slug>.test.ts` e `npm run lint:content`.

| slug | erradas conferidas | feedbacks reescritos | passos corrigidos | exemplos |
|---|---:|---:|---:|---|
| equacoes-trigonometricas | 36 | 8 | 0 | `f1` alt. "−1": "No ângulo 0..." → "Você leu o extremo inferior (3π/2), onde o seno é −1..."; `d4` alt. "θ = 2kπ ou θ = π, k ∈ ℤ": "Escreve-se compactamente..." → "Faltou somar + 2kπ ao π, perdendo 3π, 5π etc..."; `d5` alt. "π/6, 5π/6, 7π/6 e 11π/6": "Esses ângulos têm seno ±1/2..." → "Você esqueceu a raiz e usou sen θ = ±1/2 (que dá 2·1/4 ≠ 1)...". |
| formulas-de-adicao-e-arco-duplo | 36 | 9 | 0 | `reconhecer-seno-soma` alt. "sen 200°": "Somamos 20° + 10°..." → "Você multiplicou os ângulos (20 · 10 = 200)..."; `calcular-sen-15` alt. "√3 / 4": "Substituindo os notáveis..." → "Você calculou sen 30°·cos 30° = √3/4..."; `tangente-da-soma` alt. "5/7": "No denominador subtrai-se..." → "Você somou no denominador (1 + 1/6 = 7/6, dando 5/7)...". |
| funcoes-trigonometricas | 36 | 2 | 0 | `periodo-tangente` alt. "4π": "O ramo principal..." → "Você dobrou 2π para 4π, mas o ramo principal vai de −π/2 a π/2, tendo período π."; `quantas-raizes-seno` alt. "4 vezes": "Em π/2 e 3π/2..." → "Você contou os 4 quadrantes, mas sen x só zera em 0, π e 2π." |
| identidades-trigonometricas | 36 | 3 | 0 | `soma-quadrados-37` alt. "37": "Não importa o ângulo..." → "Você copiou o ângulo 37°, mas sen²θ + cos²θ vale sempre 1."; `simplificar-expressao` alt. "1": "1 − cos²θ vale sen²θ..." → "Não dá para cancelar só cos²θ e sobrar 1..."; `fatoracao-3-vezes` alt. "0": "3·(sen²θ + cos²θ) = 3·1..." → "Você usou 1 − 1 = 0 esquecendo o fator 3: 3·1 − 1 = 2." |
| inequacoes-trigonometricas | 36 | 1 | 0 | `f4` alt. "Sim, vale 0": "Quem vale zero é o cosseno, tornando a tangente indefinida." → acrescentado "O certo é Não."; `d1` alt. "[π/3; 2π/3]": sen(π/3)=√3/2≈0,866; `d5` alt. "(0; π)": esqueceu de dividir 2θ por 2. |
| lei-dos-senos-e-cossenos | 36 | 5 | 0 | `senos-diametro` alt. "3": "Multiplique o raio por 2..." → "Você dividiu o raio por 2 (6/2 = 3) em vez de dobrar..."; `sinal-obtuso` alt. "Igual a 7": "Com A > 90°..." → "Você somou 3 + 4 = 7 em vez de usar a² = 3² + 4² − 2bc·cos A..."; `fronteira-diametro` alt. "2": 16/8 = 2 em vez de 16/16 = 1. |
| modelos-periodicos-e-amplitude | 36 | 5 | 0 | `periodo-sen-4x` alt. "4π": "Use T = 2π / B..." → "Você multiplicou π por 4 (4π) em vez de dividir 2π por 4..."; `amplitude-com-sinal-menos` alt. "[8; 12]": "O 2 dentro..." → "Você dividiu a amplitude 4 pelo 2 de cos(2x), achando [8; 12]..."; `diametro-roda-gigante` alt. "Diâmetro 30 m e base a 2 m": 2·15 = 30 (dobro da linha média). |
| radianos-e-ciclo-trigonometrico | 36 | 4 | 0 | `comprimento-arco` alt. "6,6 m": "Multiplique o raio..." → "Você dividiu o raio pelo ângulo (10 / 1,5 ≈ 6,6)..."; `arco-negativo` alt. "230°": 180° + 50° = 230°; `congruo-em-radianos` alt. "3π/4 rad": 9π/4 − 6π/4 = 3π/4. |
| seno-cosseno-tangente-no-ciclo | 36 | 1 | 0 | `expressao-eixos` alt. "−2": "sen 90° = 1..." → "Você inverteu os sinais: sen 90° = 1, cos 180° = −1, −sen 270° = +1 e cos 0° = 1, soma = 2."; `e0`: 1 − 1 − 1 + 1 = 0; `e4`: 1 + 1 + 1 + 1 = 4. |
| trigonometria-no-triangulo-retangulo | 36 | 3 | 1 | Passo `caso-neutro-45` (`hip: 5`, 45°): "3 / 3 continua dando 1" → "CO e CA seguem iguais e CO / CA continua 1" (com hip=5 e k=3, CO=CA≈10,6, não 3); `dois-angulos-predio` alt. "10 m": 20·0,5 = 10 em vez de 20/0,5 = 40; `altura-observador` alt. "6,5 m": 10·0,5 + 1,5 = 6,5. |
| **Total** | **360** | **41** | **1** | **10 capítulos conferidos; todos os testes e `lint:content` passando.** |

## Dúvidas não resolvidas

- Em `radianos-e-ciclo-trigonometrico/aula-01.json`, passo `um-radiano`: `params` usa `"angulo": "$rad"` com `rad` de `0` a `3` (`step: 1`). Pelo contrato de `ciclo_trigonometrico` (GUIA §5.11), `angulo` espera graus e `rad` espera radianos — ou seja, `rad = 1` desenha 1° em vez de 1 radiano (≈ 57,3°). Como a regra do briefing proíbe editar `params`, mantive o JSON e registro aqui para o maestro decidir se corrige para `"rad": "$rad"`.
- Em `lei-dos-senos-e-cossenos/aula-01.json`, questão `combinar-seno-cosseno`, alternativa `c16e4` (`"a = 16 e 2R = 4/√7"`): se o aluno errar `a = 16`, a conta `16 / (√7/4)` daria `64/√7`, não `4/√7` (que vem de `a = 4` multiplicado por `1/(4/√7)`? Ou de `16` dividido por `4√7`). Como o feedback atual diz apenas que 16 é `a²` e mostra `2R = 16/√7`, mantive o rótulo; vale checar se `c16e4` merece outro rótulo em uma passada futura.

## Decisões do maestro (Máquina B, 13/11)

- `radianos-e-ciclo-trigonometrico`, passo `um-radiano`: `"angulo": "$rad"` → `"rad": "$rad"` (GUIA §5.11: `angulo` é em graus; com o valor antigo o slider em 1 desenhava 1° e a métrica `rad` não chegava a 1). Teste 5/5.
- `lei-dos-senos-e-cossenos`, `combinar-seno-cosseno`: alt. "a = 16 e 2R = 4/√7" → feedback descreve o erro que dá o rótulo (não tirou a raiz de a² = 16; para 2R usou só 1 / sen A = 4/√7); alt. "a = 4 e 2R = √7" → "multiplicou a por sen A (4 · √7/4 = √7) em vez de dividir".
- Auditoria do maestro: conferidas uma a uma as 41 reescritas e a fala corrigida. Uma ainda não levava ao rótulo: `seno-cosseno-tangente-no-ciclo` `expressao-eixos` alt. "−2" (o feedback chegava a +2) → "Você trocou o sinal de cada termo (−1 + 1 − 1 − 1 = −2)...". As demais contas batem.

## Correções da conferência visual

### Antigravity #2

- `lei-dos-senos-e-cossenos`:
  - `desafio-cossenos`: adicionada `figure` reativa às 4 alternativas (`a7`, `a49`, `a89` com `angulo: 90`, `a11` com `angulo: 120`). Nota de widget: a legenda `"a = 7"` / `"a² = 49"` na figura base é limitação de `lei_senos_cossenos_figura`.
  - `fechamento`: fórmula encurtada para 5 tokens (`a²=b²+c²`, `−2bc·cosA`, `;`, `a/senA`, `=2R`).
  - Validação: `vitest` 18/18, `lint:content` ok.
- `modelos-periodicos-e-amplitude`:
  - `desafio-roda-gigante`: `figure` da alternativa `m12e10` atualizada para `{ "ponto": { "x": 0, "cor": "c1" }, "highlight": ["c1"] }`.
  - `fechamento`: fórmula encurtada para 7 tokens (`y=`, `D`, `+`, `A`, `sen(Bx+C)`, `;`, `T=2π/B`).
  - Validação: `vitest` 10/10, `lint:content` ok.
- `radianos-e-ciclo-trigonometrico`:
  - `um-radiano`: `complete_when` restringido para `{ "metric": "rad", "gte": 1, "lte": 1 }` (evita concluir em 2 ou 3 rad com a fala de 1 rad).
  - `desafio-conversao`: já tinha `figure` nas 4 alternativas (`angulo` 120, 60, 270, 360). Nota de widget: cabeçalho `"θ = 120° = 2π/3"` sempre visível em `ciclo_trigonometrico_figura`.
  - `fechamento`: `marcos_rad` alterado para `[1, 2, 3, 4, 5, 6]` (evita rótulos arredondados enganosos); fórmula encurtada e sem sublinhado cru (`π rad`, `=`, `180°`, `;`, `θ+2kπ`).
  - Validação: `vitest` 5/5, `lint:content` ok.
- `seno-cosseno-tangente-no-ciclo`:
  - `desafio-reduzir-150`: ocultados `seno` e `cosseno` na `figure` base (`mostrar.seno: false`, `mostrar.cosseno: false`); adicionada `figure` reativa nas 4 alternativas (`150°`, `330°`, `30°`, `210°` com `seno: true, cosseno: true`).
  - `fechamento`: fórmula encurtada para 5 tokens (`x=cosθ`, `;`, `y=senθ`, `;`, `tgθ=y/x`).
  - Validação: `vitest` 6/6, `lint:content` ok.
- `trigonometria-no-triangulo-retangulo`:
  - `desafio-rampa`: adicionado `"painel": false` na `figure` base para ocultar `"sen θ = CO / HIP = 0,5"`; adicionada `figure` reativa nas 4 alternativas (`h5`, `h10`, `h20` com `k: 2`, `h86`). Nota de widget: `"CO 5"` no cateto permanece visível em `geometria_triangulo_figura` mesmo com `painel: false`.
  - `fechamento`: fórmula encurtada para 5 tokens (`sen=CO/HIP`, `;`, `cos=CA/HIP`, `;`, `tg=CO/CA`).
  - Validação: `vitest` 18/18, `lint:content` ok.

### Gemini 4 Hydrogen

- `equacoes-trigonometricas`:
  - `caso-neutro` e `altura-repetida`: adicionados `"lte": 90` e `"lte": 150` em `complete_when` para não concluir em ângulos onde a fala `done` deixa de valer.
  - `conferir-previsao`: ocultados os pontos marcados e o chip de seno na figura base (`marcadas: []`, `angulo: 0`, `mostrar.seno: false`); adicionadas `figure` coerentes às 4 alternativas (`micro-acerto`, `micro-erro`, `micro-erro-2`, `micro-erro-3`).
  - `fechamento`: fórmula encurtada para caber em 400 px (`sen θ`, `=`, `sen α`, `⇒`, `θ = α + 2kπ`), movendo `θ = π − α + 2kπ (k ∈ ℤ)` para `definitions`.
  - Validação: `vitest` 18/18, `lint:content` ok.
- `formulas-de-adicao-e-arco-duplo`:
  - `desafio-arco-duplo`: removida `soma` da figura base (mostrando só `angulo: 36.87` com `seno` e `cosseno`, sem entregar `0,96`); adicionadas `figure` coerentes às 4 alternativas (`s2425`, `s65`, `s1225`, `s725`).
  - `fechamento`: fórmula encurtada para 5 tokens (`sen(α+β)`, `=`, `sen α·cos β`, `+`, `sen β·cos α`).
  - Validação: `vitest` 18/18, `lint:content` ok.
- `funcoes-trigonometricas`:
  - `grafico-tangente`: nota de widget — `ciclo_trigonometrico` só aceita `grafico: "sen" | "cos"`, não existindo modo gráfico para tangente (o passo usa apenas o ciclo e a reta tangente).
  - `desafio-identificar-curva`: ocultado o chip `cos 1` na figura base (`mostrar.cosseno: false`); substituído `override` por `figure` nas 4 alternativas (`cos`, `sen`, `tg`, `msen`).
  - `fechamento`: fórmula encurtada para 5 tokens (`sen(x+2π)`, `=`, `sen x`, `·`, `T = 2π`).
  - Validação: `vitest` 6/6, `lint:content` ok.
- `identidades-trigonometricas`:
  - `sinal-pelo-quadrante`: adicionado `"lte": 2` em `complete_when` para alinhar com a fala do 2º quadrante.
  - `tangente-e-secante`: `mostrar.secante: true` já está ativo nos parâmetros; a ausência do rótulo de secante na tela é limitação do widget.
  - `desafio-achar-cosseno`: ocultados `cosseno` e barra `pitagorica` na figura base; substituído `override` por `figure` coerentes nas 4 alternativas (`c45`, `c25`, `c1625`, `cm45`).
  - `fechamento`: fórmula encurtada para 5 tokens (`sen²θ`, `+`, `cos²θ`, `=`, `1`).
  - Validação: `vitest` 6/6, `lint:content` ok.
- `inequacoes-trigonometricas`:
  - `caso-neutro` e `cruzar-fronteira`: adicionados `"lte": 90` e `"lte": 270` em `complete_when` para não concluir em ângulos onde a fala `done` é falsa.
  - `limite-meio`: mantido `complete_when: { metric: "dentro", gte: 1 }` (exigido pelo teste do capítulo) e generalizada `lines.done` para valer em todo `[30°; 150°]`. Nota de widget: bolinha vazia em 150° mesmo com `abreAte: false`.
  - `conferir-previsao`: removido `arco` da figura base; adicionadas `figure` coerentes às 4 alternativas (`micro-acerto`, `micro-erro`, `micro-erro-2`, `micro-erro-3`).
  - Validação: `vitest` 18/18, `lint:content` ok.
