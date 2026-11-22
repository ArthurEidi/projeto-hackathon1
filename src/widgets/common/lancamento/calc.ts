// Lançamento oblíquo: física pura, sem React e sem DOM (testada em lancamento.test.ts).
//
// Hipóteses do modelo (as mesmas da aula e de docs/EVOLUCAO_VISUAL_E_DISCIPLINAS.md):
//   - sem resistência do ar;
//   - gravidade constante g, vertical e para baixo (padrão 10 m/s², convenção do ENEM);
//   - o objeto é um ponto material; o solo é plano e horizontal (y = 0);
//   - lançamento da altura h0 ≥ 0, com velocidade v0 e ângulo θ acima da horizontal.
// Equações:
//   x(t) = v0·cos θ·t        y(t) = h0 + v0·sen θ·t − g·t²/2
//   tempo de voo  T = (vy + √(vy² + 2·g·h0)) / g      (com h0 = 0: T = 2·v0·sen θ / g)
//   altura máxima H = h0 + vy² / (2g)                  (com h0 = 0: H = v0²·sen²θ / (2g))
//   alcance       A = vx · T                           (com h0 = 0: A = v0²·sen 2θ / g)

export const G_PADRAO = 10;

export interface Lancamento {
  /** Ângulo acima da horizontal, em graus (0 a 90). */
  angulo: number;
  /** Velocidade inicial, em m/s. */
  v0: number;
  /** Gravidade, em m/s². */
  g: number;
  /** Altura de lançamento, em m. */
  h0: number;
}

export interface Resultado {
  vx: number;
  vy: number;
  /** Tempo até o ponto mais alto (s). */
  tSubida: number;
  /** Tempo de voo até tocar o solo (s). */
  tempo: number;
  /** Altura máxima em relação ao solo (m). */
  alturaMax: number;
  /** Distância horizontal até tocar o solo (m). */
  alcance: number;
}

/** Arredonda ruído de ponto flutuante (sen 30° = 0,49999999…) sem perder precisão útil. */
export const limpar = (x: number) => Math.round(x * 1e9) / 1e9;

export const rad = (graus: number) => (graus * Math.PI) / 180;

export function resolverLancamento({ angulo, v0, g, h0 }: Lancamento): Resultado {
  // Contas com os valores exatos; o arredondamento de ruído só no fim (arredondar antes acumula erro).
  const vx = v0 * Math.cos(rad(angulo));
  const vy = Math.abs(v0 * Math.sin(rad(angulo))) < 1e-12 ? 0 : v0 * Math.sin(rad(angulo));
  const tSubida = vy > 0 ? vy / g : 0;
  const alturaMax = h0 + (vy > 0 ? (vy * vy) / (2 * g) : 0);
  const tempo = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
  return {
    vx: limpar(vx),
    vy: limpar(vy),
    tSubida: limpar(tSubida),
    tempo: limpar(tempo),
    alturaMax: limpar(alturaMax),
    alcance: limpar(vx * tempo),
  };
}

/** Posição no instante t (s). */
export function posicao({ angulo, v0, g, h0 }: Lancamento, t: number): { x: number; y: number } {
  return {
    x: v0 * Math.cos(rad(angulo)) * t,
    y: h0 + v0 * Math.sin(rad(angulo)) * t - (g * t * t) / 2,
  };
}

/** Pontos da trajetória do lançamento até o instante `ate` (padrão: o tempo de voo inteiro). */
export function trajetoria(l: Lancamento, n = 80, ate?: number): { x: number; y: number }[] {
  const T = ate ?? resolverLancamento(l).tempo;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= n; i++) pts.push(posicao(l, (T * i) / n));
  return pts;
}

/**
 * Maiores alcance e altura possíveis dentro das faixas dos sliders, para fixar a escala do desenho:
 * trajetórias diferentes ficam comparáveis (mesma escala) enquanto o aluno mexe nos controles.
 */
export function extensaoMaxima(
  angulos: [number, number],
  velocidades: [number, number],
  g: number,
  h0: number,
): { alcance: number; altura: number } {
  let alcance = 0;
  let altura = h0;
  const passos = 36;
  for (let i = 0; i <= passos; i++) {
    const a = angulos[0] + ((angulos[1] - angulos[0]) * i) / passos;
    const r = resolverLancamento({ angulo: a, v0: velocidades[1], g, h0 });
    alcance = Math.max(alcance, r.alcance);
    altura = Math.max(altura, r.alturaMax);
  }
  // 45° (alcance máximo com h0 = 0) pode cair entre dois passos.
  if (angulos[0] <= 45 && angulos[1] >= 45) alcance = Math.max(alcance, resolverLancamento({ angulo: 45, v0: velocidades[1], g, h0 }).alcance);
  return { alcance, altura };
}

/** O lançamento caiu no alvo? */
export const acertou = (alcance: number, alvo: { x: number; tolerancia: number }) =>
  Math.abs(alcance - alvo.x) <= alvo.tolerancia + 1e-9;
