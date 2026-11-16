// Contrato JSON das aulas. O motor só conhece estes 4 tipos de passo.
import { z } from "zod";
import { CorTraco, Marca, MARCAS_DO_CONE } from "../ui/marcas";
import { figureIds, figureParams, widgetIds, widgetParams } from "../widgets/params";

const Id = z.string().regex(/^[a-z0-9-]+$/, "use apenas a-z, 0-9 e hífen");
const Line = z.string().min(1);

const Figure = z
  .object({
    widget: z.enum(figureIds),
    params: z.record(z.string(), z.unknown()),
  })
  .superRefine((f, ctx) => {
    const r = figureParams[f.widget].safeParse(f.params);
    if (!r.success) ctx.addIssue({ code: "custom", message: `params de ${f.widget}: ${r.error.message}` });
  });

const SliderControl = z.object({
  id: z.string(),
  label: z.string(),
  min: z.number(),
  max: z.number(),
  step: z.number().positive().default(1),
  initial: z.number(),
  unit: z.string().default(""),
  /** Cor do slider: uma marca (h, r, g, c1..c4) ou "ink". */
  color: CorTraco.default("ink"),
});

/** Conclui quando a métrica fica >= gte e/ou <= lte (ex.: levar o slider "a" para -1: lte -1). */
const CompleteWhen = z
  .object({ metric: z.string(), gte: z.number().optional(), lte: z.number().optional() })
  .refine((c) => c.gte !== undefined || c.lte !== undefined, "complete_when precisa de gte ou lte");

// Dúvida da Tati: ela pergunta o que o aluno provavelmente pensaria, e o Paco responde.
// "fim" espera o passo ser concluído (giro completo, vídeo assistido, resposta certa).
const Duvida = z.object({
  quando: z.enum(["inicio", "fim"]).default("fim"),
  pergunta: Line,
  resposta: Line,
});
// No fechamento não há "fim": a dúvida só faz sentido junto da explicação.
const DuvidaInicio = Duvida.extend({ quando: z.literal("inicio").default("inicio") });

const InteractiveCanvasStep = z
  .object({
    id: Id,
    type: z.literal("interactive_canvas"),
    widget: z.enum(widgetIds),
    params: z.record(z.string(), z.unknown()),
    /**
     * Chaves de `params` trocadas enquanto o passo não está concluído (mescla rasa, como `figure` no desafio).
     * Serve para a figura não entregar o que a fala pergunta: ex. `{ "trechos": [] }` esconde a solução
     * na reta até o aluno chegar; ao concluir, valem os `params` completos.
     */
    antes_de_concluir: z.record(z.string(), z.unknown()).optional(),
    controls: z.array(SliderControl).default([]),
    lines: z.object({ intro: Line, done: Line }),
    duvida: Duvida.optional(),
    complete_when: CompleteWhen,
  })
  .superRefine((s, ctx) => {
    const r = widgetParams[s.widget].safeParse(s.params);
    if (!r.success) ctx.addIssue({ code: "custom", message: `params de ${s.widget}: ${r.error.message}` });
    if (s.antes_de_concluir) {
      const desconhecidas = Object.keys(s.antes_de_concluir).filter((k) => !(k in s.params) && !(k in (r.data ?? {})));
      if (desconhecidas.length)
        ctx.addIssue({ code: "custom", message: `antes_de_concluir troca chave que o widget não usa: ${desconhecidas.join(", ")}` });
      const antes = widgetParams[s.widget].safeParse({ ...s.params, ...s.antes_de_concluir });
      if (!antes.success)
        ctx.addIssue({ code: "custom", message: `antes_de_concluir de ${s.widget}: ${antes.error.message}` });
    }
  });

const ManimVideoStep = z.object({
  id: Id,
  type: z.literal("manim_video"),
  src: z.string().startsWith("/videos/"),
  poster: z.string().startsWith("/videos/").optional(),
  scene: z.string().describe("classe da cena em manim/scenes, para rastrear a origem do vídeo"),
  lines: z.object({ intro: Line, done: Line }),
  duvida: Duvida.optional(),
});

const ChallengeOption = z.object({
  id: z.string(),
  label: z.string(),
  correct: z.boolean(),
  feedback: Line,
  figure: z.record(z.string(), z.unknown()).default({}),
}).strict(); // chave desconhecida (ex.: "override") seria descartada em silêncio e a figura da errada ficaria igual à inicial

const MicroChallengeStep = z
  .object({
    id: Id,
    type: z.literal("micro_challenge"),
    figure: Figure,
    prompt: Line,
    options: z.array(ChallengeOption).min(2).max(4),
    lines: z.object({ intro: Line }),
    duvida: Duvida.optional(),
  })
  .superRefine((s, ctx) => {
    if (s.options.filter((o) => o.correct).length !== 1) {
      ctx.addIssue({ code: "custom", message: "micro_challenge precisa de exatamente 1 opção correta" });
    }
    for (const o of s.options) {
      const merged = { ...s.figure.params, ...o.figure };
      const r = figureParams[s.figure.widget].safeParse(merged);
      if (!r.success) ctx.addIssue({ code: "custom", message: `figura da opção ${o.id}: ${r.error.message}` });
    }
  });

