# Auditoria técnica inicial: Hack Brasil 2026

Data: 21/11/2026. Escopo: leitura e inspeção estática do diretório `C:\projeto-hackathon1-main`, mais comandos não destrutivos (contagens, um script de estatística só de leitura que rodou fora do repositório). **Nenhum arquivo do projeto foi alterado além deste relatório.** Nenhuma dependência foi instalada.

Legenda usada em todo o documento:

- **[FATO]**: verificado diretamente no código, nos arquivos ou com um comando executado nesta auditoria.
- **[DOC]**: afirmado pela documentação do projeto e não reproduzido aqui (por exemplo, resultados de testes).
- **[HIPÓTESE]**: inferência razoável que ainda precisa ser confirmada.
- **[RECOMENDAÇÃO]**: sugestão desta auditoria.

---

## 1. Resumo executivo

O repositório **não é um protótipo inicial**. É um app de aulas interativas de **Matemática do Ensino Médio** (React 19, TypeScript, Vite, sem backend), maduro em conteúdo e engenharia: 104 aulas em JSON validadas por schema Zod, 560 passos (351 deles com widget interativo), 20 widgets reutilizáveis desenhados em Canvas, 1.248 questões autorais e 188 questões reais de vestibular de 17 bancas, com 135 arquivos de teste [FATO: contagens feitas nesta auditoria].

Medido contra a **visão do Hack Brasil** (o aluno escolhe uma questão, vê os dados, manipula uma visualização e recebe explicação), o quadro muda:

| Elemento da visão | Situação |
|---|---|
| Visualização interativa de conceitos de matemática | **Existe e é o ponto forte** (código completo; execução não reproduzida aqui) |
| Explicação passo a passo, feedback por erro | **Existe**, roteirizada à mão em JSON |
| Selecionar **uma questão** e vê-la virar visualização | **Não implementado.** As 188 questões de vestibular ficam no fim da aula, em texto e imagem estática; **0 das 188 tem figura ou widget** [FATO] |
| Física e ciências da natureza | **Não implementado.** "Física" aparece só como ícone "em produção" [FATO] |
| Inteligência artificial | **Não implementado.** Nenhuma chamada de rede, SDK ou chave no código do app [FATO] |
| Entrada de questão pelo usuário | **Não implementado** |

**Limitação importante desta auditoria:** não foi possível executar lint, testes, typecheck, build nem abrir o app, porque `node_modules` não existe, a instrução foi não instalar dependências, e a pasta não é um repositório Git (é uma cópia sem `.git`). Os números de testes "passando" vêm da documentação, não desta auditoria.

**Recomendação central:** não reconstruir nada. O caminho mais curto para a demonstração do pitch é criar **uma "questão visual"** a partir de uma questão de vestibular que já está no app (ENEM 2022, saque de vôlei: trajetória parabólica), montada **só com JSON e o widget `plano_cartesiano` que já existe**, sem tocar no motor. Isso entrega o fluxo "questão → dados → visualização → manipulação → explicação" com a menor mudança possível e ainda dialoga com a física (trajetória de um lançamento).

---

## 2. Estado atual do repositório

### 2.1 Git

- [FATO] `git status` responde `fatal: not a git repository`. A pasta `projeto-hackathon1-main` é, muito provavelmente, um ZIP baixado do GitHub (o sufixo `-main` é o padrão do download) [HIPÓTESE].
- Consequências: não há como ver branch, histórico, alterações não commitadas ou arquivos não rastreados nesta cópia. `npm run publicar` (`scripts/publicar.sh`) falharia, porque depende de `git status`, `git pull --rebase` e `git push`.
- [DOC] `docs/PROXIMOS-PASSOS.md:73` cita trabalho **não auditado** no branch remoto `wip-20-11-noite` (B46b, B60–B62, B45b2/B45d3). Esse trabalho **não está nesta cópia**.
- [DOC] O README e `docs/EM-ANDAMENTO.md` citam muitos commits (por exemplo, `d2cd6c4`, `14fecbb`), mas não dá para conferir sem o `.git`.

### 2.2 Ambiente

| Item | Valor encontrado | Esperado pelo projeto |
|---|---|---|
| Node | **v24.14.0** [FATO] | "Desenvolvido com Node 26" (`CLAUDE.md`, README); workflow usa `node-version: 26` |
| npm | 11.9.0 [FATO] | — |
| Python | 3.11.9 [FATO] | Só para scripts auxiliares e Manim |
| `node_modules` | **ausente** [FATO] | `npm install` / `npm ci` |
| `tsc`, `vitest`, `vite`, `tsx` globais | ausentes [FATO] | vêm de `devDependencies` |

### 2.3 Árvore simplificada

```
projeto-hackathon1-main/
├── index.html                 # ponto de entrada HTML (carrega fonte Nunito do Google Fonts)
├── package.json               # scripts e 3 dependências de runtime
├── vite.config.ts             # base relativa no build, porta 5173
├── tsconfig.json              # strict, noUnused*, inclui src/scripts/content
├── content/
│   ├── taxonomy.json          # trilha: 3 pilares > 13 setores > unidades > aulas
│   └── <pilar>/<setor>/<slug>/aula-01.json   # 104 aulas (dados puros)
├── src/
│   ├── main.tsx, App.tsx      # bootstrap, roteamento por hash, carregamento sob demanda
│   ├── Home.tsx               # tela da trilha (matérias, pilares, setores, unidades)
│   ├── engine/                # schema Zod, carregador, rota, progresso, armazenamento seguro
│   ├── steps/                 # as 4 telas de passo (canvas interativo, vídeo, desafio, fechamento)
│   ├── treino/                # treino pós-aula em 3 etapas (básico, desafios, vestibular)
│   ├── widgets/
│   │   ├── registry.ts, params.ts   # registro de widgets/figuras e contratos de parâmetros
│   │   ├── canvas.ts                # hook useCanvas (DPR, ResizeObserver, hit-test de rótulos)
│   │   ├── Revolution/Generatrix/ConeFigure  # widgets do capítulo-modelo (Cones)
│   │   └── common/            # 20 widgets reutilizáveis + matemática pura (plot2d, expr, calc.ts)
│   ├── characters/            # sprites e diálogos do Paco e da Tati
│   ├── math3d/                # projeção e sólidos de revolução
│   ├── ui/                    # botões, slider, ícones, paleta, CSS (1.088 linhas)
│   └── conteudo/              # 104 testes, um por capítulo (gabaritos refeitos por conta)
├── scripts/                   # lint de conteúdo/roteiros, varredura headless, atalho Windows, publicar
├── public/                    # sprites (webp), 42 imagens de vestibular, 1 vídeo Manim
├── manim/                     # 1 cena Python (corte do cone)
├── docs/                      # método, guia, 104 roteiros, ~100 relatórios de revisão e coordenação
└── .github/workflows/pages.yml  # deploy manual no GitHub Pages (nunca disparado, segundo a doc)
```

