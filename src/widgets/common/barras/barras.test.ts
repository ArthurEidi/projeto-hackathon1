import { describe, expect, it } from "vitest";
import { analisar, avaliarExpr, Expr } from "../expr";
import {
  caixa,
  desvioPadrao,
  desvios,
  limitePG,
  media,
  mediana,
  modas,
  posicoesQuartis,
  simplificar,
  somasParciais,
  sortear,
  termos,
  valorNaPosicao,
  variancia,
} from "./calc";
import { amostra, desenharBarras, inclinacao, parteTodo, regraResolvida, termosSequencia } from "./desenho";
import { Barras, BarrasFigura, type BarrasDe } from "./params";

describe("expressões com sliders (sem eval)", () => {
  it("números, sliders e as quatro operações com precedência", () => {
    expect(avaliarExpr(3, {})).toBe(3);
    expect(avaliarExpr("$n", { n: 4 })).toBe(4);
    expect(avaliarExpr("1/$m", { m: 4 })).toBe(0.25);
    expect(avaliarExpr("2*$k", { k: 3 })).toBe(6);
    expect(avaliarExpr("1+$t/100", { t: 10 })).toBeCloseTo(1.1, 12);
    expect(avaliarExpr("5-$s", { s: 2 })).toBe(3);
    expect(avaliarExpr("(2+$n)*2^2", { n: 1 })).toBe(12);
    expect(avaliarExpr("-$a", { a: 2 })).toBe(-2);
    expect(avaliarExpr("0,5*$x", { x: 4 })).toBe(2);
  });
  it("slider ausente vale 0; texto inválido é recusado pelo schema", () => {
    expect(avaliarExpr("$x+1", {})).toBe(1);
    expect(() => analisar("2+")).toThrow();
    expect(() => analisar("alert(1)")).toThrow();
    expect(Expr.safeParse("$a)").success).toBe(false);
    expect(Expr.safeParse("1/$m").success).toBe(true);
  });
});

describe("medidas de tendência central e dispersão", () => {
  it("média é o ponto de equilíbrio: desvios somam zero", () => {
    expect(media([2, 4, 6, 8])).toBe(5);
    expect(desvios([2, 4, 6, 8])).toEqual([-3, -1, 1, 3]);
    expect(desvios([3, 5, 5, 7, 8, 10]).reduce((s, d) => s + d, 0)).toBeCloseTo(0, 12);
    expect(inclinacao([2, 4, 6, 8], 5, 10)).toBe(0);
    expect(inclinacao([2, 4, 6, 8], 3, 10)).toBeGreaterThan(0);
  });
  it("mediana com quantidade ímpar e par; moda", () => {
    expect(mediana([8, 1, 12, 4, 6, 9, 3])).toBe(6);
    expect(mediana([3, 5, 5, 7, 8, 10])).toBe(6);
    expect(modas([3, 5, 5, 7, 8, 10])).toEqual([5]);
    expect(modas([1, 2, 3])).toEqual([]);
  });
  it("variância = quadrado médio dos desvios (9, 1, 1, 9 -> 5)", () => {
    expect(variancia([2, 4, 6, 8])).toBe(5);
    expect(desvioPadrao([2, 4, 6, 8])).toBeCloseTo(Math.sqrt(5), 12);
    // Mesmo centro, espalhamentos diferentes (grupos A e B do capítulo de dispersão).
    expect(media([1, 5, 5, 5, 9])).toBe(media([1, 1, 5, 9, 9]));
    expect(variancia([1, 1, 5, 9, 9])).toBeGreaterThan(variancia([1, 5, 5, 5, 9]));
  });
});

describe("quartis e boxplot (método das metades)", () => {
  it("posições em meio-índices", () => {
    expect(posicoesQuartis(7)).toEqual({ q1: 2, q2: 6, q3: 10 });
    expect(posicoesQuartis(6)).toEqual({ q1: 2, q2: 5, q3: 8 });
    expect(valorNaPosicao([3, 5, 5, 7, 8, 10], 5)).toBe(6);
  });
  it("fila 1, 3, 4, 6, 8, 9, 12: Q1 = 3, Q2 = 6, Q3 = 9, AIQ = 6, cerca em 18", () => {
    const c = caixa([1, 3, 4, 6, 8, 9, 12]);
    expect([c.q1, c.q2, c.q3, c.aiq, c.cercaAlta]).toEqual([3, 6, 9, 6, 18]);
    expect(c.atipicos).toEqual([]);
    expect([c.bigodeMin, c.bigodeMax]).toEqual([1, 12]);
  });
  it("passando de 18, o maior vira ponto isolado e o bigode encolhe", () => {
    const c = caixa([1, 3, 4, 6, 8, 9, 30]);
    expect(c.q3).toBe(9);
    expect(c.atipicos).toEqual([30]);
    expect(c.bigodeMax).toBe(9);
  });
});

