// Combinatória e probabilidade do widget grade_resultados (sem React e sem DOM). Testado em grade.test.ts.

export function fatorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/** Arranjo A(n, k) = n·(n − 1)·…·(n − k + 1). */
export function arranjo(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}

/** Combinação C(n, k). */
export function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  return Math.round(arranjo(n, k) / fatorial(k));
}

/** Linha n do triângulo de Pascal. */
export const linhaPascal = (n: number) => Array.from({ length: n + 1 }, (_, k) => comb(n, k));

/** P(k sucessos em n) com chance p (0..1). */
export const binomial = (n: number, k: number, p: number) => comb(n, k) * p ** k * (1 - p) ** (n - k);

/** Todas as ordens dos itens (permutações), na ordem lexicográfica dos índices. */
export function permutacoes<T>(itens: readonly T[]): T[][] {
  if (itens.length <= 1) return [itens.slice()];
  const out: T[][] = [];
  itens.forEach((x, i) => {
    const resto = itens.filter((_, j) => j !== i);
    for (const p of permutacoes(resto)) out.push([x, ...p]);
  });
  return out;
}

/** Subconjuntos de tamanho k (em ordem). */
export function subconjuntos<T>(itens: readonly T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (k > itens.length) return [];
  const [x, ...resto] = itens;
  return [...subconjuntos(resto, k - 1).map((s) => [x, ...s]), ...subconjuntos(resto, k)];
}

/** Arranjos de k dos itens, agrupados pelo subconjunto (cada grupo tem k! ordens). */
export const arranjosPorGrupo = <T,>(itens: readonly T[], k: number) => subconjuntos(itens, k).map((g) => permutacoes(g));

/** Maneiras de pôr k itens iguais em n caixas: vetores de contagem (ordem decrescente na 1ª caixa). */
export function distribuicoes(k: number, n: number, minimo = 0): number[][] {
  if (n <= 0) return [];
  if (n === 1) return k >= minimo ? [[k]] : [];
  const out: number[][] = [];
  for (let a = k; a >= minimo; a--) for (const resto of distribuicoes(k - a, n - 1, minimo)) out.push([a, ...resto]);
  return out;
}

/** Bolinhas e barras: sequência (true = barra) -> contagem por caixa. */
export function caixasDaSequencia(seq: readonly boolean[]): number[] {
  const out = [0];
  for (const barra of seq) {
    if (barra) out.push(0);
    else out[out.length - 1]++;
  }
  return out;
}

/** Sequência inicial: k bolinhas e depois b barras. */
export const sequenciaInicial = (k: number, b: number) => [...Array<boolean>(k).fill(false), ...Array<boolean>(b).fill(true)];

/** Move a barra do índice `de` para a posição `para` (as bolinhas escorregam). */
export function moverBarra(seq: readonly boolean[], de: number, para: number): boolean[] {
  const s = seq.slice();
  if (!s[de]) return s;
  s.splice(de, 1);
  s.splice(Math.max(0, Math.min(s.length, para)), 0, true);
  return s;
}

/** Fração irredutível a/b como texto ("1/2"); b = 0 vira "—". */
export function fracao(a: number, b: number): string {
  if (!b) return "—";
  const g = mdc(a, b) || 1;
  return b / g === 1 ? String(a / g) : `${a / g}/${b / g}`;
}

export function mdc(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Texto sem acento, minúsculo, com "_" (para nomes de métricas a partir de rótulos). */
export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// ---------- Casas (espaço amostral) ----------

export interface Casa {
  /** Chave "r" (fila) ou "r,c" (grade), pelos rótulos. */
  chave: string;
  linha: string;
  coluna?: string;
  /** Índices na grade (0-based). */
  i: number;
  j: number;
}

export interface CriterioConjunto {
  casas: readonly string[];
  linhas: readonly string[];
  colunas: readonly string[];
  /** Soma dos rótulos numéricos (grade de dois dados). */
  soma: readonly number[];
  /** Rótulos numéricos dentro de [de, ate] (fila numerada). */
  intervalo?: { de: number; ate: number };
  /** Casas em que linha e coluna são iguais. */
  diagonal: boolean;
}

/** A casa pertence ao conjunto (qualquer critério que bata)? */
export function pertence(k: Casa, c: CriterioConjunto): boolean {
  if (c.casas.includes(k.chave)) return true;
  if (c.linhas.includes(k.linha)) return true;
  if (k.coluna !== undefined && c.colunas.includes(k.coluna)) return true;
  if (c.diagonal && k.coluna !== undefined && k.linha === k.coluna) return true;
  const nl = Number(k.linha);
  const nc = k.coluna === undefined ? 0 : Number(k.coluna);
  if (c.soma.length && Number.isFinite(nl) && Number.isFinite(nc) && c.soma.includes(nl + nc)) return true;
  if (c.intervalo && k.coluna === undefined && Number.isFinite(nl) && nl >= c.intervalo.de && nl <= c.intervalo.ate) return true;
  return false;
}

export function gerarCasas(linhas: readonly string[], colunas?: readonly string[]): Casa[] {
  if (!colunas) return linhas.map((l, i) => ({ chave: l, linha: l, i, j: 0 }));
  return linhas.flatMap((l, i) => colunas.map((c, j) => ({ chave: `${l},${c}`, linha: l, coluna: c, i, j })));
}
