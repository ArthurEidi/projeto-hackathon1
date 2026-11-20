// Desenho em canvas do escala_decimal e escala_decimal_figura. Legível em 400 px, cores c1..c4.
import { dot, seg, type Hit, type Pt } from "../../canvas";
import type { Marca } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { fmt } from "../geo/base";
import { etiqueta, nota, tinta, tintaClara, tintaEscura } from "../geo/base";
import { expoente, potenciaLabel, quadroOrdens, resolverEstado, valorDe } from "./calc";
import type { EscalaDecimal } from "./params";

export function aspectoEscala(p: EscalaDecimal): number {
  if (p.modo === "ordem") return 0.72;
  return 0.78;
}

function largura(highlight: readonly Marca[], marca: Marca, base: number): number {
  if (highlight.length === 0) return base;
  return highlight.includes(marca) ? base + 1.6 : Math.max(1.1, base - 0.9);
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

function desenharQuadroOrdens(
  ctx: CanvasRenderingContext2D,
  w: number,
  yTop: number,
  valor: number,
  expDestaque: number | null,
  highlight: readonly Marca[],
) {
  const ordens = quadroOrdens(valor);
  const limite = 9;
  const primeiroSignificativo = ordens.findIndex((col) => col.digito !== "" && col.digito !== "0");
  const inicio = ordens.length > limite ? Math.max(0, primeiroSignificativo - 3) : 0;
  const reticenciasAntes = inicio > 0;
  const disponiveis = limite - Number(reticenciasAntes);
  const reticenciasDepois = ordens.length - inicio > disponiveis;
  const cols = ordens.slice(inicio, inicio + disponiveis - Number(reticenciasDepois));
  const visiveis = [...(reticenciasAntes ? [null] : []), ...cols, ...(reticenciasDepois ? [null] : [])];
  const padX = 16;
  const tableW = w - 2 * padX;
  const colW = tableW / visiveis.length;
  const headH = 34;
  const bodyH = 44;

  ctx.save();
  caixaArredondada(ctx, padX, yTop, tableW, headH + bodyH, 12);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.save();
  caixaArredondada(ctx, padX, yTop, tableW, headH + bodyH, 12);
  ctx.clip();

  visiveis.forEach((col, i) => {
    const cx = padX + i * colW;
    const midX = cx + colW / 2;
    const isDestaque = col !== null && col.exp === expDestaque;

    if (isDestaque) {
      ctx.fillStyle = tintaClara("c2");
      ctx.fillRect(cx, yTop, colW, headH + bodyH);
    }

    if (i > 0) {
      seg(ctx, { x: cx, y: yTop }, { x: cx, y: yTop + headH + bodyH }, palette.lineDark, 1);
    }

    if (col === null) {
      nota(ctx, { x: midX, y: yTop + 12 }, "…", "muted", 13);
      return;
    }
    nota(ctx, { x: midX, y: yTop + 12 }, col.label, isDestaque ? "c2" : "ink", 13);
    nota(ctx, { x: midX, y: yTop + 26 }, potenciaLabel(col.exp), isDestaque ? "c2" : "muted", 11);

    if (col.digito !== "") {
      const txt = col.virgulaDepois ? `${col.digito},` : col.digito;
      nota(
        ctx,
        { x: midX, y: yTop + headH + bodyH / 2 + 1 },
        txt,
        "c3",
        highlight.includes("c3") ? 22 : 20,
      );
    }
  });

  seg(ctx, { x: padX, y: yTop + headH }, { x: padX + tableW, y: yTop + headH }, palette.lineDark, 1.2);
  ctx.restore();
  caixaArredondada(ctx, padX, yTop, tableW, headH + bodyH, 12);
  ctx.strokeStyle = palette.lineDark;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function destacarChipSeAtivo(
  ctx: CanvasRenderingContext2D,
  hits: Hit[],
  highlight: readonly Marca[],
  marca: Marca,
) {
  if (!highlight.includes(marca) || hits.length === 0) return;
  const h = hits[hits.length - 1];
  ctx.save();
  caixaArredondada(ctx, h.x - 3, h.y - 3, h.w + 6, h.h + 6, 12);
  ctx.strokeStyle = tintaEscura(marca);
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
}

const decimal = new Intl.NumberFormat("pt-BR", { useGrouping: false, maximumSignificantDigits: 21 });
const margemChips = 5;
const espacoChips = 10;

function larguraChip(ctx: CanvasRenderingContext2D, texto: string): number {
  ctx.font = "900 16px Nunito, system-ui, sans-serif";
  return Math.max(28, ctx.measureText(texto).width + 16);
}

function textoValor(ctx: CanvasRenderingContext2D, w: number, x: number, valor: number, mostrarNotacao = true) {
  if (!mostrarNotacao) return `N = ${decimal.format(valor).replace("-", "−")}`;
  const numero = fmt(valor);
  const texto = `N = ${numero}`;
  if (larguraChip(ctx, texto) <= 2 * (Math.min(x, w - x) - margemChips) && (valor === 0 || numero !== "0")) {
    return texto;
  }
  const [a, n] = valor.toExponential().split("e");
  return `N = ${a.replace(".", ",").replace("-", "−")}·${potenciaLabel(Number(n))}`;
}

function desenharChips(
  ctx: CanvasRenderingContext2D, w: number, hits: Hit[],
  chips: { x: number; texto: string; marca: Marca }[], highlight: readonly Marca[] = [],
) {
  const medidas = chips.map((c) => ({ ...c, largura: larguraChip(ctx, c.texto) }));
  const cabe = medidas.every((c, i) => {
    const anterior = medidas[i - 1];
    const limiteEsq = anterior ? anterior.x + anterior.largura / 2 + espacoChips : margemChips;
    return c.x - c.largura / 2 >= limiteEsq && c.x + c.largura / 2 <= w - margemChips;
  });
  const soma = medidas.reduce((total, c) => total + c.largura, 0);
  const espacos = (chips.length - 1) * espacoChips;
  const escala = cabe ? 1 : Math.min(1, (w - 2 * margemChips - espacos) / soma);
  let esquerda = (w - (soma * escala + espacos)) / 2;
  for (const c of medidas) {
    const x = cabe ? c.x : esquerda + c.largura * escala / 2;
    if (escala < 1) {
      ctx.save();
      ctx.translate(x, 0);
      ctx.scale(escala, 1);
      etiqueta(ctx, hits, { x: 0, y: 20 }, c.texto, c.marca);
      ctx.restore();
      const hit = hits[hits.length - 1];
      hit.x = x + hit.x * escala;
      hit.w *= escala;
    } else {
      etiqueta(ctx, hits, { x, y: 20 }, c.texto, c.marca);
    }
    destacarChipSeAtivo(ctx, hits, highlight, c.marca);
    esquerda += c.largura * escala + espacoChips;
  }
}

function graduacoes(inicio: number, fim: number, especiais: readonly number[]): number[] {
  const intervalo = fim - inicio;
  if (intervalo <= 7) return Array.from({ length: intervalo + 1 }, (_, i) => inicio + i);
  const marcas = [...new Set([inicio, fim, ...especiais])].sort((a, b) => a - b);
  // Divide a maior lacuna até completar a régua, preservando os pontos de interesse.
  while (marcas.length < 8) {
    const maior = marcas.slice(1).reduce((i, fim, j) =>
      fim - marcas[j] > marcas[i + 1] - marcas[i] ? j : i, 0);
    const meio = Math.round(marcas[maior] + (marcas[maior + 1] - marcas[maior]) / 2);
    marcas.splice(maior + 1, 0, meio);
  }
  return marcas;
}

function desenharPotencia(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<EscalaDecimal, { modo: "potencia" }>,
  ctl: Record<string, number>,
) {
  const s = resolverEstado(p, ctl);

  // Chips do cabeçalho
  const xValor = w * (p.mostrar_notacao ? 0.8 : 0.5);
  const valor = { x: xValor, texto: textoValor(ctx, w, xValor, s.valor, p.mostrar_notacao), marca: "c3" } as const;
  desenharChips(ctx, w, hits, p.mostrar_notacao ? [
    { x: w * 0.2, texto: `a = ${fmt(s.a)}`, marca: "c1" },
    { x: w * 0.5, texto: `n = ${fmt(s.n)}`, marca: "c2" },
    valor,
  ] : [valor], p.highlight);

  // Quadro de ordens
  desenharQuadroOrdens(ctx, w, 46, s.valor, p.mostrar_notacao ? s.n : null, p.highlight);

  // Régua de potências de 10 (igualmente espaçada; expande para conter s.n se fora de faixa_n)
  const nMin = Math.min(p.faixa_n[0], s.n);
  const nMax = Math.max(p.faixa_n[1], s.n);
  const padX = 32;
  const yAxis = p.mostrar_ordem ? h - 66 : h - 46;
  const span = Math.max(1, nMax - nMin);
  const posX = (exp: number) => padX + ((exp - nMin) / span) * (w - 2 * padX);

  seg(ctx, { x: padX - 8, y: yAxis }, { x: w - padX + 8, y: yAxis }, palette.ink, 2);

  const especiais = p.mostrar_notacao ? [s.n] : [];
  if (p.mostrar_notacao && p.n_ref !== null && p.n_ref >= nMin && p.n_ref <= nMax) especiais.push(p.n_ref);
  for (const k of graduacoes(nMin, nMax, especiais)) {
    const x = posX(k);
    const ativo = p.mostrar_notacao && k === s.n;
    const isRef = p.mostrar_notacao && p.n_ref !== null && k === p.n_ref;
    seg(ctx, { x, y: yAxis - 6 }, { x, y: yAxis + 6 }, ativo ? tinta("c2") : palette.ink, ativo ? 2.5 : 1.5);
    nota(ctx, { x, y: yAxis + 18 }, potenciaLabel(k), ativo ? "c2" : isRef ? "muted" : "ink", ativo ? 13 : 12);
  }

  // Referência em muted
  if (p.mostrar_notacao && p.n_ref !== null && p.n_ref >= nMin && p.n_ref <= nMax && p.n_ref !== s.n) {
    const rx = posX(p.n_ref);
    dot(ctx, { x: rx, y: yAxis }, 5, palette.muted);
    nota(ctx, { x: rx, y: yAxis - 16 }, `ref: ${fmt(s.a)}·${potenciaLabel(p.n_ref)}`, "muted", 11);
  }

  // Marcador ativo em c2 (oculto quando mostrar_notacao = false para não entregar o expoente)
  if (p.mostrar_notacao) {
    const nx = Math.max(padX, Math.min(w - padX, posX(s.n)));
    dot(ctx, { x: nx, y: yAxis }, highlightActive(p.highlight, "c2") ? 8 : 6.5, tinta("c2"));
    nota(ctx, { x: nx, y: yAxis - 18 }, `${fmt(s.a)}·10${expoente(s.n)}`, "c2", 13);
  } else {
    nota(ctx, { x: w / 2, y: yAxis - 20 }, "Faixa normalizada: 1 ≤ a < 10", "c1", 12);
  }

  if (p.mostrar_ordem) {
    etiqueta(ctx, hits, { x: w / 2, y: h - 18 }, `ordem: ${potenciaLabel(s.ordemExp)}`, "c4");
    destacarChipSeAtivo(ctx, hits, p.highlight, "c4");
  }
}

function highlightActive(highlight: readonly Marca[], marca: Marca): boolean {
  return highlight.includes(marca);
}

function desenharNormalizar(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<EscalaDecimal, { modo: "normalizar" }>,
  ctl: Record<string, number>,
) {
  const s = resolverEstado(p, ctl);

  desenharChips(ctx, w, hits, [
    { x: w * 0.2, texto: `a = ${fmt(s.a)}`, marca: "c1" },
    { x: w * 0.5, texto: `n = ${fmt(s.n)}`, marca: "c2" },
    { x: w * 0.8, texto: textoValor(ctx, w, w * 0.8, s.valor), marca: "c3" },
  ]);

  desenharQuadroOrdens(ctx, w, 46, s.valor, s.n, p.highlight);

  if (p.n_ref !== null) {
    const aRef = valorDe(s.valor, -p.n_ref);
    nota(ctx, { x: w / 2, y: 142 }, `Referência: ${fmt(aRef)}·10${expoente(p.n_ref)}`, "muted", 12);
  }

  // Faixa de normalização 1 ≤ a < 10
  const padX = 24;
  const barY = h - 78;
  const barH = 30;
  const barW = w - 2 * padX;

  // Três zonas proporcionais: [0, 1) | [1, 10) | [10, +inf)
  const z1End = padX + barW * 0.22;
  const z2End = padX + barW * 0.72;

  ctx.save();
  // Zona [1, 10) destacada em c1
  ctx.fillStyle = tintaClara("c1");
  ctx.strokeStyle = tinta("c1");
  ctx.lineWidth = largura(p.highlight, "c1", 2);
  ctx.fillRect(z1End, barY, z2End - z1End, barH);
  ctx.strokeRect(z1End, barY, z2End - z1End, barH);

  // Bordas das zonas externas
  ctx.strokeStyle = palette.lineDark;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(padX, barY, z1End - padX, barH);
  ctx.strokeRect(z2End, barY, padX + barW - z2End, barH);
  ctx.restore();

  nota(ctx, { x: (padX + z1End) / 2, y: barY + barH / 2 }, "< 1", "muted", 12);
  nota(ctx, { x: (z1End + z2End) / 2, y: barY + barH / 2 }, "1 ≤ a < 10", "c1", 13);
  nota(ctx, { x: (z2End + padX + barW) / 2, y: barY + barH / 2 }, "≥ 10", "muted", 12);

  // Posição de a na faixa
  let ax: number;
  if (s.a < 1) {
    ax = padX + Math.max(0.15, Math.min(0.85, s.a)) * (z1End - padX);
  } else if (s.a < 10) {
    ax = z1End + ((s.a - 1) / 9) * (z2End - z1End);
  } else {
    const extra = Math.min(1, (s.a - 10) / 15);
    ax = z2End + (0.25 + 0.6 * extra) * (padX + barW - z2End);
  }

  const ptY = barY + barH + 22;
  seg(ctx, { x: ax, y: barY + barH }, { x: ax, y: ptY - 6 }, tinta("c1"), 2);
  dot(ctx, { x: ax, y: ptY }, 6, s.normalizado ? tinta("c1") : tintaEscura("c2"));
  const status = s.normalizado ? `a = ${fmt(s.a)} (normalizado)` : `a = ${fmt(s.a)} (fora de [1; 10))`;
  const statusX = Math.max(96, Math.min(w - 96, ax));
  nota(ctx, { x: statusX, y: ptY + 16 }, status, s.normalizado ? "c1" : "c2", 12);
}

function desenharOrdem(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: Extract<EscalaDecimal, { modo: "ordem" }>,
  ctl: Record<string, number>,
) {
  const s = resolverEstado(p, ctl);
  const expBase = p.n;
  const expSup = p.n + 1;
  const acima = s.a >= Math.sqrt(10) - 1e-9;

  desenharChips(ctx, w, hits, [
    { x: w * 0.2, texto: `a = ${fmt(s.a)}`, marca: "c1" },
    { x: w * 0.5, texto: textoValor(ctx, w, w * 0.5, s.valor), marca: "c3" },
    { x: w * 0.8, texto: `ordem: ${potenciaLabel(s.ordemExp)}`, marca: "c4" },
  ]);

  const padX = 32;
  const x0 = padX;
  const x1 = w - padX;
  const yAxis = Math.round(h * 0.52);
  const posLog = (coef: number) => {
    const c = Math.max(1, Math.min(10, coef));
    return x0 + Math.log10(c) * (x1 - x0);
  };

  // Eixo da régua logarítmica
  seg(ctx, { x: x0, y: yAxis }, { x: x1, y: yAxis }, palette.ink, 2.2);

  // Marcas inteiras 1..10
  for (let k = 1; k <= 10; k++) {
    const x = posLog(k);
    const extremo = k === 1 || k === 10;
    const tickH = extremo ? 10 : 6;
    seg(ctx, { x, y: yAxis - tickH }, { x, y: yAxis + tickH }, palette.ink, extremo ? 2 : 1.3);
    if (k === 1) {
      nota(ctx, { x, y: yAxis + 22 }, potenciaLabel(expBase), !acima ? "c4" : "ink", !acima ? 14 : 12);
    } else if (k === 10) {
      nota(ctx, { x, y: yAxis + 22 }, potenciaLabel(expSup), acima ? "c4" : "ink", acima ? 14 : 12);
    } else if (k === 2 || k === 3 || k === 4 || k === 5 || k === 7) {
      nota(ctx, { x, y: yAxis + 20 }, String(k), "muted", 11);
    }
  }

  // Corte √10 ≈ 3,16
  const xCorte = posLog(Math.sqrt(10));
  seg(
    ctx,
    { x: xCorte, y: yAxis - 44 },
    { x: xCorte, y: yAxis + 36 },
    tinta("c4"),
    largura(p.highlight, "c4", 2),
    [5, 4],
  );
  nota(ctx, { x: xCorte, y: yAxis - 54 }, "corte √10 ≈ 3,16", "c4", 12);

  // Ponto atual N = a · 10ⁿ (rótulo deslocado para não cruzar a linha tracejada do corte)
  const xAtual = posLog(s.a);
  dot(ctx, { x: xAtual, y: yAxis }, 7, tinta("c3"));
  const rotuloValor = `${fmt(s.valor)} (${fmt(s.a)}·${potenciaLabel(expBase)})`;
  ctx.save();
  ctx.font = "700 13px system-ui, sans-serif";
  const meiaLarg = ctx.measureText(rotuloValor).width / 2 + 6;
  ctx.restore();
  let lx = xAtual;
  if (!acima && lx + meiaLarg > xCorte - 6) {
    lx = Math.max(meiaLarg + 6, xCorte - meiaLarg - 6);
  } else if (acima && lx - meiaLarg < xCorte + 6) {
    lx = Math.min(w - meiaLarg - 6, xCorte + meiaLarg + 6);
  } else {
    lx = Math.max(meiaLarg + 6, Math.min(w - meiaLarg - 6, lx));
  }
  const labelPt: Pt = { x: lx, y: yAxis - 22 };
  nota(ctx, labelPt, rotuloValor, "c3", 13);

  // Rodapé com comparação
  const cmp = acima
    ? `${fmt(s.a)} ≥ √10 ⇒ ordem ${potenciaLabel(expSup)}`
    : `${fmt(s.a)} < √10 ⇒ ordem ${potenciaLabel(expBase)}`;
  nota(ctx, { x: w / 2, y: h - 22 }, cmp, "c4", 13);
}

export function desenharEscala(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  p: EscalaDecimal,
  ctl: Record<string, number>,
) {
  if (p.modo === "potencia") {
    desenharPotencia(ctx, w, h, hits, p, ctl);
  } else if (p.modo === "normalizar") {
    desenharNormalizar(ctx, w, h, hits, p, ctl);
  } else {
    desenharOrdem(ctx, w, h, hits, p, ctl);
  }
}
