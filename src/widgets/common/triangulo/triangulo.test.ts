import { describe, expect, it } from "vitest";
import { angulos, anguloEm, cossenos, desigualdade, estadoInicial, metricas, metricasTriangulo, notaveis, pitagoras, provaPecas, razoes, semelhanca, senos, trianguloPorLados } from "./calc";
import { desenharTriangulo, layoutRazoes } from "./desenho";
import { criarVista } from "../geo/base";
import { GeometriaTriangulo, GeometriaTrianguloFigura, type TrianguloDe } from "./params";

const tri = (o: object) => GeometriaTriangulo.parse(o);
const area = (pts: { x: number; y: number }[]) => Math.abs(pts.reduce((s, p, i) => s + (p.x * pts[(i + 1) % pts.length].y - pts[(i + 1) % pts.length].x * p.y), 0)) / 2;

describe("pitágoras", () => {
  it("3-4-5: áreas 9, 16 e 25", () => {
    const p = tri({ modo: "pitagoras" }) as TrianguloDe<"pitagoras">;
    const g = pitagoras(p, {}, estadoInicial(p));
    expect([g.b, g.c, g.a, g.areaB, g.areaC, g.areaA]).toEqual([3, 4, 5, 9, 16, 25]);
  });
  it("caso neutro c = 0: a = b", () => {
    const p = tri({ modo: "pitagoras", c: "$c" }) as TrianguloDe<"pitagoras">;
    expect(pitagoras(p, { c: 0 }, estadoInicial(p)).a).toBe(3);
    expect(pitagoras(p, { c: 4 }, estadoInicial(p)).a).toBe(5);
  });
  it("quadrado e diagonal: d = b√2", () => {
    const p = tri({ modo: "pitagoras", b: "$b", chaves: ["diagonal"], diagonal: true }) as TrianguloDe<"pitagoras">;
    const g = pitagoras(p, { b: 5 }, estadoInicial(p));
    expect(g.a).toBeCloseTo(5 * Math.SQRT2, 12);
    expect(g.diagonal).toBe(true);
  });
  it("prova visual: as peças preenchem o quadradão de lado b + c nas duas disposições", () => {
    for (const desl of [false, true]) {
      const pe = provaPecas(3, 4, desl);
      const soma = pe.triangulos.reduce((s, t) => s + area(t), 0) + pe.quadrados.reduce((s, q) => s + area(q.pts), 0);
      expect(soma).toBeCloseTo(49, 9);
      for (const t of pe.triangulos) expect(area(t)).toBeCloseTo(6, 9);
    }
    expect(area(provaPecas(3, 4, false).quadrados[0].pts)).toBeCloseTo(25, 9);
    expect(provaPecas(3, 4, true).quadrados.map((q) => area(q.pts))).toEqual([9, 16]);
  });
});

describe("razões", () => {
  it("as razões não mudam com a escala k", () => {
    const p = tri({ modo: "razoes", angulo: 30, k: "$k" }) as TrianguloDe<"razoes">;
    const a = razoes(p, { k: 1 });
    const b = razoes(p, { k: 3 });
    expect(b.hip).toBeCloseTo(3 * a.hip, 12);
    expect(b.sen).toBeCloseTo(a.sen, 12);
    expect(b.cos).toBeCloseTo(a.cos, 12);
    expect(b.tg).toBeCloseTo(a.tg, 12);
    expect(a.sen).toBeCloseTo(0.5, 12);
  });
  it("45°: CO = CA e HIP = CO·√2", () => {
    const p = tri({ modo: "razoes", angulo: 45, hip: Math.SQRT2 }) as TrianguloDe<"razoes">;
    const g = razoes(p, {});
    expect([g.co, g.ca, g.hip].map((x) => Number(x.toFixed(6)))).toEqual([1, 1, 1.414214]);
  });
});

describe("relações métricas", () => {
  it("a = 10, m = 5: h = 5; m = 8: n = 2, h = 4", () => {
    const p = tri({ modo: "metricas", m: "$m" }) as TrianguloDe<"metricas">;
    expect(metricas(p, { m: 5 }).h).toBe(5);
    const g = metricas(p, { m: 8 });
    expect([g.n, g.h]).toEqual([2, 4]);
    expect(g.areaB).toBeCloseTo(g.areaAM, 12);
    expect(g.areaAM).toBe(80);
  });
  it("catetos 3-4: a = 5, m = 9/5, h = 2,4", () => {
    const p = tri({ modo: "metricas", catetos: [3, 4], apoio: "$girar_base" }) as TrianguloDe<"metricas">;
    const g = metricas(p, {});
    expect([g.a, g.m]).toEqual([5, 1.8]);
    expect(g.h).toBeCloseTo(2.4, 12);
    expect(g.h * g.a).toBeCloseTo(12, 12);
  });
});

