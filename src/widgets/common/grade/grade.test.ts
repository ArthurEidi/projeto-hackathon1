import { describe, expect, it } from "vitest";
import {
  arranjo,
  arranjosPorGrupo,
  binomial,
  caixasDaSequencia,
  comb,
  distribuicoes,
  fatorial,
  fracao,
  gerarCasas,
  linhaPascal,
  moverBarra,
  permutacoes,
  pertence,
  sequenciaInicial,
  slug,
  subconjuntos,
} from "./calc";
import { criterio, degraus, desenharGrade, distribuicoesCaixas, fracaoDe, modeloArvore, modeloCasas, ordensFila, textoOrdem, valoresBarras } from "./desenho";
import { GradeFigura, GradeResultados, type GradeDe } from "./params";

const casas = (o: object) => GradeResultados.parse({ modo: "casas", ...o }) as GradeDe<"casas">;

describe("contagem", () => {
  it("fatorial, arranjo, combinação e Pascal", () => {
    expect([fatorial(0), fatorial(4)]).toEqual([1, 24]);
    expect(arranjo(4, 2)).toBe(12);
    expect(arranjo(4, 3)).toBe(24);
    expect(comb(4, 2)).toBe(6);
    expect(comb(5, 2)).toBe(10);
    expect(linhaPascal(4)).toEqual([1, 4, 6, 4, 1]);
    // Simetria C(n, k) = C(n, n − k).
    for (let k = 0; k <= 6; k++) expect(comb(6, k)).toBe(comb(6, 6 - k));
  });
  it("permutações e arranjos por grupo: cada grupo de 3 tem 3! = 6 ordens", () => {
    expect(permutacoes(["A", "B", "C"])).toHaveLength(6);
    expect(subconjuntos([1, 2, 3, 4], 2)).toHaveLength(6);
    const g = arranjosPorGrupo(["A", "B", "C", "D"], 3);
    expect(g).toHaveLength(4);
    expect(g.every((x) => x.length === 6)).toBe(true);
  });
  it("combinações com repetição: 3 balas em 3 crianças = C(5, 2) = 10; pelo menos 1 de 5 em 3 = C(4, 2) = 6", () => {
    expect(distribuicoes(3, 2)).toHaveLength(4);
    expect(distribuicoes(3, 3)).toHaveLength(comb(5, 2));
    expect(distribuicoes(5, 3, 1)).toHaveLength(comb(4, 2));
    expect(distribuicoes(5, 3, 1).every((d) => d.every((x) => x >= 1))).toBe(true);
  });
  it("bolinhas e barras: sequência -> caixas; mover barra mantém a quantidade", () => {
    expect(caixasDaSequencia([false, false, true, false, true])).toEqual([2, 1, 0]);
    const s = sequenciaInicial(3, 1);
    expect(caixasDaSequencia(s)).toEqual([3, 0]);
    const s2 = moverBarra(s, 3, 1);
    expect(caixasDaSequencia(s2)).toEqual([1, 2]);
    expect(s2.filter(Boolean)).toHaveLength(1);
  });
  it("binomial: n = 4, p = 1/2 -> 1, 4, 6, 4, 1 dezesseis avos", () => {
    expect([0, 1, 2, 3, 4].map((k) => binomial(4, k, 0.5) * 16)).toEqual([1, 4, 6, 4, 1]);
  });
  it("frações e nomes de métrica", () => {
    expect(fracao(6, 36)).toBe("1/6");
    expect(fracao(4, 4)).toBe("1");
    expect(fracaoDe(5 / 6)).toBe("5/6");
    expect(fracaoDe(1 / 8)).toBe("1/8");
    expect(slug("Óculos")).toBe("oculos");
    expect(slug("Meninas")).toBe("meninas");
  });
});

