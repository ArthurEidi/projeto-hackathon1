# Correções B31b — widget `geometria_triangulo` modo `senos` (16/11/2026)

Escopo: seção **B31b** de `C:\Users\mkf10\projetos\briefing-b27.md` (`lei-dos-senos-e-cossenos` p3, `lei-dos-senos-2r`).
Capturas antes/depois em `C:\Users\mkf10\projetos\capturas-b31b` (e estado anterior em `C:\Users\mkf10\projetos\capturas-b27c\lei-dos-senos-e-cossenos-p3.png`).

## 1. Parâmetro `legenda` no modo `senos` e `antes_de_concluir` em `lei-dos-senos-e-cossenos` p3

- **Widget (`src/widgets/common/triangulo/params.ts`, `desenho.ts`):** acrescentado `legenda: z.boolean().default(true)` ao schema `Senos` (padrão `true` preserva integralmente o comportamento de todas as demais aulas). Em `dSenos`, o `rodape` (`a / sen A = …` e `2R = …`) só é desenhado quando `p.legenda` é `true`, mantendo `hh = h - banda(2)` para a figura não pular ao concluir.
- **Documentação:** `docs/GUIA-CAPITULOS.md` §5.10 atualizado com "Acréscimos de 16/11 (B31b)".
- **Teste (`src/widgets/common/triangulo/triangulo.test.ts`):** `"senos: legenda começa true e false oculta a divisão a / sen A no rodapé"`.
- **Aula (`content/geometria/trigonometria/lei-dos-senos-e-cossenos/aula-01.json`):** mantidas as falas originais do passo 3 (`lei-dos-senos-2r`) e adicionado `"antes_de_concluir": { "legenda": false }` (a métrica de conclusão `ang_a >= 90` vem do slider e não depende de `legenda`).
- **Prova visual (`capturas-b31b`):**
  - Estado inicial (`lei-dos-senos-e-cossenos-p3.png`): mostra apenas os dados (`30°`, `2R = 10`, `a = 5`), sem o rodapé `a / sen A = 5 / 0,5 = 10`.
  - Estado concluído (`lei-dos-senos-e-cossenos-p3-ang_a=90.png`): com `ang_a = 90`, aparecem `a / sen A = 10 / 1 = 10`, `2R = 10`, a fala `done` e o botão `CONTINUAR` verde.

## Validação

- `npx vitest run src/widgets/common/triangulo` + testes das 7 aulas que usam `geometria_triangulo` (`relacoes-metricas-triangulo-retangulo`, `semelhanca-e-teorema-de-tales`, `teorema-de-pitagoras`, `triangulos-congruencia-e-propriedades`, `triangulos-notaveis-e-construcoes`, `lei-dos-senos-e-cossenos`, `trigonometria-no-triangulo-retangulo`): **8 arquivos / 150 testes passando**.
- `npm run typecheck`: limpo (0 erros).
- `npm run lint:content`: `conteúdo ok` (0 erros).
