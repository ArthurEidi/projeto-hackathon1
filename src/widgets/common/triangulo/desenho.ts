// Desenho do widget geometria_triangulo, um desenhista por modo. A matemática vem de calc.ts.
import { palette } from "../../../ui/palette";
import { avaliarExpr } from "../expr";
import { dot, type Hit, type Pt } from "../../canvas";
import {
  anguloMarcado,
  criarVista,
  espessura,
  etiqueta,
  fmt,
  ladoFora,
  malha,
  nota,
  notaEsq,
  pegador,
  poligonoMundo,
  retoNoMundo,
  segMundo,
  tinta,
  tintaClara,
  tintaEscura,
  type Alvo,
  type Caixa,
  type Vista,
} from "../geo/base";
import {
  angulos,
  anguloEm,
  BASE_A,
  BASE_B,
  congruente,
  cossenos,
  desigualdade,
  metricas,
  notaveis,
  pitagoras,
  provaPecas,
  razoes,
  semelhanca,
  senos,
  trianguloPorLados,
  type Ctl,
  type EstadoTri,
} from "./calc";
import type { Triangulo, TrianguloDe } from "./params";

type G = CanvasRenderingContext2D;
export interface GeoTri {
  alvos: Alvo[];
  vista: Vista;
}

const ALT_LINHA = 19;
const banda = (n: number) => n * ALT_LINHA + 12;

/** Linhas de conta no rodapé, centralizadas. */
function rodape(ctx: G, w: number, h: number, linhas: { t: string; c?: Parameters<typeof nota>[3] }[]) {
  linhas.forEach((l, i) => nota(ctx, { x: w / 2, y: h - banda(linhas.length) + 14 + i * ALT_LINHA }, l.t, l.c ?? "ink", 15));
}

const lado = (ctx: G, hits: Hit[], v: Vista, a: Pt, b: Pt, longe: Pt, txt: string, c: Parameters<typeof etiqueta>[4], px = 20) =>
  etiqueta(ctx, hits, ladoFora(v.q(a), v.q(b), v.q(longe), px), txt, c);

const eixoX = (ctx: G, v: Vista, x0: number, x1: number, y = 0) => segMundo(ctx, v, { x: x0, y }, { x: x1, y }, palette.lineDark, 2);

export function aspectoTriangulo(p: Triangulo): number {
  switch (p.modo) {
    case "pitagoras":
      return p.prova || p.diagonal || p.chaves.includes("diagonal") ? 0.95 : 0.9;
    case "razoes":
      return 0.8;
    case "metricas":
      return p.comparar ? 1.05 : 0.7;
    case "cossenos":
      return 0.8;
    case "senos":
      return 0.95;
    case "angulos":
      return p.chaves.includes("fechar") ? 1 : 0.92;
    case "desigualdade":
      return 0.62;
    case "congruencia":
      return 0.62;
    case "notaveis":
      return p.figura === "mediatriz" ? 0.85 : 0.85;
    case "semelhanca":
      return p.variante === "sombras" ? 0.5 : 0.9;
  }
}

export function desenharTriangulo(ctx: G, w: number, h: number, hits: Hit[], p: Triangulo, c: Ctl, e: EstadoTri): GeoTri {
  switch (p.modo) {
    case "pitagoras":
      return dPitagoras(ctx, w, h, hits, p, c, e);
    case "razoes":
      return dRazoes(ctx, w, h, hits, p, c);
    case "metricas":
      return dMetricas(ctx, w, h, hits, p, c);
    case "cossenos":
      return dCossenos(ctx, w, h, hits, p, c);
    case "senos":
      return dSenos(ctx, w, h, hits, p, c);
    case "angulos":
      return dAngulos(ctx, w, h, hits, p, c, e);
    case "desigualdade":
      return dDesigualdade(ctx, w, h, hits, p, c);
    case "congruencia":
      return dCongruencia(ctx, w, h, hits, p, e);
    case "notaveis":
      return dNotaveis(ctx, w, h, hits, p, c);
    case "semelhanca":
      return dSemelhanca(ctx, w, h, hits, p, c, e);
  }
}

// ---------- Pitágoras ----------

