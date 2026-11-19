// Matemática pura e métricas do grupos_inteiros. Sem React.
import { avaliarExpr, type Controles } from "../expr";
import type { Grupos } from "./params";

export interface ResultadoDivisao {
  n: number;
  d: number;
  q: number;
  r: number;
  qTotal: number;
  exata: boolean;
}

/** Valida n inteiro ≥ 0 e d inteiro positivo (≥ 1); retorna mensagem de erro ou null. */
export function validarDivisao(nBruto: number, dBruto: number): string | null {
  if (!Number.isFinite(nBruto) || !Number.isInteger(nBruto) || nBruto < 0) {
    return "Dividendo inválido: use inteiro ≥ 0";
  }
  if (!Number.isFinite(dBruto) || !Number.isInteger(dBruto) || dBruto < 1) {
    return "Divisor inválido: use inteiro ≥ 1";
  }
  return null;
}

/** Divide n fichas em grupos de d (opcionalmente limitando os grupos formados). */
export function dividirInteiros(nBruto: number, dBruto: number, limiteGrupos?: number): ResultadoDivisao {
  const erro = validarDivisao(nBruto, dBruto);
  if (erro) throw new RangeError(erro);
  const n = nBruto;
  const d = dBruto;
  const qTotal = Math.floor(n / d);
  const q = limiteGrupos !== undefined ? Math.min(qTotal, Math.max(0, Math.round(limiteGrupos))) : qTotal;
  const r = n - q * d;
  return { n, d, q, r, qTotal, exata: n % d === 0 };
}

/** Lista de fatores primos de n >= 2 em ordem crescente. */
export function fatorarPrimos(nBruto: number): number[] {
  let n = Math.floor(nBruto);
  if (n < 2) return [];
  const fatores: number[] = [];
  let p = 2;
  while (p * p <= n) {
    while (n % p === 0) {
      fatores.push(p);
      n = Math.floor(n / p);
    }
    p += p === 2 ? 1 : 2;
  }
  if (n > 1) fatores.push(n);
  return fatores;
}

const SUP = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

function sobrescrito(k: number): string {
  return String(k)
    .split("")
    .map((ch) => SUP[Number(ch)] ?? ch)
    .join("");
}

/** Formata a fatoração prima com potências, ex.: 12 -> "2²·3". */
export function formatarFatoracao(nBruto: number): string {
  const n = Math.floor(nBruto);
  if (n < 2) return String(n);
  const fatores = fatorarPrimos(n);
  const grupos: Array<[number, number]> = [];
  for (const f of fatores) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo[0] === f) ultimo[1] += 1;
    else grupos.push([f, 1]);
  }
  return grupos.map(([p, exp]) => (exp === 1 ? String(p) : `${p}${sobrescrito(exp)}`)).join("·");
}

export interface PassoArvore {
  valor: number;
  esquerda: number;
  direita: number;
  direitaPrima: boolean;
}

/** Constrói os degraus da árvore de fatoração (menor fator primo à esquerda). */
export function arvoreFatoracao(nBruto: number): PassoArvore[] {
  const fatores = fatorarPrimos(nBruto);
  if (fatores.length <= 1) return [];
  const passos: PassoArvore[] = [];
  let atual = Math.floor(nBruto);
  for (let i = 0; i < fatores.length - 1; i++) {
    const esq = fatores[i];
    const dir = Math.floor(atual / esq);
    passos.push({
      valor: atual,
      esquerda: esq,
      direita: dir,
      direitaPrima: i === fatores.length - 2,
    });
    atual = dir;
  }
  return passos;
}

export function mdc(aBruto: number, bBruto: number): number {
  let a = Math.abs(Math.round(aBruto));
  let b = Math.abs(Math.round(bBruto));
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

export function mmc(aBruto: number, bBruto: number): number {
  const a = Math.abs(Math.round(aBruto));
  const b = Math.abs(Math.round(bBruto));
  if (a === 0 || b === 0) return 0;
  return Math.floor((a * b) / mdc(a, b));
}

/** Métricas emitidas para complete_when. */
export function metricasGrupos(p: Grupos, ctl: Controles): Record<string, number> {
  if (p.modo === "mmc") {
    const m = Math.max(1, Math.round(avaliarExpr(p.m, ctl)));
    const rA = m % p.a;
    const rB = m % p.b;
    return {
      m,
      d: p.a,
      resto: rA + rB,
      resto_a: rA,
      resto_b: rB,
      q: Math.floor(m / p.a),
    };
  }
  const n = avaliarExpr(p.n, ctl);
  const d = avaliarExpr(p.d, ctl);
  if (validarDivisao(n, d)) {
    return { n, d, q: 0, resto: Number.NaN, m: n };
  }
  const res = dividirInteiros(n, d, p.modo === "divisao" ? p.limite_grupos : undefined);
  return {
    n: res.n,
    d: res.d,
    q: res.q,
    resto: res.r,
    m: res.n,
  };
}
