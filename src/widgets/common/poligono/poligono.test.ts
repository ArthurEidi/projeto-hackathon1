import { describe, expect, it } from "vitest";
import { angulosInternos, areaPol, estadoInicial, isometria, LETRA_F, malha, metricasPoligono, paralelas, pecasLadrilho, perimetroPol, poligono, regular } from "./calc";
import { afastamentoChipsS, aspectoPoligono, desenharPoligono } from "./desenho";
import { GeometriaPoligono, GeometriaPoligonoFigura, type PoligonoDe } from "./params";

const pol = (o: object) => GeometriaPoligono.parse(o);
const mal = (o: object, c = {}) => malha(pol({ modo: "malha", ...o }) as PoligonoDe<"malha">, c);

describe("malha: perímetro e área", () => {
  it("retângulo b × h: A = bh, P = 2(b + h); escala k multiplica a área por k²", () => {
    const g = mal({ b: "$b", h: "$h" }, { b: 4, h: 3 });
    expect([g.area, g.perimetro]).toEqual([12, 14]);
    expect(mal({ b: 1, h: 1 }).area).toBe(1);
    const a = mal({ b: 2, h: 3, k: "$k" }, { k: 1 });
    const b = mal({ b: 2, h: 3, k: "$k" }, { k: 3 });
    expect([a.area, a.perimetro]).toEqual([6, 10]);
    expect(b.area).toBe(9 * a.area);
    expect(b.perimetro).toBe(3 * a.perimetro);
    expect(b.razaoArea).toBe(9);
  });
  it("paralelogramo tem a área do retângulo bh, qualquer inclinação; cortar e encaixar forma o retângulo", () => {
    for (const inc of [0, 1, 2, 3]) {
      const g = mal({ forma: "paralelogramo", b: 4, h: 3, inc });
      expect(g.area).toBeCloseTo(12, 12);
      expect(g.perimetro).toBeCloseTo(8 + 2 * Math.hypot(inc, 3), 12);
    }
    const g = mal({ forma: "paralelogramo", b: 4, h: 3, inc: 2, cortar: 1 });
    expect(g.cortar).toBe(true);
    // O triângulo cortado e o movido têm a mesma área, e o retângulo resultante vale b·h.
    expect(areaPol(g.triCortado!)).toBeCloseTo(areaPol(g.triMovido!), 12);
    expect(areaPol([{ x: 2, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 3 }, { x: 2, y: 3 }])).toBe(12);
  });
  it("triângulo e trapézio: duas cópias formam um paralelogramo (A = bh/2 e (B + b)h/2)", () => {
    const t = mal({ forma: "triangulo", b: 4, h: 3, inc: 1, duplicar: 1 });
    expect(t.area).toBe(6);
    expect(t.areaUniao).toBe(12);
    expect(areaPol(t.copia!)).toBeCloseTo(6, 12);
    const z = mal({ forma: "trapezio", b: 4, B: 6, h: 3, inc: 1, duplicar: 1 });
    expect(z.area).toBe(15);
    expect(z.areaUniao).toBe(30);
    // O paralelogramo tem base B + b = 10 e altura 3.
    expect(10 * 3).toBe(z.areaUniao);
  });
});

