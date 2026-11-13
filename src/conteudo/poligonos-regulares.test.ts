// Polígonos regulares · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/poligonos-regulares/aula-01.json",
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

describe("passos da aula de polígonos regulares", () => {
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
        expect(["dividido", "ladrilho_fechado"]).toContain(metric);
      }
    }
  });

  it("gabarito do micro-desafio confere com o ângulo interno do octógono", () => {
    const s = step("desafio-angulo-octogono");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    // a_e = 360/8 = 45 -> a_i = 180 - 45 = 135°
    expect(certaOpt.label).toBe("135°");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: hexágono regular tem a_e = 360/6 = 60°", () => {
    expect(certa("f1-angulo-externo-hexagono")).toBe("60°");
  });

  it("F2: pentágono regular tem a_i = 180 - 72 = 108°", () => {
    expect(certa("f2-angulo-interno-pentagono-regular")).toBe("108°");
  });

  it("F3: pentágono regular não ladrilha sozinho", () => {
    expect(certa("f3-quais-ladrilham-sozinhos")).toBe("Pentágono regular");
  });

  it("F4: hexágono regular inscrito tem lado igual ao raio R = 5 cm", () => {
    expect(certa("f4-hexagono-inscrito-raio")).toBe("5 cm");
  });
});

describe("gabaritos das médias", () => {
  it("M1: ângulo externo 36° -> n = 360/36 = 10 lados", () => {
    expect(certa("m1-achar-n-pelo-angulo-externo")).toBe("10");
  });

  it("M2: ângulo interno 150° -> a_e = 30° -> n = 12 lados", () => {
    expect(certa("m2-achar-n-pelo-angulo-interno")).toBe("12");
  });

  it("M3: hexágono de 6 triângulos de 7 cm² tem área total 42 cm²", () => {
    expect(certa("m3-area-hexagono-seis-triangulos")).toBe("42 cm²");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: 3 pentágonos (324°) deixam fresta de 36°", () => {
    expect(certa("d1-fresta-entre-tres-pentagonos")).toBe("36°");
  });

  it("D2: dois octógonos (270°) pedem 90° (quadrado) para fechar 360°", () => {
    expect(certa("d2-ladrilho-octogonos-e-quadrado")).toBe("90° (quadrado)");
  });

  it("D3: a_i = 3 * a_e -> a_e = 45° -> n = 8 lados", () => {
    expect(certa("d3-interno-triplo-do-externo")).toBe("8");
  });

  it("D4: diagonal pelo centro do hexágono de lado 6 cm mede 2 * 6 = 12 cm", () => {
    expect(certa("d4-maior-diagonal-hexagono")).toBe("12 cm");
  });

  it("D5: 2 hexágonos (240°) e 1 triângulo (60°) somam 300° -> falta 60° (mais 1 triângulo)", () => {
    expect(certa("d5-estrela-entre-dois-hexagramas")).toBe("Mais 1 triângulo equilátero (60°)");
  });
});