const FormulaToken = z.object({
  text: z.string(),
  sup: z.string().optional(),
  /** Marca que a letra acende na figura (a figura precisa aceitar "highlight"). */
  ref: Marca.optional(),
});

const ConceptLockStep = z
  .object({
    id: Id,
    type: z.literal("concept_lock"),
    figure: Figure,
    formula: z.array(FormulaToken).min(1),
    definitions: z.array(z.object({ term: z.string(), text: Line })).max(3),
    lines: z.object({ intro: Line, hint: Line }),
    duvida: DuvidaInicio.optional(),
  })
  .superRefine((s, ctx) => {
    // Tocar numa letra põe a marca dela em "highlight" na figura: precisa ser um estado válido.
    for (const ref of new Set(s.formula.flatMap((t) => (t.ref ? [t.ref] : [])))) {
      const r = figureParams[s.figure.widget].safeParse({ ...s.figure.params, highlight: [ref] });
      if (!r.success) ctx.addIssue({ code: "custom", message: `figura não aceita highlight "${ref}": ${r.error.message}` });
    }
  });

export const Step = z.discriminatedUnion("type", [
  InteractiveCanvasStep,
  ManimVideoStep,
  MicroChallengeStep,
  ConceptLockStep,
]);

// Treino pós-aula: perguntas de múltipla escolha, sem segunda tentativa. Por isso o feedback
// de cada opção errada já precisa dizer qual é a resposta certa.
const QuestaoOpcao = z.object({
  id: z.string(),
  label: z.string().min(1),
  correct: z.boolean(),
  feedback: Line,
});

const QuestaoBase = z.object({
  id: Id,
  prompt: Line,
  /** Fala do Paco nesta pergunta (ex.: uma dica de vocabulário). Sem ela, vale a fala padrão da etapa. */
  fala: Line.optional(),
  figure: Figure.optional(),
  options: z.array(QuestaoOpcao).min(2).max(4),
});

function opcoesValidas(q: { id: string; options: { id: string; correct: boolean }[] }, ctx: z.RefinementCtx) {
  if (q.options.filter((o) => o.correct).length !== 1) {
    ctx.addIssue({ code: "custom", message: `questão ${q.id} precisa de exatamente 1 opção correta` });
  }
  if (new Set(q.options.map((o) => o.id)).size !== q.options.length) {
    ctx.addIssue({ code: "custom", message: `questão ${q.id} tem ids de opção repetidos` });
  }
}

const Questao = QuestaoBase.superRefine(opcoesValidas);

/** De onde veio a questão de vestibular. `urls` guarda as fontes usadas na conferência. */
const Fonte = z.object({
  banca: z.string().min(2),
  ano: z.number().int().min(1990).optional(),
  /** Aplicação ou fase da prova, mostrada depois do ano (ex.: "PPL", "2ª fase"). */
  edicao: z.string().min(1).optional(),
  /** true quando o enunciado, a pergunta ou as alternativas foram adaptados para o app. */
  adaptada: z.boolean(),
  /** O que mudou em relação à prova original (obrigatório se adaptada). */
  adaptacao: z.string().optional(),
  urls: z.array(z.string().url()).min(1),
});

