// Lançamento oblíquo interativo (Física, 21/11).
// O aluno ajusta ângulo e velocidade nos sliders do passo; a trajetória prevista e os resultados (H, A, T)
// mudam na hora. "Lançar" anima a bola ao longo da trajetória (respeita prefers-reduced-motion: sem
// animação, a bola vai direto ao ponto de queda). Lançamentos anteriores ficam em cinza para comparar.
// Métricas para complete_when:
//   lancamentos            quantos lançamentos terminaram
//   angulos_testados       ângulos diferentes já lançados
//   velocidades_testadas   velocidades diferentes já lançadas
//   acertou_alvo           1 depois que um lançamento caiu no alvo
//   alcance, altura_max, tempo_voo   valores previstos para os controles atuais
// (os sliders entram como métricas automaticamente, pelo id)
import { useEffect, useMemo, useRef, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { TactileButton } from "../../../ui/Tactile";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { num } from "../plot2d";
import { acertou, extensaoMaxima, resolverLancamento, type Lancamento } from "./calc";
import { desenharLancamento, type TracoLancamento } from "./desenho";
import { LancamentoParams } from "./params";
import { PainelLancamento } from "./PainelLancamento";

const reduzMovimento = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Faixa [min, max] de um valor que pode vir de slider; número fixo vira [v, v]. */
function faixaDe(e: number | string, controls: Record<string, number>, faixas: WidgetProps["faixas"]): [number, number] {
  if (typeof e === "string") {
    const id = e.replace(/^\$/, "");
    const f = faixas?.[id];
    if (f && /^\$[a-z0-9_]+$/.test(e)) return [f.min, f.max];
  }
  const v = avaliarExpr(e, controls);
  return [v, v];
}

export function LancamentoWidget({ params, controls, faixas, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => LancamentoParams.parse(params), [params]);
  const atual: Lancamento = {
    angulo: Math.max(0, Math.min(90, avaliarExpr(p.angulo, controls))),
    v0: Math.max(0.1, avaliarExpr(p.v0, controls)),
    g: p.g,
    h0: p.altura,
  };
  const r = resolverLancamento(atual);

  const [feitos, setFeitos] = useState<Lancamento[]>([]);
  const [voo, setVoo] = useState<{ l: Lancamento; t: number } | null>(null);
  const [acerto, setAcerto] = useState(0);
  const quadro = useRef(0);

  // Escala fixa pelo maior lançamento possível nas faixas dos sliders (mais o alvo).
  const janela = useMemo(() => {
    const e = extensaoMaxima(faixaDe(p.angulo, controls, faixas), faixaDe(p.v0, controls, faixas), p.g, p.altura);
    return {
      alcance: Math.max(e.alcance, p.alvo ? p.alvo.x + p.alvo.tolerancia * 4 : 0) * 1.08 + 1,
      altura: e.altura * 1.18 + 1,
    };
    // A janela depende só das faixas e dos valores fixos, não da posição atual dos sliders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, faixas]);

  useEffect(() => () => cancelAnimationFrame(quadro.current), []);

  const lancar = () => {
    onInteract();
    cancelAnimationFrame(quadro.current);
    const l = { ...atual };
    const T = resolverLancamento(l).tempo;
    const terminar = () => {
      setVoo(null);
      setFeitos((f) => [...f, l]);
      if (p.alvo && acertou(resolverLancamento(l).alcance, p.alvo)) setAcerto(1);
    };
    if (reduzMovimento()) {
      terminar();
      return;
    }
    const duracao = Math.min(2600, Math.max(900, T * 550));
    const inicio = performance.now();
    const passo = (agora: number) => {
      const k = Math.min(1, (agora - inicio) / duracao);
      setVoo({ l, t: T * k });
      if (k < 1) quadro.current = requestAnimationFrame(passo);
      else terminar();
    };
    setVoo({ l, t: 0 });
    quadro.current = requestAnimationFrame(passo);
  };

  useEffect(() => {
    onMetric("lancamentos", feitos.length);
    onMetric("angulos_testados", new Set(feitos.map((f) => f.angulo)).size);
    onMetric("velocidades_testadas", new Set(feitos.map((f) => f.v0)).size);
  }, [feitos, onMetric]);
  useEffect(() => onMetric("acertou_alvo", acerto), [acerto, onMetric]);
  useEffect(() => {
    onMetric("alcance", r.alcance);
    onMetric("altura_max", r.alturaMax);
    onMetric("tempo_voo", r.tempo);
  }, [r.alcance, r.alturaMax, r.tempo, onMetric]);

  const ultimo = feitos[feitos.length - 1];
  const jaLancado = !voo && ultimo !== undefined && ultimo.angulo === atual.angulo && ultimo.v0 === atual.v0;
  const anteriores = feitos.slice(0, jaLancado ? -1 : undefined).slice(-p.rastros);
  const tracos: TracoLancamento[] = anteriores.map((l) => ({
    l,
    cor: "muted",
    referencia: true,
    rotulo: `${num(l.angulo, 0)}°, ${num(l.v0)} m/s`,
  }));
  const principal = voo?.l ?? atual;
  if (voo) {
    tracos.push({ l: voo.l, cor: "c1", referencia: true });
    tracos.push({ l: voo.l, cor: "c1", ate: voo.t });
  } else {
    tracos.push({ l: atual, cor: "c1", referencia: !jaLancado });
  }

  const { ref, hover, size } = useCanvas(0.62, (ctx, w, h, hits) => {
    desenharLancamento(ctx, w, h, hits, {
      tracos,
      principal,
      mostrar: p.mostrar,
      alvo: p.alvo,
      janela,
      highlight: p.highlight,
      bola: voo ? { t: voo.t } : jaLancado ? { t: r.tempo } : undefined,
      revelar: true,
    });
  });

  const alvoTexto = p.alvo
    ? acerto
      ? "Acertou o alvo."
      : feitos.length > 0
        ? `Último lançamento: ${num(resolverLancamento(ultimo!).alcance)} m. O alvo está a ${num(p.alvo.x)} m.`
        : `Alvo a ${num(p.alvo.x)} m.`
    : null;

  return (
    <>
      <canvas
        ref={ref}
        role="img"
        aria-label={`Lançamento oblíquo: ângulo ${num(atual.angulo, 0)} graus e velocidade ${num(atual.v0)} metros por segundo`}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      <div className="sim-barra">
        <TactileButton className="sim-barra__acao" onClick={lancar} disabled={voo !== null}>
          {voo ? "Em voo…" : feitos.length ? "Lançar de novo" : "Lançar"}
        </TactileButton>
        {alvoTexto && (
          <span className={`sim-barra__nota${acerto ? " sim-barra__nota--ok" : ""}`} role="status">
            {alvoTexto}
          </span>
        )}
      </div>
      <PainelLancamento r={r} l={atual} mostrar={p.mostrar} />
    </>
  );
}
