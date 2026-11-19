// sistema_escalonado: contas com os valores do roteiro sistemas-lineares-e-escalonamento.
import { describe, expect, it } from "vitest";
import {
  aplicarOperacao,
  classificar,
  escalonada,
  matrizAtual,
  metricasSistema,
  pivo,
  substituicao,
  testarPonto,
  textoEquacao,
} from "./calc";
import { desenharSistema } from "./desenho";
import { SistemaEscalonado, SistemaEscalonadoFigura } from "./params";
import { aspectoSistema } from "./desenho";
import { gravadorCanvas } from "../divisao/gravadorCanvas";
import { tinta } from "../geo/base";

const eliminar = (linhas: (number | string)[][], k: number | string, extra: Record<string, unknown> = {}) =>
  SistemaEscalonado.parse({ modo: "eliminar", linhas, operacao: { alvo: 1, base: 0, k }, plano: { x: [-2, 5], y: [-2, 6] }, ...extra });

describe("sistema_escalonado: operação L₂ ← L₂ − k·L₁", () => {
  it("[[1,1;3],[2,1;4]] com k = 2 vira [0,−1;−2], que é −y = −2", () => {
    const m = aplicarOperacao([[1, 1, 3], [2, 1, 4]], 1, 0, 2);
    expect(m).toEqual([[1, 1, 3], [0, -1, -2]]);
    expect(textoEquacao(m[1], ["x", "y"])).toBe("−y = −2");
    expect(textoEquacao(m[0], ["x", "y"])).toBe("x + y = 3");
    expect(pivo(m[1])).toBe(1);
    expect(escalonada(m)).toBe(true);
  });

  it("k = 0 e k = 1 não zeram x; k = 2 zera; a solução (1; 2) nunca muda", () => {
    const zerou = [0, 1, 2].map((k) => metricasSistema(eliminar([[1, 1, 3], [2, 1, 4]], "$k"), { k }).zerou);
    expect(zerou).toEqual([0, 0, 1]);
    for (const k of [0, 1, 2]) {
      const m = matrizAtual(eliminar([[1, 1, 3], [2, 1, 4]], "$k"), { k });
      expect(classificar(m).solucao).toEqual([1, 2]);
    }
    // k = 1: L₂ − L₁ = x = 1 (reta vertical), ainda com dois pivôs na coluna de x
    const m1 = matrizAtual(eliminar([[1, 1, 3], [2, 1, 4]], "$k"), { k: 1 });
    expect(m1[1]).toEqual([1, 0, 1]);
    expect(escalonada(m1)).toBe(false);
    expect(metricasSistema(eliminar([[1, 1, 3], [2, 1, 4]], "$k"), { k: 2 })).toEqual({
      k: 2,
      zerou: 1,
      escalonada: 1,
      unica: 1,
      impossivel: 0,
      livres: 0,
    });
  });

  it("x + y = 2 e 2x + 2y = 4 + t: t = 0 dá 0 = 0 (y livre); t = 1 dá 0 = 1 (impossível)", () => {
    const p = eliminar([[1, 1, 2], [2, 2, "4+$t"]], 2);
    const m0 = matrizAtual(p, { t: 0 });
    expect(m0[1]).toEqual([0, 0, 0]);
    expect(classificar(m0)).toMatchObject({ tipo: "infinitas", livres: 1 });
    expect(metricasSistema(p, { t: 0 }).impossivel).toBe(0);
    const m1 = matrizAtual(p, { t: 1 });
    expect(m1[1]).toEqual([0, 0, 1]);
    expect(textoEquacao(m1[1], ["x", "y"])).toBe("0 = 1");
    expect(classificar(m1).tipo).toBe("impossivel");
    expect(metricasSistema(p, { t: 1 })).toMatchObject({ impossivel: 1, unica: 0, livres: 0 });
  });

  it("ponto testado: (1; 1) vale em x + y = 2, mas dá 0 ≠ 1 na linha 0 = 1", () => {
    const m = matrizAtual(eliminar([[1, 1, 2], [2, 2, 5]], 2), {});
    expect(testarPonto(m, [1, 1])).toEqual([
      { valor: 2, rhs: 2, vale: true },
      { valor: 0, rhs: 1, vale: false },
    ]);
  });
});

