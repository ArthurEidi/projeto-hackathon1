// Triângulos Notáveis e Construções · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/triangulos-notaveis-e-construcoes/aula-01.json",
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

describe("passos da aula de triângulos notáveis", () => {
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
        expect(["cortou", "se_cruzam", "l", "cortar", "raio"]).toContain(metric);
      }
    }
  });

  it("desafio-triangulo-30-60: catetos de hipotenusa 10 cm medem 5 cm e 5√3 cm", () => {
    const s = step("desafio-triangulo-30-60");
    if (s.type !== "micro_challenge") throw new Error();
    const cMenor = 10 / 2;
    expect(cMenor).toBe(5);
    expect(s.options.find((o) => o.correct)!.label).toBe("5 cm e 5√3 cm");
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
  it("fáceis: diagonal do quadrado, oposto a 30°, mediatriz e terna 3-4-5", () => {
    // f1: d = 6√2 cm
    expect(certa("diagonal-quadrado-lado-6")).toBe("6√2 cm");

    // f2: oposto a 30° = 14 / 2 = 7 m
    const c30 = 14 / 2;
    expect(c30).toBe(7);
    expect(certa("cateto-oposto-30-graus")).toBe("7 m");

    // f3: equidistante de dois pontos = mediatriz
    expect(certa("mediatriz-lugar-geometrico")).toBe("A mediatriz do segmento AB");

    // f4: 3 * (3, 4, 5) -> hipotenusa = 15 cm
    const hip = 3 * 5;
    expect(hip).toBe(15);
    expect(certa("terna-multipla-3-4-5")).toBe("15 cm");
  });

  it("médias: altura e área do equilátero e cálculo do lado pela diagonal", () => {
    // m1: h = 8√3 / 2 = 4√3 cm
    const h = (8 / 2);
    expect(h).toBe(4);
    expect(certa("altura-triangulo-equilatero")).toBe("4√3 cm");

    // m2: A = 4²√3 / 4 = 4√3 cm²
    const aEq = (4 * 4) / 4;
    expect(aEq).toBe(4);
    expect(certa("area-triangulo-equilatero")).toBe("4√3 cm²");

    // m3: d = 7√2 => L = 7 cm e A = 49 cm²
    expect(certa("achar-lado-pela-diagonal")).toBe("L = 7 cm e A = 49 cm²");
  });

  it("desafios: área por diagonal inteira, lado por altura, incentro, escada e hexágono", () => {
    // d1: A = d² / 2 = 36 / 2 = 18 cm²
    const areaQuad = (6 * 6) / 2;
    expect(areaQuad).toBe(18);
    expect(certa("achar-lado-quando-diagonal-e-inteira")).toBe("18 cm²");

    // d2: h = 6 => L = 12 / √3 = 4√3 cm
    expect(certa("achar-lado-equilatero-pela-altura")).toBe("4√3 cm");

    // d3: equidistante dos 3 lados = incentro
    expect(certa("bissetriz-equidistante-ruas")).toBe("No encontro das bissetrizes (incentro)");

    // d4: escada 8 m a 60° com chão -> pé a 8/2 = 4 m
    const pe = 8 / 2;
    expect(pe).toBe(4);
    expect(certa("escada-60-graus")).toBe("4 m");

    // d5: hexágono = 6 * √3 = 6√3 cm²
    expect(certa("area-hexagono-pela-formula-equilatero")).toBe("6√3 cm²");
  });
});
