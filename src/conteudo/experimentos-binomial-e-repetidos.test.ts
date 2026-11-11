// Experimentos binomial e repetidos · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial, pertence } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/experimentos-binomial-e-repetidos/aula-01.json");
const certa = (id: string) => certaDe(L, id);
/** Valor numérico de um rótulo: "1/2", "28,1%", "−3", "0,325". */
const val = (s: string) => {
  const t = s.replace("−", "-").replace("%", "").replace(",", ".").trim();
  const [a, b] = t.split("/");
  return b === undefined ? Number(a) : Number(a) / Number(b);
};
const eq = (conta: number, id: string) => expect(conta).toBeCloseTo(val(certa(id)), 9);
const f = fatorial;
const bin = (n: number, k: number, p: number) => comb(n, k) * p ** k * (1 - p) ** (n - k);
const A = arranjo;
const C = comb;
const params = (id: string) => {
  const s = passo(L, id);
  if (s.type !== "interactive_canvas") throw new Error(id);
  return GradeResultados.parse(s.params);
};
const casasDe = (id: string) => params(id) as GradeDe<"casas">;
const arvoreDe = (id: string) => params(id) as GradeDe<"arvore">;
void [bin, modeloArvore, modeloCasas, casasDe, arvoreDe, A, C, f, distribuicoes, distribuicoesCaixas, criterio, pertence];

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

  it("um-ensaio: n = 3 agrupa as 8 pontas em 1, 3, 3, 1 por número de caras", () => {
    const p = arvoreDe("um-ensaio");
    const m = modeloArvore(p, { n: 3 });
    expect(m.caminhos).toHaveLength(8);
    expect([0, 1, 2, 3].map((k) => m.caminhos.filter((c) => m.sucessos(c) === k).length)).toEqual([1, 3, 3, 1]);
    expect(modeloArvore(p, { n: 1 }).caminhos).toHaveLength(2);
  });

  it("cada-caminho: cada caminho vale 1/8 e os 3 com duas caras somam 3/8", () => {
    const m = modeloArvore(arvoreDe("cada-caminho"), {});
    const dois = m.caminhos.filter((c) => m.sucessos(c) === 2);
    expect(dois).toHaveLength(3);
    for (const c of dois) expect(m.prob(c)).toBeCloseTo(1 / 8, 12);
    expect(dois.reduce((s, c) => s + m.prob(c)!, 0)).toBeCloseTo(3 / 8, 12);
  });

  it("dado-sucesso-6: 3 caminhos com um 6, cada um 25/216, total 75/216", () => {
    const m = modeloArvore(arvoreDe("dado-sucesso-6"), {});
    const um = m.caminhos.filter((c) => m.sucessos(c) === 1);
    expect(um).toHaveLength(3);
    for (const c of um) expect(m.prob(c)).toBeCloseTo(25 / 216, 12);
    expect(um.reduce((s, c) => s + m.prob(c)!, 0)).toBeCloseTo(75 / 216, 12);
  });

  it("p-desliza: n = 4; em 50% as barras são simétricas e em 90% o maior é k = 4", () => {
    const p = params("p-desliza");
    expect(p.modo).toBe("barras");
    const b = (q: number) => [0, 1, 2, 3, 4].map((k) => bin(4, k, q));
    const meio = b(0.5);
    expect(meio[0]).toBeCloseTo(meio[4], 12);
    expect(meio[1]).toBeCloseTo(meio[3], 12);
    const alto = b(0.9);
    expect(alto.indexOf(Math.max(...alto))).toBe(4);
    expect(alto.reduce((s, v) => s + v, 0)).toBeCloseTo(1, 12);
  });

  it("desafio-quatro-moedas: C(4, 2) = 6 caminhos de 1/16 = 3/8", () => {
    const s = passo(L, "desafio-quatro-moedas");
    if (s.type !== "micro_challenge") throw new Error();
    expect(C(4, 2) / 2 ** 4).toBe(3 / 8);
    expect(s.options.find((o) => o.correct)!.label).toBe("3/8");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(bin(2, 1, 1 / 2), "duas-moedas-uma-cara");
    eq(C(3, 2), "caminhos-k2-n3");
    eq(1 - 0.3, "fracasso");
    eq((1 / 2) ** 3, "valor-de-um-caminho");
  });

  it("médias", () => {
    eq(bin(3, 1, 1 / 2), "tres-moedas-uma-cara");
    eq(bin(4, 4, 1 / 2), "quatro-caras");
    eq(bin(2, 1, 1 / 6), "um-seis-em-dois");
  });

  it("desafios", () => {
    eq(bin(5, 2, 1 / 2), "cinco-moedas-duas");
    eq(bin(3, 2, 1 / 2) + bin(3, 3, 1 / 2), "chute-vf");
    eq(bin(3, 0, 0.2), "nenhum-sucesso");
    eq(bin(4, 2, 1 / 6), "dois-seis-em-quatro");
    const ps = [0, 1, 2, 3, 4].map((k) => bin(4, k, 1 / 2));
    expect(ps.indexOf(Math.max(...ps))).toBe(2);
    expect(certa("k-mais-provavel")).toBe("2");
  });

  it("vestibular", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
