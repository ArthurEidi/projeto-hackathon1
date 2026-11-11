// Perímetro e área de figuras planas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/perimetro-e-area-de-figuras-planas/aula-01.json",
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

describe("passos da aula de perímetro e área de figuras planas", () => {
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
        expect(["encaixado"]).toContain(metric);
      }
    }
  });

  it("gabarito do micro-desafio confere com a fórmula do trapézio", () => {
    const s = step("desafio-trapezio");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    // B = 6, b = 4, h = 3 -> A = (6 + 4) * 3 / 2 = 15
    expect(certaOpt.label).toBe("15");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: retângulo 5 por 4 tem área 20 cm²", () => {
    expect(certa("f1-retangulo-area")).toBe("20 cm²");
  });

  it("F2: retângulo 5 por 4 tem perímetro 18 cm", () => {
    expect(certa("f2-retangulo-perimetro")).toBe("18 cm");
  });

  it("F3: triângulo de base 6 e altura 4 tem área 12 m²", () => {
    expect(certa("f3-triangulo-simples")).toBe("12 m²");
  });

  it("F4: paralelogramo base 7 e altura 3 tem área 21 cm²", () => {
    expect(certa("f4-paralelogramo-area")).toBe("21 cm²");
  });
});

describe("gabaritos das médias", () => {
  it("M1: trapézio bases 8 e 4, h = 5 tem área 30 cm²", () => {
    expect(certa("m1-trapezio-direto")).toBe("30 cm²");
  });

  it("M2: triplicar os lados multiplica área por 9 (90 m²)", () => {
    expect(certa("m2-escala-triplicar")).toBe("90 m²");
  });

  it("M3: triângulo A = 18 e b = 9 tem h = 4 cm", () => {
    expect(certa("m3-achar-altura")).toBe("4 cm");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: mesmo perímetro 20 m -> 5x5 tem 25 m² (maior)", () => {
    expect(certa("d1-mesmo-perimetro-maior-area")).toBe("O de 5×5 (25 m²)");
  });

  it("D2: retângulo 6x5 menos canto 2x2 tem 26 cm²", () => {
    expect(certa("d2-figura-em-l")).toBe("26 cm²");
  });

  it("D3: triângulo b = 5 e h = 2,5 tem área 6,25 cm²", () => {
    expect(certa("d3-triangulo-decimal")).toBe("6,25 cm²");
  });

  it("D4: triângulos mesma base e mesma altura têm áreas iguais a 6 cm²", () => {
    expect(certa("d4-fronteira-cavalieri-plano")).toBe("Todas valem 6 cm²");
  });

  it("D5: área 12 para 108 -> k² = 9 -> k = 3", () => {
    expect(certa("d5-escala-reversa")).toBe("3");
  });
});
