// Áreas e Volumes por Composição · Aula 01: passos completáveis e gabaritos conferidos com conta.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { montarCena } from "../widgets/common/solido/cenas";
import { Solido3d } from "../widgets/common/solido/params";

const L = Lesson.parse(
  JSON.parse(
    readFileSync(
      join(
        import.meta.dirname,
        "../../content/geometria/geometria-espacial/areas-e-volumes-por-composicao/aula-01.json",
      ),
      "utf8",
    ),
  ),
);

const certa = (id: string) =>
  Object.values(L.treino)
    .flat()
    .find((q) => q.id === id)!
    .options.find((o) => o.correct)!.label;

const step = (id: string) => L.steps.find((s) => s.id === id)!;

describe("passos da aula de areas e volumes por composicao", () => {
  it("cada interactive_canvas pode ser concluído", () => {
    for (const s of L.steps) {
      if (s.type !== "interactive_canvas") continue;
      const { metric, gte, lte } = s.complete_when;
      const slider = s.controls.find((c) => c.id === metric);
      if (slider) {
        if (gte !== undefined) expect(slider.max, s.id).toBeGreaterThanOrEqual(gte);
        if (lte !== undefined) expect(slider.min, s.id).toBeLessThanOrEqual(lte);
        expect(slider.initial, `${s.id} não pode começar concluído`).not.toBe(gte ?? lte);
        const alvo = (gte ?? lte)!;
        expect(((alvo - slider.min) / slider.step) % 1, `${s.id}: alvo fora do passo`).toBeCloseTo(0, 9);
      } else {
        expect(["volume_pi", "volume", "juntou"]).toContain(metric);
      }
    }
  });

  it("colar-silo-volume-e-area: cilindro 36π + cone 12π = 48π", () => {
    const s = step("colar-silo-volume-e-area");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = montarCena(Solido3d.parse({ modo: "composicao", montagem: "silo", r: 3, h: 4, hc: 4, juntar: 1 }), {});
    expect(c.metricas.volume_pi).toBeCloseTo(48, 9);
  });

  it("capsula-duas-semiesferas: cilindro 45π + esfera 36π = 81π", () => {
    const s = step("capsula-duas-semiesferas");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = montarCena(Solido3d.parse({ modo: "composicao", montagem: "capsula", r: 3, h: 5, juntar: 1 }), {});
    expect(c.metricas.volume_pi).toBeCloseTo(45 + 36, 9);
  });

  it("cavar-diminui-volume-aumenta-area: cilindro 36π - cone 12π = 24π", () => {
    const s = step("cavar-diminui-volume-aumenta-area");
    if (s.type !== "interactive_canvas") throw new Error();
    const c = montarCena(Solido3d.parse({ modo: "composicao", montagem: "cavidade", r: 3, h: 4, hc: 4, juntar: 1 }), {});
    expect(c.metricas.volume_pi).toBeCloseTo(24, 9);
  });

  it("desafio-volume-silo: cilindro 45π + cone 9π = 54π", () => {
    const s = step("desafio-volume-silo");
    if (s.type !== "micro_challenge") throw new Error();
    const c = montarCena(Solido3d.parse({ modo: "composicao", montagem: "silo", r: 3, h: 5, hc: 3, juntar: 1 }), {});
    expect(c.metricas.volume_pi).toBeCloseTo(54, 9);
    expect(s.options.find((o) => o.correct)?.label).toBe("54π m³");
  });

  it("fechamento: referências existem no glossário", () => {
    const s = step("fechamento");
    if (s.type !== "concept_lock") throw new Error();
    for (const t of s.formula) {
      if (t.ref) expect(L.glossario?.[t.ref]).toBeDefined();
    }
  });
});

