// Desenho da reta numérica: trechos (intervalos) coloridos, pontos fixos e um ponto móvel.
import { corDoTraco, ehMarca, type CorTraco } from "../../ui/marcas";
import { palette as c } from "../../ui/palette";
import { chip, dot, polyline, seg, text, type Hit } from "../canvas";
import type { RetaNumerica, Trecho } from "./params";
import { marcas, num } from "./plot2d";

export interface VistaReta {
  X: (x: number) => number;
  xDe: (px: number) => number;
  y: number;
}

/** O valor está dentro do trecho (respeitando extremos abertos)? */
export function dentroDoTrecho(t: Trecho, x: number): boolean {
  if (t.de !== null && (t.abreDe ? x <= t.de : x < t.de)) return false;
  if (t.ate !== null && (t.abreAte ? x >= t.ate : x > t.ate)) return false;
  return true;
}

const largura = (cor: CorTraco, base: number, hl: readonly string[]) =>
  hl.length === 0 ? base : hl.includes(cor) ? base * 1.4 : base * 0.6;

function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], x: number, y: number, s: string, cor: CorTraco) {
  const k = corDoTraco(cor);
  const a = chip(ctx, { x, y }, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...a });
}

function bolinha(ctx: CanvasRenderingContext2D, x: number, y: number, cor: string, aberta: boolean) {
  dot(ctx, { x, y }, 7.5, cor);
  if (aberta) dot(ctx, { x, y }, 4, c.bg);
}

export function desenharReta(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: RetaNumerica,
  pontoX?: number,
): VistaReta {
  const [x0, x1] = p.intervalo;
  const pad = 28;
  const k = (w - 2 * pad) / (x1 - x0);
  const X = (x: number) => pad + (x - x0) * k;
  const y = h * 0.62;
  const hl = p.highlight;

  // Linha com setas nas duas pontas e marcas numeradas.
  seg(ctx, { x: 8, y }, { x: w - 8, y }, c.axis, 2.5);
  polyline(ctx, [{ x: w - 16, y: y - 6 }, { x: w - 7, y }, { x: w - 16, y: y + 6 }], c.axis, 2.5);
  polyline(ctx, [{ x: 16, y: y - 6 }, { x: 7, y }, { x: 16, y: y + 6 }], c.axis, 2.5);
  for (const m of marcas(x0, x1, p.marcas)) {
    seg(ctx, { x: X(m), y: y - 6 }, { x: X(m), y: y + 6 }, c.axis, 2);
    text(ctx, { x: X(m), y: y + 20 }, num(m), m === 0 ? c.ink : c.muted, 12);
  }

  // Trechos empilhados acima da linha.
  p.trechos.forEach((t, i) => {
    const ty = y - 18 - i * 16;
    const cor = corDoTraco(t.cor);
    const a = t.de === null ? 10 : X(Math.max(x0, t.de));
    const b = t.ate === null ? w - 10 : X(Math.min(x1, t.ate));
    seg(ctx, { x: a, y: ty }, { x: b, y: ty }, cor.main, largura(t.cor, 6, hl));
    if (t.de === null) polyline(ctx, [{ x: a + 9, y: ty - 6 }, { x: a, y: ty }, { x: a + 9, y: ty + 6 }], cor.main, 3);
    else bolinha(ctx, a, ty, cor.main, t.abreDe);
    if (t.ate === null) polyline(ctx, [{ x: b - 9, y: ty - 6 }, { x: b, y: ty }, { x: b - 9, y: ty + 6 }], cor.main, 3);
    else bolinha(ctx, b, ty, cor.main, t.abreAte);
    if (t.rotulo) etiqueta(ctx, hits, (a + b) / 2, ty - 20, t.rotulo, t.cor);
  });

  for (const pf of p.pontos) {
    const cor = corDoTraco(pf.cor);
    bolinha(ctx, X(pf.x), y, cor.main, pf.aberto);
    if (pf.rotulo) etiqueta(ctx, hits, X(pf.x), y + 44, pf.rotulo, pf.cor);
  }

  if (p.ponto && pontoX !== undefined) {
    const pm = p.ponto;
    const px = X(pontoX);
    if (pm.distanciaZero && pontoX !== 0) {
      const cor = corDoTraco(pm.corDistancia);
      const yy = y + 34;
      seg(ctx, { x: X(0), y: yy }, { x: px, y: yy }, cor.main, largura(pm.corDistancia, 4, hl));
      seg(ctx, { x: X(0), y: yy - 6 }, { x: X(0), y: yy + 6 }, cor.main, 3);
      seg(ctx, { x: px, y: yy - 6 }, { x: px, y: yy + 6 }, cor.main, 3);
      etiqueta(ctx, hits, (X(0) + px) / 2, yy + 20, num(Math.abs(pontoX)), pm.corDistancia);
    }
    const cor = corDoTraco(pm.cor);
    dot(ctx, { x: px, y: y + 3 }, 11, cor.dark);
    dot(ctx, { x: px, y }, 11, cor.main);
    dot(ctx, { x: px, y }, 5, c.bg);
    etiqueta(ctx, hits, px, y - 18 - p.trechos.length * 16 - 8, num(pontoX), pm.cor);
  }

  return { X, xDe: (px) => x0 + (px - pad) / k, y };
}
