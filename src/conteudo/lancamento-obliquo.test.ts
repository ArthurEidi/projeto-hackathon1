// Física · Lançamento oblíquo · Aula 01: passos completáveis e gabaritos refeitos pela física.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { acertou, resolverLancamento } from "../widgets/common/lancamento/calc";

const L = Lesson.parse(
  JSON.parse(readFileSync(join(import.meta.dirname, "../../content/fisica/cinematica/lancamento-obliquo/aula-01.json"), "utf8")),
);
const step = (id: string) => L.steps.find((s) => s.id === id)!;
const certa = (id: string) => Object.values(L.treino).flat().find((q) => q.id === id)!.options.find((o) => o.correct)!.label;
const lan = (angulo: number, v0: number) => resolverLancamento({ angulo, v0, g: 10, h0: 0 });
const m = (x: number, casas = 2) => `${x.toFixed(casas).replace(".", ",").replace(/,?0+$/, "")} m`;

describe("passos da aula", () => {
  it("cada interactive_canvas usa uma métrica do widget e não começa concluído", () => {
    const metricas = ["lancamentos", "angulos_testados", "velocidades_testadas", "acertou_alvo"];
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      expect(s.widget).toBe("lancamento_obliquo");
      expect(metricas, s.id).toContain(s.complete_when.metric);
      expect(s.complete_when.gte, s.id).toBeGreaterThanOrEqual(1);
    }
  });

  it("o alvo de 20 m é alcançável com os ângulos do slider (15° e 75°) e não com o inicial", () => {
    const s = step("acertar-alvo");
    if (s.type !== "interactive_canvas") throw new Error();
    const alvo = s.params.alvo as { x: number; tolerancia: number };
    const c = s.controls[0];
    const acertos: number[] = [];
    for (let a = c.min; a <= c.max; a += c.step) if (acertou(lan(a, 20).alcance, alvo)) acertos.push(a);
    expect(acertos).toEqual([15, 75]);
    expect(acertou(lan(c.initial, 20).alcance, alvo)).toBe(false);
  });

  it("falas de conclusão batem com a conta", () => {
    expect(lan(30, 20).alcance).toBeCloseTo(34.64, 2);
    expect(lan(60, 20).alcance).toBeCloseTo(34.64, 2);
    expect(lan(45, 20).alcance).toBeCloseTo(40, 9);
    expect(lan(45, 20).alcance / lan(45, 10).alcance).toBeCloseTo(4, 9);
  });

  it("desafio: 40 m certo; 10 m é H, 20 m é v₀²/2g e 28,28 m usa sen θ", () => {
    const s = step("desafio-alcance");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(m(lan(45, 20).alcance));
    expect(m(lan(45, 20).alturaMax)).toBe("10 m");
    expect((20 * 20) / (2 * 10)).toBe(20);
    expect(lan(22.5, 20).alcance).toBeCloseTo(28.28, 2);
    expect(((20 * 20 * Math.sin(Math.PI / 4)) / 10).toFixed(2)).toBe("28.28");
    expect(s.options).toHaveLength(4);
  });
});

describe("treino: gabaritos por conta", () => {
  it("básico e médias", () => {
    expect(certa("vy-saida")).toBe("10 m/s");
    expect(certa("tempo-voo")).toBe(`${lan(30, 20).tempo} s`);
    expect(certa("altura-30")).toBe(m(lan(30, 20).alturaMax));
    expect(certa("angulo-maximo")).toBe("45°");
  });
  it("desafios", () => {
    expect(certa("alcance-30ms")).toBe(m(lan(45, 30).alcance));
    expect(certa("vertical")).toBe(`${lan(90, 20).tempo} s`);
    expect(certa("lua")).toBe(`${(10 / 1.6).toFixed(2).replace(".", ",")} vezes maior`);
    expect(certa("complementar")).toBe("60°");
  });
  it("sem questão de vestibular inventada", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
