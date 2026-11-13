// Frações, decimais e comparação de racionais · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../content/aritmetica/conjuntos/fracoes-e-decimais/aula-01.json"),
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
        if (metric === "ponto_x") {
          const p = s.params as { intervalo: [number, number]; ponto?: { x: number; arrastavel?: boolean } };
          expect(p.ponto?.arrastavel, s.id).toBe(true);
          if (gte !== undefined) {
            expect(p.ponto!.x, `${s.id} não pode começar concluído`).toBeLessThan(gte);
            expect(p.intervalo[1], s.id).toBeGreaterThanOrEqual(gte);
          }
          if (lte !== undefined) {
            expect(p.ponto!.x, `${s.id} não pode começar concluído`).toBeGreaterThan(lte);
            expect(p.intervalo[0], s.id).toBeLessThanOrEqual(lte);
          }
        }
      }
    }
  });

  it("desafio: 0,5 ocupa o mesmo ponto que 1/2", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("0,5");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("f1-fracoes-e-decimais")).toBe("0,5");
    expect(certa("f2-fracoes-e-decimais")).toBe("Sim");
    expect(certa("f3-fracoes-e-decimais")).toBe("1/2");
    expect(certa("f4-fracoes-e-decimais")).toBe("Não");
    expect(certa("m1-fracoes-e-decimais")).toBe("3/4");
    expect(certa("m2-fracoes-e-decimais")).toBe("1/4");
    expect(certa("m3-fracoes-e-decimais")).toBe("1/3");
  });

  it("desafios", () => {
    expect(certa("d1-fracoes-e-decimais")).toBe("1,5");
    expect(certa("d2-fracoes-e-decimais")).toBe("Sim");
    expect(certa("d3-fracoes-e-decimais")).toBe("1");
    expect(certa("d4-fracoes-e-decimais")).toBe("−1/4");
    expect(certa("d5-fracoes-e-decimais")).toBe("3/4 m");
  });
});
