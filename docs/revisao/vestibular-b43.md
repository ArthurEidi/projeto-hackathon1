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

## Leva 2: 4 questões em 4 aulas (inseridas)

**Onde procurei:** as 50 provas locais, mais estas, baixadas nesta leva para `provas-oficiais/`:

- Unicamp 2016, 2017 e 2018: provas comentadas de matemática da 1ª fase, `comvest.unicamp.br/vest_anteriores/<ano>/download/comentadas/F1_matematica.pdf`;
- UFRGS 2016 a 2020: caderno de matemática, das páginas `ufrgs.br/coperse/cv-<ano>/`, com os gabaritos de `vestibular.ufrgs.br/cv<ano>/gabaritos/`.

No total foram 6 bancas: Fuvest, Unicamp, UFRGS, UFPR, ITA e IME.

| aula | questão (id) | página e gabarito oficial | conta refeita | veredito |
|---|---|---|---|---|
| valor-absoluto-e-distancia | Unicamp 2026 Q51 (`unicamp-2026-primos-distancia`) | p. 51 da prova comentada; c (7) | \|x − 5\| ≥ 2 ⇒ x ≤ 3 ou x ≥ 7; \|x − 11\| ≤ 9 ⇒ 2 ≤ x ≤ 20; primos 2, 3, 7, 11, 13, 17, 19. A alternativa a (5) ignora o módulo, erro citado pela Comvest; d (8) inclui o 5 | inserida |
| elipse | UFRGS 2019 Q45 (`ufrgs-2019-losango-elipse`) | p. 21 do caderno de matemática; gabarito C (12) | x²/4 + y²/9 = 1 corta os eixos em (±2; 0) e (0; ±3): losango de diagonais 4 e 6, área 12. A figura só marca os quatro cortes e foi descrita no enunciado | inserida |
| posicoes-relativas-de-retas | Unicamp 2021 Q31 (`unicamp-2021-mediatriz`) | p. 42–43 da prova comentada; a (2x − y = 3) | A = (4; 0), B = (0; 2), ponto médio (2; 1); a perpendicular a −1/2 tem inclinação 2 ⇒ 2x − y = 3. b tem a inclinação certa, mas não passa pelo ponto médio; d passa pelo ponto médio, mas não é perpendicular | inserida |
| inequacoes-produto-quociente | UFRGS 2018 Q29 (`ufrgs-2018-cubo-raiz`) | p. 13 do caderno de matemática; gabarito E | x³ > ∛x ⇔ x⁹ > x ⇔ x(x − 1)(x + 1)(x² + 1)(x⁴ + 1) > 0 ⇒ (−1; 0) ∪ (1; +∞). B é o conjunto com o sinal trocado; D esquece o fator x | inserida |

**Candidatas conferidas e não inseridas:**

- **UFRGS 2017 Q40** (posições relativas): as retas y = ax e y = −x + b se cortam num ponto de coordenadas negativas ⇒ a > 0 e b < 0 (D). A conta confere com o gabarito, mas a página oficial `vestibular.ufrgs.br/cv2017/gabaritos/` hoje dá 404. O gabarito só aparece numa cópia do Internet Archive, http://web.archive.org/web/20171219210439/http://vestibular.ufrgs.br:80/cv2017/gabaritos/, onde Matemática 40 = D. Fica de **reserva**: a regra pede URL oficial no ar. Se o maestro aceitar a cópia arquivada, ela entra como segunda questão da aula.
- **Unicamp 2017 Q23** (elipse): (2x + yi)(y + 2xi) = (4x² + y²)i = i ⇒ 4x² + y² = 1, uma elipse (a). Fica de reserva: o caminho até a elipse é um produto de números complexos, técnica de outra aula.
- **UFRGS 2017 Q37** (inequações): x² + 1 > x vale para todo x real (E). Recusada pelo tema: é uma inequação quadrática, não de produto ou quociente.
- **UFRGS 2016 Q47** (valor absoluto): \|x − 5\| ≤ 2 e \|y − 4\| ≤ 1 no plano. Recusada: as alternativas são regiões desenhadas, e a figura é a própria tarefa.

### Validação da leva 2

- `lint:content`: ok. Dois feedbacks da Q51 foram reescritos sem a barra de módulo, que quebrava a tabela do roteiro.
- `lint:planos`: as 4 aulas passam para "1 reais, 3 pend.", status ok.
- vitest dos 4 capítulos: 57 testes passando. `tsc --noEmit`: ok. vitest completo: 2 143 de 2 143.
- O `lint:planos` acusa 3 erros em `transformacoes-graficos-de-funcoes`, que vêm do trabalho da B45 ainda não publicado.

## Fechamento da B43

As 11 aulas da B43 receberam 13 questões oficiais: 9 na leva 1 e 4 na leva 2. Ficaram de reserva a UFRGS 2017 Q40 (gabarito só arquivado) e a Unicamp 2017 Q23 (técnica de outra aula).
