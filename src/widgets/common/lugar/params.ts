import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";

const base = {
  ponto: z.tuple([z.number(), z.number()]).default([2, 2]),
  passo: z.number().positive().default(0.5),
  prender_na_curva: z.boolean().default(false),
  prender_no_eixo: z.boolean().default(false),
  curva_oculta: z.boolean().default(false),
  focos: z.boolean().default(true),
  zoom: Expr.default(1),
  fantasma: z.object({ p: z.number().optional(), a: z.number().optional(), c: z.number().optional() }).optional(),
  mostrar: z.object({ retangulo: z.boolean().default(false), assintotas: z.boolean().default(false), triangulo: z.boolean().default(false), dimensoes: z.boolean().default(true), equacao: z.boolean().default(true) }).default({ retangulo: false, assintotas: false, triangulo: false, dimensoes: true, equacao: true }),
  highlight: z.array(Marca).default([]),
};
export const Lugar = z.discriminatedUnion("modo", [
  z.object({ ...base, modo: z.literal("parabola"), p: Expr.default(1) }),
  z.object({ ...base, modo: z.literal("elipse"), a: Expr.default(5), c: Expr.default(3) }),
  z.object({ ...base, modo: z.literal("hiperbole"), c: Expr.default(5), a: Expr.default(3), diferenca: Expr.optional() }),
]);
export type Lugar = z.output<typeof Lugar>;
export const LugarFigura = Lugar.superRefine((p, ctx) => {
  if (temSlider(p)) ctx.addIssue({ code: "custom", message: "lugar_figura exige valores numéricos" });
});
export const widgetParams = { lugar_geometrico: Lugar } as const;
export const figureParams = { lugar_figura: LugarFigura } as const;
