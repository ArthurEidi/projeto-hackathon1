// Leitura de Tabelas e Gráficos · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { carregar, certaDe, fechamentoOk, passo, passosConcluiveis } from "./util";

const L = carregar("aritmetica/estatistica/leitura-de-tabelas-e-graficos/aula-01.json");
const certa = (id: string) => certaDe(L, id);

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => passosConcluiveis(L));

  it("tabela-vira-barras: terça (40) é 4 vezes quinta (10)", () => expect(40 / 10).toBe(4));

  it("eixo-truncado: com o eixo em 45, B (55) parece o dobro de A (50); na verdade é 10% a mais", () => {
    expect((55 - 45) / (50 - 45)).toBe(2);
    expect((55 - 50) / 50).toBeCloseTo(0.1, 12);
    const s = passo(L, "eixo-truncado");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.gte).toBe(45);
  });

  it("linha-no-tempo: o degrau mais íngreme é de 20 para 25", () => {
    const t = [18, 20, 25, 26, 22];
    const d = t.slice(1).map((v, i) => v - t[i]);
    expect(d.indexOf(Math.max(...d))).toBe(1);
  });

  it("setores: 25% = 90° e as partes somam 100%", () => {
    expect(0.25 * 360).toBe(90);
    expect([25, 25, 40, 10].reduce((a, b) => a + b, 0)).toBe(100);
  });

  it("desafio: março (+10) é o maior degrau", () => {
    const m = [10, 15, 25, 28];
    expect(m.slice(1).map((v, i) => v - m[i])).toEqual([5, 10, 3]);
    const s = passo(L, "desafio-maior-crescimento");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("Março");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(Math.max(12, 18, 6)).toBe(18);
    expect(certa("maior-da-tabela")).toBe("Banana");
    expect(0.5 * 360).toBe(Number(certa("metade-do-circulo").replace("°", "")));
    expect(40 / 20).toBe(Number(certa("barra-dobro")));
    expect(certa("tipo-para-tempo")).toBe("Linha");
  });

  it("médias", () => {
    expect((55 - 50) / 50 * 100).toBeCloseTo(Number(certa("quanto-a-mais").replace("%", "")), 10);
    expect((72 / 360) * 100).toBeCloseTo(Number(certa("setor-72").replace("%", "")), 10);
    expect(90 - 120).toBe(Number(certa("variacao-linha").replace("−", "-")));
  });

  it("desafios", () => {
    expect(0.3 * 200).toBeCloseTo(Number(certa("trinta-por-cento")), 10);
    expect(((25 - 20) / 20) * 100).toBe(Number(certa("aumento-percentual").replace("%", "")));
    expect(0.6 * 360).toBeCloseTo(Number(certa("dois-setores").replace("°", "")), 10);
    expect(0.45 * 360).toBeCloseTo(162, 10);
    expect(0.4 * 360).toBeCloseTo(144, 10);
    // A: (20 − 10)/10 = 100%; B: (120 − 100)/100 = 20%
    expect([(20 - 10) / 10, (120 - 100) / 100]).toEqual([1, 0.2]);
    expect(certa("qual-cresceu-mais")).toBe("A");
    expect((40 + 60) / 2).toBe(Number(certa("ponto-do-meio")));
  });

  it("vestibular: UFRGS 2022 Q59 (gabarito oficial A)", () => {
    const media = (240 + 180 + 180 + 240 + 120) / 5;
    expect(media).toBe(192);
    expect(media).toBeGreaterThan(3 * 60);
    expect(certa("ufrgs-2022-tempo-medio")).toBe("superior a três horas");
  });
});