describe("treino: gabaritos conferidos por conta", () => {
  it("F1 volume-cubo-mais-piramide: 64 + 16 = 80 cm³", () => {
    expect(64 + 16).toBe(80);
    expect(certa("volume-cubo-mais-piramide")).toBe("80 cm³");
  });

  it("F2 volume-bloco-com-furo: 200 - 50 = 150 cm³", () => {
    expect(200 - 50).toBe(150);
    expect(certa("volume-bloco-com-furo")).toBe("150 cm³");
  });

  it("F3 faces-dois-cubos-colados: 12 - 2 = 10 faces expostas", () => {
    expect(12 - 2).toBe(10);
    expect(certa("faces-dois-cubos-colados")).toBe("10");
  });

  it("F4 volume-capsula-pronta: 30 + 10 + 10 = 50 mm³", () => {
    expect(30 + 10 + 10).toBe(50);
    expect(certa("volume-capsula-pronta")).toBe("50 mm³");
  });

  it("M1 volume-capsula-por-medidas: 36π + 36π = 72π mm³", () => {
    const vCil = Math.PI * 3 ** 2 * 4;
    const vEsf = (4 / 3) * Math.PI * 3 ** 3;
    expect((vCil + vEsf) / Math.PI).toBeCloseTo(72, 9);
    expect(certa("volume-capsula-por-medidas")).toBe("72π mm³");
  });

  it("M2 area-externa-capsula: 24π + 36π = 60π mm²", () => {
    const aCil = 2 * Math.PI * 3 * 4;
    const aEsf = 4 * Math.PI * 3 ** 2;
    expect((aCil + aEsf) / Math.PI).toBeCloseTo(60, 9);
    expect(certa("area-externa-capsula")).toBe("60π mm²");
  });

  it("M3 sorvete-casquinha-mais-bola: 18π + 18π = 36π cm³", () => {
    const vCone = (Math.PI * 3 ** 2 * 6) / 3;
    const vSemi = (2 / 3) * Math.PI * 3 ** 3;
    expect((vCone + vSemi) / Math.PI).toBeCloseTo(36, 9);
    expect(certa("sorvete-casquinha-mais-bola")).toBe("36π cm³");
  });

  it("D1 area-silo-com-fundo: 24π + 15π = 39π m²", () => {
    const aLatCil = 2 * Math.PI * 3 * 4;
    const aLatCone = Math.PI * 3 * 5;
    expect((aLatCil + aLatCone) / Math.PI).toBeCloseTo(39, 9);
    expect(certa("area-silo-com-fundo")).toBe("39π m²");
  });

  it("D2 area-cilindro-com-cone-cavado: 9π + 24π + 15π = 48π cm²", () => {
    const aFundo = Math.PI * 3 ** 2;
    const aLat = 2 * Math.PI * 3 * 4;
    const aCone = Math.PI * 3 * 5;
    expect((aFundo + aLat + aCone) / Math.PI).toBeCloseTo(48, 9);
    expect(certa("area-cilindro-com-cone-cavado")).toBe("48π cm²");
  });

  it("D3 transferir-esfera-para-cilindro: 36π / 9π = 4 cm", () => {
    const vEsf = (4 / 3) * Math.PI * 3 ** 3;
    const aBase = Math.PI * 3 ** 2;
    expect(vEsf / aBase).toBeCloseTo(4, 9);
    expect(certa("transferir-esfera-para-cilindro")).toBe("4 cm");
  });

  it("D4 tres-cubos-empilhados-area: 14 * 4 = 56 cm²", () => {
    expect(14 * 4).toBe(56);
    expect(certa("tres-cubos-empilhados-area")).toBe("56 cm²");
  });

  it("D5 lapis-cilindro-mais-cone: 3π - 1π = 2π cm³", () => {
    const vCil = Math.PI * 1 ** 2 * 3;
    const vCone = (Math.PI * 1 ** 2 * 3) / 3;
    expect((vCil - vCone) / Math.PI).toBeCloseTo(2, 9);
    expect(certa("lapis-cilindro-mais-cone")).toBe("2π cm³");
  });
});
