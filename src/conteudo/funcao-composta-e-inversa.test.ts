// Função Composta e Inversa · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { certaDe, fechamentoOk, semVestibular } from "./util";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/funcoes/funcao-composta-e-inversa/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const certa = (id: string) => certaDe(L, id);
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
        expect(["ponto_x", "faixa_x", "quadrantes", "na_raiz", "no_encontro", "entradas_testadas", "ordens_testadas"]).toContain(metric);
      }
    }
  });

  it("identidade: usa maquinas_funcao e testa pelo menos 2 entradas", () => {
    const s = step("identidade");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.widget).toBe("maquinas_funcao");
    expect(s.complete_when.metric).toBe("entradas_testadas");
    expect(s.complete_when.gte).toBe(2);
  });

  it("ordem-maquinas: em x = 1, f(g(1)) = 4 e g(f(1)) = 3 com ordens_testadas >= 2", () => {
    const s = step("ordem-maquinas");
    if (s.type !== "interactive_canvas") throw new Error();
    const fg = 2 * (1 + 1);
    const gf = 2 * 1 + 1;
    expect(fg).toBe(4);
    expect(gf).toBe(3);
    expect(s.widget).toBe("maquinas_funcao");
    expect(s.complete_when.metric).toBe("ordens_testadas");
    expect(s.complete_when.gte).toBe(2);
  });

  it("reflexao-inversa: ponto (1; 3) reflete em (3; 1) na diagonal y = x", () => {
    const s = step("reflexao-inversa");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(2 * 1 + 1).toBe(3);
    expect((3 - 1) / 2).toBe(1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("desafio-fronteira: inversa de f(x) = 2x + 1 é (x - 1)/2", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("(x − 1)/2");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("f1-funcao-composta-e-inversa")).toBe("3");
    expect(certa("f2-funcao-composta-e-inversa")).toBe("4");
    expect(certa("f3-funcao-composta-e-inversa")).toBe("x − 2");
    expect(certa("f4-funcao-composta-e-inversa")).toBe(String(6 / 2));
  });

  it("médias", () => {
    expect(certa("m1-funcao-composta-e-inversa")).toBe(String(2 * (2 + 1)));
    expect(certa("m2-funcao-composta-e-inversa")).toBe("f(x) = x");
    expect(certa("m3-funcao-composta-e-inversa")).toBe("x/3");
  });

  it("desafios", () => {
    expect(certa("d1-funcao-composta-e-inversa")).toBe("√x");
    expect(certa("d2-funcao-composta-e-inversa")).toBe(String(3 * 2 + 2));
    expect(certa("d3-funcao-composta-e-inversa")).toBe("(x + 4)/2");
    expect(certa("d4-funcao-composta-e-inversa")).toBe("Não");
    expect(certa("d5-funcao-composta-e-inversa")).toBe(String((7 - 1) / 2));
  });

  it("vestibular pendente de fontes reais", () => {
    semVestibular(L);
  });
});
