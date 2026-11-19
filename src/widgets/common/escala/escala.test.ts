// Testes do widget escala_decimal: contas puras (valores do roteiro), métricas e recusa de "$slider" na figura.
import { describe, expect, it } from "vitest";
import { estaNormalizado, metricasEscala, ordemDeGrandezaExp, quadroOrdens, resolverEstado, valorDe } from "./calc";
import { desenharEscala } from "./desenho";
import { EscalaDecimal, EscalaDecimalFigura } from "./params";

function gravarCanvas() {
  const textos: Array<{ texto: string; x: number; y: number }> = [];
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => {
      if (k === "measureText") return (s: string) => ({ width: s.length * 7 });
      if (k === "fillText") return (texto: string, x: number, y: number) => textos.push({ texto, x, y });
      return () => undefined;
    },
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  return { ctx, textos };
}

describe("contas puras do escala_decimal", () => {
  it("caso neutro e deslocamento por potências de 10 (passo 1)", () => {
    expect(valorDe(2, 0)).toBe(2);
    expect(valorDe(2, 1)).toBe(20);
    expect(valorDe(2, 2)).toBe(200);
    expect(valorDe(2, -1)).toBe(0.2);
    expect(valorDe(2, -2)).toBe(0.02);
  });

  it("normalização 1 ≤ a < 10 (passo 2)", () => {
    const p = EscalaDecimal.parse({ modo: "normalizar", valor: 20, n: "$n" });
    expect(metricasEscala(p, { n: 0 })).toMatchObject({ a: 20, n: 0, valor: 20, normalizado: 0 });
    expect(metricasEscala(p, { n: 1 })).toMatchObject({ a: 2, n: 1, valor: 20, normalizado: 1 });
    expect(metricasEscala(p, { n: 2 })).toMatchObject({ a: 0.2, n: 2, valor: 20, normalizado: 0 });
    expect(estaNormalizado(1)).toBe(true);
    expect(estaNormalizado(9.99)).toBe(true);
    expect(estaNormalizado(10)).toBe(false);
    expect(estaNormalizado(0.99)).toBe(false);
  });

  it("ordem de grandeza pelo corte √10 (passo 3: 300 -> 10², 400 -> 10³)", () => {
    expect(ordemDeGrandezaExp(2, 2)).toBe(2);
    expect(ordemDeGrandezaExp(3, 2)).toBe(2);
    expect(ordemDeGrandezaExp(Math.sqrt(10), 2)).toBe(3); // empate sobe
    expect(ordemDeGrandezaExp(4, 2)).toBe(3);

    const p = EscalaDecimal.parse({ modo: "ordem", a: "$a", n: 2 });
    expect(metricasEscala(p, { a: 3 })).toMatchObject({ a: 3, valor: 300, ordem_exp: 2 });
    expect(metricasEscala(p, { a: 4 })).toMatchObject({ a: 4, valor: 400, ordem_exp: 3 });
  });

  it("quadro de ordens posiciona os dígitos corretamente", () => {
    const cols200 = quadroOrdens(200);
    expect(cols200.map((c) => `${c.label}:${c.digito}`)).toEqual(["C:2", "D:0", "U:0", "d:", "c:"]);

    const cols002 = quadroOrdens(0.02);
    expect(cols002.map((c) => `${c.label}:${c.digito}${c.virgulaDepois ? "," : ""}`)).toEqual([
      "C:",
      "D:",
      "U:0,",
      "d:0",
      "c:2",
    ]);

    const cols2000 = quadroOrdens(2000);
    expect(cols2000[0]).toMatchObject({ label: "UM", digito: "2" });
  });

  it("resolverEstado avalia expressão de slider no modo potencia", () => {
    const p = EscalaDecimal.parse({ modo: "potencia", a: 2, n: "$n" });
    expect(resolverEstado(p, { n: 1 })).toMatchObject({ a: 2, n: 1, valor: 20, normalizado: true, ordemExp: 1 });
  });
});

describe("escala_decimal_figura", () => {
  it("aceita números puros", () => {
    expect(() => EscalaDecimalFigura.parse({ modo: "potencia", a: 2, n: 2 })).not.toThrow();
  });

  it('recusa "$slider" na figura estática', () => {
    expect(() => EscalaDecimalFigura.parse({ modo: "potencia", a: 2, n: "$n" })).toThrow();
    expect(() => EscalaDecimalFigura.parse({ modo: "normalizar", valor: 20, n: "$n" })).toThrow();
    expect(() => EscalaDecimalFigura.parse({ modo: "ordem", a: "$a", n: 2 })).toThrow();
  });
});

describe("correções da revisão B35 (escala)", () => {
  it("quadroOrdens deriva casas para extremos 20000 (a=2, n=4) e 0,0002 (a=2, n=−4)", () => {
    const colsGrande = quadroOrdens(valorDe(2, 4));
    expect(colsGrande.find((c) => c.exp === 4)).toMatchObject({ exp: 4, digito: "2" });
    expect(colsGrande.find((c) => c.exp === 0)).toMatchObject({ exp: 0, digito: "0" });

    const colsPequeno = quadroOrdens(valorDe(2, -4));
    expect(colsPequeno.find((c) => c.exp === 0)).toMatchObject({ exp: 0, digito: "0", virgulaDepois: true });
    expect(colsPequeno.find((c) => c.exp === -4)).toMatchObject({ exp: -4, digito: "2" });
  });

  it("normalizar calcula o coeficiente de referência para n_ref != 0 (valor=20, n_ref=1 -> 2·10¹)", () => {
    const { ctx, textos } = gravarCanvas();
    const p = EscalaDecimal.parse({ modo: "normalizar", valor: 20, n: 0, n_ref: 1 });
    desenharEscala(ctx, 368, 287, [], p, {});
    const lista = textos.map((t) => t.texto);
    expect(lista).toContain("Referência: 2·10¹");
    expect(lista).not.toContain("Referência: 20·10¹");
  });

  it("potencia expande o eixo quando n resolvido sai de faixa_n (faixa [-2, 2], n = 3)", () => {
    const { ctx, textos } = gravarCanvas();
    const p = EscalaDecimal.parse({ modo: "potencia", a: 2, n: "$n", faixa_n: [-2, 2] });
    desenharEscala(ctx, 368, 287, [], p, { n: 3 });
    const regua = textos.filter((t) => t.y > 180);
    const marca102 = regua.find((t) => t.texto === "10²");
    const marca103 = regua.find((t) => t.texto === "10³");
    const rotuloAtivo = regua.find((t) => t.texto === "2·10³");
    expect(marca103).toBeDefined();
    expect(rotuloAtivo).toBeDefined();
    expect(marca102).toBeDefined();
    expect(rotuloAtivo!.x).toBeCloseTo(marca103!.x, 1);
    expect(Math.abs(rotuloAtivo!.x - marca102!.x)).toBeGreaterThan(20);
  });

  it("estaNormalizado aplica 1 ≤ a < 10 nos vizinhos dos limites", () => {
    expect(estaNormalizado(0.9999999995)).toBe(false);
    expect(estaNormalizado(1)).toBe(true);
    expect(estaNormalizado(9.9999999995)).toBe(true);
    expect(estaNormalizado(10)).toBe(false);
  });
});
