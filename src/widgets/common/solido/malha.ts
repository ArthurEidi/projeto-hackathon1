// Motor 3D mínimo para sólidos: malhas de faces planas, projeção ortográfica (mesma câmera do Cones),
// pintura por profundidade e a convenção dos livros: aresta visível cheia, aresta oculta tracejada,
// superfície curva desenhada só pela silhueta. Sem React e sem DOM (o desenho recebe o ctx).
import { project, toView, type Camera, type Projected, type Vec3 } from "../../../math3d/project";
import { palette as c } from "../../../ui/palette";
import { polyline } from "../../canvas";

export type { Vec3 };

export interface Face {
  idx: number[];
  /** Faces do mesmo grupo formam uma superfície lisa: a aresta entre elas só aparece na silhueta. */
  grupo: number;
  /** Cor de preenchimento (tinta da marca); sem cor, a face é transparente. */
  cor?: string;
  /** Normal externa (calculada na montagem). */
  n?: Vec3;
}

export interface Malha {
  v: Vec3[];
  f: Face[];
  /** Arestas desta malha: cor e espessura. */
  aresta?: string;
  lw?: number;
  /** Malha fantasma: só arestas tracejadas cinza. */
  fantasma?: boolean;
}

// ---------- vetores ----------
export const soma = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const mul = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
export const dot3 = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norma = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);
export const unit3 = (a: Vec3): Vec3 => {
  const n = norma(a);
  return n < 1e-12 ? [0, 0, 0] : mul(a, 1 / n);
};
export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => soma(a, mul(sub(b, a), t));
export const media3 = (pts: readonly Vec3[]): Vec3 => mul(pts.reduce(soma, [0, 0, 0] as Vec3), 1 / Math.max(1, pts.length));

/** Normal de Newell (robusta para polígonos quase degenerados). */
export function normal(pts: readonly Vec3[]): Vec3 {
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    x += (a[1] - b[1]) * (a[2] + b[2]);
    y += (a[2] - b[2]) * (a[0] + b[0]);
    z += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return [x, y, z];
}

/** Gira p em torno do eixo (origem o, direção unitária u) pelo ângulo a (Rodrigues). */
export function girar(p: Vec3, o: Vec3, u: Vec3, a: number): Vec3 {
  const v = sub(p, o);
  const cs = Math.cos(a);
  const sn = Math.sin(a);
  const r = soma(soma(mul(v, cs), mul(cross(u, v), sn)), mul(u, dot3(u, v) * (1 - cs)));
  return soma(o, r);
}

// ---------- montagem ----------

/** Orienta as faces para fora a partir de um ponto interior (sólidos convexos). */
export function orientarPorCentro(m: Malha, centro?: Vec3): Malha {
  const o = centro ?? media3(m.v);
  for (const f of m.f) {
    const pts = f.idx.map((i) => m.v[i]);
    let n = normal(pts);
    if (dot3(n, sub(media3(pts), o)) < 0) {
      f.idx.reverse();
      n = mul(n, -1);
    }
    f.n = unit3(n);
  }
  return m;
}

/** Prisma reto: base poligonal no plano xz (pontos [x, z]) de y0 até y0 + h. */
export function prisma(base: readonly (readonly [number, number])[], h: number, y0 = 0, cores: { base?: string; topo?: string; lados?: string } = {}): Malha {
  const n = base.length;
  const v: Vec3[] = [...base.map(([x, z]) => [x, y0, z] as Vec3), ...base.map(([x, z]) => [x, y0 + h, z] as Vec3)];
  const f: Face[] = [
    { idx: base.map((_, i) => i), grupo: -1, cor: cores.base },
    { idx: base.map((_, i) => n + i), grupo: -1, cor: cores.topo },
    ...base.map((_, i) => ({ idx: [i, (i + 1) % n, n + ((i + 1) % n), n + i], grupo: -1, cor: cores.lados })),
  ];
  return orientarPorCentro({ v, f });
}

/** Pirâmide: base no plano xz em y0 e vértice `apice`. */
export function piramide(base: readonly (readonly [number, number])[], apice: Vec3, y0 = 0, cores: { base?: string; lados?: string } = {}): Malha {
  const n = base.length;
  const v: Vec3[] = [...base.map(([x, z]) => [x, y0, z] as Vec3), apice];
  const f: Face[] = [{ idx: base.map((_, i) => i), grupo: -1, cor: cores.base }, ...base.map((_, i) => ({ idx: [i, (i + 1) % n, n], grupo: -1, cor: cores.lados }))];
  return orientarPorCentro({ v, f }, soma(media3(v.slice(0, n)), mul(sub(apice, media3(v.slice(0, n))), 0.25)));
}

/** Ponto de perfil (r = distância ao eixo y, y = altura). `quebra` = vinco (aresta) nesse ponto. */
export interface PontoPerfil {
  r: number;
  y: number;
  quebra?: boolean;
}

/**
 * Sólido de revolução: o perfil fechado (anti-horário no plano r × y) gira de a0 até a1 em torno do eixo y.
 * Cada trecho entre quebras é uma superfície lisa.
 */
