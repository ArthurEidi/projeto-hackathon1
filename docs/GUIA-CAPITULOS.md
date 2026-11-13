# Guia de Capítulos

Como escrever um capítulo novo do app seguindo o [METODO.md](METODO.md), usando **Cones · Aula 01** como modelo. Vale para qualquer agente ou pessoa que vá produzir conteúdo.

> Leia antes: `docs/METODO.md` (os 7 pilares) e `content/geometria/geometria-espacial/cones/aula-01.json` (o modelo).

---

## 0. Estado atual do projeto

**Fase 2 (09/11/2026)** — motor generalizado + componentes comuns + piloto Função Afim:

| Comando | Resultado |
|---|---|
| `npm run lint:content` | `conteúdo ok` |
| `npm test` (vitest) | 5 arquivos, **61/61 testes passando** |
| `npm run build` | ok; 158 módulos; JS 417,8 kB (128 kB gzip), CSS 15,1 kB |

O que mudou em relação à fase 1 (resolve a antiga §4.3):
- **Marcas de cor `c1..c4`** além de `h, r, g` (`src/ui/marcas.ts`) e **`glossario` opcional no JSON da aula** (o do cone continua como padrão; Cones ficou idêntico).
- **`complete_when` aceita `lte`** (além de `gte`), ex.: "leve a até −1".
- **Falas padrão do treino genéricas** (Cones guardou as suas como `fala` própria em cada questão).
- **`figures` genérico** no `registry.ts`; **campo `icone`** na unidade da taxonomia.
- **Taxonomia com o mapa completo do Ensino Médio** (unidades futuras com `arquivo: null`, aparecem "em produção").
- **Teste que percorre a taxonomia** (`src/engine/conteudo.test.ts`): todo capítulo publicado é validado em `npm test`.
- **Widgets comuns** `plano_cartesiano` / `plano_figura` / `reta_numerica` / `reta_figura` em `src/widgets/common/`.
- **Piloto** `content/algebra/funcoes/funcao-afim/aula-01.json` — use-o como modelo para capítulos de funções.

Fase 1 (commit `0f6f0c5`): lint ok, 20/20 testes, build ok.

---

## 1. Como o capítulo de Cones é estruturado

### 1.1 Mapa da arquitetura

```
content/taxonomy.json                     trilha: 3 pilares > setores > unidades > aulas (arquivo ou null)
content/<pilar>/<setor>/<unidade>/aula-NN.json   uma aula = passos + treino
src/engine/schema.ts                      contrato zod do JSON (4 tipos de passo + treino + taxonomia)
src/engine/content.ts                     carrega todo content/**/aula-*.json via import.meta.glob
src/engine/LessonPlayer.tsx               toca os passos em sequência -> convite -> Treino
src/engine/StepRenderer.tsx               type do JSON -> componente de tela
src/steps/*.tsx                           as 4 telas padronizadas (+ StepLayout: conversa Paco/Tati + palco + rodapé)
src/widgets/params.ts                     schemas zod dos params de cada widget/figura (sem React; usado no Node)
src/widgets/registry.ts                   id do widget -> componente React
src/widgets/*.tsx, canvas.ts, coneScene.ts   widgets do cone e primitivas de desenho
src/widgets/common/                       plano cartesiano e reta numérica (widgets + figuras + plot2d.ts)
src/ui/marcas.ts, glossario.ts, GlossarioContext.tsx   marcas de cor h/r/g/c1..c4 e glossário da aula (dicas)
src/conteudo/*.test.ts                    gabaritos de cada capítulo
src/math3d/                               projeção ortográfica e geometria de revolução
src/treino/                               treino pós-aula (Treino.tsx) e falas fixas (falas.ts)
src/engine/textRules.ts                   regras de texto (140 caracteres, 2 frases, sem emoji, lista negra)
scripts/lint-content.ts                   valida taxonomia + aulas referenciadas + regras de texto + emojis no código
manim/scenes/*.py + manim/render.py       vídeos -> public/videos/<nome>.mp4 + .png (capa)
```

Fluxo do aluno: **Trilha (Home)** → aula (passos 1..N) → "Aula concluída" + convite → **Treino** em 3 etapas (básico 7 → desafio 5 → vestibular 4), cada etapa oferecida ao fim da anterior. Aula N só desbloqueia quando a aula N−1 da mesma unidade foi concluída (`progress` em localStorage).

### 1.2 Os 5 passos da Aula 01, um a um

| # | id / tipo | O que o aluno faz | O que muda na tela | Conclusão |
|---|---|---|---|---|
| 1 | `girar-triangulo` · `interactive_canvas` · widget `revolution` | Arrasta o slider "Giro" de 0° a 360° | Triângulo retângulo **plano** (pitch 0) ganha profundidade nos primeiros 40° e deixa rastro da superfície; depois da volta, arrastar gira a câmera | `theta ≥ 360` (métrica = valor do slider) |
| 2 | `geratriz-constante` · `interactive_canvas` · widget `generatrix` | Arrasta um ponto pela borda da base | Segmento vértice→ponto muda de lugar e o rótulo numérico **não muda** (5,0); rastro das posições visitadas | `arc ≥ 180` (métrica emitida pelo widget: graus visitados) |
| 3 | `corte-meridiano` · `manim_video` | Assiste | Cone cortado pelo plano do eixo revela o triângulo do passo 1 | fim do vídeo (ou falha de carregamento) |
| 4 | `desafio-geratriz` · `micro_challenge` · figura `cone_figure` | Escolhe a geratriz de h=4, r=3 | **A figura reage ao erro**: "7" destaca g; "25" desenha o quadrado de área 25 sobre g; "√7" desenha os 3 quadrados 16/9/25 | acertar (pode tentar de novo; opções já tentadas ficam bloqueadas) |
| 5 | `fechamento` · `concept_lock` | Toca nas letras da fórmula `g² = h² + r²` | Cada letra acende o segmento correspondente no cone e no corte (`view: both`) + dica do glossário | botão "Concluir aula" |

Depois: `outro` (frase de conclusão) e o `treino`.

Elementos de tom presentes em todos os passos:
- **Paco** (de jaleco) fala `lines.intro` e troca para `lines.done` quando o passo conclui; humor muda sozinho (idle → thinking ao interagir → happy ao concluir; encouraging no erro).
- **Tati** faz a pergunta que o aluno faria (`duvida`), e o Paco responde. Em Cones aparece no passo 2 ("qualquer segmento que sai do vértice é geratriz?") e no 4 ("isso vale para qualquer cone?"), ambas `quando: "fim"`.
- Cores fixas por grandeza em todas as telas e no vídeo: **h azul, r laranja, g rosa** (`src/ui/palette.ts`, copiadas no Manim).
- Frases curtas, sem exclamação de marketing, sem emoji, perguntas antes da resposta.

### 1.3 Como cada trecho cumpre os 7 pilares

| Pilar (METODO.md) | Onde aparece em Cones | Força |
|---|---|---|
| **1. Ancoragem mecânica** (entrada → processo → saída) | Passo 1: entrada = triângulo + ângulo de giro (slider, variável independente); processo = rotação; saída = sólido. Passo 2: entrada = posição do ponto; saída = comprimento (dependente) que não muda. | Forte |
| **2. Tradução visual imediata** | A aula **começa** pelo widget, não pela fórmula; a fórmula só aparece no passo 5, e cada letra dela é um botão ligado ao segmento colorido. Números viram quadrados de área (opções "25" e "√7"). | Forte |
| **3. Ponto neutro (caso base)** | Passo 1 começa em θ = 0° com o triângulo **plano** (sem profundidade): o sistema "sem força". Só ao girar surge o 3D. | Médio — está no visual, mas nenhuma fala chama atenção para o caso base. **Nos novos capítulos, nomear o caso base na fala** (ex.: "Com a = 1 e b = 0, a saída é igual à entrada"). |
| **4. Panorama / recorte de escopo** | Feedback do treino cita os vizinhos: retângulo girando → cilindro; semicírculo → esfera; pirâmide não nasce de giro. Dúvida do passo 4 restringe a "cone **reto**". Taxonomia já anuncia a Aula 02 (planificação). | Fraco/implícito. **Nos novos capítulos, dedicar 1 fala (intro do 1º passo ou dúvida da Tati) ao mapa: "existem X, Y, Z; aqui ficamos em X".** |
| **5. Progressão por contraste** | Triângulo plano (2D, conhecido) → sólido (3D). Distratores contrastam soma de lados × soma de quadrados. | Médio. Em capítulos de funções o contraste reta → parábola deve ser explícito, com a curva anterior desenhada em "fantasma" para comparação. |
| **6. Dedução causal da forma** | g² = h² + r² não é dada: é **descoberta** — o corte (passo 3) mostra que h, r, g formam o mesmo triângulo retângulo do passo 1, logo vale Pitágoras. Fala do fechamento: "O cone reto nasce de um triângulo retângulo girando. **Por isso** g² = h² + r²." | Forte |
| **7. Simulação espacial e fronteiras** | Passo 2 percorre a borda inteira (≥ 180° visitados) testando a invariância; dúvida "qualquer segmento é geratriz? só os que chegam na borda" marca a fronteira; "para qualquer cone **reto**" marca o domínio de validade; desafio "eixo-cateto-menor" testa trocar o ponto de partida (qual cateto fica no eixo). | Forte |

**Padrão a copiar:** cada pilar vira um *momento* concreto (um passo, uma dúvida da Tati ou um distrator com figura). Antes de escrever o JSON, preencha a tabela acima para o seu capítulo.

---

## 2. Formato exato do JSON de aula

