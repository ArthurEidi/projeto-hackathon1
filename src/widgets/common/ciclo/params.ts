// Contrato do widget ciclo_trigonometrico (e da figura ciclo_trigonometrico_figura). Sem React: usado no Node.
// Circunferência de raio 1 com o ponto P(cos θ; sen θ). Tudo é opcional e se liga por `mostrar`:
//   seno / cosseno / tangente / secante   projeções e a reta tangente em x = 1
//   fita        o arco desenrolado em radianos (marcas a cada raio)
//   voltas      contador de voltas completas
//   simetricos  os quatro pontos simétricos do 1º quadrante
//   pitagorica  triângulo de hipotenusa 1 com a barra sen²θ + cos²θ = 1
//   soma        giros α e β, com as barras sen(α + β) × sen α + sen β (e os blocos que explicam a soma)
//   alvo        reta y = k (ou x = k) com os pontos de encontro marcáveis
//   arco        arco solução aceso, com extremos abertos ou fechados
//   grafico     curva y = sen x (ou cos x) traçada ao lado pelo ponto
import { z } from "zod";
import { CorTraco, Marca } from "../../../ui/marcas";
import { temSlider } from "../geo/base";
import { Expr } from "../expr";

const Mostrar = z
  .object({
    seno: z.boolean().default(true),
    cosseno: z.boolean().default(true),
    tangente: z.boolean().default(false),
    secante: z.boolean().default(false),
    fita: z.boolean().default(false),
    voltas: z.boolean().default(false),
    simetricos: z.boolean().default(false),
    pitagorica: z.boolean().default(false),
    /** Eixos e quatro marcos 0, π/2, π, 3π/2. */
    marcos: z.boolean().default(true),
  })
  .default({ seno: true, cosseno: true, tangente: false, secante: false, fita: false, voltas: false, simetricos: false, pitagorica: false, marcos: true });

const Cores = z
  .object({
    seno: CorTraco.default("c1"),
    cosseno: CorTraco.default("c2"),
    tangente: CorTraco.default("c3"),
    arco: CorTraco.default("c4"),
    angulo: CorTraco.default("c4"),
    alvo: CorTraco.default("c2"),
    solucao: CorTraco.default("c4"),
    fita: CorTraco.default("c2"),
    simetricos: CorTraco.default("c4"),
    alfa: CorTraco.default("c1"),
    beta: CorTraco.default("c2"),
    soma: CorTraco.default("c3"),
  })
  .default({ seno: "c1", cosseno: "c2", tangente: "c3", arco: "c4", angulo: "c4", alvo: "c2", solucao: "c4", fita: "c2", simetricos: "c4", alfa: "c1", beta: "c2", soma: "c3" });

export const Ciclo = z.object({
  /** Ângulo em graus (pode passar de 360 e ser negativo). */
  angulo: Expr.default(0),
  /** Alternativa em radianos (vale no lugar de `angulo`). */
  rad: Expr.optional(),
  /** Como o mostrador escreve o ângulo. */
  unidade: z.enum(["graus", "radianos", "ambos"]).default("ambos"),
  /** O aluno arrasta P na circunferência; o ângulo encaixa em múltiplos de `passo` (graus). */
  arrastavel: z.boolean().default(false),
  passo: z.number().positive().default(15),
  mostrar: Mostrar,
  /** Giros α e β: o ângulo passa a valer α + β. */
  soma: z.object({ alfa: Expr, beta: Expr }).optional(),
  /** Com a soma: mostra os blocos sen α cos β e cos α sen β (aceita slider 0/1). */
  blocos: Expr.default(0),
  /** Reta y = k (seno) ou x = k (cosseno): onde encontra a circunferência. */
  alvo: z.object({ seno: Expr.optional(), cosseno: Expr.optional() }).optional(),
  /** Pontos de encontro já marcados (figura): 0 e 1. */
  marcadas: z.array(z.number().int().min(0).max(1)).default([]),
  /** Arco solução (graus); extremos abertos (bolinha vazia) ou fechados. */
  arco: z.object({ de: z.number(), ate: z.number(), abreDe: z.boolean().default(false), abreAte: z.boolean().default(false) }).optional(),
  /** Gráfico ao lado traçado até o ângulo atual. */
  grafico: z.enum(["sen", "cos"]).optional(),
  /** Pontos de referência em cinza: graus. */
  fantasma: z.union([z.number(), z.array(z.number())]).optional(),
  /** Marcas fantasma nos arcos de 1, 2, 3 radianos (lista de radianos). */
  marcos_rad: z.array(z.number()).default([]),
  /** Quadrante 1..4 com |sen| fixo em `seno_fixo` (o ângulo é calculado). */
  quadrante: Expr.optional(),
  seno_fixo: z.number().min(0).max(1).default(0.6),
  cores: Cores,
  highlight: z.array(Marca).default([]),
});
export type Ciclo = z.output<typeof Ciclo>;

export const CicloTrigonometrico = Ciclo;
export const CicloTrigonometricoFigura = Ciclo.superRefine((p, ctx) => {
  if (temSlider(p)) ctx.addIssue({ code: "custom", message: 'ciclo_trigonometrico_figura não aceita "$slider": use números' });
});

export const widgetParams = { ciclo_trigonometrico: CicloTrigonometrico } as const;
export const figureParams = { ciclo_trigonometrico_figura: CicloTrigonometricoFigura } as const;
