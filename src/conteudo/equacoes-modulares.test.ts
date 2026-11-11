// Equações modulares · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/equacoes-modulares/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const modular = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "modular", a, b, c });
const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });

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
        expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: |0| = 0", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(Math.abs(0)).toBe(0);
    expect(s.complete_when.lte).toBe(0);
  });

  it("dois-lados: |-2| = 2", () => {
    const s = step("dois-lados");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(Math.abs(-2)).toBe(2);
    expect(s.complete_when.lte).toBe(-2);
  });

  it("mover-centro: |x - 1| = 2 encontra y = 2 em x = 3 e x = -1", () => {
    const s = step("mover-centro");
    if (s.type !== "interactive_canvas") throw new Error();
    const m = modular(1, 1, 0);
    const r = afim(0, 2);
    expect(avaliar(m, 3)).toBe(2);
    expect(avaliar(r, 3)).toBe(2);
    expect(avaliar(m, -1)).toBe(2);
    expect(avaliar(r, -1)).toBe(2);
    expect(s.complete_when.metric).toBe("no_encontro");
  });

  it("conferir-previsao: soluções de |x - 1| = 2 são -1 e 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("−1 e 3");
    expect(s.options.find((o) => !o.correct)!.label).toBe("1 e 3");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    // F1: distância de -2 até 0
    expect(Math.abs(-2)).toBe(2);
    expect(certa("f1-equacoes-modulares")).toBe("2");

    // F2: quantidade de soluções de |x| = 0
    expect(certa("f2-equacoes-modulares")).toBe("1");

    // F3: pontos a 2 de zero
    expect(certa("f3-equacoes-modulares")).toBe("−2 e 2");

    // F4: centro de |x - 1| = 2
    expect(certa("f4-equacoes-modulares")).toBe("1");
  });

  it("médias", () => {
    // M1: |x| = 3 => x = ±3
    expect(certa("m1-equacoes-modulares")).toBe("−3 e 3");

    // M2: |x - 2| = 1 => 2 ± 1 => 1 e 3
    expect(2 - 1).toBe(1);
    expect(2 + 1).toBe(3);
    expect(certa("m2-equacoes-modulares")).toBe("1 e 3");

    // M3: |x + 1| = 2 => -1 ± 2 => -3 e 1
    expect(-1 - 2).toBe(-3);
    expect(-1 + 2).toBe(1);
    expect(certa("m3-equacoes-modulares")).toBe("−3 e 1");
  });

  it("desafios", () => {
    // D1: |2x - 1| = 0 => 2x = 1 => x = 0.5
    expect(1 / 2).toBe(0.5);
    expect(certa("d1-equacoes-modulares")).toBe("0,5");

    // D2: |x - 2| = -1 => distância negativa não existe => ∅
    expect(certa("d2-equacoes-modulares")).toBe("∅");

    // D3: soluções -1 e 3 => centro = (-1 + 3) / 2 = 1
    expect((-1 + 3) / 2).toBe(1);
    expect(Number(certa("d3-equacoes-modulares"))).toBe(1);

    // D4: |2x| = 1 => 2x = ±1 => x = ±0.5
    expect(certa("d4-equacoes-modulares")).toBe("−0,5 e 0,5");

    // D5: centro 2, raio 3, x >= 0 => 2 + 3 = 5
    expect(2 + 3).toBe(5);
    expect(Number(certa("d5-equacoes-modulares"))).toBe(5);
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
