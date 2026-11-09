// Contratos de parâmetros dos widgets. Arquivo sem React: é usado pelo schema da aula,
// pelo lint de conteúdo (Node) e pelos próprios widgets.
import { z } from "zod";

const ConeDims = z.object({
  h: z.number().positive(),
  r: z.number().positive(),
});

export const Magnitude = z.enum(["h", "r", "g"]);
export type Magnitude = z.infer<typeof Magnitude>;

export const widgetParams = {
  revolution: ConeDims,
  generatrix: ConeDims,
} as const;

export type WidgetId = keyof typeof widgetParams;
export const widgetIds = Object.keys(widgetParams) as [WidgetId, ...WidgetId[]];

export const ConeFigureState = ConeDims.extend({
  labels: z.object({ h: z.string(), r: z.string(), g: z.string() }),
  view: z.enum(["cone", "section", "both"]).default("cone"),
  highlight: z.array(Magnitude).default([]),
  squares: z.array(Magnitude).default([]),
  areas: z.object({ h: z.string(), r: z.string(), g: z.string() }).partial().default({}),
});
export type ConeFigureState = z.output<typeof ConeFigureState>;

export const figureParams = {
  cone_figure: ConeFigureState,
} as const;

export type FigureId = keyof typeof figureParams;
export const figureIds = Object.keys(figureParams) as [FigureId, ...FigureId[]];
