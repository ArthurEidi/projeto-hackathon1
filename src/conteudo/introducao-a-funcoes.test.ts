// Introdução a Funções · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { certaDe, fechamentoOk } from "./util";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/funcoes/introducao-a-funcoes/aula-01.json",
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
        expect(["ponto_x", "faixa_x", "quadrantes", "na_raiz", "no_encontro", "entradas_com_uma_saida"]).toContain(metric);
      }
    }
  });

  it("caso-neutro: f(x) = x em x = 2 dá f(2) = 2", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.gte).toBe(2);
  });

  it("setas-uma-saida: usa maquinas_funcao e conclui com 2 entradas ligadas a 1 saída", () => {
    const s = step("setas-uma-saida");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.widget).toBe("maquinas_funcao");
    expect(s.complete_when.metric).toBe("entradas_com_uma_saida");
    expect(s.complete_when.gte).toBe(2);
  });

  it("duas-entradas: em f(x) = x², entradas −2 e 2 produzem a mesma saída 4", () => {
    const s = step("duas-entradas");
    if (s.type !== "interactive_canvas") throw new Error();
    expect((-2) ** 2).toBe(2 ** 2);
    expect(s.complete_when.gte).toBe(4);
  });

  it("desafio-fronteira: relação com (1;2) e (1;4) não é função", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("Não é função");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("f1-introducao-a-funcoes")).toBe(String(2 + 3));
    expect(certa("f2-introducao-a-funcoes")).toBe("Não");
    expect(certa("f3-introducao-a-funcoes")).toBe("Sim, ambas dão 9");
    expect(certa("f4-introducao-a-funcoes")).toBe("Domínio");
  });

  it("médias", () => {
    expect(certa("m1-introducao-a-funcoes")).toBe(String(3 * 4 - 2));
    expect(certa("m2-introducao-a-funcoes")).toBe(String((11 - 5) / 2));
    expect(certa("m3-introducao-a-funcoes")).toBe("Todos os reais exceto 2");
  });

  it("desafios", () => {
    expect(certa("d1-introducao-a-funcoes")).toBe("x ≥ 3");
    expect(certa("d2-introducao-a-funcoes")).toBe("{−1, 3}");
    // f(x+1) = 2x + 3 com x+1 = 4 => x = 3 => 2*3 + 3 = 9
    expect(certa("d3-introducao-a-funcoes")).toBe(String(2 * 3 + 3));
    expect(certa("d4-introducao-a-funcoes")).toBe("x² + y² = 1");
    expect(certa("d5-introducao-a-funcoes")).toBe(String((7 - 1) / 2));
  });

  it("vestibular confere gabaritos ENEM por conta", () => {
    // 2023/162: y(3) = 250*3 + 500 = 1250
    expect(250 * 3 + 500).toBe(1250);
    expect(certa("enem-2023-concreto")).toBe("y = 250x + 500");

    // 2021/141: d=100, n=3, L=50, s=0,1 => 300 + 50 + 30 = 380
    const [d, n, lim, s] = [100, 3, 50, 0.1];
    expect(d * n + lim + d * n * s).toBe(380);
    expect(certa("enem-2021-hospedagem")).toBe("P = d·n + L + d·n·s");

    // 2011/156: b = 880605 - 2*4300 = 872005
    expect(880605 - 2 * 4300).toBe(872005);
    expect(certa("enem-2011-varejo")).toBe("y = 872.005 + 4.300x");
  });
});
