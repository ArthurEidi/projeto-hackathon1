# Roteiro do vídeo de demonstração (até 3 minutos)

Roteiro do vídeo de submissão da **Aula Visual** ao Hack Brasil 2026. Duração-alvo: **2min40s a 2min50s**. O regulamento (item 7.2) aceita **no máximo 3 minutos**, e o vídeo precisa ser acessível sem login e mostrar o produto funcionando.

O vídeo é quase todo **gravação de tela do app real**. Só a abertura e o encerramento podem ter um título simples sobre a gravação.

> Roteiro anterior (3 a 5 minutos, versão só de Matemática): está no histórico do Git deste arquivo.

---

## Antes de gravar

1. **Grave a versão publicada** (a demo no GitHub Pages), não o servidor de desenvolvimento. Se a demo ainda não estiver no ar, use o build de produção local:
   ```bash
   npm run build
   npm run preview      # http://localhost:4173
   ```
   Não use o atalho `?passo=N`: ele só existe em desenvolvimento. Para chegar a um passo adiantado, conclua os anteriores fora da gravação e corte na edição.
2. **Janela anônima** (ou `localStorage.clear()` no console e recarregar). Assim aparecem as boas-vindas do Paco e da Tati e nenhuma aula concluída.
3. **Resolução:** navegador em 1920 × 1080 (ou 1440 × 900), zoom de 100%, barra de favoritos escondida. Para o trecho de celular, use o modo dispositivo do DevTools (390 × 844) ou grave um celular real.
4. **Ensaio:** faça o caminho inteiro uma vez antes de gravar. Grave cada trecho em um arquivo separado; fica mais fácil cortar.
5. **Áudio:** narração gravada à parte, em ambiente silencioso. Trilha sonora, se houver, só com direito de uso e baixa.
6. **Edição permitida:** cortes, aceleração em trechos repetitivos (marcados como "corte" abaixo), zoom suave numa região e legendas. **Não permitido:** simular telas, editar valores ou mostrar algo que o app não faz.

### O que não dizer

- Não dizer que a plataforma usa IA ou que "interpreta questões": a questão do ENEM foi transformada em aula manualmente.
- Não dizer que melhora notas ou aprendizagem: isso ainda não foi medido com estudantes.
- Não dizer que Física e Química têm uma trilha completa: hoje são **uma aula cada**.

---

## Roteiro cronometrado

| Tempo | Trecho |
|---|---|
| 0:00–0:20 | Problema e proposta |
| 0:20–0:45 | Página inicial, disciplinas, Paco e Tati |
| 0:45–1:30 | Matemática e questão visual do ENEM 2022 |
| 1:30–1:55 | Física: lançamento oblíquo |
| 1:55–2:20 | Química: soluções e concentração |
| 2:20–2:40 | Diferencial, arquitetura e confiabilidade |
| 2:40–2:50 | Encerramento |

### 1. Problema e proposta (0:00–0:20)

- **Tela:** página inicial (`#/`), parada no título "Entenda o que antes parecia impossível.". Opcional: nos 3 primeiros segundos, título sobreposto "Aula Visual".
- **Interação:** nenhuma nos primeiros segundos; no fim do trecho, mover devagar o slider **Ângulo** da demonstração e mostrar a curva respondendo.
- **Narração (~45 palavras):**
  > "No Ensino Médio, parábolas, trajetórias e concentrações costumam chegar como fórmula pronta. O aluno decora a regra sem ver de onde ela vem. A Aula Visual inverte essa ordem: você muda um valor, vê o gráfico responder e só depois chega à fórmula."

### 2. Página inicial, disciplinas, Paco e Tati (0:20–0:45)

- **Tela e interação:**
  1. Na demonstração da página inicial, clicar em **θ = 15°** e depois em **θ = 75°**: o quadro amarelo explica que ângulos complementares caem no mesmo lugar.
  2. Rolar até os três cards: **Matemática**, **Física** e **Química**.
  3. Clicar em **Matemática** (`#/materia/matematica`). Na janela anônima aparecem o Paco e a Tati com a fala de boas-vindas. Clicar em **Vamos lá**.
- **Narração (~55 palavras):**
  > "Logo na entrada, o aluno já experimenta: 15 e 75 graus têm o mesmo alcance, e o próprio app mostra o porquê. São três áreas: Matemática, com a trilha completa do Ensino Médio, e as primeiras experiências de Física e Química. O Paco conduz cada aula, e a Tati faz as perguntas que o aluno faria."

### 3. Matemática e a questão visual do ENEM 2022 (0:45–1:30)

