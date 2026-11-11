// Trigonometria no triângulo retângulo · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/trigonometria-no-triangulo-retangulo/aula-01.json",
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

describe("passos da aula de trigonometria no triângulo retângulo", () => {
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
        expect(["k", "theta", "razao_sen", "razao_cos", "razao_tg"]).toContain(metric);
      }
    }
  });

  it("caso-neutro-45: k varia de 1 a 3", () => {
    const s = step("caso-neutro-45");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("k");
    expect(s.complete_when.gte).toBe(3);
  });

  it("seno-e-cosseno: theta varia até 30", () => {
    const s = step("seno-e-cosseno");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("theta");
    expect(s.complete_when.lte).toBe(30);
  });

  it("complementares-60: theta varia até 60", () => {
    const s = step("complementares-60");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("theta");
    expect(s.complete_when.gte).toBe(60);
  });

  it("desafio-rampa: rampa de 10 m a 30° dá altura 5 m", () => {
    const s = step("desafio-rampa");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("5 m");
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
  it("F1 seno-3-4-5: CO = 3, HIP = 5 => sen = 3/5", () => {
    expect(3 / 5).toBe(0.6);
    expect(certa("seno-3-4-5")).toBe("3/5");
  });

  it("F2 tangente-45: em 45°, CO = CA => tg = 1", () => {
    expect(Math.tan(Math.PI / 4)).toBeCloseTo(1, 9);
    expect(certa("tangente-45")).toBe("1");
  });

  it("F3 cosseno-definicao: cos = CA / HIP", () => {
    expect(certa("cosseno-definicao")).toBe("CA / HIP");
  });

  it("F4 escala-dobrada: dobrar lados não altera sen θ (Não muda)", () => {
    expect(certa("escala-dobrada")).toBe("Não muda");
  });

  it("M1 escada-60: 8 * cos 60° = 8 * 0.5 = 4 m", () => {
    expect(8 * 0.5).toBe(4);
    expect(certa("escada-60")).toBe("4 m");
  });

  it("M2 sombra-torre: tg 45° = 1 => h = 12 m", () => {
    expect(12 * 1).toBe(12);
    expect(certa("sombra-torre")).toBe("12 m");
  });

  it("M3 complementar-seno: sen α = 0.8 => cos β = 0.8", () => {
    expect(certa("complementar-seno")).toBe("0,8");
  });

  it("D1 achar-hipotenusa: 7 / 0.5 = 14 cm", () => {
    expect(7 / 0.5).toBe(14);
    expect(certa("achar-hipotenusa")).toBe("14 cm");
  });

  it("D2 pitagoras-e-tangente: hip 13, op 5 => adj 12 => tg 5/12", () => {
    expect(Math.sqrt(13 * 13 - 5 * 5)).toBe(12);
    expect(certa("pitagoras-e-tangente")).toBe("5/12");
  });

  it("D3 fronteira-seno-maior-1: cateto sempre menor que hipotenusa", () => {
    expect(certa("fronteira-seno-maior-1")).toBe("O cateto é sempre menor que a hipotenusa");
  });

  it("D4 altura-observador: 10 * 0.58 + 1.5 = 7.3 m", () => {
    expect(10 * 0.58 + 1.5).toBeCloseTo(7.3, 9);
    expect(certa("altura-observador")).toBe("7,3 m");
  });

  it("D5 dois-angulos-predio: 20/0.5 - 20/1 = 40 - 20 = 20 m", () => {
    expect(20 / 0.5 - 20 / 1).toBe(20);
    expect(certa("dois-angulos-predio")).toBe("20 m");
  });
});
