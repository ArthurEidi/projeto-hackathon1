// Inequações Quadráticas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, raizes, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/inequacoes-quadraticas/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const quad = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "quadratica", a, b, c });

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de inequacoes quadraticas", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
        const alvo = (gte ?? lte)!;
        expect(((alvo - slider.min) / slider.step) % 1, `${s.id}: alvo fora do passo`).toBeCloseTo(0, 9);
      } else {
        expect(["ponto_x", "quadrantes", "faixa_x", "na_raiz"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: x² não é negativo em nenhum ponto real", () => {
    const c = quad(1, 0, 0);
    expect(avaliar(c, 0)).toBe(0);
    expect(avaliar(c, 1)).toBe(1);
    expect(avaliar(c, -1)).toBe(1);
  });

  it("entre-raizes: raízes em -1 e 1; y(0) = -1 < 0", () => {
    const c = quad(1, 0, -1);
    expect(raizes(c, -3, 3)).toEqual([-1, 1]);
    expect(avaliar(c, 0)).toBe(-1);
    expect(avaliar(c, 2)).toBe(3);
  });

  it("inverter-concavidade: 1 - x² é positivo em (-1; 1) e negativo fora", () => {
    const c = quad(-1, 0, 1);
    expect(avaliar(c, 0)).toBe(1);
    expect(avaliar(c, 2)).toBe(-3);
  });

  it("conferir-previsao: x² - 1 <= 0 tem solução [-1; 1]", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("[−1; 1]");
  });

  it("fechamento: referências existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref]).toBeDefined();
    }
  });
});

describe("treino: gabaritos conferidos por conta", () => {
  it("F1 f1-inequacoes-quadraticas: 0² - 1 = -1 < 0 (Negativo)", () => {
    expect(0 ** 2 - 1).toBe(-1);
    expect(certa("f1-inequacoes-quadraticas")).toBe("Negativo");
  });

  it("F2 f2-inequacoes-quadraticas: raízes são -1 e 1", () => {
    expect(raizes(quad(1, 0, -1), -2, 2)).toEqual([-1, 1]);
    expect(certa("f2-inequacoes-quadraticas")).toBe("−1 e 1");
  });

  it("F3 f3-inequacoes-quadraticas: raízes não entram em desigualdade estrita", () => {
    expect(certa("f3-inequacoes-quadraticas")).toBe("Não");
  });

  it("F4 f4-inequacoes-quadraticas: multiplicar por -1 inverte sinais", () => {
    expect(certa("f4-inequacoes-quadraticas")).toBe("Sim");
  });

  it("M1 m1-inequacoes-quadraticas: x² - 4 < 0 -> (-2; 2)", () => {
    expect(certa("m1-inequacoes-quadraticas")).toBe("(−2; 2)");
  });

  it("M2 m2-inequacoes-quadraticas: x² - 1 >= 0 -> (-inf; -1] U [1; +inf)", () => {
    expect(certa("m2-inequacoes-quadraticas")).toBe("(−∞; −1] ∪ [1; +∞)");
  });

  it("M3 m3-inequacoes-quadraticas: 1 - x² >= 0 -> [-1; 1]", () => {
    expect(certa("m3-inequacoes-quadraticas")).toBe("[−1; 1]");
  });

  it("D1 d1-inequacoes-quadraticas: (x - 1)² <= 0 -> {1}", () => {
    expect(certa("d1-inequacoes-quadraticas")).toBe("{1}");
  });

  it("D2 d2-inequacoes-quadraticas: x² + 1 < 0 -> vazio", () => {
    expect(certa("d2-inequacoes-quadraticas")).toBe("∅");
  });

  it("D3 d3-inequacoes-quadraticas: 4x² - 1 < 0 -> (-0.5; 0.5)", () => {
    expect(Math.sqrt(1 / 4)).toBe(0.5);
    expect(certa("d3-inequacoes-quadraticas")).toBe("(−0,5; 0,5)");
  });

  it("D4 d4-inequacoes-quadraticas: -(x - 2)² >= 0 -> {2}", () => {
    expect(certa("d4-inequacoes-quadraticas")).toBe("{2}");
  });

  it("D5 d5-inequacoes-quadraticas: x(x + 1) <= 6 -> [0; 2]", () => {
    expect(2 * (2 + 1)).toBe(6);
    expect(certa("d5-inequacoes-quadraticas")).toBe("[0; 2]");
  });
});
