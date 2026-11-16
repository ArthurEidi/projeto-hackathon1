# Pendências de widget e figura — conferência B19 (16/11/2026)

Levantamento dos defeitos de widget e figura anotados em 13–14/11 (`docs/PROXIMOS-PASSOS.md` itens 2 e 3, `docs/EM-ANDAMENTO.md` "Pedidos entre máquinas", `docs/visual/geometria.md` e `docs/visual/geometria-reconferencia-b8.md`).

Método: capturas em `400 × 860` (`node scripts/captura-aula.mjs 5219 C:/Users/mkf10/projetos/capturas-b19 ...`) do estado inicial de cada passo listado e inspeção dos contratos em `src/widgets/common/*/params.ts` e `src/steps/{StepLayout,InteractiveCanvas}.tsx`. Nenhuma aula ou código foi alterado.

---

## Tabela de verificação

| defeito | slug e passo | ainda aberto? | o que se vê (concreto) | arquivo provável |
|---|---|---|---|---|
| `formulas-de-adicao-e-arco-duplo`: chips no ciclo e no topo das barras se cobrem | `formulas-de-adicao-e-arco-duplo` p1, p3 (p2 ok) | **sim** | Em p1 e p3, o chip azul `sen 0,5` cobre quase todo o chip `α` dentro do ciclo; em p3, os rótulos `0,5`, `0,52` e `0,5` no topo das três barras se sobrepõem horizontalmente (`0,52` corta o `5` à esquerda). Em p2 (`sen 1`, `α`, `β` e barra `1,37`), já está separado e dentro do quadro. | `src/widgets/common/ciclo/desenho.ts` |
| `inequacoes-trigonometricas`: extremo fechado desenhado com bolinha vazia | `inequacoes-trigonometricas` p3 (`limite-meio`) | **sim** | Para `sen θ ≥ 0,5`, os dois extremos (`30°` e `150°` sobre `y = 0,5`) aparecem com bolinha branca vazia, como se o intervalo fosse aberto. | `src/widgets/common/ciclo/desenho.ts` |
| `geometria_triangulo` modo `razoes`: triângulo minúsculo no canto com `k` mínimo | `trigonometria-no-triangulo-retangulo` p1 (p4, p5 ok) | **sim** | Em `k = 1`, o triângulo ocupa apenas o canto inferior esquerdo de uma grade 6×6 quase vazia. Os chips (`HIP 5`, `45°`, `CA 3,5`, `CO 3,5`) já não se sobrepõem nem cortam. | `src/widgets/common/triangulo/desenho.ts` |
| `funcoes-trigonometricas`: passo "gráfico da tangente" sem curva da tangente | `funcoes-trigonometricas` p3 (`grafico-tangente`) | **sim** | Mostra apenas o ciclo trigonométrico com a reta tangente e o chip `tg 0`; nenhum gráfico de `tg x` aparece ao lado. | `src/widgets/common/ciclo/desenho.ts` |
| `poligonos-e-quadrilateros`: chip `3 triângulos` sobra no passo de ângulos externos | `poligonos-e-quadrilateros` p2 (`giro-externo-360`) | **sim** | O chip azul `3 triângulos` (do passo 1) continua fixo no canto superior esquerdo, junto com o chip `externos` à direita. | `src/widgets/common/poligono/desenho.ts` |
| `piramides`: chip `V = 48` permanece no passo de área lateral | `piramides` p2 (`abrir-paredes`) | **sim** | O chip roxo `V = 48` segue visível no canto superior esquerdo durante o passo sobre planificação das faces laterais (há `placar: false` no widget, não ligado neste passo). | `content/geometria/geometria-espacial/piramides/aula-01.json` ou `src/widgets/common/solido/` |
| `areas-e-volumes-por-composicao`: passo fala em áreas mas figura só mostra volumes | `areas-e-volumes-por-composicao` p3 (`cavar-diminui-volume-aumenta-area`) | **sim** | No topo aparecem apenas `cilindro 36π` e `cone 12π` (volumes); as áreas `9π` e `15π` citadas na fala não têm chips nem destaque. | `src/widgets/common/solido/desenho.ts` |
| `esferas`: passo fala em 4 círculos máximos mas figura só mostra esfera no cilindro | `esferas` p2 (`quatro-circulos-maximos`) | **sim** | Mostra a esfera dentro do cilindro e o chip `4πR² = 36π`, sem ilustrar os 4 círculos máximos citados na fala. | `src/widgets/common/solido/desenho.ts` |
| `vetores-no-plano`: chips `x`/`y` ficam presos em `u` e `Módulo` encosta em `Soma` | `vetores-no-plano` p2, p6 | **sim** | Em p2, os rótulos `u` e `v` já estão separados, mas `x = 3` e `y = 1` seguem mostrando as coordenadas de `u` (não acompanham `v`). Em p6, `Módulo = 3,61` encosta no texto `Soma = (6; 2)` logo abaixo. | `src/widgets/common/vetores/` |
| `circunferencia-equacao-e-posicoes` p4: ponto `P` e chip de distância competem com a reta | `circunferencia-equacao-e-posicoes` p4 (`reta-sobe`) | **sim** | `Secante: 2 pontos` já está no plural correto, mas o ponto `P` e o chip `d = 3,61; r = 3: fora` continuam na tela sem papel no passo. | `content/geometria/geometria-analitica/circunferencia-equacao-e-posicoes/aula-01.json` / `src/widgets/common/circunferencia/` |
| `angulos-retas-paralelas`: chips `90°` centrais e rótulo `t` encostam | `angulos-retas-paralelas` p1, p2 (p4 depende do slider) | **sim (leve)** | Em p1 (`α = 90°`), os quatro chips `90°` entre as retas `r` e `s` encostam na vertical. Em p2 (`α = 60°`), o rótulo `t` encosta atrás do chip `60°` superior direito (`120°` e `180°` estão limpos). | `src/widgets/common/poligono/desenho.ts` |
| `prismas-e-paralelepipedos`: número `12` da base encosta em `d = 5` | `prismas-e-paralelepipedos` p3, p5 | **sim (leve)** | No pé do prisma, o texto preto `12` (área da base) fica sobre a linha azul da diagonal e encosta na borda superior do chip `d = 5`. | `src/widgets/common/solido/desenho.ts` |
| `geometria_triangulo` com `externo: true`: chip de `α` cortado à direita | `triangulos-congruencia-e-propriedades` p2, p6 | **não** | Em `p2` e `p6` (`α = 50°`), os chips `e = 140°`/`120°` e `50°` cabem inteiros dentro do quadro, sem corte na borda direita. | — |
| Altura do balão do Paco não reservada (layout pula na conclusão) | `StepLayout.tsx` / `InteractiveCanvas.tsx` | **não** | `StepLayout.tsx` já reserva a altura com `conversa-reserva` / `conversa-reserva__fantasma` e `InteractiveCanvas.tsx` já passa `reservar={[step.lines.intro, step.lines.done]}`. | — |
| Figuras de desafio (`solido_3d`, `geometria_*`, `ciclo_trigonometrico`) sem opção de esconder medida | desafios de geometria | **não** | `solido_3d` já tem `placar` e `mostrar.g`; `geometria_triangulo`, `geometria_poligono`, `geometria_circulo` e `ciclo_trigonometrico` já têm `mostrar` / `ocultar` / `legenda`, todos ligados nas aulas (confirmado em `geometria-reconferencia-b8.md` e nas capturas de `trigonometria-no-triangulo-retangulo` p4 e `parabola-conica`/`elipse`/`hiperbole` p5). | — |
| `retangulo_areas` pequeno no passo 1 | `expressoes-algebricas-e-produtos-notaveis` p1 | **não** | `AreasWidget.tsx` já recebe `faixas` (`maiorExtensao` em `desenho.ts`): em `b = 0` o quadrado `a²` fica pequeno e centralizado (~1/4 do quadro) justamente para manter a escala fixa até `b = 3` (`lado = 5`). | — |
| `pontos_no_plano` mostra `d = ...`, rótulos `A`/`B`, e modo `reta` com botões e reta sem recorte | `plano-cartesiano-distancia-e-ponto-medio` p2, p5, p6; `reta-equacao-e-inclinacao` p1, p2, p4 | **não** | Em p2 e p5 `d` foi ocultado e p5 usa `O` e `P`; p6 mostra `d = 5` e `M(3; 3,5)` lado a lado. Em `reta-equacao-e-inclinacao`, os botões e `d` sumiram, `m` e `n` têm chip próprio e a reta é recortada na malha. | — |
| `circunferencia_no_plano`: equação com parênteses extras e `"2 ponto(s)"` | `circunferencia-equacao-e-posicoes` p1, p4, p5 | **não** | Equação aparece limpa (`x² + y² = 25`), `Secante: 2 pontos` e `C`/`P` separados. | — |
| `lugar_geometrico`: equação/`a,b,c` sempre visíveis, `F` sobre vértice, `PF₁` na parábola, `F₁`/`F₂` juntos | `parabola-conica` p1, p2, p5, p6; `elipse` p1, p3, p5; `hiperbole` p3, p5 | **não** | Parábola sem equação em p1–p2, `PF` sem subscrito `1`, `F` deslocado do vértice; elipse e hipérbole sem `a, b, c` em p3 e p5; `F₁` e `F₂` separados em `elipse` p1. | — |
| `area-do-circulo-e-setores`: legenda cortada nas bordas | `area-do-circulo-e-setores` p1, p5 | **não** | A legenda quebra em duas linhas e cabe inteira em 400 px. | — |
| `comprimento-da-circunferencia`: quadro baixo e conta sobre a barra | `comprimento-da-circunferencia` p4 | **não** | Quadro mais alto, texto acima da barra rosa, `31,42 m` visível e `≈ 3,14 m`. | — |
| `perimetro-e-area-de-figuras-planas` e `poligonos-regulares`: chips sobrepostos | `perimetro-e-area-de-figuras-planas` p2, p3, p6; `poligonos-regulares` p2, p5 | **não** | `h` e `A` separados nos lados da altura; no hexágono, `60°`, `120°`, `60°` e `4` não se cobrem. | — |
| `triangulos-congruencia-e-propriedades` p1 e `triangulos-notaveis-e-construcoes` p1, p5 | `triangulos-congruencia-e-propriedades` p1; `triangulos-notaveis-e-construcoes` p1, p5 | **não** | Os três `60°` no topo estão separados; a legenda usa `1√2 ≈ 1,41` e `4√2 ≈ 5,66` com `≈`. | — |
| `poliedros-e-relacao-de-euler` p3 e `projecoes-cortes-e-planificacoes` p3 | `poliedros-e-relacao-de-euler` p3; `projecoes-cortes-e-planificacoes` p3 | **não** | Cubo solto em 6 faces (`24 bordas`, `A = 24 ÷ 2 = 12`) e molde da cruz legível. | — |
| `funcoes-trigonometricas` p1, p2 e `identidades-trigonometricas` p3 | `funcoes-trigonometricas` p1, p2; `identidades-trigonometricas` p3 | **não** | `sen 0` e `cos 1` cabem sem corte à direita; `sec 1` fica abaixo do raio e `tg 0` acima. | — |

