// Desenho em canvas do grupos_inteiros e grupos_inteiros_figura. Legível em 400 px, cores pelas marcas c1..c4.
import type { Marca } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { seg, type Hit, type Pt } from "../../canvas";
import { avaliarExpr, type Controles } from "../expr";
import { etiqueta, fmt, nota, tinta, tintaClara, tintaEscura } from "../geo/base";
import { arvoreFatoracao, dividirInteiros, fatorarPrimos, formatarFatoracao, mmc, validarDivisao } from "./calc";
import type { Grupos } from "./params";

export function aspectoGrupos(p: Grupos): number {
  if (p.modo === "mmc") return 0.78;
  if (p.modo === "fatoracao") return 0.78;
  return 0.72;
}

function caixaArredondada(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function largura(highlight: readonly Marca[], marca: Marca, base: number): number {
  if (highlight.length === 0) return base;
  return highlight.includes(marca) ? base + 1.4 : Math.max(1.2, base - 0.8);
}

function desenharFicha(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  raio: number,
  marca: Marca,
  highlight: readonly Marca[],
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, Math.PI * 2);
  ctx.fillStyle = tinta(marca);
  ctx.fill();
  ctx.lineWidth = largura(highlight, marca, 1.6);
  ctx.strokeStyle = tintaEscura(marca);
  ctx.stroke();
  ctx.restore();
}

function desenharChipsTopo(
  ctx: CanvasRenderingContext2D,
  w: number,
  y: number,
  hits: Hit[],
  itens: Array<{ texto: string; marca: Marca }>,
) {
  const gap = 8;
  const estLarg = itens.map((it) => Math.max(46, it.texto.length * 8 + 20));
  const total = estLarg.reduce((a, b) => a + b, 0) + gap * Math.max(0, itens.length - 1);
  let x = (w - total) / 2;
  itens.forEach((it, i) => {
    const cw = estLarg[i];
    etiqueta(ctx, hits, { x: x + cw / 2, y }, it.texto, it.marca);
    x += cw + gap;
  });
}

function desenharGradeGrupos(
  ctx: CanvasRenderingContext2D,
  area: { x: number; y: number; w: number; h: number },
  q: number,
  d: number,
  r: number,
  highlight: readonly Marca[],
  mostrarResto: boolean,
) {
  const corFicha: Marca = highlight.includes("c2") ? "c2" : "c1";
  const rTok = d > 6 || q > 8 ? 6.5 : 8.5;
  const passo = rTok * 2 + 5;
  const padBox = 7;
  const maxBoxW = Math.max(rTok * 2 + padBox * 2, area.w - 8);
  const colsPorGrupo = Math.max(1, Math.floor((maxBoxW - padBox * 2 + 5) / passo));
  const colsGrupo = Math.min(d, colsPorGrupo);
  const linhasPorGrupo = Math.max(1, Math.ceil(d / colsPorGrupo));
  const boxW = Math.min(maxBoxW, colsGrupo * passo + padBox * 2 - 5);
  const boxH = linhasPorGrupo * passo + padBox * 2 - 5;
  const gapX = 10;
  const gapY = 10;

  // Organiza os q grupos em linhas centralizadas dentro da área disponível
  const linhas: number[][] = [];
  let linhaAtual: number[] = [];
  let largLinha = 0;
  for (let i = 0; i < q; i++) {
    const proxLarg = linhaAtual.length === 0 ? boxW : largLinha + gapX + boxW;
    if (linhaAtual.length > 0 && proxLarg > area.w) {
      linhas.push(linhaAtual);
      linhaAtual = [i];
      largLinha = boxW;
    } else {
      linhaAtual.push(i);
      largLinha = proxLarg;
    }
  }
  if (linhaAtual.length > 0) linhas.push(linhaAtual);

  const temSobra = r > 0;
  const colsSobra = temSobra ? Math.min(r, colsPorGrupo) : 0;
  const linhasSobra = temSobra ? Math.ceil(r / colsPorGrupo) : 0;
  const sobraW = temSobra ? Math.min(maxBoxW, colsSobra * passo + padBox * 2 - 5) : 0;
  const sobraH = temSobra ? linhasSobra * passo + padBox * 2 - 5 : 0;
  const alturaConteudo =
    linhas.length * boxH +
    Math.max(0, linhas.length - 1) * gapY +
    (temSobra ? (linhas.length > 0 ? gapY : 0) + sobraH : 0);
  let cy = area.y + Math.max(4, (area.h - alturaConteudo) / 2);

  for (const linha of linhas) {
    const lw = linha.length * boxW + (linha.length - 1) * gapX;
    let cx = area.x + (area.w - lw) / 2;
    for (let k = 0; k < linha.length; k++) {
      ctx.save();
      ctx.fillStyle = tintaClara("c3");
      ctx.strokeStyle = tinta("c3");
      ctx.lineWidth = largura(highlight, "c3", 1.8);
      caixaArredondada(ctx, cx, cy, boxW, boxH, 10);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      for (let j = 0; j < d; j++) {
        const row = Math.floor(j / colsPorGrupo);
        const col = j % colsPorGrupo;
        const itensLinha = row === linhasPorGrupo - 1 ? d - row * colsPorGrupo : colsPorGrupo;
        const innerW = (itensLinha - 1) * passo;
        const startX = cx + (boxW - innerW) / 2;
        const fy = cy + padBox + rTok + row * passo;
        desenharFicha(ctx, startX + col * passo, fy, rTok, corFicha, highlight);
      }
      cx += boxW + gapX;
    }
    cy += boxH + gapY;
  }

  if (temSobra) {
    const sx = area.x + (area.w - sobraW) / 2;
    ctx.save();
    ctx.fillStyle = tintaClara("c4");
    ctx.strokeStyle = tinta("c4");
    ctx.lineWidth = largura(highlight, "c4", 1.8);
    ctx.setLineDash([5, 4]);
    caixaArredondada(ctx, sx, cy, sobraW, sobraH, 10);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    for (let j = 0; j < r; j++) {
      const row = Math.floor(j / colsPorGrupo);
      const col = j % colsPorGrupo;
      const itensLinha = row === linhasSobra - 1 ? r - row * colsPorGrupo : colsPorGrupo;
      const innerW = (itensLinha - 1) * passo;
      const startX = sx + (sobraW - innerW) / 2;
      const fy = cy + padBox + rTok + row * passo;
      desenharFicha(ctx, startX + col * passo, fy, rTok, "c4", highlight);
    }
    if (mostrarResto) {
      nota(ctx, { x: sx + sobraW / 2, y: cy + sobraH + 13 }, `Sobra: r = ${r}`, "c4", 12);
    }
  }
}

