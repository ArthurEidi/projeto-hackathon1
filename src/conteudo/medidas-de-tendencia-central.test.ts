// Média, Mediana e Moda · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("aritmetica/estatistica/medidas-de-tendencia-central/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-").replace(",", "."));
const media = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
const mediana = (v: number[]) => {
  const s = [...v].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const moda = (v: number[]) => {
  const c = new Map<number, number>();
  for (const x of v) c.set(x, (c.get(x) ?? 0) + 1);
  return [...c.entries()].sort((a, b) => b[1] - a[1])[0][0];
};
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error();
  return s.params as { valores: number[]; regua: [number, number]; arrastaveis?: number[]; apoio_inicial?: number };
};

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("todos-iguais: média, mediana e moda coincidem em 6", () => {
    const v = params("todos-iguais").valores;
    expect([media(v), mediana(v), moda(v)]).toEqual([6, 6, 6]);
  });

  it("gangorra: o apoio inicial não está na média (5); média de 2, 4, 6, 8 = 5", () => {
    const p = params("gangorra");
    expect(media(p.valores)).toBe(5);
    expect(p.apoio_inicial).not.toBe(5);
    expect(((5 - 0) / 1) % 1).toBe(0); // passo 1
  });

  it("valor-extremo: 8 → 30 leva a média de 6 para 10,4 e a mediana fica em 6", () => {
    const p = params("valor-extremo");
    expect([media(p.valores), mediana(p.valores)]).toEqual([6, 6]);
    const depois = [...p.valores.slice(0, 4), 30];
    expect(media(depois)).toBeCloseTo(10.4, 10);
    expect(mediana(depois)).toBe(6);
    expect(p.regua[1]).toBeGreaterThanOrEqual(30);
    expect(p.arrastaveis).toEqual([4]);
  });

  it("par-e-moda: mediana (5 + 7) / 2 = 6 e moda 5", () => {
    const v = params("par-e-moda").valores;
    expect([mediana(v), moda(v)]).toEqual([6, 5]);
  });

  it("desafio: 5 + 7 + 9 = 21 dá média 7; 7 e 8 não", () => {
    expect(media([5, 7, 9])).toBe(7);
    expect(media([5, 7, 7])).toBeCloseTo(19 / 3, 10);
    expect(media([5, 7, 8])).toBeCloseTo(20 / 3, 10);
    const s = passo(L, "desafio-nota-que-falta");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("9");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(media([2, 4, 6])).toBe(num(certa("media-2-4-6")));
    expect(mediana([3, 9, 1, 5, 7])).toBe(num(certa("mediana-impar")));
    expect(moda([2, 3, 3, 5, 8])).toBe(num(certa("moda")));
    expect(media([2, 3, 3, 5, 8])).toBeCloseTo(4.2, 10);
    expect(media([7, 7, 7, 7])).toBe(num(certa("todas-iguais")));
  });

  it("médias", () => {
    expect(mediana([2, 4, 6, 8])).toBe(num(certa("mediana-par")));
    expect(6 * 4).toBe(num(certa("soma-pela-media")));
    const s = [1, 1, 1, 1, 16];
    expect([media(s), mediana(s)]).toEqual([4, 1]);
    expect(certa("salario-tipico")).toBe("Mediana");
  });

  it("desafios", () => {
    expect((2 * 8 + 5) / 3).toBe(num(certa("ponderada")));
    expect((8 + 5) / 2).toBe(6.5);
    expect((2 * 8 + 5) / 2).toBe(10.5);
    expect((5 * 10 + 16) / 6).toBe(num(certa("entra-um-valor")));
    expect((10 + 16) / 2).toBe(13);
    expect(66 / 5).toBeCloseTo(13.2, 10);
    expect((10 * 6 + 20 * 9) / 30).toBe(num(certa("media-de-grupos")));
    expect(21 - (6 + 7)).toBe(num(certa("nota-para-media-7")));
    expect(media([6, 7, 7])).toBeCloseTo(6.667, 3);
    const a = [2, 4, 6, 8, 10];
    const b = [2, 4, 6, 8, 100];
    expect(mediana(a)).toBe(mediana(b));
    expect([media(a), media(b)]).toEqual([6, 24]);
    expect(b.reduce((x, y) => x + y, 0) - a.reduce((x, y) => x + y, 0)).toBe(90);
    expect(certa("o-que-nao-muda")).toBe("Mediana");
  });

  it("vestibular: conta de cada item", () => {
    // ENEM 2018: pesos 0,2; 0,1; 0,3; 0,4, média mínima 60
    const garantido = 0.2 * 46 + 0.1 * 60 + 0.3 * 50;
    expect(garantido).toBeCloseTo(30.2, 10);
    expect((60 - garantido) / 0.4).toBeCloseTo(num(certa("enem-2018-media-ponderada")), 10);
    expect(garantido + 0.4 * 71).toBeCloseTo(58.6, 10);
    // UFT 2013
    const mulheres = (35 * 1.65 - 20 * 1.7) / 15;
    expect(mulheres).toBeCloseTo(num(certa("uft-2013-alturas")), 2);
    // EsSA 2012: 9,8 A + 7,8 E = 9 (A + E)  =>  A = 1,5 E
    const A = 0.6;
    expect(9.8 * A + 7.8 * (1 - A)).toBeCloseTo(9, 10);
    expect(A * 100).toBe(num(certa("essa-2012-aprovados").replace("%", "")));
    expect(9.8 * 0.5 + 7.8 * 0.5).toBeCloseTo(8.8, 10);
  });

  it("vestibular: quatro itens com fonte e URL (conferidos pelo plano e API)", () => {
    expect((7.3 + 15 * 0.06 - 2.02) / 3).toBeCloseTo(num(certa("enem-2020-basquete")), 10);
    expect(L.treino.vestibular).toHaveLength(4);
    for (const v of L.treino.vestibular) {
      expect(v.fala, v.id).toBeTruthy();
      expect(v.fonte.urls.length, v.id).toBeGreaterThan(0);
      expect(v.fonte.adaptada, v.id).toBe(true);
    }
  });
});
