// Valor Absoluto como Distância · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/aritmetica/conjuntos/valor-absoluto-e-distancia/aula-01.json",
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

describe("passos da aula de valor absoluto e distância", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      expect(["dentro", "ponto_x", "faixa_x"]).toContain(metric);
      if (metric === "ponto_x") {
        if (gte !== undefined) expect(gte).toBeLessThanOrEqual(5);
        if (lte !== undefined) expect(lte).toBeGreaterThanOrEqual(-5);
      }
    }
  });

  it("conferir-previsao: distância entre −2 e 1 é 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(String(Math.abs(-2 - 1)));
  });

  it("fechamento: termos referenciados existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis: valor absoluto, zero, simetria e não negatividade", () => {
    // f1: |-2| = 2
    expect(certa("f1-valor-absoluto-e-distancia")).toBe(String(Math.abs(-2)));

    // f2: |0| = 0
    expect(certa("f2-valor-absoluto-e-distancia")).toBe(String(Math.abs(0)));

    // f3: |2| = |-2| = 2
    expect(Math.abs(2)).toBe(Math.abs(-2));
    expect(certa("f3-valor-absoluto-e-distancia")).toBe("Sim");

    // f4: distância é sempre >= 0
    expect(certa("f4-valor-absoluto-e-distancia")).toBe("Não");
  });

  it("médias: distância entre dois pontos e deslocamento", () => {
    // m1: d(-2, 1) = |-2 - 1| = 3
    const d1 = Math.abs(-2 - 1);
    expect(d1).toBe(3);
    expect(certa("m1-valor-absoluto-e-distancia")).toBe(String(d1));

    // m2: d(4, 1) = |4 - 1| = 3
    const d2 = Math.abs(4 - 1);
    expect(d2).toBe(3);
    expect(certa("m2-valor-absoluto-e-distancia")).toBe(String(d2));

    // m3: deslocamento de 1 para -2 = -2 - 1 = -3
    const delta = -2 - 1;
    expect(delta).toBe(-3);
    expect(certa("m3-valor-absoluto-e-distancia")).toBe("−3");
  });

  it("desafios: pontos equidistantes, distância zero, decimais e percurso", () => {
    // d1: pontos a 2 unidades de 1 -> 1 - 2 = -1 e 1 + 2 = 3
    expect(1 - 2).toBe(-1);
    expect(1 + 2).toBe(3);
    expect(certa("d1-valor-absoluto-e-distancia")).toBe("−1 e 3");

    // d2: |x - 3| = 0 => x = 3
    expect(certa("d2-valor-absoluto-e-distancia")).toBe("3");

    // d3: |-0,5 - 1| = 1,5
    const dDec = Math.abs(-0.5 - 1);
    expect(dDec).toBe(1.5);
    expect(certa("d3-valor-absoluto-e-distancia")).toBe("1,5");

    // d4: para x < 0, |x| = -x
    expect(certa("d4-valor-absoluto-e-distancia")).toBe("−x");

    // d5: percurso de -2 a 1 (3) e de 1 a 0 (1) = 4; deslocamento = 0 - (-2) = 2
    const percurso = Math.abs(1 - -2) + Math.abs(0 - 1);
    const deslocamento = 0 - -2;
    expect(percurso).toBe(4);
    expect(deslocamento).toBe(2);
    expect(certa("d5-valor-absoluto-e-distancia")).toBe("4 e 2");
  });
});
