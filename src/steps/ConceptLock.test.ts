import { describe, expect, it } from "vitest";
import { partesTextoFormula } from "./ConceptLock";

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
