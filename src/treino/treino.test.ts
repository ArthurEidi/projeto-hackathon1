import { describe, expect, it } from "vitest";
import type { Questao } from "../engine/schema";
import { rotuloFonte } from "./Treino";

const q = (fonte: Questao["fonte"]) => ({ id: "x", prompt: "p", options: [], fonte }) as unknown as Questao;

describe("rótulo da fonte no treino", () => {
  it("questão adaptada leva (adaptada) depois da banca, do ano e da edição", () => {
    expect(rotuloFonte(q({ banca: "ENEM", ano: 2014, edicao: "PPL", adaptada: true, adaptacao: "a", urls: ["https://x.y"] }))).toBe(
      "ENEM 2014 PPL (adaptada)",
    );
    expect(rotuloFonte(q({ banca: "UFPR", adaptada: true, adaptacao: "a", urls: ["https://x.y"] }))).toBe("UFPR (adaptada)");
  });
  it("questão original mostra só a fonte; sem fonte, nada", () => {
    expect(rotuloFonte(q({ banca: "UFSC", ano: 2004, adaptada: false, urls: ["https://x.y"] }))).toBe("UFSC 2004");
    expect(rotuloFonte(q(undefined))).toBeNull();
  });
});
