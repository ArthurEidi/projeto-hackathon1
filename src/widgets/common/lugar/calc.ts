import type { Pt } from "../../canvas";
import { avaliarExpr } from "../expr";
import { arred } from "../geo/base";
import type { Lugar } from "./params";

export function dimensoes(p: Lugar, controls: Record<string, number> = {}) {
  const v = (n: number | string) => avaliarExpr(n, controls);
  const foco = p.modo === "parabola" ? v(p.p) : 0;
  const c = p.modo === "parabola" ? 0 : v(p.c);
  const a = p.modo === "parabola" ? 0 : p.modo === "hiperbole" && p.diferenca !== undefined ? v(p.diferenca) / 2 : v(p.a);
  const b = Math.sqrt(Math.max(0, p.modo === "elipse" ? a * a - c * c : c * c - a * a));
  const valido = p.modo === "parabola" ? foco !== 0 : p.modo === "elipse" ? a > 0 && c >= 0 && c < a : c > 0 && a >= 0 && a < c;
  return { p: foco, a, b, c, valido, zoom: Math.max(0.2, v(p.zoom)) };
}
export function projetar(p: Lugar, ctl: Record<string, number>, q: Pt): Pt {
  const d = dimensoes(p, ctl);
  const x = arred(q.x, p.passo), y = arred(q.y, p.passo);
  if (p.prender_no_eixo) return { x: 0, y };
  if (!p.prender_na_curva || !d.valido) return { x, y };
  if (p.modo === "parabola") return { x, y: x * x / (4 * d.p) };
  if (p.modo === "elipse") {
    const t = arred(Math.atan2(q.y / d.b, q.x / d.a), Math.PI / 24);
    return { x: d.a * Math.cos(t), y: d.b * Math.sin(t) };
  }
  return { x: d.a === 0 ? 0 : (q.x < 0 ? -1 : 1) * d.a * Math.sqrt(1 + y * y / (d.b * d.b)), y };
}
export function distancias(p: Lugar, ctl: Record<string, number>, q: Pt) {
  const d = dimensoes(p, ctl);
  const d1 = p.modo === "parabola" ? Math.hypot(q.x, q.y - d.p) : Math.hypot(q.x + d.c, q.y);
  const d2 = p.modo === "parabola" ? Math.abs(q.y + d.p) : Math.hypot(q.x - d.c, q.y);
  const valor = p.modo === "elipse" ? d1 + d2 : Math.abs(d1 - d2);
  const alvo = p.modo === "parabola" ? 0 : 2 * d.a;
  return { d1, d2, valor, sobre: d.valido && Math.abs(valor - alvo) < 1e-5 };
}
export interface Estado { ponto: Pt | null; vistos: Pt[]; sobre: Pt[]; topo: boolean; triangulo: boolean; igualou: boolean }
export const inicial = (): Estado => ({ ponto: null, vistos: [], sobre: [], topo: false, triangulo: false, igualou: false });
export function visitar(p: Lugar, ctl: Record<string, number>, s: Estado, q: Pt): Estado {
  const ponto = projetar(p, ctl, q), d = dimensoes(p, ctl);
  const incluir = (lista: Pt[]) => lista.some(v => Math.hypot(v.x - ponto.x, v.y - ponto.y) < 0.2) ? lista : [...lista, ponto];
  const topo = p.modo === "elipse" && Math.hypot(ponto.x, ponto.y - d.b) < 0.25;
  return { ...s, ponto, vistos: incluir(s.vistos), sobre: distancias(p, ctl, ponto).sobre ? incluir(s.sobre) : s.sobre, topo: s.topo || topo, triangulo: s.triangulo || topo };
}
export function metricas(p: Lugar, ctl: Record<string, number>, s: Estado): Record<string, number> {
  const q = s.ponto;
  return { pontos_vistos: s.vistos.length, pontos_sobre: s.sobre.length, topo_tocado: Number(s.topo), triangulo_ligado: Number(s.triangulo), igualou: Number(s.igualou), vertice_achado: Number(p.modo === "parabola" && q !== null && Math.hypot(q.x, q.y) < 1e-6 && distancias(p, ctl, q).sobre) };
}
