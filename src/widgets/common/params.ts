// Contratos dos widgets comuns (plano cartesiano e reta numérica). Sem React: usado no Node.
import { z } from "zod";
import { CorTraco, Marca } from "../../ui/marcas";

/** Número fixo ou referência a um slider do passo: "$a" vale o slider de id "a". */
export const Valor = z.union([z.number(), z.string().regex(/^\$[a-z0-9_]+$/, 'use um número ou "$id" de um slider')]);
export type Valor = z.infer<typeof Valor>;

const Faixa = z.tuple([z.number(), z.number()]).refine(([a, b]) => a < b, "faixa precisa ter mínimo < máximo");

/**
 * Famílias de curva (sem eval de expressão):
 *   afim         a·x + b
 *   quadratica   a·x² + b·x + c
 *   exponencial  a·bˣ + c        (b > 0)
 *   logaritmo    a·log_b(x) + c  (x > 0, b > 0, b ≠ 1)
 *   modular      a·|x − b| + c
 *   seno         a·sen(b·x) + c
 *   cosseno      a·cos(b·x) + c
 */
export const TIPOS_CURVA = ["afim", "quadratica", "exponencial", "logaritmo", "modular", "seno", "cosseno"] as const;
export type TipoCurva = (typeof TIPOS_CURVA)[number];

export const Curva = z.object({
  tipo: z.enum(TIPOS_CURVA),
  a: Valor.default(1),
  b: Valor.default(0),
  c: Valor.default(0),
  cor: CorTraco.default("c3"),
  /** Curva de referência em cinza tracejado (caso neutro, "antes" do contraste). */
  fantasma: z.boolean().default(false),
  /** Rótulo em etiqueta perto da borda direita (ex.: "y = x"). */
  rotulo: z.string().optional(),
});
export type Curva = z.output<typeof Curva>;

const Ponto = z.object({
  /** Índice da curva que o ponto percorre. */
  curva: z.number().int().min(0).default(0),
  /** Entrada inicial; "$x" faz o ponto seguir um slider (aí ele não é arrastável). */
  x: Valor.default(1),
  arrastavel: z.boolean().default(true),
  /** O arraste encaixa x em múltiplos de passo, para as respostas exatas serem alcançáveis. */
  passo: z.number().positive().default(0.5),
  rastro: z.boolean().default(true),
  coordenadas: z.boolean().default(true),
  cor: CorTraco.default("ink"),
});

/** Triângulo "anda 1, sobe a": de (x, f(x)) até (x+1, f(x)) e sobe até (x+1, f(x+1)). */
const Triangulo = z.object({
  curva: z.number().int().min(0).default(0),
  x: Valor.default(0),
  cor: CorTraco.default("c1"),
});

const Marcar = z
  .object({
    raizes: z.boolean().default(false),
    interceptoY: z.boolean().default(false),
    /** Cruzamento entre as curvas 0 e 1. */
    encontro: z.boolean().default(false),
    /** Nomes dos quadrantes; no widget, os já visitados pelo ponto ficam tingidos. */
    quadrantes: z.boolean().default(false),
  })
  .default({ raizes: false, interceptoY: false, encontro: false, quadrantes: false });

const CoresMarcas = z
  .object({ raiz: CorTraco.default("c4"), interceptoY: CorTraco.default("c2"), encontro: CorTraco.default("c4") })
  .default({ raiz: "c4", interceptoY: "c2", encontro: "c4" });

const PlanoBase = z.object({
  x: Faixa.default([-5, 5]),
  y: Faixa.default([-5, 5]),
  grade: z.boolean().default(true),
  curvas: z.array(Curva).default([]),
  ponto: Ponto.optional(),
  triangulo: Triangulo.optional(),
  marcar: Marcar,
  cores: CoresMarcas,
  /** Marcas em destaque: traços dessa cor engrossam e os demais afinam. */
  highlight: z.array(Marca).default([]),
});

const refsDe = (p: z.output<typeof PlanoBase>): Valor[] => [
  ...p.curvas.flatMap((c) => [c.a, c.b, c.c]),
  ...(p.ponto ? [p.ponto.x] : []),
  ...(p.triangulo ? [p.triangulo.x] : []),
];

const checarCurvas = (p: z.output<typeof PlanoBase>, ctx: z.RefinementCtx) => {
  for (const i of [p.ponto?.curva, p.triangulo?.curva]) {
    if (i !== undefined && i >= p.curvas.length) ctx.addIssue({ code: "custom", message: `curva ${i} não existe` });
  }
  if (p.marcar.encontro && p.curvas.length < 2) ctx.addIssue({ code: "custom", message: "encontro precisa de 2 curvas" });
};

export const PlanoCartesiano = PlanoBase.superRefine(checarCurvas);
export type PlanoCartesiano = z.output<typeof PlanoCartesiano>;

/** Figura estática: mesmos campos, mas só números (não há sliders). */
export const PlanoFigura = PlanoBase.superRefine(checarCurvas).superRefine((p, ctx) => {
  if (refsDe(p).some((v) => typeof v === "string")) {
    ctx.addIssue({ code: "custom", message: 'plano_figura não aceita "$slider": use números' });
  }
});

// ---------- Reta numérica ----------

const Trecho = z.object({
  /** null = infinito. */
  de: z.number().nullable(),
  ate: z.number().nullable(),
  /** Extremo aberto (bolinha vazia). */
  abreDe: z.boolean().default(false),
  abreAte: z.boolean().default(false),
  cor: CorTraco.default("c1"),
  rotulo: z.string().optional(),
});
export type Trecho = z.output<typeof Trecho>;

const PontoFixo = z.object({
  x: z.number(),
  cor: CorTraco.default("ink"),
  rotulo: z.string().optional(),
  aberto: z.boolean().default(false),
});

const PontoMovel = z.object({
  x: Valor.default(0),
  arrastavel: z.boolean().default(true),
  passo: z.number().positive().default(0.5),
  cor: CorTraco.default("ink"),
  /** Mostra a distância até o zero (módulo) como chave colorida. */
  distanciaZero: z.boolean().default(false),
  corDistancia: CorTraco.default("c2"),
});

export const RetaNumerica = z.object({
  intervalo: Faixa.default([-5, 5]),
  /** Espaçamento das marcas numeradas. */
  marcas: z.number().positive().default(1),
  trechos: z.array(Trecho).default([]),
  pontos: z.array(PontoFixo).default([]),
  ponto: PontoMovel.optional(),
  highlight: z.array(Marca).default([]),
});
export type RetaNumerica = z.output<typeof RetaNumerica>;

export const RetaFigura = RetaNumerica.superRefine((p, ctx) => {
  if (p.ponto && typeof p.ponto.x === "string") {
    ctx.addIssue({ code: "custom", message: 'reta_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = {
  plano_cartesiano: PlanoCartesiano,
  reta_numerica: RetaNumerica,
} as const;

export const figureParams = {
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
} as const;
