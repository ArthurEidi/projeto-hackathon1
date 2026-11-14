import { describe, expect, it } from "vitest";
import {
  caixaDoCentro,
  caixasColidem,
  candidatosAoRedor,
  escolherPosicao,
  type Obstaculo,
} from "./rotulosPlano";

const LIMITES = { x: 4, y: 4, w: 320, h: 270 };

describe("rotulosPlano", () => {
  it("mantem posicao preferida quando nao ha colisao", () => {
    const res = escolherPosicao(
      candidatosAoRedor({ x: 160, y: 140 }, { x: 210, y: 122 }, 60, 29),
      60,
      29,
      [],
      LIMITES,
    );
    expect(res.livre).toBe(true);
    expect(res.pos).toEqual({ x: 210, y: 122 });
  });

  it("funcao-composta-e-inversa p4/p5: separa chip (1; 3) do rotulo y = x", () => {
    const ocupados: Obstaculo[] = [];
    const rotuloDiag = escolherPosicao(
      [{ x: 266, y: 42 }, { x: 220, y: 88 }],
      40,
      16,
      ocupados,
      LIMITES,
    );
    ocupados.push({ caixa: rotuloDiag.caixa });

    const chipPonto = escolherPosicao(
      candidatosAoRedor({ x: 205, y: 65 }, { x: 260, y: 47 }, 58, 29),
      58,
      29,
      ocupados,
      LIMITES,
    );
    expect(chipPonto.livre).toBe(true);
    expect(caixasColidem(rotuloDiag.caixa, chipPonto.caixa)).toBe(false);
  });

  it("funcao-exponencial p1: separa chip (0; 1) da guia y = 1", () => {
    const ocupados: Obstaculo[] = [];
    const guia = escolherPosicao(
      [{ x: 110, y: 150 }, { x: 270, y: 150 }],
      40,
      16,
      ocupados,
      LIMITES,
    );
    ocupados.push({ caixa: guia.caixa });

    const chipPonto = escolherPosicao(
      candidatosAoRedor({ x: 145, y: 165 }, { x: 120, y: 147 }, 58, 29),
      58,
      29,
      ocupados,
      LIMITES,
    );
    expect(chipPonto.livre).toBe(true);
    expect(caixasColidem(guia.caixa, chipPonto.caixa)).toBe(false);
  });

  it("funcao-modular p5: separa raizes 0,5 e 1,5 entre si e do vertice (1; -1)", () => {
    const ocupados: Obstaculo[] = [
      // Ponto do vertice em (1; -1)
      { caixa: caixaDoCentro({ x: 170, y: 192 }, 14, 14), folgaX: 1, folgaY: 1 },
    ];
    const r1 = escolherPosicao(
      candidatosAoRedor({ x: 150, y: 165 }, { x: 154, y: 187 }, 42, 29),
      42,
      29,
      ocupados,
      LIMITES,
    );
    ocupados.push({ caixa: r1.caixa });

    const r2 = escolherPosicao(
      candidatosAoRedor({ x: 190, y: 165 }, { x: 194, y: 187 }, 42, 29),
      42,
      29,
      ocupados,
      LIMITES,
    );
    expect(r1.livre).toBe(true);
    expect(r2.livre).toBe(true);
    expect(caixasColidem(r1.caixa, r2.caixa)).toBe(false);
    expect(caixasColidem(r1.caixa, ocupados[0].caixa, 1, 1)).toBe(false);
    expect(caixasColidem(r2.caixa, ocupados[0].caixa, 1, 1)).toBe(false);
  });

  it("raizes-polinomiais p1/p3: separa chip (0; -1) do chip da raiz 1", () => {
    const ocupados: Obstaculo[] = [];
    const chipPonto = escolherPosicao(
      candidatosAoRedor({ x: 140, y: 180 }, { x: 185, y: 162 }, 66, 29),
      66,
      29,
      ocupados,
      LIMITES,
    );
    ocupados.push({ caixa: chipPonto.caixa });

    const chipRaiz = escolherPosicao(
      candidatosAoRedor({ x: 185, y: 145 }, { x: 189, y: 167 }, 28, 29),
      28,
      29,
      ocupados,
      LIMITES,
    );
    expect(chipRaiz.livre).toBe(true);
    expect(caixasColidem(chipPonto.caixa, chipRaiz.caixa)).toBe(false);
  });

  it("evita sair dos limites do canvas", () => {
    const res = escolherPosicao(
      candidatosAoRedor({ x: 310, y: 20 }, { x: 340, y: 10 }, 60, 29),
      60,
      29,
      [],
      LIMITES,
    );
    expect(res.livre).toBe(true);
    expect(res.caixa.x + res.caixa.w).toBeLessThanOrEqual(LIMITES.x + LIMITES.w);
    expect(res.caixa.y).toBeGreaterThanOrEqual(LIMITES.y);
  });
});
