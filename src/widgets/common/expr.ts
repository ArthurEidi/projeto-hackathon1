// Expressão numérica pequena com sliders, sem eval: números, "$id", + − * / ^ e parênteses.
// Exemplos: 3, "$n", "1/$m", "2*$k", "1+$t/100", "5-$s". Usada pelos widgets que precisam
// de um valor derivado de um slider (q = 1/m, parte = 2k, fator = 1 + t/100).
import { z } from "zod";

export type Controles = Record<string, number>;

type No =
  | { t: "num"; v: number }
  | { t: "var"; id: string }
  | { t: "neg"; a: No }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: No; b: No };

const TOKEN = /\s*(\d+(?:[.,]\d+)?|\$[a-z0-9_]+|[-+*/^()])/y;

function tokens(s: string): string[] {
  const out: string[] = [];
  TOKEN.lastIndex = 0;
  let i = 0;
  while (i < s.length) {
    if (/^\s+$/.test(s.slice(i))) break;
    TOKEN.lastIndex = i;
    const m = TOKEN.exec(s);
    if (!m) throw new Error(`expressão inválida perto de "${s.slice(i)}"`);
    out.push(m[1]);
    i = TOKEN.lastIndex;
  }
  return out;
}

/** Analisa a expressão; lança erro se for inválida. */
export function analisar(s: string): No {
  const tk = tokens(s);
  let p = 0;
  const olhar = () => tk[p];
  const comer = (x?: string) => {
    const t = tk[p++];
    if (t === undefined || (x !== undefined && t !== x)) throw new Error(`expressão inválida: "${s}"`);
    return t;
  };
  const soma = (): No => {
    let a = produto();
    while (olhar() === "+" || olhar() === "-") {
      const op = comer() as "+" | "-";
      a = { t: "bin", op, a, b: produto() };
    }
    return a;
  };
  const produto = (): No => {
    let a = unario();
    while (olhar() === "*" || olhar() === "/") {
      const op = comer() as "*" | "/";
      a = { t: "bin", op, a, b: unario() };
    }
    return a;
  };
  const unario = (): No => (olhar() === "-" ? (comer(), { t: "neg", a: unario() }) : potencia());
  const potencia = (): No => {
    const a = atomo();
    if (olhar() === "^") {
      comer();
      return { t: "bin", op: "^", a, b: unario() };
    }
    return a;
  };
  const atomo = (): No => {
    const t = comer();
    if (t === "(") {
      const e = soma();
      comer(")");
      return e;
    }
    if (t.startsWith("$")) return { t: "var", id: t.slice(1) };
    const v = Number(t.replace(",", "."));
    if (!Number.isFinite(v)) throw new Error(`expressão inválida: "${s}"`);
    return { t: "num", v };
  };
  const arvore = soma();
  if (p !== tk.length) throw new Error(`expressão inválida: "${s}"`);
  return arvore;
}

function calcular(n: No, c: Controles): number {
  switch (n.t) {
    case "num":
      return n.v;
    case "var":
      return c[n.id] ?? 0;
    case "neg":
      return -calcular(n.a, c);
    case "bin": {
      const a = calcular(n.a, c);
      const b = calcular(n.b, c);
      if (n.op === "+") return a + b;
      if (n.op === "-") return a - b;
      if (n.op === "*") return a * b;
      if (n.op === "/") return a / b;
      return a ** b;
    }
  }
}

const cache = new Map<string, No>();

/** Valor da expressão com os sliders atuais. Slider ausente vale 0. */
export function avaliarExpr(e: Expr, c: Controles): number {
  if (typeof e === "number") return e;
  let arv = cache.get(e);
  if (!arv) {
    arv = analisar(e);
    cache.set(e, arv);
  }
  return calcular(arv, c);
}

/** A expressão usa algum slider? (figuras estáticas não aceitam) */
export const usaSlider = (e: Expr) => typeof e === "string" && e.includes("$");

const valida = (s: string) => {
  try {
    analisar(s);
    return true;
  } catch {
    return false;
  }
};

/** Número, ou expressão com sliders ("$n", "1/$m", "2*$k", "1+$t/100"). */
export const Expr = z.union([
  z.number(),
  z.string().refine(valida, 'use um número ou uma conta com sliders, como "$n", "1/$m" ou "1+$t/100"'),
]);
export type Expr = z.infer<typeof Expr>;
