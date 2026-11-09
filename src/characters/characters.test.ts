import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Lesson } from "../engine/schema";
import { tempoLeitura } from "./Conversa";
import { todosOsSprites } from "./sprites";

const publicDir = join(import.meta.dirname, "../../public/personagens");
const lessonRaw = JSON.parse(
  readFileSync(join(import.meta.dirname, "../../content/geometria/geometria-espacial/cones/aula-01.json"), "utf8"),
);

describe("personagens", () => {
  it("todo sprite usado pelo app existe em public/personagens", () => {
    const faltando = todosOsSprites().filter((f) => !existsSync(join(publicDir, `${f}.webp`)));
    expect(faltando).toEqual([]);
  });

  it("tempo de leitura cresce com o texto e fica entre 1,2 s e 3,5 s", () => {
    expect(tempoLeitura("Oi.")).toBe(1200);
    expect(tempoLeitura("a".repeat(140))).toBe(3500);
    expect(tempoLeitura("a".repeat(60))).toBeGreaterThan(tempoLeitura("a".repeat(40)));
  });
});

describe("dúvida da Tati", () => {
  it("quando é omitido, a dúvida espera o fim do passo", () => {
    const raw = structuredClone(lessonRaw);
    raw.steps[0].duvida = { pergunta: "E se eu girar só meia volta?", resposta: "Aí sai só metade do cone." };
    expect(Lesson.parse(raw).steps[0].duvida?.quando).toBe("fim");
  });

  it("fechamento recusa dúvida no fim", () => {
    const raw = structuredClone(lessonRaw);
    const lock = raw.steps.find((s: { type: string }) => s.type === "concept_lock");
    lock.duvida = { quando: "fim", pergunta: "E agora?", resposta: "Agora acabou." };
    expect(Lesson.safeParse(raw).success).toBe(false);
    lock.duvida.quando = "inicio";
    expect(Lesson.safeParse(raw).success).toBe(true);
  });
});
