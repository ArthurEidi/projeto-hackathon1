# Correções B25b — widgets `circunferencia_no_plano` e `geometria_poligono` (16/11/2026)

Escopo: os 2 itens da seção **B25b** em `C:\Users\mkf10\projetos\briefing-b25.md`.
Capturas antes/depois em `C:\Users\mkf10\projetos\capturas-b25\{antes,depois}`.

## 1. `circunferencia-equacao-e-posicoes` p4 (`reta-sobe`): ocultar ponto `P` e chip de distância

- **Widget (`src/widgets/common/circunferencia/params.ts`, `desenho.ts`):** acrescentado `mostrar: { ponto: boolean }` com padrão `true` (comportamento preservado em todos os demais passos). Quando `mostrar.ponto === false`, o desenho oculta o segmento `CP`, o pegador `P`, o alvo arrastável `"ponto"`, a etiqueta `"P"` e o chip `d = …; r = …`, mantendo `"C"`, a equação e o estado da reta (`Secante: 2 pontos`, etc.).
- **Documentação:** `docs/GUIA-CAPITULOS.md` §5.16 atualizado com "Acréscimos de 16/11".
- **Teste (`src/widgets/common/circunferencia/circunferencia.test.ts`):** `"mostrar.ponto começa true e false oculta P e o chip de distância"`.
- **Aula (`content/geometria/geometria-analitica/circunferencia-equacao-e-posicoes/aula-01.json`):** ligado `"mostrar": { "ponto": false }` apenas no passo 4 (`reta-sobe`).
- **Prova visual:** em `capturas-b25/depois/circunferencia-equacao-e-posicoes-p4.png` aparecem apenas `C`, `x² + y² = 9` e `Secante: 2 pontos` (sem `P`, `CP` nem `d = …`).

## 2. `angulos-retas-paralelas` p1 e p2 (`geometria_poligono` modo `paralelas`): afastar chips centrais e rótulo `t`

- **Conferência de escopo:** `angulos-retas-paralelas` é o único capítulo em `content/` que usa `modo: "paralelas"`.
- **Correção (`src/widgets/common/poligono/desenho.ts`, `dParalelas`):**
  - Mantida a distância radial original `raio + 18` dos 8 chips de ângulo (preservando os arcos coloridos visíveis e a separação entre `120°` e `60°` em p2 e p4).
  - Rótulo `t`: quando `p.foco` está ativo (p2), vai para a ponta inferior da transversal (`v.p(g.X2.x - u.x * 0.85 - 0.32, g.X2.y - u.y * 0.85)`), longe de `60°`, do arco tracejado e de `180°`; nos demais passos mantém a posição original acima.
  - Em `α ≈ 90°` (`!p.foco && Math.abs(g.alfa - 90) < 15`), os 4 chips centrais entre `r` e `s` (`r-sw`, `r-se`, `s-nw`, `s-ne`) recebem apenas deslocamento vertical `±10 px` (`-10` em `r`, `+10` em `s`).
- **Prova visual:** em `capturas-b25/depois/angulos-retas-paralelas-p1.png` a `p6.png`, os arcos coloridos seguem visíveis, nenhum chip cobre outro e `t` fica livre em todos os passos.

## Validação

- `npx vitest run src/widgets/common/poligono src/conteudo/angulos-retas-paralelas.test.ts`: **2 arquivos / 60 testes passando** (além de `circunferencia` + aula: **86/86** no total).
- `npm run typecheck`: limpo (0 erros).
- `npm run lint:content`: `conteúdo ok` (0 erros).
