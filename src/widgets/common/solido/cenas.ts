// Cenas do solido_3d: cada modo monta malhas, anotações 3D (segmentos, planos, rótulos), um painel 2D
// opcional (planificação, corte meridiano, sombras) e as métricas. Sem React e sem DOM.
import { DEG } from "../../../math3d/revolve";
import { corDoTraco, type CorTraco } from "../../../ui/marcas";
import { avaliarExpr, type Controles } from "../expr";
import { num } from "../plot2d";
import {
  cilindro,
  cross,
  dot3,
  esfera,
  girar,
  media3,
  mul,
  norma,
  normal,
  orientarPorCentro,
  piramide,
  prisma,
  revolucao,
  semiesfera,
  soma,
  sub,
  transladar,
  tronco,
  unit3,
  type Face,
  type Malha,
  type PontoPerfil,
  type Vec3,
} from "./malha";
import type { Solido, SolidoDe } from "./params";

export type Anotacao =
  | { tipo: "seg"; a: Vec3; b: Vec3; cor: CorTraco; rotulo?: string; tracejado?: boolean; lw?: number }
  | { tipo: "poligono"; pts: Vec3[]; cor: CorTraco; forte?: boolean }
  | { tipo: "ponto"; p: Vec3; cor: CorTraco; rotulo?: string }
  | { tipo: "reto"; o: Vec3; a: Vec3; b: Vec3; cor: CorTraco }
  | { tipo: "texto"; p: Vec3; s: string };

export interface Painel {
  /** Desenho 2D na região dada (planificação, corte meridiano, sombras). */
  tipo: "faixa" | "rotulo" | "meridiano" | "sombras";
  dados: Record<string, unknown>;
}

export interface Cena {
  malhas: Malha[];
  anotacoes: Anotacao[];
  /** Pontos que precisam caber no enquadramento além das malhas. */
  extras: Vec3[];
  placar: { s: string; cor: CorTraco }[];
  painel?: Painel;
  metricas: Record<string, number>;
}

export interface EstadoSolido {
  perfil?: (typeof import("./params").PERFIS)[number];
  eixoTrocado?: boolean;
  indice?: number;
  solidoVistas?: SolidoDe<"vistas">["solido"];
  corteVertical?: boolean;
  /** yaw da câmera (para pôr o triângulo da esfera do lado visível). */
  yaw?: number;
}

const tint = (c: CorTraco) => corDoTraco(c).tint;
const ex = (e: Parameters<typeof avaliarExpr>[0], ctl: Controles) => avaliarExpr(e, ctl);
const limitar = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const pi = (x: number, casas = 2) => `${num(x, casas)}π`;

// ---------- casco convexo (poliedros, troncos de pirâmide, quina serrada) ----------

/** Casco convexo por planos de apoio (n pequeno): faces coplanares viram um polígono só. */
export function casco(pontos: readonly Vec3[], cor?: string): Malha {
  const v: Vec3[] = [];
  for (const p of pontos) if (!v.some((q) => norma(sub(p, q)) < 1e-9)) v.push(p);
  const n = v.length;
  const c0 = media3(v);
  const faces: Face[] = [];
  const vistos: string[] = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      for (let k = j + 1; k < n; k++) {
        let nn = cross(sub(v[j], v[i]), sub(v[k], v[i]));
        if (norma(nn) < 1e-9) continue;
        nn = unit3(nn);
        const d = dot3(nn, v[i]);
        let mais = 0;
        let menos = 0;
        for (const p of v) {
          const s = dot3(nn, p) - d;
          if (s > 1e-7) mais++;
          else if (s < -1e-7) menos++;
        }
        if (mais && menos) continue;
        if (dot3(nn, sub(c0, v[i])) > 0) nn = mul(nn, -1);
        const no = v.map((p, idx) => [p, idx] as const).filter(([p]) => Math.abs(dot3(nn, p) - dot3(nn, v[i])) < 1e-7);
        const chave = no.map(([, idx]) => idx).sort((a, b) => a - b).join(",");
        if (vistos.includes(chave)) continue;
        vistos.push(chave);
        // Ordena os vértices da face pelo ângulo em volta do centro dela.
        const cf = media3(no.map(([p]) => p));
        const u = unit3(sub(no[0][0], cf));
        const w = cross(nn, u);
        const ord = no
          .map(([p, idx]) => ({ idx, a: Math.atan2(dot3(sub(p, cf), w), dot3(sub(p, cf), u)) }))
          .sort((a, b) => a.a - b.a)
          .map((x) => x.idx);
        faces.push({ idx: ord, grupo: -1, cor, n: nn });
      }
  // Garante a ordem anti-horária vista de fora.
  for (const f of faces) {
    const nn = normal(f.idx.map((i) => v[i]));
    if (dot3(nn, f.n!) < 0) f.idx.reverse();
  }
  return { v, f: faces };
}

/** V, A e F de uma malha (A = arestas distintas). */
export function contar(m: Malha): { V: number; A: number; F: number } {
  const arestas = new Set<string>();
  const usados = new Set<number>();
  for (const f of m.f)
    f.idx.forEach((a, k) => {
      const b = f.idx[(k + 1) % f.idx.length];
      usados.add(a);
      arestas.add(a < b ? `${a}-${b}` : `${b}-${a}`);
    });
  return { V: usados.size, A: arestas.size, F: m.f.length };
}

// ---------- área e centroide do perfil (Pappus) ----------

export function areaCentroide(perfil: readonly { r: number; y: number }[]): { A: number; cr: number } {
  let A = 0;
  let cr = 0;
  for (let i = 0; i < perfil.length; i++) {
    const p = perfil[i];
    const q = perfil[(i + 1) % perfil.length];
    const x = p.r * q.y - q.r * p.y;
    A += x;
    cr += (p.r + q.r) * x;
  }
  A /= 2;
  return { A: Math.abs(A), cr: A ? Math.abs(cr / (6 * A)) : 0 };
}

