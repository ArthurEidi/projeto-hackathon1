import taxonomyRaw from "../../content/taxonomy.json";
import { Lesson, Taxonomy } from "./schema";

const modules = import.meta.glob("../../content/**/aula-*.json", { import: "default" });
const PREFIX = "../../content/";

export const taxonomy: Taxonomy = Taxonomy.parse(taxonomyRaw);

export interface AulaEntry {
  key: string; // pilar/setor/unidade/aula
  pilarId: string;
  setorTitulo: string;
  unidadeTitulo: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  arquivo: string | null;
}

export function listAulas(): AulaEntry[] {
  const out: AulaEntry[] = [];
  for (const p of taxonomy.pilares)
    for (const s of p.setores)
      for (const u of s.unidades)
        for (const a of u.aulas)
          out.push({
            key: `${p.id}/${s.id}/${u.id}/${a.id}`,
            pilarId: p.id,
            setorTitulo: s.titulo,
            unidadeTitulo: u.titulo,
            numero: a.numero,
            titulo: a.titulo,
            subtitulo: a.subtitulo,
            arquivo: a.arquivo,
          });
  return out;
}

/** `rede: true`: o download falhou (conexão); tentar de novo pode resolver. Sem ela, o conteúdo é inválido. */
export type LoadResult = { ok: true; lesson: Lesson } | { ok: false; error: string; rede?: true };

export async function loadLesson(arquivo: string): Promise<LoadResult> {
  const importer = modules[PREFIX + arquivo];
  if (!importer) return { ok: false, error: `Arquivo não encontrado: content/${arquivo}` };
  let raw: unknown;
  try {
    raw = await importer();
  } catch {
    return { ok: false, rede: true, error: "Não foi possível baixar a aula. Confira a conexão e tente de novo." };
  }
  const parsed = Lesson.safeParse(raw);
  if (!parsed.success) return { ok: false, error: parsed.error.message };
  return { ok: true, lesson: parsed.data };
}
