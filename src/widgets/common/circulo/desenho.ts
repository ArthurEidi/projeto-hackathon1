// Desenho do widget geometria_circulo, um desenhista por modo. A matemática vem de calc.ts.
import { palette } from "../../../ui/palette";
import { dot, seg, type Hit, type Pt } from "../../canvas";
import {
  arco,
  criarVista,
  espessura,
  etiqueta,
  fmt,
  nota,
  pegador,
  poligonoMundo,
  polar,
  rad,
  segMundo,
  setor,
  tinta,
  tintaClara,
  tintaEscura,
  type Alvo,
  type Vista,
} from "../geo/base";
import { arcos, fatias, roda, setoresRearranjados, type Ctl, type EstadoCirc } from "./calc";
import type { Circulos, CirculoDe } from "./params";

type G = CanvasRenderingContext2D;
export interface GeoCirc {
  alvos: Alvo[];
  vista: Vista;
}

const ALT_LINHA = 19;
const banda = (n: number) => n * ALT_LINHA + 12;
function rodape(ctx: G, w: number, h: number, linhas: { t: string; c?: Parameters<typeof nota>[3] }[]) {
  linhas.forEach((l, i) => nota(ctx, { x: w / 2, y: h - banda(linhas.length) + 14 + i * ALT_LINHA }, l.t, l.c ?? "ink", 14));
}
const dirGraus = (de: Pt, para: Pt) => (Math.atan2(para.y - de.y, para.x - de.x) * 180) / Math.PI;
const mod360 = (a: number) => ((a % 360) + 360) % 360;
const DOIS_PI = 2 * Math.PI;
const circulo = (ctx: G, c: Pt, r: number, fill?: string, stroke?: string, lw = 2) => {
  ctx.beginPath();
  ctx.arc(c.x, c.y, r, 0, DOIS_PI);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
};

export function aspectoCirculo(p: Circulos): number {
  switch (p.modo) {
    case "arcos":
      return p.mostrar.medidas ? 1 : 0.92;
    case "roda":
      return p.variante === "giro" || p.variante === "razao" ? 0.62 : 0.78;
    case "fatias":
      return p.variante === "disco" ? 0.98 : 0.9;
  }
}

export function desenharCirculo(ctx: G, w: number, h: number, hits: Hit[], p: Circulos, c: Ctl, e: EstadoCirc): GeoCirc {
  switch (p.modo) {
    case "arcos":
      return dArcos(ctx, w, h, hits, p, c, e);
    case "roda":
      return dRoda(ctx, w, h, hits, p, c);
    case "fatias":
      return dFatias(ctx, w, h, hits, p, c);
  }
}

// ---------- Arcos e ângulos ----------