export function perfilDe(tipo: (typeof import("./params").PERFIS)[number], r: number, h: number, r2: number, d: number): PontoPerfil[] {
  switch (tipo) {
    case "retangulo":
      return [{ r: 0, y: 0 }, { r, y: 0, quebra: true }, { r, y: h, quebra: true }, { r: 0, y: h, quebra: true }];
    case "triangulo":
      return [{ r: 0, y: 0 }, { r, y: 0, quebra: true }, { r: 0, y: h, quebra: true }];
    case "trapezio":
      return [{ r: 0, y: 0 }, { r, y: 0, quebra: true }, { r: r2, y: h, quebra: true }, { r: 0, y: h, quebra: true }];
    case "semicirculo": {
      const pts: PontoPerfil[] = [{ r: 0, y: 0 }];
      for (let i = 1; i < 18; i++) {
        const a = -Math.PI / 2 + (Math.PI * i) / 18;
        pts.push({ r: r * Math.cos(a), y: r + r * Math.sin(a) });
      }
      pts.push({ r: 0, y: 2 * r, quebra: true });
      return pts;
    }
    case "anel":
      return [{ r: d, y: 0 }, { r: d + r, y: 0, quebra: true }, { r: d + r, y: h, quebra: true }, { r: d, y: h, quebra: true }];
  }
}

// ---------- modos ----------

function cenaRevolucao(p: SolidoDe<"revolucao">, ctl: Controles, e: EstadoSolido): Cena {
  let r = ex(p.r, ctl);
  let h = ex(p.h, ctl);
  if (e.eixoTrocado) [r, h] = [h, r];
  const perfilTipo = e.perfil ?? p.perfil;
  const giroG = limitar(ex(p.giro, ctl), 0, 360);
  const giro = giroG * DEG;
  const perfil = perfilDe(perfilTipo, r, h, ex(p.r2, ctl), ex(p.d, ctl));
  const malhas = giro > 1e-6 ? [revolucao(perfil, 0, giro, 48, tint(p.cores.superficie))] : [];
  // Perfil na posição final do giro (plano que contém o eixo).
  const em = (q: { r: number; y: number }): Vec3 => [q.r * Math.cos(giro), q.y, q.r * Math.sin(giro)];
  const pts = perfil.map(em);
  const topo = Math.max(...perfil.map((q) => q.y));
  const anotacoes: Anotacao[] = [{ tipo: "poligono", pts, cor: p.cores.r, forte: false }];
  // Arestas coloridas: largura (no chão) e altura (lado de fora).
  const chao = perfil.filter((q) => Math.abs(q.y) < 1e-9);
  const rMax = Math.max(...perfil.map((q) => q.r));
  if (chao.length >= 2) anotacoes.push({ tipo: "seg", a: em(chao[0]), b: em(chao[chao.length - 1]), cor: p.cores.r, rotulo: `${num(Math.abs(chao[chao.length - 1].r - chao[0].r))}`, lw: 5 });
  if (perfilTipo === "semicirculo") anotacoes.push({ tipo: "seg", a: em({ r: 0, y: r }), b: em({ r, y: r }), cor: p.cores.r, rotulo: `${num(r)}`, lw: 5 });
  else if (perfilTipo !== "triangulo") anotacoes.push({ tipo: "seg", a: em({ r: rMax, y: 0 }), b: em({ r: perfilTipo === "trapezio" ? rMax : rMax, y: perfilTipo === "trapezio" ? 0 : h }), cor: p.cores.h, rotulo: perfilTipo === "trapezio" ? undefined : `${num(h)}`, lw: 5 });
  if (perfilTipo === "triangulo" || perfilTipo === "trapezio") anotacoes.push({ tipo: "seg", a: [0, 0, 0], b: [0, h, 0], cor: p.cores.h, rotulo: `${num(h)}`, lw: 5 });
  anotacoes.push({ tipo: "seg", a: [0, -0.4, 0], b: [0, topo + 0.6, 0], cor: "ink", tracejado: true, lw: 2 });
  const { A, cr } = areaCentroide(perfil);
  const volumePi = (A * 2 * cr * (giroG / 360));
  const placar: Cena["placar"] = giroG >= 360 ? [{ s: `V = ${pi(volumePi)}`, cor: p.cores.superficie }] : [{ s: `${num(giroG, 0)}°`, cor: p.cores.superficie }];
  return {
    malhas,
    anotacoes,
    extras: [[rMax, 0, 0], [-rMax, 0, 0], [0, 0, rMax], [0, 0, -rMax], [0, topo + 0.6, 0]],
    placar,
    metricas: { giro: giroG, volume_pi: volumePi, volume: volumePi * Math.PI, completo: giroG >= 360 ? 1 : 0 },
  };
}

function basePrisma(p: SolidoDe<"prisma">, a: number, b: number): [number, number][] {
  if (p.base === "retangulo") return [[0, 0], [a, 0], [a, -b], [0, -b]];
  if (p.base === "triangulo") return [[0, 0], [a, 0], [0, -b]];
  return Array.from({ length: 6 }, (_, i) => [a * Math.cos((i * Math.PI) / 3), a * Math.sin((i * Math.PI) / 3)] as [number, number]);
}

const areaPoligono = (pts: readonly (readonly [number, number])[]) =>
  Math.abs(pts.reduce((s, [x, z], i) => s + x * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * z, 0)) / 2;

