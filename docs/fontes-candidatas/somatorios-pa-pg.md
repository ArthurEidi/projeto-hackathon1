# Fontes candidatas — somatorios-pa-pg

## Questão 1 — ENEM 2018, Questão 162
- **Banca / Ano / Número:** ENEM 2018 — Questão 162
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/162
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/162
- **Enunciado:**
  > Torneios de tênis, em geral, são disputados em sistema de eliminatória simples. Nesse sistema, são disputadas partidas entre dois competidores, com a eliminação do perdedor e promoção do vencedor para a fase seguinte. Dessa forma, se na 1ª fase o torneio conta com 2n competidores, então na 2ª fase restarão n competidores, e assim sucessivamente até a partida final.
  >
  > Em um torneio de tênis, disputado nesse sistema, participam 128 tenistas.
  >
  > Para se definir o campeão desse torneio, o número de partidas necessárias é dado por
- **Alternativas:**
  - A) 2 X 128
  - B) 64 + 32 + 16 + 8 + 4 + 2
  - C) 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1
  - D) 128 + 64 + 32 + 16 + 8 + 4 + 2
  - E) 64 + 32 + 16 + 8+ 4 + 2+ 1
- **Gabarito:** E
- **Resumo para o app (adaptada, ≤ 140 caracteres / 2 frases):** Em um torneio eliminatório simples com 128 tenistas, quantas partidas são disputadas ao todo até definir o campeão?
- **Conta que confirma o gabarito:** Na 1ª fase há 128/2 = 64 jogos; na 2ª, 32; depois 16, 8, 4, 2 e 1 (final). O total é a soma de PG finita 64 + 32 + 16 + 8 + 4 + 2 + 1 (= 127).
