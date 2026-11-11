// Inequações do Primeiro Grau · Aula 01: passos completáveis e gabaritos conferidos com conta.
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
        "../../content/algebra/equacoes-e-inequacoes/inequacoes-primeiro-grau/aula-01.json",
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

describe("passos da aula de inequacoes do primeiro grau", () => {
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

  it("caso-neutro: trecho x > 0 contém 1 mas não contém 0 nem -1", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho = (s.params as { trechos: Parameters<typeof dentroDoTrecho>[0][] }).trechos[0];
    expect(dentroDoTrecho(trecho, -1)).toBe(false);
    expect(dentroDoTrecho(trecho, 0)).toBe(false);
    expect(dentroDoTrecho(trecho, 1)).toBe(true);
  });

  it("mover-fronteira: trecho x > 1 contém 2 mas não contém 0", () => {
    const s = step("mover-fronteira");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho = (s.params as { trechos: Parameters<typeof dentroDoTrecho>[0][] }).trechos[0];
    expect(dentroDoTrecho(trecho, 0)).toBe(false);
    expect(dentroDoTrecho(trecho, 2)).toBe(true);
  });

  it("espelhar-ordem: trecho x < 1 contém 0 mas não contém 2", () => {
    const s = step("espelhar-ordem");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho = (s.params as { trechos: Parameters<typeof dentroDoTrecho>[0][] }).trechos[0];
    expect(dentroDoTrecho(trecho, 2)).toBe(false);
    expect(dentroDoTrecho(trecho, 0)).toBe(true);
  });

  it("conferir-previsao: a solução de -2x + 2 > 0 é x < 1", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("x < 1");
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
  it("F1 f1-inequacoes-primeiro-grau: 0 > 0 é falso", () => {
    expect(0 > 0).toBe(false);
    expect(certa("f1-inequacoes-primeiro-grau")).toBe("Não");
  });

  it("F2 f2-inequacoes-primeiro-grau: x > 1 fica à direita de 1", () => {
    expect(certa("f2-inequacoes-primeiro-grau")).toBe("Direita");
  });

  it("F3 f3-inequacoes-primeiro-grau: dividir por número negativo inverte o sinal", () => {
    expect(certa("f3-inequacoes-primeiro-grau")).toBe("Sim");
  });

  it("F4 f4-inequacoes-primeiro-grau: x >= 1 inclui o 1 (marca fechada)", () => {
    expect(certa("f4-inequacoes-primeiro-grau")).toBe("Fechada");
  });

  it("M1 m1-inequacoes-primeiro-grau: 2x - 2 > 0 -> x > 1", () => {
    expect((2) / 2).toBe(1);
    expect(certa("m1-inequacoes-primeiro-grau")).toBe("x > 1");
  });

  it("M2 m2-inequacoes-primeiro-grau: -2x + 2 > 0 -> x < 1", () => {
    expect(-2 / -2).toBe(1);
    expect(certa("m2-inequacoes-primeiro-grau")).toBe("x < 1");
  });

  it("M3 m3-inequacoes-primeiro-grau: 3x <= 6 -> x <= 2", () => {
    expect(6 / 3).toBe(2);
    expect(certa("m3-inequacoes-primeiro-grau")).toBe("x ≤ 2");
  });

  it("D1 d1-inequacoes-primeiro-grau: 2x + 1 <= x + 3 -> x <= 2", () => {
    expect(3 - 1).toBe(2);
    expect(certa("d1-inequacoes-primeiro-grau")).toBe("x ≤ 2");
  });

  it("D2 d2-inequacoes-primeiro-grau: 0x + 1 > 0 é verdadeiro para todo real", () => {
    expect(0 * 5 + 1 > 0).toBe(true);
    expect(certa("d2-inequacoes-primeiro-grau")).toBe("Todos");
  });

  it("D3 d3-inequacoes-primeiro-grau: 0x - 1 >= 0 é falso para todo real", () => {
    expect(0 * 5 - 1 >= 0).toBe(false);
    expect(certa("d3-inequacoes-primeiro-grau")).toBe("Nenhum");
  });

  it("D4 d4-inequacoes-primeiro-grau: -2x < 1 -> x > -0.5", () => {
    expect(1 / -2).toBe(-0.5);
    expect(certa("d4-inequacoes-primeiro-grau")).toBe("x > −0,5");
  });

  it("D5 d5-inequacoes-primeiro-grau: 3 + 2x <= 8 -> x <= 2.5 e x >= 0", () => {
    expect((8 - 3) / 2).toBe(2.5);
    expect(certa("d5-inequacoes-primeiro-grau")).toBe("[0; 2,5]");
  });
});
