// Desenho do widget geometria_poligono, um desenhista por modo. A matemática vem de calc.ts.
import { palette } from "../../../ui/palette";
import { dot, type Hit, type Pt } from "../../canvas";
import type { CorTraco } from "../../../ui/marcas";
import {
  anguloMarcado,
  arco,
  criarVista,
  espessura,
  etiqueta,
  fmt,
  malha as desenhaMalha,
  nota,
  notaEsq,
  poligonoMundo,
  polar,
  retoNoMundo,
  segMundo,
  setor,
  tinta,
  tintaClara,
  tintaEscura,
  type Caixa,
  type Vista,
} from "../geo/base";
import {
  isometria,
  malha,
  paralelas,
  pecasLadrilho,
  poligono,
  regular,
  type Ctl,
  type EstadoPol,
} from "./calc";
import type { Poligonos, PoligonoDe } from "./params";
import { filaDeRotulos } from "../geo/filaRotulos";

type G = CanvasRenderingContext2D;
export interface GeoPol {
  vista: Vista;
}

const ALT_LINHA = 19;
const banda = (n: number) => n * ALT_LINHA + 12;
function rodape(ctx: G, w: number, h: number, linhas: { t: string; c?: Parameters<typeof nota>[3] }[]) {
  linhas.forEach((l, i) => nota(ctx, { x: w / 2, y: h - banda(linhas.length) + 14 + i * ALT_LINHA }, l.t, l.c ?? "ink", 14));
}
const caixaDe = (pts: Pt[], folga = 0.6): Caixa => ({
  x0: Math.min(...pts.map((q) => q.x)) - folga,
  x1: Math.max(...pts.map((q) => q.x)) + folga,
  y0: Math.min(...pts.map((q) => q.y)) - folga,
  y1: Math.max(...pts.map((q) => q.y)) + folga,
});
const dirGraus = (de: Pt, para: Pt) => (Math.atan2(para.y - de.y, para.x - de.x) * 180) / Math.PI;
const mod360 = (a: number) => ((a % 360) + 360) % 360;

export function aspectoPoligono(p: Poligonos): number {
  switch (p.modo) {
    case "malha":
      return 0.78;
    case "poligono":
      return p.quadrilatero !== undefined ? 0.8 : 0.95;
    case "regular":
      return 0.98;
    case "isometria":
      return p.transformacao === "painel" ? 0.42 : 0.95;
    case "paralelas":
      return 0.70;
  }
}

export function desenharPoligono(ctx: G, w: number, h: number, hits: Hit[], p: Poligonos, c: Ctl, e: EstadoPol): GeoPol {
  switch (p.modo) {
    case "malha":
      return dMalha(ctx, w, h, hits, p, c);
    case "poligono":
      return dPoligono(ctx, w, h, hits, p, c);
    case "regular":
      return dRegular(ctx, w, h, hits, p, c);
    case "isometria":
      return dIsometria(ctx, w, h, hits, p, c);
    case "paralelas":
      return dParalelas(ctx, w, h, hits, p, c, e);
  }
}

// ---------- Malha ----------

