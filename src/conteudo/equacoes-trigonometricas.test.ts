// Equações trigonométricas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/equacoes-trigonometricas/aula-01.json",
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

describe("passos da aula de equações trigonométricas", () => {
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
        expect(["angulo", "rad", "x_rad", "voltas", "seno", "cosseno", "tangente", "no_alvo"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: angulo alcança 90", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("angulo");
    expect(s.complete_when.gte).toBe(90);
  });

  it("altura-repetida: angulo alcança 150", () => {
    const s = step("altura-repetida");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("angulo");
    expect(s.complete_when.gte).toBe(150);
  });

  it("repetir-volta: angulo alcança 390", () => {
    const s = step("repetir-volta");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("angulo");
    expect(s.complete_when.gte).toBe(390);
  });

  it("conferir-previsao: sen θ = 0,5 => π/6 e 5π/6", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("π/6 e 5π/6");
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
  it("F1 f1-equacoes-trigonometricas: sen 0 = 0", () => {
    expect(Math.sin(0)).toBe(0);
    expect(certa("f1-equacoes-trigonometricas")).toBe("0");
  });

  it("F2 f2-equacoes-trigonometricas: sen(π/2) = 1", () => {
    expect(Math.sin(Math.PI / 2)).toBeCloseTo(1, 5);
    expect(certa("f2-equacoes-trigonometricas")).toBe("1");
  });

  it("F3 f3-equacoes-trigonometricas: uma volta = 360°", () => {
    expect(2 * 180).toBe(360);
    expect(certa("f3-equacoes-trigonometricas")).toBe("360°");
  });

  it("F4 f4-equacoes-trigonometricas: sen θ = 2 não tem solução real", () => {
    expect(certa("f4-equacoes-trigonometricas")).toBe("Não");
  });

  it("M1 m1-equacoes-trigonometricas: sen θ = 0 em [0; 2π) => 0 e π", () => {
    expect(certa("m1-equacoes-trigonometricas")).toBe("0 e π");
  });

  it("M2 m2-equacoes-trigonometricas: cos θ = 0 em [0; 2π) => π/2 e 3π/2", () => {
    expect(certa("m2-equacoes-trigonometricas")).toBe("π/2 e 3π/2");
  });

  it("M3 m3-equacoes-trigonometricas: sen θ = 0,5 em [0; 2π) => π/6 e 5π/6", () => {
    expect(Math.sin(Math.PI / 6)).toBeCloseTo(0.5, 5);
    expect(Math.sin((5 * Math.PI) / 6)).toBeCloseTo(0.5, 5);
    expect(certa("m3-equacoes-trigonometricas")).toBe("π/6 e 5π/6");
  });

  it("D1 d1-equacoes-trigonometricas: sen(2θ) = 0 em [0; 2π) => 0, π/2, π e 3π/2", () => {
    const raizes = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    for (const r of raizes) {
      expect(Math.sin(2 * r)).toBeCloseTo(0, 5);
    }
    expect(certa("d1-equacoes-trigonometricas")).toBe("0, π/2, π e 3π/2");
  });

  it("D2 d2-equacoes-trigonometricas: cos θ = 1 em [0; 2π] => 0 e 2π", () => {
    expect(Math.cos(0)).toBe(1);
    expect(Math.cos(2 * Math.PI)).toBeCloseTo(1, 5);
    expect(certa("d2-equacoes-trigonometricas")).toBe("0 e 2π");
  });

  it("D3 d3-equacoes-trigonometricas: tg θ = 1 em [0; 2π) => π/4 e 5π/4", () => {
    expect(Math.tan(Math.PI / 4)).toBeCloseTo(1, 5);
    expect(Math.tan((5 * Math.PI) / 4)).toBeCloseTo(1, 5);
    expect(certa("d3-equacoes-trigonometricas")).toBe("π/4 e 5π/4");
  });

  it("D4 d4-equacoes-trigonometricas: sen θ = 0 em ℝ => θ = kπ, k ∈ ℤ", () => {
    expect(certa("d4-equacoes-trigonometricas")).toBe("θ = kπ, k ∈ ℤ");
  });

  it("D5 d5-equacoes-trigonometricas: 2sen²θ − 1 = 0 => π/4, 3π/4, 5π/4 e 7π/4", () => {
    const raizes = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    for (const r of raizes) {
      const s = Math.sin(r);
      expect(2 * s * s - 1).toBeCloseTo(0, 5);
    }
    expect(certa("d5-equacoes-trigonometricas")).toBe("π/4, 3π/4, 5π/4 e 7π/4");
  });
});
