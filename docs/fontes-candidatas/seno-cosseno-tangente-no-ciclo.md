# Fontes candidatas — seno-cosseno-tangente-no-ciclo

## Questão 1
- **Banca / Ano / Questão:** ENEM 2009 — Questão 174
- **URL do enunciado:** https://api.enem.dev/v1/exams/2009/questions/174
- **URL do gabarito:** https://api.enem.dev/v1/exams/2009/questions/174 (`correctAlternative: "B"`)
- **Enunciado:**
  > Considere um ponto P em uma circunferência de raio r no plano cartesiano. Seja Q a projeção ortogonal de P sobre o eixo x, como mostra a figura, e suponha que o ponto P percorra, no sentido anti-horário, uma distância d ≤ r sobre a circunferência.
  >
  > ![](https://enem.dev/2009/questions/174/29dd5a77-8236-4be7-bdf2-fe2a3bfc482c.jpg)
  >
  > Então, o ponto Q percorrerá, no eixo x, uma distância dada por
- **Alternativas:**
  - A) R( 1 - sen d/r ).
  - B) R( 1 - cos d/r ).
  - C) R( 1 - tag d/r ).
  - D) Rsen (r/d).
  - E) Rcos (r/d).
- **Gabarito:** B
- **Resumo para o app (adaptada):** Na circunferência de raio r, o ponto P parte de (r, 0) e percorre arco d ≤ r no sentido anti-horário. Quanto anda sua projeção Q no eixo x?
- **Conferência matemática:** O ângulo central é θ = d/r rad. A coordenada x de Q passa de r para r·cos(d/r), logo Q percorre distância r - r·cos(d/r) = r(1 - cos(d/r)).
- **Observação:** Depende levemente de imagem para confirmar que P parte de (r, 0) sobre o eixo x.
