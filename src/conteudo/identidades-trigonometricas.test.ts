// Identidades Trigonométricas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/identidades-trigonometricas/aula-01.json",
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

describe("passos da aula de identidades trigonométricas", () => {
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
        expect(["theta", "quad"]).toContain(metric);
      }
    }
  });

  it("desafio-achar-cosseno: sen θ = 3/5 no 1º Q dá cos θ = 4/5", () => {
    const s = step("desafio-achar-cosseno");
    if (s.type !== "micro_challenge") throw new Error();
    const cosVal = Math.sqrt(1 - (3 / 5) ** 2);
    expect(cosVal).toBeCloseTo(4 / 5, 5);
    expect(s.options.find((o) => o.correct)!.label).toBe("4/5");
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
  it("fáceis: soma dos quadrados, isolar cos², secante e tangente", () => {
    // f1: sen²37° + cos²37° = 1
    expect(certa("soma-quadrados-37")).toBe("1");

    // f2: cos²θ = 1 - 0,3 = 0,7
    const cos2 = 1 - 0.3;
    expect(cos2).toBeCloseTo(0.7, 5);
    expect(certa("isolar-cos2")).toBe("0,7");

    // f3: sec θ = 1 / (2/5) = 5/2
    expect(certa("calcular-secante")).toBe("5/2");

    // f4: tg θ = 0,6 / 0,8 = 3/4
    const tgVal = 0.6 / 0.8;
    expect(tgVal).toBeCloseTo(3 / 4, 5);
    expect(certa("tangente-por-seno-cosseno")).toBe("3/4");
  });

  it("médias: cosseno no 2º Q, secante pela tangente e simplificação", () => {
    // m1: sen θ = 4/5 no 2º Q => cos θ = -3/5
    expect(certa("cosseno-no-2q")).toBe("−3/5");

    // m2: tg θ = 2 => sec²θ = 1 + 2² = 5
    const sec2 = 1 + 2 ** 2;
    expect(sec2).toBe(5);
    expect(certa("secante-pela-tangente")).toBe("5");

    // m3: (1 - cos²θ) / cos²θ = tg²θ
    expect(certa("simplificar-expressao")).toBe("tg²θ");
  });

  it("desafios: tangente no 3º Q, quadrado da soma, cossecante, fatoração e sec/cos por tg", () => {
    // d1: cos θ = -12/13 no 3º Q => sen θ = -5/13 => tg θ = 5/12
    expect(certa("achar-tangente-3q")).toBe("5/12");

    // d2: (sen θ + cos θ)² = 1 + 2 * 0,2 = 1,4
    const somaQuad = 1 + 2 * 0.2;
    expect(somaQuad).toBeCloseTo(1.4, 5);
    expect(certa("quadrado-da-soma")).toBe("1,4");

    // d3: cossec θ = 1 / sen θ nunca pode assumir valor com |x| < 1 (ex.: 0,5)
    expect(certa("fronteira-cossecante")).toBe("0,5");

    // d4: 3*1 - 1 = 2
    const fatVal = 3 * 1 - 1;
    expect(fatVal).toBe(2);
    expect(certa("fatoracao-3-vezes")).toBe("2");

    // d5: tg θ = √3 no 3º Q => sec θ = -2 e cos θ = -1/2
    expect(certa("cosseno-pela-tangente")).toBe("−2 e −1/2");
  });

  it("vestibular (B45a): UNICAMP 2025 Q50 (sen(π/12) = √(2−√3)/2) e UFPR 2024 Q05 ([sen+cos]² = 1,6)", () => {
    const cos2 = (1 + Math.cos(Math.PI / 6)) / 2;
    const sen = Math.sqrt(1 - cos2);
    expect(sen).toBeCloseTo(Math.sqrt(2 - Math.sqrt(3)) / 2, 10);
    expect(sen).toBeCloseTo(Math.sin(Math.PI / 12), 10);
    expect(certa("unicamp-2025-sen-pi12")).toBe("√(2 − √3)/2");

    // x com sen(2x) = 3/5: (sen x + cos x)² = 1 + sen(2x) = 1,6; o distrator 0,8 é cos(2x)
    const x = Math.asin(3 / 5) / 2;
    expect((Math.sin(x) + Math.cos(x)) ** 2).toBeCloseTo(1.6, 10);
    expect(Math.cos(2 * x)).toBeCloseTo(0.8, 10);
    expect(certa("ufpr-2024-soma-quadrado")).toBe("1,6");
  });
});
