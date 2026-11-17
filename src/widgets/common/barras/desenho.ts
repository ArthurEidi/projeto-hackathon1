// Desenho do widget barras em canvas, compartilhado pelo widget e pela figura estática.
// Cada modo devolve a geometria de toque (retângulos, mapeamentos) que o widget usa no arraste.
import { corDoTraco, ehMarca, type CorTraco } from "../../../ui/marcas";
import { palette as c } from "../../../ui/palette";
import { chip, dot, poly, polyline, seg, text, type Hit, type Pt, type Rect } from "../../canvas";
import { avaliarExpr, type Controles } from "../expr";
import { marcas, num, passoDeMarcas } from "../plot2d";
import {
  arred,
  caixa as calcCaixa,
  desvios,
  limitePG,
  media,
  mediana,
  modas,
  ordenar,
  posicoesQuartis,
  simplificar,
  somasParciais,
  sortear,
  termos,
  termos2,
  valorNaPosicao,
  variancia,
} from "./calc";
import type { BarrasDe } from "./params";

export type Quartil = "q1" | "q2" | "q3";

/** Estado vivo do widget (a figura passa só o que o JSON pede). */
export interface EstadoBarras {
  tipo?: "barras" | "linha" | "setores";
  relativa?: boolean;
  tocadas?: ReadonlySet<number>;
  /** Respostas somadas pela coleta, por categoria. */
  extra?: readonly number[];
  vicio?: boolean;
  rastro?: readonly { n: number; pct: number }[];
  /** Pontos: valores atuais (depois dos arrastes) e apoio. */
  valores?: readonly number[];
  apoio?: number;
  mostrar?: Partial<BarrasDe<"pontos">["mostrar"]>;
  meios?: ReadonlySet<number>;
  /** Fila */
  ordenada?: boolean;
  marcadores?: Partial<Record<Quartil, number>>;
  caixa?: boolean;
  maior?: number;
}

export interface Geo {
  /** Áreas tocáveis (barras, fichas da fila, colunas). */
  alvos: Rect[];
  /** Régua: valor -> px e px -> valor (pontos, fila). */
  X?: (v: number) => number;
  xDe?: (px: number) => number;
  /** Pontos: centro de cada peso e do apoio. */
  pesos?: Pt[];
  apoio?: Pt;
  /** Fila: x de cada meio-índice, e faixa vertical dos marcadores / da régua do boxplot. */
  posX?: (meioIndice: number) => number;
  yMarcadores?: [number, number];
  yRegua?: number;
}

const FONTE = "900 16px Nunito, system-ui, sans-serif";

const espessura = (cor: CorTraco, base: number, hl: readonly string[]) =>
  hl.length === 0 ? base : hl.includes(cor) ? base * 1.5 : base * 0.6;

function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, cor: CorTraco): Rect {
  const k = corDoTraco(cor);
  const area = chip(ctx, p, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...area });
  return area;
}

