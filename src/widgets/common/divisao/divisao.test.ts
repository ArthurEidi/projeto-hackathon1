import { describe, expect, it } from "vitest";
import {
  avaliarPolinomio,
  dividirLonga,
  dividirPorConstante,
  formatarDivisorLinear,
  formatarPolinomio,
  formatarQuocienteParcial,
  metricasDivisao,
} from "./calc";
import { aspectoDivisao, desenharDivisao } from "./desenho";
import { gravadorCanvas } from "./gravadorCanvas";
import { DivisaoPolinomial, DivisaoPolinomialFigura } from "./params";

describe("divisao_polinomial: modo constante", () => {
  it("dividir x² − 1 por 1 mantém coeficientes e deixa resto 0; dividir por 2 divide pela metade", () => {
    const p1 = dividirPorConstante([1, 0, -1], 1);
    expect(p1.valido).toBe(true);
    expect(p1.quociente).toEqual([1, 0, -1]);
    expect(p1.resto).toBe(0);
    expect(formatarPolinomio(p1.quociente)).toBe("x² − 1");

    const p2 = dividirPorConstante([1, 0, -1], 2);
    expect(p2.valido).toBe(true);
    expect(p2.quociente).toEqual([0.5, 0, -0.5]);
    expect(p2.resto).toBe(0);
    expect(formatarPolinomio(p2.quociente)).toBe("0,5x² − 0,5");
  });

  it("divisor zero é proibido no schema e nas contas", () => {
    expect(dividirPorConstante([1, 0, -1], 0).valido).toBe(false);
    expect(DivisaoPolinomial.safeParse({ modo: "constante", d: 0 }).success).toBe(false);
    expect(DivisaoPolinomial.safeParse({ modo: "constante", d: "$d" }).success).toBe(true);
  });

  it("emite métrica d e resto = 0 a partir do slider", () => {
    const p = DivisaoPolinomial.parse({ modo: "constante", coeficientes: [1, 0, -1], d: "$d" });
    expect(metricasDivisao(p, { d: 1 })).toEqual({ d: 1, etapa: 0, resultado: 1, resto: 0 });
    expect(metricasDivisao(p, { d: 2 })).toEqual({ d: 2, etapa: 0, resultado: 1, resto: 0 });
  });
});

describe("divisao_polinomial: modo chave", () => {
  it("roteiro passo 3: x² − 1 dividido por x − 2 gera Q(x) = x + 2 e R = 3 = P(2)", () => {
    const res = dividirLonga([1, 0, -1], 2);
    expect(res.quociente).toEqual([1, 2]);
    expect(res.resto).toBe(3);
    expect(res.resto).toBe(avaliarPolinomio([1, 0, -1], 2));
    expect(formatarDivisorLinear(2)).toBe("x − 2");
    expect(formatarPolinomio(res.quociente)).toBe("x + 2");

    // Etapa 1: retira x(x − 2) = x² − 2x, sobra 2x − 1
    expect(res.etapas[0].termoQ).toBe(1);
    expect(res.etapas[0].produto).toEqual([1, -2, 0]);
    expect(res.etapas[0].restante).toEqual([2, -1]);
    expect(formatarPolinomio(res.etapas[0].produto)).toBe("x² − 2x");
    expect(formatarPolinomio(res.etapas[0].restante)).toBe("2x − 1");

    // Etapa 2: retira 2(x − 2) = 2x − 4, sobra 3
    expect(res.etapas[1].termoQ).toBe(2);
    expect(res.etapas[1].produto).toEqual([2, -4]);
    expect(res.etapas[1].restante).toEqual([3]);
    expect(formatarPolinomio(res.etapas[1].produto)).toBe("2x − 4");
  });

  it("x² − 1 por x − 1 tem quociente x + 1 e resto 0; x³ − 1 por x − 1 tem Q = x² + x + 1 e R = 0", () => {
    const r1 = dividirLonga([1, 0, -1], 1);
    expect(r1.quociente).toEqual([1, 1]);
    expect(r1.resto).toBe(0);
    expect(formatarPolinomio(r1.quociente)).toBe("x + 1");

    const r3 = dividirLonga([1, 0, 0, -1], 1);
    expect(r3.quociente).toEqual([1, 1, 1]);
    expect(r3.resto).toBe(0);
    expect(formatarPolinomio(r3.quociente)).toBe("x² + x + 1");
  });

  it("emite métricas etapa e resto corretamente", () => {
    const p = DivisaoPolinomial.parse({ modo: "chave", coeficientes: [1, 0, -1], r: 2, etapa: "$etapa" });
    // resto só aparece com a divisão terminada (revisão B35)
    expect(metricasDivisao(p, { etapa: 0 })).toEqual({ d: 0, etapa: 0, resultado: 0 });
    expect(metricasDivisao(p, { etapa: 2 })).toEqual({ d: 0, etapa: 2, resultado: 1, resto: 3 });
    // Limita ao máximo de etapas
    expect(metricasDivisao(p, { etapa: 5 })).toEqual({ d: 0, etapa: 2, resultado: 1, resto: 3 });
  });

  it("rejeita coeficiente líder zero e figura recusa $slider", () => {
    expect(DivisaoPolinomial.safeParse({ modo: "chave", coeficientes: [0, 1, -1] }).success).toBe(false);
    expect(DivisaoPolinomialFigura.safeParse({ modo: "chave", etapa: "$etapa" }).success).toBe(false);
    expect(DivisaoPolinomialFigura.safeParse({ modo: "constante", d: "$d" }).success).toBe(false);
    expect(DivisaoPolinomialFigura.safeParse({ modo: "chave", etapa: 2 }).success).toBe(true);
  });
});

