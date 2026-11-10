import { describe, expect, it } from "vitest";
import { desenharPlano } from "./desenhoPlano";
import { PlanoCartesiano, PlanoFigura } from "./params";
import {
  alturaDoPonto,
  anguloEntreRetas,
  assintotas,
  avaliar,
  avaliarSemFuro,
  coincidentes,
  encontros,
  fatorPorPasso,
  noDominio,
  periodo,
  perpendiculares,
  raizes,
  resolverCurva,
  vertice,
  type CurvaResolvida,
} from "./plot2d";

const curva = (c: object, ctl: Record<string, number> = {}) => resolverCurva(PlanoCartesiano.parse({ curvas: [c] }).curvas[0], ctl);

describe("tipos de curva novos", () => {
  it("raiz: √(x + 2) só existe para x ≥ −2", () => {
    const k = curva({ tipo: "raiz", a: 1, b: -2 });
    expect(avaliar(k, 2)).toBe(2);
    expect(avaliar(k, -3)).toBeNaN();
    // Equação irracional √(x + 2) = x: encontro em x = 2 (x = −1 é raiz estranha).
    expect(encontros(k, curva({ tipo: "afim", a: 1, b: 0 }), -3, 4)).toEqual([2]);
  });
  it("racional: 1/(x − 1) tem assíntotas x = 1 e y = 0, sem valor em x = 1", () => {
    const k = curva({ tipo: "racional", a: 1, b: 1 });
    expect(avaliar(k, 1)).toBeNaN();
    expect(avaliar(k, 2)).toBe(1);
    expect(assintotas(k)).toEqual({ x: 1, y: 0 });
    // 1/(x − 1) = 1 em x = 2.
    expect(encontros(k, curva({ tipo: "afim", a: 0, b: 1 }), -2, 4)).toEqual([2]);
  });
  it("cúbica e potência: raiz tripla de (x − 1)³", () => {
    expect(avaliar(curva({ tipo: "cubica", a: 1, b: 0, c: 1, d: 0 }), 2)).toBe(10);
    const k = curva({ tipo: "potencia", a: 1, b: 1, n: 3 });
    expect(avaliar(k, 3)).toBe(8);
    expect(raizes(k, -3, 4)).toEqual([1]);
    expect(avaliar(curva({ tipo: "potencia", a: 1, b: 0, n: 0.5 }), -1)).toBeNaN();
  });
  it("y = 6/x (inversamente proporcional): x·y constante", () => {
    const k = curva({ tipo: "racional", a: 6, b: 0 });
    for (const x of [1, 2, 3, 6]) expect(x * avaliar(k, x)).toBe(6);
  });
});

describe("transformação a·f(b·(x − h)) + k", () => {
  it("x² deslocada: f(x − 2) + 1 tem vértice (2; 1)", () => {
    const k = curva({ tipo: "quadratica", a: 1, transforma: { h: 2, k: 1 } });
    expect(avaliar(k, 2)).toBe(1);
    expect(vertice(k)).toEqual({ x: 2, y: 1 });
  });
  it("−2·f reflete e estica", () => {
    const k = curva({ tipo: "quadratica", a: 1, transforma: { a: -2 } });
    expect(avaliar(k, 1)).toBe(-2);
  });
  it("sliders entram na transformação", () => {
    const k = curva({ tipo: "racional", a: 1, transforma: { h: "$h", k: "$k" } }, { h: 2, k: -1 });
    expect(assintotas(k)).toEqual({ x: 2, y: -1 });
  });
  it("log com h: assíntota em x = h", () => {
    expect(assintotas(curva({ tipo: "logaritmo", a: 1, b: 2, transforma: { h: 1 } }))).toEqual({ x: 1 });
    expect(avaliar(curva({ tipo: "logaritmo", a: 1, b: 2, transforma: { h: 1 } }), 3)).toBeCloseTo(1, 12);
  });
});

describe("domínio, furos e por partes", () => {
  it("(x² − 1)/(x − 1) = x + 1 com furo em x = 1", () => {
    const k = curva({ tipo: "afim", a: 1, b: 1, furos: [1] });
    expect(avaliar(k, 1)).toBeNaN();
    expect(avaliarSemFuro(k, 1)).toBe(2);
    expect(avaliar(k, 0)).toBe(1);
  });
  it("extremos aberto e fechado", () => {
    const k = curva({ tipo: "afim", a: 2, dominio: { de: 0, abreDe: false } });
    expect(noDominio(k, 0)).toBe(true);
    expect(avaliar(k, -0.5)).toBeNaN();
    const k2 = curva({ tipo: "afim", a: 1, dominio: { ate: 0, abreAte: true } });
    expect(avaliar(k2, 0)).toBeNaN();
  });
  it("ponto em função por partes usa a primeira curva definida", () => {
    const p = PlanoCartesiano.parse({
      curvas: [
        { tipo: "afim", a: 1, dominio: { ate: 0, abreAte: true } },
        { tipo: "afim", a: 2, dominio: { de: 0 } },
      ],
      ponto: { curva: [0, 1] },
    });
    const ks = p.curvas.map((c) => resolverCurva(c, {}));
    expect(alturaDoPonto(ks, [0, 1], -2)).toEqual({ y: -2, curva: 0 });
    expect(alturaDoPonto(ks, [0, 1], 0)).toEqual({ y: 0, curva: 1 });
    expect(alturaDoPonto(ks, [0, 1], 3)).toEqual({ y: 6, curva: 1 });
    expect(alturaDoPonto(ks, null, 3)).toEqual({ y: 0, curva: -1 });
  });
  it("com domínio, raízes de afim deixam de ser exatas e respeitam o trecho", () => {
    expect(raizes(curva({ tipo: "afim", a: 1, b: -2, dominio: { ate: 1 } }), -5, 5)).toEqual([]);
  });
});

