import { describe, expect, it } from "vitest";
import { alternar, cadeia, contagens, ehFuncao, estadoInicial, formatarRegra, imagem, metricasMaquinas } from "./calc";
import { desenharMaquinas } from "./desenho";
import { Maquinas, MaquinasFigura } from "./params";

describe("maquinas_funcao: modo flechas", () => {
  it("duas entradas podem compartilhar saída; duas saídas na mesma entrada quebram unicidade", () => {
    let l = alternar([], 0, 0);
    l = alternar(l, 1, 0);
    expect(contagens(2, l)).toEqual([1, 1]);
    expect(ehFuncao(2, l)).toBe(true);
    expect(imagem(l)).toEqual(new Set([0]));

    l = alternar(l, 0, 1);
    expect(contagens(2, l)).toEqual([2, 1]);
    expect(ehFuncao(2, l)).toBe(false);

    l = alternar(l, 0, 1);
    expect(contagens(2, l)).toEqual([1, 1]);
    expect(ehFuncao(2, l)).toBe(true);
  });

  it("rejeita ligações fora dos conjuntos", () => {
    expect(Maquinas.safeParse({ modo: "flechas", entradas: [1, 2], saidas: [3, 4], ligacoes: [[2, 0]] }).success).toBe(false);
    expect(Maquinas.safeParse({ modo: "flechas", entradas: [1, 2], saidas: [3, 4], ligacoes: [[0, 2]] }).success).toBe(false);
    expect(Maquinas.safeParse({ modo: "flechas", entradas: [1, 2], saidas: [3, 4], ligacoes: [[0, 1]] }).success).toBe(true);
  });

  it("métrica entradas_com_uma_saida conta entradas válidas", () => {
    const p = Maquinas.parse({ modo: "flechas", entradas: [1, 2, 3], saidas: [2, 4] });
    const e = estadoInicial(p);
    expect(metricasMaquinas(p, {}, e).entradas_com_uma_saida).toBe(0);
    const e1 = { ...e, ligacoes: alternar(alternar([], 0, 0), 1, 0) };
    expect(metricasMaquinas(p, {}, e1).entradas_com_uma_saida).toBe(2);
  });
});

describe("maquinas_funcao: modo maquinas", () => {
  it("identidade devolve cada entrada sem alteração", () => {
    const p = Maquinas.parse({ modo: "maquinas" });
    if (p.modo !== "maquinas") throw new Error("esperava maquinas");
    for (const x of [-1, 0, 2]) {
      expect(cadeia(p, {}, x).valores).toEqual([x, x]);
    }
    expect(formatarRegra("f", 1, 0)).toBe("f(x) = x");
  });

  it("g(x)=x+1 depois f(x)=2x dá 4 em x=1; ordem invertida dá 3; inversa desfaz", () => {
    const p = Maquinas.parse({
      modo: "maquinas",
      maquinas: [
        { nome: "g", a: 1, b: 1 },
        { nome: "f", a: 2, b: 0 },
      ],
    });
    if (p.modo !== "maquinas") throw new Error("esperava maquinas");
    expect(cadeia(p, {}, 1).valores).toEqual([1, 2, 4]);
    expect(cadeia(p, {}, 1, true).valores).toEqual([1, 2, 3]);
    for (const x of [-3, 0, 2]) {
      expect(cadeia(p, {}, x, false, true).valores.at(-1)).toBeCloseTo(x, 9);
    }
    expect(formatarRegra("g", 1, 1)).toBe("g(x) = x + 1");
    expect(formatarRegra("f", 2, -1)).toBe("f(x) = 2x − 1");
  });

  it("constante não tem inversa e figura recusa slider", () => {
    const p = Maquinas.parse({ modo: "maquinas", maquinas: [{ nome: "c", a: 0, b: 3 }] });
    if (p.modo !== "maquinas") throw new Error("esperava maquinas");
    expect(cadeia(p, {}, 2, false, true).invertivel).toBe(false);
    expect(formatarRegra("c", 0, 3)).toBe("c(x) = 3");
    expect(MaquinasFigura.safeParse({ modo: "maquinas", x: "$x" }).success).toBe(false);
  });

  it("métricas iniciais começam zeradas e avançam ao testar entradas, ordem e inversa", () => {
    const p = Maquinas.parse({
      modo: "maquinas",
      maquinas: [
        { nome: "g", a: 1, b: 1 },
        { nome: "f", a: 2, b: 0 },
      ],
    });
    const e0 = estadoInicial(p);
    expect(metricasMaquinas(p, {}, e0)).toEqual({
      entradas_com_uma_saida: 0,
      entradas_testadas: 0,
      ordens_testadas: 0,
      inversa_testada: 0,
    });
    const e1 = {
      ...e0,
      testadas: new Set([-1, 2]),
      ordens: new Set([false, true]),
      inversaTestada: true,
    };
    expect(metricasMaquinas(p, {}, e1)).toEqual({
      entradas_com_uma_saida: 0,
      entradas_testadas: 2,
      ordens_testadas: 2,
      inversa_testada: 1,
    });
  });
});

describe("desenharMaquinas", () => {
  const ctx = new Proxy({} as Record<string, unknown>, {
    get: (_, k) => (k === "measureText" ? () => ({ width: 40 }) : () => undefined),
    set: () => true,
  }) as unknown as CanvasRenderingContext2D;

  it("desenha todos os modos e destaques sem erro", () => {
    const f = Maquinas.parse({ modo: "flechas", entradas: [1, 2], saidas: [2, 4], ligacoes: [[0, 0], [0, 1]], highlight: ["c4"] });
    desenharMaquinas(ctx, 400, 320, [], f, {}, f.modo === "flechas" ? f.ligacoes : [], 0, false, false, 0);

    const m = Maquinas.parse({
      modo: "maquinas",
      maquinas: [
        { nome: "g", a: 1, b: 1 },
        { nome: "f", a: 2, b: 0 },
      ],
      x: 1,
      highlight: ["c3"],
    });
    desenharMaquinas(ctx, 400, 360, [], m, {}, [], 1, false, false, null);
    desenharMaquinas(ctx, 400, 360, [], m, {}, [], 1, true, true, null);

    const c = Maquinas.parse({ modo: "maquinas", maquinas: [{ nome: "c", a: 0, b: 3 }] });
    desenharMaquinas(ctx, 400, 260, [], c, {}, [], 1, false, true, null);
  });
});