/** Quadriculado (passo 1) dentro de um quadrado dado por origem e dois vetores unitários. */
function quadriculado(ctx: G, v: Vista, o: Pt, u: Pt, w: Pt, lado: number) {
  if (lado > 14 || lado < 1) return;
  ctx.beginPath();
  for (let i = 1; i < lado; i++) {
    const a = v.p(o.x + u.x * i, o.y + u.y * i);
    const b = v.p(o.x + u.x * i + w.x * lado, o.y + u.y * i + w.y * lado);
    const c = v.p(o.x + w.x * i, o.y + w.y * i);
    const d = v.p(o.x + w.x * i + u.x * lado, o.y + w.y * i + u.y * lado);
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
  }
  ctx.strokeStyle = palette.bg;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.9;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function dPitagoras(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"pitagoras">, cl: Ctl, e: EstadoTri): GeoTri {
  const g = pitagoras(p, cl, e);
  const hl = p.highlight;
  // Prova visual: quadradão de lado b + c.
  if (p.prova || p.chaves.includes("deslizar")) {
    const b = Math.max(g.b, 0.01);
    const cc = Math.max(g.c, 0.01);
    const s = b + cc;
    const v = criarVista(w, h, { x0: -0.2, x1: s + 0.2, y0: -0.2, y1: s + 0.2 }, 16);
    const desl = e.chaves.has("deslizar");
    const pecas = provaPecas(b, cc, desl);
    poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: s, y: 0 }, { x: s, y: s }, { x: 0, y: s }], palette.surface);
    for (const t of pecas.triangulos) poligonoMundo(ctx, v, t, tintaClara("c4"), palette.ink2, 2);
    const centro = (pts: Pt[]) => ({ x: pts.reduce((a, q) => a + q.x, 0) / pts.length, y: pts.reduce((a, q) => a + q.y, 0) / pts.length });
    for (const q of pecas.quadrados) {
      const cor = q.lado === "a" ? "c3" : q.lado === "b" ? "c1" : "c2";
      poligonoMundo(ctx, v, q.pts, tinta(cor), tinta(cor), espessura(hl, cor, 3));
      const area = q.lado === "a" ? g.areaA : q.lado === "b" ? g.areaB : g.areaC;
      etiqueta(ctx, hits, v.q(centro(q.pts)), `${q.lado}² = ${fmt(area)}`, cor);
    }
    poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: s, y: 0 }, { x: s, y: s }, { x: 0, y: s }], undefined, palette.ink, 3);
    return { alvos: [], vista: v };
  }
  // Quadrado cortado pela diagonal (catetos iguais).
  if (g.diagonal) {
    const L = Math.max(g.b, 0.01);
    const v = criarVista(w, h, { x0: -0.4, x1: L + 0.4, y0: -0.4, y1: L + 0.4 }, 28);
    const sq = [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: L }, { x: 0, y: L }];
    poligonoMundo(ctx, v, sq, palette.surface, palette.lineDark, 2);
    poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: L }], tintaClara("c4"), tinta("c4"), espessura(hl, "c4", 3));
    quadriculado(ctx, v, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, L);
    retoNoMundo(ctx, v, { x: L, y: 0 }, { x: 0, y: 0 }, { x: L, y: L });
    segMundo(ctx, v, { x: 0, y: 0 }, { x: L, y: L }, tinta("c4"), espessura(hl, "c4", 4));
    lado(ctx, hits, v, { x: 0, y: 0 }, { x: L, y: 0 }, { x: L / 2, y: L }, `L = ${fmt(L)}`, "c1");
    lado(ctx, hits, v, { x: L, y: 0 }, { x: L, y: L }, { x: 0, y: L / 2 }, `L = ${fmt(L)}`, "c1");
    etiqueta(ctx, hits, v.p(L * 0.4, L * 0.62), `d = ${fmt(g.a)}`, "c4");
    return { alvos: [], vista: v };
  }
  // Triângulo com quadrados nos três lados. Ângulo reto na origem: b na horizontal, c na vertical.
  const b = g.b;
  const cc = g.c;
  const a = g.a;
  const caixa: Caixa = { x0: -Math.max(cc, 1) - 0.3, x1: b + cc + 0.3, y0: -Math.max(b, 1) - 0.3, y1: b + cc + 0.3 };
  const v = criarVista(w, h, caixa, 22);
  const O = { x: 0, y: 0 };
  const B = { x: b, y: 0 };
  const C = { x: 0, y: cc };
  const n = a > 0 ? { x: cc / a, y: b / a } : { x: 0, y: 0 };
  const quadB = [O, B, { x: b, y: -b }, { x: 0, y: -b }];
  const quadC = [O, C, { x: -cc, y: cc }, { x: -cc, y: 0 }];
  const quadA = [B, C, { x: C.x + n.x * a, y: C.y + n.y * a }, { x: B.x + n.x * a, y: B.y + n.y * a }];
  if (p.quadrados) {
    if (b > 0) poligonoMundo(ctx, v, quadB, tintaClara("c1"), tinta("c1"), espessura(hl, "c1", 2));
    if (cc > 0) poligonoMundo(ctx, v, quadC, tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 2));
    poligonoMundo(ctx, v, quadA, tintaClara("c3"), tinta("c3"), espessura(hl, "c3", 2));
    if (p.malha) {
      quadriculado(ctx, v, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, b);
      quadriculado(ctx, v, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, cc);
      quadriculado(ctx, v, B, a > 0 ? { x: (C.x - B.x) / a, y: (C.y - B.y) / a } : { x: 0, y: 1 }, n, a);
    }
  }
  poligonoMundo(ctx, v, [O, B, C], palette.bg, palette.ink, 3);
  if (cc > 0 && b > 0) retoNoMundo(ctx, v, O, B, C);
  if (b > 0 && !p.ocultar.includes("b")) lado(ctx, hits, v, O, B, { x: b / 2, y: -b / 2 }, `b = ${fmt(b)}`, "c1", 18);
  if (cc > 0 && !p.ocultar.includes("c")) lado(ctx, hits, v, O, C, { x: -cc / 2, y: cc / 2 }, `c = ${fmt(cc)}`, "c2", 18);
  if (p.quadrados) {
    if (b > 0 && !p.ocultar.includes("b")) etiqueta(ctx, hits, v.p(b / 2, -b / 2), `b² = ${fmt(g.areaB)}`, "c1");
    if (cc > 0 && !p.ocultar.includes("c")) etiqueta(ctx, hits, v.p(-cc / 2, cc / 2), `c² = ${fmt(g.areaC)}`, "c2");
    const cA = { x: (B.x + C.x) / 2 + (n.x * a) / 2, y: (B.y + C.y) / 2 + (n.y * a) / 2 };
    if (!p.ocultar.includes("a")) etiqueta(ctx, hits, v.q(cA), `a² = ${fmt(g.areaA)}`, "c3");
  } else if (!p.ocultar.includes("a")) {
    etiqueta(ctx, hits, ladoFora(v.q(B), v.q(C), v.q(O), 20), `a = ${fmt(a)}`, "c3");
  }
  return { alvos: [], vista: v };
}

// ---------- Razões trigonométricas ----------

export interface ChipRazao {
  id: "ang" | "ca" | "co" | "hip";
  pos: Pt;
  txt: string;
  cor: Parameters<typeof etiqueta>[4];
  box: { x0: number; y0: number; x1: number; y1: number };
}

function caixaChip(pos: Pt, txt: string) {
  const w = Math.max(44, txt.length * 8.5 + 22);
  const h = 24;
  return { x0: pos.x - w / 2, y0: pos.y - h / 2, x1: pos.x + w / 2, y1: pos.y + h / 2 };
}

const sobrepoe = (a: ChipRazao["box"], b: ChipRazao["box"], folga = 4) =>
  a.x0 - folga < b.x1 && a.x1 + folga > b.x0 && a.y0 - folga < b.y1 && a.y1 + folga > b.y0;