function cenaPrisma(p: SolidoDe<"prisma">, ctl: Controles): Cena {
  const a = ex(p.a, ctl);
  const b = ex(p.b, ctl);
  const h = Math.max(0.01, ex(p.h, ctl));
  const abrir = limitar(ex(p.abrir, ctl), 0, 1);
  const base = basePrisma(p, a, b);
  const Ab = areaPoligono(base);
  const lados = base.map((q, i) => Math.hypot(base[(i + 1) % base.length][0] - q[0], base[(i + 1) % base.length][1] - q[1]));
  const per = lados.reduce((s, x) => s + x, 0);
  const malhas: Malha[] = [prisma(base, h, 0, { base: tint(p.cores.base) })];
  if (p.fantasma_h !== undefined) malhas.push({ ...prisma(base, p.fantasma_h), fantasma: true });
  const anotacoes: Anotacao[] = [];
  if (p.camadas) {
    // Linhas das camadas de cubos (contorno a cada unidade de altura) e da malha da base.
    for (let y = 1; y < h - 1e-9; y++) base.forEach((q, i) => anotacoes.push({ tipo: "seg", a: [q[0], y, q[1]], b: [base[(i + 1) % base.length][0], y, base[(i + 1) % base.length][1]], cor: "muted", lw: 1.2 }));
    if (p.base === "retangulo") {
      for (let x = 1; x < a - 1e-9; x++) anotacoes.push({ tipo: "seg", a: [x, h, 0], b: [x, h, -b], cor: "muted", lw: 1.2 }, { tipo: "seg", a: [x, 0, 0], b: [x, h, 0], cor: "muted", lw: 1.2 });
      for (let z = 1; z < b - 1e-9; z++) anotacoes.push({ tipo: "seg", a: [0, h, -z], b: [a, h, -z], cor: "muted", lw: 1.2 }, { tipo: "seg", a: [a, 0, -z], b: [a, h, -z], cor: "muted", lw: 1.2 });
    }
  }
  const q0 = base[1];
  anotacoes.push({ tipo: "seg", a: [q0[0], 0, q0[1]], b: [q0[0], h, q0[1]], cor: p.cores.h, rotulo: `h = ${num(h)}`, lw: 4.5 });
  const cb = media3(base.map(([x, z]) => [x, 0, z] as Vec3));
  anotacoes.push({ tipo: "texto", p: cb, s: `${num(Ab)}` });
  if (p.diagonal && p.base === "retangulo") {
    const O: Vec3 = [0, 0, 0];
    const F: Vec3 = [a, 0, -b];
    const T: Vec3 = [a, h, -b];
    anotacoes.push({ tipo: "seg", a: O, b: F, cor: p.cores.base, rotulo: `d = ${num(Math.hypot(a, b))}`, lw: 4 });
    anotacoes.push({ tipo: "seg", a: F, b: T, cor: p.cores.h, lw: 4 });
    anotacoes.push({ tipo: "seg", a: O, b: T, cor: p.cores.diagonal, rotulo: `D = ${num(Math.hypot(a, b, h))}`, lw: 4.5 });
    anotacoes.push({ tipo: "reto", o: F, a: O, b: T, cor: p.cores.diagonal });
  }
  const placar: Cena["placar"] = [
    { s: `Ab = ${num(Ab)}`, cor: p.cores.base },
    { s: `V = ${num(Ab * h)}`, cor: p.cores.lateral },
  ];
  return {
    malhas,
    anotacoes,
    extras: [],
    placar,
    painel: abrir > 0 ? { tipo: "faixa", dados: { lados, h, abrir, cor: p.cores.lateral, corH: p.cores.h } } : undefined,
    metricas: { volume: Ab * h, area_base: Ab, area_lateral: per * h, area_total: per * h + 2 * Ab, camadas: h, diagonal: Math.hypot(a, b, h), aberto: abrir },
  };
}

function cenaPiramide(p: SolidoDe<"piramide">, ctl: Controles): Cena {
  const L = ex(p.L, ctl);
  const h = Math.max(0, ex(p.h, ctl));
  const t = limitar(ex(p.abrir, ctl), 0, 1);
  const m = L / 2;
  const ap = Math.hypot(h, m);
  const base: [number, number][] = [[-m, m], [m, m], [m, -m], [-m, -m]];
  const anotacoes: Anotacao[] = [];
  const malhas: Malha[] = [];
  const placar: Cena["placar"] = [];
  const dividir = p.dividir !== undefined ? limitar(ex(p.dividir, ctl), 0, 1) : null;
  if (dividir !== null) {
    // Prisma de mesma base e altura dividido em 3 pirâmides com o vértice na quina de cima, atrás, à esquerda.
    const V0: Vec3 = [-m, h, -m];
    const quads: { q: Vec3[]; dir: Vec3; cor: CorTraco }[] = [
      { q: [[-m, 0, -m], [m, 0, -m], [m, 0, m], [-m, 0, m]], dir: [0, -1, 0], cor: "c1" },
      { q: [[m, 0, -m], [m, h, -m], [m, h, m], [m, 0, m]], dir: [1, 0, 0], cor: "c2" },
      { q: [[-m, 0, m], [m, 0, m], [m, h, m], [-m, h, m]], dir: [0, 0, 1], cor: "c3" },
    ];
    for (const { q, dir, cor } of quads) {
      const mm = casco([...q, V0], tint(cor));
      malhas.push(transladar(mm, mul(dir, dividir * L * 0.55)));
    }
    if (dividir < 0.05) malhas.push({ ...prisma(base, h), fantasma: true });
    placar.push({ s: `${num(L * L * h)} ÷ 3 = ${num((L * L * h) / 3)}`, cor: p.cores.volume });
    return { malhas, anotacoes, extras: [[m + L * 0.6, 0, 0], [0, -L * 0.6, 0], [0, 0, m + L * 0.6]], placar, metricas: { volume: (L * L * h) / 3, dividido: dividir } };
  }
  const apice: Vec3 = [0, h, 0];
  if (t < 1e-6) malhas.push(piramide(base, apice));
  else {
    // Cada face gira em torno da aresta da base, do ângulo φ até ficar deitada (π).
    const phi = Math.atan2(h, m);
    const alfa = phi + t * (Math.PI - phi);
    const v: Vec3[] = base.map(([x, z]) => [x, 0, z]);
    const f: Face[] = [{ idx: [3, 2, 1, 0], grupo: -1, n: [0, -1, 0] }];
    base.forEach((_, i) => {
      const A = v[i];
      const B = v[(i + 1) % 4];
      const M = mul(soma(A, B), 0.5);
      const u = unit3(sub([0, 0, 0], [M[0], 0, M[2]]));
      const Q = soma(M, soma(mul(u, ap * Math.cos(alfa)), [0, ap * Math.sin(alfa), 0]));
      v.push(Q);
      f.push({ idx: [i, (i + 1) % 4, v.length - 1], grupo: -1, cor: tint(p.cores.ap), n: unit3(soma(mul(u, -Math.sin(alfa)), [0, Math.cos(alfa), 0])) });
      if (i === 0) anotacoes.push({ tipo: "seg", a: M, b: Q, cor: p.cores.ap, rotulo: `${num(ap)}`, lw: 4.5 });
    });
    malhas.push({ v, f });
  }
  if (p.apotemas && t < 1e-6) {
    const M: Vec3 = [0, 0, m];
    anotacoes.push({ tipo: "seg", a: [0, 0, 0], b: apice, cor: p.cores.h, rotulo: `h = ${num(h)}`, lw: 4.5 });
    anotacoes.push({ tipo: "seg", a: [0, 0, 0], b: M, cor: p.cores.m, rotulo: `${num(m)}`, lw: 4.5 });
    anotacoes.push({ tipo: "seg", a: apice, b: M, cor: p.cores.ap, rotulo: `${num(ap)}`, lw: 4.5 });
    if (h > 0) anotacoes.push({ tipo: "reto", o: [0, 0, 0], a: apice, b: M, cor: p.cores.h });
  }
  placar.push({ s: `V = ${num((L * L * h) / 3)}`, cor: p.cores.volume });
  return { malhas, anotacoes, extras: [[0, Math.max(h, 0.5), 0], [-m - ap * t, 0, 0], [m + ap * t, 0, 0], [0, 0, m + ap * t], [0, 0, -m - ap * t]], placar, metricas: { h, apotema: ap, volume: (L * L * h) / 3, aberto: t, area_lateral: 2 * L * ap } };
}

