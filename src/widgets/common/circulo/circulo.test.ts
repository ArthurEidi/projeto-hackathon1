import { describe, expect, it } from "vitest";
import { arcos, estadoInicial, fatias, metricasCirculo, roda, setoresRearranjados } from "./calc";
import { aspectoCirculo, desenharCirculo } from "./desenho";
import { GeometriaCirculo, GeometriaCirculoFigura, type CirculoDe } from "./params";

const circ = (o: object) => GeometriaCirculo.parse(o);
const arc = (o: object, c = {}, e = estadoInicial()) => arcos(circ({ modo: "arcos", ...o }) as CirculoDe<"arcos">, c, e);
const rod = (o: object, c = {}) => roda(circ({ modo: "roda", ...o }) as CirculoDe<"roda">, c);
const fat = (o: object, c = {}) => fatias(circ({ modo: "fatias", ...o }) as CirculoDe<"fatias">, c);
const areaPol = (pts: { x: number; y: number }[]) => Math.abs(pts.reduce((s, p, i) => s + (p.x * pts[(i + 1) % pts.length].y - pts[(i + 1) % pts.length].x * p.y), 0)) / 2;

describe("arcos e ângulos", () => {
  it("o inscrito vale a metade do central, com V no arco maior", () => {
    for (const alfa of [40, 80, 100, 120, 160]) {
      const g = arc({ alfa: "$alfa", mostrar: { inscrito: true } }, { alfa });
      expect(g.central).toBe(alfa);
      expect(g.inscrito).toBeCloseTo(alfa / 2, 9);
      expect(g.vNoArco).toBe(false);
      expect(g.razao).toBeCloseTo(2, 9);
    }
  });
  it("V passeia pela borda: no arco maior o inscrito é α/2; no arco menor é 180° − α/2", () => {
    const p = { alfa: 100, pos_v: "$pos_v" };
    for (const pos of [120, 180, 240, 300]) expect(arc(p, { pos_v: pos }).inscrito).toBeCloseTo(50, 9);
    for (const pos of [20, 50, 80]) {
      const g = arc(p, { pos_v: pos });
      expect(g.vNoArco).toBe(true);
      expect(g.inscrito).toBeCloseTo(130, 9);
      expect(g.arcoVisto).toBe(260);
    }
  });
  it("diâmetro: α = 180° dá inscrito de 90° (ângulo reto)", () => {
    const g = arc({ alfa: 180, pos_v: 90 });
    expect(g.inscrito).toBeCloseTo(90, 9);
    expect(g.reto).toBe(true);
    expect(arc({ alfa: 160 }).reto).toBe(false);
    // A e B opostos: a corda passa pela origem.
    expect(g.A.x + g.B.x).toBeCloseTo(0, 12);
    expect(g.A.y + g.B.y).toBeCloseTo(0, 12);
  });
  it("arrastar vale mais que o params", () => {
    const g = arc({ alfa: 80 }, {}, { ...estadoInicial(), alfa: 130, posV: 270 });
    expect([g.alfa, g.posV]).toEqual([130, 270]);
    expect(g.inscrito).toBeCloseTo(65, 9);
  });
  it("inscrito sem V explícito: V no meio do arco maior", () => {
    expect(arc({ alfa: 60, inicio: 20 }).posV).toBeCloseTo(230, 9);
  });
});

describe("comprimento", () => {
  it("C = πd e C/d = π para qualquer diâmetro", () => {
    for (const d of [1, 2, 3, 4]) {
      const g = rod({ variante: "razao", d: "$d" }, { d });
      expect(g.C).toBeCloseTo(Math.PI * d, 12);
      expect(g.razao).toBeCloseTo(Math.PI, 12);
    }
  });
  it("a roda de d = 1 anda π em uma volta e a metade em meia volta", () => {
    expect(rod({ giro: 360 }).rolado).toBeCloseTo(Math.PI, 12);
    expect(rod({ giro: 180 }).rolado).toBeCloseTo(Math.PI / 2, 12);
    expect(rod({ giro: "$giro" }, { giro: 0 }).rolado).toBe(0);
  });
  it("comprimento do arco: r = 3: volta de 6π; 90° dá 3π/2", () => {
    const g = rod({ variante: "arco", r: 3, alfa: "$alfa" }, { alfa: 360 });
    expect(g.comprimentoArco).toBeCloseTo(6 * Math.PI, 12);
    expect(rod({ variante: "arco", r: 3, alfa: 90 }).comprimentoArco).toBeCloseTo(1.5 * Math.PI, 12);
    expect(rod({ variante: "arco", r: 3, alfa: 360 }).voltaCompleta).toBeCloseTo(18.84955592, 6);
  });
  it("voltas: n voltas de uma roda de 1 m percorrem n · π m", () => {
    const g = rod({ variante: "voltas", voltas: "$voltas", unidade: "m" }, { voltas: 10 });
    expect(g.percurso).toBeCloseTo(10 * Math.PI, 12);
    expect(g.C).toBeCloseTo(3.14159, 4);
  });
});