Fonte da verdade: `src/engine/schema.ts`. Tudo é validado por zod no lint, nos testes e em tempo de execução.

### 2.1 Raiz

```jsonc
{
  "id": "aula-01",                 // igual ao id da aula na taxonomia
  "numero": 1,                     // inteiro > 0
  "titulo": "O Triângulo que Gira",
  "subtitulo": "Sólidos de revolução e a geratriz",
  "caminho": { "pilar": "geometria", "setor": "geometria-espacial", "unidade": "cones" }, // igual à taxonomia
  "outro": "Frase de conclusão mostrada em 'Aula concluída'.",
  "glossario": {                   // opcional: o que cada marca c1..c4 significa NESTA aula
    "c1": { "nome": "Coeficiente a", "resumo": "Quanto a saída muda quando a entrada anda 1." }
  },
  "steps": [ /* 1..N passos; lint avisa fora de 4..8 */ ],
  "treino": { "faceis": [4], "medias": [3], "desafios": [5], "vestibular": [4] }
}
```

Ids (`steps[].id`, ids de questão, setores, unidades) seguem `^[a-z0-9-]+$`.

**Marcas de cor** (`src/ui/marcas.ts`): cada grandeza destacada usa uma marca fixa em todas as telas da aula — rótulo no canvas, slider (`color`), letra da fórmula (`ref`) e dica.
- `h`, `r`, `g`: altura, raio e geratriz do cone (azul, laranja, rosa), com glossário padrão.
- `c1` azul, `c2` laranja, `c3` rosa, `c4` violeta: genéricas; o significado vem do `glossario` da aula. Ex.: Função Afim usa c1 = coeficiente a, c2 = coeficiente b, c3 = gráfico de f, c4 = raiz.
- Nos desenhos também valem `ink` (cinza escuro) e `muted` (cinza claro), que não abrem dica.
- **Regra do schema:** toda marca `c1..c4` usada em `formula[].ref` precisa de entrada no `glossario`. Rótulo de canvas com marca sem glossário simplesmente não abre dica — então não pinte de `c1` algo que não seja o "c1" do glossário (use `ink`).

### 2.2 Os 4 tipos de passo

Campos comuns: `id`, `type`, `lines`, `duvida?`.

`duvida`: `{ "quando": "inicio" | "fim" (padrão "fim"), "pergunta": "...", "resposta": "..." }` — "fim" aparece só depois do passo concluído. No `concept_lock` só é aceito `"inicio"`.

**`interactive_canvas`** — o aluno manipula um widget até cumprir uma condição.
```jsonc
{
  "id": "girar-triangulo",
  "type": "interactive_canvas",
  "widget": "revolution",                 // precisa existir em widgetParams (params.ts) e widgets (registry.ts)
  "params": { "h": 4, "r": 3 },           // validado pelo schema zod do widget
  "controls": [                           // sliders opcionais, desenhados abaixo do palco
    { "id": "theta", "label": "Giro", "min": 0, "max": 360,
      "step": 1, "initial": 0, "unit": "°", "color": "ink" }   // step=1, unit="", color="ink" por padrão; color ∈ h|r|g|c1..c4|ink|muted
  ],
  "lines": { "intro": "...", "done": "..." },
  "duvida": { ... },
  "complete_when": { "metric": "theta", "gte": 360 }   // gte e/ou lte (ex.: { "metric": "a", "lte": -1 })
}
```
Métricas disponíveis para `complete_when`: o valor de cada slider (pelo `id`) **e** qualquer métrica que o widget emitir com `onMetric(nome, valor)`. O passo, uma vez concluído, não "desconclui". O slider mostra o valor arredondado: use `step` inteiro. O valor `initial` não pode já cumprir a condição.

**`manim_video`**
```jsonc
{ "id": "corte-meridiano", "type": "manim_video",
  "src": "/videos/cones_aula01_corte.mp4",     // precisa começar com /videos/ (arquivo em public/videos)
  "poster": "/videos/cones_aula01_corte.png",  // opcional
  "scene": "CorteMeridiano",                   // classe em manim/scenes (rastreabilidade)
  "lines": { "intro": "...", "done": "..." } }
```
Vídeo ausente = aviso no lint e mensagem na tela (o passo libera o "Continuar" mesmo assim).

**`micro_challenge`** — pergunta com figura que **reage** a cada opção.
```jsonc
{ "id": "desafio-geratriz", "type": "micro_challenge",
  "figure": { "widget": "cone_figure", "params": { "h": 4, "r": 3, "labels": {...}, "view": "cone" } },
  "prompt": "Um cone tem altura 4 e raio 3. Quanto mede a geratriz?",
  "lines": { "intro": "..." },
  "options": [   // 2 a 4, exatamente 1 correta
    { "id": "a7", "label": "7", "correct": false,
      "feedback": "Você somou altura e raio. ...",
      "figure": { "view": "both", "highlight": ["g"] } }   // sobrescreve figure.params ao responder; o merge é validado
  ] }
```
Aqui o aluno pode tentar de novo, então o feedback do erro pode só explicar o erro.

**`concept_lock`** — fechamento: fórmula tocável + até 3 definições.
```jsonc
{ "id": "fechamento", "type": "concept_lock",
  "figure": { "widget": "cone_figure", "params": { ... } },
  "formula": [ { "text": "g", "sup": "2", "ref": "g" }, { "text": "=" }, ... ],  // ref ∈ h|r|g|c1..c4: põe a marca em "highlight" na figura
  "definitions": [ { "term": "Geratriz", "text": "segmento que liga..." } ],      // máx. 3
  "lines": { "intro": "...", "hint": "Toque em uma letra..." },
  "duvida": { "quando": "inicio", ... } }
```

### 2.3 Questões pós-lição (`treino`)

Quantidades **fixas** (constantes `TREINO_*` em `schema.ts`): `faceis` 4, `medias` 3, `desafios` 5, `vestibular` 4. Ids únicos dentro da aula.

```jsonc
{ "id": "geratriz-8-6",
  "prompt": "Um cone tem altura 8 e raio 6. Quanto mede a geratriz?",
  "fala": "opcional: fala própria do Paco nesta pergunta",
  "figure": { "widget": "cone_figure", "params": { ... } },   // opcional, estática
  "options": [ { "id": "a10", "label": "10", "correct": true, "feedback": "..." } ] }  // 2–4 opções (vestibular: 2–5), 1 correta
```

Questão de vestibular exige `fonte`. Na tela aparece "UFSC 2004 (adaptada)" / "ENEM 2014 PPL (adaptada)": quando o enunciado não é o texto literal da banca, `adaptada` **tem** que ser `true`.
```jsonc
"fonte": { "banca": "UFSC", "ano": 2004, "edicao": "PPL" /* opcional */, "adaptada": true,
           "adaptacao": "O que mudou (obrigatório se adaptada).",
           "urls": ["https://..."] }       // ≥ 1 URL válida
```

Falas do Paco no treino: há uma fala padrão genérica por posição (`src/treino/falas.ts`). Use `fala` própria quando houver uma dica útil específica (vocabulário, "o modelo só vale para x ≥ 0", contexto de vestibular). Toda questão de vestibular deve ter `fala`.

Regras de redação das questões (extraídas do modelo; seguir à risca):
1. **No treino não há segunda tentativa**: o feedback de **toda** opção errada diz a resposta certa ("... Somam-se os quadrados: 64 + 36 = 100, g = 10.").
2. **Distratores = erros típicos**, cada um diagnosticado no feedback: somar lados em vez de quadrados, esquecer a raiz (dar g²), subtrair quando é soma, trocar o papel dos elementos, confundir raio/diâmetro.
3. **Números calculáveis de cabeça**: ternas 3-4-5, 6-8-10, 5-12-13, 9-12-15; radicais simples (3√2).
4. **Fáceis** = reconhecimento/vocabulário ligado ao que o aluno *fez* ("Lembra do ponto que você arrastou?"). **Médias** = uma conta direta. **Desafios** = um passo a mais (inverter a fórmula, diâmetro, comparar dois casos, resposta irracional). **Vestibular** = questão real, adaptada para múltipla escolha, com `fala` de dica.
5. Figuras podem reaproveitar proporções simples com rótulos diferentes (ex.: desenho h=4/r=3 rotulado 8/6).
6. Rótulos de até 4 caracteres ficam em grade 2×2; se algum for maior, as opções viram lista (`options--texto`).
7. Gabaritos numéricos devem ser **conferidos por teste** (ver `engine.test.ts`, "gabaritos dos desafios e do vestibular").

### 2.4 Regras de texto (lint + teste, erro bloqueia `dev` e `build`)

Aplicadas a **toda fala visível**: `outro`, `lines.*`, `duvida.*`, `prompt`, `feedback`, `fala`, `definitions` (como "termo: texto"), `glossario` (como "nome: resumo") e títulos/subtítulos da taxonomia. Atenção: "R$ 3,45 fixos. Táxi B..." conta como frases separadas — prompts longos de vestibular precisam caber em 2 frases (use ";"):
- máx. **140 caracteres** e **2 frases** (decimal "5,0" não quebra frase);
- **sem emoji** (o lint também varre todo `src/` e `content/`);
- lista negra: "vamos mergulhar", "fascinante", "desvende", "jornada", "mágico/mágica", "é importante notar", "prepare-se".

Não passam pela regra (mas mantenha curtos): `label` de opção e de slider, tokens de fórmula.

---

## 3. Receita: adicionar um capítulo novo

A unidade (id, setor, pilar, título, ícone e títulos das aulas) **já existe na taxonomia** com `arquivo: null`. Publicar a aula = criar o JSON e pedir ao coordenador para preencher `arquivo`.