function cenaCilindro(p: SolidoDe<"cilindro">, ctl: Controles): Cena {
  const r = ex(p.r, ctl);
  const h = ex(p.h, ctl);
  const t = limitar(ex(p.desenrolar, ctl), 0, 1);
  const malhas: Malha[] = [cilindro(r, h, 0, { base: tint(p.cores.r) })];
  if (p.fantasma) malhas.push({ ...cilindro(p.fantasma.r, p.fantasma.h), fantasma: true });
  const anotacoes: Anotacao[] = [
    { tipo: "seg", a: [0, 0, 0], b: [r, 0, 0], cor: p.cores.r, rotulo: `r = ${num(r)}`, lw: 4.5 },
    { tipo: "seg", a: [r, 0, 0], b: [r, h, 0], cor: p.cores.h, rotulo: `h = ${num(h)}`, lw: 4.5 },
  ];
  if (t > 0) {
    // Parte do contorno já esticada no rótulo, em c3 sobre a borda da base.
    const pts: Vec3[] = [];
    for (let i = 0; i <= 40; i++) {
      const a = Math.PI / 2 - t * 2 * Math.PI * (i / 40);
      pts.push([r * Math.cos(a), 0, r * Math.sin(a)]);
    }
    for (let i = 0; i < pts.length - 1; i++) anotacoes.push({ tipo: "seg", a: pts[i], b: pts[i + 1], cor: p.cores.lateral, lw: 5 });
  }
  return {
    malhas,
    anotacoes,
    extras: p.fantasma ? [[p.fantasma.r, p.fantasma.h, 0]] : [],
    placar: [{ s: `V = ${pi(r * r * h)}`, cor: p.cores.volume }],
    painel: t > 0 ? { tipo: "rotulo", dados: { r, h, t, cor: p.cores.lateral, corR: p.cores.r, corH: p.cores.h } } : undefined,
    metricas: { volume_pi: r * r * h, volume: Math.PI * r * r * h, area_lateral_pi: 2 * r * h, area_base_pi: r * r, desenrolado: t },
  };
}

