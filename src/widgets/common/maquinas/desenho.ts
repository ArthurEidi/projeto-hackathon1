// Desenho em canvas do maquinas_funcao e maquinas_figura. Legível em 400 px, cores pelas marcas c1..c4.
import { seg, type Hit, type Pt } from "../../canvas";
import type { Marca } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { etiqueta, fmt, nota, tinta, tintaClara, tintaEscura } from "../geo/base";
import { cadeia, contagens, ehFuncao, formatarRegra, imagem, type Ligacao } from "./calc";
import type { Maquinas } from "./params";

export function aspectoMaquinas(p: Maquinas): number {
  if (p.modo === "flechas") {
    const n = Math.max(p.entradas.length, p.saidas.length);
    return Math.max(0.68, Math.min(1.05, 0.42 + n * 0.14));
  }
  const m = p.maquinas.length;
  return Math.max(0.68, Math.min(1.12, 0.42 + m * 0.28));
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

function pontaSeta(ctx: CanvasRenderingContext2D, de: Pt, para: Pt, cor: string, lw: number) {
  const ang = Math.atan2(para.y - de.y, para.x - de.x);
  const comp = 9;
  const abertura = 0.48;
  seg(ctx, para, { x: para.x - comp * Math.cos(ang - abertura), y: para.y - comp * Math.sin(ang - abertura) }, cor, lw);
  seg(ctx, para, { x: para.x - comp * Math.cos(ang + abertura), y: para.y - comp * Math.sin(ang + abertura) }, cor, lw);
}

function largura(highlight: readonly Marca[], marca: Marca, base: number): number {
  if (highlight.length === 0) return base;
  return highlight.includes(marca) ? base + 1.5 : Math.max(1.2, base - 1);
}

function desenharFlechas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<Maquinas, { modo: "flechas" }>,
  ligacoes: readonly Ligacao[],
  entradaAtiva: number | null,
) {
  const nMax = Math.max(p.entradas.length, p.saidas.length);
  const topo = 44;
  const rodape = 40;
  const alturaUtil = Math.max(80, h - topo - rodape);
  const colE = Math.max(58, w * 0.22);
  const colS = w - colE;
  const boxW = Math.min(96, w * 0.28);

  // Conjuntos (Domínio e Contradomínio)
  ctx.save();
  ctx.fillStyle = tintaClara("c1");
  ctx.strokeStyle = tinta("c1");
  ctx.lineWidth = largura(p.highlight, "c1", 1.8);
  caixaArredondada(ctx, colE - boxW / 2, topo - 6, boxW, alturaUtil + 12, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = tintaClara("c2");
  ctx.strokeStyle = tinta("c2");
  ctx.lineWidth = largura(p.highlight, "c2", 1.8);
  caixaArredondada(ctx, colS - boxW / 2, topo - 6, boxW, alturaUtil + 12, 16);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  nota(ctx, { x: colE, y: 20 }, p.rotulos.entradas, "c1", 13);
  nota(ctx, { x: colS, y: 20 }, p.rotulos.saidas, "c2", 13);

  const posY = (len: number, i: number) => topo + ((i + 0.5) * alturaUtil) / Math.max(len, 1);
  const posE = (i: number): Pt => ({ x: colE, y: posY(p.entradas.length, i) });
  const posS = (i: number): Pt => ({ x: colS, y: posY(p.saidas.length, i) });

  const c = contagens(p.entradas.length, ligacoes);
  const alcancadas = imagem(ligacoes);

  // Setas
  for (const [a, b] of ligacoes) {
    const repetida = c[a] > 1;
    const marca: Marca = repetida ? "c4" : "c3";
    const cor = tinta(marca);
    const lw = largura(p.highlight, marca, repetida ? 3.2 : 2.6);
    const A = posE(a);
    const B = posS(b);
    const ini = { x: A.x + 24, y: A.y };
    const fim = { x: B.x - 24, y: B.y };
    seg(ctx, ini, fim, cor, lw);
    pontaSeta(ctx, ini, fim, cor, lw);
  }

  // Elementos das entradas e saídas
  p.entradas.forEach((a, i) => {
    const pt = posE(i);
    if (entradaAtiva === i) {
      ctx.save();
      ctx.strokeStyle = tintaEscura("c1");
      ctx.lineWidth = 2.5;
      caixaArredondada(ctx, pt.x - 24, pt.y - 16, 48, 32, 16);
      ctx.stroke();
      ctx.restore();
    }
    etiqueta(ctx, hits, pt, String(a), c[i] > 1 ? "c4" : "c1");
  });

  p.saidas.forEach((b, i) => {
    const pt = posS(i);
    etiqueta(ctx, hits, pt, String(b), alcancadas.has(i) ? "c2" : "muted");
  });

  // Aviso de status no rodapé
  const duplicada = c.some((n) => n > 1);
  const completa = ehFuncao(p.entradas.length, ligacoes);
  const aviso = duplicada
    ? "Uma entrada tem mais de uma saída"
    : completa
      ? "Cada entrada tem uma saída"
      : nMax > 0
        ? "Ligue cada entrada a exatamente uma saída"
        : "";
  nota(ctx, { x: w / 2, y: h - 16 }, aviso, duplicada ? "c4" : completa ? "c2" : "muted", 13);
}

function desenharCadeia(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<Maquinas, { modo: "maquinas" }>,
  ctl: Record<string, number>,
  x: number,
  ordem: boolean,
  inversa: boolean,
) {
  const c = cadeia(p, ctl, x, ordem, inversa);
  if (inversa && !c.invertivel) {
    nota(ctx, { x: w / 2, y: h / 2 }, "Máquina constante: não tem inversa", "c4", 14);
    return;
  }

  const n = c.maquinas.length;
  const topo = 26;
  const rodape = 24;
  const dy = (h - topo - rodape) / n;
  const boxW = Math.min(270, w - 64);
  const boxX = (w - boxW) / 2;
  const boxH = Math.min(38, dy * 0.48);

  etiqueta(
    ctx,
    hits,
    { x: w / 2, y: topo },
    `${inversa ? "Saída a desfazer" : "Entrada"}: ${fmt(c.valores[0])}`,
    "c1",
  );

  c.maquinas.forEach((m, i) => {
    const yCaixa = topo + 22 + i * dy;
    const ySetaIn = yCaixa - 6;
    const marcaCaixa: Marca = inversa ? "c4" : "c3";
    const corCaixa = tinta(marcaCaixa);

    // Seta de entrada na caixa
    seg(ctx, { x: w / 2, y: ySetaIn - 10 }, { x: w / 2, y: yCaixa - 2 }, palette.muted, 2);
    pontaSeta(ctx, { x: w / 2, y: ySetaIn - 10 }, { x: w / 2, y: yCaixa - 2 }, palette.muted, 2);

    // Caixa da máquina
    ctx.save();
    ctx.fillStyle = tintaClara(marcaCaixa);
    ctx.strokeStyle = corCaixa;
    ctx.lineWidth = largura(p.highlight, marcaCaixa, 2.2);
    caixaArredondada(ctx, boxX, yCaixa, boxW, boxH, 10);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const regra = formatarRegra(m.nome, m.a, m.b);
    nota(ctx, { x: w / 2, y: yCaixa + boxH / 2 }, regra, marcaCaixa, 14);
    hits.push({ key: marcaCaixa, x: boxX, y: yCaixa, w: boxW, h: boxH });

    // Seta de saída da caixa até o valor resultante
    const ySaida = yCaixa + boxH + 22;
    seg(ctx, { x: w / 2, y: yCaixa + boxH + 2 }, { x: w / 2, y: ySaida - 14 }, palette.muted, 2);
    pontaSeta(ctx, { x: w / 2, y: yCaixa + boxH + 2 }, { x: w / 2, y: ySaida - 14 }, palette.muted, 2);

    const ehFinal = i === n - 1;
    const rotuloValor = ehFinal
      ? inversa
        ? `Volta a x: ${fmt(c.valores[i + 1])}`
        : `Saída: ${fmt(c.valores[i + 1])}`
      : `Intermediário: ${fmt(c.valores[i + 1])}`;
    etiqueta(ctx, hits, { x: w / 2, y: ySaida }, rotuloValor, ehFinal && inversa ? "c1" : "c2");
  });
}

export function desenharMaquinas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Maquinas,
  ctl: Record<string, number>,
  ligacoes: readonly Ligacao[],
  x: number,
  ordem: boolean,
  inversa: boolean,
  entradaAtiva: number | null = null,
) {
  if (p.modo === "flechas") {
    desenharFlechas(ctx, w, h, hits, p, ligacoes, entradaAtiva);
    return;
  }
  desenharCadeia(ctx, w, h, hits, p, ctl, x, ordem, inversa);
}