function desenharDivisao(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<Grupos, { modo: "divisao" }>,
  ctl: Controles,
) {
  const nVal = avaliarExpr(p.n, ctl);
  const dVal = avaliarExpr(p.d, ctl);
  const erro = validarDivisao(nVal, dVal);
  if (erro) {
    desenharChipsTopo(ctx, w, 22, hits, [
      { texto: `n = ${fmt(nVal)}`, marca: "c1" },
      { texto: `d = ${fmt(dVal)}`, marca: "c2" },
    ]);
    nota(ctx, { x: w / 2, y: h / 2 }, erro, "c4", 13);
    return;
  }
  const res = dividirInteiros(nVal, dVal, p.limite_grupos);

  const chips: Array<{ texto: string; marca: Marca }> = [
    { texto: `n = ${res.n}`, marca: "c1" },
    { texto: `d = ${res.d}`, marca: "c2" },
    { texto: `q = ${res.q}`, marca: "c3" },
  ];
  if (p.mostrar_resto) chips.push({ texto: `r = ${res.r}`, marca: "c4" });
  desenharChipsTopo(ctx, w, 22, hits, chips);

  const reservaRef = p.referencia_d !== undefined ? 20 : 0;
  desenharGradeGrupos(
    ctx,
    { x: 14, y: 46, w: w - 28, h: h - 94 - reservaRef },
    res.q,
    res.d,
    res.r,
    p.highlight,
    p.mostrar_resto,
  );

  if (p.referencia_d !== undefined) {
    const refQ = Math.floor(res.n / p.referencia_d);
    const refR = res.n % p.referencia_d;
    nota(
      ctx,
      { x: w / 2, y: h - 42 },
      `Ref: d = ${p.referencia_d} (${refQ} grupos, r = ${refR})`,
      "muted",
      12,
    );
  }

  const eq = p.mostrar_resto
    ? `${res.n} = ${res.d}·${res.q} + ${res.r}`
    : `${res.n} fichas em grupos de ${res.d}`;
  nota(ctx, { x: w / 2, y: h - 18 }, eq, "ink", 15);
}

