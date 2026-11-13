// Plano cartesiano: distância e ponto médio · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/plano-cartesiano-distancia-e-ponto-medio/aula-01.json",
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

describe("passos da aula de distância e ponto médio no plano", () => {
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
        expect(["dx", "dy", "distancia", "quadrados_ligados", "medio_ligado"]).toContain(metric);
      }
    }
  });

  it("mesma-altura: dy alcança 3", () => {
    const s = step("mesma-altura");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("dy");
    expect(s.complete_when.gte).toBe(3);
  });

  it("pitagoras: quadrados_ligados alcança 1", () => {
    const s = step("pitagoras");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("quadrados_ligados");
    expect(s.complete_when.gte).toBe(1);
  });

  it("sinais-somem: dx alcança <= -3", () => {
    const s = step("sinais-somem");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("dx");
    expect(s.complete_when.lte).toBe(-3);
  });

  it("ponto-medio: medio_ligado alcança 1", () => {
    const s = step("ponto-medio");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("medio_ligado");
    expect(s.complete_when.gte).toBe(1);
  });

  it("desafio-6-8: sqrt(36 + 64) = 10", () => {
    const s = step("desafio-6-8");
    if (s.type !== "micro_challenge") throw new Error();
    expect(Math.hypot(6, 8)).toBe(10);
    expect(s.options.find((o) => o.correct)?.label).toBe("10");
  });

  it("fechamento: referências da fórmula existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref]).toBeDefined();
    }
  });
});

describe("treino: gabaritos conferidos por conta", () => {
  it("F1 mesma-linha: dx = 4 - 1 = 3", () => {
    expect(4 - 1).toBe(3);
    expect(certa("mesma-linha")).toBe("3");
  });

  it("F2 medio-2-4-6-8: ((2+6)/2; (4+8)/2) = (4; 6)", () => {
    expect((2 + 6) / 2).toBe(4);
    expect((4 + 8) / 2).toBe(6);
    expect(certa("medio-2-4-6-8")).toBe("(4; 6)");
  });

  it("F3 delta-x: 7 - 2 = 5", () => {
    expect(7 - 2).toBe(5);
    expect(certa("delta-x")).toBe("5");
  });

  it("F4 ponto-a-si: dx = dy = 0", () => {
    expect(Math.hypot(0, 0)).toBe(0);
    expect(certa("ponto-a-si")).toBe("0");
  });

  it("M1 tres-quatro-cinco: sqrt(9 + 16) = 5", () => {
    expect(Math.hypot(3, 4)).toBe(5);
    expect(certa("tres-quatro-cinco")).toBe("5");
  });

  it("M2 um-dois-quatro-seis: dx=3, dy=4 => 5", () => {
    expect(Math.hypot(4 - 1, 6 - 2)).toBe(5);
    expect(certa("um-dois-quatro-seis")).toBe("5");
  });

  it("M3 medio-negativos: ((-2+4)/2; (3-1)/2) = (1; 1)", () => {
    expect((-2 + 4) / 2).toBe(1);
    expect((3 - 1) / 2).toBe(1);
    expect(certa("medio-negativos")).toBe("(1; 1)");
  });

  it("D1 achar-b-pelo-medio: 2*(3,4) - (1,1) = (5, 7)", () => {
    expect(2 * 3 - 1).toBe(5);
    expect(2 * 4 - 1).toBe(7);
    expect(certa("achar-b-pelo-medio")).toBe("(5; 7)");
  });

  it("D2 perimetro: 3 + 4 + 5 = 12", () => {
    expect(3 + 4 + Math.hypot(3, 4)).toBe(12);
    expect(certa("perimetro")).toBe("12");
  });

  it("D3 equidistante-no-eixo: x^2 + 4 = (x-4)^2 => 8x = 12 => x = 1.5", () => {
    const x = (16 - 4) / 8;
    expect(x).toBe(1.5);
    expect(certa("equidistante-no-eixo")).toBe("(1,5; 0)");
  });

  it("D4 sinais-misturados: (-3)^2 + 4^2 = 25 => 5", () => {
    expect(Math.hypot(-1 - 2, 1 - (-3))).toBe(5);
    expect(certa("sinais-misturados")).toBe("5");
  });

  it("D5 diagonal-unitaria: sqrt(1 + 1) = sqrt(2)", () => {
    expect(Math.hypot(2 - 1, 2 - 1)).toBeCloseTo(Math.SQRT2, 9);
    expect(certa("diagonal-unitaria")).toBe("√2");
  });

  it("V1 etam-2011-distancia: sqrt(2^2 + 2^2) = 2*sqrt(2)", () => {
    expect(Math.hypot(1 - (-1), 1 - (-1))).toBeCloseTo(2 * Math.SQRT2, 9);
    expect(certa("etam-2011-distancia")).toBe("2√2");
  });

  it("V2 ufrr-2017-valor-de-y: 9 + (y-2)^2 = 25 => y-2 = +-4 => y = 6 ou -2", () => {
    const d2 = 25;
    const dx2 = (4 - 1) ** 2;
    const dy = Math.sqrt(d2 - dx2);
    expect(dy).toBe(4);
    expect(2 + dy).toBe(6);
    expect(2 - dy).toBe(-2);
    expect(certa("ufrr-2017-valor-de-y")).toBe("6 e −2");
  });
});
