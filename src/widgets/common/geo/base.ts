// Base comum dos widgets de geometria (triângulo, ciclo, polígono, círculo). Sem React.
// Coordenadas do mundo: x para a direita e y para cima; a Vista converte para pixels (escala única nos dois eixos).
import { corDoTraco, ehMarca, type CorTraco } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { chip, seg, text, type Hit, type Pt, type Rect } from "../../canvas";

export const rad = (g: number) => (g * Math.PI) / 180;
export const graus = (r: number) => (r * 180) / Math.PI;
export const arred = (v: number, passo: number) => Math.round(v / passo) * passo;
export const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
export const mais = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
export const menos = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y });
export const vezes = (a: Pt, k: number): Pt => ({ x: a.x * k, y: a.y * k });
export const polar = (r: number, grau: number, o: Pt = { x: 0, y: 0 }): Pt => ({ x: o.x + r * Math.cos(rad(grau)), y: o.y + r * Math.sin(rad(grau)) });
/** Gira p em torno de c por `grau` graus (anti-horário). */
export const girar = (p: Pt, grau: number, c: Pt = { x: 0, y: 0 }): Pt => {
  const a = rad(grau);
  const d = menos(p, c);
  return { x: c.x + d.x * Math.cos(a) - d.y * Math.sin(a), y: c.y + d.x * Math.sin(a) + d.y * Math.cos(a) };
};

/** Quase igual (tolerância de ponto flutuante). */
export const quase = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps;

/** Número no formato do app: vírgula decimal, sinal de menos tipográfico, sem zeros sobrando. */
export function fmt(v: number, casas = 2): string {
  const r = Number(v.toFixed(casas));
  const s = (Object.is(r, -0) ? 0 : r).toString().replace(".", ",");
  return s.replace("-", "−");
}

/** O objeto (ou algum filho) usa "$slider"? Figuras estáticas não aceitam. */
export function temSlider(o: unknown): boolean {
  if (typeof o === "string") return o.includes("$");
  if (Array.isArray(o)) return o.some(temSlider);
  if (o && typeof o === "object") return Object.values(o).some(temSlider);
  return false;
}

export interface Vista {
  k: number;
  p: (x: number, y: number) => Pt;
  q: (pt: Pt) => Pt;
  inv: (px: Pt) => Pt;
}

export interface Caixa {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/** Vista que cabe a caixa do mundo no canvas w × h, centrada, com escala igual nos dois eixos. */
export function criarVista(w: number, h: number, c: Caixa, margem = 18): Vista {
  const dx = Math.max(c.x1 - c.x0, 1e-6);
  const dy = Math.max(c.y1 - c.y0, 1e-6);
  const k = Math.min((w - 2 * margem) / dx, (h - 2 * margem) / dy);
  const ox = (w - k * dx) / 2 - k * c.x0;
  const oy = (h + k * (c.y1 + c.y0)) / 2;
  const p = (x: number, y: number): Pt => ({ x: ox + k * x, y: oy - k * y });
  return { k, p, q: (pt) => p(pt.x, pt.y), inv: (px) => ({ x: (px.x - ox) / k, y: (oy - px.y) / k }) };
}

/** Proporção altura/largura de uma caixa do mundo, limitada para o canvas não ficar nem baixo nem alto demais. */
export const aspectoDe = (c: Caixa, min = 0.55, max = 1.05) => Math.max(min, Math.min(max, (c.y1 - c.y0) / (c.x1 - c.x0)));

export const tinta = (c: CorTraco) => corDoTraco(c).main;
export const tintaEscura = (c: CorTraco) => corDoTraco(c).dark;
export const tintaClara = (c: CorTraco) => corDoTraco(c).tint;

/** Etiqueta com a cor da marca; marcas c1..c4 viram alvo da dica do glossário. */
export function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, txt: string, c: CorTraco): Rect {
  const k = corDoTraco(c);
  const r = chip(ctx, p, txt, k.main, k.dark);
  if (ehMarca(c)) hits.push({ key: c, ...r });
  return r;
}

/** Texto simples (sem fundo), para valores e contas. */
export function nota(ctx: CanvasRenderingContext2D, p: Pt, s: string, c: CorTraco = "ink", size = 15) {
  text(ctx, p, s, c === "ink" ? palette.ink2 : c === "muted" ? palette.muted : tintaEscura(c), size);
}

