// Contrato do widget solido_3d (geometria espacial). Sem React: usado no Node.
// Modos:
//   revolucao   perfil plano (retângulo, triângulo, trapézio, semicírculo, anel) girando em torno do eixo
//   prisma      base retangular, triangular ou hexagonal; camadas de cubos; diagonal; paredes abertas
//   piramide    altura, apótemas e o triângulo interno; faces abrindo em estrela; 3 pirâmides num prisma
//   cilindro    rótulo desenrolando (2πr × h); cilindro fantasma para comparar
//   esfera      plano de corte a distância d (triângulo R, d, r); esfera no cilindro; esfera ampliada
//   tronco      cone ou pirâmide cortado a h' do vértice; razões k, k², k³; ponta separando; corte meridiano
//   poliedro    tetraedro … icosaedro; placar V, A, F; serrar uma quina; faces soltas
//   espaco      esqueleto do cubo ABCD-EFGH com retas móveis; planos acesos; esquadros
//   vistas      sombras de frente, lado e topo; plano de corte; molde do dado fechando
//   composicao  silo (cilindro + cone), cápsula (cilindro + semiesferas), cavidade (cilindro − cone)
import { z } from "zod";
import { CorTraco, Marca } from "../../../ui/marcas";
import { Expr, usaSlider } from "../expr";

const Highlight = z.array(Marca).default([]);
const Camera = z.object({ yaw: z.number().default(-35), pitch: z.number().default(22) }).default({ yaw: -35, pitch: 22 });
const Base = { camera: Camera, highlight: Highlight };

export const PERFIS = ["retangulo", "triangulo", "trapezio", "semicirculo", "anel"] as const;

const Revolucao = z.object({
  modo: z.literal("revolucao"),
  perfil: z.enum(PERFIS).default("retangulo"),
  /** Botões para trocar de perfil (métrica perfis_girados). */
  perfis: z.array(z.enum(PERFIS)).default([]),
  /** Largura (raio) e altura do perfil; trapézio: r em cima vale `r2`; anel: afastado `d` do eixo. */
  r: Expr.default(3),
  h: Expr.default(4),
  r2: Expr.default(1.5),
  d: Expr.default(1),
  giro: Expr.default(360),
  /** Chave que troca o eixo (gira em torno do outro cateto/lado). */
  chave_eixo: z.boolean().default(false),
  cores: z.object({ r: CorTraco.default("c1"), h: CorTraco.default("c2"), superficie: CorTraco.default("c3") }).default({ r: "c1", h: "c2", superficie: "c3" }),
  ...Base,
});

const Prisma = z.object({
  modo: z.literal("prisma"),
  base: z.enum(["retangulo", "triangulo", "hexagono"]).default("retangulo"),
  /** Retângulo a × b; triângulo retângulo de catetos a, b; hexágono de lado a. */
  a: Expr.default(4),
  b: Expr.default(3),
  h: Expr.default(5),
  camadas: z.boolean().default(false),
  /** 0..1: as paredes abrem numa faixa (planificação lateral) ao lado. */
  abrir: Expr.default(0),
  diagonal: z.boolean().default(false),
  /** Altura de um prisma fantasma (caso neutro de 1 camada). */
  fantasma_h: z.number().optional(),
  cores: z
    .object({ base: CorTraco.default("c1"), h: CorTraco.default("c2"), lateral: CorTraco.default("c3"), diagonal: CorTraco.default("c4") })
    .default({ base: "c1", h: "c2", lateral: "c3", diagonal: "c4" }),
  ...Base,
});

const Piramide = z.object({
  modo: z.literal("piramide"),
  /** Lado da base quadrada. */
  L: Expr.default(6),
  h: Expr.default(4),
  apotemas: z.boolean().default(true),
  /** 0..1: faces abrindo em estrela. */
  abrir: Expr.default(0),
  /** 0..1: prisma de mesma base e altura dividido em 3 pirâmides que se afastam. */
  dividir: Expr.optional(),
  cores: z.object({ h: CorTraco.default("c1"), m: CorTraco.default("c2"), ap: CorTraco.default("c3"), volume: CorTraco.default("c4") }).default({ h: "c1", m: "c2", ap: "c3", volume: "c4" }),
  ...Base,
});

