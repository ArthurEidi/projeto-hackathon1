// Polígonos e quadriláteros · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/poligonos-e-quadrilateros/aula-01.json",
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

describe("passos da aula de polígonos e quadriláteros", () => {
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
        expect(["n", "encolher", "quadrilatero"]).toContain(metric);
      }
    }
  });

  it("gabarito do micro-desafio confere com a soma interna do pentágono", () => {
    const s = step("desafio-soma-pentagono");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    // (5 - 2) * 180° = 540°
    expect(certaOpt.label).toBe("540°");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: quadrilátero tem soma interna 360°", () => {
    expect(certa("f1-soma-interna-quadrilatero")).toBe("360°");
  });

  it("F2: decágono tem soma externa 360°", () => {
    expect(certa("f2-soma-externa-decagono")).toBe("360°");
  });

  it("F3: quarto ângulo do quadrilátero 360 - 290 = 70°", () => {
    expect(certa("f3-quarto-angulo-quadrilatero")).toBe("70°");
  });

  it("F4: 4 lados iguais e diagonais a 90° caracterizam o losango", () => {
    expect(certa("f4-propriedade-losango")).toBe("Losango");
  });
});

describe("gabaritos das médias", () => {
  it("M1: hexágono tem soma interna (6 - 2) * 180 = 720°", () => {
    expect(certa("m1-soma-interna-hexagono")).toBe("720°");
  });

  it("M2: pentágono tem 5 diagonais", () => {
    expect(certa("m2-numero-diagonais-pentagono")).toBe("5");
  });

  it("M3: paralelogramo com ângulo 70° tem oposto 70° e vizinho 110°", () => {
    expect(certa("m3-angulos-paralelogramo")).toBe("70° e 110°");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: soma interna 1080° -> n - 2 = 6 -> n = 8 lados", () => {
    expect(certa("d1-descobrir-n-pela-soma")).toBe("8");
  });

  it("D2: soma interna igual a externa (360°) ocorre no quadrilátero (n = 4)", () => {
    expect(certa("d2-soma-interna-igual-externa")).toBe("Quadrilátero (n = 4)");
  });

  it("D3: hexágono tem 6 * 3 / 2 = 9 diagonais", () => {
    expect(certa("d3-diagonais-hexagono")).toBe("9");
  });

  it("D4: semidiagonais 3 e 4 a 90° dão lado 5 cm no losango", () => {
    expect(certa("d4-area-losango-pelas-diagonais")).toBe("5 cm");
  });

  it("D5: base média do trapézio (14 + 6) / 2 = 10 cm", () => {
    expect(certa("d5-base-media-trapezio")).toBe("10 cm");
  });
});
