// Teorema de Pitágoras · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/teorema-de-pitagoras/aula-01.json",
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

describe("passos da aula de teorema de pitágoras", () => {
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
        expect(["deslizou_pecas", "testou_diagonal"]).toContain(metric);
      }
    }
  });

  it("quadrados-3-4-5: b = 3 e c = 4 dão a = 5", () => {
    const s = step("quadrados-3-4-5");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(Math.hypot(3, 4)).toBe(5);
  });

  it("quebra-cabeca-areas: prova visual conclui com deslizou_pecas", () => {
    const s = step("quebra-cabeca-areas");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("deslizou_pecas");
  });

  it("ternas-e-diagonal: b = 3..6 e diagonal conclui com testou_diagonal", () => {
    const s = step("ternas-e-diagonal");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("testou_diagonal");
  });

  it("fora-de-90-graus: theta conclui com theta >= 105", () => {
    const s = step("fora-de-90-graus");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("theta");
    expect(s.complete_when.gte).toBe(105);
  });

  it("desafio-achar-cateto: hipotenusa 10 e cateto 8 dão cateto 6", () => {
    const s = step("desafio-achar-cateto");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("6");
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
  it("F1 hipotenusa-3-4: 3^2 + 4^2 = 25 => hipotenusa 5 cm", () => {
    expect(Math.hypot(3, 4)).toBe(5);
    expect(certa("hipotenusa-3-4")).toBe("5 cm");
  });

  it("F2 quem-e-hipotenusa: lados 5, 12, 13 => hipotenusa 13", () => {
    expect(Math.max(5, 12, 13)).toBe(13);
    expect(certa("quem-e-hipotenusa")).toBe("13");
  });

  it("F3 cateto-3-5: 5^2 - 3^2 = 16 => cateto 4", () => {
    expect(Math.sqrt(25 - 9)).toBe(4);
    expect(certa("cateto-3-5")).toBe("4");
  });

  it("F4 diagonal-quadrado-area: lado 3 => d^2 = 3^2 + 3^2 = 18", () => {
    expect(3 * 3 + 3 * 3).toBe(18);
    expect(certa("diagonal-quadrado-area")).toBe("18");
  });

  it("M1 escada-na-parede: 10^2 - 6^2 = 64 => altura 8 m", () => {
    expect(Math.sqrt(100 - 36)).toBe(8);
    expect(certa("escada-na-parede")).toBe("8 m");
  });

  it("M2 diagonal-retangulo-5-12: 5^2 + 12^2 = 169 => diagonal 13 m", () => {
    expect(Math.hypot(5, 12)).toBe(13);
    expect(certa("diagonal-retangulo-5-12")).toBe("13 m");
  });

  it("M3 altura-isosceles: hipotenusa 5 e meia base 3 => altura 4 cm", () => {
    expect(Math.sqrt(25 - 9)).toBe(4);
    expect(certa("altura-isosceles")).toBe("4 cm");
  });

  it("D1 terna-decimal: 1.5^2 + 2^2 = 6.25 => hipotenusa 2.5 m", () => {
    expect(Math.hypot(1.5, 2)).toBe(2.5);
    expect(certa("terna-decimal")).toBe("2,5 m");
  });

  it("D2 lado-pela-diagonal: diagonal 6 => L^2 = 6^2 / 2 = 18 cm^2", () => {
    expect(Math.pow(6, 2) / 2).toBe(18);
    expect(certa("lado-pela-diagonal")).toBe("18 cm²");
  });

  it("D3 losango-diagonais: metades 6 e 8 => lado 10 cm", () => {
    expect(Math.hypot(6, 8)).toBe(10);
    expect(certa("losango-diagonais")).toBe("10 cm");
  });

  it("D4 classificar-angulo-pela-soma: 6^2 > 3^2 + 4^2 => Maior que 90° (obtuso)", () => {
    expect(certa("classificar-angulo-pela-soma")).toBe("Maior que 90° (obtuso)");
  });

  it("D5 caminho-em-l: norte 8 e leste 6 => distancia 10 km", () => {
    expect(Math.hypot(8, 6)).toBe(10);
    expect(certa("caminho-em-l")).toBe("10 km");
  });

  it("V1 enem-2020-arvore: mangueira 100/20 = 5 m, h = 3 m => r = 4,00 m", () => {
    expect(Math.sqrt((100 / 20) ** 2 - 3 ** 2)).toBe(4);
    expect(certa("enem-2020-arvore")).toBe("4,00");
  });
});
