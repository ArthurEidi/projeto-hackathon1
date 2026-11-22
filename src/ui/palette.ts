// Fonte única de cores. O CSS recebe estes valores como variáveis em :root (ver main.tsx),
// e os widgets de canvas leem daqui. Todas as cores são sólidas.
//
// 21/11, alinhamento com a landing page do projeto (C:\HackBrasil\hackbrasil-landing, src/styles/global.css):
// fundo creme #FFFDF8, tinta #26344A, texto secundário #586477, azul de destaque #365F91, linhas #E2E4DF,
// pastéis por disciplina (#92BDE8, #C6B3E6, #A8D5BA), amarelo #F5D994 e traços das ilustrações
// (#446FA2, #795B9E/#624581, #4F8164). As marcas dos gráficos (h, r, g, c1..c4) foram aproximadas dessa
// família, menos saturadas que antes, mantendo os contrastes exigidos pelos testes (B54): o tom de cada
// marca escurecido a 70% passa 4,5:1 com texto branco, e o tom escuro passa 4,5:1 sobre branco.
export const palette = {
  bg: "#FFFDF8",
  surface: "#F4F6F2",
  ink: "#26344A",
  ink2: "#46546A",
  muted: "#6B778A",
  line: "#E2E4DF",
  lineDark: "#CBD2D8",

  green: "#4F8164",
  greenDark: "#3E6A50",
  greenTint: "#EAF3EC",
  red: "#B4475C",
  redDark: "#8E3346",
  redTint: "#FBEDEE",

  // Grandezas do cone: cada uma tem uma cor fixa em todas as telas.
  h: "#4F7FB3",
  hDark: "#365F91",
  hTint: "#E4EEF8",
  r: "#D98A2B",
  rDark: "#9A5A12",
  rTint: "#F8EBD6",
  g: "#C0577B",
  gDark: "#93395A",
  gTint: "#F6E3EA",
  gTintStrong: "#EEC6D5",

  // Cores semânticas genéricas (c1..c4) para os demais capítulos. c1..c3 repetem as do cone,
  // para o app manter uma só família de cores; c4 completa com o violeta da Física da landing.
  c1: "#4F7FB3",
  c1Dark: "#365F91",
  c1Tint: "#E4EEF8",
  c2: "#D98A2B",
  c2Dark: "#9A5A12",
  c2Tint: "#F8EBD6",
  c3: "#C0577B",
  c3Dark: "#93395A",
  c3Tint: "#F6E3EA",
  c4: "#8566B8",
  c4Dark: "#624581",
  c4Tint: "#F0EBF7",

  // Balão da Tati: tom do moletom dela, claro o bastante para não parecer erro.
  tati: "#B4533F",
  tatiLine: "#EBCFC6",
  tatiTint: "#FBF1EC",

  // Amarelo das ilustrações da landing (ponto atual, marca-texto, nota adesiva).
  yellow: "#F5D994",
  yellowDark: "#C8A85B",
  axis: "#5E6B7D",

  // Identidade da landing: tinta (botão principal e marca), azul de destaque e pastéis das disciplinas.
  brand: "#26344A",
  accent: "#365F91",
  accentDark: "#2B4C75",
  accentTint: "#EAF2FA",
  paper: "#FFFEFA",
  pastelMath: "#92BDE8",
  pastelPhysics: "#C6B3E6",
  pastelChemistry: "#A8D5BA",
  pastelPink: "#F4C5CB",
} as const;

export type PaletteKey = keyof typeof palette;

const toKebab = (s: string) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

export function applyPaletteToCss(root: HTMLElement = document.documentElement) {
  for (const [k, v] of Object.entries(palette)) {
    root.style.setProperty(`--${toKebab(k)}`, v);
  }
}
