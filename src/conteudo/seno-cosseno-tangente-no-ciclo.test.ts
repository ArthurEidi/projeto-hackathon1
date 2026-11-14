// Seno, Cosseno e Tangente no Ciclo · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/seno-cosseno-tangente-no-ciclo/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;
const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de seno, cosseno e tangente no ciclo", () => {
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
        expect(["theta", "angulo", "quadrantes"]).toContain(metric);
      }
    }
  });

  it("desafio-reduzir-150: sen 150° = 1/2 e cos 150° = −√3/2", () => {
    const s = step("desafio-reduzir-150");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("1/2 e −√3/2");
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
  it("fáceis: cos 180°, sinais no 2º Q, sen 270° e sinal de tg no 3º Q", () => {
    // f1: cos 180° = -1, sen 180° = 0
    expect(certa("cosseno-180")).toBe("−1 e 0");

    // f2: no 2º quadrante: sen > 0 (+) e cos < 0 (-)
    expect(certa("sinais-2-quadrante")).toBe("+ e −");

    // f3: sen 270° = -1
    expect(certa("seno-270")).toBe("−1");

    // f4: tg no 3º quadrante é (-) / (-) = positivo
    expect(certa("tangente-sinal-3q")).toBe("Positivo");
  });

  it("médias: cos 120°, tg 225° e identificação de quadrante", () => {
    // m1: cos 120° = -cos 60° = -1/2
    expect(certa("valor-cos-120")).toBe("−1/2");

    // m2: tg 225° = +tg 45° = 1
    expect(certa("valor-tg-225")).toBe("1");

    // m3: sen < 0 e cos > 0 => 4º quadrante
    expect(certa("qual-quadrante")).toBe("4º quadrante");
  });

  it("desafios: sen(11π/6), duas soluções de sen, descontinuidade de tg, eixos e simetria", () => {
    // d1: sen(11π/6) = sen 330° = -0,5
    expect(certa("seno-330-rad")).toBe("−0,5");

    // d2: sen θ = 1/2 no ciclo => 30° e 150°
    expect(certa("duas-solucoes-seno")).toBe("Dois: 30° e 150°");

    // d3: tg indefinida em cos θ = 0 => π/2 e 3π/2
    expect(certa("fronteira-tangente-inexistente")).toBe("π/2 e 3π/2");

    // d4: 1 + (-1) - (-1) + 1 = 2
    const expEixos = 1 + -1 - -1 + 1;
    expect(expEixos).toBe(2);
    expect(certa("expressao-eixos")).toBe("2");

    // d5: cos 40° + cos 140° + sen 210° = 0 - 0,5 = -0,5
    expect(certa("simetria-soma-zero")).toBe("−0,5");
  });

  it("V1 enem-2009-projecao: x_Q vai de R a R*cos(d/R) => R(1 - cos d/r)", () => {
    expect(certa("enem-2009-projecao")).toBe("r(1 − cos(d/r))");
  });
});