function dArcos(ctx: G, w: number, h: number, hits: Hit[], p: CirculoDe<"arcos">, cl: Ctl, e: EstadoCirc): GeoCirc {
  const g = arcos(p, cl, e);
  const m = p.mostrar;
  const hl = p.highlight;
  const hh = h - (m.medidas ? banda(1) : 0);
  const v = criarVista(w, hh, { x0: -1.5, x1: 1.5, y0: -1.5, y1: 1.5 }, 10);
  const O = v.p(0, 0);
  const R = v.k;
  circulo(ctx, O, R, palette.surface, palette.ink, 3);
  const A = v.q(g.A);
  const B = v.q(g.B);
  const V = v.q(g.V);
  // Triângulos isósceles O A V e O V B.
  if (m.isosceles) {
    poligonoMundo(ctx, v, [{ x: 0, y: 0 }, g.A, g.V], tintaClara("c3"), undefined);
    poligonoMundo(ctx, v, [{ x: 0, y: 0 }, g.V, g.B], tintaClara("c2"), undefined);
    segMundo(ctx, v, { x: 0, y: 0 }, g.V, palette.ink2, 2, [6, 5]);
  }
  // Ângulo central e raios.
  if (m.central && g.alfa > 1e-6) {
    arco(ctx, O, R * 0.22, g.inicio, g.inicio + g.alfa, tinta("c2"), 3, tintaClara("c2"));
    segMundo(ctx, v, { x: 0, y: 0 }, g.A, tinta("c2"), espessura(hl, "c2", 3));
    segMundo(ctx, v, { x: 0, y: 0 }, g.B, tinta("c2"), espessura(hl, "c2", 3));
    const mid = rad(g.inicio + g.alfa / 2);
    etiqueta(ctx, hits, { x: O.x + Math.cos(mid) * R * 0.5, y: O.y - Math.sin(mid) * R * 0.5 }, `${fmt(g.alfa, 0)}°`, "c2");
  }
  if (m.corda) segMundo(ctx, v, g.A, g.B, tinta("c4"), espessura(hl, "c4", 4));
  // Ângulo inscrito em V.
  if (m.inscrito) {
    segMundo(ctx, v, g.V, g.A, tinta("c3"), espessura(hl, "c3", 3));
    segMundo(ctx, v, g.V, g.B, tinta("c3"), espessura(hl, "c3", 3));
    const dA = dirGraus(g.V, g.A);
    const dB = dirGraus(g.V, g.B);
    const diff = mod360(dB - dA);
    const [a0, a1] = diff <= 180 ? [dA, dA + diff] : [dB, dB + (360 - diff)];
    if (g.reto) {
      const ua = { x: Math.cos(rad(dA)), y: -Math.sin(rad(dA)) };
      const ub = { x: Math.cos(rad(dB)), y: -Math.sin(rad(dB)) };
      const p1 = { x: V.x + ua.x * 14, y: V.y + ua.y * 14 };
      const p2 = { x: p1.x + ub.x * 14, y: p1.y + ub.y * 14 };
      const p3 = { x: V.x + ub.x * 14, y: V.y + ub.y * 14 };
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.strokeStyle = palette.ink2;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else arco(ctx, V, 24, a0, a1, tinta("c3"), 3, tintaClara("c3"));
    const mid = rad((a0 + a1) / 2);
    etiqueta(ctx, hits, { x: V.x + Math.cos(mid) * 48, y: V.y - Math.sin(mid) * 48 }, `${fmt(g.inscrito, 0)}°`, "c3");
  }
  // Arco AB.
  if (m.arco && g.alfa > 1e-6) arco(ctx, O, R, g.inicio, g.inicio + g.alfa, tinta("c1"), espessura(hl, "c1", 7));
  dot(ctx, O, 4, palette.ink);
  for (const [q, nome] of [[A, "A"], [B, "B"]] as const) {
    dot(ctx, q, 6, palette.ink);
    const a = nome === "A" ? g.inicio : g.inicio + g.alfa;
    nota(ctx, { x: q.x + Math.cos(rad(a)) * 16, y: q.y - Math.sin(rad(a)) * 16 }, nome, "ink", 16);
  }
  if (m.inscrito || p.arrastaveis.includes("V")) {
    dot(ctx, V, 6, palette.ink);
    nota(ctx, { x: V.x + Math.cos(rad(g.posV)) * 16, y: V.y - Math.sin(rad(g.posV)) * 16 }, "V", "ink", 16);
  }
  const alvos: Alvo[] = [];
  if (p.arrastaveis.includes("B")) {
    pegador(ctx, B, "c2");
    alvos.push({ id: "B", c: B, raio: 26 });
  }
  if (p.arrastaveis.includes("V")) {
    pegador(ctx, V, "c3");
    alvos.push({ id: "V", c: V, raio: 26 });
  }
  if (m.medidas) {
    const partes = [`arco AB = ${fmt(g.arco, 0)}°`];
    if (m.central) partes.push(`central = ${fmt(g.central, 0)}°`);
    if (m.inscrito) partes.push(`inscrito = ${fmt(g.inscrito, 0)}°`);
    rodape(ctx, w, h, [{ t: partes.join(" · "), c: m.inscrito ? "c3" : "c2" }]);
  }
  return { alvos, vista: v };
}

// ---------- Roda ----------

function dRoda(ctx: G, w: number, h: number, hits: Hit[], p: CirculoDe<"roda">, cl: Ctl): GeoCirc {
  const g = roda(p, cl);
  const hl = p.highlight;
  const un = p.unidade ? ` ${p.unidade}` : "";
  const vazio = { alvos: [] as Alvo[], vista: criarVista(w, h, { x0: 0, x1: 1, y0: 0, y1: 1 }) };
  if (p.variante === "arco") {
    // Círculo em cima e, embaixo, a volta inteira desenrolada com o arco L em destaque.
    const hh = h - 64;
    const v = criarVista(w, hh, { x0: -g.raioArco - 0.5, x1: g.raioArco + 0.5, y0: -g.raioArco - 0.5, y1: g.raioArco + 0.5 }, 10);
    const O = v.p(0, 0);
    circulo(ctx, O, g.raioArco * v.k, palette.surface, palette.ink, 2);
    if (g.alfa > 0) {
      setor(ctx, O, g.raioArco * v.k, 0, g.alfa, tintaClara("c4"), undefined);
      arco(ctx, O, g.raioArco * v.k, 0, g.alfa, tinta("c4"), espessura(hl, "c4", 6));
    }
    segMundo(ctx, v, { x: 0, y: 0 }, { x: g.raioArco, y: 0 }, tinta("c1"), espessura(hl, "c1", 4));
    etiqueta(ctx, hits, v.p(g.raioArco / 2, -0.35 * Math.max(1, g.raioArco / 3)), `r = ${fmt(g.raioArco)}`, "c1");
    dot(ctx, O, 4, palette.ink);
    if (g.alfa > 0) {
      const m = rad(g.alfa / 2);
      etiqueta(ctx, hits, { x: O.x + Math.cos(m) * g.raioArco * v.k * 0.55, y: O.y - Math.sin(m) * g.raioArco * v.k * 0.55 }, `${fmt(g.alfa, 0)}°`, "c4");
    }
    // Barra da volta inteira desenrolada (cinza) e do arco L (c4).
    const x0 = 16;
    const x1 = w - 16;
    const y = h - 36;
    ctx.fillStyle = palette.surface;
    ctx.fillRect(x0, y - 8, x1 - x0, 16);
    ctx.fillStyle = tinta("c4");
    ctx.fillRect(x0, y - 8, ((x1 - x0) * Math.max(0, Math.min(360, g.alfa))) / 360, 16);
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(x0, y - 8, x1 - x0, 16);
    nota(ctx, { x: w / 2, y: y + 22 }, `C = 2πr = ${fmt(g.voltaCompleta)}${un}   ·   L = ${fmt(g.comprimentoArco)}${un}`, "c4", 14);
    return { ...vazio, vista: v };
  }
  if (p.variante === "voltas") {
    // Uma roda e, ao lado, o percurso feito em voltas: cada trecho vale uma circunferência.
    const rpx = Math.min(34, h * 0.18);
    const cx = rpx + 14;
    const cy = 20 + rpx;
    circulo(ctx, { x: cx, y: cy }, rpx, tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 3));
    seg(ctx, { x: cx - rpx - 8, y: cy + rpx }, { x: cx + rpx + 8, y: cy + rpx }, palette.ink, 3);
    nota(ctx, { x: cx, y: cy }, `d = ${fmt(g.d)}`, "c2", 13);
    const x0 = 16;
    const x1 = w - 16;
    const y = cy + rpx + 52;
    const total = p.voltas_max;
    const n = Math.max(0, Math.min(total, g.voltas));
    const larg = (x1 - x0) / total;
    for (let i = 0; i < total; i++) {
      ctx.fillStyle = i < Math.floor(n + 1e-9) ? tinta("c3") : palette.surface;
      ctx.fillRect(x0 + i * larg, y - 14, larg - 2, 28);
    }
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(x0, y - 14, x1 - x0, 28);
    nota(ctx, { x: x0 + 14, y: y + 30 }, "0", "muted", 12);
    nota(ctx, { x: x1 - 24, y: y + 30 }, `${fmt(total * g.C)}${un}`, "muted", 12);
    nota(ctx, { x: w / 2, y: y - 36 }, `cada trecho = 1 volta = C = π · d = ${fmt(g.C)}${un}`, "c3", 14);
    nota(ctx, { x: w / 2, y: h - 26 }, `${fmt(g.voltas, 0)} ${g.voltas === 1 ? "volta" : "voltas"} → ${fmt(g.voltas, 0)} · ${fmt(g.C)} = ${fmt(g.percurso)}${un}`, "c3", 15);
    return vazio;
  }
  // giro e razão: pista graduada com 1, 2, 3 e π.
  const xmax = Math.max(4.4, Math.PI * g.d + 0.8);
  const ymax = Math.max(g.d, 1) + 0.5;
  const v = criarVista(w, h - banda(1), { x0: -0.8, x1: xmax, y0: -1.2, y1: ymax }, 12);
  segMundo(ctx, v, { x: -0.3, y: 0 }, { x: xmax - 0.2, y: 0 }, palette.ink, 3);
  for (let i = 0; i <= Math.floor(xmax - 0.2); i++) {
    segMundo(ctx, v, { x: i, y: 0 }, { x: i, y: -0.15 }, palette.ink, 2);
    nota(ctx, v.p(i, -0.38), String(i), "muted", 12);
  }
  segMundo(ctx, v, { x: Math.PI, y: 0 }, { x: Math.PI, y: -0.28 }, tinta("c3"), 3);
  nota(ctx, v.p(Math.PI, -0.62), "π", "c3", 14);
  const r = g.d / 2;
  if (p.variante === "razao") {
    // Roda de diâmetro 1 (cinza) e a roda d, cada uma com a volta inteira desenrolada.
    circulo(ctx, v.p(0.5, 0.5), 0.5 * v.k, undefined, palette.muted, 2);
    segMundo(ctx, v, { x: 0, y: -0.92 }, { x: Math.PI, y: -0.92 }, palette.muted, 4);
    const cc = v.p(r, r);
    circulo(ctx, cc, r * v.k, tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 3));
    segMundo(ctx, v, { x: 0, y: r }, { x: g.d, y: r }, tinta("c2"), espessura(hl, "c2", 4));
    segMundo(ctx, v, { x: r, y: r }, { x: r + r * Math.cos(rad(40)), y: r + r * Math.sin(rad(40)) }, tinta("c1"), 3);
    etiqueta(ctx, hits, v.p(r, r), `d = ${fmt(g.d)}`, "c2");
    segMundo(ctx, v, { x: 0, y: -1.08 }, { x: g.C, y: -1.08 }, tinta("c3"), espessura(hl, "c3", 6));
    etiqueta(ctx, hits, v.p(Math.max(g.C / 2, 1.2), -0.72), `C = ${fmt(g.C)}${un}`, "c3");
    rodape(ctx, w, h, [{ t: `C / d = ${fmt(g.C)} / ${fmt(g.d)} = ${fmt(g.razao)}`, c: "c3" }]);
    return { alvos: [], vista: v };
  }
  // giro: a roda rola e o ponto do contato deixa o rastro C na pista.
  const s = g.rolado;
  const centro = { x: s, y: r };
  const fi = -90 - g.giro;
  const ponto = { x: centro.x + r * Math.cos(rad(fi)), y: centro.y + r * Math.sin(rad(fi)) };
  if (s > 1e-9) segMundo(ctx, v, { x: 0, y: -0.02 }, { x: s, y: -0.02 }, tinta("c3"), espessura(hl, "c3", 7));
  circulo(ctx, v.q(centro), r * v.k, tintaClara("c2"), tinta("c2"), espessura(hl, "c2", 3));
  segMundo(ctx, v, centro, ponto, tinta("c3"), 3);
  dot(ctx, v.q(ponto), 6, tinta("c3"));
  dot(ctx, v.p(0, 0), 5, tinta("c3"));
  etiqueta(ctx, hits, v.q(centro), `d = ${fmt(g.d)}`, "c2");
  if (g.giro >= 360 - 1e-9) etiqueta(ctx, hits, v.p(s / 2, -0.95), `C = ${fmt(g.C)}${un}`, "c3");
  rodape(ctx, w, h, [{ t: g.giro >= 360 - 1e-9 ? `uma volta = C = π · d = ${fmt(g.C)}` : `girou ${fmt(g.giro, 0)}°: andou ${fmt(g.rolado)}${un}`, c: "c3" }]);
  return { alvos: [], vista: v };
}

