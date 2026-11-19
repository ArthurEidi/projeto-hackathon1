// Contrato do widget grupos_inteiros e da figura grupos_inteiros_figura. Sem React: usado no Node.
// Modos:
//   divisao    n fichas organizadas em grupos completos de d (quociente q e resto r)
//   mmc        duas trilhas de m fichas agrupadas por a e por b, com fatorações
//   fatoracao  n fichas em grupos de d com árvore de fatoração prima ao lado
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";

const Highlight = z.array(Marca).default([]);
const InteiroNaoNegativoExpr = Expr.refine(
  (v) => typeof v !== "number" || (Number.isInteger(v) && v >= 0),
  "precisa ser inteiro ≥ 0",
);
const InteiroPositivoExpr = Expr.refine(
  (v) => typeof v !== "number" || (Number.isInteger(v) && v >= 1),
  "precisa ser inteiro positivo",
);

const Divisao = z.object({
  modo: z.literal("divisao"),
  n: InteiroNaoNegativoExpr.default(6),
  d: InteiroPositivoExpr.default(3),
  referencia_d: z.number().int().min(1).max(12).optional(),
  limite_grupos: z.number().int().min(0).max(30).optional(),
  mostrar_resto: z.boolean().default(true),
  highlight: Highlight,
});

const Mmc = z.object({
  modo: z.literal("mmc"),
  m: InteiroPositivoExpr.default(4),
  a: z.number().int().min(1).max(12).default(4),
  b: z.number().int().min(1).max(12).default(6),
  mostrar_fatores: z.boolean().default(true),
  mostrar_mmc: z.boolean().default(true),
  highlight: Highlight,
});

const Fatoracao = z.object({
  modo: z.literal("fatoracao"),
  n: InteiroNaoNegativoExpr.default(12),
  d: InteiroPositivoExpr.default(3),
  referencia_d: z.number().int().min(1).max(12).optional(),
  mostrar_resto: z.boolean().default(true),
  highlight: Highlight,
});

export const Grupos = z.discriminatedUnion("modo", [Divisao, Mmc, Fatoracao]);

export type Grupos = z.output<typeof Grupos>;
export type GruposDe<M extends Grupos["modo"]> = Extract<Grupos, { modo: M }>;

export const GruposFigura = Grupos.superRefine((p, ctx) => {
  if (temSlider(p)) {
    ctx.addIssue({ code: "custom", message: 'grupos_inteiros_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = { grupos_inteiros: Grupos } as const;
export const figureParams = { grupos_inteiros_figura: GruposFigura } as const;
