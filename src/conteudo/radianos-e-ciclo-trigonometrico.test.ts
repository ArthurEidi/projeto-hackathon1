// Graus, radianos e ciclo trigonométrico · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../content/geometria/trigonometria/radianos-e-ciclo-trigonometrico/aula-01.json"),
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
        expect(["angulo", "rad", "voltas", "quadrantes", "quad", "seno", "cosseno", "tangente", "dentro", "no_alvo", "solucoes_marcadas", "sen_soma", "soma_senos"]).toContain(metric);
      }
    }
  });

  it("desafio: 120° = 2π/3 rad", () => {
    const s = step("desafio-conversao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("2π/3 rad");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("pi-sobre-2")).toBe("90°");
    expect(certa("graus-60-em-rad")).toBe("π/3 rad");
    expect(certa("definicao-1-rad")).toBe("5 cm");
    expect(certa("volta-completa")).toBe("2π rad");
    expect(certa("converter-270")).toBe("3π/2 rad");
    expect(certa("primeira-determinacao-780")).toBe("60°");
    expect(certa("comprimento-arco")).toBe("15 m");
  });

  it("desafios", () => {
    expect(certa("arco-negativo")).toBe("310°");
    expect(certa("congruo-em-radianos")).toBe("π/4 rad");
    expect(certa("ponteiro-minutos")).toBe("2π/3 rad");
    expect(certa("quadrante-de-3-rad")).toBe("2º quadrante");
    expect(certa("bicicleta-voltas")).toBe("5 voltas e 12 m");
  });
});