function desenharTrilhaMmc(
  ctx: CanvasRenderingContext2D,
  w: number,
  yTopo: number,
  m: number,
  tam: number,
  mostrarFatores: boolean,
  highlight: readonly Marca[],
) {
  const q = Math.floor(m / tam);
  const r = m % tam;
  const corResto = r === 0 ? "c3" : "c4";

  // Cabeçalho da trilha
  const esqTxt = mostrarFatores ? `Grupos de ${tam} (${tam} = ${formatarFatoracao(tam)})` : `Grupos de ${tam}`;
  ctx.save();
  ctx.font = "800 12px Nunito, system-ui, sans-serif";
  ctx.fillStyle = tintaEscura("c2");
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(esqTxt, 16, yTopo + 10);

  ctx.textAlign = "right";
  ctx.fillStyle = tintaEscura(corResto);
  ctx.fillText(`q = ${q}, r = ${r}`, w - 16, yTopo + 10);
  ctx.restore();

  // Fichas em linha única
  const areaW = w - 32;
  const rTok = m <= 12 ? 7.5 : 6;
  const passo = rTok * 2 + 4;
  const pad = 6;
  const gapG = 8;
  const boxH = rTok * 2 + pad * 2;
  const boxW = tam * passo + pad * 2 - 4;
  const sobraW = r > 0 ? r * passo + pad * 2 - 4 : 0;
  const totalW =
    q * boxW +
    Math.max(0, q - 1) * gapG +
    (r > 0 ? (q > 0 ? gapG : 0) + sobraW : 0);

  const escala = totalW > areaW ? areaW / totalW : 1;
  const cy = yTopo + 28;
  let cx = 16 + Math.max(0, (areaW - totalW * escala) / 2);

  ctx.save();
  for (let i = 0; i < q; i++) {
    const bw = boxW * escala;
    ctx.fillStyle = tintaClara("c3");
    ctx.strokeStyle = tinta("c3");
    ctx.lineWidth = largura(highlight, "c3", 1.7);
    caixaArredondada(ctx, cx, cy, bw, boxH, 9);
    ctx.fill();
    ctx.stroke();

    for (let j = 0; j < tam; j++) {
      const fx = cx + (pad + rTok + j * passo) * escala;
      desenharFicha(ctx, fx, cy + boxH / 2, rTok * Math.min(1, escala), "c1", highlight);
    }
    cx += bw + gapG * escala;
  }

  if (r > 0) {
    const sw = sobraW * escala;
    ctx.save();
    ctx.fillStyle = tintaClara("c4");
    ctx.strokeStyle = tinta("c4");
    ctx.lineWidth = largura(highlight, "c4", 1.7);
    ctx.setLineDash([4, 3]);
    caixaArredondada(ctx, cx, cy, sw, boxH, 9);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    for (let j = 0; j < r; j++) {
      const fx = cx + (pad + rTok + j * passo) * escala;
      desenharFicha(ctx, fx, cy + boxH / 2, rTok * Math.min(1, escala), "c4", highlight);
    }
  }
  ctx.restore();
}

function desenharMmc(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<Grupos, { modo: "mmc" }>,
  ctl: Controles,
) {
  const m = Math.max(1, Math.round(avaliarExpr(p.m, ctl)));
  const rA = m % p.a;
  const rB = m % p.b;
  const comum = rA === 0 && rB === 0;
  const minimo = mmc(p.a, p.b);
  const ehMmc = comum && m === minimo;

  const chips: Array<{ texto: string; marca: Marca }> = [{ texto: `m = ${m}`, marca: "c1" }];
  if (p.mostrar_mmc && ehMmc) {
    chips.push({ texto: `MMC = ${m}`, marca: "c3" });
  } else if (p.mostrar_mmc && comum) {
    chips.push({ texto: "múltiplo comum", marca: "c3" });
  } else {
    chips.push({ texto: `grupos ${p.a} e ${p.b}`, marca: "c2" });
  }
  desenharChipsTopo(ctx, w, 22, hits, chips);

  const meio = 52 + (h - 90) / 2;
  desenharTrilhaMmc(ctx, w, 54, m, p.a, p.mostrar_fatores, p.highlight);
  desenharTrilhaMmc(ctx, w, meio + 4, m, p.b, p.mostrar_fatores, p.highlight);

  const rodape =
    p.mostrar_mmc && ehMmc
      ? `Sem sobras nas duas trilhas: ${m} = ${formatarFatoracao(m)}`
      : p.mostrar_mmc && comum
        ? `Múltiplo comum de ${p.a} e ${p.b} (MMC = ${minimo})`
        : "Compare as sobras nas duas trilhas";
  nota(ctx, { x: w / 2, y: h - 18 }, rodape, p.mostrar_mmc && comum ? "c3" : "muted", 13);
}