| Diretório | Responsabilidade |
|---|---|
| `content/` | **Todo o conteúdo pedagógico.** Nenhuma aula está no código: o motor só interpreta JSON. |
| `src/engine/` | Contrato (`schema.ts`), carga (`content.ts`), rota (`rota.ts`), progresso (`progress.ts`, `armazenamento.ts`), regra de conclusão (`completion.ts`). |
| `src/steps/` | Renderização dos 4 tipos de passo. `StepRenderer.tsx` é o único ponto que mapeia `type` → componente. |
| `src/widgets/common/` | Cada widget em pasta própria com o padrão `params.ts` (Zod), `calc.ts` (matemática pura, testável), `desenho.ts` (Canvas), `*Widget.tsx` (interativo) e `*Figura.tsx` (estático). |
| `src/treino/` | Questões de múltipla escolha com feedback por alternativa, sem nova tentativa. |
| `scripts/` | Garantia de qualidade fora do app: `lint-content.ts`, `lint-planos.ts`, `varre-aulas.mjs` (Chrome headless), `captura-aula.mjs`. |
| `docs/` | Documentação extensa de processo (método, guia de capítulos, coordenação entre máquinas e agentes). |

---

## 3. Arquitetura identificada

### 3.1 Visão geral

App **estático, 100% no cliente** [FATO]. Não há backend, banco de dados, API ou autenticação. O único estado persistente é o `localStorage` (progresso, pilar ativo, seções abertas, boas-vindas).

```
index.html → main.tsx → App.tsx (rota por hash)
                          ├─ "#/"  → Home.tsx ── listAulas() ← taxonomy.json (Zod)
                          └─ "#/aula/<chave>" → iniciarAbertura()
                                ├─ import() do chunk do player (LessonPlayer + widgets)
                                └─ import() do JSON da aula → Lesson.safeParse (Zod)
                                      ↓
                                LessonPlayer → StepRenderer → {InteractiveCanvas | ManimVideo | MicroChallenge | ConceptLock}
                                      │                              │
                                      │                    widgets[step.widget] (registry.ts)
                                      │                    params (Zod) + sliders → métricas → isComplete()
                                      ↓
                                markComplete() → localStorage ; ConviteTreino → Treino (3 etapas)
```

### 3.2 Fluxo de comunicação entre módulos

1. **Rota** (`src/engine/rota.ts`): parser de hash que nunca lança; `?passo=N` só em desenvolvimento.
2. **Carga** (`src/engine/content.ts:44-54`): `import.meta.glob` gera um chunk por aula; o JSON é validado por `Lesson.safeParse`. Falha de rede e conteúdo inválido viram telas distintas (`App.tsx:178-186`).
3. **Contrato** (`src/engine/schema.ts`): o schema da aula valida os `params` de cada passo contra o schema do widget citado (`schema.ts:63-75`), as alternativas do desafio contra a figura (`schema.ts:107-112`) e as marcas da fórmula contra o glossário (`schema.ts:220-229`). Conteúdo inválido não chega ao widget.
4. **Passo interativo** (`src/steps/InteractiveCanvas.tsx`): guarda os valores dos sliders, recebe métricas do widget por `onMetric`, e libera "Continuar" quando `isComplete(complete_when, métricas)` fica verdadeiro (`completion.ts`). Os próprios sliders também são métricas.
5. **Desafio** (`src/steps/MicroChallenge.tsx`): cada alternativa traz um `figure` que **sobrepõe** os parâmetros da figura; a figura muda para mostrar o erro daquela alternativa.
6. **Treino** (`src/treino/Treino.tsx`): 4 fáceis + 3 médias, 5 desafios, até 4 de vestibular, com selo da fonte.

### 3.3 Avaliação

- **Separação de responsabilidades: boa** [FATO]. Conteúdo (JSON), contrato (Zod), matemática (`calc.ts`/`plot2d.ts`, sem React e sem DOM) e desenho (`desenho.ts`) estão separados. Isso permite testar a matemática sem navegador.
- **Acoplamento: baixo** entre motor e widgets: o motor só conhece `WidgetProps` (`src/widgets/types.ts`). Acoplamento alto **entre conteúdo e widget**: cada aula depende das chaves de `params` de um widget específico (mitigado pela validação Zod).
- **Extensão para novos tipos de questão:** novo widget = pasta em `common/` + uma linha em `index.ts` + uma linha em `params.ts`. Padrão claro e documentado (`docs/GUIA-CAPITULOS.md` §5).
- **Extensão para novas disciplinas: travada no schema** (ver problema T3).

---

## 4. Tecnologias e dependências

[FATO, `package.json`]

| Tipo | Pacote | Versão declarada | Uso |
|---|---|---|---|
| runtime | `react`, `react-dom` | ^19.3.1 | UI |
| runtime | `zod` | ^4.6.7 | contrato das aulas e dos widgets |
| dev | `vite` + `@vitejs/plugin-react` | ^8.3.6 / ^6.2.1 | dev server e build |
| dev | `typescript` | ^5.9.3 | `tsc --noEmit` (strict) |
| dev | `vitest` | ^5.1.0 | testes (ambiente Node; UI testada com `renderToStaticMarkup`) |
| dev | `tsx` | ^4.23.15 | executa os lints em TypeScript |
| dev | `@types/*` | — | tipos |

- Apenas **3 dependências de runtime**. Gráficos, 3D e geometria são feitos à mão em Canvas 2D, sem bibliotecas [FATO].
- Nenhuma dependência aparentemente não usada [FATO, pela inspeção dos imports; não houve ferramenta de análise].
- Externas: fonte Nunito via Google Fonts (`index.html:8-9`); Python + Manim só para gerar vídeos (opcional).
- Não existe `engines` em `package.json`; a exigência de Node 26 fica só na documentação.

### Scripts

| Script | O que faz | Observação |
|---|---|---|
| `dev` | `vite --host` (precedido por `lint:content` via `predev`) | `--host` expõe o servidor na rede local |
| `build` | `tsc --noEmit && vite build` (precedido por `lint:content`) | base relativa: `dist/` serve em subpasta |
| `test` | `vitest run` | |
| `typecheck` | `tsc --noEmit` | |
| `lint:content` / `lint:planos` | validação de conteúdo e de roteiros | |
| `publicar` | valida tudo, rebase e `git push` | depende de Git; inútil nesta cópia |
| `manim` | renderiza vídeo | requer Manim instalado |

---

## 5. Inventário completo de funcionalidades

