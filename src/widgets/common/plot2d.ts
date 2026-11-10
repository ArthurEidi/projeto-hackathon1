// Matemática do plano cartesiano: avaliar curvas, achar raízes e encontros, mapear mundo -> tela.
// Sem React e sem DOM: testado em plot2d.test.ts.
import type { Curva, TipoCurva, Valor } from "./params";

export type Controles = Record<string, number>;

/** Resolve "$id" pelo slider; número passa direto. Slider ausente vale 0. */
export function resolver(v: Valor, controles: Controles): number {
  return typeof v === "number" ? v : (controles[v.slice(1)] ?? 0);
}

export interface Transformacao {
  /** g(x) = a·f(b·(x − h)) + k */
  a: number;
  b: number;
  h: number;
  k: number;
}

export interface Dominio {
  de: number | null;
  ate: number | null;
  abreDe: boolean;
  abreAte: boolean;
}

export interface CurvaResolvida {
  tipo: TipoCurva;
  a: number;
  b: number;
  c: number;
  /** cúbica: termo independente. */
  d?: number;
  /** potência: expoente. */
  n?: number;
  /** seno/cosseno: deslocamento horizontal, a·sen(b·(x − fase)) + c. */
  fase?: number;
  t?: Transformacao;
  dom?: Dominio;
  furos?: readonly number[];
}

export function resolverCurva(c: Curva, controles: Controles): CurvaResolvida {
  const k: CurvaResolvida = { tipo: c.tipo, a: resolver(c.a, controles), b: resolver(c.b, controles), c: resolver(c.c, controles) };
  if (c.tipo === "cubica") k.d = resolver(c.d, controles);
  if (c.tipo === "potencia") k.n = resolver(c.n, controles);
  if ((c.tipo === "seno" || c.tipo === "cosseno") && c.fase !== 0) k.fase = resolver(c.fase, controles);
  if (c.transforma) {
    const t = c.transforma;
    k.t = { a: resolver(t.a, controles), b: resolver(t.b, controles), h: resolver(t.h, controles), k: resolver(t.k, controles) };
  }
  if (c.dominio) k.dom = c.dominio;
  if (c.furos.length) k.furos = c.furos;
  return k;
}

/** Curva "pura": sem transformação, domínio ou furos (aí valem as fórmulas exatas). */
const pura = (k: CurvaResolvida) => !k.t && !k.dom && !k.furos?.length;

function avaliarBase(k: CurvaResolvida, x: number): number {
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
      return a * Math.sin(b * (x - (k.fase ?? 0))) + c;
    case "cosseno":
      return a * Math.cos(b * (x - (k.fase ?? 0))) + c;
    case "raiz":
      return x - b >= 0 ? a * Math.sqrt(x - b) + c : NaN;
    case "racional":
      return x === b ? NaN : a / (x - b) + c;
    case "cubica":
      return ((a * x + b) * x + c) * x + (k.d ?? 0);
    case "potencia": {
      const n = k.n ?? 2;
      const base = x - b;
      // Expoente fracionário de base negativa não é real.
      if (base < 0 && !Number.isInteger(n)) return NaN;
      if (base === 0 && n < 0) return NaN;
      return a * base ** n + c;
    }
  }
}

/** O x está no domínio declarado (e não é um furo)? */
export function noDominio(k: CurvaResolvida, x: number): boolean {
  if (k.furos?.some((f) => Math.abs(f - x) < 1e-9)) return false;
  const d = k.dom;
  if (!d) return true;
  if (d.de !== null && (d.abreDe ? x <= d.de : x < d.de)) return false;
  if (d.ate !== null && (d.abreAte ? x >= d.ate : x > d.ate)) return false;
  return true;
}

/** f(x) da curva; NaN fora do domínio (log de x ≤ 0, base inválida, furo, domínio declarado). */
export function avaliar(k: CurvaResolvida, x: number): number {
  if (!noDominio(k, x)) return NaN;
  const y = k.t ? k.t.a * avaliarBase(k, k.t.b * (x - k.t.h)) + k.t.k : avaliarBase(k, x);
  return Number.isFinite(y) ? y : NaN;
}

/** Valor da curva sem olhar furos (para desenhar a bolinha vazia no lugar certo). */
export function avaliarSemFuro(k: CurvaResolvida, x: number): number {
  return avaliar({ ...k, furos: undefined }, x);
}

