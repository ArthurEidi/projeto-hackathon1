// Contratos do widget de lançamento oblíquo (Física, 21/11).
//   lancamento_obliquo  (interativo): ângulo e velocidade ligados a sliders ("$angulo", "$v0") ou fixos;
//                        botão Lançar anima a bola; trajetórias anteriores ficam de referência.
//   lancamento_figura   (estático): até 4 trajetórias com números, para desafio, fechamento e treino.
// Marcas (cores fixas em toda a aula): c1 = alcance A, c2 = altura máxima H, c3 = ângulo θ, c4 = velocidade v0.
import { z } from "zod";
import { CorTraco, Marca } from "../../../ui/marcas";
import { Expr } from "../expr";
import { G_PADRAO } from "./calc";

const Mostrar = z
  .object({
    /** Vetor v0 e componentes vx, vy na saída. */
    vetores: z.boolean().default(true),
    altura: z.boolean().default(true),
    alcance: z.boolean().default(true),
    tempo: z.boolean().default(true),
    /** Fórmulas ao lado dos valores no painel de resultados. */
    formulas: z.boolean().default(false),
  })
  .default({ vetores: true, altura: true, alcance: true, tempo: true, formulas: false });

const Alvo = z.object({
  /** Distância do alvo ao ponto de lançamento (m). */
  x: z.number().positive(),
  /** Meia largura do alvo (m): acerta quem cair a até essa distância do centro. */
  tolerancia: z.number().positive().default(0.5),
});

export const LancamentoParams = z.object({
  angulo: Expr.default(45),
  v0: Expr.default(20),
  g: z.number().positive().default(G_PADRAO),
  altura: z.number().min(0).max(100).default(0),
  alvo: Alvo.optional(),
  mostrar: Mostrar,
  /** Quantas trajetórias anteriores ficam desenhadas em cinza para comparar (0 desliga). */
  rastros: z.number().int().min(0).max(5).default(3),
  highlight: z.array(Marca).default([]),
});
export type LancamentoParams = z.output<typeof LancamentoParams>;

const Trajetoria = z.object({
  angulo: z.number().min(0).max(90),
  v0: z.number().positive(),
  cor: CorTraco.default("c1"),
  rotulo: z.string().optional(),
  tracejada: z.boolean().default(false),
});

export const LancamentoFigura = z.object({
  trajetorias: z.array(Trajetoria).min(1).max(4),
  g: z.number().positive().default(G_PADRAO),
  altura: z.number().min(0).max(100).default(0),
  alvo: Alvo.optional(),
  mostrar: Mostrar,
  highlight: z.array(Marca).default([]),
});
export type LancamentoFigura = z.output<typeof LancamentoFigura>;

export const widgetParams = { lancamento_obliquo: LancamentoParams } as const;
export const figureParams = { lancamento_figura: LancamentoFigura } as const;