function dMalha(ctx: G, w: number, h: number, hits: Hit[], p: PoligonoDe<"malha">, cl: Ctl): GeoPol {
  const g = malha(p, cl);
  const hl = p.highlight;
  const todos: Pt[] = [...g.pts, ...(g.copia ?? []), ...(g.triMovido ?? [])];
  const fant: Pt[] | null = p.fantasma ? [{ x: 0, y: 0 }, { x: p.fantasma[0], y: 0 }, { x: p.fantasma[0], y: p.fantasma[1] }, { x: 0, y: p.fantasma[1] }] : p.forma === "retangulo" && g.k !== 1 ? [{ x: 0, y: 0 }, { x: g.b, y: 0 }, { x: g.b, y: g.h }, { x: 0, y: g.h }] : null;
  if (fant) todos.push(...fant);
  const bx = caixaDe(todos, 0.5);
  const cx: Caixa = { x0: Math.min(bx.x0, -0.8), x1: bx.x1, y0: Math.min(bx.y0, -0.9), y1: bx.y1 + 1.0 };
  const v = criarVista(w, h - banda(1), cx, 14);
  desenhaMalha(ctx, v, { x0: Math.ceil(cx.x0), x1: Math.floor(cx.x1), y0: Math.ceil(cx.y0), y1: Math.floor(cx.y1) }, 1);
  if (fant) poligonoMundo(ctx, v, fant, undefined, palette.muted, 2, [6, 5]);
  const cor = p.forma === "retangulo" ? "c3" : "c3";
  if (g.cortar && g.triCortado && g.triMovido) {
    poligonoMundo(ctx, v, g.pts, tintaClara(cor), undefined);
    poligonoMundo(ctx, v, g.triCortado, undefined, tinta("c2"), 2, [5, 4]);
    poligonoMundo(ctx, v, g.triMovido, tintaClara("c2"), tinta("c2"), 3);
    const rect = [{ x: g.inc, y: 0 }, { x: g.b + g.inc, y: 0 }, { x: g.b + g.inc, y: g.h }, { x: g.inc, y: g.h }];
    poligonoMundo(ctx, v, rect, undefined, p.mostrar.perimetro ? tinta("c4") : palette.ink, espessura(hl, "c4", 4));
  } else {
    poligonoMundo(ctx, v, g.pts, tintaClara(cor), p.mostrar.perimetro ? tinta("c4") : palette.ink, espessura(hl, "c4", 4));
  }
  if (g.copia) poligonoMundo(ctx, v, g.copia, tintaClara("c1"), tinta("c1"), 3);
  if (p.forma === "retangulo" && g.k >= 2 && Number.isInteger(g.k)) {
    for (let i = 1; i < g.k; i++) {
      segMundo(ctx, v, { x: i * g.b, y: 0 }, { x: i * g.b, y: g.h * g.k }, palette.ink2, 1.5, [4, 4]);
      segMundo(ctx, v, { x: 0, y: i * g.h }, { x: g.b * g.k, y: i * g.h }, palette.ink2, 1.5, [4, 4]);
    }
  }
  const topoX = p.forma === "paralelogramo" ? g.inc : p.forma === "triangulo" ? g.inc : p.forma === "trapezio" ? g.inc : 0;
  const hh = g.pts.reduce((a, q) => Math.max(a, q.y), 0);
  // Altura h tracejada e rótulos. Os chips vão para uma fila e desviam uns dos outros
  // (em 1 × 3, "A = 3" no centro cobria o "3" de "h = 3").
  const rot = filaDeRotulos(ctx, hits, { x: 2, y: 2, w: w - 4, h: h - banda(1) - 2 });
  if (p.mostrar.alturas) {
    const xh = p.forma === "retangulo" ? 0 : topoX;
    if (p.forma !== "retangulo") segMundo(ctx, v, { x: topoX, y: 0 }, { x: topoX, y: hh }, tinta("c2"), espessura(hl, "c2", 3), [7, 5]);
    const ph = v.p(xh, hh / 2);
    rot.agendar([{ x: ph.x - 36, y: ph.y }, { x: ph.x - 48, y: ph.y }, { x: ph.x - 36, y: ph.y - 30 }], `h = ${fmt(hh)}`, "c2", 0);
  }
  const baseW = Math.max(...g.pts.map((q) => q.x)) - Math.min(0, ...g.pts.map((q) => q.x));
  const baixo = p.forma === "trapezio" ? g.B : p.forma === "retangulo" ? g.b * g.k : g.b;
  rot.agendar([v.p(baixo / 2, -0.5)], p.forma === "trapezio" ? `B = ${fmt(g.B)}` : `b = ${fmt(baixo)}`, "c1", 0);
  if (p.forma === "trapezio") rot.agendar([v.p(topoX + g.b / 2, hh + 0.5)], `b = ${fmt(g.b)}`, "c1", 0);
  void baseW;
  const centro = { x: g.pts.reduce((a, q) => a + q.x, 0) / g.pts.length, y: g.pts.reduce((a, q) => a + q.y, 0) / g.pts.length };
  if (p.mostrar.perimetro && p.forma !== "retangulo") rot.agendar([v.p(centro.x, hh + (p.forma === "trapezio" ? 1.5 : 0.5))], `P = ${fmt(g.perimetro)}`, "c4", 1);
  else if (p.mostrar.perimetro) rot.agendar([v.p(centro.x, hh + 0.5)], `P = ${fmt(g.perimetro)}`, "c4", 1);
  if (p.mostrar.area) {
    const pc = v.q(centro), dxA = Math.max(...g.pts.map((q) => v.p(q.x, 0).x)) - pc.x + 40;
    rot.agendar([pc, { x: pc.x + dxA, y: pc.y }, { x: pc.x, y: pc.y - 34 }], `A = ${fmt(g.area)}`, "c3", 2);
  }
  rot.colocar();
  const formula =
    p.forma === "triangulo" ? `A = b · h / 2 = ${fmt(g.area)}` : p.forma === "trapezio" ? `A = (B + b) · h / 2 = ${fmt(g.area)}` : `A = b · h = ${fmt(g.area)}`;
  if (p.mostrar.area) {
    rodape(ctx, w, h, [{ t: g.copia ? `${formula}  (2 cópias: ${fmt(g.areaUniao)})` : g.k !== 1 && p.forma === "retangulo" ? `ampliar ${fmt(g.k)}× multiplica a área por ${fmt(g.razaoArea)}` : formula, c: "c3" }]);
  }
  return { vista: v };
}

