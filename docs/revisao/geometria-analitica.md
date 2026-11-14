# Revisão de geometria analítica — `content/geometria/geometria-analitica`

Escopo: 7 capítulos do setor (exceto `reta-equacao-e-inclinacao`, a cargo de outro agente).
Critério: segunda passada nos feedbacks de distratores de `treino` (`faceis`, `medias`, `desafios`) com execução das contas, conferência dos passos interativos (`params` × `complete_when` × falas) e revisão de texto geral.

| slug | erradas conferidas | feedbacks reescritos | passos corrigidos | exemplos |
|---|---|---|---|---|
| `circunferencia-equacao-e-posicoes` | 33 | 7 | 1 | Passo `mover-centro` (`a >= 3`, `max: 4`): `"(3; 0): (x − 3)²..."` → `"(a; 0), como em (x − 3)²..."` (vale para `a = 3` e `a = 4`). `d3` (`raio-por-ponto`) alt. `"x² + y² = 48"`: `"r² = 6² + 8² = 100."` → `"Você multiplicou 6 · 8 = 48 em vez de somar os quadrados: r² = 6² + 8² = 100."`; `f1` (`raio-16`) alt. `"2"`: `"2 seria com r² = 4..."` → `"Você tirou a raiz duas vezes (√16 = 4 e √4 = 2). O raio é 4."`. |
| `elipse` | 36 | 0 | 0 | Contas verificadas: `m1` (`c-de-25-16`) alt. `"1"` (`5 − 4 = 1`); `m3` (`b-por-pitagoras`) alt. `"√136"` (`10² + 6² = 136`); `d5` (`orbita`) alt. `"8"` (`5 + 3 = 8`, afélio). |
| `hiperbole` | 36 | 3 | 0 | `d4` (`qual-e-hiperbole`): alts. `"x² + y² = 1"`, `"x² = 4y"` e `"x²/4 + y² = 1"` não informavam a resposta certa no feedback; reescritos incluindo `"Hipérbole: x² − y² = 1."`. Contas verificadas: `m1` (`c-3-4`) alt. `"√7"` (`√(16 − 9)`); `d2` (`vertical`) alt. `"(0; ±√7)"` (`√(16 − 9)`). |
| `parabola-conica` | 36 | 3 | 0 | `f3` (`ponto-na-curva`) alt. `"2"`: `"x² = 4, então y = 4/4 = 1."` → `"Você repetiu x = 2 (ou dividiu 4 por 2). Como 2² = 4y, y = 4/4 = 1."`; `d4` (`distancia-10`) alt. `"25"`: `"Basta usar a definição..."` → `"25 viria de x = 10 em x² = 4y. Pela definição, y + 1 = 10, logo y = 9."` (e alt. `"11"`: `10 + 1 = 11`). |
| `plano-cartesiano-distancia-e-ponto-medio` | 36 | 5 | 1 | Passo `sinais-somem` (`dx <= -3`): `"(−4)² = 16"` → `"(−3)² = 9"` como exemplo (vale para todo `dx <= -3`). `m2` (`um-dois-quatro-seis`): `"√74"` → `"√89"` (`(1+4)² + (2+6)² = 5² + 8² = 89`, já que `√74` não vinha das coordenadas `(1;2)` e `(4;6)`); `d1` (`achar-b-pelo-medio`): `"(4; 3)"` → `"(2; 3)"` (`M − A = (2; 3)`). |
| `posicoes-relativas-de-retas` | 36 | 0 | 1 | Passo `angulo-reto` (`m2 <= -1`, `min: -3`): `"Com m₂ = −1..."` → `"Quando m₂ = −1, temos m₁ · m₂ = 1 · (−1) = −1 e o ângulo fica reto..."` (vale para `m2 = -1, -2, -3`). Contas verificadas: `f1` alt. `"Perpendiculares"` (`3 · 3 = 9 ≠ −1`); `m2` alt. `"−2"` (`2 · (−2) = −4`); `d3` alt. `"y = −2x + 3"` (`2 · (−2) = −4`). |
| `vetores-no-plano` | 36 | 0 | 2 | Passo `somar-encaixando` (`v_comprimento >= 2`): `"Com v = (1; 2)..."` → `"Por exemplo, com v = (1; 2)..."`; passo `esticar` (`k >= 2`, `max: 3`): `"2u = (6; 2)..."` → `"k·u mantém a direção e multiplica o comprimento (ex.: 2u = (6; 2))."`. Contas verificadas: `d1` (`desafio-soma`) alt. `"(2; −4)"` (`v − u = (4−2; −1−3)`); `d3` (`modulo-da-soma`) alt. `"√5 + √8"` (`|(1;2)| + |(2;2)|`). |
| **Total** | **249** | **18** | **5** | **7 capítulos**; todos os testes de capítulo e `npm run lint:content` passando após a última edição. |

