// Somatórios de PA e PG · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("algebra/sequencias/somatorios-pa-pg/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-"));
const termosPA = (a1: number, d: number, n: number) => Array.from({ length: n }, (_, i) => a1 + i * d);
const termosPG = (a1: number, q: number, n: number) => Array.from({ length: n }, (_, i) => a1 * q ** i);
const soma = (v: number[]) => v.reduce((a, b) => a + b, 0);
const sPA = (a1: number, an: number, n: number) => (n * (a1 + an)) / 2;
const sPG = (a1: number, q: number, n: number) => (q === 1 ? n * a1 : (a1 * (1 - q ** n)) / (1 - q));

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("caso-neutro: S₁ = a₁ = 2 e a PA é 2, 5, 8, 11, 14", () => {
    expect(termosPA(2, 3, 5)).toEqual([2, 5, 8, 11, 14]);
    expect(soma(termosPA(2, 3, 1))).toBe(2);
  });

  it("contraste-de-regras: extremos de 2, 5, 8, 11 somam 13, o outro par também, S₄ = 26", () => {
    const t = termosPA(2, 3, 4);
    expect([t[0] + t[3], t[1] + t[2]]).toEqual([13, 13]);
    expect(soma(t)).toBe(26);
    expect(sPA(2, 11, 4)).toBe(26);
  });

  it("teste-de-fronteira: com q = 1 e a₁ = 3 as somas são 3, 6, 9, 12, 15 (= n·a₁); 1 − q = 0", () => {
    const s = [1, 2, 3, 4, 5].map((n) => soma(termosPG(3, 1, n)));
    expect(s).toEqual([3, 6, 9, 12, 15]);
    expect(s).toEqual([1, 2, 3, 4, 5].map((n) => sPG(3, 1, n)));
    expect(1 - 1).toBe(0);
    expect(soma(termosPG(5, 0, 6))).toBe(5); // q = 0: só a₁
  });

  it("desafio: S₅ = 40 e as erradas refletem erros reais", () => {
    expect([sPA(2, 14, 5), soma(termosPA(2, 3, 5))]).toEqual([40, 40]);
    expect(soma(termosPA(2, 3, 4))).toBe(26);
    const s = passo(L, "micro-desafio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options).toHaveLength(4);
    const certaOpt = s.options.find((o) => o.correct)!;
    expect(certaOpt.label).toBe("40");
    // omitiu o 5º termo: S₄ = 26 ≠ 40
    expect(s.options.find((o) => o.id === "o2")!.label).toBe("26");
    // esqueceu de dividir por 2: 5 * (2 + 14) = 80 ≠ 40
    const semDividir = 5 * (2 + 14);
    expect(semDividir).toBe(80);
    expect(s.options.find((o) => o.id === "esqueceu-dividir-dois")!.label).toBe("80");
    expect(String(semDividir)).not.toBe(certaOpt.label);
    // somou apenas os extremos: 2 + 14 = 16 ≠ 40
    expect(2 + 14).toBe(16);
    expect(s.options.find((o) => o.id === "somou-extremos")!.label).toBe("16");
    expect(String(2 + 14)).not.toBe(certaOpt.label);
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(soma([1, 2, 3, 4, 5])).toBe(num(certa("somatorios-pa-pg-f1")));
    expect(soma([2, 4, 8])).toBe(num(certa("somatorios-pa-pg-f2")));
    expect(2 + 4).toBe(6);
    expect(sPA(2, 14, 5)).toBe(num(certa("somatorios-pa-pg-f3")));
    expect(2 + 14).toBe(16);
    expect(soma(termosPG(1, 2, 4))).toBe(num(certa("somatorios-pa-pg-f4")));
  });

  it("médias", () => {
    expect(soma([3, 5, 7, 9])).toBe(num(certa("somatorios-pa-pg-m1")));
    expect(soma([3, 5, 7])).toBe(15);
    expect(soma(termosPG(3, 2, 3))).toBe(num(certa("somatorios-pa-pg-m2")));
    expect(termosPG(3, 2, 3)[2]).toBe(12);
    const a6 = termosPA(4, 3, 6)[5];
    expect(a6).toBe(19);
    expect(sPA(4, a6, 6)).toBe(num(certa("somatorios-pa-pg-m3")));
  });

  it("desafios", () => {
    expect(soma(termosPG(5, 2, 4))).toBe(num(certa("somatorios-pa-pg-d1")));
    expect(sPG(5, 2, 4)).toBe(75);
    const d2 = termosPA(10, -2, 4);
    expect(d2).toEqual([10, 8, 6, 4]);
    expect(soma(d2)).toBe(num(certa("somatorios-pa-pg-d2")));
    expect(soma([2, 6, 18])).toBe(num(certa("somatorios-pa-pg-d3")));
    expect(sPG(4, 1, 5)).toBe(num(certa("somatorios-pa-pg-d4")));
    expect(4 * 4).toBe(16);
    const [pa, pg] = [soma([1, 4, 7]), soma([1, 2, 4])];
    expect([pa, pg, pa - pg]).toEqual([12, 7, 5]);
    expect(7 - 4).toBe(3);
    expect(certa("somatorios-pa-pg-d5")).toBe("PA, por 5");
  });

  it("vestibular: gabaritos conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(1);
    // V1 ENEM 2018/162: 128 tenistas => 64 + 32 + 16 + 8 + 4 + 2 + 1 = 127 partidas
    expect(soma([64, 32, 16, 8, 4, 2, 1])).toBe(127);
    expect(certa("enem-2018-tenis")).toBe("64 + 32 + 16 + 8 + 4 + 2 + 1");
  });
});
