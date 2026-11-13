import type { Pt } from "../../canvas";
import { avaliarExpr } from "../expr";
import { resolver } from "../pontos/calc";
import type { Vetores } from "./params";
export interface Vetor { id: string; cauda: Pt; comp: Pt; ponta: Pt; arrastavel: "cauda" | "ponta" | "nenhum" }
export type Mudancas = Record<string, { cauda?: Pt; comp?: Pt }>;
export const somar = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
export const multiplicar = (a: Pt, b: Pt): Pt => ({ x: a.x * b.x - a.y * b.y, y: a.x * b.y + a.y * b.x });
export function girarI(z: Pt, n: number): Pt {
  const k = ((Math.round(n) % 4) + 4) % 4;
  return [{ x: z.x, y: z.y }, { x: -z.y, y: z.x }, { x: -z.x, y: -z.y }, { x: z.y, y: -z.x }][k];
}
export function resolverVetores(p: Vetores, ctl: Record<string, number>, mud: Mudancas = {}): Vetor[] {
  if (p.modo === "complexo") {
    const comp = girarI(resolver(p.z, ctl), avaliarExpr(p.potencia_i, ctl));
    const z: Vetor = { id: "z", cauda: { x: 0, y: 0 }, comp, ponta: comp, arrastavel: "nenhum" };
    if (!p.w) return [z];
    const w = resolver(p.w, ctl); return [z, { id: "w", cauda: comp, comp: w, ponta: somar(comp, w), arrastavel: "nenhum" }];
  }
  const list: Vetor[] = [];
  for (const v of p.vetores) {
    const preso = v.preso_em ? list.find(a => a.id === v.preso_em) : undefined;
    const cauda = preso?.ponta ?? mud[v.id]?.cauda ?? resolver(v.cauda, ctl);
    const original = mud[v.id]?.comp ?? resolver(v.comp, ctl), k = p.escalar === undefined ? 1 : avaliarExpr(p.escalar, ctl);
    const comp = { x: original.x * k, y: original.y * k };
    list.push({ id: v.id, cauda, comp, ponta: somar(cauda, comp), arrastavel: preso && v.arrastavel === "cauda" ? "nenhum" : v.arrastavel });
  }
  return list;
}
export function metricas(p: Vetores, ctl: Record<string, number>, vetores: Vetor[], origens: number, modulo: boolean): Record<string, number> {
  const z = vetores[0].comp;
  const m: Record<string, number> = { origens_vistas: origens, modulo_ligado: Number(modulo), modulo: Math.hypot(z.x, z.y), re: z.x, im: z.y, giros: p.modo === "complexo" ? Math.abs(Math.round(avaliarExpr(p.potencia_i, ctl))) : 0 };
  for (const v of vetores) m[`${v.id}_comprimento`] = Math.hypot(v.comp.x, v.comp.y);
  return m;
}
