// Contrato do widget geometria_circulo (e da figura geometria_circulo_figura). Sem React: usado no Node.
// Modos:
//   arcos    O, A, B e V na circunferência: arco AB, ângulo central, ângulo inscrito (metade do arco), cordas e diâmetro
//   roda     comprimento: roda rolando na pista graduada (C = πd), razão C/d, arco L = α/360 · 2πr, voltas
//   fatias   área: disco em N setores que se abrem num paralelogramo πr × r; setor de ângulo α; coroa circular
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { temSlider } from "../geo/base";
import { Expr } from "../expr";

const Highlight = z.array(Marca).default([]);

const Arcos = z.object({
  modo: z.literal("arcos"),
  /** Ângulo central AÔB em graus (o arco AB mede o mesmo). A fica em `inicio`; B em `inicio + alfa`. */
  alfa: Expr.default(80),
  inicio: z.number().default(0),
  /** Posição de V na circunferência (graus). Sem ela, V fica no meio do arco maior. */
  pos_v: Expr.optional(),
  mostrar: z
    .object({
      arco: z.boolean().default(true),
      central: z.boolean().default(true),
      inscrito: z.boolean().default(false),
      /** Corda AB (c4); com α = 180° ela é o diâmetro. */
      corda: z.boolean().default(false),
      /** Raio OV e os dois triângulos isósceles O A V e O V B. */
      isosceles: z.boolean().default(false),
      /** Escreve as medidas no rodapé. */
      medidas: z.boolean().default(true),
    })
    .default({ arco: true, central: true, inscrito: false, corda: false, isosceles: false, medidas: true }),
  /** Pontos que o aluno arrasta pela circunferência (encaixe em `passo` graus). */
  arrastaveis: z.array(z.enum(["B", "V"])).default([]),
  passo: z.number().positive().default(10),
  highlight: Highlight,
});

const Roda = z.object({
  modo: z.literal("roda"),
  /** giro: roda rolando na pista; razao: C/d com a roda de d = 1 em cinza; arco: L = α/360 · 2πr; voltas: n voltas de uma roda. */
  variante: z.enum(["giro", "razao", "arco", "voltas"]).default("giro"),
  /** Diâmetro da roda. */
  d: Expr.default(1),
  /** giro: quanto a roda girou (graus). */
  giro: Expr.default(0),
  /** arco: raio e ângulo do arco (graus). */
  r: Expr.default(3),
  alfa: Expr.default(360),
  /** voltas: número de voltas e o máximo do slider (largura da pista). */
  voltas: Expr.default(1),
  voltas_max: z.number().positive().default(10),
  /** Unidade escrita depois das medidas (por exemplo "m"). */
  unidade: z.string().default(""),
  highlight: Highlight,
});

const Fatias = z.object({
  modo: z.literal("fatias"),
  variante: z.enum(["disco", "setor", "coroa"]).default("disco"),
  r: Expr.default(4),
  /** disco: número de setores (pares dão encaixe perfeito). */
  N: Expr.default(4),
  /** setor: ângulo em graus. */
  alfa: Expr.default(360),
  /** coroa: raio maior e raio do furo. */
  R: Expr.default(5),
  furo: Expr.default(0),
  highlight: Highlight,
});

export const Circulos = z.discriminatedUnion("modo", [Arcos, Roda, Fatias]);
export type Circulos = z.output<typeof Circulos>;
export type CirculoDe<M extends Circulos["modo"]> = Extract<Circulos, { modo: M }>;

export const GeometriaCirculo = Circulos;
export const GeometriaCirculoFigura = Circulos.superRefine((p, ctx) => {
  if (temSlider(p)) ctx.addIssue({ code: "custom", message: 'geometria_circulo_figura não aceita "$slider": use números' });
});

export const widgetParams = { geometria_circulo: GeometriaCirculo } as const;
export const figureParams = { geometria_circulo_figura: GeometriaCirculoFigura } as const;
