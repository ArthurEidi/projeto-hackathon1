// Eventos independentes · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial, pertence } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/eventos-independentes/aula-01.json");
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
    return { n: v.length, a: v.filter(m.emA).length, b: v.filter(m.emB).length, ab: v.filter((c) => m.emA(c) && m.emB(c)).length };
  };

  it("pista-que-nao-muda: P(A) = 18/36 e P(A | B) = 6/12, os dois 1/2", () => {
    const p = casasDe("pista-que-nao-muda");
    const s = grade(p, false);
    const c = grade(p, true);
    expect([s.n, s.a, c.n, c.a]).toEqual([36, 18, 12, 6]);
    expect(c.a / c.n).toBe(s.a / s.n);
  });

  it("retangulo: A e B ocupam 3 × 2 = 6 casas, 6/36 = 1/2 · 1/3", () => {
    const s = grade(casasDe("retangulo"), false);
    expect(s.ab).toBe(6);
    expect(s.ab / s.n).toBeCloseTo((s.a / s.n) * (s.b / s.n), 12);
    expect([s.a / s.n, s.b / s.n]).toEqual([1 / 2, 1 / 3]);
  });

  it("dependentes: P(A) = 1/2 vira P(A | B) = 2/3, e o produto 1/2 · 1/2 falha", () => {
    const p = casasDe("dependentes");
    const s = grade(p, false);
    const c = grade(p, true);
    expect([s.a / s.n, c.a / c.n]).toEqual([1 / 2, 2 / 3]);
    expect(s.ab / s.n).not.toBeCloseTo((s.a / s.n) * (s.b / s.n), 6);
  });

  it("moeda-sem-memoria: n lançamentos têm 2ⁿ pontas e uma só de caras, chance (1/2)ⁿ", () => {
    const p = arvoreDe("moeda-sem-memoria");
    for (const n of [1, 2, 3, 4]) {
      const m = modeloArvore(p, { n });
      expect(m.caminhos).toHaveLength(2 ** n);
      const caras = m.caminhos.filter((c) => m.sucessos(c) === n);
      expect(caras).toHaveLength(1);
      expect(m.prob(caras[0])).toBeCloseTo(0.5 ** n, 12);
    }
  });

  it("desafio-dado-e-moeda: grade 2 × 6 e a interseção cara e 6 é 1 casa (1/12)", () => {
    const s = passo(L, "desafio-dado-e-moeda");
    if (s.type !== "micro_challenge") throw new Error();
    const r = grade(GradeResultados.parse(s.figure.params) as GradeDe<"casas">, false);
    expect(r).toEqual({ n: 12, a: 6, b: 2, ab: 1 });
    expect(s.options.find((o) => o.correct)!.label).toBe("1/12");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(1 / 2 * (1 / 2), "duas-caras");
    eq(1 / 2 * (1 / 2), "par-e-coroa");
    eq(1 / 2, "sem-memoria");
    expect(1 / 4).not.toBeCloseTo(2 / 5, 6); // P(2ª | 1ª) muda quando a 1ª não volta: 1/4 contra 2/5
    expect(certa("sem-reposicao-depende")).toBe("Não");
  });

  it("médias", () => {
    eq(0.3 * 0.5, "produto-03-05");
    eq((1 / 6) ** 3, "tres-seis");
    expect(0.4 * 0.5).toBeCloseTo(0.2, 12); // P(A) · P(B) = P(A e B)
    expect(certa("sao-independentes")).toBe("Sim");
  });

  it("desafios", () => {
    eq(0.5 + 0.4 - 0.5 * 0.4, "uniao-independentes");
    eq(1 - (5 / 6) ** 3, "pelo-menos-um-6-tres");
    eq((2 / 5) * (2 / 5), "com-reposicao");
    eq((2 / 5) * (1 / 4), "sem-reposicao");
    eq(0.4 / 0.5, "condicional-dependentes");
  });

  it("vestibular", () => {
    eq(80 - 16, "enem-2023-urnas");
    eq(4, "enem-2021-dardos");
    eq(7 - 1, "enem-2019-placas");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
