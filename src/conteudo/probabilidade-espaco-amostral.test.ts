// Probabilidade: espaço amostral · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { describe, expect, it } from "vitest";
import { arranjo, comb, distribuicoes, fatorial, pertence } from "../widgets/common/grade/calc";
import { criterio, distribuicoesCaixas, modeloArvore, modeloCasas, totalUrna } from "../widgets/common/grade/desenho";
import { GradeResultados, type GradeDe } from "../widgets/common/grade/params";
import { carregar, certaDe, fechamentoOk, passo } from "./util";

const L = carregar("aritmetica/contagem-probabilidade/probabilidade-espaco-amostral/aula-01.json");
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

  const evento = (id: string, ctl = {}) => {
    const p = casasDe(id);
    const m = modeloCasas(p, ctl, {});
    const todas = m.casas.filter((c) => m.valida(c));
    const ev = criterio(p.evento!, ctl);
    return { n: todas.length, a: todas.filter((c) => pertence(c, ev)).length };
  };

  it("um-dado: 3 faces pares de 6 = 1/2", () => {
    expect(evento("um-dado")).toEqual({ n: 6, a: 3 });
  });

  it("certo-e-impossivel: 'de 1 a 6' ocupa 6 de 6 e 'sair 7' ocupa 0 de 6", () => {
    const p = casasDe("certo-e-impossivel");
    const m = modeloCasas(p, {}, {});
    const total = m.casas.length;
    const [certo, impossivel] = p.botoes_evento.map((b) => m.casas.filter((c) => pertence(c, criterio(b.conjunto, {}))).length);
    expect([total, certo, impossivel]).toEqual([6, 6, 0]);
  });

  it("dois-dados: 36 casas e a soma 7 ocupa 6 (1/6); a soma 2 ocupa 1 (1/36)", () => {
    const { n, a } = evento("dois-dados");
    expect([n, a]).toEqual([36, 6]);
    expect(6 / 36).toBeCloseTo(1 / 6, 12);
    const p = casasDe("dois-dados");
    const m = modeloCasas(p, {}, {});
    expect(m.casas.filter((c) => pertence(c, criterio({ ...p.evento!, soma: [2] }, {})))).toHaveLength(1);
  });

  it("duas-moedas: 4 casas, 2 favoráveis (KC e CK) = 1/2, não 1/3", () => {
    expect(evento("duas-moedas")).toEqual({ n: 4, a: 2 });
  });

  it("desafio-urna: 2 vermelhas em 5 bolas = 2/5", () => {
    const s = passo(L, "desafio-urna");
    if (s.type !== "micro_challenge") throw new Error();
    const p = GradeResultados.parse(s.figure.params) as GradeDe<"urna">;
    expect(p.modo).toBe("urna");
    expect(p.destaque).toBeUndefined();
    expect(totalUrna(p, {})).toEqual({ inicial: 5, retiradas: 0, restante: 5 });
    expect(p.bolas.map((b) => b.quantidade)).toEqual([3, 2]);
    expect(s.options.find((o) => o.correct)!.label).toBe("2/5");
  });

  it("fechamento: cada letra tem significado no glossário", () => fechamentoOk(L));
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    eq(1 / 6, "face-5");
    eq(1 / 2, "cara");
    eq(0 / 6, "impossivel");
    eq(2 * 6, "moeda-e-dado");
  });

  it("médias", () => {
    eq(6 / 36, "soma-7");
    eq(3 / 4, "urna-branca");
    eq(Math.floor(20 / 3) / 20 /* {3, 6, 9, 12, 15, 18} */, "multiplo-de-3");
  });

  it("desafios", () => {
    eq(3 / 4, "pelo-menos-uma-cara");
    eq([4, 5, 6].filter((a) => 10 - a >= 1 && 10 - a <= 6).length / 36, "soma-10");
    eq([..."BANANA"].filter((c) => c === "A").length / 6, "letra-banana");
    eq(6 / 36, "dados-iguais");
    eq(C(3, 2) / 2 ** 3, "tres-moedas-duas-caras");
  });

  it("vestibular", () => {
    const paresDados = (s: number) =>
      [1, 2, 3, 4, 5, 6].filter((a) => s - a >= 1 && s - a <= 6).length;
    expect([paresDados(7), paresDados(8), paresDados(4)]).toEqual([6, 5, 3]);
    expect(certa("enem-2012-dados")).toMatch(/^José, já que há 6 possibilidades/);
    const paresBolas = (s: number) => {
      let c = 0;
      for (let a = 1; a <= 15; a++) for (let b = a + 1; b <= 15; b++) if (a + b === s) c++;
      return c;
    };
    expect([paresBolas(17), paresBolas(12), paresBolas(22)]).toEqual([7, 5, 4]);
    expect(certa("enem-2011-bolas")).toMatch(/^Bernardo, pois há 7 possibilidades.*5 possibilidades para a escolha de Arthur/);
    eq(40, "enem-2018-cartoes");
    for (const q of L.treino.vestibular) expect(q.fonte.urls.length).toBeGreaterThan(0);
  });
});
