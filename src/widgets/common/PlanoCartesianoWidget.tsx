// Plano cartesiano vivo: curvas ligadas aos sliders do passo e um ponto que o aluno arrasta pela curva.
// Métricas para complete_when:
//   ponto_x      x atual do ponto
//   quadrantes   quantos quadrantes o ponto já visitou (0..4)
//   faixa_x      largura da faixa de x já percorrida
//   na_raiz      1 quando o ponto está numa raiz da curva dele
//   no_encontro  1 quando o ponto está onde as curvas 0 e 1 se cruzam
// (os sliders entram como métricas automaticamente, pelo id)
import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../ui/Dica";
import { palette } from "../../ui/palette";
import { useCanvas } from "../canvas";
import type { WidgetProps } from "../types";
import { desenharPlano } from "./desenhoPlano";
import { PlanoCartesiano } from "./params";
import { avaliar, encaixar, quadrante, resolver, resolverCurva, type Vista } from "./plot2d";

const TOL = 1e-6;

export function PlanoCartesianoWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => PlanoCartesiano.parse(params), [params]);
  const pt = p.ponto;
  const segueSlider = pt ? typeof pt.x === "string" : false;
  const xInicial = pt ? resolver(pt.x, controls) : 0;
  const [xArrastado, setXArrastado] = useState(xInicial);
  const pontoX = pt ? (segueSlider ? xInicial : xArrastado) : undefined;
  const [rastro, setRastro] = useState<number[]>([]);
  const [visitados, setVisitados] = useState<Set<number>>(new Set());
  const [faixa, setFaixa] = useState<[number, number] | null>(null);
  const [tocou, setTocou] = useState(false);
  const vista = useRef<Vista | null>(null);
  const arrastando = useRef(false);

  // Registra cada posição nova do ponto: rastro, quadrante e faixa percorrida.
  useEffect(() => {
    if (pontoX === undefined || !pt) return;
    const k = resolverCurva(p.curvas[pt.curva], controls);
    const y = avaliar(k, pontoX);
    setRastro((r) => (r.includes(pontoX) ? r : [...r, pontoX]));
    const q = Number.isFinite(y) ? quadrante(pontoX, y) : 0;
    if (q) setVisitados((s) => (s.has(q) ? s : new Set(s).add(q)));
    setFaixa((f) => (f ? [Math.min(f[0], pontoX), Math.max(f[1], pontoX)] : [pontoX, pontoX]));
  }, [pontoX, pt, p.curvas, controls]);

  useEffect(() => {
    if (pontoX === undefined || !pt) return;
    const k = resolverCurva(p.curvas[pt.curva], controls);
    const y = avaliar(k, pontoX);
    onMetric("ponto_x", pontoX);
    onMetric("na_raiz", Number.isFinite(y) && Math.abs(y) < TOL ? 1 : 0);
    if (p.curvas.length >= 2) {
      const d = avaliar(resolverCurva(p.curvas[0], controls), pontoX) - avaliar(resolverCurva(p.curvas[1], controls), pontoX);
      onMetric("no_encontro", Math.abs(d) < TOL ? 1 : 0);
    }
  }, [pontoX, pt, p.curvas, controls, onMetric]);

  useEffect(() => onMetric("quadrantes", visitados.size), [visitados, onMetric]);
  useEffect(() => onMetric("faixa_x", faixa ? faixa[1] - faixa[0] : 0), [faixa, onMetric]);

  const { ref, size, hover } = useCanvas(0.86, (ctx, w, h, hits) => {
    vista.current = desenharPlano(ctx, w, h, hits, p, controls, { pontoX, rastro, visitados });
    // Convite ao arraste: anel em volta do ponto até o primeiro toque.
    if (pt && pt.arrastavel && !segueSlider && !tocou && pontoX !== undefined && vista.current) {
      const y = avaliar(resolverCurva(p.curvas[pt.curva], controls), pontoX);
      if (Number.isFinite(y)) {
        ctx.beginPath();
        ctx.arc(vista.current.X(pontoX), vista.current.Y(y), 20, 0, Math.PI * 2);
        ctx.strokeStyle = palette.lineDark;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  });

  const arrastavel = Boolean(pt && pt.arrastavel && !segueSlider);
  const mover = (clientX: number, el: HTMLCanvasElement) => {
    const v = vista.current;
    if (!v || !pt) return;
    const x = v.xDe(clientX - el.getBoundingClientRect().left);
    setXArrastado(encaixar(x, pt.passo, p.x[0], p.x[1]));
  };

  return (
    <>
      <canvas
        ref={ref}
        aria-label="Plano cartesiano com o gráfico da função"
        style={{ cursor: arrastavel ? "grab" : "default", touchAction: arrastavel ? "none" : undefined }}
        onPointerDown={(e) => {
          if (!arrastavel) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          arrastando.current = true;
          if (!tocou) {
            setTocou(true);
            onInteract();
          }
          mover(e.clientX, e.currentTarget);
        }}
        onPointerMove={(e) => arrastando.current && mover(e.clientX, e.currentTarget)}
        onPointerUp={() => (arrastando.current = false)}
        onPointerCancel={() => (arrastando.current = false)}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    </>
  );
}