describe("lei dos cossenos e dos senos", () => {
  it("A = 90° dá Pitágoras; A = 60° dá a² = 13; A = 120° dá 37", () => {
    const p = tri({ modo: "cossenos", angulo: "$ang_a" }) as TrianguloDe<"cossenos">;
    expect(cossenos(p, { ang_a: 90 }).a2).toBeCloseTo(25, 9);
    expect(cossenos(p, { ang_a: 60 }).a2).toBeCloseTo(13, 9);
    expect(cossenos(p, { ang_a: 120 }).a2).toBeCloseTo(37, 9);
  });
  it("o ponto C obedece ao ângulo e a distância BC é a", () => {
    const p = tri({ modo: "cossenos", angulo: 60 }) as TrianguloDe<"cossenos">;
    const g = cossenos(p, {});
    expect(Math.hypot(g.pts.B.x - g.pts.C.x, g.pts.B.y - g.pts.C.y)).toBeCloseTo(g.a, 9);
  });
  it("a / sen A = 2R, e o ângulo no vértice A é o pedido", () => {
    const p = tri({ modo: "senos", R: 5, angulo: "$ang_a", posicao: 10 }) as TrianguloDe<"senos">;
    for (const A of [30, 60, 90, 120]) {
      const g = senos(p, { ang_a: A });
      expect(g.razao).toBeCloseTo(10, 9);
      expect(anguloEm(g.pts.A, g.pts.B, g.pts.C)).toBeCloseTo(A, 6);
    }
  });
});

describe("ângulos", () => {
  it("a soma é 180° em qualquer vértice, e o externo vale α + γ", () => {
    const p = tri({ modo: "angulos" }) as TrianguloDe<"angulos">;
    const e = estadoInicial(p);
    for (const C of [{ x: 0, y: 3 * Math.sqrt(3) }, { x: 1, y: 2 }, { x: -3, y: 4 }, { x: 2.5, y: 0.75 }]) {
      const g = angulos(p, {}, { ...e, vertice: C });
      expect(g.alfa + g.beta + g.gama).toBeCloseTo(180, 9);
      expect(g.externo).toBeCloseTo(g.alfa + g.gama, 12);
    }
    const eq = angulos(p, {}, e);
    expect([eq.alfa, eq.beta, eq.gama].map((x) => Math.round(x))).toEqual([60, 60, 60]);
  });
  it("por α e β com slider", () => {
    const p = tri({ modo: "angulos", alfa: "$alfa", beta: 60, arrastavel: false }) as TrianguloDe<"angulos">;
    const g = angulos(p, { alfa: 50 }, estadoInicial(p));
    expect(g.alfa).toBeCloseTo(50, 9);
    expect(g.beta).toBeCloseTo(60, 9);
    expect(g.gama).toBeCloseTo(70, 9);
  });
});

describe("desigualdade triangular", () => {
  it("a = 8, b = 5: fecha para 3 ≤ c ≤ 13 e não fecha com c ≤ 2", () => {
    const p = tri({ modo: "desigualdade", c: "$c" }) as TrianguloDe<"desigualdade">;
    expect([6, 3, 7].map((c) => desigualdade(p, { c }).cruzam)).toEqual([true, true, true]);
    expect([1, 2].map((c) => desigualdade(p, { c }).cruzam)).toEqual([false, false]);
    const g = desigualdade(p, { c: 6 });
    expect(Math.hypot(g.topo.x, g.topo.y)).toBeCloseTo(5, 9);
    expect(Math.hypot(g.topo.x - 8, g.topo.y)).toBeCloseTo(6, 9);
  });
});

describe("congruência e notáveis", () => {
  it("triângulo por lados respeita as três medidas", () => {
    const [a, b, c] = trianguloPorLados([4, 5, 6]);
    expect(Math.hypot(b.x - a.x, b.y - a.y)).toBeCloseTo(4, 12);
    expect(Math.hypot(c.x - a.x, c.y - a.y)).toBeCloseTo(5, 12);
    expect(Math.hypot(c.x - b.x, c.y - b.y)).toBeCloseTo(6, 12);
  });
  it("quadrado: d = L√2; equilátero: h = L√3/2; mediatriz cruza com r > AB/2", () => {
    const q = tri({ modo: "notaveis", L: "$l" }) as TrianguloDe<"notaveis">;
    expect(notaveis(q, { l: 5 }).d).toBeCloseTo(5 * Math.SQRT2, 12);
    expect(notaveis(tri({ modo: "notaveis", figura: "equilatero", L: 6 }) as TrianguloDe<"notaveis">, {}).h).toBeCloseTo(3 * Math.sqrt(3), 12);
    const m = tri({ modo: "notaveis", figura: "mediatriz", raio: "$raio" }) as TrianguloDe<"notaveis">;
    expect([2, 3, 4, 5].map((raio) => notaveis(m, { raio }).cruzam)).toEqual([false, false, true, true]);
    expect(notaveis(m, { raio: 5 }).altura_compasso).toBeCloseTo(4, 12);
  });
});

