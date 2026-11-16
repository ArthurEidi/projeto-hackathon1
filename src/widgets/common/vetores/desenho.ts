import { type Hit, type Pt } from "../../canvas";
import { avaliarExpr } from "../expr";
import { criarVista, etiqueta, espessura, fmt, malha, nota, pegador, segMundo, tinta, type Alvo } from "../geo/base";
import { resolver } from "../pontos/calc";
import { escolherPosicao, type Obstaculo } from "../rotulosPlano";
import { girarI, resolverVetores, somar, type Vetor } from "./calc";
import type { Vetores } from "./params";
type Faixas = Readonly<Record<string, { min: number; max: number }>>;

/** Maior coordenada (em módulo) que aparece no desenho: caudas, pontas, soma e, no complexo, z girado. */
function extensao(p: Vetores, vs: Vetor[]): number {
  const soma = vs.reduce((s, v) => somar(s, v.comp), { x: 0, y: 0 });
  const zs = p.modo === "complexo" && vs[0] ? [Math.abs(vs[0].comp.x), Math.abs(vs[0].comp.y)] : [];
  return Math.max(0, ...vs.flatMap(v => [Math.abs(v.cauda.x), Math.abs(v.cauda.y), Math.abs(v.ponta.x), Math.abs(v.ponta.y)]), Math.abs(soma.x), Math.abs(soma.y), ...zs);
}

/**
 * Meia largura da vista. Modo vetores (com arraste): pelo menos 6, para haver espaço de arrastar.
 * Modo complexo (sem arraste): a escala do maior valor que os sliders alcançam (faixas do passo),
 * para z = 2 + i não ficar pequeno num plano de −7 a 7; mínimo 2.
 */
export function alcanceVetores(p: Vetores, ctl: Record<string, number>, vs: Vetor[], faixas?: Faixas): number {
  if (p.modo !== "complexo") return Math.max(6, extensao(p, vs)) + 1;
  let maior = extensao(p, vs);
  const ids = faixas ? Object.keys(faixas) : [];
  if (faixas && ids.length <= 6) {
    const visita = (i: number, atual: Record<string, number>) => {
      if (i === ids.length) { maior = Math.max(maior, extensao(p, resolverVetores(p, atual))); return; }
      const { min, max } = faixas[ids[i]];
      for (const v of [min, (min + max) / 2, max]) visita(i + 1, { ...atual, [ids[i]]: v });
    };
    visita(0, { ...ctl });
  }
  return Math.max(2, maior) + 1;
}

/** Vetor dos chips x/y e do módulo: `componentes_de` (16/11) ou, sem ele, o primeiro. */
export function vetorDosChips(p: Vetores, vs: Vetor[]): { vetor: Vetor; prefixo: string } {
  const id = p.modo === "vetores" ? p.componentes_de : undefined;
  const i = id === undefined ? 0 : Math.max(0, vs.findIndex(q => q.id === id));
  return { vetor: vs[i], prefixo: i === 0 ? "" : `${vs[i].id}: ` };
}

/**
 * Faixa abaixo da malha: chips x/y, chip Módulo e nota Soma (centros em y).
 * Com Módulo e Soma juntos (16/11) a faixa cresce 24 px para o chip não encostar na Soma;
 * nos outros casos as posições são as de antes.
 */
export function rodapeVetores(h: number, modulo: boolean, soma: boolean) {
  if (modulo && soma) return { reserva: 104, xy: h - 86, modulo: h - 54, soma: h - 16 };
  return { reserva: 80, xy: h - 60, modulo: h - 34, soma: h - 11 };
}

