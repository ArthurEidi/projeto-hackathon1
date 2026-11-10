// Quartis, Percentis e Boxplot · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis, semVestibular } from "./util";

const L = carregar("aritmetica/estatistica/quartis-percentis-e-boxplot/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-").replace(",", "."));
const ord = (v: number[]) => [...v].sort((a, b) => a - b);
const med = (s: number[]) => {
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
/** Método das metades (GUIA §5.3): a mediana entra em nenhuma das metades quando a quantidade é ímpar. */
const quartis = (v: number[]) => {
  const s = ord(v);
  const m = s.length >> 1;
  const baixo = s.slice(0, m);
  const alto = s.slice(s.length % 2 ? m + 1 : m);
  return { q1: med(baixo), q2: med(s), q3: med(alto) };
};
const aiq = (v: number[]) => quartis(v).q3 - quartis(v).q1;
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error();
  return s.params as { valores: number[]; fixos?: string[]; arrastaveis?: string[]; maior_arrastavel?: { ate: number } };
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("mediana-corta: 8, 1, 12, 4, 6, 9, 3 em fila têm mediana 6 (4ª ficha) e Q2 é arrastável", () => {
    const p = params("mediana-corta");
    expect(ord(p.valores)).toEqual([1, 3, 4, 6, 8, 9, 12]);
    expect(quartis(p.valores).q2).toBe(6);
    expect(ord(p.valores)[3]).toBe(6);
    expect(p.arrastaveis).toEqual(["q2"]);
  });

  it("quartis: Q1 = 3 e Q3 = 9; só Q1 e Q3 são arrastáveis", () => {
    const p = params("quartis");
    expect(quartis(p.valores)).toEqual({ q1: 3, q2: 6, q3: 9 });
    expect(p.arrastaveis).toEqual(["q1", "q3"]);
    expect(p.fixos).toEqual(["q2"]);
  });

  it("desenhar-caixa: AIQ = 9 − 3 = 6, bigodes de 1 a 12", () => {
    const v = params("desenhar-caixa").valores;
    expect(aiq(v)).toBe(6);
    expect([Math.min(...v), Math.max(...v)]).toEqual([1, 12]);
  });

  it("extremo-estica: arrastar 12 até 40 não move a caixa; o limite atípico é 9 + 1,5 · 6 = 18", () => {
    const p = params("extremo-estica");
    const depois = [...p.valores.slice(0, -1), 40];
    expect(quartis(depois)).toEqual(quartis(p.valores));
    expect(p.maior_arrastavel!.ate).toBe(40);
    const { q3 } = quartis(p.valores);
    expect(q3 + 1.5 * aiq(p.valores)).toBe(18);
    expect(40).toBeGreaterThan(18);
  });

  it("desafio: Q1 de 2, 4, 5, 7, 8, 10, 11 é 4 (Q2 = 7, Q3 = 10)", () => {
    expect(quartis([2, 4, 5, 7, 8, 10, 11])).toEqual({ q1: 4, q2: 7, q3: 10 });
    const s = passo(L, "desafio-q1");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("4");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("nome-da-mediana")).toBe("Q2");
    expect(75 - 25).toBe(num(certa("dentro-da-caixa").replace("%", "")));
    expect(certa("abaixo-de-q1")).toBe("25%");
    expect(20 - 10).toBe(num(certa("largura-caixa")));
  });

  it("médias", () => {
    expect(quartis([1, 2, 3, 4, 5, 6, 7]).q3).toBe(num(certa("q3-1-a-7")));
    expect(quartis([1, 2, 3, 4, 5, 6, 7])).toEqual({ q1: 2, q2: 4, q3: 6 });
    expect(certa("percentil-90")).toBe("90% tiraram nota menor ou igual");
    expect(20 - 5).toBe(num(certa("amplitude-total")));
    expect(15 - 8).toBe(7);
  });

  it("desafios", () => {
    const v = [3, 5, 7, 9, 11, 13, 15];
    expect(quartis(v)).toEqual({ q1: 5, q2: 9, q3: 13 });
    expect(aiq(v)).toBe(num(certa("aiq-impar")));
    expect(15 - 3).toBe(12);
    expect(certa("maior-dobra")).toBe("Só o bigode de cima");
    expect([12 - 10, 20 - 5]).toEqual([2, 15]);
    expect(certa("mais-concentrado")).toBe("A");
    expect(30 + 1.5 * (30 - 20)).toBe(num(certa("limite-atipico")));
    expect(30 + 10).toBe(40);
    expect(30 + 0.5 * 10).toBe(35);
    expect(30 + 1.5 * 30).toBe(75);
    expect(0.25 * 200).toBe(num(certa("percentil-25-de-200")));
  });

  it("vestibular: nenhuma questão sem fonte conferida", () => semVestibular(L));
});
