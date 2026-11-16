// Contrato do widget geometria_triangulo (e da figura geometria_triangulo_figura). Sem React: usado no Node.
// Modos:
//   pitagoras    triângulo retângulo com quadrados nos 3 lados; prova (quadradão com 4 triângulos); quadrado e diagonal
//   razoes       triângulo retângulo na malha: θ, escala k, CO/CA/HIP e o painel sen, cos, tg
//   metricas     relações métricas: hipotenusa a, projeções m e n, altura h, b² = a·m
//   cossenos     b, c e o ângulo A entre eles: a² = b² + c² − 2bc·cos A
//   senos        triângulo inscrito na circunferência de raio R: a / sen A = 2R
//   angulos      vértice arrastável, paralela à base, soma 180°, ângulo externo
//   desigualdade base fixa e dois braços articulados: as pontas se alcançam?
//   congruencia  chaves LLL, LAL, ALA, AAA numa cópia do triângulo
//   notaveis     quadrado cortado (45-45-90), equilátero cortado (30-60-90), mediatriz com compasso
//   semelhanca   paralela à base (k), Tales com 3 paralelas, sombras de bastão e poste
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { temSlider } from "../geo/base";
import { Expr } from "../expr";

const Highlight = z.array(Marca).default([]);
const Par = z.tuple([z.number(), z.number()]);

const Pitagoras = z.object({
  modo: z.literal("pitagoras"),
  /** Catetos: b na horizontal e c na vertical. */
  b: Expr.default(3),
  c: Expr.default(4),
  quadrados: z.boolean().default(true),
  /** Quadriculado dentro dos quadrados (conta as unidades de área). */
  malha: z.boolean().default(true),
  /** Prova visual: quadradão de lado b + c com 4 triângulos; `deslizado` troca a sobra a² por b² + c². */
  prova: z.boolean().default(false),
  deslizado: z.boolean().default(false),
  /** Quadrado de lado b cortado pela diagonal d = b√2 (catetos iguais). */
  diagonal: z.boolean().default(false),
  /** Chaves visíveis: deslizar (prova) e diagonal. */
  chaves: z.array(z.enum(["deslizar", "diagonal"])).default([]),
  /** Esconde rótulos específicos dos lados. */
  ocultar: z.array(z.enum(["a", "b", "c"])).default([]),
  highlight: Highlight,
});

const Razoes = z.object({
  modo: z.literal("razoes"),
  /** Ângulo agudo θ em graus. */
  angulo: Expr.default(30),
  /** Hipotenusa da escala 1 e escala k (HIP = hip · k). */
  hip: Expr.default(5),
  k: Expr.default(1),
  /** Maior k que o slider alcança: fixa a janela para o triângulo crescer sem a vista mudar. */
  k_max: z.number().positive().default(3),
  /**
   * Janela com k em slider (16/11): "k_max" (padrão, como antes) fixa a vista no maior k, e o triângulo
   * cresce dentro dela; "k" enquadra o triângulo atual, que ocupa a área em qualquer k, e a malha guarda
   * a unidade da escala 1: o crescimento aparece nos quadradinhos por cateto (3,5 → 7,1 → 10,6 em 45°).
   */
  janela: z.enum(["k_max", "k"]).default("k_max"),
  malha: z.boolean().default(true),
  painel: z.boolean().default(true),
  /** Triângulo de referência em cinza (θ em graus, escala 1). */
  fantasma: z.number().min(1).max(89).optional(),
  /** Esconde chips específicos (co, ca, hip, ang). */
  ocultar: z.array(z.enum(["co", "ca", "hip", "ang"])).default([]),
  highlight: Highlight,
});

const Metricas = z.object({
  modo: z.literal("metricas"),
  /** Hipotenusa e projeção m do cateto b (n = a − m). */
  a: Expr.default(10),
  m: Expr.default(5),
  /** Alternativa: catetos b e c, apoiado num cateto (apoio 0) ou na hipotenusa (apoio 1). */
  catetos: Par.optional(),
  apoio: Expr.default(1),
  /** Painel b² × a·m (quadrado e retângulo de mesma área). */
  comparar: z.boolean().default(false),
  /** Esconde rótulos específicos (a, b, c, h, m, n). */
  ocultar: z.array(z.enum(["a", "b", "c", "h", "m", "n"])).default([]),
  highlight: Highlight,
});

const Cossenos = z.object({
  modo: z.literal("cossenos"),
  b: Expr.default(3),
  c: Expr.default(4),
  /** Ângulo A entre b e c, em graus. */
  angulo: Expr.default(90),
  /** Triângulo com A = 90° em cinza tracejado. */
  fantasma: z.boolean().default(true),
  /** Controla exibição do valor do lado a e da legenda com a conta. */
  mostrar: z.object({ a: z.boolean().default(true), legenda: z.boolean().default(true) }).default({ a: true, legenda: true }),
  highlight: Highlight,
});

