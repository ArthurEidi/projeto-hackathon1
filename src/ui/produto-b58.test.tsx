// B58: correções da revisão de código da B52 (docs/revisao/codigo-b52-revisao.md, B55).
// No código anterior à B58 cada teste falha (ver docs/visual/produto-b58.md). O módulo novo entra por import
// dinâmico e as funções novas pelo namespace, para cada teste falhar sozinho no código antigo.
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as AppMod from "../App";
import { App } from "../App";
import { listAulas } from "../engine/content";
import * as HomeMod from "../Home";

type Abertura = typeof import("../engine/abertura");
const abertura = () => import("../engine/abertura") as Promise<Abertura>;

const primeira = listAulas().find((a) => a.arquivo !== null)!;
const falhaDeRede = () => new TypeError("Failed to fetch dynamically imported module: /assets/LessonPlayer-x.js");
const moduloFalso = { LessonPlayer: () => null } as unknown as Awaited<ReturnType<Abertura["carregadorPlayer"]["carregar"]>>;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("B58 — bloqueio: chunk do player rejeitado", () => {
  it("import dinâmico rejeitado: o carregador não guarda a rejeição; a nova tentativa baixa de novo e abre", async () => {
    const { criarCarregadorPlayer } = await abertura();
    const importar = vi.fn<() => Promise<typeof moduloFalso>>().mockRejectedValueOnce(falhaDeRede()).mockResolvedValueOnce(moduloFalso);
    const carregador = criarCarregadorPlayer(importar);

    await expect(carregador.carregar()).rejects.toThrow("Failed to fetch dynamically imported module");
    expect(carregador.pronto()).toBeNull();

    await expect(carregador.carregar()).resolves.toBe(moduloFalso);
    expect(importar).toHaveBeenCalledTimes(2);
    expect(carregador.pronto()).toBe(moduloFalso);

    // Depois de carregado, não baixa mais.
    await carregador.carregar();
    expect(importar).toHaveBeenCalledTimes(2);
  });

  it("pedidos simultâneos (pré-carga e abertura) compartilham o download, e a rejeição chega aos dois", async () => {
    const { criarCarregadorPlayer } = await abertura();
    let rejeitar!: (e: unknown) => void;
    const importar = vi.fn(() => new Promise<typeof moduloFalso>((_, r) => (rejeitar = r)));
    const carregador = criarCarregadorPlayer(importar);
    const preCarga = carregador.carregar().catch(() => "pré-carga falhou");
    const abrindo = carregador.carregar().catch(() => "abertura falhou");
    expect(importar).toHaveBeenCalledTimes(1);
    rejeitar(falhaDeRede());
    expect(await preCarga).toBe("pré-carga falhou");
    expect(await abrindo).toBe("abertura falhou");
  });

  it("tela de falha amigável tem 'Tentar de novo' e 'Voltar à trilha', sem caminho interno", () => {
    expect(AppMod.FalhaAula).toBeTypeOf("function");
    const html = renderToStaticMarkup(<AppMod.FalhaAula motivo="rede" onTentar={() => {}} onVoltar={() => {}} />);
    expect(html).toContain("Não foi possível abrir a aula");
    expect(html).toContain("Tentar de novo");
    expect(html).toContain("Voltar à trilha");
    expect(html).not.toContain("content/");
    expect(html).toMatch(/<h1[^>]*tabindex="-1"/);
  });
});

describe("B58 — primeira abertura sem pré-carga", () => {
  it("com os dados da aula retidos, o player já foi pedido", async () => {
    const { iniciarAbertura } = await abertura();
    const dados = vi.fn(() => new Promise<never>(() => {})); // resposta retida
    const player = vi.fn(() => new Promise<typeof moduloFalso>(() => {}));
    iniciarAbertura(primeira.arquivo!, { dados, player });
    expect(dados).toHaveBeenCalledWith(primeira.arquivo);
    expect(player).toHaveBeenCalledTimes(1);
  });
});

