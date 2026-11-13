import { dot, type Hit, type Pt } from "../../canvas";
import { avaliarExpr } from "../expr";
import { criarVista, etiqueta, espessura, fmt, malha, nota, pegador, segMundo, tinta, type Alvo } from "../geo/base";
import { resolver } from "../pontos/calc";
import { intersecoes, posicao, relativas } from "./calc";
import type { Circunferencia } from "./params";
export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Circunferencia, ctl: Record<string, number>, c: Pt, q: Pt, rastro: Pt[]) {
  const r = avaliarExpr(p.raio, ctl), alcance = Math.max(7, Math.abs(c.x) + r + 1, Math.abs(c.y) + r + 1);
  const caixa = { x0: -alcance, x1: alcance, y0: -alcance, y1: alcance };
  const v = criarVista(w, h - 85, caixa, 25), alvos: Alvo[] = [];
  malha(ctx, v, caixa, Math.max(1, Math.ceil(alcance / 8)));
  if (!(r > 0) || !Number.isFinite(r)) { nota(ctx, { x: w / 2, y: h - 30 }, "O raio precisa ser positivo"); return { vista: v, alvos }; }
  segMundo(ctx, v, { x: -alcance, y: 0 }, { x: alcance, y: 0 }, tinta("muted"), 1);
  segMundo(ctx, v, { x: 0, y: -alcance }, { x: 0, y: alcance }, tinta("muted"), 1);
  const circulo = (o: Pt, raio: number, cor: "c3" | "c2") => { if (!(raio > 0)) return; const t = v.q(o); ctx.beginPath(); ctx.arc(t.x, t.y, raio * v.k, 0, 2 * Math.PI); ctx.strokeStyle = tinta(cor); ctx.lineWidth = espessura(p.highlight, cor); ctx.stroke(); };
  if (!p.curva_oculta) circulo(c, r, "c3");
  const pos = posicao(c, r, q);
  segMundo(ctx, v, c, q, tinta("c4"), espessura(p.highlight, "c4"));
  segMundo(ctx, v, c, { x: c.x + r, y: c.y }, tinta("c2"), espessura(p.highlight, "c2"));
  rastro.forEach(t => dot(ctx, v.q(t), 4, tinta("c3")));
  pegador(ctx, v.q(c), "c1"); pegador(ctx, v.q(q), pos.estado === "sobre" ? "c3" : pos.estado === "dentro" ? "c1" : "c4");
  if (p.centro_arrastavel) alvos.push({ id: "centro", c: v.q(c), raio: 18 });
  if (p.ponto_arrastavel) alvos.push({ id: "ponto", c: v.q(q), raio: 18 });
  if (p.rotulos) { etiqueta(ctx, hits, { x: v.q(c).x, y: v.q(c).y - 23 }, "C", "c1"); etiqueta(ctx, hits, { x: v.q(q).x, y: v.q(q).y + 23 }, "P", "c4"); }
  let adicional = "";
  if (p.reta_y !== undefined) {
    const k = avaliarExpr(p.reta_y, ctl), pontos = intersecoes(c, r, k);
    segMundo(ctx, v, { x: -alcance, y: k }, { x: alcance, y: k }, tinta("c4"), 2);
    pontos.forEach(t => dot(ctx, v.q(t), 6, tinta("c3")));
    adicional = `${pontos.length === 2 ? "Secante" : pontos.length === 1 ? "Tangente" : "Exterior"}: ${pontos.length} ponto(s)`;
  }
  if (p.segunda) { const cc = resolver(p.segunda.centro, ctl), rr = avaliarExpr(p.segunda.raio, ctl); circulo(cc, rr, "c2"); adicional = relativas(c, r, cc, rr); }
  if (p.rotulos) {
    etiqueta(ctx, hits, { x: w / 2, y: h - 65 }, `d = ${fmt(pos.d)}; r = ${fmt(r)}: ${pos.estado}`, "c4");
    nota(ctx, { x: w / 2, y: h - 39 }, `(x − (${fmt(c.x)}))² + (y − (${fmt(c.y)}))² = ${fmt(r * r)}`, "ink", 13);
    if (adicional) nota(ctx, { x: w / 2, y: h - 14 }, adicional, "c3", 14);
  }
  return { vista: v, alvos };
}
