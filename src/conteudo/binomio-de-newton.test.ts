// Binômio de Newton · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/binomio-de-newton/aula-01.json");
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
void [modeloArvore, modeloCasas, casasDe, arvoreDe, A, C, f, distribuicoes, distribuicoesCaixas, criterio];

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

  it("dois-fatores: n = 2 tem 4 caminhos e 2 deles (ab, ba) com um b", () => {
    const p = arvoreDe("dois-fatores");
    const m = modeloArvore(p, { n: 2 });
    expect(m.caminhos).toHaveLength(4);
    expect(m.caminhos.filter((c) => m.sucessos(c) === 1)).toHaveLength(2);
    expect(modeloArvore(p, { n: 1 }).caminhos).toHaveLength(2);
  });

  it("tres-fatores: 3 caminhos com exatamente um b (C(3, 1))", () => {
    const m = modeloArvore(arvoreDe("tres-fatores"), {});
    expect(m.caminhos.filter((c) => m.sucessos(c) === 1)).toHaveLength(C(3, 1));
  });

  it("triangulo-de-pascal: cada número é a soma dos dois acima, até a linha 5", () => {
    expect(params("triangulo-de-pascal").modo).toBe("pascal");
    for (let n = 1; n <= 5; n++) for (let k = 1; k < n; k++) expect(C(n, k)).toBe(C(n - 1, k - 1) + C(n - 1, k));
  });

  it("soma-dos-coeficientes: linha 4 soma 1 + 4 + 6 + 4 + 1 = 16 = 2⁴ e a chave existe", () => {
    const p = arvoreDe("soma-dos-coeficientes");
    expect(p.chave_um).toBe(true);
    const m = modeloArvore(p, {});
    expect(m.caminhos).toHaveLength(16);
    expect([0, 1, 2, 3, 4].map((k) => C(4, k)).reduce((a, b) => a + b, 0)).toBe(2 ** 4);
  });

  it("desafio-x-quadrado: (x + 1)⁴ tem 6 pontas com dois x", () => {
    const s = passo(L, "desafio-x-quadrado");
    if (s.type !== "micro_challenge") throw new Error();
    const p = GradeResultados.parse(s.figure.params) as GradeDe<"arvore">;
    const m = modeloArvore(p, {});
    expect(m.caminhos.filter((c) => m.sucessos(c) === 2)).toHaveLength(6);
    expect(s.options.find((o) => o.correct)!.label).toBe("6");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect([["a","a"],["a","b"],["b","a"],["b","b"]].filter((c) => c.includes("b") && c.includes("a"))).toHaveLength(2); // ab aparece 2 vezes
    expect(certa("quadrado-da-soma")).toBe("a² + 2ab + b²");
    expect([0, 1, 2, 3].map((k) => C(3, k))).toEqual([1, 3, 3, 1]);
    expect(certa("linha-3")).toBe("1, 3, 3, 1");
    eq(5 + 1, "numero-de-termos");
    eq(C(2, 1), "coef-ab");
  });

  it("médias", () => {
    eq(C(3, 2), "coef-x-cubo-1");
    eq(2 ** 5, "soma-linha-5");
    eq(C(5, 3), "coef-x3-x1-5");
  });

  it("desafios", () => {
    eq(C(3, 1) * 2 ** 2, "x-mais-2-cubo");
    eq(C(4, 1) * (-1) ** 1, "x-menos-1-quarta");
    eq(C(4, 2), "termo-independente");
    eq(C(6, 3), "centro-linha-6");
    eq(11 ** 3, "onze-ao-cubo");
  });

  it("vestibular", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
