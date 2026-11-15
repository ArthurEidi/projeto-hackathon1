// Inequações-produto e inequações-quociente · Aula 01: passos completáveis e gabaritos conferidos com conta.
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
        "../../content/algebra/equacoes-e-inequacoes/inequacoes-produto-quociente/aula-01.json",
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

describe("passos da aula de inequações-produto e inequações-quociente", () => {
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

  it("caso-neutro: trecho [1; +inf) contém 1 mas não 0", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho = (s.params as { trechos: Parameters<typeof dentroDoTrecho>[0][] }).trechos[0];
    expect(dentroDoTrecho(trecho, 0)).toBe(false);
    expect(dentroDoTrecho(trecho, 1)).toBe(true);
    expect(dentroDoTrecho(trecho, 2)).toBe(true);
  });

  it("produto-de-sinais: trechos (-inf; -1] e [1; +inf) contêm 2", () => {
    const s = step("produto-de-sinais");
    if (s.type !== "interactive_canvas") throw new Error();
    const trechos = (s.params as { trechos: Parameters<typeof dentroDoTrecho>[0][] }).trechos;
    expect(trechos.some((t) => dentroDoTrecho(t, 2))).toBe(true);
    expect(trechos.some((t) => dentroDoTrecho(t, 0))).toBe(false);
  });

  it("excluir-denominador: trecho (-inf; -1) tem -1 aberto e contém -2", () => {
    const s = step("excluir-denominador");
    if (s.type !== "interactive_canvas") throw new Error();
    const trecho1 = (s.params as { trechos: Parameters<typeof dentroDoTrecho>[0][] }).trechos[0];
    expect(trecho1.abreAte).toBe(true);
    expect(dentroDoTrecho(trecho1, -1)).toBe(false);
    expect(dentroDoTrecho(trecho1, -2)).toBe(true);
  });

  it("conferir-previsao: x = -1 não é solução de (x-1)/(x+1) >= 0", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)?.label).toBe("Não: não existe");
    expect(s.options).toHaveLength(4);
    const x = -1;
    expect(x + 1).toBe(0); // denominador zera: a fração não existe em −1
    expect(x - 1).toBe(-2); // "Não: dá −2": olhou só o numerador
    expect(Number.isFinite((x - 1) / (x + 1))).toBe(false); // "Sim: dá 0": −2 ÷ 0 não é 0
    // "Sim": o ≥ aceita valor 0, que pede numerador zero (x = 1), não denominador zero
    expect((1 - 1) / (1 + 1)).toBe(0);
    expect(s.options.map((o) => o.label)).toEqual(["Sim", "Sim: dá 0", "Não: dá −2", "Não: não existe"]);
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
  it("F1 f1-inequacoes-produto-quociente: x+1 = 0 => x = -1", () => {
    expect(-1 + 1).toBe(0);
    expect(certa("f1-inequacoes-produto-quociente")).toBe("−1");
  });

  it("F2 f2-inequacoes-produto-quociente: denominador x+1 zera em -1", () => {
    expect(certa("f2-inequacoes-produto-quociente")).toBe("−1");
  });

  it("F3 f3-inequacoes-produto-quociente: (0-1)*(0+1) = -1 < 0 (Negativo)", () => {
    const prod = (0 - 1) * (0 + 1);
    expect(prod).toBe(-1);
    expect(prod < 0).toBe(true);
    expect(certa("f3-inequacoes-produto-quociente")).toBe("Negativo");
  });

  it("F4 f4-inequacoes-produto-quociente: divisão por zero não existe (Não)", () => {
    expect(certa("f4-inequacoes-produto-quociente")).toBe("Não");
  });

  it("M1 m1-inequacoes-produto-quociente: (x-1)(x+1) > 0 => x < -1 ou x > 1", () => {
    expect((-2 - 1) * (-2 + 1)).toBeGreaterThan(0);
    expect((2 - 1) * (2 + 1)).toBeGreaterThan(0);
    expect((0 - 1) * (0 + 1)).toBeLessThan(0);
    expect(certa("m1-inequacoes-produto-quociente")).toBe("x<−1 ou x>1");
  });

  it("M2 m2-inequacoes-produto-quociente: (x-1)/(x+1) >= 0 => x < -1 ou x >= 1", () => {
    expect(certa("m2-inequacoes-produto-quociente")).toBe("x<−1 ou x≥1");
  });

  it("M3 m3-inequacoes-produto-quociente: x/(x-2) < 0 => (0;2)", () => {
    const f = (x: number) => x / (x - 2);
    expect(f(1)).toBeLessThan(0);
    expect(f(-1)).toBeGreaterThan(0);
    expect(f(3)).toBeGreaterThan(0);
    expect(certa("m3-inequacoes-produto-quociente")).toBe("(0;2)");
  });

  it("D1 d1-inequacoes-produto-quociente: (x-1)^2/(x+1) > 0 => (-1;1) U (1;+inf)", () => {
    const f = (x: number) => Math.pow(x - 1, 2) / (x + 1);
    expect(f(1)).toBe(0); // não é > 0
    expect(f(0)).toBeGreaterThan(0);
    expect(f(2)).toBeGreaterThan(0);
    expect(f(-2)).toBeLessThan(0);
    expect(certa("d1-inequacoes-produto-quociente")).toBe("(−1;1)∪(1;+∞)");
  });

  it("D2 d2-inequacoes-produto-quociente: x^2/(x-1) <= 0 => (-inf; 1)", () => {
    const f = (x: number) => (x * x) / (x - 1);
    expect(f(0)).toBeLessThanOrEqual(0);
    expect(f(-1)).toBeLessThan(0);
    expect(f(2)).toBeGreaterThan(0);
    expect(certa("d2-inequacoes-produto-quociente")).toBe("(−∞;1)");
  });

  it("D3 d3-inequacoes-produto-quociente: (2x-1)/(x+1) <= 0 => (-1; 0,5]", () => {
    const f = (x: number) => (2 * x - 1) / (x + 1);
    expect(f(0.5)).toBe(0);
    expect(f(0)).toBeLessThan(0);
    expect(f(-0.5)).toBeLessThan(0);
    expect(f(1)).toBeGreaterThan(0);
    expect(certa("d3-inequacoes-produto-quociente")).toBe("(−1;0,5]");
  });

  it("D4 d4-inequacoes-produto-quociente: (x-1)^2 >= 0 para todo real", () => {
    expect(certa("d4-inequacoes-produto-quociente")).toBe("R");
  });

  it("D5 d5-inequacoes-produto-quociente: (x-1)(x+1)/(x-1) > 0 => (-1;1) U (1;+inf)", () => {
    expect(certa("d5-inequacoes-produto-quociente")).toBe("(−1;1)∪(1;+∞)");
  });
});
