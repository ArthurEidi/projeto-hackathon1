// Princípio fundamental da contagem · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/principio-fundamental-da-contagem/aula-01.json");
const certa = (id: string) => certaDe(L, id);
const num = (s: string) => Number(s.replace("−", "-").replace(",", "."));
const prod = (v: number[]) => v.reduce((a, b) => a * b, 1);
const arr = (n: number, k: number) => prod(Array.from({ length: k }, (_, i) => n - i));
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error(id);
  return GradeResultados.parse(s.params);
};
const casasDe = (id: string) => params(id) as GradeDe<"casas">;

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
      } else expect(METRICAS, s.id).toContain(metric);
    }
  });

  it("uma-coluna: 3 camisetas e 1 bermuda dão 3 looks; com 2 bermudas, 6", () => {
    const p = casasDe("uma-coluna");
    const total = (c: number, b: number) => modeloCasas(p, { camisetas: c, bermudas: b }, {}).casas.length;
    expect(total(3, 1)).toBe(3);
    expect(total(3, 2)).toBe(6);
    expect(total(3, 3)).toBe(9);
  });

  it("terceira-etapa: 3 · 2 · 2 = 12 pontas", () => {
    expect(modeloArvore(params("terceira-etapa") as GradeDe<"arvore">, {}).caminhos).toHaveLength(12);
  });

  it("e-ou: 3 · 2 = 6 no 'e' e 3 + 2 = 5 no 'ou'", () => {
    const p = casasDe("e-ou");
    expect(modeloCasas(p, {}, { ou: false }).casas).toHaveLength(6);
    expect(modeloCasas(p, {}, { ou: true }).casas).toHaveLength(5);
  });

  it("sem-repetir: 3 · 3 = 9 repetindo e 3 · 2 = 6 sem repetir", () => {
    const p = casasDe("sem-repetir");
    const m = (repetir: boolean) => {
      const mod = modeloCasas(p, {}, { repetir });
      return mod.casas.filter((k) => mod.valida(k)).length;
    };
    expect(m(true)).toBe(9);
    expect(m(false)).toBe(6);
  });

  it("desafio-lanche: 3 · 4 · 2 = 24", () => {
    expect(prod([3, 4, 2])).toBe(24);
    const s = passo(L, "desafio-lanche");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.filter((o) => o.correct).map((o) => o.label)).toEqual(["24"]);
    expect([3 + 4 + 2, 3 * 4, 3 * 4 + 2].map(String)).toEqual(s.options.filter((o) => !o.correct).map((o) => o.label));
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(4 * 2).toBe(num(certa("looks-4-2")));
    expect(3 * 2).toBe(num(certa("pontas-da-arvore")));
    expect(3 + 2).toBe(num(certa("sobremesa-ou")));
    expect(7 * 1).toBe(7);
    expect(certa("etapa-de-um")).toBe("Não muda");
  });

  it("médias", () => {
    expect(10 ** 3).toBe(num(certa("senha-3-com-repeticao")));
    expect(arr(10, 3)).toBe(num(certa("senha-3-sem-repeticao")));
    expect(2 ** 3).toBe(num(certa("moeda-3-vezes")));
  });

  it("desafios", () => {
    expect(arr(5, 3)).toBe(num(certa("tres-algarismos-distintos")));
    expect(2 * 3).toBe(num(certa("pares-distintos")));
    expect(3 * 2 * (1 * 2)).toBe(num(certa("ida-e-volta")));
    expect(26 * 26 * 10).toBe(num(certa("placa-2-letras-1-digito")));
    expect(arr(3, 4)).toBe(num(certa("impossivel")));
  });

  it("vestibular", () => {
    expect(2 ** 4).toBe(num(certa("enem-2019-ppl-chaves")));
    expect(280 - 5 * 6 * 9).toBe(num(certa("enem-2025-respostas")));
    const versoes = 7 * 2 * 2 ** 3;
    const cores = [...Array(30).keys()].find((c) => versoes * c > 1000)!;
    expect(cores).toBe(num(certa("enem-2025-montadora")));
    let doisem = 0;
    for (let n = 100; n <= 399; n++) doisem += [...String(n)].filter((c) => c === "2").length;
    expect(doisem).toBe(num(certa("enem-2025-placas-do-2")));
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
