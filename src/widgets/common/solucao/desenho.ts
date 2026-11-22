// Béquer em Canvas 2D: nível proporcional ao volume, cor proporcional à concentração e partículas
// simbólicas (cada uma = uma massa fixa de soluto dissolvido). Compartilhado pelo widget e pela figura.
import { chip, seg, text, type Hit, type Rect } from "../../canvas";
import { corDoTraco, type Marca } from "../../../ui/marcas";
import { palette as c } from "../../../ui/palette";
import { num } from "../plot2d";
import { contarParticulas, posicoesParticulas, resolverSolucao } from "./calc";

export interface BequerDesenho {
  massa: number;
  volume: number;
  capacidade: number;
  porParticula: number;
  solubilidade?: number;
  mostrarParticulas: boolean;
  /** Desenho de comparação (solução de antes): traço claro. */
  fantasma?: boolean;
  rotulo?: string;
  /** Etiquetas de V e C sobre o béquer. */
  etiquetas: { volume: boolean; concentracao: boolean };
  highlight: readonly Marca[];
}

const POSICOES = posicoesParticulas(160);

/** Concentração (g/L) que deixa a cor no máximo; acima disso, a cor não escurece mais. */
const C_COR_MAX = 200;

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

const largura = (marca: Marca, base: number, hl: readonly Marca[]) =>
  hl.length === 0 ? base : hl.includes(marca) ? base * 1.8 : base * 0.7;

function etiqueta(ctx: CanvasRenderingContext2D, hits: Hit[], x: number, y: number, s: string, marca: Marca) {
  const k = corDoTraco(marca);
  hits.push({ key: marca, ...chip(ctx, { x, y }, s, k.main, k.dark) });
}

