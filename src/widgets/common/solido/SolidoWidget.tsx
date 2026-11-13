// Widget solido_3d: sólidos da geometria espacial com câmera que gira ao arrastar.
// Métricas: as da cena de cada modo (volume, volume_pi, area_*, giro, completo, camadas, diagonal, aberto, h,
// apotema, dividido, desenrolado, r_corte, razao_area, razao_volume, k, volume_menor, volume_tronco, separado,
// V, A, F, euler, serrado, solto, posicao (0 paralelas, 1 concorrentes, 2 reversas, 3 coincidentes),
// perpendiculares, lados_secao, fechado, juntou) e mais:
//   perfis_girados   perfis diferentes que já deram a volta completa (revolução)
//   solidos_vistos   sólidos diferentes já mostrados (poliedro, vistas)
//   vistas_vistas    travas de câmera usadas (frente, lado, topo)
//   posicoes_vistas  posições relativas diferentes já vistas entre as retas (espaço)
//   camera_girada    1 depois de arrastar a câmera
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Dica } from "../../../ui/Dica";
import { corDoTraco, type CorTraco } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { montarCena, type EstadoSolido } from "./cenas";
import { aspectoSolido, desenharSolido } from "./desenho";
import { Solido3d, type SolidoDe } from "./params";

function Chave({ ligada, onClick, cor = "ink", children }: { ligada: boolean; onClick: () => void; cor?: CorTraco; children: ReactNode }) {
  const k = corDoTraco(cor);
  const estilo: CSSProperties = {
    minHeight: 40,
    padding: "0 14px",
    fontSize: 14,
    ["--c" as string]: ligada ? k.main : palette.bg,
    ["--c-dark" as string]: ligada ? k.dark : palette.lineDark,
    ["--c-text" as string]: ligada ? "#FFFFFF" : palette.ink2,
  };
  return (
    <button type="button" className="btn" style={estilo} aria-pressed={ligada} onClick={onClick}>
      {children}
    </button>
  );
}

const linhaDeChaves: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, padding: "8px 10px 10px", justifyContent: "center" };
const NOMES_PERFIL: Record<string, string> = { retangulo: "retângulo", triangulo: "triângulo", trapezio: "trapézio", semicirculo: "semicírculo", anel: "afastado" };
const NOMES_SOLIDO: Record<string, string> = {
  tetraedro: "tetraedro",
  piramide_quadrada: "pirâmide",
  cubo: "cubo",
  octaedro: "octaedro",
  prisma_triangular: "prisma",
  dodecaedro: "dodecaedro",
  icosaedro: "icosaedro",
  cilindro: "cilindro",
  piramide: "pirâmide",
  bloco_l: "bloco em L",
};
const TRAVAS: Record<string, [number, number]> = { frente: [0, 0], lado: [90, 0], topo: [0, 90] };