describe("área", () => {
  it("setores rearranjados preenchem a área do disco (ou tendem a ela)", () => {
    const r = 4;
    for (const N of [4, 8, 16, 24]) {
      const soma = setoresRearranjados(r, N, 64).reduce((s, pts) => s + areaPol(pts), 0);
      // Cada setor vale πr²/N, então a soma não muda com o rearranjo.
      expect(soma).toBeCloseTo(Math.PI * r * r, 1);
    }
  });
  it("a base do arranjo tende a πr e a razão sobe com N", () => {
    const rz = [4, 8, 16, 24, 360].map((N) => fat({ N, r: 4 }).razaoBase);
    for (let i = 1; i < rz.length; i++) expect(rz[i]).toBeGreaterThan(rz[i - 1]);
    expect(rz[rz.length - 1]).toBeGreaterThan(0.9999);
    expect(rz[0]).toBeLessThan(1);
    expect(fat({ N: 24, r: 4 }).baseEfetiva).toBeCloseTo(Math.PI * 4, 1);
  });
  it("setores vizinhos dividem um raio: a largura do arranjo é (N + 1) · r · sen(180°/N)", () => {
    const pecas = setoresRearranjados(4, 8);
    expect(pecas).toHaveLength(8);
    const xs = pecas.flat().map((q) => q.x);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(fat({ N: 8, r: 4 }).larguraArranjo + 4 * 2);
  });
  it("setor de α = 60° em r = 6: 6π (1/6 de 36π); volta inteira 36π", () => {
    const p = { variante: "setor", r: 6, alfa: "$alfa" };
    expect(fat(p, { alfa: 60 }).coefSetor).toBeCloseTo(6, 12);
    expect(fat(p, { alfa: 360 }).coefSetor).toBeCloseTo(36, 12);
    expect(fat(p, { alfa: 60 }).areaSetor).toBeCloseTo(6 * Math.PI, 12);
    expect(fat({ variante: "setor", r: 4, alfa: 90 }).coefSetor).toBe(4);
  });
  it("coroa R = 5: furo 0 dá 25π e furo 3 dá 16π", () => {
    const p = { variante: "coroa", R: 5, furo: "$r_int" };
    expect(fat(p, { r_int: 0 }).coefCoroa).toBe(25);
    expect(fat(p, { r_int: 3 }).coefCoroa).toBe(16);
    expect(fat(p, { r_int: 3 }).areaCoroa).toBeCloseTo(16 * Math.PI, 12);
  });
});

describe("métricas e figura", () => {
  it("métricas por modo", () => {
    const a = circ({ modo: "arcos", alfa: 100, mostrar: { inscrito: true } });
    const m = metricasCirculo(a, {}, estadoInicial());
    expect(m.central).toBe(100);
    expect(m.inscrito).toBeCloseTo(50, 9);
    const r = circ({ modo: "roda", giro: 720 });
    expect(metricasCirculo(r, {}, estadoInicial()).voltas).toBe(2);
    expect(metricasCirculo(r, {}, estadoInicial()).rastro).toBeCloseTo(2 * Math.PI, 12);
  });
  it("figura recusa $slider", () => {
    expect(GeometriaCirculoFigura.safeParse({ modo: "arcos", alfa: "$a" }).success).toBe(false);
    expect(GeometriaCirculoFigura.safeParse({ modo: "arcos", alfa: 70 }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos: object[] = [
    { modo: "arcos" },
    { modo: "arcos", alfa: 100, mostrar: { inscrito: true, corda: true, isosceles: true }, arrastaveis: ["B", "V"] },
    { modo: "arcos", alfa: 180, pos_v: 90, mostrar: { inscrito: true, corda: true } },
    { modo: "arcos", alfa: 0, mostrar: { medidas: false } },
    { modo: "roda" },
    { modo: "roda", giro: 270 },
    { modo: "roda", giro: 360, unidade: "m" },
    { modo: "roda", variante: "razao", d: 3 },
    { modo: "roda", variante: "arco", r: 3, alfa: 90 },
    { modo: "roda", variante: "voltas", voltas: 4, unidade: "m" },
    { modo: "fatias" },
    { modo: "fatias", N: 24, r: 4 },
    { modo: "fatias", variante: "setor", r: 6, alfa: 60 },
    { modo: "fatias", variante: "setor", r: 6, alfa: 360 },
    { modo: "fatias", variante: "coroa", R: 5, furo: 3 },
    { modo: "fatias", variante: "coroa", R: 5, furo: 0 },
  ];
  it.each(casos)("desenha sem erro: %j", (c) => {
    const r = GeometriaCirculoFigura.safeParse(c);
    expect(r.success, r.success ? "" : r.error.message).toBe(true);
    expect(() => desenharCirculo(ctx, 400, 360, [], r.data!, {}, estadoInicial())).not.toThrow();
  });
  it("voltas usa π e ≈ na legenda em vez de 3,14 = e fatias divide legenda em 2 linhas", () => {
    const textos: string[] = [];
    const spyCtx = new Proxy({} as Record<string, unknown>, {
      get: (_, k) => {
        if (k === "measureText") return () => ({ width: 30 });
        if (k === "fillText") return (t: string) => textos.push(t);
        return () => undefined;
      },
      set: () => true,
    }) as unknown as CanvasRenderingContext2D;

    const pVoltas = GeometriaCirculoFigura.parse({ modo: "roda", variante: "voltas", voltas: 10, unidade: "m" });
    desenharCirculo(spyCtx, 400, Math.round(400 * aspectoCirculo(pVoltas)), [], pVoltas, {}, estadoInicial());
    expect(textos.some((t) => t.includes("10 · π ≈ 31,42 m"))).toBe(true);
    expect(textos.some((t) => t.includes("3,14 ="))).toBe(false);

    textos.length = 0;
    const pDisco = GeometriaCirculoFigura.parse({ modo: "fatias", N: 16, r: 4 });
    desenharCirculo(spyCtx, 400, Math.round(400 * aspectoCirculo(pDisco)), [], pDisco, {}, estadoInicial());
    expect(textos).toContain("16 setores: base ≈ πr, altura r");
    expect(textos).toContain("área ≈ πr · r = πr² = 16π");
  });
});
