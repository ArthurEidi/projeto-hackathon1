// Sólidos de Revolução · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { areaCentroide, perfilDe } from "../widgets/common/solido/cenas";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/solidos-de-revolucao/aula-01.json",
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

describe("passos da aula de solidos de revolucao", () => {
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
        expect(["giro", "volume_pi", "perfis_girados"]).toContain(metric);
      }
    }
  });

  it("trocar-eixo-do-triangulo: cateto 4 no eixo dá 12π, cateto 3 no eixo dá 16π", () => {
    const s = step("trocar-eixo-do-triangulo");
    if (s.type !== "interactive_canvas") throw new Error();
    const t1 = areaCentroide(perfilDe("triangulo", 3, 4, 0, 0));
    expect(t1.A * 2 * t1.cr).toBeCloseTo(12, 9);
    const t2 = areaCentroide(perfilDe("triangulo", 4, 3, 0, 0));
    expect(t2.A * 2 * t2.cr).toBeCloseTo(16, 9);
  });

  it("afastar-do-eixo-furo: retângulo 2 x 5 a d=1 do eixo tem volume 40π", () => {
    const s = step("afastar-do-eixo-furo");
    if (s.type !== "interactive_canvas") throw new Error();
    const anel = areaCentroide(perfilDe("anel", 2, 5, 0, 1));
    expect(anel.A * 2 * anel.cr).toBeCloseTo((3 ** 2 - 1 ** 2) * 5, 9);
    expect((3 ** 2 - 1 ** 2) * 5).toBe(40);
  });

  it("desafio-revolucao-trapezio: cilindro 8π + cone 4π = 12π e erradas refletem erros reais", () => {
    const vCilindro = Math.PI * 2 ** 2 * 2;
    const vCone = (Math.PI * 2 ** 2 * 3) / 3;
    expect((vCilindro + vCone) / Math.PI).toBeCloseTo(12, 9);
    const s = step("desafio-revolucao-trapezio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("Cilindro + cone (12π)");
    // dois cilindros (não dividiu o cone por 3): 8π + 12π = 20π ≠ 12π
    expect(2 ** 2 * 2 + 2 ** 2 * 3).toBe(20);
    expect(s.options.find((o) => o.id === "cc20")!.label).toBe("Dois cilindros (20π)");
    // só o cone: 4π ≠ 12π
    expect((2 ** 2 * 3) / 3).toBe(4);
    expect(s.options.find((o) => o.id === "co4")!.label).toBe("Só um cone (4π)");
    // esqueceu de elevar r = 2 ao quadrado: 2*2 + (2*3)/3 = 6π ≠ 12π
    const semQuadrado = 2 * 2 + (2 * 3) / 3;
    expect(semQuadrado).toBe(6);
    expect(s.options.find((o) => o.id === "cc6")!.label).toBe("Cilindro + cone (6π)");
    expect(s.options.find((o) => o.id === "cc6")!.label).not.toBe(certaOpt.label);
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
  it("F1 perfil-do-cone: triângulo retângulo gera cone", () => {
    expect(certa("perfil-do-cone")).toBe("Triângulo retângulo");
  });

  it("F2 perfil-do-tronco: trapézio retângulo gera tronco de cone", () => {
    expect(certa("perfil-do-tronco")).toBe("Tronco de cone");
  });

  it("F3 volume-retangulo-girando: π * 2² * 5 = 20π", () => {
    expect(2 ** 2 * 5).toBe(20);
    expect(certa("volume-retangulo-girando")).toBe("20π cm³");
  });

  it("F4 volume-triangulo-girando: (π * 3² * 6) / 3 = 18π", () => {
    expect((3 ** 2 * 6) / 3).toBe(18);
    expect(certa("volume-triangulo-girando")).toBe("18π cm³");
  });

  it("M1 razao-volumes-trocando-catetos: V2/V1 = 24π / 8π = 3", () => {
    const v1 = (2 ** 2 * 6) / 3;
    const v2 = (6 ** 2 * 2) / 3;
    expect(v2 / v1).toBe(3);
    expect(certa("razao-volumes-trocando-catetos")).toBe("3");
  });

  it("M2 retangulo-afastado-do-eixo: (3² - 1²) * 4 = 32π", () => {
    expect((3 ** 2 - 1 ** 2) * 4).toBe(32);
    expect(certa("retangulo-afastado-do-eixo")).toBe("32π cm³");
  });

  it("M3 triangulo-isoceles-na-base: dois cones colados pela base", () => {
    expect(certa("triangulo-isoceles-na-base")).toContain("Dois cones colados");
  });

  it("D1 volume-dois-cones-isoceles: 2 * (16 * 3 / 3) = 32π", () => {
    expect(2 * ((4 ** 2 * 3) / 3)).toBe(32);
    expect(certa("volume-dois-cones-isoceles")).toBe("32π cm³");
  });

  it("D2 triangulo-retangulo-na-hipotenusa: 2 * (1² * 1 / 3) = 2/3 π", () => {
    expect((2 * (1 ** 2 * 1)) / 3).toBeCloseTo(2 / 3, 9);
    expect(certa("triangulo-retangulo-na-hipotenusa")).toBe("2π/3 cm³");
  });

  it("D3 semicirculo-com-furo-cilindrico: (4/3) * 3³ = 36π", () => {
    expect((4 / 3) * 3 ** 3).toBe(36);
    expect(certa("semicirculo-com-furo-cilindrico")).toBe("36π cm³");
  });

  it("D4 quadrado-girando-pela-diagonal: 2 * (3² * 3 / 3) = 18π", () => {
    expect(2 * ((3 ** 2 * 3) / 3)).toBe(18);
    expect(certa("quadrado-girando-pela-diagonal")).toBe("18π cm³");
  });

  it("D5 pappus-guldin-anel-quadrado: 4 * 10π = 40π", () => {
    expect(4 * (2 * 5)).toBe(40);
    expect(certa("pappus-guldin-anel-quadrado")).toBe("40π cm³");
  });
});