*(Observação: defeitos que só aparecem ao mover o slider — `posicoes-relativas-de-retas` p2 com `m₂ = 2`, `hiperbole` p4 com `zoom = 4`, `angulos-retas-paralelas` p4 com `20°`, `circunferencia-arcos-e-angulos` p4 com `180°`, `comprimento-da-circunferencia` p2 com `d = 3`, `relacoes-metricas-triangulo-retangulo` p1 com `m = 8`, `semelhanca-e-teorema-de-tales` p4 com corte torto, `triangulos-notaveis-e-construcoes` p3 com `r > 3`, `identidades-trigonometricas` p2 no 2º quadrante — não foram acionados porque `captura-aula.mjs` captura apenas o estado inicial.)*

---

## O que ainda precisa de correção (em ordem de gravidade)

1. **Matemática / representação errada na tela:**
   - `inequacoes-trigonometricas` p3 (`ciclo/desenho.ts`): extremos `30°` e `150°` desenhados como bolinha vazia em `sen θ ≥ 0,5` (deveriam ser fechados).
   - `funcoes-trigonometricas` p3 (`ciclo/desenho.ts`): passo "gráfico da tangente" não desenha o gráfico de `tg x`, só o ciclo.
2. **Sobreposição de chips que impede leitura:**
   - `formulas-de-adicao-e-arco-duplo` p1 e p3 (`ciclo/desenho.ts`): `sen 0,5` cobre o chip `α` dentro do ciclo; em p3 os rótulos `0,5`, `0,52` e `0,5` no topo das barras se cobrem.
