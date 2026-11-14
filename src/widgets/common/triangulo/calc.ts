// Geometria e métricas do widget geometria_triangulo (sem React e sem DOM). Testado em triangulo.test.ts.
import type { Pt } from "../../canvas";
import { avaliarExpr, type Controles } from "../expr";
import { graus, girar, rad } from "../geo/base";
import type { Triangulo, TrianguloDe } from "./params";

export type Ctl = Controles;
const v = (e: Parameters<typeof avaliarExpr>[0], c: Ctl) => avaliarExpr(e, c);

/** Estado interativo: vértice arrastado, quantos pontos distintos ele já visitou e as chaves ligadas/vistas. */
export interface EstadoTri {
  vertice: Pt;
  movidos: number;
  chaves: ReadonlySet<string>;
  vistos: ReadonlySet<string>;
}

export function estadoInicial(p: Triangulo): EstadoTri {
  const chaves = new Set<string>();
  let vertice: Pt = { x: 0, y: 0 };
  if (p.modo === "pitagoras") {
    if (p.deslizado) chaves.add("deslizar");
    if (p.diagonal) chaves.add("diagonal");
  }
  if (p.modo === "angulos") {
    vertice = { x: p.vertice[0], y: p.vertice[1] };
    if (p.fechado) chaves.add("fechar");
  }
  if (p.modo === "congruencia" && p.ligada) chaves.add(p.ligada);
  if (p.modo === "semelhanca" && p.sobrepor) chaves.add("sobrepor");
  return { vertice, movidos: 0, chaves, vistos: new Set(chaves) };
}

// ---------- Pitágoras ----------

export function pitagoras(p: TrianguloDe<"pitagoras">, c: Ctl, e: EstadoTri) {
  const b = Math.max(0, v(p.b, c));
  const diagonal = e.chaves.has("diagonal") || p.diagonal;
  const cat = diagonal ? b : Math.max(0, v(p.c, c));
  const a = Math.hypot(b, cat);
  return { b, c: cat, a, areaB: b * b, areaC: cat * cat, areaA: a * a, diagonal };
}

/** Prova visual: quadradão de lado b + c. Disposição 1 deixa o quadrado inclinado a²; disposição 2, os quadrados b² e c². */
export function provaPecas(b: number, c: number, deslizado: boolean) {
  const s = b + c;
  if (!deslizado) {
    const P = [
      { x: b, y: 0 },
      { x: s, y: b },
      { x: c, y: s },
      { x: 0, y: c },
    ];
    return {
      triangulos: [
        [P[0], { x: s, y: 0 }, P[1]],
        [P[1], { x: s, y: s }, P[2]],
        [P[2], { x: 0, y: s }, P[3]],
        [P[3], { x: 0, y: 0 }, P[0]],
      ],
      quadrados: [{ pts: P, lado: "a" as const }],
    };
  }
  return {
    triangulos: [
      [{ x: 0, y: b }, { x: b, y: b }, { x: 0, y: s }],
      [{ x: b, y: b }, { x: b, y: s }, { x: 0, y: s }],
      [{ x: b, y: 0 }, { x: s, y: 0 }, { x: b, y: b }],
      [{ x: s, y: 0 }, { x: s, y: b }, { x: b, y: b }],
    ],
    quadrados: [
      { pts: [{ x: 0, y: 0 }, { x: b, y: 0 }, { x: b, y: b }, { x: 0, y: b }], lado: "b" as const },
      { pts: [{ x: b, y: b }, { x: s, y: b }, { x: s, y: s }, { x: b, y: s }], lado: "c" as const },
    ],
  };
}

// ---------- Razões ----------

export function razoes(p: TrianguloDe<"razoes">, c: Ctl) {
  const angulo = Math.min(89.999, Math.max(0.001, v(p.angulo, c)));
  const k = Math.max(0, v(p.k, c));
  const hip = v(p.hip, c) * k;
  const co = hip * Math.sin(rad(angulo));
  const ca = hip * Math.cos(rad(angulo));
  const sen = hip > 0 ? co / hip : Math.sin(rad(angulo));
  const cos = hip > 0 ? ca / hip : Math.cos(rad(angulo));
  return { angulo, k, hip, co, ca, sen, cos, tg: Math.tan(rad(angulo)) };
}

// ---------- Relações métricas ----------

export function metricas(p: TrianguloDe<"metricas">, c: Ctl) {
  let a: number;
  let m: number;
  if (p.catetos) {
    const [b, cc] = p.catetos;
    a = Math.hypot(b, cc);
    m = (b * b) / a;
  } else {
    a = Math.max(0, v(p.a, c));
    m = Math.min(a, Math.max(0, v(p.m, c)));
  }
  const n = a - m;
  const h = Math.sqrt(m * n);
  const b = Math.sqrt(a * m);
  const cat = Math.sqrt(a * n);
  return { a, m, n, h, b, c: cat, areaB: b * b, areaAM: a * m, areaC: cat * cat, areaAN: a * n };
}

// ---------- Lei dos cossenos e dos senos ----------