function cenaEsfera(p: SolidoDe<"esfera">, ctl: Controles, e: EstadoSolido): Cena {
  const R = ex(p.R, ctl);
  const k = p.k !== undefined ? ex(p.k, ctl) : null;
  const anotacoes: Anotacao[] = [];
  const malhas: Malha[] = [];
  const placar: Cena["placar"] = [];
  const extras: Vec3[] = [];
  const metricas: Record<string, number> = { volume_pi: (4 / 3) * R ** 3, area_pi: 4 * R * R };
  if (k !== null) {
    malhas.push({ ...esfera(R, R), fantasma: true });
    const R2 = k * R;
    malhas.push(transladar(esfera(R2, R2), [R + R2 + R * 0.4, 0, 0]));
    placar.push({ s: `área ×${num(k * k)}`, cor: p.cores.area }, { s: `volume ×${num(k ** 3)}`, cor: p.cores.R });
    metricas.razao_area = k * k;
    metricas.razao_volume = k ** 3;
    extras.push([R + 2 * R2 + R * 0.4, 0, 0], [-R, 0, 0]);
  } else {
    malhas.push(esfera(R, 0));
    if (p.no_cilindro) {
      malhas.push({ ...cilindro(R, 2 * R, -R), aresta: corDoTraco(p.cores.area).main });
      placar.push({ s: `4πR² = ${pi(4 * R * R)}`, cor: p.cores.area });
    }
    if (p.corte !== undefined) {
      const d = limitar(ex(p.corte, ctl), -R, R);
      const rho = Math.sqrt(Math.max(0, R * R - d * d));
      const circ: Vec3[] = Array.from({ length: 48 }, (_, i) => [rho * Math.cos((i * Math.PI) / 24), d, rho * Math.sin((i * Math.PI) / 24)]);
      anotacoes.push({ tipo: "poligono", pts: circ, cor: p.cores.r, forte: true });
      const yaw = e.yaw ?? 0;
      const Q: Vec3 = [rho * Math.cos(yaw), d, rho * Math.sin(yaw)];
      const C: Vec3 = [0, d, 0];
      anotacoes.push({ tipo: "seg", a: [0, 0, 0], b: C, cor: p.cores.d, rotulo: `d = ${num(d)}`, lw: 4 });
      anotacoes.push({ tipo: "seg", a: C, b: Q, cor: p.cores.r, rotulo: `r = ${num(rho)}`, lw: 4 });
      anotacoes.push({ tipo: "seg", a: [0, 0, 0], b: Q, cor: p.cores.R, rotulo: `R = ${num(R)}`, lw: 4 });
      if (Math.abs(d) > 1e-6 && rho > 1e-6) anotacoes.push({ tipo: "reto", o: C, a: [0, 0, 0], b: Q, cor: p.cores.d });
      metricas.r_corte = rho;
      metricas.area_corte_pi = rho * rho;
      placar.push({ s: `seção ${pi(rho * rho)}`, cor: p.cores.r });
    }
    anotacoes.push({ tipo: "ponto", p: [0, 0, 0], cor: "ink" });
  }
  return { malhas, anotacoes, extras, placar, metricas };
}

/** Tronco de pirâmide quadrada (meio lado R embaixo, r em cima). */
const troncoPiramide = (R: number, r: number, h: number, y0: number, cor?: string) =>
  r < 1e-9
    ? casco([[-R, y0, -R], [R, y0, -R], [R, y0, R], [-R, y0, R], [0, y0 + h, 0]], cor)
    : casco([[-R, y0, -R], [R, y0, -R], [R, y0, R], [-R, y0, R], [-r, y0 + h, -r], [r, y0 + h, -r], [r, y0 + h, r], [-r, y0 + h, r]], cor);

function cenaTronco(p: SolidoDe<"tronco">, ctl: Controles): Cena {
  const { R, H } = p;
  const hl = limitar(ex(p.corte, ctl), 0.01, H);
  const k = hl / H;
  const s = limitar(ex(p.separar, ctl), 0, 1);
  const yc = H - hl;
  const rk = k * R;
  const subir = s * H * 0.45;
  const malhas: Malha[] = [];
  const cone = p.solido === "cone";
  if (yc > 1e-6) malhas.push(cone ? tronco(R, rk, yc, 0, { base: undefined, lado: s > 0 ? tint(p.cores.tronco) : undefined }) : troncoPiramide(R, rk, yc, 0, s > 0 ? tint(p.cores.tronco) : undefined));
  const ponta = cone ? tronco(rk, 0, hl, yc, { lado: tint(p.cores.ponta) }) : troncoPiramide(rk, 0, hl, yc, tint(p.cores.ponta));
  malhas.push(transladar(ponta, [0, subir, 0]));
  const secao: Vec3[] = cone
    ? Array.from({ length: 48 }, (_, i) => [rk * Math.cos((i * Math.PI) / 24), yc, rk * Math.sin((i * Math.PI) / 24)] as Vec3)
    : [[-rk, yc, -rk], [rk, yc, -rk], [rk, yc, rk], [-rk, yc, rk]];
  const anotacoes: Anotacao[] = [
    { tipo: "poligono", pts: secao, cor: p.cores.secao, forte: true },
    { tipo: "seg", a: [0, H + subir, 0], b: [0, yc + subir, 0], cor: p.cores.k, rotulo: `h' = ${num(hl)}`, lw: 4 },
  ];
  const Vt = cone ? (Math.PI * R * R * H) / 3 : ((2 * R) ** 2 * H) / 3;
  const Vm = Vt * k ** 3;
  return {
    malhas,
    anotacoes,
    extras: [[0, H + H * 0.45, 0]],
    placar: [
      { s: `k = ${num(k, 3)}`, cor: p.cores.k },
      { s: `área ×${num(k * k, 3)}`, cor: p.cores.secao },
      { s: `volume ×${num(k ** 3, 3)}`, cor: p.cores.ponta },
    ],
    painel: p.meridiano ? { tipo: "meridiano", dados: { R, r: rk, ht: yc, cor: p.cores.tronco, corK: p.cores.k } } : undefined,
    metricas: { k, area_secao: cone ? Math.PI * rk * rk : (2 * rk) ** 2, volume_total: Vt, volume_menor: Vm, volume_tronco: Vt - Vm, separado: s },
  };
}

const PHI = (1 + Math.sqrt(5)) / 2;
export function verticesPoliedro(nome: SolidoDe<"poliedro">["solidos"][number]): Vec3[] {
  switch (nome) {
    case "tetraedro":
      return [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    case "piramide_quadrada":
      return [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], [0, 0.6, 0]];
    case "cubo":
      return [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as Vec3)));
    case "octaedro":
      return [[1.4, 0, 0], [-1.4, 0, 0], [0, 1.4, 0], [0, -1.4, 0], [0, 0, 1.4], [0, 0, -1.4]];
    case "prisma_triangular":
      return [-1, 1].flatMap((y) => [0, 1, 2].map((i) => [1.2 * Math.cos((i * 2 * Math.PI) / 3 + Math.PI / 2), y, 1.2 * Math.sin((i * 2 * Math.PI) / 3 + Math.PI / 2)] as Vec3));
    case "icosaedro":
      return [-1, 1].flatMap((a) => [-1, 1].flatMap((b) => [[0, a, b * PHI], [a, b * PHI, 0], [b * PHI, 0, a]] as Vec3[]));
    case "dodecaedro": {
      const ico = casco(verticesPoliedro("icosaedro"));
      return ico.f.map((f) => mul(media3(f.idx.map((i) => ico.v[i])), 1.3));
    }
  }
}