### 3.0 Caminho curto: só JSON, com widgets comuns (preferido)

Para funções, inequações, conjuntos, PA/PG, sistemas, analítica etc., **não crie widget**: use `plano_cartesiano` / `plano_figura` / `reta_numerica` / `reta_figura` (§5) e o glossário `c1..c4`. Modelo completo: `content/algebra/funcoes/funcao-afim/aula-01.json`.

Arquivos que o agente cria:
```
content/<pilar>/<setor>/<unidade>/aula-01.json
src/conteudo/<unidade>.test.ts        gabaritos conferidos com conta + passos completáveis (modelo: src/conteudo/funcao-afim.test.ts)
```
O esqueleto de passos que funcionou no piloto (8 passos, um por pilar):

| Passo | Widget / tipo | Pilar | `complete_when` |
|---|---|---|---|
| caso-neutro | plano, `y = x`, ponto arrastável, quadrantes | 3 (+4 na dúvida da Tati: panorama) | `quadrantes ≥ 2` |
| somar-b | plano, fantasma `y = x` + `b: "$b"`, intercepto | 1, 2, 5 | `b ≥ 2` |
| multiplicar-a | plano, fantasma + `a: "$a"`, triângulo "anda 1, sobe a" | 1, 6 | `a ≥ 2` |
| a-negativo | idem, pergunta de previsão antes | 5, 6 | `a ≤ −1` |
| achar-raiz | plano, ponto arrastável | 7 | `na_raiz ≥ 1` |
| duas-maquinas | plano, 2 curvas, ponto na curva 0 | 7 | `no_encontro ≥ 1` |
| desafio-raiz | micro_challenge com plano_figura reagindo a cada erro | — | acertar |
| fechamento | concept_lock, `f(x) = a x + b` com refs c3/c1/c2 | 6 | — |

### 3.1 Caminho longo: capítulo com widget próprio (geometria, 3D…)

```
content/<pilar>/<setor>/<unidade>/aula-01.json
src/widgets/<unidade>/params.ts          schemas zod dos widgets/figuras do capítulo (sem React)
src/widgets/<unidade>/XxxWidget.tsx      um arquivo por widget
src/widgets/<unidade>/XxxFigura.tsx      figura estática para desafio/fechamento/treino (aceite "highlight": Marca[])
src/widgets/<unidade>/index.ts           export const widgets = {...}; export const figures = {...}
src/widgets/<unidade>/<unidade>.test.ts  matemática do widget
src/conteudo/<unidade>.test.ts           gabaritos da aula
manim/scenes/<unidade_snake>_aulaNN_<nome>.py   (se houver vídeo)
public/videos/<unidade_snake>_aulaNN_<nome>.mp4 / .png
```

Convenção de ids: widget/figura em `snake_case` **prefixado pela unidade** (`prismas_corte`, `prismas_figura`) para não colidir; vídeo `<unidade>_aulaNN_<nome>`. Reaproveite `canvas.ts` (primitivas), `src/ui/marcas.ts` (`corDoTraco`, `ehMarca` para hits de dica) e, para 2D, `common/plot2d.ts` (`criarVista`, `num`).

### 3.2 Contrato de um widget

```ts
// src/widgets/prismas/params.ts
import { z } from "zod";
import { Marca } from "../../ui/marcas";
export const PrismaParams = z.object({ lados: z.number().int().min(3), h: z.number().positive() });
export const widgetParams = { prismas_corte: PrismaParams } as const;
export const figureParams = { prismas_figura: PrismaParams.extend({ highlight: z.array(Marca).default([]) }) } as const;
```
```tsx
// src/widgets/prismas/CorteWidget.tsx
import type { WidgetProps } from "../types";           // { params, controls, onMetric, onInteract, done }
import { useCanvas, seg, dot, chip } from "../canvas"; // canvas nítido em HiDPI + primitivas chapadas
import { Dica } from "../../ui/Dica";
export function CorteWidget({ params, controls, onMetric, onInteract, done }: WidgetProps) {
  const { lados, h } = widgetParams.prismas_corte.parse(params);   // sempre parse: aplica defaults
  const { ref, size, hover } = useCanvas(0.86, (ctx, w, H, hits) => {
    /* desenho; hits.push({ key: "c1", ...chip(...) }) para a dica do glossário */
  });
  // onMetric("nome", valor) para complete_when; onInteract() no 1º toque (Paco -> thinking)
  return <>
    <canvas ref={ref} aria-label="..." />
    {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
  </>;
}
```
Regras de visual: cores **sólidas** do `palette` (sem gradiente/sombra), cada grandeza com marca fixa em todas as telas do capítulo, rótulos com `chip()`, canvas responsivo via `useCanvas(aspect, draw)`.

Figuras (`figures`) recebem `{ state }` já parseado pelo zod (o passo faz `figureParams[id].parse({...params, ...override})`). Uma figura usada em `concept_lock` com `ref` **precisa aceitar `highlight: Marca[]`** (o schema confere).

### 3.3 Registro (arquivos **compartilhados** — quem edita é quem o coordenador indicar)

Só no caminho longo (§3.1) há widget a registrar. No caminho curto, só o item 3.

1. `src/widgets/params.ts` — espalhar os schemas do capítulo (igual ao que já é feito com `common`):
   ```ts
   import * as prismas from "./prismas/params";
   export const widgetParams = { revolution: ConeDims, generatrix: ConeDims, ...common.widgetParams, ...prismas.widgetParams } as const;
   export const figureParams = { cone_figure: ConeFigureState, ...common.figureParams, ...prismas.figureParams } as const;
   ```
2. `src/widgets/registry.ts` — espalhar os componentes (a tipagem confere que cada figura recebe o estado do seu schema):
   ```ts
   import * as prismas from "./prismas";
   widgets = { ..., ...common.widgets, ...prismas.widgets };
   figuresTipadas = { cone_figure: ConeFigure, ...common.figures, ...prismas.figures };
   ```
3. `content/taxonomy.json` — preencher `"arquivo": "<pilar>/<setor>/<unidade>/aula-NN.json"` na aula (a unidade já existe). Ícones aceitos em `icone`: `cone, reta, parabola, curva, onda, conjunto, triangulo, circulo, cubo, barras, matriz, porcento, dado, sequencia, complexo` (novos: `ICONES` em `schema.ts` + desenho em `src/ui/Icons.tsx`).
4. `manim/render.py` — acrescentar a tupla em `SCENES` (se houver vídeo).

O agente do capítulo **não edita** esses arquivos: entrega ao coordenador um "pedido de registro" com as linhas exatas (ver §4.2).

### 3.4 Validar

```bash
# Validar UMA aula sem depender da taxonomia (útil antes do registro na taxonomia;
# os widgets usados já precisam estar em params.ts):
AULA=content/algebra/funcoes/funcao-afim/aula-01.json npx tsx --eval "import { readFileSync } from 'node:fs'; import { Lesson, collectLines } from './src/engine/schema'; import { checkLine } from './src/engine/textRules'; const r = Lesson.safeParse(JSON.parse(readFileSync(process.env.AULA!, 'utf8'))); if (!r.success) { console.error(r.error.message); process.exit(1); } const e = collectLines(r.data).flatMap(({ path, text }) => checkLine(text).map((p) => path + ': ' + p)); e.forEach((x) => console.error(x)); console.log(e.length ? e.length + ' erro(s)' : 'aula ok'); process.exit(e.length ? 1 : 0);"

npm run lint:content     # taxonomia + todas as aulas referenciadas + regras de texto + emoji no código
npm test                 # vitest (todos os *.test.ts em src/)
npm run typecheck        # tsc --noEmit
npm run build            # SÓ o coordenador (escreve em dist/; builds simultâneos se atropelam)
npm run dev              # http://localhost:5173 (roda o lint antes; aula em #/aula/<pilar>/<setor>/<unidade>/<aula>)
npm run manim            # renderiza TODAS as cenas de render.py (precisa python+manim+ffmpeg)
```

Atenção: o `lint:content` e o teste `src/engine/conteudo.test.ts` **só validam aulas referenciadas na taxonomia** (com `arquivo` preenchido). Antes do registro, use o comando de aula única acima. Depois do registro, `npm test` valida a aula automaticamente.

Conferência visual: `npx vite --port 51xx` e abra `http://localhost:51xx/#/aula/<pilar>/<setor>/<unidade>/aula-01` (a URL direta funciona mesmo com a aula bloqueada na trilha). Verifique em largura de celular (~400 px) se rótulos não se sobrepõem.

### 3.5 Checklist de pronto

- [ ] Tabela dos 7 pilares preenchida (§1.3) e cada pilar ligado a um passo, dúvida ou distrator.
- [ ] 4 a 8 passos; abre com `interactive_canvas` (visual primeiro), termina com `concept_lock`.
- [ ] Caso base nomeado em fala; panorama em 1 fala; fronteira testada em widget ou dúvida.
- [ ] Cada opção errada de `micro_challenge` tem `figure` que mostra o erro.
- [ ] Treino 4/3/5/4; feedback de erro sempre traz a resposta certa; vestibular com `fonte` + URLs.
- [ ] Vestibular com `fala` própria; marcas `c1..c4` usadas têm entrada no `glossario`.
- [ ] Teste do capítulo (`src/conteudo/<unidade>.test.ts`) confere gabaritos numericamente.
- [ ] Comando de aula única: `aula ok`; `npm test` e `npm run typecheck` verdes.

---

## 4. Trabalho em paralelo sem conflito

### 4.1 Propriedade de arquivos

