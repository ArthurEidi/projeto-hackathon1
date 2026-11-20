// B54: correções dos 7 achados da revisão de código da B49 parte 2 (docs/revisao/codigo-b49-revisao.md).
// Cada bloco reproduz o cenário do achado; no código anterior à B54 cada um falha (ver docs/visual/produto-b54.md).
// Módulos e funções novos entram por import dinâmico ou pelo namespace, para cada teste falhar sozinho no código antigo.
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App, AulaNaoEncontrada } from "../App";
import { listAulas, loadLesson } from "../engine/content";
import { LessonPlayer } from "../engine/LessonPlayer";
import { getProgress, markComplete } from "../engine/progress";
import * as HomeMod from "../Home";
import { chavesPrimeiraAula, Home, lerAbertos, lerPilarInicial } from "../Home";
import { palette } from "./palette";

const K_PROGRESSO = "mat:progress:v1";
const K_ABERTOS = "mat:trilha-aberta:v1";
const K_PILAR = "mat:pilar-ativo:v1";
const K_BOAS_VINDAS = "mat:boas-vindas:v1";

const mem = (dados: Record<string, string | null>) => ({ getItem: (k: string) => dados[k] ?? null });
const storage = (dados: Record<string, string>) => ({
  getItem: (k: string) => dados[k] ?? null,
  setItem: (k: string, v: string) => {
    dados[k] = v;
  },
});
const negado = () => new DOMException("Acesso negado", "SecurityError");

/** Instala `window.localStorage` e o global `localStorage`: um objeto, ou um getter que lança. */
function instalarStorage(s: object | "lanca") {
  const desc: PropertyDescriptor =
    s === "lanca"
      ? {
          configurable: true,
          get() {
            throw negado();
          },
        }
      : { configurable: true, value: s };
  const w = {};
  Object.defineProperty(w, "localStorage", desc);
  vi.stubGlobal("window", w);
  Object.defineProperty(globalThis, "localStorage", desc);
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete (globalThis as { localStorage?: unknown }).localStorage;
});

const primeira = listAulas().find((a) => a.arquivo !== null)!;
const trilha = (onOpen = () => {}) => renderToStaticMarkup(<Home onOpen={onOpen} />);
const app = (hash: string) => {
  vi.stubGlobal("location", { hash });
  return renderToStaticMarkup(<App />);
};