const Cilindro = z.object({
  modo: z.literal("cilindro"),
  r: Expr.default(3),
  h: Expr.default(4),
  /** 0..1: o rótulo (lateral) desenrola num retângulo 2πr × h. */
  desenrolar: Expr.default(0),
  fantasma: z.object({ r: z.number(), h: z.number() }).optional(),
  cores: z.object({ r: CorTraco.default("c1"), h: CorTraco.default("c2"), lateral: CorTraco.default("c3"), volume: CorTraco.default("c4") }).default({ r: "c1", h: "c2", lateral: "c3", volume: "c4" }),
  ...Base,
});

const Esfera = z.object({
  modo: z.literal("esfera"),
  R: Expr.default(5),
  /** Distância do plano de corte ao centro (aceita "$d"). */
  corte: Expr.optional(),
  no_cilindro: z.boolean().default(false),
  /** Segunda esfera de raio k·R ao lado (área ×k², volume ×k³). */
  k: Expr.optional(),
  cores: z.object({ R: CorTraco.default("c1"), d: CorTraco.default("c2"), r: CorTraco.default("c3"), area: CorTraco.default("c4") }).default({ R: "c1", d: "c2", r: "c3", area: "c4" }),
  ...Base,
});

const Tronco = z.object({
  modo: z.literal("tronco"),
  solido: z.enum(["cone", "piramide"]).default("piramide"),
  /** Raio da base (cone) ou meio lado (pirâmide quadrada). */
  R: z.number().positive().default(3),
  H: z.number().positive().default(8),
  /** Distância do corte ao vértice (aceita "$h"). */
  corte: Expr.default(4),
  /** 0..1: a ponta sobe e se separa do tronco. */
  separar: Expr.default(0),
  /** Painel com o corte meridiano do tronco (trapézio e triângulo lateral). */
  meridiano: z.boolean().default(false),
  cores: z.object({ k: CorTraco.default("c1"), secao: CorTraco.default("c2"), ponta: CorTraco.default("c3"), tronco: CorTraco.default("c4") }).default({ k: "c1", secao: "c2", ponta: "c3", tronco: "c4" }),
  ...Base,
});

export const POLIEDROS = ["tetraedro", "piramide_quadrada", "cubo", "octaedro", "prisma_triangular", "dodecaedro", "icosaedro"] as const;

const Poliedro = z.object({
  modo: z.literal("poliedro"),
  solidos: z.array(z.enum(POLIEDROS)).min(1).default(["tetraedro"]),
  /** Índice do sólido mostrado (aceita "$s"); com mais de um, aparecem botões. */
  indice: Expr.default(0),
  /** 0..1: serra uma quina do cubo. */
  serrar: Expr.default(0),
  /** 0..1: faces se soltam (cada aresta vira duas bordas). */
  soltar: Expr.default(0),
  cores: z.object({ V: CorTraco.default("c1"), A: CorTraco.default("c2"), F: CorTraco.default("c3"), euler: CorTraco.default("c4") }).default({ V: "c1", A: "c2", F: "c3", euler: "c4" }),
  ...Base,
});

const P3 = z.tuple([Expr, Expr, Expr]);
const Reta = z.object({
  ponto: P3,
  /** Direção: giro no plano horizontal (graus, a partir de AB) e inclinação (graus acima do piso). */
  angulo: Expr.default(0),
  inclinacao: Expr.default(0),
  cor: CorTraco.default("c1"),
  rotulo: z.string().optional(),
});
const PLANOS = ["piso", "teto", "frente", "tras", "esquerda", "direita"] as const;

