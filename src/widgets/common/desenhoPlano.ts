// Desenho do plano cartesiano em canvas, compartilhado pelo widget e pela figura estática.
import { corDoTraco, ehMarca, type CorTraco } from "../../ui/marcas";
import { palette as c } from "../../ui/palette";
import { chip, dot, polyline, seg, text, type Hit, type Pt } from "../canvas";
import type { PlanoCartesiano } from "./params";
import {
  avaliar,
  criarVista,
  encontros,
  marcas,
  num,
  passoDeMarcas,
  raizes,
  resolver,
  resolverCurva,
  todaRaiz,
  type Controles,
  type CurvaResolvida,
  type Vista,
} from "./plot2d";

export interface EstadoPlano {
  /** x atual do ponto (já encaixado). */
  pontoX?: number;
  /** Posições já visitadas pelo ponto. */
  rastro?: number[];
  /** Quadrantes já visitados (1..4), tingidos de leve. */
  visitados?: ReadonlySet<number>;
}

const espessura = (cor: CorTraco, base: number, destaque: readonly string[]) => {
  if (destaque.length === 0) return base;
  return destaque.includes(cor) ? base * 1.5 : base * 0.6;
};

/** Etiqueta colorida; se a cor é uma marca, entra na lista de alvos da dica. */
function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, cor: CorTraco) {
  const k = corDoTraco(cor);
  const area = chip(ctx, p, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...area });
}

function caminhoDaCurva(v: Vista, k: CurvaResolvida, x0: number, x1: number, y0: number, y1: number): Pt[][] {
  const partes: Pt[][] = [];
  let atual: Pt[] = [];
  const n = 400;
  const folga = (y1 - y0) * 2;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = avaliar(k, x);
    if (!Number.isFinite(y) || y < y0 - folga || y > y1 + folga) {
      if (atual.length > 1) partes.push(atual);
      atual = [];
      continue;
    }
    atual.push({ x: v.X(x), y: v.Y(y) });
  }
  if (atual.length > 1) partes.push(atual);
  return partes;
}

