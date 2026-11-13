// Fatoração e zeros de expressões · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/fatoracao-algebrica/aula-01.json",
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

describe("passos da aula de fatoração e zeros de expressões", () => {
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

  it("gabarito do micro-desafio confere com as raízes de x(x-2)", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("0 e 2");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: x=0 zera o fator x", () => {
    expect(certa("f1-fatoracao-algebrica")).toBe("x");
  });

  it("F2: 2 zera x-2", () => {
    expect(certa("f2-fatoracao-algebrica")).toBe("2");
  });

  it("F3: x²-2x fatora em x(x-2)", () => {
    expect(certa("f3-fatoracao-algebrica")).toBe("x(x−2)");
  });

  it("F4: produto zero não exige que todos os fatores sejam zero", () => {
    expect(certa("f4-fatoracao-algebrica")).toBe("Não");
  });
});

describe("gabaritos das médias", () => {
  it("M1: raízes de (x-1)(x+2) são 1 e -2", () => {
    expect(certa("m1-fatoracao-algebrica")).toBe("1 e −2");
  });

  it("M2: x²-9 = (x-3)(x+3)", () => {
    expect(certa("m2-fatoracao-algebrica")).toBe("(x−3)(x+3)");
  });

  it("M3: 1·(1-2) = -1", () => {
    expect(certa("m3-fatoracao-algebrica")).toBe("−1");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: divisão por x perde x=0", () => {
    expect(certa("d1-fatoracao-algebrica")).toBe("0");
  });

  it("D2: raízes de 2x²-x são 0 e 0,5", () => {
    expect(certa("d2-fatoracao-algebrica")).toBe("0 e 0,5");
  });

  it("D3: (2-a)(2+1)=0 dá a=2", () => {
    expect(certa("d3-fatoracao-algebrica")).toBe("2");
  });

  it("D4: x²+1=0 não tem raiz real", () => {
    expect(certa("d4-fatoracao-algebrica")).toBe("Não");
  });

  it("D5: x²-4=5 com lado positivo dá x=3", () => {
    expect(certa("d5-fatoracao-algebrica")).toBe("3");
  });
});
