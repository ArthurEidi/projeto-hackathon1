import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";
const ponto = z.tuple([Expr, Expr]);
const base = { a: ponto.default([1, 2]), b: ponto.default([5, 2]), terceiro: ponto.optional(), fixos: z.array(z.enum(["a", "b"])).default(["a"]), passo: z.number().positive().default(1), prender_na_reta: z.boolean().default(false), rotulos: z.tuple([z.string(), z.string()]).default(["A", "B"]), mostrar: z.object({ quadrados: z.boolean().default(false), medio: z.boolean().default(false), degraus: z.boolean().default(true), distancia: z.boolean().default(true) }).default({ quadrados: false, medio: false, degraus: true, distancia: true }), highlight: z.array(Marca).default([]) };
export const Pontos = z.discriminatedUnion("modo", [z.object({ ...base, modo: z.literal("segmento") }), z.object({ ...base, modo: z.literal("reta") })]).prefault({ modo: "segmento" });
// modo é opcional nos roteiros anteriores.
export const PontosParams = z.preprocess(p => typeof p === "object" && p !== null ? { modo: "segmento", ...p } : p, Pontos);
export type Pontos = z.output<typeof Pontos>;
export const PontosFigura = PontosParams.superRefine((p, ctx) => { if (temSlider(p)) ctx.addIssue({ code: "custom", message: "pontos_figura exige números" }); });
export const widgetParams = { pontos_no_plano: PontosParams } as const;
export const figureParams = { pontos_figura: PontosFigura } as const;
