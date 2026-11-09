import type { ComponentType } from "react";
import { ConeFigure } from "./ConeFigure";
import { GeneratrixWidget } from "./GeneratrixWidget";
import type { ConeFigureState, FigureId, WidgetId } from "./params";
import { RevolutionWidget } from "./RevolutionWidget";
import type { WidgetProps } from "./types";

/** Widgets interativos do passo interactive_canvas, referenciados pelo campo "widget" do JSON. */
export const widgets: Record<WidgetId, ComponentType<WidgetProps>> = {
  revolution: RevolutionWidget,
  generatrix: GeneratrixWidget,
};

/** Figuras de apoio de micro_challenge e concept_lock. */
export const figures: Record<FigureId, ComponentType<{ state: ConeFigureState }>> = {
  cone_figure: ConeFigure,
};
