# Reconferência visual B8 — Geometria (Plana, Espacial e Trigonometria)

Escopo: reconferência visual dos **77 passos** corrigidos após a conferência visual original (`docs/visual/geometria.md`, `docs/revisao/geometria-plana.md`, `docs/revisao/geometria-espacial.md`, `docs/revisao/geometria-trigonometria.md` e commit `2c42dba`). O capítulo `cones` não tinha pendências e ficou fora do escopo.

Metodologia:
- Capturas em viewport `400×860` (`C:/Users/mkf10/projetos/capturas-b8/`), todas com `overflowX = false` e `scrollWidth = 400` (0 passos `não capturado`).
- Nos desafios (`micro_challenge`), o clique do script apenas seleciona a alternativa sem acionar `VERIFICAR`; por isso, o estado inicial foi verificado nas imagens e o `figure` e o `feedback` de cada alternativa foram conferidos diretamente nos JSONs em `content/geometria/<setor>/<slug>/aula-01.json`.

---

## Tabela de reconferência

| slug | passo | resultado | detalhe | tipo |
| --- | --- | --- | --- | --- |
| angulos-retas-paralelas | p5 (desafio-colaterais) | ok | Figura inicial mostra `65°` e `x` sem entregar `115°`. Alternativas no JSON usam `destacar: "alternos"` (`65°`), `fantasma: true` (`25°?`) e `125°?`. | conteúdo |
| angulos-retas-paralelas | p6 (fechamento) | ok | Fórmula `α + β = 180°` cabe em 1 linha sem corte em 400 px; rótulos legíveis. | widget |
| area-do-circulo-e-setores | p4 (desafio-setor-90) | ok | Figura inicial mostra setor de `90°` e `r = 4` sem legenda `A = 4π`. Alternativas no JSON variam `alfa` (`360`, `180`) e `modo: "roda"` (`arco`). | conteúdo |
| area-do-circulo-e-setores | p5 (fechamento) | ok | Fórmula `A = π r² · (α/360°)πr²` cabe em 1 linha sem `_` cru; legenda quebra em 2 linhas sem corte. | widget |
| circunferencia-arcos-e-angulos | p5 (desafio-inscrito) | ok | Figura inicial exibe só `35°` inscrito (`valor_central: false`). Alternativas no JSON mostram `alfa` errado (`35°`, `145°`) e `medidas: true`. | conteúdo |
| comprimento-da-circunferencia | p5 (desafio-comprimento) | ok | Figura inicial mostra `360°` e `r = 10` sem placa `C = 62,8`. Alternativas no JSON mostram `180°` (`31,4 m`), `r = 50` (`314 m`) e `razao` (`d = 20`). | conteúdo |
| perimetro-e-area-de-figuras-planas | p1 (retangulo-malha) | ok com ressalva | Estado inicial `h = 3` bate com a fala, mas no retângulo `1×3` o chip rosa `A = 3` cobre o `3` do chip laranja `h = 3` (fica visível só `h =`). | widget |
| perimetro-e-area-de-figuras-planas | p5 (desafio-trapezio) | ok | Figura inicial mostra `b = 4`, `B = 6`, `h = 3` sem `A = 15`. Alternativas no JSON mostram duplicação (`30`), retângulo `6×3` (`18`) e `perimetro: true` (`13`). | conteúdo |
| poligonos-e-quadrilateros | p3 (diagonais-dos-quadrilateros) | ok | `d1 ≠ d2` no paralelogramo inicial e fala alinhada ao controle `1..3` até losango. | conteúdo |
| poligonos-e-quadrilateros | p4 (desafio-soma-pentagono) | ok | Pentágono inicial sem diagonais nem `S = 540°`. Alternativas no JSON variam `n` (`4`, `6`, `7`) com diagonais. | conteúdo |
| poligonos-e-quadrilateros | p5 (fechamento) | ok | Fórmula `Sᵢ = (n−2)·180° · Sₑ = 360°` cabe sem corte nem `_` cru. | widget |
| poligonos-regulares | p4 (desafio-angulo-octogono) | ok com ressalva | Figura inicial mostra octógono limpo sem `135°`/`45°`. Porém, no JSON, a opção `45°` tem `figure: {"n": 8}` sem `mostrar.externo: true` para exibir o ângulo externo. | conteúdo |
| poligonos-regulares | p5 (fechamento) | ainda com defeito | Fórmula e fala `aₑ` estão limpas, mas na figura do hexágono o chip rosa `120°` ainda cobre quase todo o segundo chip azul `60°` atrás dele. | widget |
| relacoes-metricas-triangulo-retangulo | p4 (desafio-altura-hipotenusa) | ok | Figura inicial mostra `m = 4` e `n = 9` sem `h = 6`. Alternativas no JSON destacam os termos (`c1`, `c2`, `c3`) correspondentes a cada erro. | conteúdo |
| relacoes-metricas-triangulo-retangulo | p5 (fechamento) | ok | `h² = m·n ; b² = a·m` cabe sem corte; rótulos do triângulo separados. | widget |
| semelhanca-e-teorema-de-tales | p5 (desafio-tales) | ainda com defeito | Figura inicial limpa (`4`, `6`, `6`, `x`, sem `9`) e alternativas no JSON variam `dir` (`14`, `10`, `16`). Porém o feedback das 3 erradas ainda começa com `"Resposta: 9; ..."`. | conteúdo |
| semelhanca-e-teorema-de-tales | p6 (fechamento) | ok | `a'/a = b'/b = k` cabe em 1 linha sem corte. | widget |
| teorema-de-pitagoras | p3 (ternas-e-diagonal) | ok | `c = 4`, `b = 3`, `c² = 16`, `b² = 9`, `a² = 25` e botão `QUADRADO E DIAGONAL` alinhados com a fala. | conteúdo |
| teorema-de-pitagoras | p5 (desafio-achar-cateto) | ok | Figura inicial mostra `a = 10`, `b = 8` sem `c = 6` nem quadrados. Alternativas no JSON mostram quadrados (`36`) e catetos `c = 2` e `c = 12.8`. | conteúdo |
| transformacoes-isometrias-e-homotetia | p3 (homotetia-positiva-e-negativa) | ok | Estado inicial `k = 1`, `área 2 → 2` limpo e coerente com a fala. | conteúdo |
| transformacoes-isometrias-e-homotetia | p4 (desafio-homotetia-area) | ok | Figura inicial mostra `k = 1` sem `k² = 9`. Alternativas no JSON mostram `k = 1`, `k = 2` e `k = 3`. | conteúdo |
| transformacoes-isometrias-e-homotetia | p5 (fechamento) | ok | `L' = L, A' = A ; L' = \|k\|L, A' = k²A` cabe em 2 linhas sem corte. | widget |
| triangulos-congruencia-e-propriedades | p2 (angulo-externo) | ok | Fala (`β = 40°`, `α + γ`) bate com a figura (`50°`, `90°`, `40°`, `e = 140°`). | conteúdo |
| triangulos-congruencia-e-propriedades | p5 (desafio-isosceles-externo) | ainda com defeito | Figura inicial mostra só `40°` no topo (`ocultar: ["alfa", "beta"]`). Porém: (1) o feedback das 3 erradas ainda começa com `"Resposta: 70°; ..."`; (2) a opção `140°` no JSON só aplica `highlight: ["c1"]` sem mostrar os ângulos. | conteúdo |
| triangulos-congruencia-e-propriedades | p6 (fechamento) | ok | `α+β + γ =180°; e =α+γ` cabe sem corte; `e = 120°` visível. | widget |
| triangulos-notaveis-e-construcoes | p4 (desafio-triangulo-30-60) | ainda com defeito | Figura inicial mostra equilátero `60°/60°/60°`, `L = 10`, `cortar: 0` sem entregar `L/2 = 5` ou `h = 8,66`; alternativas no JSON mostram quadrado (`5√2`) e `L = 20`. Porém o feedback das 3 erradas ainda começa com `"Resposta: 5 cm e 5√3 cm; ..."`. | conteúdo |
| triangulos-notaveis-e-construcoes | p5 (fechamento) | ok | `d=L√2 ; c=L/2 ; h=L√3/2` cabe sem corte e `d = 4√2 ≈ 5,66` está coerente. | widget |
| areas-e-volumes-por-composicao | p3 (cavar-diminui-volume-aumenta-area) | ok | Cilindro `36π`, cone `12π`, slider `Escavar cone no topo 0%`, texto alinhado à figura. | conteúdo |
| areas-e-volumes-por-composicao | p4 (desafio-volume-silo) | ok | Figura inicial mostra cilindro + cone sem `V = 54π`. Alternativas no JSON mostram `hc = 9` (`72π`), só `cilindro` (`45π`) e `cavidade` (`36π`). | conteúdo |
| areas-e-volumes-por-composicao | p5 (fechamento) | ok | `V = V₁ ± V₂ ; A: casca` cabe em 2 linhas sem `_` cru nem corte. | widget |
| cilindros | p4 (desafio-cilindro) | ok | Figura inicial mostra `r = 3`, `h = 5` sem `V = 45π`. Alternativas no JSON mostram cone (`15π`), planificação lateral (`30π`) e `h = 25` (`225π`). | conteúdo |
| cilindros | p5 (fechamento) | ok | `Al = 2π r h ; V = πr²h` cabe em 2 linhas sem `_` cru; chips limpos. | widget |
| esferas | p2 (quatro-circulos-maximos) | ok | Esfera no cilindro, `4πR² = 36π`, slider `Encaixar no cilindro 0`, texto alinhado. | conteúdo |
| esferas | p4 (desafio-esfera) | ok | Figura inicial mostra esfera limpa sem `R = 3` ou `36π`. Alternativas no JSON variam `corte` e `no_cilindro`. | conteúdo |
| esferas | p5 (fechamento) | ok | `r² + d² = R² ; A = 4πR²` cabe em 2 linhas; `seção 16π`, `r = 4`, `d = 3`, `R = 5` sem sobreposição. | widget |
| piramides | p4 (desafio-piramide) | ok | Figura inicial mostra `h = 4`, `3`, `5` sem `V = 48`. Alternativas no JSON mostram `dividir: 1` (`144`), `abrir: 1` (`60`) e `h = 2` (`24`). | conteúdo |
| piramides | p5 (fechamento) | ok | `ap² = h² + m² ; V = Ab·h/3` cabe em 2 linhas sem `_` cru; rótulos limpos. | widget |
| poliedros-e-relacao-de-euler | p4 (desafio-euler) | ok | Figura inicial mostra octaedro sem `V = 6`. Alternativas no JSON mostram `tetraedro`, `soltar: 1` e `dodecaedro`. | conteúdo |
| posicoes-relativas-no-espaco | p4 (desafio-cubo) | ok | Figura inicial mostra cubo com `AB` e `CG` sem entregar `"Reversas"`. Alternativas no JSON destacam `c1`, `c2` e `planos`. | conteúdo |
| posicoes-relativas-no-espaco | p5 (fechamento) | ok | `r ∩ s = ∅ ⇒ paralelas ou reversas` cabe em 2 linhas; linhas `r` e `s` legíveis. | widget |
| prismas-e-paralelepipedos | p4 (desafio-prisma) | ok | Figura inicial mostra `h = 6` e base `10` sem `V = 60`. Alternativas no JSON variam `camadas: false` e `base: "triangulo"`. | conteúdo |
| prismas-e-paralelepipedos | p5 (fechamento) | ok | `V = Ab · h` cabe em 1 linha sem `_` cru; rótulos separados. | widget |
| projecoes-cortes-e-planificacoes | p4 (desafio-face-oposta) | ok com ressalva | Molde em cruz `1–6` aberto no início sem entregar `Face 6`. Porém, no JSON, as 3 erradas usam a mesma `figure: {"fechar": 0.5}` sem destacar qual face erra. | conteúdo |
| projecoes-cortes-e-planificacoes | p5 (fechamento) | ok | `vistas + cortes + moldes` cabe em 2 linhas; cubo fechado com `1–6` sem corte. | widget |
| solidos-de-revolucao | p4 (desafio-revolucao-trapezio) | ok | Figura inicial mostra cilindro + cone sem `12π`. Alternativas no JSON usam `juntar: 0` com destaque em `c2` ou `c1`. | conteúdo |
| solidos-de-revolucao | p5 (fechamento) | ok | `Perfil + giro ⇒ sólido` cabe em 2 linhas; `V = 12π`, `4`, `3` limpos. | widget |
| troncos-de-solidos | p3 (trapezio-meridiano) | ainda com defeito | A fala pergunta `"quanto mede a geratriz inclinada g?"`, mas a figura inicial já exibe o chip `g = 5` no corte inferior, entregando a resposta. | conteúdo |
| troncos-de-solidos | p4 (desafio-tronco) | ok | Figura inicial mostra só `h' = 6` sem `V = 10` ou `k = 0,5`. Alternativas no JSON usam `meridiano: true` e `separar: 1` com destaques distintos. | conteúdo |
| troncos-de-solidos | p5 (fechamento) | ok | `V = k³ · Vt` cabe em 1 linha; chips e trapézio legíveis. | widget |
| equacoes-trigonometricas | p1 (caso-neutro) | ok | `θ = 0° = 0`, ciclo limpo, slider `Giro em graus 0` sem corte. | conteúdo |
| equacoes-trigonometricas | p2 (altura-repetida) | ok | `θ = 30° = π/6`, `y = 0,5`, `sen 0,5` alinhado à fala (`150°`). | conteúdo |
| equacoes-trigonometricas | p4 (conferir-previsao) | ok | Figura inicial mostra `θ = 0°` e `y = 0,5` sem entregar `π/6` e `5π/6`. Alternativas no JSON variam `angulo`, `alvo.seno` e `marcadas`. | conteúdo |
| equacoes-trigonometricas | p5 (fechamento) | ok | `sen θ = sen α ⇒ θ = α + 2kπ` cabe em 2 linhas; rótulos separados. | widget |
| formulas-de-adicao-e-arco-duplo | p4 (desafio-arco-duplo) | ok | Figura inicial mostra `θ = 37°`, `sen 0,6`, `cos 0,8` sem `24/25`. Alternativas no JSON variam `blocos` e `angulo` (`28.69`, `73.74`). | conteúdo |
| formulas-de-adicao-e-arco-duplo | p5 (fechamento) | ainda com defeito | Fórmula cabe em 2 linhas, mas na figura o chip `sen 0,97` sobrepõe os rótulos `β` e `α` no ciclo, e a barra do meio toca a borda superior do quadro. | widget |
| funcoes-trigonometricas | p3 (grafico-tangente) | ok | `θ = 0° = 0`, `tg 0`, slider `Arco x (graus) 0` coerente com a fala. | conteúdo |
| funcoes-trigonometricas | p4 (desafio-identificar-curva) | ainda com defeito | Figura inicial exibe onda do cosseno sem rótulo (`grafico_rotulo: false`); alternativas no JSON mostram curvas `sen` e `tg`. Porém o feedback das 3 erradas ainda começa com `"Resposta: f(x) = cos x; ..."`. | conteúdo |
| funcoes-trigonometricas | p5 (fechamento) | ok com ressalva | `sen(x+2π) = sen x · T = 2π` cabe em 2 linhas; porém o chip `sen 0` cobre parcialmente o marco `2π` no eixo x. | widget |
| identidades-trigonometricas | p2 (sinal-pelo-quadrante) | ok | `θ = 37° = 0,64 rad`, barra `1` (`cos² = 0,64`, `sen² = 0,36`) e slider `Quadrante do arco 1` limpos. | conteúdo |
| identidades-trigonometricas | p3 (tangente-e-secante) | ainda com defeito | Em `θ = 0°`, a linha preta do raio corta horizontalmente o meio do chip roxo `sec 1`, dificultando a leitura. | widget |
| identidades-trigonometricas | p4 (desafio-achar-cosseno) | ainda com defeito | Figura inicial mostra só `sen 0,6` (cosseno oculto); alternativas no JSON variam `angulo` (`66.42`, `50.21`, `143.13`). Porém o feedback das 3 erradas ainda começa com `"Resposta: 4/5; ..."`. | conteúdo |
| identidades-trigonometricas | p5 (fechamento) | ainda com defeito | Fórmula `sen²θ + cos²θ = 1` cabe em 1 linha, mas no ciclo o chip rosa `1` cobre o chip roxo `sec 1,41` atrás dele. | widget |
| inequacoes-trigonometricas | p1 (caso-neutro) | ok | `θ = 0° = 0`, arco `(0; π)`, slider `Giro em graus 0` limpo. | conteúdo |
| inequacoes-trigonometricas | p2 (cruzar-fronteira) | ok | `θ = 90° = π/2`, `sen 1`, extremos abertos em `0` e `π`, slider `90`. | conteúdo |
| inequacoes-trigonometricas | p3 (limite-meio) | ok | `θ = 0° = 0`, `y = 0,5`, arco destacado acima de `0,5`, slider `0`. | conteúdo |
| inequacoes-trigonometricas | p4 (conferir-previsao) | ok | Figura inicial mostra `θ = 0°` sem arco de resposta. Alternativas no JSON mostram `(0; π)`, `[0; π]`, `(0; 2π)` e `[π; 2π)`. | conteúdo |
| lei-dos-senos-e-cossenos | p4 (desafio-cossenos) | ok | Figura inicial mostra `b = 5`, `c = 8`, `60°` sem `a = 7`. Alternativas no JSON variam `angulo` (`90`, `120`) e destaques. | conteúdo |
| lei-dos-senos-e-cossenos | p5 (fechamento) | ok | `a²=b²+c² -2bc·cosA ; a/senA =2R` cabe em 2 linhas; rótulos limpos. | widget |
| modelos-periodicos-e-amplitude | p4 (desafio-roda-gigante) | ok com ressalva | Figura inicial mostra `D = 12` e `h(t)` sem revelar `máx = 22` nem `mín = 2`. Porém, no JSON, as opções `10 m e -10 m` e `22 m e 12 m` usam o mesmo `ponto: {"x": 9}` (mínimo `2`), sem ilustrar o erro específico de cada uma. | conteúdo |
| modelos-periodicos-e-amplitude | p5 (fechamento) | ok | `y = D + A sen(Bx+C) ; T=2π/B` cabe em 2 linhas; gráfico limpo. | widget |
| radianos-e-ciclo-trigonometrico | p1 (um-radiano) | ok | `θ = 0° = 0`, `cos 1`, régua `1..6`, slider `Giro em radianos 0` limpo. | conteúdo |
| radianos-e-ciclo-trigonometrico | p4 (desafio-conversao) | ok | Figura inicial mostra `θ = 120°`, `2,09 rad` sem `2π/3`. Alternativas no JSON variam `angulo` (`60`, `270`, `360`). | conteúdo |
| radianos-e-ciclo-trigonometrico | p5 (fechamento) | ok | `π rad = 180° ; θ+2kπ` cabe em 2 linhas; régua e rótulos limpos. | widget |
| seno-cosseno-tangente-no-ciclo | p4 (desafio-reduzir-150) | ainda com defeito | Figura inicial mostra simetria sem entregar `sen`/`cos`. Porém o feedback das 3 erradas ainda começa com `"Resposta: 1/2 e −√3/2; ..."`. | conteúdo |
| seno-cosseno-tangente-no-ciclo | p5 (fechamento) | ok com ressalva | `x=cosθ ; y=senθ ; tgθ=y/x` cabe em 2 linhas; porém o chip azul `sen 0,87` cobre parcialmente o chip roxo `30°`. | widget |
| trigonometria-no-triangulo-retangulo | p4 (desafio-rampa) | ok | Figura inicial mostra `HIP 10` e `30°` sem `CO 5`. Alternativas no JSON variam `k = 2` e destaques (`c1`, `c2`, `c3`). | conteúdo |
| trigonometria-no-triangulo-retangulo | p5 (fechamento) | ok | `sen=CO/HIP ; cos=CA/HIP ; tg=CO/CA` cabe em 3 linhas; rótulos separados. | widget |

