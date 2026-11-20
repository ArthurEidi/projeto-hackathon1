// Acesso seguro ao localStorage. Em alguns navegadores (cookies bloqueados, modos privados, iframes),
// até ler a propriedade `window.localStorage` lança SecurityError, e getItem/setItem podem lançar
// (QuotaExceededError). Por isso o Storage é resolvido dentro do try, a cada acesso, e tudo o que se
// grava também fica numa cópia em memória: sem armazenamento, o estado vale para esta visita.

export type Leitor = Pick<Storage, "getItem">;
export type Gravador = Pick<Storage, "getItem" | "setItem">;

export interface Armazenamento {
  ler(chave: string): string | null;
  gravar(chave: string, valor: string): void;
}

/** O localStorage do navegador, ou null se não existir ou se até acessá-lo lançar. */
export function storageDoNavegador(): Gravador | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function criarArmazenamento(obter: () => Gravador | null = storageDoNavegador): Armazenamento {
  const memoria = new Map<string, string>();
  return {
    ler(chave) {
      // O que já foi gravado nesta visita vale mais: se a gravação no storage falhou, ele ficou velho.
      if (memoria.has(chave)) return memoria.get(chave)!;
      try {
        return obter()?.getItem(chave) ?? null;
      } catch {
        return null;
      }
    },
    gravar(chave, valor) {
      memoria.set(chave, valor);
      try {
        obter()?.setItem(chave, valor);
      } catch {
        /* sem armazenamento: o valor vale só para esta visita */
      }
    },
  };
}

/** Armazenamento do app (localStorage com reserva em memória). */
export const armazenamento = criarArmazenamento();

/**
 * Leitura com injeção para testes: `undefined` (parâmetro omitido) usa o armazenamento do app;
 * `null` explícito significa "sem armazenamento"; um objeto com getItem é lido dentro do try.
 */
export function lerChave(chave: string, storage: Leitor | null | undefined): string | null {
  if (storage === undefined) return armazenamento.ler(chave);
  try {
    return storage?.getItem(chave) ?? null;
  } catch {
    return null;
  }
}

/** JSON.parse que devolve `undefined` (em vez de lançar) para texto ausente ou malformado. */
export function lerJson(texto: string | null): unknown {
  if (texto === null) return undefined;
  try {
    return JSON.parse(texto) as unknown;
  } catch {
    return undefined;
  }
}
