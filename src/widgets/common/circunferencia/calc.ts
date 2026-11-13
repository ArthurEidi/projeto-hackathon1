import type { Pt } from "../../canvas";
export function posicao(c: Pt, r: number, q: Pt) { const d = Math.hypot(q.x - c.x, q.y - c.y); return { d, estado: Math.abs(d - r) < 1e-7 ? "sobre" : d < r ? "dentro" : "fora" }; }
export function intersecoes(c: Pt, r: number, k: number): Pt[] {
  const v = r * r - (k - c.y) ** 2;
  if (r <= 0 || v < -1e-9) return [];
  const dx = Math.sqrt(Math.max(0, v));
  return dx < 1e-9 ? [{ x: c.x, y: k }] : [{ x: c.x - dx, y: k }, { x: c.x + dx, y: k }];
}
export function relativas(c: Pt, r: number, c2: Pt, r2: number): string {
  const d = Math.hypot(c.x - c2.x, c.y - c2.y), soma = r + r2, dif = Math.abs(r - r2);
  if (d < 1e-9 && dif < 1e-9) return "coincidentes";
  if (Math.abs(d - soma) < 1e-9) return "tangentes externas";
  if (Math.abs(d - dif) < 1e-9) return "tangentes internas";
  if (d > soma) return "exteriores";
  if (d < dif) return "interiores";
  return "secantes";
}
export interface Visitas { estados: string[]; pontos: Pt[] }
export function visitar(c: Pt, r: number, q: Pt, s: Visitas): Visitas {
  const estado = posicao(c, r, q).estado;
  return { estados: s.estados.includes(estado) ? s.estados : [...s.estados, estado], pontos: estado === "sobre" && !s.pontos.some(a => Math.hypot(q.x - a.x, q.y - a.y) < 1e-6) ? [...s.pontos, q] : s.pontos };
}