export function layoutRazoes(
  v: Vista,
  A: Pt,
  Cc: Pt,
  Bb: Pt,
  g: { angulo: number; ca: number; co: number; hip: number },
  w: number,
  h: number,
): ChipRazao[] {
  const pA = v.q(A);
  const pC = v.q(Cc);
  const pB = v.q(Bb);
  const hipPx = Math.hypot(pB.x - pA.x, pB.y - pA.y);
  const fora = hipPx < 190;
  const rAng = Math.min(34, Math.max(16, hipPx * 0.16));
  const mAng = (g.angulo * Math.PI) / 360;
  const posAng: Pt = fora
    ? { x: pA.x - 26, y: pA.y - 12 }
    : { x: pA.x + Math.cos(mAng) * Math.min(rAng + 20, Math.max(rAng + 10, hipPx * 0.36)), y: pA.y - Math.sin(mAng) * Math.min(rAng + 20, Math.max(rAng + 10, hipPx * 0.36)) };

  const raw: Omit<ChipRazao, "box">[] = [
    { id: "ca", pos: ladoFora(pA, pC, pB, fora ? 22 : 20), txt: `CA ${fmt(g.ca, 1)}`, cor: "c2" },
    { id: "co", pos: ladoFora(pC, pB, pA, fora ? 42 : 34), txt: `CO ${fmt(g.co, 1)}`, cor: "c1" },
    { id: "hip", pos: ladoFora(pA, pB, pC, fora ? 34 : 28), txt: `HIP ${fmt(g.hip, 1)}`, cor: "c3" },
    { id: "ang", pos: posAng, txt: `${fmt(g.angulo, 0)}°`, cor: "c4" },
  ];

  const dirSep: Record<ChipRazao["id"], Pt> = {
    ca: { x: 0, y: 1 },
    co: { x: 1, y: 0 },
    hip: { x: -0.7, y: -0.7 },
    ang: { x: -1, y: -0.4 },
  };

  const chips: ChipRazao[] = [];
  for (const item of raw) {
    const pos = { ...item.pos };
    let box = caixaChip(pos, item.txt);
    const d = dirSep[item.id];
    for (let tent = 0; tent < 24 && chips.some((c) => sobrepoe(box, c.box)); tent++) {
      pos.x += d.x * 8;
      pos.y += d.y * 8;
      box = caixaChip(pos, item.txt);
    }
    const hw = (box.x1 - box.x0) / 2;
    const hh = (box.y1 - box.y0) / 2;
    pos.x = Math.max(hw + 6, Math.min(w - hw - 6, pos.x));
    pos.y = Math.max(hh + 6, Math.min(h - hh - 6, pos.y));
    chips.push({ ...item, pos, box: caixaChip(pos, item.txt) });
  }
  return chips;
}

function dRazoes(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"razoes">, cl: Ctl): GeoTri {
  const g = razoes(p, cl);
  const kDinamico = typeof p.k === "string";
  const hipMax = Math.max(kDinamico ? avaliarMax(p) : g.hip, 0.5);
  const angFixo = typeof p.angulo === "number";
  const caMax = angFixo ? Math.max(hipMax * Math.cos((g.angulo * Math.PI) / 180), hipMax * 0.35) : hipMax * 0.92;
  const coMax = angFixo ? Math.max(hipMax * Math.sin((g.angulo * Math.PI) / 180), hipMax * 0.35) : hipMax * 0.92;
  const caixa: Caixa = kDinamico
    ? {
        x0: -caMax * 0.16,
        x1: caMax * 1.24,
        y0: -coMax * 0.18,
        y1: coMax * (p.painel ? 1.22 : 1.08),
      }
    : {
        x0: -g.hip * 0.08,
        x1: g.hip * 1.18,
        y0: -g.hip * 0.18,
        y1: g.hip * (p.painel ? 1.05 : 0.92),
      };
  const v = criarVista(w, h, caixa, 22);
  if (p.malha) malha(ctx, v, { x0: 0, x1: kDinamico ? caMax : hipMax, y0: 0, y1: kDinamico ? coMax : hipMax * 0.95 }, hipMax > 8 ? 2 : 1);
  const A = { x: 0, y: 0 };
  const Cc = { x: g.ca, y: 0 };
  const Bb = { x: g.ca, y: g.co };
  if (p.fantasma !== undefined) {
    const hp = avaliarBase(p);
    const gc = { x: hp * Math.cos((p.fantasma * Math.PI) / 180), y: hp * Math.sin((p.fantasma * Math.PI) / 180) };
    poligonoMundo(ctx, v, [A, { x: gc.x, y: 0 }, gc], undefined, palette.lineDark, 2, [6, 6]);
  }
  poligonoMundo(ctx, v, [A, Cc, Bb], tintaClara("c4"), palette.ink, 2);
  segMundo(ctx, v, Cc, Bb, tinta("c1"), espessura(p.highlight, "c1", 4));
  segMundo(ctx, v, A, Cc, tinta("c2"), espessura(p.highlight, "c2", 4));
  segMundo(ctx, v, A, Bb, tinta("c3"), espessura(p.highlight, "c3", 4));
  if (g.ca > 0 && g.co > 0) retoNoMundo(ctx, v, Cc, A, Bb);
  if (g.hip > 0) {
    const hipPx = Math.hypot(v.q(Bb).x - v.q(A).x, v.q(Bb).y - v.q(A).y);
    const rAng = Math.min(34, Math.max(16, hipPx * 0.16));
    anguloMarcado(ctx, hits, v.q(A), 0, g.angulo, rAng, null, "c4");
    for (const ch of layoutRazoes(v, A, Cc, Bb, g, w, h)) {
      if (!p.ocultar.includes(ch.id)) etiqueta(ctx, hits, ch.pos, ch.txt, ch.cor);
    }
  }
  if (p.painel) {
    const lin = [
      [`sen θ = CO / HIP = ${fmt(g.sen)}`, "c1"],
      [`cos θ = CA / HIP = ${fmt(g.cos)}`, "c2"],
      [`tg θ = CO / CA = ${fmt(g.tg)}`, "c3"],
    ] as const;
    lin.forEach(([t, c], i) => notaEsq(ctx, { x: 12, y: 18 + i * 21 }, t, tintaEscura(c), 14));
  }
  return { alvos: [], vista: v };
}

/** Hipotenusa na escala k_max, para fixar a janela. */
const avaliarBase = (p: TrianguloDe<"razoes">) => (typeof p.hip === "number" ? p.hip : 5);
const avaliarMax = (p: TrianguloDe<"razoes">) => avaliarBase(p) * p.k_max;

// ---------- Relações métricas ----------

