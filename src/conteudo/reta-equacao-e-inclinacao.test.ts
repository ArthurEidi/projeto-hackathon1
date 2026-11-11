// Reta: Equação e Inclinação · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, raizes, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/reta-equacao-e-inclinacao/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de reta e inclinação", () => {
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
        expect(["quadrantes", "na_raiz", "no_encontro", "ponto_x", "intercepto_tocado"]).toContain(metric);
      }
    }
  });

  it("desafio-fronteira: inclinação de reta vertical é indefinida", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("Indefinida");
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
  it("fáceis: m=0, reta bissetriz, corte y, leitura do triângulo", () => {
    // m-0: (1; 1) e (3; 1)
    const m0 = (1 - 1) / (3 - 1);
    expect(certa("m-0")).toBe(String(m0));

    // m-1-corte-0: m=1, n=0 -> y = x
    expect(certa("m-1-corte-0")).toBe("y = x");

    // corte-em-3: y = 2x + 3 corta em (0; 3)
    expect(certa("corte-em-3")).toBe("(0; 3)");

    // delta-y-por-delta-x: (1; 2) a (3; 6) -> dx = 2, dy = 4
    expect(certa("delta-y-por-delta-x")).toBe("Δx = 2 e Δy = 4");
  });

  it("médias: 2 pontos, equação e ponto pertencente", () => {
    // m-3: (2; 1) e (4; 7)
    const m = (7 - 1) / (4 - 2);
    expect(m).toBe(3);
    expect(certa("m-3")).toBe(String(m));

    // equacao-m-menos-1: (0; 4) e (2; 2)
    const m2 = (2 - 4) / (2 - 0);
    expect(m2).toBe(-1);
    expect(certa("equacao-m-menos-1")).toBe("y = −x + 4");

    // ponto-na-reta: y = 3x - 1 para x = 2
    const yVal = 3 * 2 - 1;
    expect(yVal).toBe(5);
    expect(certa("ponto-na-reta")).toBe(String(yVal));
  });

  it("desafios: achar equação, inclinação negativa, vertical, raiz e alinhamento", () => {
    // reta-2-1-4-5: (2; 1) e (4; 5)
    const mComp = (5 - 1) / (4 - 2);
    const nComp = 1 - mComp * 2;
    expect(mComp).toBe(2);
    expect(nComp).toBe(-3);
    expect(certa("reta-2-1-4-5")).toBe("y = 2x − 3");

    // m-negativo: (1; 5) e (3; 1)
    const mNeg = (1 - 5) / (3 - 1);
    expect(mNeg).toBe(-2);
    expect(certa("m-negativo")).toBe("−2");

    // corte-no-eixo-x: y = −2x + 6 -> −2x + 6 = 0 -> x = 3
    const raiz = raizes(afim(-2, 6), -5, 5)[0];
    expect(raiz).toBe(3);
    expect(certa("corte-no-eixo-x")).toBe("x = 3");

    // reta-vertical: (1; 1) e (1; 5) -> x = 1
    expect(certa("reta-vertical")).toBe("x = 1");

    // alinhados: (0; 1), (1; 3) e (2; k) alinhados -> m = 2 -> k = 5
    expect(certa("alinhados")).toBe("5");
  });
});
