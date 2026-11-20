# B49 — Revisão de produto (primeira viagem do usuário)

**Status:** Parte 1 concluída (capturas + relatório com gravidade). Aguardando aprovação do maestro para a Parte 2 (correções em `src/`).
**Agente:** Antigravity (Neon), continuando a partir do levantamento inicial do Claude Code #2.
**Capturas salvas em:** `C:\Users\mkf10\projetos\capturas-b49\` (25 PNGs em `400 × 860` e `1280 × 800`, mais `auditoria-completa.json`).
**Fluxo percorrido via Chrome headless (CDP) sobre Vite (`http://127.0.0.1:5299`):**
1. Primeira visita com `localStorage` limpo (`BoasVindas`) → clique em "Vamos lá".
2. Teste de matéria em produção (`Física`) → retorno a `Matemática`.
3. Escolha de pilar (`Aritmética`), abertura de setor (`Conjuntos`), abertura de unidade (`Conjuntos numéricos, divisibilidade e fatoração prima`), abertura da `Aula 01`.
4. Navegação por `Tab` e verificação de foco visível na aula.
5. Fechamento da aula (`concept_lock`) → `Concluir aula` → tela de convite (`ConviteTreino`).
6. Treino completo: 7 perguntas básicas (com feedback de acerto e de erro) → resultado → 5 desafios → resultado → 3 questões de vestibular → resultado final.
7. Clique em "Voltar à trilha" e recarga completa da página (`Page.reload`) para conferir persistência do progresso (`mat:progress:v1`).
8. Rota inexistente (`#/aula/nao/existe/aqui/aula-01`).

**Resultado geral da execução:** **0 erros de console**, **0 exceções de página**, **0 telas com rolagem lateral** (`scrollWidth ≤ viewport` nas 25 capturas), **0 textos de interface sem acento** (`src/` fora `widgets/` e `content/taxonomy.json`), e progresso persistido corretamente após recarga (`localStorage` grava `completedAt` e a aula volta marcada com check amarelo).

---

## Desempenho percebido no build (`npm run build` + `npx vite preview`)

Medição em Chrome headless (`400 × 860`, cache desabilitado, `http://127.0.0.1:5298`):
- **Tempo de build:** `8,1 s` (`358` módulos transformados).
- **Bundle principal:** `dist/assets/index-CPSBQnwy.js` = **711,1 kB** bruto (**222 kB** transferidos com gzip; Vite emite aviso de chunk > 500 kB); CSS = **16,6 kB** (4,1 kB gzip); as 104 aulas já ficam separadas em chunks individuais de 9,8–18,7 kB cada.
- **Carga fria até a primeira tela (`.home`):**
  - `DOMContentLoaded`: **718 ms**
  - `load`: **721 ms**
  - `first-paint` / `first-contentful-paint` (FCP): **840 ms**
  - Tempo total até `.home` visível: **1184 ms**
  - Recursos na primeira carga: **23 arquivos** / **534 kB** transferidos (JS principal 222 kB + sprites `.webp` de 27–28 kB cada).

---

## Achados por gravidade

### Bloqueia a demo

Nenhum achado bloqueante. Um usuário de primeira viagem consegue abrir o app, passar pelas boas-vindas, escolher e concluir uma aula, fazer as três etapas do treino e manter o progresso salvo após recarregar a página, sem travamentos nem erros no console.

---

### Atrapalha (proposta para corrigir na Parte 2)

#### A1 — Pilar inicial fixo em "Geometria" e perdido ao voltar da aula ou recarregar
- **Onde:** `src/Home.tsx:43` (`useState("geometria")`).
- **Capturas:** `02-home-apos-boas-vindas-400.png`, `02-home-apos-boas-vindas-1280.png`, `13-volta-trilha-400.png`.
- **O que acontece:** Na primeira visita, o botão mais à esquerda é **Aritmética**, mas o app abre selecionado em **Geometria**. Pior: depois de concluir uma aula de Aritmética e clicar em **Voltar à trilha**, o usuário é jogado de volta em **Geometria**, embora o Paco diga *"Bom te ver de novo. Continue de onde parou."* — o check de conclusão da aula recém-terminada desaparece de vista até o aluno trocar de pilar na mão.
- **Correção proposta:** Iniciar no primeiro pilar da taxonomia (`taxonomy.pilares[0].id`, `"aritmetica"`) e salvar o pilar escolhido em `localStorage` (`mat:pilar-ativo:v1`).

