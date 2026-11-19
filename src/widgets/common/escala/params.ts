// Contrato do widget escala_decimal e da figura escala_decimal_figura. Sem React: usado no Node.
// Modos:
//   potencia    quadro de ordens e régua igualmente espaçada para 10ⁿ (N = a·10ⁿ)
//   normalizar  valor fixo N compensado por 10ⁿ, com faixa 1 ≤ a < 10 em destaque
//   ordem       régua logarítmica entre 10ⁿ e 10ⁿ⁺¹ com corte √10 para ordem de grandeza
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr as Valor } from "../expr";
import { temSlider } from "../geo/base";

const Highlight = z.array(Marca).default([]);

const Potencia = z.object({
  modo: z.literal("potencia"),
  a: Valor.default(2),
  n: Valor.default(0),
  n_ref: z.number().int().min(-6).max(6).nullable().default(0),
  faixa_n: z
    .tuple([z.number().int().min(-6).max(6), z.number().int().min(-6).max(6)])
    .refine(([a, b]) => a < b, "faixa_n precisa ter mínimo < máximo")
    .default([-2, 2]),
  mostrar_notacao: z.boolean().default(true),
  mostrar_ordem: z.boolean().default(false),
  highlight: Highlight,
});

const Normalizar = z.object({
  modo: z.literal("normalizar"),
  valor: z.number().positive().default(20),
  n: Valor.default(0),
  n_ref: z.number().int().min(-6).max(6).nullable().default(0),
  highlight: Highlight,
});

const Ordem = z.object({
  modo: z.literal("ordem"),
  a: Valor.default(2),
  n: z.number().int().min(-6).max(6).default(2),
  highlight: Highlight,
});

export const EscalaDecimal = z.discriminatedUnion("modo", [Potencia, Normalizar, Ordem]);
export type EscalaDecimal = z.output<typeof EscalaDecimal>;
export type EscalaDecimalDe<M extends EscalaDecimal["modo"]> = Extract<EscalaDecimal, { modo: M }>;

export const EscalaDecimalFigura = EscalaDecimal.superRefine((p, ctx) => {
  if (temSlider(p)) {
    ctx.addIssue({ code: "custom", message: 'escala_decimal_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = { escala_decimal: EscalaDecimal } as const;
export const figureParams = { escala_decimal_figura: EscalaDecimalFigura } as const;
