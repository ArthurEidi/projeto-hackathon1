// Probabilidade: união e interseção · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial, pertence } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/probabilidade-uniao-e-intersecao/aula-01.json");
const certa = (id: string) => certaDe(L, id);
/** Valor numérico de um rótulo: "1/2", "28,1%", "−3", "0,325". */
const val = (s: string) => {
  const t = s.replace("−", "-").replace("%", "").replace(",", ".").trim();
  const [a, b] = t.split("/");
  return b === undefined ? Number(a) : Number(a) / Number(b);
};
const eq = (conta: number, id: string) => expect(conta).toBeCloseTo(val(certa(id)), 9);
const f = fatorial;
const A = arranjo;
const C = comb;
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error(id);
  return GradeResultados.parse(s.params);
};
const casasDe = (id: string) => params(id) as GradeDe<"casas">;
const arvoreDe = (id: string) => params(id) as GradeDe<"arvore">;
void [modeloArvore, modeloCasas, casasDe, arvoreDe, A, C, f, distribuicoes, distribuicoesCaixas, criterio, pertence];

/** Métricas que o grade_resultados emite (GUIA §5.4). */
const METRICAS = ["total", "celulas_tocadas", "marcadas_certas", "marcadas_erradas", "modo_ou", "repetir_desligado", "ordem_desligada", "uniu", "descontou", "complemento_visto", "pista_ligada", "intersecao_vista", "extremos_vistos", "eventos_vistos", "pontas_tocadas", "chave_ligada", "filas_montadas", "iguais_ligado", "letra_presa", "numeros_tocados", "distribuicoes_vistas", "regra_ligada", "linha_tocada", "coluna_tocada"];

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const sl = s.controls.find((c) => c.id === metric);
      if (sl) {
        if (gte !== undefined) expect(sl.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(sl.min, s.id).toBeLessThanOrEqual(lte);
        expect(sl.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
        const alvo = (gte ?? lte)!;
        expect(((alvo - sl.min) / sl.step) % 1, `${s.id}: alvo fora do passo do slider`).toBeCloseTo(0, 9);
      } else expect(METRICAS.includes(metric) || /^(pontas_k\d+|linha_.+|coluna_.+)$/.test(metric), s.id).toBe(true);
    }
  });

  const conta = (id: string, ctl = {}, e = {}) => {
    const p = casasDe(id);
    const m = modeloCasas(p, ctl, e);
    const todas = m.casas.filter((c) => m.valida(c));
    return { n: todas.length, a: todas.filter(m.emA).length, b: todas.filter(m.emB).length, ab: todas.filter((c) => m.emA(c) && m.emB(c)).length, ou: todas.filter((c) => m.emA(c) || m.emB(c)).length };
  };

  it("disjuntos: A = {1, 2}, B = {5, 6} sem casas comuns; união 4/6 = 2/6 + 2/6", () => {
    expect(conta("disjuntos")).toEqual({ n: 6, a: 2, b: 2, ab: 0, ou: 4 });
  });

  it("contada-duas-vezes: A par, B > 3; 3 + 3 − 2 = 4 casas acesas", () => {
    const r = conta("contada-duas-vezes");
    expect(r).toEqual({ n: 6, a: 3, b: 3, ab: 2, ou: 4 });
    expect(r.a + r.b - r.ab).toBe(r.ou);
  });

  it("pelo-menos-um-seis: o complemento (sem nenhum 6) é 5 · 5 = 25 de 36", () => {
    const r = conta("pelo-menos-um-seis");
    expect([r.n, r.a, r.n - r.a]).toEqual([36, 11, 25]);
  });

  it("sobreposicao-cresce: a união vai de 8/10 (B em 7) a 4/10 (B em 1)", () => {
    const u = (inicio_b: number) => conta("sobreposicao-cresce", { inicio_b }).ou;
    expect([u(7), u(5), u(3), u(1)]).toEqual([8, 8, 6, 4]);
    expect(conta("sobreposicao-cresce", { inicio_b: 7 }).n).toBe(10);
  });

  it("desafio-2-ou-5: 10 + 4 − 2 = 12 de 20 = 3/5", () => {
    const s = passo(L, "desafio-2-ou-5");
    if (s.type !== "micro_challenge") throw new Error();
    const p = GradeResultados.parse(s.figure.params) as GradeDe<"casas">;
    const m = modeloCasas(p, {}, {});
    const todas = m.casas;
    expect([todas.length, todas.filter(m.emA).length, todas.filter(m.emB).length, todas.filter((c) => m.emA(c) && m.emB(c)).length, todas.filter((c) => m.emA(c) || m.emB(c)).length]).toEqual([20, 10, 4, 2, 12]);
    expect(s.options.find((o) => o.correct)!.label).toBe("3/5");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(2 / 6, "um-ou-seis");
    eq(1 - 0.3, "nao-chover");
    expect([2, 4, 6].filter((x) => [5, 6].includes(x))).toEqual([6]);
    expect(certa("intersecao-dado")).toBe("{6}");
    eq(0, "mesmo-lancamento");
  });

  it("médias", () => {
    eq([1, 2, 3, 4, 5, 6].filter((x) => x % 2 === 0 || x % 3 === 0).length / 6, "par-ou-mult-3");
    eq(0.5 + 0.4 - 0.2, "formula-uniao");
    eq(1 - 1 / 2 ** 3, "tres-moedas-uma-cara");
  });

  it("desafios", () => {
    eq([...Array(30).keys()].filter((i) => (i + 1) % 2 === 0 || (i + 1) % 3 === 0).length / 30, "mult-2-ou-3-ate-30");
    eq(1 - 25 / 36, "pelo-menos-um-6");
    eq(0.5 + 0.6 - 0.8, "achar-intersecao");
    eq((20 - (12 + 10 - 5)) / 20, "nenhum-esporte");
    eq(0.7 + 0.6 - 1, "minima-intersecao");
  });

  it("vestibular", () => {
    eq([...Array(103).keys()].filter((i) => (i + 1) % 4 === 0 || (i + 1) % 10 === 4).length, "enem-2020-digital-gol");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
