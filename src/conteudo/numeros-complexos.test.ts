// Números complexos no plano · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/polinomios-e-complexos/numeros-complexos/aula-01.json",
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

describe("passos da aula de números complexos no plano", () => {
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
        expect(["a", "n", "t", "b"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: a alcança 2", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("a");
    expect(s.complete_when.gte).toBe(2);
  });

  it("girar-por-i: n alcança 2", () => {
    const s = step("girar-por-i");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("n");
    expect(s.complete_when.gte).toBe(2);
  });

  it("somar-e-dividir: t alcança 1", () => {
    const s = step("somar-e-dividir");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("t");
    expect(s.complete_when.gte).toBe(1);
  });

  it("conjugado-e-modulo: b alcança 4", () => {
    const s = step("conjugado-e-modulo");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("b");
    expect(s.complete_when.gte).toBe(4);
  });

  it("conferir-previsao: |3+4i| = 5", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(Math.hypot(3, 4)).toBe(5);
    expect(s.options.find((o) => o.correct)?.label).toBe("5");
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
  it("F1 f1-numeros-complexos: Re=3, Im=2 => (3;2)", () => {
    expect(certa("f1-numeros-complexos")).toBe("(3; 2)");
  });

  it("F2 f2-numeros-complexos: i^2 = -1", () => {
    expect(certa("f2-numeros-complexos")).toBe("−1");
  });

  it("F3 f3-numeros-complexos: z*1 = z => Não", () => {
    expect(certa("f3-numeros-complexos")).toBe("Não");
  });

  it("F4 f4-numeros-complexos: conjugado de 4-2i é 4+2i", () => {
    expect(certa("f4-numeros-complexos")).toBe("4+2i");
  });

  it("M1 m1-numeros-complexos: (2+i) + (1+3i) = 3+4i", () => {
    expect(2 + 1).toBe(3);
    expect(1 + 3).toBe(4);
    expect(certa("m1-numeros-complexos")).toBe("3+4i");
  });

  it("M2 m2-numeros-complexos: i*(3+2i) = -2+3i", () => {
    expect(certa("m2-numeros-complexos")).toBe("−2+3i");
  });

  it("M3 m3-numeros-complexos: |3+4i| = sqrt(9+16) = 5", () => {
    expect(Math.hypot(3, 4)).toBe(5);
    expect(certa("m3-numeros-complexos")).toBe("5");
  });

  it("D1 d1-numeros-complexos: 1/(1+i) = (1-i)/2 = 0.5 - 0.5i", () => {
    expect(1 / 2).toBe(0.5);
    expect(certa("d1-numeros-complexos")).toBe("0,5−0,5i");
  });

  it("D2 d2-numeros-complexos: divisão por zero não é permitida => Não", () => {
    expect(certa("d2-numeros-complexos")).toBe("Não");
  });

  it("D3 d3-numeros-complexos: z^2 = -1 => z = +-i", () => {
    expect(certa("d3-numeros-complexos")).toBe("±i");
  });

  it("D4 d4-numeros-complexos: (1+i)^2 = 1 + 2i - 1 = 2i", () => {
    expect(certa("d4-numeros-complexos")).toBe("2i");
  });

  it("D5 d5-numeros-complexos: z = 2/(1+i) = 1-i, z+i = 1", () => {
    expect(certa("d5-numeros-complexos")).toBe("1");
  });
});
