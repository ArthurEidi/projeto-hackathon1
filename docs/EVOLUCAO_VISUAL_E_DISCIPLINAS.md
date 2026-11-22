# Evolução visual e novas disciplinas

Data: 21/11/2026. Continuação de `docs/AUDITORIA_BASE_HACKBRASIL.md` e `docs/VALIDACAO_TECNICA_HACKBRASIL.md`.

Legenda: **[EXECUTADO]** = rodado ou visto no navegador nesta sessão; **[INSPECIONADO]** = conferido só no código.

---

## 1. Resumo das melhorias

O app deixou de ser uma trilha só de Matemática e passou a ter três áreas principais: **Matemática, Física e Química**. Elas compartilham um único design system, e cada área tem uma cor de identidade.

| Entrega | Situação |
|---|---|
| Nova identidade visual (azul-profundo, neutros frios, Inter, cards, sombras discretas) | Concluída |
| Página inicial com proposta, demonstração interativa real, três áreas, "continuar aprendendo" e questão em destaque | Concluída |
| Navegação por área (`#/materia/<id>`); voltar da aula leva à área de origem | Concluída |
| Aula em duas colunas no desktop (texto e controles à esquerda, área visual à direita); empilhada no celular | Concluída |
| Cabeçalho da aula com área, unidade, título, "Explorar · 2 de 6" e barra de progresso | Concluída |
| Conclusão da aula com selo, convite ao treino e **acesso à próxima aula** | Concluída |
| **Física:** widget de lançamento oblíquo com animação + aula completa | Concluída (1 aula) |
| **Química:** widget de soluções e concentração + aula completa | Concluída (1 aula) |
| **Questão visual:** ENEM 2022 Q150 (saque de vôlei) como aula, com enunciado oficial visível em todos os passos | Concluída |
| As 104 aulas de Matemática preservadas, sem nenhum JSON editado | Concluída |

**Números reconferidos [EXECUTADO]:**

- **Aulas:** 107 publicadas (104 de Matemática, mais a questão visual em Matemática, 1 de Física e 1 de Química).
- **Widgets:** 22 interativos e 22 figuras.
- **Testes:** 141 arquivos e **2.227 aprovados**, antes 135 arquivos e 2.174 (+53, nenhuma regressão).

---

## 2. Alterações na arquitetura

Nenhuma reescrita. O motor de aulas, o schema Zod, os widgets Canvas e os testes foram reaproveitados. As mudanças são aditivas.

| Mudança | Arquivo | Compatibilidade |
|---|---|---|
| `Taxonomy.disciplinas` opcional (`fisica`, `quimica`), com a mesma forma de um pilar | `src/engine/schema.ts` | Taxonomia sem `disciplinas` continua válida (teste de regressão). Matemática segue com exatamente 3 pilares. |
| `Lesson.questao` opcional: enunciado real (parágrafos), dados do problema e fonte com as mesmas regras do vestibular | `src/engine/schema.ts` | Aulas sem o campo não mudam. |
| `micro_challenge` aceita até **5** alternativas (antes 4), para a questão oficial A–E | `src/engine/schema.ts` | Todos os 104 desafios continuam com 4; teste recusa 6. |
| `listAulas()` devolve a área (`materia`) de cada aula; `proximaAula()` acha a seguinte publicada na mesma área | `src/engine/content.ts` | Chaves das aulas de Matemática inalteradas. |
| Rota `#/materia/<id>`; `#/` agora é a página inicial | `src/engine/rota.ts`, `src/App.tsx` | Hash desconhecido continua indo para o início; testes de rota existentes passam. |
| Metadados das 3 áreas (título, resumo, cor) no lugar da lista de 12 matérias | `src/engine/materias.ts` | A faixa com 11 matérias "em produção" saiu da interface. |
| `StepLayout` recebe `figura` (área visual) separada dos controles; contexto `TopoDoPasso` para o enunciado | `src/steps/StepLayout.tsx` | Os 4 tipos de passo e o treino foram adaptados; a lógica de conclusão não mudou. |
| Páginas novas: início, área (Física/Química), barra superior, ícones e miniaturas em SVG | `src/paginas/` | — |
| Lint de conteúdo percorre pilares e disciplinas | `scripts/lint-content.ts` | — |

**Fluxo de navegação:** `#/` (início) → `#/materia/<área>` → `#/aula/<chave>` → conclusão → próxima aula ou treino. Ao sair, a aula volta para a área de origem, e o foco vai para o cartão da aula.