export function cossenos(p: TrianguloDe<"cossenos">, c: Ctl) {
  const b = v(p.b, c);
  const cc = v(p.c, c);
  const A = v(p.angulo, c);
  const termo = -2 * b * cc * Math.cos(rad(A));
  const a2 = b * b + cc * cc + termo;
  const a = Math.sqrt(Math.max(0, a2));
  const pts = { A: { x: 0, y: 0 }, B: { x: cc, y: 0 }, C: { x: b * Math.cos(rad(A)), y: b * Math.sin(rad(A)) } };
  const ref = Math.hypot(b, cc);
  return { b, c: cc, A, a, a2, termo, soma: b * b + cc * cc, pts, ref };
}

export function senos(p: TrianguloDe<"senos">, c: Ctl) {
  const R = Math.max(0.001, v(p.R, c));
  const A = Math.min(179, Math.max(1, v(p.angulo, c)));
  const pos = v(p.posicao, c);
  const a = 2 * R * Math.sin(rad(A));
  const B = { x: -R * Math.sin(rad(A)), y: -R * Math.cos(rad(A)) };
  const C = { x: R * Math.sin(rad(A)), y: -R * Math.cos(rad(A)) };
  const V = { x: R * Math.cos(rad(90 + pos)), y: R * Math.sin(rad(90 + pos)) };
  const b = Math.hypot(V.x - C.x, V.y - C.y);
  const cc = Math.hypot(V.x - B.x, V.y - B.y);
  return { R, A, a, b, c: cc, razao: a / Math.sin(rad(A)), dois_R: 2 * R, pts: { A: V, B, C } };
}

// ---------- Ângulos ----------

export const BASE_A: Pt = { x: -3, y: 0 };
export const BASE_B: Pt = { x: 3, y: 0 };

export function anguloEm(o: Pt, a: Pt, b: Pt): number {
  const u = { x: a.x - o.x, y: a.y - o.y };
  const w = { x: b.x - o.x, y: b.y - o.y };
  const cos = (u.x * w.x + u.y * w.y) / (Math.hypot(u.x, u.y) * Math.hypot(w.x, w.y) || 1);
  return graus(Math.acos(Math.max(-1, Math.min(1, cos))));
}

export function angulos(p: TrianguloDe<"angulos">, c: Ctl, e: EstadoTri) {
  let C: Pt = e.vertice;
  if (p.alfa !== undefined) {
    const al = Math.min(170, Math.max(5, v(p.alfa, c)));
    const be = Math.min(175 - al, Math.max(5, p.beta === undefined ? 60 : v(p.beta, c)));
    const AC = (6 * Math.sin(rad(be))) / Math.sin(rad(al + be));
    C = { x: BASE_A.x + AC * Math.cos(rad(al)), y: AC * Math.sin(rad(al)) };
  }
  if (C.y < 0.2) C = { x: C.x, y: 0.2 };
  const alfa = anguloEm(BASE_A, BASE_B, C);
  const beta = anguloEm(BASE_B, BASE_A, C);
  const gama = 180 - alfa - beta;
  return { C, alfa, beta, gama, soma: alfa + beta + gama, externo: alfa + gama };
}

// ---------- Desigualdade triangular ----------

export function desigualdade(p: TrianguloDe<"desigualdade">, cl: Ctl) {
  const a = v(p.a, cl);
  const b = v(p.b, cl);
  const c = v(p.c, cl);
  const cruzam = Math.abs(b - c) <= a + 1e-9 && a <= b + c + 1e-9;
  const x = (a * a + b * b - c * c) / (2 * a);
  const y = cruzam ? Math.sqrt(Math.max(0, b * b - x * x)) : 0;
  return { a, b, c, cruzam, topo: { x, y }, folga: b + c - a };
}

// ---------- Congruência ----------

/** Triângulo de lados [l0, l1, l2]: P0 = (0, 0), P1 = (l0, 0) e P2 a l1 de P0 e l2 de P1. */
export function trianguloPorLados(l: readonly [number, number, number]): [Pt, Pt, Pt] {
  const [l0, l1, l2] = l;
  const x = (l0 * l0 + l1 * l1 - l2 * l2) / (2 * l0);
  const y = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  return [{ x: 0, y: 0 }, { x: l0, y: 0 }, { x, y }];
}

export const congruente = (chave: string) => chave !== "AAA";

// ---------- Notáveis ----------

export function notaveis(p: TrianguloDe<"notaveis">, c: Ctl) {
  const L = Math.max(0, v(p.L, c));
  const raio = v(p.raio, c);
  const meio = p.ab / 2;
  return {
    L,
    d: L * Math.SQRT2,
    h: (L * Math.sqrt(3)) / 2,
    metade: L / 2,
    cortar: v(p.cortar, c),
    raio,
    cruzam: raio > meio + 1e-9,
    toca: Math.abs(raio - meio) < 1e-9,
    altura_compasso: raio > meio ? Math.sqrt(raio * raio - meio * meio) : 0,
  };
}

// ---------- Semelhança ----------

