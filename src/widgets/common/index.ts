// Widgets e figuras comuns a vários capítulos. Schemas em ./params.ts.
import { BarrasFigura } from "./barras/BarrasFigura";
import { BarrasWidget } from "./barras/BarrasWidget";
import { PlanoCartesianoWidget } from "./PlanoCartesianoWidget";
import { PlanoFigura } from "./PlanoFigura";
import { RetaFigura, RetaNumericaWidget } from "./RetaNumericaWidget";

export const widgets = {
  plano_cartesiano: PlanoCartesianoWidget,
  reta_numerica: RetaNumericaWidget,
  barras: BarrasWidget,
};

export const figures = {
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
  barras_figura: BarrasFigura,
};
