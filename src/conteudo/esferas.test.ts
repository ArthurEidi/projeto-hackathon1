// Esferas · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { certaDe, fechamentoOk, passosConcluiveis } from "./util";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/esferas/aula-01.json",
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

  it("corte-no-equador-e-acima: corte a d = 3 na esfera R = 5 tem raio r = 4", () => {
    const s = step("corte-no-equador-e-acima");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = Math.sqrt(5 ** 2 - 3 ** 2);
    expect(r).toBe(4);
    expect(s.complete_when.gte).toBe(3);
  });

  it("quatro-circulos-maximos: casca com R = 3 é 4πR² = 36π", () => {
    const s = step("quatro-circulos-maximos");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(4 * 3 ** 2).toBe(36);
    expect(s.complete_when.gte).toBe(1);
  });

  it("volume-e-escala-k: dobrar raio (k = 2) multiplica volume por 2³ = 8", () => {
    const s = step("volume-e-escala-k");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(2 ** 3).toBe(8);
    expect(s.complete_when.gte).toBe(2);
  });

  it("desafio-esfera: área 36π e volume 36π em R = 3", () => {
    const s = step("desafio-esfera");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("A = 36π cm² e V = 36π cm³");
    expect(4 * 3 ** 2).toBe(36);
    expect((4 / 3) * 3 ** 3).toBe(36);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("secao-passa-pelo-centro")).toBe("O círculo máximo (raio r = R)");
    expect(certa("quantos-circulos-maximos")).toBe("4 círculos máximos (4πR²)");
    expect(certa("relacao-pitagoras-secao")).toBe("r² + d² = R²");
    expect(certa("esfera-no-cilindro-arquimedes")).toBe("2/3");
  });

  it("médias", () => {
    const rSecao = Math.sqrt(5 ** 2 - 3 ** 2);
    expect(certa("raio-da-secao-345")).toBe(`${rSecao} cm`);
    const areaEsfera = 4 * 3 ** 2;
    expect(certa("area-esfera-raio-3")).toBe(`${areaEsfera}π cm²`);
    const fuso = (60 / 360) * (4 * 3 ** 2);
    expect(certa("area-do-fuso-60-graus")).toBe(`${fuso}π cm²`);
  });

  it("desafios", () => {
    expect(certa("fundir-oito-esferas")).toBe("2 cm");
    const atSemiesfera = 3 * 2 ** 2;
    expect(certa("area-total-semiesfera-macica")).toBe(`${atSemiesfera}π cm²`);
    const vCilindro = 20 * (3 / 2);
    expect(certa("arquimedes-cilindro-circunscrito")).toBe(`${vCilindro} cm³`);
    expect(certa("achar-raio-igualando-area-e-volume")).toBe("3 cm");
    const vVazio = Math.PI * 3 ** 2 * 18 - 3 * ((4 / 3) * Math.PI * 3 ** 3);
    expect(certa("esferas-no-cilindro-nivel")).toBe(`${Math.round(vVazio / Math.PI)}π cm³`);
  });

  it("vestibular confere gabaritos ENEM", () => {
    expect(certa("enem-2022-esferas-rolamento")).toBe("4800");
    expect(certa("enem-2022-docinhos")).toBe("24");
  });
});
