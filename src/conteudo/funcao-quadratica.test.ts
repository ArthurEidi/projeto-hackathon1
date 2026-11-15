// Função Quadrática · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, raizes, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(join(import.meta.dirname, "../../content/algebra/funcoes/funcao-quadratica/aula-01.json"), "utf8"),
  ),
);
const quad = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "quadratica", a, b, c });
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;
/** Vértice pela fórmula x = −b/(2a). */
const vertice = (k: CurvaResolvida) => {
  const x = -k.b / (2 * k.a);
  return `(${x}; ${avaliar(k, x)})`.replace(/-/g, "−");
};

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
        expect(["quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: de x = 1 a x = −2 e x = 2 a faixa percorrida é 4", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.gte).toBe(2 - -2);
    expect(avaliar(quad(1, 0, 0), -2)).toBe(avaliar(quad(1, 0, 0), 2));
    expect(avaliar(quad(1, 0, 0), 2)).toBe(4);
  });

  it("mover-vertice: a raiz de (x − 1)² é 1, alcançável com passo 0,5 e fora do início", () => {
    expect(raizes(quad(1, -2, 1), -5, 5)).toEqual([1]);
    expect((1 / 0.5) % 1).toBe(0);
    expect(avaliar(quad(1, -2, 1), -1)).not.toBe(0);
  });

  it("desafio: o vértice de (x − 1)² − 1 = x² − 2x é (1; −1); (−1; 1) não está na curva", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(vertice(quad(1, -2, 0)));
    expect(avaliar(quad(1, -2, 0), -1)).toBe(3);
    expect(s.options).toHaveLength(4);
    expect(vertice(quad(1, 2, 2))).toBe("(−1; 1)"); // os dois sinais trocados: (x + 1)² + 1
    expect(vertice(quad(1, 2, 0))).toBe("(−1; −1)"); // só o sinal de h trocado: (x + 1)² − 1 = x² + 2x
    // (0; 0) é ponto da curva (raiz e intercepto), não o mínimo: as raízes são 0 e 2, o vértice fica no meio
    expect(avaliar(quad(1, -2, 0), 0)).toBe(0);
    expect(raizes(quad(1, -2, 0), -5, 5)).toEqual([0, 2]);
    expect(avaliar(quad(1, -2, 0), 1)).toBeLessThan(avaliar(quad(1, -2, 0), 0));
    expect(s.options.map((o) => o.label)).toEqual(["(−1; 1)", "(0; 0)", vertice(quad(1, -2, 0)), "(−1; −1)"]);
    expect(new Set(s.options.map((o) => o.label)).size).toBe(4);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("f1-funcao-quadratica")).toBe(String((-3) ** 2));
    expect(certa("f2-funcao-quadratica")).toBe("Para baixo"); // a = −1 < 0
    expect(certa("f3-funcao-quadratica")).toBe(String(avaliar(quad(1, 0, -4), 0)).replace("-", "−"));
    expect(raizes(quad(1, -4, 4), -5, 5)).toEqual([2]);
    expect(certa("f4-funcao-quadratica")).toBe("x = 2");
  });

  it("médias", () => {
    expect(raizes(quad(1, 0, -9), -5, 5)).toEqual([-3, 3]);
    expect(certa("m1-funcao-quadratica")).toBe("−3 e 3");
    expect(certa("m2-funcao-quadratica")).toBe(vertice(quad(1, -2, 3)));
    expect(raizes(quad(1, 0, 1), -5, 5)).toEqual([]);
    expect(certa("m3-funcao-quadratica")).toBe("Nenhuma");
  });

  it("desafios", () => {
    expect(certa("d1-funcao-quadratica")).toBe(vertice(quad(1, -4, 3)));
    expect(raizes(quad(1, -5, 6), -5, 5)).toEqual([2, 3]);
    expect(certa("d2-funcao-quadratica")).toBe("2 e 3");
    // a = 0 vira 2x + 1: reta, não parábola.
    expect(certa("d3-funcao-quadratica")).toBe("Não");
    expect(raizes(quad(1, -4, 4), -5, 5)).toHaveLength(1);
    expect(certa("d4-funcao-quadratica")).toBe("Um");
    const r = raizes(quad(1, -4, 3), -5, 5);
    expect(r).toEqual([1, 3]);
    expect(r[0] + r[1]).toBe(Number(certa("d5-funcao-quadratica")));
    expect(r[0] * r[1]).toBe(3); // distrator: o produto
  });

  it("vestibular confere gabaritos ENEM por conta", () => {
    // 2022/150: y = -x^2/6 - 7x/3 + 12, piso + 1,5 m
    const a = -1 / 6;
    const b = -7 / 3;
    const c = 12;
    const hMax = -(b * b - 4 * a * c) / (4 * a) + 1.5;
    expect(hMax).toBeCloseTo(21.6667, 3);
    expect([17, 18, 19, 21, 40].filter((t) => hMax > t)).toEqual([17, 18, 19, 21]);
    expect(certa("enem-2022-saque-volei")).toBe("Nos I, II, III e IV (até 21 m)");

    // 2009/155: V(x) = (10000 + 100x)(1,50 - 0,01x) = 15000 + 50x - x^2
    const x = 10;
    expect((10000 + 100 * x) * (1.5 - 0.01 * x)).toBeCloseTo(15000 + 50 * x - x * x, 6);
    expect(certa("enem-2009-alcool")).toBe("V = 15.000 + 50x − x²");
  });
});