#### A2 — Na primeira visita a trilha abre toda fechada, contrariando a fala do Paco
- **Onde:** `src/Home.tsx:14-25` (`lerAbertos` inicia com `Set` vazio).
- **Capturas:** `02-home-apos-boas-vindas-400.png`, `02-home-apos-boas-vindas-1280.png`.
- **O que acontece:** O Paco diz *"Comece pela primeira aula da trilha. Eu te acompanho."*, mas nenhum setor nem unidade está aberto — não há nenhuma aula clicável visível. Quem chega pela primeira vez precisa abrir dois acordeões (setor + unidade) e rolar para encontrar a Aula 01.
- **Correção proposta:** Quando não houver chave salva em `mat:trilha-aberta:v1`, iniciar com o primeiro setor e a primeira unidade do pilar inicial abertos, expondo logo a Aula 01.

#### A3 — Convite do treino de vestibular anuncia sempre "4 questões", mesmo quando há menos
- **Onde:** `src/treino/falas.ts:14,20,21` e `src/treino/Treino.tsx:242`.
- **Capturas:** `10-treino-resultado-desafio-400.png` (Paco diz *"Separei 4 questões que já caíram em provas."*) vs `11-treino-vestibular-q1-400.png` (contador real: `VESTIBULAR 1 DE 3`).
- **O que acontece:** A maioria das aulas do app tem 1, 2 ou 3 questões de vestibular, não 4. Dizer "Separei 4 questões" e abrir "1 de 3" (ou "1 de 1") quebra a confiança logo na transição do treino.
- **Correção proposta:** Formatar o convite da próxima etapa com a contagem real de questões (`questoesDaEtapa(treino, proxima).length`), tratando singular e plural (*"Separei 1 questão…" / "Separei N questões…"*).

#### A4 — Rota inexistente exibe `<pre class="error-box">` cru com aparência de erro técnico
- **Onde:** `src/App.tsx:59-64` e `src/ui/styles.css:907-917`.
- **Capturas:** `15-rota-inexistente-400.png`, `15-rota-inexistente-1280.png`.
- **O que acontece:** Acessar `#/aula/nao/existe/aqui/aula-01` mostra um bloco `<pre>` monoespaçado em vermelho (`Aula não encontrada: nao/existe/aqui/aula-01`) sem título `<h1>`, sem personagem e solto no topo de uma página em branco.
- **Correção proposta:** Trocar o `<pre>` por uma tela amigável na mesma estética de `.finish` (Paco, `<h1>Aula não encontrada</h1>`, explicação curta em linguagem natural e botão primário **Voltar à trilha**).

#### A5 — Contraste abaixo de WCAG AA em rótulos secundários, título de conclusão e botões verdes
- **Onde:** `src/ui/palette.ts` e `src/ui/styles.css`.
- **Capturas e medições (`auditoria-completa.json`):**
  - `--muted` (`#8A8A8A`) sobre `#FFFFFF` (**3,45:1**) e sobre `#F7F7F7` (**3,22:1**, mínimo AA 4,5:1) em `.sector__sub`, `.unit__sub`, `.node__label`, `.treino__contador`, `.hint` e `.empty` (`01-home-boas-vindas-400.png`, `03-trilha-aberta-400.png`, `07-treino-basico-q1-400.png`).
  - `--yellow-dark` (`#D89E00`) sobre `#FFFFFF` (**2,38:1**, abaixo até de 3,0:1 para texto grande 28 px bold) em `.finish__title` (`06-convite-treino-400.png`, `10-treino-resultado-desafio-400.png`).
  - `--green` (`#4CBF12`) com texto branco (**2,39:1**) nos botões primários `.btn` e `--green-dark` (`#3A9A0A`) sobre `--green-tint` (`#DDF5CC`) (**3,10:1**) no feedback positivo (`08b-treino-feedback-certa-400.png`).
  - `--c2`/`--r` (`#F28C00`) sobre `#FFFFFF` (**2,46:1**) em fichas desligadas da fórmula (`05-aula-fechamento-400.png`).
