# B52: os três detalhes da B49 (D1–D3)

Feito em 20/11/2026. Origem: `docs/visual/produto-b49.md`, detalhes D1, D2 e D3. Arquivos alterados: `src/App.tsx` (D3) e `src/ui/styles.css` (D1 e D2). Nenhum widget, nenhum conteúdo e nenhum arquivo de `src/engine/` mudou; `src/widgets/common/index.ts` não precisou ser tocado.

Capturas em `C:\Users\mkf10\projetos\capturas-b52\` (`antes/` e `depois/`).

## Como foi medido

- **Antes:** build do commit publicado `87c5070`, em uma cópia limpa.
- **Depois:** o mesmo commit com só os dois arquivos da B52 por cima.
- **Servidor:** `vite preview`, com as duas versões servidas ao mesmo tempo e medidas alternadamente.
- **Navegador:** Chrome headless via CDP, com perfil novo a cada rodada e cache desligado. No celular (`400 × 860`) o toque é emulado, ou seja, `(hover: none)`.
- **"JS inicial":** os arquivos `.js` cujo download começou antes de a trilha (`.home`) aparecer.
- **"Primeira tela":** o instante em que `.home` entra no DOM.
- **FCP:** `first-contentful-paint`.
- **Valores:** mediana de 7 rodadas, primeira visita (`localStorage` vazio).

## D3: chunk principal de 711 kB

**O que pesava.** O sourcemap do build mostrou a atribuição de bytes do `index-*.js` (728,5 kB):

| Origem | kB |
|---|---|
| `react-dom` | 202,6 |
| Widgets de `src/widgets/common/` (grade 38,1, sólido 37,7, barras 32,5, triângulo 29,1, polígono 21,0, ciclo 15,1, …) | ≈ 303 |
| `zod` | 92,7 |
| `src/engine/content.ts` (inclui a taxonomia) | 17,1 |

Os widgets entravam na trilha porque `App.tsx` importava o `LessonPlayer` direto. Pela cadeia `StepRenderer` → passos → `widgets/registry`, todos os widgets, os passos e o treino iam para o chunk inicial, embora a trilha não use nenhum deles.

**O que mudou.** O `LessonPlayer` passou a ser carregado com `React.lazy` + `Suspense`, num chunk próprio:
- A trilha abre sem ele.
- Numa rota de aula, ele baixa junto com o JSON da aula, e a tela é a mesma "Carregando aula…" de antes.
- Na trilha, ele é pré-carregado quando o navegador fica ocioso (`requestIdleCallback`, com `setTimeout` de reserva), para o primeiro toque numa aula não esperar a rede.

**Build:**

| Arquivo | Antes | Depois |
|---|---|---|
| `index-*.js` (inicial) | 728,49 kB (229,41 kB gzip) | **433,48 kB (126,80 kB gzip)** |
| `LessonPlayer-*.js` (sob demanda) | não existia | 295,61 kB (104,29 kB gzip) |
| Aviso do Vite de chunk acima de 500 kB | aparecia | não aparece mais |

**Primeira tela, `400 × 860`, primeira visita:**

| Medida | Antes | Depois |
|---|---|---|
| JS inicial (bruto / transferido) | 711,4 / 222,4 kB, 1 arquivo | **423,3 / 123,1 kB, 1 arquivo** (−40% / −45%) |
| Localhost: FCP / primeira tela | 828 / 618 ms | 852 / 690 ms |
| 4G lento + CPU 4×: FCP / primeira tela | 4.164 / 3.715 ms | **3.116 / 2.458 ms** (−25% / −34%) |

- Em localhost a diferença fica dentro do ruído. Uma rodada anterior deu 776 → 636 ms de FCP: as medianas oscilam ±150 ms entre execuções.
- O ganho aparece onde a rede pesa. O perfil "Slow 4G" do DevTools usa 150 ms de latência e ~1,6 Mbit/s.

**Aula continua abrindo** (`400 × 860`, 0 exceções JavaScript):
- Carga fria direto em `#/aula/algebra/funcoes/funcao-quadratica/aula-01`: baixou `LessonPlayer` + o chunk da aula, e o gráfico apareceu. Captura `depois/D3-aula-fria-400.png`.
- Trilha → toque na Aula 01: abriu `sistemas-numericos-e-divisibilidade` com o widget. Captura `depois/D3-aula-toque-400.png`.

