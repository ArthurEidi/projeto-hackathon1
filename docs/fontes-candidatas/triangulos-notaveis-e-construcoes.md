# Fontes candidatas — triangulos-notaveis-e-construcoes

## Questão 1
- **Banca / Ano / Questão:** ENEM 2021 — Questão 169
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/169
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/169 (`correctAlternative: "D"`)
- **Imagens:** `public/vestibular/enem-2021-169-1.png` (Figura 1: triângulo musical e Figura 2: triângulo equilátero de altura h = 8 cm)
- **Enunciado:**
  > O instrumento da percussão conhecido como triângulo é composto por uma barra fina de aço, dobrada em um formato que se assemelha a um triângulo, com uma abertura e uma haste, conforme ilustra a Figura 1.
  >
  > ![](https://enem.dev/2021/questions/169/d9c2223e-0155-480d-bfd2-0d0fd39cb200.png)
  >
  > Uma empresa de brindes promocionais contrata uma fundição para a produção de miniaturas de instrumentos desse tipo. A fundição produz, inicialmente, peças com o formato de uma triângulo equilátero de altura h, conforme ilustra a Figura 2. Após esse processo, cada peça é aquecida, deformando os cantos, e cortada em um dos vértices, dando origem à miniatura. Assuma que não ocorram perdas de material no processo de produção, de forma que o comprimento da barra utilizada seja igual ao perímetro do triângulo equilátero representado na Figura 2.
  >
  > Considere 1,7 como valor aproximado para √3.
  >
  > Nessas condições, o valor que mais se aproxima da medida do comprimento da barra, em centímetro, é:
- **Alternativas:**
  - A) 9,07.
  - B) 13,60.
  - C) 20,40.
  - D) 27,18.
  - E) 36,24.
- **Gabarito:** D
- **Resolução (feita antes de olhar o gabarito):** Em um triângulo equilátero de lado L e altura h = 8 cm, temos h = L*raiz(3)/2, logo L = 2h/raiz(3) = 16/raiz(3) = 16*raiz(3)/3. Usando raiz(3) = 1,7, temos L = 16*1,7/3 = 27,2/3 = 9,066... cm. O perímetro é 3L = 16*1,7 = 27,20 cm (ou 3*9,06 = 27,18 cm), cuja alternativa mais próxima é 27,18.
- **Nível:** fácil

## Questão 2
- **Banca / Ano / Questão:** ENEM 2018 — Questão 179
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/179
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/179 (`correctAlternative: "A"`)
- **Imagens:** `public/vestibular/enem-2018-179-1.png` (quadrado recoberto por triângulos retângulos isósceles, sendo o menor preto no canto inferior direito)
- **Enunciado:**
  > Um quebra-cabeça consiste em recobrir um quadrado com triângulos retângulos isósceles, como ilustra a figura.
  >
  > ![](https://enem.dev/2018/questions/179/f90ac045-3059-4503-a9c5-2275ede0c308.png)
  >
  > Uma artesã confecciona um quebra-cabeça como o descrito, de tal modo que a menor das peças é um triângulo retângulo isósceles cujos catetos medem 2 cm.
  >
  > ![](https://enem.dev/2018/questions/179/3fc75c6b-0e16-4686-857b-155ddd7ad50c.png) ![](https://enem.dev/2018/questions/179/5eabdb02-5a5d-4cc2-befb-903521158327.png) ![](https://enem.dev/2018/questions/179/6cbaacc0-e621-4e81-9314-bbd6d9120ad2.png)
  >
  > O quebra-cabeça, quando montado, resultará em um quadrado cuja medida do lado, em centímetro, é
- **Alternativas:**
  - A) imagem: `public/vestibular/enem-2018-179-alt-a.png`
  - B) imagem: `public/vestibular/enem-2018-179-alt-b.png`
  - C) imagem: `public/vestibular/enem-2018-179-alt-c.png`
  - D) imagem: `public/vestibular/enem-2018-179-alt-d.png`
  - E) imagem: `public/vestibular/enem-2018-179-alt-e.png`
- **Gabarito:** A
- **Resolução (feita antes de olhar o gabarito):** Colocando o canto inferior esquerdo do quadrado na origem (0,0) e o lado como L: o menor triângulo (preto, no canto inferior direito) tem catetos de 2 cm ao longo das bordas inferior e direita, com vértices em (L,0), (L-2,0) e (L,2) e hipotenusa 2*raiz(2). O triângulo claro adjacente tem catetos 2*raiz(2) com ângulo reto em (L-2,0) e hipotenusa horizontal de (L-4,2) a (L,2), medindo 4 cm. O triângulo claro médio acima dele tem ângulo reto em (L-4,2), cateto direito subindo a 45° até (L,6) (comprimento 4*raiz(2)) e hipotenusa horizontal de comprimento 8 cm em y = 6, cujo vértice esquerdo (L-8, 6) está sobre a diagonal principal y = x. Logo L - 8 = 6, donde L = 14 cm.
- **Nível:** médio

## Questão 3
- **Banca / Ano / Questão:** ENEM 2018 — Questão 180
- **URL do enunciado:** https://api.enem.dev/v1/exams/2018/questions/180
- **URL do gabarito:** https://api.enem.dev/v1/exams/2018/questions/180 (`correctAlternative: "B"`)
- **Imagens:** `public/vestibular/enem-2018-180-1.png` (cilindro circular reto e faixa retangular com diagonal a 30° enrolada formando uma hélice de 6 voltas completas)
- **Enunciado:**
  > Para decorar um cilindro circular reto será usada uma faixa retangular de papel transparente, na qual está desenhada em negrito uma diagonal que forma 30° com a borda inferior. O raio da base do cilindro mede 6/π cm, e ao enrolar a faixa obtém-se uma linha em formato de hélice, como na figura.
  >
  > ![](https://enem.dev/2018/questions/180/aefa4129-634d-4a56-9c4b-704b4c98c97b.png)
  >
  > O valor da medida da altura do cilindro, em centímetro, é
- **Alternativas:**
  - A) imagem: `public/vestibular/enem-2018-180-alt-a.png`
  - B) imagem: `public/vestibular/enem-2018-180-alt-b.png`
  - C) imagem: `public/vestibular/enem-2018-180-alt-c.png`
  - D) imagem: `public/vestibular/enem-2018-180-alt-d.png`
  - E) imagem: `public/vestibular/enem-2018-180-alt-e.png`
- **Gabarito:** B
- **Resolução (feita antes de olhar o gabarito):** O raio da base é r = 6/pi cm, logo o perímetro da base é C = 2*pi*r = 12 cm. Observando a figura à direita, a diagonal cruza a geratriz frontal 5 vezes entre a base inferior e a superior, completando 6 voltas em torno do cilindro. Assim, o comprimento horizontal da faixa retangular é 6*12 = 72 cm. Como a diagonal faz 30° com a borda inferior, a altura do cilindro é h = 72*tg(30°) = 72*(raiz(3)/3) = 24*raiz(3) cm.
- **Nível:** médio