/** Assíntotas da curva (vertical em x, horizontal em y), já com a transformação aplicada. */
export function assintotas(k: CurvaResolvida): { x?: number; y?: number } {
  const t = k.t ?? { a: 1, b: 1, h: 0, k: 0 };
  // Ponto da curva base u ↦ x = h + u/b; valor base v ↦ y = a·v + k.
  const xDe = (u: number) => (t.b === 0 ? NaN : arredondar(t.h + u / t.b));
  const yDe = (v: number) => arredondar(t.a * v + t.k);
  switch (k.tipo) {
    case "exponencial":
      return k.b > 0 && k.b !== 1 && k.a !== 0 ? { y: yDe(k.c) } : {};
    case "logaritmo":
      return { x: xDe(0) };
    case "racional":
      return k.a !== 0 ? { x: xDe(k.b), y: yDe(k.c) } : {};
    case "potencia":
      return (k.n ?? 2) < 0 ? { x: xDe(k.b), y: yDe(k.c) } : {};
    default:
      return {};
  }
}

/** Vértice da parábola (quadrática, ou potência de expoente 2), com a transformação aplicada. */
export function vertice(k: CurvaResolvida): { x: number; y: number } | null {
  let u: number;
  if (k.tipo === "quadratica" && k.a !== 0) u = -k.b / (2 * k.a);
  else if (k.tipo === "potencia" && (k.n ?? 2) === 2 && k.a !== 0) u = k.b;
  else return null;
  const t = k.t ?? { a: 1, b: 1, h: 0, k: 0 };
  if (t.b === 0) return null;
  const x = arredondar(t.h + u / t.b);
  const y = avaliar({ ...k, dom: undefined, furos: undefined }, x);
  return Number.isFinite(y) ? { x, y: arredondar(y) } : null;
}

/** Fator de crescimento da exponencial ao andar 1 em x: (y(x+1) − c')/(y(x) − c'). */
export function fatorPorPasso(k: CurvaResolvida, x: number): number {
  const ass = assintotas(k).y ?? 0;
  const y0 = avaliar(k, x) - ass;
  const y1 = avaliar(k, x + 1) - ass;
  return y0 === 0 ? NaN : arredondar(y1 / y0);
}

/** Período 2π/|b| de seno/cosseno (com a transformação b'), NaN para as demais. */
export function periodo(k: CurvaResolvida): number {
  if (k.tipo !== "seno" && k.tipo !== "cosseno") return NaN;
  const b = k.b * (k.t?.b ?? 1);
  return b === 0 ? NaN : (2 * Math.PI) / Math.abs(b);
}

/** As duas curvas são a mesma reta? */
export const coincidentes = (p: CurvaResolvida, q: CurvaResolvida) =>
  p.tipo === "afim" && q.tipo === "afim" && pura(p) && pura(q) && Math.abs(p.a - q.a) < 1e-9 && Math.abs(p.b - q.b) < 1e-9;

/** Retas perpendiculares (m₁ · m₂ = −1)? */
export const perpendiculares = (p: CurvaResolvida, q: CurvaResolvida) =>
  p.tipo === "afim" && q.tipo === "afim" && pura(p) && pura(q) && Math.abs(p.a * q.a + 1) < 1e-9;

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
  if (k.tipo === "afim" && pura(k)) {
    if (k.a === 0) return [];
    const r = arredondar(-k.b / k.a);
    return r >= x0 && r <= x1 ? [r] : [];
  }
  return zeros((x) => avaliar(k, x), x0, x1);
}

/** A curva é o próprio eixo x? (f(x) = 0 para todo x) */
export const todaRaiz = (k: CurvaResolvida) => k.tipo === "afim" && pura(k) && k.a === 0 && k.b === 0;

export function encontros(p: CurvaResolvida, q: CurvaResolvida, x0: number, x1: number): number[] {
  if (p.tipo === "afim" && q.tipo === "afim" && pura(p) && pura(q)) {
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

/** Ponto que segue uma curva, uma função por partes (lista) ou anda solto no eixo (null). */
export type SelecaoCurva = number | readonly number[] | null;

/** Altura do ponto no x e a curva usada (-1 = cursor no eixo; NaN se fora de todos os domínios). */
export function alturaDoPonto(curvas: readonly CurvaResolvida[], sel: SelecaoCurva, x: number): { y: number; curva: number } {
  if (sel === null) return { y: 0, curva: -1 };
  const lista = typeof sel === "number" ? [sel] : sel;
  for (const i of lista) {
    const y = avaliar(curvas[i], x);
    if (Number.isFinite(y)) return { y, curva: i };
  }
  return { y: NaN, curva: lista[0] };
}

/** Ângulo (graus, 0..90) entre duas retas de inclinações m1 e m2. */
export function anguloEntreRetas(m1: number, m2: number): number {
  const d = 1 + m1 * m2;
  if (Math.abs(d) < 1e-12) return 90;
  return arredondar((Math.atan(Math.abs((m1 - m2) / d)) * 180) / Math.PI);
}
