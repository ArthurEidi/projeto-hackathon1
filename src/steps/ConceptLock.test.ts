import { describe, expect, it } from "vitest";
import { gruposFormula, partesTextoFormula } from "./ConceptLock";

describe("partesTextoFormula", () => {
  it("converte subscritos Unicode em segmentos sub de texto normal", () => {
    expect(partesTextoFormula("aₙ₋₁")).toEqual([
      { text: "a", sub: false },
      { text: "n−1", sub: true },
    ]);
    expect(partesTextoFormula("logₐ(x)")).toEqual([
      { text: "log", sub: false },
      { text: "a", sub: true },
      { text: "(x)", sub: false },
    ]);
  });

  it("mantem texto sem subscritos intacto", () => {
    expect(partesTextoFormula("S∞")).toEqual([{ text: "S∞", sub: false }]);
  });
});

describe("gruposFormula (quebra de linha sem pontuação órfã)", () => {
  const textos = (f: Parameters<typeof gruposFormula>[0]) => gruposFormula(f).map((g) => g.map((t) => t.text).join(" "));
  it("funcao-racional: '= P(x) /' fica com f(x), a vírgula fica com Q(x) e a condição vira bloco próprio", () => {
    expect(textos([{ text: "f(x)", ref: "c2" }, { text: " = P(x) / " }, { text: "Q(x)", ref: "c3" }, { text: ", Q(x)≠0" }])).toEqual([
      "f(x)  = P(x) /  Q(x) ,",
      "Q(x)≠0",
    ]);
  });
  it("logaritmos: '=' e '⇔' ficam com o termo seguinte", () => {
    expect(textos([{ text: "logₐ(x)", ref: "c2" }, { text: "=" }, { text: "y" }, { text: "⇔" }, { text: "a", sup: "y", ref: "c3" }, { text: "=" }, { text: "x", ref: "c1" }])).toEqual([
      "logₐ(x)",
      "= y",
      "⇔ a",
      "= x",
    ]);
  });
  it("soma-da-pg-infinita: '),' fica com q e 'com |q| < 1' vira bloco próprio", () => {
    expect(textos([{ text: "S∞", ref: "c4" }, { text: "=" }, { text: "a₁", ref: "c1" }, { text: "÷ (1 −" }, { text: "q", ref: "c2" }, { text: "), com |q| < 1" }])).toEqual([
      "S∞",
      "= a₁",
      "÷ (1 − q ),",
      "com |q| < 1",
    ]);
  });
  it("notacao-cientifica: '=10ⁿ se…' fica com 'ordem'; ';' fica com a ficha anterior", () => {
    expect(textos([{ text: "N", ref: "c3" }, { text: "=" }, { text: "a", ref: "c1" }, { text: "·10", sup: "n", ref: "c2" }, { text: "; 1≤a<10;" }, { text: "ordem", ref: "c4" }, { text: "=10ⁿ se a<√10, senão 10ⁿ⁺¹" }])).toEqual([
      "N",
      "= a",
      "·10 ;",
      "1≤a<10;",
      "ordem =10ⁿ se a<√10,",
      "senão 10ⁿ⁺¹",
    ]);
  });
});