// ---------- Polígono convexo ----------

function dPoligono(ctx: G, w: number, h: number, hits: Hit[], p: PoligonoDe<"poligono">, cl: Ctl): GeoPol {
  const g = poligono(p, cl);
  const hl = p.highlight;
  if (p.quadrilatero !== undefined) {
    const v = criarVista(w, h - banda(2), { x0: -0.5, x1: 6.5, y0: -0.5, y1: 4.2 }, 18);
    poligonoMundo(ctx, v, g.pts, tintaClara("ink"), palette.ink, 3);
    segMundo(ctx, v, g.pts[0], g.pts[2], tinta("c4"), espessura(hl, "c4", 4));
    segMundo(ctx, v, g.pts[1], g.pts[3], tinta("c4"), espessura(hl, "c4", 4));
    // Cruzamento das diagonais: ponto médio comum no paralelogramo, retângulo e losango.
    const M = { x: (g.pts[0].x + g.pts[2].x) / 2, y: (g.pts[0].y + g.pts[2].y) / 2 };
    dot(ctx, v.q(M), 5, palette.ink);
    if (g.diagonaisPerpendiculares) {
      const u = { x: g.pts[2].x - g.pts[0].x, y: g.pts[2].y - g.pts[0].y };
      const wv = { x: g.pts[3].x - g.pts[1].x, y: g.pts[3].y - g.pts[1].y };
      retoNoMundo(ctx, v, M, { x: M.x + u.x, y: M.y + u.y }, { x: M.x + wv.x, y: M.y + wv.y }, 11);
    }
    etiqueta(ctx, hits, v.p(g.pts[0].x + 0.7, g.pts[0].y + 0.45), "d₁", "c4");
    etiqueta(ctx, hits, v.p(g.pts[1].x - 0.4, g.pts[1].y + 0.55), "d₂", "c4");
    rodape(ctx, w, h, [{ t: `${g.nome}: d₁ = ${fmt(g.d1)} e d₂ = ${fmt(g.d2)}`, c: "c4" }, { t: [g.diagonaisIguais ? "d₁ = d₂" : "d₁ ≠ d₂", g.diagonaisPerpendiculares ? "d₁ ⊥ d₂" : null, g.ladosIguais ? "lados iguais" : null].filter(Boolean).join(" · "), c: "ink" }]);
    return { vista: v };
  }
  const v = criarVista(w, h - banda(1), { x0: -1.35, x1: 1.35, y0: -1.35, y1: 1.35 }, 18);
  const k = 1 - 0.97 * (g.encolher / 100);
  const pts = g.pts.map((q) => ({ x: q.x * k, y: q.y * k }));
  if (p.diagonais && g.encolher < 100) {
    for (let i = 1; i < pts.length - 1; i++) poligonoMundo(ctx, v, [pts[0], pts[i], pts[i + 1]], tintaClara(i % 2 ? "c1" : "c2"), undefined);
  }
  if (p.externos) {
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % n];
      const c2 = pts[(i + 2) % n];
      const h1 = dirGraus(a, b);
      const h2 = dirGraus(b, c2);
      const giro = mod360(h2 - h1);
      setor(ctx, v.q(b), 30, h1, h1 + giro, `${tintaClara("c3")}`, tinta("c3"), 2);
    }
  }
  poligonoMundo(ctx, v, pts, undefined, palette.ink, 3);
  if (p.diagonais && g.encolher < 100) for (let i = 2; i < pts.length - 1; i++) segMundo(ctx, v, pts[0], pts[i], palette.ink2, 2, [6, 5]);
  if (g.encolher < 100) pts.forEach((q) => dot(ctx, v.q(q), 4, palette.ink));
  if (p.diagonais) etiqueta(ctx, hits, { x: 62, y: 22 }, `${g.triangulos} triângulos`, "c1");
  if (p.externos) etiqueta(ctx, hits, { x: w - 70, y: 22 }, g.encolher >= 100 ? "360°" : "externos", "c3");
  if (p.legenda) rodape(ctx, w, h, [{ t: p.externos ? `soma dos externos = ${fmt(g.somaExternos, 0)}° (sempre)` : `n = ${g.n}: S = (n − 2) · 180° = ${g.triangulos} · 180° = ${fmt(g.somaInternos, 0)}°`, c: p.externos ? "c3" : "c1" }]);
  return { vista: v };
}

