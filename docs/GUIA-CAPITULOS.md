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

### 5.2 `reta_numerica` + `reta_figura` — PRONTOS

```jsonc
"params": {
  "intervalo": [-5, 5], "marcas": 1,
  "trechos": [ { "de": -1, "ate": null, "abreDe": true, "cor": "c1", "rotulo": "x > −1" } ],   // null = infinito
  "pontos":  [ { "x": 2, "cor": "c2", "rotulo": "2", "aberto": false } ],
  "ponto":   { "x": 0, "arrastavel": true, "passo": 0.5, "distanciaZero": false, "corDistancia": "c2" },
  "highlight": []
}
```
Métricas: `ponto_x`, `dentro` (1 se o ponto está em algum trecho), `faixa_x`. `distanciaZero` desenha |x| (módulo). Serve para conjuntos, intervalos, inequações e módulo.

### 5.3 `barras` + `barras_figura` — PRONTOS

Arquivos: `common/barras/params.ts` (schema por `modo`), `calc.ts` (estatística, quartis, sequências, sorteio reprodutível; testado), `desenho.ts`, `BarrasWidget.tsx`, `BarrasFigura.tsx`. Valores numéricos aceitam **expressão com sliders** (`common/expr.ts`, sem `eval`): `"$n"`, `"1/$m"`, `"2*$k"`, `"1+$t/100"`, `"5-$s"`.

| `modo` | Campos principais | Métricas |
|---|---|---|
| `categorias` | `categorias: [{nome, valor}]`, `tipo` e `tipos` (chave barras/linha/setores), `eixo_inicio` (`"$eixo"`), `tabela`, `relativa` / `chave_relativa`, `coleta` (botões +1), `comparar: [i, j]` ("B parece X× A"), `acesas` (figura) | `barras_tocadas`, `tipo_linha`, `tipo_setores`, `regua_relativa`, `respostas` |
| `amostragem` | `populacao: [{nome, pct}]`, `destaque`, `n` (`"$n"`), `vicio: {rotulo, populacao}`, `semente` | `amostra_pct`, `erro`, `vicio_ligado`, `amostras` |
| `pontos` | `valores` (aceitam `"5-$s"`), `regua`, `passo`, `arrastaveis` (índices), `apoio: "media" \| "arrastavel" \| número`, `mostrar: {mediana, moda, desvios, quadrados, fila, soma_desvios}`, `chaves: ["desvios","quadrados","fila","somar"]`, `tocar_meios`, `grupo_b`, `incognita` | `arrastes`, `equilibrio`, `maior_valor`, `media`, `mediana`, `desvios_ligados`, `quadrados_ligados`, `somou`, `fila_ligada`, `meios_tocados` |
| `fila` | `valores`, `ordenada` (senão botão "pôr em fila"), `arrastaveis` / `fixos` (`q1 q2 q3`), `caixa` / `chave_caixa`, `maior_arrastavel: {ate, passo}` | `ordenou`, `q1_certo`, `q2_certo`, `q3_certo`, `cortes_certos`, `caixa_desenhada`, `maior_valor`, `atipicos` |
| `sequencia` | `regra: "pa" \| "pg" \| "recorrencia"` (aₙ₊₁ = q·aₙ + d), `a1`, `d`, `q`, `termos` (N colunas), `n` (`"$n"`: até onde acende), `degraus` (+d / ×q), `acumular` (torre Sₙ), `limite` (a₁/(1 − q)), `fantasma`, `nome`, `casas`, `acesos` (figura) | `termo_n`, `soma_n`, `sinal_trocou`, `barras_tocadas` |
| `parte_todo` | `partes`, `pintadas` (`"2*$k"`, `"2+$n"`), `todo` (valor do todo), `referencia: {partes, pintadas}`, `mostrar: {fracao, porcento, razao}`, `rotulos: {parte, todo}` | `fracao`, `porcento`, `pintadas`, `partes`, `equivalente` |

Cores por marca em `cor`/`cores` de cada modo (padrões: índice c1, termo c2, d c3, q c4; parte c1, todo c2, % c3, razão c4; apoio c3, mediana c4, desvio c1). Quartis pelo método das metades (1, 3, 4, 6, 8, 9, 12 → 3, 6, 9). Juros: `regra: "pg"`, `q: "1+$t/100"`. A figura aceita os mesmos campos, só números, e `highlight`.

### 5.3b `ciclo_trigonometrico` (trigonometria)
Ângulo por slider/arraste; projeções seno (vertical) e cosseno (horizontal) coloridas; sombra da função sendo traçada ao lado (liga ciclo ↔ gráfico, pilar 2); quadrantes e sinais (pilar 6, regra de sinais).

### 5.4 `geometria_plana` (plana, Pitágoras, semelhança, áreas)
Polígonos com vértices arrastáveis, ângulo reto, medidas ao vivo, **quadrados sobre os lados** (generalizar `drawSection` de `ConeFigure.tsx`), malha quadriculada para contar área.

### 5.5 `solido_3d` (espacial: cilindro, esfera, tronco, prismas, pirâmides)
Generalizar `coneScene.ts` + `math3d/revolve.ts` para revolução de qualquer perfil (retângulo → cilindro, semicírculo → esfera, trapézio → tronco) e acrescentar sólidos de faces planas; mesma câmera ortográfica e convenção de aresta oculta tracejada. Inclui planificação (Aula 02 de Cones já prevista na taxonomia).

### 5.6 Menores, mas úteis
- `grade_resultados` (probabilidade/combinatória): grade de casos possíveis × favoráveis, árvore de escolhas.
- ~~`barras`~~ — pronto (§5.3). Fila de widgets pendentes e prioridade: `docs/WIDGETS-PENDENTES.md`.
- `transformacao_plano` (matrizes): malha do plano deformada por uma matriz 2×2 com sliders.
- Hooks: `useArrasto` (ponteiro com captura, como no `GeneratrixWidget`), `useVisitados` (contagem de faixas visitadas → métrica de cobertura, generalizando o `arc`).

### 5.7 Ordem sugerida

1. ~~Coordenador resolve §4.3~~ e ~~plano cartesiano + reta numérica~~ — feitos na fase 2.
2. Agentes de capítulo de funções, conjuntos, inequações, PA/PG e analítica: caminho curto (§3.0), só JSON + teste.
3. Em paralelo, um agente de componentes comuns faz `ciclo_trigonometrico` e `geometria_plana`; outro generaliza `solido_3d`.
