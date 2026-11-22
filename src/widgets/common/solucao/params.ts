// Contratos do widget de soluções (Química, 21/11).
//   solucao_concentracao (interativo): massa de soluto e volume ligados a sliders ("$massa", "$volume")
//                          ou fixos; béquer com nível, cor e partículas proporcionais.
//   solucao_figura       (estático): de 1 a 4 béqueres lado a lado, para desafio, fechamento e treino.
// Marcas: c1 = massa de soluto m, c2 = volume V, c3 = concentração C.
import { z } from "zod";
import { Marca } from "../../../ui/marcas";
import { Expr } from "../expr";

const Soluto = z
  .object({
    /** Nome mostrado no painel (ex.: "sulfato de cobre"). */
    nome: z.string().min(1).default("soluto"),
    /** Fórmula química, com dígitos subscritos Unicode (ex.: "CuSO₄"). */
    formula: z.string().optional(),
    massa_molar: z.number().positive().optional(),
    /** Solubilidade na temperatura da aula (g/L). Sem ela, tudo dissolve. */
    solubilidade: z.number().positive().optional(),
  })
  .default({ nome: "soluto" });

const Mostrar = z
  .object({
    particulas: z.boolean().default(true),
    /** Quantidade de matéria (mol) e concentração em mol/L (exige massa molar). */
    mol: z.boolean().default(false),
    /** Valor da concentração no painel e no medidor. */
    concentracao: z.boolean().default(true),
  })
  .default({ particulas: true, mol: false, concentracao: true });

export const SolucaoParams = z
  .object({
    massa: Expr,
    volume: Expr,
    soluto: Soluto,
    /** Volume máximo do béquer (mL), para a escala da graduação. */
    capacidade: z.number().positive().default(1000),
    /** Massa que cada partícula desenhada representa (g). */
    por_particula: z.number().positive().default(1),
    /** Solução de partida, desenhada ao lado em tom claro (diluição: compara antes e depois). */
    referencia: z.object({ massa: z.number().min(0), volume: z.number().positive(), rotulo: z.string().default("antes") }).optional(),
    /** Concentração alvo (g/L), marcada no medidor. */
    alvo: z.number().positive().optional(),
    mostrar: Mostrar,
    highlight: z.array(Marca).default([]),
  })
  .superRefine((p, ctx) => {
    if (p.mostrar.mol && !p.soluto.massa_molar) ctx.addIssue({ code: "custom", message: "mostrar.mol exige soluto.massa_molar" });
  });
export type SolucaoParams = z.output<typeof SolucaoParams>;

const Bequer = z.object({
  massa: z.number().min(0),
  volume: z.number().positive(),
  rotulo: z.string().optional(),
});

export const SolucaoFigura = z
  .object({
    bequeres: z.array(Bequer).min(1).max(4),
    soluto: Soluto,
    capacidade: z.number().positive().default(1000),
    por_particula: z.number().positive().default(1),
    mostrar: Mostrar,
    highlight: z.array(Marca).default([]),
  })
  .superRefine((p, ctx) => {
    if (p.mostrar.mol && !p.soluto.massa_molar) ctx.addIssue({ code: "custom", message: "mostrar.mol exige soluto.massa_molar" });
    for (const b of p.bequeres)
      if (b.volume > p.capacidade) ctx.addIssue({ code: "custom", message: `béquer de ${b.volume} mL passa da capacidade` });
  });
export type SolucaoFigura = z.output<typeof SolucaoFigura>;

export const widgetParams = { solucao_concentracao: SolucaoParams } as const;
export const figureParams = { solucao_figura: SolucaoFigura } as const;
