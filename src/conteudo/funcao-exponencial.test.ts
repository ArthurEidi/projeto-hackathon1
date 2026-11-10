// Função Exponencial · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(join(import.meta.dirname, "../../content/algebra/funcoes/funcao-exponencial/aula-01.json"), "utf8"),
  ),
);
const exp = (b: number): CurvaResolvida => ({ tipo: "exponencial", a: 1, b, c: 0 });
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
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
        // o slider encaixa em múltiplos do passo a partir do mínimo
        expect(((gte ?? lte)! - slider.min) % slider.step, s.id).toBe(0);
      } else {
        expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("expoente-zero: saída 1 em x = 0 e 4 em x = 2, alcançáveis com passo 1", () => {
    const s = step("expoente-zero");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(avaliar(exp(2), 0)).toBe(1);
    expect(avaliar(exp(2), 2)).toBe(4);
    expect(s.complete_when.gte! % 1).toBe(0);
  });

  it("base-decai: (0; 1), (1; 0,5), (2; 0,25) com b = 0,5; b = 1 dá saída constante", () => {
    expect([0, 1, 2].map((x) => avaliar(exp(0.5), x))).toEqual([1, 0.5, 0.25]);
    expect([-3, 0, 4].map((x) => avaliar(exp(1), x))).toEqual([1, 1, 1]);
    expect([1, 2, 3].map((x) => avaliar(exp(2), x))).toEqual([2, 4, 8]);
  });

  it("desafio: 2⁻² = 1/4", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(avaliar(exp(2), -2)).toBe(0.25);
    expect(s.options.find((o) => o.correct)!.label).toBe("1/4");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(avaliar(exp(2), 0)).toBe(Number(certa("f1-funcao-exponencial")));
    expect(avaliar(exp(3), 5) / avaliar(exp(3), 4)).toBe(Number(certa("f2-funcao-exponencial")));
    expect(avaliar(exp(2), -2)).toBe(1 / 4);
    expect(certa("f3-funcao-exponencial")).toBe("1/4");
    expect(certa("f4-funcao-exponencial")).toBe("1/2"); // 0 < 1/2 < 1
    expect(avaliar(exp(0.5), 1)).toBeLessThan(avaliar(exp(0.5), 0));
  });

  it("médias", () => {
    for (const x of [-20, 0, 20]) expect(avaliar(exp(5), x)).toBeGreaterThan(0);
    expect(certa("m1-funcao-exponencial")).toBe("Não");
    expect(4 * 3 ** 2).toBe(Number(certa("m2-funcao-exponencial")));
    expect(1 / 2 ** 3).toBe(1 / 8);
    expect(avaliar(exp(0.5), 3)).toBe(0.125);
    expect(certa("m3-funcao-exponencial")).toBe("1/8");
  });

  it("desafios", () => {
    expect(avaliar(exp(2), 3)).toBe(Number(certa("d1-funcao-exponencial")));
    expect(3 * 2 ** 3).toBe(Number(certa("d2-funcao-exponencial")));
    expect(avaliar(exp(2), 1)).not.toBe(1);
    expect(avaliar(exp(2), -1)).not.toBe(1);
    expect(certa("d3-funcao-exponencial")).toBe("Uma: x = 0");
    expect(certa("d4-funcao-exponencial")).toBe("(0; ∞)");
    expect(5 * 2 ** Number(certa("d5-funcao-exponencial"))).toBe(40);
  });

  it("vestibular: nenhuma questão sem fonte conferida", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
