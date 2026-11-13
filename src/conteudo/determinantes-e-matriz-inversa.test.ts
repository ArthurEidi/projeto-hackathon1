// Determinantes, área orientada e matriz inversa · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/matrizes-e-sistemas/determinantes-e-matriz-inversa/aula-01.json",
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

describe("passos da aula: determinantes-e-matriz-inversa", () => {
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
        expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: escala a=2 dobra a área do quadrado unitário", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "a", gte: 2 });
  });

  it("inverter-orientacao: a=-1 inverte orientação e det=-1", () => {
    const s = step("inverter-orientacao");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "a", lte: -1 });
  });

  it("perder-informacao: a=0 colapsa a área e gera matriz singular", () => {
    const s = step("perder-informacao");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "a", lte: 0 });
  });

  it("conferir-previsao: micro_challenge acerta diag(0,5;1)", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("diag(0,5;1)");
    expect(s.options.find((o) => !o.correct)!.label).toBe("diag(−2;−1)");
  });

  it("fechamento: referências da fórmula existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
    expect(s.definitions).toHaveLength(3);
  });
});

describe("gabaritos do treino: determinantes-e-matriz-inversa", () => {
  it("fáceis", () => {
    // F1: det da identidade 2x2 = 1*1 - 0*0 = 1
    expect(certa("f1-determinantes-e-matriz-inversa")).toBe("1");

    // F2: det negativo não significa área geométrica negativa (área = |det| >= 0)
    expect(certa("f2-determinantes-e-matriz-inversa")).toBe("Não");

    // F3: det = 0 impede inversa
    expect(certa("f3-determinantes-e-matriz-inversa")).toBe("Não");

    // F4: inversa da identidade é a própria identidade
    expect(certa("f4-determinantes-e-matriz-inversa")).toBe("A própria identidade");
  });

  it("médias", () => {
    // M1: det [[1,2],[0,3]] = 1*3 - 2*0 = 3
    expect(certa("m1-determinantes-e-matriz-inversa")).toBe("3");

    // M2: inversa de diag(2;1) é diag(1/2; 1) = diag(0,5;1)
    expect(certa("m2-determinantes-e-matriz-inversa")).toBe("diag(0,5;1)");

    // M3: det [[0,1],[1,0]] = 0*0 - 1*1 = -1
    expect(certa("m3-determinantes-e-matriz-inversa")).toBe("−1");
  });

  it("desafios", () => {
    // D1: det [[1,2],[2,k]] = k - 4 = 0 => k = 4
    expect(certa("d1-determinantes-e-matriz-inversa")).toBe("4");

    // D2: det A = -2 => área geométrica = |-2| = 2
    expect(certa("d2-determinantes-e-matriz-inversa")).toBe("2");

    // D3: inversa de [[1,1],[0,1]] é [[1,-1],[0,1]]
    expect(certa("d3-determinantes-e-matriz-inversa")).toBe("[[1,−1],[0,1]]");

    // D4: det(2A) = 2^2 * det(A) = 4 * 3 = 12
    expect(certa("d4-determinantes-e-matriz-inversa")).toBe("12");

    // D5: A(x;y) = (x+y; y) = (3;2) => y=2, x=1 => (1;2); det A = 1 => área 1
    expect(certa("d5-determinantes-e-matriz-inversa")).toBe("(1;2), área 1");
  });
});
