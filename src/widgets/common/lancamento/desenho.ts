// Desenho do lançamento oblíquo em Canvas 2D, compartilhado pelo widget e pela figura.
// Escala igual nos dois eixos: a forma da trajetória é a real (um metro na horizontal vale um na vertical).
import { chip, dot, seg, polyline, text, type Hit, type Pt, type Rect } from "../../canvas";
import { corDoTraco, ehMarca, type CorTraco, type Marca } from "../../../ui/marcas";
import { palette as c } from "../../../ui/palette";
import { num, passoDeMarcas } from "../plot2d";
import { posicao, rad, resolverLancamento, trajetoria, type Lancamento, type Resultado } from "./calc";

export interface TracoLancamento {
  l: Lancamento;
  cor: CorTraco;
  /** Trajetória de referência (anterior ou prevista): fina e tracejada. */
  referencia?: boolean;
  rotulo?: string;
  /** Desenha só até este instante (animação). */
  ate?: number;
}

export interface CenaLancamento {
  tracos: TracoLancamento[];
  /** Lançamento cujas grandezas (θ, v0, H, A) são marcadas. */
  principal: Lancamento | null;
  mostrar: { vetores: boolean; altura: boolean; alcance: boolean };
  alvo?: { x: number; tolerancia: number };
  /** Mundo visível: maiores alcance e altura (m). */
  janela: { alcance: number; altura: number };
  highlight: readonly Marca[];
  /** Bola em voo (instante t do lançamento principal). */
  bola?: { t: number };
  /** O lançamento principal já foi feito (marcas de H e A só aparecem depois, se pedido). */
  revelar: boolean;
}

export interface VistaLancamento {
  X: (x: number) => number;
  Y: (y: number) => number;
  escala: number;
}

const M = { esq: 44, dir: 18, topo: 18, base: 36 };

function vista(w: number, h: number, janela: CenaLancamento["janela"]): VistaLancamento {
  const larg = Math.max(1, janela.alcance);
  const alt = Math.max(1, janela.altura);
  const escala = Math.min((w - M.esq - M.dir) / larg, (h - M.topo - M.base) / alt);
  const ox = M.esq;
  const oy = h - M.base;
  return { X: (x) => ox + x * escala, Y: (y) => oy - y * escala, escala };
}

const largura = (marca: Marca, base: number, destaque: readonly Marca[]) =>
  destaque.length === 0 ? base : destaque.includes(marca) ? base * 1.7 : base * 0.7;

function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], p: Pt, s: string, cor: CorTraco) {
  const k = corDoTraco(cor);
  const area = chip(ctx, p, s, k.main, k.dark);
  if (ehMarca(cor)) hits.push({ key: cor, ...area });
}

/** Área que um chip ocuparia (mesma conta de `chip` em canvas.ts), para evitar sobreposição. */
function areaDoChip(ctx: CanvasRenderingContext2D, p: Pt, s: string): Rect {
  ctx.font = "900 16px Nunito, system-ui, sans-serif";
  const w = Math.max(28, ctx.measureText(s).width + 16);
  return { x: p.x - w / 2, y: p.y - 13, w, h: 29 };
}

const colide = (a: Rect, b: Rect) => a.x < b.x + b.w + 4 && b.x < a.x + a.w + 4 && a.y < b.y + b.h + 2 && b.y < a.y + a.h + 2;

/**
 * Etiqueta que procura um lugar livre: tenta a posição pedida e, se ela cobre uma etiqueta já desenhada,
 * sobe (ou desce) em passos de 30 px, sem sair do canvas.
 */
function etiquetaLivre(ctx: CanvasRenderingContext2D, hits: Hit[], ocupadas: Rect[], p: Pt, s: string, cor: CorTraco, w: number, h: number, chao = h) {
  // Só sobe: abaixo do solo ficam a escala e as hachuras.
  const tentativas = [0, -30, -60, -90, -120, -150];
  h = Math.min(h, chao);
  let melhor = p;
  for (const dy of tentativas) {
    const q = { x: p.x, y: p.y + dy };
    const r = areaDoChip(ctx, q, s);
    if (r.y < 2 || r.y + r.h > h - 2) continue;
    q.x = Math.min(Math.max(q.x, r.w / 2 + 4), w - r.w / 2 - 4);
    const rr = areaDoChip(ctx, q, s);
    if (!ocupadas.some((o) => colide(o, rr))) {
      melhor = q;
      break;
    }
  }
  ocupadas.push(areaDoChip(ctx, melhor, s));
  etiqueta(ctx, hits, melhor, s, cor);
}