function retangulo(ctx: CanvasRenderingContext2D, r: Rect, fill?: string, stroke?: string, lw = 2, dash?: number[]) {
  ctx.beginPath();
  ctx.setLineDash(dash ?? []);
  ctx.rect(r.x, r.y, r.w, r.h);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function textoEsq(ctx: CanvasRenderingContext2D, p: Pt, s: string, cor: string, size = 13) {
  ctx.font = `900 ${size}px Nunito, system-ui, sans-serif`;
  ctx.fillStyle = cor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(s, p.x, p.y);
}

/** Régua horizontal numerada; devolve X e o inverso. */
function regua(ctx: CanvasRenderingContext2D, x0: number, x1: number, faixa: readonly [number, number], y: number, passo?: number) {
  const [a, b] = faixa;
  const k = (x1 - x0) / (b - a);
  const X = (v: number) => x0 + (v - a) * k;
  const xDe = (px: number) => a + (px - x0) / k;
  seg(ctx, { x: x0 - 6, y }, { x: x1 + 6, y }, c.axis, 2);
  const p = passo && (b - a) / passo <= 16 ? passo : passoDeMarcas(a, b, 10);
  for (const m of marcas(a, b, p)) {
    seg(ctx, { x: X(m), y: y - 4 }, { x: X(m), y: y + 4 }, c.axis, 2);
    text(ctx, { x: X(m), y: y + 15 }, num(m), c.muted, 11);
  }
  return { X, xDe };
}

// ---------- categorias ----------

function desenharCategorias(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: BarrasDe<"categorias">, ctl: Controles, e: EstadoBarras): Geo {
  const tipo = e.tipo ?? p.tipo;
  const relativa = e.relativa ?? p.relativa;
  const tocadas = e.tocadas ?? new Set(p.acesas);
  const brutos = p.categorias.map((cat, i) => avaliarExpr(cat.valor, ctl) + (e.extra?.[i] ?? 0));
  const total = brutos.reduce((s, x) => s + x, 0);
  const vals = relativa ? brutos.map((x) => (total ? (100 * x) / total : 0)) : brutos;
  const unidade = relativa ? "%" : p.unidade;
  const hl = p.highlight;
  const cor = corDoTraco(p.cor);
  const toque = corDoTraco(p.cor_toque);
  const alvos: Rect[] = [];
  const largGraf = p.tabela ? w * 0.64 : w;

  if (tipo === "setores") {
    const cx = largGraf / 2;
    const cy = h * 0.5;
    const R = Math.min(largGraf, h) * 0.34;
    let ang = -Math.PI / 2;
    const ciclo: CorTraco[] = ["c1", "c2", "c3", "c4"];
    const rotulos: (() => void)[] = [];
    vals.forEach((_, i) => {
      const fr = total ? brutos[i] / total : 0;
      const a1 = ang + fr * Math.PI * 2;
      const k = corDoTraco(ciclo[i % 4]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, ang, a1);
      ctx.closePath();
      ctx.fillStyle = tocadas.has(i) ? k.main : k.tint;
      ctx.fill();
      ctx.strokeStyle = c.bg;
      ctx.lineWidth = 3;
      ctx.stroke();
      const meio = (ang + a1) / 2;
      const nome = p.categorias[i].nome;
      rotulos.push(() => {
        const pr = { x: cx + Math.cos(meio) * R * 0.62, y: cy + Math.sin(meio) * R * 0.62 };
        etiqueta(ctx, hits, pr, `${num(fr * 100, 1)}%`, p.cor_porcento);
        const fora = { x: cx + Math.cos(meio) * (R + 30), y: cy + Math.sin(meio) * (R + 22) };
        text(ctx, fora, nome, c.ink2, 13);
        etiqueta(ctx, hits, { x: fora.x, y: fora.y + 22 }, `${num(fr * 360, 1)}°`, p.cor_angulo);
      });
      alvos.push({ x: cx - R, y: cy - R, w: 2 * R, h: 2 * R });
      ang = a1;
    });
    rotulos.forEach((f) => f());
    // Setores: um alvo por fatia não é retangular; o toque usa o ângulo (ver widget). Guardamos o disco.
  } else {
    const ini = avaliarExpr(p.eixo_inicio, ctl);
    const maxV = Math.max(...vals, ini + 1);
    const passo = passoDeMarcas(ini, maxV, 5);
    const fim = p.eixo_fim ?? Math.ceil(maxV / passo) * passo;
    const area = { x: 46, y: 34, w: largGraf - 46 - 14, h: h - 34 - 46 };
    const Y = (v: number) => area.y + area.h - ((v - ini) / (fim - ini)) * area.h;
    for (const m of marcas(ini, fim, passo)) {
      seg(ctx, { x: area.x, y: Y(m) }, { x: area.x + area.w, y: Y(m) }, c.line, 1);
      text(ctx, { x: area.x - 18, y: Y(m) }, num(m), c.muted, 11);
    }
    seg(ctx, { x: area.x, y: area.y + area.h }, { x: area.x + area.w, y: area.y + area.h }, c.axis, 2);
    seg(ctx, { x: area.x, y: area.y + area.h }, { x: area.x, y: area.y - 6 }, c.axis, 2);
    if (ini > 0) {
      // Eixo cortado: zigue-zague no pé do eixo.
      const yb = area.y + area.h;
      polyline(ctx, [{ x: area.x - 6, y: yb - 10 }, { x: area.x + 6, y: yb - 14 }, { x: area.x - 6, y: yb - 18 }, { x: area.x + 6, y: yb - 22 }], c.red, 2);
    }
    const n = vals.length;
    const slot = area.w / n;
    const bw = Math.min(56, slot * 0.62);
    const topos: Pt[] = [];
    vals.forEach((v, i) => {
      const cx = area.x + slot * (i + 0.5);
      const yt = Math.max(area.y - 4, Y(Math.max(v, ini)));
      topos.push({ x: cx, y: Y(v) });
      const r = { x: cx - bw / 2, y: yt, w: bw, h: area.y + area.h - yt };
      alvos.push({ x: cx - slot / 2, y: area.y, w: slot, h: area.h + 30 });
      if (tipo === "barras") {
        const k = tocadas.has(i) ? toque : cor;
        const lw = espessura(tocadas.has(i) ? p.cor_toque : p.cor, 2, hl);
        retangulo(ctx, r, k.main, k.dark, lw);
      }
      text(ctx, { x: cx, y: area.y + area.h + 16 }, p.categorias[i].nome, c.ink2, 13);
    });
    if (tipo === "linha") {
      polyline(ctx, topos, cor.main, espessura(p.cor, 4, hl));
      topos.forEach((t, i) => {
        dot(ctx, t, 7, tocadas.has(i) ? toque.main : cor.main);
        dot(ctx, t, 3, c.bg);
      });
    }
    vals.forEach((v, i) => {
      if (p.valores === "ao_tocar" && !tocadas.has(i)) return;
      const s = `${num(v, 1)}${unidade}`;
      if (tipo === "barras" || tipo === "linha") {
        const y = Math.max(area.y - 6, Y(Math.max(v, ini))) - 16;
        if (tocadas.has(i)) etiqueta(ctx, hits, { x: topos[i].x, y }, s, p.cor_toque);
        else text(ctx, { x: topos[i].x, y: y + 4 }, s, c.ink2, 13);
      }
    });
    if (p.degraus && vals.length >= 2) {
      const diffs = vals.slice(1).map((v, i) => v - vals[i]);
      const iMax = diffs.reduce((best, d, i) => (d > diffs[best] ? i : best), 0);
      diffs.forEach((d, i) => {
        const xm = (topos[i].x + topos[i + 1].x) / 2;
        const ym = Math.min(topos[i].y, topos[i + 1].y) - 24;
        const txt = `${d >= 0 ? "+" : "−"}${num(Math.abs(d), 1)}${unidade}`;
        if (i === iMax && d > 0) etiqueta(ctx, hits, { x: xm, y: ym }, txt, p.cor_toque);
        else text(ctx, { x: xm, y: ym }, txt, c.muted, 11);
      });
    }
    if (p.comparar) {
      const [i, j] = p.comparar;
      const hi = vals[i] - ini;
      const hj = vals[j] - ini;
      if (hi > 0 && hj >= 0 && i < n && j < n) {
        const s = `${p.categorias[j].nome} parece ${num(hj / hi, 1)}× ${p.categorias[i].nome}`;
        chip(ctx, { x: area.x + area.w / 2, y: 14 }, s, c.ink2, c.ink);
      }
    }
  }

  if (p.tabela) {
    const x0 = largGraf + 4;
    const tw = w - x0 - 8;
    const lh = 30;
    const y0 = Math.max(20, h / 2 - (lh * (vals.length + 1)) / 2);
    retangulo(ctx, { x: x0, y: y0, w: tw, h: lh }, c.surface, c.line, 1);
    textoEsq(ctx, { x: x0 + 8, y: y0 + lh / 2 }, "Item", c.muted, 12);
    textoEsq(ctx, { x: x0 + tw * 0.62, y: y0 + lh / 2 }, relativa ? "%" : "Valor", c.muted, 12);
    vals.forEach((v, i) => {
      const y = y0 + lh * (i + 1);
      const r = { x: x0, y, w: tw, h: lh };
      retangulo(ctx, r, tocadas.has(i) ? toque.tint : c.bg, c.line, 1);
      textoEsq(ctx, { x: x0 + 8, y: y + lh / 2 }, p.categorias[i].nome, c.ink, 13);
      textoEsq(ctx, { x: x0 + tw * 0.62, y: y + lh / 2 }, `${num(v, 1)}${unidade}`, tocadas.has(i) ? toque.dark : c.ink, 13);
    });
  }
  return { alvos };
}

// ---------- amostragem ----------

export function pctsAtuais(p: BarrasDe<"amostragem">, vicio: boolean): number[] {
  return vicio && p.vicio ? p.vicio.populacao : p.populacao.map((q) => q.pct);
}

/** % medida de cada categoria numa amostra de tamanho n. */
export function amostra(p: BarrasDe<"amostragem">, n: number, vicio: boolean): number[] {
  const nn = Math.max(1, Math.round(n));
  const cont = sortear(pctsAtuais(p, vicio), nn, p.semente + (vicio ? 101 : 0));
  return cont.map((k) => (100 * k) / nn);
}

function desenharAmostragem(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: BarrasDe<"amostragem">, ctl: Controles, e: EstadoBarras): Geo {
  const n = Math.max(1, Math.round(avaliarExpr(p.n, ctl)));
  const vicio = e.vicio ?? p.vicio_ligado;
  const med = amostra(p, n, vicio);
  const real = p.populacao.map((q) => q.pct);
  const cor = corDoTraco(p.cor);
  const area = { x: 40, y: 30, w: w - 54, h: h * 0.42 };
  const Y = (v: number) => area.y + area.h - (v / 100) * area.h;
  for (const m of [0, 25, 50, 75, 100]) {
    seg(ctx, { x: area.x, y: Y(m) }, { x: area.x + area.w, y: Y(m) }, c.line, 1);
    text(ctx, { x: area.x - 16, y: Y(m) }, `${m}%`, c.muted, 10);
  }
  seg(ctx, { x: area.x, y: area.y + area.h }, { x: area.x + area.w, y: area.y + area.h }, c.axis, 2);
  const slot = area.w / med.length;
  const bw = Math.min(54, slot * 0.6);
  med.forEach((v, i) => {
    const cx = area.x + slot * (i + 0.5);
    const dest = i === p.destaque;
    retangulo(ctx, { x: cx - bw / 2, y: Y(v), w: bw, h: area.y + area.h - Y(v) }, dest ? cor.main : c.lineDark, dest ? cor.dark : c.muted, 2);
    seg(ctx, { x: cx - bw / 2 - 6, y: Y(real[i]) }, { x: cx + bw / 2 + 6, y: Y(real[i]) }, c.ink2, 2.5, [6, 4]);
    text(ctx, { x: cx, y: area.y + area.h + 14 }, p.populacao[i].nome, c.ink2, 12);
    if (dest) etiqueta(ctx, hits, { x: cx, y: Y(v) - 16 }, `${num(v, 1)}%`, p.cor);
  });
  text(ctx, { x: w / 2, y: 12 }, `amostra de ${n}${vicio && p.vicio ? ` (${p.vicio.rotulo})` : ""}`, c.ink2, 13);

  // Rastro: % medida da categoria acompanhada contra o tamanho da amostra.
  const r = { x: 40, y: area.y + area.h + 40, w: w - 54, h: h - (area.y + area.h + 40) - 26 };
  const nMax = Math.max(n, ...(e.rastro ?? []).map((q) => q.n), 50);
  const RX = (k: number) => r.x + (k / nMax) * r.w;
  const RY = (v: number) => r.y + r.h - (v / 100) * r.h;
  seg(ctx, { x: r.x, y: r.y + r.h }, { x: r.x + r.w, y: r.y + r.h }, c.axis, 2);
  seg(ctx, { x: r.x, y: r.y + r.h }, { x: r.x, y: r.y }, c.axis, 2);
  text(ctx, { x: r.x + r.w - 8, y: r.y + r.h + 12 }, "n", c.ink2, 12);
  text(ctx, { x: r.x - 16, y: RY(real[p.destaque]) }, `${num(real[p.destaque])}%`, c.ink2, 10);
  seg(ctx, { x: r.x, y: RY(real[p.destaque]) }, { x: r.x + r.w, y: RY(real[p.destaque]) }, c.ink2, 2, [6, 4]);
  for (const q of e.rastro ?? []) dot(ctx, { x: RX(q.n), y: RY(q.pct) }, 4, c.lineDark);
  dot(ctx, { x: RX(n), y: RY(med[p.destaque]) }, 7, cor.main);
  return { alvos: [] };
}

// ---------- pontos ----------

export function valoresPontos(p: BarrasDe<"pontos">, ctl: Controles): number[] {
  return p.valores.map((v) => avaliarExpr(v, ctl));
}

/** Inclinação da régua (rad) pelo torque em volta do apoio; 0 quando o apoio está na média. */
export function inclinacao(vals: readonly number[], apoio: number, largura: number): number {
  const torque = vals.reduce((s, v) => s + (v - apoio), 0);
  const t = largura ? torque / largura : 0;
  return Math.max(-0.22, Math.min(0.22, t * 0.5));
}

function desenharPontos(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: BarrasDe<"pontos">, ctl: Controles, e: EstadoBarras): Geo {
  const vals = e.valores ?? valoresPontos(p, ctl);
  const mostrar = { ...p.mostrar, ...e.mostrar };
  const m = media(vals);
  const apoio = e.apoio ?? (p.apoio === "media" ? m : p.apoio === "arrastavel" ? (p.apoio_inicial ?? p.regua[0]) : p.apoio);
  const hl = p.highlight;
  const pad = 30;
  const temQuadrados = mostrar.quadrados && !p.grupo_b;
  const contagens = new Map<number, number>();
  for (const v of vals) contagens.set(v, (contagens.get(v) ?? 0) + 1);
  const maxPilha = Math.max(1, ...contagens.values());
  const yViga = p.grupo_b ? h * 0.36 : mostrar.fila ? h * 0.56 : temQuadrados ? h * 0.36 : maxPilha >= 4 ? h * 0.66 : h * 0.55;
  const k = (w - 2 * pad) / (p.regua[1] - p.regua[0]);
  const X = (v: number) => pad + (v - p.regua[0]) * k;
  const xDe = (px: number) => p.regua[0] + (px - pad) / k;
  const alvos: Rect[] = [];
  const lado = Math.max(18, Math.min(24, k * 1.8));
  const gapPeso = lado + 2;

  const viga = (valores: readonly number[], apoioV: number, y: number, moveis: readonly number[], principal: boolean) => {
    const ang = inclinacao(valores, apoioV, p.regua[1] - p.regua[0]);
    const piv = { x: X(apoioV), y };
    const rot = (v: number, dy: number): Pt => {
      const dx = X(v) - piv.x;
      return { x: piv.x + dx * Math.cos(ang) - dy * Math.sin(ang), y: piv.y + dx * Math.sin(ang) + dy * Math.cos(ang) };
    };
    // Base fixa com números (não inclina) e viga que inclina.
    const r = regua(ctx, pad, w - pad, p.regua, y + 30, p.passo);
    void r;
    seg(ctx, rot(p.regua[0], 0), rot(p.regua[1], 0), c.axis, 5);
    // Apoio (triângulo).
    const corA = corDoTraco(p.cores.apoio);
    poly(ctx, [{ x: piv.x, y: y + 2 }, { x: piv.x - 13, y: y + 24 }, { x: piv.x + 13, y: y + 24 }], corA.main, corA.dark, espessura(p.cores.apoio, 2, hl));
    // Pesos empilhados quando colidem na horizontal.
    const colocados: { x: number; nivel: number }[] = [];
    const centros: Pt[] = [];
    const niveis: number[] = [];
    valores.forEach((v, i) => {
      const xv = X(v);
      let nivel = 0;
      while (colocados.some((c2) => c2.nivel === nivel && Math.abs(c2.x - xv) < gapPeso)) nivel++;
      colocados.push({ x: xv, nivel });
      niveis.push(nivel);
      const ctr = rot(v, -lado / 2 - 3 - nivel * gapPeso);
      centros.push(ctr);
      const movel = moveis.includes(i);
      ctx.save();
      ctx.translate(ctr.x, ctr.y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.roundRect(-lado / 2, -lado / 2, lado, lado, 5);
      ctx.fillStyle = movel ? c.ink : c.ink2;
      ctx.fill();
      if (movel) {
        ctx.strokeStyle = c.yellow;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.fillStyle = c.bg;
      ctx.font = `900 ${lado <= 19 ? 11 : 13}px Nunito, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(principal && p.incognita === i ? "?" : num(v, 1), 0, 1);
      ctx.restore();
    });
    return { centros, niveis, piv, ang };
  };

  const principal = viga(vals, apoio, yViga, p.arrastaveis, true);
  // Rótulo do apoio: a média (ou o apoio, se o aluno o arrasta).
  const rotApoio = p.apoio === "media" ? `média ${num(m, 2)}` : num(apoio, 2);
  etiqueta(ctx, hits, { x: principal.piv.x, y: yViga + 58 }, rotApoio, p.cores.apoio);
  if (p.mostrar.conta_media) {
    const soma = vals.reduce((s, v) => s + v, 0);
    const exprMedia = vals.length <= 5 ? `${vals.map((v) => num(v, 1)).join(" + ")} ÷ ${vals.length}` : `${num(soma, 1)} ÷ ${vals.length}`;
    chip(ctx, { x: w / 2, y: yViga + 80 }, `${exprMedia} = ${num(m, 2)}`, corDoTraco(p.cores.apoio).main, corDoTraco(p.cores.apoio).dark);
  }
  if (p.mostrar.alerta_mediana) {
    const desordenada = vals.some((v, i) => i > 0 && v < vals[i - 1]);
    if (desordenada) {
      const meioCru =
        vals.length % 2 === 1
          ? vals[(vals.length - 1) / 2]
          : (vals[vals.length / 2 - 1] + vals[vals.length / 2]) / 2;
      chip(ctx, { x: X(meioCru), y: yViga - 72 }, `mediana sem ordenar (${num(meioCru, 1)})!`, c.red, c.red);
    }
  }

  const yMinFila = mostrar.fila ? 60 : 16;
  if (mostrar.mediana) {
    const md = mediana(vals);
    const cor = corDoTraco(p.cores.mediana);
    const xm = X(md);
    const maxNiv = Math.max(0, ...principal.niveis);
    const yTopo = Math.max(mostrar.fila ? 58 : 24, Math.min(yViga - 96, yViga - (maxNiv + 1) * gapPeso - 8));
    seg(ctx, { x: xm, y: yViga - 8 }, { x: xm, y: yTopo }, cor.main, espessura(p.cores.mediana, 3, hl));
    poly(ctx, [{ x: xm, y: yTopo }, { x: xm + 18, y: yTopo + 7 }, { x: xm, y: yTopo + 14 }], cor.main);
    const xEtq = xm < w * 0.6 ? xm + 70 : xm - 70;
    etiqueta(ctx, hits, { x: xEtq, y: Math.max(yMinFila, yTopo - 10) }, `mediana ${num(md, 2)}`, p.cores.mediana);
  }
  if (mostrar.moda) {
    for (const mo of modas(vals)) {
      const cnt = vals.reduce((mx, v, i) => (v === mo ? Math.max(mx, principal.niveis[i] + 1) : mx), 0);
      chip(ctx, { x: X(mo), y: Math.max(yMinFila, yViga - cnt * gapPeso - 18) }, "moda", c.lineDark, c.muted, c.ink);
    }
  }

  const linhaDesvios = (valores: readonly number[], y0: number) => {
    const mm = media(valores);
    const cor = corDoTraco(p.cores.desvio);
    valores.forEach((v, i) => {
      const y = y0 + i * 12;
      if (Math.abs(v - mm) < 1e-9) {
        dot(ctx, { x: X(v), y }, 3, cor.main);
        return;
      }
      seg(ctx, { x: X(mm), y }, { x: X(v), y }, cor.main, espessura(p.cores.desvio, 3, hl));
      const s = Math.sign(v - mm);
      polyline(ctx, [{ x: X(v) - s * 6, y: y - 4 }, { x: X(v), y }, { x: X(v) - s * 6, y: y + 4 }], cor.main, 2.5);
    });
  };

  if (p.grupo_b) {
    const yb = h * 0.78;
    const b = viga(p.grupo_b, media(p.grupo_b), yb, [], false);
    void b;
    text(ctx, { x: 14, y: yViga - 40 }, "A", c.ink, 16);
    text(ctx, { x: 14, y: yb - 40 }, "B", c.ink, 16);
    if (mostrar.desvios) {
      linhaDesvios(vals, yViga + 76);
      linhaDesvios(p.grupo_b, yb + 44);
    }
  } else if (mostrar.desvios || mostrar.soma_desvios) {
    const y0 = yViga + 82;
    if (mostrar.soma_desvios) {
      // Setas encadeadas ponta com cauda a partir da média: terminam de volta na média.
      const cor = corDoTraco(p.cores.desvio);
      let x = m;
      desvios(vals).forEach((d, i) => {
        const y = y0 + i * 10;
        seg(ctx, { x: X(x), y }, { x: X(x + d), y }, cor.main, 3);
        x += d;
      });
      etiqueta(ctx, hits, { x: X(m), y: y0 + vals.length * 10 + 18 }, `soma ${num(arred(x - m))}`, p.cores.desvio);
    } else linhaDesvios(vals, y0);
  }

  if (temQuadrados) {
    const ds = desvios(vals);
    const v2 = variancia(vals);
    const lados = ds.map(Math.abs);
    const yq = yViga + 90 + (mostrar.desvios ? vals.length * 12 : 0);
    const disponivel = h - yq - 10;
    const totalLarg = lados.reduce((s, l) => s + l, 0) + Math.sqrt(v2) + 1;
    const kq = Math.min(k, disponivel / Math.max(...lados, Math.sqrt(v2), 0.1), (w - 2 * pad - 8 * (lados.length + 1)) / totalLarg);
    const corQ = corDoTraco(p.cores.quadrado);
    let x = pad;
    lados.forEach((l) => {
      if (l > 0) {
        retangulo(ctx, { x, y: yq, w: l * kq, h: l * kq }, c.surface, c.ink2, 2);
        text(ctx, { x: x + (l * kq) / 2, y: yq + (l * kq) / 2 }, num(l * l), c.ink2, 12);
      }
      x += l * kq + 8;
    });
    x += 10;
    const lm = Math.sqrt(v2);
    retangulo(ctx, { x, y: yq, w: lm * kq, h: lm * kq }, corQ.tint, corQ.main, espessura(p.cores.quadrado, 3, hl));
    etiqueta(ctx, hits, { x: x + (lm * kq) / 2, y: yq + (lm * kq) / 2 }, num(v2, 2), p.cores.quadrado);
    const corL = p.cores.lado;
    if (mostrar.raiz) seg(ctx, { x, y: yq + lm * kq + 6 }, { x: x + lm * kq, y: yq + lm * kq + 6 }, corDoTraco(corL).main, 3);
    if (mostrar.raiz && yq + lm * kq + 24 < h) etiqueta(ctx, hits, { x: x + (lm * kq) / 2, y: Math.min(h - 14, yq + lm * kq + 22) }, `√${num(v2, 2)} = ${num(lm, 2)}`, corL);
  }

  if (mostrar.fila) {
    // Fila ordenada no alto; com tocar_meios, as fichas são tocáveis.
    const o = ordenar(vals);
    const fw = Math.min(44, (w - 40) / o.length - 6);
    const x0 = w / 2 - (o.length * (fw + 6) - 6) / 2;
    const meios = o.length % 2 ? [o.length >> 1] : [o.length / 2 - 1, o.length / 2];
    o.forEach((v, i) => {
      const r = { x: x0 + i * (fw + 6), y: 14, w: fw, h: 30 };
      const aceso = e.meios?.has(i) && meios.includes(i);
      const k = corDoTraco(p.cores.mediana);
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, r.w, r.h, 7);
      ctx.fillStyle = aceso ? k.main : c.bg;
      ctx.fill();
      ctx.strokeStyle = aceso ? k.dark : c.lineDark;
      ctx.lineWidth = 2;
      ctx.stroke();
      text(ctx, { x: r.x + r.w / 2, y: r.y + r.h / 2 + 1 }, num(v, 1), aceso ? c.bg : c.ink, 14);
      alvos.push(r);
    });
  }

  return { alvos, X, xDe, pesos: principal.centros, apoio: { x: principal.piv.x, y: yViga + 14 } };
}

// ---------- fila ----------

export function quartisCertos(n: number) {
  return posicoesQuartis(n);
}

function desenharFila(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: BarrasDe<"fila">, _ctl: Controles, e: EstadoBarras): Geo {
  const hl = p.highlight;
  const maior = e.maior;
  // Com o maior arrastável, o maior valor da lista troca pelo valor atual.
  const base = [...p.valores];
  if (maior !== undefined) {
    const iMax = base.indexOf(Math.max(...base));
    base[iMax] = maior;
  }
  const ordenada = e.ordenada ?? p.ordenada;
  const fila = ordenada ? ordenar(base) : base;
  const n = fila.length;
  const fw = Math.min(46, (w - 32) / n - 6);
  const x0 = w / 2 - (n * (fw + 6) - 6) / 2;
  const cxFicha = (i: number) => x0 + i * (fw + 6) + fw / 2;
  const posX = (pos: number) => (pos % 2 === 0 ? cxFicha(pos / 2) : (cxFicha((pos - 1) / 2) + cxFicha((pos + 1) / 2)) / 2);
  const yF = h * 0.2;
  const yM: [number, number] = [yF - 12, yF + 70];
  const marcadoresVisiveis: { q: "q1" | "q2" | "q3"; pos: number; x: number }[] = [];
  if (ordenada) {
    const certos = posicoesQuartis(n);
    const visiveis = new Set<Quartil>([...p.fixos, ...p.arrastaveis]);
    for (const q of ["q1", "q2", "q3"] as const) {
      if (!visiveis.has(q)) continue;
      const pos = p.fixos.includes(q) ? certos[q] : (e.marcadores?.[q] ?? null);
      if (pos === null) continue;
      const x = posX(pos);
      const cor = corDoTraco(p.cores[q]);
      // Linha vertical desenhada antes das fichas para passar atrás dos dígitos.
      seg(ctx, { x, y: yM[0] }, { x, y: yM[1] - 16 }, cor.main, espessura(p.cores[q], 4, hl));
      marcadoresVisiveis.push({ q, pos, x });
    }
    // Mínimo e máximo: as pontas da fila ordenada.
    for (const ex of p.extremos) {
      const x = cxFicha(ex === "min" ? 0 : n - 1);
      seg(ctx, { x, y: yM[0] }, { x, y: yM[1] - 16 }, corDoTraco(p.cores.extremo).main, espessura(p.cores.extremo, 4, hl));
    }
  }
  const alvos: Rect[] = [];
  fila.forEach((v, i) => {
    const r = { x: cxFicha(i) - fw / 2, y: yF, w: fw, h: 34 };
    ctx.beginPath();
    ctx.roundRect(r.x, r.y + 3, r.w, r.h, 8);
    ctx.fillStyle = c.ink;
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(r.x, r.y, r.w, r.h, 8);
    ctx.fillStyle = c.ink2;
    ctx.fill();
    text(ctx, { x: cxFicha(i), y: yF + 18 }, num(v, 1), c.bg, 15);
    alvos.push(r);
  });

  if (ordenada) {
    for (const { q, pos, x } of marcadoresVisiveis) {
      const cor = corDoTraco(p.cores[q]);
      etiqueta(ctx, hits, { x, y: yM[1] }, q.toUpperCase(), p.cores[q]);
      text(ctx, { x, y: yM[1] + 24 }, num(valorNaPosicao(ordenar(base), pos), 1), cor.dark, 13);
    }
    for (const ex of p.extremos) {
      const x = cxFicha(ex === "min" ? 0 : n - 1);
      etiqueta(ctx, hits, { x, y: yM[1] }, ex === "min" ? "MÍN" : "MÁX", p.cores.extremo);
      text(ctx, { x, y: yM[1] + 24 }, num(fila[ex === "min" ? 0 : n - 1], 1), corDoTraco(p.cores.extremo).dark, 13);
    }
  } else {
    text(ctx, { x: w / 2, y: yF + 58 }, "fora de ordem", c.muted, 13);
  }

  // Boxplot numa régua de valores.
  const mostrarCaixa = e.caixa ?? p.caixa;
  const lo = Math.min(...base, ...(p.regua ? [p.regua[0]] : []));
  const hiBase = p.maior_arrastavel ? Math.max(p.maior_arrastavel.ate, ...base) : Math.max(...base);
  const faixa: [number, number] = p.regua ?? [Math.floor(lo) - 1, Math.ceil(hiBase) + 1];
  const yR = h * 0.86;
  const { X, xDe } = regua(ctx, 30, w - 30, faixa, yR);
  if (mostrarCaixa) {
    const cx = calcCaixa(base);
    const corC = corDoTraco(p.cores.caixa);
    const yc = yR - 44;
    const hc = 34;
    seg(ctx, { x: X(cx.bigodeMin), y: yc + hc / 2 }, { x: X(cx.q1), y: yc + hc / 2 }, c.ink2, 2.5);
    seg(ctx, { x: X(cx.q3), y: yc + hc / 2 }, { x: X(cx.bigodeMax), y: yc + hc / 2 }, c.ink2, 2.5);
    seg(ctx, { x: X(cx.bigodeMin), y: yc + 8 }, { x: X(cx.bigodeMin), y: yc + hc - 8 }, c.ink2, 2.5);
    seg(ctx, { x: X(cx.bigodeMax), y: yc + 8 }, { x: X(cx.bigodeMax), y: yc + hc - 8 }, c.ink2, 2.5);
    retangulo(ctx, { x: X(cx.q1), y: yc, w: X(cx.q3) - X(cx.q1), h: hc }, corC.tint, corC.main, espessura(p.cores.caixa, 3, hl));
    seg(ctx, { x: X(cx.q2), y: yc }, { x: X(cx.q2), y: yc + hc }, corDoTraco(p.cores.q2).main, 3.5);
    for (const a of cx.atipicos) {
      dot(ctx, { x: X(a), y: yc + hc / 2 }, 7, c.ink2);
      dot(ctx, { x: X(a), y: yc + hc / 2 }, 4, c.bg);
    }
    if (cx.atipicos.length) seg(ctx, { x: X(cx.cercaAlta), y: yc - 6 }, { x: X(cx.cercaAlta), y: yR }, c.red, 2, [4, 4]);
    etiqueta(ctx, hits, { x: (X(cx.q1) + X(cx.q3)) / 2, y: yc - 18 }, `AIQ ${num(cx.aiq, 2)}`, p.cores.caixa);
  }
  if (maior !== undefined) {
    dot(ctx, { x: X(maior), y: yR + 3 }, 10, c.ink);
    dot(ctx, { x: X(maior), y: yR }, 10, c.ink2);
    dot(ctx, { x: X(maior), y: yR }, 4, c.bg);
  }
  return { alvos, posX, yMarcadores: yM, yRegua: yR, X, xDe };
}

// ---------- sequência ----------

export function regraResolvida(r: { regra: "pa" | "pg" | "recorrencia" | "recorrencia2"; a1: number; d: number; q: number }) {
  return { a1: r.a1, d: r.regra === "pg" || r.regra === "recorrencia2" ? 0 : r.d, q: r.regra === "pa" ? 1 : r.q };
}

function gerarTermos(
  r: { regra: "pa" | "pg" | "recorrencia" | "recorrencia2"; a1: number; a2?: number; d: number; p?: number; q: number },
  n: number,
): number[] {
  const res = regraResolvida(r);
  return r.regra === "recorrencia2" ? termos2(res.a1, r.a2 ?? res.a1, r.p ?? 1, res.q, n) : termos(res.a1, res.d, res.q, n);
}

export function termosSequencia(p: BarrasDe<"sequencia">, ctl: Controles) {
  const a1 = avaliarExpr(p.a1, ctl);
  const a2 = p.a2 !== undefined ? avaliarExpr(p.a2, ctl) : undefined;
  const d = avaliarExpr(p.d, ctl);
  const coefP = avaliarExpr(p.p, ctl);
  const q = avaliarExpr(p.q, ctl);
  const r = regraResolvida({ regra: p.regra, a1, d, q });
  const t = gerarTermos({ regra: p.regra, a1, a2, d, p: coefP, q }, p.termos);
  const nAceso = p.n === undefined ? p.termos : Math.max(0, Math.min(p.termos, Math.round(avaliarExpr(p.n, ctl))));
  return { ...r, t, nAceso, somas: somasParciais(t) };
}

function desenharSequencia(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: BarrasDe<"sequencia">, ctl: Controles): Geo {
  const { t, nAceso, somas, a1, d, q } = termosSequencia(p, ctl);
  const hl = p.highlight;
  const fant = p.fantasma
    ? gerarTermos(
        {
          regra: p.fantasma.regra,
          a1: avaliarExpr(p.fantasma.a1, ctl),
          a2: p.fantasma.a2 !== undefined ? avaliarExpr(p.fantasma.a2, ctl) : undefined,
          d: avaliarExpr(p.fantasma.d, ctl),
          p: avaliarExpr(p.fantasma.p, ctl),
          q: avaliarExpr(p.fantasma.q, ctl),
        },
        p.termos,
      )
    : [];
  const lim = p.limite ? limitePG(a1, q) : NaN;
  const sAceso = nAceso ? somas[nAceso - 1] : 0;
  const vals = [0, ...t, ...fant, ...(p.acumular ? [sAceso, ...somas.slice(0, nAceso)] : []), ...(Number.isFinite(lim) ? [lim] : [])];
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  if (hi - lo < 1e-9) hi = lo + 1;
  const folga = (hi - lo) * 0.12;
  lo = lo < 0 ? lo - folga : lo;
  hi += folga;
  const torre = p.acumular ? 74 : 0;
  const area = { x: 40, y: 40, w: w - 52 - torre, h: h - 40 - 44 };
  const Y = (v: number) => area.y + area.h - ((v - lo) / (hi - lo)) * area.h;
  const passo = passoDeMarcas(lo, hi, 6);
  for (const m of marcas(lo, hi, passo)) {
    seg(ctx, { x: area.x, y: Y(m) }, { x: area.x + area.w + torre, y: Y(m) }, c.line, 1);
    text(ctx, { x: area.x - 18, y: Y(m) }, num(m), c.muted, 11);
  }
  seg(ctx, { x: area.x, y: Y(0) }, { x: area.x + area.w + torre, y: Y(0) }, c.axis, 2);
  seg(ctx, { x: area.x, y: area.y + area.h }, { x: area.x, y: area.y - 6 }, c.axis, 2);

  const slot = area.w / p.termos;
  const bw = Math.min(46, slot * 0.6);
  const corT = corDoTraco(p.cores.termo);
  const alvos: Rect[] = [];
  const cx = (i: number) => area.x + slot * (i + 0.5);
  const barra = (i: number, v: number) => ({ x: cx(i) - bw / 2, y: Math.min(Y(v), Y(0)), w: bw, h: Math.max(2, Math.abs(Y(v) - Y(0))) });
  fant.forEach((v, i) => retangulo(ctx, { ...barra(i, v), x: cx(i) - bw / 2 - 5, w: bw + 10 }, undefined, c.lineDark, 2, [6, 5]));
  const rotulos: (() => void)[] = [];
  t.forEach((v, i) => {
    const r = barra(i, v);
    alvos.push({ x: cx(i) - slot / 2, y: area.y, w: slot, h: area.h + 40 });
    const aceso = i < nAceso;
    if (aceso) retangulo(ctx, r, corT.main, corT.dark, espessura(p.cores.termo, 2, hl));
    else retangulo(ctx, r, undefined, c.lineDark, 2, [4, 4]);
    if (p.acesos.includes(i + 1)) retangulo(ctx, { x: r.x - 4, y: r.y - 4, w: r.w + 8, h: r.h + 8 }, undefined, c.ink, 3);
    // Índice embaixo do eixo.
    const yIdx = area.y + area.h + 18;
    if (i === nAceso - 1) rotulos.push(() => etiqueta(ctx, hits, { x: cx(i), y: yIdx }, `n = ${i + 1}`, p.cores.indice));
    else text(ctx, { x: cx(i), y: yIdx }, String(i + 1), aceso ? corDoTraco(p.cores.indice).main : c.muted, 13);
    if (aceso) {
      const yv = v >= 0 ? r.y - 14 : r.y + r.h + 14;
      if (i === nAceso - 1) rotulos.push(() => etiqueta(ctx, hits, { x: cx(i), y: yv - (v >= 0 ? 4 : -4) }, num(v, p.casas), p.cores.termo));
      else text(ctx, { x: cx(i), y: yv }, num(v, p.casas), corT.dark, 13);
    }
  });
  if (p.degraus) {
    for (let i = 0; i + 1 < nAceso; i++) {
      const yTopo = Math.min(Y(Math.max(t[i], t[i + 1], 0)), Y(0)) - 34;
      const x = (cx(i) + cx(i + 1)) / 2;
      const partes: [string, CorTraco][] = [];
      if (p.regra === "recorrencia2") {
        if (i >= 1) {
          const parc = q * t[i - 1];
          partes.push([`${parc >= 0 ? "+" : "−"}${num(Math.abs(parc), 3)}`, p.cores.d]);
        }
      } else {
        if (p.regra !== "pa") partes.push([`×${num(q, 3)}`, p.cores.q]);
        if (p.regra !== "pg") partes.push([`${d >= 0 ? "+" : "−"}${num(Math.abs(d), 3)}`, p.cores.d]);
      }
      partes.forEach(([s, cor], j) => {
        const k = corDoTraco(cor);
        ctx.font = "900 12px Nunito, system-ui, sans-serif";
        const tw = ctx.measureText(s).width + 10;
        const y = yTopo - j * 18;
        ctx.beginPath();
        ctx.roundRect(x - tw / 2, y - 9, tw, 18, 6);
        ctx.fillStyle = k.tint;
        ctx.fill();
        text(ctx, { x, y: y + 1 }, s, k.dark, 12);
      });
    }
  }
  if (p.acumular) {
    // Torre da soma parcial: os termos acesos empilhados.
    const xt = area.x + area.w + torre / 2;
    const corS = corDoTraco(p.cores.soma);
    let acc = 0;
    for (let i = 0; i < nAceso; i++) {
      const y1 = Y(acc);
      const y2 = Y(acc + t[i]);
      retangulo(ctx, { x: xt - 20, y: Math.min(y1, y2), w: 40, h: Math.max(1.5, Math.abs(y2 - y1)) }, i % 2 ? corS.tint : corS.main, corS.dark, 1.5);
      acc += t[i];
    }
    text(ctx, { x: xt, y: area.y + area.h + 18 }, `S${sub(nAceso)}`, corS.dark, 14);
    rotulos.push(() => etiqueta(ctx, hits, { x: xt, y: Math.min(Y(sAceso), Y(0)) - 16 }, num(sAceso, p.casas), p.cores.soma));
  }
  if (Number.isFinite(lim)) {
    seg(ctx, { x: area.x, y: Y(lim) }, { x: area.x + area.w + torre, y: Y(lim) }, c.ink2, 2, [8, 6]);
    chip(ctx, { x: area.x + 44, y: Y(lim) - 14 }, `limite ${num(lim, 2)}`, c.ink2, c.ink);
  }
  const nomeRegra = p.regra === "pa" ? "PA" : p.regra === "pg" ? "PG" : "";
  if (nomeRegra) text(ctx, { x: w - 28, y: 16 }, nomeRegra, c.muted, 14);
  rotulos.forEach((f) => f());
  return { alvos };
}

const SUB = "₀₁₂₃₄₅₆₇₈₉";
const sub = (n: number) => String(n).replace(/\d/g, (d) => SUB[Number(d)]);

// ---------- parte e todo ----------

export function parteTodo(p: BarrasDe<"parte_todo">, ctl: Controles) {
  const partes = Math.max(1, Math.round(avaliarExpr(p.partes, ctl)));
  const pintadas = Math.max(0, Math.round(avaliarExpr(p.pintadas, ctl)));
  const fracao = pintadas / partes;
  const ref = p.referencia ? { partes: Math.max(1, Math.round(avaliarExpr(p.referencia.partes, ctl))), pintadas: Math.round(avaliarExpr(p.referencia.pintadas, ctl)) } : null;
  return { partes, pintadas, fracao, porcento: arred(fracao * 100), ref, equivalente: ref ? Math.abs(ref.pintadas / ref.partes - fracao) < 1e-9 : false };
}

function desenharParteTodo(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: BarrasDe<"parte_todo">, ctl: Controles): Geo {
  const { partes, pintadas, fracao, ref } = parteTodo(p, ctl);
  const hl = p.highlight;
  const x0 = 30;
  const L = w - 60;
  const corP = corDoTraco(p.cores.parte);
  const corT = corDoTraco(p.cores.todo);
  const todo = p.todo !== undefined ? avaliarExpr(p.todo, ctl) : undefined;

  // Fração, razão e % no alto à direita (linha de 4 a 32 px).
  const linha: [string, CorTraco][] = [];
  if (p.mostrar.fracao) linha.push([`${pintadas}/${partes}`, p.cores.parte]);
  if (p.mostrar.razao) {
    const [a, b] = simplificar(pintadas, partes);
    linha.push([`razão ${a}/${b}`, p.cores.razao]);
  }
  if (p.mostrar.porcento) linha.push([`${num(fracao * 100, 1)}%`, p.cores.porcento]);
  ctx.font = FONTE;
  const larguras = linha.map(([s]) => Math.max(28, ctx.measureText(s).width + 16));
  const xLinha = w - 14 - larguras.reduce((s, l) => s + l + 8, -8);

  // Layout vertical. Abaixo da barra principal vão as chaves: parte (+12, etiqueta até +44)
  // e todo (+60, etiqueta até +94). Tudo tem de caber em h, senão a etiqueta do todo
  // corta na borda (visto em razao-proporcao-porcentagem e notacao-cientifica, 400 px).
  const TOPO = 38;
  const ABAIXO = 94;
  let bh = 50;
  let yRef = 0;
  let yBarra: number;
  if (ref) {
    // Texto "a/b" da barra cinza: na linha das etiquetas, à esquerda, se couber; senão, acima da barra.
    const sRef = `${ref.pintadas}/${ref.partes}`;
    ctx.font = "900 13px Nunito, system-ui, sans-serif";
    const cabeNaLinha = x0 + ctx.measureText(sRef).width + 12 < (linha.length ? xLinha : w);
    yRef = cabeNaLinha ? TOPO : TOPO + 18;
    bh = Math.max(30, Math.min(50, Math.floor((h - 4 - ABAIXO - yRef - 22) / 2)));
    yBarra = yRef + bh + 22;
    if (cabeNaLinha) textoEsq(ctx, { x: x0, y: 18 }, sRef, c.muted, 13);
    else text(ctx, { x: x0 + L / 2, y: yRef - 10 }, sRef, c.muted, 13);
  } else {
    bh = Math.max(30, Math.min(50, h - 4 - ABAIXO - TOPO));
    yBarra = Math.max(TOPO, Math.min(h * 0.16 + 20, h - 4 - ABAIXO - bh));
  }

  // Centro de uma etiqueta sem deixá-la sair pelas laterais (parte pequena, colada à esquerda).
  const dentroDaLargura = (x: number, s: string) => {
    ctx.font = FONTE;
    const meia = Math.max(28, ctx.measureText(s).width + 16) / 2;
    return Math.min(w - 6 - meia, Math.max(6 + meia, x));
  };

  const faixa = (y: number, np: number, npint: number, fill: string, stroke: string, lw: number) => {
    // Pode pintar mais que o todo (fração imprópria): a barra cresce além de 100%, até 2 todos.
    const larg = L / np;
    const total = Math.max(np, Math.min(npint, 2 * np));
    const escala = total > np ? np / total : 1;
    for (let i = 0; i < total; i++) {
      const r = { x: x0 + i * larg * escala, y, w: larg * escala, h: bh };
      retangulo(ctx, r, i < npint ? fill : c.bg, stroke, lw);
    }
    return escala;
  };

  if (ref) faixa(yRef, ref.partes, ref.pintadas, c.lineDark, c.muted, 1.5);
  const escala = faixa(yBarra, partes, pintadas, corP.main, corT.main, espessura(p.cores.todo, 2.5, hl));
  // Contorno do todo.
  retangulo(ctx, { x: x0, y: yBarra, w: L * escala, h: bh }, undefined, corT.dark, espessura(p.cores.todo, 3.5, hl));
  if (todo !== undefined) {
    const cada = todo / partes;
    const larg = (L / partes) * escala;
    if (larg > 26) for (let i = 0; i < Math.max(partes, pintadas); i++) text(ctx, { x: x0 + (i + 0.5) * larg, y: yBarra + bh / 2 + 1 }, num(cada, 2), i < pintadas ? c.bg : c.ink2, 13);
  }
  // Chaves: parte embaixo da parte pintada, todo embaixo da barra inteira.
  const yP = yBarra + bh + 12;
  if (pintadas > 0) {
    const xf = x0 + Math.min(pintadas, 2 * partes) * (L / partes) * escala;
    seg(ctx, { x: x0, y: yP }, { x: xf, y: yP }, corP.main, espessura(p.cores.parte, 4, hl));
    const sP = `${p.rotulos.parte} = ${todo !== undefined ? num((todo / partes) * pintadas, 2) : pintadas}`;
    etiqueta(ctx, hits, { x: dentroDaLargura((x0 + xf) / 2, sP), y: yP + 18 }, sP, p.cores.parte);
  }
  const yT = yP + 48;
  seg(ctx, { x: x0, y: yT }, { x: x0 + L * escala, y: yT }, corT.main, espessura(p.cores.todo, 4, hl));
  const sT = `${p.rotulos.todo} = ${todo !== undefined ? num(todo, 2) : partes}`;
  etiqueta(ctx, hits, { x: dentroDaLargura(x0 + (L * escala) / 2, sT), y: yT + 18 }, sT, p.cores.todo);

  // Régua de % embaixo, com a marca da fração.
  const yR = yT + 62;
  if (p.mostrar.porcento && yR + 30 < h) {
    seg(ctx, { x: x0, y: yR }, { x: x0 + L, y: yR }, c.axis, 2);
    for (const m of [0, 25, 50, 75, 100]) {
      seg(ctx, { x: x0 + (L * m) / 100, y: yR - 4 }, { x: x0 + (L * m) / 100, y: yR + 4 }, c.axis, 2);
      text(ctx, { x: x0 + (L * m) / 100, y: yR + 15 }, `${m}%`, c.muted, 11);
    }
    const xm = x0 + L * Math.min(fracao, 1);
    dot(ctx, { x: xm, y: yR }, 7, corDoTraco(p.cores.porcento).main);
  }
  let xx = xLinha;
  linha.forEach(([s, cor], i) => {
    etiqueta(ctx, hits, { x: xx + larguras[i] / 2, y: 18 }, s, cor);
    xx += larguras[i] + 8;
  });
  return { alvos: [] };
}

export function desenharBarras(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: import("./params").Barras,
  ctl: Controles,
  e: EstadoBarras = {},
): Geo {
  switch (p.modo) {
    case "categorias":
      return desenharCategorias(ctx, w, h, hits, p, ctl, e);
    case "amostragem":
      return desenharAmostragem(ctx, w, h, hits, p, ctl, e);
    case "pontos":
      return desenharPontos(ctx, w, h, hits, p, ctl, e);
    case "fila":
      return desenharFila(ctx, w, h, hits, p, ctl, e);
    case "sequencia":
      return desenharSequencia(ctx, w, h, hits, p, ctl);
    case "parte_todo":
      return desenharParteTodo(ctx, w, h, hits, p, ctl);
  }
}

/** Proporção altura/largura de cada modo. */
export function aspectoBarras(p: import("./params").Barras): number {
  if (p.modo === "pontos") return p.mostrar.quadrados || p.grupo_b ? 1 : 0.8;
  if (p.modo === "parte_todo") return 0.72;
  if (p.modo === "amostragem") return 0.9;
  return 0.78;
}