function cruza(p0: Pt, d0: Pt, p1: Pt, d1: Pt): Pt | null {
  const den = d0.x * d1.y - d0.y * d1.x;
  if (Math.abs(den) < 1e-12) return null;
  const t = ((p1.x - p0.x) * d1.y - (p1.y - p0.y) * d1.x) / den;
  return { x: p0.x + t * d0.x, y: p0.y + t * d0.y };
}

export function semelhanca(p: TrianguloDe<"semelhanca">, c: Ctl, e: EstadoTri) {
  const [P0, P1, P2] = trianguloPorLados(p.lados);
  const k = Math.max(0.01, v(p.k, c));
  const giro = v(p.giro, c);
  const meioBase = { x: (P0.x + P1.x) / 2, y: 0 };
  // Ponto da paralela: na altura k do triângulo (k = 1 é a base), sobre a mediana do vértice P2.
  const M = { x: P2.x + k * (meioBase.x - P2.x), y: P2.y + k * (meioBase.y - P2.y) };
  const dir = girar({ x: 1, y: 0 }, giro);
  const Q0 = cruza(M, dir, P2, { x: P0.x - P2.x, y: P0.y - P2.y }) ?? P0;
  const Q1 = cruza(M, dir, P2, { x: P1.x - P2.x, y: P1.y - P2.y }) ?? P1;
  const corte = Math.hypot(Q1.x - Q0.x, Q1.y - Q0.y);
  const base = Math.hypot(P1.x - P0.x, P1.y - P0.y);
  // Tales
  const h = Math.min(p.esq, Math.max(0, v(p.corte, c)));
  const dirTop = (p.dir * h) / p.esq;
  // Sombras
  const [hb, sb] = p.bastao;
  const H = (hb * p.sombra_poste) / sb;
  return {
    pts: [P0, P1, P2] as [Pt, Pt, Pt],
    k,
    giro,
    Q0,
    Q1,
    paralelo: Math.abs(giro) < 1e-9,
    razao: corte / base,
    corte,
    base,
    angQ0: anguloEm(Q0, Q1, P2),
    angP0: anguloEm(P0, P1, P2),
    tales: { esq: [h, p.esq - h] as [number, number], dir: [dirTop, p.dir - dirTop] as [number, number], razao: p.esq - h > 0 ? h / (p.esq - h) : Infinity },
    sombras: { H, razao: sb / hb, sobrepor: e.chaves.has("sobrepor") },
  };
}

// ---------- Métricas emitidas ----------

export function metricasTriangulo(p: Triangulo, c: Ctl, e: EstadoTri): Record<string, number> {
  switch (p.modo) {
    case "pitagoras": {
      const g = pitagoras(p, c, e);
      return {
        a: g.a,
        area_b2: g.areaB,
        area_c2: g.areaC,
        area_a2: g.areaA,
        deslizou_pecas: e.vistos.has("deslizar") ? 1 : 0,
        testou_diagonal: e.vistos.has("diagonal") ? 1 : 0,
      };
    }
    case "razoes": {
      const g = razoes(p, c);
      return { razao_sen: g.sen, razao_cos: g.cos, razao_tg: g.tg, k: g.k, angulo: g.angulo, co: g.co, ca: g.ca, hip: g.hip };
    }
    case "metricas": {
      const g = metricas(p, c);
      return { a: g.a, m: g.m, n: g.n, h: g.h, b: g.b, area_b2: g.areaB, area_am: g.areaAM, apoio: v(p.apoio, c) };
    }
    case "cossenos": {
      const g = cossenos(p, c);
      return { a: g.a, a2: g.a2, termo_cos: g.termo, ang_a: g.A };
    }
    case "senos": {
      const g = senos(p, c);
      return { a: g.a, razao_a_sen: g.razao, dois_R: g.dois_R, ang_a: g.A };
    }
    case "angulos": {
      const g = angulos(p, c, e);
      return {
        soma_angulos: g.soma,
        vertices_movidos: e.movidos,
        fecha: e.vistos.has("fechar") ? 1 : 0,
        alfa: g.alfa,
        beta: g.beta,
        gama: g.gama,
        externo: g.externo,
      };
    }
    case "desigualdade": {
      const g = desigualdade(p, c);
      return { se_cruzam: g.cruzam ? 1 : 0, a: g.a, b: g.b, c: g.c };
    }
    case "congruencia":
      return { testou_congruencia: e.vistos.size, congruentes_vistas: [...e.vistos].filter(congruente).length };
    case "notaveis": {
      const g = notaveis(p, c);
      return { l: g.L, d: g.d, h: g.h, cortou: g.cortar >= 1 ? 1 : 0, raio: g.raio, se_cruzam: g.cruzam ? 1 : 0 };
    }
    case "semelhanca": {
      const g = semelhanca(p, c, e);
      return {
        k: g.k,
        razao: g.razao,
        giro: g.giro,
        entortou_corte: g.paralelo ? 0 : 1,
        sobrepos_triangulos: e.vistos.has("sobrepor") ? 1 : 0,
        x: g.tales.esq[0],
        h_poste: g.sombras.H,
      };
    }
  }
}
