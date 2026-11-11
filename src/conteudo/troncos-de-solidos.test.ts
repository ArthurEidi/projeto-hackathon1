// Troncos de Sólidos · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { certaDe, fechamentoOk, passosConcluiveis, semVestibular } from "./util";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/troncos-de-solidos/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const certa = (id: string) => certaDe(L, id);
const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    passosConcluiveis(L);
  });

  it("corte-na-metade-areas: em h' = 4 (k = 0,5), área cai para 9 (1/4 da base)", () => {
    const s = step("corte-na-metade-areas");
    if (s.type !== "interactive_canvas") throw new Error();
    const k = 4 / 8;
    expect(k ** 2 * 36).toBe(9);
    expect(s.complete_when.lte).toBe(4);
  });

  it("volume-escala-k3: ponta com k = 0,5 fica com (1/2)³ = 1/8 do volume", () => {
    const s = step("volume-escala-k3");
    if (s.type !== "interactive_canvas") throw new Error();
    expect((1 / 2) ** 3).toBe(0.125);
    expect(s.complete_when.gte).toBe(100);
  });

  it("trapezio-meridiano: cateto R - r = 4 e ht = 3 dão geratriz gt = 5", () => {
    const s = step("trapezio-meridiano");
    if (s.type !== "interactive_canvas") throw new Error();
    const gt = Math.hypot(6 - 2, 3);
    expect(gt).toBe(5);
    expect(s.complete_when.gte).toBe(1);
  });

  it("desafio-tronco: cone de 80 cm³ cortado na metade tem ponta de 10 cm³", () => {
    const s = step("desafio-tronco");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("10 cm³");
    expect((6 / 12) ** 3 * 80).toBe(10);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("razao-areas-metade-altura")).toBe("1/4 da área da base");
    expect(certa("razao-volumes-metade-altura")).toBe("1/8 do volume total");
    expect(certa("volume-do-tronco-fracao")).toBe("7/8 do volume total");
    expect(certa("geratriz-tronco-cone-pitagoras")).toBe("R − r (a diferença dos raios)");
  });

  it("médias", () => {
    const gt = Math.hypot(7 - 3, 3);
    expect(certa("geratriz-tronco-345")).toBe(`${gt} cm`);
    expect(certa("volume-tronco-por-subtracao")).toBe("210 cm³");
    const rCorte = 10 * (6 / 15);
    expect(certa("raio-corte-semelhanca-direta")).toBe(`${rCorte} cm`);
  });

  it("desafios", () => {
    const vLiq = 160 * (1 / 2) ** 3;
    expect(certa("taca-ate-a-metade-da-altura")).toBe(`${vLiq} mL`);
    expect(certa("quantas-tacas-meia-altura")).toBe("8");
    expect(certa("achar-k-pela-area")).toBe("1/27");
    const vTronco = (3 / 3) * (16 + Math.sqrt(16 * 4) + 4);
    expect(certa("formula-volume-tronco-piramide")).toBe(`${vTronco} cm³`);
    const gtAbajur = Math.hypot(6 - 2, 3);
    const alAbajur = (6 + 2) * gtAbajur;
    expect(certa("area-lateral-tronco-cone")).toBe(`${alAbajur}π cm²`);
  });

  it("vestibular pendente de fontes reais", () => {
    semVestibular(L);
  });
});
