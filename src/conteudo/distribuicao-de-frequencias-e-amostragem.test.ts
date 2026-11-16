// Frequências e Amostragem · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

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

  it("vestibular: gabaritos das 3 questões do ENEM conferidos por conta", () => {
    expect(L.treino.vestibular).toHaveLength(3);
    // ENEM 2018/145: (0·50 + 1·17 + 2·15 + 3·10 + 4·6 + 5·2) / 100 = 111/100
    const acid = [50, 17, 15, 10, 6, 2];
    expect(acid.reduce((s, n) => s + n, 0)).toBe(100);
    expect(acid.reduce((s, n, k) => s + k * n, 0) / 100).toBe(1.11);
    expect(certa("enem-2018-media-acidentes")).toBe("1,11");
    // ENEM 2021/151: acumulado do histograma até 700 = 35 < 52,5 e até 800 = 55 ≥ 52,5
    const precos = [5, 10, 5, 15, 20, 15, 15, 10, 5, 5];
    expect(precos.reduce((s, n) => s + n, 0)).toBe(105);
    const ate = (k: number) => precos.slice(0, k).reduce((s, n) => s + n, 0);
    expect(ate(4)).toBeLessThan(105 / 2);
    expect(ate(5)).toBeGreaterThanOrEqual(105 / 2);
    expect(certa("enem-2021-histograma-precos")).toBe("800");
    // ENEM 2023/140: viagens 1..7 com 10, 10, 55, 25, 0, 50, 10 motoristas
    const viag = [10, 10, 55, 25, 0, 50, 10];
    expect(viag.reduce((s, n) => s + n, 0)).toBe(160);
    const media = viag.reduce((s, n, k) => s + (k + 1) * n, 0) / 160;
    expect(media).toBeCloseTo(665 / 160, 12);
    const ordenado = viag.flatMap((n, k) => Array<number>(n).fill(k + 1));
    const mediana = (ordenado[79] + ordenado[80]) / 2;
    const moda = viag.indexOf(Math.max(...viag)) + 1;
    expect([moda, mediana]).toEqual([3, 4]);
    expect(moda < mediana && mediana < media).toBe(true);
    expect(certa("enem-2023-media-mediana-moda")).toBe("Moda < mediana < média");
  });
});