---

## Resumo dos defeitos que ainda precisam de correção

Totais: **77 passos vistos** — **60 ok**, **6 ok com ressalva** (3 de conteúdo, 3 de widget) e **11 ainda com defeito** (7 de conteúdo, 4 de widget).

### Defeitos de conteúdo (10 no total: 7 defeitos + 3 ressalvas)
1. **Prefixo `"Resposta: ...;"` ainda presente no feedback das alternativas erradas** (6 passos — `ainda com defeito`):
   - `semelhanca-e-teorema-de-tales` (`p5`)
   - `triangulos-congruencia-e-propriedades` (`p5`)
   - `triangulos-notaveis-e-construcoes` (`p4`)
   - `funcoes-trigonometricas` (`p4`)
   - `identidades-trigonometricas` (`p4`)
   - `seno-cosseno-tangente-no-ciclo` (`p4`)
2. **Figura inicial entrega a resposta** (1 passo — `ainda com defeito`):
   - `troncos-de-solidos` (`p3`): a fala pergunta quanto mede `g`, mas o trapézio inferior já exibe o chip `g = 5` no estado inicial.
3. **Figuras de alternativas erradas pouco específicas / idênticas** (3 passos — `ok com ressalva`):
   - `poligonos-regulares` (`p4`): opção `45°` usa `{"n": 8}` sem `mostrar.externo: true`.
   - `projecoes-cortes-e-planificacoes` (`p4`): todas as 3 erradas usam apenas `{"fechar": 0.5}` sem destacar a face escolhida.
   - `modelos-periodicos-e-amplitude` (`p4`): opções `10 m e −10 m` e `22 m e 12 m` repetem `{"ponto": {"x": 9}}` (mínimo `2`).
   *(Extra em `triangulos-congruencia-e-propriedades` `p5`: opção `140°` usa apenas `{"highlight": ["c1"]}` sem mostrar os ângulos).*

### Defeitos de widget (7 no total: 4 defeitos + 3 ressalvas — referência)
- **Sobreposição de chips / linhas** (`ainda com defeito`):
  - `poligonos-regulares` (`p5`): chip `120°` cobre o segundo chip `60°`.
  - `formulas-de-adicao-e-arco-duplo` (`p5`): `sen 0,97` sobrepõe `β` e `α`, e a barra central encosta na borda superior.
  - `identidades-trigonometricas` (`p3`): em `θ = 0°`, o raio preto corta o meio do chip `sec 1`.
  - `identidades-trigonometricas` (`p5`): chip rosa `1` cobre `sec 1,41`.
- **Sobreposição leve** (`ok com ressalva`):
  - `perimetro-e-area-de-figuras-planas` (`p1`): em `1×3`, `A = 3` cobre o `3` de `h = 3`.
  - `funcoes-trigonometricas` (`p5`): `sen 0` cobre parcialmente `2π` no eixo x.
  - `seno-cosseno-tangente-no-ciclo` (`p5`): `sen 0,87` cobre parcialmente `30°`.