| Dono | Arquivos |
|---|---|
| **Agente do capítulo** (exclusivo) | `content/<pilar>/<setor>/<unidade>/**` · `src/conteudo/<unidade>.test.ts` · `src/widgets/<unidade>/**` · `manim/scenes/<unidade_snake>_*.py` · `public/videos/<unidade_snake>_*` |
| **Agente de componentes comuns** (1 só, indicado pelo coordenador) | `src/widgets/common/**` (widgets genéricos da §5) |
| **Coordenador / integrador indicado** | `src/widgets/registry.ts` · `src/widgets/params.ts` · `content/taxonomy.json` · `manim/render.py` |
| **Ninguém sem pedido explícito** | `src/engine/**` · `src/steps/**` · `src/treino/**` · `src/ui/**` (palette, marcas, glossário, Icons, styles.css, Tactile) · `src/characters/**` · `scripts/**` · `package.json`/lock · testes existentes · `content/geometria/geometria-espacial/cones/**` |

Regras:
- **Sem commits** (o coordenador cuida do git). Não rodar formatador no repo inteiro; não instalar dependências.
- **Não rodar `npm run build`** em paralelo (escreve `dist/`); use `typecheck` + `test` + validação de aula única. `npm run dev` só em porta própria (`npx vite --port 51xx`).
- `npm run manim` renderiza todas as cenas; para só a sua: `python -m manim render --format mp4 --media_dir manim/media manim/scenes/<arquivo>.py <Classe>` e copie o mp4 + capa para `public/videos/`.
- Precisou de algo num arquivo compartilhado (cor nova, mudança de schema)? **Peça ao coordenador**, não edite.
- Reuso entre capítulos: importe de `src/widgets/common/` ou de `canvas.ts`; **não** importe de pasta de outro capítulo (evita acoplamento entre agentes).

### 4.2 Pedido de registro (o que o agente entrega ao coordenador)

```
CAPÍTULO: geometria/geometria-espacial/prismas
taxonomy:    aula-01 "arquivo": "geometria/geometria-espacial/prismas/aula-01.json"   (títulos: manter ou trocar por "...")
params.ts:   import * as prismas from "./prismas/params";  + ...prismas.widgetParams / ...prismas.figureParams   (só caminho longo)
registry.ts: import * as prismas from "./prismas";         + ...prismas.widgets / ...prismas.figures            (só caminho longo)
render.py:   ("prismas_aula01_fatias.py", "Fatias", "prismas_aula01_fatias", 1.0)                          (só se houver vídeo)
```
Sugestão de ordem: o agente pede o registro dos **ids de widget logo no início** (mesmo com componentes provisórios), porque o schema recusa widgets não registrados e isso bloqueia a validação da aula.

### 4.3 Acoplamentos a Cones — resolvidos na fase 2

1. Grandezas `h | r | g` fixas → **marcas `c1..c4` + `glossario` na aula** (§2.1). Cones continua usando h/r/g com o glossário padrão.
2. Falas padrão do treino de Cones → **generalizadas**; Cones manteve as antigas como `fala` própria.
3. `figures` tipado com o cone → **genérico** (mapa tipado por id em `registry.ts`).
4. Ícone de cone em toda a trilha → **campo `icone` na unidade** (fallback: cone).
5. Mapa do Ensino Médio → **cadastrado na taxonomia** (40 aulas previstas, 2 publicadas). Ids das unidades batem com `docs/planos/*.md`.
6. Testes só de Cones → **`src/engine/conteudo.test.ts`** percorre a taxonomia.

Ainda em aberto (para o coordenador):
- A ordem das unidades na trilha segue o currículo; Cones ficou no 3º setor de Geometria (depois de Plana e Trigonometria). Se a demo precisar de Cones no topo, basta reordenar setores/unidades.
- `funcao-modular` usa o ícone `reta`; um ícone "V" próprio pode ser criado depois.

---

## 5. Componentes reutilizáveis sugeridos (`src/widgets/common/`)

Prioridade pela quantidade de capítulos que destravam. Todos seguem o contrato `WidgetProps`, desenham com `canvas.ts`/`palette`, aceitam sliders pelo JSON e emitem métricas para `complete_when`.

### 5.1 `plano_cartesiano` + `plano_figura` — PRONTOS

Arquivos: `common/params.ts` (schemas), `common/plot2d.ts` (matemática pura, testada), `common/desenhoPlano.ts` (desenho), `PlanoCartesianoWidget.tsx`, `PlanoFigura.tsx`.

```jsonc
"params": {
  "x": [-5, 5], "y": [-5, 5], "grade": true,                // padrões; escala única nos dois eixos
  "curvas": [
    { "tipo": "afim", "a": 1, "b": 0, "fantasma": true, "rotulo": "y = x" },  // cinza tracejado: caso neutro / "antes"
    { "tipo": "afim", "a": "$a", "b": "$b", "cor": "c3", "rotulo": "f" }    // "$a" = valor do slider "a"
  ],
  "ponto":     { "curva": 0, "x": 1, "arrastavel": true, "passo": 0.5, "rastro": true, "coordenadas": true, "cor": "ink" },
  "triangulo": { "curva": 1, "x": 0, "cor": "c1" },          // "anda 1, sobe a": de (x, f(x)) a (x+1, f(x+1))
  "marcar":    { "raizes": false, "interceptoY": false, "encontro": false, "quadrantes": false },
  "cores":     { "raiz": "c4", "interceptoY": "c2", "encontro": "c4" },
  "highlight": []                                             // marcas destacadas (engrossa essas, afina as outras)
}
```
- **Tipos de curva** (sem `eval`): `afim` a·x+b · `quadratica` a·x²+b·x+c · `exponencial` a·bˣ+c · `logaritmo` a·log_b(x)+c · `modular` a·|x−b|+c · `seno`/`cosseno` a·sen(b·x)+c. Qualquer coeficiente aceita `"$slider"`.
- **Marcações** (`interceptoY`, `raizes`) usam a primeira curva não fantasma; `encontro` usa as curvas 0 e 1.
- **Métricas** do widget: `ponto_x`, `quadrantes` (0..4 visitados; com `marcar.quadrantes`, os visitados ficam tingidos), `faixa_x`, `na_raiz` (0/1), `no_encontro` (0/1). O arraste encaixa x em múltiplos de `passo`, então a resposta exata é alcançável.
- `ponto.x: "$x"` faz o ponto seguir um slider (aí não é arrastável).
- **`plano_figura`**: mesmos campos, só números. Em `micro_challenge`, cada opção sobrescreve campos inteiros (ex.: `{ "marcar": { "raizes": true }, "highlight": ["c4"] }` ou `{ "ponto": { "x": 0 } }`).
- Rótulos de curva fogem das bordas, dos eixos e uns dos outros; mesmo assim, confira no celular.

**Extensões (fase de widgets).** Tudo opcional; o JSON antigo continua valendo.
- **Curvas novas:** `raiz` a·√(x − b) + c · `racional` a/(x − b) + c · `cubica` a·x³ + b·x² + c·x + `d` · `potencia` a·(x − b)^`n` + c · `seno`/`cosseno` ganham `fase`: a·sen(b·(x − fase)) + c.
- **Em qualquer curva:** `transforma: { a, b, h, k }` desenha a·f(b·(x − h)) + k (aceitam `"$id"`; ponha a original como fantasma ao lado); `dominio: { de, ate, abreDe, abreAte }` (null = infinito; bolinha aberta/fechada nos extremos) para funções por partes; `furos: [1]` (bolinha vazia, ex.: (x² − 1)/(x − 1)).
- **Ponto:** `curva: [0, 1]` percorre uma função por partes (vale a 1ª curva definida no x); `curva: null` é o cursor independente (anda no eixo x e mostra a altura de cada curva); `espelho: true` mostra o reflexo (y; x) em y = x; `retangulo: true` desenha o retângulo da origem ao ponto com x·y (cor `corRetangulo`). O ponto não entra fora do domínio nem em furo (a tentativa vira métrica).
- **Triângulo:** `modo: "fator"` rotula o degrau como `×b` (exponencial) em vez de `+a`.
- **Marcar:** `vertice` e `eixo` (parábola: quadrática ou potência n = 2), `assintota` (exponencial, logaritmo, racional, potência negativa; já com a transformação), `angulo` (entre as retas 0 e 1; quadradinho quando m₁·m₂ = −1; a curva 1 fica tracejada quando coincide com a 0), `base` (etiqueta da base b), `fase`, `periodo` (T = 2π/b) e `faixa` (linha média, topo, fundo) para seno/cosseno. Cores em `cores.vertice | angulo | base | fase | periodo`.
- **Guias** (não são curvas, não entram em raiz/encontro): `guias: { diagonal: true, horizontais: [{ v: 3, rotulo: "pico", cor }], verticais: [...] }`; `assintotas: { x: [..], y: [..] }` extras.
- **Métricas novas:** `no_vertice`, `ramos_visitados` (lados da assíntota vertical, 0..2), `trechos_visitados`, `fora_do_dominio`, `no_furo`, `angulo_reto`, `coincidentes`, `intercepto_tocado` (tocar o marcador de `interceptoY`), `parametros_testados` (sliders que saíram do inicial), `espelho_visto`. `na_raiz` não vale para o cursor independente.

### 5.2 `reta_numerica` + `reta_figura` — PRONTOS

