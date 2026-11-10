// Sequências Recursivas e Padrões · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis, semVestibular } from "./util";

const L = carregar("algebra/sequencias/sequencias-recursivas-e-padroes/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-"));
/** Gera N termos aplicando f(anteriores, índice). */
const gerar = (inicio: number[], n: number, f: (t: number[], i: number) => number) => {
  const t = [...inicio];
  while (t.length < n) t.push(f(t, t.length));
  return t;
};
const fibo = (n: number) => gerar([1, 1], n, (t) => t[t.length - 1] + t[t.length - 2]);
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error();
  return s.params as { a1?: number; d?: number; q?: number; categorias?: { valor: number }[] };
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("caso-neutro: a regra aₙ₊₁ = 1·aₙ + 0 mantém 5", () => {
    const p = params("caso-neutro");
    expect(gerar([p.a1!], 5, (t) => p.q! * t[t.length - 1] + p.d!)).toEqual([5, 5, 5, 5, 5]);
  });

  it("contraste-de-regras: somar 2 a partir de 3 dá 3, 5, 7, 9", () => {
    const p = params("contraste-de-regras");
    expect(gerar([p.a1!], 6, (t) => p.q! * t[t.length - 1] + p.d!).slice(0, 4)).toEqual([3, 5, 7, 9]);
  });

  it("teste-de-fronteira: as barras são Fibonacci (cada uma é a soma das duas anteriores)", () => {
    const v = params("teste-de-fronteira").categorias!.map((c) => c.valor);
    expect(v).toEqual(fibo(6));
    for (let i = 2; i < v.length; i++) expect(v[i]).toBe(v[i - 1] + v[i - 2]);
  });

  it("desafio: a₅ = 2 + 3 = 5", () => {
    expect(fibo(5)[4]).toBe(5);
    const s = passo(L, "micro-desafio");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("5");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(gerar([5], 3, (t) => t[t.length - 1])[2]).toBe(num(certa("sequencias-recursivas-e-padroes-f1")));
    expect(gerar([2], 4, (t) => t[t.length - 1] + 3).join(", ")).toBe(certa("sequencias-recursivas-e-padroes-f2"));
    expect(fibo(3)[2]).toBe(num(certa("sequencias-recursivas-e-padroes-f3")));
    expect(gerar([3], 4, (t, i) => t[i - 1] + (i % 2 === 1 ? 1 : 2))[3]).toBe(num(certa("sequencias-recursivas-e-padroes-f4")));
  });

  it("médias", () => {
    expect(fibo(5)[4]).toBe(num(certa("sequencias-recursivas-e-padroes-m1")));
    expect(gerar([16], 5, (t) => t[t.length - 1] / 2)[4]).toBe(num(certa("sequencias-recursivas-e-padroes-m2")));
    const r = gerar([2], 4, (t) => 2 * t[t.length - 1] + 1);
    expect(r).toEqual([2, 5, 11, 23]);
    expect(r[3]).toBe(num(certa("sequencias-recursivas-e-padroes-m3")));
  });

  it("desafios", () => {
    const d1 = gerar([2, 5], 4, (t) => t[t.length - 1] + t[t.length - 2]);
    expect(d1).toEqual([2, 5, 7, 12]);
    expect(d1[3]).toBe(num(certa("sequencias-recursivas-e-padroes-d1")));
    expect(gerar([10], 5, (t) => t[t.length - 1] - 3)[4]).toBe(num(certa("sequencias-recursivas-e-padroes-d2")));
    expect(gerar([1], 4, (t, i) => (i % 2 === 1 ? t[i - 1] * 2 : t[i - 1] + 1))).toEqual([1, 2, 3, 6]);
    expect(gerar([1], 4, (t, i) => (i === 3 ? t[i - 1] + 1 : t[i - 1] * 2))[3]).toBe(5); // distrator: ×2, ×2, +1
    expect(certa("sequencias-recursivas-e-padroes-d3")).toBe("6");
    expect(certa("sequencias-recursivas-e-padroes-d4")).toBe("2");
    const dobra = gerar([1], 6, (t) => 2 * t[t.length - 1]);
    expect(dobra.indexOf(16) + 1).toBe(num(certa("sequencias-recursivas-e-padroes-d5")));
  });

  it("vestibular: nenhuma questão sem fonte conferida", () => semVestibular(L));
});
