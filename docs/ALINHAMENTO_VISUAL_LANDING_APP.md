# Alinhamento visual: landing page → aplicativo

Data: 21/11/2026. Referência: `C:\HackBrasil\hackbrasil-landing`, tratada como **somente leitura**.

Nessa pasta, só li arquivos e servi o `dist/` já existente com `python -m http.server --directory …/dist`, um servidor estático que não escreve nada. Nenhum arquivo dela foi alterado, nenhum comando npm rodou lá, e o app não importa nada dela. O favicon e as ilustrações foram redesenhados dentro do app.

Legenda: **[EXECUTADO]** = visto ou rodado nesta sessão; **[CÓDIGO]** = lido no código.

---

## 1. Resumo da identidade visual da landing

Analisei `src/styles/global.css`, `src/components/illustrations/Science.tsx`, `src/components/interactive/QuadraticDemo.tsx`, `src/components/layout/Header.tsx`, `src/config/site.ts`, `public/favicon.svg`, `index.html` e `docs/previa-desktop.jpg`. Também abri a página renderizada a 1440 × 900 e a 390 × 844 [EXECUTADO].

O projeto é React 19 + Vite, com um único CSS global, ilustrações em SVG inline e nenhuma biblioteca de UI.

A personalidade da landing é a de um **caderno de estudos organizado**:

- fundo creme, tinta azul-acinzentada escura e pastéis por disciplina;
- títulos grandes e "apertados" em Manrope, com uma palavra destacada por marca-texto amarelo;
- folhas de papel quadriculado levemente giradas, nota adesiva amarela com fita, órbitas tracejadas e anotações "à mão" em Georgia itálico;
- cards pastel de cantos bem arredondados;
- botões escuros com uma sombra "dura" curta;
- quase nenhum gradiente e sombras muito leves.

O resultado é amigável sem ser infantil.

## 2. Cores e tokens identificados [CÓDIGO]

| Papel | Valor na landing | Onde aparece |
|---|---|---|
| Fundo | `--cream: #fffdf8` | `:root`, `body`, `theme-color` |
| Tinta (texto principal, botão principal) | `--ink: #26344a` | texto, `.button`, contornos das ilustrações |
| Texto secundário | `--muted: #586477` | parágrafos |
| Destaque | `--accent: #365f91` | `em`, foco, slider, link |
| Linhas | `--line: #e2e4df` | divisórias |
| Azul-pastel (marca) | `--blue: #a7c7e7` | fundo do favicon |
| Matemática | `--math: #92bde8`; card `#eaf2fa`; traço `#446FA2` / `#527eae` | card, curva do gráfico |
| Física | `--physics: #c6b3e6`; card `#f0ebf7`; traços `#795B9E`, `#624581` | card, trajetória, vetores |
| Química | `--chemistry: #a8d5ba`; card `#eaf3ec`; traço `#4F8164` | card, molécula |
| Amarelo | `--yellow: #f5d994` | marca-texto, nota adesiva, ponto atual |
| Rosa | `--pink: #f4c5cb` | reservado |
| Fundos de seção | `#f0f4f7`, `#f7f6f0`, `#f1f4f1`, `#f4f6f2` | seções alternadas |
| Painel de controles do demo | `#edf3f9`, borda `#d7dedf` | `.demo-controls` |
| Quadro de descoberta | `#f7f0dc`, ícone `#8f7334` | `.graph-insight` |
| Sombras | `0 3px 0 #14213712` (botão), `0 12px 40px #26344a06` (demo), `0 14px 35px #26344a0b` (folhas) | — |
| Raios | 22 px (cards), 24 px (demo), 18 px (blocos), 12 px (folhas), 10 px (botões e quadros), 7 px (presets e saídas) | — |

## 3. Tipografia [CÓDIGO]

| Uso | Landing | App |
|---|---|---|
| Texto | DM Sans 400–700, `line-height` 1,75 | DM Sans, 1,6 a 1,75 |
| Títulos | Manrope 650, `letter-spacing −.055em` (h1/h2), `−.025em` (h3) | Manrope 650, os mesmos espaçamentos |
| h1 | `clamp(2.7rem, 4.5vw, 4rem)`, `line-height` 1,13 | `clamp(38px, 4.6vw, 60px)`, 1,13 |
| Sobretítulo | 0,75 rem, 700, `letter-spacing .15em`, maiúsculas, `#53627a` | 11,5 px, 700, `.14em`, `#53627a` |
| Anotações, fórmulas e equações | Georgia itálico | Georgia itálico (fórmula do fechamento, dica, painel das simulações, enunciado do laboratório) |
| Rótulos dentro dos gráficos | DM Sans 12 px (SVG) | **Nunito** nos canvas: as posições dos rótulos das 104 aulas foram calibradas com essa fonte e não mudaram (decisão registrada) |

