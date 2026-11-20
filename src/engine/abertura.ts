// Abertura de uma aula: o JSON da aula e o chunk do player (todos os widgets, passos e treino) são baixados
// sob demanda. Regras (B58, a partir da revisão B55 da B52):
// - O carregador guarda o módulo depois que ele chega, mas esquece a promessa rejeitada: "Tentar de novo"
//   faz um import() novo de verdade (React.lazy guardava a rejeição para sempre e a aula ficava em branco).
// - Ao abrir uma aula, dados e player são pedidos juntos; o player não espera o JSON.
// - Pré-carga do player só na trilha, quando o navegador fica ocioso, e nunca com economia de dados,
//   conexão lenta (2G/3G) ou offline. Sair da trilha cancela o agendamento.
import { useEffect } from "react";
import { loadLesson, type LoadResult } from "./content";

export type ModuloPlayer = typeof import("./LessonPlayer");

export interface CarregadorPlayer {
  /** Promessa do módulo; pedidos simultâneos compartilham o mesmo download. */
  carregar(): Promise<ModuloPlayer>;
  /** O módulo, se já chegou. */
  pronto(): ModuloPlayer | null;
}

export function criarCarregadorPlayer(importar: () => Promise<ModuloPlayer>): CarregadorPlayer {
  let modulo: ModuloPlayer | null = null;
  let promessa: Promise<ModuloPlayer> | null = null;
  return {
    carregar() {
      if (modulo) return Promise.resolve(modulo);
      promessa ??= importar().then(
        (m) => (modulo = m),
        (erro: unknown) => {
          promessa = null; // a próxima tentativa pede o chunk de novo
          throw erro;
        },
      );
      return promessa;
    },
    pronto: () => modulo,
  };
}

export const carregadorPlayer = criarCarregadorPlayer(() => import("./LessonPlayer"));

export interface DepsAbertura {
  dados: (arquivo: string) => Promise<LoadResult>;
  player: () => Promise<ModuloPlayer>;
}

const depsPadrao: DepsAbertura = { dados: loadLesson, player: () => carregadorPlayer.carregar() };

/** Começa os dois downloads de uma aula ao mesmo tempo (o player primeiro: é o maior). */
export function iniciarAbertura(arquivo: string, deps: DepsAbertura = depsPadrao) {
  const player = deps.player();
  const dados = deps.dados(arquivo);
  return { player, dados };
}

interface NavegadorParcial {
  onLine?: boolean;
  connection?: { saveData?: boolean; effectiveType?: string };
}

const CONEXOES_LENTAS = new Set(["slow-2g", "2g", "3g"]);

/** Pré-carregar só quando nada indica rede cara ou lenta (os sinais nem sempre existem; sem eles, pode). */
export function devePreCarregar(nav: NavegadorParcial | undefined = typeof navigator === "undefined" ? undefined : navigator): boolean {
  if (!nav) return false;
  if (nav.onLine === false) return false;
  const c = nav.connection;
  if (c?.saveData) return false;
  if (c?.effectiveType && CONEXOES_LENTAS.has(c.effectiveType)) return false;
  return true;
}

export interface DepsPreCarga {
  nav?: NavegadorParcial;
  carregador?: CarregadorPlayer;
  /** Agenda `fn` para quando o navegador estiver ocioso; devolve a função que cancela. */
  agendar?: (fn: () => void) => () => void;
}

function agendarOcioso(fn: () => void): () => void {
  if (typeof requestIdleCallback === "function") {
    const id = requestIdleCallback(fn, { timeout: 4000 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 2000);
  return () => clearTimeout(id);
}

/** Agenda a pré-carga do player se for o caso; devolve o cancelamento (ou nada, se não agendou). */
export function agendarPreCarga(ativo: boolean, deps: DepsPreCarga = {}): (() => void) | undefined {
  const carregador = deps.carregador ?? carregadorPlayer;
  const nav = "nav" in deps ? deps.nav : typeof navigator === "undefined" ? undefined : navigator;
  if (!ativo || carregador.pronto() || !devePreCarregar(nav)) return undefined;
  return (deps.agendar ?? agendarOcioso)(() => {
    // A rede pode ter mudado enquanto esperava; a falha aqui é silenciosa (a abertura da aula tenta de novo).
    if (devePreCarregar(nav)) void carregador.carregar().catch(() => {});
  });
}

/** Pré-carga do player enquanto `ativo` (a trilha está na tela). */
export function usePreCargaPlayer(ativo: boolean) {
  useEffect(() => agendarPreCarga(ativo), [ativo]);
}
