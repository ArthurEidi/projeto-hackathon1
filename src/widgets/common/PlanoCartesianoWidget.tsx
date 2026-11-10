// Plano cartesiano vivo: curvas ligadas aos sliders do passo e um ponto que o aluno arrasta pela curva.
// Métricas para complete_when:
//   ponto_x            x atual do ponto
//   quadrantes         quantos quadrantes o ponto já visitou (0..4)
//   faixa_x            largura da faixa de x já percorrida
//   na_raiz            1 quando o ponto está numa raiz da curva dele
//   no_encontro        1 quando o ponto está onde as curvas 0 e 1 se cruzam
//   no_vertice         1 quando o ponto está no x do vértice da 1ª parábola
//   ramos_visitados    lados da assíntota vertical por onde o ponto já passou (0..2)
//   trechos_visitados  curvas diferentes já percorridas pelo ponto (função por partes)
//   fora_do_dominio    1 depois que o aluno tentou levar o ponto para fora do domínio
//   no_furo            1 depois que o aluno tentou pôr o ponto num furo
//   angulo_reto        1 quando as retas 0 e 1 são perpendiculares (m₁·m₂ = −1)
//   coincidentes       1 quando as curvas 0 e 1 são a mesma reta
//   intercepto_tocado  1 depois de tocar o marcador do corte no eixo y
//   parametros_testados  quantos sliders já saíram do valor inicial
//   espelho_visto      1 depois de mover o ponto com o reflexo em y = x ligado
// (os sliders entram como métricas automaticamente, pelo id)
import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../ui/Dica";
import { palette } from "../../ui/palette";
import { useCanvas } from "../canvas";
import type { WidgetProps } from "../types";
import { desenharPlano, type VistaPlano } from "./desenhoPlano";
import { PlanoCartesiano } from "./params";
import {
  alturaDoPonto,
  assintotas,
  avaliar,
  avaliarSemFuro,
  coincidentes,
  encaixar,
  perpendiculares,
  quadrante,
  resolver,
  resolverCurva,
  vertice,
} from "./plot2d";

const TOL = 1e-6;