## 4. Componentes de referência

| Landing | No app |
|---|---|
| `.button` (tinta, raio 10, borda 1 px, sombra `0 3px 0`, *hover* `#3b506d` subindo 2 px) | `.btn`: botões de ação, "Continuar", "Verificar", "Lançar" |
| `.button-secondary` (transparente, borda `#cbd2d8`) | `.btn--secondary`: "Agora não", "Resolver uma questão do ENEM" |
| `.header` (marca do favicon, nome com sobretítulo em versalete, links simples) | `.topo`, com fundo creme sólido (a landing usa desfoque, que evitei de propósito) |
| `.subject-strip` (pontos coloridos + nota em itálico) | `.faixa` na página inicial; os mesmos pontos marcam as áreas no cabeçalho |
| `.discipline-card` (fundo pastel, `.tag`, ilustração, h3, tópicos, divisória, status) | `.area-card`, com contagem real de aulas, setores reais e progresso real |
| `.demo` (painel de controles `#edf3f9` + área de resultado em papel) | aula: `.step__controles` (fundo da área, borda `#d7dedf`, raio 18) + `.stage` (papel, raio 20, sombra leve) |
| `.slider-label output` (valor em caixa branca com borda) | `.slider__value` |
| `.presets` (botões finos; o ativo fica cor de tinta) | abas dos pilares da trilha e ângulos do laboratório |
| `.graph-insight` (quadro amarelo-claro com ✦) | `.insight` no laboratório da página inicial |
| `.journey` (números em círculos pastel ligados por linha tracejada) | `.jornada` em "Continuar aprendendo" e a linha tracejada do acordeão da trilha |
| `.problem-notes span` (quadrado pastel girado com símbolo em Georgia) | número da aula nos cartões de Física e Química; selo da unidade na trilha |
| `.construction-note` (nota em papel com arte e `.tag`) | destaque da questão visual |
| `.paper-main`, `.art-sticker`, `.orbit` | laboratório da página inicial e o enunciado da questão (papel quadriculado) |

## 5. Padrões de ilustração

Da landing (`Science.tsx`, `favicon.svg`):

- caixa 320 × 180;
- padrão de pontos a 15% de opacidade;
- eixos no traço da tinta com opacidade;
- **um** traço forte na cor da disciplina (3 a 3,5 px, ponta redonda; tracejado na Física);
- ponto de destaque amarelo `#F5D994` com contorno da tinta;
- formas preenchidas em pastel com contorno de 2 px no tom escuro da disciplina;
- anotação em Georgia itálico.

**Aplicado em `src/paginas/IconesMaterias.tsx`.** Cada ilustração foi redesenhada para o conteúdo real do app, com os números comentados no código:

| Ilustração | O que mostra |
|---|---|
| Matemática | y = (x − 1)² − 2, com vértice amarelo e raízes vazadas |
| Física | lançamentos a 30° e a 60° com v₀ = 20 m/s, com o mesmo alcance; vetor v₀ e peso |
| Química | dois béqueres com o mesmo volume e o dobro de soluto (o dobro de partículas e cor mais forte) |
| Questão do vôlei | a trajetória real somada aos 1,5 m, os tetos de 19 m e 21 m e o topo em amarelo |
| Marca | redesenho do favicon (quadrado `#A7C7E7`, eixos, parábola e ponto amarelo), também em `public/favicon.svg` |

**Nos gráficos das aulas:**

- a bola do lançamento é o "ponto atual" da landing (amarelo com contorno da tinta);
- o solo tem hachuras no traço da tinta;
- a trajetória prevista é tracejada;
- o béquer tem fundo arredondado e contorno da tinta.

## 6. Divergências encontradas na versão anterior do app [EXECUTADO, comparação lado a lado]