function cenaPoliedro(p: SolidoDe<"poliedro">, ctl: Controles, e: EstadoSolido): Cena {
  const i = limitar(Math.round(e.indice ?? ex(p.indice, ctl)), 0, p.solidos.length - 1);
  const nome = p.solidos[i];
  const serrar = limitar(ex(p.serrar, ctl), 0, 1);
  const soltar = limitar(ex(p.soltar, ctl), 0, 1);
  let pts = verticesPoliedro(nome);
  if (nome === "cubo" && serrar > 0) {
    const s = serrar * 1.2;
    pts = [...pts.filter((q) => !(q[0] === 1 && q[1] === 1 && q[2] === 1)), [1 - s, 1, 1], [1, 1 - s, 1], [1, 1, 1 - s]];
  }
  const m = casco(pts);
  const { V, A, F } = contar(m);
  const malhas: Malha[] = [];
  const anotacoes: Anotacao[] = [];
  if (soltar > 0) {
    // Cada face sai pela sua normal: as arestas viram bordas soltas (2 por aresta).
    for (const f of m.f) {
      const d = mul(f.n!, soltar * 1.2);
      malhas.push({ v: f.idx.map((k) => soma(m.v[k], d)), f: [{ idx: f.idx.map((_, j) => j), grupo: -1, cor: tint(p.cores.F), n: f.n }] });
    }
  } else {
    m.f.forEach((f) => (f.cor = tint(p.cores.F)));
    malhas.push(m);
    for (const q of m.v) anotacoes.push({ tipo: "ponto", p: q, cor: p.cores.V });
  }
  const lados = m.f.reduce((s, f) => s + f.idx.length, 0);
  const placar: Cena["placar"] =
    soltar > 0
      ? [{ s: `${lados} bordas`, cor: p.cores.A }, { s: `A = ${lados} ÷ 2 = ${A}`, cor: p.cores.A }]
      : [
          { s: `V ${V}`, cor: p.cores.V },
          { s: `A ${A}`, cor: p.cores.A },
          { s: `F ${F}`, cor: p.cores.F },
          { s: `V − A + F = ${V - A + F}`, cor: p.cores.euler },
        ];
  return { malhas, anotacoes, extras: m.v.map((q) => mul(q, 1 + soltar * 0.8)), placar, metricas: { V, A, F, euler: V - A + F, indice: i, serrado: serrar > 0 ? 1 : 0, solto: soltar } };
}

/** Classifica duas retas no espaço: 0 paralelas, 1 concorrentes, 2 reversas, 3 coincidentes. */
export function posicaoRetas(p1: Vec3, d1: Vec3, p2: Vec3, d2: Vec3): { posicao: 0 | 1 | 2 | 3; perpendiculares: boolean } {
  const c = cross(d1, d2);
  const w = sub(p2, p1);
  const perpendiculares = Math.abs(dot3(unit3(d1), unit3(d2))) < 1e-6;
  if (norma(c) < 1e-9) return { posicao: norma(cross(w, d1)) < 1e-9 ? 3 : 0, perpendiculares };
  return { posicao: Math.abs(dot3(w, unit3(c))) < 1e-9 ? 1 : 2, perpendiculares };
}
export const NOMES_POSICAO = ["paralelas", "concorrentes", "reversas", "coincidentes"] as const;

/** Recorta a reta p + t·d à caixa [lo, hi]³ (Liang–Barsky). */
function recortar(p0: Vec3, d: Vec3, lo: number, hi: number): [Vec3, Vec3] | null {
  let t0 = -1e9;
  let t1 = 1e9;
  for (let k = 0; k < 3; k++) {
    if (Math.abs(d[k]) < 1e-12) {
      if (p0[k] < lo || p0[k] > hi) return null;
      continue;
    }
    let a = (lo - p0[k]) / d[k];
    let b = (hi - p0[k]) / d[k];
    if (a > b) [a, b] = [b, a];
    t0 = Math.max(t0, a);
    t1 = Math.min(t1, b);
  }
  return t0 <= t1 ? [soma(p0, mul(d, t0)), soma(p0, mul(d, t1))] : null;
}