export function revolucao(perfil: readonly PontoPerfil[], a0: number, a1: number, passos = 48, cor?: string, corPorTrecho?: (i: number) => string | undefined): Malha {
  const giro = a1 - a0;
  const N = Math.max(2, Math.ceil((passos * Math.abs(giro)) / (2 * Math.PI)));
  const fechado = Math.abs(Math.abs(giro) - 2 * Math.PI) < 1e-9;
  const nA = fechado ? N : N + 1;
  const ang = (j: number) => a0 + (giro * j) / N;
  const v: Vec3[] = [];
  const indice: number[][] = []; // indice[i][j]
  perfil.forEach((p) => {
    if (p.r < 1e-12) {
      v.push([0, p.y, 0]);
      indice.push(Array<number>(nA).fill(v.length - 1));
    } else {
      const row: number[] = [];
      for (let j = 0; j < nA; j++) {
        const t = ang(j);
        v.push([p.r * Math.cos(t), p.y, p.r * Math.sin(t)]);
        row.push(v.length - 1);
      }
      indice.push(row);
    }
  });
  const f: Face[] = [];
  let grupo = 0;
  const P = perfil.length;
  // Área com sinal do perfil: positiva = anti-horário.
  let area = 0;
  for (let i = 0; i < P; i++) area += perfil[i].r * perfil[(i + 1) % P].y - perfil[(i + 1) % P].r * perfil[i].y;
  const sentido = area >= 0 ? 1 : -1;
  for (let i = 0; i < P; i++) {
    const a = perfil[i];
    const b = perfil[(i + 1) % P];
    if (i > 0 && a.quebra) grupo++;
    if (a.r < 1e-12 && b.r < 1e-12) continue; // trecho sobre o eixo
    // Normal externa do trecho no plano do perfil.
    const nr = (b.y - a.y) * sentido;
    const ny = -(b.r - a.r) * sentido;
    const corTrecho = corPorTrecho?.(i) ?? cor;
    for (let j = 0; j < N; j++) {
      const j1 = fechado ? (j + 1) % N : j + 1;
      const quad = [indice[i][j], indice[i + 1 < P ? i + 1 : 0][j], indice[i + 1 < P ? i + 1 : 0][j1], indice[i][j1]];
      const idx = quad.filter((x, k) => quad.indexOf(x) === k);
      if (idx.length < 3) continue;
      const t = ang(j + 0.5);
      const fora: Vec3 = [nr * Math.cos(t), ny, nr * Math.sin(t)];
      let n = normal(idx.map((k) => v[k]));
      if (dot3(n, fora) < 0) {
        idx.reverse();
        n = mul(n, -1);
      }
      f.push({ idx, grupo: 1000 + grupo, cor: corTrecho, n: unit3(n) });
    }
  }
  // Giro parcial: as duas "tampas" planas do perfil (no começo e no fim) ficam abertas: o perfil é desenhado à parte.
  return { v, f };
}

/** Esfera (ou calota, de yDe até yAte) de raio R com centro em (0, cy, 0). */
export function esfera(R: number, cy = 0, cor?: string, passos = 36): Malha {
  const perfil: PontoPerfil[] = [];
  const k = 18;
  for (let i = 0; i <= k; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / k;
    perfil.push({ r: R * Math.cos(a), y: cy + R * Math.sin(a) });
  }
  // O perfil "volta" pelo eixo (r = 0) de cima até embaixo: fechado e anti-horário.
  return revolucao(perfil, 0, 2 * Math.PI, passos, cor);
}

/** Semiesfera (cúpula para cima se `cima`) com a base em y = cy. */
export function semiesfera(R: number, cy: number, cima: boolean, cor?: string, corBase?: string): Malha {
  const perfil: PontoPerfil[] = [{ r: 0, y: cy }];
  const k = 10;
  for (let i = 0; i <= k; i++) {
    const a = (Math.PI / 2) * (i / k);
    perfil.push({ r: R * Math.cos(a), y: cy + (cima ? 1 : -1) * R * Math.sin(a), quebra: i === 0 });
  }
  const p = cima ? perfil : [perfil[0], ...perfil.slice(1).reverse()];
  return revolucao(p, 0, 2 * Math.PI, 36, cor, (i) => (i === 0 ? corBase : cor));
}

/** Cilindro (perfil retangular) de raio r, de y0 até y0 + h. */
export const cilindro = (r: number, h: number, y0 = 0, cores: { base?: string; lado?: string; topo?: string } = {}): Malha =>
  revolucao(
    [
      { r: 0, y: y0 },
      { r, y: y0, quebra: true },
      { r, y: y0 + h, quebra: true },
      { r: 0, y: y0 + h, quebra: true },
    ],
    0,
    2 * Math.PI,
    48,
    undefined,
    (i) => (i === 0 ? cores.base : i === 1 ? cores.lado : cores.topo),
  );

