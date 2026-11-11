// Geometria e métricas do widget geometria_poligono (sem React e sem DOM). Testado em poligono.test.ts.
import type { Pt } from "../../canvas";
import { avaliarExpr, type Controles } from "../expr";
import { dist, girar, polar, rad } from "../geo/base";
import type { Poligonos, PoligonoDe } from "./params";

export type Ctl = Controles;
const v = (e: Parameters<typeof avaliarExpr>[0], c: Ctl) => avaliarExpr(e, c);

export interface EstadoPol {
  chaves: ReadonlySet<string>;
  vistos: ReadonlySet<string>;
}
export const estadoInicial = (p: Poligonos): EstadoPol => {
  const s = new Set<string>();
  if (p.modo === "paralelas" && typeof p.deslizar === "number" && p.deslizar >= 0.5) s.add("deslizar");
  return { chaves: s, vistos: new Set(s) };
};

export const areaPol = (pts: readonly Pt[]) => Math.abs(pts.reduce((s, p, i) => s + (p.x * pts[(i + 1) % pts.length].y - pts[(i + 1) % pts.length].x * p.y), 0)) / 2;
export const perimetroPol = (pts: readonly Pt[]) => pts.reduce((s, p, i) => s + dist(p, pts[(i + 1) % pts.length]), 0);

// ---------- Malha ----------

export function malha(p: PoligonoDe<"malha">, c: Ctl) {
  const b = Math.max(0, v(p.b, c));
  const h = Math.max(0, v(p.h, c));
  const B = Math.max(0, v(p.B, c));
  const inc = v(p.inc, c);
  const k = Math.max(0, v(p.k, c));
  const cortar = v(p.cortar, c) >= 0.5;
  const duplicar = v(p.duplicar, c) >= 0.5;
  let pts: Pt[];
  let area: number;
  let lados: number[];
  let ladoDireito: [Pt, Pt] | null = null;
  switch (p.forma) {
    case "retangulo":
      pts = [{ x: 0, y: 0 }, { x: b * k, y: 0 }, { x: b * k, y: h * k }, { x: 0, y: h * k }];
      break;
    case "paralelogramo":
      pts = [{ x: 0, y: 0 }, { x: b, y: 0 }, { x: b + inc, y: h }, { x: inc, y: h }];
      break;
    case "triangulo":
      pts = [{ x: 0, y: 0 }, { x: b, y: 0 }, { x: inc, y: h }];
      ladoDireito = [pts[1], pts[2]];
      break;
    case "trapezio":
      pts = [{ x: 0, y: 0 }, { x: B, y: 0 }, { x: inc + b, y: h }, { x: inc, y: h }];
      ladoDireito = [pts[1], pts[2]];
      break;
  }
  area = areaPol(pts);
  lados = pts.map((q, i) => dist(q, pts[(i + 1) % pts.length]));
  let copia: Pt[] | null = null;
  if (duplicar && ladoDireito) {
    const M = { x: (ladoDireito[0].x + ladoDireito[1].x) / 2, y: (ladoDireito[0].y + ladoDireito[1].y) / 2 };
    copia = pts.map((q) => ({ x: 2 * M.x - q.x, y: 2 * M.y - q.y }));
  }
  // Cortar e encaixar: o triângulo da esquerda do paralelogramo vai para a direita e forma um retângulo.
  let triCortado: Pt[] | null = null;
  let triMovido: Pt[] | null = null;
  if (p.forma === "paralelogramo") {
    triCortado = [{ x: 0, y: 0 }, { x: inc, y: 0 }, { x: inc, y: h }];
    triMovido = triCortado.map((q) => ({ x: q.x + b, y: q.y }));
  }
  return {
    pts,
    b,
    h,
    B,
    inc,
    k,
    area,
    perimetro: perimetroPol(pts),
    lados,
    cortar,
    duplicar,
    copia,
    triCortado,
    triMovido,
    razaoArea: k * k,
    areaUniao: copia ? 2 * area : area,
  };
}

// ---------- Polígono convexo e quadriláteros ----------

/** Vértices de um n-ágono convexo (na circunferência, com ângulos levemente irregulares). Vértice 0 no topo. */
export function verticesPoligono(n: number, R = 1): Pt[] {
  const jit = Math.min(9, (180 / n) * 0.35);
  return Array.from({ length: n }, (_, i) => polar(R, 90 + (360 * i) / n + (i === 0 ? 0 : jit * Math.sin(i * 2.3 + n))));
}

/** Ângulo interno em cada vértice de um polígono convexo (graus). */
export function angulosInternos(pts: readonly Pt[]): number[] {
  const n = pts.length;
  return pts.map((q, i) => {
    const a = pts[(i + n - 1) % n];
    const b = pts[(i + 1) % n];
    const u = { x: a.x - q.x, y: a.y - q.y };
    const w = { x: b.x - q.x, y: b.y - q.y };
    return (Math.acos(Math.max(-1, Math.min(1, (u.x * w.x + u.y * w.y) / (Math.hypot(u.x, u.y) * Math.hypot(w.x, w.y))))) * 180) / Math.PI;
  });
}