**Novas disciplinas no futuro:** acrescente o id em `DISCIPLINAS_EXTRAS` (`schema.ts`), em `MATERIAS` (`materias.ts`) e em `MATERIAS_VALIDAS` (`rota.ts`). Depois, uma entrada em `taxonomy.disciplinas`. Um widget novo segue o padrão `params.ts` / `calc.ts` / `desenho.ts` / `*Widget.tsx` / `*Figura.tsx` e é registrado em `src/widgets/common/index.ts` e `params.ts`. Leis de Newton, energia, ondas, eletricidade e óptica (Física) e estrutura atômica, ligações, pH, tabela periódica e equilíbrio (Química) entram assim. **Nenhuma delas foi implementada.**

---

## 3. Design system implementado

Tokens em `src/ui/palette.ts`, exportados como variáveis CSS em `:root`, e estilos em `src/ui/styles.css`.

| Token | Valor | Uso |
|---|---|---|
| `--brand` | `#0B1F4D` | Azul-profundo: barra superior e títulos |
| `--accent` / `--accent-dark` | `#2563EB` / `#1D4ED8` | Ações principais (botões, foco, links) |
| `--accent-tint` | `#EFF4FF` | Seleção e realce suave |
| `--ink`, `--ink2`, `--muted` | `#0F172A`, `#334155`, `#64748B` | Texto |
| `--bg`, `--surface`, `--line`, `--line-dark` | `#FFFFFF`, `#F5F7FA`, `#E2E8F0`, `#CBD5E1` | Fundos e divisórias |
| Sucesso / erro | `#16A34A` / `#DC2626` (texto em `#15803D` / `#B91C1C`) | Feedback |
| Matemática | `#1D4ED8` (tinta `#EAF0FE`) | Identidade da área |
| Física | `#6D28D9` (tinta `#F1EBFD`) | Identidade da área |
| Química | `#047857` (tinta `#E3F5EE`) | Identidade da área |

- **Cor da área:** a variável `--area` muda por página e por aula. Só selos, ícones, a barra de progresso e as bordas de destaque mudam de cor; o resto é igual nas três áreas. As cores das áreas passam 4,5:1 com texto branco e sobre branco.
- **Tipografia:** Inter (400–800) na interface. Os rótulos dentro dos canvas continuam em Nunito, porque as posições dos rótulos das 104 aulas foram calibradas com essa fonte, e trocá-la arriscaria sobreposições em todas as figuras.
- **Componentes:**
  - botões com borda de 1 px e raio de 12 px;
  - cards com sombra discreta;
  - abas de pilar em "segmented control";
  - sliders com trilho de 8 px e alça de 28 px;
  - painéis de medidas com a cor da marca na borda.
- **Movimento:** transições de 120 a 260 ms. Tudo é desligado com `prefers-reduced-motion` (regra global já existente). A animação do lançamento também respeita a preferência: a bola vai direto ao ponto de queda.
- **Contraste e acessibilidade:** todas as regras de contraste verificadas pelos testes B54 foram mantidas. Foco visível em azul, `aria-live` nos painéis de resultados, `role="img"` com descrição nos canvas novos.

---

## 4. Melhorias na Matemática

- **Estrutura preservada:** 104 aulas, 3 pilares e 13 setores, com os mesmos testes. Nenhum JSON de aula existente foi editado.
- **Apresentação:**
  - página da área com cabeçalho, contagem real de aulas e de concluídas;
  - abas de pilar;
  - setores em cards;
  - unidades em duas colunas no desktop.
- **Aulas no desktop:** o gráfico deixou de ficar preso numa coluna de celular de 480 px e ganhou a coluna da direita (até cerca de 700 px, limitado pela altura da tela e fixo ao rolar).
- **Gráficos (componentes compartilhados, sem editar aulas):**
  - as guias horizontais e verticais do `plano_cartesiano` com cor de marca agora engrossam ou afinam junto com o destaque da fórmula no fechamento, como as curvas já faziam (`desenhoPlano.ts`);
  - o palco ganhou borda verde ao concluir o passo, e verde ou vermelha conforme o acerto ou o erro no desafio.
- **Questão visual (Etapa 4):** nova unidade em Álgebra → Funções, "Questão visual: saque de vôlei (ENEM 2022)", destacada também na página inicial.
- **Não feito (pendente):** melhorias específicas por widget, como marcação automática de vértice e interseções em todas as aulas, transições animadas entre estados de slider ou escalas de eixo personalizadas. Isso exigiria mexer em cada aula ou em cada widget; ficou fora para não arriscar as 104 aulas.

