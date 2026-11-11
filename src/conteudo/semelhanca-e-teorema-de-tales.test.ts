// Semelhança e Teorema de Tales · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/semelhanca-e-teorema-de-tales/aula-01.json",
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

describe("passos da aula de semelhança e Tales", () => {
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
        expect(["sobrepos_triangulos", "k", "corte", "giro"]).toContain(metric);
      }
    }
  });

  it("desafio-tales: proporção 4 / 6 = 6 / x resulta em x = 9", () => {
    const s = step("desafio-tales");
    if (s.type !== "micro_challenge") throw new Error();
    const x = (6 * 6) / 4;
    expect(x).toBe(9);
    expect(s.options.find((o) => o.correct)!.label).toBe(String(x));
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
  it("fáceis: razão k, Tales direto, preservação de ângulos e base média", () => {
    // f1: 6 / 3 = 2
    const k = 6 / 3;
    expect(k).toBe(2);
    expect(certa("razao-de-semelhanca")).toBe("2");

    // f2: 2 / 6 = 3 / x => x = 9
    const xTales = (3 * 6) / 2;
    expect(xTales).toBe(9);
    expect(certa("tales-direto")).toBe("9");

    // f3: semelhança preserva ângulos
    expect(certa("angulos-na-ampliacao")).toBe("40°, 60° e 80°");

    // f4: base média = 12 * 0,5 = 6 cm
    const baseMedia = 12 * 0.5;
    expect(baseMedia).toBe(6);
    expect(certa("paralela-no-meio")).toBe("6 cm");
  });

  it("médias: sombra de prédio, paralela interna e perímetro semelhante", () => {
    // m1: H / 1,8 = 10 / 2 => H = 9 m
    const hPredio = 1.8 * (10 / 2);
    expect(hPredio).toBe(9);
    expect(certa("sombra-predio")).toBe("9 m");

    // m2: DE / 15 = 2 / 5 => DE = 6
    const de = 15 * (2 / 5);
    expect(de).toBe(6);
    expect(certa("paralela-interna-total")).toBe("6");

    // m3: P = 14 * 3 = 42 cm
    const perim = 14 * 3;
    expect(perim).toBe(42);
    expect(certa("perimetro-semelhante")).toBe("42 cm");
  });

  it("desafios: Tales decimal, ampulheta, quadrado inscrito, rampa e trapézio", () => {
    // d1: 2 / 3 = 3 / x => x = 4,5
    const xDec = (3 * 3) / 2;
    expect(xDec).toBe(4.5);
    expect(certa("tales-decimal")).toBe("4,5");

    // d2: OD / 2 = 10 / 4 => OD = 5
    const od = 2 * (10 / 4);
    expect(od).toBe(5);
    expect(certa("ampulheta-alternos")).toBe("5");

    // d3: (6 - x) / 6 = x / 6 => 2x = 6 => x = 3
    expect(certa("quadrado-inscrito")).toBe("3");

    // d4: h / 3 = 4 / 12 => h = 1 m
    const hRampa = 3 * (4 / 12);
    expect(hRampa).toBe(1);
    expect(certa("rampa-altura-intermediaria")).toBe("1 m");

    // d5: maior = 25 * (60 / 50) = 30 m
    const maiorLote = 25 * (60 / 50);
    expect(maiorLote).toBe(30);
    expect(certa("trapezio-base-intermediaria")).toBe("30 m");
  });
});
