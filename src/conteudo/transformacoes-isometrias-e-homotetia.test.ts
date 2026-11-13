// Simetrias, isometrias e homotetia · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-plana/transformacoes-isometrias-e-homotetia/aula-01.json",
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

describe("passos da aula de transformações, isometrias e homotetia", () => {
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
      } else {
        expect(["orientacao_trocada"]).toContain(metric);
      }
    }
  });

  it("gabarito do micro-desafio confere com a homotetia da área", () => {
    const s = step("desafio-homotetia-area");
    if (s.type !== "micro_challenge") throw new Error("esperava micro_challenge");
    const certaOpt = s.options.find((o) => o.correct)!;
    // k = 3 -> A' = 3² * 6 = 54 cm²
    expect(certaOpt.label).toBe("54 cm²");
  });
});

describe("gabaritos das fáceis", () => {
  it("F1: rotação e reflexão preservam área 12 cm²", () => {
    expect(certa("f1-qual-preserva-area")).toBe("12 cm²");
  });

  it("F2: quadrado possui 4 eixos de simetria", () => {
    expect(certa("f2-eixos-simetria-quadrado")).toBe("4");
  });

  it("F3: homotetia k = 2 dobra perímetro para 40 cm", () => {
    expect(certa("f3-homotetia-perimetro")).toBe("40 cm");
  });

  it("F4: inversão de sentido lateral caracteriza reflexão", () => {
    expect(certa("f4-identificar-reflexao")).toBe("Reflexão");
  });
});

describe("gabaritos das médias", () => {
  it("M1: P(3; 5) refletido no eixo y vira (-3; 5)", () => {
    expect(certa("m1-reflexao-no-eixo-y")).toBe("(−3; 5)");
  });

  it("M2: homotetia k = 1/2 reduz área de 32 para 8 cm²", () => {
    expect(certa("m2-homotetia-reducao-area")).toBe("8 cm²");
  });

  it("M3: triângulo equilátero coincide consigo a cada 120°", () => {
    expect(certa("m3-simetria-de-rotacao-triangulo")).toBe("120°");
  });
});

describe("gabaritos dos desafios", () => {
  it("D1: duas reflexões em eixos paralelos equivalem a uma translação", () => {
    expect(certa("d1-duas-reflexoes-paralelas")).toBe("Uma translação");
  });

  it("D2: homotetia k = -2 dobra lados e inverte a figura em 180°", () => {
    expect(certa("d2-homotetia-negativa")).toBe(
      "Lados dobram e a imagem fica invertida (180°) do outro lado de O",
    );
  });

  it("D3: área de 5 para 45 dá k² = 9 -> perímetro multiplica por 3", () => {
    expect(certa("d3-achar-k-pelas-areas")).toBe("3");
  });

  it("D4: A(4; 0) girado 90° anti-horário vai para (0; 4)", () => {
    expect(certa("d4-rotacao-90-anti-horario")).toBe("(0; 4)");
  });

  it("D5: diagonal do retângulo não quadrado não é eixo pois pontas não coincidem", () => {
    expect(certa("d5-eixos-retangulo-nao-quadrado")).toBe(
      "Porque os lados vizinhos (6 e 2) são diferentes e as pontas não coincidem ao dobrar",
    );
  });
});
