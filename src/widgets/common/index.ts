// Widgets e figuras comuns a vários capítulos. Schemas em ./params.ts.
import { PlanoCartesianoWidget } from "./PlanoCartesianoWidget";
import { PlanoFigura } from "./PlanoFigura";
import { RetaFigura, RetaNumericaWidget } from "./RetaNumericaWidget";

export const widgets = {
  plano_cartesiano: PlanoCartesianoWidget,
  reta_numerica: RetaNumericaWidget,
};

export const figures = {
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
};
