// Razão, proporção e porcentagem · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(join(import.meta.dirname, "../../content/aritmetica/proporcionalidade/razao-proporcao-porcentagem/aula-01.json"), "utf8"),
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
        expect(["fracao", "porcento", "pintadas", "partes", "equivalente"]).toContain(metric);
        const p = s.params as { partes: string | number; pintadas: string | number };
        expect(s.controls.length, s.id).toBeGreaterThan(0);
        const c = s.controls[0];
        expect(c.initial, `${s.id} slider não pode começar no alvo`).not.toBe(gte ?? lte);
        expect(typeof p.partes === "number" || typeof p.pintadas === "number" || typeof p.partes === "string").toBe(true);
      }
    }
  });

  it("desafio: 25% de 8 = 2", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("2");
    expect(s.options).toHaveLength(4);
    expect((25 / 100) * 8).toBe(2);
    expect(8 / 2).toBe(4); // metade (50%), não um quarto
    expect(8 * 4).toBe(32); // multiplicou por 4 em vez de dividir
    expect(25 * 8).toBe(200); // esqueceu de dividir por 100
    expect((25 / 100) * 800).toBe(200); // figura: 200 é 25% de 800
    expect(s.options.map((o) => o.label)).toEqual(["4", "2", "32", "200"]);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
  });
});

describe("gabaritos do treino", () => {
  it("fáceis e médias", () => {
    expect(certa("f1-razao-proporcao-porcentagem")).toBe("100%");
    expect(certa("f2-razao-proporcao-porcentagem")).toBe("1/2");
    expect(certa("f3-razao-proporcao-porcentagem")).toBe("Não");
    expect(certa("f4-razao-proporcao-porcentagem")).toBe("Não");
    expect(certa("m1-razao-proporcao-porcentagem")).toBe("2");
    expect(certa("m2-razao-proporcao-porcentagem")).toBe("25%");
    expect(certa("m3-razao-proporcao-porcentagem")).toBe("3");
  });

  it("desafios", () => {
    expect(certa("d1-razao-proporcao-porcentagem")).toBe("22");
    expect(certa("d2-razao-proporcao-porcentagem")).toBe("Não, fica 99");
    expect(certa("d3-razao-proporcao-porcentagem")).toBe("0,5");
    expect(certa("d4-razao-proporcao-porcentagem")).toBe("10");
    expect(certa("d5-razao-proporcao-porcentagem")).toBe("12,5%");
  });

  it("vestibular: ENEM 2023/167, 2017/164 e 2022/154", () => {
    // 2023/167: 1150 * 5 = 5750 -> 58 pacotes * 4 = 232 -> desconto (232 - 220)/232 ≈ 5,17%
    const desc = (232 - 220) / 232;
    expect(desc).toBeGreaterThan(0.05);
    expect(desc).toBeLessThan(0.055);
    expect(certa("enem-2023-papel")).toBe("(5,0 ; 5,5)");
    // 2017/164: tX = 0,25 tY => dX/dY = 1/4
    expect(0.25).toBe(1 / 4);
    expect(certa("enem-2017-celular")).toBe("1/4");
    // 2022/154: 28900 / 0,25 = 115600
    expect(28900 / 0.25).toBe(115600);
    expect(certa("enem-2022-caged")).toBe("115 600");
  });
});