describe("B58 — rede lenta e economia de dados", () => {
  it("devePreCarregar: não com economia de dados, 2G/3G ou offline; sim sem sinais ou em 4G", async () => {
    const { devePreCarregar } = await abertura();
    expect(devePreCarregar({ onLine: true })).toBe(true);
    expect(devePreCarregar({ onLine: true, connection: { effectiveType: "4g" } })).toBe(true);
    expect(devePreCarregar({ onLine: true, connection: { saveData: true, effectiveType: "4g" } })).toBe(false);
    for (const t of ["slow-2g", "2g", "3g"]) expect(devePreCarregar({ onLine: true, connection: { effectiveType: t } }), t).toBe(false);
    expect(devePreCarregar({ onLine: false })).toBe(false);
    vi.stubGlobal("navigator", undefined); // sem navegador (ex.: renderização no servidor): não pré-carrega
    expect(devePreCarregar()).toBe(false);
  });

  it("agendarPreCarga: só na trilha, cancelável ao sair, e reconfere a rede na hora de baixar", async () => {
    const { agendarPreCarga, criarCarregadorPlayer } = await abertura();
    const importar = vi.fn(async () => moduloFalso);
    const carregador = criarCarregadorPlayer(importar);
    let tarefa: (() => void) | null = null;
    const cancelar = vi.fn();
    const agendar = vi.fn((fn: () => void) => ((tarefa = fn), cancelar));

    // Fora da trilha (aula, rota inexistente): nada agendado.
    expect(agendarPreCarga(false, { nav: { onLine: true }, carregador, agendar })).toBeUndefined();
    // Economia de dados e 3G: nada agendado.
    expect(agendarPreCarga(true, { nav: { onLine: true, connection: { saveData: true } }, carregador, agendar })).toBeUndefined();
    expect(agendarPreCarga(true, { nav: { onLine: true, connection: { effectiveType: "3g" } }, carregador, agendar })).toBeUndefined();
    expect(agendar).not.toHaveBeenCalled();

    // Na trilha com rede boa: agenda; sair da trilha cancela.
    const nav = { onLine: true, connection: { effectiveType: "4g" } as { effectiveType: string; saveData?: boolean } };
    const sair = agendarPreCarga(true, { nav, carregador, agendar });
    expect(agendar).toHaveBeenCalledTimes(1);
    sair!();
    expect(cancelar).toHaveBeenCalledTimes(1);

    // Se a rede piorou até o navegador ficar ocioso, não baixa.
    nav.connection.saveData = true;
    tarefa!();
    expect(importar).not.toHaveBeenCalled();
    nav.connection.saveData = false;
    tarefa!();
    expect(importar).toHaveBeenCalledTimes(1);
  });
});

describe("B58 — foco recortado nas matérias", () => {
  it("matéria que recebe foco é trazida inteira para a vista da faixa", () => {
    const scrollIntoView = vi.fn();
    expect(HomeMod.mostrarInteiro).toBeTypeOf("function");
    HomeMod.mostrarInteiro({ scrollIntoView });
    expect(scrollIntoView).toHaveBeenCalledWith({ inline: "nearest", block: "nearest" });
  });
});

describe("B58 — espera acessível com saída", () => {
  it("a espera mostra 'Voltar à trilha' e anuncia numa região de status que existe em todas as telas", () => {
    vi.stubGlobal("location", { hash: `#/aula/${primeira.key}` });
    const aula = renderToStaticMarkup(<App />);
    expect(aula).toContain("Carregando aula…");
    expect(aula).toContain("Voltar à trilha");
    expect(aula).toMatch(/<p role="status" aria-live="polite" class="sr-only">Carregando aula…<\/p>/);

    vi.stubGlobal("location", { hash: "#/" });
    const trilha = renderToStaticMarkup(<App />);
    expect(trilha).toMatch(/<p role="status" aria-live="polite" class="sr-only"><\/p>/);
  });
});