Estados: **Funcional** (verificado em execução nesta auditoria), **Implementada, não testada** (existe no código; não pude executar), **Parcial**, **Simulada**, **Inoperante**, **Não implementada**.

> Como nada foi executado aqui, **nenhum item recebe "Funcional"**. Onde há testes e capturas no repositório, isso aparece como evidência, mas o estado permanece "Implementada, não testada" até alguém rodar `npm ci && npm test` e abrir o app.

### 5.1 Navegação e jornada

| Funcionalidade | Localização | Estado | Evidência | Problemas |
|---|---|---|---|---|
| Trilha (matérias, pilares, setores, unidades, aulas) | `src/Home.tsx` | Implementada, não testada | Código; captura `docs/img/trilha-desktop.png`; testes `src/ui/produto-b*.test.tsx` | Desktop mostra uma coluna estreita de celular centralizada (captura) |
| Roteamento por hash e tela "aula não encontrada" | `src/engine/rota.ts`, `src/App.tsx:20-41` | Implementada, não testada | Parser sem exceções; testes em `engine.test.ts` | — |
| Carga sob demanda (player e aula) com "Tentar de novo" | `src/engine/abertura.ts`, `App.tsx:149-167` | Implementada, não testada | Código | — |
| Barreira de erro por aula | `App.tsx:89-97` | Implementada, não testada | `getDerivedStateFromError` | Não registra o erro (sem log) |
| Desbloqueio sequencial dentro da unidade | `Home.tsx:242-244` | Implementada, não testada | `unlocked = arquivo && (prev == null \|\| progress[prev])` | Só afeta aula 02+; a aula 01 de cada unidade sempre abre |
| Progresso local | `src/engine/progress.ts`, `armazenamento.ts` | Implementada, não testada | Tolerante a `localStorage` bloqueado ou corrompido | — |
| Outras 11 matérias (Português, Física, Química...) | `src/engine/materias.ts`, `Home.tsx:162-166` | **Simulada** | Chip com sprite; ao tocar, "está em produção" | Pode ser lido pelo júri como promessa não cumprida |
| 5 aulas listadas sem arquivo ("Aula 02") | `content/taxonomy.json` | **Parcial** | `arquivo: null` em 5 entradas (ex.: `cones/aula-02`) [FATO] | Aparecem como "em produção" |

### 5.2 Entrada de questões

| Funcionalidade | Localização | Estado | Evidência | Problemas |
|---|---|---|---|---|
| Usuário digitar ou colar uma questão | — | **Não implementada** | Nenhum `input`/`textarea` de enunciado no código | — |
| Upload de imagem de questão | — | **Não implementada** | Nenhum `type="file"` | — |
| Processamento de enunciado | — | **Não implementada** | — | — |
| Questões pré-cadastradas | `content/**/aula-01.json` → `treino` | Implementada, não testada | 1.248 autorais + 188 de vestibular [FATO] | Só acessíveis **depois** de terminar a aula |
| Imagens em questões de vestibular | `schema.ts:179-183`, `Treino.tsx:220,231` | Implementada, não testada | 42 imagens referenciadas, 0 faltando [FATO] | Estáticas |
| Validação dos dados cadastrados | `schema.ts`, `scripts/lint-content.ts` | Implementada, não testada | 1 correta por questão, ids únicos, fonte obrigatória, caminho da imagem restrito a `/vestibular/` | Sliders sem checagem `min < max` e `initial` na faixa (ver T7) |

### 5.3 Visualização

| Funcionalidade | Localização | Estado | Evidência | Problemas |
|---|---|---|---|---|
| Plano cartesiano com 11 famílias de curva, ponto arrastável, sliders e 15 métricas | `src/widgets/common/PlanoCartesianoWidget.tsx`, `plot2d.ts`, `desenhoPlano.ts` | Implementada, não testada | Usado em **81 passos** [FATO]; `plot2d.test.ts` e `plot2d-extensoes.test.ts` | Coeficientes aceitam só número ou `"$slider"`, não expressões (ver §11) |
| Sólidos 3D, revolução e geratriz do cone | `solido/`, `RevolutionWidget.tsx`, `GeneratrixWidget.tsx`, `src/math3d/` | Implementada, não testada | 30 + 2 passos; captura `aula-cone-mobile.png` | — |
| Trigonometria (ciclo, triângulo), geometria plana e analítica, estatística (barras, boxplot), contagem (grade), matrizes, polinômios, vetores, reta numérica | `src/widgets/common/*` | Implementada, não testada | 20 widgets, 20 figuras; cada um com teste de `calc.ts` | Arquivos de desenho grandes (até 1.063 linhas) |
| Visualizações reagem às variáveis | `InteractiveCanvas.tsx:15-38` | Implementada, não testada | Sliders → `controls` → widget redesenha; métricas → conclusão | — |
| Consistência matemática | `src/conteudo/*.test.ts` | Implementada, não testada | [DOC] 2.174 testes; cada capítulo refaz gabaritos por conta; `docs/REVISAO-GABARITOS.md` (1359/1359) | Não reproduzido aqui |
| Simulações de física | — | **Não implementada** | Nenhum widget de tempo, velocidade ou força | — |
| Vídeo animado (Manim) | `src/steps/ManimVideo.tsx`, `public/videos/` | **Parcial** | **1 vídeo** em todo o app (Cones) [FATO] | — |

### 5.4 Resolução e explicação

| Funcionalidade | Localização | Estado | Evidência | Problemas |
|---|---|---|---|---|
| Explicação passo a passo | `content/**` (`lines.intro/done`, `duvida`), `StepLayout.tsx` | Implementada, não testada | 560 passos com fala do Paco e dúvida da Tati | Explicação fixa: não se adapta ao aluno |
| Feedback específico por alternativa errada, com figura do erro | `MicroChallenge.tsx:20-24` | Implementada, não testada | 104 desafios com 4 alternativas; `figure` por alternativa | — |
| Nova tentativa no desafio | `MicroChallenge.tsx:32-36` | Implementada, não testada | Alternativa tentada fica desabilitada | — |
| Fechamento com fórmula tocável | `src/steps/ConceptLock.tsx` | Implementada, não testada | 104 passos; captura `fechamento-cone-mobile.png` | — |
| O sistema calcula resultados | widgets (`calc.ts`) | Implementada, não testada | Cálculos servem à figura e à conclusão do passo; **não resolvem questões** | Não há "solver" de enunciado |
| Explicações geradas por IA | — | **Não implementada** | Todas escritas no JSON | — |

### 5.5 Inteligência artificial

