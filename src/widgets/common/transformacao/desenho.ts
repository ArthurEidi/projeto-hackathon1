// Desenho em canvas de transformacao_plano e transformacao_figura.
import type { Marca } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { seg, type Hit, type Pt } from "../../canvas";
import { criarVista, etiqueta, fmt, nota, tinta, tintaClara, type Caixa, type Vista } from "../geo/base";
import { aplicar, det2, multiplicar, resolverMatriz, resolverVetor, type Mat2 } from "./calc";
import type { Transformacao } from "./params";

export function aspectoTransformacao(p: Transformacao): number {
  return p.depois ? 0.56 : 0.92;
}

function largura(highlight: readonly Marca[], marca: Marca, base: number): number {
  if (highlight.length === 0) return base;
  return highlight.includes(marca) ? base + 1.5 : Math.max(1.2, base - 1);
}

function setaMundo(ctx: CanvasRenderingContext2D, v: Vista, de: Pt, para: Pt, cor: string, lw: number) {
  const A = v.q(de);
  const B = v.q(para);
  seg(ctx, A, B, cor, lw);
  const comp = Math.hypot(B.x - A.x, B.y - A.y);
  if (comp < 4) return;
  const ang = Math.atan2(B.y - A.y, B.x - A.x);
  const tam = Math.min(9, comp * 0.45);
  const ab = 0.48;
  seg(ctx, B, { x: B.x - tam * Math.cos(ang - ab), y: B.y - tam * Math.sin(ang - ab) }, cor, lw);
  seg(ctx, B, { x: B.x - tam * Math.cos(ang + ab), y: B.y - tam * Math.sin(ang + ab) }, cor, lw);
}

function eixosEGrade(ctx: CanvasRenderingContext2D, v: Vista, caixa: Caixa) {
  for (let i = Math.ceil(caixa.x0); i <= Math.floor(caixa.x1); i++) {
    seg(ctx, v.p(i, caixa.y0), v.p(i, caixa.y1), i === 0 ? palette.axis : palette.line, i === 0 ? 1.5 : 1);
  }
  for (let j = Math.ceil(caixa.y0); j <= Math.floor(caixa.y1); j++) {
    seg(ctx, v.p(caixa.x0, j), v.p(caixa.x1, j), j === 0 ? palette.axis : palette.line, j === 0 ? 1.5 : 1);
  }
}

function desenharMalhaDeformada(ctx: CanvasRenderingContext2D, v: Vista, M: Mat2) {
  const cor = tintaClara("c2");
  for (let i = -3; i <= 3; i++) {
    seg(ctx, v.q(aplicar(M, { x: i, y: -3 })), v.q(aplicar(M, { x: i, y: 3 })), cor, 1);
    seg(ctx, v.q(aplicar(M, { x: -3, y: i })), v.q(aplicar(M, { x: 3, y: i })), cor, 1);
  }
}

function desenharQuadrado(
  ctx: CanvasRenderingContext2D,
  v: Vista,
  M: Mat2,
  corMarca: Marca,
  highlight: readonly Marca[],
  tracejado = false,
) {
  const pts = [
    v.p(0, 0),
    v.q(aplicar(M, { x: 1, y: 0 })),
    v.q(aplicar(M, { x: 1, y: 1 })),
    v.q(aplicar(M, { x: 0, y: 1 })),
  ];
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.closePath();
  if (!tracejado) {
    ctx.fillStyle = tintaClara(corMarca);
    ctx.fill();
  }
  ctx.setLineDash(tracejado ? [5, 4] : []);
  ctx.strokeStyle = tracejado ? palette.muted : tinta(corMarca);
  ctx.lineWidth = tracejado ? 1.5 : largura(highlight, corMarca, 2.2);
  ctx.stroke();
  ctx.restore();
}