describe("sistema_escalonado: substituição de baixo para cima", () => {
  const p = SistemaEscalonado.parse({ modo: "substituir", linhas: [[1, 1, 1, 3], [0, 1, 1, 2], [0, 0, 1, "$t"]] });

  it("z = t; y = 2 − z; x = 3 − y − z: t = 0 dá (1; 2; 0), t = 1 dá (1; 1; 1)", () => {
    const s0 = substituicao(matrizAtual(p, { t: 0 }), ["x", "y", "z"]);
    expect(s0.map((l) => l.formula)).toEqual(["x = 3 − y − z", "y = 2 − z", "z = 0"]);
    expect(s0.map((l) => l.valor)).toEqual([1, 2, 0]);
    const s1 = substituicao(matrizAtual(p, { t: 1 }), ["x", "y", "z"]);
    expect(s1.map((l) => l.conta)).toEqual(["3 − 1 − 1", "2 − 1", ""]);
    expect(s1.map((l) => l.valor)).toEqual([1, 1, 1]);
    expect(classificar(matrizAtual(p, { t: 1 })).solucao).toEqual([1, 1, 1]);
  });

  it("última linha 0 = 0: z livre, y = 2 − z e x = 1 (dúvida da Tati)", () => {
    const m = [[1, 1, 1, 3], [0, 1, 1, 2], [0, 0, 0, 0]];
    const s = substituicao(m, ["x", "y", "z"]);
    expect(s.map((l) => l.formula)).toEqual(["x = 3 − y − z", "y = 2 − z", "0 = 0", "z livre"]);
    // revisão B35: x = 3 − (2 − z) − z = 1 para qualquer z; o cálculo propaga a expressão de y
    expect(s[0].conta).toBe("3 − (2 − z) − z");
    expect(s[0].valor).toBe(1);
    expect(s[1]).toMatchObject({ valor: null, expressao: "2 − z", conta: "" });
    expect(classificar(m)).toMatchObject({ tipo: "infinitas", livres: 1 });
    for (const z of [-1, 0, 2.5]) expect(3 - (2 - z) - z).toBe(1);
  });

  it("D5 do treino: x + y + z = 3, y − z = 0, 0 = 0 dá y = z e x = 3 − y − z", () => {
    const s = substituicao([[1, 1, 1, 3], [0, 1, -1, 0], [0, 0, 0, 0]], ["x", "y", "z"]);
    expect(s[1].formula).toBe("y = z");
    expect(s[0].formula).toBe("x = 3 − y − z");
    // x = 3 − z − z = 3 − 2z (solução geral do gabarito: (3 − 2t; t; t))
    expect(s[0]).toMatchObject({ conta: "3 − z − z", valor: null, expressao: "3 − 2z" });
  });
});

describe("sistema_escalonado: schema", () => {
  it("recusa linhas de tamanhos diferentes, alvo = base e plano com 3 incógnitas", () => {
    expect(SistemaEscalonado.safeParse({ modo: "substituir", linhas: [[1, 1, 3], [1, 1, 1, 2]] }).success).toBe(false);
    expect(SistemaEscalonado.safeParse({ modo: "eliminar", linhas: [[1, 1, 3], [2, 1, 4]], operacao: { alvo: 0, base: 0 } }).success).toBe(false);
    expect(
      SistemaEscalonado.safeParse({ modo: "eliminar", linhas: [[1, 1, 1, 3], [0, 1, 1, 2]], plano: { x: [0, 1], y: [0, 1] } }).success,
    ).toBe(false);
  });

  it("a figura recusa $slider", () => {
    expect(SistemaEscalonadoFigura.safeParse({ modo: "eliminar", linhas: [[1, 1, 3], [2, 1, 4]], operacao: { k: "$k" } }).success).toBe(false);
    expect(SistemaEscalonadoFigura.safeParse({ modo: "eliminar", linhas: [[1, 1, 3], [2, 1, 4]], operacao: { k: 2 } }).success).toBe(true);
  });
});

