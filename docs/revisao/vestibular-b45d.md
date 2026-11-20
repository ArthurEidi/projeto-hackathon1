# B45d: vestibular de provas oficiais (em andamento — parado)

Agente: Antigravity #4. Briefing: `C:\Users\mkf10\projetos\briefing-b45.md`.

## Estado exato em que parou

- **Nenhuma aula da frente B45d foi editada ainda.**
- Aulas da frente:
  1. `geometria/geometria-espacial/solidos-de-revolucao`
  2. `geometria/geometria-analitica/vetores-no-plano`
  3. `aritmetica/estatistica/quartis-percentis-e-boxplot`
  4. `algebra/equacoes-e-inequacoes/equacoes-irracionais`

## O que já foi feito

1. Leitura dos roteiros das 4 aulas em `docs/planos/` e dos referenciais `docs/revisao/vestibular-b42.md` e `docs/revisao/vestibular-b43.md`.
2. Download de provas adicionais para `C:\Users\mkf10\projetos\provas-oficiais\`:
   - `fuvest-2026-1fase` (`prova.pdf`, `gabarito.pdf`)
   - `fuvest-2012-1fase` (`prova.pdf`, `gabarito.pdf`)
   (Além das ~50 provas já existentes na pasta.)
3. Candidatas já conferidas no PDF oficial, resolvidas e verificadas no gabarito oficial para **`solidos-de-revolucao`**:
   - **UFRGS 2025, 1º dia, Q70** (p. 37): rotação de quadrado de lado $a$ em torno de uma diagonal gera dois cones colados pela base ($r = h = \frac{a\sqrt{2}}{2}$), $V = 2 \cdot \frac{1}{3}\pi r^2 h = \frac{a^3\pi\sqrt{2}}{6}$. Gabarito oficial (`ufrgs-2025-1dia/gabarito.html`): **(B)**. Sem figura necessária.
   - **UFRGS 2022, CV/2022, Q55** (p. 29): rotação de triângulo equilátero $ABC$ de lado $1$ em torno da reta $r$ por $A$ paralela a $BC$ gera cilindro ($r = \frac{\sqrt{3}}{2}, h = 1$) menos dois cones ($r = \frac{\sqrt{3}}{2}, h = \frac{1}{2}$): $V = \frac{3\pi}{4} − \frac{\pi}{4} = \frac{\pi}{2}$. Gabarito oficial (`ufrgs-2022-1dia/gabarito.html`): **(E)**. Sem figura necessária.
   - **ITA 2019, 1ª fase, Q47** (p. 17, reserva): trapézio retângulo ($h = 4\text{ cm}$, bases $5\text{ cm}$ e $9\text{ cm}$) girado no lado de $4\text{ cm}$ → tronco de cone ($V = \frac{604\pi}{3}$) em PA com esfera ($r = 5$, $V = \frac{500\pi}{3}$) e cilindro ($h = 11$, $V = 132\pi \Rightarrow R = 2\sqrt{3}$). Sem figura necessária.
   - **UFRGS 2024, 1º dia, Q55** (p. 36, reserva): trapézio $ABCD$ girado em torno de $AB$ → $V = \pi + \frac{2\pi}{3} = \frac{5\pi}{3}$.
4. Varredura em andamento/recém-lançada nos PDFs locais para `vetores-no-plano`, `quartis-percentis-e-boxplot` e `equacoes-irracionais` (nos 51 PDFs iniciais, uma busca preliminar retornou 0 acertos matemáticos para `quartis`/`boxplot` e `vetores`).

## O que falta fazer

1. Inserir as 2 questões aprovadas em `solidos-de-revolucao` (`aula-01.json`, `docs/planos/solidos-de-revolucao.md`, `src/conteudo/solidos-de-revolucao.test.ts`), verificar URLs oficiais (200 e tamanho igual ao local) e rodar `vitest` + `lint:content`.
2. Concluir a busca para `vetores-no-plano`, `quartis-percentis-e-boxplot` e `equacoes-irracionais` em pelo menos 4 bancas oficiais (Fuvest, UFRGS, UFPR, Unicamp, UERJ, UFSC, Unesp/Vunesp), baixar os PDFs oficiais faltantes e verificar candidatas, gabaritos, contas e nível (ou registrar onde procurou caso alguma fique vazia).
3. Rodar `npm run typecheck` e `npx vitest run` ao final e reportar com `maestri ask "Claude Code"`.