describe("polígonos e quadriláteros", () => {
  it("n − 2 triângulos e soma dos internos (n − 2) · 180 para n de 3 a 12", () => {
    for (let n = 3; n <= 12; n++) {
      const g = poligono(pol({ modo: "poligono", n }) as PoligonoDe<"poligono">, {});
      expect(g.n).toBe(n);
      expect(g.triangulos).toBe(n - 2);
      expect(g.somaInternos).toBeCloseTo((n - 2) * 180, 9);
      expect(g.somaExternos).toBeCloseTo(360, 9);
      expect(angulosInternos(g.pts).every((a) => a > 0 && a < 180)).toBe(true);
    }
  });
  it("n pelo slider", () => {
    const p = pol({ modo: "poligono", n: "$n" }) as PoligonoDe<"poligono">;
    expect([3, 6].map((n) => poligono(p, { n }).triangulos)).toEqual([1, 4]);
  });
  it("paralelogramo, retângulo e losango: diagonais iguais e perpendiculares", () => {
    const p = pol({ modo: "poligono", quadrilatero: "$q" }) as PoligonoDe<"poligono">;
    const par = poligono(p, { q: 1 });
    const ret = poligono(p, { q: 2 });
    const los = poligono(p, { q: 3 });
    expect([par.diagonaisIguais, par.diagonaisPerpendiculares, par.ladosIguais]).toEqual([false, false, false]);
    expect([ret.diagonaisIguais, ret.diagonaisPerpendiculares, ret.ladosIguais]).toEqual([true, false, false]);
    expect([los.diagonaisIguais, los.diagonaisPerpendiculares, los.ladosIguais]).toEqual([false, true, true]);
    for (const g of [par, ret, los]) expect(areaPol(g.pts)).toBeGreaterThan(0);
  });
});

describe("polígonos regulares", () => {
  it("quadrado: externo 90, interno 90; hexágono: 60 e 120; octógono: 45 e 135", () => {
    const p = pol({ modo: "regular", n: "$n" }) as PoligonoDe<"regular">;
    expect([4, 6, 8].map((n) => [regular(p, { n }).externo, regular(p, { n }).interno])).toEqual([[90, 90], [60, 120], [45, 135]]);
    const g = regular(p, { n: 5 });
    expect(g.interno).toBe(108);
    expect(g.central).toBe(72);
    expect(g.externo + g.interno).toBe(180);
  });
  it("hexágono de raio R tem lado R e 6 triângulos equiláteros", () => {
    const g = regular(pol({ modo: "regular", n: 6, R: 4 }) as PoligonoDe<"regular">, {});
    expect(g.lado).toBeCloseTo(4, 12);
    expect(g.central).toBe(60);
    expect(perimetroPol(g.pts)).toBeCloseTo(24, 9);
  });
  it("ladrilho: pentágono deixa fresta de 36°; hexágono, triângulo e quadrado fecham 360°", () => {
    const p = pol({ modo: "regular", n: "$n", ladrilho: true }) as PoligonoDe<"regular">;
    const pent = regular(p, { n: 5 });
    expect([pent.cabem, pent.fresta, pent.fechado]).toEqual([3, 36, false]);
    for (const n of [3, 4, 6]) expect(regular(p, { n }).fechado).toBe(true);
    expect(regular(p, { n: 8 }).fechado).toBe(false);
    expect(pecasLadrilho(6)).toHaveLength(3);
    // Cada peça tem um vértice na origem e lado 1.
    for (const pc of pecasLadrilho(5)) {
      expect(pc.some((q) => Math.hypot(q.x, q.y) < 1e-9)).toBe(true);
      expect(perimetroPol(pc)).toBeCloseTo(5, 9);
    }
  });
});