function dMetricas(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"metricas">, cl: Ctl): GeoTri {
  const g = metricas(p, cl);
  const hip = !p.catetos || avaliarExpr(p.apoio, cl) >= 0.5;
  const topo = p.comparar ? Math.round(h * 0.62) : h;
  ctx.save();
  if (hip) {
    const v = criarVista(w, topo, { x0: -0.3, x1: g.a + 0.3, y0: -g.a * 0.12, y1: g.a / 2 + 0.3 }, 20);
    const A = { x: 0, y: 0 };
    const Bp = { x: g.a, y: 0 };
    const H = { x: g.m, y: 0 };
    const C = { x: g.m, y: g.h };
    poligonoMundo(ctx, v, [A, Bp, C], tintaClara("c4"), palette.ink, 2);
    segMundo(ctx, v, H, C, tinta("c3"), espessura(p.highlight, "c3", 4), [7, 5]);
    segMundo(ctx, v, A, Bp, tinta("c1"), espessura(p.highlight, "c1", 4));
    segMundo(ctx, v, A, H, tinta("c2"), espessura(p.highlight, "c2", 6));
    segMundo(ctx, v, H, Bp, tinta("c2"), espessura(p.highlight, "c2", 6));
    segMundo(ctx, v, A, C, tinta("c4"), espessura(p.highlight, "c4", 3));
    segMundo(ctx, v, C, Bp, tinta("c4"), espessura(p.highlight, "c4", 3));
    if (g.m > 0 && g.n > 0) {
      retoNoMundo(ctx, v, C, A, Bp);
      retoNoMundo(ctx, v, H, A, C, 10);
    }
    if (!p.ocultar.includes("a")) etiqueta(ctx, hits, v.p(g.a / 2, -g.a * 0.07), `a = ${fmt(g.a)}`, "c1");
    if (g.m > 0 && !p.ocultar.includes("m")) etiqueta(ctx, hits, v.p(g.m / 2, g.a * 0.045 + 0), `m = ${fmt(g.m)}`, "c2");
    if (g.n > 0 && !p.ocultar.includes("n")) etiqueta(ctx, hits, v.p(g.m + g.n / 2, g.a * 0.045), `n = ${fmt(g.n)}`, "c2");
    if (g.h > 0 && !p.ocultar.includes("h")) etiqueta(ctx, hits, v.p(g.m, g.h / 2), `h = ${fmt(g.h)}`, "c3");
    if (g.m > 0 && g.h > 0 && !p.ocultar.includes("b")) lado(ctx, hits, v, A, C, Bp, `b = ${fmt(g.b)}`, "c4", 22);
    if (g.n > 0 && g.h > 0 && !p.ocultar.includes("c")) lado(ctx, hits, v, C, Bp, A, `c = ${fmt(g.c)}`, "c4", 22);
    if (p.catetos) nota(ctx, { x: w / 2, y: topo - 12 }, `área = a · h / 2 = ${fmt((g.a * g.h) / 2)}`, "c3");
  } else {
    const [b, cc] = p.catetos!;
    const v = criarVista(w, topo, { x0: -0.3, x1: cc + 0.3, y0: -0.8, y1: b + 0.4 }, 24);
    const O = { x: 0, y: 0 };
    const X = { x: cc, y: 0 };
    const Y = { x: 0, y: b };
    poligonoMundo(ctx, v, [O, X, Y], tintaClara("c4"), palette.ink, 2);
    segMundo(ctx, v, O, X, tinta("c4"), espessura(p.highlight, "c4", 4));
    segMundo(ctx, v, O, Y, tinta("c4"), espessura(p.highlight, "c4", 3));
    segMundo(ctx, v, X, Y, tinta("c1"), espessura(p.highlight, "c1", 3));
    retoNoMundo(ctx, v, O, X, Y);
    etiqueta(ctx, hits, v.p(cc / 2, -0.45), `base ${fmt(cc)}`, "c4");
    etiqueta(ctx, hits, v.p(-0.0, b / 2), `altura ${fmt(b)}`, "c4");
    etiqueta(ctx, hits, v.p(cc / 2, b / 2), `a = ${fmt(g.a)}`, "c1");
    nota(ctx, { x: w / 2, y: topo - 12 }, `área = base · altura / 2 = ${fmt((b * cc) / 2)}`, "c4");
  }
  ctx.restore();
  if (p.comparar) {
    const alt = h - topo;
    ctx.save();
    ctx.translate(0, topo);
    const gap = Math.max(g.a, g.b) * 0.12;
    const v2 = criarVista(w, alt, { x0: 0, x1: g.a + gap + g.b, y0: -0.1, y1: Math.max(g.m, g.b) + 0.1 }, 12);
    poligonoMundo(ctx, v2, [{ x: 0, y: 0 }, { x: g.a, y: 0 }, { x: g.a, y: g.m }, { x: 0, y: g.m }], tintaClara("c2"), tinta("c2"), 3);
    const x0 = g.a + gap;
    poligonoMundo(ctx, v2, [{ x: x0, y: 0 }, { x: x0 + g.b, y: 0 }, { x: x0 + g.b, y: g.b }, { x: x0, y: g.b }], tintaClara("c4"), tinta("c4"), espessura(p.highlight, "c4", 3));
    etiqueta(ctx, hits, v2.p(g.a / 2, g.m / 2), `a · m = ${fmt(g.areaAM)}`, "c2");
    etiqueta(ctx, hits, v2.p(x0 + g.b / 2, g.b / 2), `b² = ${fmt(g.areaB)}`, "c4");
    ctx.restore();
  }
  return { alvos: [], vista: criarVista(w, h, { x0: 0, x1: 1, y0: 0, y1: 1 }) };
}

// ---------- Lei dos cossenos ----------

function dCossenos(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"cossenos">, cl: Ctl): GeoTri {
  const g = cossenos(p, cl);
  const linhas = 3;
  const hh = h - banda(linhas);
  const v = criarVista(w, hh, { x0: -g.b - 0.3, x1: g.c + 0.4, y0: -0.4, y1: g.b + 0.4 }, 20);
  const { A, B, C } = g.pts;
  if (p.fantasma) {
    poligonoMundo(ctx, v, [A, B, { x: 0, y: g.b }], undefined, palette.lineDark, 2, [6, 6]);
    nota(ctx, v.p(g.c / 2 + 0.2, g.b / 2 + 0.2), `a = ${fmt(g.ref)}`, "muted", 13);
  }
  poligonoMundo(ctx, v, [A, B, C], tintaClara("c3"), palette.ink, 2);
  segMundo(ctx, v, B, C, tinta("c1"), espessura(p.highlight, "c1", 4));
  segMundo(ctx, v, A, B, tinta("c2"), espessura(p.highlight, "c2", 4));
  segMundo(ctx, v, A, C, tinta("c2"), espessura(p.highlight, "c2", 4));
  anguloMarcado(ctx, hits, v.q(A), 0, g.A, 30, `${fmt(g.A, 0)}°`, "c3");
  lado(ctx, hits, v, A, B, C, `c = ${fmt(g.c)}`, "c2", 18);
  lado(ctx, hits, v, A, C, B, `b = ${fmt(g.b)}`, "c2", 20);
  if (p.mostrar.a) lado(ctx, hits, v, B, C, A, `a = ${fmt(g.a)}`, "c1", 22);
  if (p.mostrar.legenda) {
    rodape(ctx, w, h, [
      { t: `b² + c² = ${fmt(g.soma)}` },
      { t: `−2bc · cos A = ${fmt(g.termo)}`, c: "c3" },
      { t: `a² = ${fmt(g.a2)}`, c: "c1" },
    ]);
  }
  return { alvos: [], vista: v };
}

