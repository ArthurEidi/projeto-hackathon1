// Logaritmos · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, raizes, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(readFileSync(join(import.meta.dirname, "../../content/algebra/funcoes/logaritmos/aula-01.json"), "utf8")),
);
const log = (b: number): CurvaResolvida => ({ tipo: "logaritmo", a: 1, b, c: 0 });
const exp = (b: number): CurvaResolvida => ({ tipo: "exponencial", a: 1, b, c: 0 });
/** log_b(x) = y  <=>  b^y = x */
const lg = (b: number, x: number) => avaliar(log(b), x);
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric } = s.complete_when;
      expect(s.controls.find((c) => c.id === metric)).toBeUndefined();
      expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
    }
  });

  it("volta-potencia: (3; 8) na exponencial e (8; 3) no log, alcançáveis com passo 1", () => {
    const s = step("volta-potencia");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(avaliar(exp(2), 3)).toBe(8);
    expect(lg(2, 8)).toBeCloseTo(3, 10);
    expect(s.complete_when.gte! % 1).toBe(0);
    expect(avaliar(exp(2), 3)).toBeLessThanOrEqual(9); // cabe na janela y = [−3, 9]
  });

  it("caso-neutro: a raiz de log₂ é x = 1, alcançável a partir de x = 4 com passo 0,5", () => {
    expect(raizes(log(2), -2, 10)).toEqual([1]);
    expect((4 - 1) % 0.5).toBe(0);
    expect(lg(2, 4)).not.toBe(0);
  });

  it("dominio-positivo: sem curva em x ≤ 0 e x = 0,5 é alcançável", () => {
    expect(Number.isNaN(lg(2, 0))).toBe(true);
    expect(Number.isNaN(lg(2, -1))).toBe(true);
    expect(lg(2, 0.5)).toBeCloseTo(-1, 10);
    const s = step("dominio-positivo");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.lte).toBe(0.5);
  });

  it("desafio: log₂(8) = 3", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(String(Math.round(lg(2, 8))));
    expect(s.options).toHaveLength(4);
    expect(2 ** 3).toBe(8);
    const errados = [8, 8 / 2, 2 ** 8]; // argumento como resposta; dividiu pela base; elevou 2 ao argumento
    expect(errados).toEqual([8, 4, 256]);
    for (const e of errados) expect(2 ** e).not.toBe(8);
    expect(lg(2, 4)).toBeCloseTo(2); // figura de "4": ponto (4; 2) do log
    expect(s.options.map((o) => o.label)).toEqual(["8", "3", "4", "256"]);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(Math.round(lg(2, 8))).toBe(Number(certa("f1-logaritmos")));
    expect(lg(5, 1)).toBe(Number(certa("f2-logaritmos")));
    expect(3 ** 2).toBe(9);
    expect(certa("f3-logaritmos")).toBe("3² = 9");
    expect(lg(2, 0.5)).toBeCloseTo(-1, 10); // 1/2 está no domínio
    expect(Number.isNaN(lg(2, 0))).toBe(true);
    expect(certa("f4-logaritmos")).toBe("1/2");
  });

  it("médias", () => {
    expect(lg(2, 4) + lg(2, 2)).toBeCloseTo(Number(certa("m1-logaritmos")), 10);
    expect(lg(2, 8)).toBeCloseTo(3, 10);
    expect(Number.isNaN(avaliar(log(1), 5))).toBe(true); // base 1 inválida
    expect(1 ** 7).toBe(1);
    expect(certa("m2-logaritmos")).toBe("1");
    expect(Math.round(lg(3, 27))).toBe(Number(certa("m3-logaritmos")));
  });

  it("desafios", () => {
    expect(lg(2, Number(certa("d1-logaritmos")))).toBeCloseTo(4, 10);
    expect(Math.round(lg(10, 0.1))).toBe(Number(certa("d2-logaritmos").replace("−", "-")));
    expect(Number.isNaN(lg(3, 2 - 2))).toBe(true); // x = 2 zera o argumento
    expect(lg(3, 2.5 - 2)).toBeDefined();
    expect(certa("d3-logaritmos")).toBe("x > 2");
    const x = 2 ** 3;
    expect(lg(2, 4 * x)).toBeCloseTo(Number(certa("d4-logaritmos")), 10);
    const x5 = Number(certa("d5-logaritmos"));
    expect(lg(3, x5) + lg(3, 3)).toBeCloseTo(2, 10);
    expect(lg(3, 9) + lg(3, 3)).not.toBeCloseTo(2, 5); // distrator 9
  });

  it("vestibular: gabaritos conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(1);
    // V1 ENEM 2019/137: 7 < -log10(x) < 8 => 10^-8 < x < 10^-7
    expect(-Math.log10(5e-8)).toBeGreaterThan(7);
    expect(-Math.log10(5e-8)).toBeLessThan(8);
    expect(certa("enem-2019-ph")).toBe("Entre 10⁻⁸ e 10⁻⁷");
  });
});
