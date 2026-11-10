// Contratos dos widgets comuns (plano cartesiano e reta numérica). Sem React: usado no Node.
import { z } from "zod";
import { CorTraco, Marca } from "../../ui/marcas";
import * as barras from "./barras/params";

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
 *   seno         a·sen(b·(x − fase)) + c
 *   cosseno      a·cos(b·(x − fase)) + c
 *   raiz         a·√(x − b) + c
 *   racional     a/(x − b) + c
 *   cubica       a·x³ + b·x² + c·x + d
 *   potencia     a·(x − b)ⁿ + c
 * Qualquer curva aceita `transforma` (a'·f(b'·(x − h)) + k), `dominio` e `furos`.
 */
export const TIPOS_CURVA = ["afim", "quadratica", "exponencial", "logaritmo", "modular", "seno", "cosseno", "raiz", "racional", "cubica", "potencia"] as const;
export type TipoCurva = (typeof TIPOS_CURVA)[number];

export const Curva = z.object({
  tipo: z.enum(TIPOS_CURVA),
  a: Valor.default(1),
  b: Valor.default(0),
  c: Valor.default(0),
  /** Termo independente da cúbica. */
  d: Valor.default(0),
  /** Expoente da potência. */
  n: Valor.default(2),
  /** Deslocamento horizontal de seno/cosseno. */
  fase: Valor.default(0),
  /** g(x) = a·f(b·(x − h)) + k sobre a curva acima (transformações de gráfico). */
  transforma: z
    .object({ a: Valor.default(1), b: Valor.default(1), h: Valor.default(0), k: Valor.default(0) })
    .optional(),
  /** Trecho em que a curva existe (funções por partes); extremos com bolinha aberta/fechada. */
  dominio: z
    .object({
      de: z.number().nullable().default(null),
      ate: z.number().nullable().default(null),
      abreDe: z.boolean().default(false),
      abreAte: z.boolean().default(false),
    })
    .optional(),
  /** x excluídos (bolinha vazia), ex.: (x² − 1)/(x − 1) = x + 1 sem x = 1. */
  furos: z.array(z.number()).default([]),
  cor: CorTraco.default("c3"),
  /** Curva de referência em cinza tracejado (caso neutro, "antes" do contraste). */
  fantasma: z.boolean().default(false),
  /** Rótulo em etiqueta perto da borda direita (ex.: "y = x"). */
  rotulo: z.string().optional(),
});
export type Curva = z.output<typeof Curva>;

const Ponto = z.object({
  /**
   * Índice da curva que o ponto percorre; lista = função por partes (vale a 1ª curva definida no x);
   * null = cursor independente, que anda no eixo x e mostra a altura de cada curva.
   */
  curva: z.union([z.number().int().min(0), z.array(z.number().int().min(0)).min(1), z.null()]).default(0),
  /** Entrada inicial; "$x" faz o ponto seguir um slider (aí ele não é arrastável). */
  x: Valor.default(1),
  arrastavel: z.boolean().default(true),
  /** O arraste encaixa x em múltiplos de passo, para as respostas exatas serem alcançáveis. */
  passo: z.number().positive().default(0.5),
  rastro: z.boolean().default(true),
  coordenadas: z.boolean().default(true),
  cor: CorTraco.default("ink"),
  /** Segundo ponto (y; x), refletido em y = x (função inversa). */
  espelho: z.boolean().default(false),
  /** Retângulo da origem até o ponto, com a área x·y (grandezas inversamente proporcionais). */
  retangulo: z.boolean().default(false),
  corRetangulo: CorTraco.default("c4"),
});

/** Triângulo "anda 1, sobe a": de (x, f(x)) até (x+1, f(x)) e sobe até (x+1, f(x+1)). */
const Triangulo = z.object({
  curva: z.number().int().min(0).default(0),
  x: Valor.default(0),
  cor: CorTraco.default("c1"),
  /** "soma": anda 1, sobe +a (afim). "fator": anda 1, multiplica por ×b (exponencial). */
  modo: z.enum(["soma", "fator"]).default("soma"),
});