// ---------- Lei dos senos ----------

function dSenos(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"senos">, cl: Ctl): GeoTri {
  const g = senos(p, cl);
  const hh = h - banda(2);
  const R = g.R;
  const v = criarVista(w, hh, { x0: -R - 0.3, x1: R + 0.3, y0: -R - 0.3, y1: R + 0.3 }, 18);
  const O = v.p(0, 0);
  ctx.beginPath();
  ctx.arc(O.x, O.y, R * v.k, 0, Math.PI * 2);
  ctx.fillStyle = palette.surface;
  ctx.fill();
  ctx.strokeStyle = palette.lineDark;
  ctx.lineWidth = 2;
  ctx.stroke();
  segMundo(ctx, v, { x: -R, y: 0 }, { x: R, y: 0 }, tinta("c4"), espessura(p.highlight, "c4", 3), [8, 6]);
  dot(ctx, O, 4, tinta("c4"));
  const { A, B, C } = g.pts;
  poligonoMundo(ctx, v, [A, B, C], tintaClara("c3"), palette.ink, 2);
  segMundo(ctx, v, B, C, tinta("c1"), espessura(p.highlight, "c1", 5));
  const dirA = (Math.atan2(B.y - A.y, B.x - A.x) * 180) / Math.PI;
  const dirA2 = (Math.atan2(C.y - A.y, C.x - A.x) * 180) / Math.PI;
  anguloMarcado(ctx, hits, v.q(A), Math.min(dirA, dirA2), Math.max(dirA, dirA2), 26, `${fmt(g.A, 0)}°`, "c3");
  lado(ctx, hits, v, B, C, A, `a = ${fmt(g.a)}`, "c1", 20);
  etiqueta(ctx, hits, v.p(R * 0.5, R * 0.1 + 0), `2R = ${fmt(g.dois_R)}`, "c4");
  rodape(ctx, w, h, [{ t: `a / sen A = ${fmt(g.a)} / ${fmt(Math.sin((g.A * Math.PI) / 180), 3)} = ${fmt(g.razao)}` }, { t: `2R = ${fmt(g.dois_R)}`, c: "c4" }]);
  return { alvos: [], vista: v };
}

// ---------- Ângulos de um triângulo ----------

const dirGraus = (de: Pt, para: Pt) => (Math.atan2(para.y - de.y, para.x - de.x) * 180) / Math.PI;

function dAngulos(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"angulos">, cl: Ctl, e: EstadoTri): GeoTri {
  const g = angulos(p, cl, e);
  const fechar = p.chaves.includes("fechar");
  const hh = h - (fechar ? 56 : 0);
  const caixa: Caixa = p.externo ? { x0: -4.2, x1: 6.2, y0: -0.9, y1: 6.5 } : { x0: -4.3, x1: 4.3, y0: -0.7, y1: 7 };
  const v = criarVista(w, hh, caixa, 14);
  const { C } = g;
  const A = BASE_A;
  const B = BASE_B;
  if (p.fantasma) poligonoMundo(ctx, v, [A, B, { x: 0, y: 3 * Math.sqrt(3) }], undefined, palette.lineDark, 2, [6, 6]);
  if (p.paralela) segMundo(ctx, v, { x: -4.2, y: C.y }, { x: 4.2, y: C.y }, palette.lineDark, 2, [8, 6]);
  poligonoMundo(ctx, v, [A, B, C], tintaClara("c4"), palette.ink, 3);
  if (p.externo) {
    segMundo(ctx, v, B, { x: 5.5, y: 0 }, palette.ink, 3);
    segMundo(ctx, v, B, { x: B.x + (C.x - A.x) * 0.5, y: B.y + (C.y - A.y) * 0.5 }, tinta("c1"), 2, [6, 5]);
    const aB = dirGraus(B, C);
    anguloMarcado(ctx, hits, v.q(B), 0, g.alfa, 30, `${fmt(g.alfa, 0)}°`, "c1");
    anguloMarcado(ctx, hits, v.q(B), g.alfa, aB, 30, `${fmt(g.gama, 0)}°`, "c2");
    anguloMarcado(ctx, hits, v.q(B), 0, aB, 64, `e = ${fmt(g.externo, 0)}°`, "c3", false);
  }
  const rA = 30;
  anguloMarcado(ctx, hits, v.q(A), 0, g.alfa, rA, p.ocultar.includes("alfa") ? null : `${fmt(g.alfa, 0)}°`, "c1");
  anguloMarcado(ctx, hits, v.q(B), 180 - g.beta, 180, p.externo ? 24 : rA, p.ocultar.includes("beta") ? null : `${fmt(g.beta, 0)}°`, "c1");
  const aCA = dirGraus(C, A);
  const aCB = dirGraus(C, B);
  const aEsq = 180;
  const cA = ((aCA % 360) + 360) % 360;
  const cB = ((aCB % 360) + 360) % 360;
  if (p.paralela) {
    anguloMarcado(ctx, hits, v.q(C), aEsq, cA, 26, `${fmt(g.alfa, 0)}°`, "c1");
    anguloMarcado(ctx, hits, v.q(C), cB, 360, 26, `${fmt(g.beta, 0)}°`, "c1");
  }
  anguloMarcado(ctx, hits, v.q(C), cA, cB, 24, p.ocultar.includes("gama") ? null : `${fmt(g.gama, 0)}°`, "c2");
  const alvos: Alvo[] = [];
  if (p.arrastavel && p.alfa === undefined) {
    const q = v.q(C);
    pegador(ctx, q, "ink");
    alvos.push({ id: "vertice", c: q, raio: 26 });
  }
  if (fechar) {
    const x0 = 20;
    const x1 = w - 20;
    const y = h - 28;
    const total = g.alfa + g.gama + g.beta;
    const partes: [number, "c1" | "c2", string][] = [[g.alfa, "c1", "α"], [g.gama, "c2", "γ"], [g.beta, "c1", "β"]];
    let x = x0;
    const ativo = e.chaves.has("fechar");
    for (const [val, cor, nome] of partes) {
      const largura = ((x1 - x0) * val) / total;
      const wid = ativo ? largura : (x1 - x0) / 3;
      ctx.fillStyle = tinta(cor);
      ctx.fillRect(x, y - 12, wid - 2, 24);
      nota(ctx, { x: x + wid / 2, y }, `${nome} ${fmt(val, 0)}°`, "ink", 13);
      x += wid;
    }
    if (ativo) nota(ctx, { x: w / 2, y: y - 22 }, `${fmt(total, 0)}° = meia-volta`, "c3", 14);
    ctx.fillStyle = palette.ink;
  }
  return { alvos, vista: v };
}

