import type { Hit } from "../../canvas";
import { criarVista, etiqueta, espessura, fmt, nota, poligonoMundo, segMundo, temSlider, tinta, tintaClara } from "../geo/base";
import { calcular } from "./calc";
import type { Areas } from "./params";

export type Faixas = Readonly<Record<string, { min: number; max: number }>>;

/** Maior extensão que a figura alcança com os sliders nas pontas e no meio das faixas. */
export function maiorExtensao(p: Areas, ctl: Record<string, number>, faixas: Faixas): number {
  const ids = Object.keys(faixas);
  const valores = ids.map((id) => [faixas[id].min, (faixas[id].min + faixas[id].max) / 2, faixas[id].max]);
  let maior = 0;
  const visita = (i: number, atual: Record<string, number>) => {
    if (i === ids.length) {
      const d = calcular(p, atual);
      const unidade = p.modo === "escala" && p.unidade;
      const lado = unidade ? d.a : Math.max(d.lado, p.referencia || (p.modo === "produto" && p.retirar) ? d.referencia : 0);
      if (d.valido && Number.isFinite(lado)) maior = Math.max(maior, lado);
      return;
    }
    for (const v of valores[i]) visita(i + 1, { ...atual, [ids[i]]: v });
  };
  if (ids.length <= 6) visita(0, { ...ctl });
  return maior;
}

/** Centro acompanha a figura; a escala não acompanha o valor de um slider.
 * Com as faixas dos sliders (passo interativo), a escala é a do maior lado possível,
 * e a figura ocupa a vista quando o slider chega ao máximo; sem elas, vale `limite`.
 * Figuras numéricas cabem na vista.
 */
export function vistaAreas(w: number, h: number, p: Areas, ctl: Record<string, number>, faixas?: Faixas) {
  const d = calcular(p, ctl);
  const unidade = p.modo === "escala" && p.unidade;
  const lado = unidade ? d.a : Math.max(d.lado, p.referencia || (p.modo === "produto" && p.retirar) ? d.referencia : 0);
  const alcance = temSlider(p) && faixas ? maiorExtensao(p, ctl, faixas) : 0;
  const extensao = temSlider(p) ? (alcance > 0 ? Math.max(alcance, lado) : p.limite) : Math.max(lado, 1);
  const altura = h - 140;
  const v = criarVista(w, altura, {
    x0: lado / 2 - extensao / 2, x1: lado / 2 + extensao / 2,
    y0: (unidade ? 0 : lado / 2) - extensao / 2,
    y1: (unidade ? 0 : lado / 2) + extensao / 2,
  }, Math.min(w, altura) * 0.1);
  // Reserva uma linha para a referência, sem sobrepor a figura.
  return { ...v, p: (x: number, y: number) => { const q = v.p(x, y); return { x: q.x, y: q.y + 28 }; },
    q: (q: { x: number; y: number }) => { const r = v.q(q); return { x: r.x, y: r.y + 28 }; },
    inv: (q: { x: number; y: number }) => v.inv({ x: q.x, y: q.y - 28 }) };
}