describe("semelhança", () => {
  it("a razão do corte paralelo é k; torto, deixa de ser paralelo", () => {
    const p = tri({ modo: "semelhanca", k: "$k", giro: "$giro" }) as TrianguloDe<"semelhanca">;
    const e = estadoInicial(p);
    for (const k of [0.25, 0.5, 1, 1.5]) {
      const g = semelhanca(p, { k, giro: 0 }, e);
      expect(g.razao).toBeCloseTo(k, 9);
      expect(g.angQ0).toBeCloseTo(g.angP0, 9);
    }
    const t = semelhanca(p, { k: 0.5, giro: 15 }, e);
    expect(t.paralelo).toBe(false);
    expect(Math.abs(t.angQ0 - t.angP0)).toBeGreaterThan(1);
  });
  it("Tales: 2/4 = 3/6; sombras: H = 2 · 9 / 3 = 6", () => {
    const p = tri({ modo: "semelhanca", variante: "tales", corte: "$h_meio" }) as TrianguloDe<"semelhanca">;
    const g = semelhanca(p, { h_meio: 2 }, estadoInicial(p));
    expect(g.tales.esq).toEqual([2, 4]);
    expect(g.tales.dir).toEqual([3, 6]);
    expect(g.tales.razao).toBeCloseTo(g.tales.dir[0] / g.tales.dir[1], 12);
    const s = tri({ modo: "semelhanca", variante: "sombras" }) as TrianguloDe<"semelhanca">;
    expect(semelhanca(s, {}, estadoInicial(s)).sombras.H).toBe(6);
  });
});