export function SolidoWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Solido3d.parse(params), [params]);
  const [cam, setCam] = useState({ yaw: p.camera.yaw, pitch: p.camera.pitch });
  const [tocou, setTocou] = useState(false);
  const [girou, setGirou] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [perfil, setPerfil] = useState(p.modo === "revolucao" ? p.perfil : undefined);
  const [eixoTrocado, setEixoTrocado] = useState(false);
  const [indice, setIndice] = useState<number | undefined>(undefined);
  const [solidoVistas, setSolidoVistas] = useState<SolidoDe<"vistas">["solido"] | undefined>(undefined);
  const [corteVertical, setCorteVertical] = useState<boolean | undefined>(undefined);
  const [perfisGirados, setPerfisGirados] = useState<Set<string>>(new Set());
  const [solidosVistos, setSolidosVistos] = useState<Set<string>>(new Set());
  const [vistas, setVistas] = useState<Set<string>>(new Set());
  const [posicoes, setPosicoes] = useState<Set<number>>(new Set());
  const [secoesVistas, setSecoesVistas] = useState<Set<number>>(new Set());

  const estado: EstadoSolido = { perfil, eixoTrocado, indice, solidoVistas, corteVertical, yaw: (cam.yaw * Math.PI) / 180 };
  const cena = montarCena(p, controls, estado);
  const chaveMetricas = JSON.stringify(cena.metricas);

  const primeiroToque = () => {
    if (!tocou) {
      setTocou(true);
      onInteract();
    }
  };

  useEffect(() => {
    for (const [k, v] of Object.entries(JSON.parse(chaveMetricas) as Record<string, number>)) onMetric(k, v);
  }, [chaveMetricas, onMetric]);

  // Registros acumulados.
  useEffect(() => {
    if (p.modo === "revolucao" && cena.metricas.completo && perfil) setPerfisGirados((s) => (s.has(perfil + eixoTrocado) ? s : new Set(s).add(perfil + eixoTrocado)));
    if (p.modo === "poliedro") {
      const nome = p.solidos[cena.metricas.indice];
      setSolidosVistos((s) => (s.has(nome) ? s : new Set(s).add(nome)));
    }
    if (p.modo === "vistas") {
      const nome = solidoVistas ?? p.solido;
      setSolidosVistos((s) => (s.has(nome) ? s : new Set(s).add(nome)));
    }
    if (p.modo === "espaco" && cena.metricas.posicao !== undefined) {
      const ps = cena.metricas.posicao;
      setPosicoes((s) => (s.has(ps) ? s : new Set(s).add(ps)));
    }
    if (p.modo === "corte_cone" && cena.metricas.secao !== undefined) {
      const sc = cena.metricas.secao;
      setSecoesVistas((s) => (s.has(sc) ? s : new Set(s).add(sc)));
    }
  }, [chaveMetricas, p, perfil, eixoTrocado, solidoVistas]);
  useEffect(() => onMetric("perfis_girados", perfisGirados.size), [perfisGirados, onMetric]);
  useEffect(() => onMetric("solidos_vistos", solidosVistos.size), [solidosVistos, onMetric]);
  useEffect(() => onMetric("vistas_vistas", vistas.size), [vistas, onMetric]);
  useEffect(() => onMetric("posicoes_vistas", posicoes.size), [posicoes, onMetric]);
  useEffect(() => onMetric("secoes_vistas", secoesVistas.size), [secoesVistas, onMetric]);
  useEffect(() => onMetric("camera_girada", girou ? 1 : 0), [girou, onMetric]);

  const { ref, size, hover } = useCanvas(aspectoSolido(p), (ctx, w, h, hits) => {
    desenharSolido(ctx, w, h, hits, p, controls, { ...estado, yawGraus: cam.yaw, pitchGraus: cam.pitch });
  });

  // ---------- Chaves ----------
  const chaves: ReactNode[] = [];
  const botao = (key: string, ligada: boolean, rotulo: string, onClick: () => void, cor?: CorTraco) =>
    chaves.push(
      <Chave
        key={key}
        ligada={ligada}
        cor={cor}
        onClick={() => {
          primeiroToque();
          onClick();
        }}
      >
        {rotulo}
      </Chave>,
    );
  if (p.modo === "revolucao") {
    for (const pf of p.perfis) botao(pf, perfil === pf, NOMES_PERFIL[pf], () => setPerfil(pf), p.cores.r);
    if (p.chave_eixo) botao("eixo", eixoTrocado, "trocar o eixo", () => setEixoTrocado((v) => !v), p.cores.h);
  }
  if (p.modo === "poliedro" && p.solidos.length > 1 && typeof p.indice === "number")
    p.solidos.forEach((s, i) => botao(s, (indice ?? p.indice) === i, NOMES_SOLIDO[s], () => setIndice(i), p.cores.F));
  if (p.modo === "vistas") {
    for (const s of p.solidos) botao(s, (solidoVistas ?? p.solido) === s, NOMES_SOLIDO[s], () => setSolidoVistas(s), p.cores.topo);
    if (p.solido !== "dado")
      for (const [nome, [yaw, pitch]] of Object.entries(TRAVAS))
        botao(`trava-${nome}`, cam.yaw === yaw && cam.pitch === pitch, nome, () => {
          setCam({ yaw, pitch });
          setVistas((s) => new Set(s).add(nome));
        }, nome === "frente" ? p.cores.frente : nome === "lado" ? p.cores.lado : p.cores.topo);
    if (p.chave_corte && p.corte) {
      const vert = corteVertical ?? p.corte.tipo === "vertical";
      botao("corte", vert, vert ? "corte vertical" : "corte horizontal", () => setCorteVertical(!vert), p.cores.corte);
    }
  }

  return (
    <>
      <canvas
        ref={ref}
        aria-label="Sólido geométrico; arraste para girar"
        style={{ cursor: "grab", touchAction: "none" }}
        onPointerDown={(e) => {
          primeiroToque();
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          drag.current = { x: e.clientX, y: e.clientY };
          if (Math.abs(dx) + Math.abs(dy) > 0) setGirou(true);
          setCam((c) => ({ yaw: c.yaw - dx * 0.6, pitch: Math.max(-10, Math.min(90, c.pitch + dy * 0.45)) }));
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      {chaves.length > 0 && <div style={linhaDeChaves}>{chaves}</div>}
    </>
  );
}
