// Fatorial e permutações · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, fatorial } from "../widgets/common/grade/calc";
import { modeloArvore, modeloCasas } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/fatorial-e-permutacoes/aula-01.json");
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

  it("tres-amigos: 3 fichas e 3 lugares dão 3! = 6 filas", () => {
    const p = params("tres-amigos");
    expect(p.modo).toBe("fila");
    if (p.modo === "fila") expect(f(p.itens.length)).toBe(6);
  });

  it("escada: n = 1 dá 1 e n = 4 dá 4! = 24", () => {
    expect(params("escada").modo).toBe("escada");
    expect([f(1), f(4), f(5), f(6)]).toEqual([1, 24, 120, 720]);
  });

  it("letras-iguais: OVO tem 3!/2! = 3 anagramas", () => {
    const p = params("letras-iguais");
    if (p.modo !== "fila") throw new Error();
    expect(p.itens.filter((x) => x === "O")).toHaveLength(2);
    expect(f(3) / f(2)).toBe(3);
  });

  it("letra-presa: AMOR com A na 1ª casa dá 3! = 6", () => {
    const p = params("letra-presa");
    if (p.modo !== "fila") throw new Error();
    expect(p.itens[p.prender!.item]).toBe("A");
    expect(f(p.itens.length - 1)).toBe(6);
  });

  it("desafio-prateleira: 5! = 120", () => {
    const s = passo(L, "desafio-prateleira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe(String(f(5)));
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(f(3), "tres-fatorial");
    eq(4, "primeiro-lugar");
    eq(f(4), "quatro-fatorial");
    eq(f(3), "anagramas-sol");
  });

  it("médias", () => {
    eq(f(5) / f(3), "razao-fatoriais");
    eq(f(3), "bola-com-b");
    eq(f(3) / f(2), "anagramas-ana");
  });

  it("desafios", () => {
    eq(f(6) / (f(3) * f(2)), "banana");
    eq(f(4) * f(2), "juntas-na-fila");
    eq(f(1) / 1 /* 1! = 1 · 0! ⇒ 0! = 1 */, "zero-fatorial");
    eq((10 * f(9)) / f(9), "dez-sobre-nove");
    eq(f(2) * f(2), "amor-pontas");
  });

  it("vestibular", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
