// Notação científica, estimativa e arredondamento · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../content/aritmetica/conjuntos/notacao-cientifica-e-ordem-grandeza/aula-01.json"),
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

  it("desafio: 2·10² é a notação científica de 200", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("2·10²");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("f1-notacao-cientifica-e-ordem-grandeza")).toBe("1");
    expect(certa("f2-notacao-cientifica-e-ordem-grandeza")).toBe("3");
    expect(certa("f3-notacao-cientifica-e-ordem-grandeza")).toBe("2");
    expect(certa("f4-notacao-cientifica-e-ordem-grandeza")).toBe("Direita");
    expect(certa("m1-notacao-cientifica-e-ordem-grandeza")).toBe("3·10²");
    expect(certa("m2-notacao-cientifica-e-ordem-grandeza")).toBe("2·10⁻²");
    expect(certa("m3-notacao-cientifica-e-ordem-grandeza")).toBe("6·10³");
  });

  it("desafios", () => {
    expect(certa("d1-notacao-cientifica-e-ordem-grandeza")).toBe("1,0·10³");
    expect(certa("d2-notacao-cientifica-e-ordem-grandeza")).toBe("Não");
    expect(certa("d3-notacao-cientifica-e-ordem-grandeza")).toBe("10³");
    expect(certa("d4-notacao-cientifica-e-ordem-grandeza")).toBe("5·10⁻²");
    expect(certa("d5-notacao-cientifica-e-ordem-grandeza")).toBe("1·10³; ordem 10³");
  });
});