describe("isometrias e homotetia", () => {
  it("rotação, translação e reflexão preservam área e perímetro", () => {
    expect(areaPol(LETRA_F)).toBeCloseTo(7.2, 12);
    const rot = isometria(pol({ modo: "isometria", angulo: "$angulo" }) as PoligonoDe<"isometria">, { angulo: 90 });
    expect(rot.areaImagem).toBeCloseTo(rot.area, 9);
    expect(rot.perimetroImagem).toBeCloseTo(rot.perimetro, 9);
    const tr = isometria(pol({ modo: "isometria", transformacao: "translacao", dx: 3, dy: -2 }) as PoligonoDe<"isometria">, {});
    expect(tr.imagem[0].x - tr.base[0].x).toBe(3);
    expect(tr.areaImagem).toBeCloseTo(tr.area, 12);
    const ref = isometria(pol({ modo: "isometria", transformacao: "reflexao", refletir: "$refletir" }) as PoligonoDe<"isometria">, { refletir: 1 });
    expect(ref.imagem[0].x).toBeCloseTo(-ref.base[0].x, 12);
    expect(ref.orientacaoTrocada).toBe(true);
    expect(isometria(pol({ modo: "isometria", transformacao: "reflexao", refletir: "$refletir" }) as PoligonoDe<"isometria">, { refletir: 0 }).orientacaoTrocada).toBe(false);
  });
  it("rotação de 180° leva o ponto a sua oposta", () => {
    const g = isometria(pol({ modo: "isometria", angulo: 180 }) as PoligonoDe<"isometria">, {});
    expect(g.imagem[0].x).toBeCloseTo(-g.base[0].x, 12);
    expect(g.imagem[0].y).toBeCloseTo(-g.base[0].y, 12);
  });
  it("homotetia: triângulo de base 2 e área 2; k = 2 dá área 8; k = −1 inverte e mantém a área", () => {
    const p = pol({ modo: "isometria", transformacao: "homotetia", figura: "triangulo", k: "$k" }) as PoligonoDe<"isometria">;
    const k1 = isometria(p, { k: 1 });
    expect([k1.area, k1.areaImagem]).toEqual([2, 2]);
    const k2 = isometria(p, { k: 2 });
    expect(k2.areaImagem).toBeCloseTo(8, 12);
    expect(k2.razaoArea).toBeCloseTo(4, 12);
    expect(k2.razaoLados).toBeCloseTo(2, 12);
    const kn = isometria(p, { k: -1 });
    expect(kn.areaImagem).toBeCloseTo(2, 12);
    expect(kn.imagem[0].x).toBe(-1);
    expect(metricasPoligono(p, { k: -1 }, estadoInicial(p)).invertido).toBe(1);
  });
});

describe("retas paralelas", () => {
  it("α e 180° − α: os oito ângulos são de dois valores só", () => {
    const p = pol({ modo: "paralelas", alfa: "$alfa" }) as PoligonoDe<"paralelas">;
    for (const alfa of [30, 60, 90, 120, 150]) {
      const g = paralelas(p, { alfa }, estadoInicial(p));
      for (const cz of [g.r, g.s]) {
        expect([cz.ne, cz.sw]).toEqual([alfa, alfa]);
        expect([cz.nw, cz.se]).toEqual([180 - alfa, 180 - alfa]);
        expect(cz.ne + cz.nw).toBe(180);
      }
      expect(g.paralelas).toBe(true);
      expect(g.X1.y).toBe(0);
      expect(g.X2.y).toBeCloseTo(-g.D, 12);
      // X2 está na transversal.
      expect(Math.atan2(-g.X2.y, -g.X2.x) * (180 / Math.PI)).toBeCloseTo(alfa, 9);
    }
  });
  it("girar s por Δ muda os correspondentes e tira do paralelismo", () => {
    const p = pol({ modo: "paralelas", alfa: 70, desvio: "$desvio" }) as PoligonoDe<"paralelas">;
    const g = paralelas(p, { desvio: 10 }, estadoInicial(p));
    expect(g.paralelas).toBe(false);
    expect(g.s.ne).toBe(60);
    expect(g.s.ne).not.toBe(g.r.ne);
    expect(metricasPoligono(p, { desvio: -10 }, estadoInicial(p)).desvio_paralela).toBe(10);
  });
  it("inclinou: 0 em α = 90°; deslizou_paralela vem da chave", () => {
    const p = pol({ modo: "paralelas", alfa: "$alfa", chaves: ["deslizar"] });
    const e = estadoInicial(p);
    expect(metricasPoligono(p, { alfa: 90 }, e).inclinou).toBe(0);
    expect(metricasPoligono(p, { alfa: 60 }, e).inclinou).toBe(1);
    expect(metricasPoligono(p, { alfa: 60 }, e).deslizou_paralela).toBe(0);
    expect(metricasPoligono(p, { alfa: 60 }, { ...e, vistos: new Set(["deslizar"]) }).deslizou_paralela).toBe(1);
  });
});

