// Frequências e Amostragem · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis, semVestibular } from "./util";

const L = carregar("aritmetica/estatistica/distribuicao-de-frequencias-e-amostragem/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const pct = (v: string) => Number(v.replace("%", "").replace(",", "."));

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("absoluta-relativa: 8, 6, 4, 2 de 20 viram 40%, 30%, 20%, 10% e somam 100%", () => {
    const f = [8, 6, 4, 2];
    const n = f.reduce((a, b) => a + b, 0);
    expect(n).toBe(20);
    expect(f.map((x) => (x / n) * 100)).toEqual([40, 30, 20, 10]);
  });

  it("amostragem: a população do passo 3 tem 30% azul e a do passo 4 soma 100% (real e viciada)", () => {
    const a = passo(L, "amostra-cresce");
    const v = passo(L, "amostra-viciada");
    if (a.type !== "interactive_canvas" || v.type !== "interactive_canvas") throw new Error();
    const pa = a.params as { populacao: { pct: number }[] };
    const pv = v.params as { populacao: { pct: number }[]; vicio: { populacao: number[] } };
    expect(pa.populacao.map((x) => x.pct)).toEqual([30, 70]);
    expect(pv.populacao.reduce((s, x) => s + x.pct, 0)).toBe(100);
    expect(pv.vicio.populacao.reduce((s, x) => s + x, 0)).toBe(100);
    expect(pv.vicio.populacao[0]).toBeGreaterThan(pv.populacao[0].pct); // o vício infla o futebol
  });

  it("desafio: 10 de 25 = 40% (e a figura soma 25)", () => {
    expect(10 / 25).toBe(0.4);
    expect(10 + 8 + 7).toBe(25);
    const s = passo(L, "desafio-relativa");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("40%");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    const r = ["azul", "verde", "azul", "azul", "vermelho"];
    const f = r.filter((x) => x === "azul").length;
    expect(f).toBe(Number(certa("contar-azul")));
    expect((f / r.length) * 100).toBe(pct(certa("relativa-3-de-5")));
    expect(certa("o-que-e-amostra")).toBe("A amostra");
    expect(certa("soma-relativas")).toBe("100%");
  });

  it("médias", () => {
    expect((18 / 40) * 100).toBeCloseTo(pct(certa("cachorro-45")), 10);
    expect(0.25 * 80).toBe(Number(certa("quantos-25")));
    expect(certa("melhor-amostra")).toBe("100 sorteados de todas as salas");
  });

  it("desafios", () => {
    expect(5 + 12).toBe(Number(certa("acumulada")));
    expect(5 + 12 + 8).toBe(25);
    expect((10 / (4 + 6 + 10)) * 100).toBe(pct(certa("ultima-classe")));
    expect(certa("pesquisa-online")).toBe("Superestimar o uso");
    expect(12 / 0.3).toBeCloseTo(Number(certa("total-pelo-percentual")), 10);
    expect([(6 / 20) * 100, (9 / 45) * 100]).toEqual([30, 20]);
    expect(certa("comparar-turmas")).toBe("Turma A");
  });

  it("vestibular: nenhuma questão sem fonte conferida", () => semVestibular(L));
});