// ---------- Polígonos regulares ----------

function dRegular(ctx: G, w: number, h: number, hits: Hit[], p: PoligonoDe<"regular">, cl: Ctl): GeoPol {
  const g = regular(p, cl);
  const hl = p.highlight;
  if (p.ladrilho) {
    const v = criarVista(w, h - banda(2), { x0: -2.8, x1: 2.8, y0: -2.8, y1: 2.8 }, 12);
    const pecas = pecasLadrilho(g.n);
    const O = v.p(0, 0);
    if (g.fresta > 1e-9) setor(ctx, O, 1.3 * v.k, g.cabem * g.interno, 360, tintaClara("c4"), tinta("c4"), 2);
    pecas.forEach((pc, i) => poligonoMundo(ctx, v, pc, tintaClara(i % 2 ? "c1" : "c2"), palette.ink, 2));
    dot(ctx, O, 5, palette.ink);
    if (g.fresta > 1e-9) etiqueta(ctx, hits, v.q(polar(1.0, g.cabem * g.interno + g.fresta / 2)), `${fmt(g.fresta, 0)}°`, "c4");
    rodape(ctx, w, h, [
      { t: `${g.cabem} peças · ${fmt(g.interno, 0)}° = ${fmt(g.cabem * g.interno, 0)}°`, c: "ink" },
      { t: g.fechado ? "fecha 360°: a peça ladrilha o plano" : `sobra uma fresta de ${fmt(g.fresta, 0)}°`, c: g.fechado ? "c3" : "c4" },
    ]);
    return { vista: v };
  }
  const R = g.R;
  const v = criarVista(w, h - banda(1), { x0: -R - 0.6, x1: R + 0.6, y0: -R - 0.6, y1: R + 0.6 }, 16);
  const O = v.p(0, 0);
  ctx.beginPath();
  ctx.arc(O.x, O.y, R * v.k, 0, Math.PI * 2);
  ctx.strokeStyle = palette.lineDark;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
  poligonoMundo(ctx, v, g.pts, palette.surface, palette.ink, 3);
  if (g.dividido) {
    g.pts.forEach((q, i) => {
      poligonoMundo(ctx, v, [{ x: 0, y: 0 }, q, g.pts[(i + 1) % g.n]], tintaClara("c1"), palette.ink2, 2);
    });
  }
  // Chips em fila: lado, raio, central, externo e interno desviam uns dos outros
  // (no hexágono, "120°" cobria o "60°" central e o raio).
  const rot = filaDeRotulos(ctx, hits, { x: 2, y: 2, w: w - 4, h: h - banda(1) - 2 });
  rot.reservar(O, 12, 12);
  if (g.dividido) {
    const ml = { x: (g.pts[0].x + g.pts[1].x) / 2, y: (g.pts[0].y + g.pts[1].y) / 2 };
    rot.agendar([1, 1.18, 0.82].map((f) => v.q({ x: ml.x * f, y: ml.y * f })), `${fmt(g.lado)}`, "c1", 1);
    const mr = v.q({ x: g.pts[0].x * 0.5, y: g.pts[0].y * 0.5 });
    const d = { x: v.q(g.pts[0]).x - O.x, y: v.q(g.pts[0]).y - O.y }, nd = Math.hypot(d.x, d.y) || 1;
    rot.agendar([mr, { x: mr.x - (d.y / nd) * 20, y: mr.y + (d.x / nd) * 20 }, { x: mr.x + (d.y / nd) * 20, y: mr.y - (d.x / nd) * 20 }], `${fmt(R)}`, "c1", 1);
  }
  // Ângulo central entre os vértices 0 e 1.
  const aC = 90;
  if (p.mostrar.central) {
    const rpx = Math.min(46, R * v.k * 0.35);
    anguloMarcado(ctx, hits, O, aC, aC + g.central, rpx, null, "c1");
    const m = ((aC + g.central / 2) * Math.PI) / 180;
    rot.agendar([22, 40, 60].map((d) => ({ x: O.x + Math.cos(m) * (rpx + d), y: O.y - Math.sin(m) * (rpx + d) })), `${fmt(g.central, 0)}°`, "c1", 0);
  }
  // Externo e interno no vértice 0.
  const v0 = v.q(g.pts[0]);
  const h1 = dirGraus(g.pts[0], g.pts[1]);
  if (p.mostrar.externo) {
    setor(ctx, v0, 30, h1 - g.externo, h1, tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 3));
    rot.agendar([{ x: v0.x - 34, y: v0.y - 8 }, { x: v0.x - 34, y: v0.y - 30 }, { x: v0.x - 56, y: v0.y - 8 }], `${fmt(g.externo, 0)}°`, "c2", 0);
  }
  if (p.mostrar.interno) {
    setor(ctx, v0, 30, h1, h1 + g.interno, tintaClara("c3"), tinta("c3"), espessura(hl, "c3", 3));
    // Dentro do setor do interno, ao longo da bissetriz (o setor se abre para dentro do polígono).
    const bi = ((h1 + g.interno / 2) * Math.PI) / 180;
    rot.agendar(
      [{ x: v0.x + 12, y: v0.y + 52 }, ...[52, 70, 90].map((d) => ({ x: v0.x + Math.cos(bi) * d, y: v0.y - Math.sin(bi) * d }))],
      `${fmt(g.interno, 0)}°`, "c3", 1);
  }
  rot.reservar(v0, 10, 10);
  rot.colocar();
  if (p.mostrar.legenda) rodape(ctx, w, h, [{ t: `n = ${g.n} · externo ${fmt(g.externo, 1)}° · interno ${fmt(g.interno, 1)}°`, c: "ink" }]);
  return { vista: v };
}

