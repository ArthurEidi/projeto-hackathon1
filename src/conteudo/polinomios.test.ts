// Polinômios: grau, termos e raízes · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/polinomios-e-complexos/polinomios/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
const quad = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "quadratica", a, b, c });
const cubica = (a: number, b: number, c: number, d: number): CurvaResolvida => ({ tipo: "cubica", a, b, c, d });

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

  it("caso-neutro: P(x) = x conserva a entrada e em x = −1 vale −1", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const p = afim(1, 0);
    expect(avaliar(p, -1)).toBe(-1);
    expect(avaliar(p, 0)).toBe(0);
    expect(s.complete_when.lte).toBe(-1);
  });

  it("somar-quadrado: P(x) = ax² + x com a = 1 adiciona 4 às saídas de x = ±2", () => {
    const s = step("somar-quadrado");
    if (s.type !== "interactive_canvas") throw new Error();
    const linear = quad(0, 1, 0);
    const completa = quad(1, 1, 0);
    expect(avaliar(completa, 2) - avaliar(linear, 2)).toBe(4);
    expect(avaliar(completa, -2) - avaliar(linear, -2)).toBe(4);
    expect(s.complete_when.gte).toBe(1);
  });

  it("raizes-e-grau: quando a vai a 0 em ax³ + x, a curva vira afim (grau 1)", () => {
    const s = step("raizes-e-grau");
    if (s.type !== "interactive_canvas") throw new Error();
    const c0 = cubica(0, 0, 1, 0);
    const r = afim(1, 0);
    expect(avaliar(c0, 2)).toBe(avaliar(r, 2));
    expect(avaliar(c0, -3)).toBe(avaliar(r, -3));
    expect(s.complete_when.lte).toBe(0);
  });

  it("desafio-micro: grau de 3x³ − 2x + 1 é 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("3");
    // soma dos coeficientes sem sinal: |3| + |-2| + |1| = 6
    expect(Math.abs(3) + Math.abs(-2) + Math.abs(1)).toBe(6);
    expect(s.options.find((o) => o.id === "micro-erro")!.label).toBe("6");
    // soma dos expoentes: 3 + 1 = 4 ≠ 3
    expect(3 + 1).toBe(4);
    expect(s.options.find((o) => o.id === "soma-expoentes")!.label).toBe("4");
    expect("4").not.toBe(certaOpt.label);
    // menor expoente de x (em -2x¹) ou termo constante 1 ≠ 3
    expect(1).not.toBe(3);
    expect(s.options.find((o) => o.id === "termo-menor")!.label).toBe("1");
    expect("1").not.toBe(certaOpt.label);
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
    // F1: P(x) = x => P(-1) = -1
    expect(certa("f1-polinomios")).toBe("−1");

    // F2: Grau de 3x³ - 2x + 1 é 3
    expect(certa("f2-polinomios")).toBe("3");

    // F3: P(x) = x² + 3x - 2 => P(0) = -2
    const p3 = (x: number) => x * x + 3 * x - 2;
    expect(p3(0)).toBe(-2);
    expect(certa("f3-polinomios")).toBe("−2");

    // F4: Raiz de P produz saída 0
    expect(certa("f4-polinomios")).toBe("0");
  });

  it("médias", () => {
    // M1: P(x) = x² - 1 => P(2) = 2² - 1 = 3
    const m1 = (x: number) => x * x - 1;
    expect(m1(2)).toBe(3);
    expect(Number(certa("m1-polinomios"))).toBe(3);

    // M2: x(x - 2) = 0 => raízes 0 e 2
    expect(certa("m2-polinomios")).toBe("0 e 2");

    // M3: x³ - x³ + 2x = 2x => grau 1
    expect(certa("m3-polinomios")).toBe("1");
  });

  it("desafios", () => {
    // D1: P(x) = ax² + x com a = 0 => P(x) = x => grau 1
    expect(certa("d1-polinomios")).toBe("1");

    // D2: Polinômio zero não tem grau definido nesta aula
    expect(certa("d2-polinomios")).toBe("Não");

    // D3: P(x) = 2x - 1 = 0 => 2x = 1 => x = 1/2 = 0.5
    expect(1 / 2).toBe(0.5);
    expect(certa("d3-polinomios")).toBe("0,5");

    // D4: P(x) = x³ + x = x(x² + 1) = 0 => apenas x = 0 é real (1 raiz real)
    expect(certa("d4-polinomios")).toBe("1");

    // D5: P(x) = ax² + b; P(0) = 1 => b = 1; P(1) = 3 => a + 1 = 3 => a = 2
    // P(2) = 2*(2²) + 1 = 8 + 1 = 9
    const b = 1;
    const a = 3 - b;
    const p5 = (x: number) => a * x * x + b;
    expect(p5(2)).toBe(9);
    expect(Number(certa("d5-polinomios"))).toBe(9);
  });

  it("vestibular: Unicamp 2026 Q45 (gabarito oficial b)", () => {
    // graus n + m = 8: max(n, m) ≥ 4 > 3, então a soma só cai de grau se n = m e os líderes se cancelam
    const pares: number[][] = [];
    for (let n = 0; n <= 8; n++) if (Math.max(n, 8 - n) > 3 && n === 8 - n) pares.push([n, 8 - n]);
    expect(pares).toEqual([[4, 4]]);
    // exemplo: p = x⁴ + x³, q = −x⁴ + 1 ⇒ p + q = x³ + 1 (grau 3), p − q = 2x⁴ + x³ − 1 (grau 4)
    const p = [0, 0, 0, 1, 1]; // coeficientes de x⁰ a x⁴
    const q = [1, 0, 0, 0, -1];
    const grau = (c: number[]) => c.reduce((g, v, i) => (v !== 0 ? i : g), -1);
    expect(grau(p.map((v, i) => v + q[i]))).toBe(3);
    expect(grau(p.map((v, i) => v - q[i]))).toBe(4);
    expect(certa("unicamp-2026-grau-diferenca")).toBe("4");
  });
});