## Dúvidas não resolvidas

Nenhuma.

## Correções da conferência visual

Conferência em `docs/visual/geometria.md` (apenas itens de tipo `conteúdo`):

- `plano-cartesiano-distancia-e-ponto-medio` · passo 4 `ponto-medio`: `fixos: ["a"]` → `fixos: ["a", "b"]` para impedir que B seja movido antes de ligar M e manter válida a fala `"M = (3; 3,5)"`.
- `reta-equacao-e-inclinacao` · passos 3 `corte-no-eixo-y` e 6 `fechamento`: `triangulo.x` alterado de `0` para `1`, evitando que o chip `"1"` do degrau fique colado ao chip `"1"` do intercepto no eixo y.
- `reta-equacao-e-inclinacao` · passo 5 `desafio-equacao`, alt. `"y = 4x − 1"`: adicionado `"ponto": { "curva": 0, "x": 1, "coordenadas": false }` em `figure` para não esconder o chip `"+2"` do triângulo atrás do rótulo `"(1; 3)"`.
- `reta-equacao-e-inclinacao` · passo 5 `desafio-equacao`, alt. `"y = x + 2"`: janela `y` ampliada de `[-2, 8]` para `[-2, 9]` para dar folga no topo entre `"(3; 7)"` e `"y = 2x + 1"`.
- `reta-equacao-e-inclinacao` · passo 6 `fechamento`: fórmula encurtada de 12 peças (`y = m x + n ; m = Δy / Δx`) para 6 peças (`y = m x + n`, mantendo `n` ligado a `c4`), cabendo em 400 px (a razão `m = Δy/Δx` já consta na definição de Coeficiente angular).
- `posicoes-relativas-de-retas` · passo 3 `achar-encontro`: removidos `marcar.encontro`, `marcar.quadrantes` e `cores.encontro` para não revelar `(2; 3)` antes de o aluno arrastar o ponto nem tingir os quadrantes.
- `posicoes-relativas-de-retas` · passo 4 `angulo-reto`: `complete_when` ajustado para `{ "metric": "m2", "gte": -1, "lte": -1 }`, exigindo `m₂ = −1` exato.
- `posicoes-relativas-de-retas` · passo 5 `desafio-posicao`: adicionadas `figure` às 4 opções (`highlight: ["c1", "c2"]` na certa; `marcar.encontro` em Concorrentes; `highlight: ["c2"]` em Coincidentes; `marcar.angulo` em Perpendiculares).
- `circunferencia-equacao-e-posicoes` · passos 1 a 4: `ponto` inicial movido de `[1, 1]` para `[2, -3]`, evitando sobreposição dos pegadores/rótulos de `C` e `P`.
- `circunferencia-equacao-e-posicoes` · passo 5 `desafio-ler-equacao`: adicionadas `figure` às 3 opções erradas (`rotulos: true` + `highlight: ["c1"]` ou `["c2"]`).
- `circunferencia-equacao-e-posicoes` · passo 6 `fechamento`: fórmula quebrada em 5 tokens curtos `(x − a)² + (y − b)² = r²` (com `c1` e `c2`) para não quebrar dentro dos botões em 400 px.
- `vetores-no-plano` · passo 5 `desafio-soma`: na opção certa (`(6; 2)`), `v` agora usa `preso_em: "u"` para mostrar o encaixe na ponta de `u`; adicionadas `figure` às 3 opções erradas (incluindo `d = (2; −4)` em `(2; −4)` = `v − u`).
- `parabola-conica` · passos 1 `vertice` e 2 `tracar`: adicionado `curva_oculta: true` para preservar a descoberta da curva.
- `parabola-conica` · passo 5 `desafio-foco`: adicionadas `figure` às 4 opções (`focos: true` na certa em `(0; 2)`, e `focos: true` + `ponto` correspondente nas 3 erradas).
- `parabola-conica` · passo 6 `fechamento`: fórmula encurtada para 5 tokens `x² = 4 p y` (`p` em `c1`) para caber em uma linha em 400 px.
- `elipse` · passos 1 `focos-juntos`, 4 `achatar`, 5 `desafio-focos` e 6 `fechamento`: adicionado `prender_na_curva: true` para `P` permanecer sobre a curva (`PF₁ + PF₂ = 2a`).
- `elipse` · passo 5 `desafio-focos`: adicionadas `figure` às 4 opções (`focos: true` + `highlight` / `ponto` em `(5; 0)` e `(0; 3)`).
- `elipse` · passo 6 `fechamento`: fórmula encurtada para 5 tokens `x²/a² + y²/b² = 1` (`c1`, `c2`), mantendo `a² = b² + c²` na definição.
- `hiperbole` · passos 1, 3, 4, 5 e 6: adicionado `prender_na_curva: true` para `P` permanecer sobre os ramos da curva.
- `hiperbole` · passo 3 `triangulo-invertido`: `mostrar.retangulo` alterado de `true` para `false`, mantendo a descoberta ao clicar no botão.
- `hiperbole` · passo 5 `desafio-focos`: adicionadas `figure` às 4 opções (`focos: true` + `highlight` / `mostrar.retangulo` / `ponto`).
- `hiperbole` · passo 6 `fechamento`: fórmula encurtada para 5 tokens `x²/a² − y²/b² = 1` (`c1`, `c2`), mantendo `c² = a² + b²` na definição.

