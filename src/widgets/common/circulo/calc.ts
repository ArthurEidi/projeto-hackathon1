// Geometria e métricas do widget geometria_circulo (sem React e sem DOM). Testado em circulo.test.ts.
import type { Pt } from "../../canvas";
import { avaliarExpr, type Controles } from "../expr";
import { graus, polar } from "../geo/base";
import type { Circulos, CirculoDe } from "./params";

export type Ctl = Controles;
const v = (e: Parameters<typeof avaliarExpr>[0], c: Ctl) => avaliarExpr(e, c);
const mod360 = (a: number) => ((a % 360) + 360) % 360;

/** Estado interativo: B e V arrastados (null = vale o params). */
export interface EstadoCirc {
  alfa: number | null;
  posV: number | null;
  vistos: ReadonlySet<string>;
}
export const estadoInicial = (): EstadoCirc => ({ alfa: null, posV: null, vistos: new Set() });

// ---------- Arcos ----------

/** Ângulo (graus) em V entre as direções V→A e V→B. */
export function anguloEmV(Vv: Pt, A: Pt, B: Pt): number {
  const u = { x: A.x - Vv.x, y: A.y - Vv.y };
  const w = { x: B.x - Vv.x, y: B.y - Vv.y };
  const n = Math.hypot(u.x, u.y) * Math.hypot(w.x, w.y);
  if (n < 1e-12) return 0;
  return graus(Math.acos(Math.max(-1, Math.min(1, (u.x * w.x + u.y * w.y) / n))));
}

export function arcos(p: CirculoDe<"arcos">, c: Ctl, e: EstadoCirc) {
  const alfa = e.alfa ?? Math.max(0, Math.min(360, v(p.alfa, c)));
  const posV = e.posV ?? (p.pos_v !== undefined ? v(p.pos_v, c) : p.inicio + alfa / 2 + 180);
  const A = polar(1, p.inicio);
  const B = polar(1, p.inicio + alfa);
  const V = polar(1, posV);
  const inscrito = anguloEmV(V, A, B);
  // V está sobre o arco AB (percorrido no sentido anti-horário)? Então ele enxerga o arco maior.
  const dentro = mod360(posV - p.inicio) < alfa;
  return {
    alfa,
    inicio: p.inicio,
    posV: mod360(posV),
    A,
    B,
    V,
    central: alfa,
    arco: alfa,
    inscrito,
    arcoVisto: dentro ? 360 - alfa : alfa,
    vNoArco: dentro,
    reto: Math.abs(inscrito - 90) < 1e-6,
    razao: inscrito > 1e-9 ? alfa / inscrito : 0,
  };
}

// ---------- Roda ----------

export function roda(p: CirculoDe<"roda">, c: Ctl) {
  const d = Math.max(0.05, v(p.d, c));
  const giro = v(p.giro, c);
  const r = Math.max(0.05, v(p.r, c));
  const alfa = v(p.alfa, c);
  const voltas = v(p.voltas, c);
  const C = Math.PI * d;
  const rolado = (giro / 360) * C;
  const C2 = 2 * Math.PI * r;
  return {
    d,
    r: d / 2,
    giro,
    C,
    rolado,
    razao: C / d,
    raioArco: r,
    alfa,
    comprimentoArco: (alfa / 360) * C2,
    voltaCompleta: C2,
    voltas,
    percurso: voltas * C,
  };
}

// ---------- Fatias, setor, coroa ----------

export function fatias(p: CirculoDe<"fatias">, c: Ctl) {
  const r = Math.max(0.05, v(p.r, c));
  const N = Math.max(2, Math.round(v(p.N, c)));
  const alfa = Math.max(0, Math.min(360, v(p.alfa, c)));
  const R = Math.max(0.05, v(p.R, c));
  const furo = Math.max(0, Math.min(R, v(p.furo, c)));
  const delta = Math.PI / N;
  const area = Math.PI * r * r;
  return {
    r,
    N,
    area,
    /** Meia circunferência do N-ágono inscrito: tende a πr quando N cresce. */
    baseEfetiva: N * r * Math.sin(delta),
    razaoBase: (N * Math.sin(delta)) / Math.PI,
    larguraArranjo: (N + 1) * r * Math.sin(delta),
    alfa,
    fracao: alfa / 360,
    areaSetor: (alfa / 360) * area,
    coefSetor: (alfa / 360) * r * r,
    R,
    furo,
    areaCoroa: Math.PI * (R * R - furo * furo),
    coefCoroa: R * R - furo * furo,
  };
}

/** Setores do disco rearranjados em fila, alternando apontados para cima e para baixo. Os apex alternam entre y = 0 e y = r·cos(180°/N); setores vizinhos dividem um raio. */
export function setoresRearranjados(r: number, N: number, passoArco = 8): Pt[][] {
  const delta = (180 / N) * (Math.PI / 180);
  const dx = r * Math.sin(delta);
  return Array.from({ length: N }, (_, i) => {
    const x = (i + 1) * dx;
    const sobe = i % 2 === 1;
    const apex: Pt = { x, y: sobe ? r * Math.cos(delta) : 0 };
    const centro = sobe ? -Math.PI / 2 : Math.PI / 2;
    const pts: Pt[] = [apex];
    for (let k = 0; k <= passoArco; k++) {
      const a = centro - delta + (2 * delta * k) / passoArco;
      pts.push({ x: apex.x + r * Math.cos(a), y: apex.y + r * Math.sin(a) });
    }
    return pts;
  });
}

// ---------- Métricas emitidas ----------

export function metricasCirculo(p: Circulos, c: Ctl, e: EstadoCirc): Record<string, number> {
  switch (p.modo) {
    case "arcos": {
      const g = arcos(p, c, e);
      return { alfa: g.alfa, central: g.central, arco: g.arco, inscrito: g.inscrito, pos_v: g.posV, razao_central_inscrito: g.razao, reto: g.reto ? 1 : 0, arco_visto: g.arcoVisto };
    }
    case "roda": {
      const g = roda(p, c);
      return {
        giro: g.giro,
        d: g.d,
        voltas: p.variante === "voltas" ? g.voltas : g.giro / 360,
        rastro: g.rolado,
        comprimento: g.C,
        razao_c_d: g.razao,
        arco: g.comprimentoArco,
        alfa: g.alfa,
        percurso: g.percurso,
      };
    }
    case "fatias": {
      const g = fatias(p, c);
      return {
        n: g.N,
        area: g.area,
        razao_base: g.razaoBase,
        area_setor: g.areaSetor,
        fracao: g.fracao,
        coef_setor: g.coefSetor,
        area_coroa: g.areaCoroa,
        coef_coroa: g.coefCoroa,
        furo: g.furo,
      };
    }
  }
}