| Aspecto | App antes | Landing |
|---|---|---|
| Fundo | branco e cinza-azulado `#F5F7FA` | creme `#FFFDF8` |
| Marca e cabeçalho | barra azul-escura `#0B1F4D`, nome "Aula Visual" | cabeçalho creme, marca do favicon, "Projeto Hack Brasil · Aprendizagem visual" |
| Ação principal | azul vibrante `#2563EB` | tinta `#26344A` com sombra dura |
| Fonte | Inter | DM Sans + Manrope + Georgia |
| Cores das marcas dos gráficos | saturadas (`#1C8BE0`, `#F28C00`, `#D62F7A`, `#7B4FD6`) | pastéis com traço médio (`#446FA2`, `#795B9E`, `#4F8164`) |
| Cards | brancos com faixa superior colorida | fundos pastel inteiros, borda finíssima, raio 22 |
| Ilustrações | esquemas finos sem padrão comum | padrão de pontos, traço forte, ponto amarelo, nota em itálico |
| Aula | dois retângulos (texto e figura) | painel de controles tingido + área de resultado em papel |
| Progresso | barra contínua | etapas como na jornada |
| Feedback | faixa colorida simples | faixa com selo (✓ ou ↺) e cores suaves da paleta |

## 7. Melhorias implementadas

- **Paleta:** `src/ui/palette.ts` passou a usar os tokens da landing.
  - As marcas dos gráficos (h, r, g, c1..c4) foram aproximadas da família da landing: azul `#4F7FB3`/`#365F91`, âmbar `#D98A2B`/`#9A5A12`, rosa `#C0577B`/`#93395A`, violeta `#8566B8`/`#624581`.
  - Os contrastes testados (B54) continuam valendo, conferidos por script: tom escuro ≥ 4,5:1 sobre branco, tom a 70% ≥ 4,5:1 com texto branco, tinta × amarelo = 9,1:1.
- **Tokens no CSS (`src/ui/styles.css`, reescrito):**
  - fontes: `--font`, `--font-titulo`, `--font-nota`;
  - raios: `--radius`, `--radius-card`, `--radius-sm`, `--radius-xs`;
  - sombras: `--sombra-botao`, `--sombra-card`, `--sombra-folha`;
  - bordas: `--borda`, `--borda-forte`;
  - cor por área via `[data-area]` (`--area`, `--area-tinta`, `--area-pastel`).
- **Fontes** (`index.html`): DM Sans + Manrope, mais Nunito apenas para os rótulos dos canvas.
- **Identidade:**
  - nome "Projeto Hack Brasil · Aprendizagem visual · 2026", igual ao da landing;
  - título da página, `theme-color` creme e favicon próprio.

## 8. Componentes modificados

| Arquivo | O que mudou |
|---|---|
| `src/ui/palette.ts` | tokens da landing, pastéis, marcas harmonizadas |
| `src/ui/styles.css` | design system inteiro (botões, cards, cabeçalho, aula, painéis, trilha, páginas) |
| `src/ui/Tactile.tsx` | `ProgressBar` com segmentos por etapa (`etapas`); a semântica `role="progressbar"` e o `aria-label` não mudaram |
| `src/characters/characters.css` | balões em papel branco com contorno fino |
| `src/engine/materias.ts` | cores reais das disciplinas (`cor`, `tinta`, `pastel`) |
| `src/engine/LessonPlayer.tsx` | `data-area` na aula; progresso por etapas |
| `src/paginas/IconesMaterias.tsx` | marca, ícones, ilustrações das áreas e da questão do vôlei |
| `src/paginas/BarraTopo.tsx` | cabeçalho no padrão da landing |
| `src/paginas/Inicio.tsx` | página inicial reorganizada |
| `src/paginas/DemoTrajetoria.tsx` | laboratório em folha quadriculada |
| `src/paginas/PaginaDisciplina.tsx` | páginas de Física e Química |
| `src/Home.tsx` | cabeçalho da trilha de Matemática |
| `src/widgets/common/lancamento/desenho.ts`, `PainelLancamento.tsx` | bola, solo, trajetórias, etiquetas sem sobreposição, subscrito nas fórmulas |
| `src/widgets/common/solucao/desenho.ts` | béquer ilustrado (fundo arredondado, recorte, destaque de C e de m) |
| `scripts/varre-aulas.mjs` | tamanho da tela por variável, aulas de Física e Química, verificações novas |
| `scripts/captura-telas.mjs` (novo) | capturas reais |
| `index.html`, `public/favicon.svg` | fontes, título, ícone |
| `src/engine/disciplinas.test.tsx` | expectativa do novo título da página inicial |

