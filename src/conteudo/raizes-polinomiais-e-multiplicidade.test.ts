// Equações polinomiais, raízes e multiplicidade · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/algebra/polinomios-e-complexos/raizes-polinomiais-e-multiplicidade/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });
const quad = (a: number, b: number, c: number): CurvaResolvida => ({ tipo: "quadratica", a, b, c });
const cubica = (a: number, b: number, c: number, d: number): CurvaResolvida => ({ tipo: "cubica", a, b, c, d });

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
      const { metric } = s.complete_when;
      expect(s.controls.find((c) => c.id === metric)).toBeUndefined();
      expect(["ponto_x", "quadrantes", "na_raiz", "no_encontro", "faixa_x"]).toContain(metric);
    }
  });

  it("caso-neutro: reta x − 1 cruza o eixo em x = 1 (vai de negativo a positivo)", () => {
    const s = step("caso-neutro");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = afim(1, -1);
    expect(avaliar(r, 0)).toBe(-1);
    expect(avaliar(r, 1)).toBe(0);
    expect(avaliar(r, 2)).toBe(1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("repetir-fator: (x − 1)² é não negativa nos dois lados de x = 1 (toca o eixo)", () => {
    const s = step("repetir-fator");
    if (s.type !== "interactive_canvas") throw new Error();
    const q = quad(1, -2, 1);
    expect(avaliar(q, 0)).toBe(1);
    expect(avaliar(q, 1)).toBe(0);
    expect(avaliar(q, 2)).toBe(1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("potencia-impar: (x − 1)³ cruza o eixo em x = 1 (sai de negativo para positivo)", () => {
    const s = step("potencia-impar");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = cubica(1, -3, 3, -1);
    expect(avaliar(c, 0)).toBe(-1);
    expect(avaliar(c, 1)).toBe(0);
    expect(avaliar(c, 2)).toBe(1);
    expect(s.complete_when.gte).toBe(2);
  });

  it("conferir-previsao: em (x − 1)²(x + 2), raiz 1 tem multiplicidade 2", () => {
    const s = step("conferir-previsao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("1");
    expect(s.options.find((o) => o.id === "micro-erro")!.label).toBe("−2");
    // sinal trocado do fator (x - 1): P(-1) = (-2)²(1) = 4 ≠ 0
    const p = cubica(1, 0, -3, 2);
    expect(avaliar(p, -1)).toBe(4);
    expect(s.options.find((o) => o.id === "sinal-trocado-fator")!.label).toBe("−1");
    expect("−1").not.toBe(certaOpt.label);
    // sinal trocado de (x + 2) / expoente 2: P(2) = (1)²(4) = 4 ≠ 0
    expect(avaliar(p, 2)).toBe(4);
    expect(s.options.find((o) => o.id === "termo-positivo")!.label).toBe("2");
    expect("2").not.toBe(certaOpt.label);
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
    // F1: (x - 1)² tem raiz 1 com multiplicidade 2
    expect(Number(certa("f1-raizes-polinomiais-e-multiplicidade"))).toBe(2);

    // F2: raiz simples (m = 1) cruza o eixo
    expect(certa("f2-raizes-polinomiais-e-multiplicidade")).toBe("Cruzar");

    // F3: na raiz de (x - 1)², o quadrado não muda de sinal
    expect(certa("f3-raizes-polinomiais-e-multiplicidade")).toBe("Não");

    // F4: em (x - 1)³, m = 3 é ímpar
    expect(certa("f4-raizes-polinomiais-e-multiplicidade")).toBe("Ímpar");
  });

  it("médias", () => {
    // M1: (x - 1)²(x + 2) tem 2 raízes distintas: 1 e -2
    expect(Number(certa("m1-raizes-polinomiais-e-multiplicidade"))).toBe(2);

    // M2: grau de (x - 1)²(x + 2) = 2 + 1 = 3
    expect(Number(certa("m2-raizes-polinomiais-e-multiplicidade"))).toBe(3);

    // M3: raiz tripla de (x - 2)(x + 1)³ é -1
    expect(certa("m3-raizes-polinomiais-e-multiplicidade")).toBe("−1");
  });

  it("desafios", () => {
    // D1: (2x - 1)² => 2x - 1 = 0 => x = 0.5 com multiplicidade 2
    expect(certa("d1-raizes-polinomiais-e-multiplicidade")).toBe("0,5; multiplicidade 2");

    // D2: P = (x - 1)² * (x - 1) = (x - 1)³ => multiplicidade 3
    expect(Number(certa("d2-raizes-polinomiais-e-multiplicidade"))).toBe(3);

    // D3: x² + 1 em C tem 2 raízes contadas com multiplicidade (i e -i)
    expect(Number(certa("d3-raizes-polinomiais-e-multiplicidade"))).toBe(2);

    // D4: retirando (x - 1) de (x - 1)(x + 2), resta (x + 2), onde 1 não é raiz
    expect(certa("d4-raizes-polinomiais-e-multiplicidade")).toBe("Não");

    // D5: P(x) = (x - 1)²(x + 2): cruza -2 (m=1), toca 1 (m=2); P(0) = (-1)² * 2 = 2 > 0
    const p = (x: number) => (x - 1) ** 2 * (x + 2);
    expect(p(0)).toBe(2);
    expect(p(0)).toBeGreaterThan(0);
    expect(certa("d5-raizes-polinomiais-e-multiplicidade")).toBe("Cruza −2, toca 1; positivo");
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
