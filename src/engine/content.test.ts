import { describe, expect, it } from "vitest";
import { listAulas, loadLesson, taxonomy } from "./content";

describe("carregamento sob demanda", () => {
  it("mantém a trilha síncrona e carrega uma aula por Promise", async () => {
    expect(taxonomy.pilares).toHaveLength(3);
    const entry = listAulas().find((a) => a.arquivo)!;
    const pending = loadLesson(entry.arquivo!);
    expect(pending).toBeInstanceOf(Promise);
    const result = await pending;
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.lesson.id).toBe(entry.key.split("/").at(-1));
  });
  it("mantém o erro de arquivo inexistente", async () => {
    expect(await loadLesson("ausente.json")).toEqual({ ok: false, error: "Arquivo não encontrado: content/ausente.json" });
  });
});