```jsonc
"params": {
  "intervalo": [-5, 5], "marcas": 1,
  "trechos": [ { "de": -1, "ate": null, "abreDe": true, "cor": "c1", "rotulo": "x > −1" } ],   // null = infinito
  "pontos":  [ { "x": 2, "cor": "c2", "rotulo": "2", "aberto": false } ],
  "operacao": { "a": { "de": -2, "ate": 2 }, "b": { "de": 0, "ate": 4, "abreDe": true }, "modo": "intersecao" }, // ou "$op" (0/1/2)
  "ponto":   { "x": 0, "arrastavel": true, "passo": 0.5, "distanciaZero": false, "corDistancia": "c2", "centro": "$h", "vertice": true },
  "highlight": []
}
```
Métricas: `ponto_x`, `dentro` (1 se o ponto está em algum trecho), `faixa_x`, `pertence` (1 se o ponto está no resultado de `operacao`), `distancia` (`|x - centro|` ou `|x|` com `distanciaZero`). `operacao` desenha três trilhas (`A` `c1`, `B` `c2`, resultado `c4`); `ponto.centro` (aceita `"$slider"`) desenha vetor `x - c` (`c3`) e segmento `|x - c|` (`c4`), com marcador `"h"` quando `vertice: true`. `reta_figura` recusa `"$slider"`. Serve para conjuntos, intervalos, inequações e módulo.

### 5.3 `barras` + `barras_figura` — PRONTOS

Arquivos: `common/barras/params.ts` (schema por `modo`), `calc.ts` (estatística, quartis, sequências, sorteio reprodutível; testado), `desenho.ts`, `BarrasWidget.tsx`, `BarrasFigura.tsx`. Valores numéricos aceitam **expressão com sliders** (`common/expr.ts`, sem `eval`): `"$n"`, `"1/$m"`, `"2*$k"`, `"1+$t/100"`, `"5-$s"`.

| `modo` | Campos principais | Métricas |
|---|---|---|
| `categorias` | `categorias: [{nome, valor}]`, `tipo` e `tipos` (chave barras/linha/setores), `eixo_inicio` (`"$eixo"`), `tabela`, `relativa` / `chave_relativa`, `coleta` (botões +1), `comparar: [i, j]` ("B parece X× A"), `degraus` (`+d` entre barras vizinhas, maior crescimento em `c3`), `acesas` (figura) | `barras_tocadas`, `tipo_linha`, `tipo_setores`, `regua_relativa`, `respostas` |
| `amostragem` | `populacao: [{nome, pct}]`, `destaque`, `n` (`"$n"`), `vicio: {rotulo, populacao}`, `semente` | `amostra_pct`, `erro`, `vicio_ligado`, `amostras` |
| `pontos` | `valores` (aceitam `"5-$s"`), `regua`, `passo`, `arrastaveis` (índices), `apoio: "media" \| "arrastavel" \| número`, `mostrar: {mediana, moda, desvios, quadrados, fila, soma_desvios, alerta_mediana, conta_media}`, `chaves: ["desvios","quadrados","fila","somar"]`, `tocar_meios`, `grupo_b`, `incognita` | `arrastes`, `equilibrio`, `maior_valor`, `media`, `mediana`, `desvios_ligados`, `quadrados_ligados`, `somou`, `fila_ligada`, `meios_tocados` |
| `fila` | `valores`, `ordenada` (senão botão "pôr em fila"), `arrastaveis` / `fixos` (`q1 q2 q3`), `caixa` / `chave_caixa`, `maior_arrastavel: {ate, passo}` | `ordenou`, `q1_certo`, `q2_certo`, `q3_certo`, `cortes_certos`, `caixa_desenhada`, `maior_valor`, `atipicos` |
| `sequencia` | `regra: "pa" \| "pg" \| "recorrencia" \| "recorrencia2"` (`aₙ₊₁ = q·aₙ + d`, ou `aₙ₊₂ = p·aₙ₊₁ + q·aₙ` com `a2`), `a1`, `a2`, `d`, `p`, `q`, `termos` (N colunas), `n` (`"$n"`: até onde acende), `degraus` (+d / ×q), `acumular` (torre Sₙ), `limite` (a₁/(1 − q)), `fantasma`, `nome`, `casas`, `acesos` (figura) | `termo_n`, `soma_n`, `sinal_trocou`, `barras_tocadas` |
| `parte_todo` | `partes`, `pintadas` (`"2*$k"`, `"2+$n"`), `todo` (valor do todo), `referencia: {partes, pintadas}`, `mostrar: {fracao, porcento, razao}`, `rotulos: {parte, todo}` | `fracao`, `porcento`, `pintadas`, `partes`, `equivalente` |

Cores por marca em `cor`/`cores` de cada modo (padrões: índice c1, termo c2, d c3, q c4; parte c1, todo c2, % c3, razão c4; apoio c3, mediana c4, desvio c1). Quartis pelo método das metades (1, 3, 4, 6, 8, 9, 12 → 3, 6, 9). Juros: `regra: "pg"`, `q: "1+$t/100"`. A figura aceita os mesmos campos, só números, e `highlight`.

### 5.4 `grade_resultados` + `grade_figura` — PRONTOS

Arquivos: `common/grade/params.ts`, `calc.ts` (fatorial, arranjo, C(n, k), Pascal, permutações, distribuições, binomial, conjuntos de casas; testado), `desenho.ts`, `GradeWidget.tsx`, `GradeFigura.tsx`. Valores com slider aceitam expressão (`"$k"`, `"$inicio_b+3"`).

| `modo` | Campos principais | Métricas |
|---|---|---|
| `casas` | `linhas` (rótulos ou quantidade), `colunas` (rótulos, quantidade ou `"linhas"`), `n_linhas`/`n_colunas`/`etapas` (`"$id"`), `titulos`, `conteudo: rotulo \| soma \| vazio \| soma_ao_tocar`, `evento`/`a`/`b` (conjuntos: `casas`, `linhas`, `colunas`, `soma`, `intervalo {de, ate}`, `diagonal`), `repetir`, `ordem`, `ou`, `pista`, `chaves: [repetir, ordem, e_ou, unir, tirar_repetidas, complemento, pista, a_e_b]`, `botoes_evento: [{rotulo, conjunto}]`, `regua`, `contador`, `acesas`/`mostrar` (figura) | `total`, `celulas_tocadas`, `marcadas_certas`, `marcadas_erradas`, `modo_ou`, `repetir_desligado`, `ordem_desligada`, `uniu`, `descontou`, `complemento_visto`, `pista_ligada`, `intersecao_vista`, `extremos_vistos`, `eventos_vistos` |
| `tabela` | `linhas: [{rotulo, valores}]`, `colunas`, `pista_linha`/`pista_coluna`, `evento_coluna` | `linha_tocada`, `coluna_tocada`, `linha_<rótulo>`, `coluna_<rótulo>` (ex.: `linha_meninas`, `coluna_oculos`) |
| `arvore` | `niveis: [{titulo, galhos}]` ou `galhos` + `n` (`"$n"`); galho `{rotulo, cor, p, sucesso}`; `agrupar` (barras por nº de sucessos), `caminho: "sucessos"`, `chave_um` (a = b = 1), `mostrar_produto`, `acesas`, `acender_k` | `total`, `pontas_tocadas`, `pontas_k0..kN` (no binômio, marque o galho b como `sucesso`: `pontas_k1` = pontas com um b), `chave_ligada` |
| `fila` | `itens`, `lugares`, `listar`, `iguais: [i, j]`, `prender: {item, lugar}`, `escada`, `montada` (figura) | `filas_montadas`, `iguais_ligado`, `letra_presa`, `total` |
| `escada` | `n`, `k`, `iguais` (todos os degraus em `n`), `operacao: "produto" \| "soma"` (sinais `+` na legenda e soma em `total`) | `total` |
| `lista` | `itens`, `k`, `ordem` | `total`, `ordem_desligada` |
| `barras` | `n`, `k`, `p` (% , `"$p"`), `itens` | `total` (C(n, k) ou P(k) em %) |
| `pascal` | `n`, `tocada` (figura) | `numeros_tocados` |
| `bolinhas_e_barras` | `bolinhas`, `barras`, `sequencia: "●●\|●\|"`, `caixas`, `contador_apos`, `numeradas` (bolinhas 1, 2, …) | `distribuicoes_vistas`, `total` |
| `caixas` | `itens`, `n`, `rotulos`, `chave_minimo`, `minimo` | `total`, `regra_ligada`, `distribuicoes_vistas` |
| `colunas` | `colunas: [{titulo, itens, cor}]`, `ou` | `total`, `modo_ou` |
| `urna` | `bolas: [{rotulo?, cor, quantidade}]`, `retiradas` (bolas riscadas + total riscado), `destaque` | `total` |

Chaves de casa nos dados: `"1,6"` (linha, coluna pelos rótulos); fila: `"6"`. Cores em `cores` (linhas c1, colunas c2, casa c3, A c1, B c2, interseção c3, fora/complemento c4).

### 5.5 `ciclo_trigonometrico` — PRONTO

Ver §5.11.

### 5.6 `geometria_*` (plana) — PRONTOS

`geometria_triangulo` (§5.10), `geometria_poligono` (§5.12), `geometria_circulo` (§5.13).

### 5.7 `solido_3d` + `solido_3d_figura` — PRONTOS
Inclui os modos `revolucao`, `prisma`, `piramide`, `cilindro`, `esfera`, `tronco`, `poliedro`, `espaco`, `vistas`, `composicao` e `corte_cone` (`inclinacao` em graus, `altura_do_corte`, `r`, `h`; métricas `secao` 0..3 e `secoes_vistas` 0..4 para circunferência, elipse, parábola e hipérbole). `solido_3d_figura` recusa `"$slider"`.
Generalizar `coneScene.ts` + `math3d/revolve.ts` para revolução de qualquer perfil (retângulo → cilindro, semicírculo → esfera, trapézio → tronco) e acrescentar sólidos de faces planas; mesma câmera ortográfica e convenção de aresta oculta tracejada. Inclui planificação (Aula 02 de Cones já prevista na taxonomia).

