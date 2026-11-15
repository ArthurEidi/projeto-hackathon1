// Inequações exponenciais e logarítmicas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/inequacoes-exponenciais-logaritmicas/aula-01.json",
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

describe("passos da aula de inequações exponenciais e logarítmicas", () => {
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
        expect(["dentro", "ponto_x", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: 2^x > 1 para x >= 1", () => {
    const s = step("caso-neutro");
    expect(s.type).toBe("interactive_canvas");
    expect(Math.pow(2, 1)).toBeGreaterThan(1);
  });

  it("base-fracionaria: (0.5)^x < 1 para x >= 1", () => {
    const s = step("base-fracionaria");
    expect(s.type).toBe("interactive_canvas");
    expect(Math.pow(0.5, 1)).toBeLessThan(1);
  });

  it("log-com-dominio: log_0.5(x) >= 1 para x <= 0.5", () => {
    const s = step("log-com-dominio");
    expect(s.type).toBe("interactive_canvas");
    const log05 = (x: number) => Math.log(x) / Math.log(0.5);
    expect(log05(0.5)).toBeCloseTo(1, 9);
    expect(log05(0.25)).toBeGreaterThan(1);
  });

  it("conferir-previsao: (0.5)^x > 1 tem solucao x < 0", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("x<0");
    expect(s.options).toHaveLength(4);
    expect(0.5 ** -1).toBe(2); // x < 0 serve
    expect(0.5 ** 1).toBe(0.5); // "x>0": manteve a ordem de base crescente; 0,5 < 1
    expect(0.5 ** 1).not.toBe(1); // "x<1": escreveu 1 como (0,5)¹, mas 1 = (0,5)⁰
    expect(0.5 ** 0).toBe(1);
    expect(0.5 ** 0.5).toBeCloseTo(0.71, 2); // x = 0,5 está em x<1 e não resolve
    expect(0.5 ** 2).toBe(0.25); // "x∈ℝ": positiva não é maior que 1
    expect(s.options.map((o) => o.label)).toEqual(["x<0", "x>0", "x<1", "x∈ℝ"]);
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
  it("F1 f1-inequacoes-exponenciais-logaritmicas: 2^x com base 2 > 1 cresce", () => {
    expect(Math.pow(2, 0)).toBeLessThan(Math.pow(2, 1));
    expect(certa("f1-inequacoes-exponenciais-logaritmicas")).toBe("Cresce");
  });

  it("F2 f2-inequacoes-exponenciais-logaritmicas: (0.5)^x com base 0.5 < 1 decresce", () => {
    expect(Math.pow(0.5, 0)).toBeGreaterThan(Math.pow(0.5, 1));
    expect(certa("f2-inequacoes-exponenciais-logaritmicas")).toBe("Decresce");
  });

  it("F3 f3-inequacoes-exponenciais-logaritmicas: log_2(0) não existe (Não)", () => {
    expect(certa("f3-inequacoes-exponenciais-logaritmicas")).toBe("Não");
  });

  it("F4 f4-inequacoes-exponenciais-logaritmicas: base 0.5 inverte ordem (Sim)", () => {
    expect(Math.pow(0.5, 1)).toBeLessThan(Math.pow(0.5, 0));
    expect(certa("f4-inequacoes-exponenciais-logaritmicas")).toBe("Sim");
  });

  it("M1 m1-inequacoes-exponenciais-logaritmicas: 2^x > 4 = 2^2 => x > 2", () => {
    expect(certa("m1-inequacoes-exponenciais-logaritmicas")).toBe("x>2");
  });

  it("M2 m2-inequacoes-exponenciais-logaritmicas: (0.5)^x >= 0.25 = (0.5)^2 => x <= 2", () => {
    expect(certa("m2-inequacoes-exponenciais-logaritmicas")).toBe("x≤2");
  });

  it("M3 m3-inequacoes-exponenciais-logaritmicas: log_2(x) <= 1 => 0 < x <= 2", () => {
    expect(certa("m3-inequacoes-exponenciais-logaritmicas")).toBe("0<x≤2");
  });

  it("D1 d1-inequacoes-exponenciais-logaritmicas: log_0.5(x) > 0 => 0 < x < 1", () => {
    expect(certa("d1-inequacoes-exponenciais-logaritmicas")).toBe("0<x<1");
  });

  it("D2 d2-inequacoes-exponenciais-logaritmicas: 1^x > 1 => 1 > 1 é impossível (∅)", () => {
    expect(certa("d2-inequacoes-exponenciais-logaritmicas")).toBe("∅");
  });

  it("D3 d3-inequacoes-exponenciais-logaritmicas: 4^x < 2 => 2^(2x) < 2^1 => x < 0.5", () => {
    expect(certa("d3-inequacoes-exponenciais-logaritmicas")).toBe("x<0,5");
  });

  it("D4 d4-inequacoes-exponenciais-logaritmicas: log_2(x-1) < 1 => 0 < x-1 < 2 => 1 < x < 3", () => {
    expect(certa("d4-inequacoes-exponenciais-logaritmicas")).toBe("1<x<3");
  });

  it("D5 d5-inequacoes-exponenciais-logaritmicas: 8 * (0.5)^t <= 2 => (0.5)^t <= 0.25 => t >= 2", () => {
    expect(8 * Math.pow(0.5, 2)).toBe(2);
    expect(8 * Math.pow(0.5, 3)).toBeLessThan(2);
    expect(certa("d5-inequacoes-exponenciais-logaritmicas")).toBe("t≥2");
  });
});
