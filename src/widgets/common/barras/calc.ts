// Matemática do widget barras (sem React e sem DOM): estatística, quartis, sequências,
// amostragem com sorteio reprodutível. Testado em calc.test.ts.

export const soma = (v: readonly number[]) => v.reduce((s, x) => s + x, 0);
export const media = (v: readonly number[]) => (v.length ? soma(v) / v.length : NaN);
export const ordenar = (v: readonly number[]) => [...v].sort((a, b) => a - b);

/** Mediana: valor do meio da fila; com quantidade par, média dos dois do meio. */
export function mediana(v: readonly number[]): number {
  if (!v.length) return NaN;
  const o = ordenar(v);
  const m = o.length >> 1;
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
}

/** Modas (todos os valores de maior frequência). Sem repetição nenhuma, não há moda: []. */
export function modas(v: readonly number[]): number[] {
  const f = new Map<number, number>();
  for (const x of v) f.set(x, (f.get(x) ?? 0) + 1);
  const max = Math.max(0, ...f.values());
  if (max <= 1) return [];
  return ordenar([...f].filter(([, n]) => n === max).map(([x]) => x));
}

export const desvios = (v: readonly number[]) => {
  const m = media(v);
  return v.map((x) => x - m);
};

/** Variância populacional: média dos quadrados dos desvios. */
export const variancia = (v: readonly number[]) => media(desvios(v).map((d) => d * d));
export const desvioPadrao = (v: readonly number[]) => Math.sqrt(variancia(v));

/**
 * Posições dos quartis na fila ordenada, em "meio-índices" (2·i para a ficha i, ímpar entre duas fichas),
 * para os marcadores arrastáveis encaixarem. Método das metades: a mediana separa a fila em duas metades
 * (sem ela, se n for ímpar) e Q1, Q3 são as medianas de cada metade.
 */
export function posicoesQuartis(n: number): { q1: number; q2: number; q3: number } {
  const meio = (ini: number, fim: number) => ini + fim; // 2·(ini+fim)/2, em meio-índices
  const q2 = meio(0, n - 1);
  const metade = n >> 1; // tamanho de cada metade
  return { q1: meio(0, metade - 1), q2, q3: meio(n - metade, n - 1) };
}

/** Valor na posição em meio-índices da fila ordenada. */
export function valorNaPosicao(o: readonly number[], pos: number): number {
  return pos % 2 === 0 ? o[pos / 2] : (o[(pos - 1) / 2] + o[(pos + 1) / 2]) / 2;
}

export interface Caixa {
  min: number;
  q1: number;
  q2: number;
  q3: number;
  max: number;
  aiq: number;
  /** Limites para valor atípico: Q1 − 1,5·AIQ e Q3 + 1,5·AIQ. */
  cercaBaixa: number;
  cercaAlta: number;
  /** Bigodes: menor e maior valor dentro das cercas. */
  bigodeMin: number;
  bigodeMax: number;
  atipicos: number[];
}

export function caixa(v: readonly number[]): Caixa {
  const o = ordenar(v);
  const p = posicoesQuartis(o.length);
  const q1 = valorNaPosicao(o, p.q1);
  const q2 = valorNaPosicao(o, p.q2);
  const q3 = valorNaPosicao(o, p.q3);
  const aiq = q3 - q1;
  const cercaBaixa = q1 - 1.5 * aiq;
  const cercaAlta = q3 + 1.5 * aiq;
  const dentro = o.filter((x) => x >= cercaBaixa && x <= cercaAlta);
  return {
    min: o[0],
    q1,
    q2,
    q3,
    max: o[o.length - 1],
    aiq,
    cercaBaixa,
    cercaAlta,
    bigodeMin: dentro[0],
    bigodeMax: dentro[dentro.length - 1],
    atipicos: o.filter((x) => x < cercaBaixa || x > cercaAlta),
  };
}

// ---------- Sequências ----------

/**
 * Termos a₁..a_N da recorrência aₖ₊₁ = q·aₖ + d. PA: q = 1. PG: d = 0. Juros compostos: q = 1 + i.
 */
export function termos(a1: number, d: number, q: number, N: number): number[] {
  const out: number[] = [];
  let a = a1;
  for (let k = 0; k < N; k++) {
    out.push(arred(a));
    a = q * a + d;
  }
  return out;
}

/**
 * Termos a₁..a_N da recorrência de dois termos aₖ₊₂ = p·aₖ₊₁ + q·aₖ (ex.: Fibonacci com a1=1, a2=1, p=1, q=1).
 */
export function termos2(a1: number, a2: number, p: number, q: number, N: number): number[] {
  if (N <= 0) return [];
  if (N === 1) return [arred(a1)];
  const out: number[] = [arred(a1), arred(a2)];
  for (let k = 2; k < N; k++) {
    out.push(arred(p * out[k - 1] + q * out[k - 2]));
  }
  return out;
}

export const somasParciais = (t: readonly number[]) => {
  let s = 0;
  return t.map((x) => arred((s += x)));
};

/** Limite da soma da PG infinita a₁/(1 − q), só para |q| < 1. */
export const limitePG = (a1: number, q: number) => (Math.abs(q) < 1 ? a1 / (1 - q) : NaN);

/** Corta ruído de ponto flutuante. */
export function arred(x: number): number {
  const r = Math.round(x * 1e9) / 1e9;
  return Object.is(r, -0) ? 0 : r;
}

// ---------- Parte e todo ----------

export function mdc(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Fração irredutível [num, den]; den 0 devolve [num, 0]. */
export function simplificar(num: number, den: number): [number, number] {
  if (!den) return [num, 0];
  const g = mdc(num, den) || 1;
  return [num / g, den / g];
}

// ---------- Amostragem ----------

/** Gerador pseudoaleatório reprodutível (mulberry32): a mesma semente sorteia a mesma amostra. */
export function gerador(semente: number): () => number {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sorteia n respostas de uma população com as porcentagens dadas (somam 100) e devolve a contagem
 * por categoria. Mesma semente e mesmo n: mesma amostra.
 */
export function sortear(pcts: readonly number[], n: number, semente: number): number[] {
  const total = soma(pcts);
  const rnd = gerador(semente * 7919 + n);
  const cont = pcts.map(() => 0);
  for (let i = 0; i < n; i++) {
    let r = rnd() * total;
    let k = 0;
    while (k < pcts.length - 1 && r >= pcts[k]) r -= pcts[k++];
    cont[k]++;
  }
  return cont;
}