export function PlanoCartesianoWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => PlanoCartesiano.parse(params), [params]);
  const pt = p.ponto;
  const curvas = useMemo(() => p.curvas.map((c) => resolverCurva(c, controls)), [p.curvas, controls]);
  const segueSlider = pt ? typeof pt.x === "string" : false;
  const xInicial = pt ? resolver(pt.x, controls) : 0;
  const [xArrastado, setXArrastado] = useState(xInicial);
  const pontoX = pt ? (segueSlider ? xInicial : xArrastado) : undefined;
  const [rastro, setRastro] = useState<number[]>([]);
  const [visitados, setVisitados] = useState<Set<number>>(new Set());
  const [faixa, setFaixa] = useState<[number, number] | null>(null);
  const [ramos, setRamos] = useState<Set<number>>(new Set());
  const [trechos, setTrechos] = useState<Set<number>>(new Set());
  const [foraDominio, setForaDominio] = useState(0);
  const [noFuro, setNoFuro] = useState(0);
  const [intercepto, setIntercepto] = useState(0);
  const [mexidos, setMexidos] = useState<Set<string>>(new Set());
  const [tocou, setTocou] = useState(false);
  const iniciais = useRef(controls);
  const vista = useRef<VistaPlano | null>(null);
  const arrastando = useRef(false);

  // Sliders que já saíram do valor inicial.
  useEffect(() => {
    const novos = Object.keys(controls).filter((k) => controls[k] !== iniciais.current[k]);
    setMexidos((s) => (novos.every((k) => s.has(k)) ? s : new Set([...s, ...novos])));
  }, [controls]);
  useEffect(() => onMetric("parametros_testados", mexidos.size), [mexidos, onMetric]);

  // Registra cada posição nova do ponto: rastro, quadrante, faixa percorrida, ramo e trecho.
  useEffect(() => {
    if (pontoX === undefined || !pt) return;
    const { y, curva } = alturaDoPonto(curvas, pt.curva, pontoX);
    setRastro((r) => (r.includes(pontoX) ? r : [...r, pontoX]));
    const q = Number.isFinite(y) && pt.curva !== null ? quadrante(pontoX, y) : 0;
    if (q) setVisitados((s) => (s.has(q) ? s : new Set(s).add(q)));
    setFaixa((f) => (f ? [Math.min(f[0], pontoX), Math.max(f[1], pontoX)] : [pontoX, pontoX]));
    if (curva >= 0 && Array.isArray(pt.curva)) setTrechos((s) => (s.has(curva) ? s : new Set(s).add(curva)));
    const kc = curva >= 0 ? curvas[curva] : null;
    const xa = (kc ? assintotas(kc).x : undefined) ?? p.assintotas.x[0];
    if (xa !== undefined && Math.abs(pontoX - xa) > TOL) {
      const lado = pontoX < xa ? 0 : 1;
      setRamos((s) => (s.has(lado) ? s : new Set(s).add(lado)));
    }
  }, [pontoX, pt, curvas, p.assintotas.x]);

  useEffect(() => {
    if (pontoX === undefined || !pt) return;
    const { y } = alturaDoPonto(curvas, pt.curva, pontoX);
    onMetric("ponto_x", pontoX);
    onMetric("na_raiz", pt.curva !== null && Number.isFinite(y) && Math.abs(y) < TOL ? 1 : 0);
    if (curvas.length >= 2) {
      const d = avaliar(curvas[0], pontoX) - avaliar(curvas[1], pontoX);
      onMetric("no_encontro", Math.abs(d) < TOL ? 1 : 0);
    }
    const principal = p.curvas.findIndex((c) => !c.fantasma);
    const vq = principal >= 0 ? vertice(curvas[principal]) : null;
    if (vq) onMetric("no_vertice", Math.abs(pontoX - vq.x) < TOL ? 1 : 0);
  }, [pontoX, pt, curvas, p.curvas, onMetric]);

  useEffect(() => {
    if (curvas.length < 2) return;
    onMetric("angulo_reto", perpendiculares(curvas[0], curvas[1]) ? 1 : 0);
    onMetric("coincidentes", coincidentes(curvas[0], curvas[1]) ? 1 : 0);
  }, [curvas, onMetric]);

  useEffect(() => onMetric("quadrantes", visitados.size), [visitados, onMetric]);
  useEffect(() => onMetric("faixa_x", faixa ? faixa[1] - faixa[0] : 0), [faixa, onMetric]);
  useEffect(() => onMetric("ramos_visitados", ramos.size), [ramos, onMetric]);
  useEffect(() => onMetric("trechos_visitados", trechos.size), [trechos, onMetric]);
  useEffect(() => onMetric("fora_do_dominio", foraDominio), [foraDominio, onMetric]);
  useEffect(() => onMetric("no_furo", noFuro), [noFuro, onMetric]);
  useEffect(() => onMetric("intercepto_tocado", intercepto), [intercepto, onMetric]);
  useEffect(() => {
    if (pt?.espelho) onMetric("espelho_visto", rastro.length > 1 ? 1 : 0);
  }, [pt, rastro, onMetric]);

  const { ref, size, hover } = useCanvas(0.86, (ctx, w, h, hits) => {
    vista.current = desenharPlano(ctx, w, h, hits, p, controls, { pontoX, rastro, visitados });
    // Convite ao arraste: anel em volta do ponto até o primeiro toque.
    if (pt && pt.arrastavel && !segueSlider && !tocou && pontoX !== undefined && vista.current) {
      const y = alturaDoPonto(curvas, pt.curva, pontoX).y;
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
    const x = encaixar(v.xDe(clientX - el.getBoundingClientRect().left), pt.passo, p.x[0], p.x[1]);
    if (pt.curva !== null && !Number.isFinite(alturaDoPonto(curvas, pt.curva, x).y)) {
      // Fora do domínio (ou num furo): o ponto não vai, mas a tentativa conta.
      const lista = typeof pt.curva === "number" ? [pt.curva] : pt.curva;
      if (lista.some((i) => Number.isFinite(avaliarSemFuro(curvas[i], x)))) setNoFuro(1);
      else setForaDominio(1);
      return;
    }
    setXArrastado(x);
  };

  return (
    <>
      <canvas
        ref={ref}
        aria-label="Plano cartesiano com o gráfico da função"
        style={{ cursor: arrastavel ? "grab" : "default", touchAction: arrastavel ? "none" : undefined }}
        onPointerDown={(e) => {
          const v = vista.current;
          const b = e.currentTarget.getBoundingClientRect();
          if (v?.intercepto && Math.hypot(e.clientX - b.left - v.intercepto.x, e.clientY - b.top - v.intercepto.y) < 22) {
            setIntercepto(1);
            if (!tocou) {
              setTocou(true);
              onInteract();
            }
          }
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
