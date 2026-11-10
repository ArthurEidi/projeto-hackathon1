// Widgets e figuras comuns a vários capítulos. Schemas em ./params.ts.
import { BarrasFigura } from "./barras/BarrasFigura";
import { BarrasWidget } from "./barras/BarrasWidget";
import { GradeFigura } from "./grade/GradeFigura";
import { GradeWidget } from "./grade/GradeWidget";
import { PlanoCartesianoWidget } from "./PlanoCartesianoWidget";
import { PlanoFigura } from "./PlanoFigura";
import { RetaFigura, RetaNumericaWidget } from "./RetaNumericaWidget";

export const widgets = {
  plano_cartesiano: PlanoCartesianoWidget,
  reta_numerica: RetaNumericaWidget,
  barras: BarrasWidget,
  grade_resultados: GradeWidget,
};

export const figures = {
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
  barras_figura: BarrasFigura,
  grade_figura: GradeFigura,
};
