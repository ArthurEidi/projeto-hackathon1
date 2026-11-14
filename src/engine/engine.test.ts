import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { project, screenArea, type Camera } from "../math3d/project";
import { apex, distance, generatrixLength, rim, DEG } from "../math3d/revolve";
import { isComplete } from "./completion";
import { collectLines, Lesson } from "./schema";
import { checkLine, countSentences } from "./textRules";
import { FALA_PERGUNTA, todasAsFalasDoTreino } from "../treino/falas";

const lessonRaw = JSON.parse(
  readFileSync(join(import.meta.dirname, "../../content/geometria/geometria-espacial/cones/aula-01.json"), "utf8"),
);

describe("geometria do cone", () => {
  it("todo ponto do aro fica à mesma distância do vértice (a geratriz)", () => {
    const h = 4;
    const r = 3;
    for (let t = 0; t < 360; t += 7) {
      expect(distance(apex(h), rim(r, t * DEG))).toBeCloseTo(generatrixLength(h, r), 10);
    }
    expect(generatrixLength(4, 3)).toBe(5);
  });

  it("retalho do lado da câmera é de frente; o oposto é de trás", () => {
    const cam: Camera = { yaw: 0, pitch: 20 * DEG, scale: 50, cx: 0, cy: 0, target: [0, 2, 0] };
    const P = (t: number) => project(rim(3, t * DEG), cam);
    const A = project(apex(4), cam);
    expect(screenArea(A, P(89), P(91))).toBeGreaterThan(0);
    expect(screenArea(A, P(269), P(271))).toBeLessThan(0);
  });

  it("pitch positivo faz a parte de trás subir na tela", () => {
    const cam: Camera = { yaw: 0, pitch: 20 * DEG, scale: 50, cx: 0, cy: 0, target: [0, 0, 0] };
    expect(project(rim(3, 270 * DEG), cam).y).toBeLessThan(project(rim(3, 90 * DEG), cam).y);
  });
});