3. **Figura desconectada da fala / elementos sobrando:**
   - `trigonometria-no-triangulo-retangulo` p1 (`triangulo/desenho.ts`): triângulo minúsculo no canto inferior esquerdo da grade quando `k = 1`.
   - `poligonos-e-quadrilateros` p2 (`poligono/desenho.ts`): chip `3 triângulos` do passo 1 continua na tela no passo de ângulos externos.
   - `piramides` p2: chip `V = 48` segue visível no passo de área lateral (`placar: false` não ligado).
   - `areas-e-volumes-por-composicao` p3 e `esferas` p2 (`solido/desenho.ts`): figura não mostra as áreas (`9π`, `15π`) nem os 4 círculos máximos citados na fala.
   - `vetores-no-plano` p2 (`vetores/`): chips `x`/`y` ficam presos em `u` enquanto o aluno arrasta `v`.
   - `circunferencia-equacao-e-posicoes` p4: ponto `P` e chip `d = ...` continuam na tela no passo da reta `y = k`.
4. **Encoste leve de rótulos:**
   - `angulos-retas-paralelas` p1 e p2 (`poligono/desenho.ts`): chips `90°` centrais se encostam em p1; rótulo `t` encosta no `60°` em p2.
   - `prismas-e-paralelepipedos` p3 e p5 (`solido/desenho.ts`): número `12` encosta no chip `d = 5`.
   - `vetores-no-plano` p6 (`vetores/`): `Módulo = 3,61` encosta em `Soma = (6; 2)`.