// ---------- Desigualdade triangular ----------

function dDesigualdade(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"desigualdade">, cl: Ctl): GeoTri {
  const g = desigualdade(p, cl);
  const xmax = Math.max(g.a, g.b) + 0.8;
  const xmin = Math.min(0, g.a - g.c) - 0.8;
  const ymax = Math.max(g.b, g.c, g.a / 2) * 0.9 + 0.8;
  const v = criarVista(w, h - banda(1), { x0: xmin, x1: xmax, y0: -1.2, y1: ymax }, 18);
  const A = { x: 0, y: 0 };
  const B = { x: g.a, y: 0 };
  segMundo(ctx, v, A, B, tinta("c4"), espessura(p.highlight, "c4", 5));
  dot(ctx, v.q(A), 6, tinta("c4"));
  dot(ctx, v.q(B), 6, tinta("c4"));
  let tipB: Pt;
  let tipC: Pt;
  if (g.cruzam && g.topo.y > 0.01) {
    poligonoMundo(ctx, v, [A, B, g.topo], tintaClara("c3"), undefined);
    tipB = g.topo;
    tipC = g.topo;
    segMundo(ctx, v, A, g.topo, tinta("c1"), espessura(p.highlight, "c1", 4));
    segMundo(ctx, v, B, g.topo, tinta("c2"), espessura(p.highlight, "c2", 4));
  } else {
    // Braços esticados em direção um ao outro (ou sobrepostos), ligeiramente afastados da base para aparecerem.
    const y = 0.35;
    tipB = { x: g.b, y };
    tipC = { x: g.a - g.c, y: -y };
    segMundo(ctx, v, A, tipB, tinta("c1"), espessura(p.highlight, "c1", 4));
    segMundo(ctx, v, B, tipC, tinta("c2"), espessura(p.highlight, "c2", 4));
    dot(ctx, v.q(tipB), 7, tinta("c1"));
    dot(ctx, v.q(tipC), 7, tinta("c2"));
  }
  etiqueta(ctx, hits, v.p(g.a / 2, -0.75), `a = ${fmt(g.a)}`, "c4");
  const topoRot = (pt: Pt, o: Pt, t: string, c: "c1" | "c2") => etiqueta(ctx, hits, ladoFora(v.q(o), v.q(pt), v.q({ x: g.a / 2, y: -3 }), 22), t, c);
  topoRot(tipB, A, `b = ${fmt(g.b)}`, "c1");
  topoRot(tipC, B, `c = ${fmt(g.c)}`, "c2");
  nota(ctx, { x: w / 2, y: h - 18 }, g.cruzam ? `b + c = ${fmt(g.b + g.c)} ≥ a = ${fmt(g.a)}: as pontas se encontram` : `b + c = ${fmt(g.b + g.c)} não alcança a = ${fmt(g.a)}: não fecha`, g.cruzam ? "c3" : "c4", 14);
  return { alvos: [], vista: v };
}

// ---------- Congruência ----------

function dCongruencia(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"congruencia">, e: EstadoTri): GeoTri {
  const [P0, P1, P2] = trianguloPorLados(p.lados);
  const ligada = [...e.chaves][e.chaves.size - 1];
  const k = ligada === "AAA" ? 1.5 : 1;
  const gap = 1.2;
  const largura = P1.x + gap + P1.x * k + 0.6;
  const altura = Math.max(P2.y, P2.y * k) + 0.6;
  const v = criarVista(w, h - banda(2), { x0: -0.3, x1: largura, y0: -0.5, y1: altura }, 16);
  const orig = [P0, P1, P2];
  const dx = P1.x + gap;
  const copia = orig.map((q) => ({ x: dx + q.x * k, y: q.y * k }));
  poligonoMundo(ctx, v, orig, tintaClara("c2"), tinta("c2"), espessura(p.highlight, "c2", 3));
  poligonoMundo(ctx, v, copia, ligada ? tintaClara("c1") : undefined, ligada ? tinta("c1") : palette.lineDark, 3, ligada ? undefined : [6, 6]);
  const [l0, l1, l2] = p.lados;
  const sides = [
    [0, 1, l0],
    [0, 2, l1],
    [1, 2, l2],
  ] as const;
  const marcarLado = (idx: number) => {
    const [i, j, val] = sides[idx];
    for (const t of [orig, copia]) {
      const centro = { x: (t[0].x + t[1].x + t[2].x) / 3, y: (t[0].y + t[1].y + t[2].y) / 3 };
      const lv = t === copia ? val * k : val;
      lado(ctx, hits, v, t[i], t[j], centro, fmt(lv, t === copia && k !== 1 ? 1 : 0), "c3", 18);
    }
  };
  const marcarAngulo = (i: number) => {
    for (const t of [orig, copia]) {
      const o = t[i];
      const a = t[(i + 1) % 3];
      const b = t[(i + 2) % 3];
      const d1 = dirGraus(o, a);
      const d2 = dirGraus(o, b);
      const ang = anguloEm(o, a, b);
      const lo = ((d1 % 360) + 360) % 360;
      const hi = ((d2 % 360) + 360) % 360;
      const [x0, x1] = (hi - lo + 360) % 360 <= 180 ? [lo, hi] : [hi, lo];
      anguloMarcado(ctx, hits, v.q(o), x0, x1, 22, `${fmt(ang, 0)}°`, "c4");
    }
  };
  if (ligada === "LLL") [0, 1, 2].forEach(marcarLado);
  if (ligada === "LAL") {
    marcarLado(0);
    marcarLado(1);
    marcarAngulo(0);
  }
  if (ligada === "ALA") {
    marcarAngulo(0);
    marcarAngulo(1);
    marcarLado(0);
  }
  if (ligada === "AAA") [0, 1, 2].forEach(marcarAngulo);
  const texto = !ligada
    ? ["Ligue um critério para copiar o triângulo."]
    : congruente(ligada)
      ? [`${ligada}: o triângulo fica travado,`, "a cópia é idêntica (congruente)."]
      : ["AAA: os ângulos são iguais,", "mas a cópia pode crescer (só semelhante)."];
  texto.forEach((t, i) => nota(ctx, { x: w / 2, y: h - banda(2) + 14 + i * ALT_LINHA }, t, ligada && !congruente(ligada) ? "c4" : "c3", 14));
  return { alvos: [], vista: v };
}