### 5.8 Menores, mas úteis
- ~~`grade_resultados`~~ — pronto (§5.4).
- ~~`barras`~~ — pronto (§5.3). Fila de widgets pendentes e prioridade: `docs/WIDGETS-PENDENTES.md`.
- `transformacao_plano` (matrizes): malha do plano deformada por uma matriz 2×2 com sliders.
- Hooks: `useArrasto` (ponteiro com captura, como no `GeneratrixWidget`), `useVisitados` (contagem de faixas visitadas → métrica de cobertura, generalizando o `arc`).

### 5.9 Ordem sugerida

1. ~~Coordenador resolve §4.3~~ e ~~plano cartesiano + reta numérica~~ — feitos na fase 2.
2. Agentes de capítulo de funções, conjuntos, inequações, PA/PG e analítica: caminho curto (§3.0), só JSON + teste.
3. Em paralelo, um agente de componentes comuns faz `ciclo_trigonometrico` e `geometria_plana`; outro generaliza `solido_3d`.

### 5.10 `geometria_triangulo` + `geometria_triangulo_figura` — PRONTOS

Arquivos: `common/triangulo/params.ts` (schema por `modo`), `calc.ts` (geometria e métricas; testado), `desenho.ts`, `GeometriaTrianguloWidget.tsx`, `GeometriaTrianguloFigura.tsx`; helpers de geometria em `common/geo/` (`base.ts`, `Controles.tsx`). Todo número aceita `"$id"` (slider de id em minúsculas) no widget; a figura só aceita números e `highlight: Marca[]`. Triângulo de referência em cinza tracejado: `fantasma`. Chaves (`chaves: [...]`) aparecem como botões abaixo do desenho. As métricas dos sliders entram sozinhas, pelo id.

| `modo` | Campos principais | Métricas emitidas |
|---|---|---|
| `pitagoras` | `b`, `c` (catetos), `quadrados`, `malha`; `prova` + `deslizado` + chave `deslizar` (quadradão b + c com 4 triângulos: sobra a², depois b² e c²); `diagonal` + chave `diagonal` (quadrado de lado b, d = b√2) | `a`, `area_b2`, `area_c2`, `area_a2`, `deslizou_pecas`, `testou_diagonal` |
| `razoes` | `angulo` (θ), `hip` (hipotenusa na escala 1), `k`, `k_max` (fixa a janela), `malha`, `painel`, `fantasma` (θ de referência, em graus) | `razao_sen`, `razao_cos`, `razao_tg`, `k`, `angulo`, `co`, `ca`, `hip` |
| `metricas` | `a`, `m` (n = a − m); ou `catetos: [b, c]` + `apoio` (0 apoia no cateto, 1 na hipotenusa); `comparar` (quadrado b² × retângulo a·m) | `a`, `m`, `n`, `h`, `b`, `area_b2`, `area_am`, `apoio` |
| `cossenos` | `b`, `c`, `angulo` (A), `fantasma` (A = 90°) | `a`, `a2`, `termo_cos`, `ang_a` |
| `senos` | `R`, `angulo` (A), `posicao` (desloca o vértice A pelo arco) | `a`, `razao_a_sen`, `dois_R`, `ang_a` |
| `angulos` | `vertice: [x, y]` arrastável (base de (−3, 0) a (3, 0); padrão equilátero), `passo`, `arrastavel`; ou `alfa`/`beta` por slider; `paralela`, `externo`, `fantasma`, chave `fechar` (três barras = meia-volta) | `soma_angulos`, `vertices_movidos`, `fecha`, `alfa`, `beta`, `gama`, `externo` |
| `desigualdade` | `a` (base), `b`, `c` (braços articulados) | `se_cruzam`, `a`, `b`, `c` |
| `congruencia` | `lados: [l0, l1, l2]`, `chaves` (LLL, LAL, ALA, AAA; uma por vez), `ligada` (figura) | `testou_congruencia`, `congruentes_vistas` |
| `notaveis` | `figura: quadrado \| equilatero \| mediatriz`; `L`, `cortar` (0/1), `diagonal`, `fantasma` (L = 1); mediatriz: `ab`, `raio` | `l`, `d`, `h`, `cortou`, `raio`, `se_cruzam` |
| `semelhanca` | `variante: paralela \| tales \| sombras`; paralela: `lados`, `k`, `giro`; tales: `esq`, `dir`, `corte` (h da paralela do meio); sombras: `bastao: [h, sombra]`, `sombra_poste`, chave `sobrepor` | `k`, `razao`, `giro`, `entortou_corte`, `sobrepos_triangulos`, `x`, `h_poste` |

Notas de uso:
- No ângulo externo (`externo: true`) o prolongamento da base sai do vértice B: `e = α + γ` (as duas fatias são α, correspondente, e γ, alterno).
- Nomes de slider são minúsculos (`ang_a`, `l`): é a regra do schema de aula e das expressões `"$id"`.
- `razoes` com `k_max` (padrão 3) mantém a janela fixa: o triângulo cresce sem a vista mudar, e as razões ficam iguais.

Exemplos (`params`):
```jsonc
{ "modo": "pitagoras", "b": 3, "c": "$c" }                                   // quadrados quadriculados nos 3 lados
{ "modo": "pitagoras", "prova": true, "chaves": ["deslizar"], "b": 3, "c": 4 } // quebra-cabeça das áreas
{ "modo": "razoes", "angulo": 30, "k": "$k", "hip": 5, "fantasma": 45 }
{ "modo": "metricas", "a": 10, "m": "$m", "comparar": false }
{ "modo": "cossenos", "b": 3, "c": 4, "angulo": "$ang_a", "fantasma": true }
{ "modo": "senos", "R": 5, "angulo": "$ang_a" }
{ "modo": "angulos", "paralela": true, "chaves": ["fechar"] }                 // vértice arrastável; vertices_movidos
{ "modo": "desigualdade", "a": 8, "b": 5, "c": "$c" }
{ "modo": "congruencia", "lados": [4, 5, 6] }
{ "modo": "notaveis", "figura": "equilatero", "L": 6, "cortar": "$cortar_eq" }
{ "modo": "semelhanca", "variante": "paralela", "lados": [6, 8, 10], "k": "$k", "giro": "$giro" }
```

### 5.11 `ciclo_trigonometrico` + `ciclo_trigonometrico_figura` — PRONTOS

Arquivos: `common/ciclo/params.ts`, `calc.ts` (ângulo, quadrantes, soma, alvo, arco; testado), `desenho.ts`, `CicloTrigonometricoWidget.tsx`, `CicloTrigonometricoFigura.tsx`. Um só modo: circunferência de raio 1 com o ponto P(cos θ; sen θ); cada elemento liga por um campo. Valores numéricos aceitam `"$id"` (slider minúsculo); a figura só aceita números.

| Campo | O que faz |
|---|---|
| `angulo` (graus, pode passar de 360 ou ser negativo) ou `rad` (radianos) | posição de P; `unidade: graus \| radianos \| ambos` escolhe o mostrador (30° = π/6) |
| `arrastavel`, `passo` | o aluno arrasta P; o ângulo encaixa em múltiplos de `passo` graus |
| `mostrar` | `seno`, `cosseno` (projeções c1 e c2, ligados por padrão), `tangente` (reta x = 1, c3), `secante`, `fita` (arco desenrolado em radianos), `voltas`, `simetricos` (retângulo dos 4 simétricos, em torno do `fantasma` se houver), `pitagorica` (triângulo + barra sen² + cos² = 1), `marcos` (eixos e 0, π/2, π, 3π/2) |
| `soma: { alfa, beta }` + `blocos` | giros α (c1) e β (c2); P vai para α + β; barras sen(α + β) × sen α + sen β e, com `blocos` ≥ 1, sen α cos β + cos α sen β. Arco duplo: `alfa` e `beta` com o mesmo `"$id"` |
| `alvo: { seno: k }` ou `{ cosseno: k }` | reta y = k (ou x = k) e os dois encontros, que o aluno toca para marcar; `marcadas: [0, 1]` já os marca (figura) |
| `arco: { de, ate, abreDe, abreAte }` | arco solução aceso; extremo aberto = bolinha vazia |
| `grafico: "sen" \| "cos"` | curva traçada ao lado, de 0 a 2π, ligada a P por uma linha tracejada |
| `fantasma` (graus ou lista), `marcos_rad: [1, 2, 3]` | referências em cinza |
| `quadrante` + `seno_fixo` | P no quadrante dado com \|sen\| = `seno_fixo` (o ângulo é calculado) |
| `cores` | `seno` c1, `cosseno` c2, `tangente` c3, `arco`/`angulo`/`solucao`/`simetricos` c4, `alvo` c2, `fita` c2, `alfa` c1, `beta` c2, `soma` c3; `highlight: Marca[]` engrossa |

**Métricas:** `angulo` (graus, total), `rad`, `x_rad`, `voltas`, `quadrantes` (visitados, 0..4), `quad` (quadrante atual), `seno`, `cosseno`, `tangente`, `dentro` (0/1, dentro do `arco`), `no_alvo` (0/1, P sobre um encontro; vale 390° = 30°), `solucoes_marcadas`, e com `soma`: `sen_soma`, `soma_senos`.

