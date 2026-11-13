// Ângulos, retas paralelas e transversais · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/angulos-retas-paralelas/aula-01.json",
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

describe("passos da aula de ângulos e retas paralelas", () => {
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
        expect(["inclinou", "deslizou_paralela", "desvio_paralela"]).toContain(metric);
      }
    }
  });

  it("gabarito do micro-desafio confere com o colateral interno", () => {
    const s = step("desafio-colaterais");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    // 180 - 65 = 115°
    expect(certaOpt.label).toBe("115°");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: oposto pelo vértice a 50° mede 50°", () => {
    expect(certa("f1-oposto-pelo-vertice")).toBe("50°");
  });

  it("F2: suplemento de 70° é 110°", () => {
    expect(certa("f2-suplemento-de-70")).toBe("110°");
  });

  it("F3: correspondente a 60° mede 60°", () => {
    expect(certa("f3-correspondente-paralelas")).toBe("60°");
  });

  it("F4: alterno interno a 110° mede 110°", () => {
    expect(certa("f4-alterno-interno-110")).toBe("110°");
  });
});

describe("gabaritos das médias", () => {
  it("M1: 35° tem complemento 55° e suplemento 145°", () => {
    expect(certa("m1-complemento-vs-suplemento")).toBe("55° e 145°");
  });

  it("M2: 2x + 10 = 70 -> 2x = 60 -> x = 30°", () => {
    expect(certa("m2-equacao-alternos")).toBe("30°");
  });

  it("M3: x + 3x = 180 -> 4x = 180 -> x = 45°", () => {
    expect(certa("m3-equacao-colaterais")).toBe("45°");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: ângulo entre bissetrizes de 40° e 140° é 20 + 70 = 90°", () => {
    expect(certa("d1-bissetriz-suplementares")).toBe("90°");
  });

  it("D2: bico entre paralelas com 30° e 45° mede 75°", () => {
    expect(certa("d2-bico-entre-paralelas")).toBe("75°");
  });

  it("D3: suplemento de 52,5° é 180 - 52,5 = 127,5°", () => {
    expect(certa("d3-suplemento-decimal")).toBe("127,5°");
  });

  it("D4: correspondentes 80° e 82° indicam que as retas se cruzam", () => {
    expect(certa("d4-teste-de-paralelismo")).toBe("Elas se cruzam");
  });

  it("D5: colaterais em razão 2:3 -> 5 partes de 36° -> maior = 108°", () => {
    expect(certa("d5-tres-paralelas-bissetriz")).toBe("108°");
  });
});