// ---------- Notáveis ----------

function dNotaveis(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"notaveis">, cl: Ctl): GeoTri {
  const g = notaveis(p, cl);
  const hl = p.highlight;
  if (p.figura === "quadrado") {
    const L = Math.max(g.L, 0.05);
    const v = criarVista(w, h - banda(1), { x0: -0.4, x1: L + 0.4, y0: -0.4, y1: L + 0.4 }, 26);
    if (p.fantasma && L > 1.05) {
      poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], undefined, palette.muted, 2, [5, 5]);
      segMundo(ctx, v, { x: 0, y: 0 }, { x: 1, y: 1 }, palette.muted, 2, [5, 5]);
    }
    poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: L }, { x: 0, y: L }], palette.surface, palette.ink, 3);
    if (p.diagonal) {
      poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: L }], tintaClara("c1"), undefined);
      segMundo(ctx, v, { x: 0, y: 0 }, { x: L, y: L }, tinta("c1"), espessura(hl, "c1", 4));
      retoNoMundo(ctx, v, { x: L, y: 0 }, { x: 0, y: 0 }, { x: L, y: L });
      anguloMarcado(ctx, hits, v.p(0, 0), 0, 45, 30, "45°", "c3");
      anguloMarcado(ctx, hits, v.p(L, L), 180, 225, 30, "45°", "c3");
      etiqueta(ctx, hits, v.p(L * 0.36, L * 0.62), `d = ${fmt(g.d)}`, "c1");
    }
    lado(ctx, hits, v, { x: 0, y: 0 }, { x: L, y: 0 }, { x: L / 2, y: L }, `L = ${fmt(L)}`, "c2", 20);
    if (p.legenda) nota(ctx, { x: w / 2, y: h - 18 }, `d = L · √2 = ${fmt(L)}√2 ≈ ${fmt(g.d)}`, "c1", 14);
    return { alvos: [], vista: v };
  }
  if (p.figura === "equilatero") {
    const L = Math.max(g.L, 0.05);
    const v = criarVista(w, h - banda(1), { x0: -0.4, x1: L + 0.4, y0: -0.5, y1: g.h + 0.5 }, 26);
    const A = { x: 0, y: 0 };
    const B = { x: L, y: 0 };
    const C = { x: L / 2, y: g.h };
    const M = { x: L / 2, y: 0 };
    const cortado = g.cortar >= 1;
    poligonoMundo(ctx, v, [A, B, C], palette.surface, palette.ink, 3);
    if (cortado) {
      poligonoMundo(ctx, v, [M, B, C], tintaClara("c3"), undefined);
      segMundo(ctx, v, M, C, tinta("c3"), espessura(hl, "c3", 4), [8, 5]);
      retoNoMundo(ctx, v, M, B, C);
      anguloMarcado(ctx, hits, v.q(B), 120, 180, 30, "60°", "c1");
      anguloMarcado(ctx, hits, v.q(C), 240, 270, 36, "30°", "c1");
      lado(ctx, hits, v, M, B, C, `L/2 = ${fmt(L / 2)}`, "c2", 18);
      etiqueta(ctx, hits, v.p(L / 2, g.h / 2), `h = ${fmt(g.h)}`, "c3");
      lado(ctx, hits, v, B, C, A, `L = ${fmt(L)}`, "c1", 22);
    } else {
      for (const [q, a0, a1] of [[A, 0, 60], [B, 120, 180], [C, 240, 300]] as const) anguloMarcado(ctx, hits, v.q(q), a0, a1, 28, "60°", "c1");
      lado(ctx, hits, v, A, B, C, `L = ${fmt(L)}`, "c2", 20);
    }
    if (p.legenda) nota(ctx, { x: w / 2, y: h - 18 }, `h = L · √3 / 2 = ${fmt(g.h)}`, "c3", 14);
    return { alvos: [], vista: v };
  }
  // Mediatriz com compasso: círculos de mesmo raio em A e B.
  const m = p.ab / 2;
  const R = Math.max(g.raio, p.ab * 0.85);
  const v = criarVista(w, h - banda(1), { x0: -m - R - 0.2, x1: m + R + 0.2, y0: -R - 0.2, y1: R + 0.2 }, 14);
  const A = { x: -m, y: 0 };
  const B = { x: m, y: 0 };
  segMundo(ctx, v, A, B, palette.ink, 3);
  for (const [centro, cor] of [[A, "c1"], [B, "c2"]] as const) {
    const q = v.q(centro);
    ctx.beginPath();
    ctx.arc(q.x, q.y, g.raio * v.k, 0, Math.PI * 2);
    ctx.setLineDash([7, 6]);
    ctx.strokeStyle = tinta(cor);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (g.cruzam) {
    const P = { x: 0, y: g.altura_compasso };
    const Q = { x: 0, y: -g.altura_compasso };
    segMundo(ctx, v, P, Q, tinta("c4"), espessura(hl, "c4", 4));
    dot(ctx, v.q(P), 5, tinta("c4"));
    dot(ctx, v.q(Q), 5, tinta("c4"));
    retoNoMundo(ctx, v, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, 10);
    etiqueta(ctx, hits, v.p(0.0, R * 0.55), "mediatriz", "c4");
  }
  dot(ctx, v.q(A), 6, palette.ink);
  dot(ctx, v.q(B), 6, palette.ink);
  nota(ctx, v.p(-m, -0.55), "A", "ink", 15);
  nota(ctx, v.p(m, -0.55), "B", "ink", 15);
  nota(ctx, { x: w / 2, y: h - 18 }, g.cruzam ? `r = ${fmt(g.raio)} > AB/2 = ${fmt(m)}: os círculos se cruzam` : `r = ${fmt(g.raio)} ≤ AB/2 = ${fmt(m)}: ainda não se cruzam`, g.cruzam ? "c4" : "ink", 14);
  return { alvos: [], vista: v };
}

// ---------- Semelhança ----------

