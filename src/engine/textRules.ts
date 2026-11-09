// Regras de texto do projeto, aplicadas por máquina (lint de conteúdo e testes).
export const MAX_CHARS = 140;
export const MAX_SENTENCES = 2;

export const BLACKLIST = [
  "vamos mergulhar",
  "fascinante",
  "desvende",
  "jornada",
  "magico",
  "magica",
  "e importante notar",
  "prepare-se",
];

const EMOJI = /\p{Extended_Pictographic}/u;

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Conta frases: termina em . ! ? seguido de espaço ou fim. "5,0" não quebra frase. */
export function countSentences(text: string): number {
  const parts = text
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter((p) => p.trim().length > 0);
  return parts.length;
}

export function checkLine(text: string): string[] {
  const problems: string[] = [];
  const len = [...text].length;
  if (len > MAX_CHARS) problems.push(`${len} caracteres (máximo ${MAX_CHARS})`);
  const n = countSentences(text);
  if (n > MAX_SENTENCES) problems.push(`${n} frases (máximo ${MAX_SENTENCES})`);
  if (EMOJI.test(text)) problems.push("contém emoji");
  const folded = fold(text);
  for (const term of BLACKLIST) {
    if (new RegExp(`(^|[^a-z])${term.replace(/[-]/g, "\\-")}`).test(folded)) {
      problems.push(`termo proibido: "${term}"`);
    }
  }
  return problems;
}

export function hasEmoji(text: string): boolean {
  return EMOJI.test(text);
}