describe("casas", () => {
  it("dois dados: 36 casas, soma 7 em 6 delas", () => {
    const k = gerarCasas(["1", "2", "3", "4", "5", "6"], ["1", "2", "3", "4", "5", "6"]);
    expect(k).toHaveLength(36);
    const c = criterio(casas({ linhas: 6, evento: { soma: [7] } }).evento!, {});
    expect(k.filter((x) => pertence(x, c))).toHaveLength(6);
  });
  it("senha sem repetir: 3 × 3 − 3 = 6; pares sem ordem: 4 pessoas -> 6", () => {
    const p = casas({ linhas: ["1", "2", "3"], colunas: "linhas" });
    const m = modeloCasas(p, {}, { repetir: false });
    expect(m.casas.filter(m.valida)).toHaveLength(6);
    const q = casas({ linhas: ["A", "B", "C", "D"], colunas: "linhas", repetir: false });
    expect(modeloCasas(q, {}, {}).casas.filter((k) => modeloCasas(q, {}, {}).valida(k))).toHaveLength(12);
    const m2 = modeloCasas(q, {}, { ordem: false });
    expect(m2.casas.filter(m2.valida)).toHaveLength(6);
  });
  it("k = 1 mostra só a fila; e/ou soma as opções", () => {
    const p = casas({ linhas: ["A", "B", "C", "D"], colunas: "linhas", etapas: "$k" });
    expect(modeloCasas(p, { k: 1 }, {}).casas).toHaveLength(4);
    expect(modeloCasas(p, { k: 2 }, {}).casas).toHaveLength(16);
    const ou = casas({ linhas: 3, colunas: 2 });
    expect(modeloCasas(ou, {}, { ou: true }).casas).toHaveLength(5);
  });
  it("pista B esconde as casas fora dela; janela B desliza pelo slider", () => {
    const p = casas({ linhas: 6, a: { casas: ["6"] }, b: { casas: ["2", "4", "6"] } });
    const m = modeloCasas(p, {}, { pista: true });
    expect(m.casas.filter((k) => !m.fora(k))).toHaveLength(3);
    const j = casas({ linhas: 10, b: { intervalo: { de: "$inicio_b", ate: "$inicio_b+3" } } });
    const mj = modeloCasas(j, { inicio_b: 7 }, {});
    expect(mj.casas.filter(mj.emB).map((k) => k.chave)).toEqual(["7", "8", "9", "10"]);
  });
  it("grade 6 × 6: sem nenhum 6 = 25 casas (complemento de linha 6 ou coluna 6)", () => {
    const p = casas({ linhas: 6, colunas: "linhas", a: { linhas: ["6"], colunas: ["6"] } });
    const m = modeloCasas(p, {}, {});
    expect(m.casas.filter((k) => !m.emA(k))).toHaveLength(25);
  });
});

describe("árvore, fila, escada, barras, caixas", () => {
  it("árvore de níveis diferentes: 3 × 2 × 2 = 12 pontas", () => {
    const p = GradeResultados.parse({
      modo: "arvore",
      niveis: [{ galhos: [{ rotulo: "c1" }, { rotulo: "c2" }, { rotulo: "c3" }] }, { galhos: [{ rotulo: "b1" }, { rotulo: "b2" }] }, { galhos: [{ rotulo: "x" }, { rotulo: "y" }] }],
    }) as GradeDe<"arvore">;
    expect(modeloArvore(p, {}).caminhos).toHaveLength(12);
  });
  it("moeda n = 3: 3 pontas com 2 caras, cada uma com chance 1/8", () => {
    const p = GradeResultados.parse({ modo: "arvore", galhos: [{ rotulo: "K", p: 0.5, sucesso: true }, { rotulo: "C", p: 0.5 }], n: "$n" }) as GradeDe<"arvore">;
    const m = modeloArvore(p, { n: 3 });
    expect(m.caminhos.filter((c) => m.sucessos(c) === 2)).toHaveLength(3);
    expect(m.prob(m.caminhos[0])).toBe(0.125);
  });
  it("dado 3 vezes, sucesso = 6: um 6 com chance 3 · 1/6 · (5/6)²", () => {
    const p = GradeResultados.parse({ modo: "arvore", galhos: [{ rotulo: "6", p: 1 / 6, sucesso: true }, { rotulo: "não", p: 5 / 6 }], n: 3 }) as GradeDe<"arvore">;
    const m = modeloArvore(p, {});
    const soma = m.caminhos.filter((c) => m.sucessos(c) === 1).reduce((s, c) => s + m.prob(c)!, 0);
    expect(soma).toBeCloseTo(binomial(3, 1, 1 / 6), 12);
  });
  it("fila: AMOR com A preso = 3! = 6; O₁VO₂ com iguais = 3", () => {
    const amor = GradeResultados.parse({ modo: "fila", itens: ["A", "M", "O", "R"], prender: { item: 0, lugar: 0 } }) as GradeDe<"fila">;
    expect(ordensFila(amor, false)).toHaveLength(24);
    expect(ordensFila(amor, true)).toHaveLength(6);
    const ovo = GradeResultados.parse({ modo: "fila", itens: ["O₁", "V", "O₂"], iguais: [0, 2], listar: true }) as GradeDe<"fila">;
    expect(new Set(ordensFila(ovo, false).map((o) => textoOrdem(ovo, o, true))).size).toBe(3);
  });
  it("escada: 4! e arranjo A(5, 2)", () => {
    expect(degraus(GradeResultados.parse({ modo: "escada", n: "$n" }) as GradeDe<"escada">, { n: 4 })).toEqual([4, 3, 2, 1]);
    expect(degraus(GradeResultados.parse({ modo: "escada", n: 5, k: 2 }) as GradeDe<"escada">, {})).toEqual([5, 4]);
  });
  it("barras: C(4, k) e P(k) com p em %", () => {
    expect(valoresBarras(GradeResultados.parse({ modo: "barras", n: 4, k: 2 }) as GradeDe<"barras">, {}).vals).toEqual([1, 4, 6, 4, 1]);
    const b = valoresBarras(GradeResultados.parse({ modo: "barras", n: 4, p: "$p" }) as GradeDe<"barras">, { p: 90 });
    expect(b.vals[4]).toBeCloseTo(0.6561, 12);
  });
  it("caixas: 3 balas em n crianças, com e sem mínimo", () => {
    const p = GradeResultados.parse({ modo: "caixas", itens: 3, n: "$n" }) as GradeDe<"caixas">;
    expect(distribuicoesCaixas(p, { n: 2 }, false)).toHaveLength(4);
    expect(distribuicoesCaixas(GradeResultados.parse({ modo: "caixas", itens: 5, n: 3 }) as GradeDe<"caixas">, {}, true)).toHaveLength(6);
  });
});

