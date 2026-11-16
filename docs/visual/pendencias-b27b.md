# B27b — defeitos que só aparecem movendo o slider (16/11/2026, Claude Code #2)

## Ferramenta

`C:\Users\mkf10\projetos\ferramentas-b27\captura-slider.mjs` fica fora do repositório e parte de `scripts/captura-aula.mjs`.

- **Uso:** `node <ferramenta> <porta> <pasta> <pilar/setor/slug>:<passo>@<id>=<valor>[,<id>=<valor>]`, rodado a partir da raiz do repositório.
- **Como move o slider:** `src/ui/Slider.tsx` não é um `<input range>`. A ferramenta dá foco ao `role="slider"` cujo `aria-label` é o `label` do controle, aperta `Home` e depois `ArrowRight` (valor − min)/step vezes, com eventos reais de teclado do protocolo de depuração.
- **O que ela confere:** imprime o `aria-valuenow` final (e sai com erro se o slider não chegou ao valor) e o `scrollWidth` da página.
- **Prova:** `capturas-b27b\prova\hiperbole-p4-zoom=1.png` e `...-zoom=4.png`. A ferramenta informou "pedido 1, slider mostra 1" e "pedido 4, slider mostra 4". Na imagem, os ramos se fecham sobre as assíntotas e a fala muda para a de conclusão.

## Os 9 casos

Pasta `C:\Users\mkf10\projetos\capturas-b27b`: `antes` tem o estado antes da correção, `depois` o estado corrigido.

| caso (valor citado) | continua? | o que se vê (captura) | correção |
|---|---|---|---|
| `posicoes-relativas-de-retas` p2, m₂ = 2 | **não** | `(−2; −1)` e `y = m₂x + 3` separados (`antes\...-m2=2.png`) | — |
| `hiperbole` p4, zoom = 4 (e 5) | **não** | F₁ e F₂ separados, F₂ a cerca de 8 px do pegador de P (`antes\hiperbole-p4-zoom=4.png`, `=5`) | — |
| `angulos-retas-paralelas` p4, ±20° | **sim** | +20°: `110°` (r) encosta em `50°` (s). −20°: `70°` encosta em `90°`, e o chip `s` cobre o fim da legenda "…paralelas". Também encostava em ±5° a ±15°. | widget `poligono` |
| `circunferencia-arcos-e-angulos` p4, 180° | **não** | `180°` acima do diâmetro, sem cobrir o ponto do centro | — |
| `comprimento-da-circunferencia` p2, d = 3 (e 4) | **não** | a roda fica sobre a régua sem cobrir os números | — |
| `relacoes-metricas-triangulo-retangulo` p1, m = 8 | **sim** | `c = 4,47` cobre `h = 4` (só se lê "h = ("). Em m = 2, `b = 4,47` cobre o `h` do mesmo jeito. | widget `triangulo` |
| `semelhanca-e-teorema-de-tales` p4, corte torto | **sim** | Giro 5° a 20°: a legenda "Corte torto: os ângulos não coincidem, não é semelhante." sai cortada nas duas bordas, e o chip `k = 0,6` continua num corte que não é semelhante. | widget `triangulo` |
| `triangulos-notaveis-e-construcoes` p3, r > 3 | **sim (r = 4)** | Em r = 4 o chip `mediatriz` cobre o cruzamento de cima dos círculos. Em r = 5 o cruzamento fica visível. | widget `triangulo` |
| `identidades-trigonometricas` p2, 2º quadrante | **sim** | No 2º e no 3º quadrante o chip `sen 0,6` / `sen −0,6` sai pela borda esquerda; só se vê um pedaço azul. | widget `ciclo` |

## Correções

Nenhuma precisou de parâmetro novo. Cada uma só muda estados que estavam com defeito; ver "Comparação de todas as aulas dos widgets".

- **`triangulo/desenho.ts`, `metricas`:** a nova `posicaoChipAltura` deixa o `h` no meio da altura, como antes, e só o desliza para o lado de dentro mais largo quando encostaria no chip de `b` ou de `c`.
  - Depois: `h = 4` inteiro em m = 8 e m = 2 (`depois\relacoes-metricas-...-m=8.png`, `=2`). Em m = 5 a tela é igual à de antes.
- **`triangulo/desenho.ts`, `notaveis` `mediatriz`:** a nova `alturaChipMediatriz` mantém a altura de sempre quando ela fica a 21 px ou mais do cruzamento. Senão, põe o chip no meio entre AB e o cruzamento (ou logo acima dele).
  - Depois: em r = 4 o chip fica entre AB e o cruzamento, que aparece inteiro. Em r = 5 a posição é a de antes.
- **`triangulo/desenho.ts`, `semelhanca` `paralela`:** com o corte torto, o chip `k` some e a legenda passa a ser "Corte torto: ângulos mudam, não é semelhante." (45 caracteres, cabe em 400 px).
  - Depois: em giro 20° a legenda aparece inteira. Em giro 0 a tela é igual à de antes, com `k = 0,6` e `corte 3,6 / base 6 = 0,6`.
