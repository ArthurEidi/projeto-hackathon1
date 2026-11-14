# Fontes candidatas — circunferencia-equacao-e-posicoes

## Questão 1
- **Banca / Ano / Questão:** ENEM 2018 — Questão 138
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/138
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/138 (`correctAlternative: "E"`)
- **Enunciado:**
  > Um jogo pedagógico utiliza-se de uma interface algébrico-geométrica do seguinte modo: os alunos devem eliminar os pontos do plano cartesiano dando “tiros”, seguindo trajetórias que devem passar pelos pontos escolhidos. Para dar os tiros, o aluno deve escrever em uma janela do programa a equação cartesiana de uma reta ou de uma circunferência que passa pelos pontos e pela origem do sistema de coordenadas. Se o tiro for dado por meio da equação da circunferência, cada ponto diferente da origem que for atingido vale 2 pontos. Se o tiro for dado por meio da equação de uma reta, cada ponto diferente da origem que for atingido vale 1 ponto. Em uma situação de jogo, ainda restam os seguintes pontos para serem eliminados: A(0 ; 4), 6(4 ; 4), C(4 ; 0), D(2 ; 2) e E(0; 2).
  >
  > ![](https://enem.dev/2018/questions/138/da8a254c-332c-4417-b998-1bde73398c79.png)
  >
  > Passando pelo ponto A, qual equação forneceria a maior pontuação?
- **Alternativas:**
  - A) X = 0
  - B) Y = 0
  - C) X² + y² =16
  - D) X² + (y-2)² = 4
  - E) (x -2 )² + ( y - 2 )² = 8
- **Gabarito:** E
- **Resumo para o app (adaptada):** Reta=1pt, circ=2pts por ponto além de O(0,0): A(0,4),B(4,4),C(4,0),D(2,2),E(0,2). Qual equação passa por O e A com mais pontos?
- **Conferência matemática:** A: x=0 passa por O, A, E (2 pts). B: y=0 não passa por A. C: x²+y²=16 não passa por O. D: x²+(y-2)²=4 passa por O, A, D (2·2=4 pts). E: (x-2)²+(y-2)²=8 passa por O, A, B, C (3·2=6 pts). Maior pontuação: alternativa E.