describe("sequências", () => {
  it("PA soma d; PG multiplica por q; recorrência cobre as duas", () => {
    expect(termos(1, 2, 1, 4)).toEqual([1, 3, 5, 7]);
    expect(termos(1, 0, 2, 4)).toEqual([1, 2, 4, 8]);
    expect(termos(4, -2, 1, 5)[4]).toBe(-4); // a₅ = 4 + 4·(−2)
    expect(termos(1, 0, -1, 5)).toEqual([1, -1, 1, -1, 1]);
    expect(termos(1000, 0, 1.1, 3)).toEqual([1000, 1100, 1210]); // juros compostos 10%
  });
  it("regra pa ignora q; pg ignora d", () => {
    expect(regraResolvida({ regra: "pa", a1: 1, d: 2, q: 5 })).toEqual({ a1: 1, d: 2, q: 1 });
    expect(regraResolvida({ regra: "pg", a1: 1, d: 2, q: 5 })).toEqual({ a1: 1, d: 0, q: 5 });
  });
  it("somas parciais e limite da PG infinita", () => {
    expect(somasParciais([1, 3, 5, 7])).toEqual([1, 4, 9, 16]);
    expect(limitePG(1, 0.5)).toBe(2);
    expect(limitePG(1, 1)).toBeNaN();
  });
  it("widget: q = 1/m pelo slider e n acende até o índice", () => {
    const p = Barras.parse({ modo: "sequencia", regra: "pg", a1: 1, q: "1/$m", n: "$n", termos: 5 }) as BarrasDe<"sequencia">;
    const s = termosSequencia(p, { m: 2, n: 3 });
    expect(s.t).toEqual([1, 0.5, 0.25, 0.125, 0.0625]);
    expect(s.nAceso).toBe(3);
    expect(s.somas[2]).toBe(1.75);
  });
});

describe("parte e todo", () => {
  it("fração, % e equivalência com a referência", () => {
    const p = Barras.parse({ modo: "parte_todo", partes: "4*$k", pintadas: "2*$k", referencia: { partes: 4, pintadas: 2 } }) as BarrasDe<"parte_todo">;
    const r = parteTodo(p, { k: 3 });
    expect([r.partes, r.pintadas, r.porcento, r.equivalente]).toEqual([12, 6, 50, true]);
    expect(simplificar(6, 12)).toEqual([1, 2]);
  });
  it("1/2 + n/4 com quartos: (2 + n)/4", () => {
    const p = Barras.parse({ modo: "parte_todo", partes: 4, pintadas: "2+$n" }) as BarrasDe<"parte_todo">;
    expect(parteTodo(p, { n: 1 }).fracao).toBe(0.75);
  });
});

describe("amostragem reprodutível", () => {
  it("mesma semente e mesmo n: mesma amostra; contagens somam n", () => {
    expect(sortear([30, 70], 100, 1)).toEqual(sortear([30, 70], 100, 1));
    expect(sortear([30, 70], 137, 5).reduce((s, x) => s + x, 0)).toBe(137);
  });
  it("amostra grande fica perto da % real; viciada se afasta", () => {
    const p = Barras.parse({
      modo: "amostragem",
      populacao: [{ nome: "azul", pct: 30 }, { nome: "outras", pct: 70 }],
      vicio: { rotulo: "só no estádio", populacao: [80, 20] },
    }) as BarrasDe<"amostragem">;
    expect(Math.abs(amostra(p, 2000, false)[0] - 30)).toBeLessThan(4);
    expect(amostra(p, 2000, true)[0]).toBeGreaterThan(70);
  });
});

