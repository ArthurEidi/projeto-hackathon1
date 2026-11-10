// Desenho do plano cartesiano em canvas, compartilhado pelo widget e pela figura estática.
import { corDoTraco, ehMarca, type CorTraco } from "../../ui/marcas";
import { palette as c } from "../../ui/palette";
import { chip, dot, poly, polyline, seg, text, type Hit, type Pt } from "../canvas";
import type { PlanoCartesiano } from "./params";
import {
  alturaDoPonto,
  anguloEntreRetas,
  assintotas,
  avaliar,
  avaliarSemFuro,
  coincidentes,
  criarVista,
  encontros,
  fatorPorPasso,
  marcas,
  num,
  passoDeMarcas,
  periodo,
  perpendiculares,
  raizes,
  resolver,
  resolverCurva,
  todaRaiz,
  vertice,
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

/** Vista e onde ficaram os marcadores tocáveis. */
export type VistaPlano = Vista & { intercepto?: Pt };

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
  const n = 600;
  const folga = (y1 - y0) * 2;
  let yAnt = NaN;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = avaliar(k, x);
    // Salto grande entre vizinhos (assíntota vertical): quebra o traço.
    if (!Number.isFinite(y) || y < y0 - folga || y > y1 + folga) {
      if (atual.length > 1) partes.push(atual);
      atual = [];
      yAnt = NaN;
      continue;
    }
    if (Number.isFinite(yAnt) && Math.abs(y - yAnt) > (y1 - y0) * 1.5) {
      if (atual.length > 1) partes.push(atual);
      atual = [];
    }
    atual.push({ x: v.X(x), y: v.Y(y) });
    yAnt = y;
  }
  if (atual.length > 1) partes.push(atual);
  return partes;
}

function bolinha(ctx: CanvasRenderingContext2D, p: Pt, cor: string, aberta: boolean) {
  dot(ctx, p, 6.5, cor);
  if (aberta) dot(ctx, p, 3.5, c.bg);
}

