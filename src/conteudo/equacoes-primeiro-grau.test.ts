// Equações do primeiro grau · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/equacoes-e-inequacoes/equacoes-primeiro-grau/aula-01.json",
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

  it("caso-neutro: y = x encontra y = 0 em x = 0", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(1, 0);
    const r2 = afim(0, 0);
    expect(avaliar(r1, 0)).toBe(0);
    expect(avaliar(r2, 0)).toBe(0);
    expect(s.complete_when.metric).toBe("no_encontro");
  });

  it("desfazer-operacoes: 2x − 4 encontra y = 0 em x = 2", () => {
    const s = step("desfazer-operacoes");
    if (s.type !== "interactive_canvas") throw new Error();
    const r1 = afim(2, -4);
    const r2 = afim(0, 0);
    expect(avaliar(r1, 2)).toBe(0);
    expect(avaliar(r2, 2)).toBe(0);
    expect(s.complete_when.metric).toBe("no_encontro");
  });

  it("coeficiente-zero: a = 0 faz 0x − 4 = −4 (reta horizontal sem encontro com y = 0)", () => {
    const s = step("coeficiente-zero");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = afim(0, -4);
    expect(avaliar(r, -5)).toBe(-4);
    expect(avaliar(r, 5)).toBe(-4);
    expect(s.complete_when.lte).toBe(0);
  });

  it("conferir-previsao: solução de 2x − 4 = 0 é x = 2", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("2");
    expect(s.options.find((o) => !o.correct)!.label).toBe("−2");
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
    // F1: y = x => x = 0
    expect(certa("f1-equacoes-primeiro-grau")).toBe("0");

    // F2: resolver no gráfico é procurar o Encontro
    expect(certa("f2-equacoes-primeiro-grau")).toBe("Encontro");

    // F3: desfaz -4 somando 4 nos dois lados
    expect(certa("f3-equacoes-primeiro-grau")).toBe("Somar 4 nos dois lados");

    // F4: y = -4 encontra y = 0? Não
    expect(certa("f4-equacoes-primeiro-grau")).toBe("Não");
  });

  it("médias", () => {
    // M1: 3x - 6 = 0 => x = 2
    expect(6 / 3).toBe(2);
    expect(Number(certa("m1-equacoes-primeiro-grau"))).toBe(2);

    // M2: 2x + 1 = 7 => 2x = 6 => x = 3
    expect((7 - 1) / 2).toBe(3);
    expect(Number(certa("m2-equacoes-primeiro-grau"))).toBe(3);

    // M3: x + 3 = 2x => x = 3
    expect(Number(certa("m3-equacoes-primeiro-grau"))).toBe(3);
  });

  it("desafios", () => {
    // D1: 2x + 1 = x + 4 => x = 3
    expect(4 - 1).toBe(3);
    expect(Number(certa("d1-equacoes-primeiro-grau"))).toBe(3);

    // D2: 0x = 0 => infinitas soluções
    expect(certa("d2-equacoes-primeiro-grau")).toBe("Infinitas");

    // D3: 0x = 2 => nenhuma solução
    expect(certa("d3-equacoes-primeiro-grau")).toBe("Nenhuma");

    // D4: 2x = 1 => x = 0.5
    expect(1 / 2).toBe(0.5);
    expect(certa("d4-equacoes-primeiro-grau")).toBe("0,5");

    // D5: 2 + 2x = 5 + x => x = 3
    expect(5 - 2).toBe(3);
    expect(Number(certa("d5-equacoes-primeiro-grau"))).toBe(3);
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