export function desenharPlano(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: PlanoCartesiano,
  controles: Controles,
  estado: EstadoPlano = {},
): Vista {
  const [x0, x1] = p.x;
  const [y0, y1] = p.y;
  const v = criarVista(p.x, p.y, { x: 0, y: 0, w, h });
  const A = v.area;
  const curvas = p.curvas.map((cv) => resolverCurva(cv, controles));
  const hl = p.highlight;

  // Quadrantes visitados e grade.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x, A.y, A.w, A.h);
  ctx.clip();
  if (p.marcar.quadrantes && estado.visitados) {
    const ox = v.X(0);
    const oy = v.Y(0);
    const rects: Record<number, [number, number, number, number]> = {
      1: [ox, A.y, A.x + A.w - ox, oy - A.y],
      2: [A.x, A.y, ox - A.x, oy - A.y],
      3: [A.x, oy, ox - A.x, A.y + A.h - oy],
      4: [ox, oy, A.x + A.w - ox, A.y + A.h - oy],
    };
    ctx.fillStyle = c.greenTint;
    for (const q of estado.visitados) ctx.fillRect(...rects[q]);
  }
  const passo = passoDeMarcas(Math.min(x0, y0), Math.max(x1, y1));
  if (p.grade) {
    for (const x of marcas(x0, x1, passo)) seg(ctx, { x: v.X(x), y: A.y }, { x: v.X(x), y: A.y + A.h }, c.line, 1);
    for (const y of marcas(y0, y1, passo)) seg(ctx, { x: A.x, y: v.Y(y) }, { x: A.x + A.w, y: v.Y(y) }, c.line, 1);
  }
  ctx.restore();

  // Eixos com seta e números.
  const temX = y0 <= 0 && y1 >= 0;
  const temY = x0 <= 0 && x1 >= 0;
  const eixoY = temX ? v.Y(0) : A.y + A.h;
  const eixoX = temY ? v.X(0) : A.x;
  seg(ctx, { x: A.x - 6, y: eixoY }, { x: A.x + A.w + 6, y: eixoY }, c.axis, 2);
  seg(ctx, { x: eixoX, y: A.y + A.h + 6 }, { x: eixoX, y: A.y - 6 }, c.axis, 2);
  polyline(ctx, [{ x: A.x + A.w - 2, y: eixoY - 5 }, { x: A.x + A.w + 6, y: eixoY }, { x: A.x + A.w - 2, y: eixoY + 5 }], c.axis, 2);
  polyline(ctx, [{ x: eixoX - 5, y: A.y + 2 }, { x: eixoX, y: A.y - 6 }, { x: eixoX + 5, y: A.y + 2 }], c.axis, 2);
  for (const x of marcas(x0, x1, passo)) {
    if (x === 0 || x === x1) continue;
    seg(ctx, { x: v.X(x), y: eixoY - 4 }, { x: v.X(x), y: eixoY + 4 }, c.axis, 2);
    text(ctx, { x: v.X(x), y: eixoY + 14 }, num(x), c.muted, 11);
  }
  for (const y of marcas(y0, y1, passo)) {
    if (y === 0 || y === y1) continue;
    seg(ctx, { x: eixoX - 4, y: v.Y(y) }, { x: eixoX + 4, y: v.Y(y) }, c.axis, 2);
    text(ctx, { x: eixoX - 13, y: v.Y(y) }, num(y), c.muted, 11);
  }
  text(ctx, { x: A.x + A.w - 2, y: eixoY - 14 }, "x", c.ink2, 14);
  text(ctx, { x: eixoX + 13, y: A.y + 4 }, "y", c.ink2, 14);

  if (p.marcar.quadrantes) {
    const nomes: [string, number, number][] = [
      // Fora dos cantos, para não ficarem sob a diagonal y = x.
      ["I", A.x + A.w * 0.78, A.y + 16],
      ["II", A.x + A.w * 0.22, A.y + 16],
      ["III", A.x + A.w * 0.22, A.y + A.h - 16],
      ["IV", A.x + A.w * 0.78, A.y + A.h - 16],
    ];
    for (const [s, x, y] of nomes) text(ctx, { x, y }, s, c.lineDark, 14);
  }

  // Curvas: fantasmas por baixo.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x - 2, A.y - 2, A.w + 4, A.h + 4);
  ctx.clip();
  const ordem = p.curvas.map((cv, i) => ({ cv, i })).sort((a, b) => Number(b.cv.fantasma) - Number(a.cv.fantasma));
  for (const { cv, i } of ordem) {
    const k = curvas[i];
    const partes = todaRaiz(k) ? [[{ x: A.x, y: v.Y(0) }, { x: A.x + A.w, y: v.Y(0) }]] : caminhoDaCurva(v, k, x0, x1, y0, y1);
    for (const parte of partes) {
      if (cv.fantasma) polyline(ctx, parte, c.lineDark, 3, [8, 7]);
      else polyline(ctx, parte, corDoTraco(cv.cor).main, espessura(cv.cor, 4.5, hl));
    }
  }

  // Triângulo "anda 1, sobe a".
  let triRotulos: (() => void) | null = null;
  if (p.triangulo) {
    const t = p.triangulo;
    const k = curvas[t.curva];
    const xt = resolver(t.x, controles);
    const ya = avaliar(k, xt);
    const yb = avaliar(k, xt + 1);
    if (Number.isFinite(ya) && Number.isFinite(yb)) {
      const P = { x: v.X(xt), y: v.Y(ya) };
      const Q = { x: v.X(xt + 1), y: v.Y(ya) };
      const R = { x: v.X(xt + 1), y: v.Y(yb) };
      const cor = corDoTraco(t.cor);
      ctx.beginPath();
      ctx.moveTo(P.x, P.y);
      ctx.lineTo(Q.x, Q.y);
      ctx.lineTo(R.x, R.y);
      ctx.closePath();
      ctx.fillStyle = cor.tint;
      ctx.fill();
      seg(ctx, P, Q, c.ink2, 3);
      seg(ctx, Q, R, cor.main, espessura(t.cor, 4.5, hl));
      const sobe = yb - ya;
      triRotulos = () => {
        const abaixo = sobe >= 0 ? 16 : -16;
        chip(ctx, { x: (P.x + Q.x) / 2, y: P.y + abaixo }, "1", c.ink2, c.ink);
        const s = sobe > 0 ? `+${num(sobe)}` : num(sobe);
        etiqueta(ctx, hits, { x: Q.x + 22 + 4 * s.length, y: (Q.y + R.y) / 2 }, s, t.cor);
      };
    }
  }
  ctx.restore();

  // Marcas especiais sobre as curvas.
  const principal = curvas.findIndex((_, i) => !p.curvas[i].fantasma);
  const kp = principal >= 0 ? curvas[principal] : null;
  const depois: (() => void)[] = [];
  if (kp && p.marcar.interceptoY && temY) {
    const y = avaliar(kp, 0);
    if (Number.isFinite(y) && y >= y0 && y <= y1) {
      const cor = p.cores.interceptoY;
      dot(ctx, { x: v.X(0), y: v.Y(y) }, espessura(cor, 7, hl), corDoTraco(cor).main);
      depois.push(() => etiqueta(ctx, hits, { x: v.X(0) - 26, y: v.Y(y) - 16 }, num(y), cor));
    }
  }
  if (kp && p.marcar.raizes && temX && !todaRaiz(kp)) {
    const cor = p.cores.raiz;
    for (const r of raizes(kp, x0, x1)) {
      dot(ctx, { x: v.X(r), y: v.Y(0) }, espessura(cor, 7, hl), corDoTraco(cor).main);
      depois.push(() => etiqueta(ctx, hits, { x: v.X(r) + 4, y: v.Y(0) + 22 }, num(r), cor));
    }
  }
  if (p.marcar.encontro && curvas.length >= 2) {
    const cor = p.cores.encontro;
    for (const x of encontros(curvas[0], curvas[1], x0, x1)) {
      const y = avaliar(curvas[0], x);
      if (y < y0 || y > y1) continue;
      dot(ctx, { x: v.X(x), y: v.Y(y) }, espessura(cor, 7, hl), corDoTraco(cor).main);
      depois.push(() => etiqueta(ctx, hits, { x: v.X(x) + 44, y: v.Y(y) + 18 }, `(${num(x)}; ${num(y)})`, cor));
    }
  }

  // Ponto que percorre a curva, com projeções nos eixos.
  if (p.ponto && estado.pontoX !== undefined) {
    const pt = p.ponto;
    const k = curvas[pt.curva];
    for (const xr of pt.rastro ? (estado.rastro ?? []) : []) {
      const yr = avaliar(k, xr);
      if (Number.isFinite(yr) && yr >= y0 && yr <= y1) dot(ctx, { x: v.X(xr), y: v.Y(yr) }, 3.5, c.lineDark);
    }
    const x = estado.pontoX;
    const y = avaliar(k, x);
    if (Number.isFinite(y) && y >= y0 - 0.01 && y <= y1 + 0.01) {
      const P = { x: v.X(x), y: v.Y(y) };
      const cor = corDoTraco(pt.cor);
      seg(ctx, P, { x: P.x, y: eixoY }, c.muted, 2, [4, 5]);
      seg(ctx, P, { x: eixoX, y: P.y }, c.muted, 2, [4, 5]);
      dot(ctx, { x: P.x, y: P.y + 3 }, 11, cor.dark);
      dot(ctx, P, 11, cor.main);
      dot(ctx, P, 5, c.bg);
      if (pt.coordenadas) {
        const s = `(${num(x)}; ${num(y)})`;
        const dx = P.x > A.x + A.w * 0.7 ? -46 - 3 * s.length : 46 + 3 * s.length;
        depois.push(() => etiqueta(ctx, hits, { x: P.x + dx, y: P.y - 18 }, s, pt.cor));
      }
    }
  }

  // Rótulos por cima de tudo. O das curvas procura um lugar longe das bordas, dos eixos
  // (é perto do eixo x que ficam as raízes) e dos rótulos já postos.
  triRotulos?.();
  const ocupados: { x: number; y: number; w: number; h: number }[] = [];
  const colide = (r: { x: number; y: number; w: number; h: number }) =>
    ocupados.some((o) => r.x < o.x + o.w + 6 && o.x < r.x + r.w + 6 && r.y < o.y + o.h + 4 && o.y < r.y + r.h + 4);
  ctx.font = "900 16px Nunito, system-ui, sans-serif";
  p.curvas.forEach((cv, i) => {
    if (!cv.rotulo) return;
    const k = curvas[i];
    const lw = Math.max(28, ctx.measureText(cv.rotulo).width + 16);
    for (const exigente of [true, false]) {
      for (let j = 0; j <= 60; j++) {
        const x = x1 - (x1 - x0) * (0.16 + j / 80);
        const y = avaliar(k, x);
        if (!Number.isFinite(y) || y < y0 + (y1 - y0) * 0.1 || y > y1 - (y1 - y0) * 0.1) continue;
        if (exigente && (Math.abs(y) < (y1 - y0) * 0.2 || Math.abs(x) < (x1 - x0) * 0.08)) continue;
        const pos = { x: v.X(x), y: v.Y(y) - 22 };
        const r = { x: pos.x - lw / 2, y: pos.y - 13, w: lw, h: 29 };
        if (colide(r)) continue;
        ocupados.push(r);
        if (cv.fantasma) chip(ctx, pos, cv.rotulo, c.lineDark, c.muted, c.ink2);
        else etiqueta(ctx, hits, pos, cv.rotulo, cv.cor);
        return;
      }
    }
  });
  for (const f of depois) f();
  return v;
}
