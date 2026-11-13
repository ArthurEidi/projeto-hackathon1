// Contrato do widget transformacao_plano e da figura transformacao_figura. Sem React: usado no Node.
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";

const Matriz2x2 = z.tuple([z.tuple([Expr, Expr]), z.tuple([Expr, Expr])]);
const Vetor2 = z.tuple([Expr, Expr]);

export const Transformacao = z.object({
  /** Matriz 2×2 [[a, b], [c, d]] (colunas [a,c] e [b,d]). */
  matriz: Matriz2x2.default([
    [1, 0],
    [0, 1],
  ]),
  /** Segunda matriz opcional aplicada após `matriz` (desenha 3 painéis: v, M₁v, M₂(M₁v)). */
  depois: Matriz2x2.optional(),
  /** Vetor de entrada v = [x, y] (c1) e sua imagem (c3). */
  vetor: Vetor2.optional(),
  /** Vetores extras opcionais de entrada. */
  vetores: z.array(Vetor2).default([]),
  mostrar: z
    .object({
      malha: z.boolean().default(true),
      quadrado: z.boolean().default(true),
      colunas: z.boolean().default(true),
      det: z.boolean().default(true),
      identidade: z.boolean().default(true),
    })
    .default({ malha: true, quadrado: true, colunas: true, det: true, identidade: true }),
  janela: z
    .tuple([z.number(), z.number()])
    .refine(([a, b]) => a < b, "janela precisa ter mínimo < máximo")
    .default([-3, 4]),
  highlight: z.array(Marca).default([]),
});

export type Transformacao = z.output<typeof Transformacao>;

export const TransformacaoFigura = Transformacao.superRefine((p, ctx) => {
  if (temSlider(p)) {
    ctx.addIssue({ code: "custom", message: 'transformacao_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = { transformacao_plano: Transformacao } as const;
export const figureParams = { transformacao_figura: TransformacaoFigura } as const;