function desenharNoArvore(
  ctx: CanvasRenderingContext2D,
  pt: Pt,
  valor: number,
  marca: Marca | "ink",
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, 13, 0, Math.PI * 2);
  ctx.fillStyle = marca === "ink" ? palette.surface : tintaClara(marca);
  ctx.fill();
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = marca === "ink" ? palette.lineDark : tinta(marca);
  ctx.stroke();
  ctx.restore();
  nota(ctx, pt, String(valor), marca, 13);
}

function desenharFatoracao(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<Grupos, { modo: "fatoracao" }>,
  ctl: Controles,
) {
  const nVal = avaliarExpr(p.n, ctl);
  const dVal = avaliarExpr(p.d, ctl);
  const erro = validarDivisao(nVal, dVal);
  if (erro) {
    desenharChipsTopo(ctx, w, 22, hits, [
      { texto: `n = ${fmt(nVal)}`, marca: "c1" },
      { texto: `d = ${fmt(dVal)}`, marca: "c2" },
    ]);
    nota(ctx, { x: w / 2, y: h / 2 }, erro, "c4", 13);
    return;
  }
  const res = dividirInteiros(nVal, dVal);

  const chips: Array<{ texto: string; marca: Marca }> = [
    { texto: `n = ${res.n}`, marca: "c1" },
    { texto: `d = ${res.d}`, marca: "c2" },
    { texto: `q = ${res.q}`, marca: "c3" },
  ];
  if (p.mostrar_resto) chips.push({ texto: `r = ${res.r}`, marca: "c4" });
  desenharChipsTopo(ctx, w, 22, hits, chips);

  const divX = Math.round(w * 0.58);
  seg(ctx, { x: divX, y: 48 }, { x: divX, y: h - 40 }, palette.line, 1.5);

  const reservaRef = p.referencia_d !== undefined ? 18 : 0;
  desenharGradeGrupos(
    ctx,
    { x: 10, y: 48, w: divX - 18, h: h - 94 - reservaRef },
    res.q,
    res.d,
    res.r,
    p.highlight,
    p.mostrar_resto,
  );

  if (p.referencia_d !== undefined) {
    const refQ = Math.floor(res.n / p.referencia_d);
    nota(ctx, { x: divX / 2, y: h - 42 }, `Ref: d = ${p.referencia_d} (${refQ} grupos)`, "muted", 11);
  }

  // Árvore de fatoração prima à direita
  const passos = arvoreFatoracao(res.n);
  const fatores = fatorarPrimos(res.n);
  const rx = divX + (w - divX) / 2;
  const topoArv = 64;
  const passoY = passos.length > 0 ? Math.min(48, (h - 140) / passos.length) : 40;

  if (passos.length === 0) {
    desenharNoArvore(ctx, { x: rx, y: topoArv + 20 }, res.n, "c1");
  } else {
    let paiPt: Pt = { x: rx, y: topoArv };
    passos.forEach((st, idx) => {
      const esqPt: Pt = { x: paiPt.x - 24, y: paiPt.y + passoY };
      const dirPt: Pt = { x: paiPt.x + 24, y: paiPt.y + passoY };
      seg(ctx, paiPt, esqPt, palette.lineDark, 1.8);
      seg(ctx, paiPt, dirPt, palette.lineDark, 1.8);
      desenharNoArvore(ctx, paiPt, st.valor, idx === 0 ? "c1" : "ink");
      desenharNoArvore(ctx, esqPt, st.esquerda, "c3");
      if (st.direitaPrima) {
        desenharNoArvore(ctx, dirPt, st.direita, "c3");
      }
      paiPt = dirPt;
    });
  }

  const textoFatores =
    res.n < 2 ? `${res.n} não tem fatoração prima` : `${res.n} = ${fatores.join("·")}`;
  nota(ctx, { x: rx, y: h - 42 }, textoFatores, res.n < 2 ? "muted" : "c3", res.n < 2 ? 11 : 12);
  const eq = p.mostrar_resto
    ? `${res.n} = ${res.d}·${res.q} + ${res.r}`
    : `${res.n} fichas em grupos de ${res.d}`;
  nota(ctx, { x: w / 2, y: h - 18 }, eq, "ink", 14);
}

export function desenharGrupos(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Grupos,
  ctl: Controles,
) {
  if (p.modo === "mmc") {
    desenharMmc(ctx, w, h, hits, p, ctl);
    return;
  }
  if (p.modo === "fatoracao") {
    desenharFatoracao(ctx, w, h, hits, p, ctl);
    return;
  }
  desenharDivisao(ctx, w, h, hits, p, ctl);
}