- **Caminho:** voltar à página inicial e clicar em **Resolver uma questão do ENEM** (ou, na trilha: **Álgebra** → **Funções** → **Questão visual: saque de vôlei (ENEM 2022)**). Aula "Saque no Teto".
- **Tela e interação:**
  1. *(0:45)* Passo 1: mostrar o **enunciado oficial** à esquerda e **arrastar a bola** pela trajetória. Clicar em **Continuar**.
  2. *(corte)* Passo 2: levar a bola ao **ponto mais alto**. **Continuar**.
  3. *(1:00)* Passo 3: subir devagar o slider do **teto**, passando por 17, 18, 19 e 21 m, até 22 m. Os pontos onde a bola bate aparecem e somem. **Continuar**.
  4. *(corte)* Passo 4: escolher **21,67 m** e **Verificar**. **Continuar**.
  5. *(1:15)* Passo 5: escolher de propósito **C) Apenas nos ginásios I, II e III** e **Verificar**. Deixar 3 segundos na figura que mostra o erro (a curva sem os 1,5 m). **Tentar de novo**, escolher **D)** e **Verificar**.
- **Narração (~85 palavras):**
  > "Na Matemática, são 105 aulas com gráficos e figuras que o aluno manipula. Aqui, uma questão real do ENEM 2022 virou experiência visual. O enunciado oficial fica na tela. O aluno arrasta a bola, encontra o ponto mais alto e sobe o teto do ginásio para ver onde o saque bate. Se ele escolhe a alternativa C, o app não diz só 'errado': mostra no gráfico que ele esqueceu os 1,5 metros da altura do saque. Corrigindo, chega à D."

### 4. Física: lançamento oblíquo (1:30–1:55)

- **Caminho:** cabeçalho → **Física** → **A Bola que Faz Parábola** → **Começar**.
- **Tela e interação:**
  1. Passo 1: ajustar **Ângulo** e **Velocidade inicial**, clicar em **Lançar** e deixar a animação terminar. Mostrar altura máxima, alcance e tempo de voo no painel.
  2. *(corte)* Passo 2: lançar a 30° e depois a 60° (v₀ = 20 m/s) e mostrar as duas trajetórias com o mesmo alcance.
- **Narração (~50 palavras):**
  > "Na Física, o aluno controla o ângulo e a velocidade, lança e acompanha a trajetória animada. Altura máxima, alcance e tempo de voo são calculados na hora. Lançamentos anteriores ficam na tela para comparar: 30 e 60 graus chegam ao mesmo ponto. O modelo é declarado: sem resistência do ar."

### 5. Química: soluções e concentração (1:55–2:20)

- **Caminho:** cabeçalho → **Química** → **A Cor da Concentração** → **Começar**.
- **Tela e interação:**
  1. Passo 1: subir o slider **Massa de CuSO₄**. A cor fica mais forte, as partículas aumentam, e o medidor de concentração sobe. **Continuar**.
  2. *(corte)* Passo 2: aumentar o **volume** de 200 mL para 800 mL. As mesmas partículas se espalham e a cor clareia, com o béquer "antes" ao lado.
- **Narração (~50 palavras):**
  > "Na Química, o aluno prepara uma solução. Mais soluto no mesmo volume: mais partículas, cor mais intensa e concentração maior. Adicionando água, a massa não muda, mas a solução fica mais diluída, e dá para comparar com o béquer de antes. A conta C = m/V aparece ao lado do que ele vê."

### 6. Diferencial, arquitetura e confiabilidade (2:20–2:40)

- **Tela (escolher uma):**
  - celular (390 × 844) com a simulação de Física ou a questão do vôlei, mostrando que a aula funciona no toque; **ou**
  - o terminal rodando `npm test` até a linha "Tests 2229 passed" (gravação real, acelerada); **ou**
  - a seção "Qualidade técnica" do README no GitHub.
- **Narração (~50 palavras):**
  > "Funciona no navegador e no celular, sem cadastro: o progresso fica no próprio aparelho. Cada aula é um arquivo de dados validado automaticamente, então criar uma aula nova não exige programar. São mais de 2.200 testes automatizados, e uma varredura abriu as 107 aulas em três tamanhos de tela."

### 7. Encerramento (2:40–2:50)

- **Tela:** página inicial (ou a tela "Aula concluída" com o Paco e a Tati), com título sobreposto: **Aula Visual**, o link da demo e "Hack Brasil 2026 · Acesso à educação".
- **Narração (~20 palavras):**
  > "Aula Visual: entender antes de decorar. O link está na descrição. Abra, mexa nos valores e veja a matemática acontecer."

---

## Depois de gravar

- [ ] Duração final **menor que 3:00** (alvo: 2:40–2:50).
- [ ] Nenhuma tela simulada nem valor editado. Toda interação aparece de verdade.
- [ ] Nenhuma menção a IA no produto ou a resultados de aprendizagem.
- [ ] Legendas conferidas (o júri pode assistir sem som).
- [ ] Vídeo publicado como **público** ou **não listado** (YouTube, por exemplo) e aberto numa janela anônima para confirmar que **não pede login**.
- [ ] Link do vídeo no formulário de submissão, no `README.md` e em `docs/ENTREGA_HACKBRASIL_2026.md`.
