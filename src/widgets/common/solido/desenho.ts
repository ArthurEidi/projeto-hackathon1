// Desenho do solido_3d: cena 3D (malhas + anotações), placar no alto e painel 2D embaixo.
import { DEG } from "../../../math3d/revolve";
import { project, type Camera } from "../../../math3d/project";
import { corDoTraco, ehMarca, type CorTraco } from "../../../ui/marcas";
import { palette as c } from "../../../ui/palette";
import { chip, dot, polyline, seg, text, type Hit, type Pt, type Rect } from "../../canvas";
import type { Controles } from "../expr";
import { num } from "../plot2d";
import { malhaVistas, montarCena, type Cena, type EstadoSolido } from "./cenas";
import { desenharMalhas, enquadrar, media3, mul, norma, sub, unit3, soma, type Vec3 } from "./malha";
import type { Solido } from "./params";

function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, cor: CorTraco): Rect {
  const k = corDoTraco(cor);
  const area = chip(ctx, p, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...area });
  return area;
}

/** O widget pode ter painel 2D (reserva a parte de baixo do canvas)? */
export function temPainel(p: Solido): boolean {
  if (p.modo === "prisma") return typeof p.abrir === "string" || p.abrir > 0;
  if (p.modo === "cilindro") return typeof p.desenrolar === "string" || p.desenrolar > 0;
  if (p.modo === "tronco") return p.meridiano;
  if (p.modo === "vistas") return p.sombras && p.solido !== "dado";
  return false;
}

export const aspectoSolido = (p: Solido) => (temPainel(p) ? 1.25 : 0.9);

export interface VistaSolido {
  cena: Cena;
  cam: Camera;
}

export function desenharSolido(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Solido,
  ctl: Controles,
  e: EstadoSolido & { yawGraus?: number; pitchGraus?: number } = {},
): VistaSolido {
  const yaw = (e.yawGraus ?? p.camera.yaw) * DEG;
  const pitch = (e.pitchGraus ?? p.camera.pitch) * DEG;
  const cena = montarCena(p, ctl, { ...e, yaw });
  const painel = temPainel(p);
  const topo = cena.placar.length ? 40 : 6;
  const reg = { x: 0, y: topo, w, h: (painel ? h * 0.62 : h) - topo };
  const pts = [...cena.malhas.flatMap((m) => m.v), ...cena.extras, ...cena.anotacoes.flatMap((a) => (a.tipo === "seg" ? [a.a, a.b] : a.tipo === "poligono" ? a.pts : a.tipo === "ponto" || a.tipo === "texto" ? [a.p] : []))];
  const cam = enquadrar(pts.length ? pts : [[0, 0, 0]], yaw, pitch, reg);
  const P = (v: Vec3) => project(v, cam);
  const hl = p.highlight;
  const largura = (cor: CorTraco, base: number) => (hl.length === 0 ? base : hl.includes(cor as never) ? base * 1.5 : base * 0.6);
  const centro = P(media3(pts.length ? pts : [[0, 0, 0]]));
  const raio = Math.max(...pts.map((q) => norma(sub(q, cam.target)))) || 1;

  // Planos e seções por baixo das arestas.
  for (const a of cena.anotacoes) {
    if (a.tipo !== "poligono") continue;
    const q = a.pts.map(P);
    const k = corDoTraco(a.cor);
    ctx.beginPath();
    ctx.moveTo(q[0].x, q[0].y);
    for (const x of q.slice(1)) ctx.lineTo(x.x, x.y);
    ctx.closePath();
    ctx.fillStyle = k.tint;
    ctx.fill();
    if (a.forte) {
      ctx.strokeStyle = k.main;
      ctx.lineWidth = largura(a.cor, 3);
      ctx.stroke();
    }
  }
  desenharMalhas(ctx, cena.malhas, cam);

  const depois: (() => void)[] = [];
  for (const a of cena.anotacoes) {
    if (a.tipo === "seg") {
      const A = P(a.a);
      const B = P(a.b);
      const k = a.cor === "ink" ? { main: c.axis } : corDoTraco(a.cor);
      seg(ctx, A, B, k.main, largura(a.cor, a.lw ?? 3.5), a.tracejado ? [6, 6] : undefined);
      if (a.rotulo) {
        const m = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
        // Afasta o rótulo para fora do segmento, do lado oposto ao centro da cena.
        const nx = -(B.y - A.y);
        const ny = B.x - A.x;
        const n = Math.hypot(nx, ny) || 1;
        let ux = nx / n;
        let uy = ny / n;
        if ((m.x - centro.x) * ux + (m.y - centro.y) * uy < 0) [ux, uy] = [-ux, -uy];
        const s = a.rotulo;
        depois.push(() => etiqueta(ctx, hits, { x: m.x + ux * (18 + 2.5 * s.length), y: m.y + uy * 18 }, s, a.cor));
      }
    } else if (a.tipo === "ponto") {
      const k = a.cor === "ink" ? { main: c.ink2 } : corDoTraco(a.cor);
      dot(ctx, P(a.p), 4.5, k.main);
      if (a.rotulo) depois.push(() => etiqueta(ctx, hits, { x: P(a.p).x + 16, y: P(a.p).y - 14 }, a.rotulo!, a.cor));
    } else if (a.tipo === "reto") {
      const s = raio * 0.09;
      const u = unit3(sub(a.a, a.o));
      const v = unit3(sub(a.b, a.o));
      const p1 = soma(a.o, mul(u, s));
      const p2 = soma(p1, mul(v, s));
      const p3 = soma(a.o, mul(v, s));
      polyline(ctx, [P(p1), P(p2), P(p3)], corDoTraco(a.cor).main, 2.5);
    } else if (a.tipo === "texto") {
      depois.push(() => text(ctx, P(a.p), a.s, c.ink, 15));
    }
  }
  for (const f of depois) f();

  // Placar no alto, quebrando linha se precisar.
  if (cena.placar.length) {
    ctx.font = "900 16px Nunito, system-ui, sans-serif";
    let x = 8;
    let y = 18;
    for (const pl of cena.placar) {
      const lw = Math.max(28, ctx.measureText(pl.s).width + 16);
      if (x + lw > w - 4 && x > 8) {
        x = 8;
        y += 32;
      }
      etiqueta(ctx, hits, { x: x + lw / 2, y }, pl.s, pl.cor);
      x += lw + 8;
    }
  }

  if (painel && cena.painel) desenharPainel(ctx, hits, cena, { x: 8, y: h * 0.62 + 6, w: w - 16, h: h * 0.38 - 12 });
  else if (painel && p.modo !== "vistas") {
    text(ctx, { x: w / 2, y: h * 0.81 }, "mova o controle para abrir", c.muted, 13);
  }
  return { cena, cam };
}