Exemplos (`params`):
```jsonc
{ "angulo": "$angulo", "unidade": "ambos" }                                          // caso neutro: seno e cosseno de θ
{ "rad": "$rad", "mostrar": { "fita": true, "seno": false, "cosseno": false }, "marcos_rad": [1, 2, 3] }
{ "angulo": "$graus", "fantasma": 60, "mostrar": { "voltas": true } }                // arcos côngruos
{ "angulo": "$theta", "fantasma": 30, "mostrar": { "simetricos": true } }
{ "angulo": "$theta", "mostrar": { "tangente": true, "secante": true } }
{ "angulo": "$theta", "mostrar": { "pitagorica": true } }                            // sen² + cos² = 1
{ "soma": { "alfa": 30, "beta": "$beta" }, "blocos": "$mostrar_blocos" }
{ "angulo": "$angulo", "alvo": { "seno": 0.5 }, "marcos_rad": [] }                   // equações: dois encontros
{ "angulo": "$angulo", "arco": { "de": 30, "ate": 150 }, "alvo": { "seno": 0.5 } }   // inequações: dentro (0/1)
{ "rad": "$x_rad*0.785398", "grafico": "sen" }                                       // ponto no ciclo traça y = sen x
```

### 5.12 `geometria_poligono` + `geometria_poligono_figura` — PRONTOS

Arquivos: `common/poligono/params.ts` (schema por `modo`), `calc.ts` (geometria e métricas; testado), `desenho.ts`, `GeometriaPoligonoWidget.tsx`, `GeometriaPoligonoFigura.tsx`. Valores aceitam `"$id"`; a figura só aceita números e `highlight`.

| `modo` | Campos principais | Métricas emitidas |
|---|---|---|
| `malha` | `forma: retangulo \| paralelogramo \| triangulo \| trapezio`; `b`, `h`, `B` (base maior do trapézio), `inc` (deslocamento do lado de cima); `k` (ampliação do retângulo: mostra as k² cópias); `cortar` (0/1: paralelogramo → retângulo); `duplicar` (0/1: cópia girada 180° forma um paralelogramo); `fantasma: [b, h]`; `mostrar: { area, perimetro, alturas }` | `area`, `perimetro`, `b`, `h`, `k`, `razao_area`, `encaixado`, `duplicado` |
| `poligono` | `n` (3..12), `diagonais` (n − 2 triângulos a partir de um vértice), `externos` (ângulos externos c3), `encolher` 0..100 (o polígono encolhe e os externos formam o círculo de 360°); `quadrilatero` 1 paralelogramo, 2 retângulo, 3 losango (diagonais c4) | `n`, `triangulos`, `soma_internos`, `soma_externos`, `encolher`, `diagonais_iguais`, `diagonais_perpendiculares`, `lados_iguais` |
| `regular` | `n`, `R`, `dividir` (0/1: n triângulos centrais; hexágono = 6 equiláteros), `ladrilho` (peças de lado 1 em torno de um ponto: fresta c4 ou 360°) | `n`, `angulo_central`, `angulo_externo`, `angulo_interno`, `soma_internos`, `lado`, `ladrilho_fechado`, `fresta`, `dividido` |
| `isometria` | `transformacao: rotacao \| translacao \| reflexao \| homotetia \| painel`; `figura: F \| triangulo` (triângulo de base 2 e área 2); `angulo`, `dx`, `dy`, `refletir` (0/1) com `espelho`, `k` (aceita negativa), `fantasma` | `angulo`, `dx`, `dy`, `k`, `area`, `area_imagem`, `perimetro`, `perimetro_imagem`, `razao_area`, `razao_lados`, `orientacao_trocada`, `invertido` |
| `paralelas` | `alfa` (10..170), `foco` (um cruzamento só + meia-volta), `destacar: nenhum \| opostos \| correspondentes \| alternos \| colaterais`, `desvio` (gira s por Δ), `deslizar` 0..1 (ou a chave `chaves: ["deslizar"]`), `fantasma` (transversal a 90°), `rotulos` (ex.: `{ "s-ne": "x" }`; ids `r-ne`, `r-nw`, `r-sw`, `r-se`, `s-…`), `ocultar` | `alfa`, `suplementar`, `inclinou`, `desvio_paralela`, `paralelas`, `deslizou_paralela` |

Cores: área c3, perímetro c4, base c1, altura c2 (malha); triângulos alternados c1/c2 e externos c3 (polígono); central c1, externo c2, interno c3, fresta c4 (regular); imagem da isometria: rotação c3, translação c1, reflexão c2, homotetia c4 (o original é cinza); α e opostos c1, 180° − α c2 (paralelas).

Exemplos (`params`):
```jsonc
{ "modo": "malha", "forma": "retangulo", "b": "$b", "h": "$h", "fantasma": [1, 1] }
{ "modo": "malha", "forma": "paralelogramo", "b": 4, "h": 3, "inc": "$inc", "cortar": "$cortar" }
{ "modo": "malha", "forma": "trapezio", "b": 4, "B": 6, "h": 3, "inc": 1, "duplicar": "$duplicado" }
{ "modo": "poligono", "n": "$n", "diagonais": true }
{ "modo": "poligono", "n": 5, "diagonais": false, "externos": true, "encolher": "$encolher" }
{ "modo": "poligono", "quadrilatero": "$formas_testadas" }
{ "modo": "regular", "n": "$n" }
{ "modo": "regular", "n": "$peca_piso", "ladrilho": true }
{ "modo": "isometria", "transformacao": "rotacao", "angulo": "$angulo" }
{ "modo": "isometria", "transformacao": "homotetia", "figura": "triangulo", "k": "$k" }
{ "modo": "paralelas", "alfa": "$alfa", "fantasma": true }
{ "modo": "paralelas", "alfa": 65, "destacar": "colaterais", "rotulos": { "s-ne": "x" } }
```

### 5.13 `geometria_circulo` + `geometria_circulo_figura` — PRONTOS

Arquivos: `common/circulo/params.ts` (schema por `modo`), `calc.ts` (geometria e métricas; testado), `desenho.ts`, `GeometriaCirculoWidget.tsx`, `GeometriaCirculoFigura.tsx`. Valores aceitam `"$id"`; a figura só aceita números e `highlight`.

| `modo` | Campos principais | Métricas emitidas |
|---|---|---|
| `arcos` | `alfa` (central AÔB e arco AB, graus), `inicio` (posição de A), `pos_v` (posição de V; sem ela, no meio do arco maior); `mostrar: { arco c1, central c2, inscrito c3, corda c4, isosceles, medidas }`; `arrastaveis: ["B", "V"]` e `passo` (graus) para o aluno arrastar | `alfa`, `central`, `arco`, `inscrito`, `pos_v`, `razao_central_inscrito`, `reto`, `arco_visto` |
| `roda` | `variante`: `giro` (roda rolando na pista com 1, 2, 3 e π; `d`, `giro` em graus; rastro C c3), `razao` (roda d com a de d = 1 em cinza: C/d = π), `arco` (`r`, `alfa`: L = α/360 · 2πr com a volta desenrolada), `voltas` (`d`, `voltas`, `voltas_max`; cada trecho é uma circunferência); `unidade` ("m") | `giro`, `d`, `voltas`, `rastro`, `comprimento`, `razao_c_d`, `arco`, `alfa`, `percurso` |
| `fatias` | `variante`: `disco` (`r`, `N` setores rearranjados em fila: base → πr, altura r), `setor` (`r`, `alfa`; área em múltiplos de π), `coroa` (`R`, `furo`: A = π(R² − r²)) | `n`, `area`, `razao_base`, `area_setor`, `fracao`, `coef_setor`, `area_coroa`, `coef_coroa`, `furo` |

Notas: no `arcos`, o inscrito é medido de verdade (ângulo em V entre VA e VB): com V no arco maior vale α/2; com V sobre o arco AB vale 180° − α/2; com α = 180° vale 90° e aparece o quadradinho de ângulo reto. Arraste só vale em `arcos`; nos demais modos o slider comanda tudo.

Exemplos (`params`):
```jsonc
{ "modo": "arcos", "alfa": "$alfa", "mostrar": { "central": true, "inscrito": false } }
{ "modo": "arcos", "alfa": 80, "mostrar": { "inscrito": true, "isosceles": true } }          // chave mostra OV e os isósceles
{ "modo": "arcos", "alfa": 100, "pos_v": "$pos_v", "mostrar": { "inscrito": true } }          // V passeia pela borda
{ "modo": "arcos", "alfa": "$alfa", "pos_v": 90, "mostrar": { "inscrito": true, "corda": true } } // semicircunferência
{ "modo": "roda", "variante": "giro", "d": 1, "giro": "$giro" }
{ "modo": "roda", "variante": "razao", "d": "$d" }
{ "modo": "roda", "variante": "arco", "r": 3, "alfa": "$alfa" }
{ "modo": "roda", "variante": "voltas", "d": 1, "voltas": "$voltas", "unidade": "m" }
{ "modo": "fatias", "variante": "disco", "r": 4, "N": "$fatias" }
{ "modo": "fatias", "variante": "setor", "r": 6, "alfa": "$alfa" }
{ "modo": "fatias", "variante": "coroa", "R": 5, "furo": "$r_int" }
```

### 5.14 `lugar_geometrico` + `lugar_figura`

Pasta `common/lugar/`: matemática pura em `calc.ts`, desenho em `desenho.ts`, widget e figura separados.
Modos `parabola`, `elipse`, `hiperbole`; dimensões aceitam expressões com sliders, figura exige números.

