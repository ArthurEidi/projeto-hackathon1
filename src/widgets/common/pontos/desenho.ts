import { dot, type Hit, type Pt } from "../../canvas";
import { criarVista, etiqueta, espessura, fmt, malha, nota, pegador, poligonoMundo, segMundo, tinta, tintaClara, type Alvo } from "../geo/base";
import { medidas, quadrado, resolver } from "./calc";
import type { Pontos } from "./params";
export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Pontos, ctl: Record<string, number>, a: Pt, b: Pt, quadrados: boolean, medio: boolean) {
  const m = medidas(a, b), canto = { x: b.x, y: a.y };
  const polys = [quadrado(a, canto, b), quadrado(canto, b, a), quadrado(b, a, canto)];
  const pts = [resolver(p.a, ctl), resolver(p.b, ctl), a, b, ...(quadrados ? polys.flat() : [])];
  const caixa = { x0: Math.min(-5, ...pts.map(q => q.x)) - 1, x1: Math.max(7, ...pts.map(q => q.x)) + 1, y0: Math.min(-3, ...pts.map(q => q.y)) - 1, y1: Math.max(7, ...pts.map(q => q.y)) + 1 };
  const v = criarVista(w, h - 100, caixa, 28);
  malha(ctx, v, caixa, Math.max(1, Math.ceil((caixa.x1 - caixa.x0) / 20)));
  segMundo(ctx, v, { x: caixa.x0, y: 0 }, { x: caixa.x1, y: 0 }, tinta("muted"), 1);
  segMundo(ctx, v, { x: 0, y: caixa.y0 }, { x: 0, y: caixa.y1 }, tinta("muted"), 1);
  if (quadrados) polys.forEach((poly, i) => { const cor = (["c1", "c2", "c3"] as const)[i]; poligonoMundo(ctx, v, poly, tintaClara(cor), tinta(cor), espessura(p.highlight, cor)); });
  if (p.modo === "reta" && m.distancia > 0) {
    const x0 = m.m === null ? a.x : caixa.x0, x1 = m.m === null ? a.x : caixa.x1;
    segMundo(ctx, v, { x: x0, y: m.m === null ? caixa.y0 : m.m * x0 + m.n! }, { x: x1, y: m.m === null ? caixa.y1 : m.m * x1 + m.n! }, tinta("c3"), 2);
  }
  if (p.mostrar.degraus) { segMundo(ctx, v, a, canto, tinta("c1"), espessura(p.highlight, "c1")); segMundo(ctx, v, canto, b, tinta("c2"), espessura(p.highlight, "c2")); }
  segMundo(ctx, v, a, b, tinta("c3"), espessura(p.highlight, "c3"));
  const alvos: Alvo[] = [];
  for (const [id, q] of [["a", a], ["b", b]] as const) {
    pegador(ctx, v.q(q), "c3");
    etiqueta(ctx, hits, { x: v.q(q).x, y: v.q(q).y - 22 }, id.toUpperCase(), "c3");
    if (!p.fixos.includes(id)) alvos.push({ id, c: v.q(q), raio: 20 });
  }
  if (p.terceiro) dot(ctx, v.q(resolver(p.terceiro, ctl)), 5, tinta("c4"));
  if (medio) { dot(ctx, v.q(m.medio), 6, tinta("c4")); etiqueta(ctx, hits, { x: v.q(m.medio).x, y: v.q(m.medio).y + 22 }, "M", "c4"); }
  etiqueta(ctx, hits, { x: w / 4, y: h - 82 }, `Δx = ${fmt(m.dx)}`, "c1");
  etiqueta(ctx, hits, { x: w * 3 / 4, y: h - 82 }, `Δy = ${fmt(m.dy)}`, "c2");
  nota(ctx, { x: w / 2, y: h - 57 }, quadrados ? `${fmt(m.dx ** 2)} + ${fmt(m.dy ** 2)} = ${fmt(m.distancia ** 2)}` : `A(${fmt(a.x)}; ${fmt(a.y)})  B(${fmt(b.x)}; ${fmt(b.y)})`, "ink", 14);
  etiqueta(ctx, hits, { x: w / 2, y: h - 32 }, medio ? `M(${fmt(m.medio.x)}; ${fmt(m.medio.y)})` : `d = ${fmt(m.distancia)}`, medio ? "c4" : "c3");
  if (p.modo === "reta") nota(ctx, { x: w / 2, y: h - 9 }, m.distancia === 0 ? "Pontos coincidentes: reta indeterminada" : m.m === null ? `x = ${fmt(a.x)}; m indefinido` : `m = ${fmt(m.m)}; n = ${fmt(m.n!)}`, "ink", 13);
  return { vista: v, alvos };
}
