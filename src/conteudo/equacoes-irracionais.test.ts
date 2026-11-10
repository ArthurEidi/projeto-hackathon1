// Equações com Radicais e Soluções Espúrias · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/equacoes-e-inequacoes/equacoes-irracionais/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const raiz = (a: number, b: number, c: number): CurvaResolvida => ({
  tipo: "raiz",
  a,
  b,
  c,
});
const afim = (a: number, b: number): CurvaResolvida => ({
  tipo: "afim",
  a,
  b,
  c: 0,
});
const mod = (a: number, b: number, c: number): CurvaResolvida => ({
  tipo: "modular",
  a,
  b,
  c,
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

  it("caso-neutro: √(x²) é o módulo e coincide com x apenas para x ≥ 0", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(avaliar(mod(1, 0, 0), -1)).toBe(1);
    expect(avaliar(afim(1, 0), -1)).toBe(-1);
    expect(avaliar(mod(1, 0, 0), 2)).toBe(2);
    expect(avaliar(afim(1, 0), 2)).toBe(2);
    expect(s.complete_when.lte).toBe(-1);
  });

  it("encontro-valido: √(x+2) e y = x se encontram em (2; 2)", () => {
    const s = step("encontro-valido");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = raiz(1, -2, 0);
    const a = afim(1, 0);
    expect(avaliar(r, 2)).toBe(2);
    expect(avaliar(a, 2)).toBe(2);
    expect(avaliar(r, 2) - avaliar(a, 2)).toBe(0);
    expect(s.complete_when.metric).toBe("no_encontro");
    expect(s.complete_when.gte).toBe(1);
  });

  it("rejeitar-sinal: em x = −1 as alturas são 1 e −1, logo não há igualdade", () => {
    const s = step("rejeitar-sinal");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = raiz(1, -2, 0);
    const a = afim(1, 0);
    expect(avaliar(r, -1)).toBe(1);
    expect(avaliar(a, -1)).toBe(-1);
    expect(avaliar(r, -1)).not.toBe(avaliar(a, -1));
    expect(s.complete_when.metric).toBe("ponto_x");
    expect(s.complete_when.lte).toBe(-1);
  });

  it("micro-desafio: apenas x = 2 é solução de √(x+2) = x", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("2");
    expect(s.options.find((o) => !o.correct)!.label).toBe("−1");
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
    // F1: √9 = 3
    expect(Math.sqrt(9)).toBe(3);
    expect(Number(certa("f1-equacoes-irracionais"))).toBe(3);

    // F2: raiz principal não é negativa
    expect(certa("f2-equacoes-irracionais")).toBe("Não");

    // F3: √(x²) em x = -2 -> √((-2)²) = √4 = 2
    expect(Math.sqrt((-2) ** 2)).toBe(2);
    expect(Number(certa("f3-equacoes-irracionais"))).toBe(2);

    // F4: elevar ao quadrado pode criar soluções espúrias (1² = (-1)², mas 1 ≠ -1)
    expect((-1) ** 2).toBe(1 ** 2);
    expect(certa("f4-equacoes-irracionais")).toBe("Sim");
  });

  it("médias", () => {
    // M1: √x = 2 => x = 4
    const m1Sol = 2 ** 2;
    expect(Math.sqrt(m1Sol)).toBe(2);
    expect(Number(certa("m1-equacoes-irracionais"))).toBe(4);

    // M2: √(x+1) = 3 => x+1 = 9 => x = 8
    const m2Sol = 3 ** 2 - 1;
    expect(Math.sqrt(m2Sol + 1)).toBe(3);
    expect(Number(certa("m2-equacoes-irracionais"))).toBe(8);

    // M3: √(2x) = 2 => 2x = 4 => x = 2
    const m3Sol = (2 ** 2) / 2;
    expect(Math.sqrt(2 * m3Sol)).toBe(2);
    expect(Number(certa("m3-equacoes-irracionais"))).toBe(2);
  });

  it("desafios", () => {
    // D1: √(x+2) = x nos reais => x² - x - 2 = 0 => x = 2 (x = -1 descartado pois x ≥ 0)
    const d1Candidates = [-1, 2];
    const d1Valid = d1Candidates.filter((x) => x >= 0 && Math.sqrt(x + 2) === x);
    expect(d1Valid).toEqual([2]);
    expect(certa("d1-equacoes-irracionais")).toBe("{2}");

    // D2: √(x-1) = -1 => raiz quadrada principal é sempre ≥ 0 nos reais, logo impossível
    expect(certa("d2-equacoes-irracionais")).toBe("∅");

    // D3: √(2x+1) = 2 => 2x+1 = 4 => x = 3/2 = 1.5
    const d3Sol = (2 ** 2 - 1) / 2;
    expect(d3Sol).toBe(1.5);
    expect(certa("d3-equacoes-irracionais")).toBe("1,5");

    // D4: √(x²) = x => |x| = x => x ≥ 0
    expect(certa("d4-equacoes-irracionais")).toBe("x≥0");

    // D5: √(x+2) = x - 4 => x+2 = x² - 8x + 16 => x² - 9x + 14 = 0 => x = 2 ou x = 7
    // Para x = 2: x - 4 = -2 < 0 (descartado). Para x = 7: √(7+2) = 3 = 7 - 4.
    const d5Candidates = [2, 7];
    const d5Valid = d5Candidates.filter((x) => x - 4 >= 0 && Math.sqrt(x + 2) === x - 4);
    expect(d5Valid).toEqual([7]);
    expect(certa("d5-equacoes-irracionais")).toBe("{7}");
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
