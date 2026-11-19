// Contrato do widget divisao_polinomial e da figura divisao_polinomial_figura. Sem React: usado no Node.
// Modos:
//   constante  divisão de P(x) por constante d ≠ 0, com curva original fantasma e quociente P(x)/d
//   chave      divisão longa de P(x) por (x − r) por etapas, exibindo retiradas, Q(x) e resto R = P(r)
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";

const Highlight = z.array(Marca).default([]);
const Coeficientes = z
  .array(z.number().finite())
  .min(2)
  .max(4)
  .refine((c) => c[0] !== 0, "coeficiente líder não pode ser zero")
  .default([1, 0, -1]);

const DivisaoConstante = z.object({
  modo: z.literal("constante"),
  coeficientes: Coeficientes,
  d: Expr.default(1),
  fantasma: z.boolean().default(true),
  /** false: o chip vira "Resto = ?" e as frases não dizem o resto (para `antes_de_concluir`). */
  mostrar_resto: z.boolean().default(true),
  highlight: Highlight,
});

const DivisaoChave = z.object({
  modo: z.literal("chave"),
  coeficientes: Coeficientes,
  r: Expr.default(2),
  etapa: Expr.default(0),
  highlight: Highlight,
});

export const DivisaoPolinomial = z.discriminatedUnion("modo", [DivisaoConstante, DivisaoChave]).superRefine((p, ctx) => {
  if (p.modo === "constante" && typeof p.d === "number" && p.d === 0) {
    ctx.addIssue({ code: "custom", message: "divisor constante não pode ser zero" });
  }
});

export type DivisaoPolinomial = z.output<typeof DivisaoPolinomial>;
export type DivisaoDe<M extends DivisaoPolinomial["modo"]> = Extract<DivisaoPolinomial, { modo: M }>;

export const DivisaoPolinomialFigura = DivisaoPolinomial.superRefine((p, ctx) => {
  if (temSlider(p)) {
    ctx.addIssue({ code: "custom", message: 'divisao_polinomial_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = { divisao_polinomial: DivisaoPolinomial } as const;
export const figureParams = { divisao_polinomial_figura: DivisaoPolinomialFigura } as const;
