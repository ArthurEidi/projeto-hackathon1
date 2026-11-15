import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { QuestaoVestibular, type Lesson } from "../engine/schema";
import { errosImagensVestibular } from "../../scripts/lint-content";
import { Pergunta } from "./Treino";

const imagem = { src: "/vestibular/teste.svg", alt: "Retângulo de teste" };
const q = { id: "teste", prompt: "Figura de teste", imagens: [imagem],
  fonte: { banca: "Teste", adaptada: false, urls: ["https://example.org"] },
  options: [{ id: "a", label: "A", correct: true, feedback: "Teste", imagem },
    { id: "b", label: "B", correct: false, feedback: "Teste" }] };

describe("imagens de vestibular", () => {
  it("preserva imagens opcionais e aceita uma a três", () => {
    expect(QuestaoVestibular.parse(q).options[0].imagem).toEqual(imagem);
    expect(QuestaoVestibular.safeParse({ ...q, imagens: [imagem, imagem, imagem] }).success).toBe(true);
    expect(QuestaoVestibular.safeParse({ ...q, imagens: undefined }).success).toBe(true);
    for (const imagens of [[], [imagem, imagem, imagem, imagem]])
      expect(QuestaoVestibular.safeParse({ ...q, imagens }).success).toBe(false);
  });
  it("recusa caminhos externos, escape, alt vazio e chaves desconhecidas", () => {
    for (const invalid of [{ ...imagem, src: "/outro/a.png" }, { ...imagem, src: "/vestibular/../a.png" },
      { ...imagem, alt: " " }, { src: imagem.src }, { ...imagem, extra: true }]) {
      expect(QuestaoVestibular.safeParse({ ...q, imagens: [invalid] }).success).toBe(false);
      expect(QuestaoVestibular.safeParse({ ...q, options: [{ ...q.options[0], imagem: invalid }, q.options[1]] }).success).toBe(false);
    }
    expect(QuestaoVestibular.safeParse({ ...q, options: [{ ...q.options[0], extra: true }, q.options[1]] }).success).toBe(false);
  });
  it("lint verifica arquivos do enunciado e das alternativas em pasta temporária", () => {
    const dir = mkdtempSync(join(tmpdir(), "b16-lint-"));
    try {
      const lesson = { treino: { vestibular: [QuestaoVestibular.parse(q)] } } as Lesson;
      expect(errosImagensVestibular(lesson, dir)).toHaveLength(2);
      expect(errosImagensVestibular(lesson, dir)[0]).toContain("imagem inexistente /vestibular/teste.svg");
      mkdirSync(join(dir, "vestibular"));
      writeFileSync(join(dir, "vestibular/teste.svg"), "<svg xmlns='http://www.w3.org/2000/svg'/>");
      expect(errosImagensVestibular(lesson, dir)).toEqual([]);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
  it("renderiza alt, base e opção com imagem; gera prova visual opcional", () => {
    const html = renderToStaticMarkup(<Pergunta questao={QuestaoVestibular.parse(q)} contador="Teste" ultima fala="Observe a figura." onResponder={() => {}} onProxima={() => {}} />);
    expect(html).toContain(`src="${import.meta.env.BASE_URL}vestibular/teste.svg"`);
    expect(html.match(/alt="Retângulo de teste"/g)).toHaveLength(2);
    expect(html).toContain("options--imagens");
    expect(html.indexOf("Figura de teste")).toBeLessThan(html.indexOf('class="treino__imagem"'));
    if (process.env.B16_VISUAL) {
      const svg = "data:image/svg+xml;base64," + Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><rect x="2" y="2" width="1196" height="596" fill="lightblue" stroke="black" stroke-width="4"/><text x="150" y="300" font-size="70">Figura de teste 1200 x 600</text></svg>').toString("base64");
      const css = readFileSync("src/ui/styles.css", "utf8");
      writeFileSync(process.env.B16_VISUAL, `<html><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css} * { animation: none !important; } :root { --ink: #17233b; --bg: white; --line: #aaa; --muted: #555; }</style><body><main class="app" style="width:400px;margin:0">${html.replaceAll(`${import.meta.env.BASE_URL}vestibular/teste.svg`, svg)}</main></body></html>`);
    }
  });
});
