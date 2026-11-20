# B43: vestibular de provas oficiais para as aulas sem questão (19/11)

Agente: Claude Code #2. Briefing: `C:\Users\mkf10\projetos\briefing-b43.md`.

**Divisão (19/11, maestro):** a B43 ficou com 11 aulas. A leva 1 tem 7: `polinomios`, `raizes-polinomiais-e-multiplicidade`, `divisao-polinomial-e-teorema-do-resto`, `numeros-complexos`, `funcao-composta-e-inversa`, `determinantes-e-matriz-inversa` e `soma-da-pg-infinita`. A leva 2 tem 4: `valor-absoluto-e-distancia`, `elipse`, `posicoes-relativas-de-retas` e `inequacoes-produto-quociente`. As outras 14 aulas (trigonometria, geometria plana, funções modular, racional e transformações, sólidos de revolução, vetores, quartis e equações irracionais) foram para os Gemini na B45 e não foram tocadas aqui.

## Método

- Extraí com `pdftotext` o texto das 50 provas baixadas em `C:\Users\mkf10\projetos\provas-oficiais\` para buscar por palavra-chave: Fuvest 2018–2025, Unicamp 2019–2026, UFRGS 2022–2025, UFPR 2020–2025, ITA 2008–2026 e IME 2023–2026. O texto fica no scratchpad, fora do repositório.
- Para cada candidata, abri a página do PDF oficial renderizada (Chrome headless, como na B42) e o gabarito oficial: a prova comentada da Comvest, o PDF de gabarito da Fuvest ou da Unicamp 2022, ou a página de gabaritos da UFRGS. Também refiz a conta.
- Cada URL oficial foi testada: responde 200 e tem o mesmo tamanho em bytes da cópia local.
- A inserção segue o formato da B42:
  - o feedback de cada alternativa errada reconstrói o erro e dá a resposta certa;
  - `fonte` com `adaptada`/`adaptacao` e as URLs testadas;
  - um teste por questão no `src/conteudo/<slug>.test.ts`, que refaz a conta e confere o gabarito;
  - no roteiro `docs/planos/<slug>.md`, a questão ocupa uma vaga V, no formato que o `lint:planos` lê (tabela de opções), e as outras vagas seguem PENDENTE-FONTE.

## Leva 1: 9 questões em 7 aulas (inseridas)

| aula | questão (id) | página e gabarito oficial | conta refeita | veredito |
|---|---|---|---|---|
| polinomios | Unicamp 2026 Q45 (`unicamp-2026-grau-diferenca`) | p. 48 da prova comentada; b (4) | deg p + deg q = 8 e deg(p + q) = 3 ⇒ ambos de grau 4, com líderes opostos ⇒ grau de p − q = 4 | inserida (o roteiro trata de grau e de termos que se cancelam) |
| raizes-polinomiais-e-multiplicidade | Fuvest 2022, prova V, Q38 (`fuvest-2022-raiz-dupla`) | p. 11; E (−4) | (x − a)²(x − b): 2a + b = 0 e a²b = 2 ⇒ a = −1, b = 2, m = −3 ⇒ m + a = −4 | inserida |
| divisao-polinomial-e-teorema-do-resto | UFRGS 2025 Q64 (`ufrgs-2025-resto-xn`) | p. 34; C (2) | resto = p(1) = 1 − 1 + 2 = 2. Distratores: 4 = p(−1); 3 esquece o −x; 1 esquece o xⁿ; 0 supõe divisão exata | inserida |
| divisao-polinomial-e-teorema-do-resto | Unicamp 2022 Q23, provas Q/X (`unicamp-2022-divisivel`) | p. 8; gabarito Q/X: A (9) | p = (2x² − x + 4)(x + k) ⇒ a = 2k − 1, b = 4 − k, c = 4k ⇒ c + 2b − a = 9 para todo k | inserida |
| numeros-complexos | UFRGS 2024 Q49 (`ufrgs-2024-afirmacoes-complexos`) | p. 33; C (apenas I e II) | \|3 + 4i\| = 5; \|uv\| = \|2\| = 2 = √2 · √2; w real exige x = −4, e não 3 | inserida |
| funcao-composta-e-inversa | Unicamp 2023 Q51 (`unicamp-2023-inversa-mobius`) | p. 45; a (f⁻¹ = f) | y = (x + 1)/(x − 1) ⇒ x = (y + 1)/(y − 1). A alternativa b é a "inversa multiplicativa", erro citado pela própria Comvest; a d, f(−x), também é 1/f(x) | inserida |
| funcao-composta-e-inversa | Fuvest 2024, prova V, Q59 (`fuvest-2024-exp-inversa`) | p. 22; D (13/5) | b³ = 27/125 ⇒ b = 3/5; (9/25, k) em f⁻¹ ⇒ (3/5)^k = 9/25 ⇒ k = 2. A figura só destaca os dois pontos e foi descrita no enunciado | inserida |
| determinantes-e-matriz-inversa | Unicamp 2021 Q29 (`unicamp-2021-det-pa`) | p. 41; b (−2) | D = a(a + 3r) − (a + r)(a + 2r) = −2r² | inserida |
| soma-da-pg-infinita | Unicamp 2021 Q30 (`unicamp-2021-pg-1-2x`) | p. 42; b (2) | 4x² + 3x − 1 = 0; termos positivos ⇒ x = 1/4, razão 1/2, soma 2 | inserida |

As alternativas e os gabaritos oficiais foram mantidos. Os enunciados foram reescritos como pergunta curta (≤ 140 caracteres, até 2 frases). Na Q49 da UFRGS 2024, as afirmações foram postas numa frase só, com (I), (II) e (III).

Na Unicamp 2022 Q23, duas alternativas erradas (15 e 21) não correspondem a um erro de conta identificável. Os feedbacks delas refazem a expansão ou testam k = 0, que mostra que o resultado é 9 para qualquer quociente.

### URLs oficiais usadas (200 e mesmo tamanho da cópia local)

- Unicamp 2021 (prova comentada): https://www.comvest.unicamp.br/wp-content/uploads/2021/09/F1-Comentada-Conhec-Gerais-Exatas-Tecno-Humanas-Artes.pdf
- Unicamp 2022 (provas Q e X, 3.553.005 bytes): https://www.comvest.unicamp.br/vest2022/F1/f12022Q_X.pdf. Gabarito (63.895 bytes): https://www.comvest.unicamp.br/wp-content/uploads/2021/11/gabarito_2022_DIVULGA.pdf. Os dois links estão nas páginas "Provas 2022" e "Respostas esperadas 2022" de `vestibulares-anteriores/ingresso-2022/vestibular-2022/`.
- Unicamp 2023 (prova comentada, 5.718.122 bytes): https://www.comvest.unicamp.br/wp-content/uploads/2023/06/F1.pdf
- Unicamp 2026 (prova comentada, 7.882.756 bytes): https://www.comvest.unicamp.br/wp-content/uploads/2026/06/F1_2026_Prova-Q.pdf
- Fuvest 2022: https://www.fuvest.br/wp-content/uploads/fuvest_2022_primeira_fase_tipo_V.pdf e https://www.fuvest.br/wp-content/uploads/fuvest_2022_primeira_fase_gabarito_retificado.pdf
- Fuvest 2024: https://www.fuvest.br/wp-content/uploads/fuvest2024_primeira_fase_prova_V.pdf e https://www.fuvest.br/wp-content/uploads/fuvest2024_gabarito_primeira_fase_retificado_2023-11-24.pdf
- UFRGS 2024: https://www.ufrgs.br/coperse/wp-content/uploads/2023/12/1o-DIA-PROVA-2024.pdf e https://vestibular.ufrgs.br/cv2024/gabaritos/ (Q49 = C)
- UFRGS 2025: https://www.ufrgs.br/coperse/wp-content/uploads/2024/12/Prova-1o-DIA.pdf e https://vestibular.ufrgs.br/cv2025/gabaritos/ (Q64 = C)

### Validação da leva 1

- `lint:content`: sem erro nas 7 aulas. Na primeira versão, 8 textos tinham 3 frases e foram reescritos.
- `lint:planos`: as 7 aulas passam de "0 reais, 4 pend." para 1 ou 2 reais, sempre com 4 vagas V e status ok.
- vitest dos 7 capítulos: 83 testes passando. `tsc --noEmit`: ok.
- vitest completo: 2 133 de 2 134. A falha é em `transformacoes-graficos-de-funcoes` ("todas as falas respeitam as regras de texto"). Ela vem de trabalho da B45 ainda não publicado (arquivos dos Gemini modificados na árvore), fora desta frente.

## Leva 2 (próxima)

`valor-absoluto-e-distancia`, `elipse`, `posicoes-relativas-de-retas` e `inequacoes-produto-quociente`.