describe("schemas e desenho", () => {
  it("figura recusa slider; tabela confere colunas", () => {
    expect(GradeFigura.safeParse({ modo: "escada", n: "$n" }).success).toBe(false);
    expect(GradeFigura.safeParse({ modo: "escada", n: 4, highlight: ["c3"] }).success).toBe(true);
    expect(GradeResultados.safeParse({ modo: "tabela", linhas: [{ rotulo: "a", valores: [1] }], colunas: ["x", "y"] }).success).toBe(false);
    expect(GradeResultados.safeParse({ modo: "arvore" }).success).toBe(false);
  });
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 30 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;
  const casos = [
    { modo: "casas", linhas: 6, colunas: "linhas", conteudo: "soma_ao_tocar", evento: { soma: [7] }, regua: true, acesas: ["1,6"] },
    { modo: "casas", linhas: 6, a: { casas: ["2", "4", "6"] }, b: { casas: ["4", "5", "6"] }, regua: true, mostrar: { uniao: true } },
    { modo: "casas", linhas: 6, colunas: "linhas", a: { linhas: ["2", "4", "6"] }, b: { colunas: ["5", "6"] }, pista: true, regua: true, mostrar: { intersecao: true } },
    { modo: "casas", linhas: ["A", "B", "C", "D"], colunas: "linhas", repetir: false, ordem: false, titulos: { linhas: "1º", colunas: "2º" } },
    { modo: "casas", linhas: 3, colunas: 2, ou: true },
    { modo: "tabela", linhas: [{ rotulo: "meninas", valores: [15, 45] }, { rotulo: "meninos", valores: [10, 30] }], colunas: ["óculos", "sem"], pista_linha: 0, evento_coluna: 0 },
    { modo: "arvore", galhos: [{ rotulo: "a", cor: "c1" }, { rotulo: "b", cor: "c2", sucesso: true }], n: 4, agrupar: true, acesas: [1, 2] },
    { modo: "arvore", galhos: [{ rotulo: "K", p: 0.5, sucesso: true }, { rotulo: "C", p: 0.5 }], n: 3, caminho: "sucessos", mostrar_produto: true, acesas: [3] },
    { modo: "fila", itens: ["Ana", "Bia", "Caio"], montada: [0, 1, 2] },
    { modo: "fila", itens: ["O₁", "V", "O₂"], iguais: [0, 2], iguais_ligado: true, listar: true },
    { modo: "escada", n: 4 },
    { modo: "lista", itens: ["A", "B", "C", "D"], k: 3 },
    { modo: "barras", n: 4, k: 2, itens: ["A", "B", "C", "D"] },
    { modo: "pascal", n: 5, tocada: [3, 1] },
    { modo: "bolinhas_e_barras", bolinhas: 3, barras: 2, sequencia: "●●|●|", caixas: ["x", "y", "z"] },
    { modo: "caixas", itens: 5, n: 3, minimo: true },
    { modo: "colunas", colunas: [{ titulo: "pães", itens: ["a", "b", "c"], cor: "c1" }, { titulo: "recheios", itens: ["1", "2", "3", "4"], cor: "c2" }] },
    { modo: "casas", linhas: 4, colunas: 5 },
    { modo: "escada", n: 5, k: 3, iguais: true, operacao: "soma" },
    { modo: "bolinhas_e_barras", bolinhas: 4, barras: 2, sequencia: "●●|●|●", numeradas: true },
    { modo: "urna", bolas: [{ rotulo: "V", cor: "c4", quantidade: 2 }, { rotulo: "A", cor: "c1", quantidade: 3 }], retiradas: 1, destaque: 0 },
  ];
  it.each(casos.map((c, i) => [i, c] as const))("caso %i: figura valida e desenha", (_, c) => {
    const r = GradeFigura.safeParse(c);
    expect(r.success, r.success ? "" : r.error.message).toBe(true);
    expect(() => desenharGrade(ctx, 400, 360, [], r.data!, {})).not.toThrow();
  });

  it("escada iguais+soma, grade 4x5 e urna com retiradas", () => {
    const esc = GradeResultados.parse({ modo: "escada", n: 5, k: 3, iguais: true, operacao: "soma" }) as GradeDe<"escada">;
    expect(degraus(esc, {})).toEqual([5, 5, 5]);
    const g45 = modeloCasas(GradeResultados.parse({ modo: "casas", linhas: 4, colunas: 5 }) as GradeDe<"casas">, {}, {});
    expect(g45.casas).toHaveLength(20);
    expect(GradeFigura.safeParse({ modo: "urna", bolas: [{ cor: "c1", quantidade: 5 }], retiradas: "$r" }).success).toBe(false);
  });
});
