// Progresso local do protótipo. Falhas de armazenamento (aba anônima, bloqueio) não quebram o app.
const KEY = "mat:progress:v1";

export type Progress = Record<string, { completedAt: string }>;

export function getProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function markComplete(aulaKey: string): void {
  try {
    const p = getProgress();
    p[aulaKey] = { completedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* sem armazenamento: o progresso vale só para esta sessão */
  }
}