---

## 5. Física: lançamento oblíquo

Widget `lancamento_obliquo` (interativo) e `lancamento_figura` (estático), em `src/widgets/common/lancamento/`.

**Modelo, declarado no código, na aula e no painel:**

- sem resistência do ar;
- g constante, 10 m/s² por padrão (configurável);
- ponto material;
- solo plano;
- altura inicial h₀ ≥ 0 (opcional).

**Equações:**

| Grandeza | Fórmula |
|---|---|
| Posição | x(t) = v₀·cos θ·t, y(t) = h₀ + v₀·sen θ·t − g·t²/2 |
| Tempo de voo | T = (v_y + √(v_y² + 2gh₀))/g |
| Altura máxima | H = h₀ + v_y²/2g |
| Alcance | A = v_x·T |

Com h₀ = 0, as fórmulas viram as do ensino médio (A = v₀²·sen 2θ/g, e assim por diante). Os testes conferem os dois casos e também uma simulação numérica (Euler).

**O que o aluno faz:**

1. Muda ângulo e velocidade nos sliders (mouse, toque ou teclado). A trajetória prevista (tracejada) e o painel com H, A e T mudam na hora.
2. Toca em "Lançar": a bola percorre a trajetória (animação por `requestAnimationFrame`).
3. Compara com até 4 lançamentos anteriores, desenhados em cinza na mesma escala. A escala é fixada pelo maior lançamento possível nas faixas dos sliders, então trajetórias diferentes são comparáveis.
4. Vê θ, o vetor v₀ com as componentes, H e A no desenho, cada um com a cor da marca usada no painel e na fórmula. As etiquetas evitam sobreposição.
5. Resolve um alvo: acertar 20 m com v₀ = 20 m/s exige θ = 15° ou 75°. O alcance fica oculto até acertar (`antes_de_concluir`).

**Aula** `content/fisica/cinematica/lancamento-obliquo/aula-01.json`, "A Bola que Faz Parábola", em 6 passos:

1. primeiro lançamento;
2. comparar ângulos (complementares empatam; 45° é o máximo);
3. dobrar v₀ (alcance e altura × 4);
4. acertar o alvo;
5. desafio "qual o alcance a 45°?", com figura própria para cada erro (H no lugar de A, v₀²/2g, sen θ no lugar de sen 2θ);
6. fechamento com A = v₀²·sen 2θ/g tocável.

O treino tem 12 questões autorais. **Vestibular vazio:** nenhuma fonte foi inventada.

**Métricas para `complete_when`:** `lancamentos`, `angulos_testados`, `velocidades_testadas`, `acertou_alvo`, `alcance`, `altura_max`, `tempo_voo`.

**Limitações pedagógicas:** não modela resistência do ar, vento, rotação nem altura de chegada diferente da de saída (h₀ > 0 é suportado no widget, mas não usado na aula). O vetor v₀ é desenhado com comprimento proporcional à velocidade, mas sem escala física (m/s não é metro).

---

## 6. Química: soluções e concentração

**Escolha: opção B (soluções e concentrações).**

- **Opção B:** cabe no motor atual sem passos novos (dois sliders, massa e volume, e métricas contínuas), tem conta simples e verificável (C = m/V, C₁V₁ = C₂V₂, n = m/M) e uma representação visual fiel: nível proporcional ao volume, partículas proporcionais à massa, cor proporcional à concentração.
- **Opção A (estequiometria):** exigiria representar moléculas, coeficientes e reagente limitante, com mais estados discretos e mais risco de uma representação incorreta.

Widget `solucao_concentracao` (interativo) e `solucao_figura` (estático), em `src/widgets/common/solucao/`.

**Premissas, declaradas no código e na aula:**

- o volume da solução é o volume medido no béquer (o soluto não altera o volume, aproximação usual do ensino médio);
- temperatura constante;
- dissolução completa até a solubilidade, quando ela é informada; acima dela, o excesso fica como cristais no fundo e não entra em C;
- na diluição só entra solvente.

**Representação:**

