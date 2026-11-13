// Potenciação, propriedades e radicais · Aula 01: passos completáveis, gabaritos e fórmulas em conformidade com o glossário.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { PlanoCartesiano } from "../widgets/common/params";
import { avaliar, resolverCurva } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../content/aritmetica/conjuntos/potencias-e-radicais/aula-01.json"),
      "utf8",
    ),
  ),
);

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!.options.find((o) => o.correct)!.label;

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
        expect(["ponto_x", "dentro", "faixa_x"]).toContain(metric);
      }
    }
  });

  it("curvas e pontos batem com os rótulos", () => {
    for (const id of ["caso-neutro", "andar-para-tras"]) {
      const s = step(id);
      if (s.type !== "interactive_canvas") throw new Error();
      const p = PlanoCartesiano.parse(s.params);
      const k = resolverCurva(p.curvas[0], {});
      expect(avaliar(k, 0), id).toBe(1);
      expect(avaliar(k, 1), id).toBe(2);
      expect(avaliar(k, 2), id).toBe(4);
      expect(avaliar(k, -1), id).toBe(0.5);
    }
    const rl = step("recuperar-lado");
    if (rl.type !== "interactive_canvas") throw new Error();
    const kl = resolverCurva(PlanoCartesiano.parse(rl.params).curvas[0], {});
    expect(avaliar(kl, 3)).toBe(9);
    expect(avaliar(kl, -3)).toBe(9);
  });

  it("desafio: 0,5 é 2⁻¹", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error("micro_challenge esperado");
    expect(s.options.find((o) => o.correct)!.label).toBe("0,5");
  });

  it("fechamento: letras do glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error("concept_lock esperado");
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("f1-potencias-e-radicais")).toBe("2");
    expect(certa("f2-potencias-e-radicais")).toBe("1");
    expect(certa("f3-potencias-e-radicais")).toBe("0,5");
    expect(certa("f4-potencias-e-radicais")).toBe("3");
    expect(certa("m1-potencias-e-radicais")).toBe("32");
    expect(certa("m2-potencias-e-radicais")).toBe("64");
    expect(certa("m3-potencias-e-radicais")).toBe("5");
  });

  it("desafios", () => {
    expect(certa("d1-potencias-e-radicais")).toBe("3");
    expect(certa("d2-potencias-e-radicais")).toBe("Não");
    expect(certa("d3-potencias-e-radicais")).toBe("−2");
    expect(certa("d4-potencias-e-radicais")).toBe("1");
    expect(certa("d5-potencias-e-radicais")).toBe("2√2 e 4√2");
  });
});
