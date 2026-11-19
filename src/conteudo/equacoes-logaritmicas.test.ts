// Equações logarítmicas e condições de existência · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/equacoes-e-inequacoes/equacoes-logaritmicas/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const log = (b: number, h = 0): CurvaResolvida => ({
  tipo: "logaritmo",
  a: 1,
  b,
  c: 0,
  ...(h !== 0 ? { t: { a: 1, b: 1, h, k: 0 } } : {}),
});
const afim = (b: number): CurvaResolvida => ({
  tipo: "afim",
  a: 0,
  b,
  c: 0,
});

const lg = (b: number, x: number, h = 0) => avaliar(log(b, h), x);

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

  it("caso-neutro: log₂(1) = 0 e em x = 2 temos log₂(2) = 1", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(lg(2, 1)).toBe(0);
    expect(lg(2, 2)).toBe(1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("inverter-potencia: log₂(4) = 2 encontra a reta horizontal y = 2 em (4; 2)", () => {
    const s = step("inverter-potencia");
    if (s.type !== "interactive_canvas") throw new Error();
    const l = log(2);
    const r = afim(2);
    expect(avaliar(l, 4)).toBe(2);
    expect(avaliar(r, 4)).toBe(2);
    expect(avaliar(l, 4) - avaliar(r, 4)).toBe(0);
    expect(s.complete_when.metric).toBe("no_encontro");
    expect(s.complete_when.gte).toBe(1);
  });

  it("fronteira-argumento: log₂(x−1) não existe em x ≤ 1", () => {
    const s = step("fronteira-argumento");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(lg(2, 2, 1)).toBe(0);
    expect(Number.isNaN(lg(2, 1, 1))).toBe(true);
    expect(Number.isNaN(lg(2, 0, 1))).toBe(true);
    expect(s.complete_when.metric).toBe("ponto_x");
    expect(s.complete_when.lte).toBe(1);
  });

  it("micro-desafio: log₂(x−1) = 1 => x = 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("3");
    expect(s.options.find((o) => !o.correct)!.label).toBe("2");
    expect(s.options).toHaveLength(4);
    expect(Math.log2(3 - 1)).toBe(1); // x − 1 = 2¹ ⇒ x = 3
    expect(1 + 1).toBe(2); // igualou x − 1 a 1, como se o log sumisse
    expect(Math.log2(2 - 1)).toBe(0); // em x = 2 o log vale 0, não 1
    expect(2 - 1).toBe(1); // isolou x com o sinal trocado: x = 2 − 1
    expect(1 - 1).toBe(0); // em x = 1 o argumento é 0: log não existe
    expect(Math.log2(4) - 1).toBe(1); // leu log₂x − 1 = 1 ⇒ x = 4
    expect(Math.log2(4 - 1)).not.toBe(1); // na equação certa, x = 4 dá log₂3
    expect(s.options.map((o) => o.label)).toEqual(["2", "1", "4", "3"]);
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
    // F1: log₂1 = 0
    expect(lg(2, 1)).toBe(0);
    expect(Number(certa("f1-equacoes-logaritmicas"))).toBe(0);

    // F2: log₂0 não existe nos reais
    expect(Number.isNaN(lg(2, 0))).toBe(true);
    expect(certa("f2-equacoes-logaritmicas")).toBe("Não");

    // F3: base do log não pode ser 1
    expect(certa("f3-equacoes-logaritmicas")).toBe("Não");

    // F4: log₂x = 2 equivale a x = 2²
    expect(certa("f4-equacoes-logaritmicas")).toBe("x=2²");
  });

  it("médias", () => {
    // M1: log₂x = 3 => x = 2³ = 8
    const m1Sol = 2 ** 3;
    expect(lg(2, m1Sol)).toBe(3);
    expect(Number(certa("m1-equacoes-logaritmicas"))).toBe(8);

    // M2: log₂(x−1) = 1 => x - 1 = 2 => x = 3
    const m2Sol = 2 ** 1 + 1;
    expect(lg(2, m2Sol, 1)).toBe(1);
    expect(Number(certa("m2-equacoes-logaritmicas"))).toBe(3);

    // M3: log₃x = 0 => x = 3⁰ = 1
    const m3Sol = 3 ** 0;
    expect(lg(3, m3Sol)).toBe(0);
    expect(Number(certa("m3-equacoes-logaritmicas"))).toBe(1);
  });

  it("desafios", () => {
    // D1: domínio de log₂(x−1) + log₂(x+1): x > 1 e x > -1 => x > 1
    expect(certa("d1-equacoes-logaritmicas")).toBe("x>1");

    // D2: log₂x + log₂(x−1) = 1 => x(x-1) = 2 => x² - x - 2 = 0 => x = 2
    const d2Candidates = [-1, 2];
    const d2Valid = d2Candidates.filter((x) => x > 1 && x * (x - 1) === 2);
    expect(d2Valid).toEqual([2]);
    expect(certa("d2-equacoes-logaritmicas")).toBe("{2}");

    // D3: log₄x = 0,5 => x = 4^(1/2) = 2
    const d3Sol = 4 ** 0.5;
    expect(d3Sol).toBe(2);
    expect(Number(certa("d3-equacoes-logaritmicas"))).toBe(2);

    // D4: log₂(x−1) = log₂(3−x) => x - 1 = 3 - x => 2x = 4 => x = 2 (1 < x < 3)
    const d4Cand = 2;
    expect(d4Cand > 1 && d4Cand < 3).toBe(true);
    expect(certa("d4-equacoes-logaritmicas")).toBe("{2}");

    // D5: I = log₂N; I vai de 1 a 3 => N1 = 2¹ = 2, N2 = 2³ = 8 => N2/N1 = 4
    const n1 = 2 ** 1;
    const n2 = 2 ** 3;
    expect(n2 / n1).toBe(4);
    expect(Number(certa("d5-equacoes-logaritmicas"))).toBe(4);
  });

  it("vestibular: UFRGS 2022 Q49 (gabarito oficial A)", () => {
    // u = log₂x: u² + u − 12 = 0 ⇒ u = 3 ou u = −4
    for (const u of [3, -4]) expect(u * u + u - 12).toBe(0);
    for (const x of [8, 1 / 16]) expect(Math.log2(x) + Math.log2(x) ** 2).toBeCloseTo(12, 10);
    expect(certa("ufrgs-2022-log2")).toBe("8 ou 1/16");
  });
});
