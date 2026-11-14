# Fontes candidatas — lei-dos-senos-e-cossenos

## Questão 1
- **Banca / Ano / Questão:** ENEM 2023 — Questão 172
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/172
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/172 (`correctAlternative: "C"`)
- **Enunciado:**
  > Sejam _a_, _b_ e _c_ as medidas dos lados de um triângulo retângulo, tendo a como medida da hipotenusa. Esses valores _a_, _b_ e _c_ são, respectivamente, os diâmetros dos círculos _C1_ , _C2_ e _C3_, como apresentados na figura.
  >
  > ![](https://enem.dev/2023/questions/172/dcdd2743-6ad6-44e8-94ae-d2adec3a3400.png)
  >
  > Observe que essa construção assegura, pelo teorema de Pitágoras, que área (C1) = área (C2) + área (C3).
  >
  > Um professor de matemática era conhecedor dessa construção e, confraternizando com dois amigos em uma pizzaria onde são vendidas pizzas somente em formato de círculo, lançou um desafio: mesmo sem usar um instrumento de medição, poderia afirmar com certeza se a área do círculo correspondente à pizza que ele pedisse era maior, igual ou menor do que a soma das áreas das pizzas dos dois amigos. Assim, foram pedidas três pizzas. O professor as dividiu ao meio e formou um triângulo com os diâmetros das pizzas, conforme indicado na figura.
  >
  > ![](https://enem.dev/2023/questions/172/8bd02f79-d5fb-4b8d-9321-c57434be3374.png)
  >
  > A partir da medida do ângulo a, o professor afirmou que a área de sua pizza é maior do que a soma das áreas das outras duas pizzas.
  >
  > A área da pizza do professor de matemática é maior do que a soma das áreas das outras duas pizzas, pois
- **Alternativas:**
  - A) 0° < a < 90°
  - B) A = 90°
  - C) 90° < a < 180°
  - D) A = 180°
  - E) 180° < a < 360°
- **Gabarito:** C
- **Resumo para o app (adaptada):** Diâmetros a, b, c de três pizzas formam um triângulo com ângulo α oposto a "a". Para área(a) > área(b) + área(c), qual o intervalo de α?
- **Conferência matemática:** Área(a) > área(b) + área(c) equivale a a² > b² + c². Pela lei dos cossenos, a² = b² + c² - 2bc·cos(α); logo -2bc·cos(α) > 0 => cos(α) < 0 => 90° < α < 180°.