| Pergunta | Resposta |
|---|---|
| Integração real com alguma API? | **Não** [FATO]. A busca por `fetch(`, `openai`, `anthropic`, `gemini`, `api_key`, `process.env` e `axios` em `src/` não encontrou nada. Os únicos `fetch` estão em `scripts/` e apontam para `127.0.0.1` (dev server e DevTools do Chrome). |
| Modelo ou provedor | Nenhum no app. A documentação cita Claude, Codex e Gemini como **agentes que escreveram o conteúdo**, não como recurso do produto. |
| Prompts, processamento e validação de retornos | Não existem. |
| Algo que apenas aparenta usar IA | Não encontrei. O app não afirma usar IA. O "Paco" é um personagem com falas fixas. |

### 5.6 Interface e experiência

| Funcionalidade | Localização | Estado | Evidência | Problemas |
|---|---|---|---|---|
| Layout mobile (400 px) | `src/ui/styles.css` | Implementada, não testada | Capturas em 400 × 860; [DOC] varredura de 104 aulas com 0 problemas | — |
| Desktop | `styles.css:76` (`@media (min-width: 520px)`) | Parcial | Coluna central estreita (captura 1280 × 800) | Em projetor, ~1/3 da tela é usado |
| Acessibilidade básica | `App.tsx` (foco, `aria-live`), `Home.tsx` | Implementada, não testada | Foco no título, região de status, `prefers-reduced-motion` (`styles.css:1051`) | — |
| Componentes reutilizáveis | `src/ui/`, `src/widgets/common/` | Implementada, não testada | Botões táteis, slider, cartão, dica, glossário | — |
| Funciona offline | `index.html:8-9` | Parcial | Fonte vem do Google Fonts | Sem internet, cai na fonte padrão (não quebra) |
| Deploy público | `.github/workflows/pages.yml` | Parcial | Workflow manual pronto; [DOC] nunca disparado; repositório privado | — |

---

## 6. Fluxo atual da aplicação

1. **Trilha:** o aluno vê o Paco, a faixa de matérias (só Matemática tem conteúdo), os pilares Aritmética, Álgebra e Geometria, e abre uma aula.
2. **Aula (5 a 6 passos):** em geral 3 passos `interactive_canvas` (mexer no slider ou arrastar até cumprir uma meta), 1 `micro_challenge` (escolher, verificar, ver a figura do erro) e 1 `concept_lock` (fórmula ligada por cor à figura).
3. **Fim da aula:** progresso gravado e convite para o treino.
4. **Treino:** 7 questões básicas → 5 desafios → até 4 de vestibular, com feedback imediato e sem nova tentativa.

**Diferença para o fluxo do pitch:** o app vai **do conceito para a questão**; o pitch descreve **da questão para o conceito**. As questões de vestibular, que seriam o ponto de entrada natural ("selecione uma questão"), estão no fim da jornada e sem nenhuma visualização interativa associada.

---

## 7. Resultados de execução e testes

### 7.1 O que foi executado nesta auditoria

| Comando | Resultado |
|---|---|
| `git status` | `fatal: not a git repository` |
| `node -v` / `npm -v` / `python --version` | v24.14.0 / 11.9.0 / 3.11.9 |
| `ls node_modules` | não existe |
| Script próprio de estatística (só leitura de JSON, fora do repositório) | 104 arquivos de aula, 0 JSON inválido, 0 órfão; 109 aulas na taxonomia (5 sem arquivo); 560 passos; 1.248 questões autorais; 188 de vestibular em 98 aulas; 17 bancas; 42 imagens referenciadas e 0 faltando; 7 de 1.436 questões de treino com figura; 0 de 188 de vestibular com figura |
| Contagem de testes | 135 arquivos `*.test.ts(x)`; 1.719 chamadas `it(`/`test(` no texto (o README fala em 2.174 testes; a diferença é compatível com testes gerados em laço) |

### 7.2 O que **não** foi executado e por quê

| Verificação | Impedimento |
|---|---|
| `npm run lint:content`, `npm test`, `npm run typecheck`, `npm run build` | Exigem `tsx`, `vitest`, `typescript` e `vite` de `node_modules`, que não existe. Instalar dependências foi vetado. `npx` baixaria pacotes, o que equivale a instalar. |
| Abrir o app no navegador | O `predev` roda `lint:content` (precisa de `tsx`) e o Vite também não está instalado. |
| `node scripts/varre-aulas.mjs` | Precisa do dev server rodando. |
| Comparar com o último commit | Não há `.git`. |

### 7.3 O que a documentação afirma (não reproduzido)

- [DOC] `README.md:59`: "135 arquivos de teste e 2.174 testes passando".
- [DOC] `docs/PROXIMOS-PASSOS.md:9`: validação de 19/11 com lint ok, typecheck limpo e build ok.
- [DOC] `README.md:66`: varredura headless das 104 aulas com 0 problemas.
- [DOC] Bundle inicial de 423 kB (B52).

**Para fechar a linha de base (5 a 10 minutos, com autorização):**

```powershell
npm ci
```
```powershell
npm run lint:content; npm test; npm run typecheck; npm run build
```

Se possível, em Node 26, a versão declarada pelo projeto. Em Node 24 é provável funcionar [HIPÓTESE], mas não foi testado.

---

## 8. Problemas técnicos identificados

Ordenados por gravidade. Não incluí problemas genéricos sem evidência.

### T1. Linha de base não verificável nesta cópia

1. **Descrição:** sem `node_modules`, sem `.git` e com Node 24 no lugar do Node 26 declarado.
2. **Arquivos:** `package.json`, `CLAUDE.md` ("Desenvolvido com Node 26"), `.github/workflows/pages.yml:27`.
3. **Evidência:** comandos da §7.1.
4. **Impacto:** ninguém da equipe pode afirmar hoje que esta cópia compila e passa nos testes; o fluxo de publicação (`npm run publicar`) não funciona sem Git.
5. **Gravidade:** **alta** (bloqueia qualquer desenvolvimento confiável, mas resolve-se rápido).
6. **Correção:** clonar o repositório com Git (em vez do ZIP), instalar Node 26 (ou confirmar Node 24), `npm ci`, rodar as 4 validações e registrar o resultado. Considerar `"engines": { "node": ">=24" }` depois de confirmado.

### T2. Questões de vestibular desconectadas das visualizações

1. **Descrição:** o núcleo do pitch ("uma questão complexa vira experiência visual") não existe. As questões de vestibular só têm texto, imagem estática e feedback.
2. **Arquivos:** `src/engine/schema.ts:159-198` (a questão aceita só `figure` estática, opcional); `src/treino/Treino.tsx`.
3. **Evidência:** 0 de 188 questões de vestibular têm `figure`; 7 de 1.436 questões de treino têm alguma figura [FATO].
4. **Impacto:** a demo atual mostra "aulas visuais de matemática", não "questões visualizadas". O júri pode não reconhecer o problema declarado.
5. **Gravidade:** **alta** (para o hackathon; não é bug de código).
6. **Correção:** ver §12, P1-1. Começar por conteúdo (aula-questão em JSON), sem mudar o motor.