const Espaco = z.object({
  modo: z.literal("espaco"),
  L: z.number().positive().default(4),
  retas: z.array(Reta).max(3).default([]),
  planos: z.array(z.enum(PLANOS)).default([]),
  cor_plano: CorTraco.default("c3"),
  rotulos: z.boolean().default(true),
  /** Esquadros de 90° em um ponto, entre duas direções. */
  esquadros: z.array(z.object({ em: z.tuple([z.number(), z.number(), z.number()]), a: z.tuple([z.number(), z.number(), z.number()]), b: z.tuple([z.number(), z.number(), z.number()]) })).default([]),
  cor_esquadro: CorTraco.default("c4"),
  ...Base,
});

const Vistas = z.object({
  modo: z.literal("vistas"),
  solido: z.enum(["cubo", "cilindro", "piramide", "bloco_l", "dado"]).default("cubo"),
  /** Botões de sólido (métrica solidos_vistos). */
  solidos: z.array(z.enum(["cubo", "cilindro", "piramide", "bloco_l"])).default([]),
  sombras: z.boolean().default(true),
  /** Plano de corte (horizontal à altura dada, ou vertical pelo topo). */
  corte: z.object({ tipo: z.enum(["horizontal", "vertical"]).default("horizontal"), altura: Expr.default(0.5) }).optional(),
  /** Chave entre corte horizontal e vertical. */
  chave_corte: z.boolean().default(false),
  /** 0..1: molde do dado fechando (solido: "dado"). */
  fechar: Expr.default(1),
  cores: z.object({ frente: CorTraco.default("c1"), lado: CorTraco.default("c2"), topo: CorTraco.default("c3"), corte: CorTraco.default("c2"), par: CorTraco.default("c4") }).default({ frente: "c1", lado: "c2", topo: "c3", corte: "c2", par: "c4" }),
  ...Base,
});

const Composicao = z.object({
  modo: z.literal("composicao"),
  montagem: z.enum(["silo", "capsula", "cavidade"]).default("silo"),
  r: z.number().positive().default(3),
  h: z.number().positive().default(4),
  /** Altura do cone (silo, cavidade). */
  hc: z.number().positive().default(4),
  /** 0..1: as peças se aproximam até colar (aceita "$j"). */
  juntar: Expr.default(1),
  cores: z.object({ a: CorTraco.default("c1"), b: CorTraco.default("c2"), encontro: CorTraco.default("c3"), total: CorTraco.default("c4") }).default({ a: "c1", b: "c2", encontro: "c3", total: "c4" }),
  ...Base,
});

export const Solido = z.discriminatedUnion("modo", [Revolucao, Prisma, Piramide, Cilindro, Esfera, Tronco, Poliedro, Espaco, Vistas, Composicao]);
export type Solido = z.output<typeof Solido>;
export type SolidoDe<M extends Solido["modo"]> = Extract<Solido, { modo: M }>;

export function exprsDe(p: Solido): Expr[] {
  switch (p.modo) {
    case "revolucao":
      return [p.r, p.h, p.r2, p.d, p.giro];
    case "prisma":
      return [p.a, p.b, p.h, p.abrir];
    case "piramide":
      return [p.L, p.h, p.abrir, ...(p.dividir !== undefined ? [p.dividir] : [])];
    case "cilindro":
      return [p.r, p.h, p.desenrolar];
    case "esfera":
      return [p.R, ...(p.corte !== undefined ? [p.corte] : []), ...(p.k !== undefined ? [p.k] : [])];
    case "tronco":
      return [p.corte, p.separar];
    case "poliedro":
      return [p.indice, p.serrar, p.soltar];
    case "espaco":
      return p.retas.flatMap((r) => [...r.ponto, r.angulo, r.inclinacao]);
    case "vistas":
      return [p.fechar, ...(p.corte ? [p.corte.altura] : [])];
    case "composicao":
      return [p.juntar];
  }
}

export const Solido3d = Solido;
export const Solido3dFigura = Solido.superRefine((p, ctx) => {
  if (exprsDe(p).some(usaSlider)) ctx.addIssue({ code: "custom", message: 'solido_3d_figura não aceita "$slider": use números' });
});

export const widgetParams = { solido_3d: Solido3d } as const;
export const figureParams = { solido_3d_figura: Solido3dFigura } as const;