function cenaEspaco(p: SolidoDe<"espaco">, ctl: Controles): Cena {
  const L = p.L;
  // Coordenadas do plano: x de A para B, y para cima, z de A para D (para trás).
  const W = (x: number, y: number, z: number): Vec3 => [x, y, -z];
  const cubo = prisma([[0, 0], [L, 0], [L, -L], [0, -L]], L);
  const anotacoes: Anotacao[] = [];
  const planos: Record<string, Vec3[]> = {
    piso: [W(0, 0, 0), W(L, 0, 0), W(L, 0, L), W(0, 0, L)],
    teto: [W(0, L, 0), W(L, L, 0), W(L, L, L), W(0, L, L)],
    frente: [W(0, 0, 0), W(L, 0, 0), W(L, L, 0), W(0, L, 0)],
    tras: [W(0, 0, L), W(L, 0, L), W(L, L, L), W(0, L, L)],
    esquerda: [W(0, 0, 0), W(0, 0, L), W(0, L, L), W(0, L, 0)],
    direita: [W(L, 0, 0), W(L, 0, L), W(L, L, L), W(L, L, 0)],
  };
  for (const pl of p.planos) anotacoes.push({ tipo: "poligono", pts: planos[pl], cor: p.cor_plano });
  if (p.rotulos) {
    const nomes: [string, Vec3][] = [["A", W(0, 0, 0)], ["B", W(L, 0, 0)], ["C", W(L, 0, L)], ["D", W(0, 0, L)], ["E", W(0, L, 0)], ["F", W(L, L, 0)], ["G", W(L, L, L)], ["H", W(0, L, L)]];
    for (const [s, q] of nomes) anotacoes.push({ tipo: "texto", p: soma(q, mul(unit3(sub(q, [L / 2, L / 2, -L / 2])), L * 0.12)), s });
  }
  const retas = p.retas.map((r) => {
    const [x, y, z] = r.ponto.map((v) => ex(v, ctl));
    const th = ex(r.angulo, ctl) * DEG;
    const ph = ex(r.inclinacao, ctl) * DEG;
    const p0: Vec3 = [x, y, z];
    const d: Vec3 = [Math.cos(ph) * Math.cos(th), Math.sin(ph), Math.cos(ph) * Math.sin(th)];
    return { r, p0, d };
  });
  for (const { r, p0, d } of retas) {
    // Recorta no sistema do plano (cubo de 0 a L, com folga) e só depois leva ao mundo.
    const sgm = recortar(p0, d, -0.25 * L, 1.25 * L);
    if (sgm) anotacoes.push({ tipo: "seg", a: W(...sgm[0]), b: W(...sgm[1]), cor: r.cor, rotulo: r.rotulo, lw: 4.5 });
  }
  for (const q of p.esquadros) {
    const o = W(...q.em);
    anotacoes.push({ tipo: "reto", o, a: soma(o, W(...q.a)), b: soma(o, W(...q.b)), cor: p.cor_esquadro });
  }
  const metricas: Record<string, number> = {};
  const placar: Cena["placar"] = [];
  if (retas.length >= 2) {
    const { posicao, perpendiculares } = posicaoRetas(retas[0].p0, retas[0].d, retas[1].p0, retas[1].d);
    metricas.posicao = posicao;
    metricas.perpendiculares = perpendiculares ? 1 : 0;
    placar.push({ s: NOMES_POSICAO[posicao] + (perpendiculares && posicao !== 0 && posicao !== 3 ? " (90°)" : ""), cor: p.cor_plano });
  }
  return { malhas: [cubo], anotacoes, extras: [W(-0.3 * L, 0, 0), W(1.3 * L, L, L)], placar, metricas };
}

function malhaVistas(nome: SolidoDe<"vistas">["solido"]): Malha {
  switch (nome) {
    case "cubo":
      return prisma([[-1, 1], [1, 1], [1, -1], [-1, -1]], 2);
    case "cilindro":
      return cilindro(1, 2);
    case "piramide":
      return piramide([[-1, 1], [1, 1], [1, -1], [-1, -1]], [0, 2, 0]);
    case "bloco_l":
      return prisma([[-1.5, 1], [1.5, 1], [1.5, 0], [0, 0], [0, -1], [-1.5, -1]], 1.5);
    case "dado":
      return prisma([[-1, 1], [1, 1], [1, -1], [-1, -1]], 2);
  }
}

/** Interseção de um plano (n·x = d) com as arestas da malha: polígono ordenado. */
export function secao(m: Malha, n: Vec3, d: number): Vec3[] {
  const pts: Vec3[] = [];
  for (const f of m.f)
    f.idx.forEach((a, k) => {
      const P = m.v[a];
      const Q = m.v[f.idx[(k + 1) % f.idx.length]];
      const sa = dot3(n, P) - d;
      const sb = dot3(n, Q) - d;
      if ((sa <= 0 && sb >= 0) || (sa >= 0 && sb <= 0)) {
        if (Math.abs(sa - sb) < 1e-12) return;
        const t = sa / (sa - sb);
        const X = soma(P, mul(sub(Q, P), t));
        if (!pts.some((q) => norma(sub(q, X)) < 1e-7)) pts.push(X);
      }
    });
  if (pts.length < 3) return pts;
  const c0 = media3(pts);
  const u = unit3(sub(pts[0], c0));
  const w = cross(unit3(n), u);
  return pts.sort((a, b) => Math.atan2(dot3(sub(a, c0), w), dot3(sub(a, c0), u)) - Math.atan2(dot3(sub(b, c0), w), dot3(sub(b, c0), u)));
}

/** Molde em cruz do dado: t = 0 aberto no chão, t = 1 cubo fechado. Faces com o número. */
export function moldeDado(t: number): { pts: Vec3[]; numero: number }[] {
  const th = (t * Math.PI) / 2;
  const sq = (cx: number, cz: number): Vec3[] => [[cx - 1, 0, cz - 1], [cx + 1, 0, cz - 1], [cx + 1, 0, cz + 1], [cx - 1, 0, cz + 1]];
  const base = sq(0, 0);
  const lados: { pts: Vec3[]; eixoO: Vec3; eixoU: Vec3; numero: number }[] = [
    { pts: sq(0, 2), eixoO: [0, 0, 1], eixoU: [1, 0, 0], numero: 2 },
    { pts: sq(0, -2), eixoO: [0, 0, -1], eixoU: [-1, 0, 0], numero: 5 },
    { pts: sq(2, 0), eixoO: [1, 0, 0], eixoU: [0, 0, -1], numero: 3 },
    { pts: sq(-2, 0), eixoO: [-1, 0, 0], eixoU: [0, 0, 1], numero: 4 },
  ];
  const out: { pts: Vec3[]; numero: number }[] = [{ pts: base, numero: 1 }];
  for (const l of lados) out.push({ pts: l.pts.map((q) => girar(q, l.eixoO, l.eixoU, -th)), numero: l.numero });
  // A tampa (6) presa à face de trás (5): gira com ela e mais θ em volta da borda de cima dela.
  const tras = lados[1];
  const tampa = sq(0, -4).map((q) => girar(q, [0, 0, -3], [-1, 0, 0], -th)).map((q) => girar(q, tras.eixoO, tras.eixoU, -th));
  out.push({ pts: tampa, numero: 6 });
  return out;
}

