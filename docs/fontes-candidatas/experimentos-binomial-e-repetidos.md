# Fontes candidatas — experimentos-binomial-e-repetidos

## Questão 1
- **Banca / Ano / Questão:** ENEM 2022 — Questão 137
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/137
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/137 (`correctAlternative: "C"`)
- **Imagens:** `public/vestibular/enem-2022-137-1.png` (fração 1/2 para a probabilidade de vitória em cada partida)
- **Enunciado:**
  > A World Series é a decisão do campeonato norte-americano de beisebol. Os dois times que chegam a essa fase jogam, entre si, até sete partidas. O primeiro desses times que completar quatro vitórias é declarado campeão.
  >
  > Considere que, em todas as partidas, a probabilidade de qualquer um dos dois times vencer é sempre ![](https://enem.dev/2022/questions/137/091aafba-f2dd-4f19-9655-73e6bd1599b6.png)
  >
  > Qual é a probabilidade de o time campeão ser aquele que venceu a primeira partida da World Series?
- **Alternativas:**
  - A) imagem: `public/vestibular/enem-2022-137-alt-A.png` (35/64)
  - B) imagem: `public/vestibular/enem-2022-137-alt-B.png` (40/64)
  - C) imagem: `public/vestibular/enem-2022-137-alt-C.png` (42/64)
  - D) imagem: `public/vestibular/enem-2022-137-alt-D.png` (44/64)
  - E) imagem: `public/vestibular/enem-2022-137-alt-E.png` (52/64)
- **Gabarito:** C
- **Resolução (feita antes de olhar o gabarito):** Como o time já venceu a primeira partida, ele precisa de pelo menos 3 vitórias nas próximas 6 partidas (equivalente a vencer 4 antes que o adversário vença 4, em ensaios independentes com p = 1/2). Pela distribuição binomial com n = 6 e p = 1/2, o total de resultados equiprováveis é 2^6 = 64, e o número de resultados com pelo menos 3 vitórias é C(6,3) + C(6,4) + C(6,5) + C(6,6) = 20 + 15 + 6 + 1 = 42. Logo, a probabilidade é 42/64.
- **Nível:** médio

## Questão 2
- **Banca / Ano / Questão:** ENEM 2009 — Questão 145
- **URL do enunciado:** https://api.enem.dev/v1/exams/2009/questions/145
- **URL do gabarito:** https://api.enem.dev/v1/exams/2009/questions/145 (`correctAlternative: "C"`)
- **Enunciado:**
  > O controle de qualidade de uma empresa fabricante de telefones celulares aponta que a probabilidade de um aparelho de determinado modelo apresentar defeito de fabricação é de 0,2%. Se uma loja acaba de vender 4 aparelhos desse modelo para um cliente, qual é a probabilidade de esse cliente sair da loja com exatamente dois aparelhos defeituosos?
- **Alternativas:**
  - A) 2 × (0,2%)⁴.
  - B) 4 × (0,2%)².
  - C) 6 × (0,2%)² × (99,8%)².
  - D) 4 × (0,2%).
  - E) 6 × (0,2%) × (99,8%).
- **Gabarito:** C
- **Resolução (feita antes de olhar o gabarito):** Em n = 4 ensaios independentes com probabilidade de defeito p = 0,2% e de não defeito 1 − p = 99,8%, a probabilidade de exatamente k = 2 aparelhos defeituosos segue a distribuição binomial: C(4, 2) × (0,2%)² × (99,8%)² = 6 × (0,2%)² × (99,8%)².
- **Nível:** fácil