// ---------- Isometrias ----------

const COR_IMAGEM: Record<string, CorTraco> = { rotacao: "c3", translacao: "c1", reflexao: "c2", homotetia: "c4" };

function dIsometria(ctx: G, w: number, h: number, hits: Hit[], p: PoligonoDe<"isometria">, cl: Ctl): GeoPol {
  if (p.transformacao === "painel") {
    const sub: PoligonoDe<"isometria">[] = [
      { ...p, transformacao: "reflexao", refletir: 1 },
      { ...p, transformacao: "rotacao", angulo: 90 },
      { ...p, transformacao: "homotetia", k: 2 },
    ];
    const nomes: [string, CorTraco][] = [["reflexão", "c2"], ["rotação", "c3"], ["homotetia", "c4"]];
    sub.forEach((s, i) => {
      ctx.save();
      ctx.translate((i * w) / 3, 0);
      const local: Hit[] = [];
      cuboIso(ctx, w / 3, h - 30, local, s, cl, false);
      for (const hh of local) hits.push({ ...hh, x: hh.x + (i * w) / 3 });
      ctx.restore();
      nota(ctx, { x: ((i + 0.5) * w) / 3, y: h - 14 }, nomes[i][0], nomes[i][1], 14);
    });
    return { vista: criarVista(w, h, { x0: 0, x1: 1, y0: 0, y1: 1 }) };
  }
  return cuboIso(ctx, w, h, hits, p, cl, true);
}