- **`ciclo/desenho.ts`:**
  - **Causa:** com o triângulo pitagórico no 2º e no 3º quadrante, todos os candidatos do chip `sen` colidiam. O "acima de P", a 26 px, perdia por 1 px para a reserva do próprio P. Assim o chip caía no anel de reserva, fora da tela.
  - **Correção:** dois candidatos novos, ainda antes do anel: acima/abaixo de P a 32 px, e o mesmo 8 px para fora (escapa do marco `3π/2`).
  - **Depois:** quadrante 2 com `sen 0,6` acima de P, quadrante 3 com `sen −0,6` abaixo de P, os dois inteiros. Os quadrantes 1 e 4 ficaram iguais.
- **`poligono/desenho.ts`, `paralelas`:** com `desvio` ≠ 0, a nova `afastamentoChipsS` desce os chips de cima do cruzamento de s (`s-nw`, `s-ne`) 0,7 px por grau. O rótulo `s` não desce além da legenda.
  - Depois: em −20°, −15°, −10°, −5°, 5°, 10°, 15° e 20° os chips dos dois cruzamentos ficam separados (`depois\angulos-retas-paralelas-p4-desvio=*.png`), e em −20° o `s` fica acima da legenda. Em desvio 0 a tela é igual à de antes.

Não houve saída pelo conteúdo:
- Limitar o `desvio` a ±10° não bastava, porque em −10° `70°` e `100°` ainda encostavam.
- No ciclo, tirar os marcos não liberaria a posição acima de P.

## Testes novos

Nos três arquivos, um contexto falso guarda cada texto escrito e a face do chip (26 px de altura, cerca de 8,5 px por caractere, 2 px de tolerância).

- `triangulo.test.ts`:
  - `h` não cruza `b` nem `c` em m = 2, 5 e 8;
  - `posicaoChipAltura` sem colisão devolve o meio da altura;
  - `alturaChipMediatriz`: r = 5 mantém a altura de antes, e r = 4 afasta o chip do cruzamento;
  - semelhança torta sem `k` e com a legenda curta; paralela com `k = 0,6`.
- `ciclo.test.ts`: chip `sen` dentro da tela nos 4 quadrantes (identidades p2).
- `poligono.test.ts`:
  - `afastamentoChipsS` é 0 com desvio 0;
  - os 8 chips de ângulo não se cruzam com desvio −20°…20° (de 5 em 5).
- **Prova de que os testes pegam o defeito:** com as correções tiradas por um momento, os testes novos falharam:
  - triângulo: 3 falhas ("m = 2: h × b", mediatriz, semelhança);
  - ciclo: 2 falhas (quadrantes 2 e 3);
  - polígono: 8 falhas (os 8 desvios).

  Com as correções de volta, todos passaram, e os arquivos restaurados foram conferidos com `cmp`.

## Comparação de todas as aulas dos widgets

- **O que foi comparado:** o estado inicial de todos os passos das 20 aulas que usam `geometria_triangulo`, `ciclo_trigonometrico` ou `geometria_poligono`, em 105 capturas.
  - `todas-antes` foi capturado com o `triangulo/desenho.ts` do último commit, colocado por um momento; os outros dois widgets ainda não tinham sido alterados.
  - `todas-depois` foi capturado com o código atual.
  - A comparação foi pixel a pixel, com tolerância de 8 por canal, usando o `pngdiff.mjs` da B25a.
- **Resultado:**
  - 28 capturas saíram idênticas.
  - 76 só diferem na área do mascote animado (dentro de x 24–90, y 84–215).
  - 1 muda fora dessa área: `formulas-de-adicao-e-arco-duplo` p1 (β = 0). O chip `sen 0,5` estava no anel de reserva, no 2º quadrante, quase sobre o `−π`, e passou para cima de P, junto do segmento do seno, 5 px ao lado do `β`. É uma melhora. Conferi também β = 30° e 60° desse passo (`depois\formulas-...-p1-beta=30.png`, `=60`): continuam limpos.

## Observação (fora do escopo, não corrigida)

`identidades-trigonometricas` p2, 1º quadrante (estado inicial): o chip `sen 0,6` fica no 2º quadrante, do outro lado do círculo, longe do segmento do seno. Isso já era assim antes da B26 (`capturas-b26\antes\identidades-trigonometricas-p2.png`) e vem do candidato no 2º quadrante criado na B24a. Não está encoberto nem cortado, mas fica longe do que rotula.

## Validação

- `npx vitest run` dos widgets `triangulo`, `ciclo` e `poligono`, mais as 20 aulas que os usam e as 4 aulas dos casos sem defeito: 27 arquivos, 483 testes, todos passaram.
- `npm run lint:content`: "conteúdo ok".
- `npm run typecheck`: terminou com código 0, sem erros.

## Arquivos

- `src/widgets/common/triangulo/desenho.ts` e `triangulo.test.ts`
- `src/widgets/common/ciclo/desenho.ts` e `ciclo.test.ts`
- `src/widgets/common/poligono/desenho.ts` e `poligono.test.ts`
- `docs/GUIA-CAPITULOS.md` §5.10, §5.11 e §5.12 (acréscimos de 16/11, B27b)
- `docs/visual/pendencias-b27b.md`

Nenhuma aula precisou mudar.
