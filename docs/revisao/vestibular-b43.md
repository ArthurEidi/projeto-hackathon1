# B43: vestibular de provas oficiais para as 25 aulas sem questão (em andamento, 19/11)

Agente: Claude Code #2. **Nenhuma aula foi editada ainda.** Este arquivo guarda o que já foi conferido, para a próxima sessão continuar daqui.

## Método

- Texto de todas as 50 provas baixadas extraído com `pdftotext`, para busca por palavra-chave (fica no scratchpad, fora do repositório).
- Cada candidata conferida na página renderizada do PDF oficial (Chrome headless, como na B42) e no gabarito oficial.
- URL oficial testada: 200 e mesmo tamanho em bytes da cópia local.

## Candidatas já conferidas (PDF, gabarito e conta)

| aula | questão | gabarito oficial | conta | veredito |
|---|---|---|---|---|
| polinomios | Unicamp 2026 Q45 (p. 48 da Prova Comentada) | B (4) | deg p + deg q = 8 e deg(p + q) = 3 ⇒ ambos de grau 4, com líderes opostos ⇒ grau de p − q = 4 | aprovada (o roteiro trata de cancelar termos e grau) |
| raizes-polinomiais-e-multiplicidade | Fuvest 2022, prova V, Q38 (p. 11) | E (−4) | (x − a)²(x − b): 2a + b = 0 e a²b = 2 ⇒ a = −1, b = 2, m = −3 ⇒ m + a = −4 | aprovada |
| divisao-polinomial-e-teorema-do-resto | UFRGS 2025 Q64 (p. 34) | C (2) | resto = p(1) = 1 − 1 + 2 = 2; distratores: 4 = p(−1), 3 esquece o −x, 1 esquece xⁿ, 0 supõe divisão exata | aprovada |
| divisao-polinomial-e-teorema-do-resto | Unicamp 2022 Q23 (p. 8; gabarito Q/X) | A (9) | p = (2x² − x + 4)(x + k) ⇒ a = 2k − 1, b = 4 − k, c = 4k ⇒ c + 2b − a = 9 para todo k | aprovada |
| numeros-complexos | UFRGS 2024 Q49 (p. 33) | C (apenas I e II) | \|3 + 4i\| = 5; \|uv\| = \|2\| = 2 = √2 · √2; w real exige x = −4, e não 3 | aprovada |
| funcao-composta-e-inversa | Unicamp 2023 Q51 (p. 45) | A (f⁻¹ = f) | y = (x + 1)/(x − 1) ⇒ x = (y + 1)/(y − 1); a alternativa b é a "inversa multiplicativa" (erro citado pela própria Comvest) | aprovada |
| funcao-composta-e-inversa | Fuvest 2024, prova V, Q59 (p. 22) | D (13/5) | b³ = 27/125 ⇒ b = 3/5; (9/25, k) em f⁻¹ ⇒ (3/5)^k = 9/25 ⇒ k = 2. A figura só mostra os dois pontos e cabe em texto | aprovada |
| determinantes-e-matriz-inversa | Unicamp 2021 Q29 (p. 41) | b (−2) | D = a(a + 3r) − (a + r)(a + 2r) = −2r² | aprovada |
| soma-da-pg-infinita | Unicamp 2021 Q30 (p. 42) | b (2) | 4x² + 3x − 1 = 0, termos positivos ⇒ x = 1/4, razão 1/2, soma 2 | aprovada |

## URLs oficiais já verificadas (200 e tamanho igual ao local)

- Unicamp 2021: https://www.comvest.unicamp.br/wp-content/uploads/2021/09/F1-Comentada-Conhec-Gerais-Exatas-Tecno-Humanas-Artes.pdf
- Fuvest 2022: https://www.fuvest.br/wp-content/uploads/fuvest_2022_primeira_fase_tipo_V.pdf e https://www.fuvest.br/wp-content/uploads/fuvest_2022_primeira_fase_gabarito_retificado.pdf
- Fuvest 2024: https://www.fuvest.br/wp-content/uploads/fuvest2024_primeira_fase_prova_V.pdf e https://www.fuvest.br/wp-content/uploads/fuvest2024_gabarito_primeira_fase_retificado_2023-11-24.pdf
- UFRGS 2024 e 2025: as mesmas da B42 (`docs/revisao/vestibular-b42.md`).
- **Faltam:** Unicamp 2022, 2023 e 2026. As páginas por ano da Comvest ficam em `https://www.comvest.unicamp.br/vestibulares-anteriores/` e `…/1a-fase-2a-fase-comentadas/`. Os tamanhos locais são: 2022 prova 3.553.005 e gabarito 63.895; 2023 prova 5.718.122; 2026 prova 7.882.756.

## Próximos passos

1. Achar e verificar as URLs da Unicamp 2022, 2023 e 2026.
2. Inserir as 9 aprovadas, como na B42: feedbacks reconstruindo cada erro, testes e bloco no roteiro.
3. Avisar a leva 1, que cobre as 7 aulas acima.
4. Nas provas locais não apareceu boa candidata para `funcao-modular`, `funcao-racional`, `transformacoes-graficos-de-funcoes`, trigonometria e geometria plana. Baixar mais provas oficiais: Fuvest de anos anteriores, Unesp, UERJ e UFPR de outros anos.
