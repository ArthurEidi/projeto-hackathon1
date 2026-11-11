// Posições relativas, ângulos e interseções de retas · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/geometria/geometria-analitica/posicoes-relativas-de-retas/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });

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
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
      } else {
        expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("coincidentes-e-paralelas: n2 = 1 dá retas iguais, n2 ≥ 3 afasta a reta paralelamente", () => {
    const s = step("coincidentes-e-paralelas");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(1, 1);
    const r2_coincidente = afim(1, 1);
    const r2_paralela = afim(1, 3);
    expect(avaliar(r1, 0)).toBe(avaliar(r2_coincidente, 0));
    expect(avaliar(r2_paralela, 0) - avaliar(r1, 0)).toBe(2);
    expect(s.complete_when.gte).toBe(3);
  });

  it("concorrentes: m2 ≠ 1 faz as retas se cruzarem em exatamente um ponto", () => {
    const s = step("concorrentes");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(1, 1);
    const r2 = afim(2, 3);
    // x + 1 = 2x + 3 => x = -2, y = -1
    expect(avaliar(r1, -2)).toBe(-1);
    expect(avaliar(r2, -2)).toBe(-1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("achar-encontro: y = x + 1 e y = −x + 5 se encontram em (2; 3)", () => {
    const s = step("achar-encontro");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(1, 1);
    const r2 = afim(-1, 5);
    expect(avaliar(r1, 2)).toBe(3);
    expect(avaliar(r2, 2)).toBe(3);
    expect(s.complete_when.metric).toBe("no_encontro");
  });

  it("angulo-reto: m1 = 1 e m2 = −1 dão m1 · m2 = −1 (perpendiculares)", () => {
    const s = step("angulo-reto");
    if (s.type !== "interactive_canvas") throw new Error();
    const m1 = 1;
    const m2 = -1;
    expect(m1 * m2).toBe(-1);
    expect(s.complete_when.lte).toBe(-1);
  });

  it("desafio-posicao: retas com mesmo m e cortes diferentes são paralelas", () => {
    const s = step("desafio-posicao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("Paralelas");
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
    // F1: y = 3x + 1 e y = 3x + 5 => paralelas
    expect(certa("f1-posicoes-relativas-de-retas")).toBe("Paralelas");

    // F2: y = x e y = -x se cruzam só em (0; 0) => 1 ponto
    expect(certa("f2-posicoes-relativas-de-retas")).toBe("1");

    // F3: y = 2x + 2 e 2y = 4x + 4 são a mesma reta => infinitos
    expect(certa("f3-posicoes-relativas-de-retas")).toBe("Infinitos");

    // F4: m = 1 => m_perp = -1 / 1 = -1
    expect(certa("f4-posicoes-relativas-de-retas")).toBe("−1");
  });

  it("médias", () => {
    // M1: x = -x + 4 => 2x = 4 => x = 2, y = 2 => (2; 2)
    const m1X = 4 / 2;
    const m1Y = m1X;
    expect(`(${m1X}; ${m1Y})`).toBe("(2; 2)");
    expect(certa("m1-posicoes-relativas-de-retas")).toBe("(2; 2)");

    // M2: m = 2 => m_perp = -1/2
    expect(certa("m2-posicoes-relativas-de-retas")).toBe("−1/2");

    // M3: paralela a 3x - 2 com corte 5 => y = 3x + 5
    expect(certa("m3-posicoes-relativas-de-retas")).toBe("y = 3x + 5");
  });

  it("desafios", () => {
    // D1: 2x - 1 = x + 2 => x = 3, y = 5 => (3; 5)
    const d1X = 2 - -1;
    const d1Y = d1X + 2;
    expect(`(${d1X}; ${d1Y})`).toBe("(3; 5)");
    expect(certa("d1-posicoes-relativas-de-retas")).toBe("(3; 5)");

    // D2: paralela a 4x - 2 => k = 4
    expect(certa("d2-posicoes-relativas-de-retas")).toBe("4");

    // D3: perp a 2x + 1 com corte 3 => m = -1/2, n = 3 => y = -x/2 + 3
    expect(certa("d3-posicoes-relativas-de-retas")).toBe("y = −x/2 + 3");

    // D4: sem solução => paralelas
    expect(certa("d4-posicoes-relativas-de-retas")).toBe("Paralelas");

    // D5: x = 2 e y = 3 => perpendiculares
    expect(certa("d5-posicoes-relativas-de-retas")).toBe("Perpendiculares");
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