export const ImagemVestibular = z.object({
  src: z.string().regex(/^\/vestibular\/(?!.*(?:\.\.|[\\?#%]))[^/]+(?:\/[^/]+)*$/, "use um arquivo em /vestibular/"),
  alt: z.string().trim().min(1),
}).strict();
const OpcaoVestibular = QuestaoOpcao.extend({ imagem: ImagemVestibular.optional() }).strict();

export const QuestaoVestibular = QuestaoBase.extend({
  fonte: Fonte,
  imagens: z.array(ImagemVestibular).min(1).max(3).optional(),
  options: z.array(OpcaoVestibular).min(2).max(5),
})
  .superRefine(opcoesValidas)
  .superRefine((q, ctx) => {
    if (q.fonte.adaptada && !q.fonte.adaptacao) {
      ctx.addIssue({ code: "custom", message: `questão ${q.id}: descreva a adaptação em fonte.adaptacao` });
    }
  });

/**
 * Treino pós-aula em três etapas, cada uma oferecida com um convite ao fim da anterior:
 * 7 para conferir o mínimo (4 fáceis + 3 médias, nível baixo a médio), 5 desafios para ir
 * um pouco além e 4 questões de vestibulares fáceis/intermediários.
 */
export const TREINO_FACEIS = 4;
export const TREINO_MEDIAS = 3;
export const TREINO_DESAFIOS = 5;
export const TREINO_VESTIBULAR = 4;
const Treino = z.object({
  faceis: z.array(Questao).length(TREINO_FACEIS),
  medias: z.array(Questao).length(TREINO_MEDIAS),
  desafios: z.array(Questao).length(TREINO_DESAFIOS),
  // Pode vir com menos de 4 (até vazio) enquanto as fontes reais não forem conferidas; nunca inventar questão.
  vestibular: z.array(QuestaoVestibular).max(TREINO_VESTIBULAR),
});

/** Significado das marcas c1..c4 nesta aula (h, r, g já vêm do glossário padrão do cone). */
const Glossario = z.partialRecord(Marca, z.object({ nome: z.string().min(1), resumo: Line }));

export const Lesson = z
  .object({
    id: z.string(),
    numero: z.number().int().positive(),
    titulo: z.string(),
    subtitulo: z.string(),
    caminho: z.object({ pilar: z.string(), setor: z.string(), unidade: z.string() }),
    outro: Line,
    glossario: Glossario.optional(),
    steps: z.array(Step).min(1),
    treino: Treino,
  })
  .superRefine((l, ctx) => {
    for (const s of l.steps) {
      if (s.type !== "concept_lock") continue;
      for (const t of s.formula) {
        if (t.ref && !MARCAS_DO_CONE.includes(t.ref) && !l.glossario?.[t.ref]) {
          ctx.addIssue({ code: "custom", message: `fórmula usa a marca "${t.ref}" sem entrada em "glossario"` });
        }
      }
    }
    const ids = Object.values(l.treino)
      .flat()
      .map((q) => q.id);
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: "custom", message: "treino tem ids de questão repetidos" });
  });

const AulaRef = z.object({
  id: Id,
  numero: z.number().int().positive(),
  titulo: z.string(),
  subtitulo: z.string(),
  arquivo: z.string().nullable(),
});
/** Ícone da unidade na trilha (ver src/ui/Icons.tsx). Sem ele, cone. */
export const ICONES = [
  "cone", "reta", "parabola", "curva", "onda", "conjunto", "triangulo", "circulo",
  "cubo", "barras", "matriz", "porcento", "dado", "sequencia", "complexo",
] as const;
const Unidade = z.object({ id: Id, titulo: z.string(), icone: z.enum(ICONES).optional(), aulas: z.array(AulaRef) });
const Setor = z.object({ id: Id, titulo: z.string(), unidades: z.array(Unidade) });
const Pilar = z.object({ id: Id, titulo: z.string(), setores: z.array(Setor) });
export const Taxonomy = z.object({ pilares: z.array(Pilar).length(3) });

export type Step = z.output<typeof Step>;
export type Lesson = z.output<typeof Lesson>;
export type Taxonomy = z.output<typeof Taxonomy>;
export type Icone = (typeof ICONES)[number];
export type InteractiveCanvasStep = z.output<typeof InteractiveCanvasStep>;
export type ManimVideoStep = z.output<typeof ManimVideoStep>;
export type MicroChallengeStep = z.output<typeof MicroChallengeStep>;
export type ConceptLockStep = z.output<typeof ConceptLockStep>;
export type SliderControl = z.output<typeof SliderControl>;
export type CompleteWhen = z.output<typeof CompleteWhen>;
export type Duvida = z.output<typeof Duvida>;
export type Treino = z.output<typeof Treino>;
export type Questao = Omit<z.output<typeof Questao>, "options"> & {
  fonte?: z.output<typeof Fonte>;
  imagens?: z.output<typeof ImagemVestibular>[];
  options: z.output<typeof OpcaoVestibular>[];
};

/** Todas as falas visíveis ao aluno, com o caminho de cada uma, para o lint de texto. */
export function collectLines(lesson: Lesson): { path: string; text: string }[] {
  const out: { path: string; text: string }[] = [{ path: "outro", text: lesson.outro }];
  for (const [k, v] of Object.entries(lesson.glossario ?? {})) {
    if (v) out.push({ path: `glossario.${k}`, text: `${v.nome}: ${v.resumo}` });
  }
  lesson.steps.forEach((s, i) => {
    const p = `steps[${i}:${s.id}]`;
    for (const [k, v] of Object.entries(s.lines)) out.push({ path: `${p}.lines.${k}`, text: v });
    if (s.duvida) {
      out.push({ path: `${p}.duvida.pergunta`, text: s.duvida.pergunta });
      out.push({ path: `${p}.duvida.resposta`, text: s.duvida.resposta });
    }
    if (s.type === "micro_challenge") {
      out.push({ path: `${p}.prompt`, text: s.prompt });
      s.options.forEach((o) => out.push({ path: `${p}.options.${o.id}.feedback`, text: o.feedback }));
    }
    if (s.type === "concept_lock") {
      s.definitions.forEach((d, j) => out.push({ path: `${p}.definitions[${j}]`, text: `${d.term}: ${d.text}` }));
    }
  });
  for (const [nivel, qs] of Object.entries(lesson.treino)) {
    (qs as Questao[]).forEach((q, i) => {
      const p = `treino.${nivel}[${i}:${q.id}]`;
      out.push({ path: `${p}.prompt`, text: q.prompt });
      if (q.fala) out.push({ path: `${p}.fala`, text: q.fala });
      q.options.forEach((o) => out.push({ path: `${p}.options.${o.id}.feedback`, text: o.feedback }));
    });
  }
  return out;
}