- **Nível do líquido:** proporcional ao volume, com graduação a cada 100 mL.
- **Partículas:** simbólicas, cada uma valendo uma massa fixa (dito na aula: "cada bolinha representa 1 g, não uma molécula"). Têm posições fixas por índice, então, quando o volume aumenta, as mesmas partículas se espalham.
- **Cor do líquido:** a intensidade cresce com a concentração (sulfato de cobre, solução azul). É um indicador qualitativo, não uma medida colorimétrica calibrada.
- **Medidor de C:** com marca de meta.
- **Painel:** a conta com os números atuais, e mol/L quando há massa molar (CuSO₄: 159,5 g/mol, das massas atômicas arredondadas Cu 63,5, S 32, O 16).

**Aula** `content/quimica/solucoes/concentracao-comum/aula-01.json`, "A Cor da Concentração", em 5 passos:

1. mais soluto no mesmo volume;
2. diluição de 200 para 800 mL, com o béquer "antes" ao lado;
3. preparar 40 g/L combinando massa e volume (com mol/L);
4. desafio de diluição, com figura de cada erro (dividir pela água adicionada, achar que não muda, multiplicar pela razão);
5. fechamento C = m/V.

O treino tem 12 questões autorais. Vestibular vazio.

**Limitações:**

- a aula não usa solubilidade: os sliders ficam abaixo de 200 g/L, faixa testada;
- não há contração de volume nem dependência de temperatura;
- a cor não segue a lei de Beer-Lambert quantitativamente.

---

## 7. Questão como experiência visual (ENEM 2022, saque de vôlei)

**Viabilidade confirmada no código, sem novo widget:** a questão usa o `plano_cartesiano`, com

- `transforma.k = 1,5` para passar a altura medida a partir do eixo para a altura medida a partir do piso;
- `guias.horizontais` para os tetos;
- uma segunda curva `afim` ligada ao slider do teto;
- `marcar.encontro` para mostrar onde a bola toca o teto;
- a métrica `no_vertice`.

As únicas extensões foram o campo `questao` (enunciado sempre visível) e o limite de 5 alternativas.

**Fluxo da aula** `content/algebra/funcoes/saque-de-volei-enem-2022/aula-01.json` (6 passos):

1. **Ler e identificar os dados:** enunciado oficial aberto no topo, com fichas de dados (trajetória, eixo a 1,5 m, tetos). O aluno arrasta a bola pela trajetória.
2. **Vértice:** leva a bola ao topo (x = −7). A marca do vértice só aparece ao concluir. A dúvida da Tati mostra a conta: y = −Δ/4a = 121/6.
3. **Mudança de referência:** a curva sobe 1,5 m (piso), e o aluno sobe o teto de 17 m até a bola deixar de tocar (22 m). Os pontos de encontro aparecem na hora.
4. **Desafio da altura máxima:** 21,67 m, com figura de cada erro (20,17 m sem o eixo; 13,5 m em x = 0; 7 m que é posição, não altura).
5. **Responder à questão:** as 5 alternativas oficiais A–E. A C mostra o gráfico sem os 1,5 m, que é exatamente o erro desse distrator.
6. **Fechamento:** H = −Δ/4a + 1,5.

**Fonte e cálculos:**

- **Texto:** oficial obtido em `https://api.enem.dev/v1/exams/2022/questions/150`, com gabarito D.
- **Equação:** a API traz a equação como imagem. O texto usa a transcrição já auditada pelo projeto (`y = −x²/6 − 7x/3 + 12`), e ela é consistente com o gabarito oficial: o topo fica a 21,67 m, acima de 21 e abaixo de 40.
- **Adaptação** (registrada em `fonte.adaptacao`): equação em texto, figura substituída pelo gráfico interativo, lista de ginásios em linha.
- **Testes** (`src/conteudo/saque-de-volei-enem-2022.test.ts`) refazem: vértice (−7; 121/6), raízes −18 e 4, encontros com 19 m (x = −11 e −3) e 21 m (x = −9 e −5), nenhum encontro com 22 m e 40 m, e só D correta.

**Honestidade de escopo:** a plataforma **não** interpreta enunciados automaticamente. A questão foi transformada à mão em uma aula, com o motor existente. Não há IA no produto.

**Pendência:** a mesma questão ainda aparece no treino de vestibular de `funcao-quadratica`. Isso não é erro, mas o aluno pode vê-la duas vezes.

---

## 8. Novos recursos gráficos

