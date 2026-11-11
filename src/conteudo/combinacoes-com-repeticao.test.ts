// Combinações com repetição · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/combinacoes-com-repeticao/aula-01.json");
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
      } else expect(METRICAS, s.id).toContain(metric);
    }
  });

  it("uma-caixa: 3 balas em 1 criança = 1 jeito; em 2 crianças = 4 (3-0, 2-1, 1-2, 0-3)", () => {
    const p = params("uma-caixa") as GradeDe<"caixas">;
    expect([1, 2].map((n) => distribuicoesCaixas(p, { n }, false).length)).toEqual([1, 4]);
  });

  it("bolinhas-e-barras: 3 bolinhas e 1 barra têm 4 posições para a barra", () => {
    const p = params("bolinhas-e-barras") as GradeDe<"bolinhas_e_barras">;
    expect(C(p.bolinhas + p.barras, p.barras)).toBe(4);
  });

  it("tres-caixas: 3 bolinhas e 2 barras = C(5, 2) = 10 fileiras (o contador aparece após 6)", () => {
    const p = params("tres-caixas") as GradeDe<"bolinhas_e_barras">;
    expect(C(p.bolinhas + p.barras, p.barras)).toBe(10);
    expect(distribuicoes(3, 3)).toHaveLength(10);
    expect(p.contador_apos).toBeLessThanOrEqual(10);
  });

  it("pelo-menos-uma: 5 balas em 3 caixas com mínimo 1 dá C(4, 2) = 6", () => {
    const p = params("pelo-menos-uma") as GradeDe<"caixas">;
    expect(distribuicoesCaixas(p, {}, true)).toHaveLength(6);
    expect(distribuicoesCaixas(p, {}, false)).toHaveLength(21);
    expect(distribuicoes(2, 3, 0)).toHaveLength(6);
  });

  it("desafio-equacao: x + y + z = 4 em naturais tem C(6, 2) = 15 soluções", () => {
    let n = 0;
    for (let x = 0; x <= 4; x++) for (let y = 0; y <= 4 - x; y++) n++;
    expect(n).toBe(15);
    const s = passo(L, "desafio-equacao");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("15");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(distribuicoes(2, 2).length, "duas-bolas-duas-caixas");
    eq(2, "ler-fileira");
    eq(4 - 1, "barras-para-4");
    expect(distribuicoes(2, 2)).toContainEqual([2, 0]); // 2 e 0 difere de 0 e 2: as caixas são distintas
    expect(distribuicoes(2, 2)).toContainEqual([0, 2]);
    expect(certa("caixas-diferentes")).toBe("Sim");
  });

  it("médias", () => {
    eq(C(5, 1), "quatro-balas-duas");
    eq(C(3 + 3 - 1, 3), "tres-bolas-sabores");
    eq([...Array(7).keys()].length, "x-mais-y-6");
  });

  it("desafios", () => {
    eq(C(7, 2), "xyz-5");
    eq(C(5, 2), "seis-balas-pelo-menos-uma");
    eq([1, 2, 3, 4].filter((x) => 5 - x >= 1).length, "positivos-x-y-5");
    eq(C(4 + 3 - 1, 2), "pasteis");
    eq(C(2, 0), "zero-balas");
  });

  it("vestibular", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
