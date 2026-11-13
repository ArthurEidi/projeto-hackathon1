// Desenho do widget ciclo_trigonometrico. A matemática vem de calc.ts.
import { palette } from "../../../ui/palette";
import { dot, type Hit, type Pt } from "../../canvas";
import {
  arco,
  criarVista,
  espessura,
  etiqueta,
  fmt,
  nota,
  notaEsq,
  pegador,
  poligonoMundo,
  polar,
  rad,
  segMundo,
  tinta,
  tintaClara,
  tintaEscura,
  type Alvo,
  type Vista,
} from "../geo/base";
import { fracaoPi, modeloCiclo, type Ctl, type EstadoCiclo } from "./calc";
import type { Ciclo } from "./params";

type G = CanvasRenderingContext2D;
export interface GeoCiclo {
  alvos: Alvo[];
  vista: Vista;
}

const ALT_LINHA = 19;
const banda = (n: number) => n * ALT_LINHA + 12;
const DOIS_PI = 2 * Math.PI;
/** Largura do gráfico ao lado, por radiano (o eixo x inteiro cobre 0 a 2π). */
const ESC_GRAF = 0.7;
const X_GRAF = 1.85;

export function aspectoCiclo(p: Ciclo): number {
  if (p.grafico) return 0.5;
  if (p.soma || p.mostrar.pitagorica) return 0.68;
  return p.mostrar.fita ? 0.95 : 0.88;
}

const rotuloAng = (g: number, u: Ciclo["unidade"]) => (u === "graus" ? `${fmt(g, 0)}°` : u === "radianos" ? `${fracaoPi(g)}` : `${fmt(g, 0)}° = ${fracaoPi(g)}`);

/** Ponto da circunferência no ângulo (graus). */
const noCiclo = (g: number): Pt => ({ x: Math.cos(rad(g)), y: Math.sin(rad(g)) });

