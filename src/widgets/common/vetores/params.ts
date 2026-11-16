import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";
const Par = z.tuple([Expr, Expr]);
const base = { passo: z.number().positive().default(1), highlight: z.array(Marca).default([]), mostrar: z.object({ conjugado: z.boolean().default(false), modulo: z.boolean().default(false), soma: z.boolean().default(false) }).default({ conjugado: false, modulo: false, soma: false }) };
const V = z.object({ id: z.string().regex(/^[a-z][a-z0-9_]*$/), cauda: Par.default([0, 0]), comp: Par, arrastavel: z.enum(["cauda", "ponta", "nenhum"]).default("nenhum"), preso_em: z.string().optional() });
export const Vetores = z.discriminatedUnion("modo", [
  // componentes_de (16/11): id do vetor cujos x/y (e módulo) aparecem nos chips; sem ele, o primeiro vetor, como antes.
  z.object({ ...base, modo: z.literal("vetores"), vetores: z.array(V).min(1).max(4), escalar: Expr.optional(), mostrar_soma: z.boolean().default(false), componentes_de: z.string().optional() }),
  z.object({ ...base, modo: z.literal("complexo"), z: Par.default([1, 0]), w: Par.optional(), potencia_i: Expr.default(0) }),
]);
export type Vetores = z.output<typeof Vetores>;
export const VetoresParams = z.preprocess(p => typeof p === "object" && p !== null ? { modo: "vetores", ...p } : p, Vetores).superRefine((p, ctx) => {
  if (p.modo !== "vetores") return;
  const ids = new Set<string>();
  for (const v of p.vetores) { if (ids.has(v.id) || (v.preso_em && !ids.has(v.preso_em))) ctx.addIssue({ code: "custom", message: "Ids únicos; preso_em deve citar um vetor anterior" }); ids.add(v.id); }
  if (p.componentes_de !== undefined && !ids.has(p.componentes_de)) ctx.addIssue({ code: "custom", message: "componentes_de deve citar o id de um vetor" });
});
export const VetoresFigura = VetoresParams.superRefine((p, ctx) => { if (temSlider(p)) ctx.addIssue({ code: "custom", message: "vetores_figura exige números" }); });
export const widgetParams = { vetores_no_plano: VetoresParams } as const;
export const figureParams = { vetores_figura: VetoresFigura } as const;
