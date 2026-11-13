// Comprimento da circunferência · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/comprimento-da-circunferencia/aula-01.json",
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

describe("passos da aula de comprimento da circunferência", () => {
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
        expect(["giro", "d", "voltas", "rastro", "comprimento", "razao_c_d", "arco", "alfa", "percurso"]).toContain(metric);
      }
    }
  });

  it("desenrolar-pi: giro alcança 360", () => {
    const s = step("desenrolar-pi");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("giro");
    expect(s.complete_when.gte).toBe(360);
  });

  it("razao-constante-d: d alcança 3", () => {
    const s = step("razao-constante-d");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("d");
    expect(s.complete_when.gte).toBe(3);
  });

  it("comprimento-de-arco: alfa reduz até 90", () => {
    const s = step("comprimento-de-arco");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("alfa");
    expect(s.complete_when.lte).toBe(90);
  });

  it("voltas-da-roda: voltas alcança 10", () => {
    const s = step("voltas-da-roda");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("voltas");
    expect(s.complete_when.gte).toBe(10);
  });

  it("desafio-comprimento: raio 10 m => 2 * 3,14 * 10 = 62,8 m", () => {
    const s = step("desafio-comprimento");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("62,8 m");
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
  it("F1 significado-de-pi: razão C / d = π", () => {
    expect(certa("significado-de-pi")).toBe("π (cerca de 3,14)");
  });

  it("F2 comprimento-diametro-10: 3,14 * 10 = 31,4 cm", () => {
    expect(3.14 * 10).toBeCloseTo(31.4, 5);
    expect(certa("comprimento-diametro-10")).toBe("31,4 cm");
  });

  it("F3 comprimento-em-pi: 2 * 4 = 8π cm", () => {
    expect(2 * 4).toBe(8);
    expect(certa("comprimento-em-pi")).toBe("8π cm");
  });

  it("F4 meia-volta: 20 / 2 = 10 cm", () => {
    expect(20 / 2).toBe(10);
    expect(certa("meia-volta")).toBe("10 cm");
  });

  it("M1 cinco-voltas-pracinha: 5 * (2 * 3 * 20) = 600 m", () => {
    expect(5 * (2 * 3 * 20)).toBe(600);
    expect(certa("cinco-voltas-pracinha")).toBe("600 m");
  });

  it("M2 arco-60-graus: (60 / 360) * 2 * 3 * 6 = 6 cm", () => {
    expect((60 / 360) * (2 * 3 * 6)).toBe(6);
    expect(certa("arco-60-graus")).toBe("6 cm");
  });

  it("M3 achar-raio-pelo-comprimento: 180 / (2 * 3) = 30 cm", () => {
    expect(180 / (2 * 3)).toBe(30);
    expect(certa("achar-raio-pelo-comprimento")).toBe("30 cm");
  });

  it("D1 quantas-voltas-pneu: 180 / (2 * 3 * 0,3) = 100 voltas", () => {
    expect(180 / (2 * 3 * 0.3)).toBeCloseTo(100, 5);
    expect(certa("quantas-voltas-pneu")).toBe("100 voltas");
  });

  it("D2 perimetro-semicirculo-fronteira: 3,14 * 5 + 10 = 25,7 m", () => {
    expect(3.14 * 5 + 10).toBeCloseTo(25.7, 5);
    expect(certa("perimetro-semicirculo-fronteira")).toBe("25,7 m");
  });

  it("D3 pista-atletismo-raias: 2 * 3 * (12 - 10) = 12 m", () => {
    expect(2 * 3 * (12 - 10)).toBe(12);
    expect(certa("pista-atletismo-raias")).toBe("12 m");
  });

  it("D4 ponteiro-relogio: (15 / 60) * 2 * 3,14 * 10 = 15,7 cm", () => {
    expect((15 / 60) * (2 * 3.14 * 10)).toBeCloseTo(15.7, 5);
    expect(certa("ponteiro-relogio")).toBe("15,7 cm");
  });

  it("D5 duas-engrenagens: 4 * (15 / 5) = 12 voltas", () => {
    expect(4 * (15 / 5)).toBe(12);
    expect(certa("duas-engrenagens")).toBe("12 voltas");
  });
});
