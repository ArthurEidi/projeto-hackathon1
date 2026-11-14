// Arranjos e combinações · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, fatorial } from "../widgets/common/grade/calc";
import { modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/arranjos-e-combinacoes/aula-01.json");
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
void [modeloArvore, modeloCasas, casasDe, arvoreDe, A, C, f];

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
      } else expect(METRICAS, s.id).toContain(metric);
    }
  });

  it("presidente-e-vice: k = 1 dá 4; k = 2 sem repetir dá 4 · 3 = 12", () => {
    const p = casasDe("presidente-e-vice");
    const n = (k: number) => {
      const m = modeloCasas(p, { k }, {});
      return m.casas.filter((c) => m.valida(c)).length;
    };
    expect([n(1), n(2)]).toEqual([4, 12]);
    expect(A(4, 2)).toBe(12);
  });

  it("ordem-some: 12 pares ordenados, 12 / 2! = 6 duplas", () => {
    const p = casasDe("ordem-some");
    const m = modeloCasas(p, {}, { ordem: true });
    expect(m.casas.filter((c) => m.valida(c))).toHaveLength(12);
    expect(A(4, 2) / f(2)).toBe(C(4, 2));
    expect(C(4, 2)).toBe(6);
  });

  it("trios: A(4, 3) = 24 e cada trio aparece 3! = 6 vezes: 4 trios", () => {
    const p = params("trios");
    expect(p.modo).toBe("lista");
    expect([A(4, 3), f(3), A(4, 3) / f(3), C(4, 3)]).toEqual([24, 6, 4, 4]);
  });

  it("simetria: C(4, k) = 1, 4, 6, 4, 1 e C(n, k) = C(n, n − k)", () => {
    expect([0, 1, 2, 3, 4].map((k) => C(4, k))).toEqual([1, 4, 6, 4, 1]);
    for (let k = 0; k <= 4; k++) expect(C(4, k)).toBe(C(4, 4 - k));
  });

  it("desafio-duplas: C(5, 2) = 10", () => {
    const s = passo(L, "desafio-duplas");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(String(C(5, 2)));
    expect([A(5, 2), 5 * 5, 5].map(String)).toEqual(s.options.filter((o) => !o.correct).map((o) => o.label));
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(A(5, 2), "presidente-vice-5");
    eq((4 * 3) / 2, "duplas-de-4");
    expect(A(3, 3) / f(3)).toBe(1); // as 3! ordens de uma taça são a mesma taça
    expect(certa("ordem-no-sorvete")).toBe("Não, é combinação");
    eq(C(5, 1), "c-5-1");
  });

  it("médias", () => {
    eq((6 * 5) / 2, "c-6-2");
    eq(A(6, 3), "podio-6");
    eq((5 * 4 * 3) / f(3), "c-5-3");
  });

  it("desafios", () => {
    eq(C(6, 2), "apertos-de-mao");
    eq(C(10, 2) /* = C(10, 8) */, "c-10-8");
    eq(C(5, 3) - C(3, 3), "pelo-menos-uma");
    eq(C(5, 2) - 5, "diagonais-pentagono");
    eq(C(7, 1) /* = C(7, 6) */, "aposta-7-de-6");
  });

  it("vestibular", () => {
    eq(C(8, 4), "ueg-2005-provas");
    eq(6 * 5 * (C(4, 2) / 2), "enem-2019-duplas");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