export function desenharPlano(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: PlanoCartesiano,
  controles: Controles,
  estado: EstadoPlano = {},
): VistaPlano {
  const [x0, x1] = p.x;
  const [y0, y1] = p.y;
  const v: VistaPlano = criarVista(p.x, p.y, { x: 0, y: 0, w, h });
  const A = v.area;
  const curvas = p.curvas.map((cv) => resolverCurva(cv, controles));
  const hl = p.highlight;
  const dentroY = (y: number) => y >= y0 && y <= y1;
  const dentroX = (x: number) => x >= x0 && x <= x1;

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

  const principal = curvas.findIndex((_, i) => !p.curvas[i].fantasma);
  const kp = principal >= 0 ? curvas[principal] : null;
  const depois: (() => void)[] = [];

  // Guias, faixa da senoide e assíntotas: por baixo das curvas.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x - 2, A.y - 2, A.w + 4, A.h + 4);
  ctx.clip();
  const guiaH = (y: number, cor: string, rotulo?: string, lw = 2) => {
    if (!dentroY(y)) return;
    seg(ctx, { x: A.x, y: v.Y(y) }, { x: A.x + A.w, y: v.Y(y) }, cor, lw, [3, 5]);
    if (rotulo) depois.push(() => text(ctx, { x: A.x + 26, y: v.Y(y) - 10 }, rotulo, c.ink2, 12));
  };
  const guiaV = (x: number, cor: string, rotulo?: string, lw = 2) => {
    if (!dentroX(x)) return;
    seg(ctx, { x: v.X(x), y: A.y }, { x: v.X(x), y: A.y + A.h }, cor, lw, [3, 5]);
    if (rotulo) depois.push(() => text(ctx, { x: v.X(x) + 4 + 3.5 * rotulo.length, y: A.y + 12 }, rotulo, c.ink2, 12));
  };
  if (p.guias.diagonal) {
    const a = Math.max(x0, y0);
    const b = Math.min(x1, y1);
    seg(ctx, { x: v.X(a), y: v.Y(a) }, { x: v.X(b), y: v.Y(b) }, c.lineDark, 2, [3, 5]);
    depois.push(() => text(ctx, { x: v.X(b) - 22, y: v.Y(b) + 10 }, "y = x", c.muted, 12));
  }
  for (const g of p.guias.horizontais) guiaH(g.v, corDoTraco(g.cor).main, g.rotulo);
  for (const g of p.guias.verticais) guiaV(g.v, corDoTraco(g.cor).main, g.rotulo);
  if (kp && p.marcar.faixa && (kp.tipo === "seno" || kp.tipo === "cosseno")) {
    const ta = kp.t?.a ?? 1;
    const media = ta * kp.c + (kp.t?.k ?? 0);
    const amp = Math.abs(ta * kp.a);
    guiaH(media, c.ink2, "linha média");
    guiaH(media + amp, c.lineDark, "topo");
    guiaH(media - amp, c.lineDark, "fundo");
  }
  const ass = kp && p.marcar.assintota ? assintotas(kp) : {};
  for (const x of [...(ass.x !== undefined ? [ass.x] : []), ...p.assintotas.x]) guiaV(x, c.ink2, `x = ${num(x)}`, 2.5);
  for (const y of [...(ass.y !== undefined ? [ass.y] : []), ...p.assintotas.y]) guiaH(y, c.ink2, `y = ${num(y)}`, 2.5);
  ctx.restore();

  // Curvas: fantasmas por baixo. A curva 1 igual à 0 (coincidentes) vira tracejada por cima.
  ctx.save();
  ctx.beginPath();
  ctx.rect(A.x - 2, A.y - 2, A.w + 4, A.h + 4);
  ctx.clip();
  const iguais = curvas.length >= 2 && coincidentes(curvas[0], curvas[1]);
  const ordem = p.curvas.map((cv, i) => ({ cv, i })).sort((a, b) => Number(b.cv.fantasma) - Number(a.cv.fantasma));
  for (const { cv, i } of ordem) {
    const k = curvas[i];
    const partes = todaRaiz(k) ? [[{ x: A.x, y: v.Y(0) }, { x: A.x + A.w, y: v.Y(0) }]] : caminhoDaCurva(v, k, x0, x1, y0, y1);
    for (const parte of partes) {
      if (cv.fantasma) polyline(ctx, parte, c.lineDark, 3, [8, 7]);
      else if (iguais && i === 1) polyline(ctx, parte, corDoTraco(cv.cor).main, espessura(cv.cor, 4.5, hl), [10, 9]);
      else polyline(ctx, parte, corDoTraco(cv.cor).main, espessura(cv.cor, 4.5, hl));
    }
  }
  ctx.restore();

  // Extremos de domínio (por partes) e furos.
  p.curvas.forEach((cv, i) => {
    if (cv.fantasma) return;
    const k = curvas[i];
    const cor = corDoTraco(cv.cor).main;
    const d = cv.dominio;
    if (d) {
      for (const [xe, aberta] of [
        [d.de, d.abreDe],
        [d.ate, d.abreAte],
      ] as const) {
        if (xe === null || !dentroX(xe)) continue;
        const y = avaliar({ ...k, dom: undefined }, xe);
        if (Number.isFinite(y) && dentroY(y)) bolinha(ctx, { x: v.X(xe), y: v.Y(y) }, cor, aberta);
      }
    }
    for (const f of cv.furos) {
      const y = avaliarSemFuro(k, f);
      if (dentroX(f) && Number.isFinite(y) && dentroY(y)) bolinha(ctx, { x: v.X(f), y: v.Y(y) }, cor, true);
    }
  });

  // Triângulo "anda 1, sobe a" (ou "anda 1, ×b").
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
      poly(ctx, [P, Q, R], cor.tint);
      seg(ctx, P, Q, c.ink2, 3);
      seg(ctx, Q, R, cor.main, espessura(t.cor, 4.5, hl));
      const sobe = yb - ya;
      triRotulos = () => {
        const abaixo = sobe >= 0 ? 16 : -16;
        chip(ctx, { x: (P.x + Q.x) / 2, y: P.y + abaixo }, "1", c.ink2, c.ink);
        const s = t.modo === "fator" ? `×${num(fatorPorPasso(k, xt))}` : sobe > 0 ? `+${num(sobe)}` : num(sobe);
        etiqueta(ctx, hits, { x: Q.x + 22 + 4 * s.length, y: (Q.y + R.y) / 2 }, s, t.cor);
      };
    }
  }

  // Marcas especiais sobre as curvas.
  if (kp && p.marcar.interceptoY && temY) {
    const y = avaliar(kp, 0);
    if (Number.isFinite(y) && dentroY(y)) {
      const cor = p.cores.interceptoY;
      v.intercepto = { x: v.X(0), y: v.Y(y) };
      dot(ctx, v.intercepto, espessura(cor, 7, hl), corDoTraco(cor).main);
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
  if (p.marcar.encontro && curvas.length >= 2 && !iguais) {
    const cor = p.cores.encontro;
    for (const x of encontros(curvas[0], curvas[1], x0, x1)) {
      const y = avaliar(curvas[0], x);
      if (!dentroY(y)) continue;
      dot(ctx, { x: v.X(x), y: v.Y(y) }, espessura(cor, 7, hl), corDoTraco(cor).main);
      depois.push(() => etiqueta(ctx, hits, { x: v.X(x) + 44, y: v.Y(y) + 18 }, `(${num(x)}; ${num(y)})`, cor));
    }
  }
  if (p.marcar.angulo && curvas.length >= 2 && curvas[0].tipo === "afim" && curvas[1].tipo === "afim" && !iguais) {
    const [k0, k1] = curvas;
    const xs = encontros(k0, k1, x0, x1);
    if (xs.length) {
      const O = { x: v.X(xs[0]), y: v.Y(avaliar(k0, xs[0])) };
      const cor = corDoTraco(p.cores.angulo);
      // Direções na tela (y para baixo): (1, −m), normalizadas.
      const dir = (m: number) => {
        const n = Math.hypot(1, m);
        return { x: 1 / n, y: -m / n };
      };
      const u = dir(k0.a);
      let w2 = dir(k1.a);
      // Pega o ângulo agudo (ou reto) entre as retas.
      if (u.x * w2.x + u.y * w2.y < 0) w2 = { x: -w2.x, y: -w2.y };
      const R = 24;
      if (perpendiculares(k0, k1)) {
        const p1 = { x: O.x + u.x * 14, y: O.y + u.y * 14 };
        const p3 = { x: O.x + w2.x * 14, y: O.y + w2.y * 14 };
        const p2 = { x: p1.x + w2.x * 14, y: p1.y + w2.y * 14 };
        poly(ctx, [O, p1, p2, p3], cor.tint, cor.main, espessura(p.cores.angulo, 2.5, hl));
      } else {
        let a0 = Math.atan2(u.y, u.x);
        let a1 = Math.atan2(w2.y, w2.x);
        if (((a1 - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI < 0) [a0, a1] = [a1, a0];
        ctx.beginPath();
        ctx.moveTo(O.x, O.y);
        ctx.arc(O.x, O.y, R, a0, a1);
        ctx.closePath();
        ctx.fillStyle = cor.tint;
        ctx.fill();
        ctx.strokeStyle = cor.main;
        ctx.lineWidth = espessura(p.cores.angulo, 2.5, hl);
        ctx.stroke();
      }
      const ang = anguloEntreRetas(k0.a, k1.a);
      depois.push(() => etiqueta(ctx, hits, { x: O.x - 40, y: O.y - 26 }, `${num(ang, 1)}°`, p.cores.angulo));
    }
  }
  const vq = kp && (p.marcar.vertice || p.marcar.eixo) ? vertice(kp) : null;
  if (vq) {
    const cor = p.cores.vertice;
    if (p.marcar.eixo && dentroX(vq.x)) {
      seg(ctx, { x: v.X(vq.x), y: A.y }, { x: v.X(vq.x), y: A.y + A.h }, corDoTraco(cor).main, espessura(cor, 2.5, hl), [7, 6]);
      depois.push(() => etiqueta(ctx, hits, { x: v.X(vq.x) + 34, y: A.y + 14 }, `x = ${num(vq.x)}`, cor));
    }
    if (p.marcar.vertice && dentroX(vq.x) && dentroY(vq.y)) {
      dot(ctx, { x: v.X(vq.x), y: v.Y(vq.y) }, espessura(cor, 7.5, hl), corDoTraco(cor).main);
      const abaixo = (kp!.a ?? 1) * (kp!.t?.a ?? 1) > 0 ? 24 : -24;
      depois.push(() => etiqueta(ctx, hits, { x: v.X(vq.x), y: v.Y(vq.y) + abaixo }, `(${num(vq.x)}; ${num(vq.y)})`, cor));
    }
  }
  if (kp && p.marcar.base && (kp.tipo === "exponencial" || kp.tipo === "logaritmo")) {
    depois.push(() => etiqueta(ctx, hits, { x: A.x + 44, y: A.y + 16 }, `base ${num(kp.b)}`, p.cores.base));
  }
  if (kp && (kp.tipo === "seno" || kp.tipo === "cosseno") && (p.marcar.fase || p.marcar.periodo)) {
    const ta = kp.t?.a ?? 1;
    const media = ta * kp.c + (kp.t?.k ?? 0);
    const topo = media + Math.abs(ta * kp.a);
    const inicio = (kp.fase ?? 0) / (kp.t?.b ?? 1) + (kp.t?.h ?? 0);
    if (p.marcar.fase && Math.abs(inicio) > 1e-9 && dentroY(media)) {
      const cor = corDoTraco(p.cores.fase);
      const y = v.Y(media);
      seg(ctx, { x: v.X(0), y }, { x: v.X(inicio), y }, cor.main, espessura(p.cores.fase, 4, hl));
      const s = Math.sign(inicio);
      polyline(ctx, [{ x: v.X(inicio) - s * 8, y: y - 6 }, { x: v.X(inicio), y }, { x: v.X(inicio) - s * 8, y: y + 6 }], cor.main, 3);
      depois.push(() => etiqueta(ctx, hits, { x: (v.X(0) + v.X(inicio)) / 2, y: y + 20 }, `fase ${num(inicio)}`, p.cores.fase));
    }
    const T = periodo(kp);
    if (p.marcar.periodo && Number.isFinite(T)) {
      const cor = corDoTraco(p.cores.periodo);
      const y = Math.max(A.y + 30, v.Y(topo) - 14);
      const xa = v.X(inicio);
      const xb = v.X(inicio + T);
      seg(ctx, { x: xa, y }, { x: xb, y }, cor.main, espessura(p.cores.periodo, 3, hl));
      seg(ctx, { x: xa, y: y - 7 }, { x: xa, y: y + 7 }, cor.main, 3);
      seg(ctx, { x: xb, y: y - 7 }, { x: xb, y: y + 7 }, cor.main, 3);
      depois.push(() => etiqueta(ctx, hits, { x: (xa + xb) / 2, y: y - 18 }, `T = ${num(T)}`, p.cores.periodo));
    }
  }

  // Ponto que percorre a curva (ou cursor solto no eixo x), com projeções nos eixos.
  if (p.ponto && estado.pontoX !== undefined) {
    const pt = p.ponto;
    const sel = pt.curva;
    for (const xr of pt.rastro && sel !== null ? (estado.rastro ?? []) : []) {
      const yr = alturaDoPonto(curvas, sel, xr).y;
      if (Number.isFinite(yr) && dentroY(yr)) dot(ctx, { x: v.X(xr), y: v.Y(yr) }, 3.5, c.lineDark);
    }
    const x = estado.pontoX;
    const cor = corDoTraco(pt.cor);
    if (sel === null) {
      // Cursor independente: linha vertical e a altura de cada curva nesse x.
      const px = v.X(x);
      seg(ctx, { x: px, y: A.y }, { x: px, y: A.y + A.h }, c.muted, 2, [4, 5]);
      p.curvas.forEach((cv, i) => {
        if (cv.fantasma) return;
        const y = avaliar(curvas[i], x);
        if (!Number.isFinite(y) || !dentroY(y)) return;
        const k = corDoTraco(cv.cor);
        seg(ctx, { x: px, y: eixoY }, { x: px, y: v.Y(y) }, k.main, 3);
        dot(ctx, { x: px, y: v.Y(y) }, 7, k.main);
        depois.push(() => etiqueta(ctx, hits, { x: px + (px > A.x + A.w * 0.7 ? -34 : 34), y: v.Y(y) }, num(y), cv.cor));
      });
      dot(ctx, { x: px, y: eixoY + 3 }, 11, cor.dark);
      dot(ctx, { x: px, y: eixoY }, 11, cor.main);
      dot(ctx, { x: px, y: eixoY }, 5, c.bg);
      if (pt.coordenadas) depois.push(() => etiqueta(ctx, hits, { x: px, y: eixoY + 26 }, `x = ${num(x)}`, pt.cor));
    } else {
      const y = alturaDoPonto(curvas, sel, x).y;
      if (Number.isFinite(y) && y >= y0 - 0.01 && y <= y1 + 0.01) {
        const P = { x: v.X(x), y: v.Y(y) };
        if (pt.retangulo) {
          const k = corDoTraco(pt.corRetangulo);
          const O = { x: v.X(0), y: v.Y(0) };
          poly(ctx, [O, { x: P.x, y: O.y }, P, { x: O.x, y: P.y }], k.tint, k.main, espessura(pt.corRetangulo, 2.5, hl));
          depois.push(() => etiqueta(ctx, hits, { x: (O.x + P.x) / 2, y: (O.y + P.y) / 2 }, `${num(x)} · ${num(y)} = ${num(x * y)}`, pt.corRetangulo));
        }
        seg(ctx, P, { x: P.x, y: eixoY }, c.muted, 2, [4, 5]);
        seg(ctx, P, { x: eixoX, y: P.y }, c.muted, 2, [4, 5]);
        if (pt.espelho && dentroX(y) && dentroY(x)) {
          // Reflexo em y = x: troca as coordenadas; o segmento entre os dois é perpendicular à diagonal.
          const E = { x: v.X(y), y: v.Y(x) };
          seg(ctx, P, E, c.lineDark, 2, [4, 5]);
          dot(ctx, E, 10, cor.tint);
          dot(ctx, E, 10, cor.main);
          dot(ctx, E, 6, c.bg);
          depois.push(() => etiqueta(ctx, hits, { x: E.x + 46, y: E.y + 18 }, `(${num(y)}; ${num(x)})`, pt.cor));
        }
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