describe("métricas emitidas e figura", () => {
  it("chaves vistas viram 0/1 e contagens", () => {
    const p = tri({ modo: "pitagoras", prova: true, chaves: ["deslizar"] });
    const e = estadoInicial(p);
    expect(metricasTriangulo(p, {}, e).deslizou_pecas).toBe(0);
    expect(metricasTriangulo(p, {}, { ...e, vistos: new Set(["deslizar"]) }).deslizou_pecas).toBe(1);
    const c = tri({ modo: "congruencia" });
    expect(metricasTriangulo(c, {}, { ...estadoInicial(c), vistos: new Set(["LLL", "LAL", "ALA", "AAA"]) }).testou_congruencia).toBe(4);
  });
  it("figura recusa $slider", () => {
    expect(GeometriaTrianguloFigura.safeParse({ modo: "razoes", angulo: "$t" }).success).toBe(false);
    expect(GeometriaTrianguloFigura.safeParse({ modo: "razoes", angulo: 30 }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos: object[] = [
    { modo: "pitagoras" },
    { modo: "pitagoras", c: 0 },
    { modo: "pitagoras", prova: true, chaves: ["deslizar"], deslizado: true },
    { modo: "pitagoras", diagonal: true, chaves: ["diagonal"] },
    { modo: "razoes", angulo: 30, k: 2, fantasma: 45, hip: 1.4142 },
    { modo: "metricas", comparar: true, highlight: ["c4"] },
    { modo: "metricas", catetos: [3, 4], apoio: 0 },
    { modo: "metricas", catetos: [3, 4], apoio: 1 },
    { modo: "cossenos", angulo: 120 },
    { modo: "senos", angulo: 30, posicao: 15 },
    { modo: "angulos", externo: true, chaves: ["fechar"], fechado: true },
    { modo: "angulos", alfa: 50, beta: 60 },
    { modo: "desigualdade", c: 2 },
    { modo: "desigualdade", c: 6 },
    { modo: "congruencia", ligada: "AAA" },
    { modo: "congruencia", ligada: "ALA" },
    { modo: "congruencia" },
    { modo: "notaveis", L: 3, fantasma: true },
    { modo: "notaveis", figura: "equilatero", L: 6, cortar: 1 },
    { modo: "notaveis", figura: "mediatriz", raio: 4 },
    { modo: "semelhanca", k: 0.5, giro: 15 },
    { modo: "semelhanca", variante: "tales" },
    { modo: "semelhanca", variante: "sombras", sobrepor: true },
  ];
  it.each(casos)("desenha sem erro: %j", (c) => {
    const r = GeometriaTrianguloFigura.safeParse(c);
    expect(r.success, r.success ? "" : r.error.message).toBe(true);
    expect(() => desenharTriangulo(ctx, 400, 360, [], r.data!, {}, estadoInicial(r.data!))).not.toThrow();
  });
  it("legenda da diagonal usa √2 e ≈ coerente (sem 1,41 = 7,07)", () => {
    const textos: string[] = [];
    const capCtx = new Proxy({} as Record<string, unknown>, {
      get: (_, k) =>
        k === "measureText"
          ? () => ({ width: 30 })
          : k === "fillText"
            ? (s: string) => textos.push(s)
            : () => undefined,
      set: () => true,
    }) as unknown as CanvasRenderingContext2D;
    const p = tri({ modo: "notaveis", figura: "quadrado", L: 5 });
    desenharTriangulo(capCtx, 400, 360, [], p, {}, estadoInicial(p));
    expect(textos.some((t) => t.includes("5√2 ≈ 7,07"))).toBe(true);
    expect(textos.some((t) => t.includes("1,41 ="))).toBe(false);
  });
  it("razoes com k fixo ocupa toda a largura disponível em vez de encolher por k_max", () => {
    const pFixo = tri({ modo: "razoes", angulo: 30, k: 1, hip: 5 });
    const pDin = tri({ modo: "razoes", angulo: 30, k: "$k", k_max: 3, hip: 5 });
    const gFixo = desenharTriangulo(ctx, 400, 360, [], pFixo, {}, estadoInicial(pFixo));
    const gDin = desenharTriangulo(ctx, 400, 360, [], pDin, { k: 1 }, estadoInicial(pDin));
    expect(gFixo.vista.k).toBeGreaterThan(gDin.vista.k * 2);
  });
  it("layoutRazoes mantém os 4 chips sem interseção e dentro do canvas para k mínimo e máximo", () => {
    const pDin = tri({ modo: "razoes", angulo: 45, k: "$k", k_max: 3, hip: 5, painel: true }) as TrianguloDe<"razoes">;
    const caMax = 15 * Math.cos(Math.PI / 4);
    const coMax = 15 * Math.sin(Math.PI / 4);
    const v = criarVista(400, 360, { x0: -caMax * 0.16, x1: caMax * 1.24, y0: -coMax * 0.18, y1: coMax * 1.22 }, 22);
    for (const k of [1, 3]) {
      const g = razoes(pDin, { k });
      const chips = layoutRazoes(v, { x: 0, y: 0 }, { x: g.ca, y: 0 }, { x: g.ca, y: g.co }, g, 400, 360);
      expect(chips).toHaveLength(4);
      for (const c of chips) {
        expect(c.box.x0).toBeGreaterThanOrEqual(0);
        expect(c.box.x1).toBeLessThanOrEqual(400);
        expect(c.box.y0).toBeGreaterThanOrEqual(0);
        expect(c.box.y1).toBeLessThanOrEqual(360);
      }
      for (let i = 0; i < chips.length; i++) {
        for (let j = i + 1; j < chips.length; j++) {
          const a = chips[i].box;
          const b = chips[j].box;
          const inter = a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
          expect(inter, `k=${k}: ${chips[i].id} e ${chips[j].id} se sobrepõem`).toBe(false);
        }
      }
    }
  });
  it("angulos com externo: true rotula β em B e mantém todos os chips dentro do canvas", () => {
    const textos: { t: string; x: number }[] = [];
    const capCtx = new Proxy({} as Record<string, unknown>, {
      get: (_, k) =>
        k === "measureText"
          ? () => ({ width: 32 })
          : k === "fillText"
            ? (t: string, x: number) => textos.push({ t, x })
            : () => undefined,
      set: () => true,
    }) as unknown as CanvasRenderingContext2D;
    const p = tri({ modo: "angulos", alfa: 50, beta: 40, externo: true });
    desenharTriangulo(capCtx, 372, 330, [], p, {}, estadoInicial(p));
    expect(textos.some((q) => q.t === "40°")).toBe(true);
    expect(textos.some((q) => q.t === "e = 140°")).toBe(true);
    for (const q of textos) {
      expect(q.x).toBeGreaterThan(15);
      expect(q.x).toBeLessThan(372 - 15);
    }
  });
});
