// Soluções e concentração: química pura, sem React e sem DOM (testada em solucao.test.ts).
//
// Premissas do modelo (as mesmas da aula e de docs/EVOLUCAO_VISUAL_E_DISCIPLINAS.md):
//   - o volume da solução é o volume medido no béquer (o soluto dissolvido não muda o volume, aproximação
//     usual do ensino médio para soluções diluídas);
//   - temperatura constante; o soluto se dissolve por inteiro até o limite de solubilidade e o que passa
//     do limite fica como sólido no fundo (não conta na concentração);
//   - concentração comum C = m/V (g/L) e, com a massa molar M, n = m/M e concentração em quantidade de
//     matéria C = n/V (mol/L);
//   - diluição: só entra solvente, a massa de soluto não muda, então C1·V1 = C2·V2.
// As partículas do desenho são simbólicas: cada uma representa uma massa fixa de soluto dissolvido.

export interface Solucao {
  /** Massa de soluto colocada (g). */
  massa: number;
  /** Volume da solução (mL). */
  volume: number;
  /** Massa molar do soluto (g/mol). */
  massaMolar?: number;
  /** Limite de solubilidade na temperatura da aula (g/L). */
  solubilidade?: number;
}

export interface ResultadoSolucao {
  /** Massa dissolvida (g). */
  dissolvida: number;
  /** Massa que não dissolveu (g), acima da solubilidade. */
  excesso: number;
  /** Concentração comum (g/L). */
  concentracao: number;
  /** Quantidade de matéria dissolvida (mol), se houver massa molar. */
  mols: number | null;
  /** Concentração em quantidade de matéria (mol/L), se houver massa molar. */
  concentracaoMol: number | null;
}

export const limpar = (x: number) => Math.round(x * 1e9) / 1e9;

export function resolverSolucao({ massa, volume, massaMolar, solubilidade }: Solucao): ResultadoSolucao {
  const litros = volume / 1000;
  const limite = solubilidade === undefined ? Infinity : solubilidade * litros;
  const dissolvida = Math.max(0, Math.min(massa, limite));
  const excesso = Math.max(0, massa - dissolvida);
  const concentracao = litros > 0 ? dissolvida / litros : 0;
  const mols = massaMolar ? dissolvida / massaMolar : null;
  return {
    dissolvida: limpar(dissolvida),
    excesso: limpar(excesso),
    concentracao: limpar(concentracao),
    mols: mols === null ? null : limpar(mols),
    concentracaoMol: mols === null || litros <= 0 ? null : limpar(mols / litros),
  };
}

/** Diluição: concentração final quando o volume passa de v1 para v2 só com solvente (C1·V1 = C2·V2). */
export const diluir = (c1: number, v1: number, v2: number) => limpar((c1 * v1) / v2);

/**
 * Posições fixas (0..1) das partículas, sorteadas uma vez com semente: quando o volume muda, as mesmas
 * partículas se espalham por mais ou menos líquido, e a densidade visual acompanha a concentração.
 */
export function posicoesParticulas(n: number, semente = 7): { u: number; v: number }[] {
  let s = semente >>> 0 || 1;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out: { u: number; v: number }[] = [];
  for (let i = 0; i < n; i++) out.push({ u: 0.06 + 0.88 * rnd(), v: 0.05 + 0.9 * rnd() });
  return out;
}

/** Quantas partículas desenhar para a massa dissolvida (cada uma vale `porParticula` g), com teto. */
export const contarParticulas = (dissolvida: number, porParticula: number, teto = 160) =>
  Math.min(teto, Math.round(dissolvida / porParticula));
