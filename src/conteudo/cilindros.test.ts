// Cilindros · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/geometria/geometria-espacial/cilindros/aula-01.json",
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

  it("girar-retangulo: volta completa em 360°", () => {
    const s = step("girar-retangulo");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.complete_when.gte).toBe(360);
  });

  it("desenrolar-rotulo: contorno 2πr = 6π e área lateral 6π·4 = 24π", () => {
    const s = step("desenrolar-rotulo");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = 3;
    const h = 4;
    expect(2 * r).toBe(6);
    expect(2 * r * h).toBe(24);
    expect(s.complete_when.gte).toBe(100);
  });

  it("raio-vs-altura: dobrar r (de 2 para 4 com h = 3) multiplica volume por 4", () => {
    const s = step("raio-vs-altura");
    if (s.type !== "interactive_canvas") throw new Error();
    const v1 = 2 ** 2 * 3;
    const v2 = 4 ** 2 * 3;
    expect(v2 / v1).toBe(4);
    expect(s.complete_when.gte).toBe(4);
  });

  it("desafio-cilindro: volume de r = 3 e h = 5 é 45π cm³", () => {
    const s = step("desafio-cilindro");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("45π cm³");
    expect(3 ** 2 * 5).toBe(45);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("revolucao-retangulo")).toBe("Cilindro reto");
    expect(certa("largura-rotulo-aberto")).toBe("2πr (o comprimento da base)");
    expect(certa("secao-meridiana-quadrada")).toBe("h = 2r (cilindro equilátero)");
    expect(certa("formula-volume-cilindro")).toBe("V = πr²h");
  });

  it("médias", () => {
    const al = 2 * 3 * 5;
    expect(certa("area-lateral-raio3-h5")).toBe(`${al}π cm²`);
    const veq = 3 ** 2 * 6;
    expect(certa("cilindro-equilatero-volume")).toBe(`${veq}π cm³`);
    const h = 36 / 2 ** 2;
    expect(certa("altura-pelo-volume-cilindro")).toBe(`${h} m`);
  });

  it("desafios", () => {
    expect(certa("dobrar-raio-metade-altura")).toBe("Dobra (multiplica por 2)");
    const am = 2 * 4 * 7;
    expect(certa("area-secao-meridiana")).toBe(`${am} cm²`);
    const litros = 3 * 1 ** 2 * 2 * 1000;
    expect(certa("volume-usando-pi-3")).toBe(`${litros} L`);
    const cano = (5 ** 2 - 3 ** 2) * 10;
    expect(certa("cano-oco-coroa")).toBe(`${cano}π cm³`);
    const rEnrolar = 6 / 2;
    const vEnrolar = rEnrolar ** 2 * 4;
    expect(certa("enrolar-folha-dois-jeitos")).toBe(`${vEnrolar}π cm³`);
  });

  it("vestibular confere gabaritos ENEM", () => {
    expect(certa("enem-2022-caixas")).toBe("V");
    expect(certa("enem-2010-manilha")).toBe("R$ 54,56");
    expect(certa("enem-2021-reservatorio")).toBe("4,48");
  });
});