function cuboIso(ctx: G, w: number, h: number, hits: Hit[], p: PoligonoDe<"isometria">, cl: Ctl, rodapes: boolean): GeoPol {
  const g = isometria(p, cl);
  const hl = p.highlight;
  const corImg = COR_IMAGEM[p.transformacao] ?? "c3";
  const ext = Math.max(6.5, Math.ceil(Math.max(...g.base.concat(g.imagem).flatMap((q) => [Math.abs(q.x), Math.abs(q.y)]))) + 0.5);
  const caixa: Caixa = p.transformacao === "reflexao" ? { x0: -6.5, x1: 6.5, y0: -1, y1: 6.5 } : { x0: -ext, x1: ext, y0: -ext, y1: ext };
  const v = criarVista(w, h - (rodapes ? banda(1) : 0), caixa, rodapes ? 12 : 6);
  const pequeno = !rodapes;
  desenhaMalha(ctx, v, { x0: Math.ceil(caixa.x0), x1: Math.floor(caixa.x1), y0: Math.ceil(caixa.y0), y1: Math.floor(caixa.y1) }, 1, palette.line);
  segMundo(ctx, v, { x: caixa.x0, y: 0 }, { x: caixa.x1, y: 0 }, palette.lineDark, 1.5);
  segMundo(ctx, v, { x: 0, y: caixa.y0 }, { x: 0, y: caixa.y1 }, p.transformacao === "reflexao" ? tinta("c2") : palette.lineDark, p.transformacao === "reflexao" ? espessura(hl, "c2", 4) : 1.5);
  const O = v.p(0, 0);
  // Figura original (e fantasma da imagem no caso neutro).
  const mudou = p.transformacao === "reflexao" ? g.refletiu : true;
  if (p.fantasma) poligonoMundo(ctx, v, g.base, undefined, palette.muted, 2, [5, 4]);
  poligonoMundo(ctx, v, g.base, palette.surface, palette.ink, 3);
  if (mudou) poligonoMundo(ctx, v, g.imagem, tintaClara(corImg), tinta(corImg), espessura(hl, corImg, 3));
  if (p.transformacao === "rotacao") {
    arco(ctx, O, 1.1 * v.k, 0, g.angulo, tinta("c3"), 4, tintaClara("c3"));
    if (Math.abs(g.angulo) > 1e-6) {
      segMundo(ctx, v, { x: 0, y: 0 }, g.base[0], palette.ink2, 2, [5, 4]);
      segMundo(ctx, v, { x: 0, y: 0 }, g.imagem[0], tinta("c3"), 2, [5, 4]);
      if (!pequeno) etiqueta(ctx, hits, v.q(polar(1.9, g.angulo / 2)), `${fmt(g.angulo, 0)}°`, "c3");
    }
  }
  if (p.transformacao === "translacao") {
    g.base.forEach((q, i) => i % 3 === 0 && segMundo(ctx, v, q, g.imagem[i], tinta("c1"), 2, [6, 5]));
    if (!pequeno) etiqueta(ctx, hits, v.q({ x: (g.base[0].x + g.imagem[0].x) / 2, y: (g.base[0].y + g.imagem[0].y) / 2 - 0.4 }), `(${fmt(g.dx, 0)}; ${fmt(g.dy, 0)})`, "c1");
  }
  if (p.transformacao === "reflexao" && g.refletiu) {
    g.base.forEach((q, i) => i % 2 === 0 && segMundo(ctx, v, q, g.imagem[i], tinta("c2"), 2, [6, 5]));
    if (!pequeno) {
      const q0 = g.base[0];
      etiqueta(ctx, hits, v.p((q0.x + p.espelho) / 2, q0.y + 0.4), "d", "c2");
      etiqueta(ctx, hits, v.p((g.imagem[0].x + p.espelho) / 2, q0.y + 0.4), "d", "c2");
    }
  }
  if (p.transformacao === "homotetia") {
    g.imagem.forEach((q) => segMundo(ctx, v, { x: 0, y: 0 }, q, tinta("c3"), 1.5, [5, 4]));
    dot(ctx, O, 6, tinta("c3"));
    if (!pequeno) etiqueta(ctx, hits, { x: O.x + 14, y: O.y + 16 }, "O", "c3");
    if (!pequeno) etiqueta(ctx, hits, { x: 46, y: 24 }, `k = ${fmt(g.k)}`, "c4");
  }
  dot(ctx, O, 4, palette.ink);
  if (rodapes) {
    rodape(ctx, w, h, [
      {
        t:
          p.transformacao === "homotetia"
            ? `lados × ${fmt(Math.abs(g.k))} · área ${fmt(g.area)} → ${fmt(g.areaImagem)} (k² = ${fmt(g.k * g.k)})`
            : `área ${fmt(g.area)} → ${fmt(g.areaImagem)} · perímetro ${fmt(g.perimetro)} → ${fmt(g.perimetroImagem)}`,
        c: p.transformacao === "homotetia" ? "c4" : "c1",
      },
    ]);
  }
  return { vista: v };
}

