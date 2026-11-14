// Desenho da reta numérica: trechos (intervalos) coloridos, pontos fixos e um ponto móvel.
import { corDoTraco, ehMarca, type CorTraco } from "../../ui/marcas";
import { palette as c } from "../../ui/palette";
import { chip, dot, polyline, seg, text, type Hit } from "../canvas";
import type { ModoOperacao, RetaNumerica, Trecho } from "./params";
import { marcas, num } from "./plot2d";

export interface VistaReta {
  X: (x: number) => number;
  xDe: (px: number) => number;
  y: number;
}

export interface OpcoesReta {
  centro?: number;
  modoOp?: ModoOperacao;
}

export function resolverModoOperacao(modo: string, controls: Record<string, number>): ModoOperacao {
  if (!modo.startsWith("$")) return modo as ModoOperacao;
  const v = Math.round(controls[modo.slice(1)] ?? 0);
  if (v === 1) return "intersecao";
  if (v === 2) return "diferenca";
  return "uniao";
}

interface Limite {
  val: number;
  open: boolean;
}

const limInf = (t: Trecho): Limite =>
  t.de === null ? { val: -Infinity, open: true } : { val: t.de, open: t.abreDe };

const limSup = (t: Trecho): Limite =>
  t.ate === null ? { val: Infinity, open: true } : { val: t.ate, open: t.abreAte };

const maxLimInf = (a: Limite, b: Limite): Limite => {
  if (a.val !== b.val) return a.val > b.val ? a : b;
  return { val: a.val, open: a.open || b.open };
};

const minLimInf = (a: Limite, b: Limite): Limite => {
  if (a.val !== b.val) return a.val < b.val ? a : b;
  return { val: a.val, open: a.open && b.open };
};

const minLimSup = (a: Limite, b: Limite): Limite => {
  if (a.val !== b.val) return a.val < b.val ? a : b;
  return { val: a.val, open: a.open || b.open };
};

const maxLimSup = (a: Limite, b: Limite): Limite => {
  if (a.val !== b.val) return a.val > b.val ? a : b;
  return { val: a.val, open: a.open && b.open };
};

const naoVazio = (L: Limite, U: Limite): boolean =>
  L.val < U.val || (L.val === U.val && !L.open && !U.open);

const paraTrecho = (L: Limite, U: Limite, cor: CorTraco, rotulo?: string): Trecho => ({
  de: Number.isFinite(L.val) ? L.val : null,
  ate: Number.isFinite(U.val) ? U.val : null,
  abreDe: Number.isFinite(L.val) ? L.open : false,
  abreAte: Number.isFinite(U.val) ? U.open : false,
  cor,
  rotulo,
});

function intersecaoLimites(aL: Limite, aU: Limite, bL: Limite, bU: Limite, cor: CorTraco): Trecho[] {
  const L = maxLimInf(aL, bL);
  const U = minLimSup(aU, bU);
  return naoVazio(L, U) ? [paraTrecho(L, U, cor)] : [];
}

