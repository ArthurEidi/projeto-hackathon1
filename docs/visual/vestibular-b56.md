# Conferência Visual B56 — Questões de Vestibular pós-B48

- **Viewport:** `400 × 860` (Chrome headless via CDP sobre `npx vite --port 5306 --strictPort`, script `C:\Users\mkf10\projetos\ferramentas-b48\captura-b56.mjs`)
- **Escopo verificado:** questões presentes no momento da varredura nas aulas pedidas (`inequacoes-trigonometricas`, `funcao-modular`, `solidos-de-revolucao`, `relacoes-metricas-triangulo-retangulo`). Até a conclusão desta conferência, `angulos-retas-paralelas`, `circunferencia-arcos-e-angulos`, `quartis-percentis-e-boxplot` e `equacoes-irracionais` estavam com `treino.vestibular` vazio (`0` questões).
- **Estados capturados por questão:** antes de responder (`antes`) e após selecionar uma alternativa errada e clicar em `Verificar` (`errada`), totalizando **10 capturas** em `C:\Users\mkf10\projetos\capturas-b56`.
- **Critérios verificados (DOM + inspeção visual das 10 imagens):** enunciado cortado, alternativas que não cabem ou rolam para fora, fórmula quebrada, feedback cortado e fala do mascote que entrega a resposta.
- **Resultado geral:** **0 problemas bloqueantes** nas 5 questões verificadas (`scrollWidth <= 400`, `scrollHeight <= 860`, `fbBottom <= 778`, sem cortes, sem overflow e sem entrega de resposta na fala).

| aula | id | problema | captura |
| :--- | :--- | :--- | :--- |
| `funcao-modular` | `uerj-cbmerj-2025-modular` | Nenhum | `funcao-modular-uerj-cbmerj-2025-modular-{antes,errada}.png` |
| `solidos-de-revolucao` | `ufrgs-2025-quadrado-diagonal` | Nenhum | `solidos-de-revolucao-ufrgs-2025-quadrado-diagonal-{antes,errada}.png` |
| `solidos-de-revolucao` | `ufrgs-2022-triangulo-paralela` | Nenhum | `solidos-de-revolucao-ufrgs-2022-triangulo-paralela-{antes,errada}.png` |
| `relacoes-metricas-triangulo-retangulo` | `ufrgs-2025-semicirculo-area` | Nenhum | `relacoes-metricas-triangulo-retangulo-ufrgs-2025-semicirculo-area-{antes,errada}.png` |
| `inequacoes-trigonometricas` | `ufu-2021-cos2x-ineq` | Nenhum (`[0; π/3] ∪ [5π/3; 2π]` quebra em 2 linhas no botão, sem corte) | `inequacoes-trigonometricas-ufu-2021-cos2x-ineq-{antes,errada}.png` |