- **Simulação animada de lançamento:** Canvas, escala igual nos dois eixos (forma real da trajetória), trajetórias anteriores para comparar, marcas de θ, v₀, H e A com cores consistentes com painel e fórmula, etiquetas que evitam sobreposição, alvo no solo.
- **Béquer com nível, cor e partículas proporcionais**, medidor de concentração com meta, béquer "antes" para diluição e cristais de excesso.
- **Demonstração da página inicial em SVG:** a trajetória real (mesmo módulo de física da aula), com sliders de ângulo e velocidade, e altura, alcance e tempo atualizados na hora.
- **Miniaturas dos cards em SVG**, todas esquemas fiéis com números comentados no código: parábola com vértice e raízes; dois lançamentos complementares com o mesmo alcance; dois béqueres com o dobro de soluto.
- **Palco com estado:** borda verde ao concluir, verde ou vermelha no acerto ou erro do desafio.
- **Painéis de medidas** com a cor da marca e a fórmula ao lado do valor (desktop); compactos no celular para os sliders ficarem visíveis.

---

## 9. Arquivos modificados

**Novos:**

- `src/widgets/common/lancamento/`: `calc.ts`, `params.ts`, `desenho.ts`, `LancamentoWidget.tsx`, `LancamentoFigura.tsx`, `PainelLancamento.tsx`, `lancamento.test.ts`
- `src/widgets/common/solucao/`: `calc.ts`, `params.ts`, `desenho.ts`, `SolucaoWidget.tsx`, `SolucaoFigura.tsx`, `PainelSolucao.tsx`, `solucao.test.ts`
- `src/paginas/`: `Inicio.tsx`, `PaginaDisciplina.tsx`, `BarraTopo.tsx`, `DemoTrajetoria.tsx`, `IconesMaterias.tsx`
- `content/fisica/cinematica/lancamento-obliquo/aula-01.json`
- `content/quimica/solucoes/concentracao-comum/aula-01.json`
- `content/algebra/funcoes/saque-de-volei-enem-2022/aula-01.json`
- `src/conteudo/lancamento-obliquo.test.ts`, `concentracao-comum.test.ts`, `saque-de-volei-enem-2022.test.ts`
- `src/engine/disciplinas.test.tsx`
- `docs/EVOLUCAO_VISUAL_E_DISCIPLINAS.md`

**Alterados:**

- `src/engine/`: `schema.ts`, `content.ts`, `rota.ts`, `materias.ts`, `LessonPlayer.tsx`
- `src/App.tsx`, `src/Home.tsx`
- `src/steps/`: `StepLayout.tsx`, `InteractiveCanvas.tsx`, `MicroChallenge.tsx`, `ConceptLock.tsx`, `ManimVideo.tsx`
- `src/treino/Treino.tsx`
- `src/ui/`: `styles.css` (reescrito), `palette.ts`
- `src/widgets/common/`: `index.ts`, `params.ts` (registro), `desenhoPlano.ts` (guias com destaque)
- `content/taxonomy.json` (unidade do vôlei e `disciplinas`)
- `scripts/lint-content.ts`
- `index.html` (título, descrição, fontes, cor do tema)
- `docs/EM-ANDAMENTO.md`, `docs/PROXIMOS-PASSOS.md` (registro da sessão)

**Não alterados:** os 104 JSON de aula de Matemática, todos os outros widgets, os testes existentes, `package.json` e `package-lock.json`.

---

## 10. Testes executados

| Verificação | Resultado |
|---|---|
| `npm run lint:content` | **ok** ("conteúdo ok") [EXECUTADO] |
| `npx tsc --noEmit` (typecheck) | **ok**, sem erros [EXECUTADO] |
| `npx vitest run` | **141 arquivos, 2.227 aprovados, 0 reprovados** [EXECUTADO] |
| `npm run build` | **ok**, sem avisos. JS inicial 463,6 kB (136,2 kB gzip), antes 438,3 kB (128,5 kB). Player 309 kB (108 kB gzip). CSS 30 kB [EXECUTADO] |
| `npm run lint:planos` | falha **preexistente** em `docs/planos/funcao-modular.md` (formato da seção de vestibular), igual à validação anterior. As aulas novas não têm roteiro em `docs/planos/` (ver pendências) [EXECUTADO] |

**Testes novos (+53):**

- física por fórmula fechada e por simulação numérica;
- química (C, mol/L, diluição, saturação, partículas);
- cada aula nova (passos completáveis, metas alcançáveis pelos sliders e não no início, gabaritos refeitos por conta);
- taxonomia com disciplinas e compatibilidade sem elas;
- rota `#/materia`;
- `proximaAula`;
- schema com 5 alternativas e recusa de 6;
- renderização do início e das páginas de área.