describe("schemas", () => {
  it("figura recusa slider; widget aceita", () => {
    const base = { modo: "sequencia", regra: "pa", a1: 1, d: "$d" };
    expect(Barras.safeParse(base).success).toBe(true);
    expect(BarrasFigura.safeParse(base).success).toBe(false);
    expect(BarrasFigura.safeParse({ ...base, d: 2, highlight: ["c3"] }).success).toBe(true);
  });
  it("modos dos planos validam", () => {
    const casos = [
      { modo: "categorias", categorias: [{ nome: "seg", valor: 20 }, { nome: "ter", valor: 40 }], tabela: true },
      { modo: "categorias", categorias: [{ nome: "A", valor: 50 }, { nome: "B", valor: 55 }], eixo_inicio: "$eixo", comparar: [0, 1] },
      { modo: "categorias", categorias: [{ nome: "x", valor: 25 }], tipos: ["barras", "setores"] },
      { modo: "pontos", valores: ["5-$s", "5-$s", "5+$s", "5+$s"], apoio: 5, mostrar: { desvios: true } },
      { modo: "pontos", valores: [2, 4, 6, 8], apoio: "arrastavel", apoio_inicial: 2 },
      { modo: "pontos", valores: [2, 4, 6, 8], chaves: ["quadrados", "somar"] },
      { modo: "fila", valores: [8, 1, 12, 4, 6, 9, 3], arrastaveis: ["q2"] },
      { modo: "fila", valores: [1, 3, 4, 6, 8, 9, 12], ordenada: true, caixa: true, maior_arrastavel: { ate: 40 } },
    ];
    for (const c of casos) expect(Barras.safeParse(c).success, JSON.stringify(c)).toBe(true);
  });
});

describe("desenho não quebra em nenhum modo", () => {
  // Contexto falso: aceita qualquer chamada; measureText devolve uma largura.
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const estados = [
    { modo: "categorias", categorias: [{ nome: "a", valor: 2 }, { nome: "b", valor: 3 }], tabela: true, comparar: [0, 1], eixo_inicio: 1 },
    { modo: "categorias", categorias: [{ nome: "a", valor: 2 }, { nome: "b", valor: 3 }], tipo: "setores" },
    { modo: "categorias", categorias: [{ nome: "a", valor: 2 }, { nome: "b", valor: 3 }], tipo: "linha", relativa: true },
    { modo: "amostragem", populacao: [{ nome: "x", pct: 30 }, { nome: "y", pct: 70 }], n: 50 },
    { modo: "pontos", valores: [2, 4, 6, 8], mostrar: { mediana: true, moda: true, desvios: true, quadrados: true, fila: true } },
    { modo: "pontos", valores: [1, 5, 5, 5, 9], grupo_b: [1, 1, 5, 9, 9], mostrar: { desvios: true } },
    { modo: "pontos", valores: [2, 4, 6, 8], mostrar: { soma_desvios: true } },
    { modo: "fila", valores: [1, 3, 4, 6, 8, 9, 30], ordenada: true, fixos: ["q1", "q2", "q3"], caixa: true },
    { modo: "sequencia", regra: "pg", a1: 1, q: 0.5, acumular: true, limite: true, fantasma: { regra: "pa", a1: 1 } },
    { modo: "sequencia", regra: "recorrencia", a1: 4, d: -2, q: -1, acesos: [3] },
    { modo: "sequencia", regra: "recorrencia2", a1: 1, a2: 1, p: 1, q: 1, termos: 6 },
    { modo: "categorias", categorias: [{ nome: "a", valor: 2 }, { nome: "b", valor: 5 }, { nome: "c", valor: 6 }], degraus: true },
    { modo: "pontos", valores: [8, 2, 4, 6], mostrar: { mediana: true, alerta_mediana: true, conta_media: true } },
    { modo: "parte_todo", partes: 4, pintadas: 6, todo: 8, referencia: { partes: 2, pintadas: 1 }, mostrar: { razao: true } },
  ];
  it.each(estados.map((e) => [e.modo, e] as const))("%s", (_, e) => {
    const p = Barras.parse(e);
    expect(() => desenharBarras(ctx, 400, 320, [], p, {}, { marcadores: { q2: 6 }, maior: 30 })).not.toThrow();
  });

  it("sequencia recorrencia2 (Fibonacci) gera aₙ₊₂ = p·aₙ₊₁ + q·aₙ", async () => {
    const { termos2 } = await import("./calc");
    expect(termos2(1, 1, 1, 1, 6)).toEqual([1, 1, 2, 3, 5, 8]);
    expect(termos2(2, 3, 2, -1, 5)).toEqual([2, 3, 4, 5, 6]);
  });
});
