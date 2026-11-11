// Relações métricas no triângulo retângulo · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/relacoes-metricas-triangulo-retangulo/aula-01.json",
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

describe("passos da aula de relações métricas no triângulo retângulo", () => {
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
        expect(["m", "destacar_cateto", "girar_base", "h", "b"]).toContain(metric);
      }
    }
  });

  it("altura-e-sombras: m = 8 e a = 10 => n = 2 e h = sqrt(16) = 4", () => {
    const s = step("altura-e-sombras");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(Math.sqrt(8 * 2)).toBe(4);
    expect(s.complete_when.metric).toBe("m");
    expect(s.complete_when.gte).toBe(8);
  });

  it("cateto-e-sua-sombra: a = 9 e m = 4 => b = sqrt(36) = 6", () => {
    const s = step("cateto-e-sua-sombra");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(Math.sqrt(9 * 4)).toBe(6);
    expect(s.complete_when.metric).toBe("destacar_cateto");
  });

  it("duas-formas-da-area: girar_base alterna apoio para hipotenusa", () => {
    const s = step("duas-formas-da-area");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("girar_base");
  });

  it("desafio-altura-hipotenusa: m = 4 e n = 9 => h = 6 cm", () => {
    const s = step("desafio-altura-hipotenusa");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("6 cm");
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
  it("F1 hipotenusa-pelas-projecoes: a = 3 + 7 = 10 cm", () => {
    expect(3 + 7).toBe(10);
    expect(certa("hipotenusa-pelas-projecoes")).toBe("10 cm");
  });

  it("F2 altura-pelas-projecoes-2-8: h = sqrt(2 * 8) = 4 cm", () => {
    expect(Math.sqrt(2 * 8)).toBe(4);
    expect(certa("altura-pelas-projecoes-2-8")).toBe("4 cm");
  });

  it("F3 cateto-pela-hipotenusa-e-sombra: b = sqrt(8 * 2) = 4 cm", () => {
    expect(Math.sqrt(8 * 2)).toBe(4);
    expect(certa("cateto-pela-hipotenusa-e-sombra")).toBe("4 cm");
  });

  it("F4 produto-ah-bc: a * h = b * c = 6 * 8 = 48", () => {
    expect(6 * 8).toBe(48);
    expect(certa("produto-ah-bc")).toBe("48");
  });

  it("M1 achar-altura-6-8-10: 10 * h = 48 => h = 4.8 cm", () => {
    expect(48 / 10).toBe(4.8);
    expect(certa("achar-altura-6-8-10")).toBe("4,8 cm");
  });

  it("M2 achar-projecao-pelo-cateto: 6^2 = 9 * m => m = 4 cm", () => {
    expect(36 / 9).toBe(4);
    expect(certa("achar-projecao-pelo-cateto")).toBe("4 cm");
  });

  it("M3 achar-outra-projecao-pela-altura: 6^2 = 3 * n => n = 12 cm", () => {
    expect(36 / 3).toBe(12);
    expect(certa("achar-outra-projecao-pela-altura")).toBe("12 cm");
  });

  it("D1 cateto-pelas-duas-projecoes: a = 4 + 5 = 9 => b = sqrt(9 * 4) = 6 cm", () => {
    expect(Math.sqrt((4 + 5) * 4)).toBe(6);
    expect(certa("cateto-pelas-duas-projecoes")).toBe("6 cm");
  });

  it("D2 altura-no-5-12-13: a = 13 => h = 60/13 cm", () => {
    expect(certa("altura-no-5-12-13")).toBe("60/13 cm");
  });

  it("D3 diagonal-retangulo-projecao: 3^2 = 5 * m => m = 1.8 cm", () => {
    expect(9 / 5).toBe(1.8);
    expect(certa("diagonal-retangulo-projecao")).toBe("1,8 cm");
  });

  it("D4 semicirculo-corda-altura: h = sqrt(1 * 9) = 3 cm", () => {
    expect(Math.sqrt(1 * 9)).toBe(3);
    expect(certa("semicirculo-corda-altura")).toBe("3 cm");
  });

  it("D5 soma-b2-c2-deduz-pitagoras: a^2 = 16 + 9 = 25 => a = 5", () => {
    expect(Math.sqrt(16 + 9)).toBe(5);
    expect(certa("soma-b2-c2-deduz-pitagoras")).toBe("5");
  });
});
