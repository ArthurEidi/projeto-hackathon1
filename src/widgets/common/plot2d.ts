// Matemática do plano cartesiano: avaliar curvas, achar raízes e encontros, mapear mundo -> tela.
// Sem React e sem DOM: testado em plot2d.test.ts.
import type { Curva, TipoCurva, Valor } from "./params";

export type Controles = Record<string, number>;

/** Resolve "$id" pelo slider; número passa direto. Slider ausente vale 0. */
export function resolver(v: Valor, controles: Controles): number {
  return typeof v === "number" ? v : (controles[v.slice(1)] ?? 0);
}

export interface CurvaResolvida {
  tipo: TipoCurva;
  a: number;
  b: number;
  c: number;
}

export function resolverCurva(c: Curva, controles: Controles): CurvaResolvida {
  return { tipo: c.tipo, a: resolver(c.a, controles), b: resolver(c.b, controles), c: resolver(c.c, controles) };
}

/** f(x) da curva; NaN fora do domínio (log de x ≤ 0, base inválida). */
export function avaliar(k: CurvaResolvida, x: number): number {
  const { a, b, c } = k;
  switch (k.tipo) {
    case "afim":
      return a * x + b;
    case "quadratica":
      return a * x * x + b * x + c;
    case "exponencial":
      return b > 0 ? a * b ** x + c : NaN;
    case "logaritmo":
      return x > 0 && b > 0 && b !== 1 ? (a * Math.log(x)) / Math.log(b) + c : NaN;
    case "modular":
      return a * Math.abs(x - b) + c;
    case "seno":
      return a * Math.sin(b * x) + c;
    case "cosseno":
      return a * Math.cos(b * x) + c;
  }
}

const EPS = 1e-9;

/**
 * Zeros de g em [x0, x1]: amostragem + bissecção, mais os toques sem troca de sinal
 * (mínimo local com |g| ~ 0). Para afim a resposta é exata.
 */
export function zeros(g: (x: number) => number, x0: number, x1: number, n = 800): number[] {
  const out: number[] = [];
  const push = (x: number) => {
    if (!out.some((o) => Math.abs(o - x) < 1e-6)) out.push(x);
  };
  const dx = (x1 - x0) / n;
  let xa = x0;
  let ya = g(xa);
  for (let i = 1; i <= n; i++) {
    const xb = x0 + i * dx;
    const yb = g(xb);
    if (Number.isFinite(ya) && Math.abs(ya) < EPS) push(xa);
    else if (Number.isFinite(ya) && Number.isFinite(yb) && ya * yb < 0) {
      let lo = xa;
      let hi = xb;
      for (let j = 0; j < 60; j++) {
        const m = (lo + hi) / 2;
        if (g(lo) * g(m) <= 0) hi = m;
        else lo = m;
      }
      push((lo + hi) / 2);
    }
    xa = xb;
    ya = yb;
  }
  if (Number.isFinite(ya) && Math.abs(ya) < EPS) push(xa);
  return out.map(arredondar).sort((p, q) => p - q);
}

/** Corta o ruído de ponto flutuante (2.0000000001 -> 2). */
export function arredondar(x: number): number {
  const r = Math.round(x * 1e9) / 1e9;
  return Object.is(r, -0) ? 0 : r;
}

/** Raízes da curva na faixa visível. Afim: exata; a = 0 e b = 0 devolve [] (todo x é raiz, ver `todaRaiz`). */
export function raizes(k: CurvaResolvida, x0: number, x1: number): number[] {
  if (k.tipo === "afim") {
    if (k.a === 0) return [];
    const r = arredondar(-k.b / k.a);
    return r >= x0 && r <= x1 ? [r] : [];
  }
  return zeros((x) => avaliar(k, x), x0, x1);
}

/** A curva é o próprio eixo x? (f(x) = 0 para todo x) */
export const todaRaiz = (k: CurvaResolvida) => k.tipo === "afim" && k.a === 0 && k.b === 0;

export function encontros(p: CurvaResolvida, q: CurvaResolvida, x0: number, x1: number): number[] {
  if (p.tipo === "afim" && q.tipo === "afim") {
    if (p.a === q.a) return [];
    const x = arredondar((q.b - p.b) / (p.a - q.a));
    return x >= x0 && x <= x1 ? [x] : [];
  }
  return zeros((x) => avaliar(p, x) - avaliar(q, x), x0, x1);
}

/** 1..4 no sentido anti-horário a partir de (+, +); 0 sobre um eixo. */
export function quadrante(x: number, y: number): 0 | 1 | 2 | 3 | 4 {
  if (Math.abs(x) < EPS || Math.abs(y) < EPS) return 0;
  if (x > 0) return y > 0 ? 1 : 4;
  return y > 0 ? 2 : 3;
}

/** Encaixa x em múltiplos de passo dentro de [x0, x1]. */
export function encaixar(x: number, passo: number, x0: number, x1: number): number {
  const s = arredondar(Math.round(x / passo) * passo);
  return Math.max(x0, Math.min(x1, s));
}

/** Espaçamento das marcas: 1, 2 ou 5 vezes potência de 10, com ~8 a 12 marcas na faixa. */
export function passoDeMarcas(min: number, max: number, alvo = 10): number {
  const bruto = (max - min) / alvo;
  const p = 10 ** Math.floor(Math.log10(bruto));
  for (const m of [1, 2, 5, 10]) if (m * p >= bruto) return m * p;
  return 10 * p;
}

export function marcas(min: number, max: number, passo: number): number[] {
  const out: number[] = [];
  for (let v = Math.ceil(min / passo) * passo; v <= max + EPS; v += passo) out.push(arredondar(v));
  return out;
}

/** Número em português: vírgula decimal, sinal de menos tipográfico, até 2 casas. */
export function num(x: number, casas = 2): string {
  const r = arredondar(x);
  const s = r.toLocaleString("pt-BR", { maximumFractionDigits: casas });
  return s.replace("-", "−");
}

export interface Vista {
  /** px por unidade (mesma escala nos dois eixos, para inclinações não distorcerem). */
  k: number;
  X: (x: number) => number;
  Y: (y: number) => number;
  /** Inverso de X: px -> x do mundo. */
  xDe: (px: number) => number;
  yDe: (py: number) => number;
  area: { x: number; y: number; w: number; h: number };
}

/** Enquadra [x0,x1] × [y0,y1] no retângulo, centralizado, com escala única. */
export function criarVista(
  xr: readonly [number, number],
  yr: readonly [number, number],
  reg: { x: number; y: number; w: number; h: number },
  pad = 18,
): Vista {
  const [x0, x1] = xr;
  const [y0, y1] = yr;
  const k = Math.min((reg.w - 2 * pad) / (x1 - x0), (reg.h - 2 * pad) / (y1 - y0));
  const ox = reg.x + reg.w / 2 - ((x0 + x1) / 2) * k;
  const oy = reg.y + reg.h / 2 + ((y0 + y1) / 2) * k;
  return {
    k,
    X: (x) => ox + x * k,
    Y: (y) => oy - y * k,
    xDe: (px) => (px - ox) / k,
    yDe: (py) => (oy - py) / k,
    area: { x: ox + x0 * k, y: oy - y1 * k, w: (x1 - x0) * k, h: (y1 - y0) * k },
  };
}
