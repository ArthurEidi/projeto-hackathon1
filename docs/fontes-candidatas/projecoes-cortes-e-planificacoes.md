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