**Não mudaram:**

- o motor de aulas, os schemas, as rotas e o sistema de progresso;
- os JSON das 107 aulas;
- todos os cálculos e as condições de conclusão;
- os outros 20 widgets (só herdam as cores novas da paleta).

## 9. Melhorias na página inicial

- **Hero:** sobretítulo com ponto verde, título "Entenda o que antes parecia ***impossível.***" com marca-texto amarelo, botões tinta/secundário e nota com ✦, como na landing.
- **Laboratório protagonista:** a trajetória real numa folha quadriculada girada 1,5°, com uma folha lilás atrás, órbita tracejada e nota adesiva "mude o ângulo. veja a curva.".
  - Abaixo ficam os valores, os sliders com valor em caixa, os atalhos θ = 15°/45°/75° e um quadro de descoberta que muda com os valores ("60° e 30° caem no mesmo lugar" ou "Este é o maior alcance").
  - A física é o mesmo módulo da aula.
- **Faixa:** "Três áreas, um jeito de aprender", com os pontos das disciplinas e a nota em itálico.
- **Cards das áreas:** fundo pastel, `.tag` com o número real de aulas, ilustração própria, tópicos tirados dos setores reais, divisória, progresso real e "Abrir →".
- **Continuar aprendendo:** jornada numerada com a próxima aula sugerida e as concluídas, tudo vindo do armazenamento local. A seção só aparece quando existe progresso.
- **Destaque da questão visual:** nota em papel com o esquema real da questão e a `.tag` "6 passos · resposta comentada".

## 10. Melhorias nas aulas (validadas primeiro na questão do vôlei)

- **Cabeçalho:** botão sair com contorno, área com ponto pastel, unidade em versalete, título em Manrope e progresso **segmentado por etapa** (feitas na cor da área, a atual em pastel) com "Explorar · 3 de 6".
- **Desktop, como o demo da landing:**
  - à esquerda, a conversa e o **painel de controles tingido com a cor da área** (sliders, pergunta, alternativas, fórmula);
  - à direita, a **área de resultado em papel** (o gráfico), presa ao rolar;
  - o rodapé de ação fica alinhado à coluna de controles.
- **Celular:** conversa → figura → painel de controles logo abaixo; a ação principal fica fixa no rodapé.
- **Feedback:**
  - acerto: faixa verde-clara com selo ✓;
  - erro: faixa rosa-clara com selo ↺;
  - a alternativa escolhida ganha contorno, e a certa, ✓;
  - a figura ganha um anel verde ou rosa.
- **Status do passo** ("Use os controles ou arraste na figura" → "Etapa concluída") com ponto indicador.
- **Fechamento:** fórmula em Georgia sobre papel e definições separadas por linhas, como as notas da landing.
- **Conclusão:** selo amarelo girado com ✓, título em Manrope, convite ao treino, próxima aula e "Agora não".
- **Enunciado da questão:** folha quadriculada com o selo "Questão" em amarelo.

## 11. Melhorias em Física e Química

- **Física:**
  - bola amarela com contorno da tinta;
  - solo com hachuras;
  - trajetória prevista tracejada na cor da marca, lançamentos anteriores em cinza;
  - etiquetas de θ, v₀, H e A que não se sobrepõem, ficam acima do solo e desviam do texto do alvo;
  - painel de resultados com o valor em Manrope e a fórmula em Georgia com subscrito real.
  - **A física não mudou:** os 13 testes de `lancamento.test.ts` passam.
- **Química:**
  - béquer com fundo arredondado e contorno da tinta;
  - líquido e partículas recortados no vidro;
  - partículas maiores quando m está em destaque na fórmula, contorno quando C está em destaque;
  - etiquetas de V e C sem colisão;
  - medidor de C com meta.
  - **O cálculo não mudou:** os 6 testes de `solucao.test.ts` passam.
- **Páginas de área:** chamada própria, ilustração e cartões com o número em quadrado pastel girado.

## 12. Resultados da auditoria visual

Ferramenta: `scripts/varre-aulas.mjs`, estendido nesta sessão, em Chrome headless com Vite em modo dev e `prefers-reduced-motion`.