describe("desenharSistema", () => {
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 40 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;

  it("desenha os dois modos, com ponto e destaques, sem erro", () => {
    for (const k of [0, 1, 2]) desenharSistema(ctx, 360, 360, [], eliminar([[1, 1, 3], [2, 1, 4]], "$k", { highlight: ["c4"] }), { k });
    desenharSistema(ctx, 360, 360, [], eliminar([[1, 1, 2], [2, 2, 5]], 2, { ponto: [1, 1] }), {});
    const s = SistemaEscalonado.parse({ modo: "substituir", linhas: [[1, 1, 1, 3], [0, 1, 1, 2], [0, 0, 1, "$t"]] });
    desenharSistema(ctx, 360, 260, [], s, { t: 1 });
  });
});

// Revisão B35 (19/11): cada teste reproduz um achado do docs/revisao/codigo-b33-codex.md.
describe("revisão B35: escalonado", () => {
  const desenhar = (p: SistemaEscalonado, ctl: Record<string, number> = {}, w = 360) => {
    const g = gravadorCanvas();
    const h = Math.round(w * aspectoSistema(p));
    desenharSistema(g.ctx, w, h, [], p, ctl);
    return { ...g, h };
  };

  it("Média (altura): com 0 = 0 na última linha a tabela tem 4 linhas e tudo cabe no canvas", () => {
    const p = SistemaEscalonado.parse({ modo: "substituir", linhas: [[1, 1, 1, 3], [0, 1, 1, 2], [0, 0, 0, 0]] });
    const { textos, h } = desenhar(p);
    expect(textos.map((t) => t.s)).toContain("z livre");
    for (const t of textos) expect(t.y + t.tamanho / 2, t.s).toBeLessThanOrEqual(h);
    // o passo 3 da aula (slider só no termo independente) não ganha altura à toa
    const aula = SistemaEscalonado.parse({ modo: "substituir", linhas: [[1, 1, 1, 3], [0, 1, 1, 2], [0, 0, 1, "$t"]] });
    expect(aspectoSistema(aula)).toBeCloseTo((8 + 3 * 36 + 4 + 30 + 8 + 3 * 34 + 6) / 360, 6);
  });

  it("Média (solução oculta): mostrar.solucao = false esconde também o ponto c1 do plano", () => {
    const base = { linhas: [[1, 1, 3], [2, 1, 4]], operacao: { k: 2 } };
    const com = desenhar(eliminar(base.linhas, 2));
    expect(com.preenchimentos).toContain(tinta("c1"));
    const sem = desenhar(eliminar(base.linhas, 2, { mostrar: { pivos: true, classificacao: true, solucao: false, equacoes: true } }));
    expect(sem.preenchimentos).not.toContain(tinta("c1"));
    expect(sem.textos.map((t) => t.s).some((s) => s.includes("(1; 2)"))).toBe(false);
  });

  it("Média (substituir sem escalonar): [[1,1|3],[2,1|4]] é recusado no schema e, via slider, não gera tabela", () => {
    expect(SistemaEscalonado.safeParse({ modo: "substituir", linhas: [[1, 1, 3], [2, 1, 4]] }).success).toBe(false);
    const p = SistemaEscalonado.parse({ modo: "substituir", linhas: [[1, 1, 3], ["$a", 1, 4]] });
    const s2 = desenhar(p, { a: 2 }).textos.map((t) => t.s);
    expect(s2.some((s) => s.includes("livre"))).toBe(false);
    expect(s2).toContain("Escalone antes de substituir");
    const s0 = desenhar(p, { a: 0 }).textos.map((t) => t.s);
    expect(s0).toContain("y = 4");
    expect(s0).toContain("x = 3 − y");
  });
});
