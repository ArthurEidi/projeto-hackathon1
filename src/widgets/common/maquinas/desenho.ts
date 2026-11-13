import { seg, type Hit } from "../../canvas";
import { etiqueta, fmt, nota, tinta, tintaClara } from "../geo/base";
import { cadeia, contagens } from "./calc";
import type { Maquinas } from "./params";
export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Maquinas, ctl: Record<string, number>, ligacoes: [number, number][], x: number, ordem: boolean, inversa: boolean) {
  if (p.modo === "flechas") {
    const n = Math.max(p.entradas.length, p.saidas.length), dy = (h - 80) / n;
    const pos = (lado: number, i: number) => ({ x: lado ? w - 75 : 75, y: 45 + i * dy });
    for (const [a, b] of ligacoes) { const A = pos(0, a), B = pos(1, b); seg(ctx, { x: A.x + 25, y: A.y }, { x: B.x - 25, y: B.y }, tinta("c3"), 3); const ang = Math.atan2(B.y - A.y, B.x - A.x - 50); seg(ctx, { x: B.x - 25, y: B.y }, { x: B.x - 25 - 9 * Math.cos(ang - 0.5), y: B.y - 9 * Math.sin(ang - 0.5) }, tinta("c3"), 3); }
    p.entradas.forEach((a, i) => etiqueta(ctx, hits, pos(0, i), String(a), "c1"));
    p.saidas.forEach((b, i) => etiqueta(ctx, hits, pos(1, i), String(b), "c2"));
    const c = contagens(p.entradas.length, ligacoes);
    nota(ctx, { x: w / 2, y: h - 20 }, c.some(n => n > 1) ? "Uma entrada tem mais de uma saída" : c.every(n => n === 1) ? "Cada entrada tem uma saída" : "Ainda há entradas sem saída", "c4", 13);
    return;
  }
  const c = cadeia(p, ctl, x, ordem, inversa);
  if (inversa && !c.invertivel) { nota(ctx, { x: w / 2, y: h / 2 }, "Máquina constante: não tem inversa", "c4", 14); return; }
  const dy = (h - 90) / c.maquinas.length;
  etiqueta(ctx, hits, { x: w / 2, y: 20 }, `${inversa ? "Saída a desfazer" : "Entrada"}: ${fmt(c.valores[0])}`, "c1");
  c.maquinas.forEach((m, i) => {
    const y = 48 + i * dy;
    ctx.fillStyle = tintaClara("c3"); ctx.fillRect(65, y, w - 130, 38); ctx.strokeStyle = tinta("c3"); ctx.lineWidth = p.highlight.includes("c3") ? 4 : 2; ctx.strokeRect(65, y, w - 130, 38);
    nota(ctx, { x: w / 2, y: y + 19 }, `${m.nome}(x) = ${fmt(m.a)}x + (${fmt(m.b)})`, "c3", 14);
    etiqueta(ctx, hits, { x: w / 2, y: y + 55 }, `Saída: ${fmt(c.valores[i + 1])}`, "c2");
  });
}
