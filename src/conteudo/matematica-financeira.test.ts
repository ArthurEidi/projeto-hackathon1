// Matemática Financeira · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("aritmetica/proporcionalidade/matematica-financeira/aula-01.json");
const certa = (id: string) => certaDe(L, id);
/** "R$ 133,10" -> 133.1 */
const reais = (s: string) => Number(s.replace("R$", "").trim().replace(/\./g, "").replace(",", "."));
const simples = (C: number, i: number, t: number) => C * (1 + i * t);
const composto = (C: number, i: number, t: number) => C * (1 + i) ** t;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído (sliders t começam em 0)", () => passosConcluiveis(L));

  it("caso-neutro: com t = 0 ou i = 0, M = C", () => {
    expect(composto(100, 0.1, 0)).toBe(100);
    expect(simples(100, 0.1, 0)).toBe(100);
    expect([0, 1, 2, 3].map((t) => composto(100, 0, t))).toEqual([100, 100, 100, 100]);
  });

  it("contraste-de-regras: simples a 10% rende 10 por período; M = 110 e 120", () => {
    expect(simples(100, 0.1, 1)).toBeCloseTo(110, 10);
    expect(simples(100, 0.1, 2)).toBeCloseTo(120, 10);
    const s = passo(L, "contraste-de-regras");
    if (s.type !== "interactive_canvas") throw new Error();
    const p = s.params as { regra: string; d: number; a1: number };
    expect([p.regra, p.a1, p.d]).toEqual(["pa", 100, 10]);
  });

  it("teste-de-fronteira: no composto o 2º juro é 11 (sobre 110) e o simples ainda rende 10", () => {
    expect(composto(100, 0.1, 1) * 0.1).toBeCloseTo(11, 10);
    expect(composto(100, 0.1, 2)).toBeCloseTo(121, 10);
    expect(simples(100, 0.1, 2)).toBeCloseTo(120, 10);
  });

  it("desafio: 100 → 110 → 121", () => {
    expect([0, 1, 2].map((t) => composto(100, 0.1, t))).toEqual([100, 110, 121].map((x) => expect.closeTo(x, 10)));
    const s = passo(L, "micro-desafio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(reais(s.options.find((o) => o.correct)!.label)).toBe(121);
    expect(s.options).toHaveLength(4);
    expect(composto(100, 0.1, 2)).toBeCloseTo(121, 10);
    expect(100 + 2 * 0.1 * 100).toBe(120); // juro simples
    expect(composto(100, 0.1, 1)).toBeCloseTo(110, 10); // parou no 1º período
    expect(100 * (1 + 0.1 ** 2)).toBeCloseTo(101, 10); // elevou só a taxa ao quadrado
    expect(s.options.map((o) => reais(o.label))).toEqual([121, 120, 110, 101]);
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(composto(100, 0.1, 0)).toBe(reais(certa("matematica-financeira-f1")));
    expect(0.1 * 100).toBe(reais(certa("matematica-financeira-f2")));
    expect(simples(100, 0.1, 2)).toBeCloseTo(reais(certa("matematica-financeira-f3")), 10);
    expect(composto(100, 0.1, 2)).toBeCloseTo(reais(certa("matematica-financeira-f4")), 10);
  });

  it("médias", () => {
    expect(200 * 0.05).toBe(reais(certa("matematica-financeira-m1")));
    expect(simples(50, 0.2, 3)).toBeCloseTo(reais(certa("matematica-financeira-m2")), 10);
    expect(simples(50, 0.2, 1)).toBeCloseTo(60, 10); // distrator: um período
    expect(composto(200, 0.05, 2)).toBeCloseTo(reais(certa("matematica-financeira-m3")), 10);
    expect(200 + 10 + 10).toBe(220);
  });

  it("desafios", () => {
    expect(composto(100, 0.1, 3)).toBeCloseTo(reais(certa("matematica-financeira-d1")), 10);
    expect(300 * 0.04 * 5).toBeCloseTo(reais(certa("matematica-financeira-d2")), 10);
    expect(300 * 0.04).toBeCloseTo(12, 10);
    expect(0.1 * composto(100, 0.1, 1)).toBeCloseTo(reais(certa("matematica-financeira-d3")), 10);
    expect(composto(100, 0.1, 2) - simples(100, 0.1, 2)).toBeCloseTo(reais(certa("matematica-financeira-d4")), 10);
    expect(composto(100, -0.1, 2)).toBeCloseTo(reais(certa("matematica-financeira-d5")), 10);
    expect(100 - 10 - 10).toBe(80);
  });

  it("vestibular: contas e fontes conferidas", () => {
    expect(((2 + 5.29) / 6 - 1) * 100).toBeCloseTo(21.5, 5);
    expect(certa("enem-2023-financiamento")).toBe("21,5%");
    expect(202 / 1.01 + 204.02 / 1.01 ** 2).toBeCloseTo(400, 10);
    expect(reais(certa("enem-2019-nota-fiscal"))).toBe(400);
    expect(1728 / 72).toBe(24);
    expect(Number(certa("enem-2018-parcelas"))).toBe(24);
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