const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lum = ([r, g, b]: number[]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const razao = (a: number[], b: number[]) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const BRANCO = [255, 255, 255];

describe("B54 — achado 1: armazenamento negado", () => {
  it("getter de localStorage que lança (SecurityError): trilha abre com o padrão, sem tela em branco", () => {
    instalarStorage("lanca");
    expect(lerPilarInicial()).toBe("aritmetica");
    expect([...lerAbertos()]).toEqual(chavesPrimeiraAula());
    expect(getProgress()).toEqual({});
    const html = trilha();
    expect(html).toContain("Trilha");
    expect(html).toContain("Aritmética");
  });

  it("getItem, setItem e o próprio acesso que lançam: leitura volta ausente e a gravação vale na visita", async () => {
    const { criarArmazenamento } = await import("../engine/armazenamento");
    const tudoLanca = criarArmazenamento(() => ({
      getItem() {
        throw negado();
      },
      setItem() {
        throw new DOMException("Cheio", "QuotaExceededError");
      },
    }));
    expect(tudoLanca.ler(K_PILAR)).toBeNull();
    tudoLanca.gravar(K_PILAR, "algebra");
    expect(tudoLanca.ler(K_PILAR)).toBe("algebra");

    const acessoLanca = criarArmazenamento(() => {
      throw negado();
    });
    acessoLanca.gravar(K_ABERTOS, "[]");
    expect(acessoLanca.ler(K_ABERTOS)).toBe("[]");

    // Injeção dos testes preservada: objeto que lança, null explícito.
    const lanca = {
      getItem(): string | null {
        throw negado();
      },
    };
    expect(lerPilarInicial(lanca)).toBe("aritmetica");
    expect(lerPilarInicial(null)).toBe("aritmetica");
    expect([...lerAbertos(lanca)]).toEqual(chavesPrimeiraAula());
  });
});

describe("B54 — achado 2: link de aula com escape inválido", () => {
  it("% solto e UTF-8 truncado abrem a tela amigável, na carga direta e no parser do hashchange", async () => {
    for (const hash of ["#/aula/nao/%/aqui/aula-01", "#/aula/nao/%E0%A4/aqui/aula-01"]) {
      const html = app(hash);
      expect(html, hash).toContain("Aula não encontrada");
      expect(html, hash).toContain("Voltar à trilha");
    }
    const { lerRota } = await import("../engine/rota");
    expect(lerRota("#/aula/nao/%/aqui/aula-01")).toEqual({ tipo: "aula", aula: null, passo: 0 });
    expect(lerRota("#/aula/nao/%E0%A4/aqui/aula-01")).toEqual({ tipo: "aula", aula: null, passo: 0 });
    // Escape válido (barras codificadas) continua chegando à chave certa.
    expect(lerRota(`#/aula/${encodeURIComponent(primeira.key)}`)).toEqual({ tipo: "aula", aula: primeira.key, passo: 0 });
  });
});

describe("B54 — achado 3: progresso gravado inválido", () => {
  it("JSON null não derruba a trilha de quem já viu as boas-vindas", () => {
    instalarStorage(mem({ [K_PROGRESSO]: "null", [K_BOAS_VINDAS]: "1" }));
    expect(getProgress()).toEqual({});
    expect(trilha()).toContain("Comece pela primeira aula da trilha.");
  });

  it("array e valor escalar viram {}; entradas válidas sobrevivem a um mapa parcialmente corrompido", () => {
    for (const bruto of ["[1,2]", "42", '"texto"', "true", "{"]) {
      instalarStorage(mem({ [K_PROGRESSO]: bruto }));
      expect(getProgress(), bruto).toEqual({});
    }
    instalarStorage(
      mem({ [K_PROGRESSO]: '{"a/b/c/aula-01":{"completedAt":"2026-11-20T10:00:00.000Z"},"x":null,"y":{"completedAt":5},"z":7}' }),
    );
    expect(getProgress()).toEqual({ "a/b/c/aula-01": { completedAt: "2026-11-20T10:00:00.000Z" } });
  });
});

describe("B54 — achado 4: trilha gravada obsoleta", () => {
  it("null, chaves removidas e lista só com itens inválidos abrem o caminho da primeira aula; [] é respeitado", () => {
    expect([...lerAbertos(mem({ [K_ABERTOS]: "null" }))]).toEqual(chavesPrimeiraAula());
    expect([...lerAbertos(mem({ [K_ABERTOS]: '["s:aritmetica/setor-removido","u:x/y/z",7]' }))]).toEqual(chavesPrimeiraAula());
    expect([...lerAbertos(mem({ [K_ABERTOS]: '["s:algebra/funcoes","s:aritmetica/setor-removido"]' }))]).toEqual([
      "s:algebra/funcoes",
    ]);
    expect([...lerAbertos(mem({ [K_ABERTOS]: "[]" }))]).toEqual([]);
  });

  it("dado malformado com pilar salvo: abre a primeira aula publicada do pilar ativo, não de Aritmética", () => {
    const abertos = [...lerAbertos(mem({ [K_ABERTOS]: "{", [K_PILAR]: "algebra" }))];
    expect(abertos.length).toBeGreaterThan(0);
    for (const k of abertos) expect(k).toMatch(/^[su]:algebra\//);
  });

  it("conclusão de aula removida não faz o Paco dizer 'Continue de onde parou'", () => {
    instalarStorage(mem({ [K_BOAS_VINDAS]: "1", [K_PROGRESSO]: '{"aritmetica/removido/x/aula-01":{"completedAt":"2026-11-01"}}' }));
    const html = trilha();
    expect(html).not.toContain("Continue de onde parou");
    expect(html).toContain("Comece pela primeira aula da trilha.");
    expect(HomeMod.temProgressoPublicado({ [primeira.key]: { completedAt: "2026-11-01" } })).toBe(true);
    expect(HomeMod.temProgressoPublicado({ "aritmetica/removido/x/aula-01": { completedAt: "2026-11-01" } })).toBe(false);
  });

  it("com tudo fechado de propósito, a trilha diz como expandir", () => {
    instalarStorage(mem({ [K_BOAS_VINDAS]: "1", [K_ABERTOS]: "[]" }));
    expect(trilha()).toContain("Toque num setor para ver as unidades e as aulas.");
    instalarStorage(mem({ [K_BOAS_VINDAS]: "1" }));
    expect(trilha()).not.toContain("Toque num setor");
  });
});

describe("B54 — achado 5: variações do hash", () => {
  it("tentativa de aula sem chave abre a tela amigável; query desconhecida no fragmento não descarta a aula", () => {
    expect(app("#/aula")).toContain("Aula não encontrada");
    expect(app("#/aula/")).toContain("Aula não encontrada");
    expect(app(`#/aula/${primeira.key}?origem=link`)).toContain("Carregando aula");
    expect(app(`#/aula/${primeira.key}?passo=abc`)).toContain("Carregando aula");
    expect(app(`#/aula/${primeira.key}?passo=2&origem=link`)).toContain("Carregando aula");
    // Controles: raiz e hash desconhecido abrem a trilha.
    expect(app("")).toContain("home__title");
    expect(app("#/")).toContain("home__title");
    expect(app("#/nao-existe")).toContain("home__title");
  });

  it("lerRota separa caminho e query, ignora parâmetros desconhecidos e só lê passo em desenvolvimento", async () => {
    const { lerRota } = await import("../engine/rota");
    const k = primeira.key;
    expect(lerRota("")).toEqual({ tipo: "trilha" });
    expect(lerRota("#/")).toEqual({ tipo: "trilha" });
    expect(lerRota("#/nao-existe")).toEqual({ tipo: "trilha" });
    expect(lerRota("#/aula")).toEqual({ tipo: "aula", aula: null, passo: 0 });
    expect(lerRota("#/aula/")).toEqual({ tipo: "aula", aula: null, passo: 0 });
    expect(lerRota(`#/aula/${k}/`)).toEqual({ tipo: "aula", aula: k, passo: 0 });
    expect(lerRota(`#/aula/${k}?passo=2`, true)).toEqual({ tipo: "aula", aula: k, passo: 1 });
    expect(lerRota(`#/aula/${k}?passo=2&origem=link`, true)).toEqual({ tipo: "aula", aula: k, passo: 1 });
    expect(lerRota(`#/aula/${k}?origem=link&passo=3`, true)).toEqual({ tipo: "aula", aula: k, passo: 2 });
    expect(lerRota(`#/aula/${k}?passo=abc`, true)).toEqual({ tipo: "aula", aula: k, passo: 0 });
    expect(lerRota(`#/aula/${k}?passo=0`, true)).toEqual({ tipo: "aula", aula: k, passo: 0 });
    expect(lerRota(`#/aula/${k}?passo=2`, false)).toEqual({ tipo: "aula", aula: k, passo: 0 });
  });
});

describe("B54 — achado 6: foco ao entrar e ao voltar da aula", () => {
  it("botões de aula marcam a chave (destino do foco na volta) e os títulos aceitam foco por programa", async () => {
    const html = trilha();
    expect(html).toContain(`data-aula="${primeira.key}"`);
    expect(html).toMatch(/<h1[^>]*tabindex="-1"[^>]*class="home__title"/);
    expect(renderToStaticMarkup(<AulaNaoEncontrada onVoltar={() => {}} />)).toMatch(/<h1[^>]*tabindex="-1"/);

    const r = await loadLesson(primeira.arquivo!);
    if (!r.ok) throw new Error(r.error);
    const aula = renderToStaticMarkup(<LessonPlayer lesson={r.lesson} aulaKey={primeira.key} onExit={() => {}} />);
    expect(aula).toMatch(new RegExp(`<h1[^>]*tabindex="-1"[^>]*class="sr-only"[^>]*>Aula: ${r.lesson.titulo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h1>`));
    // O título vem depois de "Sair da aula" e antes do passo: Tab segue para o passo, Shift+Tab volta a sair.
    expect(aula.indexOf("Sair da aula")).toBeLessThan(aula.indexOf('class="sr-only"'));
  });

  it("botão de aula tem folga de rolagem para o contorno de foco aparecer inteiro", () => {
    const css = readFileSync("src/ui/styles.css", "utf8");
    expect(css).toMatch(/\.node__btn \{\s*scroll-margin-block: 16px;/);
    expect(css).toMatch(/scroll-padding-block: 16px;/);
  });
});

describe("B54 — achado 7: contraste de estados e rótulos", () => {
  it("aula concluída: check escuro sobre o amarelo (≥ 3:1) e 'concluída' no nome acessível", () => {
    instalarStorage(mem({ [K_BOAS_VINDAS]: "1", [K_PROGRESSO]: JSON.stringify({ [primeira.key]: { completedAt: "2026-11-20" } }) }));
    const html = trilha();
    expect(html).toMatch(/aria-label="Aula \d+: [^"]*\(concluída\)"/);
    expect(html).toContain(`stroke="${palette.ink}"`);
    expect(razao(rgb(palette.ink), rgb(palette.yellow))).toBeGreaterThanOrEqual(3);
    expect(razao(BRANCO, rgb(palette.yellow))).toBeLessThan(3); // o branco de antes reprovava
  });

  it("dica, expoente da fórmula e chave ligada de widget usam tons que passam 4,5:1", () => {
    const css = readFileSync("src/ui/styles.css", "utf8");
    // Nome da dica: azul e laranja trocam para o tom escuro.
    expect(css).toMatch(/\.dica--h,\s*\.dica--c1 \{\s*--dica-texto: var\(--h-dark\);/);
    expect(css).toMatch(/\.dica--r,\s*\.dica--c2 \{\s*--dica-texto: var\(--ui-orange-text\);/);
    expect(css).toMatch(/color: var\(--dica-texto, var\(--dica-cor\)\);/);
    expect(razao(rgb(palette.hDark), BRANCO)).toBeGreaterThanOrEqual(4.5);
    expect(razao(rgb("#A85E00"), BRANCO)).toBeGreaterThanOrEqual(4.5); // --ui-orange-text
    // Fórmula: azul desligado (texto) e ligado (fundo) no tom escuro.
    expect(css).toMatch(/\.formula \.btn--h\.btn--off \{\s*--c-text: var\(--h-dark\);/);
    expect(css).toMatch(/\.formula \.btn--h:not\(\.btn--off\),\s*\.formula \.btn--c1:not\(\.btn--off\) \{\s*--c: var\(--h-dark\);/);
    // Chave ligada de widget: fundo a 70% do tom; texto branco passa 4,5:1 em todas as cores usadas.
    expect(css).toContain("background: color-mix(in srgb, var(--c) 70%, #000);");
    for (const cor of [palette.h, palette.r, palette.g, palette.c1, palette.c2, palette.c3, palette.c4, palette.ink2]) {
      const escuro = rgb(cor).map((c) => Math.round(c * 0.7));
      expect(razao(BRANCO, escuro), cor).toBeGreaterThanOrEqual(4.5);
    }
    expect(razao(BRANCO, rgb(palette.h))).toBeLessThan(4.5); // o azul de antes reprovava
  });
});

describe("B54 — achado 1 (fim): sem armazenamento, a conclusão vale para a visita", () => {
  // Fica por último: grava na reserva em memória do armazenamento do app.
  it("markComplete com setItem que lança: a trilha da mesma visita já mostra a aula concluída", () => {
    const dados: Record<string, string> = {};
    const s = storage(dados);
    s.setItem = () => {
      throw new DOMException("Cheio", "QuotaExceededError");
    };
    instalarStorage(s);
    expect(() => markComplete(primeira.key)).not.toThrow();
    expect(Object.keys(getProgress())).toContain(primeira.key);
  });
});
