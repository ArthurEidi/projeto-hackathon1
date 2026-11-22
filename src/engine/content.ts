import taxonomyRaw from "../../content/taxonomy.json";
import type { MateriaId } from "./materias";
import { Lesson, Taxonomy } from "./schema";

const modules = import.meta.glob("../../content/**/aula-*.json", { import: "default" });
const PREFIX = "../../content/";

export const taxonomy: Taxonomy = Taxonomy.parse(taxonomyRaw);

export interface AulaEntry {
  key: string; // pilar/setor/unidade/aula (em Física e Química, o id da disciplina ocupa o lugar do pilar)
  /** Área principal: Matemática (os 3 pilares), Física ou Química. */
  materia: MateriaId;
  pilarId: string;
  setorTitulo: string;
  unidadeTitulo: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  arquivo: string | null;
}

/** Pilares de Matemática seguidos das disciplinas extras, todos com a mesma forma (setores > unidades > aulas). */
export function gruposDaTaxonomia(): { materia: MateriaId; pilar: Taxonomy["pilares"][number] }[] {
  return [
    ...taxonomy.pilares.map((pilar) => ({ materia: "matematica" as const, pilar })),
    ...taxonomy.disciplinas.map((pilar) => ({ materia: pilar.id, pilar })),
  ];
}

let cache: AulaEntry[] | null = null;

export function listAulas(): AulaEntry[] {
  if (cache) return cache;
  const out: AulaEntry[] = [];
  for (const { materia, pilar: p } of gruposDaTaxonomia())
    for (const s of p.setores)
      for (const u of s.unidades)
        for (const a of u.aulas)
          out.push({
            key: `${p.id}/${s.id}/${u.id}/${a.id}`,
            materia,
            pilarId: p.id,
            setorTitulo: s.titulo,
            unidadeTitulo: u.titulo,
            numero: a.numero,
            titulo: a.titulo,
            subtitulo: a.subtitulo,
            arquivo: a.arquivo,
          });
  cache = out;
  return out;
}

/**
 * Próxima aula publicada depois de `key`, na ordem da trilha e dentro da mesma área. Em Matemática,
 * a aula seguinte da mesma unidade só conta se não estiver bloqueada; como a aula atual acabou de ser
 * concluída, ela sempre está liberada.
 */
export function proximaAula(key: string): AulaEntry | null {
  const aulas = listAulas();
  const i = aulas.findIndex((a) => a.key === key);
  if (i < 0) return null;
  const materia = aulas[i].materia;
  for (let j = i + 1; j < aulas.length; j++) {
    const a = aulas[j];
    if (a.materia !== materia) return null;
    if (a.arquivo !== null) return a;
  }
  return null;
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
