// Prismas e Paralelepípedos · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
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
        "../../content/geometria/geometria-espacial/prismas-e-paralelepipedos/aula-01.json",
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

  it("empilhar-camadas: volume para h = 4 vale 48", () => {
    const s = step("empilhar-camadas");
    if (s.type !== "interactive_canvas") throw new Error();
    const Ab = 4 * 3;
    expect(Ab * 4).toBe(48);
    expect(s.complete_when.gte).toBe(4);
  });

  it("paredes-e-tampas: perímetro 3+4+5=12 e área lateral 12·4=48", () => {
    const s = step("paredes-e-tampas");
    if (s.type !== "interactive_canvas") throw new Error();
    const per = 3 + 4 + 5;
    expect(per * 4).toBe(48);
    expect(s.complete_when.gte).toBe(100);
  });

  it("diagonal-do-bloco: diagonal do chão é 5 e diagonal espacial é 13", () => {
    const s = step("diagonal-do-bloco");
    if (s.type !== "interactive_canvas") throw new Error();
    const dChao = Math.hypot(3, 4);
    const dEspacial = Math.hypot(3, 4, 12);
    expect(dChao).toBe(5);
    expect(dEspacial).toBe(13);
    expect(s.complete_when.gte).toBe(2);
  });

  it("desafio-prisma: volume de 5 × 2 × 6 é 60", () => {
    const s = step("desafio-prisma");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("60 cm³");
    expect(5 * 2 * 6).toBe(60);
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    fechamentoOk(L);
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    expect(certa("volume-camadas-cubo")).toBe(String(3 * 2 * 4));
    expect(certa("fatia-inclinada-cavalieri")).toBe("Permanece o mesmo");
    expect(certa("paredes-retangulo-comprido")).toBe("Ao perímetro da base");
    expect(certa("faces-paralelepipedo")).toBe("6 faces e 2 bases");
  });

  it("médias", () => {
    const aTotal = 2 * (2 * 3 + 2 * 4 + 3 * 4);
    expect(certa("area-total-bloco")).toBe(`${aTotal} cm²`);
    const diag = Math.hypot(2, 3, 6);
    expect(certa("diagonal-espacial-236")).toBe(`${diag} cm`);
    const h = 60 / (5 * 4);
    expect(certa("altura-pelo-volume")).toBe(`${h} m`);
  });

  it("desafios", () => {
    expect(certa("diagonal-do-cubo")).toBe("5√3 cm");
    const piscina = 4 * 3 + 2 * (4 * 2 + 3 * 2);
    expect(certa("caixa-sem-tampa")).toBe(`${piscina} m²`);
    expect(certa("escala-dobrar-aresta-cubo")).toBe("4 e 8");
    const hexVolume = 6 * 4 * 5;
    expect(certa("prisma-hexagonal-regular")).toBe(`${hexVolume} cm³`);
    const aguaPedra = 20 * 15 * 2;
    expect(certa("nivel-agua-pedra-arquimedes")).toBe(`${aguaPedra} cm³`);
  });

  it("vestibular confere gabaritos ENEM", () => {
    expect(certa("enem-2022-piscina")).toBe("II");
    expect(certa("enem-2021-conteiner")).toBe("O dobro nas paredes e 4 vezes no piso");
    expect(certa("enem-2012-ceramica")).toBe(
      "48,8% menor que V, porque o volume diminui de a³ para (0,8a)³",
    );
  });
});
