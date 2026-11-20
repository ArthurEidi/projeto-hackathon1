# Conferência Visual B48 — Questões de Vestibular (19/11, B42/B43/B45)

- **Viewport:** `400 × 860` (Chrome headless via CDP sobre `npx vite --port 5296 --strictPort`)
- **Escopo:** 37 questões de vestibular inseridas desde 19/11 (28 aulas; `fonte.banca` não-ENEM cruzado com `docs/revisao/vestibular-b42.md`, `vestibular-b43.md` e `vestibular-b45*.md`; 10 questões anteriores a 19/11 ficaram de fora).
- **Estados capturados por questão:** antes de responder (`antes`) e após selecionar uma alternativa errada e clicar em `Verificar` (`errada`), totalizando **74 capturas** em `C:\Users\mkf10\projetos\capturas-b48`.
- **Critérios verificados (DOM + inspeção visual das 74 imagens):** enunciado cortado, alternativas que não cabem ou rolam para fora, fórmula quebrada, feedback cortado e fala do mascote que entrega a resposta.
- **Resultado geral:** **0 problemas bloqueantes** nos 5 critérios em todas as 37 questões (`scrollWidth <= 400`, `scrollHeight <= 860`, `fbBottom <= 860`, sem cortes nem entrega de resposta).

| aula | id | problema | captura |
| :--- | :--- | :--- | :--- |
| `equacoes-exponenciais` | `ufpr-2024-bolo` | Nenhum | `equacoes-exponenciais-ufpr-2024-bolo-{antes,errada}.png` |
| `equacoes-logaritmicas` | `ufrgs-2022-log2` | Nenhum | `equacoes-logaritmicas-ufrgs-2022-log2-{antes,errada}.png` |
| `equacoes-modulares` | `ufrgs-2022-area-modulos` | Nenhum | `equacoes-modulares-ufrgs-2022-area-modulos-{antes,errada}.png` |
| `equacoes-quadraticas` | `ufpr-2025-b-mais-c` | Nenhum | `equacoes-quadraticas-ufpr-2025-b-mais-c-{antes,errada}.png` |
| `equacoes-quadraticas` | `ufrgs-2024-potencia-raizes` | Nenhum | `equacoes-quadraticas-ufrgs-2024-potencia-raizes-{antes,errada}.png` |
| `expressoes-algebricas-e-produtos-notaveis` | `fuvest-2020-cubos` | Nenhum | `expressoes-algebricas-e-produtos-notaveis-fuvest-2020-cubos-{antes,errada}.png` |
| `expressoes-algebricas-e-produtos-notaveis` | `ufrgs-2022-afirmacoes-raizes` | Nenhum | `expressoes-algebricas-e-produtos-notaveis-ufrgs-2022-afirmacoes-raizes-{antes,errada}.png` |
| `fatoracao-algebrica` | `ufrgs-2022-inverso-raizes` | Nenhum | `fatoracao-algebrica-ufrgs-2022-inverso-raizes-{antes,errada}.png` |
| `fatoracao-algebrica` | `ufpr-2023-triplas` | Nenhum | `fatoracao-algebrica-ufpr-2023-triplas-{antes,errada}.png` |
| `inequacoes-modulares` | `unicamp-2025-modulos` | Nenhum | `inequacoes-modulares-unicamp-2025-modulos-{antes,errada}.png` |
| `inequacoes-produto-quociente` | `ufrgs-2018-cubo-raiz` | Nenhum | `inequacoes-produto-quociente-ufrgs-2018-cubo-raiz-{antes,errada}.png` |
| `inequacoes-quadraticas` | `unicamp-2025-composta` | Nenhum | `inequacoes-quadraticas-unicamp-2025-composta-{antes,errada}.png` |
| `funcao-composta-e-inversa` | `unicamp-2023-inversa-mobius` | Nenhum | `funcao-composta-e-inversa-unicamp-2023-inversa-mobius-{antes,errada}.png` |
| `funcao-composta-e-inversa` | `fuvest-2024-exp-inversa` | Nenhum | `funcao-composta-e-inversa-fuvest-2024-exp-inversa-{antes,errada}.png` |
| `funcao-modular` | `uerj-cbmerj-2025-modular` | Nenhum | `funcao-modular-uerj-cbmerj-2025-modular-{antes,errada}.png` |
| `transformacoes-graficos-de-funcoes` | `ufrgs-2025-grafico-v` | Nenhum (observação menor: `g(x) = 3f(x + 3) − 3` quebra o `3` final na 2ª linha do botão, sem corte) | `transformacoes-graficos-de-funcoes-ufrgs-2025-grafico-v-{antes,errada}.png` |
| `determinantes-e-matriz-inversa` | `unicamp-2021-det-pa` | Nenhum | `determinantes-e-matriz-inversa-unicamp-2021-det-pa-{antes,errada}.png` |
| `divisao-polinomial-e-teorema-do-resto` | `ufrgs-2025-resto-xn` | Nenhum | `divisao-polinomial-e-teorema-do-resto-ufrgs-2025-resto-xn-{antes,errada}.png` |
| `divisao-polinomial-e-teorema-do-resto` | `unicamp-2022-divisivel` | Nenhum | `divisao-polinomial-e-teorema-do-resto-unicamp-2022-divisivel-{antes,errada}.png` |
| `numeros-complexos` | `ufrgs-2024-afirmacoes-complexos` | Nenhum | `numeros-complexos-ufrgs-2024-afirmacoes-complexos-{antes,errada}.png` |
| `polinomios` | `unicamp-2026-grau-diferenca` | Nenhum | `polinomios-unicamp-2026-grau-diferenca-{antes,errada}.png` |
| `raizes-polinomiais-e-multiplicidade` | `fuvest-2022-raiz-dupla` | Nenhum | `raizes-polinomiais-e-multiplicidade-fuvest-2022-raiz-dupla-{antes,errada}.png` |
| `soma-da-pg-infinita` | `unicamp-2021-pg-1-2x` | Nenhum | `soma-da-pg-infinita-unicamp-2021-pg-1-2x-{antes,errada}.png` |
| `valor-absoluto-e-distancia` | `unicamp-2026-primos-distancia` | Nenhum | `valor-absoluto-e-distancia-unicamp-2026-primos-distancia-{antes,errada}.png` |
| `binomio-de-newton` | `ita-2025-termo-independente` | Nenhum | `binomio-de-newton-ita-2025-termo-independente-{antes,errada}.png` |
| `binomio-de-newton` | `ita-2018-pg-binomio` | Nenhum | `binomio-de-newton-ita-2018-pg-binomio-{antes,errada}.png` |
| `combinacoes-com-repeticao` | `ita-2021-balas` | Nenhum | `combinacoes-com-repeticao-ita-2021-balas-{antes,errada}.png` |
| `leitura-de-tabelas-e-graficos` | `ufrgs-2022-tempo-medio` | Nenhum | `leitura-de-tabelas-e-graficos-ufrgs-2022-tempo-medio-{antes,errada}.png` |
| `elipse` | `ufrgs-2019-losango-elipse` | Nenhum | `elipse-ufrgs-2019-losango-elipse-{antes,errada}.png` |
| `parabola-conica` | `ita-2009-parabola` | Nenhum | `parabola-conica-ita-2009-parabola-{antes,errada}.png` |
| `posicoes-relativas-de-retas` | `unicamp-2021-mediatriz` | Nenhum | `posicoes-relativas-de-retas-unicamp-2021-mediatriz-{antes,errada}.png` |
| `equacoes-trigonometricas` | `ita-2017-sec-cossec` | Nenhum | `equacoes-trigonometricas-ita-2017-sec-cossec-{antes,errada}.png` |
| `equacoes-trigonometricas` | `ufpr-2020-mare` | Nenhum | `equacoes-trigonometricas-ufpr-2020-mare-{antes,errada}.png` |
| `formulas-de-adicao-e-arco-duplo` | `ufpr-2025-cos-2x` | Nenhum | `formulas-de-adicao-e-arco-duplo-ufpr-2025-cos-2x-{antes,errada}.png` |
| `formulas-de-adicao-e-arco-duplo` | `ufrgs-2022-sen-2a` | Nenhum | `formulas-de-adicao-e-arco-duplo-ufrgs-2022-sen-2a-{antes,errada}.png` |
| `identidades-trigonometricas` | `unicamp-2025-sen-pi12` | Nenhum | `identidades-trigonometricas-unicamp-2025-sen-pi12-{antes,errada}.png` |
| `identidades-trigonometricas` | `ufpr-2024-soma-quadrado` | Nenhum | `identidades-trigonometricas-ufpr-2024-soma-quadrado-{antes,errada}.png` |
