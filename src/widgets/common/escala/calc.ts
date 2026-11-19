// Matemática pura e métricas do escala_decimal. Sem React.
import { avaliarExpr } from "../expr";
import type { EscalaDecimal } from "./params";

const SUP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
};

/** Formata um inteiro como expoente sobrescrito Unicode (ex.: -2 -> "⁻²"). */
export function expoente(n: number): string {
  const s = String(Math.trunc(n));
  return [...s].map((ch) => SUP[ch] ?? ch).join("");
}

/** Formata a potência de dez (ex.: 2 -> "10²"). */
export function potenciaLabel(n: number): string {
  return `10${expoente(n)}`;
}

/** Calcula a · 10ⁿ reduzindo ruído de ponto flutuante. */
export function valorDe(a: number, n: number): number {
  const v = a * 10 ** n;
  if (!Number.isFinite(v) || v === 0) return 0;
  return Number(v.toPrecision(10));
}

/** Verdadeiro quando o coeficiente a está na faixa normalizada 1 ≤ a < 10. */
export function estaNormalizado(a: number): boolean {
  return Number.isFinite(a) && a >= 1 && a < 10;
}

const SQRT10 = Math.sqrt(10);

/** Expoente da ordem de grandeza pela convenção do corte √10 (empate sobe). */
export function ordemDeGrandezaExp(a: number, n: number): number {
  const valor = Math.abs(valorDe(a, n));
  if (valor <= 0) return n;
  const exp = Math.floor(Math.log10(valor) + 1e-12);
  const coef = valor / 10 ** exp;
  return coef < SQRT10 - 1e-9 ? exp : exp + 1;
}

export interface ColunaOrdem {
  label: string;
  exp: number;
  digito: string;
  virgulaDepois: boolean;
}

const NOME_ORDEM: Record<number, string> = {
  3: "UM",
  2: "C",
  1: "D",
  0: "U",
  [-1]: "d",
  [-2]: "c",
  [-3]: "m",
};

/**
 * Monta as colunas do quadro de ordens para um número positivo N.
 * Mantém pelo menos de C (10²) a c (10⁻²), expandindo dinamicamente para conter todos os algarismos de N.
 */
export function quadroOrdens(valor: number, minBase = -2, maxBase = 2): ColunaOrdem[] {
  const abs = Math.abs(valor);
  const digitos = new Map<number, number>();
  let maiorNaoNulo = 0;
  let menorNaoNulo = 0;

  if (Number.isFinite(abs) && abs > 0) {
    const norm = Number(abs.toPrecision(10));
    const [mant, expStr] = norm.toExponential().split("e");
    const topExp = Number(expStr);
    const algarismos = mant.replace(".", "");
    for (let i = 0; i < algarismos.length; i++) {
      const e = topExp - i;
      const d = Number(algarismos[i]);
      digitos.set(e, d);
      if (d !== 0) {
        if (e > maiorNaoNulo) maiorNaoNulo = e;
        if (e < menorNaoNulo) menorNaoNulo = e;
      }
    }
  }

  const maxExp = Math.max(maxBase, maiorNaoNulo);
  const minExp = Math.min(minBase, menorNaoNulo);
  const temDecimal = menorNaoNulo < 0;
  const colunas: ColunaOrdem[] = [];
  for (let e = maxExp; e >= minExp; e--) {
    const d = digitos.get(e) ?? 0;
    const visivel = e <= maiorNaoNulo && e >= (temDecimal ? menorNaoNulo : 0);
    colunas.push({
      label: NOME_ORDEM[e] ?? potenciaLabel(e),
      exp: e,
      digito: visivel ? String(d) : "",
      virgulaDepois: temDecimal && e === 0,
    });
  }
  return colunas;
}

export interface EstadoResolvido {
  a: number;
  n: number;
  valor: number;
  normalizado: boolean;
  ordemExp: number;
}

/** Resolve coeficiente, expoente, valor e ordem de grandeza a partir dos parâmetros e sliders. */
export function resolverEstado(p: EscalaDecimal, ctl: Record<string, number>): EstadoResolvido {
  let a = 1;
  let n = 0;
  let valor = 1;

  if (p.modo === "potencia") {
    a = avaliarExpr(p.a, ctl);
    n = Math.round(avaliarExpr(p.n, ctl));
    valor = valorDe(a, n);
  } else if (p.modo === "normalizar") {
    valor = p.valor;
    n = Math.round(avaliarExpr(p.n, ctl));
    a = valorDe(valor, -n);
  } else {
    a = avaliarExpr(p.a, ctl);
    n = p.n;
    valor = valorDe(a, n);
  }

  return {
    a,
    n,
    valor,
    normalizado: estaNormalizado(a),
    ordemExp: ordemDeGrandezaExp(a, n),
  };
}

/** Métricas emitidas pelo widget escala_decimal para complete_when. */
export function metricasEscala(p: EscalaDecimal, ctl: Record<string, number>): Record<string, number> {
  const s = resolverEstado(p, ctl);
  return {
    n: s.n,
    a: s.a,
    valor: s.valor,
    normalizado: s.normalizado ? 1 : 0,
    ordem_exp: s.ordemExp,
  };
}