/** Calcula união, interseção ou diferença (A \ B) de dois intervalos na reta real. */
export function operarTrechos(a: Trecho, b: Trecho, modo: ModoOperacao, cor: CorTraco = "c4"): Trecho[] {
  const aL = limInf(a);
  const aU = limSup(a);
  const bL = limInf(b);
  const bU = limSup(b);
  if (!naoVazio(aL, aU)) return modo === "uniao" && naoVazio(bL, bU) ? [{ ...b, cor }] : [];
  if (!naoVazio(bL, bU)) return modo === "intersecao" ? [] : [{ ...a, cor }];

  if (modo === "intersecao") return intersecaoLimites(aL, aU, bL, bU, cor);

  if (modo === "uniao") {
    const aAntes = minLimInf(aL, bL) === aL || (aL.val === bL.val && !aL.open);
    const [pL, pU, sL, sU] = aAntes ? [aL, aU, bL, bU] : [bL, bU, aL, aU];
    const encosta = sL.val < pU.val || (sL.val === pU.val && (!sL.open || !pU.open));
    if (encosta) return [paraTrecho(minLimInf(pL, sL), maxLimSup(pU, sU), cor)];
    return [paraTrecho(pL, pU, cor), paraTrecho(sL, sU, cor)];
  }

  // Diferença A \ B = (A ∩ (-∞, B.L')) ∪ (A ∩ (B.U', +∞))
  const res: Trecho[] = [];
  if (Number.isFinite(bL.val)) {
    res.push(...intersecaoLimites(aL, aU, { val: -Infinity, open: true }, { val: bL.val, open: !bL.open }, cor));
  }
  if (Number.isFinite(bU.val)) {
    res.push(...intersecaoLimites(aL, aU, { val: bU.val, open: !bU.open }, { val: Infinity, open: true }, cor));
  }
  return res;
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

function desenharTrecho(
  ctx: CanvasRenderingContext2D,
  hits: Hit[],
  w: number,
  x0: number,
  x1: number,
  X: (x: number) => number,
  t: Trecho,
  ty: number,
  hl: readonly string[],
) {
  const cor = corDoTraco(t.cor);
  const a = t.de === null ? 10 : X(Math.max(x0, t.de));
  const b = t.ate === null ? w - 10 : X(Math.min(x1, t.ate));
  seg(ctx, { x: a, y: ty }, { x: b, y: ty }, cor.main, largura(t.cor, 6, hl));
  if (t.de === null) polyline(ctx, [{ x: a + 9, y: ty - 6 }, { x: a, y: ty }, { x: a + 9, y: ty + 6 }], cor.main, 3);
  else bolinha(ctx, a, ty, cor.main, t.abreDe);
  if (t.ate === null) polyline(ctx, [{ x: b - 9, y: ty - 6 }, { x: b, y: ty }, { x: b - 9, y: ty + 6 }], cor.main, 3);
  else bolinha(ctx, b, ty, cor.main, t.abreAte);
  if (t.rotulo) etiqueta(ctx, hits, (a + b) / 2, ty - 16, t.rotulo, t.cor);
}

export function aspectoReta(p: RetaNumerica): number {
  const temAbaixo =
    p.pontos.some((pt) => Boolean(pt.rotulo)) || Boolean(p.ponto?.distanciaZero) || p.ponto?.centro !== undefined;
  return temAbaixo ? 0.56 : 0.42;
}

export function desenharReta(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: RetaNumerica,
  pontoX?: number,
  opcoes?: OpcoesReta,
): VistaReta {
  const [x0, x1] = p.intervalo;
  const pad = 28;
  const k = (w - 2 * pad) / (x1 - x0);
  const X = (x: number) => pad + (x - x0) * k;
  const temPontosAbaixo = p.pontos.some((pt) => Boolean(pt.rotulo));
  const temDist = Boolean(p.ponto?.distanciaZero) || opcoes?.centro !== undefined;
  const y = p.operacao ? h * 0.68 : temPontosAbaixo || temDist ? h * 0.46 : h * 0.62;
  const hl = p.highlight;

  // Linha com setas nas duas pontas e marcas numeradas.
  seg(ctx, { x: 8, y }, { x: w - 8, y }, c.axis, 2.5);
  polyline(ctx, [{ x: w - 16, y: y - 6 }, { x: w - 7, y }, { x: w - 16, y: y + 6 }], c.axis, 2.5);
  polyline(ctx, [{ x: 16, y: y - 6 }, { x: 7, y }, { x: 16, y: y + 6 }], c.axis, 2.5);
  for (const m of marcas(x0, x1, p.marcas)) {
    seg(ctx, { x: X(m), y: y - 6 }, { x: X(m), y: y + 6 }, c.axis, 2);
    text(ctx, { x: X(m), y: y + 18 }, num(m), m === 0 ? c.ink : c.muted, 12);
  }

  // Trechos empilhados acima da linha.
  const passoTrilha = 18;
  const baseY = p.ponto?.vertice ? y - 28 : y - 18;
  p.trechos.forEach((t, i) => {
    desenharTrecho(ctx, hits, w, x0, x1, X, t, baseY - i * passoTrilha, hl);
  });

  let totalTrilhas = p.trechos.length;
  if (p.operacao) {
    const modo = opcoes?.modoOp ?? (p.operacao.modo.startsWith("$") ? "uniao" : (p.operacao.modo as ModoOperacao));
    const yA = baseY - totalTrilhas * passoTrilha;
    const yB = yA - passoTrilha;
    const yRes = yB - passoTrilha;
    desenharTrecho(ctx, hits, w, x0, x1, X, { ...p.operacao.a, cor: "c1", rotulo: p.operacao.a.rotulo ?? "A" }, yA, hl);
    desenharTrecho(ctx, hits, w, x0, x1, X, { ...p.operacao.b, cor: "c2", rotulo: p.operacao.b.rotulo ?? "B" }, yB, hl);
    const res = operarTrechos(p.operacao.a, p.operacao.b, modo, "c4");
    const rotuloRes = modo === "uniao" ? "A ∪ B" : modo === "intersecao" ? "A ∩ B" : "A \\ B";
    if (res.length === 0) {
      etiqueta(ctx, hits, w / 2, yRes, `${rotuloRes} = ∅`, "c4");
    } else {
      res.forEach((t, i) => {
        desenharTrecho(ctx, hits, w, x0, x1, X, { ...t, rotulo: i === 0 ? rotuloRes : undefined }, yRes, hl);
      });
    }
    totalTrilhas += 3;
  }

  for (const pf of p.pontos) {
    const cor = corDoTraco(pf.cor);
    bolinha(ctx, X(pf.x), y, cor.main, pf.aberto);
    if (pf.rotulo) etiqueta(ctx, hits, X(pf.x), y + 44, pf.rotulo, pf.cor);
  }

  if (p.ponto && pontoX !== undefined) {
    const pm = p.ponto;
    const px = X(pontoX);
    const centro = opcoes?.centro;

    if (centro !== undefined) {
      const cx = X(centro);
      if (pm.vertice) {
        const corH = corDoTraco(pm.corCentro);
        bolinha(ctx, cx, y, corH.main, false);
        etiqueta(ctx, hits, cx, y - 16, "h", pm.corCentro);
      }
      if (pontoX !== centro) {
        const corVetor = corDoTraco("c3");
        const yVetor = y + 34;
        seg(ctx, { x: cx, y: yVetor }, { x: px, y: yVetor }, corVetor.main, largura("c3", 3, hl));
        const dir = px > cx ? -1 : 1;
        polyline(
          ctx,
          [{ x: px + dir * 7, y: yVetor - 5 }, { x: px, y: yVetor }, { x: px + dir * 7, y: yVetor + 5 }],
          corVetor.main,
          2.5,
        );

        const corDist = corDoTraco("c4");
        const yDist = y + 48;
        seg(ctx, { x: cx, y: yDist }, { x: px, y: yDist }, corDist.main, largura("c4", 4, hl));
        seg(ctx, { x: cx, y: yDist - 5 }, { x: cx, y: yDist + 5 }, corDist.main, 2.5);
        seg(ctx, { x: px, y: yDist - 5 }, { x: px, y: yDist + 5 }, corDist.main, 2.5);
        etiqueta(ctx, hits, (cx + px) / 2, yDist + 14, num(Math.abs(pontoX - centro)), "c4");
      }
    } else if (pm.distanciaZero && pontoX !== 0) {
      const cor = corDoTraco(pm.corDistancia);
      const yy = temPontosAbaixo ? y + 58 : y + 34;
      seg(ctx, { x: X(0), y: yy }, { x: px, y: yy }, cor.main, largura(pm.corDistancia, 4, hl));
      seg(ctx, { x: X(0), y: yy - 6 }, { x: X(0), y: yy + 6 }, cor.main, 3);
      seg(ctx, { x: px, y: yy - 6 }, { x: px, y: yy + 6 }, cor.main, 3);
      etiqueta(ctx, hits, (X(0) + px) / 2, yy + 18, num(Math.abs(pontoX)), pm.corDistancia);
    }

    const cor = corDoTraco(pm.cor);
    dot(ctx, { x: px, y: y + 3 }, 11, cor.dark);
    dot(ctx, { x: px, y }, 11, cor.main);
    dot(ctx, { x: px, y }, 5, c.bg);
    const chipY = Math.max(14, baseY - totalTrilhas * passoTrilha - 8);
    etiqueta(ctx, hits, px, chipY, num(pontoX), pm.cor);
  }

  return { X, xDe: (px) => x0 + (px - pad) / k, y };
}