Para **cada passo de cada aula** (107 aulas: 104 de Matemática, a questão do vôlei, Física e Química; 577 passos), e para a abertura do treino de cada aula, a varredura verifica [EXECUTADO]:

- **Carregamento e estrutura:** o passo carrega, e os elementos esperados de cada tipo de passo estão visíveis (figura, enunciado, alternativas, fórmula, definições, vídeo com metadados).
- **Erros de console** e exceções da página.
- **Gráfico desenhado:** cada canvas é lido pixel a pixel (não pode estar em branco), e um gráfico com menos de 240 px de largura é registrado como "gráfico pequeno".
- **Overflow horizontal** e elementos além da borda.
- **Sobreposição** entre a área visual e o painel de controles.
- **Botão principal** do rodapé visível dentro da tela e com pelo menos 40 px de altura.
- **Legibilidade:** nenhum texto de passo, balão, alternativa, definição ou feedback abaixo de 12 px.
- **Celular:** o primeiro slider não pode ficar a mais de 60% da altura da tela abaixo da figura.
- **Interação:** em todo passo com slider, o primeiro slider é movido pelo teclado e o desenho precisa mudar.

| Tamanho | Aulas | Passos | Treinos abertos | Sliders que reagiram | Registros |
|---|---|---|---|---|---|
| Desktop 1440 × 900 | 107 | 577 | 107 de 107 | 201 de 201 | 0 |
| Tablet 768 × 1024 | 107 | 577 | 107 de 107 | 201 de 201 | 0 |
| Celular 390 × 844 | 107 | 577 | 107 de 107 | 201 de 201 | 0 |

Relatórios completos: `docs/visual/varredura-1440x900.md`, `docs/visual/varredura-768x1024.md` e `docs/visual/varredura-390x844.md`. Os números acima são da última execução, feita depois das correções da §12.1 e da revisão da §12.2.

Na primeira execução houve 2 registros, os mesmos nos três tamanhos: dois sliders que não mudavam a figura. Ambos eram defeitos de conteúdo **anteriores ao redesign** e foram corrigidos (§12.1).

### 12.1 Os dois controles que não mudavam a figura

Os dois eram interruptores 0/1 usados **só** como condição de conclusão: o valor do slider não estava ligado a nenhum parâmetro do widget. O aluno mexia, o passo concluía, e nada mudava na tela. Como interação pedagógica, isso não se sustentava. Os dois foram religados a uma grandeza matemática real, usando recursos que os widgets já tinham. **Nenhum widget, cálculo ou outra aula foi alterado.**

| Aula · etapa | Antes | Agora | Por quê |
|---|---|---|---|
| `relacoes-metricas-triangulo-retangulo` · 2 (`cateto-e-sua-sombra`) | Slider "Comparar b² com a·m" (0/1); `comparar: true` fixo, então o painel já aparecia de início e o rótulo b = 6 já estava visível | Slider **"Sombra m do cateto b"** (1 a 8), ligado a `m` (`"$m"`), com `a = 9`. O triângulo, h, c, n, o quadrado b² e o retângulo a·m mudam a cada valor. O rótulo de b fica oculto até concluir (`antes_de_concluir: { ocultar: ["b"] }`). A etapa conclui em m = 4 | O aluno vê que **b² = a·m vale para qualquer m**: o quadrado e o retângulo mantêm a mesma área enquanto mudam de forma. Em m = 4, b² = 36 e b = 6 aparece. É o mesmo padrão do passo 1 da aula (slider de m com a = 10) |
| `troncos-de-solidos` · 3 (`trapezio-meridiano`) | Slider "Girar visão" (0/1) sem efeito (a câmera já gira ao arrastar); `mostrar.g: false` fixo | Slider **"Corte (distância ao vértice)"** (0,5 a 4), ligado a `corte` (`"$corte"`). Sólido, raio de cima, placar (k, área, volume) e trapézio meridiano (R − r, altura) mudam juntos. g aparece como "?" até concluir (`antes_de_concluir`). A etapa conclui no corte 1,5 (R − r = 4, h = 3, g = 5). Depois, g acompanha o corte | Liga a pergunta (g = ?) à geometria que a determina: g² = h² + (R − r)². Arrastar para girar continua funcionando |