const Senos = z.object({
  modo: z.literal("senos"),
  R: Expr.default(5),
  angulo: Expr.default(30),
  /** Desloca o vértice A pelo arco (graus), mantendo o lado a. */
  posicao: Expr.default(0),
  highlight: Highlight,
});

const Angulos = z.object({
  modo: z.literal("angulos"),
  /** Vértice do topo (base de A(−3, 0) a B(3, 0)); padrão: equilátero. */
  vertice: Par.default([0, 3 * Math.sqrt(3)]),
  passo: z.number().positive().default(0.25),
  arrastavel: z.boolean().default(true),
  /** Em vez do vértice, ângulos da base α e β (aceitam "$id"). */
  alfa: Expr.optional(),
  beta: Expr.optional(),
  paralela: z.boolean().default(true),
  externo: z.boolean().default(false),
  fantasma: z.boolean().default(true),
  /** Chave "fechar 3 barras": os 3 ângulos lado a lado formam a meia-volta. */
  chaves: z.array(z.enum(["fechar"])).default([]),
  fechado: z.boolean().default(false),
  /** Esconde o valor de ângulos internos (alfa, beta, gama). */
  ocultar: z.array(z.enum(["alfa", "beta", "gama"])).default([]),
  highlight: Highlight,
});

const Desigualdade = z.object({
  modo: z.literal("desigualdade"),
  a: Expr.default(8),
  b: Expr.default(5),
  c: Expr.default(6),
  highlight: Highlight,
});

const Congruencia = z.object({
  modo: z.literal("congruencia"),
  lados: z.tuple([z.number(), z.number(), z.number()]).default([4, 5, 6]),
  chaves: z.array(z.enum(["LLL", "LAL", "ALA", "AAA"])).default(["LLL", "LAL", "ALA", "AAA"]),
  /** Chave já ligada (figura). */
  ligada: z.enum(["LLL", "LAL", "ALA", "AAA"]).optional(),
  highlight: Highlight,
});

const Notaveis = z.object({
  modo: z.literal("notaveis"),
  figura: z.enum(["quadrado", "equilatero", "mediatriz"]).default("quadrado"),
  /** Lado L (quadrado, equilátero). */
  L: Expr.default(1),
  /** Equilátero: 0 inteiro, 1 cortado pela altura. */
  cortar: Expr.default(0),
  /** Quadrado: mostra a diagonal. */
  diagonal: z.boolean().default(true),
  /** Fantasma do caso L = 1. */
  fantasma: z.boolean().default(false),
  /** Mediatriz: distância AB e raio do compasso. */
  ab: z.number().positive().default(6),
  raio: Expr.default(2),
  /** Mostra a legenda com a conta no rodapé. */
  legenda: z.boolean().default(true),
  highlight: Highlight,
});

const Semelhanca = z.object({
  modo: z.literal("semelhanca"),
  variante: z.enum(["paralela", "tales", "sombras"]).default("paralela"),
  /** paralela: lados do triângulo (a base é o primeiro). */
  lados: z.tuple([z.number(), z.number(), z.number()]).default([6, 8, 10]),
  /** paralela: razão k da paralela (1 = a própria base). */
  k: Expr.default(1),
  /** paralela: giro da paralela, em graus (tira do paralelismo). */
  giro: Expr.default(0),
  /** tales: comprimentos totais nas duas transversais e posição h da paralela do meio na esquerda. */
  esq: z.number().positive().default(6),
  dir: z.number().positive().default(9),
  corte: Expr.default(2),
  /** sombras: bastão [altura, sombra] e sombra do poste. */
  bastao: Par.default([2, 3]),
  sombra_poste: z.number().positive().default(9),
  sobrepor: z.boolean().default(false),
  chaves: z.array(z.enum(["sobrepor"])).default([]),
  fantasma: z.boolean().default(true),
  /** tales: segmento mostrado como "x"; legenda no rodapé. */
  incognita: z.enum(["e1", "e2", "d1", "d2"]).optional(),
  legenda: z.boolean().default(true),
  highlight: Highlight,
});

export const Triangulo = z.discriminatedUnion("modo", [Pitagoras, Razoes, Metricas, Cossenos, Senos, Angulos, Desigualdade, Congruencia, Notaveis, Semelhanca]);
export type Triangulo = z.output<typeof Triangulo>;
export type TrianguloDe<M extends Triangulo["modo"]> = Extract<Triangulo, { modo: M }>;

export const GeometriaTriangulo = Triangulo;
export const GeometriaTrianguloFigura = Triangulo.superRefine((p, ctx) => {
  if (temSlider(p)) ctx.addIssue({ code: "custom", message: 'geometria_triangulo_figura não aceita "$slider": use números' });
});

export const widgetParams = { geometria_triangulo: GeometriaTriangulo } as const;
export const figureParams = { geometria_triangulo_figura: GeometriaTrianguloFigura } as const;