function seta(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, cor: string, lw: number) {
  seg(ctx, a, b, cor, lw);
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const t = 10;
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(b.x - t * Math.cos(ang - 0.45), b.y - t * Math.sin(ang - 0.45));
  ctx.lineTo(b.x - t * Math.cos(ang + 0.45), b.y - t * Math.sin(ang + 0.45));
  ctx.closePath();
  ctx.fillStyle = cor;
  ctx.fill();
}

export function desenharLancamento(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hits: Hit[],
  cena: CenaLancamento,
): VistaLancamento {
  const v = vista(w, h, cena.janela);
  const xMax = (w - M.esq - M.dir) / v.escala;
  const yMax = (h - M.topo - M.base) / v.escala;
  const passo = passoDeMarcas(0, Math.max(xMax, yMax), 8);
  const ocupadas: Rect[] = [];

  // Grade e eixos com escala em metros.
  ctx.save();
  ctx.font = "700 12px Nunito, system-ui, sans-serif";
  ctx.fillStyle = c.muted;
  ctx.textBaseline = "middle";
  for (let x = passo; x <= xMax + 1e-9; x += passo) {
    seg(ctx, { x: v.X(x), y: v.Y(0) }, { x: v.X(x), y: v.Y(yMax) }, c.line, 1);
    ctx.textAlign = "center";
    ctx.fillText(num(x, 1), v.X(x), v.Y(0) + 14);
  }
  for (let y = passo; y <= yMax + 1e-9; y += passo) {
    seg(ctx, { x: v.X(0), y: v.Y(y) }, { x: v.X(xMax), y: v.Y(y) }, c.line, 1);
    ctx.textAlign = "right";
    ctx.fillText(num(y, 1), v.X(0) - 8, v.Y(y));
  }
  ctx.textAlign = "right";
  ctx.fillText("x (m)", v.X(xMax), v.Y(0) + 28);
  ctx.textAlign = "left";
  ctx.fillText("y (m)", 4, M.topo - 6);
  ctx.restore();
  seg(ctx, { x: v.X(0), y: v.Y(0) }, { x: v.X(0), y: v.Y(yMax) }, c.axis, 1.2);
  // Solo com hachuras (traço da tinta, como as ilustrações da landing).
  ctx.save();
  ctx.beginPath();
  ctx.rect(v.X(0) - 8, v.Y(0), v.X(xMax) - v.X(0) + 8, 9);
  ctx.clip();
  for (let x = v.X(0) - 8; x < v.X(xMax) + 10; x += 9) seg(ctx, { x, y: v.Y(0) + 9 }, { x: x + 7, y: v.Y(0) + 1 }, c.lineDark, 1.2);
  ctx.restore();
  seg(ctx, { x: v.X(0) - 8, y: v.Y(0) }, { x: v.X(xMax), y: v.Y(0) }, c.ink, 2);

  // Alvo no solo.
  if (cena.alvo) {
    const a = cena.alvo;
    const x0 = v.X(a.x - a.tolerancia);
    const x1 = v.X(a.x + a.tolerancia);
    ctx.fillStyle = c.greenTint;
    ctx.fillRect(x0, v.Y(0) - 8, Math.max(4, x1 - x0), 8);
    seg(ctx, { x: x0, y: v.Y(0) - 8 }, { x: x1, y: v.Y(0) - 8 }, c.greenDark, 2);
    text(ctx, { x: v.X(a.x), y: v.Y(0) - 20 }, `alvo ${num(a.x)} m`, c.greenDark, 13);
    // O texto do alvo entra na lista de áreas ocupadas: as etiquetas de θ, v0, H e A desviam dele.
    ctx.font = "900 13px Nunito, system-ui, sans-serif";
    const tw = ctx.measureText(`alvo ${num(a.x)} m`).width;
    ocupadas.push({ x: v.X(a.x) - tw / 2 - 4, y: v.Y(0) - 29, w: tw + 8, h: 18 });
  }

  // Plataforma de lançamento (se h0 > 0).
  const p0 = cena.principal;
  if (p0 && p0.h0 > 0) {
    ctx.fillStyle = c.lineDark;
    ctx.fillRect(v.X(0) - 10, v.Y(p0.h0), 10, v.Y(0) - v.Y(p0.h0));
  }

  // Trajetórias: referências primeiro (cinza, tracejadas), depois a principal.
  for (const tr of [...cena.tracos].sort((a, b) => Number(Boolean(b.referencia)) - Number(Boolean(a.referencia)))) {
    const pts = trajetoria(tr.l, 90, tr.ate).map((p) => ({ x: v.X(p.x), y: v.Y(p.y) }));
    const k = corDoTraco(tr.cor);
    const lw = tr.referencia ? 2 : largura("c1", 3.5, cena.highlight);
    // Prevista (ainda não lançada): tracejado longo na cor da marca; anteriores: cinza tracejado curto.
    const prevista = tr.referencia && tr.cor !== "muted";
    polyline(ctx, pts, tr.referencia && !prevista ? c.lineDark : k.main, prevista ? 2.5 : lw, tr.referencia ? (prevista ? [7, 7] : [5, 6]) : undefined);
    if (tr.rotulo && pts.length) {
      const fim = pts[pts.length - 1];
      const r = resolverLancamento(tr.l);
      const topo = posicao(tr.l, r.tSubida);
      const pos = tr.ate === undefined ? { x: v.X(topo.x), y: v.Y(topo.y) - 16 } : { x: fim.x, y: fim.y - 16 };
      if (tr.referencia) text(ctx, pos, tr.rotulo, c.muted, 13);
      else etiqueta(ctx, hits, pos, tr.rotulo, tr.cor);
    }
  }

  // Grandezas do lançamento principal.
  if (p0) {
    const r: Resultado = resolverLancamento(p0);
    const o = { x: v.X(0), y: v.Y(p0.h0) };
    const hl = cena.highlight;

    // Ângulo θ.
    const raio = 34;
    ctx.beginPath();
    ctx.arc(o.x, o.y, raio, -rad(p0.angulo), 0);
    ctx.strokeStyle = corDoTraco("c3").main;
    ctx.lineWidth = largura("c3", 2.5, hl);
    ctx.stroke();
    seg(ctx, o, { x: o.x + raio + 14, y: o.y }, c.lineDark, 1.5, [4, 4]);
    const meio = rad(p0.angulo / 2);
    etiquetaLivre(ctx, hits, ocupadas, { x: o.x + raio + 44, y: o.y - 16 - 6 * Math.sin(meio) }, `θ = ${num(p0.angulo, 0)}°`, "c3", w, h, v.Y(0) - 4);

    // Vetor v0 e componentes.
    if (cena.mostrar.vetores) {
      const comp = Math.min(70, Math.max(40, p0.v0 * 2.4));
      const fimV = { x: o.x + comp * Math.cos(rad(p0.angulo)), y: o.y - comp * Math.sin(rad(p0.angulo)) };
      const k4 = corDoTraco("c4");
      seg(ctx, o, { x: fimV.x, y: o.y }, k4.main, 1.5, [4, 4]);
      seg(ctx, { x: fimV.x, y: o.y }, fimV, k4.main, 1.5, [4, 4]);
      seta(ctx, o, fimV, k4.main, largura("c4", 3, hl));
      etiquetaLivre(ctx, hits, ocupadas, { x: fimV.x + 52, y: fimV.y - 10 }, `v₀ = ${num(p0.v0)} m/s`, "c4", w, h, v.Y(0) - 4);
    }

    if (cena.revelar) {
      const topo = posicao(p0, r.tSubida);
      if (cena.mostrar.altura && r.vy > 0) {
        const k2 = corDoTraco("c2");
        const pt = { x: v.X(topo.x), y: v.Y(topo.y) };
        seg(ctx, { x: v.X(0), y: pt.y }, pt, k2.main, largura("c2", 2, hl), [5, 5]);
        seg(ctx, pt, { x: pt.x, y: v.Y(0) }, k2.main, largura("c2", 2, hl), [2, 5]);
        dot(ctx, pt, 5, k2.main);
        etiquetaLivre(ctx, hits, ocupadas, { x: pt.x, y: pt.y - 18 }, `H = ${num(r.alturaMax)} m`, "c2", w, h, v.Y(0) - 4);
      }
      if (cena.mostrar.alcance) {
        const k1 = corDoTraco("c1");
        const y = v.Y(0) + 0;
        const xa = v.X(r.alcance);
        seg(ctx, { x: v.X(0), y: y - 4 }, { x: xa, y: y - 4 }, k1.main, largura("c1", 3, hl));
        dot(ctx, { x: xa, y: v.Y(0) }, 5, k1.dark);
        etiquetaLivre(ctx, hits, ocupadas, { x: xa, y: y - 26 }, `A = ${num(r.alcance)} m`, "c1", w, h, v.Y(0) - 4);
      }
    }

    // Bola em voo (ou parada no ponto de lançamento).
    const tb = cena.bola ? Math.min(cena.bola.t, r.tempo) : 0;
    const pb = posicao(p0, tb);
    // Bola: o "ponto atual" das ilustrações da landing (amarelo com contorno da tinta).
    const bc = { x: v.X(pb.x), y: v.Y(pb.y) - 1 };
    ctx.beginPath();
    ctx.arc(bc.x, bc.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = c.yellow;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = c.ink;
    ctx.stroke();
    dot(ctx, { x: bc.x - 3, y: bc.y - 3 }, 2.5, "#FFFFFF");
  }
  return v;
}
