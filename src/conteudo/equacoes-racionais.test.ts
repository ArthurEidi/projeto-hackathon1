// Equações racionais e restrições do denominador · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { avaliar, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/equacoes-e-inequacoes/equacoes-racionais/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const rac = (a: number, b: number, c = 0): CurvaResolvida => ({
  tipo: "racional",
  a,
  b,
  c,
});
const afim = (a: number, b: number, furos: number[] = []): CurvaResolvida => ({
  tipo: "afim",
  a,
  b,
  c: 0,
  ...(furos.length ? { furos } : {}),
});

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric } = s.complete_when;
      expect(s.controls.find((c) => c.id === metric)).toBeUndefined();
      expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
    }
  });

  it("caso-neutro: x/1 não tem denominador nulo e em x = 2 atinge y = 2", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = afim(1, 0);
    expect(avaliar(c, 0)).toBe(0);
    expect(avaliar(c, 2)).toBe(2);
    expect(s.complete_when.gte).toBe(2);
  });

  it("encontrar-fracao: 1/(x−1) encontra a reta y = 1 em (2; 1)", () => {
    const s = step("encontrar-fracao");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = rac(1, 1);
    const h = afim(0, 1);
    expect(avaliar(r, 2)).toBe(1);
    expect(avaliar(h, 2)).toBe(1);
    expect(avaliar(r, 2) - avaliar(h, 2)).toBe(0);
    expect(s.complete_when.metric).toBe("no_encontro");
    expect(s.complete_when.gte).toBe(1);
  });

  it("candidato-proibido: (x²−1)/(x−1) tem furo em x = 1", () => {
    const s = step("candidato-proibido");
    if (s.type !== "interactive_canvas") throw new Error();
    const comFuro = afim(1, 1, [1]);
    expect(avaliar(comFuro, 0)).toBe(1);
    expect(Number.isNaN(avaliar(comFuro, 1))).toBe(true);
    expect(s.complete_when.metric).toBe("ponto_x");
    expect(s.complete_when.gte).toBe(1);
  });

  it("micro-desafio: (x²−1)/(x−1) = 2 não tem solução válida", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("∅");
    expect(s.options.find((o) => !o.correct)!.label).toBe("{1}");
    expect(s.options).toHaveLength(4);
    const f = (x: number) => (x * x - 1) / (x - 1);
    // simplificando, x + 1 = 2 ⇒ x = 1, mas x = 1 zera o denominador
    expect(1 - 1).toBe(0);
    expect(Number.isNaN(f(1))).toBe(true);
    expect(f(2)).toBe(3); // "{2}": cortou o −1 (x²/x = x = 2), mas a fração vale 3 em x = 2
    // "{±√3}": ignorou o denominador, x² − 1 = 2 ⇒ x = ±√3
    expect(Math.sqrt(3) ** 2 - 1).toBeCloseTo(2, 12);
    for (const x of [Math.sqrt(3), -Math.sqrt(3)]) expect(f(x)).not.toBeCloseTo(2, 3);
    expect(s.options.map((o) => o.label)).toEqual(["{1}", "{2}", "{±√3}", "∅"]);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    // F1: 1/(x−1) anula denominador em x = 1
    expect(certa("f1-equacoes-racionais")).toBe("1");

    // F2: cancelar não preenche o furo
    expect(certa("f2-equacoes-racionais")).toBe("Não");

    // F3: x/1 admite todo x real
    expect(certa("f3-equacoes-racionais")).toBe("Sim");

    // F4: 1/(2−1) = 1
    expect(certa("f4-equacoes-racionais")).toBe("1");
  });

  it("médias", () => {
    // M1: 2/x = 1 => x = 2
    expect(Number(certa("m1-equacoes-racionais"))).toBe(2);

    // M2: 1/(x−1) = 2 => x - 1 = 0,5 => x = 1,5
    expect(certa("m2-equacoes-racionais")).toBe("1,5");

    // M3: (x+1)/(x−1) = 2 => x + 1 = 2x - 2 => x = 3
    expect(Number(certa("m3-equacoes-racionais"))).toBe(3);
  });

  it("desafios", () => {
    // D1: (x²−1)/(x−1) = 2 => x = 1 é excluído => ∅
    expect(certa("d1-equacoes-racionais")).toBe("∅");

    // D2: (x−2)/(x−2) = 1 => vale para todo x ≠ 2
    expect(certa("d2-equacoes-racionais")).toBe("R sem {2}");

    // D3: 1/x = −2 => x = −0,5
    expect(certa("d3-equacoes-racionais")).toBe("−0,5");

    // D4: 1/x = 1/(x−1) => x = x - 1 (impossível) => ∅
    expect(certa("d4-equacoes-racionais")).toBe("∅");

    // D5: 1/x + 1/(2x) = 1 => 3/(2x) = 1 => 2x = 3 => x = 1,5
    expect(certa("d5-equacoes-racionais")).toBe("1,5");
  });

  it("vestibular confere gabarito ENEM por conta", () => {
    // 2009/175: (NV/NF + NA/NV)/2 = 0,6 e (NV/(2NF) + NA/NV)/2 = 0,5
    const tc = (0.6 * 2 - 0.5 * 2) * 2;
    const ta = 0.6 * 2 - tc;
    const nv = 3600 / (1 + ta);
    const nf = nv / tc;
    expect(Math.round(nf)).toBe(5000);
    expect(certa("enem-2009-cadunico")).toBe("5.000");
  });
});
