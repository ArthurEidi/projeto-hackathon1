// Taxas Equivalentes e Inflação · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("aritmetica/proporcionalidade/taxas-equivalentes-e-inflacao/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("R$", "").replace("%", "").replace("≈", "").trim().replace("−", "-").replace(",", "."));
const pct = (fator: number) => (fator - 1) * 100;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído (sliders t começam em 0)", () => passosConcluiveis(L));

  it("caso-neutro: fator 1 mantém 100", () => expect([1, 1, 1, 1].reduce((a, f) => a * f, 100)).toBe(100));

  it("contraste-de-regras: 10% duas vezes dá 21%, não 20%", () => {
    expect(pct(1.1 ** 2)).toBeCloseTo(21, 10);
    expect(100 * 1.1 ** 2).toBeCloseTo(121, 10);
  });

  it("teste-de-fronteira: 5% ao trimestre por 4 trimestres é 21,55%; 20% direto não é equivalente", () => {
    expect(pct(1.05 ** 4)).toBeCloseTo(21.550625, 6);
    expect(100 * 1.05 ** 4).toBeGreaterThan(120);
    expect(1.12 ** (1 / 12) - 1).toBeCloseTo(0.0094888, 6); // ≈ 0,95% ao mês
  });

  it("desafio: ganho real = 1,10/1,05 − 1 = 1/21 ≈ 4,76%", () => {
    expect(1.1 / 1.05 - 1).toBeCloseTo(1 / 21, 12);
    expect(pct(1.1 / 1.05)).toBeCloseTo(4.7619, 3);
    expect(110 / 1.05).toBeCloseTo(104.76, 2); // barra "valor real" do cenário
    const s = passo(L, "micro-desafio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(num(s.options.find((o) => o.correct)!.label)).toBeCloseTo(4.76, 2);
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("taxas-equivalentes-e-inflacao-f1")).toBe("Não");
    expect(pct(1.1 ** 2)).toBeCloseTo(num(certa("taxas-equivalentes-e-inflacao-f2")), 10);
    expect(1.1 / 1.1).toBe(1);
    expect(certa("taxas-equivalentes-e-inflacao-f3")).toBe("Fica igual");
    expect(pct(1.05 ** 4)).toBeCloseTo(num(certa("taxas-equivalentes-e-inflacao-f4")), 2);
  });

  it("médias", () => {
    expect(100 * 1.1).toBeCloseTo(num(certa("taxas-equivalentes-e-inflacao-m1")), 10);
    expect(1.2 / 1.1).toBeCloseTo(1.091, 3);
    expect(certa("taxas-equivalentes-e-inflacao-m2")).toBe("1,20/1,10 ≈ 1,091");
    expect(pct(1.01 ** 2)).toBeCloseTo(num(certa("taxas-equivalentes-e-inflacao-m3")), 10);
  });

  it("desafios", () => {
    expect(110 / 2).toBe(num(certa("taxas-equivalentes-e-inflacao-d1")));
    expect(Math.sqrt(1.21) - 1).toBeCloseTo(num(certa("taxas-equivalentes-e-inflacao-d2")) / 100, 12);
    expect(((126 - 120) / 120) * 100).toBe(num(certa("taxas-equivalentes-e-inflacao-d3")));
    expect(pct(1.1 / 1.05)).toBeCloseTo(num(certa("taxas-equivalentes-e-inflacao-d4")), 2);
    expect(pct(1.02 ** 12)).toBeCloseTo(26.82, 2);
    expect(pct(1.02 ** 12)).not.toBeCloseTo(24, 0);
    expect(certa("taxas-equivalentes-e-inflacao-d5")).toBe("Não; 1,02¹² − 1");
  });

  it("vestibular: conta e fonte conferidas", () => {
    expect(1250 * 1.072 * 1.1).toBeCloseTo(1474, 10);
    expect(certa("enem-2019-ibge")).toBe("R$ 1.474,00");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
