// Vetores no plano e operações · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-analitica/vetores-no-plano/aula-01.json",
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

describe("passos da aula de vetores no plano", () => {
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
        expect(["origens_vistas", "v_comprimento", "k", "modulo_ligado"]).toContain(metric);
      }
    }
  });

  it("mesmo-vetor: origens_vistas alcança 3", () => {
    const s = step("mesmo-vetor");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("origens_vistas");
    expect(s.complete_when.gte).toBe(3);
  });

  it("somar-encaixando: v_comprimento alcança 2", () => {
    const s = step("somar-encaixando");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("v_comprimento");
    expect(s.complete_when.gte).toBe(2);
  });

  it("esticar: k alcança 2", () => {
    const s = step("esticar");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("k");
    expect(s.complete_when.gte).toBe(2);
  });

  it("modulo: modulo_ligado alcança 1", () => {
    const s = step("modulo");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.metric).toBe("modulo_ligado");
    expect(s.complete_when.gte).toBe(1);
  });

  it("desafio-soma: (2,3) + (4,-1) = (6,2)", () => {
    const s = step("desafio-soma");
    if (s.type !== "micro_challenge") throw new Error();
    expect(2 + 4).toBe(6);
    expect(3 + -1).toBe(2);
    expect(s.options.find((o) => o.correct)?.label).toBe("(6; 2)");
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
  it("F1 soma-simples: (1,2) + (3,4) = (4,6)", () => {
    expect(1 + 3).toBe(4);
    expect(2 + 4).toBe(6);
    expect(certa("soma-simples")).toBe("(4; 6)");
  });

  it("F2 dobro: 2 * (1,3) = (2,6)", () => {
    expect(2 * 1).toBe(2);
    expect(2 * 3).toBe(6);
    expect(certa("dobro")).toBe("(2; 6)");
  });

  it("F3 modulo-vertical: |(0,5)| = 5", () => {
    expect(Math.hypot(0, 5)).toBe(5);
    expect(certa("modulo-vertical")).toBe("5");
  });

  it("F4 vetor-ab: (4,3) - (1,1) = (3,2)", () => {
    expect(4 - 1).toBe(3);
    expect(3 - 1).toBe(2);
    expect(certa("vetor-ab")).toBe("(3; 2)");
  });

  it("M1 modulo-6-8: |(6,8)| = 10", () => {
    expect(Math.hypot(6, 8)).toBe(10);
    expect(certa("modulo-6-8")).toBe("10");
  });

  it("M2 subtracao: (5,2) - (1,3) = (4,-1)", () => {
    expect(5 - 1).toBe(4);
    expect(2 - 3).toBe(-1);
    expect(certa("subtracao")).toBe("(4; −1)");
  });

  it("M3 oposto: -1 * (2,-3) = (-2,3)", () => {
    expect(-1 * 2).toBe(-2);
    expect(-1 * -3).toBe(3);
    expect(certa("oposto")).toBe("(−2; 3)");
  });

  it("D1 achar-oposto: u + v = 0 => v = (-3,2)", () => {
    expect(3 + -3).toBe(0);
    expect(-2 + 2).toBe(0);
    expect(certa("achar-oposto")).toBe("(−3; 2)");
  });

  it("D2 qual-k: k * (2,1) = (6,3) => k = 3", () => {
    expect(6 / 2).toBe(3);
    expect(3 / 1).toBe(3);
    expect(certa("qual-k")).toBe("3");
  });

  it("D3 modulo-da-soma: |(1,2) + (2,2)| = |(3,4)| = 5", () => {
    expect(Math.hypot(1 + 2, 2 + 2)).toBe(5);
    expect(certa("modulo-da-soma")).toBe("5");
  });

  it("D4 mesma-direcao: 3 * (1,2) = (3,6)", () => {
    expect(3 * 1).toBe(3);
    expect(3 * 2).toBe(6);
    expect(certa("mesma-direcao")).toBe("(3; 6)");
  });

  it("D5 volta-ao-inicio: AB + BC + CA = AA = 0", () => {
    expect(certa("volta-ao-inicio")).toBe("O vetor nulo");
  });
});
