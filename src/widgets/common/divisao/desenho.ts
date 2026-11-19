// Desenho em canvas do divisao_polinomial e divisao_polinomial_figura. Legível em 400 px, cores c1..c4.
import { seg, type Hit, type Pt } from "../../canvas";
import type { CorTraco, Marca } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { avaliarExpr, type Controles } from "../expr";
import { etiqueta, fmt, nota, notaEsq, quase, tinta } from "../geo/base";
import {
  avaliarPolinomio,
  dividirLonga,
  dividirPorConstante,
  formatarDivisorLinear,
  formatarPolinomio,
  formatarQuocienteParcial,
} from "./calc";
import type { DivisaoPolinomial } from "./params";

export function aspectoDivisao(p: DivisaoPolinomial): number {
  if (p.modo === "constante") return 0.88;
  return Math.max(0.64, Math.min(0.95, 0.64 + (p.coeficientes.length - 2) * 0.14));
}

/** Maior fonte (de `size` até 9 px) em que `s` cabe em `maxW`. */
function fonteQueCabe(ctx: CanvasRenderingContext2D, s: string, size: number, maxW: number): number {
  let t = size;
  for (; t > 9; t--) {
    ctx.font = `900 ${t}px Nunito, system-ui, sans-serif`;
    if (ctx.measureText(s).width <= maxW) break;
  }
  return t;
}

/** Texto centrado que encolhe até caber em `maxW`. */
function notaQueCabe(ctx: CanvasRenderingContext2D, p: Pt, s: string, c: CorTraco, size: number, maxW: number) {
  nota(ctx, p, s, c, fonteQueCabe(ctx, s, size, maxW));
}

/** Texto à esquerda que encolhe até caber em `maxW`. */
function notaEsqQueCabe(ctx: CanvasRenderingContext2D, p: Pt, s: string, cor: string, size: number, maxW: number) {
  notaEsq(ctx, p, s, cor, fonteQueCabe(ctx, s, size, maxW));
}

/** Chip quando cabe em `maxW` (fonte do chip: 16 px); senão o mesmo texto sem fundo, encolhido, com a mesma dica. */
function etiquetaQueCabe(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, c: Marca, maxW: number) {
  ctx.font = `900 16px Nunito, system-ui, sans-serif`;
  const tw = ctx.measureText(s).width;
  if (tw + 16 <= maxW) {
    etiqueta(ctx, hits, p, s, c);
    return;
  }
  const t = fonteQueCabe(ctx, s, 15, maxW);
  nota(ctx, p, s, c, t);
  ctx.font = `900 ${t}px Nunito, system-ui, sans-serif`;
  const w = ctx.measureText(s).width;
  hits.push({ key: c, x: p.x - w / 2, y: p.y - 12, w, h: 24 });
}

/** "+ 3" ou "− 1" (sinal tipográfico; nunca "+ −1"). */
const maisResto = (r: number) => (r < 0 && !quase(r, 0) ? `− ${fmt(-r)}` : `+ ${fmt(Math.abs(r) < 1e-9 ? 0 : r)}`);

function largura(highlight: readonly Marca[], marca: Marca, base: number): number {
  if (highlight.length === 0) return base;
  return highlight.includes(marca) ? base + 1.5 : Math.max(1.2, base - 1);
}