export function desenharCiclo(ctx: G, w: number, h: number, hits: Hit[], p: Ciclo, cl: Ctl, e: EstadoCiclo): GeoCiclo {
  const m = modeloCiclo(p, cl, e);
  const cor = p.cores;
  const hl = p.highlight;
  const temBarras = !!p.soma || p.mostrar.pitagorica;
  const rodapes: { t: string; c: Parameters<typeof nota>[3] }[] = [];
  if (p.soma && m.soma) {
    rodapes.push({ t: `sen(α+β) = ${fmt(m.soma.senSoma)}   sen α + sen β = ${fmt(m.soma.somaSenos)}`, c: cor.soma });
    if (m.blocos) rodapes.push({ t: `sen α·cos β + cos α·sen β = ${fmt(m.soma.bloco1 + m.soma.bloco2)}`, c: "ink" });
  }
  const bandaFita = p.mostrar.fita ? 46 : 0;
  const alturaCiclo = h - bandaFita - (rodapes.length ? banda(rodapes.length) : 0);
  const x1 = p.grafico ? X_GRAF + DOIS_PI * ESC_GRAF + 0.4 : temBarras ? 3.5 : 1.5;
  const v = criarVista(w, alturaCiclo, { x0: p.grafico ? -2.1 : -1.5, x1, y0: -1.5, y1: 1.5 }, 12);
  const O = v.p(0, 0);
  const R = v.k;

  // Eixos, circunferência e marcos.
  segMundo(ctx, v, { x: -1.4, y: 0 }, { x: 1.4, y: 0 }, palette.lineDark, 1.5);
  segMundo(ctx, v, { x: 0, y: -1.4 }, { x: 0, y: 1.4 }, palette.lineDark, 1.5);
  ctx.beginPath();
  ctx.arc(O.x, O.y, R, 0, DOIS_PI);
  ctx.fillStyle = palette.surface;
  ctx.fill();
  ctx.strokeStyle = palette.lineDark;
  ctx.lineWidth = 2;
  ctx.stroke();
  if (p.mostrar.marcos) {
    const marcos: [number, string][] = [[0, "0"], [90, "π/2"], [180, "π"], [270, "3π/2"]];
    for (const [g, t] of marcos) {
      const q = v.q(polar(1.2, g));
      nota(ctx, { x: q.x + (g === 0 ? 4 : 0), y: q.y }, t, "muted", 12);
    }
  }

  // Referências em cinza.
  const fant = p.fantasma === undefined ? [] : Array.isArray(p.fantasma) ? p.fantasma : [p.fantasma];
  for (const g of fant) {
    const q = v.q(noCiclo(g));
    segMundo(ctx, v, { x: 0, y: 0 }, noCiclo(g), palette.lineDark, 2, [5, 5]);
    dot(ctx, q, 6, palette.muted);
  }
  for (const r of p.marcos_rad) {
    const q = v.q(polar(1, (r * 180) / Math.PI));
    dot(ctx, q, 5, palette.muted);
    const t = v.q(polar(1.2, (r * 180) / Math.PI));
    nota(ctx, t, `${fmt(r, 0)} rad`, "muted", 12);
  }

  // Arco solução e retas-alvo.
  if (p.arco) {
    const a = p.arco;
    const fim = a.ate > a.de ? a.ate : a.ate + 360;
    arco(ctx, O, R, a.de, fim, tinta(cor.arco), espessura(hl, cor.arco, 7));
    for (const [g, aberto] of [[a.de, a.abreDe], [a.ate, a.abreAte]] as const) {
      const q = v.q(noCiclo(g));
      dot(ctx, q, 8, aberto ? palette.bg : tinta(cor.arco));
      if (aberto) {
        ctx.beginPath();
        ctx.arc(q.x, q.y, 8, 0, DOIS_PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = tintaEscura(cor.arco);
        ctx.stroke();
      }
    }
  }
  const alvos: Alvo[] = [];
  if (m.alvo) {
    const k = m.alvo.k;
    if (m.alvo.tipo === "seno") segMundo(ctx, v, { x: -1.45, y: k }, { x: 1.45, y: k }, tinta(cor.alvo), espessura(hl, cor.alvo, 3), [8, 5]);
    else segMundo(ctx, v, { x: k, y: -1.45 }, { x: k, y: 1.45 }, tinta(cor.alvo), espessura(hl, cor.alvo, 3), [8, 5]);
    etiqueta(ctx, hits, m.alvo.tipo === "seno" ? { x: v.p(0, k).x, y: v.p(0, k).y - 18 } : { x: v.p(k, 0).x + 26, y: v.p(k, 0).y + 40 }, `${m.alvo.tipo === "seno" ? "y" : "x"} = ${fmt(k)}`, cor.alvo);
    m.alvo.solucoes.forEach((s, i) => {
      const q = v.q(noCiclo(s));
      const marcada = e.marcadas.has(i);
      dot(ctx, q, 9, marcada ? tinta(cor.solucao) : palette.bg);
      ctx.beginPath();
      ctx.arc(q.x, q.y, 9, 0, DOIS_PI);
      ctx.lineWidth = 3;
      ctx.strokeStyle = tintaEscura(cor.solucao);
      ctx.stroke();
      if (marcada) etiqueta(ctx, hits, { x: q.x + (Math.cos(rad(s)) >= 0 ? 36 : -36), y: q.y + (Math.sin(rad(s)) >= 0 ? -16 : 16) }, rotuloAng(s, p.unidade === "ambos" ? "radianos" : p.unidade), cor.solucao);
      alvos.push({ id: `sol-${i}`, c: q, raio: 22 });
    });
  }

  // Simétricos nos quatro quadrantes (em torno do fantasma, se houver, ou do ponto).
  if (p.mostrar.simetricos) {
    const base = fant.length ? fant[0] : m.ang;
    const pts = [base, 180 - base, 180 + base, 360 - base].map((g) => noCiclo(g));
    poligonoMundo(ctx, v, pts, tintaClara(cor.simetricos), tinta(cor.simetricos), 2, [6, 5]);
    [base, 180 - base, 180 + base, 360 - base].forEach((g, i) => {
      dot(ctx, v.q(pts[i]), 5, tinta(cor.simetricos));
      const gn = ((g % 360) + 360) % 360;
      etiqueta(ctx, hits, v.q(polar(1.28, g)), `${fmt(gn, 0)}°`, cor.simetricos);
    });
  }

  // Arco de A(1; 0) até P e o ângulo no centro.
  const a1 = m.angulo;
  const [ini, fim] = a1 >= 0 ? [0, a1] : [a1, 0];
  if (Math.abs(a1) > 1e-6) {
    arco(ctx, O, R * 0.3, ini, fim, tinta(cor.angulo), 3, tintaClara(cor.angulo));
    arco(ctx, O, R, ini, fim, tinta(cor.angulo), espessura(hl, cor.angulo, 5));
  }

  // Soma de giros: α e β lado a lado.
  if (p.soma && m.soma) {
    arco(ctx, O, R * 0.5, 0, m.soma.alfa, tinta(cor.alfa), 4, tintaClara(cor.alfa));
    arco(ctx, O, R * 0.62, m.soma.alfa, m.soma.alfa + m.soma.beta, tinta(cor.beta), 4, tintaClara(cor.beta));
    dot(ctx, v.q(noCiclo(m.soma.alfa)), 5, tinta(cor.alfa));
    etiqueta(ctx, hits, v.q(polar(0.3, m.soma.alfa / 2)), "α", cor.alfa);
    etiqueta(ctx, hits, v.q(polar(0.8, m.soma.alfa + m.soma.beta / 2)), "β", cor.beta);
  }

  // Triângulo de hipotenusa 1.
  const P = { x: m.cos, y: m.sen };
  if (p.mostrar.pitagorica) poligonoMundo(ctx, v, [{ x: 0, y: 0 }, { x: P.x, y: 0 }, P], tintaClara("c3"), undefined);

  // Tangente em x = 1 e secante.
  if (p.mostrar.tangente || p.mostrar.secante) {
    segMundo(ctx, v, { x: 1, y: -1.45 }, { x: 1, y: 1.45 }, palette.lineDark, 2);
    if (Number.isFinite(m.tg) && Math.abs(m.tg) <= 1.45) {
      const T = { x: 1, y: m.tg };
      segMundo(ctx, v, { x: 0, y: 0 }, T, palette.ink2, 2, [6, 5]);
      if (p.mostrar.tangente) {
        segMundo(ctx, v, { x: 1, y: 0 }, T, tinta(cor.tangente), espessura(hl, cor.tangente, 5));
        etiqueta(ctx, hits, { x: v.q(T).x + 36, y: v.q(T).y }, `tg ${fmt(m.tg)}`, cor.tangente);
      }
      if (p.mostrar.secante) etiqueta(ctx, hits, v.p(0.5, m.tg / 2), `sec ${fmt(m.sec)}`, "c4");
    } else if (p.mostrar.tangente) {
      nota(ctx, v.p(1, m.tg > 0 ? 1.35 : -1.35), `tg ${Number.isFinite(m.tg) ? fmt(m.tg) : "não existe"}`, cor.tangente, 13);
    }
  }

  // Projeções seno e cosseno.
  if (p.mostrar.cosseno) segMundo(ctx, v, { x: 0, y: 0 }, { x: P.x, y: 0 }, tinta(cor.cosseno), espessura(hl, cor.cosseno, 5));
  if (p.mostrar.seno) segMundo(ctx, v, { x: P.x, y: 0 }, P, tinta(cor.seno), espessura(hl, cor.seno, 5));
  segMundo(ctx, v, { x: 0, y: 0 }, P, palette.ink2, 3);
  const Pq = v.q(P);
  if (p.arrastavel) {
    pegador(ctx, Pq, "ink");
    alvos.push({ id: "P", c: Pq, raio: 28 });
  } else dot(ctx, Pq, 7, palette.ink);
  if (p.mostrar.seno && Math.abs(m.sen) > 0.04) etiqueta(ctx, hits, { x: v.q(P).x + (P.x >= 0 ? 38 : -38), y: v.p(0, m.sen / 2).y }, `sen ${fmt(m.sen)}`, cor.seno);
  if (p.mostrar.cosseno && Math.abs(m.cos) > 0.04) etiqueta(ctx, hits, { x: v.p(m.cos / 2, 0).x, y: O.y + (m.sen >= 0 ? 22 : -22) }, `cos ${fmt(m.cos)}`, cor.cosseno);
  if (p.mostrar.pitagorica) etiqueta(ctx, hits, v.p(P.x / 2 - 0.12 * Math.sign(P.x || 1), P.y / 2 + 0.12), "1", "c3");

  // Mostrador do ângulo.
  const linhas = [`θ = ${rotuloAng(m.angulo, p.unidade)}`];
  if (p.mostrar.voltas) {
    const n = Math.trunc(m.angulo / 360);
    linhas.push(`${Math.abs(n)} ${Math.abs(n) === 1 ? "volta" : "voltas"}${Math.abs(n) > 0 ? ` + ${fmt(m.ang, 0)}°` : ""}`);
  }
  linhas.forEach((t, i) => notaEsq(ctx, { x: 10, y: 14 + i * 18 }, t, tintaEscura(cor.angulo), 14));

  // Barras laterais.
  if (temBarras) desenharBarras(ctx, v, hits, p, m, cor);
  // Gráfico ao lado.
  if (p.grafico) desenharGrafico(ctx, v, hits, p, m, P);
  // Fita do arco desenrolado em radianos.
  if (p.mostrar.fita) desenharFita(ctx, w, h - (rodapes.length ? banda(rodapes.length) : 0), m.rad, cor.fita);
  rodapes.forEach((l, i) => nota(ctx, { x: w / 2, y: h - banda(rodapes.length) + 14 + i * ALT_LINHA }, l.t, l.c, 14));
  return { alvos, vista: v };
}

type Modelo = ReturnType<typeof modeloCiclo>;

function desenharBarras(ctx: G, v: Vista, hits: Hit[], p: Ciclo, m: Modelo, cor: Ciclo["cores"]) {
  const base = -1.2;
  const esc = 2.4;
  const barra = (x: number, partes: { v: number; c: Parameters<typeof tinta>[0] }[], rotulo: string, cc: Parameters<typeof tinta>[0]) => {
    let y = base;
    for (const parte of partes) {
      const alt = parte.v * esc;
      const a = v.p(x, y);
      const b = v.p(x + 0.4, y + alt);
      ctx.fillStyle = tinta(parte.c);
      ctx.fillRect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      y += alt;
    }
    const a0 = v.p(x, base);
    const a1 = v.p(x + 0.4, y);
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(Math.min(a0.x, a1.x), Math.min(a0.y, a1.y), Math.abs(a1.x - a0.x), Math.abs(a1.y - a0.y));
    etiqueta(ctx, hits, { x: v.p(x + 0.2, y).x, y: v.p(x + 0.2, y).y - 16 }, rotulo, cc);
  };
  if (p.mostrar.pitagorica) {
    barra(1.95, [{ v: m.sen * m.sen, c: cor.seno }, { v: m.cos * m.cos, c: cor.cosseno }], "1", "c3");
    notaEsq(ctx, v.p(2.42, base + m.sen * m.sen * esc * 0.5), `sen² = ${fmt(m.sen * m.sen)}`, tintaEscura(cor.seno), 12);
    notaEsq(ctx, v.p(2.42, base + (m.sen * m.sen + m.cos * m.cos * 0.5) * esc), `cos² = ${fmt(m.cos * m.cos)}`, tintaEscura(cor.cosseno), 12);
  }
  if (p.soma && m.soma) {
    const s = m.soma;
    barra(1.75, [{ v: Math.max(s.senSoma, 0), c: cor.soma }], fmt(s.senSoma), cor.soma);
    barra(2.3, [{ v: Math.max(Math.sin(rad(s.alfa)), 0), c: cor.alfa }, { v: Math.max(Math.sin(rad(s.beta)), 0), c: cor.beta }], fmt(s.somaSenos), "ink");
    if (m.blocos) barra(2.85, [{ v: Math.max(s.bloco1, 0), c: cor.alfa }, { v: Math.max(s.bloco2, 0), c: cor.beta }], fmt(s.bloco1 + s.bloco2), cor.soma);
  }
}

function desenharGrafico(ctx: G, v: Vista, hits: Hit[], p: Ciclo, m: Modelo, P: Pt) {
  const cor = p.grafico === "sen" ? p.cores.seno : p.cores.cosseno;
  const f = p.grafico === "sen" ? Math.sin : Math.cos;
  const X = (t: number) => X_GRAF + t * ESC_GRAF;
  segMundo(ctx, v, { x: X_GRAF - 0.1, y: 0 }, { x: X(DOIS_PI) + 0.15, y: 0 }, palette.lineDark, 1.5);
  segMundo(ctx, v, { x: X_GRAF, y: -1.3 }, { x: X_GRAF, y: 1.3 }, palette.lineDark, 1.5);
  for (const y of [-1, 1]) segMundo(ctx, v, { x: X_GRAF, y }, { x: X(DOIS_PI), y }, palette.line, 1.5, [4, 4]);
  for (const [t, r] of [[Math.PI, "π"], [DOIS_PI, "2π"]] as const) nota(ctx, v.p(X(t), -0.2), r, "muted", 12);
  const passos = 96;
  const curva = (ate: number) => {
    const pts: Pt[] = [];
    for (let i = 0; i <= passos; i++) {
      const t = (ate * i) / passos;
      pts.push(v.p(X(t), f(t)));
    }
    return pts;
  };
  ctx.beginPath();
  curva(DOIS_PI).forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
  ctx.setLineDash([3, 5]);
  ctx.strokeStyle = palette.lineDark;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);
  const t = Math.max(0, Math.min(DOIS_PI, m.rad));
  if (t > 0) {
    ctx.beginPath();
    curva(t).forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
    ctx.strokeStyle = tinta(cor);
    ctx.lineWidth = 4;
    ctx.stroke();
  }
  const ponto = v.p(X(t), f(t));
  segMundo(ctx, v, P, { x: X(t), y: f(t) }, palette.muted, 1.5, [4, 4]);
  dot(ctx, ponto, 6, tintaEscura(cor));
  etiqueta(ctx, hits, { x: ponto.x, y: ponto.y + (f(t) >= 0 ? -20 : 20) }, `${p.grafico === "sen" ? "sen" : "cos"} ${fmt(f(t))}`, cor);
}

function desenharFita(ctx: G, w: number, h: number, radianos: number, c: Parameters<typeof tinta>[0]) {
  const x0 = 14;
  const x1 = w - 14;
  const y = h - 26;
  const escala = (x1 - x0) / DOIS_PI;
  ctx.fillStyle = palette.surface;
  ctx.fillRect(x0, y - 8, x1 - x0, 16);
  const ate = Math.max(0, Math.min(DOIS_PI, Math.abs(radianos)));
  ctx.fillStyle = tinta(c);
  ctx.fillRect(x0, y - 8, ate * escala, 16);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(x0, y - 8, x1 - x0, 16);
  for (let r = 1; r <= 6; r++) {
    const x = x0 + r * escala;
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x, y + 8);
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    nota(ctx, { x, y: y + 17 }, String(r), "muted", 11);
  }
  nota(ctx, { x: w / 2, y: y - 22 }, `${fmt(radianos)} rad (cada traço é um raio)`, "ink", 12);
}
