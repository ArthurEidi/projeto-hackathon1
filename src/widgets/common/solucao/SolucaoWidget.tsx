// Soluções e concentração (Química, 21/11): o aluno muda a massa de soluto e o volume nos sliders do
// passo e vê, no mesmo instante, o nível do líquido, a cor, a densidade de partículas e C = m/V.
// Métricas para complete_when:
//   concentracao       C em g/L (só a massa dissolvida conta)
//   concentracao_mol   C em mol/L (com massa molar)
//   saturada           1 quando sobra soluto sem dissolver
// (os sliders entram como métricas automaticamente, pelo id)
import { useEffect, useMemo } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { resolverSolucao } from "./calc";
import { desenharBequer, desenharMedidor } from "./desenho";
import { PainelSolucao } from "./PainelSolucao";
import { SolucaoParams } from "./params";

function maximoDaFaixa(e: number | string, faixas: WidgetProps["faixas"], qual: "min" | "max", controls: Record<string, number>) {
  if (typeof e === "string" && /^\$[a-z0-9_]+$/.test(e)) {
    const f = faixas?.[e.slice(1)];
    if (f) return f[qual];
  }
  return avaliarExpr(e, controls);
}

export function SolucaoWidget({ params, controls, faixas, onMetric }: WidgetProps) {
  const p = useMemo(() => SolucaoParams.parse(params), [params]);
  const massa = Math.max(0, avaliarExpr(p.massa, controls));
  const volume = Math.max(1, avaliarExpr(p.volume, controls));
  const s = p.soluto;
  const res = resolverSolucao({ massa, volume, massaMolar: s.massa_molar, solubilidade: s.solubilidade });

  // Escala fixa do medidor: a maior concentração que os sliders alcançam (ou o alvo, se maior).
  const cMax = useMemo(() => {
    const mMax = maximoDaFaixa(p.massa, faixas, "max", controls);
    const vMin = Math.max(1, maximoDaFaixa(p.volume, faixas, "min", controls));
    const teto = resolverSolucao({ massa: mMax, volume: vMin, solubilidade: s.solubilidade }).concentracao;
    return Math.max(teto, p.alvo ?? 0, 1) * 1.1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, faixas]);

  useEffect(() => {
    onMetric("concentracao", res.concentracao);
    onMetric("saturada", res.excesso > 0 ? 1 : 0);
    if (res.concentracaoMol !== null) onMetric("concentracao_mol", res.concentracaoMol);
  }, [res.concentracao, res.excesso, res.concentracaoMol, onMetric]);

  const { ref, hover, size } = useCanvas(0.72, (ctx, w, h, hits) => {
    const medidorW = Math.max(64, w * 0.17);
    let x = 0;
    if (p.referencia) {
      const rw = w * 0.27;
      desenharBequer(ctx, { x, y: h * 0.3, w: rw, h: h * 0.7 }, {
        massa: p.referencia.massa,
        volume: p.referencia.volume,
        capacidade: p.capacidade,
        porParticula: p.por_particula,
        solubilidade: s.solubilidade,
        mostrarParticulas: p.mostrar.particulas,
        fantasma: true,
        rotulo: p.referencia.rotulo,
        etiquetas: { volume: false, concentracao: false },
        highlight: [],
      }, hits);
      x += rw;
    }
    desenharBequer(ctx, { x, y: 0, w: w - x - medidorW, h }, {
      massa,
      volume,
      capacidade: p.capacidade,
      porParticula: p.por_particula,
      solubilidade: s.solubilidade,
      mostrarParticulas: p.mostrar.particulas,
      etiquetas: { volume: true, concentracao: p.mostrar.concentracao },
      highlight: p.highlight,
    }, hits);
    if (p.mostrar.concentracao) desenharMedidor(ctx, { x: w - medidorW, y: 0, w: medidorW, h }, res.concentracao, cMax, p.alvo, p.highlight);
  });

  return (
    <>
      <canvas
        ref={ref}
        role="img"
        aria-label={`Béquer com ${massa} gramas de ${s.nome} em ${volume} mililitros de solução`}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      <PainelSolucao massa={massa} volume={volume} res={res} soluto={s} mostrar={p.mostrar} referencia={p.referencia} />
    </>
  );
}