export const QUADRILATEROS: Record<number, { nome: string; pts: Pt[] }> = {
  1: { nome: "paralelogramo", pts: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 2 }, { x: 1, y: 2 }] },
  2: { nome: "retângulo", pts: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 0, y: 2 }] },
  3: { nome: "losango", pts: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 2 * Math.sqrt(3) }, { x: 2, y: 2 * Math.sqrt(3) }] },
};

export function poligono(p: PoligonoDe<"poligono">, c: Ctl) {
  const encolher = Math.max(0, Math.min(100, v(p.encolher, c)));
  if (p.quadrilatero !== undefined) {
    const q = Math.min(3, Math.max(1, Math.round(v(p.quadrilatero, c))));
    const { nome, pts } = QUADRILATEROS[q];
    const d1 = dist(pts[0], pts[2]);
    const d2 = dist(pts[1], pts[3]);
    const lados = pts.map((a, i) => dist(a, pts[(i + 1) % 4]));
    const u = { x: pts[2].x - pts[0].x, y: pts[2].y - pts[0].y };
    const w = { x: pts[3].x - pts[1].x, y: pts[3].y - pts[1].y };
    return {
      n: 4,
      pts,
      nome,
      d1,
      d2,
      diagonaisIguais: Math.abs(d1 - d2) < 1e-9,
      diagonaisPerpendiculares: Math.abs(u.x * w.x + u.y * w.y) < 1e-9,
      ladosIguais: lados.every((l) => Math.abs(l - lados[0]) < 1e-9),
      triangulos: 2,
      somaInternos: 360,
      somaExternos: 360,
      encolher,
      internos: angulosInternos(pts),
    };
  }
  const n = Math.min(12, Math.max(3, Math.round(v(p.n, c))));
  const pts = verticesPoligono(n);
  const internos = angulosInternos(pts);
  return {
    n,
    pts,
    nome: "",
    d1: 0,
    d2: 0,
    diagonaisIguais: false,
    diagonaisPerpendiculares: false,
    ladosIguais: false,
    triangulos: n - 2,
    somaInternos: internos.reduce((a, b) => a + b, 0),
    somaExternos: internos.reduce((a, b) => a + (180 - b), 0),
    encolher,
    internos,
  };
}

// ---------- Regulares ----------

export function regular(p: PoligonoDe<"regular">, c: Ctl) {
  const n = Math.min(12, Math.max(3, Math.round(v(p.n, c))));
  const R = Math.max(0.1, v(p.R, c));
  const interno = ((n - 2) * 180) / n;
  const externo = 360 / n;
  const pts = Array.from({ length: n }, (_, i) => polar(R, 90 + (360 * i) / n));
  const cabem = Math.floor(360 / interno + 1e-9);
  const fresta = 360 - cabem * interno;
  return { n, R, interno, externo, central: externo, pts, lado: 2 * R * Math.sin(Math.PI / n), cabem, fresta, fechado: fresta < 1e-9, dividido: v(p.dividir, c) >= 0.5, soma: (n - 2) * 180 };
}

/** Ladrilho em torno do ponto O: `cabem` polígonos de lado 1 com um vértice em O, cada um ocupando o ângulo interno. */
export function pecasLadrilho(n: number): Pt[][] {
  const interno = ((n - 2) * 180) / n;
  const cabem = Math.floor(360 / interno + 1e-9);
  const Rc = 1 / (2 * Math.sin(Math.PI / n));
  return Array.from({ length: cabem }, (_, j) => {
    const fi = (j + 0.5) * interno;
    const C = polar(Rc, fi);
    return Array.from({ length: n }, (_, m) => polar(Rc, fi + 180 + (360 * m) / n, C));
  });
}

// ---------- Isometrias ----------

/** A letra F: haste, barra de cima e barra do meio. Área 7,2. */
export const LETRA_F: Pt[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1.5 },
  { x: 2.2, y: 1.5 },
  { x: 2.2, y: 2.5 },
  { x: 1, y: 2.5 },
  { x: 1, y: 3 },
  { x: 3, y: 3 },
  { x: 3, y: 4 },
  { x: 0, y: 4 },
];
export const TRIANGULO_BASE_2: Pt[] = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }];
const desloca = (pts: Pt[], dx: number, dy: number) => pts.map((q) => ({ x: q.x + dx, y: q.y + dy }));

