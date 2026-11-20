import { describe, expect, it } from "vitest";
import {
  arvoreFatoracao,
  dividirInteiros,
  fatorarPrimos,
  formatarFatoracao,
  mdc,
  metricasGrupos,
  mmc,
} from "./calc";
import { desenharGrupos } from "./desenho";
import { Grupos, GruposFigura } from "./params";

describe("grupos_inteiros: divisao e fatoracao", () => {
  it("6 em grupos de 1 dá q=6, r=0; em grupos de 3 dá q=2, r=0; em grupos de 4 dá q=1, r=2", () => {
    expect(dividirInteiros(6, 1)).toEqual({ n: 6, d: 1, q: 6, r: 0, qTotal: 6, exata: true });
    expect(dividirInteiros(6, 3)).toEqual({ n: 6, d: 3, q: 2, r: 0, qTotal: 2, exata: true });
    expect(dividirInteiros(6, 4)).toEqual({ n: 6, d: 4, q: 1, r: 2, qTotal: 1, exata: false });
  });

  it("12 em grupos de 3 dá q=4, r=0; em grupos de 5 dá q=2, r=2", () => {
    expect(dividirInteiros(12, 3)).toEqual({ n: 12, d: 3, q: 4, r: 0, qTotal: 4, exata: true });
    expect(dividirInteiros(12, 5)).toEqual({ n: 12, d: 5, q: 2, r: 2, qTotal: 2, exata: false });
  });

  it("limite_grupos mostra erro de parar no 1º grupo (6 = 3·1 + 3)", () => {
    expect(dividirInteiros(6, 3, 1)).toEqual({ n: 6, d: 3, q: 1, r: 3, qTotal: 2, exata: true });
    expect(dividirInteiros(6, 3, 0)).toEqual({ n: 6, d: 3, q: 0, r: 6, qTotal: 2, exata: true });
  });

  it("fatora 4, 6 e 12 em primos e monta a árvore de 12 = 2·2·3", () => {
    expect(fatorarPrimos(4)).toEqual([2, 2]);
    expect(fatorarPrimos(6)).toEqual([2, 3]);
    expect(fatorarPrimos(12)).toEqual([2, 2, 3]);
    expect(formatarFatoracao(4)).toBe("2²");
    expect(formatarFatoracao(6)).toBe("2·3");
    expect(formatarFatoracao(12)).toBe("2²·3");
    expect(arvoreFatoracao(12)).toEqual([
      { valor: 12, esquerda: 2, direita: 6, direitaPrima: false },
      { valor: 6, esquerda: 2, direita: 3, direitaPrima: true },
    ]);
  });
});

describe("grupos_inteiros: mmc e mdc", () => {
  it("mmc(4, 6) = 12 e mdc(4, 6) = 2; restos só zeram em 12", () => {
    expect(mdc(4, 6)).toBe(2);
    expect(mmc(4, 6)).toBe(12);
    const p = Grupos.parse({ modo: "mmc", m: "$m", a: 4, b: 6 });
    expect(metricasGrupos(p, { m: 4 }).resto).toBe(4); // 4%4=0, 4%6=4
    expect(metricasGrupos(p, { m: 8 }).resto).toBe(2); // 8%4=0, 8%6=2
    expect(metricasGrupos(p, { m: 12 }).resto).toBe(0);
    expect(metricasGrupos(p, { m: 12 }).m).toBe(12);
  });

  it("figura estática recusa slider", () => {
    expect(GruposFigura.safeParse({ modo: "divisao", n: 6, d: "$d" }).success).toBe(false);
    expect(GruposFigura.safeParse({ modo: "divisao", n: 6, d: 3 }).success).toBe(true);
  });
});

describe("desenharGrupos", () => {
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 40 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;

  it("desenha os 3 modos sem erro", () => {
    const d = Grupos.parse({ modo: "divisao", n: 6, d: "$d", referencia_d: 1, highlight: ["c2"] });
    desenharGrupos(ctx, 368, 265, [], d, { d: 3 });

    const m = Grupos.parse({ modo: "mmc", m: "$m", a: 4, b: 6, highlight: ["c1"] });
    desenharGrupos(ctx, 368, 287, [], m, { m: 12 });

    const f = Grupos.parse({ modo: "fatoracao", n: 12, d: "$d", referencia_d: 3, highlight: ["c4"] });
    desenharGrupos(ctx, 368, 287, [], f, { d: 5 });
  });
});

function gravarCanvasGrupos() {
  const textos: string[] = [];
  const arcos: Array<{ x: number; y: number; r: number }> = [];
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => {
      if (k === "measureText") return (s: string) => ({ width: s.length * 7 });
      if (k === "fillText") return (texto: string) => textos.push(texto);
      if (k === "arc") return (x: number, y: number, r: number) => arcos.push({ x, y, r });
      return () => undefined;
    },
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  return { ctx, textos, arcos };
}

