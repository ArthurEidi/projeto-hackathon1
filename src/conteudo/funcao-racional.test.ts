// Função racional · Aula 01: os passos são completáveis e os gabaritos batem com a conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { assintotas, avaliar, type CurvaResolvida } from "../widgets/common/plot2d";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/algebra/funcoes/funcao-racional/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const rac = (a: number, b: number, c = 0): CurvaResolvida => ({
  tipo: "racional",
  a,
  b,
  c,
});
const afim = (a: number, b: number, furos: number[] = []): CurvaResolvida => ({
  tipo: "afim",
  a,
  b,
  c: 0,
  ...(furos.length ? { furos } : {}),
});

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric } = s.complete_when;
      expect(["ramos_visitados", "parametros_testados", "no_furo", "ponto_x"]).toContain(metric);
    }
  });

  it("dois-ramos: 1/x tem assíntota vertical em x = 0 e dois ramos", () => {
    const s = step("dois-ramos");
    if (s.type !== "interactive_canvas") throw new Error();
    const r = rac(1, 0);
    expect(avaliar(r, -1)).toBe(-1);
    expect(avaliar(r, 1)).toBe(1);
    expect(Number.isNaN(avaliar(r, 0))).toBe(true);
    expect(s.complete_when.metric).toBe("ramos_visitados");
    expect(s.complete_when.gte).toBe(2);
  });

  it("mover-assintotas: sliders h e k alteram as assíntotas para x = h e y = k", () => {
    const s = step("mover-assintotas");
    if (s.type !== "interactive_canvas") throw new Error();
    expect(s.controls.map((c) => c.id)).toEqual(["h", "k"]);
    const r = rac(1, 1, 2);
    expect(assintotas(r)).toEqual({ x: 1, y: 2 });
    expect(s.complete_when.metric).toBe("parametros_testados");
    expect(s.complete_when.gte).toBe(2);
  });

  it("buraco-ou-assintota: (x−1)/(x−1) tem furo em x = 1", () => {
    const s = step("buraco-ou-assintota");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = afim(0, 1, [1]);
    expect(avaliar(c, 0)).toBe(1);
    expect(Number.isNaN(avaliar(c, 1))).toBe(true);
    expect(s.complete_when.metric).toBe("no_furo");
    expect(s.complete_when.gte).toBe(1);
  });

  it("desafio-fronteira: f(x) = 1/(x−2)+1 tem assíntotas em x = 2 e y = 1", () => {
    const s = step("desafio-fronteira");
    if (s.type !== "micro_challenge") throw new Error();
    expect(s.options.find((o) => o.correct)!.label).toBe("x=2 e y=1");
    expect(s.options.find((o) => !o.correct)!.label).toBe("x=−2 e y=−1");
  });

  it("fechamento: cada letra tem significado no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref], t.text).toBeDefined();
    }
  });
});

describe("gabaritos do treino", () => {
  it("fáceis", () => {
    // F1: 1/x zera denominador em x = 0
    expect(certa("f1-funcao-racional")).toBe("0");

    // F2: 1 / (-2) = -1/2
    expect(certa("f2-funcao-racional")).toBe("−1/2");

    // F3: Assíntota vertical de 1/(x-3): x - 3 = 0 => x = 3
    expect(certa("f3-funcao-racional")).toBe("x=3");

    // F4: Domínio de 1/(x+2): x ≠ -2
    expect(certa("f4-funcao-racional")).toBe("x≠−2");
  });

  it("médias", () => {
    // M1: 1/2 + 1 = 3/2
    expect(certa("m1-funcao-racional")).toBe("3/2");

    // M2: Assíntota horizontal de 1/x + 2: y = 2
    expect(certa("m2-funcao-racional")).toBe("y=2");

    // M3: (x-1)/(x-1) para x ≠ 1 vale 1
    expect(certa("m3-funcao-racional")).toBe("1");
  });

  it("desafios", () => {
    // D1: Domínio de (x+1)/(x-2): x ≠ 2
    expect(certa("d1-funcao-racional")).toBe("x≠2");

    // D2: 2/(x-1) em x = 3: 2/(3-1) = 1
    expect(Number(certa("d2-funcao-racional"))).toBe(1);

    // D3: Assíntota horizontal de 1/(x+1) - 2: y = -2
    expect(certa("d3-funcao-racional")).toBe("y=−2");

    // D4: Buraco de (x-2)/(x-2): (2;1)
    expect(certa("d4-funcao-racional")).toBe("(2;1)");

    // D5: 3/(x-1) = 1 => x - 1 = 3 => x = 4
    expect(Number(certa("d5-funcao-racional"))).toBe(4);
  });

  it("vestibular pendente fica vazio", () => {
    expect(L.treino.vestibular).toEqual([]);
  });
});
