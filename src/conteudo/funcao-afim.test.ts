// Função Afim · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, encontros, raizes, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(readFileSync(join(import.meta.dirname, "../../content/algebra/funcoes/funcao-afim/aula-01.json"), "utf8")),
);
const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
const f = (a: number, b: number) => (x: number) => a * x + b;
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
      } else {
        expect(["quadrantes", "na_raiz", "no_encontro"]).toContain(metric);
      }
    }
  });

  it("a raiz do passo achar-raiz (x = 2) é alcançável com passo 0,5", () => {
    const s = step("achar-raiz");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(raizes(afim(-1, 2), -5, 5)).toEqual([2]);
    expect((2 / 0.5) % 1).toBe(0);
  });

  it("o encontro de f(x) = x e g(x) = 2x + 1 está em x = −1, saída −1", () => {
    expect(encontros(afim(1, 0), afim(2, 1), -5, 5)).toEqual([-1]);
    expect(avaliar(afim(1, 0), -1)).toBe(-1);
  });

  it("desafio: a raiz de −2x + 4 é 2", () => {
    const s = step("desafio-raiz");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(String(raizes(afim(-2, 4), -5, 5)[0]));
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("f-de-zero")).toBe(String(f(2, 1)(0)));
    expect(certa("passo-de-um")).toBe(String(f(3, 0)(1) - f(3, 0)(0)));
    expect(certa("decrescente")).toBe("f(x) = −3x + 2");
    expect(f(1, -1)(0) - f(1, 2)(0)).toBe(-3);
    expect(certa("trocar-b")).toBe("Desce 3, sem girar");
    expect(certa("raiz-3x-6")).toBe(String(raizes(afim(3, -6), -5, 5)[0]));
    expect(raizes(afim(0, 5), -5, 5)).toEqual([]);
    expect(certa("constante-5")).toBe("Nenhuma");
    expect([f(2, 1)(0), f(2, 1)(1)]).toEqual([1, 3]);
    expect(certa("lei-do-grafico")).toBe("f(x) = 2x + 1");
  });

  it("desafios", () => {
    expect(certa("duas-maquinas")).toBe("−1");
    expect(certa("zero-zero")).toBe("Infinitas");
    const a = (9 - 5) / (3 - 1);
    expect(certa("dois-pontos")).toBe(String(5 - a));
    expect(certa("taxi")).toBe(`R$ ${f(2, 5)(10)}`);
    const a2 = (-3 - 1) / (3 - 1);
    const b2 = 1 - a2;
    expect(-b2 / a2).toBe(1.5);
    expect(certa("raiz-por-pontos")).toBe("3/2");
  });

  it("vestibular", () => {
    const mediaA = (3.45 + 2.05 * 6) / 6;
    const mediaB = (3.6 + 1.9 * 6) / 6;
    expect(mediaA - mediaB).toBeCloseTo(0.125, 10);
    expect(certa("enem-2014-taxi")).toBe("0,13");
    expect((410 - 10 * 5) / 2 / 10).toBe(Number(certa("cefetmg-2015-taxi")));
    expect(encontros(afim(4, -20), afim(-2, 46), 0, 100)).toEqual([Number(certa("enem-2012-equilibrio"))]);
    // f(3) + f(5) = 8a + 2b = 2·f(4) = 4 para qualquer reta com f(4) = 2.
    for (const a of [-3, 0.5, 2]) {
      const g = f(a, 2 - 4 * a);
      expect(g(g(3) + g(5))).toBeCloseTo(Number(certa("unicamp-2016-simetria")), 10);
    }
  });
});