/** Tronco de cone (r1 embaixo, r2 em cima; r2 = 0 é o cone). */
export const tronco = (r1: number, r2: number, h: number, y0 = 0, cores: { base?: string; lado?: string; topo?: string } = {}): Malha =>
  revolucao(
    [
      { r: 0, y: y0 },
      { r: r1, y: y0, quebra: true },
      { r: r2, y: y0 + h, quebra: true },
      ...(r2 > 1e-12 ? [{ r: 0, y: y0 + h, quebra: true }] : []),
    ],
    0,
    2 * Math.PI,
    48,
    undefined,
    (i) => (i === 0 ? cores.base : i === 1 ? cores.lado : cores.topo),
  );

export function transladar(m: Malha, d: Vec3): Malha {
  return { ...m, v: m.v.map((p) => soma(p, d)) };
}

// ---------- desenho ----------

export interface Cena3D {
  malhas: Malha[];
  cam: Camera;
}

const frente = (f: Face, cam: Camera) => (f.n ? toView(f.n, cam.yaw, cam.pitch)[2] > 1e-9 : true);

export function projetar(p: Vec3, cam: Camera): Projected {
  return project(p, cam);
}

/**
 * Desenha as malhas: preenchimentos (do fundo para a frente), depois arestas ocultas tracejadas,
 * depois arestas visíveis. Devolve as arestas visíveis para quem quiser desenhar por cima.
 */
export function desenharMalhas(ctx: CanvasRenderingContext2D, malhas: readonly Malha[], cam: Camera, opts: { ocultas?: boolean } = {}) {
  const P = (p: Vec3) => project(p, cam);
  // Preenchimentos: todas as faces coloridas, de trás para a frente.
  const faces = malhas.flatMap((m) =>
    m.fantasma ? [] : m.f.filter((f) => f.cor).map((f) => ({ f, m, z: media3(f.idx.map((i) => m.v[i])) })),
  );
  const prof = (p: Vec3) => toView(p, cam.yaw, cam.pitch, cam.target)[2];
  faces.sort((a, b) => prof(a.z) - prof(b.z));
  for (const { f, m } of faces) {
    const pts = f.idx.map((i) => P(m.v[i]));
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (const q of pts.slice(1)) ctx.lineTo(q.x, q.y);
    ctx.closePath();
    ctx.fillStyle = f.cor!;
    ctx.fill();
    ctx.strokeStyle = f.cor!;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  // Arestas.
  const ocultas: [Projected, Projected, string, number][] = [];
  const visiveis: [Projected, Projected, string, number][] = [];
  for (const m of malhas) {
    const mapa = new Map<string, { a: number; b: number; faces: Face[] }>();
    for (const f of m.f) {
      for (let k = 0; k < f.idx.length; k++) {
        const a = f.idx[k];
        const b = f.idx[(k + 1) % f.idx.length];
        if (a === b) continue;
        const chave = a < b ? `${a}-${b}` : `${b}-${a}`;
        const e = mapa.get(chave) ?? { a, b, faces: [] };
        e.faces.push(f);
        mapa.set(chave, e);
      }
    }
    const cor = m.fantasma ? c.lineDark : (m.aresta ?? c.ink2);
    const lw = m.lw ?? 2.5;
    for (const e of mapa.values()) {
      const fr = e.faces.map((f) => frente(f, cam));
      const lisa = e.faces.length === 2 && e.faces[0].grupo === e.faces[1].grupo && e.faces[0].grupo >= 0;
      let vis: boolean | null;
      if (e.faces.length === 1) vis = true;
      else if (lisa) vis = fr[0] !== fr[1] ? true : null; // silhueta
      else vis = fr.some(Boolean);
      if (vis === null) continue;
      const seg: [Projected, Projected, string, number] = [P(m.v[e.a]), P(m.v[e.b]), cor, lw];
      if (m.fantasma) ocultas.push(seg);
      else (vis ? visiveis : ocultas).push(seg);
    }
  }
  if (opts.ocultas !== false) for (const [a, b, cor, lw] of ocultas) polyline(ctx, [a, b], cor === c.ink2 ? c.muted : cor, lw * 0.7, [5, 5]);
  for (const [a, b, cor, lw] of visiveis) polyline(ctx, [a, b], cor, lw);
}

/** Câmera que enquadra os pontos dados (esfera envolvente), com a mesma convenção do Cones. */
export function enquadrar(pontos: readonly Vec3[], yaw: number, pitch: number, reg: { x: number; y: number; w: number; h: number }, margem = 1.12): Camera {
  const lo: Vec3 = [Math.min(...pontos.map((p) => p[0])), Math.min(...pontos.map((p) => p[1])), Math.min(...pontos.map((p) => p[2]))];
  const hi: Vec3 = [Math.max(...pontos.map((p) => p[0])), Math.max(...pontos.map((p) => p[1])), Math.max(...pontos.map((p) => p[2]))];
  const centro = mul(soma(lo, hi), 0.5);
  const R = Math.max(1e-6, ...pontos.map((p) => norma(sub(p, centro))));
  return {
    yaw,
    pitch,
    scale: Math.min(reg.w, reg.h) / (2 * R * margem),
    cx: reg.x + reg.w / 2,
    cy: reg.y + reg.h / 2,
    target: centro,
  };
}
