# Fontes candidatas — arranjos-e-combinacoes

## Questão 1
- **Banca / Ano / Questão:** ENEM 2019 — Questão 156 (caderno azul)
- **URL do enunciado:** https://api.enem.dev/v1/exams/2019/questions/156
- **URL do gabarito:** https://api.enem.dev/v1/exams/2019/questions/156 (`correctAlternative: "C"`)
- **Enunciado:**
  > Durante suas férias, oito amigos, dos quais dois são canhotos, decidem realizar um torneio de vôlei de praia. Eles precisam formar quatro duplas para a realização do torneio. Nenhuma dupla pode ser formada por dois jogadores canhotos.
  >
  > De quantas maneiras diferentes podem ser formadas essas quatro duplas?
- **Alternativas:**
  - A) 69
  - B) 70
  - C) 90
  - D) 104
  - E) 105
- **Gabarito:** C
- **Resumo para o app (adaptada):** Oito amigos, sendo dois canhotos, vão formar 4 duplas de vôlei sem juntar os dois canhotos na mesma dupla. De quantos modos formar as 4 duplas?
- **Conferência matemática:** O 1º canhoto escolhe um dos 6 destros (6 modos) e o 2º canhoto escolhe um dos 5 destros restantes (5 modos). Os 4 destros restantes formam 2 duplas de C(4,2)/2! = 3 modos. Total = 6 * 5 * 3 = 90 (ou pelo complementar: 105 - 15 = 90).

## Questão 2
- **Banca / Ano / Questão:** UNESP — Questão clássica (citada como exercício 64 na lista do Professor Guru)
- **URL do enunciado:** https://www.professorguru.com.br/estatistica/analise-combinatoria-2.html
- **URL do gabarito:** https://www.professorguru.com.br/estatistica/analise-combinatoria-2.html (`Respostas dos Exercícios: 64. D`)
- **Enunciado:**
  > Sobre uma reta marcam-se 3 pontos e sobre outra reta, paralela à primeira, marcam-se 5 pontos. O número de triângulos que obteremos unindo 3 quaisquer desses 8 pontos é:
- **Alternativas:**
  - a) 26
  - b) 90
  - c) 25
  - d) 45
  - e) 42
- **Gabarito:** D
- **Resumo para o app (adaptada):** Em duas retas paralelas há 3 pontos em uma e 5 na outra. Quantos triângulos podem ser formados unindo 3 desses 8 pontos?
- **Conferência matemática:** Escolhendo 1 ponto da primeira reta e 2 da segunda, ou 2 da primeira e 1 da segunda: C(3,1) * C(5,2) + C(3,2) * C(5,1) = 3 * 10 + 3 * 5 = 30 + 15 = 45 (ou C(8,3) - C(3,3) - C(5,3) = 56 - 1 - 10 = 45).

## Questão 3
- **Banca / Ano / Questão:** UEL — Questão clássica (citada como exercício 84 na lista do Professor Guru)
- **URL do enunciado:** https://www.professorguru.com.br/estatistica/analise-combinatoria-2.html
- **URL do gabarito:** https://www.professorguru.com.br/estatistica/analise-combinatoria-2.html (`Respostas dos Exercícios: 84. B`)
- **Enunciado:**
  > Um professor de Matemática comprou dois livros para premiar dois alunos de uma classe de 42 alunos. Como são dois livros diferentes, de quantos modos distintos pode ocorrer a premiação?
- **Alternativas:**
  - a) 861
  - b) 1722
  - c) 1764
  - d) 3444
  - e) 242
- **Gabarito:** B
- **Resumo para o app (adaptada):** Um professor vai premiar dois alunos de uma turma de 42 com dois livros diferentes. De quantos modos distintos pode ocorrer a premiação?
- **Conferência matemática:** Como os dois livros são diferentes e vão para dois alunos distintos, trata-se de arranjo simples: A(42, 2) = 42 * 41 = 1 722.