Campos comuns: `ponto: [x,y]`, `passo` (0,5), `prender_na_curva`, `prender_no_eixo`, `curva_oculta`, `focos`, `zoom`, `fantasma: {p?,a?,c?}`, `mostrar: {triangulo,retangulo,assintotas}`, `highlight`.
Elipse exige `0 <= c < a`; hipérbole exige `0 <= a < c`; parábola exige `p != 0`. Parâmetros inválidos mostram aviso sem desenhar uma curva falsa.

```json
{"modo":"parabola","p":"$p","ponto":[0,2],"prender_no_eixo":true,"curva_oculta":true}
```
```json
{"modo":"elipse","a":5,"c":"$c","prender_na_curva":true,"fantasma":{"c":0}}
```
```json
{"modo":"hiperbole","c":5,"diferenca":"$diferenca","prender_na_curva":true,"zoom":"$zoom","mostrar":{"assintotas":true}}
```

`diferenca` substitui `2a` na hipérbole; zero desenha a mediatriz. Elipse presa encaixa em 7,5 graus; demais arrastes encaixam pelo `passo`. O aluno pode arrastar P ou tocar outra posição da malha. O topo da elipse é tocável.
Métricas: `pontos_sobre` (posições distintas que satisfazem o lugar), `pontos_vistos`, `vertice_achado`, `topo_tocado`, `triangulo_ligado`, `igualou`. O estado inicial não conta como interação; visitas repetidas não aumentam contadores. Botões mostram triângulo/retângulo ou a igualdade algébrica da parábola. Sliders são métricas do motor.

Conferência visual em 400 px pendente nesta máquina: portal Maestri ausente, navegador conectado indisponível e aprovação do Computer Use expirou.

### 5.15 `pontos_no_plano` + `pontos_figura`

`common/pontos/`: modos `segmento` (padrão) e `reta`. Campos `a`, `b`, `terceiro?` são pares de números/expressões; `fixos: ["a"]`, `passo: 1`, `prender_na_reta`, `mostrar: {degraus,quadrados,medio}`, `highlight`. Figura aceita só números.

```json
{"modo":"segmento","a":[1,2],"b":[5,2],"fixos":["a"],"mostrar":{"degraus":true}}
```
```json
{"modo":"reta","a":[0,1],"b":[2,5],"prender_na_reta":true,"fixos":["a"]}
```

Métricas: `dx`, `dy`, `distancia`, `dx_zero` (vertical não degenerada), `quadrados_ligados`, `medio_ligado`, `pontos_vistos` (posições distintas após interação). A reta presa usa os pontos originais como referência; coincidência avisa que a reta é indeterminada. Botões revelam quadrados e ponto médio; os quadrados são construídos geometricamente sobre os lados. `terceiro` é marcador estático opcional. Revisão visual em 400 px pendente pelo bloqueio de automação registrado em §5.14.

### 5.16 `circunferencia_no_plano` + `circunferencia_figura`

`common/circunferencia/`: `centro: [a,b]`, `raio`, `ponto: [x,y]`, `reta_y?`, `segunda?: {centro,raio}` aceitam expressões; figura exige números. `centro_arrastavel` começa false, `ponto_arrastavel` true, `passo` 1. `curva_oculta` guarda pontos descobertos; `rotulos: false` oculta as etiquetas e equação. `highlight` destaca marcas.

```json
{"centro":[0,0],"raio":5,"ponto":[1,1],"curva_oculta":true}
```
```json
{"centro":["$a",0],"raio":3,"reta_y":"$k","centro_arrastavel":false}
```
```json
{"centro":[0,0],"raio":3,"segunda":{"centro":[6,0],"raio":3}}
```

Métricas: `pontos_sobre` (distintos após toque/arraste), `estados_vistos` (dentro/sobre/fora), `centro_x`, `k` quando há reta. O ponto encaixa na malha; raio precisa ser positivo. A posição inicial não aumenta contadores. Arrastar o centro limpa descobertas anteriores. Cores: centro c1, raio c2, curva c3, distância/reta c4. Revisão visual em 400 px pendente pelo bloqueio descrito em §5.14.

### 5.17 `vetores_no_plano` + `vetores_figura`

`common/vetores/`: união discriminada por `modo`, `vetores` (padrão) ou `complexo`. Pares numéricos aceitam expressões com sliders; figura só números; `highlight` e `passo` (1) comuns.

```json
{"modo":"vetores","vetores":[{"id":"u","cauda":[0,0],"comp":[3,1],"arrastavel":"cauda"},{"id":"v","comp":[0,0],"preso_em":"u","arrastavel":"ponta"}],"mostrar_soma":true}
```

`arrastavel`: `cauda`, `ponta`, `nenhum`. `preso_em` referencia um vetor anterior (ids únicos, sem ciclos). `escalar: "$k"` multiplica componentes e mostra original cinza; zero impede arrastar ponta, pois o vetor é nulo. `mostrar: {modulo,soma,conjugado}`.

```json
{"modo":"complexo","z":[3,"$b"],"w":[1,-1],"potencia_i":"$n","mostrar":{"conjugado":true,"modulo":true,"soma":true}}
```

`z`, `w?` são pares Re/Im; `potencia_i` aplica giros inteiros de 90 graus (use slider inteiro). Mostra rastro dos giros e eixos Re/Im. Conjugado reflete a parte imaginária.
Métricas: `origens_vistas`, `<id>_comprimento` (inclui `v_comprimento`), `modulo_ligado`, `modulo`, `re`, `im`, `giros`. Contador de origens registra posições distintas após arraste da cauda. Cores: componentes c1/c2, vetor/resultante c3, módulo c4. Revisão visual em 400 px pendente pelo bloqueio de §5.14.

### 5.18 `retangulo_areas` + `retangulo_areas_figura`

Pasta `common/areas/`; modos `produto`, `raiz`, `escala`. Dimensões aceitam expressões; figura só números. Campos comuns: `referencia` (true), `limite` (8, extensão mínima da vista), `highlight`.

```json
{"modo":"produto","a":2,"b":"$b","retirar":false}
```
```json
{"modo":"raiz","A":"$area","limite":4}
```
```json
{"modo":"escala","L":2,"k":"$k","e":"$e","unidade":false}
```

Produto desenha a², ab, ab, b²; `retirar: true` desenha as duas faixas retiradas, o canto compensado e o quadrado restante. Exige a,b não negativos e, na retirada, b <= a. Raiz exige A >= 0. Escala exige L,k >= 0; `unidade: true` troca o quadrado por segmento fixo L em m/dm/cm conforme e = 0/1/2. Use ids de slider minúsculos, mesmo quando o campo é A/L.
Métricas: `area`, `lado`, `pecas` (quantidade da decomposição), `razao_area`; sliders pelo motor. Valores inválidos mostram aviso. O canvas mantém a escala até ultrapassar `limite`, e o original aparece tracejado. Revisão visual em 400 px pendente pelo bloqueio de §5.14.

### 5.19 `maquinas_funcao` + `maquinas_figura`

Pasta `common/maquinas/`: modos `flechas` e `maquinas`. `maquinas_figura` exige números (recusa `"$slider"`). Aceita `highlight`.

- **`flechas`**: `entradas` e `saidas` (1..6 números ou textos até 12 caracteres), `ligacoes: [[iEntrada, iSaida], ...]`, `rotulos?: { entradas, saidas }`. O aluno escolhe uma entrada e liga/desliga saídas; mais de uma seta na mesma entrada destaca o conflito em `c4`.
- **`maquinas`**: `maquinas: [{ nome, a, b }]` (1..3 máquinas afins `ax + b`; coeficientes aceitam expressões), `entradas` (botões `x = n`), `x` (inicial), `ordem_invertida`, `inversa`, `mostrar?: { inverter, inversa }`.

```json
{"modo":"flechas","entradas":[1,2,3],"saidas":[2,4],"ligacoes":[]}
```
```json
{"modo":"maquinas","maquinas":[{"nome":"g","a":1,"b":1},{"nome":"f","a":2,"b":0}],"entradas":[-1,1,2],"x":1}
```

Métricas: `entradas_com_uma_saida` (no modo `flechas`), `entradas_testadas`, `ordens_testadas`, `inversa_testada` (no modo `maquinas`). Cores: entradas `c1`, saídas `c2`, setas/máquinas `c3`, conflito/inversa `c4`.

### 5.20 `transformacao_plano` + `transformacao_figura`

Pasta `common/transformacao/`: transformações lineares 2×2 no plano cartesiano (malha deformada, colunas da matriz, quadrado unitário e composição). `transformacao_figura` recusa `"$slider"`. Aceita `highlight`.

- **Campos**: `matriz: [[a,b],[c,d]]` (aceita expressões com sliders; padrão identidade), `depois?: [[a,b],[c,d]]` (segunda matriz opcional, desenha 3 painéis: `v`, `M₁v`, `M₂(M₁v)`), `vetor?: [x, y]`, `vetores?: [[x, y], ...]`, `janela?: [min, max]` (padrão `[-3, 4]`), `mostrar?: { malha, quadrado, colunas, det, identidade }`.

```json
{"matriz":[["$a",0],[0,"$d"]],"vetor":[1,1],"mostrar":{"malha":true,"quadrado":true,"det":true}}
```
```json
{"matriz":[[0,-1],[1,0]],"depois":[[2,0],[0,1]],"vetor":[1,1]}
```

Métricas: `det`, `area` (`|det|`), `orientacao` (`1` se `det > 0`, `-1` se `det < 0`, `0` se `det == 0`), `v_x`, `v_y`. Cores: original/vetor `c1`, malha deformada `c2`, imagem/colunas `c3`, determinante/área `c4`.