// ---------- Paralelas ----------

/**
 * Com s inclinada (B27b, 16/11), os chips de cima do cruzamento de s (nw, ne) sobem em direção aos de baixo
 * do cruzamento de r e encostavam (±15° a ±20°). Descem 0,7 px por grau de desvio; com desvio 0, nada muda.
 */
export function afastamentoChipsS(cruz: "r" | "s", k: "ne" | "nw" | "sw" | "se", desvio: number): number {
  return cruz === "s" && (k === "nw" || k === "ne") ? Math.round(Math.abs(desvio) * 0.7) : 0;
}

function dParalelas(ctx: G, w: number, h: number, hits: Hit[], p: PoligonoDe<"paralelas">, cl: Ctl, e: EstadoPol): GeoPol {
  const g = paralelas(p, cl, e);
  const hl = p.highlight;
  const midX = (g.X1.x + g.X2.x) / 2;
  const spanX = Math.max(4.6, Math.abs(g.X2.x - g.X1.x) / 2 + 2.8);
  const caixa = { x0: midX - spanX, x1: midX + spanX, y0: -3.6, y1: 1.5 };
  const v = criarVista(w, h - banda(1), caixa, 10);
  const u = g.u;
  // Retas r e s (s pode estar girada por `desvio`).
  const dirS = { x: Math.cos((g.desvio * Math.PI) / 180), y: Math.sin((g.desvio * Math.PI) / 180) };
  const tracoReta = (o: Pt, d: Pt, L: number, cor: string, lw: number, dash?: number[]) => segMundo(ctx, v, { x: o.x - d.x * L, y: o.y - d.y * L }, { x: o.x + d.x * L, y: o.y + d.y * L }, cor, lw, dash);
  const compReta = spanX * 2;
  tracoReta(g.X1, { x: 1, y: 0 }, compReta, palette.ink, 3);
  if (!p.foco) tracoReta(g.X2, dirS, compReta, g.paralelas ? palette.ink : tintaEscura("c3"), 3);
  if (!p.foco) {
    const xRot = caixa.x1 - 0.45;
    etiqueta(ctx, hits, v.p(xRot, 0.38), "r", "ink");
    const tS = Math.abs(dirS.x) > 0.2 ? (xRot - g.X2.x) / dirS.x : 4.2;
    const posS = v.p(g.X2.x + tS * dirS.x, g.X2.y + tS * dirS.y - 0.38);
    // B27b (16/11): com s inclinada para baixo, o rótulo "s" não desce até a legenda do rodapé.
    etiqueta(ctx, hits, { x: posS.x, y: Math.min(posS.y, h - banda(1) - 16) }, "s", "ink");
  }
  if (p.fantasma) segMundo(ctx, v, { x: 0, y: 1.3 }, { x: 0, y: -2.9 }, palette.lineDark, 2, [6, 5]);
  // Transversal t.
  segMundo(ctx, v, { x: g.X2.x - u.x * 1.1, y: g.X2.y - u.y * 1.1 }, { x: g.X1.x + u.x * 1.25, y: g.X1.y + u.y * 1.25 }, palette.ink, 3);
  const posT = p.foco
    ? v.p(g.X2.x - u.x * 0.85 - 0.32, g.X2.y - u.y * 0.85)
    : v.p(g.X1.x + u.x * 1.15 + 0.32, g.X1.y + u.y * 1.15);
  etiqueta(ctx, hits, posT, "t", "ink");
  // Destaques.
  const par = {
    opostos: [["r-ne", "c1"], ["r-sw", "c1"], ["r-nw", "c2"], ["r-se", "c2"]],
    correspondentes: [["r-ne", "c3"], ["s-ne", "c3"]],
    alternos: [["r-sw", "c4"], ["s-ne", "c4"]],
    colaterais: [["r-se", "c2"], ["s-ne", "c1"]],
    nenhum: [],
  } as const;
  const destaque = new Map<string, CorTraco>(par[p.destacar].map(([k, c]) => [k, c as CorTraco]));
  const cruzamentos: { id: "r" | "s"; X: Pt; L: number; ang: typeof g.r }[] = [{ id: "r", X: g.X1, L: 0, ang: g.r }];
  if (!p.foco) cruzamentos.push({ id: "s", X: g.X2, L: g.desvio, ang: g.s });
  const base: Record<string, CorTraco> = { ne: "c1", sw: "c1", nw: "c2", se: "c2" };
  const posicoes = (L: number, a: number) =>
    ({
      ne: [L, a],
      nw: [a, L + 180],
      sw: [L + 180, a + 180],
      se: [a + 180, L + 360],
    }) as Record<string, [number, number]>;
  for (const cz of cruzamentos) {
    const X = v.q(cz.X);
    const pos = posicoes(cz.L, g.alfa);
    for (const k of ["ne", "nw", "sw", "se"] as const) {
      const id = `${cz.id}-${k}`;
      const dest = destaque.get(id);
      const ativo = p.destacar === "nenhum" || dest !== undefined;
      const cor: CorTraco = dest ?? (cz.id === "s" && !g.paralelas ? "c3" : base[k]);
      const [a0, a1] = pos[k];
      const raio = 21 + (k === "nw" || k === "se" ? 5 : 0);
      if (ativo) arco(ctx, X, raio, a0, a1, tinta(cor), espessura(hl, cor, 3), tintaClara(cor));
      else arco(ctx, X, raio, a0, a1, palette.lineDark, 1.5);
      if (ativo && !p.ocultar.includes(id)) {
        const m = ((a0 + a1) / 2) * (Math.PI / 180);
        const txt = p.rotulos[id] ?? `${fmt(cz.ang[k], 0)}°`;
        const dy90 = !p.foco && Math.abs(g.alfa - 90) < 15 && (id === "r-sw" || id === "r-se" || id === "s-nw" || id === "s-ne")
          ? (cz.id === "r" ? -10 : 10)
          : 0;
        const dyDesvio = afastamentoChipsS(cz.id, k, g.desvio);
        etiqueta(ctx, hits, { x: X.x + Math.cos(m) * (raio + 18), y: X.y - Math.sin(m) * (raio + 18) + dy90 + dyDesvio }, txt, cor);
      }
    }
  }
  if (p.foco) {
    const X = v.q(g.X1);
    arco(ctx, X, 62, 0, 180, palette.muted, 2, undefined, [5, 4]);
    nota(ctx, { x: X.x + 70, y: X.y - 44 }, "180°", "muted", 13);
  }
  if (p.destacar === "alternos" && !p.foco) {
    ctx.beginPath();
    const a = v.p(g.X1.x - 1.3, 0);
    const b = v.q(g.X1);
    const c2 = v.q(g.X2);
    const d = v.p(g.X2.x + 1.3 * dirS.x, g.X2.y + 1.3 * dirS.y);
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.lineTo(d.x, d.y);
    ctx.strokeStyle = tinta("c4");
    ctx.lineWidth = 4;
    ctx.setLineDash([2, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  // Cópia do cruzamento deslizando de r até s.
  if (!p.foco && g.deslizar > 0) {
    const f = g.deslizar;
    const C = { x: g.X1.x + (g.X2.x - g.X1.x) * f, y: g.X1.y + (g.X2.y - g.X1.y) * f };
    segMundo(ctx, v, { x: C.x - 1.3, y: C.y }, { x: C.x + 1.3, y: C.y }, tinta("c3"), 2, [5, 4]);
    const Q = v.q(C);
    arco(ctx, Q, 18, 0, g.alfa, tinta("c3"), 3, tintaClara("c3"));
    dot(ctx, Q, 4, tinta("c3"));
  }
  if (p.legenda) {
    rodape(ctx, w, h, [
      {
        t: g.paralelas ? `α = ${fmt(g.alfa, 0)}° e 180° − α = ${fmt(g.suplementar, 0)}°` : `s girou ${fmt(g.desvio, 0)}°: r e s deixaram de ser paralelas`,
        c: g.paralelas ? "c1" : "c3",
      },
    ]);
  }
  return { vista: v };
}

void [tintaClara, notaEsq];