### T3. Expansão para outras disciplinas travada no schema e na interface

1. **Descrição:** a taxonomia exige exatamente 3 pilares, e a interface trata "matemática" como a única matéria com conteúdo.
2. **Arquivos:** `src/engine/schema.ts:294` (`pilares: z.array(Pilar).length(3)`); `src/engine/materias.ts:24` (`MATERIA_COM_CONTEUDO = "matematica"`); `Home.tsx:109,162`.
3. **Evidência:** código citado.
4. **Impacto:** acrescentar Física exige mudar schema, `Home.tsx` e a estrutura de `taxonomy.json` (que não tem nível "matéria").
5. **Gravidade:** **média** (só pesa se a equipe quiser física como matéria; uma questão de física pode entrar como aula de Matemática sem mexer nisso).
6. **Correção:** só se necessário: acrescentar o nível `materias[]` acima de `pilares` e relaxar `length(3)`. Adiar para depois da demo.

### T4. Não há IA no produto

1. **Descrição:** nenhuma integração de IA no app.
2. **Arquivos:** `src/**` (ausência).
3. **Evidência:** busca da §5.5.
4. **Impacto:** se o pitch prometer IA, a demo não sustenta. Se não prometer, não é problema.
5. **Gravidade:** **média** (depende do pitch).
6. **Correção:** não colocar IA no caminho crítico. Se houver tempo, ver P2-4 (IA só para escolher a questão visual pré-montada mais próxima, sem gerar cálculo ou figura).

### T5. Documentação de coordenação extensa, parcialmente desatualizada e dependente de arquivos externos

1. **Descrição:** `docs/PROXIMOS-PASSOS.md` e `docs/EM-ANDAMENTO.md` misturam o estado atual com histórico; a mesma página contradiz a si mesma, e vários briefings ficam fora do repositório.
2. **Arquivos:** `docs/PROXIMOS-PASSOS.md:87` ("hospedagem do app (hoje só roda com `npm run dev`)") contra a linha 15 (hospedagem preparada); `:104` ("Fontes de vestibular (392 pendentes)") contra 98/104 aulas com vestibular; `:105` ("JS acima de 1 MB") contra 423 kB; briefings em `C:\Users\mkf10\projetos\briefing-b*.md` citados em `EM-ANDAMENTO.md`.
3. **Evidência:** linhas citadas.
4. **Impacto:** um integrante novo gasta tempo para descobrir o que é verdade; risco de refazer trabalho pronto.
5. **Gravidade:** **média**.
6. **Correção:** uma página curta "estado em 21/11" no topo de `PROXIMOS-PASSOS.md`; mover o histórico para `docs/historico/`.

### T6. Trabalho não auditado fora desta cópia

1. **Descrição:** existem mudanças em branches remotos (`wip-20-11-noite`) que tocam o registro de widgets e `InteractiveCanvas.tsx`.
2. **Arquivos:** `docs/PROXIMOS-PASSOS.md:73`.
3. **Evidência:** [DOC].
4. **Impacto:** risco de conflito com qualquer trabalho novo em `src/steps/` e `src/widgets/registry.ts`.
5. **Gravidade:** **média**.
6. **Correção:** decidir já: mesclar depois de revisar ou descartar. Não deixar pendurado durante o hackathon.

### T7. Controles de slider sem validação de coerência

1. **Descrição:** `SliderControl` não verifica `min < max`, `initial` dentro de `[min, max]` nem se `step` divide a faixa.
2. **Arquivos:** `src/engine/schema.ts:19-29`.
3. **Evidência:** o schema só tipa os números. Os testes por capítulo cobrem parte disso (ex.: `src/conteudo/funcao-quadratica.test.ts:28-41`), mas não é regra global.
4. **Impacto:** conteúdo novo, escrito às pressas no hackathon, pode criar um passo impossível de concluir que o lint não pega.
5. **Gravidade:** **baixa**.
6. **Correção:** um `.superRefine` com as três checagens no `SliderControl`.

### T8. Arquivos de desenho muito grandes

1. **Descrição:** funções de desenho concentradas em arquivos únicos longos.
2. **Arquivos:** `grade/desenho.ts` (1.063 linhas), `barras/desenho.ts` (916), `solido/cenas.ts` (850), `triangulo/desenho.ts` (825), `src/ui/styles.css` (1.088).
3. **Evidência:** `wc -l`.
4. **Impacto:** manutenção mais lenta; conflito de merge provável se duas pessoas mexerem no mesmo widget.
5. **Gravidade:** **baixa** (a matemática está separada e testada).
6. **Correção:** nenhuma antes da demo. Regra: uma pessoa por widget.

### T9. Redesenho do canvas a cada renderização

1. **Descrição:** o efeito de desenho de `useCanvas` não tem lista de dependências, então redesenha o canvas inteiro em cada render do componente.
2. **Arquivos:** `src/widgets/canvas.ts:36-59`.
3. **Evidência:** `useEffect(() => { ... draw(...) })` sem segundo argumento.
4. **Impacto:** trabalho extra no arraste; com canvases pequenos e 1 widget por tela, provavelmente imperceptível [HIPÓTESE; não medido].
5. **Gravidade:** **baixa**.
6. **Correção:** nenhuma agora. Medir no celular mais fraco da equipe antes de mexer.

### T10. Barreira de erro silenciosa

1. **Descrição:** `BarreiraAula` troca a tela, mas não registra o erro.
2. **Arquivos:** `src/App.tsx:89-97`.
3. **Evidência:** não há `componentDidCatch` nem `console.error`.
4. **Impacto:** durante o desenvolvimento do hackathon, um widget novo que lança erro vira "Algo deu errado" sem pista (o React ainda loga em dev [HIPÓTESE]).
5. **Gravidade:** **baixa**.
6. **Correção:** `componentDidCatch(e) { console.error(e) }`.

---

## 9. Análise de segurança

