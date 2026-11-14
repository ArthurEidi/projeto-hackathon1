import { describe, expect, it } from "vitest";
import { estadoInicial, fracaoPi, metricasCiclo, modeloCiclo, mod, quadranteDe, rotuloMarcoRad } from "./calc";
import { desenharCiclo } from "./desenho";
import { CicloTrigonometrico, CicloTrigonometricoFigura } from "./params";

const ciclo = (o: object = {}) => CicloTrigonometrico.parse(o);
const m = (o: object, c = {}, e?: Partial<ReturnType<typeof estadoInicial>>) => {
  const p = ciclo(o);
  return modeloCiclo(p, c, { ...estadoInicial(p), ...e });
};

describe("ângulo, radianos e quadrantes", () => {
  it("fração de π e conversões", () => {
    expect([30, 45, 60, 90, 120, 150, 180, 270, 360].map(fracaoPi)).toEqual(["π/6", "π/4", "π/3", "π/2", "2π/3", "5π/6", "π", "3π/2", "2π"]);
    expect(fracaoPi(0)).toBe("0");
    expect(fracaoPi(-90)).toBe("−π/2");
    expect(fracaoPi(57.2958)).toBe("1,00 rad");
  });
  it("1 rad ≈ 57,3° e 3 rad ≈ 171,9°", () => {
    expect(m({ rad: "$rad" }, { rad: 1 }).angulo).toBeCloseTo(57.29578, 4);
    expect(m({ rad: "$rad" }, { rad: 3 }).angulo).toBeCloseTo(171.887, 3);
    expect(m({ angulo: 180 }).rad).toBeCloseTo(Math.PI, 12);
  });
  it("quadrantes e voltas", () => {
    expect([10, 100, 190, 280, 370, -10].map(quadranteDe)).toEqual([1, 2, 3, 4, 1, 4]);
    expect(m({ angulo: 420 }).voltas).toBe(1);
    expect(m({ angulo: 420 }).ang).toBe(60);
    expect(m({ angulo: 359 }).voltas).toBe(0);
    expect(mod(-30, 360)).toBe(330);
  });
  it("arcos côngruos: 60° e 420° dão o mesmo ponto", () => {
    const a = m({ angulo: 60 });
    const b = m({ angulo: 420 });
    expect(a.sen).toBeCloseTo(b.sen, 12);
    expect(a.cos).toBeCloseTo(b.cos, 12);
  });
});

describe("seno, cosseno, tangente e identidades", () => {
  it("sen² + cos² = 1 e 30°: sen 1/2, cos √3/2, tg 1/√3", () => {
    for (const a of [0, 30, 45, 60, 100, 200, 330]) {
      const g = m({ angulo: a });
      expect(g.sen ** 2 + g.cos ** 2).toBeCloseTo(1, 12);
    }
    const g = m({ angulo: 30 });
    expect([g.sen, g.cos, g.tg]).toEqual([expect.closeTo(0.5, 12), expect.closeTo(Math.sqrt(3) / 2, 12), expect.closeTo(1 / Math.sqrt(3), 12)]);
  });
  it("tangente em 90° não existe e sec = 1/cos", () => {
    expect(m({ angulo: 90 }).tg).toBe(Infinity);
    expect(m({ angulo: 60 }).sec).toBeCloseTo(2, 12);
  });
  it("simetria: 150° tem o seno de 30° e o cosseno oposto", () => {
    const a = m({ angulo: 30 });
    const b = m({ angulo: 150 });
    expect(b.sen).toBeCloseTo(a.sen, 12);
    expect(b.cos).toBeCloseTo(-a.cos, 12);
  });
  it("quadrante com |sen| fixo em 0,6: cos² = 0,64 e sinal do cosseno", () => {
    const p = { quadrante: "$quad", seno_fixo: 0.6 };
    for (const q of [1, 2, 3, 4]) {
      const g = m(p, { quad: q });
      expect(g.quadrante).toBe(q);
      expect(Math.abs(g.sen)).toBeCloseTo(0.6, 12);
      expect(g.cos ** 2).toBeCloseTo(0.64, 12);
      expect(Math.sign(g.cos)).toBe(q === 1 || q === 4 ? 1 : -1);
    }
  });
});

describe("soma de arcos e arco duplo", () => {
  it("sen(α + β) não é sen α + sen β, mas é sen α cos β + cos α sen β", () => {
    const g = m({ soma: { alfa: 30, beta: "$beta" } }, { beta: 60 }).soma!;
    expect(g.senSoma).toBeCloseTo(1, 12);
    expect(g.somaSenos).toBeCloseTo(0.5 + Math.sqrt(3) / 2, 12);
    expect(g.senSoma).not.toBeCloseTo(g.somaSenos, 2);
    expect(g.bloco1 + g.bloco2).toBeCloseTo(g.senSoma, 12);
    expect(g.cosBloco1 - g.cosBloco2).toBeCloseTo(g.cosSoma, 12);
  });
  it("β = 0 é o caso neutro: sen(α + 0) = sen α", () => {
    const g = m({ soma: { alfa: 30, beta: 0 } }).soma!;
    expect(g.senSoma).toBeCloseTo(0.5, 12);
  });
  it("arco duplo: sen 2α = 2 sen α cos α; cos 2α = cos² − sen²", () => {
    const g = m({ soma: { alfa: "$alfa", beta: "$alfa" } }, { alfa: 30 });
    expect(g.angulo).toBe(60);
    expect(g.soma!.bloco1 + g.soma!.bloco2).toBeCloseTo(2 * Math.sin(Math.PI / 6) * Math.cos(Math.PI / 6), 12);
    expect(g.soma!.cosBloco1 - g.soma!.cosBloco2).toBeCloseTo(0.5, 12);
  });
});

