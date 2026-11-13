import type { Hit } from "../../canvas";
import { criarVista, etiqueta, espessura, fmt, nota, poligonoMundo, segMundo, tinta, tintaClara } from "../geo/base";
import { calcular } from "./calc";
import type { Areas } from "./params";
export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Areas, ctl: Record<string, number>) {
  const d = calcular(p, ctl), max = Math.max(p.limite, d.lado, d.referencia) + 1;
  const v = criarVista(w, h - 95, { x0: -0.5, x1: max, y0: -0.5, y1: max }, 25);
  if (!d.valido || !Number.isFinite(d.area)) { nota(ctx, { x: w / 2, y: h / 2 }, "Dimensões fora do domínio"); return; }
  const rect = (x: number, y: number, b: number, a: number, cor: "c1" | "c2" | "c3" | "c4" | "muted", preencher = true) => { poligonoMundo(ctx, v, [{ x, y }, { x: x + b, y }, { x: x + b, y: y + a }, { x, y: y + a }], preencher ? tintaClara(cor) : undefined, tinta(cor), espessura(p.highlight, cor), cor === "muted" ? [5, 5] : undefined); };
  if (p.modo === "escala" && p.unidade) {
    segMundo(ctx, v, { x: 0, y: max / 2 }, { x: d.a, y: max / 2 }, tinta("c1"), 5);
    etiqueta(ctx, hits, { x: w / 2, y: h - 68 }, `${fmt(d.a)} m = ${fmt(d.a * 10 ** d.e)} ${["m", "dm", "cm"][d.e]}`, "c1");
    nota(ctx, { x: w / 2, y: h - 36 }, "Mesmo comprimento, outra unidade", "ink", 14);
    return;
  }
  if (p.modo === "produto" && !p.retirar) {
    rect(0, 0, d.a, d.a, "c1"); rect(d.a, 0, d.b, d.a, "c2"); rect(0, d.a, d.a, d.b, "c2"); rect(d.a, d.a, d.b, d.b, "c3");
  } else if (p.modo === "produto") {
    rect(0, 0, d.a, d.a, "muted");
    rect(d.lado, 0, d.b, d.a, "c2"); rect(0, d.lado, d.a, d.b, "c2");
    rect(d.lado, d.lado, d.b, d.b, "c3"); rect(0, 0, d.lado, d.lado, "c4");
  } else rect(0, 0, d.lado, d.lado, "c3");
  if (p.referencia) rect(0, 0, d.referencia, d.referencia, "muted", false);
  etiqueta(ctx, hits, { x: w / 2, y: h - 73 }, `Lado = ${fmt(d.lado)}`, p.modo === "raiz" ? "c4" : "c1");
  etiqueta(ctx, hits, { x: w / 2, y: h - 47 }, `Área = ${fmt(d.area)}`, "c3");
  const formula = p.modo === "produto" ? `${fmt(d.a ** 2)} ${p.retirar ? "−" : "+"} ${fmt(d.a * d.b)} ${p.retirar ? "−" : "+"} ${fmt(d.a * d.b)} + ${fmt(d.b ** 2)} = ${fmt(d.area)}` : p.modo === "raiz" ? `√${fmt(d.area)} = ${fmt(d.lado)}; lado não negativo` : `Lado ×${fmt(d.k)}; área ×${fmt(d.razao_area)}`;
  nota(ctx, { x: w / 2, y: h - 18 }, formula, "ink", 14);
}