describe("motor", () => {
  it("condição de conclusão", () => {
    expect(isComplete({ metric: "theta", gte: 360 }, { theta: 359 })).toBe(false);
    expect(isComplete({ metric: "theta", gte: 360 }, { theta: 360 })).toBe(true);
    expect(isComplete({ metric: "arc", gte: 180 }, {})).toBe(false);
  });

  it("a aula 01 passa no schema e usa os 4 tipos de tela", () => {
    const L = Lesson.parse(lessonRaw);
    expect(new Set(L.steps.map((s) => s.type))).toEqual(
      new Set(["interactive_canvas", "manim_video", "micro_challenge", "concept_lock"]),
    );
  });

  it("schema recusa desafio com duas opções corretas", () => {
    const bad = structuredClone(lessonRaw);
    const ch = bad.steps.find((s: { type: string }) => s.type === "micro_challenge");
    ch.options.forEach((o: { correct: boolean }) => (o.correct = true));
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("schema recusa widget desconhecido", () => {
    const bad = structuredClone(lessonRaw);
    bad.steps[0].widget = "nao_existe";
    expect(Lesson.safeParse(bad).success).toBe(false);
  });
});

describe("treino pós-aula", () => {
  it("aula 01 tem 4 fáceis + 3 médias, 5 desafios e 4 de vestibular", () => {
    const L = Lesson.parse(lessonRaw);
    expect(L.treino.faceis).toHaveLength(4);
    expect(L.treino.medias).toHaveLength(3);
    expect(L.treino.desafios).toHaveLength(5);
    expect(L.treino.vestibular).toHaveLength(4);
  });

  it("questão de vestibular exige fonte, e a adaptação precisa ser descrita", () => {
    const bad = structuredClone(lessonRaw);
    delete bad.treino.vestibular[0].fonte;
    expect(Lesson.safeParse(bad).success).toBe(false);
    const bad2 = structuredClone(lessonRaw);
    delete bad2.treino.vestibular[0].fonte.adaptacao;
    expect(Lesson.safeParse(bad2).success).toBe(false);
  });

  it("gabaritos dos desafios e do vestibular batem com g² = h² + r²", () => {
    const L = Lesson.parse(lessonRaw);
    const certa = (id: string) =>
      [...L.treino.desafios, ...L.treino.vestibular].find((q) => q.id === id)!.options.find((o) => o.correct)!.label;
    const g = (h: number, r: number) => Math.hypot(h, r);
    expect(certa("eixo-cateto-menor")).toBe("5"); // o cateto do eixo vira a altura
    expect(2 * Math.sqrt(10 ** 2 - 8 ** 2)).toBe(Number(certa("diametro-10-8")));
    expect(g(3, 3)).toBeCloseTo(3 * Math.SQRT2, 10);
    expect(certa("geratriz-3-3")).toBe("3√2");
    expect(Math.sqrt(50 - 25)).toBe(Number(certa("altura-5-5raiz2")));
    expect(g(12, 9) - g(12, 5)).toBe(Number(certa("dois-cones")));
    // ENEM 2022/153: altura fixa e volume 81% → r = √0,81 · 4 = 3,60
    expect((Math.sqrt(0.81) * 4).toFixed(2).replace(".", ",")).toBe(certa("enem-2022-cone"));
    const gCefet = (16 - 2 * 3) / 2;
    expect(`${Math.sqrt(gCefet ** 2 - 9)} m`).toBe(certa("cefetpr-secao-meridiana"));
    const r = Math.sqrt(3); // cone equilátero: g = 2r = 2√3
    const h = Math.sqrt(12 - 3);
    expect(((2 * r * h) / 2) * Math.sqrt(3)).toBeCloseTo(Number(certa("ufsc-cone-equilatero")), 10);
    const rUpe = 96 / (2 * (5 / 3) + 2); // g = 5r/3 quando h = 4r/3
    expect(`${Math.round((5 / 3) * rUpe * 1e9) / 1e9} cm`).toBe(certa("upe-perimetro-96"));
  });

  it("schema recusa chave desconhecida na opção do desafio (ex.: override no lugar de figure)", () => {
    const bad = structuredClone(lessonRaw);
    const desafio = bad.steps.find((s: { type: string }) => s.type === "micro_challenge");
    desafio.options[0].override = { highlight: ["c1"] };
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("schema recusa treino sem as 7 perguntas", () => {
    const bad = structuredClone(lessonRaw);
    bad.treino.medias.pop();
    expect(Lesson.safeParse(bad).success).toBe(false);
    delete bad.treino;
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("schema recusa pergunta com duas corretas", () => {
    const bad = structuredClone(lessonRaw);
    bad.treino.faceis[0].options.forEach((o: { correct: boolean }) => (o.correct = true));
    expect(Lesson.safeParse(bad).success).toBe(false);
  });

  it("falas fixas do treino respeitam as regras de texto", () => {
    for (const t of todasAsFalasDoTreino()) expect(checkLine(t), t).toEqual([]);
    // Uma fala por pergunta em cada etapa: 7 do treino básico, 5 desafios e 4 de vestibular.
    expect(FALA_PERGUNTA.basico).toHaveLength(7);
    expect(FALA_PERGUNTA.desafio).toHaveLength(5);
    expect(FALA_PERGUNTA.vestibular).toHaveLength(4);
  });
});

describe("regras de texto", () => {
  it("todas as falas da aula 01 respeitam as regras", () => {
    for (const { path, text } of collectLines(Lesson.parse(lessonRaw))) {
      expect(checkLine(text), `${path}: ${text}`).toEqual([]);
    }
  });

  it("detecta excesso, emoji e clichê", () => {
    expect(checkLine("a".repeat(141))).toHaveLength(1);
    expect(checkLine("Um. Dois. Três.")[0]).toMatch(/3 frases/);
    expect(checkLine("Muito bem \u{1F389}")).toContain("contém emoji");
    expect(checkLine("Uma jornada pelo cone.")[0]).toMatch(/jornada/);
    expect(checkLine("Isso é MÁGICO.")[0]).toMatch(/magico/);
  });

  it("decimal com vírgula não conta como frase", () => {
    expect(countSentences("A geratriz mede 5,0. Ela não muda.")).toBe(2);
  });

  it("! de fatorial não conta como fim de frase", () => {
    expect(countSentences("Com 4 pessoas: 4 · 3 · 2 · 1 = 24. Isso é 4! = 24.")).toBe(2);
    expect(countSentences("Isso. 5 · 4 · 3! / 3! = 5 · 4 = 20.")).toBe(2);
    expect(countSentences("120 é só o 5!. Dividindo por 3! = 6, fica 20.")).toBe(2);
    expect(countSentences("O arranjo conta cada grupo k! vezes. Por isso divide por k!.")).toBe(2);
    expect(countSentences("Vale n! = n · (n − 1)! sempre.")).toBe(1);
    expect(checkLine("Certo. E isso mantém 1! = 1 · 0! funcionando.")).toEqual([]);
  });

  it("exclamação comum continua quebrando frase", () => {
    expect(countSentences("Muito bem! Acertou. De novo!")).toBe(3);
    expect(checkLine("Uau! Isso. Aquilo.")[0]).toMatch(/3 frases/);
  });
});