function cenaVistas(p: SolidoDe<"vistas">, ctl: Controles, e: EstadoSolido): Cena {
  const nome = e.solidoVistas ?? p.solido;
  const anotacoes: Anotacao[] = [];
  const metricas: Record<string, number> = {};
  if (nome === "dado") {
    const t = limitar(ex(p.fechar, ctl), 0, 1);
    const pares: Record<number, CorTraco> = { 1: "c1", 6: "c1", 2: "c2", 5: "c2", 3: p.cores.par, 4: p.cores.par };
    const malhas: Malha[] = moldeDado(t).map((f) => ({ v: f.pts, f: [{ idx: [0, 1, 2, 3], grupo: -1, cor: tint(pares[f.numero]), n: unit3(normal(f.pts)) }] }));
    moldeDado(t).forEach((f) => anotacoes.push({ tipo: "texto", p: media3(f.pts), s: String(f.numero) }));
    metricas.fechado = t;
    return { malhas, anotacoes, extras: [[-3, 0, -5], [3, 2, 3]], placar: [], metricas };
  }
  const m = malhaVistas(nome);
  if (p.corte) {
    const vertical = e.corteVertical ?? p.corte.tipo === "vertical";
    const alt = ex(p.corte.altura, ctl);
    const ymax = Math.max(...m.v.map((q) => q[1]));
    const sec = vertical ? secao(m, [1, 0, 0], 0) : secao(m, [0, 1, 0], alt * ymax);
    if (sec.length >= 3) anotacoes.push({ tipo: "poligono", pts: sec, cor: p.cores.corte, forte: true });
    metricas.lados_secao = sec.length;
  }
  return {
    malhas: [m],
    anotacoes,
    extras: [],
    placar: [],
    painel: p.sombras ? { tipo: "sombras", dados: { nome } } : undefined,
    metricas,
  };
}

function cenaComposicao(p: SolidoDe<"composicao">, ctl: Controles): Cena {
  const { r, h, hc } = p;
  const t = limitar(ex(p.juntar, ctl), 0, 1);
  const gap = (1 - t) * Math.max(h, r) * 0.6;
  const A = tint(p.cores.a);
  const B = tint(p.cores.b);
  const malhas: Malha[] = [];
  const anotacoes: Anotacao[] = [];
  const disco = (y: number): Vec3[] => Array.from({ length: 48 }, (_, i) => [r * Math.cos((i * Math.PI) / 24), y, r * Math.sin((i * Math.PI) / 24)]);
  let Va = Math.PI * r * r * h;
  let Vb = 0;
  let total = 0;
  let nomeB = "";
  if (p.montagem === "silo") {
    malhas.push(cilindro(r, h, 0, { lado: A }));
    malhas.push(tronco(r, 0, hc, h + gap, { lado: B }));
    Vb = (Math.PI * r * r * hc) / 3;
    total = Va + Vb;
    nomeB = "cone";
    if (t >= 1) anotacoes.push({ tipo: "poligono", pts: disco(h), cor: p.cores.encontro, forte: true });
  } else if (p.montagem === "capsula") {
    malhas.push(cilindro(r, h, 0, { lado: A }));
    malhas.push(semiesfera(r, h + gap, true, B));
    malhas.push(semiesfera(r, -gap, false, B));
    Vb = (4 / 3) * Math.PI * r ** 3;
    total = Va + Vb;
    nomeB = "2 semiesferas";
  } else {
    // Cavidade: cone invertido (vértice para baixo) com a base na tampa de cima do cilindro.
    malhas.push(cilindro(r, h, 0, { lado: A }));
    const cone = revolucao([{ r: 0, y: h - hc }, { r, y: h, quebra: true }, { r: 0, y: h, quebra: true }], 0, 2 * Math.PI, 48, B);
    malhas.push(transladar(cone, [0, gap * 1.6, 0]));
    Vb = (Math.PI * r * r * hc) / 3;
    total = Va - Vb;
    nomeB = "cone";
    Va = Math.PI * r * r * h;
  }
  const s = p.montagem === "cavidade" ? `${pi(Va / Math.PI)} − ${pi(Vb / Math.PI)} = ${pi(total / Math.PI)}` : `${pi(Va / Math.PI)} + ${pi(Vb / Math.PI)} = ${pi(total / Math.PI)}`;
  return {
    malhas,
    anotacoes,
    extras: [[0, h + hc + Math.max(h, r) * 0.6 * 1.6, 0], [0, -r - Math.max(h, r) * 0.6, 0]],
    placar: [{ s: `cilindro ${pi(Va / Math.PI)}`, cor: p.cores.a }, { s: `${nomeB} ${pi(Vb / Math.PI)}`, cor: p.cores.b }, ...(t >= 1 ? [{ s, cor: p.cores.total }] : [])],
    metricas: { volume_pi: total / Math.PI, volume: total, juntou: t >= 1 ? 1 : 0 },
  };
}

export function montarCena(p: Solido, ctl: Controles, e: EstadoSolido = {}): Cena {
  switch (p.modo) {
    case "revolucao":
      return cenaRevolucao(p, ctl, e);
    case "prisma":
      return cenaPrisma(p, ctl);
    case "piramide":
      return cenaPiramide(p, ctl);
    case "cilindro":
      return cenaCilindro(p, ctl);
    case "esfera":
      return cenaEsfera(p, ctl, e);
    case "tronco":
      return cenaTronco(p, ctl);
    case "poliedro":
      return cenaPoliedro(p, ctl, e);
    case "espaco":
      return cenaEspaco(p, ctl);
    case "vistas":
      return cenaVistas(p, ctl, e);
    case "composicao":
      return cenaComposicao(p, ctl);
  }
}

export { malhaVistas, orientarPorCentro };
