# Fontes candidatas — combinacoes-com-repeticao

Nenhuma questão adequada encontrada na varredura completa do ENEM 2015–2023 via `https://api.enem.dev` (sem imagens e com alternativas em texto). As provas do ENEM desse período não apresentaram questões puras de combinação com repetição (distribuição de itens idênticos em caixas distintas / método de bolinhas e barras) resolvíveis apenas com texto.


## Candidatas B40 (provas oficiais)

### Candidata 1 — ITA 2021, 1ª Fase, Questão 53
- **Banca / Ano / Fase:** ITA / 2021 / 1ª Fase
- **Número:** Questão 53
- **Página do PDF:** 16
- **Caminho local do PDF:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2021-1fase\prova.pdf`
- **Caminho local do gabarito:** `C:\Users\mkf10\projetos\provas-oficiais\ita-2021-1fase\gabarito.pdf`
- **URL oficial (prova):** `https://www.vestibular.ita.br/provas/2021_fase1.pdf`
- **URL oficial (gabarito):** `https://www.vestibular.ita.br/provas/gabarito_2021.pdf`
- **Depende de figura:** não
- **Enunciado:**
  Pretende-se distribuir 48 balas em 4 tigelas designadas pelas letras A, B, C e D. De quantas maneiras pode-se fazer essa distribuição de forma que todas as tigelas contenham ao menos 3 balas e a tigela B contenha a mesma quantidade que a tigela D.
- **Alternativas:**
  - A) 190.
  - B) 361.
  - C) 722.
  - D) 1083.
  - E) 1444.
- **Gabarito oficial:** B
- **Resolução:**
  Sejam `A, B, C, D ≥ 3` inteiros com `A + B + C + D = 48` e `B = D`. Fazendo `A = 3 + a'`, `B = D = 3 + b'`, `C = 3 + c'` com `a', b', c' ∈ ℤ≥0`, obtemos `a' + 2b' + c' = 36`.
  Para cada `b' ∈ {0, 1, ..., 18}`, temos `a' + c' = 36 − 2b'`, que possui `C(36 − 2b' + 1, 1) = 37 − 2b'` soluções inteiras não negativas.
  Somando para `b' = 0` até `18`: `37 + 35 + ... + 1 = 19² = 361`. Confere com o gabarito oficial **B**.
