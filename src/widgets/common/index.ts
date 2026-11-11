// Widgets e figuras comuns a vários capítulos. Schemas em ./params.ts.
import { BarrasFigura } from "./barras/BarrasFigura";
import { BarrasWidget } from "./barras/BarrasWidget";
import { GradeFigura } from "./grade/GradeFigura";
import { GradeWidget } from "./grade/GradeWidget";
import { CicloTrigonometricoFigura } from "./ciclo/CicloTrigonometricoFigura";
import { CicloTrigonometricoWidget } from "./ciclo/CicloTrigonometricoWidget";
import { GeometriaCirculoFigura } from "./circulo/GeometriaCirculoFigura";
import { GeometriaCirculoWidget } from "./circulo/GeometriaCirculoWidget";
import { GeometriaPoligonoFigura } from "./poligono/GeometriaPoligonoFigura";
import { GeometriaPoligonoWidget } from "./poligono/GeometriaPoligonoWidget";
import { GeometriaTrianguloFigura } from "./triangulo/GeometriaTrianguloFigura";
import { GeometriaTrianguloWidget } from "./triangulo/GeometriaTrianguloWidget";
import { SolidoFigura } from "./solido/SolidoFigura";
import { SolidoWidget } from "./solido/SolidoWidget";
import { PlanoCartesianoWidget } from "./PlanoCartesianoWidget";
import { PlanoFigura } from "./PlanoFigura";
import { RetaFigura, RetaNumericaWidget } from "./RetaNumericaWidget";

export const widgets = {
  plano_cartesiano: PlanoCartesianoWidget,
  reta_numerica: RetaNumericaWidget,
  barras: BarrasWidget,
  grade_resultados: GradeWidget,
  solido_3d: SolidoWidget,
  geometria_triangulo: GeometriaTrianguloWidget,
  ciclo_trigonometrico: CicloTrigonometricoWidget,
  geometria_poligono: GeometriaPoligonoWidget,
  geometria_circulo: GeometriaCirculoWidget,
};

export const figures = {
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
  barras_figura: BarrasFigura,
  grade_figura: GradeFigura,
  solido_3d_figura: SolidoFigura,
  geometria_triangulo_figura: GeometriaTrianguloFigura,
  ciclo_trigonometrico_figura: CicloTrigonometricoFigura,
  geometria_poligono_figura: GeometriaPoligonoFigura,
  geometria_circulo_figura: GeometriaCirculoFigura,
};
