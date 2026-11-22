// Física do lançamento oblíquo: cada resultado conferido pela fórmula fechada e por simulação numérica.
import { describe, expect, it } from "vitest";
import { acertou, extensaoMaxima, posicao, resolverLancamento, trajetoria } from "./calc";
import { LancamentoFigura, LancamentoParams } from "./params";

const l = (angulo: number, v0: number, h0 = 0, g = 10) => ({ angulo, v0, g, h0 });
const perto = (a: number, b: number, tol = 1e-6) => expect(Math.abs(a - b)).toBeLessThan(tol);

describe("lançamento oblíquo (sem ar, g constante)", () => {
  it("bate com as fórmulas do ensino médio quando sai do chão", () => {
    for (const [ang, v0] of [[30, 20], [45, 20], [60, 20], [75, 30], [15, 10]] as const) {
      const r = resolverLancamento(l(ang, v0));
      const s = Math.sin((ang * Math.PI) / 180);
      perto(r.tempo, (2 * v0 * s) / 10);
      perto(r.alturaMax, (v0 * v0 * s * s) / 20);
      perto(r.alcance, (v0 * v0 * Math.sin((2 * ang * Math.PI) / 180)) / 10);
    }
  });

  it("valores usados na aula: 45° e 20 m/s dão 40 m e 10 m; 30° dá 34,64 m, 5 m e 2 s", () => {
    const a45 = resolverLancamento(l(45, 20));
    perto(a45.alcance, 40);
    perto(a45.alturaMax, 10);
    const a30 = resolverLancamento(l(30, 20));
    perto(a30.alcance, 34.641016, 1e-5);
    perto(a30.alturaMax, 5);
    perto(a30.tempo, 2);
    perto(resolverLancamento(l(22.5, 20)).alcance, 28.284271, 1e-5);
    perto(resolverLancamento(l(15, 20)).alcance, 20);
  });

  it("ângulos complementares têm o mesmo alcance e 45° é o máximo", () => {
    for (const a of [10, 15, 20, 30, 40]) perto(resolverLancamento(l(a, 20)).alcance, resolverLancamento(l(90 - a, 20)).alcance);
    const max = resolverLancamento(l(45, 20)).alcance;
    for (let a = 5; a <= 85; a += 5) expect(resolverLancamento(l(a, 20)).alcance).toBeLessThanOrEqual(max + 1e-9);
  });

  it("dobrar v0 multiplica alcance e altura por 4", () => {
    const r1 = resolverLancamento(l(45, 10));
    const r2 = resolverLancamento(l(45, 20));
    perto(r2.alcance / r1.alcance, 4);
    perto(r2.alturaMax / r1.alturaMax, 4);
  });

  it("a posição no tempo de voo volta ao chão no alcance; o topo fica na metade do tempo", () => {
    const L = l(60, 25);
    const r = resolverLancamento(L);
    const fim = posicao(L, r.tempo);
    perto(fim.y, 0, 1e-6);
    perto(fim.x, r.alcance, 1e-6);
    perto(r.tSubida, r.tempo / 2, 1e-9);
    perto(posicao(L, r.tSubida).y, r.alturaMax, 1e-6);
  });

  it("com altura inicial, o tempo vem da equação do 2º grau e a simulação numérica concorda", () => {
    const L = l(30, 20, 15);
    const r = resolverLancamento(L);
    // vy = 10, h0 = 15: 15 + 10t − 5t² = 0 ⇒ t = 3.
    perto(r.tempo, 3);
    perto(r.alturaMax, 20);
    // Euler com passo pequeno: posição no fim do voo perto do solo.
    let x = 0, y = 15, vy = 10;
    const vx = 20 * Math.cos(Math.PI / 6);
    const dt = 1e-5;
    while (y >= 0) {
      x += vx * dt;
      vy -= 10 * dt;
      y += vy * dt;
    }
    perto(x, r.alcance, 1e-2);
  });

  it("trajetória começa na saída e termina no ponto de queda", () => {
    const pts = trajetoria(l(40, 18));
    perto(pts[0].x, 0);
    perto(pts[0].y, 0);
    perto(pts[pts.length - 1].y, 0, 1e-6);
  });

  it("escala fixa cobre o maior caso das faixas e o alvo é conferido com a tolerância", () => {
    const e = extensaoMaxima([15, 75], [10, 30], 10, 0);
    perto(e.alcance, 90);
    expect(e.altura).toBeGreaterThanOrEqual(resolverLancamento(l(75, 30)).alturaMax - 1e-9);
    expect(acertou(20.4, { x: 20, tolerancia: 0.5 })).toBe(true);
    expect(acertou(20.6, { x: 20, tolerancia: 0.5 })).toBe(false);
  });

  it("schemas: aceitam slider ou número e recusam ângulo fora de 0 a 90 na figura", () => {
    expect(LancamentoParams.safeParse({ angulo: "$angulo", v0: 20 }).success).toBe(true);
    expect(LancamentoParams.safeParse({ angulo: "$Angulo" }).success).toBe(false);
    expect(LancamentoFigura.safeParse({ trajetorias: [{ angulo: 95, v0: 10 }] }).success).toBe(false);
    expect(LancamentoFigura.safeParse({ trajetorias: [] }).success).toBe(false);
  });
});
