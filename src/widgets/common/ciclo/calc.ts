// Geometria e métricas do widget ciclo_trigonometrico (sem React e sem DOM). Testado em ciclo.test.ts.
import { avaliarExpr, type Controles } from "../expr";
import { fmt, graus, rad } from "../geo/base";
import type { Ciclo } from "./params";

export type Ctl = Controles;

/** Estado interativo: ângulo arrastado (graus; null = vale o params), quadrantes visitados e pontos marcados. */
export interface EstadoCiclo {
  angulo: number | null;
  quadrantes: ReadonlySet<number>;
  marcadas: ReadonlySet<number>;
}

export const estadoInicial = (p: Ciclo): EstadoCiclo => ({ angulo: null, quadrantes: new Set(), marcadas: new Set(p.marcadas) });

/** Resto positivo (0 ≤ r < m). */
export const mod = (a: number, m: number) => ((a % m) + m) % m;

/** Quadrante 1..4 de um ângulo; nos eixos vale o quadrante que começa ali (0° → 1, 90° → 2…). */
export const quadranteDe = (ang: number) => Math.floor(mod(ang, 360) / 90 + 1e-9) + 1;

const mdc = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mdc(b, a % b));

/** Ângulo como fração de π: 30° → "π/6", 150° → "5π/6", 180° → "π". Graus não inteiros viram radianos decimais. */
export function fracaoPi(g: number): string {
  if (Math.abs(g - Math.round(g)) > 1e-9) return `${(rad(g)).toFixed(2).replace(".", ",")} rad`;
  const gi = Math.round(g);
  if (gi === 0) return "0";
  const d = mdc(Math.abs(gi), 180);
  const n = Math.abs(gi) / d;
  const den = 180 / d;
  const sinal = gi < 0 ? "−" : "";
  return `${sinal}${n === 1 ? "" : n}π${den === 1 ? "" : `/${den}`}`;
}

/** Formata marco em radianos: múltiplos de π/12 (até 0,0035) saem como fração de π; demais com até 2 casas. */
export function rotuloMarcoRad(r: number): string {
  if (Math.abs(r) < 1e-6) return "0";
  const k12 = Math.round((r * 12) / Math.PI);
  if (k12 !== 0 && Math.abs(r - (k12 * Math.PI) / 12) < 0.0035) {
    return fracaoPi(k12 * 15);
  }
  return `${fmt(r)} rad`;
}

const ang180 = (a: number, b: number) => Math.abs(mod(a - b + 180, 360) - 180);

export function modeloCiclo(p: Ciclo, c: Ctl, e: EstadoCiclo) {
  let angulo: number;
  const soma = p.soma ? { alfa: avaliarExpr(p.soma.alfa, c), beta: avaliarExpr(p.soma.beta, c) } : undefined;
  if (e.angulo !== null) angulo = e.angulo;
  else if (soma) angulo = soma.alfa + soma.beta;
  else if (p.quadrante !== undefined) {
    const q = Math.min(4, Math.max(1, Math.round(avaliarExpr(p.quadrante, c))));
    const b = graus(Math.asin(p.seno_fixo));
    angulo = [b, 180 - b, 180 + b, 360 - b][q - 1];
  } else if (p.rad !== undefined) angulo = graus(avaliarExpr(p.rad, c));
  else angulo = avaliarExpr(p.angulo, c);
  const ang = mod(angulo, 360);
  const sen = Math.sin(rad(angulo));
  const cos = Math.cos(rad(angulo));
  const tg = Math.abs(cos) < 1e-9 ? Infinity : sen / cos;
  const sec = Math.abs(cos) < 1e-9 ? Infinity : 1 / cos;

  let alvo: { tipo: "seno" | "cosseno"; k: number; solucoes: [number, number]; noAlvo: boolean } | undefined;
  if (p.alvo && (p.alvo.seno !== undefined || p.alvo.cosseno !== undefined)) {
    const tipo = p.alvo.seno !== undefined ? "seno" : "cosseno";
    const k = Math.max(-1, Math.min(1, avaliarExpr((p.alvo.seno ?? p.alvo.cosseno)!, c)));
    const solucoes: [number, number] = tipo === "seno" ? [mod(graus(Math.asin(k)), 360), mod(180 - graus(Math.asin(k)), 360)] : [mod(graus(Math.acos(k)), 360), mod(360 - graus(Math.acos(k)), 360)];
    alvo = { tipo, k, solucoes, noAlvo: solucoes.some((s) => ang180(ang, s) < 0.01) };
  }

  let dentro = 0;
  if (p.arco) {
    const L = mod(p.arco.ate - p.arco.de, 360) || 360;
    const d = mod(ang - p.arco.de, 360);
    const noInicio = d < 1e-6 || d > 360 - 1e-6;
    const noFim = Math.abs(d - L) < 1e-6;
    dentro = d <= L + 1e-6 && !(noInicio && p.arco.abreDe) && !(noFim && p.arco.abreAte) ? 1 : 0;
  }

  const somaDados = soma && {
    ...soma,
    senSoma: Math.sin(rad(soma.alfa + soma.beta)),
    cosSoma: Math.cos(rad(soma.alfa + soma.beta)),
    somaSenos: Math.sin(rad(soma.alfa)) + Math.sin(rad(soma.beta)),
    bloco1: Math.sin(rad(soma.alfa)) * Math.cos(rad(soma.beta)),
    bloco2: Math.cos(rad(soma.alfa)) * Math.sin(rad(soma.beta)),
    cosBloco1: Math.cos(rad(soma.alfa)) * Math.cos(rad(soma.beta)),
    cosBloco2: Math.sin(rad(soma.alfa)) * Math.sin(rad(soma.beta)),
  };

  return {
    angulo,
    ang,
    rad: rad(angulo),
    voltas: Math.floor(Math.abs(angulo) / 360 + 1e-9) * (angulo < 0 ? -1 : 1),
    sen,
    cos,
    tg,
    sec,
    quadrante: quadranteDe(angulo),
    alvo,
    dentro,
    soma: somaDados,
    blocos: avaliarExpr(p.blocos, c) >= 0.5,
  };
}

export function metricasCiclo(p: Ciclo, c: Ctl, e: EstadoCiclo): Record<string, number> {
  const m = modeloCiclo(p, c, e);
  const out: Record<string, number> = {
    angulo: m.angulo,
    rad: m.rad,
    x_rad: m.rad,
    voltas: m.voltas,
    quadrantes: e.quadrantes.size,
    quad: m.quadrante,
    seno: m.sen,
    cosseno: m.cos,
    tangente: Number.isFinite(m.tg) ? m.tg : 0,
    dentro: m.dentro,
    no_alvo: m.alvo?.noAlvo ? 1 : 0,
    solucoes_marcadas: e.marcadas.size,
  };
  if (m.soma) {
    out.sen_soma = m.soma.senSoma;
    out.soma_senos = m.soma.somaSenos;
  }
  return out;
}
