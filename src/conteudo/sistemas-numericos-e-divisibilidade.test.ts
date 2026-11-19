// Conjuntos numéricos, divisibilidade e fatoração prima · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { metricasGrupos } from "../widgets/common/grupos/calc";
import { Grupos } from "../widgets/common/grupos/params";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/aritmetica/conjuntos/sistemas-numericos-e-divisibilidade/aula-01.json",
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

describe("passos da aula de conjuntos numéricos, divisibilidade e fatoração prima", () => {
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
      }
    }
  });

  it("métricas do grupos_inteiros em agrupar-unidades, divisores-e-multiplos e fatorar-e-testar", () => {
    const p2 = step("agrupar-unidades");
    if (p2.type !== "interactive_canvas") throw new Error("esperava interactive_canvas");
    const g2 = Grupos.parse(p2.params);
    expect(metricasGrupos(g2, { d: 1 })).toMatchObject({ n: 6, d: 1, q: 6, resto: 0 });
    expect(metricasGrupos(g2, { d: 3 })).toMatchObject({ n: 6, d: 3, q: 2, resto: 0 });

    const p3 = step("divisores-e-multiplos");
    if (p3.type !== "interactive_canvas") throw new Error("esperava interactive_canvas");
    const g3 = Grupos.parse(p3.params);
    expect(metricasGrupos(g3, { m: 4 })).toMatchObject({ m: 4, resto_a: 0, resto_b: 4, resto: 4 });
    expect(metricasGrupos(g3, { m: 8 })).toMatchObject({ m: 8, resto_a: 0, resto_b: 2, resto: 2 });
    expect(metricasGrupos(g3, { m: 12 })).toMatchObject({ m: 12, resto_a: 0, resto_b: 0, resto: 0 });

    const p4 = step("fatorar-e-testar");
    if (p4.type !== "interactive_canvas") throw new Error("esperava interactive_canvas");
    const g4 = Grupos.parse(p4.params);
    expect(metricasGrupos(g4, { d: 3 })).toMatchObject({ n: 12, d: 3, q: 4, resto: 0 });
    expect(metricasGrupos(g4, { d: 5 })).toMatchObject({ n: 12, d: 5, q: 2, resto: 2 });
  });

  it("gabarito do micro-desafio confere com o resto de 6 dividido por 3 (resto 0)", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("0");
    expect(s.options).toHaveLength(4);
    expect(6 % 3).toBe(0);
    expect(Math.floor(6 / 3)).toBe(2); // quociente, não resto
    expect(6 - 3).toBe(3); // parou no 1º grupo; ainda cabe outro grupo de 3
    expect(6 - 3).toBeGreaterThanOrEqual(3);
    expect(6).toBe(3 * 2 + 0); // 6 é o dividendo
    expect(s.options.map((o) => o.label)).toEqual(["0", "2", "3", "6"]);
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: 0 pertence a N", () => {
    expect(certa("f1-sistemas-numericos-e-divisibilidade")).toBe("Sim");
  });

  it("F2: Z contém -2 mas não 0,5", () => {
    expect(certa("f2-sistemas-numericos-e-divisibilidade")).toBe("Z");
  });

  it("F3: 0,5 = 1/2 é racional", () => {
    expect(certa("f3-sistemas-numericos-e-divisibilidade")).toBe("Sim");
  });

  it("F4: 1 não é primo", () => {
    expect(certa("f4-sistemas-numericos-e-divisibilidade")).toBe("Não");
  });
});

describe("gabaritos das médias", () => {
  it("M1: 7 = 3·2 + 1 deixa resto 1", () => {
    expect(certa("m1-sistemas-numericos-e-divisibilidade")).toBe("1");
  });

  it("M2: 12 = 2²·3", () => {
    expect(certa("m2-sistemas-numericos-e-divisibilidade")).toBe("2²·3");
  });

  it("M3: mdc(6, 8) = 2", () => {
    expect(certa("m3-sistemas-numericos-e-divisibilidade")).toBe("2");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: mmc(4, 6) = 12", () => {
    expect(certa("d1-sistemas-numericos-e-divisibilidade")).toBe("12");
  });

  it("D2: 0 = 3·0 é múltiplo de 3", () => {
    expect(certa("d2-sistemas-numericos-e-divisibilidade")).toBe("Sim");
  });

  it("D3: √2 não é racional", () => {
    expect(certa("d3-sistemas-numericos-e-divisibilidade")).toBe("Não");
  });

  it("D4: 3·2 + 1 = 7", () => {
    expect(certa("d4-sistemas-numericos-e-divisibilidade")).toBe("7");
  });

  it("D5: sinais de 4 e 6 s coincidem em mmc(4, 6) = 12 s", () => {
    expect(certa("d5-sistemas-numericos-e-divisibilidade")).toBe("12");
  });
});

describe("gabaritos do vestibular", () => {
  it("ENEM 2021/176, 2012/161 e 2009/156", () => {
    expect(2050 - (1000 + 400 + 60 + 9)).toBe(581);
    expect(certa("enem-2021-romano")).toBe("581");
    expect(certa("enem-2012-ordens")).toBe("Centena de milhar");
    const cpf = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const s1 = cpf.reduce((acc, d, i) => acc + d * (10 - i), 0);
    const r1 = s1 % 11;
    const d1 = r1 < 2 ? 0 : 11 - r1;
    const s2 = [...cpf.slice(1), d1].reduce((acc, d, i) => acc + d * (10 - i), 0);
    const r2 = s2 % 11;
    const d2 = r2 < 2 ? 0 : 11 - r2;
    expect([d1, d2]).toEqual([0, 9]);
    expect(certa("enem-2009-cpf")).toBe("0 e 9");
  });
});