function dSemelhanca(ctx: G, w: number, h: number, hits: Hit[], p: TrianguloDe<"semelhanca">, cl: Ctl, e: EstadoTri): GeoTri {
  const g = semelhanca(p, cl, e);
  const hl = p.highlight;
  if (p.variante === "tales") {
    const T = p.esq;
    const v = criarVista(w, h - banda(1), { x0: -1.6, x1: 8.4, y0: -0.4, y1: T + 0.4 }, 20);
    const yMid = T - g.tales.esq[0];
    const ys = [T, yMid, 0];
    const xe = (y: number) => (-1 * (T - y)) / T; // transversal da esquerda: de (0, T) a (−1, 0)
    const xd = (y: number) => 6 + (2 * (T - y)) / T; // da direita: de (6, T) a (8, 0)
    segMundo(ctx, v, { x: xe(T), y: T }, { x: xe(0), y: 0 }, palette.ink, 3);
    segMundo(ctx, v, { x: xd(T), y: T }, { x: xd(0), y: 0 }, palette.ink, 3);
    ys.forEach((y, i) => segMundo(ctx, v, { x: xe(y) - 0.5, y }, { x: xd(y) + 0.5, y }, i === 1 ? tinta("c4") : palette.ink2, i === 1 ? espessura(hl, "c4", 4) : 3));
    const [e1, e2] = g.tales.esq;
    const [d1, d2] = g.tales.dir;
    const mid = (a: number, b: number) => (a + b) / 2;
    if (e1 > 0) etiqueta(ctx, hits, v.p(xe(mid(T, yMid)) - 0.5, mid(T, yMid)), p.incognita === "e1" ? "x" : fmt(e1), "c1");
    if (e2 > 0) etiqueta(ctx, hits, v.p(xe(mid(yMid, 0)) - 0.5, mid(yMid, 0)), p.incognita === "e2" ? "x" : fmt(e2), "c1");
    if (d1 > 0) etiqueta(ctx, hits, v.p(xd(mid(T, yMid)) + 0.7, mid(T, yMid)), p.incognita === "d1" ? "x" : fmt(d1), "c2");
    if (d2 > 0) etiqueta(ctx, hits, v.p(xd(mid(yMid, 0)) + 0.7, mid(yMid, 0)), p.incognita === "d2" ? "x" : fmt(d2), "c2");
    if (p.legenda) nota(ctx, { x: w / 2, y: h - 18 }, `${fmt(e1)} / ${fmt(e2)} = ${fmt(d1)} / ${fmt(d2)}`, "c4", 15);
    return { alvos: [], vista: v };
  }
  if (p.variante === "sombras") {
    const [hb, sb] = p.bastao;
    const x1 = 4.5;
    const total = x1 + p.sombra_poste + 0.8;
    const v = criarVista(w, h - banda(1), { x0: -0.8, x1: total, y0: -0.5, y1: g.sombras.H + 0.6 }, 14);
    eixoX(ctx, v, -0.8, total);
    const bas = [{ x: 0, y: 0 }, { x: sb, y: 0 }, { x: 0, y: hb }];
    const pos = [{ x: x1, y: 0 }, { x: x1 + p.sombra_poste, y: 0 }, { x: x1, y: g.sombras.H }];
    poligonoMundo(ctx, v, pos, tintaClara("c1"), tinta("c1"), espessura(hl, "c1", 3));
    poligonoMundo(ctx, v, bas, tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 3));
    segMundo(ctx, v, bas[2], bas[1], tinta("c3"), 3, [6, 5]);
    segMundo(ctx, v, pos[2], pos[1], tinta("c3"), 3, [6, 5]);
    if (g.sombras.sobrepor) {
      const fim = x1 + p.sombra_poste;
      const sob = [{ x: fim - sb, y: 0 }, { x: fim, y: 0 }, { x: fim - sb, y: hb }];
      poligonoMundo(ctx, v, sob, undefined, tinta("c2"), 3, [5, 4]);
      etiqueta(ctx, hits, v.p(fim - sb * 0.7, hb + 0.8), `razão ${fmt(p.sombra_poste / sb)}`, "c4");
    }
    etiqueta(ctx, hits, v.p(-0.45, hb / 2), fmt(hb), "c2");
    etiqueta(ctx, hits, v.p(sb / 2, -0.3), fmt(sb), "c2");
    etiqueta(ctx, hits, v.p(x1 - 0.55, g.sombras.H / 2), g.sombras.sobrepor ? `H = ${fmt(g.sombras.H)}` : "H", "c1");
    etiqueta(ctx, hits, v.p(x1 + p.sombra_poste / 2, -0.3), fmt(p.sombra_poste), "c1");
    nota(ctx, { x: w / 2, y: h - 18 }, g.sombras.sobrepor ? `H / ${fmt(hb)} = ${fmt(p.sombra_poste)} / ${fmt(sb)}, então H = ${fmt(g.sombras.H)}` : "Os raios do sol são paralelos: ligue 'sobrepor'.", "c3", 14);
    return { alvos: [], vista: v };
  }
  // Paralela à base
  const [P0, P1, P2] = g.pts;
  const xs = [P0.x, P1.x, P2.x];
  const v = criarVista(w, h - banda(1), { x0: Math.min(...xs) - 0.8, x1: Math.max(...xs) + 0.8, y0: -0.8, y1: P2.y + 0.8 }, 18);
  poligonoMundo(ctx, v, [P0, P1, P2], tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 3));
  if (g.k < 0.995 || !g.paralelo) {
    poligonoMundo(ctx, v, [P2, g.Q0, g.Q1], tintaClara("c1"), tinta("c1"), espessura(hl, "c1", 4));
  }
  segMundo(ctx, v, g.Q0, g.Q1, tinta("c1"), espessura(hl, "c1", 4));
  anguloMarcado(ctx, hits, v.q(P0), 0, g.angP0, 26, `${fmt(g.angP0, 0)}°`, "c3");
  anguloMarcado(ctx, hits, v.q(g.Q0), 0 + (g.giro % 360), dirGraus(g.Q0, P2), 22, `${fmt(g.angQ0, 0)}°`, "c3", false);
  etiqueta(ctx, hits, v.p((P0.x + P1.x) / 2, -0.45), `k = ${fmt(g.k)}`, "c4");
  nota(ctx, { x: w / 2, y: h - 18 }, g.paralelo ? `corte ${fmt(g.corte)} / base ${fmt(g.base)} = ${fmt(g.razao)}` : "Corte torto: os ângulos não coincidem, não é semelhante.", g.paralelo ? "c4" : "ink", 14);
  return { alvos: [], vista: v };
}
