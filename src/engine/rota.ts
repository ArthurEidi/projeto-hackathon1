// Rotas por hash. "#/" (ou vazio) é a página inicial; "#/materia/<id>" é a área (Matemática, Física ou
// Química); "#/aula/<pilar>/<setor>/<unidade>/<aula>" é uma aula.
// O parser nunca lança: escape percentual inválido (decodeURIComponent lançaria URIError), chave vazia
// ("#/aula", "#/aula/") e chave inexistente viram "aula inválida", e o App mostra a tela amigável.
// Qualquer outro hash ("#/nao-existe", "#/materia/historia") abre a página inicial. A query dentro do
// fragmento é separada do caminho e lida com URLSearchParams: parâmetros desconhecidos são ignorados;
// "passo=N" (1 = primeiro) só vale em desenvolvimento e só com N inteiro positivo.
import type { MateriaId } from "./materias";

export type Rota =
  | { tipo: "trilha" }
  | { tipo: "materia"; id: MateriaId }
  | { tipo: "aula"; aula: string | null; passo: number };

const MATERIAS_VALIDAS: readonly string[] = ["matematica", "fisica", "quimica"];

export function lerRota(hash: string, dev = false): Rota {
  const fragmento = hash.startsWith("#") ? hash.slice(1) : hash;
  const q = fragmento.indexOf("?");
  const caminho = q >= 0 ? fragmento.slice(0, q) : fragmento;
  const query = q >= 0 ? fragmento.slice(q + 1) : "";

  const mat = caminho.match(/^\/?materia\/([a-z]+)\/?$/);
  if (mat) return MATERIAS_VALIDAS.includes(mat[1]) ? { tipo: "materia", id: mat[1] as MateriaId } : { tipo: "trilha" };

  const m = caminho.match(/^\/?aula(?:\/(.*))?$/);
  if (!m) return { tipo: "trilha" };

  const resto = (m[1] ?? "").replace(/\/+$/, "");
  let aula: string | null = null;
  if (resto) {
    try {
      aula = decodeURIComponent(resto);
    } catch {
      aula = null;
    }
  }

  let passo = 0;
  if (dev) {
    const p = new URLSearchParams(query).get("passo");
    if (p !== null && /^\d+$/.test(p) && Number(p) >= 1) passo = Number(p) - 1;
  }
  return { tipo: "aula", aula, passo };
}

export const hashDaMateria = (id: MateriaId) => `#/materia/${id}`;
export const hashDaAula = (key: string) => `#/aula/${key}`;