// ---------- Fatias, setor e coroa ----------

function dFatias(ctx: G, w: number, h: number, hits: Hit[], p: CirculoDe<"fatias">, cl: Ctl): GeoCirc {
  const g = fatias(p, cl);
  const hl = p.highlight;
  if (p.variante === "setor") {
    const v = criarVista(w, h - banda(2), { x0: -g.r - 0.5, x1: g.r + 0.5, y0: -g.r - 0.5, y1: g.r + 0.5 }, 12);
    const O = v.p(0, 0);
    circulo(ctx, O, g.r * v.k, palette.surface, palette.lineDark, 2);
    arco(ctx, O, g.r * v.k, 0, 360, palette.lineDark, 2, undefined, [6, 5]);
    if (g.alfa > 0) setor(ctx, O, g.r * v.k, 0, g.alfa, tintaClara("c3"), tinta("c3"), espessura(hl, "c3", 3));
    if (g.alfa > 0 && g.alfa < 360) {
      segMundo(ctx, v, { x: 0, y: 0 }, { x: g.r, y: 0 }, tinta("c3"), 3);
      segMundo(ctx, v, { x: 0, y: 0 }, polar(g.r, g.alfa), tinta("c3"), 3);
    }
    etiqueta(ctx, hits, v.q(polar(g.r * 0.5, Math.min(g.alfa, 359) / 2)), `${fmt(g.alfa, 0)}°`, "c3");
    etiqueta(ctx, hits, v.p(g.r / 2, -g.r * 0.12), `r = ${fmt(g.r)}`, "c1");
    rodape(ctx, w, h, [
      { t: `volta inteira: π · r² = ${fmt(g.r * g.r)}π`, c: "muted" },
      { t: `setor: ${fmt(g.alfa, 0)}° / 360° · ${fmt(g.r * g.r)}π = ${fmt(g.coefSetor)}π`, c: "c3" },
    ]);
    return { alvos: [], vista: v };
  }
  if (p.variante === "coroa") {
    const v = criarVista(w, h - banda(1), { x0: -g.R - 0.4, x1: g.R + 0.4, y0: -g.R - 0.4, y1: g.R + 0.4 }, 12);
    const O = v.p(0, 0);
    circulo(ctx, O, g.R * v.k, tintaClara("c4"), palette.ink, 3);
    if (g.furo > 0) circulo(ctx, O, g.furo * v.k, palette.bg, tinta("c4"), espessura(hl, "c4", 4));
    segMundo(ctx, v, { x: 0, y: 0 }, { x: g.R, y: 0 }, tinta("c1"), 3);
    etiqueta(ctx, hits, v.p(g.R * 0.72, g.R * 0.1), `R = ${fmt(g.R)}`, "c1");
    if (g.furo > 0) etiqueta(ctx, hits, v.p(-g.furo / 2 - g.R * 0.04, g.furo * 0.1), `r = ${fmt(g.furo)}`, "c4");
    dot(ctx, O, 4, palette.ink);
    rodape(ctx, w, h, [{ t: `A = π · (R² − r²) = π · (${fmt(g.R * g.R)} − ${fmt(g.furo * g.furo)}) = ${fmt(g.coefCoroa)}π`, c: "c4" }]);
    return { alvos: [], vista: v };
  }
  // Disco: N setores rearranjados em fila; a base tende a πr e a altura é r.
  const r = g.r;
  const caixa = { x0: -0.25 * r, x1: 3.6 * r, y0: -0.5 * r, y1: 3.5 * r };
  const v = criarVista(w, h - banda(1), caixa, 10);
  const centro = { x: 1.7 * r, y: 2.45 * r };
  const O = v.q(centro);
  for (let i = 0; i < g.N; i++) {
    const a0 = (360 * i) / g.N;
    setor(ctx, O, r * v.k, a0, a0 + 360 / g.N, tintaClara(i % 2 ? "c2" : "c1"), palette.ink2, 1.5);
  }
  circulo(ctx, O, r * v.k, undefined, palette.ink, 3);
  segMundo(ctx, v, centro, { x: centro.x + r, y: centro.y }, tinta("c1"), 3);
  etiqueta(ctx, hits, v.p(centro.x + r / 2, centro.y + r * 0.16), `r = ${fmt(r)}`, "c1");
  const x0 = (3.14159 * r - (g.N + 1) * r * Math.sin(Math.PI / g.N)) / 2 + 0.2 * r;
  const pecas = setoresRearranjados(r, g.N);
  pecas.forEach((pts, i) => poligonoMundo(ctx, v, pts.map((q) => ({ x: q.x + x0, y: q.y })), tintaClara(i % 2 ? "c2" : "c1"), palette.ink2, 1.5));
  const baseLarg = g.N * r * Math.sin(Math.PI / g.N);
  segMundo(ctx, v, { x: x0 + r * Math.sin(Math.PI / g.N), y: -0.12 * r }, { x: x0 + r * Math.sin(Math.PI / g.N) + baseLarg, y: -0.12 * r }, tinta("c2"), espessura(hl, "c2", 4));
  etiqueta(ctx, hits, v.p(x0 + r * Math.sin(Math.PI / g.N) + baseLarg / 2, -0.38 * r), `${fmt(g.razaoBase * 100, 0)}% de πr`, "c2");
  etiqueta(ctx, hits, v.p(x0 - 0.02 * r, r * 0.5), `r`, "c1");
  rodape(ctx, w, h, [{ t: `${g.N} setores: base ≈ πr, altura r, área ≈ πr · r = π r² = ${fmt(r * r)}π`, c: "c3" }]);
  return { alvos: [], vista: v };
}

void [tintaEscura];
