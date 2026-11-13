import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";
const base = { highlight: z.array(Marca).default([]) };
const Ligacao = z.tuple([z.number().int().min(0), z.number().int().min(0)]);
const Maquina = z.object({ nome: z.string().max(12).default("f"), a: Expr.default(1), b: Expr.default(0) });
export const Maquinas = z.discriminatedUnion("modo", [
  z.object({ ...base, modo: z.literal("flechas"), entradas: z.array(z.union([z.string().max(12), z.number()])).min(1).max(6).default([1, 2]), saidas: z.array(z.union([z.string().max(12), z.number()])).min(1).max(6).default([2, 4]), ligacoes: z.array(Ligacao).default([]) }),
  z.object({ ...base, modo: z.literal("maquinas"), maquinas: z.array(Maquina).min(1).max(3).default([{ nome: "id", a: 1, b: 0 }]), entradas: z.array(z.number()).min(1).max(6).default([-1, 1, 2]), x: Expr.default(1), inversa: z.boolean().default(false), ordem_invertida: z.boolean().default(false) }),
]).superRefine((p, ctx) => { if (p.modo === "flechas" && p.ligacoes.some(([a, b]) => a >= p.entradas.length || b >= p.saidas.length)) ctx.addIssue({ code: "custom", message: "Ligação fora dos conjuntos" }); });
export type Maquinas = z.output<typeof Maquinas>;
export const MaquinasFigura = Maquinas.superRefine((p, ctx) => { if (temSlider(p)) ctx.addIssue({ code: "custom", message: "maquinas_figura exige números" }); });
export const widgetParams = { maquinas_funcao: Maquinas } as const;
export const figureParams = { maquinas_figura: MaquinasFigura } as const;