describe("figura e desenho", () => {
  it("figura recusa $slider", () => {
    expect(GeometriaPoligonoFigura.safeParse({ modo: "regular", n: "$n" }).success).toBe(false);
    expect(GeometriaPoligonoFigura.safeParse({ modo: "regular", n: 6 }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos: object[] = [
    { modo: "malha" },
    { modo: "malha", b: 1, h: 1, fantasma: [1, 1] },
    { modo: "malha", forma: "paralelogramo", inc: 2, cortar: 1 },
    { modo: "malha", forma: "triangulo", duplicar: 1 },
    { modo: "malha", forma: "trapezio", duplicar: 1, inc: 1 },
    { modo: "malha", b: 2, h: 3, k: 3, highlight: ["c1"] },
    { modo: "poligono", n: 6 },
    { modo: "poligono", n: 5, diagonais: false, externos: true, encolher: 50 },
    { modo: "poligono", n: 5, externos: true, encolher: 100 },
    { modo: "poligono", quadrilatero: 1 },
    { modo: "poligono", quadrilatero: 3 },
    { modo: "regular", n: 5 },
    { modo: "regular", n: 6, dividir: 1 },
    { modo: "regular", n: 5, ladrilho: true },
    { modo: "regular", n: 6, ladrilho: true },
    { modo: "isometria" },
    { modo: "isometria", angulo: 90 },
    { modo: "isometria", transformacao: "translacao", dx: 2, dy: 1 },
    { modo: "isometria", transformacao: "reflexao", refletir: 1 },
    { modo: "isometria", transformacao: "homotetia", figura: "triangulo", k: -1 },
    { modo: "isometria", transformacao: "painel" },
    { modo: "paralelas" },
    { modo: "paralelas", alfa: 65, destacar: "colaterais", rotulos: { "s-ne": "x" } },
    { modo: "paralelas", alfa: 60, foco: true },
    { modo: "paralelas", alfa: 60, destacar: "alternos", deslizar: 0.5 },
    { modo: "paralelas", alfa: 60, desvio: 10, fantasma: true },
    { modo: "paralelas", alfa: 90 },
    { modo: "paralelas", alfa: 150 },
    { modo: "paralelas", alfa: 25 },
  ];
  it.each(casos)("desenha sem erro: %j", (c) => {
    const r = GeometriaPoligonoFigura.safeParse(c);
    expect(r.success, r.success ? "" : r.error.message).toBe(true);
    expect(() => desenharPoligono(ctx, 400, 360, [], r.data!, {}, estadoInicial(r.data!))).not.toThrow();
  });
  it("esconde legendas e ângulos quando desabilitados para desafios", () => {
    const textos: string[] = [];
    const capCtx = new Proxy({} as Record<string, unknown>, {
      get: (_, k) =>
        k === "measureText"
          ? () => ({ width: 30 })
          : k === "fillText"
            ? (t: string) => textos.push(t)
            : () => undefined,
      set: () => true,
    }) as unknown as CanvasRenderingContext2D;
    for (const c of [
      { modo: "malha", forma: "trapezio", b: 4, B: 6, h: 3, mostrar: { area: false, perimetro: false } },
      { modo: "poligono", n: 5, diagonais: false, legenda: false },
      { modo: "regular", n: 8, mostrar: { central: false, externo: false, interno: false, legenda: false } },
      { modo: "paralelas", alfa: 65, destacar: "colaterais", rotulos: { "r-se": "x" }, legenda: false },
    ]) {
      textos.length = 0;
      const r = GeometriaPoligonoFigura.parse(c);
      desenharPoligono(capCtx, 400, 360, [], r, {}, estadoInicial(r));
      expect(textos.some((t) => /15|540°|135°|115°/.test(t))).toBe(false);
    }
  });
});

/** Contexto falso que guarda cada texto escrito e a face do chip (26 px de altura; fonte 900 16px ≈ 8,5 px por caractere). */
function espiao() {
  const textos: { t: string; x: number; y: number }[] = [];
  const larg = (t: string) => 8.5 * [...t].length;
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => {
      if (k === "measureText") return (t: string) => ({ width: larg(t) });
      if (k === "fillText") return (t: string, x: number, y: number) => textos.push({ t: String(t), x, y });
      return () => undefined;
    },
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const caixa = (q: { t: string; x: number; y: number }) => ({ x0: q.x - (larg(q.t) + 16) / 2, x1: q.x + (larg(q.t) + 16) / 2, y0: q.y - 13, y1: q.y + 13 });
  // Tolerância de 2 px para a largura estimada do texto (a sombra de 3 px sob o chip não conta).
  const cruzam = (a: ReturnType<typeof caixa>, b: ReturnType<typeof caixa>) => a.x0 + 2 < b.x1 && a.x1 - 2 > b.x0 && a.y0 + 2 < b.y1 && a.y1 - 2 > b.y0;
  return { ctx, textos, caixa, cruzam };
}

describe("paralelas com s inclinada (angulos-retas-paralelas p4, B27b, 16/11)", () => {
  it("desvio 0 não desloca nada (como antes)", () => {
    for (const k of ["ne", "nw", "sw", "se"] as const) {
      expect(afastamentoChipsS("s", k, 0)).toBe(0);
      expect(afastamentoChipsS("r", k, 20)).toBe(0);
    }
  });
  it.each([-20, -15, -10, -5, 5, 10, 15, 20])("desvio %i°: os 8 chips de ângulo não se cruzam", (desvio) => {
    const e = espiao();
    const p = pol({ modo: "paralelas", alfa: 70, desvio: "$desvio" });
    const w = 366;
    desenharPoligono(e.ctx, w, Math.round(w * aspectoPoligono(p)), [], p, { desvio }, estadoInicial(p));
    const chips = e.textos.filter((q) => q.t.endsWith("°") && !q.t.startsWith("s girou")).map(e.caixa);
    expect(chips).toHaveLength(8);
    for (let i = 0; i < chips.length; i++) for (let j = i + 1; j < chips.length; j++) expect(e.cruzam(chips[i], chips[j]), `chips ${i} e ${j}`).toBe(false);
  });
});

describe("paralelas: rótulo t fora dos chips e sem colisão entre chips (B38a)", () => {
  it.each([30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150])("α = %i°: t fora dos chips e 8 chips sem colisão", (alfa) => {
    const e = espiao();
    const p = pol({ modo: "paralelas", alfa: "$alfa", fantasma: true });
    const w = 366;
    desenharPoligono(e.ctx, w, Math.round(w * aspectoPoligono(p)), [], p, { alfa }, estadoInicial(p));
    const rotT = e.textos.find((q) => q.t === "t");
    expect(rotT).toBeDefined();
    // O rótulo t deve ser desenhado por último entre as etiquetas (por cima de tudo).
    const idxT = e.textos.findIndex((q) => q.t === "t");
    const ultimoChip = e.textos.reduce((acc, q, idx) => (q.t.endsWith("°") && !q.t.startsWith("α =") ? Math.max(acc, idx) : acc), -1);
    expect(idxT).toBeGreaterThan(ultimoChip);

    const chips = e.textos.filter((q) => q.t.endsWith("°") && !q.t.startsWith("α =")).map(e.caixa);
    expect(chips).toHaveLength(8);
    const caixaT = e.caixa(rotT!);
    for (let i = 0; i < chips.length; i++) {
      expect(e.cruzam(caixaT, chips[i]), `t cruza chip ${i} em α=${alfa}°`).toBe(false);
      for (let j = i + 1; j < chips.length; j++) {
        expect(e.cruzam(chips[i], chips[j]), `chips ${i} e ${j} cruzam em α=${alfa}°`).toBe(false);
      }
    }
  });
});
