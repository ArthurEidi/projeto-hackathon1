// Área do círculo, setores e coroas circulares · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/area-do-circulo-e-setores/aula-01.json",
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

describe("passos da aula de área do círculo, setores e coroas circulares", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
        const alvo = (gte ?? lte)!;
        expect(((alvo - slider.min) / slider.step) % 1, `${s.id}: alvo fora do passo`).toBeCloseTo(0, 9);
      } else {
        expect(["n", "area", "razao_base", "area_setor", "fracao", "coef_setor", "area_coroa", "coef_coroa", "furo"]).toContain(metric);
      }
    }
  });

  it("encaixar-fatias-retangulo: fatias alcança 24", () => {
    const s = step("encaixar-fatias-retangulo");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("fatias");
    expect(s.complete_when.gte).toBe(24);
  });

  it("setor-fatia-da-volta: alfa reduz até 60", () => {
    const s = step("setor-fatia-da-volta");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("alfa");
    expect(s.complete_when.lte).toBe(60);
  });

  it("coroa-circular-anel: r_int alcança 3", () => {
    const s = step("coroa-circular-anel");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("r_int");
    expect(s.complete_when.gte).toBe(3);
  });

  it("desafio-setor-90: raio 4 cm e 90° => 4π cm²", () => {
    const s = step("desafio-setor-90");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("4π cm²");
  });

  it("fechamento: referências existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref]).toBeDefined();
    }
  });
});

describe("treino: gabaritos conferidos por conta", () => {
  it("F1 area-circulo-r5: π * 5² = 25π cm²", () => {
    expect(5 * 5).toBe(25);
    expect(certa("area-circulo-r5")).toBe("25π cm²");
  });

  it("F2 area-pelo-diametro-6: (6/2)² = 9π m²", () => {
    const r = 6 / 2;
    expect(r * r).toBe(9);
    expect(certa("area-pelo-diametro-6")).toBe("9π m²");
  });

  it("F3 area-semicirculo-r4: (4²)/2 = 8π cm²", () => {
    expect((4 * 4) / 2).toBe(8);
    expect(certa("area-semicirculo-r4")).toBe("8π cm²");
  });

  it("F4 coroa-simples-4-e-2: 4² - 2² = 12π cm²", () => {
    expect(4 * 4 - 2 * 2).toBe(12);
    expect(certa("coroa-simples-4-e-2")).toBe("12π cm²");
  });

  it("M1 setor-60-graus: (60/360) * 6² = 6π cm²", () => {
    expect((60 / 360) * 36).toBe(6);
    expect(certa("setor-60-graus")).toBe("6π cm²");
  });

  it("M2 achar-raio-pela-area: sqrt(49) * 2 = 14 cm", () => {
    expect(Math.sqrt(49) * 2).toBe(14);
    expect(certa("achar-raio-pela-area")).toBe("14 cm");
  });

  it("M3 setor-120-graus: (120/360) * 30² = 300π cm²", () => {
    expect((120 / 360) * (30 * 30)).toBe(300);
    expect(certa("setor-120-graus")).toBe("300π cm²");
  });

  it("D1 pizza-dobro-do-diametro: (40/20)² = 4", () => {
    expect(Math.pow(40 / 20, 2)).toBe(4);
    expect(certa("pizza-dobro-do-diametro")).toBe("4");
  });

  it("D2 pista-de-caminhada-em-volta: 5² - 4² = 9π m²", () => {
    expect(5 * 5 - 4 * 4).toBe(9);
    expect(certa("pista-de-caminhada-em-volta")).toBe("9π m²");
  });

  it("D3 quadrado-menos-circulo-inscrito: 4² - π*2² = 16 − 4π cm²", () => {
    expect(4 * 4).toBe(16);
    expect(2 * 2).toBe(4);
    expect(certa("quadrado-menos-circulo-inscrito")).toBe("16 − 4π cm²");
  });

  it("D4 achar-angulo-do-setor: (9/36) * 360 = 90°", () => {
    expect((9 / 36) * 360).toBe(90);
    expect(certa("achar-angulo-do-setor")).toBe("90°");
  });

  it("D5 area-setor-pelo-arco: (5 * 4) / 2 = 10π cm²", () => {
    expect((5 * 4) / 2).toBe(10);
    expect(certa("area-setor-pelo-arco")).toBe("10π cm²");
  });

  it("V1 enem-2019-praca: 3 * (7^2 - 3^2) = 120 m² > 100 m²", () => {
    expect(3 * (7 ** 2 - 3 ** 2)).toBe(120);
    expect(certa("enem-2019-praca")).toBe("Não será suficiente, pois a área da nova região a ser pavimentada mede 120 m²");
  });

  it("V2 enem-2018-chafariz: R^2 - r^2 = (16/2)^2 = 64 => 64π", () => {
    expect((16 / 2) ** 2).toBe(64);
    expect(certa("enem-2018-chafariz")).toBe("64π");
  });

  it("V3 enem-2021-cartao: círculo 3*5^2 = 75 cm² <= 80 cm² vence", () => {
    expect(3 * 5 ** 2).toBe(75);
    expect(certa("enem-2021-cartao")).toBe("Círculo");
  });
});