describe("desenharDivisao", () => {
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 40 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;

  it("desenha todos os modos e etapas sem erro", () => {
    const c1 = DivisaoPolinomial.parse({ modo: "constante", coeficientes: [1, 0, -1], d: "$d", fantasma: true });
    desenharDivisao(ctx, 400, 352, [], c1, { d: 1 });
    desenharDivisao(ctx, 400, 352, [], c1, { d: 2 });

    const k = DivisaoPolinomial.parse({ modo: "chave", coeficientes: [1, 0, -1], r: 2, etapa: "$etapa" });
    desenharDivisao(ctx, 400, 256, [], k, { etapa: 0 });
    desenharDivisao(ctx, 400, 256, [], k, { etapa: 1 });
    desenharDivisao(ctx, 400, 256, [], k, { etapa: 2 });
  });
});

describe("formatarQuocienteParcial", () => {
  it("mantém o grau do termo já retirado (x² − 1 ÷ (x − 2), etapa 1 → x)", () => {
    const res = dividirLonga([1, 0, -1], 2);
    expect(res.quociente).toEqual([1, 2]);
    expect(formatarQuocienteParcial(res.quociente, 1)).toBe("x");
    expect(formatarQuocienteParcial(res.quociente, 2)).toBe("x + 2");
  });
  it("grau 3: x³ − 2x + 1 ÷ (x − 1), etapa 2 → x² + x", () => {
    const res = dividirLonga([1, 0, -2, 1], 1);
    expect(res.quociente).toEqual([1, 1, -1]);
    expect(formatarQuocienteParcial(res.quociente, 2)).toBe("x² + x");
  });
});

