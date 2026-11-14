// Grandezas diretamente e inversamente proporcionais · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/aritmetica/proporcionalidade/grandezas-direta-e-inversa/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
const racional = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "racional", a, b, c });

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
      const { metric } = s.complete_when;
      expect(s.controls.find((c) => c.id === metric)).toBeUndefined();
      expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
    }
  });

  it("caso-neutro: em y = x, a razão y/x é 1 e dobrar x dobra y", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = afim(1, 0);
    expect(avaliar(r, 1)).toBe(1);
    expect(avaliar(r, 2)).toBe(2);
    expect(avaliar(r, 2) / 2).toBe(avaliar(r, 1) / 1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("manter-produto: em y = 6/x, o produto x·y = 6 e x = 2 dá y = 3", () => {
    const s = step("manter-produto");
    if (s.type !== "interactive_canvas") throw new Error();
    const inv = racional(6, 0, 0);
    expect(1 * avaliar(inv, 1)).toBe(6);
    expect(2 * avaliar(inv, 2)).toBe(6);
    expect(avaliar(inv, 2)).toBe(3);
    expect(s.complete_when.gte).toBe(2);
  });

  it("testar-taxa-fixa: em y = 2x + 1, a razão varia (3/1 ≠ 5/2)", () => {
    const s = step("testar-taxa-fixa");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = afim(2, 1);
    expect(avaliar(r, 1)).toBe(3);
    expect(avaliar(r, 2)).toBe(5);
    expect(avaliar(r, 2)).not.toBe(2 * avaliar(r, 1));
    expect(s.complete_when.gte).toBe(2);
  });

  it("conferir-previsao: se xy = 6 e x = 2, então y = 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("3");
    expect(s.options.find((o) => !o.correct)!.label).toBe("12");
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
    // F1: y = 2x => y/x = 2 constante
    expect(certa("f1-grandezas-direta-e-inversa")).toBe("y/x");

    // F2: xy = 6 => produto constante
    expect(certa("f2-grandezas-direta-e-inversa")).toBe("Produto");

    // F3: y = x => dobrar x dobra y (Sim)
    expect(certa("f3-grandezas-direta-e-inversa")).toBe("Sim");

    // F4: relação crescente nem sempre é diretamente proporcional (Não)
    expect(certa("f4-grandezas-direta-e-inversa")).toBe("Não");
  });

  it("médias", () => {
    // M1: y = 3x, x = 2 => y = 6
    expect(3 * 2).toBe(6);
    expect(Number(certa("m1-grandezas-direta-e-inversa"))).toBe(6);

    // M2: xy = 6, x = 2 => y = 3
    expect(6 / 2).toBe(3);
    expect(Number(certa("m2-grandezas-direta-e-inversa"))).toBe(3);

    // M3: 2 cadernos custam 6 => unitário = 3 => 3 cadernos = 9
    expect((6 / 2) * 3).toBe(9);
    expect(Number(certa("m3-grandezas-direta-e-inversa"))).toBe(9);
  });

  it("desafios", () => {
    // D1: y = 2x + 1 => Não é diretamente proporcional
    expect(certa("d1-grandezas-direta-e-inversa")).toBe("Não");

    // D2: em y = 6/x, x = 0 não é permitido (divisão por zero)
    expect(certa("d2-grandezas-direta-e-inversa")).toBe("Não");

    // D3: relação direta com (2; 1) => k = 1/2 => em x = 1, y = 0.5
    expect(1 / 2).toBe(0.5);
    expect(certa("d3-grandezas-direta-e-inversa")).toBe("0,5");

    // D4: se xy = 8 e x triplica, y divide por 3
    expect(certa("d4-grandezas-direta-e-inversa")).toBe("Divide por 3");

    // D5: 2 máquinas em 6h => 12h-máquina; 3 máquinas => 12 / 3 = 4h
    expect((2 * 6) / 3).toBe(4);
    expect(Number(certa("d5-grandezas-direta-e-inversa"))).toBe(4);
  });

  it("vestibular: contas e fontes conferidas", () => {
    expect((80 + 200 + 80) * 0.05 - (22 - 420 * 0.05)).toBeCloseTo(17, 10);
    expect(Number(certa("enem-2020-moto"))).toBe(17);
    expect((3 * 4) / 2).toBeCloseTo(6, 10);
    expect(Number(certa("enem-2021-boxes").replace(",", "."))).toBe(6);
    const k = 31000 / (1 / 2 + 1 / 3 + 1 / 5);
    expect(k / 5).toBeCloseTo(6000, 10);
    expect(certa("enem-2019-maquinas")).toBe("R$ 6.000,00");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
