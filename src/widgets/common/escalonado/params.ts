// Contrato do widget sistema_escalonado e da figura sistema_escalonado_figura. Sem React: usado no Node.
// Matriz aumentada de um sistema 2×2 ou 3×3 (2 ou 3 linhas, 2 ou 3 incógnitas). Modos:
//   eliminar    aplica Lᵢ ← Lᵢ − k·Lⱼ na linha `alvo`; pivôs em c4, classificação e, com 2 incógnitas,
//               as retas do sistema (a linha original fica fantasma depois da operação)
//   substituir  sistema já escalonado: substituição de baixo para cima, em tabela (sem plano 3D)
import { z } from "zod";
import { CorTraco, Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { temSlider } from "../geo/base";

const Faixa = z.tuple([z.number(), z.number()]).refine(([a, b]) => a < b, "faixa precisa ter mínimo < máximo");

/** Linha da matriz aumentada: coeficientes das incógnitas e, por último, o termo independente. */
const Linha = z.array(Expr).min(3).max(4);

const Mostrar = z
  .object({
    /** Anel c4 no primeiro coeficiente não nulo de cada linha. */
    pivos: z.boolean().default(true),
    /** Rodapé com a leitura: solução única, variável livre ou impossível. */
    classificacao: z.boolean().default(true),
    /** Coordenadas da solução (chip c1 e ponto no plano). */
    solucao: z.boolean().default(true),
    /** Equações escritas por extenso abaixo da matriz. */
    equacoes: z.boolean().default(true),
  })
  .default({ pivos: true, classificacao: true, solucao: true, equacoes: true });

const Base = z.object({
  linhas: z.array(Linha).min(2).max(3),
  /** Nomes das incógnitas; padrão x, y, z. */
  incognitas: z.array(z.string().min(1).max(3)).max(3).optional(),
  /** Cor de cada linha (chip Lᵢ e reta). */
  cores: z.array(CorTraco).max(3).default(["c3", "ink", "ink"]),
  mostrar: Mostrar,
  /** Ponto testado: o rodapé substitui (x; y[; z]) em cada linha e diz se vale. */
  ponto: z.array(z.number()).min(2).max(3).optional(),
  highlight: z.array(Marca).default([]),
});

const Eliminar = Base.extend({
  modo: z.literal("eliminar"),
  operacao: z
    .object({
      alvo: z.number().int().min(0).max(2).default(1),
      base: z.number().int().min(0).max(2).default(0),
      k: Expr.default(0),
    })
    .default({ alvo: 1, base: 0, k: 0 }),
  /** Cor da reta da linha nova (depois da operação). */
  cor_nova: CorTraco.default("c4"),
  /** Janela do plano (só com 2 incógnitas); sem `plano`, só a matriz. */
  plano: z.object({ x: Faixa.default([-2, 5]), y: Faixa.default([-2, 6]) }).optional(),
});

const Substituir = Base.extend({
  modo: z.literal("substituir"),
});

const checar = (p: z.output<typeof Eliminar> | z.output<typeof Substituir>, ctx: z.RefinementCtx) => {
  const n = p.linhas[0].length;
  if (p.linhas.some((l) => l.length !== n)) ctx.addIssue({ code: "custom", message: "todas as linhas precisam ter o mesmo tamanho" });
  if (p.incognitas && p.incognitas.length !== n - 1) {
    ctx.addIssue({ code: "custom", message: `incognitas precisa de ${n - 1} nomes` });
  }
  if (p.ponto && p.ponto.length !== n - 1) ctx.addIssue({ code: "custom", message: `ponto precisa de ${n - 1} coordenadas` });
  if (p.modo === "eliminar") {
    const { alvo, base } = p.operacao;
    if (alvo >= p.linhas.length || base >= p.linhas.length) ctx.addIssue({ code: "custom", message: "operacao: linha inexistente" });
    if (alvo === base) ctx.addIssue({ code: "custom", message: "operacao: alvo e base precisam ser linhas diferentes" });
    if (p.plano && n !== 3) ctx.addIssue({ code: "custom", message: "plano só com 2 incógnitas" });
  } else if (p.linhas.every((l) => l.slice(0, n - 1).every((e) => typeof e === "number"))) {
    // substituir pressupõe a forma escalonada; com slider num coeficiente, o desenho avisa "Escalone antes".
    let ultimo = -1;
    let nula = false;
    const ok = p.linhas.every((l) => {
      const c = l.slice(0, n - 1).findIndex((v) => v !== 0);
      if (c === -1) return (nula = true);
      if (nula || c <= ultimo) return false;
      ultimo = c;
      return true;
    });
    if (!ok) ctx.addIssue({ code: "custom", message: "substituir precisa de sistema escalonado (cada pivô à direita do de cima)" });
  }
};

export const SistemaEscalonado = z.discriminatedUnion("modo", [Eliminar, Substituir]).superRefine(checar);
export type SistemaEscalonado = z.output<typeof SistemaEscalonado>;
export type SistemaDe<M extends SistemaEscalonado["modo"]> = Extract<SistemaEscalonado, { modo: M }>;

export const SistemaEscalonadoFigura = SistemaEscalonado.superRefine((p, ctx) => {
  if (temSlider(p.linhas) || (p.modo === "eliminar" && temSlider(p.operacao))) {
    ctx.addIssue({ code: "custom", message: 'sistema_escalonado_figura não aceita "$slider": use números' });
  }
});

export const widgetParams = { sistema_escalonado: SistemaEscalonado } as const;
export const figureParams = { sistema_escalonado_figura: SistemaEscalonadoFigura } as const;
