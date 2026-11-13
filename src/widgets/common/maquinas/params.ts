// Contrato do widget maquinas_funcao e da figura maquinas_figura. Sem React: usado no Node.
// Modos:
//   flechas   diagrama de conjuntos com setas entre entradas e saídas (unicidade da imagem)
//   maquinas  encadeamento de máquinas afins f(x) = ax + b, troca de ordem e máquina inversa
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";

const Highlight = z.array(Marca).default([]);
const Ligacao = z.tuple([z.number().int().min(0), z.number().int().min(0)]);
const ValorItem = z.union([z.string().max(12), z.number()]);

const Maquina = z.object({
  nome: z.string().max(12).default("f"),
  a: Expr.default(1),
  b: Expr.default(0),
});

const Flechas = z.object({
  modo: z.literal("flechas"),
  entradas: z.array(ValorItem).min(1).max(6).default([1, 2]),
  saidas: z.array(ValorItem).min(1).max(6).default([2, 4]),
  ligacoes: z.array(Ligacao).default([]),
  rotulos: z
    .object({
      entradas: z.string().max(16).default("Entradas"),
      saidas: z.string().max(16).default("Saídas"),
    })
    .default({ entradas: "Entradas", saidas: "Saídas" }),
  highlight: Highlight,
});

const Cadeia = z.object({
  modo: z.literal("maquinas"),
  maquinas: z
    .array(Maquina)
    .min(1)
    .max(3)
    .default([{ nome: "f", a: 1, b: 0 }]),
  entradas: z.array(z.number()).min(1).max(6).default([-1, 1, 2]),
  x: Expr.default(1),
  inversa: z.boolean().default(false),
  ordem_invertida: z.boolean().default(false),
  mostrar: z
    .object({
      inverter: z.boolean().default(true),
      inversa: z.boolean().default(true),
    })
    .default({ inverter: true, inversa: true }),
  highlight: Highlight,
});

export const Maquinas = z.discriminatedUnion("modo", [Flechas, Cadeia]).superRefine((p, ctx) => {
  if (p.modo === "flechas") {
    for (const [a, b] of p.ligacoes) {
      if (a >= p.entradas.length || b >= p.saidas.length) {
        ctx.addIssue({ code: "custom", message: `Ligação [${a}, ${b}] fora dos conjuntos` });
      }
    }
  }
});

export type Maquinas = z.output<typeof Maquinas>;
export type MaquinasDe<M extends Maquinas["modo"]> = Extract<Maquinas, { modo: M }>;

export const MaquinasFigura = Maquinas.superRefine((p, ctx) => {
  if (temSlider(p)) {
    ctx.addIssue({ code: "custom", message: 'maquinas_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = { maquinas_funcao: Maquinas } as const;
export const figureParams = { maquinas_figura: MaquinasFigura } as const;
