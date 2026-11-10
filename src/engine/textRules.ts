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

/**
 * Fim de frase: . ? ou ! seguido de espaço. O ! de fatorial não conta: colado a um número
 * ("3! = 6"), a um fecha-parênteses ("(n − 1)!") ou a uma letra solta ("n!", "k!").
 * Exclamação comum ("Muito bem! Certo.") continua quebrando frase.
 */
const FIM_DE_FRASE = /(?<=[.?]|(?<![\p{N})])(?<!(?:^|[^\p{L}])\p{L})!)\s+/u;

/** Conta frases: termina em . ! ? seguido de espaço ou fim. "5,0" e "3!" não quebram frase. */
export function countSentences(text: string): number {
  const parts = text
    .trim()
    .split(FIM_DE_FRASE)
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
