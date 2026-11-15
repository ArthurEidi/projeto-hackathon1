// Função Modular · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, raizes, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(readFileSync(join(import.meta.dirname, "../../content/algebra/funcoes/funcao-modular/aula-01.json"), "utf8")),
);
/** a·|x − h| + k */
const mod = (a: number, h: number, k: number): CurvaResolvida => ({ tipo: "modular", a, b: h, c: k });
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;
const V = (a: number, h: number, k: number) => `(${h}; ${avaliar(mod(a, h, k), h)})`.replace(/-/g, "−");

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
        expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x", "dentro"]).toContain(metric);
      }
    }
  });

  it("distancia-zero: |−2| = |2| = 2, e de −2 a 2 a faixa é 4", () => {
    const s = step("distancia-zero");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(avaliar(mod(1, 0, 0), -2)).toBe(2);
    expect(avaliar(mod(1, 0, 0), 2)).toBe(2);
    expect(s.complete_when.gte).toBe(2 - -2);
  });

  it("mover-referencia: |x − 1| zera em x = 1", () => {
    expect(raizes(mod(1, 1, 0), -5, 5)).toEqual([1]);
  });

  it("duas-distancias: |x − 1| = 2 em x = −1 e x = 3; de −1 a 3 a faixa é 4", () => {
    const s = step("duas-distancias");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(raizes({ ...mod(1, 1, -2) }, -5, 5)).toEqual([-1, 3]);
    expect(s.complete_when.gte).toBe(3 - -1);
    expect(((s.complete_when.gte ?? 0) % 1)).toBe(0); // passo 1
  });

  it("desafio: o vértice de −|x − 1| + 2 é (1; 2) e (−1; −2) não está na curva", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(V(-1, 1, 2));
    expect(avaliar(mod(-1, 1, 2), -1)).toBe(0);
    expect(s.options).toHaveLength(4);
    const rotulos = s.options.map((o) => o.label);
    expect(rotulos).toEqual([V(-1, -1, -2), V(-1, 1, 2), V(-1, -1, 2), V(-1, 1, -2)]);
    expect(V(-1, -1, -2)).toBe("(−1; −2)"); // trocou os sinais de h e k
    expect(V(-1, -1, 2)).toBe("(−1; 2)"); // trocou só o sinal de h: vértice de −|x + 1| + 2
    expect(V(-1, 1, -2)).toBe("(1; −2)"); // levou o menos da frente para k: vértice de −|x − 1| − 2
    expect(avaliar(mod(-1, 1, 2), 1)).not.toBe(-2);
    expect(new Set(rotulos).size).toBe(4);
  });

  it("fechamento: 2|x − 1| − 1 tem vértice (1; −1) e raízes 0,5 e 1,5", () => {
    expect(avaliar(mod(2, 1, -1), 1)).toBe(-1);
    expect(raizes(mod(2, 1, -1), -5, 5)).toEqual([0.5, 1.5]);
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(Math.abs(-4)).toBe(Number(certa("f1-funcao-modular")));
    expect(certa("f2-funcao-modular")).toBe(V(1, 3, 0));
    expect(Math.abs(0) + 2).toBe(Number(certa("f3-funcao-modular")));
    expect(raizes(mod(1, 0, -3), -5, 5)).toEqual([-3, 3]);
    expect(certa("f4-funcao-modular")).toBe("−3 e 3");
  });

  it("médias", () => {
    const g = (x: number) => avaliar(mod(1, 0, 1), x);
    for (const x of [-9, 0, 4]) expect(g(x)).toBeGreaterThanOrEqual(1);
    expect(certa("m1-funcao-modular")).toBe("y ≥ 1");
    for (const x of [-9, 0, 4]) expect(avaliar(mod(-1, 0, 0), x)).toBeLessThanOrEqual(0);
    expect(certa("m2-funcao-modular")).toBe("Para baixo");
    expect(raizes(mod(1, 2, 0), -5, 5)).toEqual([2]);
    expect(certa("m3-funcao-modular")).toBe("Uma");
  });

  it("desafios", () => {
    expect(certa("d1-funcao-modular")).toBe(V(2, -1, -3));
    expect(raizes(mod(1, 1, -4), -9, 9)).toEqual([-3, 5]);
    expect(certa("d2-funcao-modular")).toBe("−3 e 5");
    expect(raizes(mod(1, 0, 2), -9, 9)).toEqual([]); // |x| = −2
    expect(certa("d3-funcao-modular")).toBe("Nenhuma");
    for (const x of [-20, 3, 20]) expect(avaliar(mod(-2, 3, 1), x)).toBeLessThanOrEqual(1);
    expect(certa("d4-funcao-modular")).toBe("y ≤ 1");
    // |2x − 4| = 6  <=>  2·|x − 2| = 6
    expect(raizes({ tipo: "modular", a: 2, b: 2, c: -6 }, -9, 9)).toEqual([-1, 5]);
    expect(certa("d5-funcao-modular")).toBe("−1 e 5");
  });

  it("vestibular: nenhuma questão sem fonte conferida", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