export function isometria(p: PoligonoDe<"isometria">, c: Ctl) {
  const angulo = v(p.angulo, c);
  const dx = v(p.dx, c);
  const dy = v(p.dy, c);
  const refletir = v(p.refletir, c);
  const k = v(p.k, c);
  const tri = p.figura === "triangulo";
  let base = tri ? TRIANGULO_BASE_2 : desloca(LETRA_F, 1, 0.5);
  if (p.transformacao === "reflexao") base = tri ? desloca(TRIANGULO_BASE_2, -4, 0) : desloca(LETRA_F, -4, 0.5);
  let imagem: Pt[];
  switch (p.transformacao) {
    case "translacao":
      imagem = desloca(base, dx, dy);
      break;
    case "reflexao":
      imagem = refletir >= 0.5 ? base.map((q) => ({ x: 2 * p.espelho - q.x, y: q.y })) : base;
      break;
    case "homotetia":
      imagem = base.map((q) => ({ x: q.x * k, y: q.y * k }));
      break;
    default:
      imagem = base.map((q) => girar(q, angulo));
  }
  const area = areaPol(base);
  return {
    base,
    imagem,
    angulo,
    dx,
    dy,
    k,
    refletiu: refletir >= 0.5,
    area,
    areaImagem: areaPol(imagem),
    perimetro: perimetroPol(base),
    perimetroImagem: perimetroPol(imagem),
    razaoArea: areaPol(imagem) / area,
    razaoLados: perimetroPol(imagem) / perimetroPol(base),
    orientacaoTrocada: p.transformacao === "reflexao" && refletir >= 0.5,
  };
}

// ---------- Paralelas ----------

export interface AngulosCruz {
  ne: number;
  nw: number;
  sw: number;
  se: number;
}

export function paralelas(p: PoligonoDe<"paralelas">, c: Ctl, e: EstadoPol) {
  const alfa = Math.min(170, Math.max(10, v(p.alfa, c)));
  const desvio = v(p.desvio, c);
  const D = 2.2;
  const u = { x: Math.cos(rad(alfa)), y: Math.sin(rad(alfa)) };
  const X1: Pt = { x: 0, y: 0 };
  const X2: Pt = { x: -(D / Math.sin(rad(alfa))) * u.x, y: -D };
  const a2 = alfa - desvio;
  const r: AngulosCruz = { ne: alfa, nw: 180 - alfa, sw: alfa, se: 180 - alfa };
  const s: AngulosCruz = { ne: a2, nw: 180 - a2, sw: a2, se: 180 - a2 };
  const frac = e.chaves.has("deslizar") ? 1 : Math.max(0, Math.min(1, v(p.deslizar, c)));
  return { alfa, suplementar: 180 - alfa, desvio, u, X1, X2, r, s, paralelas: Math.abs(desvio) < 1e-9, D, deslizar: frac };
}

// ---------- Métricas emitidas ----------

export function metricasPoligono(p: Poligonos, c: Ctl, e: EstadoPol): Record<string, number> {
  switch (p.modo) {
    case "malha": {
      const g = malha(p, c);
      return { area: g.areaUniao, perimetro: g.perimetro, b: g.b, h: g.h, k: g.k, razao_area: g.razaoArea, encaixado: g.cortar ? 1 : 0, duplicado: g.duplicar ? 1 : 0 };
    }
    case "poligono": {
      const g = poligono(p, c);
      return {
        n: g.n,
        triangulos: g.triangulos,
        soma_internos: g.somaInternos,
        soma_externos: g.somaExternos,
        encolher: g.encolher,
        diagonais_iguais: g.diagonaisIguais ? 1 : 0,
        diagonais_perpendiculares: g.diagonaisPerpendiculares ? 1 : 0,
        lados_iguais: g.ladosIguais ? 1 : 0,
      };
    }
    case "regular": {
      const g = regular(p, c);
      return {
        n: g.n,
        angulo_central: g.central,
        angulo_externo: g.externo,
        angulo_interno: g.interno,
        soma_internos: g.soma,
        lado: g.lado,
        ladrilho_fechado: g.fechado ? 1 : 0,
        fresta: g.fresta,
        dividido: g.dividido ? 1 : 0,
      };
    }
    case "isometria": {
      const g = isometria(p, c);
      return {
        angulo: g.angulo,
        dx: g.dx,
        dy: g.dy,
        k: g.k,
        area: g.area,
        area_imagem: g.areaImagem,
        perimetro: g.perimetro,
        perimetro_imagem: g.perimetroImagem,
        razao_area: g.razaoArea,
        razao_lados: g.razaoLados,
        orientacao_trocada: g.orientacaoTrocada ? 1 : 0,
        invertido: g.k < 0 ? 1 : 0,
      };
    }
    case "paralelas": {
      const g = paralelas(p, c, e);
      return {
        alfa: g.alfa,
        suplementar: g.suplementar,
        inclinou: Math.abs(g.alfa - 90) > 1e-9 ? 1 : 0,
        desvio_paralela: Math.abs(g.desvio),
        paralelas: g.paralelas ? 1 : 0,
        deslizou_paralela: e.vistos.has("deslizar") || g.deslizar >= 1 ? 1 : 0,
      };
    }
  }
}
