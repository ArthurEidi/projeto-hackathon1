# Entrega de widgets (14/11 — Antigravity #3)

Documentação para integração no `docs/GUIA-CAPITULOS.md` (§5.14–5.16) e resumo das correções.

## 1. `lugar_geometrico` + `lugar_figura` (§5.14)

Novos campos opcionais em `mostrar` (todos com padrão `true` para manter compatibilidade com as aulas existentes):

- `mostrar.dimensoes` (`boolean`, padrão `true`): controla a exibição da linha `a = ...; b = ...; c = ...` nos modos `elipse` e `hiperbole`.
- `mostrar.equacao` (`boolean`, padrão `true`): controla a exibição da equação `x² = 4py` no modo `parabola` (quando `false`, só aparece após o aluno acionar `Igualar distâncias`).

Correções visuais e de rótulos em `common/lugar/desenho.ts`:
- Parábola: rótulo `F` passa a ficar ao lado do foco (à direita quando `P.x <= 0`, à esquerda quando `P.x > 0`), evitando colisão tanto sobre o vértice `(0; 0)` quanto sob o pegador `P`.
- Parábola: chip de distância passa a exibir `PF = ...; Pd = ...` (em vez de `PF₁`).
- Elipse e hipérbole: quando `F₁` e `F₂` ficam próximos na tela (`< 56 px`), os rótulos são afastados horizontalmente (`±16 px`).
- Quando `focos: false`, `P` e os chips de distância (`PF₁/PF₂/Pd`, `Soma/Diferença`) ficam ocultos.

## 2. `pontos_no_plano` + `pontos_figura` (§5.15)

Novos campos opcionais (padrão = comportamento anterior):

- `mostrar.distancia` (`boolean`, padrão `true`): controla a exibição do chip `d = ...` no modo `segmento`.
- `rotulos` (`[string, string]`, padrão `["A", "B"]`): define os rótulos dos dois pontos na figura e na linha de coordenadas.

Correções em `common/pontos/`:
- Modo `segmento`: quando `mostrar.distancia` e `medio` estão ambos ativos, os dois chips (`d = ...` e `M(...)`) aparecem lado a lado, sem que `M` substitua `d`.
- Modo `reta`: oculta os botões `Quadrados` e `Ponto médio` no widget e o chip `d = ...` no canvas; destaca `m = ...; n = ...` no chip inferior; recorta a reta na caixa da malha (`cortarRetaNaCaixa`) para não invadir a área de rótulos.
- Arraste em `PontosWidget.tsx`: congela `getBoundingClientRect()` no `pointerdown` até `pointerup`/`pointercancel`, evitando que o ponto salte caso a fala de conclusão mude a altura acima do canvas durante o arraste. *(Obs.: reservar a altura do balão em `StepLayout.tsx`/`InteractiveCanvas.tsx` não foi alterado por estar fora dos arquivos permitidos.)*

## 3. `circunferencia_no_plano` + `circunferencia_figura` (§5.16)

Correções em `common/circunferencia/desenho.ts`:
- Rótulos `C` e `P` (`posicoesRotulosCP`): colocados em lados opostos conforme a posição relativa vertical de `P` e `C`, e afastados horizontalmente (`±14 px`) quando a distância em tela for menor que `36 px`, evitando que `P` cubra `C`.
- Equação da circunferência formatada sem parênteses/zeros sobrando (ex.: `x² + y² = 25`, `(x − 2)² + (y + 1)² = 25`).
- Texto de interseção com reta usa singular/plural correto (`1 ponto`, `2 pontos`, `0 pontos`).

## Passos de aula atualizados (`content/geometria/geometria-analitica/`)

- `plano-cartesiano-distancia-e-ponto-medio`: passo 2 `pitagoras` (`mostrar.distancia: false`); passo 5 `desafio-6-8` (`rotulos: ["O", "P"]`, `mostrar.distancia: false`).
- `elipse`: passo 3 `topo-e-pitagoras` (`mostrar.dimensoes: false`); passo 5 `desafio-focos` (`mostrar.dimensoes: false`).
- `hiperbole`: passo 3 `triangulo-invertido` (`mostrar.dimensoes: false`); passo 5 `desafio-focos` (`mostrar.dimensoes: false`).
- `parabola-conica`: passos 1 `vertice`, 2 `tracar` e 3 `igualar` (`mostrar.equacao: false`).

## plano_cartesiano: rótulos sem colisão

- Novo módulo puro em `src/widgets/common/rotulosPlano.ts` (`escolherPosicao`, `candidatosAoRedor`, `caixasColidem`, `dentroDosLimites`, `caixaDoCentro`) com testes unitários em `src/widgets/common/rotulosPlano.test.ts` cobrindo os casos de colisão e limites do canvas.
- `src/widgets/common/desenhoPlano.ts`:
  - Registra obstáculos dos pontos/alças/vértice/raízes antes do posicionamento de rótulos.
  - Ordena o posicionamento dos rótulos ancorados por prioridade (chips de ponto/espelho, depois raízes/vértice/encontro/intercepto/ângulo/fase/período, depois rótulos de guias e diagonal `y = x`), tentando posições alternativas livres dentro dos limites do canvas.
  - Posiciona os rótulos das curvas (`p.curvas`) por último contra a lista completa `ocupados` (tentando acima e abaixo da curva dentro da área útil), evitando sobreposição com chips de coordenadas e guias.
- `src/steps/ConceptLock.tsx` + `src/ui/styles.css` + `src/steps/ConceptLock.test.ts`:
  - `partesTextoFormula` converte subscritos Unicode consecutivos (ex.: `aₙ₋₁`, `logₐ(x)`) em `<sub>` de texto normal (`n−1`, `a`), evitando o glifo baixo de `₋` sem alterar os JSONs das aulas.
- Não resolvido nesta entrega: `numeros-complexos` `p3` (sobreposição parcial entre `z` e `w` em `vetores_no_plano`, fora da lista de arquivos permitidos).