const Marcar = z
  .object({
    raizes: z.boolean().default(false),
    interceptoY: z.boolean().default(false),
    /** Cruzamento entre as curvas 0 e 1. */
    encontro: z.boolean().default(false),
    /** Nomes dos quadrantes; no widget, os já visitados pelo ponto ficam tingidos. */
    quadrantes: z.boolean().default(false),
    /** Vértice da parábola (1ª quadrática não fantasma) e eixo de simetria x = xᵥ. */
    vertice: z.boolean().default(false),
    eixo: z.boolean().default(false),
    /** Assíntotas da 1ª curva não fantasma (exponencial, logaritmo, racional). */
    assintota: z.boolean().default(false),
    /** Ângulo entre as retas 0 e 1 no encontro; quadradinho quando m₁·m₂ = −1. */
    angulo: z.boolean().default(false),
    /** Etiqueta da base b da 1ª exponencial/logaritmo, na cor `cores.base`. */
    base: z.boolean().default(false),
    /** Seno/cosseno: seta da fase, chave do período e faixa (linha média, topo, fundo). */
    fase: z.boolean().default(false),
    periodo: z.boolean().default(false),
    faixa: z.boolean().default(false),
  })
  .default({
    raizes: false,
    interceptoY: false,
    encontro: false,
    quadrantes: false,
    vertice: false,
    eixo: false,
    assintota: false,
    angulo: false,
    base: false,
    fase: false,
    periodo: false,
    faixa: false,
  });

const CoresMarcas = z
  .object({
    raiz: CorTraco.default("c4"),
    interceptoY: CorTraco.default("c2"),
    encontro: CorTraco.default("c4"),
    vertice: CorTraco.default("c4"),
    angulo: CorTraco.default("c4"),
    base: CorTraco.default("c2"),
    fase: CorTraco.default("c1"),
    periodo: CorTraco.default("c2"),
  })
  .default({ raiz: "c4", interceptoY: "c2", encontro: "c4", vertice: "c4", angulo: "c4", base: "c2", fase: "c1", periodo: "c2" });

const Guia = z.object({ v: z.number(), rotulo: z.string().optional(), cor: CorTraco.default("muted") });

const PlanoBase = z.object({
  x: Faixa.default([-5, 5]),
  y: Faixa.default([-5, 5]),
  grade: z.boolean().default(true),
  curvas: z.array(Curva).default([]),
  ponto: Ponto.optional(),
  triangulo: Triangulo.optional(),
  marcar: Marcar,
  cores: CoresMarcas,
  /** Assíntotas extras, tracejadas. */
  assintotas: z.object({ x: z.array(z.number()).default([]), y: z.array(z.number()).default([]) }).default({ x: [], y: [] }),
  /** Linhas-guia (não são curvas: não entram em encontro nem raízes). */
  guias: z
    .object({ diagonal: z.boolean().default(false), horizontais: z.array(Guia).default([]), verticais: z.array(Guia).default([]) })
    .default({ diagonal: false, horizontais: [], verticais: [] }),
  /** Marcas em destaque: traços dessa cor engrossam e os demais afinam. */
  highlight: z.array(Marca).default([]),
});

const refsDe = (p: z.output<typeof PlanoBase>): Valor[] => [
  ...p.curvas.flatMap((c) => [c.a, c.b, c.c, c.d, c.n, c.fase, ...(c.transforma ? Object.values(c.transforma) : [])]),
  ...(p.ponto ? [p.ponto.x] : []),
  ...(p.triangulo ? [p.triangulo.x] : []),
];

const checarCurvas = (p: z.output<typeof PlanoBase>, ctx: z.RefinementCtx) => {
  const pc = p.ponto?.curva;
  for (const i of [...(Array.isArray(pc) ? pc : pc === null ? [] : [pc]), p.triangulo?.curva]) {
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
  ...barras.widgetParams,
} as const;

export const figureParams = {
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
  ...barras.figureParams,
} as const;
