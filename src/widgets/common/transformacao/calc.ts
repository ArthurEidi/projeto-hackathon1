// Matemática pura de transformações lineares 2×2 e métricas. Sem React.
import type { Pt } from "../../canvas";
import { avaliarExpr } from "../expr";
import { quase } from "../geo/base";
import type { Transformacao } from "./params";

export type Mat2 = [[number, number], [number, number]];

export function resolverMatriz(
  m: readonly [readonly [number | string, number | string], readonly [number | string, number | string]],
  ctl: Record<string, number>,
): Mat2 {
  return [
    [avaliarExpr(m[0][0], ctl), avaliarExpr(m[0][1], ctl)],
    [avaliarExpr(m[1][0], ctl), avaliarExpr(m[1][1], ctl)],
  ];
}

export function resolverVetor(
  v: readonly [number | string, number | string],
  ctl: Record<string, number>,
): Pt {
  return { x: avaliarExpr(v[0], ctl), y: avaliarExpr(v[1], ctl) };
}

export function det2(m: Mat2): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function aplicar(m: Mat2, v: Pt): Pt {
  return {
    x: m[0][0] * v.x + m[0][1] * v.y,
    y: m[1][0] * v.x + m[1][1] * v.y,
  };
}

/** Produto B * A (aplica A primeiro, depois B). */
export function multiplicar(B: Mat2, A: Mat2): Mat2 {
  return [
    [B[0][0] * A[0][0] + B[0][1] * A[1][0], B[0][0] * A[0][1] + B[0][1] * A[1][1]],
    [B[1][0] * A[0][0] + B[1][1] * A[1][0], B[1][0] * A[0][1] + B[1][1] * A[1][1]],
  ];
}

export function orientacao(d: number): number {
  if (quase(d, 0)) return 0;
  return d > 0 ? 1 : -1;
}

export function metricasTransformacao(p: Transformacao, ctl: Record<string, number>): Record<string, number> {
  const A = resolverMatriz(p.matriz, ctl);
  const efetiva = p.depois ? multiplicar(resolverMatriz(p.depois, ctl), A) : A;
  const d = det2(efetiva);
  const v = p.vetor ? resolverVetor(p.vetor, ctl) : { x: 0, y: 0 };
  return {
    det: d,
    area: Math.abs(d),
    orientacao: orientacao(d),
    v_x: v.x,
    v_y: v.y,
  };
}
