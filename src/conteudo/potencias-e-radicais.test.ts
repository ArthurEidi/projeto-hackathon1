// Potenciação, propriedades e radicais · Aula 01: passos completáveis, gabaritos e fórmulas em conformidade com o glossário.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../content/aritmetica/conjuntos/potencias-e-radicais/aula-01.json"),
      "utf8",
    ),
  ),
);

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!.options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
      } else {
        expect(["ponto_x", "dentro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("desafio: 0,5 é 2⁻¹", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error("micro_challenge esperado");
    expect(s.options.find((o) => o.correct)!.label).toBe("0,5");
  });

  it("fechamento: letras do glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error("concept_lock esperado");
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("f1-potencias-e-radicais")).toBe("2");
    expect(certa("f2-potencias-e-radicais")).toBe("1");
    expect(certa("f3-potencias-e-radicais")).toBe("0,5");
    expect(certa("f4-potencias-e-radicais")).toBe("3");
    expect(certa("m1-potencias-e-radicais")).toBe("32");
    expect(certa("m2-potencias-e-radicais")).toBe("64");
    expect(certa("m3-potencias-e-radicais")).toBe("5");
  });

  it("desafios", () => {
    expect(certa("d1-potencias-e-radicais")).toBe("3");
    expect(certa("d2-potencias-e-radicais")).toBe("Não");
    expect(certa("d3-potencias-e-radicais")).toBe("−2");
    expect(certa("d4-potencias-e-radicais")).toBe("1");
    expect(certa("d5-potencias-e-radicais")).toBe("2√2 e 4√2");
  });
});