function desenharPainel(ctx: CanvasRenderingContext2D, hits: Hit[], cena: Cena, r: Rect) {
  const d = cena.painel!.dados as Record<string, never>;
  seg(ctx, { x: r.x, y: r.y - 4 }, { x: r.x + r.w, y: r.y - 4 }, c.line, 2);
  switch (cena.painel!.tipo) {
    case "faixa": {
      const lados = d.lados as unknown as number[];
      const hh = d.h as unknown as number;
      const t = d.abrir as unknown as number;
      const cor = d.cor as unknown as CorTraco;
      const per = lados.reduce((s, x) => s + x, 0);
      const k = Math.min((r.w - 50) / per, (r.h - 56) / hh);
      const x0 = r.x + 34;
      const y0 = r.y + 8;
      const abertas = Math.ceil(t * lados.length - 1e-9);
      let x = x0;
      lados.forEach((l, i) => {
        const aberta = i < abertas;
        const kk = corDoTraco(cor);
        ctx.beginPath();
        ctx.setLineDash(aberta ? [] : [5, 5]);
        ctx.rect(x, y0, l * k, hh * k);
        ctx.fillStyle = aberta ? kk.tint : c.bg;
        ctx.fill();
        ctx.strokeStyle = aberta ? kk.main : c.lineDark;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
        text(ctx, { x: x + (l * k) / 2, y: y0 + hh * k + 12 }, num(l), c.ink2, 12);
        x += l * k;
      });
      etiqueta(ctx, hits, { x: x0 - 18, y: y0 + (hh * k) / 2 }, num(hh), d.corH as unknown as CorTraco);
      etiqueta(ctx, hits, { x: r.x + r.w / 2, y: r.y + r.h - 12 }, `(${lados.map((l) => num(l)).join(" + ")}) × ${num(hh)} = ${num(per * hh)}`, cor);
      break;
    }
    case "rotulo": {
      const rr = d.r as unknown as number;
      const hh = d.h as unknown as number;
      const t = d.t as unknown as number;
      const cor = d.cor as unknown as CorTraco;
      const L = 2 * Math.PI * rr;
      const k = Math.min((r.w * 0.72) / L, (r.h - 44) / hh);
      const kk = corDoTraco(cor);
      const y0 = r.y + 6;
      ctx.beginPath();
      ctx.rect(r.x + 4, y0, L * k, hh * k);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = c.lineDark;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.rect(r.x + 4, y0, L * k * t, hh * k);
      ctx.fillStyle = kk.tint;
      ctx.fill();
      ctx.strokeStyle = kk.main;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      etiqueta(ctx, hits, { x: r.x + 4 + (L * k * t) / 2, y: y0 + hh * k + 16 }, t >= 1 ? `2πr = ${num(2 * rr)}π` : num(L * t), cor);
      // As duas tampas.
      const R2 = Math.min(rr * k, r.h * 0.2, (r.w * 0.22) / 2);
      const kr = corDoTraco(d.corR as unknown as CorTraco);
      for (const j of [0, 1]) {
        const cx = r.x + r.w - R2 - 6;
        const cy = y0 + R2 + j * (2 * R2 + 8);
        dot(ctx, { x: cx, y: cy }, R2, kr.tint);
        ctx.beginPath();
        ctx.arc(cx, cy, R2, 0, Math.PI * 2);
        ctx.strokeStyle = kr.main;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (j === 0) text(ctx, { x: cx, y: cy }, `${num(rr * rr)}π`, kr.dark, 12);
      }
      break;
    }
    case "meridiano": {
      const R = d.R as unknown as number;
      const rr = d.r as unknown as number;
      const ht = d.ht as unknown as number;
      const k = Math.min((r.w - 60) / (2 * R), (r.h - 30) / Math.max(ht, 0.1));
      const cx = r.x + r.w / 2;
      const yb = r.y + r.h - 10;
      const pts = [
        { x: cx - R * k, y: yb },
        { x: cx + R * k, y: yb },
        { x: cx + rr * k, y: yb - ht * k },
        { x: cx - rr * k, y: yb - ht * k },
      ];
      const kk = corDoTraco(d.cor as unknown as CorTraco);
      ctx.beginPath();
      pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.fillStyle = c.surface;
      ctx.fill();
      ctx.strokeStyle = c.ink2;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Triângulo lateral: altura h_t, base R − r, hipotenusa g.
      const T = [{ x: cx + rr * k, y: yb }, pts[1], pts[2]];
      ctx.beginPath();
      T.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.fillStyle = kk.tint;
      ctx.fill();
      seg(ctx, T[0], T[2], c.ink2, 2, [4, 4]);
      seg(ctx, pts[1], pts[2], kk.main, 3.5);
      etiqueta(ctx, hits, { x: (T[0].x + pts[1].x) / 2, y: yb + 2 }, num(R - rr), d.corK as unknown as CorTraco);
      etiqueta(ctx, hits, { x: T[0].x - 22, y: (yb + pts[2].y) / 2 }, num(ht), d.corK as unknown as CorTraco);
      etiqueta(ctx, hits, { x: (pts[1].x + pts[2].x) / 2 + 30, y: (pts[1].y + pts[2].y) / 2 }, `g = ${num(Math.hypot(ht, R - rr))}`, d.cor as unknown as CorTraco);
      break;
    }
    case "sombras": {
      const nome = d.nome as unknown as Parameters<typeof malhaVistas>[0];
      const m = malhaVistas(nome);
      const vistas: [string, number, number, CorTraco][] = [
        ["frente", 0, 0, "c1"],
        ["topo", 0, 90, "c3"],
        ["lado", 90, 0, "c2"],
      ];
      const lw = r.w / 3;
      vistas.forEach(([s, yaw, pitch, cor], i) => {
        const reg = { x: r.x + i * lw + 6, y: r.y + 20, w: lw - 12, h: r.h - 24 };
        const k = corDoTraco(cor);
        ctx.beginPath();
        ctx.roundRect(reg.x, reg.y, reg.w, reg.h, 8);
        ctx.fillStyle = k.tint;
        ctx.fill();
        text(ctx, { x: reg.x + reg.w / 2, y: r.y + 8 }, s, k.dark, 13);
        const cam = enquadrar(m.v, yaw * DEG, pitch * DEG, reg, 1.3);
        desenharMalhas(ctx, [{ ...m, aresta: k.dark }], cam, { ocultas: false });
      });
      break;
    }
  }
}
