// Química · Concentração e diluição · Aula 01: passos completáveis e gabaritos refeitos pela conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { diluir, resolverSolucao } from "../widgets/common/solucao/calc";

const L = Lesson.parse(
  JSON.parse(readFileSync(join(import.meta.dirname, "../../content/quimica/solucoes/concentracao-comum/aula-01.json"), "utf8")),
);
const step = (id: string) => L.steps.find((s) => s.id === id)!;
const certa = (id: string) => Object.values(L.treino).flat().find((q) => q.id === id)!.options.find((o) => o.correct)!.label;
const C = (massa: number, volume: number) => resolverSolucao({ massa, volume }).concentracao;

/** Valores que um slider alcança. */
const valores = (c: { min: number; max: number; step: number }) => {
  const out: number[] = [];
  for (let v = c.min; v <= c.max + 1e-9; v += c.step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
};

describe("passos da aula", () => {
  it("mais soluto: 80 g/L alcançável em 500 mL e não no início", () => {
    const s = step("mais-soluto");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = s.controls[0];
    expect(valores(c).some((m) => C(m, 500) >= 80)).toBe(true);
    expect(C(c.initial, 500)).toBeLessThan(80);
  });

  it("diluir: só 800 mL conclui; 100 g/L viram 25 g/L como diz a fala", () => {
    const s = step("diluir");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when).toMatchObject({ metric: "volume", gte: 800, lte: 800 });
    expect(valores(s.controls[0])).toContain(800);
    expect(C(20, 200)).toBe(100);
    expect(C(20, 800)).toBe(25);
    expect(s.lines.done).toContain("100 g/L");
    expect(s.lines.done).toContain("25 g/L");
  });

  it("alvo de 40 g/L: há combinações exatas nos sliders e a inicial não é uma delas", () => {
    const s = step("atingir-alvo");
    if (s.type !== "interactive_canvas") throw new Error();
    const [massa, volume] = s.controls;
    const pares = valores(massa).flatMap((m) => valores(volume).filter((v) => C(m, v) === 40).map((v) => [m, v]));
    expect(pares).toContainEqual([20, 500]);
    expect(pares).toContainEqual([40, 1000]);
    expect(C(massa.initial, volume.initial)).not.toBe(40);
  });

  it("nenhum slider passa de 200 g/L (faixa em que o modelo de dissolução completa é razoável)", () => {
    expect(C(60, 500)).toBeLessThanOrEqual(200);
    expect(C(60, 300)).toBeLessThanOrEqual(200);
    expect(C(20, 200)).toBeLessThanOrEqual(200);
  });

  it("desafio: 20 g/L certo; as figuras das erradas mostram o valor de cada erro", () => {
    const s = step("desafio-diluicao");
    if (s.type !== "micro_challenge") throw new Error();
    const massa = 60 * 0.2;
    expect(massa).toBeCloseTo(12, 9);
    expect(s.options.find((o) => o.correct)!.label).toBe(`${diluir(60, 200, 600)} g/L`);
    const fig = (id: string) => (s.options.find((o) => o.id === id)!.figure.bequeres as { massa: number; volume: number }[])[1];
    expect(C(fig("c30").massa, fig("c30").volume)).toBe(30);
    expect(C(fig("c60").massa, fig("c60").volume)).toBe(60);
    expect(C(fig("c180").massa, fig("c180").volume)).toBe(180);
    expect(C(fig("c20").massa, fig("c20").volume)).toBe(20);
  });
});

describe("treino: gabaritos por conta", () => {
  it("básico e médias", () => {
    expect(certa("c-simples")).toBe(`${C(30, 2000)} g/L`);
    expect(certa("massa-em-v")).toBe(`${50 * 0.4} g`);
    expect(certa("diluicao-100")).toBe(`${diluir(80, 100, 400)} g/L`);
    expect(certa("mol-l")).toBe(`${(31.9 / 159.5).toFixed(1).replace(".", ",")} mol/L`);
  });
  it("desafios", () => {
    expect(certa("volume-final")).toBe(`${(120 * 50) / 30} mL`);
    expect(certa("mistura-iguais")).toBe(`${C(8 + 12, 500)} g/L`);
    expect(C(10, 250)).toBeGreaterThan(C(30, 1000));
    expect(certa("preparo-mol")).toBe(`${(0.1 * 0.5 * 159.5).toFixed(3).replace(".", ",")} g`);
  });
  it("sem questão de vestibular inventada", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
