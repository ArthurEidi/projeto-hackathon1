// Medidas de Dispersão · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("aritmetica/estatistica/medidas-de-dispersao/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-").replace(",", "."));
const media = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
const desvios = (v: number[]) => v.map((x) => x - media(v));
const variancia = (v: number[]) => media(desvios(v).map((d) => d * d));
const dp = (v: number[]) => Math.sqrt(variancia(v));
const ampl = (v: number[]) => Math.max(...v) - Math.min(...v);
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error();
  return s.params as { valores: (number | string)[]; grupo_b?: number[] };
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("espalhar: 5 ± s mantém a média 5 e com s = 2 cada nota está a 2 dela", () => {
    for (const s of [0, 1, 2, 3]) {
      const v = [5 - s, 5 - s, 5 + s, 5 + s];
      expect(media(v)).toBe(5);
      expect(dp(v)).toBe(s);
    }
    expect(params("espalhar").valores).toEqual(["5-$s", "5-$s", "5+$s", "5+$s"]);
  });

  it("amplitude-engana: A e B têm média 5, amplitude 8 e dispersões diferentes", () => {
    const p = params("amplitude-engana");
    const A = p.valores as number[];
    const B = p.grupo_b!;
    expect([media(A), media(B)]).toEqual([5, 5]);
    expect([ampl(A), ampl(B)]).toEqual([8, 8]);
    expect(dp(B)).toBeGreaterThan(dp(A));
  });

  it("desvios-somam-zero: 2, 4, 6, 8 têm desvios −3, −1, 1, 3", () => {
    const v = params("desvios-somam-zero").valores as number[];
    expect(desvios(v)).toEqual([-3, -1, 1, 3]);
    expect(desvios(v).reduce((a, b) => a + b, 0)).toBe(0);
  });

  it("quadrados: áreas 9, 1, 1, 9; variância 5; σ = √5 ≈ 2,2", () => {
    const v = params("quadrados").valores as number[];
    expect(desvios(v).map((d) => d * d)).toEqual([9, 1, 1, 9]);
    expect(variancia(v)).toBe(5);
    expect(dp(v)).toBeCloseTo(2.236, 3);
  });

  it("desafio: σ de 2 e 8 é 3 (variância 9, amplitude 6, soma dos desvios 0)", () => {
    expect([dp([2, 8]), variancia([2, 8]), ampl([2, 8])]).toEqual([3, 9, 6]);
    const s = passo(L, "desafio-dois-valores");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("3");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(ampl([3, 7, 10])).toBe(num(certa("amplitude")));
    expect(media([3, 7, 10])).toBeCloseTo(6.667, 3);
    expect(dp([5, 5, 5])).toBe(num(certa("dp-iguais")));
    expect(9 - 6).toBe(num(certa("um-desvio")));
    const a = [4, 5, 6];
    const b = [1, 5, 9];
    expect([media(a), media(b)]).toEqual([5, 5]);
    expect(dp(b)).toBeGreaterThan(dp(a));
    expect(certa("mais-disperso")).toBe("{1, 5, 9}");
  });

  it("médias", () => {
    expect(variancia([2, 4])).toBe(num(certa("variancia-2-4")));
    expect(Math.sqrt(16)).toBe(num(certa("dp-da-variancia")));
    const v = [1, 2, 6];
    expect(media(v)).toBe(3);
    expect(desvios(v).reduce((a, b) => a + b, 0)).toBe(0);
    expect(desvios(v).map((d) => d * d).reduce((a, b) => a + b, 0)).toBe(14);
    expect(certa("soma-dos-desvios")).toBe("0");
  });

  it("desafios", () => {
    expect(variancia([1, 3, 5])).toBeCloseTo(8 / 3, 12);
    expect(certa("variancia-1-3-5")).toBe("8/3");
    const base = [3, 6, 7, 10];
    expect(dp(base.map((x) => x + 10))).toBeCloseTo(dp(base), 12);
    expect(certa("somar-10")).toBe("Não muda");
    expect(dp(base.map((x) => 2 * x))).toBeCloseTo(2 * dp(base), 12);
    expect(variancia(base.map((x) => 2 * x))).toBeCloseTo(4 * variancia(base), 12);
    expect(certa("multiplicar-2")).toBe("Dobra");
    expect(0.5).toBeLessThan(2);
    expect(certa("mais-regular")).toBe("O de σ = 0,5");
    expect(dp([4, 6, 4, 6])).toBe(num(certa("dp-4-6-4-6")));
    expect(ampl([4, 6, 4, 6])).toBe(2);
  });

  it("vestibular: conta e fonte conferidas", () => {
    expect(1.5 / (1 / 10)).toBeCloseTo(15, 10);
    expect(num(certa("enem-2021-racao"))).toBe(15);
    const dpSacasHa = 90 / 60 / (30_000 / 10_000);
    expect(dpSacasHa).toBeCloseTo(0.5, 10);
    expect(dpSacasHa * dpSacasHa).toBeCloseTo(0.25, 10);
    expect(num(certa("enem-2012-cafe"))).toBe(0.25);
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
