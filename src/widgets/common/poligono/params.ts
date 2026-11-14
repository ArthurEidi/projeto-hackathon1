// Contrato do widget geometria_poligono (e da figura geometria_poligono_figura). Sem React: usado no Node.
// Modos:
//   malha      retângulo, paralelogramo, triângulo e trapézio na malha: b, h, área, perímetro; cortar e encaixar; cópia girada; escala k
//   poligono   n-ágono convexo: diagonais de um vértice (n − 2 triângulos), ângulos externos que viram um círculo, quadriláteros articulados
//   regular    n-ágono regular: ângulos central, externo e interno; ladrilho em torno de um ponto
//   isometria  letra F (ou triângulo) na malha: rotação, translação, reflexão e homotetia de razão k (também k < 0)
//   paralelas  r ∥ s cortadas por t: oito ângulos em dois grupos, alternos, correspondentes, colaterais; deslizar; entortar s
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { temSlider } from "../geo/base";
import { Expr } from "../expr";

const Highlight = z.array(Marca).default([]);
const Par = z.tuple([z.number(), z.number()]);

const Malha = z.object({
  modo: z.literal("malha"),
  forma: z.enum(["retangulo", "paralelogramo", "triangulo", "trapezio"]).default("retangulo"),
  /** Base (menor, no trapézio) e altura. */
  b: Expr.default(4),
  h: Expr.default(3),
  /** Trapézio: base maior. */
  B: Expr.default(6),
  /** Deslocamento horizontal do lado de cima (paralelogramo, triângulo, trapézio). */
  inc: Expr.default(0),
  /** Razão de ampliação (retângulo): mostra as k² cópias do original. */
  k: Expr.default(1),
  /** Cortar o triângulo da ponta e encaixar do outro lado (paralelogramo → retângulo). */
  cortar: Expr.default(0),
  /** Segunda cópia girada 180° (triângulo e trapézio formam um paralelogramo). */
  duplicar: Expr.default(0),
  /** Retângulo fantasma de referência (por exemplo 1 × 1, ou o original antes da escala). */
  fantasma: Par.optional(),
  /** Mostra as contas de área (c3) e perímetro (c4). */
  mostrar: z.object({ area: z.boolean().default(true), perimetro: z.boolean().default(true), alturas: z.boolean().default(true) }).default({ area: true, perimetro: true, alturas: true }),
  highlight: Highlight,
});

const Poligono = z.object({
  modo: z.literal("poligono"),
  /** Número de lados (3..12). */
  n: Expr.default(3),
  diagonais: z.boolean().default(true),
  /** Ângulos externos coloridos (c3). */
  externos: z.boolean().default(false),
  /** 0..100: encolhe o polígono até um ponto, juntando os ângulos externos num círculo. */
  encolher: Expr.default(0),
  /** Quadrilátero articulado: 1 paralelogramo, 2 retângulo, 3 losango (no lugar do n-ágono). */
  quadrilatero: Expr.optional(),
  /** Mostra a legenda com a conta no rodapé. */
  legenda: z.boolean().default(true),
  highlight: Highlight,
});

const Regular = z.object({
  modo: z.literal("regular"),
  n: Expr.default(4),
  /** Raio da circunferência circunscrita. */
  R: Expr.default(4),
  /** Mostra os n triângulos centrais (0/1). */
  dividir: Expr.default(0),
  /** Peças em torno de um ponto (teste do ladrilho). */
  ladrilho: z.boolean().default(false),
  /** Controla os ângulos e legenda exibidos. */
  mostrar: z
    .object({
      central: z.boolean().default(true),
      externo: z.boolean().default(true),
      interno: z.boolean().default(true),
      legenda: z.boolean().default(true),
    })
    .default({ central: true, externo: true, interno: true, legenda: true }),
  highlight: Highlight,
});

const Isometria = z.object({
  modo: z.literal("isometria"),
  transformacao: z.enum(["rotacao", "translacao", "reflexao", "homotetia", "painel"]).default("rotacao"),
  figura: z.enum(["F", "triangulo"]).default("F"),
  /** Rotação em graus, em torno da origem O. */
  angulo: Expr.default(0),
  /** Translação. */
  dx: Expr.default(0),
  dy: Expr.default(0),
  /** Reflexão: 0 mostra só a figura, 1 também a imagem no espelho vertical x = espelho. */
  refletir: Expr.default(0),
  espelho: z.number().default(0),
  /** Homotetia de centro O e razão k (aceita negativa). */
  k: Expr.default(1),
  fantasma: z.boolean().default(true),
  highlight: Highlight,
});

const ANGULOS = ["ne", "nw", "sw", "se"] as const;
const Paralelas = z.object({
  modo: z.literal("paralelas"),
  /** Ângulo α entre r e a transversal t, em graus (30..150). */
  alfa: Expr.default(90),
  /** Mostra só o cruzamento com r e o arco de meia-volta. */
  foco: z.boolean().default(false),
  /** Destaque de pares: opostos pelo vértice, correspondentes, alternos internos, colaterais internos. */
  destacar: z.enum(["nenhum", "opostos", "correspondentes", "alternos", "colaterais"]).default("nenhum"),
  /** Gira a reta s por Δ graus em torno do cruzamento com t (tira do paralelismo). */
  desvio: Expr.default(0),
  /** 0..1: cópia do cruzamento deslizando de r até s. */
  deslizar: Expr.default(0),
  chaves: z.array(z.enum(["deslizar"])).default([]),
  /** Transversal a 90° em cinza. */
  fantasma: z.boolean().default(false),
  /** Textos no lugar dos valores: chave `r-ne`, `s-sw`… (cruzamento r ou s; ne, nw, sw, se). */
  rotulos: z.record(z.string(), z.string()).default({}),
  /** Esconde o valor de alguns ângulos. */
  ocultar: z.array(z.string()).default([]),
  /** Mostra a legenda com a conta no rodapé. */
  legenda: z.boolean().default(true),
  highlight: Highlight,
});
export const POSICOES_ANGULO = ANGULOS;

export const Poligonos = z.discriminatedUnion("modo", [Malha, Poligono, Regular, Isometria, Paralelas]);
export type Poligonos = z.output<typeof Poligonos>;
export type PoligonoDe<M extends Poligonos["modo"]> = Extract<Poligonos, { modo: M }>;

export const GeometriaPoligono = Poligonos;
export const GeometriaPoligonoFigura = Poligonos.superRefine((p, ctx) => {
  if (temSlider(p)) ctx.addIssue({ code: "custom", message: 'geometria_poligono_figura não aceita "$slider": use números' });
});

export const widgetParams = { geometria_poligono: GeometriaPoligono } as const;
export const figureParams = { geometria_poligono_figura: GeometriaPoligonoFigura } as const;