export function desenhar(ctx: CanvasRenderingContext2D, w: number, h: number, hits: Hit[], p: Vetores, ctl: Record<string, number>, vs: Vetor[], modulo: boolean, faixas?: Faixas) {
  const soma = vs.reduce((s, v) => somar(s, v.comp), { x: 0, y: 0 });
  const alcance = alcanceVetores(p, ctl, vs, faixas);
  const verSoma = p.mostrar.soma || (p.modo === "vetores" && p.mostrar_soma);
  const rod = rodapeVetores(h, modulo, verSoma);
  const caixa = { x0: -alcance, x1: alcance, y0: -alcance, y1: alcance }, v = criarVista(w, h - rod.reserva, caixa, 24), alvos: Alvo[] = [];
  malha(ctx, v, caixa, Math.max(1, Math.ceil(alcance / 8)));
  segMundo(ctx, v, { x: -alcance, y: 0 }, { x: alcance, y: 0 }, tinta("muted"), 1);
  segMundo(ctx, v, { x: 0, y: -alcance }, { x: 0, y: alcance }, tinta("muted"), 1);
  const seta = (a: Pt, b: Pt, cor: "c1" | "c2" | "c3" | "c4" | "muted") => {
    segMundo(ctx, v, a, b, tinta(cor), espessura(p.highlight, cor));
    const A = v.q(a), B = v.q(b), ang = Math.atan2(B.y - A.y, B.x - A.x);
    if (Math.hypot(B.x - A.x, B.y - A.y) < 1) return;
    ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(B.x - 10 * Math.cos(ang - 0.4), B.y - 10 * Math.sin(ang - 0.4)); ctx.moveTo(B.x, B.y); ctx.lineTo(B.x - 10 * Math.cos(ang + 0.4), B.y - 10 * Math.sin(ang + 0.4)); ctx.strokeStyle = tinta(cor); ctx.stroke();
  };
  const zero = { x: 0, y: 0 };
  if (p.modo === "complexo") {
    nota(ctx, v.p(alcance - 0.5, -0.5), "Re", "c1", 12); nota(ctx, v.p(0.7, alcance - 0.5), "Im", "c2", 12);
    const z = resolver(p.z, ctl), n = Math.round(avaliarExpr(p.potencia_i, ctl));
    for (let i = 0; i <= Math.min(Math.abs(n), 4); i++) seta(zero, girarI(z, i * Math.sign(n)), "muted");
    if (p.mostrar.conjugado) seta(zero, { x: vs[0].comp.x, y: -vs[0].comp.y }, "muted");
  } else if (p.escalar !== undefined) p.vetores.forEach((q, i) => seta(vs[i].cauda, somar(vs[i].cauda, resolver(q.comp, ctl)), "muted"));
  // Rótulo do vetor além da ponta, na direção dele; se bater em outro rótulo (z e w com pontas
  // próximas, como z = 2 + i e w = −i encadeados), tenta os lados e acima/abaixo.
  const rotulos: Obstaculo[] = [];
  const limites = { x: 4, y: 4, w: w - 8, h: h - rod.reserva - 8 };
  vs.forEach((q, i) => {
    seta(q.cauda, q.ponta, i === 0 ? "c3" : "c2");
    if (q.arrastavel !== "nenhum") { const t = q.arrastavel === "cauda" ? q.cauda : q.ponta; pegador(ctx, v.q(t), "c3"); alvos.push({ id: q.id, c: v.q(t), raio: 20 }); }
    const A = v.q(q.cauda), B = v.q(q.ponta), n = Math.hypot(B.x - A.x, B.y - A.y);
    const d = n < 1 ? { x: 0, y: -1 } : { x: (B.x - A.x) / n, y: (B.y - A.y) / n };
    const r = 24;
    const candidatos = [
      { x: B.x + d.x * r, y: B.y + d.y * r },
      { x: B.x - d.y * r, y: B.y + d.x * r },
      { x: B.x + d.y * r, y: B.y - d.x * r },
      { x: B.x, y: B.y - r },
      { x: B.x, y: B.y + r },
      { x: B.x + r + 8, y: B.y },
      { x: B.x - r - 8, y: B.y },
    ];
    const lw = 12 * q.id.length + 16;
    const { pos, caixa } = escolherPosicao(candidatos, lw, 29, rotulos, limites);
    rotulos.push({ caixa });
    etiqueta(ctx, hits, pos, q.id, i === 0 ? "c3" : "c2");
  });
  const { vetor: q, prefixo } = vetorDosChips(p, vs);
  if (modulo || p.modo === "complexo" || vs.length === 1) { const canto = { x: q.ponta.x, y: q.cauda.y }; segMundo(ctx, v, q.cauda, canto, tinta("c1"), espessura(p.highlight, "c1")); segMundo(ctx, v, canto, q.ponta, tinta("c2"), espessura(p.highlight, "c2")); }
  if (verSoma) seta(vs[0].cauda, somar(vs[0].cauda, soma), "c3");
  etiqueta(ctx, hits, { x: w / 4, y: rod.xy }, `${prefixo}x = ${fmt(q.comp.x)}`, "c1"); etiqueta(ctx, hits, { x: 3 * w / 4, y: rod.xy }, `${prefixo}y = ${fmt(q.comp.y)}`, "c2");
  if (modulo) etiqueta(ctx, hits, { x: w / 2, y: rod.modulo }, `Módulo${prefixo ? ` de ${q.id}` : ""} = ${fmt(Math.hypot(q.comp.x, q.comp.y))}`, "c4");
  if (verSoma) nota(ctx, { x: w / 2, y: rod.soma }, `Soma = (${fmt(soma.x)}; ${fmt(soma.y)})`, "c3", 14);
  return { vista: v, alvos };
}
