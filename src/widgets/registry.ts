import type { ComponentType } from "react";
import type { z } from "zod";
import * as common from "./common";
import { ConeFigure } from "./ConeFigure";
import { GeneratrixWidget } from "./GeneratrixWidget";
import type { FigureId, WidgetId, figureParams } from "./params";
import { RevolutionWidget } from "./RevolutionWidget";
import type { WidgetProps } from "./types";

export type RegistroWidget = {
  Widget: ComponentType<WidgetProps>;
  /** Métricas síncronas usadas para concluir o passo com os parâmetros e controles atuais. */
  metricas?: (params: WidgetProps["params"], controls: WidgetProps["controls"]) => Record<string, number>;
};

// Para registrar um capítulo: crie src/widgets/<unidade>/index.ts exportando { widgets, figures }
// e espalhe aqui (...capitulo.widgets / ...capitulo.figures). Os schemas vão em params.ts.

/** Widgets interativos do passo interactive_canvas, referenciados pelo campo "widget" do JSON. */
export const widgets: Record<WidgetId, RegistroWidget> = {
  revolution: { Widget: RevolutionWidget },
  generatrix: { Widget: GeneratrixWidget },
  ...common.widgets,
};

/** Cada figura recebe o estado já validado pelo seu schema em params.ts. */
type FiguresTipadas = { [K in FigureId]: ComponentType<{ state: z.output<(typeof figureParams)[K]> }> };
const figuresTipadas: FiguresTipadas = {
  cone_figure: ConeFigure,
  ...common.figures,
};

/** Figuras de apoio de micro_challenge, concept_lock e treino. O estado vem de figureParams[id].parse(). */
export const figures = figuresTipadas as unknown as Record<FigureId, ComponentType<{ state: unknown }>>;
