// Lei dos senos e lei dos cossenos · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/lei-dos-senos-e-cossenos/aula-01.json",
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

describe("passos da aula de lei dos senos e lei dos cossenos", () => {
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
        expect(["ang_a", "a", "a2", "termo_cos", "razao_a_sen", "dois_R"]).toContain(metric);
      }
    }
  });

  it("caso-neutro-pitagoras: ang_a varia até 60", () => {
    const s = step("caso-neutro-pitagoras");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("ang_a");
    expect(s.complete_when.lte).toBe(60);
  });

  it("angulo-obtuso: ang_a varia até 120", () => {
    const s = step("angulo-obtuso");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("ang_a");
    expect(s.complete_when.gte).toBe(120);
  });

  it("lei-dos-senos-2r: ang_a varia até 90", () => {
    const s = step("lei-dos-senos-2r");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("ang_a");
    expect(s.complete_when.gte).toBe(90);
  });

  it("desafio-cossenos: b = 5, c = 8, A = 60° => a = 7", () => {
    const s = step("desafio-cossenos");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("7");
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
  it("F1 cossenos-em-90: em 90°, cos 90° = 0 => a² = b² + c²", () => {
    expect(certa("cossenos-em-90")).toBe("a² = b² + c²");
  });

  it("F2 senos-diametro: R = 6 => 2R = 12", () => {
    expect(2 * 6).toBe(12);
    expect(certa("senos-diametro")).toBe("12");
  });

  it("F3 achar-lado-senos: 2 * 10 * 0.5 = 10", () => {
    expect(2 * 10 * 0.5).toBe(10);
    expect(certa("achar-lado-senos")).toBe("10");
  });

  it("F4 sinal-obtuso: A > 90° => a² > 25 (Maior que 25)", () => {
    expect(certa("sinal-obtuso")).toBe("Maior que 25");
  });

  it("M1 dois-angulos-senos: 6 / 0.5 * (sqrt(2)/2) = 6*sqrt(2)", () => {
    expect(certa("dois-angulos-senos")).toBe("6√2");
  });

  it("M2 cossenos-lado-3-5: a² = 9 + 25 - 2*3*5*(-0.5) = 49 => a = 7", () => {
    expect(Math.sqrt(9 + 25 - 2 * 3 * 5 * -0.5)).toBe(7);
    expect(certa("cossenos-lado-3-5")).toBe("7");
  });

  it("M3 achar-cosseno: 49 = 25 + 36 - 60*cos A => cos A = 1/5", () => {
    expect((61 - 49) / 60).toBe(0.2);
    expect(certa("achar-cosseno")).toBe("1/5");
  });

  it("D1 terceiro-angulo-senos: C = 60° => 2R = 12 / (sqrt(3)/2) => R = 4√3", () => {
    expect(certa("terceiro-angulo-senos")).toBe("4√3");
  });

  it("D2 classificar-triangulo: 7^2 = 49 > 4^2 + 5^2 = 41 => Obtuso", () => {
    expect(certa("classificar-triangulo")).toBe("Obtuso");
  });

  it("D3 cosseno-nao-inteiro: d² = 4 + 16 - 8 = 12 => d = 2√3 km", () => {
    expect(certa("cosseno-nao-inteiro")).toBe("2√3 km");
  });

  it("D4 fronteira-diametro: sen A = 16 / 16 = 1", () => {
    expect(16 / 16).toBe(1);
    expect(certa("fronteira-diametro")).toBe("1");
  });

  it("D5 combinar-seno-cosseno: a = 4 e 2R = 16/√7", () => {
    expect(certa("combinar-seno-cosseno")).toBe("a = 4 e 2R = 16/√7");
  });
});