export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Areas, ctl: Record<string, number>, faixas?: Faixas) {
  const d = calcular(p, ctl);
  if (!d.valido || !Number.isFinite(d.area)) { nota(ctx, { x: w / 2, y: h / 2 }, "Dimensões fora do domínio"); return; }
  const v = vistaAreas(w, h, p, ctl, faixas);
  const rect = (x: number, y: number, b: number, a: number, cor: "c1" | "c2" | "c3" | "c4" | "muted", preencher = true) => {
    if (b <= 0 || a <= 0) return;
    poligonoMundo(ctx, v, [{ x, y }, { x: x + b, y }, { x: x + b, y: y + a }, { x, y: y + a }], preencher ? tintaClara(cor) : undefined, tinta(cor), espessura(p.highlight, cor), cor === "muted" ? [5, 5] : undefined);
  };
  if (p.modo === "escala" && p.unidade) {
    segMundo(ctx, v, { x: 0, y: 0 }, { x: d.a, y: 0 }, tinta("c1"), 5);
    for (const x of [0, d.a]) { const q = v.p(x, 0); ctx.beginPath(); ctx.moveTo(q.x, q.y - 7); ctx.lineTo(q.x, q.y + 7); ctx.strokeStyle = tinta("c1"); ctx.lineWidth = 3; ctx.stroke(); }
    etiqueta(ctx, hits, { x: w / 2, y: v.p(d.a / 2, 0).y - 26 }, `L = ${fmt(d.a)} m`, "c1");
    etiqueta(ctx, hits, { x: w / 2, y: h - 68 }, `${fmt(d.a)} m = ${fmt(d.a * 10 ** d.e)} ${["m", "dm", "cm"][d.e]}`, "c1");
    nota(ctx, { x: w / 2, y: h - 30 }, "Mesmo comprimento, outra unidade", "ink", 14);
    return;
  }
  type Peca = { x: number; y: number; w: number; h: number; texto: string; cor: "c1" | "c2" | "c3" | "c4" };
  let pecas: Peca[] = [];
  if (p.modo === "produto" && !p.retirar) {
    pecas = [
      { x: 0, y: 0, w: d.a, h: d.a, texto: "a²", cor: "c1" },
      { x: d.a, y: 0, w: d.b, h: d.a, texto: "ab", cor: "c2" },
      { x: 0, y: d.a, w: d.a, h: d.b, texto: "ab", cor: "c2" },
      { x: d.a, y: d.a, w: d.b, h: d.b, texto: "b²", cor: "c3" },
    ];
    pecas.forEach(q => rect(q.x, q.y, q.w, q.h, q.cor));
  } else if (p.modo === "produto") {
    rect(0, 0, d.a, d.a, "muted");
    rect(d.lado, 0, d.b, d.a, "c2"); rect(0, d.lado, d.a, d.b, "c2");
    rect(d.lado, d.lado, d.b, d.b, "c3"); rect(0, 0, d.lado, d.lado, "c4");
    pecas = [
      { x: 0, y: 0, w: d.lado, h: d.lado, texto: "(a−b)²", cor: "c4" },
      { x: d.lado, y: 0, w: d.b, h: d.lado, texto: "−ab", cor: "c2" },
      { x: 0, y: d.lado, w: d.lado, h: d.b, texto: "−ab", cor: "c2" },
      { x: d.lado, y: d.lado, w: d.b, h: d.b, texto: "+b²", cor: "c3" },
    ];
  } else {
    rect(0, 0, d.lado, d.lado, "c3");
    pecas = [{ x: 0, y: 0, w: d.lado, h: d.lado, texto: p.modo === "raiz" ? "A" : "(kL)²", cor: "c3" }];
  }
  if (p.referencia) {
    rect(0, 0, d.referencia, d.referencia, "muted", false);
    nota(ctx, { x: w / 2, y: 15 }, `Tracejado: referência de lado ${fmt(d.referencia)}`, "muted", 13);
  }
  // Peça de área zero ainda não existe: sem rótulo (com b = 0 não há ab nem b² para mostrar).
  // Na retirada, as faixas desenhadas medem b × a, então só somem com b = 0.
  const existe = (q: Peca) =>
    p.modo === "produto" && p.retirar ? (q.cor === "c4" ? d.lado > 1e-9 : d.b > 1e-9) : q.w > 1e-9 && q.h > 1e-9;
  pecas = pecas.filter(existe);
  pecas.forEach((q, i) => {
    ctx.font = "900 16px Nunito, system-ui, sans-serif";
    const cabe = q.w * v.k >= ctx.measureText(q.texto).width + 24 && q.h * v.k >= 37;
    // Peças estreitas ou de área zero ficam identificadas em uma faixa própria.
    const pos = cabe ? v.p(q.x + q.w / 2, q.y + q.h / 2) : { x: w * (i + 0.5) / pecas.length, y: h - 94 };
    etiqueta(ctx, hits, pos, q.texto, q.cor);
  });
  const corArea = p.modo === "produto" ? (p.retirar ? "c4" : "c3") : "c3";
  etiqueta(ctx, hits, { x: p.mostrar.total ? w * 0.27 : w * 0.5, y: h - 57 }, `Lado = ${fmt(d.lado)}`, p.modo === "raiz" ? "c4" : "c1");
  if (p.mostrar.total) {
    etiqueta(ctx, hits, { x: w * 0.73, y: h - 57 }, `Área = ${fmt(d.area)}`, corArea);
    const formula = p.modo === "produto" ? `${fmt(d.a ** 2)} ${p.retirar ? "−" : "+"} ${fmt(d.a * d.b)} ${p.retirar ? "−" : "+"} ${fmt(d.a * d.b)} + ${fmt(d.b ** 2)} = ${fmt(d.area)}` : p.modo === "raiz" ? `√${fmt(d.area)} = ${fmt(d.lado)}; lado não negativo` : `Lado ×${fmt(d.k)}; área ×${fmt(d.razao_area)}`;
    nota(ctx, { x: w / 2, y: h - 20 }, formula, "ink", 14);
  }
}
