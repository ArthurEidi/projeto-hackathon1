// Inequações trigonométricas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/inequacoes-trigonometricas/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de inequações trigonométricas", () => {
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
        expect(["angulo", "rad", "x_rad", "voltas", "seno", "cosseno", "tangente", "dentro", "no_alvo"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: angulo alcança 90", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("angulo");
    expect(s.complete_when.gte).toBe(90);
  });

  it("cruzar-fronteira: angulo alcança 270", () => {
    const s = step("cruzar-fronteira");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("angulo");
    expect(s.complete_when.gte).toBe(270);
  });

  it("limite-meio: dentro alcança 1", () => {
    const s = step("limite-meio");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("dentro");
    expect(s.complete_when.gte).toBe(1);
  });

  it("conferir-previsao: sen θ > 0 em [0; 2π) => (0; π)", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("(0; π)");
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
  it("F1 f1-inequacoes-trigonometricas: sen θ positivo na metade Superior", () => {
    expect(certa("f1-inequacoes-trigonometricas")).toBe("Superior");
  });

  it("F2 f2-inequacoes-trigonometricas: sen 0 = 0 não satisfaz sen θ > 0", () => {
    expect(certa("f2-inequacoes-trigonometricas")).toBe("Não");
  });

  it("F3 f3-inequacoes-trigonometricas: cosseno positivo à direita", () => {
    expect(certa("f3-inequacoes-trigonometricas")).toBe("Sim");
  });

  it("F4 f4-inequacoes-trigonometricas: tangente não existe em π/2", () => {
    expect(certa("f4-inequacoes-trigonometricas")).toBe("Não");
  });

  it("M1 m1-inequacoes-trigonometricas: sen θ > 0 => (0; π)", () => {
    expect(certa("m1-inequacoes-trigonometricas")).toBe("(0; π)");
  });

  it("M2 m2-inequacoes-trigonometricas: sen θ ≤ 0 => {0} ∪ [π; 2π)", () => {
    expect(certa("m2-inequacoes-trigonometricas")).toBe("{0} ∪ [π; 2π)");
  });

  it("M3 m3-inequacoes-trigonometricas: cos θ < 0 => (π/2; 3π/2)", () => {
    expect(certa("m3-inequacoes-trigonometricas")).toBe("(π/2; 3π/2)");
  });

  it("D1 d1-inequacoes-trigonometricas: sen θ ≥ 0,5 => [π/6; 5π/6]", () => {
    expect(Math.sin(Math.PI / 6)).toBeCloseTo(0.5, 5);
    expect(Math.sin((5 * Math.PI) / 6)).toBeCloseTo(0.5, 5);
    expect(certa("d1-inequacoes-trigonometricas")).toBe("[π/6; 5π/6]");
  });

  it("D2 d2-inequacoes-trigonometricas: sen θ > 1 => ∅", () => {
    expect(certa("d2-inequacoes-trigonometricas")).toBe("∅");
  });

  it("D3 d3-inequacoes-trigonometricas: tg θ > 0 => (0; π/2) ∪ (π; 3π/2)", () => {
    expect(certa("d3-inequacoes-trigonometricas")).toBe("(0; π/2) ∪ (π; 3π/2)");
  });

  it("D4 d4-inequacoes-trigonometricas: cos θ ≥ 1 em [0; 2π) => {0}", () => {
    expect(certa("d4-inequacoes-trigonometricas")).toBe("{0}");
  });

  it("D5 d5-inequacoes-trigonometricas: sen(2θ) > 0 => (0; π/2) ∪ (π; 3π/2)", () => {
    expect(certa("d5-inequacoes-trigonometricas")).toBe("(0; π/2) ∪ (π; 3π/2)");
  });

  it("V1 UFU 2021-2 Medicina Q67 preserva as alternativas e o gabarito do Tipo 1", () => {
    const questao = L.treino.vestibular.find((q) => q.id === "ufu-2021-cos2x-ineq");
    expect(questao?.options.map(({ id, label, correct }) => [id, label, correct])).toEqual([
      ["a", "[2π/3; 4π/3]", true],
      ["b", "[2π/3; π]", false],
      ["c", "[π/3; 5π/3]", false],
      ["d", "[0; π/3] ∪ [5π/3; 2π]", false],
    ]);
  });

  it("V1 UFU 2021-2 Medicina Q67 inclui as três raízes e muda de sinal nos extremos do arco", () => {
    const f = (x: number) => Math.cos(2 * x) + 3 * Math.cos(x) + 2;
    const inicio = (2 * Math.PI) / 3;
    const fim = (4 * Math.PI) / 3;
    const delta = 0.01;
    expect(f(inicio)).toBeCloseTo(0, 9);
    expect(f(Math.PI)).toBeCloseTo(0, 9);
    expect(f(fim)).toBeCloseTo(0, 9);
    expect(f(inicio - delta)).toBeGreaterThan(0);
    expect(f(inicio + delta)).toBeLessThan(0);
    expect(f(Math.PI - delta)).toBeLessThan(0);
    expect(f(Math.PI + delta)).toBeLessThan(0);
    expect(f(fim - delta)).toBeLessThan(0);
    expect(f(fim + delta)).toBeGreaterThan(0);
    expect(f(0)).toBeGreaterThan(0);
    expect(f(2 * Math.PI)).toBeGreaterThan(0);
  });
});