**O que sobrou no chunk inicial (422,7 kB):**
- `react-dom`: 202,2 kB.
- `zod`: 92,7 kB.
- `content.ts`: 17,1 kB.
- Schemas de parâmetros dos widgets: poucos kB.

O `zod` fica porque `src/engine/content.ts` valida `taxonomy.json` com `Taxonomy.parse` ao abrir o app. **Próximo passo possível, fora desta frente** (`src/engine/` é da Máquina A): validar a taxonomia só no `lint:content` e no teste, deixando o `zod` para o chunk da aula. A aula também usa `Lesson.safeParse`. Isso tiraria mais ~90 kB brutos da primeira tela.

## D1: grade de 12 matérias empurrando a trilha para baixo da dobra

**Solução.** As matérias viraram uma **faixa horizontal rolável**:
- Os sprites, o contorno da matéria atual e o foco são os mesmos de antes.
- A faixa vai de borda a borda da coluna, e cada botão tem 148 px. A próxima matéria aparece cortada na borda, sinal de que a faixa rola.
- `scroll-snap` alinha os botões.
- No celular (`hover: none`) a barra de rolagem fica escondida. No desktop fica uma barra fina, para quem usa mouse.

Escolhi a faixa em vez de "recolher depois da primeira escolha" porque ela não muda nenhum comportamento: Matemática continua selecionada e à esquerda, as outras 11 continuam a um deslize, e o aviso "está em produção" é o mesmo.

**Posição do botão da Aula 01** (topo, em px, contado do início da trilha):

| Tela | Antes | Depois |
|---|---|---|
| `400 × 860`, volta ao app (saudação curta) | 870 (abaixo da dobra) | **546 (acima da dobra)** |
| `400 × 860`, primeira visita (boas-vindas) | 1.177 | 853 |
| `1280 × 800`, volta ao app | 652 | 521 |

- Altura das matérias: de ~430 px (grade 2 × 6) para **63 px** (uma faixa).
- Na primeira visita a Aula 01 fica na borda da dobra. O botão "Vamos lá" das boas-vindas, que leva à primeira aula (B49 A1), continua visível.

**Conferido:**
- 12 botões na faixa, alcançáveis.
- Rolar até o fim e tocar em Educação Física mostra o aviso de matéria em produção. Captura `depois/D1-faixa-fim-400.png`.
- Tocar em Matemática volta a mostrar os pilares.
- 0 px de rolagem horizontal da página em todas as capturas.

## D2: barra de rolagem solta no desktop

Em telas a partir de 520 px:
- O `body` ganha o fundo `var(--surface)` (#F7F7F7).
- A coluna `.app` ganha bordas laterais de 2 px em `var(--line)`, virando um cartão branco.
- A barra de rolagem da trilha fica fina e presa à borda direita da coluna, em vez de flutuar sobre o branco.

Celular sem mudança. Antes e depois em `antes/1280-volta.png` e `depois/1280-volta.png`.

## Validação

Validação na cópia com a B52 (commit `87c5070` + os 2 arquivos):

| Comando | Resultado |
|---|---|
| `npm run typecheck` | ok |
| `npm run lint:content` | "conteúdo ok" |
| `npx vitest run` | 133 arquivos, 2.146 testes aprovados |
| `npm run build` | ok, sem o aviso de 500 kB |
| `node scripts/varre-aulas.mjs` completo (Vite dev) | **104 aulas, 560 passos e 104 treinos, 0 problemas** |

O `typecheck` também passa na árvore de trabalho real, que tem mudanças de outros agentes ainda não publicadas.

## Capturas

| `antes/` | `depois/` |
|---|---|
| `400-primeira-visita.png` | `400-primeira-visita.png` |
| `400-volta.png` | `400-volta.png` |
| `1280-volta.png` | `1280-volta.png` |
| | `D1-faixa-fim-400.png` |
| | `D3-aula-fria-400.png` |
| | `D3-aula-toque-400.png` |