/** Linha de texto alinhada à esquerda. */
export function notaEsq(ctx: CanvasRenderingContext2D, p: Pt, s: string, color: string, size = 14) {
  ctx.font = `900 ${size}px Nunito, system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(s, p.x, p.y);
}

/** Arco de círculo em graus do mundo (anti-horário, y para cima), com raio em pixels. */
export function arco(ctx: CanvasRenderingContext2D, centro: Pt, rpx: number, a0: number, a1: number, cor: string, lw: number, preenche?: string, dash?: number[]) {
  ctx.beginPath();
  if (preenche) ctx.moveTo(centro.x, centro.y);
  ctx.arc(centro.x, centro.y, rpx, -rad(a0), -rad(a1), true);
  if (preenche) {
    ctx.closePath();
    ctx.fillStyle = preenche;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centro.x, centro.y, rpx, -rad(a0), -rad(a1), true);
  }
  ctx.setLineDash(dash ?? []);
  ctx.strokeStyle = cor;
  ctx.lineWidth = lw;
  ctx.stroke();
  ctx.setLineDash([]);
}

/** Setor preenchido (ângulo central, fatia), com contorno opcional. */
export function setor(ctx: CanvasRenderingContext2D, centro: Pt, rpx: number, a0: number, a1: number, fill: string, stroke?: string, lw = 2) {
  ctx.beginPath();
  ctx.moveTo(centro.x, centro.y);
  ctx.arc(centro.x, centro.y, rpx, -rad(a0), -rad(a1), true);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

/** Marca de ângulo no vértice (pixels): arco entre as direções (graus do mundo) com etiqueta no meio. */
export function anguloMarcado(
  ctx: CanvasRenderingContext2D,
  hits: Hit[],
  vert: Pt,
  a0: number,
  a1: number,
  rpx: number,
  txt: string | null,
  c: CorTraco,
  fundo = true,
) {
  let b = a1;
  while (b < a0) b += 360;
  arco(ctx, vert, rpx, a0, b, tinta(c), 3, fundo ? tintaClara(c) : undefined);
  if (txt !== null) {
    const m = rad((a0 + b) / 2);
    etiqueta(ctx, hits, { x: vert.x + Math.cos(m) * (rpx + 22), y: vert.y - Math.sin(m) * (rpx + 22) }, txt, c);
  }
}

export function unitario(a: Pt, b: Pt): Pt | null {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  return d < 1e-9 ? null : { x: (b.x - a.x) / d, y: (b.y - a.y) / d };
}

/** Ângulo reto em coordenadas do mundo (vértice e dois pontos nos lados). */
export function retoNoMundo(ctx: CanvasRenderingContext2D, v: Vista, o: Pt, a: Pt, b: Pt, tam = 12) {
  const O = v.q(o);
  const ua = unitario(O, v.q(a));
  const ub = unitario(O, v.q(b));
  if (!ua || !ub) return;
  const p1 = { x: O.x + ua.x * tam, y: O.y + ua.y * tam };
  const p2 = { x: p1.x + ub.x * tam, y: p1.y + ub.y * tam };
  const p3 = { x: O.x + ub.x * tam, y: O.y + ub.y * tam };
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.strokeStyle = palette.ink2;
  ctx.lineWidth = 2;
  ctx.stroke();
}

/** Ponto a `px` pixels do meio de a–b (pixels), no lado oposto a `longe`: rótulo de lado fora da figura. */
export function ladoFora(a: Pt, b: Pt, longe: Pt, px = 20): Pt {
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const d = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const n = { x: -(b.y - a.y) / d, y: (b.x - a.x) / d };
  const s = (m.x - longe.x) * n.x + (m.y - longe.y) * n.y >= 0 ? 1 : -1;
  return { x: m.x + n.x * px * s, y: m.y + n.y * px * s };
}

/** Malha quadriculada do mundo dentro de uma caixa. */
export function malha(ctx: CanvasRenderingContext2D, v: Vista, c: Caixa, passo = 1, cor: string = palette.line) {
  ctx.beginPath();
  for (let x = Math.ceil(c.x0 / passo) * passo; x <= c.x1 + 1e-9; x += passo) {
    const a = v.p(x, c.y0);
    const b = v.p(x, c.y1);
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  }
  for (let y = Math.ceil(c.y0 / passo) * passo; y <= c.y1 + 1e-9; y += passo) {
    const a = v.p(c.x0, y);
    const b = v.p(c.x1, y);
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  }
  ctx.strokeStyle = cor;
  ctx.lineWidth = 1;
  ctx.stroke();
}

/** Polígono em coordenadas do mundo. */
export function poligonoMundo(ctx: CanvasRenderingContext2D, v: Vista, pts: Pt[], fill?: string, stroke?: string, lw = 3, dash?: number[]) {
  if (pts.length < 2) return;
  ctx.beginPath();
  pts.forEach((p, i) => {
    const q = v.q(p);
    if (i === 0) ctx.moveTo(q.x, q.y);
    else ctx.lineTo(q.x, q.y);
  });
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.setLineDash(dash ?? []);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export function segMundo(ctx: CanvasRenderingContext2D, v: Vista, a: Pt, b: Pt, cor: string, lw = 3, dash?: number[]) {
  seg(ctx, v.q(a), v.q(b), cor, lw, dash);
}

/** Marca em destaque: traços da cor destacada engrossam e os demais afinam. */
export const espessura = (destaque: readonly string[], c: CorTraco, base = 3) => (destaque.length === 0 ? base : destaque.includes(c) ? base + 2 : Math.max(1.5, base - 1));

/** Alvo tocável/arrastável de um widget (círculo em pixels). */
export interface Alvo {
  id: string;
  c: Pt;
  raio: number;
}
export const alvoEm = (alvos: Alvo[], q: Pt): Alvo | undefined => [...alvos].reverse().find((a) => Math.hypot(a.c.x - q.x, a.c.y - q.y) <= a.raio);

/** Pega-mão: bolinha arrastável (anel claro com miolo). */
export function pegador(ctx: CanvasRenderingContext2D, p: Pt, c: CorTraco = "ink") {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 13, 0, Math.PI * 2);
  ctx.fillStyle = palette.bg;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = tintaEscura(c);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = tinta(c);
  ctx.fill();
}
