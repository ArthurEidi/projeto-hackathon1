import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";
const base = { referencia: z.boolean().default(true), limite: z.number().positive().default(8), highlight: z.array(Marca).default([]) };
export const Areas = z.discriminatedUnion("modo", [
  z.object({ ...base, modo: z.literal("produto"), a: Expr.default(2), b: Expr.default(0), retirar: z.boolean().default(false) }),
  z.object({ ...base, modo: z.literal("raiz"), A: Expr.default(1) }),
  z.object({ ...base, modo: z.literal("escala"), L: Expr.default(2), k: Expr.default(1), e: Expr.default(0), unidade: z.boolean().default(false) }),
]);
export type Areas = z.output<typeof Areas>;
export const AreasFigura = Areas.superRefine((p, ctx) => { if (temSlider(p)) ctx.addIssue({ code: "custom", message: "retangulo_areas_figura exige números" }); });
export const widgetParams = { retangulo_areas: Areas } as const;
export const figureParams = { retangulo_areas_figura: AreasFigura } as const;
