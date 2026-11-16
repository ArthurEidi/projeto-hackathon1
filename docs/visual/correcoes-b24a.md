# Correções B24a — widget `ciclo_trigonometrico` (16/11/2026)

Escopo: os 3 itens de `ciclo_trigonometrico` em `C:\Users\mkf10\projetos\briefing-b24.md` (a partir de `docs/visual/pendencias-b19.md`).
Capturas antes/depois em `C:\Users\mkf10\projetos\capturas-b24\{antes,depois}`.

## 1. `inequacoes-trigonometricas` p3 (`limite-meio`): extremos fechados com bolinha vazia

- **Causa:** `content/geometria/trigonometria/inequacoes-trigonometricas/aula-01.json` já trazia `"abreDe": false, "abreAte": false` em `arco: { de: 30, ate: 150 }` (e todas as demais inequações da aula também estão coerentes: `>` com `true`, `≥` com `false`). O bug estava em `src/widgets/common/ciclo/desenho.ts`: `m.alvo.solucoes` desenhava bolinhas brancas vazias (raio 9) *depois* de `p.arco` (raio 8), cobrindo os extremos fechados de `arco`.
- **Correção (`src/widgets/common/ciclo/desenho.ts`):** os extremos de `p.arco` agora são desenhados após `m.alvo`, e `m.alvo.solucoes` não desenha a bolinha vazia quando `!marcada` e o ponto coincide com um extremo de `p.arco`.
- **Teste novo (`src/widgets/common/ciclo/ciclo.test.ts`):** `"arco fechado com alvo não desenha bolinha vazia por cima dos extremos"` verifica que `desenharCiclo` não preenche com `#ffffff` quando `abreDe`/`abreAte` são `false`.
- **Prova visual:** em `capturas-b24/antes/inequacoes-trigonometricas-p3.png` os pontos em 30° e 150° apareciam vazios; em `capturas-b24/depois/inequacoes-trigonometricas-p3.png` ambos aparecem preenchidos em roxo.

## 2. `formulas-de-adicao-e-arco-duplo` p1 e p3: sobreposição de `sen 0,5` sobre `α` e valores no topo das barras

- **Causa:** em `src/widgets/common/ciclo/desenho.ts`, (a) os candidatos de posição do chip `sen ...` só olhavam para a direita (`+38/+62`, bloqueado pela coluna reservada das barras em `p.soma`) ou para a esquerda imediata (`-38/-62`, colidindo com `α`), forçando o fallback em cima de `α`; (b) em `desenharBarras`, os rótulos no topo das 3 barras (`0,5`, `0,52`, `0,5`) usavam `etiqueta` (pílula larga de 16 px) num espaçamento de `0,55` unidade (~40 px), sobrepondo-se horizontalmente.
- **Correção (`src/widgets/common/ciclo/desenho.ts`):** (a) acrescentados candidatos no 2º quadrante (`{ x: O.x - R * 0.55, y: ys }`) e acima/abaixo de `P` para o chip `sen ...`; (b) quando `p.soma` está ativo, `desenharBarras` escreve o valor acima de cada barra com `nota(..., 12)` em vez de `etiqueta`.
- **Prova visual:** em `capturas-b24/depois/formulas-de-adicao-e-arco-duplo-p1.png` e `p3.png`, `sen 0,5` fica livre no 2º quadrante sem cobrir `α`, e `0,5`, `0,52`, `0,5` no topo das barras ficam separados; `p2.png` e `p4.png` seguem limpos.

## 3. `funcoes-trigonometricas` p3 (`grafico-tangente`): fala ajustada ao que o widget mostra

- **Diagnóstico:** `ciclo_trigonometrico` aceita apenas `grafico: "sen" | "cos"` (`src/widgets/common/ciclo/params.ts`), sem modo de gráfico de `tg x`. No ciclo com `mostrar.tangente: true`, ao avançar `theta` de `0°` a `180°` a altura na reta tangente `x = 1` vai de `0` a `1` (`45°`), não existe em `90°`, passa a `−1` (`135°`) e volta a `0` em `180°`.
- **Correção (`content/geometria/trigonometria/funcoes-trigonometricas/aula-01.json`):** ajustadas `lines.intro` e `lines.done` do passo `grafico-tangente` para referir exatamente a altura na reta tangente `x = 1` voltando a zero em `180° (π)`.
- **Lacuna registrada:** falta modo `grafico: "tg"` em `ciclo_trigonometrico` para desenhar a curva da tangente ao lado do ciclo.

## Validação

- `npx vitest run src/widgets/common/ciclo` e os testes das 7 aulas que usam `ciclo_trigonometrico` (`equacoes-trigonometricas`, `formulas-de-adicao-e-arco-duplo`, `funcoes-trigonometricas`, `identidades-trigonometricas`, `inequacoes-trigonometricas`, `radianos-e-ciclo-trigonometrico`, `seno-cosseno-tangente-no-ciclo`): **8 arquivos / 115 testes passando**.
- `npm run typecheck`: limpo (0 erros).
- `npm run lint:content`: `conteúdo ok` (0 erros).

## Auditoria do maestro (16/11)

Capturas de depois conferidas: `inequacoes-trigonometricas` p3 com 30° e 150° cheios; `formulas-de-adicao-e-arco-duplo` p3 com valores das barras separados e `α` livre. Pendência leve: em p3 o chip `sen 0,5` (posição nova no 2º quadrante) cobre a marca `π` do eixo horizontal.
