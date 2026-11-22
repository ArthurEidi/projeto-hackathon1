// Soluções: concentração comum, mol/L, diluição, saturação e partículas simbólicas.
import { describe, expect, it } from "vitest";
import { contarParticulas, diluir, posicoesParticulas, resolverSolucao } from "./calc";
import { SolucaoFigura, SolucaoParams } from "./params";

describe("concentração (C = m/V)", () => {
  it("g/L com volume em mL", () => {
    expect(resolverSolucao({ massa: 20, volume: 500 }).concentracao).toBe(40);
    expect(resolverSolucao({ massa: 30, volume: 2000 }).concentracao).toBe(15);
    expect(resolverSolucao({ massa: 0, volume: 300 }).concentracao).toBe(0);
  });

  it("mol/L com a massa molar do CuSO₄ (159,5 g/mol)", () => {
    const r = resolverSolucao({ massa: 31.9, volume: 1000, massaMolar: 159.5 });
    expect(r.mols).toBeCloseTo(0.2, 9);
    expect(r.concentracaoMol).toBeCloseTo(0.2, 9);
    expect(resolverSolucao({ massa: 40, volume: 1000, massaMolar: 159.5 }).concentracaoMol).toBeCloseTo(0.2508, 4);
  });

  it("diluição conserva a massa: C1·V1 = C2·V2", () => {
    expect(diluir(100, 200, 800)).toBe(25);
    expect(diluir(60, 200, 600)).toBe(20);
    const antes = resolverSolucao({ massa: 20, volume: 200 });
    const depois = resolverSolucao({ massa: 20, volume: 800 });
    expect(antes.concentracao * 0.2).toBeCloseTo(depois.concentracao * 0.8, 9);
  });

  it("acima da solubilidade, o excesso fica no fundo e não conta em C", () => {
    const r = resolverSolucao({ massa: 50, volume: 200, solubilidade: 200 });
    expect(r.dissolvida).toBe(40);
    expect(r.excesso).toBe(10);
    expect(r.concentracao).toBe(200);
    expect(resolverSolucao({ massa: 30, volume: 200, solubilidade: 200 }).excesso).toBe(0);
  });

  it("partículas: posições fixas por índice e quantidade proporcional à massa dissolvida", () => {
    const a = posicoesParticulas(10);
    const b = posicoesParticulas(20);
    expect(b.slice(0, 10)).toEqual(a);
    for (const p of b) {
      expect(p.u).toBeGreaterThan(0);
      expect(p.u).toBeLessThan(1);
      expect(p.v).toBeGreaterThan(0);
      expect(p.v).toBeLessThan(1);
    }
    expect(contarParticulas(20, 1)).toBe(20);
    expect(contarParticulas(20, 0.5)).toBe(40);
    expect(contarParticulas(500, 1, 160)).toBe(160);
  });

  it("schemas: mostrar.mol exige massa molar; a figura recusa volume acima da capacidade", () => {
    expect(SolucaoParams.safeParse({ massa: "$massa", volume: 500 }).success).toBe(true);
    expect(SolucaoParams.safeParse({ massa: 10, volume: 500, mostrar: { mol: true } }).success).toBe(false);
    expect(SolucaoParams.safeParse({ massa: 10, volume: 500, soluto: { massa_molar: 159.5 }, mostrar: { mol: true } }).success).toBe(true);
    expect(SolucaoFigura.safeParse({ bequeres: [{ massa: 5, volume: 1200 }] }).success).toBe(false);
  });
});
