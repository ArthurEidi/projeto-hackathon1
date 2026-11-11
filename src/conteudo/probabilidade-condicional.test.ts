// Probabilidade condicional · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial, pertence } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/probabilidade-condicional/aula-01.json");
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

  const grade = (p: GradeDe<"casas">, pista: boolean) => {
    const m = modeloCasas(p, {}, { pista });
    const v = m.casas.filter((c) => m.valida(c) && !m.fora(c));
    return { n: v.length, a: v.filter(m.emA).length };
  };
  const tabela = (id: string) => {
    const p = params(id);
    if (p.modo !== "tabela") throw new Error(id);
    return p;
  };

  it("sem-pista: 1 casa de 6 (1/6)", () => {
    expect(grade(casasDe("sem-pista"), false)).toEqual({ n: 6, a: 1 });
  });

  it("pista-par: sem pista 1/6; com a pista a grade encolhe para 3 casas e o 6 vale 1/3", () => {
    const p = casasDe("pista-par");
    expect(grade(p, false)).toEqual({ n: 6, a: 1 });
    expect(grade(p, true)).toEqual({ n: 3, a: 1 });
  });

  it("tabela-linha e inverter-a-pista: 100 alunos; P(óculos | menina) = 15/60; P(menina | óculos) = 15/25", () => {
    for (const id of ["tabela-linha", "inverter-a-pista"]) {
      const t = tabela(id);
      const tot = t.linhas.flatMap((l) => l.valores).reduce((a, b) => a + b, 0);
      expect(tot).toBe(100);
      const menina = t.linhas[0].valores;
      expect(menina.reduce((a, b) => a + b, 0)).toBe(60);
      expect(menina[0] / 60).toBe(1 / 4);
      const oculos = t.linhas.map((l) => l.valores[0]);
      expect(oculos.reduce((a, b) => a + b, 0)).toBe(25);
      expect(menina[0] / 25).toBeCloseTo(3 / 5, 12);
    }
  });

  it("desafio-soma-8: 5 casas de soma 8 e uma começa com 3 (1/5)", () => {
    const s = passo(L, "desafio-soma-8");
    if (s.type !== "micro_challenge") throw new Error();
    const p = GradeResultados.parse(s.figure.params) as GradeDe<"casas">;
    expect(grade(p, true)).toEqual({ n: 5, a: 1 });
    expect(grade(p, false)).toEqual({ n: 36, a: 6 });
    expect(s.options.find((o) => o.correct)!.label).toBe("1/5");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(1 / [4, 5, 6].length, "seis-dado-maior-3");
    expect("P(A | B)".split("|")[1].trim().replace(")", "")).toBe("B"); // a pista vem depois da barra
    expect(certa("quem-ja-aconteceu")).toBe("B");
    eq(1 / 4, "urna-vermelha-1");
    const m = modeloCasas({ ...casasDe("pista-par"), b: { casas: ["1", "2", "3", "4", "5", "6"], linhas: [], colunas: [], soma: [], diagonal: false } }, {}, { pista: true });
    const v = m.casas.filter((c) => m.valida(c) && !m.fora(c));
    expect(v).toHaveLength(6); // B = Ω: a grade não encolhe
    expect(v.filter(m.emA).length / v.length).toBeCloseTo(1 / 6, 12);
    expect(certa("pista-inutil")).toBe("Não");
  });

  it("médias", () => {
    eq(1 / 3, "pelo-menos-uma-cara-duas");
    eq(12 / 15, "gosta-dado-menina");
    eq(0.12 / 0.4, "formula-condicional");
  });

  it("desafios", () => {
    eq([[1, 6], [6, 1]].length / 6, "soma-7-tem-6");
    eq(12 / 18, "menina-dado-gosta");
    eq(2 / 4, "sem-reposicao");
    eq(0.5 * 0.6, "achar-intersecao");
    eq(9 / (9 + 9), "teste-positivo");
  });

  it("vestibular", () => {
    eq((1200 - 300 - 600) / (1200 - 600), "enem-2013-idiomas");
    eq((0.2 * 0.25) / (0.2 * 0.25 + 0.8 * 0.0625), "enem-2025-declaracoes");
    eq(Math.round(((0.3 * 0.03) / (0.25 * 0.02 + 0.3 * 0.03 + 0.45 * 0.04)) * 1000) / 10, "enem-2021-ppl-maquinas");
    eq(0.3 * 0.5 + 0.7 * 0.25, "enem-2017-atraso");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
