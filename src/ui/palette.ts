// Fonte única de cores. O CSS recebe estes valores como variáveis em :root (ver main.tsx),
// e os widgets de canvas leem daqui. Todas as cores são sólidas.
export const palette = {
  bg: "#FFFFFF",
  surface: "#F7F7F7",
  ink: "#1B1B1B",
  ink2: "#4B4B4B",
  muted: "#8A8A8A",
  line: "#E5E5E5",
  lineDark: "#CECECE",

  green: "#4CBF12",
  greenDark: "#3A9A0A",
  greenTint: "#DDF5CC",
  red: "#E5383B",
  redDark: "#B8262A",
  redTint: "#FCDCDC",

  // Grandezas do cone: cada uma tem uma cor fixa em todas as telas.
  h: "#1C8BE0",
  hDark: "#136AAD",
  hTint: "#DCEEFC",
  r: "#F28C00",
  rDark: "#C06F00",
  rTint: "#FDEBD1",
  g: "#D62F7A",
  gDark: "#A8225F",
  gTint: "#F9DDEA",
  gTintStrong: "#F2BCD4",

  // Cores semânticas genéricas (c1..c4) para os demais capítulos. c1..c3 repetem as do cone,
  // para o app manter uma só família de cores; c4 completa com um violeta.
  c1: "#1C8BE0",
  c1Dark: "#136AAD",
  c1Tint: "#DCEEFC",
  c2: "#F28C00",
  c2Dark: "#C06F00",
  c2Tint: "#FDEBD1",
  c3: "#D62F7A",
  c3Dark: "#A8225F",
  c3Tint: "#F9DDEA",
  c4: "#7B4FD6",
  c4Dark: "#5B36A8",
  c4Tint: "#ECE4FB",

  // Balão da Tati: tom do moletom dela, claro o bastante para não parecer erro.
  tati: "#C8452F",
  tatiLine: "#F2C2B5",
  tatiTint: "#FFF2EE",

  yellow: "#FFC21A",
  yellowDark: "#D89E00",
  axis: "#3C3C3C",
} as const;

export type PaletteKey = keyof typeof palette;

const toKebab = (s: string) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

export function applyPaletteToCss(root: HTMLElement = document.documentElement) {
  for (const [k, v] of Object.entries(palette)) {
    root.style.setProperty(`--${toKebab(k)}`, v);
  }
}