describe("alvo e arco solução", () => {
  it("sen θ = 1/2: encontros em 30° e 150°, e 390° repete o ponto", () => {
    const p = { alvo: { seno: 0.5 }, angulo: "$angulo" };
    expect(m(p, { angulo: 0 }).alvo!.solucoes.map((x) => Math.round(x))).toEqual([30, 150]);
    expect(m(p, { angulo: 30 }).alvo!.noAlvo).toBe(true);
    expect(m(p, { angulo: 150 }).alvo!.noAlvo).toBe(true);
    expect(m(p, { angulo: 390 }).alvo!.noAlvo).toBe(true);
    expect(m(p, { angulo: 90 }).alvo!.noAlvo).toBe(false);
  });
  it("cos θ = 1/2: 60° e 300°", () => {
    expect(m({ alvo: { cosseno: 0.5 } }).alvo!.solucoes.map((x) => Math.round(x))).toEqual([60, 300]);
  });
  it("arco aberto (0°; 180°): 0 e 180 ficam fora; arco fechado [30°; 150°] inclui os extremos", () => {
    const aberto = { arco: { de: 0, ate: 180, abreDe: true, abreAte: true }, angulo: "$angulo" };
    expect([0, 30, 90, 150, 180, 210].map((a) => m(aberto, { angulo: a }).dentro)).toEqual([0, 1, 1, 1, 0, 0]);
    const fechado = { arco: { de: 30, ate: 150 }, angulo: "$angulo" };
    expect([0, 30, 90, 150, 180].map((a) => m(fechado, { angulo: a }).dentro)).toEqual([0, 1, 1, 1, 0]);
    expect(m(aberto, { angulo: 450 }).dentro).toBe(1);
  });
});

describe("métricas emitidas e figura", () => {
  it("quadrantes visitados, marcados e x_rad", () => {
    const p = ciclo({ angulo: 90, alvo: { seno: 0.5 } });
    const e = { ...estadoInicial(p), quadrantes: new Set([1, 2]), marcadas: new Set([0]) };
    const r = metricasCiclo(p, {}, e);
    expect(r.quadrantes).toBe(2);
    expect(r.solucoes_marcadas).toBe(1);
    expect(r.x_rad).toBeCloseTo(Math.PI / 2, 12);
    expect(r.voltas).toBe(0);
  });
  it("arrastar vale mais que o params", () => {
    const p = ciclo({ angulo: 10, arrastavel: true });
    expect(modeloCiclo(p, {}, { ...estadoInicial(p), angulo: 135 }).angulo).toBe(135);
  });
  it("figura recusa $slider", () => {
    expect(CicloTrigonometricoFigura.safeParse({ angulo: "$a" }).success).toBe(false);
    expect(CicloTrigonometricoFigura.safeParse({ angulo: 30 }).success).toBe(true);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos: object[] = [
    {},
    { angulo: 60, mostrar: { tangente: true, secante: true } },
    { angulo: 90, mostrar: { tangente: true } },
    { rad: 1, mostrar: { fita: true, seno: false, cosseno: false }, marcos_rad: [1, 2, 3] },
    { angulo: 420, fantasma: 60, mostrar: { voltas: true } },
    { angulo: 150, fantasma: 30, mostrar: { simetricos: true } },
    { angulo: 45, mostrar: { pitagorica: true } },
    { soma: { alfa: 30, beta: 30 }, blocos: 1 },
    { angulo: 30, alvo: { seno: 0.5 }, marcadas: [0, 1], arco: { de: 30, ate: 150, abreDe: false, abreAte: true } },
    { angulo: 120, grafico: "sen" },
    { angulo: 400, grafico: "cos", unidade: "graus" },
    { quadrante: 2, mostrar: { pitagorica: true } },
  ];
  it("marcos em radianos: múltiplos de π viram fração de π e demais têm até 2 casas", () => {
    expect(rotuloMarcoRad(0.5)).toBe("0,5 rad");
    expect(rotuloMarcoRad(0.8)).toBe("0,8 rad");
    expect(rotuloMarcoRad(1)).toBe("1 rad");
    expect(rotuloMarcoRad(1.05)).toBe("π/3");
    expect(rotuloMarcoRad(1.57)).toBe("π/2");
    expect(rotuloMarcoRad(3.14)).toBe("π");
    expect(rotuloMarcoRad(6.28)).toBe("2π");
    expect(rotuloMarcoRad(Math.PI / 6)).toBe("π/6");
  });
  it.each(casos)("desenha sem erro: %j", (c) => {
    const r = CicloTrigonometricoFigura.safeParse(c);
    expect(r.success, r.success ? "" : r.error.message).toBe(true);
    expect(() => desenharCiclo(ctx, 400, 360, [], r.data!, {}, estadoInicial(r.data!))).not.toThrow();
  });
});
