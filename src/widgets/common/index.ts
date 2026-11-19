// Widgets e figuras comuns a vários capítulos. Schemas em ./params.ts.
import { BarrasFigura } from "./barras/BarrasFigura";
import { LugarWidget } from "./lugar/LugarWidget";
import { LugarFigura } from "./lugar/LugarFigura";
import { PontosWidget } from "./pontos/PontosWidget";
import { PontosFigura } from "./pontos/PontosFigura";
import { CircunferenciaWidget } from "./circunferencia/CircunferenciaWidget";
import { CircunferenciaFigura } from "./circunferencia/CircunferenciaFigura";
import { VetoresWidget } from "./vetores/VetoresWidget";
import { VetoresFigura } from "./vetores/VetoresFigura";
import { AreasWidget } from "./areas/AreasWidget";
import { AreasFigura } from "./areas/AreasFigura";
import { MaquinasWidget } from "./maquinas/MaquinasWidget";
import { MaquinasFigura } from "./maquinas/MaquinasFigura";
import { TransformacaoWidget } from "./transformacao/TransformacaoWidget";
import { TransformacaoFigura } from "./transformacao/TransformacaoFigura";
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
import { EscalaWidget } from "./escala/EscalaWidget";
import { EscalaFigura } from "./escala/EscalaFigura";
import { DivisaoWidget } from "./divisao/DivisaoWidget";
import { DivisaoFigura } from "./divisao/DivisaoFigura";
import { GruposWidget } from "./grupos/GruposWidget";
import { GruposFigura } from "./grupos/GruposFigura";
import { SistemaEscalonadoWidget } from "./escalonado/SistemaEscalonadoWidget";
import { SistemaEscalonadoFigura } from "./escalonado/SistemaEscalonadoFigura";

export const widgets = {
  maquinas_funcao: MaquinasWidget,
  transformacao_plano: TransformacaoWidget,
  retangulo_areas: AreasWidget,
  vetores_no_plano: VetoresWidget,
  circunferencia_no_plano: CircunferenciaWidget,
  pontos_no_plano: PontosWidget,
  lugar_geometrico: LugarWidget,
  plano_cartesiano: PlanoCartesianoWidget,
  reta_numerica: RetaNumericaWidget,
  barras: BarrasWidget,
  grade_resultados: GradeWidget,
  solido_3d: SolidoWidget,
  geometria_triangulo: GeometriaTrianguloWidget,
  ciclo_trigonometrico: CicloTrigonometricoWidget,
  geometria_poligono: GeometriaPoligonoWidget,
  geometria_circulo: GeometriaCirculoWidget,
  escala_decimal: EscalaWidget,
  divisao_polinomial: DivisaoWidget,
  grupos_inteiros: GruposWidget,
  sistema_escalonado: SistemaEscalonadoWidget,
};

export const figures = {
  maquinas_figura: MaquinasFigura,
  transformacao_figura: TransformacaoFigura,
  retangulo_areas_figura: AreasFigura,
  vetores_figura: VetoresFigura,
  circunferencia_figura: CircunferenciaFigura,
  pontos_figura: PontosFigura,
  lugar_figura: LugarFigura,
  plano_figura: PlanoFigura,
  reta_figura: RetaFigura,
  barras_figura: BarrasFigura,
  grade_figura: GradeFigura,
  solido_3d_figura: SolidoFigura,
  geometria_triangulo_figura: GeometriaTrianguloFigura,
  ciclo_trigonometrico_figura: CicloTrigonometricoFigura,
  geometria_poligono_figura: GeometriaPoligonoFigura,
  geometria_circulo_figura: GeometriaCirculoFigura,
  escala_decimal_figura: EscalaFigura,
  divisao_polinomial_figura: DivisaoFigura,
  grupos_inteiros_figura: GruposFigura,
  sistema_escalonado_figura: SistemaEscalonadoFigura,
};