// Revisão B35 (19/11): cada teste reproduz um achado do docs/revisao/codigo-b33-codex.md.
describe("revisão B35: divisao", () => {
  const textos = (p: DivisaoPolinomial, ctl: Record<string, number>, w = 360) => {
    const g = gravadorCanvas();
    const h = Math.round(w * aspectoDivisao(p));
    desenharDivisao(g.ctx, w, h, [], p, ctl);
    return { ...g, w, h };
  };

  it("Média (resto anunciado cedo): com mostrar_resto = false nenhum texto diz o resto, em d = 1 nem em d = 2", () => {
    const p = DivisaoPolinomial.parse({ modo: "constante", coeficientes: [1, 0, -1], d: "$d", mostrar_resto: false });
    for (const d of [1, 2]) {
      const s = textos(p, { d }).textos.map((t) => t.s);
      expect(s.filter((t) => /resto 0|Resto = 0|\+ 0$/.test(t)), `d = ${d}`).toEqual([]);
      expect(s).toContain("Resto = ?");
    }
    // padrão continua mostrando
    const padrao = textos(DivisaoPolinomial.parse({ modo: "constante", d: "$d" }), { d: 2 }).textos.map((t) => t.s);
    expect(padrao).toContain("Resto = 0");
    expect(padrao).toContain("P(x) = 2 · (0,5x² − 0,5) + 0");
  });

  it("Média (zero exato): o que o schema aceita a conta divide, nos dois sinais; só 0 é proibido", () => {
    for (const d of [1e-12, -1e-12, 2, -2, 0]) {
      const aceito = DivisaoPolinomial.safeParse({ modo: "constante", d }).success;
      expect(dividirPorConstante([1, 0, -1], d).valido, `d = ${d}`).toBe(aceito);
    }
    expect(dividirPorConstante([1, 0, -1], 1e-12).quociente).toEqual([1e12, 0, -1e12]);
    expect(dividirPorConstante([1, 0, -1], -2).quociente).toEqual([-0.5, 0, 0.5]);
    expect(Object.is(dividirPorConstante([1, 0, -1], -2).quociente[1], -0)).toBe(false);
    expect(formatarPolinomio(dividirPorConstante([1, 0, -1], -2).quociente)).toBe("−0,5x² + 0,5");
  });

  it("Média (métrica de resultado): resto só existe quando o resultado está na tela", () => {
    const k = DivisaoPolinomial.parse({ modo: "chave", coeficientes: [1, 0, -1], r: 2, etapa: "$etapa" });
    expect(metricasDivisao(k, { etapa: 0 })).toEqual({ d: 0, etapa: 0, resultado: 0 });
    expect(metricasDivisao(k, { etapa: 1 })).toEqual({ d: 0, etapa: 1, resultado: 0 });
    expect(metricasDivisao(k, { etapa: 2 })).toEqual({ d: 0, etapa: 2, resultado: 1, resto: 3 });
    const c = DivisaoPolinomial.parse({ modo: "constante", d: "$d" });
    expect(metricasDivisao(c, { d: 0 })).toEqual({ d: 0, etapa: 0, resultado: 0 });
    expect(metricasDivisao(c, { d: 2 })).toEqual({ d: 2, etapa: 0, resultado: 1, resto: 0 });
  });

  it("Baixa (identidade): resto negativo sai com «−», não «+ −»", () => {
    const p = DivisaoPolinomial.parse({ modo: "chave", coeficientes: [1, 0, -5], r: 2, etapa: 2 });
    const s = textos(p, {}).textos.map((t) => t.s);
    expect(s).toContain("x² − 5 = (x − 2)(x + 2) − 1");
    expect(s.some((t) => t.includes("+ −"))).toBe(false);
  });

  it("Baixa (largura): com coeficientes de dois algarismos, todo texto cabe em 360 px e o dividendo não invade a chave", () => {
    const k = DivisaoPolinomial.parse({ modo: "chave", coeficientes: [-99, -99, -99, -99], r: 2, etapa: "$etapa" });
    for (const etapa of [0, 1, 2, 3]) {
      const { textos: ts, w } = textos(k, { etapa });
      for (const t of ts) {
        expect(t.esq, `${t.s} (etapa ${etapa})`).toBeGreaterThanOrEqual(0);
        expect(t.dir, `${t.s} (etapa ${etapa})`).toBeLessThanOrEqual(w);
      }
      const dividendo = ts.find((t) => t.s.startsWith("−99x³"))!;
      expect(dividendo.dir).toBeLessThanOrEqual(Math.round(w * 0.56) - 6);
    }
    const c = DivisaoPolinomial.parse({ modo: "constante", coeficientes: [-99, -99, -99, -99], d: 7 });
    const { textos: tc, w } = textos(c, {});
    for (const t of tc) expect(t.dir - t.esq, t.s).toBeLessThanOrEqual(w);
    for (const t of tc) expect(t.esq, t.s).toBeGreaterThanOrEqual(0);
  });
});

it.each(["chave", "rodapé"] as const)("encaixa quatro coeficientes longos (%s)", (regiao) => {
  const w = 400;
  const h = 368;
  const coeficientes = [12345678, -23456789, 34567890, -45678901];
  const p = DivisaoPolinomial.parse({ modo: "chave", coeficientes, r: 2, etapa: "$etapa" });
  const g = gravadorCanvas();
  desenharDivisao(g.ctx, w, h, [], p, { etapa: 3 });

  const dividendo = g.textos.find((t) => t.y === 32 && t.s.includes("12345678"))!;
  const identidade = g.textos.find((t) => t.y === h - 18 && t.s.includes("12345678"))!;
  const texto = regiao === "chave" ? dividendo : identidade;
  expect(texto.s).toContain("45678901");
  expect(texto.esq).toBeGreaterThanOrEqual(regiao === "chave" ? 22 : 8);
  expect(texto.dir).toBeLessThanOrEqual(regiao === "chave" ? 218 : 392);
});
