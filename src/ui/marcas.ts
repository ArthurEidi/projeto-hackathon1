// Marcas de cor: cada grandeza destacada numa aula usa uma marca fixa em todas as telas
// (rótulo no canvas, slider, botão da fórmula, dica). Arquivo sem React: o schema usa no Node.
//   h, r, g  -> altura, raio e geratriz do cone (glossário padrão)
//   c1..c4   -> cores genéricas; o significado vem do "glossario" do JSON da aula
import { z } from "zod";
import { palette } from "./palette";

export const MARCAS = ["h", "r", "g", "c1", "c2", "c3", "c4"] as const;
export const Marca = z.enum(MARCAS);
export type Marca = z.infer<typeof Marca>;

/** Marcas com significado próprio do cone, que já têm entrada no glossário padrão. */
export const MARCAS_DO_CONE: readonly Marca[] = ["h", "r", "g"];

export interface CorDaMarca {
  main: string;
  dark: string;
  tint: string;
}

export const CORES: Record<Marca, CorDaMarca> = {
  h: { main: palette.h, dark: palette.hDark, tint: palette.hTint },
  r: { main: palette.r, dark: palette.rDark, tint: palette.rTint },
  g: { main: palette.g, dark: palette.gDark, tint: palette.gTint },
  c1: { main: palette.c1, dark: palette.c1Dark, tint: palette.c1Tint },
  c2: { main: palette.c2, dark: palette.c2Dark, tint: palette.c2Tint },
  c3: { main: palette.c3, dark: palette.c3Dark, tint: palette.c3Tint },
  c4: { main: palette.c4, dark: palette.c4Dark, tint: palette.c4Tint },
};

/** Cores de traço aceitas em desenhos: uma marca, ou tinta neutra / cinza de referência. */
export const CorTraco = z.enum([...MARCAS, "ink", "muted"]);
export type CorTraco = z.infer<typeof CorTraco>;

export function corDoTraco(c: CorTraco): CorDaMarca {
  if (c === "ink") return { main: palette.ink2, dark: palette.ink, tint: palette.surface };
  if (c === "muted") return { main: palette.lineDark, dark: palette.muted, tint: palette.surface };
  return CORES[c];
}

export const ehMarca = (s: string): s is Marca => (MARCAS as readonly string[]).includes(s);