/** Desenha um béquer dentro da área `r`. Devolve a concentração calculada (g/L). */
export function desenharBequer(ctx: CanvasRenderingContext2D, r: Rect, b: BequerDesenho, hits: Hit[]): number {
  const res = resolverSolucao({ massa: b.massa, volume: b.volume, solubilidade: b.solubilidade });
  const topo = r.y + 26;
  const fundo = r.y + r.h - (b.rotulo ? 30 : 8);
  const esq = r.x + r.w * 0.16;
  const dir = r.x + r.w * 0.84;
  const alturaUtil = fundo - topo - 10;
  const nivel = fundo - (Math.min(b.volume, b.capacidade) / b.capacidade) * alturaUtil;
  const vidro = b.fantasma ? c.lineDark : c.ink;
  const azul = corDoTraco("c1");

  // Interior do béquer com fundo arredondado: líquido, partículas e cristais ficam recortados nele.
  const raio = Math.min(14, (dir - esq) / 6);
  const interior = () => {
    ctx.beginPath();
    ctx.moveTo(esq, topo);
    ctx.lineTo(esq, fundo - raio);
    ctx.quadraticCurveTo(esq, fundo, esq + raio, fundo);
    ctx.lineTo(dir - raio, fundo);
    ctx.quadraticCurveTo(dir, fundo, dir, fundo - raio);
    ctx.lineTo(dir, topo);
  };
  ctx.save();
  interior();
  ctx.closePath();
  ctx.clip();

  // Líquido: tom de água + soluto proporcional à concentração.
  const alfa = 0.1 + 0.75 * Math.min(1, res.concentracao / C_COR_MAX);
  ctx.fillStyle = b.fantasma ? rgba(azul.main, alfa * 0.45) : rgba(azul.main, alfa);
  ctx.fillRect(esq, nivel, dir - esq, fundo - nivel);
  ctx.fillStyle = rgba("#FFFFFF", 0.4);
  ctx.fillRect(esq, nivel, dir - esq, 3);

  // Partículas simbólicas de soluto dissolvido.
  if (b.mostrarParticulas && fundo - nivel > 6) {
    const n = contarParticulas(res.dissolvida, b.porParticula, POSICOES.length);
    const rr = (b.fantasma ? 2.2 : 3) * (b.highlight.includes("c1") ? 1.4 : 1);
    for (let i = 0; i < n; i++) {
      const p = POSICOES[i];
      const pc = { x: esq + 6 + p.u * (dir - esq - 12), y: nivel + 4 + p.v * (fundo - nivel - 8) };
      ctx.beginPath();
      ctx.arc(pc.x, pc.y, rr, 0, Math.PI * 2);
      ctx.fillStyle = b.fantasma ? rgba(azul.dark, 0.45) : azul.dark;
      ctx.fill();
    }
  }

  // Excesso (acima da solubilidade): cristais no fundo.
  if (res.excesso > 0) {
    const cristais = Math.min(30, Math.ceil(res.excesso / b.porParticula));
    ctx.fillStyle = azul.dark;
    for (let i = 0; i < cristais; i++) {
      const x = esq + 8 + ((i * 37) % Math.max(1, dir - esq - 16));
      ctx.fillRect(x, fundo - 6 - (i % 3) * 4, 5, 5);
    }
  }
  ctx.restore();

  // Vidro e graduação (a cada 100 mL).
  const lw = b.fantasma ? 1.6 : 2.2;
  ctx.beginPath();
  ctx.moveTo(esq - 8, topo - 4);
  ctx.lineTo(esq, topo);
  interior();
  ctx.lineTo(dir + 8, topo - 4);
  ctx.strokeStyle = vidro;
  ctx.lineWidth = lw;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
  // Contorno na cor da concentração quando C está em destaque na fórmula.
  if (b.highlight.includes("c3") && !b.fantasma) {
    ctx.save();
    interior();
    ctx.strokeStyle = corDoTraco("c3").main;
    ctx.lineWidth = 4;
    ctx.globalAlpha = 0.55;
    ctx.stroke();
    ctx.restore();
  }
  ctx.font = "700 11px Nunito, system-ui, sans-serif";
  ctx.fillStyle = c.muted;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const marcaGrad = b.capacidade <= 500 ? 50 : 100;
  for (let ml = marcaGrad; ml <= b.capacidade; ml += marcaGrad) {
    const y = fundo - (ml / b.capacidade) * alturaUtil;
    const maior = ml % (marcaGrad * 2) === 0;
    seg(ctx, { x: esq, y }, { x: esq + (maior ? 14 : 8), y }, vidro, 1.5);
    if (maior && !b.fantasma && r.w > 150) ctx.fillText(`${ml}`, esq + 18, y);
  }

  // Nível (volume) e concentração.
  if (!b.fantasma) {
    seg(ctx, { x: esq - 10, y: nivel }, { x: dir + 10, y: nivel }, corDoTraco("c2").main, largura("c2", 2, b.highlight), [5, 4]);
  }
  if (b.etiquetas.volume) etiqueta(ctx, hits, Math.min(r.x + r.w - 40, dir + 8), Math.max(topo + 6, nivel - 16), `V = ${num(b.volume, 0)} mL`, "c2");
  // C dentro do líquido quando há altura; com pouco líquido, no alto do béquer (longe da etiqueta de V).
  const yC = fundo - nivel > 64 ? Math.min(fundo - 18, Math.max(nivel + 24, topo + 30)) : topo + 16;
  if (b.etiquetas.concentracao) etiqueta(ctx, hits, (esq + dir) / 2, yC, `C = ${num(res.concentracao, 1)} g/L`, "c3");
  if (b.rotulo) text(ctx, { x: (esq + dir) / 2, y: r.y + r.h - 12 }, b.rotulo, b.fantasma ? c.muted : c.ink2, 14);
  return res.concentracao;
}

/** Medidor vertical da concentração, com alvo opcional. */
export function desenharMedidor(
  ctx: CanvasRenderingContext2D,
  r: Rect,
  concentracao: number,
  maximo: number,
  alvo: number | undefined,
  hl: readonly Marca[],
) {
  const k = corDoTraco("c3");
  const x = r.x + r.w / 2 - 9;
  const topo = r.y + 30;
  const fundo = r.y + r.h - 30;
  ctx.fillStyle = c.line;
  ctx.beginPath();
  ctx.roundRect(x, topo, 18, fundo - topo, 9);
  ctx.fill();
  const frac = Math.max(0, Math.min(1, concentracao / maximo));
  ctx.fillStyle = k.main;
  ctx.beginPath();
  ctx.roundRect(x, fundo - frac * (fundo - topo), 18, frac * (fundo - topo), 9);
  ctx.fill();
  if (hl.includes("c3")) {
    ctx.strokeStyle = k.dark;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(x - 2, topo - 2, 22, fundo - topo + 4, 10);
    ctx.stroke();
  }
  if (alvo !== undefined) {
    const y = fundo - Math.min(1, alvo / maximo) * (fundo - topo);
    seg(ctx, { x: x - 8, y }, { x: x + 26, y }, c.greenDark, 3);
    text(ctx, { x: x + 9, y: topo - 16 }, `alvo ${num(alvo)} g/L`, c.greenDark, 12);
  }
  text(ctx, { x: x + 9, y: fundo + 16 }, "C (g/L)", c.muted, 12);
}