Os textos de abertura das duas etapas foram ajustados ao novo controle (≤ 140 caracteres, 2 frases). As falas de conclusão e as dúvidas não mudaram, e continuam corretas.

**Testes novos** (`src/conteudo/relacoes-metricas-triangulo-retangulo.test.ts` e `src/conteudo/troncos-de-solidos.test.ts`), além das condições de conclusão atualizadas:

- **Triângulo:**
  - o slider está ligado a `m`;
  - para cada valor de m de 1 a 8, `area_b2 = area_am = 9·m`;
  - cada posição produz um cateto diferente;
  - b = 6 em m = 4;
  - b fica oculto antes de concluir e visível depois.
- **Tronco:**
  - o slider está ligado a `corte`;
  - em cada posição, r = 6·corte/4,5 e h = 4,5 − corte;
  - cada posição gera um trapézio diferente;
  - na meta, R − r = 4, h = 3 e g = 5;
  - g = "?" antes de concluir e visível depois.

**No navegador** [EXECUTADO], a 1440 × 900 e a 390 × 844:

- os dois passos foram concluídos;
- no triângulo, m = 1 mostrou a·m = b² = 9 com b oculto, e m = 4 mostrou b = 6, a·m = b² = 36, h = 4,47 e c = 6,71;
- no tronco, corte 3 mostrou R − r = 2, h = 1,5 e g = ?; corte 2 mostrou 3,33 e 2,5; corte 1,5 mostrou 4, 3 e g = 5, com k = 0,333;
- no celular, a interação foi feita por **arraste** do slider.

**Problema encontrado e corrigido no caminho:** no desktop, canvases mais altos que largos (o tronco com painel meridiano tem proporção 1,25) passavam da altura da tela, e o painel ficava abaixo da dobra.

- O hook `useCanvas` agora informa a proporção à coluna visual (`--aspecto`), e o CSS limita a largura do palco para o desenho caber na tela.
- O canvas continua dimensionado pela largura, então coordenadas, rótulos e áreas de toque não mudam.
- Vale para todos os widgets. A varredura acima rodou depois disso.

### 12.2 Revisão final dos elementos visuais

Revisei os widgets mais usados: plano cartesiano (81 passos e 56 figuras), barras (44 e 26), grade de resultados (40 e 20), sólido 3D (30 e 20), reta numérica (25 e 12) e triângulo (24 e 14).

O que ainda destoava da landing estava nas **peças compartilhadas** que todos eles desenham. Por isso não redesenhei widgets inteiros:

| Elemento | Antes | Agora | Onde |
|---|---|---|---|
| Etiquetas (chips) de todos os gráficos | "degrau" sólido de 3px no tom escuro da marca, o visual tátil antigo | sombra curta e suave na tinta a 16%, a mesma do botão principal da landing | `chip()` em `src/widgets/canvas.ts` (19 usos em 12 arquivos) |
| Ponto arrastável do plano cartesiano e da reta numérica; marcador das barras | disco com degrau escuro | mesmo raio, sombra suave e contorno fino na tinta; o ponto neutro (cor "ink") fica amarelo, como o "ponto atual" da landing | `marcador()` em `canvas.ts`, usado em `desenhoPlano.ts`, `desenhoReta.ts` e `barras/desenho.ts` |

- **Preservado:** tamanho, posição e retângulo devolvido de cada chip; raio e área de toque de cada ponto (`registrarPonto` não mudou); a fonte Nunito dos rótulos.
- **Já estavam alinhados:** as chaves dos widgets (herdam o novo `.btn`), as cores (vêm da paleta), o fundo papel do palco e as alças de arraste da geometria (anel claro com centro colorido).
- **Não redesenhados:** os desenhos internos dos widgets (traços, malhas, sólidos), para não mexer em coordenadas calibradas.

**Inspeção visual feita por mim** (navegador embutido e capturas):

| Tela | 1440 × 900 | 390 × 844 |
|---|---|---|
| Página inicial | sim | sim |
| Cards das áreas | sim | — |
| Trilha de Matemática | sim | — |
| Aula de Função Quadrática | sim | — |
| Questão do vôlei: passos 1, 3, 4, 5 (erro e acerto) e conclusão | sim | passo 4 (acerto) |
| Física: passo 2 com dois lançamentos | sim | passo 4 (alvo) |
| Química: passos 2 e 3 | sim | — |