**Navegador** [EXECUTADO, navegador embutido, servidor Vite local]:

| Tela | Desktop 1366 × 820 | Celular 375 × 812 |
|---|---|---|
| Página inicial (demo, três cards, questão em destaque) | conferida | conferida, sem rolagem horizontal |
| Página de Matemática (trilha) | conferida | conferida |
| Página de Física | conferida | — |
| Questão do vôlei: passo 1 (arraste; ponto (−5; 19,5) confere) | conferida | — |
| Questão do vôlei: passo 3 (encontros (−12,29; 17) e (−1,71; 17) conferem; 22 m conclui) | conferida | — |
| Questão do vôlei: passo 5 (alternativa C mostra o erro dos 1,5 m) | conferida | — |
| Física: passo 1 (45°, 30 m/s: H = 22,5 m, A = 90 m, T = 4,24 s; animação em voo e conclusão) | conferida | passo 4 conferido (alcance oculto até acertar) |
| Química: passo 3 (20 g em 500 mL = 40 g/L e 0,251 mol/L; conclui) | conferida | passo 2 conferido (sliders visíveis abaixo do béquer) |

Problemas encontrados no navegador e **corrigidos** na sessão:

- barra de progresso do cabeçalho com altura zero;
- etiquetas θ, v₀ e H sobrepostas em trajetórias baixas;
- etiquetas V e C se tocando com pouco líquido;
- painel de medidas empurrando os sliders para fora da tela no celular;
- enunciado ocupando a coluna inteira em todos os passos (agora recolhido a partir do 2º passo).

Não testado no navegador: todas as 104 aulas de Matemática no novo layout (a varredura `scripts/varre-aulas.mjs` não foi rodada), leitor de tela real, celular físico, Safari, e o treino completo das aulas novas.

---

## 11. Problemas pendentes

1. **Varredura visual das 104 aulas no layout novo** não foi feita. O layout de duas colunas e a nova paleta valem para todas, e alguma figura pode ter ficado grande demais ou com rótulo apertado. Rodar `node scripts/varre-aulas.mjs <porta>` e olhar os casos sinalizados.
2. **Roteiros em `docs/planos/`** das três aulas novas não foram escritos. O conteúdo está nos JSON e neste documento. O `lint:planos` não as cobre e já tinha uma falha anterior (`funcao-modular.md`).
3. **Pré-carga do player:** como a página inicial agora tem uma demonstração, o JS inicial cresceu cerca de 25 kB. Aceitável, mas dá para levar a demo para um chunk separado se for necessário.
4. **Nome "Aula Visual"** é provisório (não havia nome de produto com três áreas). Trocar em `BarraTopo.tsx`, `index.html` e `Inicio.tsx`.
5. **Questão do vôlei duplicada** no treino de `funcao-quadratica`.
6. **Elegibilidade (Hack Brasil, regras 6.1 e 6.2)** continua pendente, como registrado em `docs/VALIDACAO_TECNICA_HACKBRASIL.md`. Esta sessão não mexeu em Git.
7. **Dependências apagadas por fora:** durante a sessão, o `node_modules` foi parcialmente apagado fora desta sessão. Havia um processo do Codex ativo na máquina. Foi reinstalado com `npm ci`, sem mudar o lockfile. Vale conferir se outro agente está trabalhando nesta pasta.
8. **Ainda não existe:** vestibular real para Física e Química (só entra com fonte oficial conferida) e as demais áreas futuras de Física e Química.

---

## 12. Próximos passos

1. Rodar a varredura visual das 104 aulas no layout novo e corrigir o que ela apontar.
2. Resolver a elegibilidade (repositório público criado depois de 4/11) antes de qualquer publicação.
3. Publicar a demo (Netlify ou Vercel; o build está pronto) e gravar o vídeo de 3 minutos com o fluxo: início → questão do vôlei → Física → Química.
4. Segunda experiência de Física reaproveitando o mesmo padrão (por exemplo, MRUV com gráfico x × t usando o `plano_cartesiano`), e de Química (diluição e mistura de soluções, ou pH com escala logarítmica).
5. Buscar questões oficiais de vestibular para as aulas de Física e Química, com a mesma auditoria das de Matemática.
6. Transformar mais 2 ou 3 questões do ENEM em aulas-questão, usando o campo `questao`.