describe("retas: ângulo, perpendiculares e coincidentes", () => {
  const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
  it("m₁·m₂ = −1", () => {
    expect(perpendiculares(afim(2, 0), afim(-0.5, 3))).toBe(true);
    expect(perpendiculares(afim(2, 0), afim(0.5, 3))).toBe(false);
    expect(anguloEntreRetas(2, -0.5)).toBe(90);
    expect(anguloEntreRetas(1, 0)).toBe(45);
  });
  it("mesma reta", () => {
    expect(coincidentes(afim(2, 1), afim(2, 1))).toBe(true);
    expect(coincidentes(afim(2, 1), afim(2, 2))).toBe(false);
  });
});

describe("exponencial e periódicas", () => {
  it("anda 1, multiplica pela base (mesmo com c ≠ 0, medindo a partir da assíntota)", () => {
    expect(fatorPorPasso(curva({ tipo: "exponencial", a: 1, b: 2 }), 0)).toBe(2);
    expect(fatorPorPasso(curva({ tipo: "exponencial", a: 3, b: 0.5, c: 1 }), 2)).toBe(0.5);
    expect(assintotas(curva({ tipo: "exponencial", a: 1, b: 2, c: 1 }))).toEqual({ y: 1 });
  });
  it("seno com fase: a·sen(b·(x − fase)) + c; período 2π/b", () => {
    const k = curva({ tipo: "seno", a: 2, b: 2, c: 1, fase: Math.PI / 4 });
    expect(avaliar(k, Math.PI / 4)).toBeCloseTo(1, 12);
    expect(avaliar(k, Math.PI / 2)).toBeCloseTo(3, 12);
    expect(periodo(k)).toBeCloseTo(Math.PI, 12);
    expect(periodo(curva({ tipo: "afim" }))).toBeNaN();
  });
  it("vértice da quadrática: x = −b/2a", () => {
    expect(vertice(curva({ tipo: "quadratica", a: 1, b: -2, c: 0 }))).toEqual({ x: 1, y: -1 });
    expect(vertice(curva({ tipo: "afim", a: 1 }))).toBeNull();
  });
});

describe("schemas e desenho", () => {
  it("figura recusa slider nos campos novos", () => {
    expect(PlanoFigura.safeParse({ curvas: [{ tipo: "seno", fase: "$f" }] }).success).toBe(false);
    expect(PlanoFigura.safeParse({ curvas: [{ tipo: "seno", transforma: { h: "$h" } }] }).success).toBe(false);
    expect(PlanoFigura.safeParse({ curvas: [{ tipo: "afim" }], ponto: { curva: [0, 3] } }).success).toBe(false);
    expect(PlanoCartesiano.safeParse({ curvas: [{ tipo: "afim" }], ponto: { curva: null } }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos = [
    { curvas: [{ tipo: "quadratica", a: 1, b: -2 }], marcar: { vertice: true, eixo: true, raizes: true }, ponto: { x: 1 } },
    { curvas: [{ tipo: "exponencial", a: 1, b: 2 }], triangulo: { modo: "fator", x: 0 }, marcar: { assintota: true, base: true } },
    { curvas: [{ tipo: "logaritmo", a: 1, b: 2 }], guias: { diagonal: true }, ponto: { x: 2, espelho: true }, marcar: { assintota: true } },
    { curvas: [{ tipo: "afim", a: 2, b: 1 }, { tipo: "afim", a: -0.5, b: 0 }], marcar: { angulo: true, encontro: true, interceptoY: true } },
    { curvas: [{ tipo: "afim", a: 1, b: 1 }, { tipo: "afim", a: 1, b: 1 }], marcar: { angulo: true } },
    { curvas: [{ tipo: "racional", a: 1, b: 1 }, { tipo: "afim", a: 0, b: 1, cor: "ink" }], ponto: { curva: null, x: 0 } },
    { x: [0, 7], y: [0, 7], curvas: [{ tipo: "racional", a: 6, b: 0, dominio: { de: 0, abreDe: true } }], ponto: { x: 1, retangulo: true } },
    { x: [-1, 7], y: [-2, 4], curvas: [{ tipo: "seno", a: 2, b: 1, c: 1, fase: 1 }], marcar: { fase: true, periodo: true, faixa: true }, guias: { horizontais: [{ v: 3, rotulo: "pico" }] } },
    { curvas: [{ tipo: "afim", a: 1, dominio: { ate: 0, abreAte: true } }, { tipo: "afim", a: 2, dominio: { de: 0 } }], ponto: { curva: [0, 1], x: -1 } },
    { curvas: [{ tipo: "afim", a: 1, b: 1, furos: [1] }], assintotas: { x: [3], y: [-1] } },
  ];
  it.each(casos.map((c, i) => [i, c] as const))("caso %i desenha sem erro", (_, c) => {
    const p = PlanoCartesiano.parse(c);
    expect(() => desenharPlano(ctx, 400, 344, [], p, {}, { pontoX: 1, rastro: [0, 1] })).not.toThrow();
  });
});
