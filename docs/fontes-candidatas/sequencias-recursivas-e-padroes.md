# Fontes candidatas — sequencias-recursivas-e-padroes

## Questão 1
- **Banca / Ano / Questão:** ENEM 2012 — Questão 150
- **URL do enunciado:** https://api.enem.dev/v1/exams/2012/questions/150
- **URL do gabarito:** https://api.enem.dev/v1/exams/2012/questions/150 (`correctAlternative: "B"`)
- **Enunciado:**
  > Jogar baralho é uma atividade que estimula o raciocínio. Um jogo tradicional é a Paciência, que utiliza 52 cartas. Inicialmente são formadas sete colunas com as cartas. A primeira coluna tem uma carta, a segunda tem duas cartas, a terceira tem três cartas, a quarta tem quatro cartas, e assim sucessivamente até a sétima coluna, a qual tem sete cartas, e o que sobra forma o monte, que são as cartas não utilizadas nas colunas.
  >
  > A quantidade de cartas que forma o monte é
- **Alternativas:**
  - A) 21.
  - B) 24.
  - C) 26.
  - D) 28.
  - E) 31.
- **Gabarito:** B
- **Resumo para o app (adaptada):** Num baralho de 52 cartas, montam-se 7 colunas com 1, 2, 3, ..., 7 cartas, e o restante forma o monte. Quantas cartas há no monte?
- **Conferência matemática:** Soma das 7 colunas = 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. Monte = 52 − 28 = 24 cartas. Gabarito B.

## Questão 2
- **Banca / Ano / Questão:** ENEM 2013 — Questão 173
- **URL do enunciado:** https://api.enem.dev/v1/exams/2013/questions/173
- **URL do gabarito:** https://api.enem.dev/v1/exams/2013/questions/173 (`correctAlternative: "A"`)
- **Enunciado:**
  > O ciclo de atividade magnética do Sol tem um período de 11 anos. O início do primeiro ciclo registrado se deu no começo de 1755 e se estendeu até o final de 1765. Desde então, todos os ciclos de atividade magnética do Sol têm sido registrados.
  >
  > Disponível em: http://g1.globo.com. Acesso em: 27 fev. 2013.
  >
  > No ano de 2101, o Sol estará no ciclo de atividade magnética de número
- **Alternativas:**
  - A) 32
  - B) 34
  - C) 33
  - D) 35
  - E) 31
- **Gabarito:** A
- **Resumo para o app (adaptada):** O ciclo solar dura 11 anos; o 1º ciclo começou em 1755 (1755–1765). Em 2101, em qual ciclo o Sol estará?
- **Conferência matemática:** 2101 − 1755 = 346 anos; 346 = 31·11 + 5, logo já se passaram 31 ciclos completos e 2101 está no 32º ciclo. Gabarito A.
