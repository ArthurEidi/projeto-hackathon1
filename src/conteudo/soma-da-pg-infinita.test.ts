// Soma da PG Infinita · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("algebra/sequencias/soma-da-pg-infinita/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-").replace(",", "."));
const parcial = (a1: number, q: number, n: number) => Array.from({ length: n }, (_, i) => a1 * q ** i).reduce((a, b) => a + b, 0);
const limite = (a1: number, q: number) => a1 / (1 - q);
const frac = (s: string) => {
  const [a, b] = s.split("/").map(Number);
  return b ? a / b : a;
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("caso-neutro: com a₁ = 8 e q = 1/2 as somas parciais sobem 8, 12, 14, 15 e ficam abaixo de 16", () => {
    expect([1, 2, 3, 4].map((n) => parcial(8, 0.5, n))).toEqual([8, 12, 14, 15]);
    expect(parcial(8, 0.5, 6)).toBeLessThan(16);
    expect(limite(8, 0.5)).toBe(16);
    expect(parcial(0, 0.5, 6)).toBe(0); // a₁ = 0
  });

  it("contraste-de-regras: com m = 2, q = 1/m = 0,5 e o 2º termo é 4; com m = 1 não há soma finita", () => {
    expect(8 * (1 / 2)).toBe(4);
    expect(1 / 1).toBe(1);
    const s = passo(L, "contraste-de-regras");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.controls[0].initial).toBe(1);
  });

  it("teste-de-fronteira: com q = 1 as somas são 8, 16, 24… e crescem sem limite", () => {
    expect([1, 2, 3].map((n) => parcial(8, 1, n))).toEqual([8, 16, 24]);
    expect(parcial(8, 1, 1000)).toBeGreaterThan(1000);
    expect(Math.abs(-1)).toBe(1); // q = −1 também não encolhe
  });

  it("desafio: 8 + 4 + 2 + … = 16 e as erradas refletem erros reais", () => {
    expect([limite(8, 0.5), parcial(8, 0.5, 3)]).toEqual([16, 14]);
    const s = passo(L, "micro-desafio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("16");
    // soma parcial S₃ = 14 ≠ 16
    expect(parcial(8, 0.5, 3)).toBe(14);
    expect(s.options.find((o) => o.id === "o2")!.label).toBe("14");
    // soma parcial S₂ = 8 + 4 = 12 ≠ 16
    expect(parcial(8, 0.5, 2)).toBe(12);
    expect(s.options.find((o) => o.id === "soma-dois-termos")!.label).toBe("12");
    expect(String(parcial(8, 0.5, 2))).not.toBe(certaOpt.label);
    // confundiu soma com a₂ = a₁ * q = 4 ≠ 16
    expect(8 * 0.5).toBe(4);
    expect(s.options.find((o) => o.id === "segundo-termo")!.label).toBe("4");
    expect(String(8 * 0.5)).not.toBe(certaOpt.label);
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(limite(8, 0.5)).toBe(num(certa("soma-da-pg-infinita-f1")));
    expect(parcial(8, 0.5, 2)).toBe(12);
    expect(limite(3, 0)).toBe(num(certa("soma-da-pg-infinita-f2")));
    expect(certa("soma-da-pg-infinita-f3")).toBe("|q| < 1");
    expect(limite(4, 0.5)).toBe(num(certa("soma-da-pg-infinita-f4")));
    expect(parcial(4, 0.5, 3)).toBe(7);
  });

  it("médias", () => {
    expect(limite(6, 0.5)).toBe(num(certa("soma-da-pg-infinita-m1")));
    expect(parcial(6, 0.5, 3)).toBe(10.5);
    expect(limite(5, 0.2)).toBeCloseTo(num(certa("soma-da-pg-infinita-m2")), 12);
    expect(5 + 1).toBe(6);
    expect(limite(10, -0.5)).toBeCloseTo(frac(certa("soma-da-pg-infinita-m3")), 12);
    expect(limite(10, 0.5)).toBe(20);
  });

  it("desafios", () => {
    expect(certa("soma-da-pg-infinita-d1")).toBe("Não");
    expect(parcial(7, 1, 100)).toBe(700);
    expect(limite(12, 1 / 3)).toBeCloseTo(num(certa("soma-da-pg-infinita-d2")), 12);
    expect(12 / (1 / 3)).toBeCloseTo(36, 12);
    expect(certa("soma-da-pg-infinita-d3")).toBe("Não converge");
    expect(parcial(2, 3, 3)).toBe(26);
    expect(limite(9, -1 / 3)).toBeCloseTo(frac(certa("soma-da-pg-infinita-d4")), 12);
    expect(limite(9, 1 / 3)).toBeCloseTo(27 / 2, 12);
    expect(limite(8, 0.5) - parcial(8, 0.5, 3)).toBe(num(certa("soma-da-pg-infinita-d5")));
    expect(8 * 0.5 ** 3).toBe(1); // próxima parcela
  });

  it("vestibular: Unicamp 2021 Q30 (gabarito oficial b)", () => {
    // (2x)² = 1 · (−3x + 1) ⇒ 4x² + 3x − 1 = 0 ⇒ x = 1/4 ou x = −1
    for (const x of [1 / 4, -1]) expect(4 * x * x + 3 * x - 1).toBeCloseTo(0, 12);
    expect(-3 * -1 + 1).toBe(4); // x = −1: termos 1, −2, 4 (não positivos)
    const r = 2 * (1 / 4);
    expect(r).toBe(0.5);
    expect(-3 * (1 / 4) + 1).toBeCloseTo(r * r, 12);
    expect(1 / (1 - r)).toBe(2);
    expect(certa("unicamp-2021-pg-1-2x")).toBe("2");
  });
});
