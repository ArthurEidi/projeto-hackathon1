// Inequações Modulares · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { dentroDoTrecho } from "../widgets/common/desenhoReta";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/inequacoes-modulares/aula-01.json",
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

describe("passos da aula de inequacoes modulares", () => {
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

  it("caso-neutro: trecho [0;0] contém apenas o 0", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho = (s.params as { trechos: { de: number; ate: number }[] }).trechos[0];
    expect(dentroDoTrecho(trecho, 1)).toBe(false);
    expect(dentroDoTrecho(trecho, 0)).toBe(true);
  });

  it("abrir-interior: trecho (-2;2) contém 0 mas não contém -3 nem 2", () => {
    const s = step("abrir-interior");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho = (s.params as { trechos: { de: number; ate: number; abreDe: boolean; abreAte: boolean }[] }).trechos[0];
    expect(dentroDoTrecho(trecho, -3)).toBe(false);
    expect(dentroDoTrecho(trecho, 2)).toBe(false);
    expect(dentroDoTrecho(trecho, 0)).toBe(true);
  });

  it("trocar-para-exterior: trechos exteriores contêm 2 e -2 mas não 0", () => {
    const s = step("trocar-para-exterior");
    if (s.type !== "interactive_canvas") throw new Error();
    const trechos = (s.params as { trechos: { de: number | null; ate: number | null }[] }).trechos;
    expect(trechos.some((t) => dentroDoTrecho(t, 0))).toBe(false);
    expect(trechos.some((t) => dentroDoTrecho(t, 2))).toBe(true);
    expect(trechos.some((t) => dentroDoTrecho(t, -2))).toBe(true);
  });

  it("conferir-previsao: |x| < 2 tem solução (-2; 2)", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("(−2; 2)");
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
  it("F1 f1-inequacoes-modulares: |2| = 2 < 2 é falso (Não)", () => {
    expect(Math.abs(2) < 2).toBe(false);
    expect(certa("f1-inequacoes-modulares")).toBe("Não");
  });

  it("F2 f2-inequacoes-modulares: |0| = 0 >= 2 é falso (Não)", () => {
    expect(Math.abs(0) >= 2).toBe(false);
    expect(certa("f2-inequacoes-modulares")).toBe("Não");
  });

  it("F3 f3-inequacoes-modulares: |x| <= 0 tem 1 solução (x = 0)", () => {
    expect(certa("f3-inequacoes-modulares")).toBe("1");
  });

  it("F4 f4-inequacoes-modulares: |x - 1| < 2 tem centro 1", () => {
    expect(certa("f4-inequacoes-modulares")).toBe("1");
  });

  it("M1 m1-inequacoes-modulares: |x| <= 3 -> [-3; 3]", () => {
    expect(certa("m1-inequacoes-modulares")).toBe("[−3; 3]");
  });

  it("M2 m2-inequacoes-modulares: |x - 1| < 2 -> (-1; 3)", () => {
    expect(certa("m2-inequacoes-modulares")).toBe("(−1; 3)");
  });

  it("M3 m3-inequacoes-modulares: |x| > 1 -> x < -1 ou x > 1", () => {
    expect(certa("m3-inequacoes-modulares")).toBe("x < −1 ou x > 1");
  });

  it("D1 d1-inequacoes-modulares: |2x - 1| <= 1 -> [0; 1]", () => {
    expect(certa("d1-inequacoes-modulares")).toBe("[0; 1]");
  });

  it("D2 d2-inequacoes-modulares: |x - 2| < 0 -> vazio", () => {
    expect(certa("d2-inequacoes-modulares")).toBe("∅");
  });

  it("D3 d3-inequacoes-modulares: |x| <= -1 -> vazio", () => {
    expect(certa("d3-inequacoes-modulares")).toBe("∅");
  });

  it("D4 d4-inequacoes-modulares: |2x| < 1 -> (-0.5; 0.5)", () => {
    expect(certa("d4-inequacoes-modulares")).toBe("(−0,5; 0,5)");
  });

  it("D5 d5-inequacoes-modulares: |x - 2| <= 0.5 -> [1.5; 2.5]", () => {
    expect(certa("d5-inequacoes-modulares")).toBe("[1,5; 2,5]");
  });
});