function desenharCurva(
  ctx: CanvasRenderingContext2D,
  mapPt: (x: number, y: number) => Pt,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  fn: (x: number) => number,
  cor: string,
  lw: number,
  dash: number[] = [],
) {
  ctx.save();
  ctx.strokeStyle = cor;
  ctx.lineWidth = lw;
  ctx.setLineDash(dash);
  ctx.beginPath();
  const passos = 80;
  let iniciado = false;
  for (let i = 0; i <= passos; i++) {
    const x = xMin + ((xMax - xMin) * i) / passos;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yMin - 1 || y > yMax + 1) {
      iniciado = false;
      continue;
    }
    const p = mapPt(x, Math.max(yMin, Math.min(yMax, y)));
    if (!iniciado) {
      ctx.moveTo(p.x, p.y);
      iniciado = true;
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function desenharConstante(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<DivisaoPolinomial, { modo: "constante" }>,
  ctl: Controles,
) {
  const d = avaliarExpr(p.d, ctl);
  const res = dividirPorConstante(p.coeficientes, d);

  // Área do mini gráfico
  const gx0 = 34;
  const gx1 = w - 20;
  const gy0 = 14;
  const gy1 = Math.min(168, h * 0.48);
  const xMin = -3;
  const xMax = 3;
  const yMin = -2;
  const yMax = 8;

  const mapPt = (x: number, y: number): Pt => ({
    x: gx0 + ((x - xMin) / (xMax - xMin)) * (gx1 - gx0),
    y: gy1 - ((y - yMin) / (yMax - yMin)) * (gy1 - gy0),
  });

  // Grade leve
  ctx.save();
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 1;
  for (let x = -2; x <= 2; x++) {
    const p0 = mapPt(x, yMin);
    const p1 = mapPt(x, yMax);
    seg(ctx, p0, p1, palette.line, 1);
  }
  for (let y = 0; y <= 8; y += 2) {
    const p0 = mapPt(xMin, y);
    const p1 = mapPt(xMax, y);
    seg(ctx, p0, p1, palette.line, 1);
  }
  ctx.restore();

  // Eixos
  const orig = mapPt(0, 0);
  seg(ctx, { x: gx0, y: orig.y }, { x: gx1, y: orig.y }, palette.ink2, 1.5);
  seg(ctx, { x: orig.x, y: gy0 }, { x: orig.x, y: gy1 }, palette.ink2, 1.5);

  if (!res.valido) {
    nota(ctx, { x: w / 2, y: (gy0 + gy1) / 2 }, "Divisor zero é proibido", "c4", 15);
    return;
  }

  // Curva original fantasma
  if (p.fantasma && !quase(d, 1)) {
    desenharCurva(
      ctx,
      mapPt,
      xMin,
      xMax,
      yMin,
      yMax,
      (x) => avaliarPolinomio(p.coeficientes, x),
      palette.muted,
      2,
      [6, 5],
    );
    const pFant = mapPt(2.15, Math.min(yMax - 0.8, avaliarPolinomio(p.coeficientes, 2.15)));
    nota(ctx, { x: Math.min(gx1 - 24, pFant.x), y: Math.max(gy0 + 12, pFant.y - 10) }, "P(x)", "muted", 12);
  }

  // Curva quociente Q(x) = P(x) / d
  desenharCurva(
    ctx,
    mapPt,
    xMin,
    xMax,
    yMin,
    yMax,
    (x) => avaliarPolinomio(res.quociente, x),
    tinta("c3"),
    largura(p.highlight, "c3", 2.8),
  );

  // Quadro algébrico abaixo do gráfico
  const yBase = gy1 + 26;
  notaQueCabe(ctx, { x: w / 2, y: yBase }, `P(x) = ${formatarPolinomio(p.coeficientes)}`, "ink", 14, w - 16);

  const yChips = yBase + 34;
  etiquetaQueCabe(ctx, hits, { x: w * 0.28, y: yChips }, `Divisor d = ${fmt(d)}`, "c2", w * 0.56 - 8);
  // Com mostrar_resto = false (antes_de_concluir), o resto fica em aberto até o aluno concluir.
  if (p.mostrar_resto) etiqueta(ctx, hits, { x: w * 0.72, y: yChips }, "Resto = 0", "c4");
  else nota(ctx, { x: w * 0.72, y: yChips }, "Resto = ?", "muted", 15);

  const yQuoc = yChips + 38;
  etiquetaQueCabe(ctx, hits, { x: w / 2, y: yQuoc }, `Q(x) = ${formatarPolinomio(res.quociente)}`, "c3", w - 16);

  const yRodape = h - 18;
  const resto = p.mostrar_resto ? " + 0" : "";
  notaQueCabe(
    ctx,
    { x: w / 2, y: yRodape },
    quase(d, 1)
      ? `Dividir por 1 mantém P(x)${p.mostrar_resto ? " e resto 0" : ""}`
      : `P(x) = ${fmt(d)} · (${formatarPolinomio(res.quociente)})${resto}`,
    quase(d, 1) ? "muted" : "ink",
    13,
    w - 16,
  );
}

export function desenharDivisao(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: DivisaoPolinomial,
  ctl: Controles,
) {
  if (p.modo === "constante") {
    desenharConstante(ctx, w, h, hits, p, ctl);
    return;
  }

  const r = avaliarExpr(p.r, ctl);
  const maxEtapa = p.coeficientes.length - 1;
  const etapaAtual = Math.max(0, Math.min(maxEtapa, Math.round(avaliarExpr(p.etapa, ctl))));
  const res = dividirLonga(p.coeficientes, r);

  const colEsq = 22;
  const divX = Math.round(w * 0.56);
  const colDir = Math.round((divX + w - 16) / 2);

  // Dividendo no topo esquerdo
  const yDividendo = 32;
  // Coluna da esquerda vai até a chave (divX), com 6 px de folga.
  const largEsq = divX - 6 - colEsq;
  const largDir = w - 16 - divX - 8;
  notaEsqQueCabe(ctx, { x: colEsq, y: yDividendo }, formatarPolinomio(p.coeficientes, true), palette.ink2, 15, largEsq);

  // Chave (barra vertical + barra horizontal à direita)
  const yBarraH = 50;
  const alturaChave = 72;
  seg(ctx, { x: divX, y: 16 }, { x: divX, y: 16 + alturaChave }, palette.ink2, 2);
  seg(ctx, { x: divX, y: yBarraH }, { x: w - 16, y: yBarraH }, palette.ink2, 2);

  // Divisor acima da barra horizontal
  etiquetaQueCabe(ctx, hits, { x: colDir, y: yDividendo }, formatarDivisorLinear(r), "c2", largDir);

  // Quociente abaixo da barra horizontal
  const yQuoc = yBarraH + 26;
  if (etapaAtual === 0) {
    nota(ctx, { x: colDir, y: yQuoc }, "Q(x) = ?", "muted", 14);
  } else if (etapaAtual < maxEtapa) {
    const parcial = formatarQuocienteParcial(res.quociente, etapaAtual);
    etiquetaQueCabe(ctx, hits, { x: colDir, y: yQuoc }, `${parcial} + ?`, "c3", largDir);
  } else {
    etiquetaQueCabe(ctx, hits, { x: colDir, y: yQuoc }, `Q(x) = ${formatarPolinomio(res.quociente)}`, "c3", largDir);
  }

  // Etapas de subtração à esquerda
  const passoY = 50;
  for (let i = 0; i < etapaAtual; i++) {
    const et = res.etapas[i];
    const yRet = yDividendo + 26 + i * passoY;
    const textoProd = `−(${formatarPolinomio(et.produto)})`;
    notaEsqQueCabe(ctx, { x: colEsq, y: yRet }, textoProd, tinta("c2"), 14, largEsq);
    hits.push({ key: "c2", x: colEsq, y: yRet - 12, w: divX - colEsq - 10, h: 24 });

    const yTraco = yRet + 12;
    seg(ctx, { x: colEsq, y: yTraco }, { x: divX - 14, y: yTraco }, palette.muted, 1.5);

    const yRest = yTraco + 16;
    const ehUltima = i === maxEtapa - 1;
    if (ehUltima) {
      etiqueta(ctx, hits, { x: colEsq + 42, y: yRest + 2 }, `R = ${fmt(res.resto)}`, "c4");
    } else {
      notaEsqQueCabe(ctx, { x: colEsq + 14, y: yRest }, formatarPolinomio(et.restante, true), palette.ink2, 14, largEsq - 14);
    }
  }

  // Rodapé com identidade ou instrução
  const yRodape = h - 18;
  if (etapaAtual >= maxEtapa) {
    const idTxt = `${formatarPolinomio(p.coeficientes)} = (${formatarDivisorLinear(r)})(${formatarPolinomio(res.quociente)}) ${maisResto(res.resto)}`;
    notaQueCabe(ctx, { x: w / 2, y: yRodape }, idTxt, "c4", 13, w - 16);
  } else {
    nota(ctx, { x: w / 2, y: yRodape }, `Etapa ${etapaAtual} de ${maxEtapa} — avance o controle`, "muted", 13);
  }
}
