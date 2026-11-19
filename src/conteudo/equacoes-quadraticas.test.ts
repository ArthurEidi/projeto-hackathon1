// Equações quadráticas · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/equacoes-e-inequacoes/equacoes-quadraticas/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const quadratica = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "quadratica", a, b, c });

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

  it("caso-neutro: x² + 1 >= 1 não corta o eixo", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const q = quadratica(1, 0, 1);
    expect(avaliar(q, 0)).toBe(1);
    expect(s.complete_when.gte).toBe(1);
  });

  it("abrir-duas-raizes: x² - 1 = 0 em x = -1 e x = 1", () => {
    const s = step("abrir-duas-raizes");
    if (s.type !== "interactive_canvas") throw new Error();
    const q = quadratica(1, 0, -1);
    expect(avaliar(q, -1)).toBe(0);
    expect(avaliar(q, 1)).toBe(0);
    expect(s.complete_when.lte).toBe(-1);
  });

  it("contar-pelo-discriminante: x² - 2x + 0 tem raízes 0 e 2", () => {
    const s = step("contar-pelo-discriminante");
    if (s.type !== "interactive_canvas") throw new Error();
    const q = quadratica(1, -2, 0);
    expect(avaliar(q, 0)).toBe(0);
    expect(avaliar(q, 2)).toBe(0);
    expect(s.complete_when.lte).toBe(0);
  });

  it("deslocar-centro: vértice em (1; -1) e raízes 0 e 2", () => {
    const s = step("deslocar-centro");
    if (s.type !== "interactive_canvas") throw new Error();
    const q = quadratica(1, -2, 0);
    expect(avaliar(q, 1)).toBe(-1);
    expect(avaliar(q, 2)).toBe(0);
    expect(s.complete_when.metric).toBe("na_raiz");
  });

  it("conferir-previsao: x² + 1 = 0 não tem raiz real", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("Nenhuma");
    expect(s.options.find((o) => !o.correct)!.label).toBe("Duas");
    expect(s.options).toHaveLength(4);
    const delta = (a: number, b: number, c: number) => b * b - 4 * a * c;
    expect(delta(1, 0, 1)).toBe(-4); // Δ < 0: nenhuma raiz real
    expect([1, -1].map((x) => avaliar(quadratica(1, 0, -1), x))).toEqual([0, 0]); // "Duas": ±1 resolve x² − 1 = 0
    expect([1, -1].map((x) => avaliar(quadratica(1, 0, 1), x))).toEqual([2, 2]);
    expect(delta(1, 0, 0)).toBe(0); // "Uma": esqueceu o c no Δ
    // "Duas: ±i": i² = −1 resolve x² + 1 = 0, mas ±i não são reais
    expect(s.options.map((o) => o.label)).toEqual(["Nenhuma", "Duas", "Uma", "Duas: ±i"]);
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
    // F1: y = x² encontra o eixo x em 1 ponto
    expect(certa("f1-equacoes-quadraticas")).toBe("1");

    // F2: y = x² + 1 toca o eixo x? Não
    expect(certa("f2-equacoes-quadraticas")).toBe("Não");

    // F3: raízes de x² - 1
    expect(certa("f3-equacoes-quadraticas")).toBe("−1 e 1");

    // F4: se a = 0 ainda é quadrática? Não
    expect(certa("f4-equacoes-quadraticas")).toBe("Não");
  });

  it("médias", () => {
    // M1: x² - 4 = 0 => x = ±2
    expect(Math.sqrt(4)).toBe(2);
    expect(certa("m1-equacoes-quadraticas")).toBe("−2 e 2");

    // M2: x² - 3x + 2 = 0 => (x-1)(x-2) = 0 => 1 e 2
    expect(1 * 2).toBe(2);
    expect(1 + 2).toBe(3);
    expect(certa("m2-equacoes-quadraticas")).toBe("1 e 2");

    // M3: x² - 2x + 1 = 0 => (x-1)² = 0 => 1 raiz distinta
    expect(certa("m3-equacoes-quadraticas")).toBe("1");
  });

  it("desafios", () => {
    // D1: x² - 2x + k = 0 raiz dupla => delta = 4 - 4k = 0 => k = 1
    expect(((-2) ** 2) / 4).toBe(1);
    expect(Number(certa("d1-equacoes-quadraticas"))).toBe(1);

    // D2: 4x² - 1 = 0 => x² = 1/4 => x = ±0.5
    expect(Math.sqrt(1 / 4)).toBe(0.5);
    expect(certa("d2-equacoes-quadraticas")).toBe("−0,5 e 0,5");

    // D3: x² + 2x + 2 = 0 => (x+1)² + 1 > 0 => vazio
    expect(certa("d3-equacoes-quadraticas")).toBe("∅");

    // D4: raízes 1 e 3, a=1 => (x-1)(x-3) = x² - 4x + 3 = 0
    expect(certa("d4-equacoes-quadraticas")).toBe("x²−4x+3=0");

    // D5: x(x+1) = 6 => x² + x - 6 = 0 => (x-2)(x+3) = 0 => x = 2
    expect(2 * (2 + 1)).toBe(6);
    expect(Number(certa("d5-equacoes-quadraticas"))).toBe(2);
  });

  it("vestibular: UFPR 2025 Q05 (A) e UFRGS 2024 Q48 (D), gabaritos oficiais", () => {
    // (x + 1)(x − 3) = x² − 2x − 3
    const b = -(-1 + 3);
    const c = -1 * 3;
    expect(b + c).toBe(-5);
    expect(certa("ufpr-2025-b-mais-c")).toBe("−5");
    // x² + 2x − 15 = (x + 5)(x − 3): ab = −15 e a + b = −2
    for (const r of [3, -5]) expect(r * r + 2 * r - 15).toBe(0);
    expect((3 * -5) ** (3 + -5)).toBeCloseTo(1 / 225, 12);
    expect(certa("ufrgs-2024-potencia-raizes")).toBe("1/225");
  });
});
