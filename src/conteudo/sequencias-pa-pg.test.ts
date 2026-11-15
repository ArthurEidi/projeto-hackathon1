// Sequências PA e PG · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("algebra/sequencias/sequencias-pa-pg/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-"));
/** aₙ da PA e da PG pelas fórmulas do fechamento. */
const pa = (a1: number, d: number, n: number) => a1 + (n - 1) * d;
const pg = (a1: number, q: number, n: number) => a1 * q ** (n - 1);
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error();
  return s.params as { regra: string; a1: number; d?: number | string; q?: number; termos: number };
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("caso-neutro: PG com a₁ = 4 e q = 1 fica parada em 4", () => {
    const p = params("caso-neutro");
    expect([1, 2, 3, 4, 5].map((n) => pg(p.a1, p.q!, n))).toEqual([4, 4, 4, 4, 4]);
    expect([1, 2, 3, 4, 5].map((n) => pa(4, 0, n))).toEqual([4, 4, 4, 4, 4]);
  });

  it("contraste-de-regras: com d = 2 a PA é 1, 3, 5, 7, 9 e a PG cinza é 1, 2, 4, 8, 16", () => {
    expect([1, 2, 3, 4, 5].map((n) => pa(1, 2, n))).toEqual([1, 3, 5, 7, 9]);
    expect([1, 2, 3, 4, 5].map((n) => pg(1, 2, n))).toEqual([1, 2, 4, 8, 16]);
  });

  it("teste-de-fronteira: com q = −1 os sinais alternam e o módulo fica", () => {
    const p = params("teste-de-fronteira");
    const t = [1, 2, 3, 4, 5, 6].map((n) => pg(p.a1, p.q!, n));
    expect(t).toEqual([2, -2, 2, -2, 2, -2]);
    expect(t.slice(0, 5)).toEqual([2, -2, 2, -2, 2]); // texto da conclusão
    expect(p.termos).toBe(6);
  });

  it("desafio: a₅ da PA (4, −2) é −4 e as erradas refletem erros reais", () => {
    expect([pa(4, -2, 5), pa(4, -2, 6)]).toEqual([-4, -6]);
    const s = passo(L, "micro-desafio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("−4");
    // 5 avanços em vez de 4: a₆ = -6 ≠ -4
    expect(pa(4, -2, 6)).toBe(-6);
    expect(s.options.find((o) => o.id === "o2")!.label).toBe("−6");
    // sinal de d trocado: pa(4, +2, 5) = 12 ≠ -4
    expect(pa(4, 2, 5)).toBe(12);
    expect(s.options.find((o) => o.id === "sinal-trocado")!.label).toBe("12");
    expect("12").not.toBe(certaOpt.label);
    // confundiu PA com PG: pg(4, -2, 5) = 64 ≠ -4
    expect(pg(4, -2, 5)).toBe(64);
    expect(s.options.find((o) => o.id === "usou-pg")!.label).toBe("64");
    expect("64").not.toBe(certaOpt.label);
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(8 + (5 - 2)).toBe(num(certa("sequencias-pa-pg-f1")));
    expect(12 * (6 / 3)).toBe(num(certa("sequencias-pa-pg-f2")));
    expect(pa(4, 2, 4)).toBe(num(certa("sequencias-pa-pg-f3")));
    expect(pg(2, 3, 3)).toBe(num(certa("sequencias-pa-pg-f4")));
  });

  it("médias", () => {
    const s = [7, 5, 3, 1];
    expect(s.slice(1).map((v, i) => v - s[i])).toEqual([-2, -2, -2]);
    expect(certa("sequencias-pa-pg-m1")).toBe("Sim, −2");
    expect(pg(16, 1 / 2, 4)).toBe(num(certa("sequencias-pa-pg-m2")));
    expect(pa(3, 4, 6)).toBe(num(certa("sequencias-pa-pg-m3")));
    expect(3 + 6 * 4).toBe(27); // distrator: seis avanços
  });

  it("desafios", () => {
    expect(pg(5, -2, 4)).toBe(num(certa("sequencias-pa-pg-d1")));
    expect([pa(4, 0, 3), pg(4, 1, 3)]).toEqual([4, 4]);
    expect(certa("sequencias-pa-pg-d2")).toBe("Sim: d = 0 e q = 1");
    const n = Number(certa("sequencias-pa-pg-d3"));
    expect(pa(10, -3, n)).toBe(1);
    expect(pa(10, -3, 3)).not.toBe(1);
    expect(pg(81, 1 / 3, 5)).toBeCloseTo(num(certa("sequencias-pa-pg-d4")), 12);
    expect(pg(81, 1 / 3, 4)).toBeCloseTo(3, 12);
    expect([1, 2, 3].map((k) => pa(2, 0, k))).toEqual([2, 2, 2]);
    expect([1, 2, 3].map((k) => pg(2, 0, k))).toEqual([2, 0, 0]);
    expect(certa("sequencias-pa-pg-d5")).toBe("PA: 2, 2, 2; PG: 2, 0, 0");
  });

  it("vestibular: gabaritos conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(2);
    // V1 ENEM 2018/141: a1=80, d=20, an=1380 => n=66 => 66*8000 = 528000
    const n = (1380 - 80) / 20 + 1;
    expect(pa(80, 20, n)).toBe(1380);
    expect(n * 8000).toBe(528_000);
    expect(certa("enem-2018-postes")).toBe("R$ 528 000,00");

    // V2 ENEM 2019/155: bloco [5,4,3,2,1,2,3,4], 2015 % 8 = 7 => 7o item = 3 (Caixa de direção)
    const bloco = [5, 4, 3, 2, 1, 2, 3, 4];
    expect(bloco[(2015 - 1) % 8]).toBe(3);
    expect(certa("enem-2019-autopecas")).toBe("Caixa de direção");
  });
});
