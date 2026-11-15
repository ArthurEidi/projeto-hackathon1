// Equações exponenciais · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/equacoes-e-inequacoes/equacoes-exponenciais/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const exponencial = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "exponencial", a, b, c });
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

  it("caso-neutro: 2⁰ = 1 e 2² = 4", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const exp = exponencial(1, 2, 0);
    expect(avaliar(exp, 0)).toBe(1);
    expect(avaliar(exp, 2)).toBe(4);
    expect(s.complete_when.gte).toBe(2);
  });

  it("mesma-altura: 2ˣ = 8 em x = 3", () => {
    const s = step("mesma-altura");
    if (s.type !== "interactive_canvas") throw new Error();
    const exp = exponencial(1, 2, 0);
    const r = afim(0, 8);
    expect(avaliar(exp, 3)).toBe(8);
    expect(avaliar(r, 3)).toBe(8);
    expect(s.complete_when.metric).toBe("no_encontro");
  });

  it("base-neutra: 1ˣ = 1 para todo x", () => {
    const s = step("base-neutra");
    if (s.type !== "interactive_canvas") throw new Error();
    const exp = exponencial(1, 1, 0);
    expect(avaliar(exp, 0)).toBe(1);
    expect(avaliar(exp, 3)).toBe(1);
    expect(s.complete_when.lte).toBe(1);
  });

  it("conferir-previsao: 2ˣ = 8 => x = 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("3");
    expect(s.options.find((o) => !o.correct)!.label).toBe("4");
    expect(s.options).toHaveLength(4);
    expect(2 ** 3).toBe(8);
    expect(8 / 2).toBe(4); // dividiu 8 pela base; 2⁴ = 16 ≠ 8
    expect(Math.sqrt(8) ** 2).toBeCloseTo(8, 12); // resolveu x² = 8 (base e expoente trocados)
    expect(2 ** Math.sqrt(8)).not.toBeCloseTo(8, 1); // 2^√8 ≈ 7,1 ≠ 8
    expect(2 ** 8).toBe(256); // elevou 2 ao 8
    for (const e of [4, 256]) expect(2 ** e).not.toBe(8);
    expect(s.options.map((o) => o.label)).toEqual(["4", "√8", "3", "256"]);
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
    // F1: 2⁰ = 1
    expect(2 ** 0).toBe(1);
    expect(certa("f1-equacoes-exponenciais")).toBe("1");

    // F2: 2^(x+1) = 2 * 2^x
    expect(certa("f2-equacoes-exponenciais")).toBe("2");

    // F3: 2^u = 2^v => u = v
    expect(certa("f3-equacoes-exponenciais")).toBe("Sim");

    // F4: 2^x pode valer zero? Não
    expect(certa("f4-equacoes-exponenciais")).toBe("Não");
  });

  it("médias", () => {
    // M1: 2ˣ = 8 => x = 3
    expect(Math.log2(8)).toBe(3);
    expect(certa("m1-equacoes-exponenciais")).toBe("3");

    // M2: 3ˣ = 9 => x = 2
    expect(Math.log(9) / Math.log(3)).toBeCloseTo(2);
    expect(certa("m2-equacoes-exponenciais")).toBe("2");

    // M3: 2^(x+1) = 8 => x+1 = 3 => x = 2
    expect(3 - 1).toBe(2);
    expect(certa("m3-equacoes-exponenciais")).toBe("2");
  });

  it("desafios", () => {
    // D1: 4ˣ = 8 => 2^(2x) = 2³ => 2x = 3 => x = 1.5
    expect(3 / 2).toBe(1.5);
    expect(certa("d1-equacoes-exponenciais")).toBe("1,5");

    // D2: 1ˣ = 1 => todas as soluções reais
    expect(certa("d2-equacoes-exponenciais")).toBe("Todas");

    // D3: 2ˣ = -2 => sem solução real => ∅
    expect(certa("d3-equacoes-exponenciais")).toBe("∅");

    // D4: 2^(2x) - 3*2^x + 2 = 0 => (2^x - 1)(2^x - 2) = 0 => 2^x = 1 ou 2 => x = 0 ou 1
    expect(certa("d4-equacoes-exponenciais")).toBe("0 e 1");

    // D5: 2 * 2ᵗ = 16 => 2ᵗ = 8 => t = 3
    expect(16 / 2).toBe(8);
    expect(Math.log2(8)).toBe(3);
    expect(Number(certa("d5-equacoes-exponenciais"))).toBe(3);
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
