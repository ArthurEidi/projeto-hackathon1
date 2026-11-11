// Descontos, Acréscimos e Índices · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passosConcluiveis, semVestibular } from "./util";

const L = carregar("aritmetica/proporcionalidade/descontos-acrescimos-e-indices/aula-01.json");
const certa = (id: string) => certaDe(L, "descontos-acrescimos-e-indices-" + id);
const num = (s: string) => Number(s.replace("R$", "").replace("%", "").trim().replace(",", "."));

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));
  it("fatores: 0% = 1; −10% = 0,9; +10% e −10% dão 0,99; 10% de 100 leva a 90", () => {
    expect(1 + 0).toBe(1);
    expect(100 - 10 * 1).toBe(90);
    expect(1.1 * 0.9).toBeCloseTo(0.99, 12);
    expect(100 * 1.1 * 0.9).toBeCloseTo(99, 10);
    expect(0.9 * 1.1).toBeCloseTo(1.1 * 0.9, 12);
    expect(132 / 120).toBeCloseTo(1.1, 12);
  });
  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(100 * 0.9).toBeCloseTo(num(certa("f1")), 10);
    expect(50 * 1.2).toBeCloseTo(num(certa("f2")), 10);
    expect(((110 - 100) / 100) * 100).toBe(num(certa("f3")));
    expect(200 * 0.75).toBe(num(certa("f4")));
  });
  it("médias", () => {
    expect(80 * 1.1).toBeCloseTo(num(certa("m1")), 10);
    expect(100 - 20).toBe(num(certa("m2")));
    expect(100 * 1.1 * 0.9).toBeCloseTo(num(certa("m3")), 10);
  });
  it("desafios", () => {
    expect(200 * 0.9 ** 2).toBeCloseTo(num(certa("d1")), 10);
    expect(200 - 2 * 20).toBe(160);
    expect(((132 - 120) / 120) * 100).toBeCloseTo(num(certa("d2")), 10);
    expect(250 * 1.08).toBeCloseTo(num(certa("d3")), 10);
    expect(250 + 8).toBe(258);
    expect(1.2 * 0.8).toBeCloseTo(num(certa("d4")), 12);
    expect(((150 - 100) / 100) * 100).toBe(num(certa("d5")));
  });
  it("vestibular: nenhuma questão sem fonte conferida", () => semVestibular(L));
});
