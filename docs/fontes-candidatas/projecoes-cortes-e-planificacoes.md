# Fontes candidatas — projecoes-cortes-e-planificacoes

## Questão 1
- **Banca / Ano / Questão:** ENEM 2021 — Questão 168
- **URL do enunciado:** https://api.enem.dev/v1/exams/2021/questions/168
- **URL do gabarito:** https://api.enem.dev/v1/exams/2021/questions/168 (`correctAlternative: "E"`)
- **Imagens:** `public/vestibular/enem-2021-168-1.png` (planificação de um octaedro regular com faces numeradas 1, 2, 3, 4 e vértices N, S, A, B, C, D, com uma face sombreada)
- **Enunciado:**
  > Num octaedro regular, duas faces são consideradas opostas quando não têm nem arestas, nem vértices em comum. Na figura, observa-se um octaedro regular e uma de suas planificações, na qual há uma face colorida na cor cinza escuro e outras quatro faces numeradas.
  >
  > ![](https://enem.dev/2021/questions/168/71fccb41-8caa-485c-b7af-c1c537c4148b.png)
  >
  > Qual(is) face(s) ficará(ão) oposta(s) à face de cor cinza escuro, quando o octaedro for reconstruído a partir da planificação dada?
- **Alternativas:**
  - A) 1, 2, 3 e 4
  - B) 1 e 3
  - C) 1
  - D) 2
  - E) 4
- **Gabarito:** E
- **Resolução (feita antes de olhar o gabarito):** Dobramos a planificação mantendo a face sombreada (vértices C, D, S) como referência. Os vértices N e S são os dois pólos opostos do octaedro, enquanto A, B, C, D formam o quadrado equatorial na ordem A-B-C-D. A face sombreada é (C, D, S); a face oposta no octaedro tem o pólo oposto (N) e a aresta oposta do quadrado equatorial (A, B), isto é, a face (A, B, N), que corresponde ao número 4.
- **Nível:** médio

## Questão 2
- **Banca / Ano / Questão:** ENEM 2023 — Questão 163
- **URL do enunciado:** https://api.enem.dev/v1/exams/2023/questions/163
- **URL do gabarito:** https://api.enem.dev/v1/exams/2023/questions/163 (`correctAlternative: "A"`)
- **Imagens:** `public/vestibular/enem-2023-163-1.png` (gráfico Distância em km versus Tempo em min: de 0 a 10 min sobe linearmente de 0 a 3 km; de 10 a 20 min fica constante em 3 km; de 20 a 30 min desce linearmente de 3 a 0 km)
- **Enunciado:**
  > Uma empresa de segurança domiciliar oferece o serviço de patrulha noturna, no qual vigilantes em motocicletas fazem o monitoramento periódico de residências. A empresa conta com uma base, de onde acompanha o trajeto realizado pelos vigilantes durante as patrulhas e orienta o deslocamento de equipes de reforço quando necessário. Numa patrulha rotineira, sem ocorrências, um vigilante conduziu sua motocicleta a uma velocidade constante durante todo o itinerário estabelecido, levando 30 minutos para conclusão. De acordo com os registros do GPS alocado na motocicleta, a distância da posição do vigilante à base, ao longo do tempo de realização do trajeto, é descrita pelo gráfico.
  >
  > ![](https://enem.dev/2023/questions/163/ff0caefb-56e7-4c17-bae7-b65b91037e9c.png)
  >
  > A vista superior da trajetória realizada pelo vigilante durante a patrulha registrada no gráfico é descrita pela representação
- **Alternativas:**
  - A) imagem: `public/vestibular/enem-2023-163-alt-a.png`
  - B) imagem: `public/vestibular/enem-2023-163-alt-b.png`
  - C) imagem: `public/vestibular/enem-2023-163-alt-c.png`
  - D) imagem: `public/vestibular/enem-2023-163-alt-d.png`
  - E) imagem: `public/vestibular/enem-2023-163-alt-e.png`
- **Gabarito:** A
- **Resolução (feita antes de olhar o gabarito):** De 0 a 10 min, a distância à base aumenta linearmente de 0 a 3 km (trajeto retilíneo afastando-se da base). De 10 a 20 min, a distância permanece constante igual a 3 km (arco de circunferência centrado na base). De 20 a 30 min, a distância volta linearmente de 3 km a 0 (trajeto retilíneo retornando à base). A projeção no plano é um setor circular, representado na alternativa A.
- **Nível:** fácil