Defeitos achados nessa inspeção e **corrigidos**:

- vértice e anotações das ilustrações cortados na borda;
- subscrito de v₀ sem glifo na Georgia;
- nota adesiva sobre a escala do gráfico;
- texto do alvo coberto pela etiqueta θ;
- etiqueta v₀ sobre o solo no celular.

**Não foram vistas uma a uma por mim:** as 104 aulas de Matemática no novo visual. Elas foram cobertas pela varredura automática acima, que mede elementos e pixels mas não julga estética.

## 13. Testes executados [EXECUTADO]

| Comando | Resultado |
|---|---|
| `npm run lint:content` | ok |
| `npx tsc --noEmit` | ok |
| `npx vitest run` | **141 arquivos, 2.229 aprovados, 0 reprovados** (2.227 antes, mais os 2 testes da §12.1) |
| `npm run build` | ok, sem avisos. JS inicial 470,3 kB (138,4 kB gzip), antes 463,6 kB. CSS 40,2 kB (9,1 kB gzip). Player 310 kB |
| `npm run lint:planos` | falha **preexistente**, só em `docs/planos/funcao-modular.md` (não mexida) |
| `scripts/varre-aulas.mjs` nos 3 tamanhos | tabela da §12 |

## 14. Screenshots produzidos

Ficam em `docs/screenshots/`, com o índice em `docs/screenshots/README.md`. São 13 imagens reais, geradas por `scripts/captura-telas.mjs`, que chega a cada estado com cliques e teclado:

- `01-inicio.png`
- `02-disciplinas.png`
- `03-trilha-matematica.png`
- `04-aula-funcao-quadratica.png`
- `05-questao-volei.png`
- `06-fisica-lancamento.png`
- `07-quimica-solucoes.png`
- `08-feedback-questao.png`
- `09-conclusao.png`
- `10-inicio-com-progresso.png`
- `11-celular-inicio.png`
- `12-celular-fisica.png`
- `13-celular-questao-volei.png`

As imagens de desktop têm 1440 × 900 (16:10, a mesma proporção da galeria da landing); as de celular, 390 × 844 com DPR 2. A landing **não** foi alterada para recebê-las.

## 15. Limitações e pendências

1. **Rótulos dentro dos canvas** continuam em Nunito (a landing usa DM Sans nos gráficos SVG). Trocar a fonte exigiria revalidar o posicionamento de rótulos das 104 aulas.
2. **Personagens Paco e Tati** não existem na landing. Ficaram nas aulas porque fazem parte do método (dúvida da Tati), mas são o elemento que mais difere da linguagem da landing.
3. ~~Dois sliders sem efeito visual~~: **corrigidos**, ver §12.1.
4. **Outros 20 widgets:** chips e pontos arrastáveis foram alinhados à landing (§12.2), mas os desenhos internos (traços, malhas, sólidos) seguem como estavam, para preservar coordenadas calibradas. Só o lançamento e o béquer receberam o tratamento "ilustrado" completo.
5. **Cabeçalho sem desfoque:** a landing usa `backdrop-filter: blur(14px)`; aqui o fundo é creme sólido, para evitar o efeito de vidro.
6. **Laboratório da página inicial alto:** a escala fixa reserva espaço para 42 m de altura, e em telas baixas o quadro de descoberta fica abaixo da dobra.
7. **Elegibilidade no Hack Brasil** (regras 6.1 e 6.2) continua pendente, como nos relatórios anteriores. Nenhuma operação de Git foi feita.

### Onde o app está alinhado à landing, e o que ainda difere

**Alinhado:**

- paleta (creme, tinta, destaque e pastéis por disciplina), tipografia (Manrope, DM Sans e Georgia), cabeçalho, marca e nome;
- botões e cards das disciplinas;
- faixa das áreas, marca-texto, folha quadriculada, nota adesiva, quadro de descoberta e jornada numerada;
- painel de controles tingido com área de resultado em papel (o mesmo esquema do demo da landing);
- estilo das ilustrações.

**Ainda difere:**

- fonte dos rótulos internos dos gráficos (Nunito);
- os personagens das aulas;
- os desenhos internos dos 20 widgets mais antigos (só os chips e os pontos arrastáveis foram alinhados);
- o desfoque do cabeçalho;
- a densidade de informação: o app tem mais controles por tela, como convém a uma ferramenta de estudo.
