import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AulaNaoEncontrada } from "../App";
import { chavesPrimeiraAula, lerAbertos, lerPilarInicial } from "../Home";
import { conviteBasico, conviteProxima } from "../treino/falas";
import { ProgressBar } from "./Tactile";

const mem = (dados: Record<string, string | null>) => ({
  getItem: (k: string) => dados[k] ?? null,
});

describe("B49 — trilha inicial, convites do treino, rota inexistente e acessibilidade", () => {
  it("A1/A2: primeira visita abre no primeiro pilar com o 1º setor e 1ª unidade abertos; depois lembra o salvo", () => {
    expect(lerPilarInicial(mem({}))).toBe("aritmetica");
    expect(lerPilarInicial(mem({ "mat:pilar-ativo:v1": "algebra" }))).toBe("algebra");
    expect(lerPilarInicial(mem({ "mat:pilar-ativo:v1": "invalido" }))).toBe("aritmetica");

    const iniciais = chavesPrimeiraAula();
    expect(iniciais).toHaveLength(2);
    expect([...lerAbertos(mem({}))]).toEqual(iniciais);
    // Se o usuário fechou tudo explicitamente ("[]"), respeita a escolha
    expect([...lerAbertos(mem({ "mat:trilha-aberta:v1": "[]" }))]).toEqual([]);
    expect([...lerAbertos(mem({ "mat:trilha-aberta:v1": '["s:algebra/funcoes"]' }))]).toEqual(["s:algebra/funcoes"]);
  });

  it("A3: convite do treino usa a quantidade real de questões (singular, plural e 0)", () => {
    expect(conviteBasico(7)[0].texto).toContain("São 7 perguntas");
    expect(conviteBasico(1)[0].texto).toContain("É 1 pergunta");

    expect(conviteProxima("vestibular", 0)).toBeNull();
    expect(conviteProxima("vestibular", 1)).toContain("1 questão que já caiu em prova.");
    expect(conviteProxima("vestibular", 2)).toContain("2 questões que já caíram em provas.");
    expect(conviteProxima("vestibular", 3)).toContain("3 questões que já caíram em provas.");

    expect(conviteProxima("desafio", 0)).toBeNull();
    expect(conviteProxima("desafio", 1)).toContain("mais 1 pergunta");
    expect(conviteProxima("desafio", 5)).toContain("mais 5 perguntas");
  });

  it("A4: tela de aula não encontrada usa linguagem amigável com Paco e sem <pre>", () => {
    const html = renderToStaticMarkup(<AulaNaoEncontrada onVoltar={() => {}} />);
    expect(html).not.toContain("<pre");
    expect(html).toContain("Aula não encontrada");
    expect(html).toContain("Voltar à trilha");
    expect(html).toContain("Paco acenando");
  });

  it("A6: ProgressBar tem aria-label acessível", () => {
    const htmlAula = renderToStaticMarkup(<ProgressBar value={0.5} />);
    expect(htmlAula).toContain('role="progressbar"');
    expect(htmlAula).toContain('aria-label="Progresso da aula"');
    const htmlTreino = renderToStaticMarkup(<ProgressBar value={0.5} label="Progresso do treino" />);
    expect(htmlTreino).toContain('aria-label="Progresso do treino"');
  });
});