- **Correção proposta:** Escurecer os tons usados em texto mantendo a paleta viva e flat: `--muted` para `#6B6B6B` (≥ 5,0:1 em `#FFFFFF` e `#F7F7F7`), cor de texto de `.finish__title` para tom âmbar mais escuro (`#9A6F00`, ≥ 4,5:1), `--green` de botão e `--green-dark` de feedback com contraste ≥ 4,5:1, e uso de `--r-dark`/`--c2-dark` no texto das fichas `.btn--off`.

#### A6 — Barra de progresso sem rótulo acessível e botão de fechar sem `:focus-visible` próprio
- **Onde:** `src/ui/Tactile.tsx:43` e `src/ui/styles.css:192-206`.
- **Capturas:** `04-aula-passo1-400.png` (auditoria: `div.progress[role=progressbar]` sem nome acessível) e `04b-foco-tab-sair-400.png` (`.icon-btn` depende do `outline: auto 1px` padrão do navegador, inconsistente com o contorno de 3 px de `.btn` e `.card`).
- **Correção proposta:** Passar `aria-label` em `ProgressBar` (padrão `"Progresso da aula"`, e `"Progresso do treino"` em `Treino.tsx`) e adicionar `.icon-btn:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }`.

---

### Detalhe (registrados; não entram na Parte 2 salvo pedido do maestro)

#### D1 — Grade de 12 matérias empurra a trilha de Matemática para baixo da dobra no celular
- **Capturas:** `01-home-boas-vindas-400.png`, `02-home-apos-boas-vindas-400.png`, `03-trilha-aberta-400.png`.
- **Observação:** Das 12 matérias exibidas no topo, 11 ainda estão "em produção", mas os 12 botões ocupam ~430 px verticais em `400 × 860`, deixando a `Aula 01` abaixo da dobra mesmo com setor e unidade abertos. Em uma versão futura, vale recolher as matérias em produção (ou usar uma faixa horizontal rolável) para destacar Matemática.

#### D2 — No desktop (`1280 × 800`), a barra de rolagem interna flutua sobre o fundo branco
- **Capturas:** `01-home-boas-vindas-1280.png`, `02-home-apos-boas-vindas-1280.png`, `14-pos-reload-progresso-1280.png`.
- **Observação:** Como `.app` tem `max-width: 480px; height: 100dvh` com fundo `#FFFFFF` igual ao `body` e `.home` usa `overflow-y: auto`, a barra de rolagem aparece solta no meio da janela em telas largas. Em `@media (min-width: 520px)`, dar fundo `var(--surface)` ao `body` e bordas laterais suaves a `.app` enquadra a coluna no desktop.

#### D3 — Chunk JS principal de 711 kB no build de produção
- **Evidência:** `dist/assets/index-CPSBQnwy.js` = `711,1 kB` bruto (`222 kB` gzip). Em localhost o carregamento foi rápido (`FCP 840 ms`), mas em conexões móveis lentas vale carregar os widgets sob demanda com `React.lazy` após a demo.

#### D4 — Verificações que passaram sem defeitos
- **Acentuação:** 0 textos visíveis sem acento em `src/` (fora `widgets/`) e `content/taxonomy.json`.
- **Overflow lateral:** 0 px de rolagem horizontal em todas as 25 capturas (`400 × 860` e `1280 × 800`).
- **Persistência de progresso:** `mat:progress:v1` grava a conclusão ao finalizar o último passo e mantém a aula marcada após recarregar a página (`14-pos-reload-progresso-1280.png`).