### Segunda passada B2 (14/11)

- `reta-equacao-e-inclinacao` · passos 3 `corte-no-eixo-y` e 6 `fechamento`: janela definida como `x: [-5, 5], y: [-5, 7]` para separar o rótulo `"y = 2x + 1"` do degrau e do chip `"+2"`.
- `posicoes-relativas-de-retas` · passo 5 `desafio-posicao`: `figure` das erradas refeitas com `curvas` explícitas (mantendo `y = 2x − 3` como `fantasma: true`): Concorrentes desenha `y = −x + 4` com `marcar.encontro` em `(1; 3)`; Coincidentes desenha `mesma reta` (`y = 2x + 1`) com `marcar.angulo` (tracejado coincidente); Perpendiculares desenha `y = −0,5x + 3,5` com `marcar.angulo` (`90°`).
- `circunferencia-equacao-e-posicoes` · passo 5 `desafio-ler-equacao`: `figure` das erradas ajustadas com `centro` e `raio` correspondentes (`[-2, 1]`, `raio: 9` com `ponto: [2, 8]`, e `[2, 1]`).
- `circunferencia-equacao-e-posicoes` · passo 6 `fechamento`: tokens `"(x−a)²"` e `"(y−b)²"` sem espaços internos para não quebrar dentro do botão em 400 px.
- `vetores-no-plano` · passo 5 `desafio-soma`: adicionados vetores `p = (8; −3)` e `e = (6; 4)` nas respectivas alternativas erradas.
- `parabola-conica` · passo 5 `desafio-foco`: na certa (`f02`), `ponto` movido para `[4, 2]` sobre a curva (`PF = Pd = 4`); em `(0; 8)` (`f08`), adicionado `zoom: 1.7` para manter `(0; 8)` dentro da janela.


## Auditoria do maestro (Claude, Máquina B, 13/11)

Conferidas uma a uma todas as alterações deste setor (18 feedbacks, 2 rótulos trocados, 5 falas). Todas as contas batem com os rótulos (ex.: "√89" = √(5² + 8²) somando coordenadas; "(2; 3)" = M − A). Nenhuma correção.
