// Progresso local do protótipo. Falhas de armazenamento (aba anônima, bloqueio) não quebram o app:
// ver ./armazenamento. O que vem do storage é validado: JSON nulo, array, valor escalar ou entradas
// corrompidas contam como ausentes, preservando as entradas válidas.
import { armazenamento, lerChave, lerJson, type Leitor } from "./armazenamento";

const KEY = "mat:progress:v1";

export type Progress = Record<string, { completedAt: string }>;

/** Mantém só as entradas no formato { completedAt: string }; qualquer outra coisa vira {}. */
export function normalizarProgresso(valor: unknown): Progress {
  if (typeof valor !== "object" || valor === null || Array.isArray(valor)) return {};
  const p: Progress = {};
  for (const [chave, entrada] of Object.entries(valor)) {
    if (typeof entrada === "object" && entrada !== null && typeof (entrada as { completedAt?: unknown }).completedAt === "string")
      p[chave] = { completedAt: (entrada as { completedAt: string }).completedAt };
  }
  return p;
}

export function getProgress(storage?: Leitor | null): Progress {
  return normalizarProgresso(lerJson(lerChave(KEY, storage)));
}

export function markComplete(aulaKey: string): void {
  const p = getProgress();
  p[aulaKey] = { completedAt: new Date().toISOString() };
  armazenamento.gravar(KEY, JSON.stringify(p));
}
