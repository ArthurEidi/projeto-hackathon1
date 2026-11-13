import { dot, type Hit, type Pt } from "../../canvas";
import { criarVista, etiqueta, espessura, fmt, malha, nota, pegador, segMundo, tinta, type Alvo } from "../geo/base";
import { dimensoes, distancias, projetar, type Estado } from "./calc";
import type { Lugar } from "./params";

export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Lugar, ctl: Record<string, number>, s: Estado) {
  const d = dimensoes(p, ctl);
  const alcance = (p.modo === "parabola" ? 6 : Math.max(d.a, d.c) + 1.5) * d.zoom;
  const caixa = { x0: -alcance, x1: alcance, y0: -alcance, y1: alcance };
  const v = criarVista(w, h - 90, caixa, 24);
  malha(ctx, v, caixa, Math.max(1, Math.ceil(d.zoom)));
  segMundo(ctx, v, { x: -alcance, y: 0 }, { x: alcance, y: 0 }, tinta("muted"), 1);
  segMundo(ctx, v, { x: 0, y: -alcance }, { x: 0, y: alcance }, tinta("muted"), 1);
  const alvos: Alvo[] = [];
  if (!d.valido) { nota(ctx, { x: w / 2, y: h - 50 }, "Parâmetros fora do domínio"); return { vista: v, alvos }; }
  const curva = (pp: Lugar, cor: "c3" | "muted") => {
    const dd = dimensoes(pp, ctl);
    if (!dd.valido) return;
    ctx.save(); ctx.beginPath(); ctx.rect(10, 10, w - 20, h - 110); ctx.clip();
    const trilha = (pontos: Pt[]) => {
      ctx.beginPath(); pontos.forEach((q, i) => { const t = v.q(q); if (i === 0) ctx.moveTo(t.x, t.y); else ctx.lineTo(t.x, t.y); });
      ctx.strokeStyle = tinta(cor); ctx.lineWidth = espessura(p.highlight, cor); ctx.setLineDash(cor === "muted" ? [5, 5] : []); ctx.stroke();
    };
    if (pp.modo === "elipse") trilha(Array.from({ length: 241 }, (_, i) => ({ x: dd.a * Math.cos(i * Math.PI / 120), y: dd.b * Math.sin(i * Math.PI / 120) })));
    else if (pp.modo === "parabola") trilha(Array.from({ length: 241 }, (_, i) => { const x = -alcance + 2 * alcance * i / 240; return { x, y: x * x / (4 * dd.p) }; }));
    else for (const sinal of dd.a === 0 ? [1] : [-1, 1]) trilha(Array.from({ length: 241 }, (_, i) => { const y = -alcance + 2 * alcance * i / 240; return { x: sinal * dd.a * Math.sqrt(1 + y * y / (dd.b * dd.b)), y }; }));
    ctx.restore();
  };
  if (p.fantasma) curva({ ...p, ...p.fantasma } as Lugar, "muted");
  if (!p.curva_oculta || s.igualou) curva(p, "c3");
  const q = s.ponto ?? projetar(p, ctl, { x: p.ponto[0], y: p.ponto[1] });
  const ponto = (q0: Pt, rotulo: string, cor: "c1" | "c2" | "c3") => {
    dot(ctx, v.q(q0), 4, tinta(cor)); etiqueta(ctx, hits, { x: v.q(q0).x, y: v.q(q0).y + 22 }, rotulo, cor);
  };
  if (p.focos) {
    if (p.modo === "parabola") {
      ponto({ x: 0, y: d.p }, "F", "c1");
      segMundo(ctx, v, { x: -alcance, y: -d.p }, { x: alcance, y: -d.p }, tinta("c2"), espessura(p.highlight, "c2"));
      segMundo(ctx, v, q, { x: 0, y: d.p }, tinta("c4"));
      segMundo(ctx, v, q, { x: q.x, y: -d.p }, tinta("c4"));
    } else {
      for (const sinal of [-1, 1]) { ponto({ x: sinal * d.c, y: 0 }, sinal < 0 ? "F₁" : "F₂", "c3"); segMundo(ctx, v, q, { x: sinal * d.c, y: 0 }, tinta("c4")); }
    }
  }
  if (p.modo === "elipse") { const topo = v.p(0, d.b); alvos.push({ id: "topo", c: topo, raio: 18 }); dot(ctx, topo, 5, tinta("c2")); }
  if ((s.triangulo || p.mostrar.triangulo || p.mostrar.retangulo) && p.modo !== "parabola") {
    const x = p.modo === "elipse" ? d.c : d.a;
    segMundo(ctx, v, { x: 0, y: 0 }, { x, y: 0 }, tinta(p.modo === "elipse" ? "c3" : "c1"), 4);
    segMundo(ctx, v, { x: 0, y: 0 }, { x: 0, y: d.b }, tinta("c2"), 4);
    segMundo(ctx, v, { x, y: 0 }, { x: 0, y: d.b }, tinta(p.modo === "elipse" ? "c1" : "c3"), 4);
    if (p.modo === "hiperbole") for (const sinal of [-1, 1]) {
      segMundo(ctx, v, { x: sinal * d.a, y: -d.b }, { x: sinal * d.a, y: d.b }, tinta("c2"), 2, [4, 4]);
      segMundo(ctx, v, { x: -d.a, y: sinal * d.b }, { x: d.a, y: sinal * d.b }, tinta("c1"), 2, [4, 4]);
    }
  }
  if (p.modo === "hiperbole" && p.mostrar.assintotas && d.a > 0) for (const sinal of [-1, 1]) segMundo(ctx, v, { x: -alcance * d.a / d.c, y: -sinal * alcance * d.b / d.c }, { x: alcance * d.a / d.c, y: sinal * alcance * d.b / d.c }, tinta("c2"), 2, [5, 5]);
  s.sobre.forEach(q0 => dot(ctx, v.q(q0), 3, tinta("c3")));
  pegador(ctx, v.q(q), "c4"); alvos.unshift({ id: "p", c: v.q(q), raio: 20 });
  const dist = distancias(p, ctl, q);
  etiqueta(ctx, hits, { x: w / 2, y: h - 72 }, `PF₁ = ${fmt(dist.d1)}; ${p.modo === "parabola" ? "Pd" : "PF₂"} = ${fmt(dist.d2)}`, "c4");
  nota(ctx, { x: w / 2, y: h - 47 }, p.modo === "elipse" ? `Soma = ${fmt(dist.valor)}; 2a = ${fmt(2 * d.a)}` : `Diferença = ${fmt(dist.valor)}`, "c4", 14);
  nota(ctx, { x: w / 2, y: h - 22 }, p.modo === "parabola" ? `x² = ${fmt(4 * d.p)}y` : `a = ${fmt(d.a)}; b = ${fmt(d.b)}; c = ${fmt(d.c)}`, "ink", 14);
  return { vista: v, alvos };
}