| Tema | Achado | Risco |
|---|---|---|
| Chaves de API e segredos | Nenhuma variável de ambiente usada no app além de `import.meta.env.DEV` e `BASE_URL`. Nenhum `.env` no repositório. `.gitignore` não lista `.env` [FATO]. | Baixo hoje. Se a equipe adicionar IA, **acrescentar `.env*` ao `.gitignore` antes** e nunca chamar a API direto do navegador com chave embutida. |
| Execução de código dinâmico | Nenhum `eval`, `new Function`, `innerHTML` ou `dangerouslySetInnerHTML` em `src/` [FATO]. As expressões dos widgets usam um parser próprio, sem `eval` (`src/widgets/common/expr.ts`). | Baixo. Bom padrão para o caso de a IA gerar parâmetros no futuro. |
| Entrada de dados | Conteúdo vem do repositório e passa por Zod; o caminho de imagem é restrito por regex a `/vestibular/`, sem `..` (`schema.ts:179-182`). `localStorage` lido de forma tolerante (`armazenamento.ts`, `progress.ts`). | Baixo. |
| Requisições externas | Só a fonte do Google Fonts (`index.html:8-9`). | Baixo (privacidade: o Google vê o IP do visitante). |
| Dev server exposto | `"dev": "vite --host"` (`package.json:10`) abre o servidor para a rede local. | Baixo, mas em rede de evento é bom saber. Usar `npx vite` sem `--host` quando não for testar no celular. |
| Riscos com conteúdo gerado por IA | Não se aplica hoje. Se houver IA: tratar a resposta como dado, validar com o mesmo Zod das aulas, e **nunca** deixar a IA calcular o gabarito ou desenhar a figura sem conferência. | — |
| Dados pessoais | Nenhum cadastro, login ou dado pessoal [FATO]. | Nenhum. |

---

## 10. Avaliação da experiência do usuário

Baseada em código e nas 4 capturas de `docs/img/`. **Não naveguei no app.**

**Pontos fortes**

- Jornada clara e guiada: um passo por tela, botão "Continuar" só libera quando a meta é cumprida, personagem com fala curta.
- O erro vira aprendizado: no desafio, a figura muda para mostrar exatamente a conta errada.
- Fórmula ligada por cor ao desenho (fechamento).
- Cuidados raros em protótipo: telas de falha de rede, foco para leitor de tela, `prefers-reduced-motion`, tolerância a `localStorage` bloqueado.

**Pontos fracos para a demo**

- **Desktop/projetor:** coluna estreita centralizada (captura `trilha-desktop.png`); no telão, a figura fica pequena.
- **11 matérias "em produção"** na primeira tela: chamam atenção para o que não existe.
- **Entrada pelo conceito, não pela questão:** para chegar a uma questão de vestibular o aluno precisa terminar a aula e mais duas etapas de treino (7 + 5 questões).
- Texto e explicações fixos: não há ajuda personalizada se o aluno travar fora das alternativas previstas.

---

## 11. Avaliação de prontidão para o MVP

### 11.1 Quanto do fluxo mínimo já existe

| Passo do fluxo do pitch | Existe? | O que reaproveitar |
|---|---|---|
| 1. Estudante seleciona uma questão | Não (seleciona uma **aula**) | `Home.tsx` + `taxonomy.json`: uma unidade "Questões visuais" já faria o papel de catálogo |
| 2. Sistema apresenta dados e contexto | Parcial (na aula, pela fala do Paco; no treino, pelo enunciado) | `StepLayout`, `lines.intro`, `duvida` |
| 3. Visualização interativa dos conceitos | **Sim** | 20 widgets; `plano_cartesiano` cobre trajetórias parabólicas |
| 4. Estudante manipula variáveis | **Sim** | Sliders + arraste + métricas |
| 5. Explicações e resultados coerentes | **Sim** (roteirizados) | `micro_challenge` com figura por erro, `concept_lock`, testes por capítulo |

**Conclusão:** 3 dos 5 passos já existem e são o trecho mais difícil. Falta **costurar uma questão real** a esses passos.

### 11.2 Viabilidade das opções de primeira demonstração

| Opção | Suporte no código | Esforço | Avaliação |
|---|---|---|---|
| **A. Questão visual ENEM 2022 "saque de vôlei"** (parábola `y = −x²/6 − 7x/3 + 12`, tetos de 17 a 40 m) | A questão **já está** em `content/algebra/funcoes/funcao-quadratica/aula-01.json` (`treino.vestibular`). O `plano_cartesiano` desenha a parábola (`tipo: "quadratica"`), uma reta horizontal ligada a slider (`tipo: "afim", a: 0, b: "$teto"`) e tem as métricas `no_vertice` e `no_encontro` [FATO, `params.ts:30-77`, `PlanoCartesianoWidget.tsx:3-19`] | **Baixo: só JSON + teste do capítulo** | **Recomendada.** Real (ENEM), visual, é uma trajetória (ponte com física), não exige código novo. |
| B. Lançamento oblíquo com sliders de velocidade e ângulo | Não existe. Os coeficientes do `plano_cartesiano` aceitam só número ou `"$slider"` (`plot2d.ts:8-10`), não contas. O parser `expr.ts` já existe, mas não tem seno/cosseno | Médio: aceitar `Expr` nos coeficientes (ex.: `a = "-5/($vx^2)"`, `b = "$vy/$vx"`, usando componentes da velocidade, sem trigonometria) ou um widget novo | Boa **segunda** etapa. Fazer depois de A funcionar. |
| C. Gráficos de função genéricos | Já existe (81 passos) | Zero | Já demonstrável, mas não é "questão → visualização". |
| D. IA interpretando enunciados | Nada existe | Alto e arriscado | Adiar. |

### 11.3 O que impede uma demonstração completa hoje

1. Linha de base não confirmada (T1).
2. Ausência de qualquer questão apresentada **como ponto de partida** com visualização própria (T2).
3. Para o telão, layout desktop estreito (§10).

### 11.4 O que adiar

IA generativa; entrada livre de enunciado; upload/OCR de imagem; novas matérias (T3); refatoração dos arquivos grandes (T8); otimização de canvas (T9); aula 02 de Cones; novos vídeos Manim.

### 11.5 O que testar para garantir confiabilidade pedagógica

- Para cada questão visual: teste em `src/conteudo/<slug>.test.ts` que refaz a conta do gabarito (vértice, encontros com cada teto) e prova que cada passo é completável, no mesmo padrão de `funcao-quadratica.test.ts`.
- Conferir que a figura **não entrega a resposta antes** da hora (usar `antes_de_concluir`, `schema.ts:52-58`).
- Rodar `scripts/varre-aulas.mjs` filtrado pelo slug novo (400 × 860) e, manualmente, em 1280 × 800.
- Revisão humana por alguém da equipe que não escreveu a questão (o processo do projeto mostra que "relato de agente não basta": `PROXIMOS-PASSOS.md`, "Cuidados aprendidos").

### Regulamento do Hack Brasil

Nenhuma informação verificável sobre o regulamento do Hack Brasil 2026 foi encontrada no repositório, e não consultei fontes externas. **A conformidade formal (tema, uso de código anterior ao evento, licenças de imagens de provas, critérios de avaliação, exigência de IA ou de deploy público) precisa ser confirmada pela equipe.** Ponto de atenção específico: o projeto tem histórico extenso (desde pelo menos 10/11/2026, segundo `docs/`). Se o regulamento exigir código produzido durante o evento, isso afeta a estratégia inteira.

