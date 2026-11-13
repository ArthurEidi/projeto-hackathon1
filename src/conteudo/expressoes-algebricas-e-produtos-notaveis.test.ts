// Expressões algébricas e produtos notáveis · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/expressoes-algebricas-e-produtos-notaveis/aula-01.json",
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

describe("passos da aula de expressões algébricas e produtos notáveis", () => {
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
      }
    }
  });

  it("gabarito do micro-desafio confere com a área do quadrado", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    // (2 + 1)² = 9
    expect(certaOpt.label).toBe("9");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: aparecem 2 faixas ab", () => {
    expect(certa("f1-expressoes-algebricas-e-produtos-notaveis")).toBe("2");
  });

  it("F2: se b = 0, (a+b)² = a²", () => {
    expect(certa("f2-expressoes-algebricas-e-produtos-notaveis")).toBe("a²");
  });

  it("F3: canto de lado b tem área b²", () => {
    expect(certa("f3-expressoes-algebricas-e-produtos-notaveis")).toBe("b²");
  });

  it("F4: (x+1)² = x²+2x+1", () => {
    expect(certa("f4-expressoes-algebricas-e-produtos-notaveis")).toBe("x²+2x+1");
  });
});

describe("gabaritos das médias", () => {
  it("M1: (2+1)² = 9", () => {
    expect(certa("m1-expressoes-algebricas-e-produtos-notaveis")).toBe("9");
  });

  it("M2: (3-1)² = 4", () => {
    expect(certa("m2-expressoes-algebricas-e-produtos-notaveis")).toBe("4");
  });

  it("M3: (x+2)(x-2) = x²-4", () => {
    expect(certa("m3-expressoes-algebricas-e-produtos-notaveis")).toBe("x²−4");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: (2+b)² = 9 com b >= 0 dá b = 1", () => {
    expect(certa("d1-expressoes-algebricas-e-produtos-notaveis")).toBe("1");
  });

  it("D2: para a=b=2, (a-b)² = 0", () => {
    expect(certa("d2-expressoes-algebricas-e-produtos-notaveis")).toBe("0");
  });

  it("D3: (1+0,5)² = 2,25", () => {
    expect(certa("d3-expressoes-algebricas-e-produtos-notaveis")).toBe("2,25");
  });

  it("D4: identidade vale para a=-2 e b=1 (Sim)", () => {
    expect(certa("d4-expressoes-algebricas-e-produtos-notaveis")).toBe("Sim");
  });

  it("D5: aumento da área 3² - 2² = 5", () => {
    expect(certa("d5-expressoes-algebricas-e-produtos-notaveis")).toBe("5");
  });
});