## Questão 3
- **Banca / Ano / Questão:** ENEM 2022 — Questão 160
- **URL do enunciado:** https://api.enem.dev/v1/exams/2022/questions/160
- **URL do gabarito:** https://api.enem.dev/v1/exams/2022/questions/160 (`correctAlternative: "A"`)
- **Imagens:** `public/vestibular/enem-2022-160-1.png` (cubo em perspectiva com os primeiros deslocamentos do robô: de P, no centro da face de cima, ao centro da face da direita, ao centro da face do fundo e ao centro da face de baixo); alternativas `public/vestibular/enem-2022-160-alt-a.png` a `-alt-e.png` (a base do cubo em perspectiva, dividida em 4 quadrantes, com o contorno da projeção desenhado)
- **Enunciado:**
  > Um robô, que tem um ímã em sua base, se desloca sobre a superfície externa de um cubo metálico, ao longo de segmentos de reta cujas extremidades são pontos médios de arestas e centros de faces. Ele inicia seu deslocamento no ponto **P**, centro da face superior do cubo, segue para o centro da próxima face, converte à esquerda e segue para o centro da face seguinte, converte à direita e continua sua movimentação, sempre alternando entre conversões à esquerda e à direita quando alcança o centro de uma face. O robô só termina sua movimentação quando retorna ao ponto **P**. A figura apresenta os deslocamentos iniciais desse robô.
  >
  > ![](https://enem.dev/2022/questions/160/c9e8168c-5f91-45a5-82a3-c5a2948bf0a9.png)
  >
  > A projeção ortogonal do trajeto descrito por esse robô sobre o plano da base, após terminada sua movimentação, visualizada da posição em que se está enxergando esse cubo, é
- **Alternativas:**
  - A) imagem: `public/vestibular/enem-2022-160-alt-a.png`
  - B) imagem: `public/vestibular/enem-2022-160-alt-b.png`
  - C) imagem: `public/vestibular/enem-2022-160-alt-c.png`
  - D) imagem: `public/vestibular/enem-2022-160-alt-d.png`
  - E) imagem: `public/vestibular/enem-2022-160-alt-e.png`
- **Gabarito:** A
- **Resolução (feita antes de olhar o gabarito):** Cubo [0, 1]³ com x para a direita, y para o fundo e z para cima; o robô anda de centro de face a centro de face passando pelo ponto médio da aresta. Para um robô com "cima" igual à normal externa u e rumo h, a esquerda é u × h. Saída de P = (0,5; 0,5; 1) rumo +x (como na figura): chega ao centro da face da direita (1; 0,5; 0,5) com rumo −z. Esquerda: (+x) × (−z) = +y, vai ao centro do fundo (0,5; 1; 0,5), com rumo −x (confere com a figura). Direita: −[(+y) × (−x)] = −z, vai ao centro da base (0,5; 0,5; 0) com rumo −y (confere com a figura). Esquerda: (−z) × (−y) = −x, vai ao centro da face da esquerda (0; 0,5; 0,5) com rumo +z. Direita: −[(−x) × (+z)] = −y, vai ao centro da face da frente (0,5; 0; 0,5) com rumo +x. Esquerda: (−y) × (+x) = +z, sobe à face de cima e volta a P com rumo +y: fim. Trajeto: P → (1; 0,5; 1) → (1; 0,5; 0,5) → (1; 1; 0,5) → (0,5; 1; 0,5) → (0,5; 1; 0) → (0,5; 0,5; 0) → (0; 0,5; 0) → (0; 0,5; 0,5) → (0; 0; 0,5) → (0,5; 0; 0,5) → (0,5; 0; 1) → P. Projetando na base (apaga z), os trechos verticais viram pontos e sobram 8 segmentos: o contorno do quadrante [0,5; 1] × [0,5; 1] (fundo à direita) e o do quadrante [0; 0,5] × [0; 0,5] (frente à esquerda), que se tocam no centro. Na base vista em perspectiva (fundo para cima e à direita), são os quadrantes de cima à direita e de baixo à esquerda: alternativa A. (Simulação executada em Python na B22; ver `docs/revisao/b22.md`.)
- **Nível:** médio