describe("correções da revisão B35 (grupos)", () => {
  it("mmc só exibe «MMC = m» quando m == mmc(a, b) (12 sim, 24 não)", () => {
    const p = Grupos.parse({ modo: "mmc", m: "$m", a: 4, b: 6 });

    const g12 = gravarCanvasGrupos();
    desenharGrupos(g12.ctx, 368, 287, [], p, { m: 12 });
    expect(g12.textos).toContain("MMC = 12");

    const g24 = gravarCanvasGrupos();
    desenharGrupos(g24.ctx, 368, 287, [], p, { m: 24 });
    expect(g24.textos).not.toContain("MMC = 24");
    expect(g24.textos.some((t) => /múltiplo comum/i.test(t))).toBe(true);
  });

  it("valida d inteiro positivo no schema, em dividirInteiros e no desenho após avaliar expressão", () => {
    expect(Grupos.safeParse({ modo: "divisao", n: 6, d: -3 }).success).toBe(false);
    expect(Grupos.safeParse({ modo: "divisao", n: 6, d: 2.5 }).success).toBe(false);
    expect(() => dividirInteiros(6, -3)).toThrow(RangeError);
    expect(() => dividirInteiros(6, 2.5)).toThrow(RangeError);

    const p = Grupos.parse({ modo: "divisao", n: 6, d: "$d" });
    const gNeg = gravarCanvasGrupos();
    desenharGrupos(gNeg.ctx, 368, 265, [], p, { d: -3 });
    expect(gNeg.textos).not.toContain("6 = 1·6 + 0");
    expect(gNeg.textos.some((t) => /inválid/i.test(t))).toBe(true);

    const gFrac = gravarCanvasGrupos();
    desenharGrupos(gFrac.ctx, 368, 265, [], p, { d: 2.5 });
    expect(gFrac.textos).not.toContain("6 = 3·2 + 0");
    expect(gFrac.textos.some((t) => /inválid/i.test(t))).toBe(true);
  });

  it("com n = d = 40 todas as fichas cabem dentro da largura de 368 px", () => {
    const g = gravarCanvasGrupos();
    const p = Grupos.parse({ modo: "divisao", n: 40, d: 40 });
    desenharGrupos(g.ctx, 368, 265, [], p, {});
    expect(g.arcos.length).toBe(40);
    for (const a of g.arcos) {
      expect(a.x - a.r).toBeGreaterThanOrEqual(0);
      expect(a.x + a.r).toBeLessThanOrEqual(368);
    }
  });

  it("fatoracao com mostrar_resto: false oculta o resto também na identidade do rodapé", () => {
    const g = gravarCanvasGrupos();
    const p = Grupos.parse({ modo: "fatoracao", n: 12, d: 5, mostrar_resto: false });
    desenharGrupos(g.ctx, 368, 287, [], p, {});
    expect(g.textos).not.toContain("12 = 5·2 + 2");
    expect(g.textos).not.toContain("r = 2");
    expect(g.textos).not.toContain("Sobra: r = 2");
  });

  it("fatoracao com n = 1 e n = 0 explica que não têm decomposição em fatores primos", () => {
    for (const n of [0, 1]) {
      const g = gravarCanvasGrupos();
      const p = Grupos.parse({ modo: "fatoracao", n, d: 1 });
      desenharGrupos(g.ctx, 368, 287, [], p, {});
      expect(g.textos).not.toContain(`${n} = `);
      expect(g.textos.some((t) => /não tem fatoração prima/i.test(t))).toBe(true);
    }
  });
});

it.each([[200, 200], [200, 7], [120, 1]])("contém as fichas de %i ÷ %i na área de desenho", (n, d) => {
  const w = 368;
  const h = 265;
  const g = gravarCanvasGrupos();
  desenharGrupos(g.ctx, w, h, [], Grupos.parse({ modo: "divisao", n, d }), {});
  expect(g.arcos.length).toBeGreaterThan(0);
  for (const { x, y, r } of g.arcos) {
    expect(x - r).toBeGreaterThanOrEqual(0);
    expect(x + r).toBeLessThanOrEqual(w);
    expect(y - r).toBeGreaterThanOrEqual(46);
    expect(y + r).toBeLessThanOrEqual(h - 48);
  }
  const omitidas = n - g.arcos.length;
  if (omitidas > 0) expect(g.textos).toContain(`+ ${omitidas} fichas`);
});

it("mostra m fracionário como inválido e invalida as métricas de conclusão", () => {
  const p = Grupos.parse({ modo: "mmc", a: 4, b: 6, m: "$m" });
  const ctl = { m: 11.5 };
  const g = gravarCanvasGrupos();
  desenharGrupos(g.ctx, 368, 287, [], p, ctl);
  expect(g.textos).toContain("m = 11,5");
  expect(g.textos).toContain("Total inválido: use inteiro ≥ 1");
  expect(g.arcos).toHaveLength(0);
  const metricas = metricasGrupos(p, ctl);
  for (const chave of Object.keys(metricasGrupos(p, { m: 12 }))) {
    expect(metricas[chave]).toBeNaN();
  }
});

it("eh_mmc distingue o MMC dos demais múltiplos comuns", () => {
  const p = Grupos.parse({ modo: "mmc", a: 4, b: 6, m: "$m" });
  expect(metricasGrupos(p, { m: 8 }).eh_mmc).toBe(0);
  expect(metricasGrupos(p, { m: 12 }).eh_mmc).toBe(1);
  expect(metricasGrupos(p, { m: 24 })).toMatchObject({ resto: 0, eh_mmc: 0 });
});
