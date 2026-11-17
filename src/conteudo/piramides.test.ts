// Pirâmides · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { certaDe, fechamentoOk, passosConcluiveis } from "./util";
import { paramsDoPasso } from "../steps/paramsDoPasso";
import { montarCena } from "../widgets/common/solido/cenas";
import { Solido3d } from "../widgets/common/solido/params";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/piramides/aula-01.json",
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

  it("nasce-o-apotema: apótema com m = 3 e h = 4 vale 5", () => {
    const s = step("nasce-o-apotema");
    if (s.type !== "interactive_canvas") throw new Error();
    const ap = Math.hypot(3, 4);
    expect(ap).toBe(5);
    expect(s.complete_when.gte).toBe(4);
  });

  it("abrir-paredes: 4 faces de base 6 e altura 5 somam área lateral 60", () => {
    const s = step("abrir-paredes");
    if (s.type !== "interactive_canvas") throw new Error();
    const areaLateral = 4 * ((6 * 5) / 2);
    expect(areaLateral).toBe(60);
    expect(s.complete_when.gte).toBe(100);
    // B32: a altura 5 pedida pela fala só aparece depois de concluir (antes_de_concluir esconde o rótulo do apótema)
    const rotulos = (concluido: boolean, abrir: number) =>
      montarCena(Solido3d.parse(paramsDoPasso(s.params, s.antes_de_concluir, concluido)), { abrir }).anotacoes.flatMap((x) => ("rotulo" in x && x.rotulo ? [x.rotulo] : []));
    for (const abrir of [0, 50, 75]) expect(rotulos(false, abrir)).not.toContain("5");
    expect(rotulos(false, 0)).toEqual(expect.arrayContaining(["h = 4", "3"]));
    expect(rotulos(true, 100)).toContain("5");
  });

  it("tres-num-prisma: volume da pirâmide é 1/3 do prisma (144 / 3 = 48)", () => {
    const s = step("tres-num-prisma");
    if (s.type !== "interactive_canvas") throw new Error();
    const vPrisma = 6 * 6 * 4;
    expect(vPrisma / 3).toBe(48);
    expect(s.complete_when.gte).toBe(100);
  });

  it("desafio-piramide: volume com base 6 e h = 4 é 48 cm³", () => {
    const s = step("desafio-piramide");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("48 cm³");
    expect((6 * 6 * 4) / 3).toBe(48);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("faces-piramide-quadrada")).toBe("5 faces e 5 vértices");
    expect(certa("fator-um-terco")).toBe("1/3 do volume do prisma");
    expect(certa("qual-altura-na-face")).toBe("O apótema da pirâmide (a_p)");
    expect(certa("triangulo-interno-pitagoras")).toBe("O apótema da pirâmide (a_p)");
  });

  it("médias", () => {
    const ap = Math.hypot(3, 4);
    expect(certa("calculo-apotema-345")).toBe(`${ap} cm`);
    const h = Math.sqrt(10 ** 2 - 6 ** 2);
    expect(certa("achar-altura-por-pitagoras")).toBe(`${h} cm`);
    const h2 = Math.sqrt(5 ** 2 - 3 ** 2);
    const v = (36 * h2) / 3;
    expect(certa("volume-pelo-apotema")).toBe(`${v} cm³`);
  });

  it("desafios", () => {
    const m = 3;
    const h = 4;
    const ap = Math.hypot(m, h);
    const at = 36 + 4 * ((6 * ap) / 2);
    expect(certa("area-total-pelos-dados-base-h")).toBe(`${at} cm²`);
    const apD2 = 4;
    const arestaLat = Math.hypot(apD2, 3);
    expect(certa("aresta-lateral-piramide")).toBe("5 cm");
    expect(arestaLat).toBe(5);
    expect(certa("tetraedro-regular-area")).toBe(`${4 * 5} cm²`);
    expect(certa("dobrar-lado-base-piramide")).toBe("4");
    const vOctaedro = 2 * ((36 * 4) / 3);
    expect(certa("octaedro-duas-piramides")).toBe(`${vOctaedro} cm³`);
  });

  it("vestibular confere gabarito ENEM", () => {
    expect(certa("enem-2009-piramide-pentagonal")).toBe(
      "Tem 5 faces; se o plano interceptar todas, a interseção tem 5 lados",
    );
  });
});