---

## 12. Tarefas priorizadas

### P0: bloqueadores

| # | Problema | Solução | Arquivos | Depende de | Complexidade | Benefício | Por que P0 |
|---|---|---|---|---|---|---|---|
| P0-1 | Base não verificada (T1) | Clonar com Git, Node 26 (ou confirmar 24), `npm ci`, rodar lint/test/typecheck/build e `npm run dev`; registrar o resultado | nenhum arquivo de código | — | Baixa | Certeza de que a base funciona | Sem isso, qualquer bug novo é indistinguível de um antigo |
| P0-2 | Trabalho pendente em `wip-20-11-noite` (T6) | Decidir mesclar ou descartar antes de começar | branches remotos | P0-1 | Baixa | Evita conflito em `src/steps/` e no registro | Toca arquivos centrais |
| P0-3 | Regulamento não confirmado | Ler o regulamento e anotar requisitos (código prévio, IA, deploy, licenças) | — | — | Baixa | Evita desclassificação ou pitch errado | Pode mudar todo o plano |

### P1: essenciais para o MVP

| # | Necessidade | Solução | Arquivos | Depende de | Complexidade | Benefício | Por que P1 |
|---|---|---|---|---|---|---|---|
| P1-1 | Fluxo "questão → visualização" (T2) | **Aula-questão** "Saque de vôlei (ENEM 2022)": passo 1 apresenta os dados (parábola fixa e eixo a 1,5 m); passo 2 aluno arrasta até o vértice (`no_vertice`); passo 3 slider do teto até tocar a trajetória (`no_encontro`); passo 4 `micro_challenge` com as 5 opções e figura de cada erro; passo 5 `concept_lock` com `x_v = −b/2a`. **Só JSON** | `content/algebra/funcoes/<slug-novo>/aula-01.json`, `src/conteudo/<slug-novo>.test.ts`, entrada em `content/taxonomy.json` | P0-1 | Baixa a média | É a demo do pitch | Sem isso, a demo não mostra a proposta |
| P1-2 | Catálogo de questões visuais como porta de entrada | Unidade/setor "Questões visuais" em destaque no topo da trilha (só taxonomia, no início) | `content/taxonomy.json`; depois, se necessário, `Home.tsx` | P1-1 | Baixa | O aluno "seleciona uma questão" | Passo 1 do fluxo |
| P1-3 | Legibilidade no telão | Coluna mais larga em telas ≥ 1024 px para a tela da aula | `src/ui/styles.css` (bloco de media query) | P0-1 | Baixa | Júri enxerga a figura | Demo em projetor |
| P1-4 | Roteiro da demo alinhado ao pitch | Reescrever `docs/DEMO.md` começando pela questão visual, depois uma aula, depois o treino | `docs/DEMO.md` | P1-1 | Baixa | Narrativa coerente | A banca avalia a narrativa |
| P1-5 | 2ª e 3ª questões visuais | Repetir P1-1 com outras questões que já estão no app e cabem em widgets existentes (ex.: ENEM 2009 "álcool", receita quadrática, na mesma aula) | `content/**`, `src/conteudo/**` | P1-1 | Baixa cada | Mostra que é um padrão, não um caso isolado | Credibilidade de escala |

### P2: melhorias importantes

| # | Necessidade | Solução | Arquivos | Depende de | Complexidade | Benefício |
|---|---|---|---|---|---|---|
| P2-1 | Lançamento oblíquo com variáveis físicas | Aceitar `Expr` (`expr.ts`) nos coeficientes do `plano_cartesiano` (velocidade em componentes `vx`, `vy`; g = 10) e criar a questão visual de física | `src/widgets/common/params.ts`, `plot2d.ts` (`resolver`), testes | P1-1 | Média | Física real com o motor existente |
| P2-2 | Esconder matérias vazias | Mostrar só Matemática (ou Matemática + "Física: questões visuais") | `src/engine/materias.ts`, `Home.tsx` | — | Baixa | Primeira tela sem promessas vazias |
| P2-3 | Validação de sliders (T7) e log de erro (T10) | `superRefine` em `SliderControl`; `componentDidCatch` | `schema.ts`, `App.tsx` | P0-1 | Baixa | Conteúdo novo sem passo impossível |
| P2-4 | IA opcional e segura | Campo "cole o enunciado" → modelo **só classifica** e sugere a questão visual pré-montada mais parecida (ou nenhuma). Sem gerar cálculo nem figura. Chave em backend mínimo ou função serverless, nunca no navegador | novo módulo; `.gitignore` com `.env*` | P1-2, P0-3 | Média | Atende "IA interpreta enunciados" sem risco pedagógico |
| P2-5 | Deploy público para a banca | Netlify/Vercel do `dist/` (o Pages exige repositório público ou Pro, segundo `docs/HOSPEDAGEM.md`) | — | P0-1 | Baixa | Banca testa no próprio celular |
| P2-6 | Documentação enxuta (T5) | Página "estado em 21/11"; histórico em `docs/historico/` | `docs/` | — | Baixa | Onboarding rápido |

### P3: pós-hackathon

- Nível "matéria" na taxonomia e Física/Química como matérias de verdade (T3).
- Widget de simulação com tempo (animação do projétil, vetores de velocidade).
- Entrada livre de questões com IA gerando **parâmetros** de widget validados por Zod e conferidos por um solver determinístico.
- Quebrar os arquivos de desenho grandes (T8); otimizar redesenho (T9).
- Aula 02 de Cones e mais vídeos Manim.
- Testes de interação em DOM (hoje a UI é testada com `renderToStaticMarkup`, sem clique nem arraste; a interação é coberta pela varredura headless).

---

## 13. Proposta de divisão da equipe

A arquitetura já separa bem as frentes. A regra que evitou conflitos no projeto continua valendo: **um dono por pasta compartilhada** (`content/taxonomy.json`, `src/widgets/common/`, `src/engine/`).

| Dev | Frente | Arquivos que edita (exclusivos) | Primeiras entregas |
|---|---|---|---|
| **Dev 1: Interface e visualização** | Layout do telão, catálogo de questões na trilha, extensão do `plano_cartesiano` para física | `src/ui/**`, `src/Home.tsx`, `src/widgets/common/**`, `src/engine/materias.ts` | P1-3 → P2-2 → P2-1 |
| **Dev 2: Conteúdo, lógica e integração** | Questões visuais (JSON + teste com a conta), e depois a IA opcional | `content/**/<slugs novos>/`, `src/conteudo/<slugs novos>.test.ts`; depois o módulo de IA | P1-1 → P1-5 → P2-4 |
| **Dev 3: Integração, validação e entrega** | Ambiente, validações, taxonomia, merge, deploy, roteiro e ensaio da demo | `content/taxonomy.json`, `docs/**`, `.github/**`, `package.json`, `src/engine/schema.ts` e `src/App.tsx` (P2-3) | P0-1, P0-2, P0-3 → P1-2 → P1-4 → P2-5 → P2-3 |

