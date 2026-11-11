// Triângulos, Congruência e Propriedades · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/triangulos-congruencia-e-propriedades/aula-01.json",
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

describe("passos da aula de triângulos e congruência", () => {
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
        expect(["vertices_movidos", "testou_congruencia", "soma_angulos"]).toContain(metric);
      }
    }
  });

  it("desafio-isosceles-externo: cada ângulo da base mede (180° − 40°) / 2 = 70°", () => {
    const s = step("desafio-isosceles-externo");
    if (s.type !== "micro_challenge") throw new Error();
    const anguloBase = (180 - 40) / 2;
    expect(anguloBase).toBe(70);
    expect(s.options.find((o) => o.correct)!.label).toBe(`${anguloBase}°`);
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
  it("fáceis: terceiro ângulo, externo direto, desigualdade e caso LAL", () => {
    // f1: 180° − (50° + 60°) = 70°
    const ang3 = 180 - (50 + 60);
    expect(ang3).toBe(70);
    expect(certa("terceiro-angulo")).toBe("70°");

    // f2: e = 45° + 35° = 80°
    const ext = 45 + 35;
    expect(ext).toBe(80);
    expect(certa("externo-direto")).toBe("80°");

    // f3: 3 + 4 = 7 > 5 forma triângulo
    expect(certa("lados-que-fecham")).toBe("3, 4 e 5");

    // f4: dois lados e o ângulo entre eles = LAL
    expect(certa("caso-congruencia-lal")).toBe("LAL");
  });

  it("médias: isósceles, proporção entre ângulos e ângulo externo com incógnita", () => {
    // m1: topo = 180° − 2 * 65° = 50°
    const topo = 180 - 2 * 65;
    expect(topo).toBe(50);
    expect(certa("isosceles-topo")).toBe("50°");

    // m2: x + 2x + 3x = 180° => 6x = 180° => x = 30° => 3x = 90°
    const x = 180 / 6;
    const maior = 3 * x;
    expect(maior).toBe(90);
    expect(certa("angulos-em-progressao")).toBe("90°");

    // m3: 130° − 55° = 75°
    const outro = 130 - 55;
    expect(outro).toBe(75);
    expect(certa("externo-com-incognita")).toBe("75°");
  });

  it("desafios: maior lado inteiro, decimal, bissetrizes, AAA e cadeia de isósceles", () => {
    // d1: c < 4 + 9 = 13 => maior inteiro é 12 cm
    const maxLado = 4 + 9 - 1;
    expect(maxLado).toBe(12);
    expect(certa("terceiro-lado-inteiro")).toBe("12 cm");

    // d2: (180° − 55°) / 2 = 62,5°
    const baseDec = (180 - 55) / 2;
    expect(baseDec).toBe(62.5);
    expect(certa("isosceles-decimal")).toBe("62,5°");

    // d3: B + C = 100°, metade = 50°, BPC = 180° − 50° = 130°
    const bpc = 180 - (180 - 80) / 2;
    expect(bpc).toBe(130);
    expect(certa("bissetrizes-internas")).toBe("130°");

    // d4: AAA garante forma, mas tamanho livre
    expect(certa("falso-caso-lla")).toBe("Têm mesma forma, mas lados podem diferir");

    // d5: BDC = 180° − 70° = 110°, A = 35° + 35° = 70°
    const bdc = 180 - 2 * 35;
    const angA = 35 + 35;
    expect(bdc).toBe(110);
    expect(angA).toBe(70);
    expect(certa("dois-isosceles-colados")).toBe("110° e 70°");
  });
});
