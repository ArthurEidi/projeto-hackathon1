// Gráficos das Funções Trigonométricas · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/trigonometria/funcoes-trigonometricas/aula-01.json",
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

describe("passos da aula de funções trigonométricas", () => {
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
        expect(["x_rad", "theta", "angulo"]).toContain(metric);
      }
    }
  });

  it("desafio-identificar-curva: curva que parte de (0; 1) é f(x) = cos x", () => {
    const s = step("desafio-identificar-curva");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("f(x) = cos x");
  });

  it("fechamento: termos referenciados existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis: imagem do seno, período do cosseno, partida em x=0 e período da tangente", () => {
    // f1: imagem do seno é [-1; 1]
    expect(certa("imagem-do-seno")).toBe("[−1; 1]");

    // f2: período do cosseno é 2π
    expect(certa("periodo-cosseno")).toBe("2π");

    // f3: em x = 0, sen 0 = 0 e cos 0 = 1
    expect(certa("ponto-inicial-seno-cosseno")).toBe("0 e 1");

    // f4: período da tangente é π
    expect(certa("periodo-tangente")).toBe("π");
  });

  it("médias: raízes do cosseno, decrescimento do seno e encontro no 1º Q", () => {
    // m1: cos x = 0 em [0; 2π] nos pontos π/2 e 3π/2
    expect(certa("raizes-do-cosseno")).toBe("π/2 e 3π/2");

    // m2: sen x desce do pico 1 ao mínimo -1 de π/2 a 3π/2
    expect(certa("onde-seno-decresce")).toBe("De π/2 a 3π/2");

    // m3: sen x = cos x no 1º Q ocorre em π/4
    expect(certa("encontro-seno-cosseno-1q")).toBe("π/4");
  });

  it("desafios: raízes do seno, periodicidade 20π, assíntota da tangente, paridade e intervalo restrito", () => {
    // d1: sen x = 0 em [0; 2π] tem 3 raízes (0, π, 2π)
    expect(certa("quantas-raizes-seno")).toBe("3 vezes (0, π e 2π)");

    // d2: cos(20π + π/3) = cos(π/3) = 1/2
    expect(certa("periodicidade-grande")).toBe("1/2");

    // d3: 5π/2 = 2π + π/2 é ponto de assíntota vertical de tg x
    expect(certa("fronteira-dominio-tangente")).toBe("5π/2");

    // d4: sen(-x) = -sen x (ímpar) e cos(-x) = cos x (par)
    expect(certa("paridade-seno-cosseno")).toBe("−sen x e cos x");

    // d5: f(x) = sen x em [0; π] tem imagem [0; 1] com máximo em π/2
    expect(certa("diferenca-max-min-intervalo")).toBe("[0; 1], máximo em π/2");
  });
});
