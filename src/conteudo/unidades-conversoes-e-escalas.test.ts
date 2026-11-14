// Unidades, conversões, escala e erro de medida · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/aritmetica/proporcionalidade/unidades-conversoes-e-escalas/aula-01.json",
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

describe("passos da aula de unidades, conversões, escala e erro de medida", () => {
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

  it("gabarito do micro-desafio confere com a área ampliada (2·2)²=16", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("16");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: escala 1:1 não muda o tamanho", () => {
    expect(certa("f1-unidades-conversoes-e-escalas")).toBe("Não");
  });

  it("F2: 1 m = 100 cm", () => {
    expect(certa("f2-unidades-conversoes-e-escalas")).toBe("100");
  });

  it("F3: dobrar o lado multiplica a área por 2² = 4", () => {
    expect(certa("f3-unidades-conversoes-e-escalas")).toBe("4");
  });

  it("F4: converter metros em centímetros não muda o comprimento físico", () => {
    expect(certa("f4-unidades-conversoes-e-escalas")).toBe("Não");
  });
});

describe("gabaritos das médias", () => {
  it("M1: 2,5 m = 250 cm", () => {
    expect(certa("m1-unidades-conversoes-e-escalas")).toBe("250 cm");
  });

  it("M2: 1 m² = 10 000 cm²", () => {
    expect(certa("m2-unidades-conversoes-e-escalas")).toBe("10 000 cm²");
  });

  it("M3: escala 1:100 com 2 cm no desenho dá 2 m no real", () => {
    expect(certa("m3-unidades-conversoes-e-escalas")).toBe("2 m");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: reduzir à metade reduz volume para (1/2)³ = 1/8", () => {
    expect(certa("d1-unidades-conversoes-e-escalas")).toBe("1/8");
  });

  it("D2: faixa [1,95; 2,05) não inclui 2,05 (arredonda para 2,1)", () => {
    expect(certa("d2-unidades-conversoes-e-escalas")).toBe("Não");
  });

  it("D3: área do quadrado 0,5 m é 0,25 m²", () => {
    expect(certa("d3-unidades-conversoes-e-escalas")).toBe("0,25 m²");
  });

  it("D4: 3 cm para 6 m (600 cm) dá escala 1:200", () => {
    expect(certa("d4-unidades-conversoes-e-escalas")).toBe("1:200");
  });

  it("D5: 2 cm x 3 cm em 1:100 dá lados reais 2 m e 3 m, área 6 m²", () => {
    expect(certa("d5-unidades-conversoes-e-escalas")).toBe("6 m²");
  });
});

describe("gabaritos do vestibular", () => {
  it("ENEM 2022/139, 2019/158 e 2020/138", () => {
    expect((3.8 * 50 - 10) / 100).toBeCloseTo(1.8, 9);
    expect((1.6 * 50 - 20) / 100).toBeCloseTo(0.6, 9);
    expect(certa("enem-2022-refrigerador")).toBe("1,80 e 0,60");
    expect((45 * 200 ** 3) / 1000 / 30000).toBe(12);
    expect(certa("enem-2019-cisterna")).toBe("12");
    const volMaquete = 2 * 3.51 * 4;
    const volRealCm3 = 28080 * 1000;
    expect(Math.round(Math.cbrt(volRealCm3 / volMaquete))).toBe(100);
    expect(certa("enem-2020-maquete")).toBe("1 : 100");
  });
});
