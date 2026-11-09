import { describe, expect, it } from "vitest";
import { dentroDoTrecho } from "./desenhoReta";
import { PlanoCartesiano, PlanoFigura, RetaNumerica } from "./params";
import {
  avaliar,
  criarVista,
  encaixar,
  encontros,
  marcas,
  num,
  passoDeMarcas,
  quadrante,
  raizes,
  resolver,
  resolverCurva,
  todaRaiz,
  zeros,
  type CurvaResolvida,
} from "./plot2d";

const afim = (a: number, b: number): CurvaResolvida => ({ tipo: "afim", a, b, c: 0 });

describe("avaliar curvas", () => {
  it("afim: a·x + b", () => {
    expect(avaliar(afim(2, 1), 3)).toBe(7);
    expect(avaliar(afim(1, 0), -4)).toBe(-4); // caso neutro: saída = entrada
  });
  it("afim: andando 1, a saída muda sempre a (taxa constante)", () => {
    const k = afim(-3, 5);
    for (let x = -4; x <= 4; x += 0.5) expect(avaliar(k, x + 1) - avaliar(k, x)).toBeCloseTo(-3, 12);
  });
  it("demais famílias", () => {
    expect(avaliar({ tipo: "quadratica", a: 1, b: -2, c: 1 }, 1)).toBe(0);
    expect(avaliar({ tipo: "exponencial", a: 1, b: 2, c: 0 }, 3)).toBe(8);
    expect(avaliar({ tipo: "logaritmo", a: 1, b: 10, c: 0 }, 100)).toBeCloseTo(2, 12);
    expect(avaliar({ tipo: "logaritmo", a: 1, b: 10, c: 0 }, -1)).toBeNaN();
    expect(avaliar({ tipo: "modular", a: 1, b: 2, c: 0 }, -1)).toBe(3);
    expect(avaliar({ tipo: "seno", a: 2, b: 1, c: 0 }, Math.PI / 2)).toBeCloseTo(2, 12);
    expect(avaliar({ tipo: "cosseno", a: 1, b: 1, c: 1 }, 0)).toBe(2);
  });
});

describe("raízes e encontros", () => {
  it("afim tem raiz x = −b/a", () => {
    expect(raizes(afim(-1, 2), -5, 5)).toEqual([2]);
    expect(raizes(afim(-2, 4), -5, 5)).toEqual([2]);
    expect(raizes(afim(2, 1), -5, 5)).toEqual([-0.5]);
  });
  it("a = 0: nenhuma raiz, ou todo x quando b = 0", () => {
    expect(raizes(afim(0, 5), -5, 5)).toEqual([]);
    expect(todaRaiz(afim(0, 0))).toBe(true);
    expect(todaRaiz(afim(0, 5))).toBe(false);
  });
  it("raiz fora da faixa visível não aparece", () => {
    expect(raizes(afim(1, -10), -5, 5)).toEqual([]);
  });
  it("numérico: parábola com duas raízes e tangente ao eixo", () => {
    expect(raizes({ tipo: "quadratica", a: 1, b: 0, c: -4 }, -5, 5)).toEqual([-2, 2]);
    expect(zeros((x) => (x - 1) ** 2, -5, 5)).toEqual([1]);
  });
  it("encontro de retas: f(x) = x e g(x) = 2x + 1 em x = −1", () => {
    expect(encontros(afim(1, 0), afim(2, 1), -5, 5)).toEqual([-1]);
    expect(encontros(afim(2, 0), afim(2, 3), -5, 5)).toEqual([]); // paralelas
  });
});

describe("plano", () => {
  it("quadrantes no sentido anti-horário; eixo é 0", () => {
    expect([quadrante(1, 1), quadrante(-1, 1), quadrante(-1, -1), quadrante(1, -1)]).toEqual([1, 2, 3, 4]);
    expect(quadrante(0, 3)).toBe(0);
    expect(quadrante(2, 0)).toBe(0);
  });
  it("encaixe do arraste em múltiplos do passo, dentro da faixa", () => {
    expect(encaixar(1.74, 0.5, -5, 5)).toBe(1.5);
    expect(encaixar(1.76, 0.5, -5, 5)).toBe(2);
    expect(encaixar(9, 0.5, -5, 5)).toBe(5);
  });
  it("vista com escala única: ida e volta", () => {
    const v = criarVista([-5, 5], [-5, 5], { x: 0, y: 0, w: 400, h: 344 });
    expect(v.xDe(v.X(2.5))).toBeCloseTo(2.5, 12);
    expect(v.yDe(v.Y(-3))).toBeCloseTo(-3, 12);
    expect(v.X(1) - v.X(0)).toBeCloseTo(v.Y(0) - v.Y(1), 12); // 1 em x = 1 em y na tela
  });
  it("marcas e formatação em português", () => {
    expect(passoDeMarcas(-5, 5)).toBe(1);
    expect(passoDeMarcas(-50, 50)).toBe(10);
    expect(marcas(-2, 2, 1)).toEqual([-2, -1, 0, 1, 2]);
    expect(num(-0.5)).toBe("−0,5");
    expect(num(2.625)).toBe("2,63");
  });
  it("$id resolve pelo slider", () => {
    expect(resolver("$a", { a: -2 })).toBe(-2);
    expect(resolver(3, { a: -2 })).toBe(3);
    const c = PlanoCartesiano.parse({ curvas: [{ tipo: "afim", a: "$a", b: "$b" }] }).curvas[0];
    expect(resolverCurva(c, { a: 2, b: 1 })).toEqual(afim(2, 1));
  });
});

describe("schemas", () => {
  it("defaults do plano", () => {
    const p = PlanoCartesiano.parse({});
    expect(p.x).toEqual([-5, 5]);
    expect(p.marcar.raizes).toBe(false);
    expect(p.cores.raiz).toBe("c4");
  });
  it("recusa curva inexistente e faixa invertida", () => {
    expect(PlanoCartesiano.safeParse({ ponto: { curva: 0 } }).success).toBe(false);
    expect(PlanoCartesiano.safeParse({ x: [5, -5] }).success).toBe(false);
  });
  it("figura não aceita slider", () => {
    expect(PlanoFigura.safeParse({ curvas: [{ tipo: "afim", a: "$a" }] }).success).toBe(false);
  });
});

describe("reta numérica", () => {
  const t = RetaNumerica.parse({ trechos: [{ de: -1, ate: 3, abreDe: true }] }).trechos[0];
  it("extremo aberto fica de fora, fechado fica dentro", () => {
    expect(dentroDoTrecho(t, -1)).toBe(false);
    expect(dentroDoTrecho(t, 3)).toBe(true);
    expect(dentroDoTrecho(t, 0)).toBe(true);
    expect(dentroDoTrecho(t, 4)).toBe(false);
  });
  it("trecho infinito", () => {
    const inf = RetaNumerica.parse({ trechos: [{ de: 2, ate: null }] }).trechos[0];
    expect(dentroDoTrecho(inf, 1000)).toBe(true);
    expect(dentroDoTrecho(inf, 1)).toBe(false);
  });
});
