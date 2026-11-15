// Divisão de polinômios e teorema do resto · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/polinomios-e-complexos/divisao-polinomial-e-teorema-do-resto/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const quad = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "quadratica", a, b, c });
const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula: divisao-polinomial-e-teorema-do-resto", () => {
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

  it("caso-neutro: divisão de x²−1 por constante não gera resto polinomial", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "d", gte: 2 });
    const p = quad(1, 0, -1);
    expect(avaliar(p, 1)).toBe(0);
    expect(avaliar(p, 2)).toBe(3);
  });

  it("ler-resto: P(2) = 3 na curva x²−1", () => {
    const s = step("ler-resto");
    if (s.type !== "interactive_canvas") throw new Error();
    const p = quad(1, 0, -1);
    expect(avaliar(p, 2)).toBe(3);
    expect(s.complete_when).toEqual({ metric: "ponto_x", gte: 2 });
  });

  it("montar-quociente: identidade P(x) = (x−2)(x+2) + 3", () => {
    const s = step("montar-quociente");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toEqual({ metric: "etapa", gte: 2 });
    const q = afim(1, 2);
    // (x-2)*Q(x) + 3 para x = 0, 1, 2, 3 coincide com x² - 1
    for (const x of [0, 1, 2, 3]) {
      const p = x * x - 1;
      const expandido = (x - 2) * avaliar(q, x) + 3;
      expect(expandido).toBe(p);
    }
  });

  it("encontrar-fator: em x = 1, P(1) = 0", () => {
    const s = step("encontrar-fator");
    if (s.type !== "interactive_canvas") throw new Error();
    const p = quad(1, 0, -1);
    expect(avaliar(p, 1)).toBe(0);
    expect(s.complete_when).toEqual({ metric: "na_raiz", gte: 1 });
  });

  it("conferir-previsao: micro_challenge acerta resto 3", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("3");
    expect(s.options.find((o) => o.id === "micro-erro")!.label).toBe("0");
    // termo constante: P(0) = -1 ≠ 3
    const p0 = avaliar(quad(1, 0, -1), 0);
    expect(p0).toBe(-1);
    expect(s.options.find((o) => o.id === "termo-constante")!.label).toBe("−1");
    expect(String(p0)).not.toBe(certaOpt.label);
    // sinal trocado do termo constante: 2² + 1 = 5 ≠ 3
    const pErr = avaliar(quad(1, 0, 1), 2);
    expect(pErr).toBe(5);
    expect(s.options.find((o) => o.id === "sinal-constante")!.label).toBe("5");
    expect(String(pErr)).not.toBe(certaOpt.label);
  });

  it("fechamento: referências da fórmula existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
    expect(s.definitions).toHaveLength(3);
  });
});

describe("gabaritos do treino: divisao-polinomial-e-teorema-do-resto", () => {
  it("fáceis", () => {
    // F1: resto ao dividir P(x) por x-2 é P(2)
    expect(certa("f1-divisao-polinomial-e-teorema-do-resto")).toBe("P(2)");

    // F2: resto zero => x-r é fator
    expect(certa("f2-divisao-polinomial-e-teorema-do-resto")).toBe("Sim");

    // F3: resto por linear tem grau < 1 (não pode ter grau 1)
    expect(certa("f3-divisao-polinomial-e-teorema-do-resto")).toBe("Não");

    // F4: dividir por 1 deixa resto 0
    expect(certa("f4-divisao-polinomial-e-teorema-do-resto")).toBe("0");
  });

  it("médias", () => {
    // M1: resto de x²-1 por x-2 é P(2) = 2² - 1 = 3
    expect(certa("m1-divisao-polinomial-e-teorema-do-resto")).toBe("3");

    // M2: resto de x²+1 por x+1 é P(-1) = (-1)² + 1 = 2
    expect(certa("m2-divisao-polinomial-e-teorema-do-resto")).toBe("2");

    // M3: quociente de x²-1 por x-1 é x+1
    expect(certa("m3-divisao-polinomial-e-teorema-do-resto")).toBe("x+1");
  });

  it("desafios", () => {
    // D1: x²+k divisível por x-2 => 2² + k = 0 => k = -4
    expect(certa("d1-divisao-polinomial-e-teorema-do-resto")).toBe("−4");

    // D2: resto de 2x+1 por 2x-1 => raiz é 1/2; P(1/2) = 2(0.5) + 1 = 2
    expect(certa("d2-divisao-polinomial-e-teorema-do-resto")).toBe("2");

    // D3: resto por x²-1 pode ter grau até 1 (ax+b), não precisa ser constante
    expect(certa("d3-divisao-polinomial-e-teorema-do-resto")).toBe("Não");

    // D4: resto de x³-1 por x-1 é P(1) = 1³ - 1 = 0
    expect(certa("d4-divisao-polinomial-e-teorema-do-resto")).toBe("0");

    // D5: P(x) = (x-2)(x+1) + 3 => resto por x-2 é P(2)=3; P(0) = (-2)(1) + 3 = 1
    expect(certa("d5-divisao-polinomial-e-teorema-do-resto")).toBe("3 e 1");
  });
});
