// Matemática pura e métricas do divisao_polinomial. Sem React.
import { avaliarExpr, type Controles } from "../expr";
import { fmt, quase } from "../geo/base";
import type { DivisaoPolinomial } from "./params";

export interface EtapaDivisao {
  termoQ: number;
  grauQ: number;
  /** Parcela retirada: termoQ · x^grauQ · (x − r), em ordem decrescente de grau. */
  produto: number[];
  /** Restante após subtrair a parcela retirada, em ordem decrescente de grau. */
  restante: number[];
}

export interface ResultadoDivisaoLonga {
  quociente: number[];
  resto: number;
  etapas: EtapaDivisao[];
}

export interface ResultadoConstante {
  valido: boolean;
  quociente: number[];
  resto: number;
}

/** Avalia P(x) usando o algoritmo de Horner (coeficientes em ordem decrescente de grau). */
export function avaliarPolinomio(coef: readonly number[], x: number): number {
  let acc = 0;
  for (const c of coef) acc = acc * x + c;
  return acc;
}

function textoGrau(grau: number): string {
  if (grau === 0) return "";
  if (grau === 1) return "x";
  if (grau === 2) return "x²";
  if (grau === 3) return "x³";
  return `x^${grau}`;
}

/** Formata um polinômio em ordem decrescente de grau, com sinal tipográfico "−". */
export function formatarPolinomio(coef: readonly number[], incluirZeros = false): string {
  const n = coef.length - 1;
  const partes: string[] = [];
  for (let i = 0; i < coef.length; i++) {
    const c = coef[i];
    const grau = n - i;
    if (quase(c, 0)) {
      if (!incluirZeros) continue;
      const sinal = partes.length === 0 ? "" : " + ";
      partes.push(`${sinal}0${textoGrau(grau)}`);
      continue;
    }
    const neg = c < 0;
    const abs = Math.abs(c);
    const mag = grau > 0 && quase(abs, 1) ? "" : fmt(abs);
    const corpo = `${mag}${textoGrau(grau)}`;
    if (partes.length === 0) {
      partes.push(neg ? `−${corpo}` : corpo);
    } else {
      partes.push(`${neg ? " − " : " + "}${corpo}`);
    }
  }
  return partes.length > 0 ? partes.join("") : "0";
}

/**
 * Quociente parcial depois de `etapa` parcelas: mantém o grau de cada termo
 * (completa com zeros à direita). Ex.: [1, 2] na etapa 1 → "x", não "1".
 */
export function formatarQuocienteParcial(quociente: readonly number[], etapa: number): string {
  const k = Math.max(0, Math.min(quociente.length, Math.floor(etapa)));
  const completo = [...quociente.slice(0, k), ...new Array<number>(quociente.length - k).fill(0)];
  return formatarPolinomio(completo);
}

/** Formata o divisor linear (x − r). */
export function formatarDivisorLinear(r: number): string {
  if (quase(r, 0)) return "x";
  if (r > 0) return `x − ${fmt(r)}`;
  return `x + ${fmt(-r)}`;
}

/** Divide P(x) por constante d ≠ 0. Zero exato, a mesma regra do schema: 10⁻¹² é um divisor válido. */
export function dividirPorConstante(coef: readonly number[], d: number): ResultadoConstante {
  if (d === 0 || !Number.isFinite(d)) {
    return { valido: false, quociente: [], resto: 0 };
  }
  return {
    valido: true,
    // 0 / −2 dá −0: normaliza para 0
    quociente: coef.map((c) => (c === 0 ? 0 : c / d)),
    resto: 0,
  };
}

/** Executa a divisão longa de P(x) por (x − r) passo a passo. */
export function dividirLonga(coef: readonly number[], r: number): ResultadoDivisaoLonga {
  const grau = coef.length - 1;
  let atual = [...coef];
  const quociente: number[] = [];
  const etapas: EtapaDivisao[] = [];

  for (let i = 0; i < grau; i++) {
    const termoQ = atual[0];
    const grauQ = grau - 1 - i;
    const prod0 = termoQ;
    const prod1 = -termoQ * r;
    const proximo = [atual[1] - prod1, ...atual.slice(2)];
    quociente.push(termoQ);
    etapas.push({
      termoQ,
      grauQ,
      produto: [prod0, prod1, ...Array<number>(grauQ).fill(0)],
      restante: proximo,
    });
    atual = proximo;
  }

  return {
    quociente,
    resto: atual[0] ?? 0,
    etapas,
  };
}

/**
 * Métricas emitidas para complete_when. `resultado` = 1 quando Q e R estão na tela (divisor constante válido;
 * na chave, todas as etapas feitas). `resto` só é emitido nesse caso: uma meta sobre o resto não conclui com
 * divisor zero nem com o resto final ainda escondido na etapa 0.
 */
export function metricasDivisao(p: DivisaoPolinomial, ctl: Controles): Record<string, number> {
  if (p.modo === "constante") {
    const d = avaliarExpr(p.d, ctl);
    const res = dividirPorConstante(p.coeficientes, d);
    return res.valido ? { d, etapa: 0, resultado: 1, resto: res.resto } : { d, etapa: 0, resultado: 0 };
  }
  const r = avaliarExpr(p.r, ctl);
  const etapaBruta = Math.round(avaliarExpr(p.etapa, ctl));
  const maxEtapa = p.coeficientes.length - 1;
  const etapa = Math.max(0, Math.min(maxEtapa, etapaBruta));
  if (etapa < maxEtapa) return { d: 0, etapa, resultado: 0 };
  return { d: 0, etapa, resultado: 1, resto: dividirLonga(p.coeficientes, r).resto };
}
