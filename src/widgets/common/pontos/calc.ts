import type { Pt } from "../../canvas";
import { avaliarExpr } from "../expr";
import { arred } from "../geo/base";
import type { Pontos } from "./params";
export const resolver = (q: [number | string, number | string], ctl: Record<string, number>): Pt => ({ x: avaliarExpr(q[0], ctl), y: avaliarExpr(q[1], ctl) });
export function medidas(a: Pt, b: Pt) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const m = dx === 0 ? null : dy / dx;
  return { dx, dy, distancia: Math.hypot(dx, dy), medio: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, m, n: m === null ? null : a.y - m * a.x };
}
export function mover(p: Pontos, ctl: Record<string, number>, q: Pt): Pt {
  const a = resolver(p.a, ctl), b = resolver(p.b, ctl);
  const { dx, dy } = medidas(a, b);
  if (p.prender_na_reta) {
    if (dx === 0) return { x: a.x, y: arred(q.y, p.passo) };
    const x = arred(q.x, p.passo);
    return { x, y: a.y + (x - a.x) * dy / dx };
  }
  return { x: arred(q.x, p.passo), y: arred(q.y, p.passo) };
}
export function quadrado(a: Pt, b: Pt, longe: Pt): Pt[] {
  const dx = b.x - a.x, dy = b.y - a.y;
  const sinal = (-dy * (longe.x - a.x) + dx * (longe.y - a.y)) > 0 ? -1 : 1;
  return [a, b, { x: b.x - sinal * dy, y: b.y + sinal * dx }, { x: a.x - sinal * dy, y: a.y + sinal * dx }];
}
