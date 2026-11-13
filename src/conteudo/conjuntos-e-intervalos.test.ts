// Conjuntos, Operações e Intervalos · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/aritmetica/conjuntos/conjuntos-e-intervalos/aula-01.json",
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

describe("passos da aula de conjuntos e intervalos", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      expect(["dentro", "ponto_x", "faixa_x", "pertence", "modo"]).toContain(metric);
      if (metric === "dentro") {
        expect(gte).toBe(1);
      }
      if (metric === "modo") {
        expect(gte).toBe(1);
      }
      if (metric === "ponto_x") {
        if (gte !== undefined) expect(gte).toBeLessThanOrEqual(5);
        if (lte !== undefined) expect(lte).toBeGreaterThanOrEqual(-5);
      }
    }
  });

  it("conferir-previsao: interseção [0; 3] e [2; 5] é [2; 3]", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("[2; 3]");
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
  it("fáceis: extremo aberto, conectivos lógicos e elemento neutro", () => {
    // f1: [−1; 3) exclui o 3 porque o parêntese indica aberto
    expect(certa("f1-conjuntos-e-intervalos")).toBe("Não");

    // f2: união significa pertencer a A ou a B
    expect(certa("f2-conjuntos-e-intervalos")).toBe("Ou");

    // f3: interseção exige pertencer a A e a B simultaneamente
    expect(certa("f3-conjuntos-e-intervalos")).toBe("Sim");

    // f4: A união com o conjunto vazio é o próprio A
    expect(certa("f4-conjuntos-e-intervalos")).toBe("A");
  });

  it("médias: operações básicas e notação de intervalos", () => {
    // m1: A=[0; 3] e B=[2; 5] -> interseção [max(0,2); min(3,5)] = [2; 3]
    const interDe = Math.max(0, 2);
    const interAte = Math.min(3, 5);
    expect(`[${interDe}; ${interAte}]`).toBe("[2; 3]");
    expect(certa("m1-conjuntos-e-intervalos")).toBe("[2; 3]");

    // m2: A=[0; 3] e B=[2; 5] -> união [min(0,2); max(3,5)] = [0; 5]
    const uniaoDe = Math.min(0, 2);
    const uniaoAte = Math.max(3, 5);
    expect(`[${uniaoDe}; ${uniaoAte}]`).toBe("[0; 5]");
    expect(certa("m2-conjuntos-e-intervalos")).toBe("[0; 5]");

    // m3: −2 <= x < 2 -> [−2; 2)
    expect(certa("m3-conjuntos-e-intervalos")).toBe("[−2; 2)");
  });

  it("desafios: diferença, intervalo unitário, disjuntos e complementares", () => {
    // d1: [−1; 4] \ [1; 3) -> [−1; 1) união [3; 4]
    expect(certa("d1-conjuntos-e-intervalos")).toBe("[−1; 1) ∪ [3; 4]");

    // d2: [2; 2] é o conjunto unitário {2}
    expect(certa("d2-conjuntos-e-intervalos")).toBe("{2}");

    // d3: (−inf; 2] inter (2; +inf) é vazio
    expect(certa("d3-conjuntos-e-intervalos")).toBe("∅");

    // d4: complementar de (−inf; 0,5] em R é (0,5; +inf)
    expect(certa("d4-conjuntos-e-intervalos")).toBe("(0,5; +∞)");

    // d5: complementar de [1; 3) no universo [0; 4] é [0; 1) união [3; 4]
    expect(certa("d5-conjuntos-e-intervalos")).toBe("[0; 1) ∪ [3; 4]");
  });
});