### Ordem ideal

1. **Dia 0, primeira hora (Dev 3):** P0-1, P0-2, P0-3. Os outros dois leem `docs/GUIA-CAPITULOS.md` (§2 e §5.1 do `plano_cartesiano`) e `docs/METODO.md`.
2. **Em paralelo, depois de P0-1:**
   - Dev 2 escreve a aula-questão do vôlei (P1-1).
   - Dev 1 faz o layout do telão (P1-3).
   - Dev 3 registra a unidade na taxonomia assim que o JSON do Dev 2 validar (P1-2), e começa o novo `DEMO.md`.
3. **Primeiro marco:** a demo do vôlei completa, testada e ensaiada. **Só depois disso** abrir P1-5 (Dev 2), P2-1 física (Dev 1, com o Dev 2 escrevendo a questão de física em seguida) e P2-5 deploy (Dev 3).
4. **IA (P2-4)** apenas se o marco 3 estiver estável e o regulamento valorizar IA.

Dependências críticas: o Dev 2 precisa da base validada (P0-1); o registro na taxonomia (Dev 3) depende do JSON do Dev 2; a questão de física depende da extensão do widget (Dev 1).

---

## 14. Plano incremental de desenvolvimento

| Incremento | Conteúdo | Critério de pronto |
|---|---|---|
| I0 | Base validada (P0-1 a P0-3) | `lint:content`, `test`, `typecheck` e `build` passam e os números estão registrados; app abre em `localhost` |
| I1 | Questão visual do vôlei (P1-1, P1-2) | Teste do capítulo refaz o vértice e os encontros com os 5 tetos; varredura do slug sem problemas; colega que não escreveu a aula a conclui sem ajuda |
| I2 | Demo para o telão (P1-3, P1-4) | Ensaio cronometrado em 1280 × 800 e em celular |
| I3 | Mais 2 questões visuais (P1-5) e primeira tela sem matérias vazias (P2-2) | Mesmos critérios de I1 |
| I4 | Física: lançamento com `vx`, `vy` (P2-1) | Teste de `plot2d` com coeficientes em expressão; questão de física com conta conferida |
| I5 | Deploy (P2-5) e, se fizer sentido, IA classificadora (P2-4) | URL pública; IA nunca exibe resposta que não venha de questão pré-montada |

Cada incremento termina com as 4 validações passando. Nenhum incremento muda o motor de forma incompatível com as 104 aulas existentes.

---

## 15. Riscos, pendências e questões não verificadas

**Não verificado nesta auditoria:**

- Se o projeto compila, se os testes passam e se o app abre (§7.2).
- Comportamento real das interações (arraste, sliders) e do layout: avaliado só por código e capturas.
- Qualidade pedagógica do conteúdo: os números de revisão vêm de `docs/`.
- Estado dos branches remotos e do histórico Git.
- Regulamento do Hack Brasil.

**Riscos:**

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Regulamento exige código feito no evento ou um tema diferente | Desconhecida | Muito alto | P0-3 imediato |
| A base não roda em Node 24 | Baixa [HIPÓTESE] | Alto | Instalar Node 26 |
| Escopo cresce (IA, física, várias matérias) e nada fica bem acabado | **Alta** | Alto | Marco I1 antes de qualquer outra coisa |
| Conflito de arquivos entre os 3 devs | Média | Médio | Donos por pasta (§13) |
| Erro matemático numa questão nova, visto pela banca | Média | Alto | Teste por conta + revisão cruzada (§11.5) |
| Jurado acha que o app "só tem matemática" | Média | Médio | Questão de física (I4) ou narrativa "trajetória = lançamento" |

**Conflito de instruções registrado:** o `CLAUDE.md` do projeto pede reservar a frente em `docs/EM-ANDAMENTO.md` antes de editar qualquer arquivo. Esta auditoria criou apenas este relatório, que foi o único arquivo autorizado. `EM-ANDAMENTO.md` e `PROXIMOS-PASSOS.md` não foram alterados.

---

## 16. Recomendação técnica final

**Preservar a arquitetura inteira.** Ela já resolve a parte difícil do pitch: visualização interativa, conclusão por métrica, feedback visual por erro, validação de conteúdo e testes que refazem as contas. Não há evidência que justifique trocar framework, motor ou modelo de conteúdo.

**Mudar o enquadramento, não o código:** fazer as questões serem a porta de entrada. A primeira entrega deve ser a **questão visual do ENEM 2022 (saque de vôlei)**, montada só com JSON sobre o `plano_cartesiano`, testada por conta e ensaiada no telão. Depois, a mesma receita para mais duas questões e, se houver tempo, a extensão de expressões no widget para um lançamento com variáveis físicas. IA fica fora do caminho crítico.

### Notas (0 a 10)

| Critério | Nota | Justificativa |
|---|---|---|
| Organização do código | **8** | Pastas por responsabilidade, padrão `params/calc/desenho/Widget/Figura` repetido em 20 widgets, TypeScript strict com `noUnused*`. Perde por arquivos de desenho com 800 a 1.000 linhas e CSS monolítico. |
| Arquitetura | **8** | Motor dirigido por dados, contrato Zod validando parâmetros de widget por passo, matemática sem DOM, carga sob demanda. Perde pela taxonomia fixa em 3 pilares e uma matéria (T3). |
| Funcionalidades existentes | **7** | Muito conteúdo e interação de qualidade para matemática. Faltam três pilares do pitch: questão como ponto de partida, física e IA. |
| Estabilidade técnica | **6 (provisória)** | Código defensivo (barreira de erro, armazenamento tolerante, parser de rota sem exceção) e 135 arquivos de teste. Nada foi executado nesta auditoria. |
| Experiência do usuário | **7 (provisória)** | Jornada guiada, feedback visual por erro, acessibilidade básica. Desktop estreito e 11 matérias vazias. Avaliado só por código e capturas. |
| Capacidade de expansão | **7** | Widget novo e aula nova são baratos e documentados. Nova disciplina exige mudar schema e Home. |
| Prontidão para demonstração | **6** | Como app de aulas de matemática, está pronto para demo (há roteiro em `docs/DEMO.md`). Para o pitch "questão → visualização", falta a peça central, embora seja barata. |
| Maturidade geral do MVP | **6** | Produto sólido e testado, mas medido contra a proposta do hackathon é um **MVP parcial**: base técnica madura, fluxo-alvo ainda não montado e nada verificado em execução nesta cópia. |
