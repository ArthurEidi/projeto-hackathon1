# Fontes candidatas — `fatorial-e-permutacoes`

Nenhuma questão adequada encontrada na janela ENEM 2015–2023 da `api.enem.dev` que cobre diretamente fatorial ou permutações exclusivamente em texto (sem imagem ou alternativas em imagem).

## Questão 1 (cache ENEM, 14/11)
- **Banca / Ano / Questão:** ENEM 2011 — Questão 174
- **URL do enunciado:** https://api.enem.dev/v1/exams/2011/questions/174
- **URL do gabarito:** https://api.enem.dev/v1/exams/2011/questions/174 (`correctAlternative: "E"`)
- **Enunciado:**
  > O setor de recursos humanos de uma empresa vai realizar uma entrevista com 120 candidatos a uma vaga de contador. Por sorteio, eles pretendem atribuir a cada candidato um número, colocar a lista de números em ordem numérica crescente e usá-la para convocar  
  > os interessados. Acontece que, por um defeito do computador, foram gerados números com 5 algarismos distintos e, em nenhum deles, apareceram dígitos pares.
  >
  > Em razão disso, a ordem de chamada do candidato que tiver recebido o número 75 913 é
- **Alternativas:**
  - A) 24
  - B) 31
  - C) 32
  - D) 88
  - E) 89
- **Gabarito:** E
- **Resumo para o app (adaptada):** Formam-se números de 5 algarismos distintos ímpares {1,3,5,7,9} em ordem crescente. Qual é a posição do número 75.913?
- **Conferência matemática:** Iniciados por 1, 3 ou 5: 3·4! = 72; por 71 ou 73: 2·3! = 12; por 751 ou 753: 2·2! = 4. Total antes = 88; 75.913 é o 89º. Gabarito E.

## Questão 2 (cache ENEM, 14/11)
- **Banca / Ano / Questão:** ENEM 2012 — Questão 144
- **URL do enunciado:** https://api.enem.dev/v1/exams/2012/questions/144
- **URL do gabarito:** https://api.enem.dev/v1/exams/2012/questions/144 (`correctAlternative: "A"`)
- **Enunciado:**
  > O diretor de uma escola convidou os 280 alunos de terceiro ano a participarem de uma brincadeira. Suponha que existem 5 objetos e 6 personagens numa casa de 9 cômodos; um dos personagens esconde um dos objetos em um dos cômodos da casa. O objetivo da brincadeira é adivinhar qual objeto foi escondido por qual personagem e em qual cômodo da casa o objeto foi escondido.
  >
  > Todos os alunos decidiram participar. A cada vez um aluno é sorteado e dá a sua resposta. As respostas devem ser sempre distintas das anteriores, e um mesmo aluno não pode ser sorteado mais de uma vez. Se a resposta do aluno estiver correta, ele é declarado vencedor e a brincadeira é encerrada.
  >
  > O diretor sabe que algum aluno acertará a resposta porque há
- **Alternativas:**
  - A) 10 alunos a mais do que possíveis respostas distintas.
  - B) 20 alunos a mais do que possíveis respostas distintas.
  - C) 119 alunos a mais do que possíveis respostas distintas.
  - D) 260 alunos a mais do que possíveis respostas distintas.
  - E) 270 alunos a mais do que possíveis respostas distintas.
- **Gabarito:** A
- **Resumo para o app (adaptada):** Um jogo sorteia 1 de 5 objetos, 1 de 6 personagens e 1 de 9 cômodos. Com 280 alunos dando palpites distintos, quantos alunos sobram?
- **Conferência matemática:** Total de respostas distintas = 5·6·9 = 270; 280 − 270 = 10 alunos a mais do que respostas possíveis. Gabarito A.

## Questão 3 (cache ENEM, 14/11)
- **Banca / Ano / Questão:** ENEM 2009 — Questão 165
- **URL do enunciado:** https://api.enem.dev/v1/exams/2009/questions/165
- **URL do gabarito:** https://api.enem.dev/v1/exams/2009/questions/165 (`correctAlternative: "A"`)
- **Enunciado:**
  > Doze times se inscreveram em um torneio de futebol amador. O jogo de abertura do torneio foi escolhido da seguinte forma: primeiro foram sorteados 4 times para compor o Grupo A. Em seguida, entre os times do Grupo A, foram sorteados 2 times para realizar o jogo de abertura do torneio, sendo que o primeiro deles jogaria em seu próprio campo, e o segundo seria o time visitante.
  >
  > A quantidade total de escolhas possíveis para o Grupo A e a quantidade total de escolhas dos times do jogo de abertura podem ser calculadas através de
- **Alternativas:**
  - A) Uma combinação e um arranjo, respectivamente.
  - B) Um arranjo e uma combinação, respectivamente.
  - C) Um arranjo e uma permutação, respectivamente.
  - D) Duas combinações.
  - E) Dois arranjos.
- **Gabarito:** A
- **Resumo para o app (adaptada):** De 12 times sorteiam-se 4 para o Grupo A e, dentre esses 4, sorteiam-se mandante e visitante para a abertura. Quais contagens se aplicam?
- **Conferência matemática:** Escolher 4 sem ordem = combinação; escolher 2 com ordem (mandante e visitante) = arranjo. Gabarito A.