function desenharPainelUnico(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Transformacao,
  ctl: Record<string, number>,
) {
  const A = resolverMatriz(p.matriz, ctl);
  const d = det2(A);
  const vetores = [...(p.vetor ? [p.vetor] : []), ...p.vetores].map((vv) => resolverVetor(vv, ctl));

  const [j0, j1] = p.janela;
  const caixa: Caixa = { x0: j0, x1: j1, y0: j0, y1: j1 };
  const rodape = p.mostrar.det ? 30 : 12;
  const v = criarVista(w, h - rodape, caixa, 16);

  eixosEGrade(ctx, v, caixa);
  if (p.mostrar.malha) desenharMalhaDeformada(ctx, v, A);
  if (p.mostrar.identidade) {
    desenharQuadrado(ctx, v, [[1, 0], [0, 1]], "c2", p.highlight, true);
  }
  if (p.mostrar.quadrado) {
    const marcaQuad: Marca = d < 0 ? "c4" : "c2";
    desenharQuadrado(ctx, v, A, marcaQuad, p.highlight, false);
  }
  if (p.mostrar.colunas) {
    const lwCol = largura(p.highlight, "c2", 2.4);
    setaMundo(ctx, v, { x: 0, y: 0 }, { x: A[0][0], y: A[1][0] }, tinta("c2"), lwCol);
    setaMundo(ctx, v, { x: 0, y: 0 }, { x: A[0][1], y: A[1][1] }, tinta("c2"), lwCol);
  }

  for (const entrada of vetores) {
    const img = aplicar(A, entrada);
    setaMundo(ctx, v, { x: 0, y: 0 }, entrada, tinta("c1"), largura(p.highlight, "c1", 2.6));
    setaMundo(ctx, v, { x: 0, y: 0 }, img, tinta("c3"), largura(p.highlight, "c3", 2.8));
    etiqueta(ctx, hits, v.q(entrada), `(${fmt(entrada.x)}; ${fmt(entrada.y)})`, "c1");
    etiqueta(ctx, hits, { x: v.q(img).x, y: v.q(img).y - 18 }, `(${fmt(img.x)}; ${fmt(img.y)})`, "c3");
  }

  if (p.mostrar.det) {
    const info =
      d < 0
        ? `det A = ${fmt(d)} · área = ${fmt(Math.abs(d))} (invertida)`
        : d === 0
          ? "det A = 0 · área = 0 (colapsada)"
          : `det A = ${fmt(d)} · área = ${fmt(d)}`;
    etiqueta(ctx, hits, { x: w / 2, y: h - 16 }, info, "c4");
  }
}

function desenharTresPaineis(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Transformacao,
  ctl: Record<string, number>,
) {
  const M1 = resolverMatriz(p.matriz, ctl);
  const M2 = resolverMatriz(p.depois!, ctl);
  const Mtot = multiplicar(M2, M1);
  const entrada = p.vetor ? resolverVetor(p.vetor, ctl) : { x: 1, y: 1 };
  const v1 = aplicar(M1, entrada);
  const v2 = aplicar(M2, v1);

  const paineis: { titulo: string; M: Mat2; vet: Pt; cor: Marca }[] = [
    { titulo: "Entrada v", M: [[1, 0], [0, 1]], vet: entrada, cor: "c1" },
    { titulo: "1ª: Bv", M: M1, vet: v1, cor: "c2" },
    { titulo: "2ª: A(Bv)", M: Mtot, vet: v2, cor: "c3" },
  ];

  const pw = w / 3;
  const caixa: Caixa = { x0: -1, x1: 4.5, y0: -1, y1: 3.5 };
  paineis.forEach((pa, idx) => {
    const ox = idx * pw;
    ctx.save();
    ctx.translate(ox, 22);
    const v = criarVista(pw, h - 46, caixa, 10);
    eixosEGrade(ctx, v, caixa);
    desenharQuadrado(ctx, v, pa.M, pa.cor === "c1" ? "c2" : pa.cor, p.highlight, false);
    setaMundo(ctx, v, { x: 0, y: 0 }, pa.vet, tinta(pa.cor), largura(p.highlight, pa.cor, 2.5));
    ctx.restore();

    nota(ctx, { x: ox + pw / 2, y: 12 }, pa.titulo, pa.cor, 12);
    etiqueta(ctx, hits, { x: ox + pw / 2, y: h - 14 }, `(${fmt(pa.vet.x)}; ${fmt(pa.vet.y)})`, pa.cor);
  });
}

export function desenharTransformacao(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Transformacao,
  ctl: Record<string, number>,
) {
  if (p.depois) {
    desenharTresPaineis(ctx, w, h, hits, p, ctl);
    return;
  }
  desenharPainelUnico(ctx, w, h, hits, p, ctl);
}
