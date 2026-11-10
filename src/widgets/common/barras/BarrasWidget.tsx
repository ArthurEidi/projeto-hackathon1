// Widget barras: estatística (categorias, amostragem, pontos, fila), sequências e parte/todo.
// Métricas por modo (os sliders entram sozinhos, pelo id):
//   categorias  barras_tocadas, tipo_linha, tipo_setores (0/1: já escolheu), regua_relativa, respostas
//   amostragem  amostra_pct (% medida da categoria acompanhada), erro (|medida − real|), vicio_ligado, amostras
//   pontos      arrastes, equilibrio (0/1), maior_valor, media, mediana, desvios_ligados, quadrados_ligados,
//               somou, fila_ligada, meios_tocados
//   fila        ordenou, q1_certo, q2_certo, q3_certo, cortes_certos (Q1 e Q3), caixa_desenhada, maior_valor, atipicos
//   sequencia   termo_n, soma_n, sinal_trocou (0/1), barras_tocadas
//   parte_todo  fracao, porcento, pintadas, partes, equivalente (0/1)
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Dica } from "../../../ui/Dica";
import { corDoTraco, type CorTraco } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { useCanvas, type Pt } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { encaixar } from "../plot2d";
import { caixa, media, mediana, ordenar, posicoesQuartis } from "./calc";
import { amostra, aspectoBarras, desenharBarras, parteTodo, termosSequencia, valoresPontos, type Geo, type Quartil } from "./desenho";
import { Barras, type BarrasDe } from "./params";

const TOL = 1e-9;

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

const local = (e: { clientX: number; clientY: number }, el: HTMLElement): Pt => {
  const b = el.getBoundingClientRect();
  return { x: e.clientX - b.left, y: e.clientY - b.top };
};
const dentro = (r: { x: number; y: number; w: number; h: number }, p: Pt) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

type Arraste = { tipo: "peso"; i: number } | { tipo: "apoio" } | { tipo: "marcador"; q: Quartil } | { tipo: "maior" } | null;

export function BarrasWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Barras.parse(params), [params]);
  const [tocou, setTocou] = useState(false);
  const geo = useRef<Geo | null>(null);
  const arraste = useRef<Arraste>(null);

  // Estado comum a vários modos.
  const [tocadas, setTocadas] = useState<Set<number>>(new Set());
  const [tipo, setTipo] = useState(p.modo === "categorias" ? p.tipo : "barras");
  const [vistos, setVistos] = useState<Set<string>>(new Set());
  const [relativa, setRelativa] = useState(p.modo === "categorias" ? p.relativa : false);
  const [extra, setExtra] = useState<number[]>(p.modo === "categorias" ? p.categorias.map(() => 0) : []);
  const [vicio, setVicio] = useState(p.modo === "amostragem" ? p.vicio_ligado : false);
  const [rastro, setRastro] = useState<{ n: number; pct: number }[]>([]);
  const [valores, setValores] = useState<number[] | null>(null);
  const [apoio, setApoio] = useState<number | undefined>(p.modo === "pontos" && p.apoio === "arrastavel" ? (p.apoio_inicial ?? p.regua[0]) : undefined);
  const [arrastes, setArrastes] = useState(0);
  const [mostrar, setMostrar] = useState<Partial<BarrasDe<"pontos">["mostrar"]>>({});
  const [meios, setMeios] = useState<Set<number>>(new Set());
  const [ordenada, setOrdenada] = useState(p.modo === "fila" ? p.ordenada : false);
  const [marcadores, setMarcadores] = useState<Partial<Record<Quartil, number>>>(() => {
    if (p.modo !== "fila") return {};
    const ult = 2 * (p.valores.length - 1);
    return Object.fromEntries(p.arrastaveis.map((q) => [q, q === "q3" ? ult : 0]));
  });
  const [mostrarCaixa, setMostrarCaixa] = useState(p.modo === "fila" ? p.caixa : false);
  const [maior, setMaior] = useState<number | undefined>(p.modo === "fila" && p.maior_arrastavel ? Math.max(...p.valores) : undefined);

  const primeiroToque = () => {
    if (!tocou) {
      setTocou(true);
      onInteract();
    }
  };

  // Valores vivos dos pesos: seguem os sliders até o primeiro arraste.
  const vals = p.modo === "pontos" ? (valores ?? valoresPontos(p, controls)) : [];

  // ---------- Métricas ----------
  useEffect(() => {
    if (p.modo === "categorias" || p.modo === "sequencia") onMetric("barras_tocadas", tocadas.size);
  }, [p.modo, tocadas, onMetric]);

  useEffect(() => {
    if (p.modo !== "categorias") return;
    onMetric("tipo_linha", vistos.has("linha") ? 1 : 0);
    onMetric("tipo_setores", vistos.has("setores") ? 1 : 0);
    onMetric("regua_relativa", vistos.has("relativa") ? 1 : 0);
    onMetric("respostas", extra.reduce((s, x) => s + x, 0));
  }, [p.modo, vistos, extra, onMetric]);

  const nAmostra = p.modo === "amostragem" ? Math.max(1, Math.round(avaliarExpr(p.n, controls))) : 0;
  useEffect(() => {
    if (p.modo !== "amostragem") return;
    const pct = amostra(p, nAmostra, vicio)[p.destaque];
    setRastro((r) => (r.some((q) => q.n === nAmostra && q.pct === pct) ? r : [...r, { n: nAmostra, pct }]));
    onMetric("amostra_pct", pct);
    onMetric("erro", Math.abs(pct - p.populacao[p.destaque].pct));
    onMetric("vicio_ligado", vicio ? 1 : 0);
  }, [p, nAmostra, vicio, onMetric]);
  useEffect(() => {
    if (p.modo === "amostragem") onMetric("amostras", rastro.length);
  }, [p.modo, rastro, onMetric]);

  const valsChave = vals.join(",");
  useEffect(() => {
    if (p.modo !== "pontos") return;
    const v = valsChave.split(",").map(Number);
    const m = media(v);
    const ap = apoio ?? (p.apoio === "media" ? m : p.apoio === "arrastavel" ? m : p.apoio);
    onMetric("media", m);
    onMetric("mediana", mediana(v));
    onMetric("maior_valor", Math.max(...v));
    onMetric("equilibrio", Math.abs(ap - m) < TOL ? 1 : 0);
  }, [p, valsChave, apoio, onMetric]);
  useEffect(() => {
    if (p.modo !== "pontos") return;
    onMetric("arrastes", arrastes);
    onMetric("desvios_ligados", vistos.has("desvios") ? 1 : 0);
    onMetric("quadrados_ligados", vistos.has("quadrados") ? 1 : 0);
    onMetric("somou", vistos.has("somar") ? 1 : 0);
    onMetric("fila_ligada", vistos.has("fila") ? 1 : 0);
    onMetric("meios_tocados", meios.size);
  }, [p.modo, arrastes, vistos, meios, onMetric]);

  useEffect(() => {
    if (p.modo !== "fila") return;
    const n = p.valores.length;
    const certos = posicoesQuartis(n);
    const ok = (q: Quartil) => (ordenada && (p.fixos.includes(q) || marcadores[q] === certos[q]) ? 1 : 0);
    onMetric("ordenou", ordenada ? 1 : 0);
    onMetric("q1_certo", ok("q1"));
    onMetric("q2_certo", ok("q2"));
    onMetric("q3_certo", ok("q3"));
    onMetric("cortes_certos", (p.arrastaveis.includes("q1") ? ok("q1") : 0) + (p.arrastaveis.includes("q3") ? ok("q3") : 0));
    onMetric("caixa_desenhada", mostrarCaixa ? 1 : 0);
    const base = [...p.valores];
    if (maior !== undefined) base[base.indexOf(Math.max(...base))] = maior;
    onMetric("maior_valor", Math.max(...base));
    onMetric("atipicos", caixa(base).atipicos.length);
  }, [p, ordenada, marcadores, mostrarCaixa, maior, onMetric]);

  const seq = p.modo === "sequencia" ? termosSequencia(p, controls) : null;
  useEffect(() => {
    if (!seq) return;
    const acesos = seq.t.slice(0, seq.nAceso);
    onMetric("termo_n", seq.nAceso ? seq.t[seq.nAceso - 1] : 0);
    onMetric("soma_n", seq.nAceso ? seq.somas[seq.nAceso - 1] : 0);
    onMetric("sinal_trocou", acesos.some((x) => x > 0) && acesos.some((x) => x < 0) ? 1 : 0);
  }, [seq?.t.join(","), seq?.nAceso, onMetric]);

  const pt = p.modo === "parte_todo" ? parteTodo(p, controls) : null;
  useEffect(() => {
    if (!pt) return;
    onMetric("fracao", pt.fracao);
    onMetric("porcento", pt.porcento);
    onMetric("pintadas", pt.pintadas);
    onMetric("partes", pt.partes);
    onMetric("equivalente", pt.equivalente ? 1 : 0);
  }, [pt?.fracao, pt?.pintadas, pt?.partes, pt?.equivalente, onMetric]);

  // ---------- Desenho ----------
  const { ref, size, hover } = useCanvas(aspectoBarras(p), (ctx, w, h, hits) => {
    geo.current = desenharBarras(ctx, w, h, hits, p, controls, {
      tipo,
      relativa,
      tocadas,
      extra,
      vicio,
      rastro,
      valores: p.modo === "pontos" ? vals : undefined,
      apoio,
      mostrar,
      meios,
      ordenada,
      marcadores,
      caixa: mostrarCaixa,
      maior,
    });
    // Convite ao arraste nos pesos móveis.
    const g = geo.current;
    if (!tocou && p.modo === "pontos" && g.pesos) {
      for (const i of p.arrastaveis) {
        const c = g.pesos[i];
        if (!c) continue;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = palette.lineDark;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  });

  // ---------- Toque e arraste ----------
  const ligar = (k: string) => setVistos((s) => (s.has(k) ? s : new Set(s).add(k)));

  const tocar = (q: Pt) => {
    const g = geo.current;
    if (!g) return;
    if (p.modo === "categorias" || p.modo === "sequencia") {
      let i = g.alvos.findIndex((r) => dentro(r, q));
      if (p.modo === "categorias" && tipo === "setores" && g.alvos[0]) {
        // Setores: o índice vem do ângulo do toque.
        const r = g.alvos[0];
        const cx = r.x + r.w / 2;
        const cy = r.y + r.h / 2;
        if (Math.hypot(q.x - cx, q.y - cy) > r.w / 2) return;
        let a = Math.atan2(q.y - cy, q.x - cx) + Math.PI / 2;
        if (a < 0) a += Math.PI * 2;
        const v = p.categorias.map((c, j) => avaliarExpr(c.valor, controls) + (extra[j] ?? 0));
        const tot = v.reduce((s, x) => s + x, 0);
        let acc = 0;
        i = v.findIndex((x) => (acc += (x / tot) * Math.PI * 2) >= a);
      }
      if (i >= 0) setTocadas((s) => (s.has(i) ? s : new Set(s).add(i)));
      return;
    }
    if (p.modo === "pontos") {
      if (vistos.has("fila") || p.mostrar.fila) {
        const i = g.alvos.findIndex((r) => dentro(r, q));
        if (i >= 0 && p.tocar_meios) {
          const n = vals.length;
          const meio = n % 2 ? [n >> 1] : [n / 2 - 1, n / 2];
          if (meio.includes(i)) setMeios((s) => (s.has(i) ? s : new Set(s).add(i)));
          return;
        }
      }
      if (g.pesos) {
        let melhor = -1;
        let dist = 30;
        p.arrastaveis.forEach((i) => {
          const c = g.pesos![i];
          const d = c ? Math.hypot(c.x - q.x, c.y - q.y) : Infinity;
          if (d < dist) [melhor, dist] = [i, d];
        });
        if (melhor >= 0) {
          arraste.current = { tipo: "peso", i: melhor };
          if (!valores) setValores(vals);
          return;
        }
      }
      if (p.apoio === "arrastavel" && g.apoio && Math.abs(q.x - g.apoio.x) < 34 && Math.abs(q.y - g.apoio.y) < 50) arraste.current = { tipo: "apoio" };
      return;
    }
    if (p.modo === "fila") {
      if (maior !== undefined && g.yRegua !== undefined && g.X && Math.abs(q.y - g.yRegua) < 30) {
        arraste.current = { tipo: "maior" };
        mover(q);
        return;
      }
      if (ordenada && g.posX && g.yMarcadores && q.y > g.yMarcadores[0] - 20 && q.y < g.yMarcadores[1] + 30) {
        // Pega o marcador arrastável mais perto do toque.
        let melhor: Quartil | null = null;
        let dist = 40;
        for (const k of p.arrastaveis) {
          const pos = marcadores[k];
          if (pos === undefined) continue;
          const d = Math.abs(g.posX(pos) - q.x);
          if (d < dist) [melhor, dist] = [k, d];
        }
        if (melhor) arraste.current = { tipo: "marcador", q: melhor };
      }
    }
  };

  const mover = (q: Pt) => {
    const g = geo.current;
    const a = arraste.current;
    if (!g || !a) return;
    if (p.modo === "pontos" && g.xDe) {
      const v = encaixar(g.xDe(q.x), p.passo, p.regua[0], p.regua[1]);
      if (a.tipo === "peso") setValores((cur) => (cur ?? vals).map((x, j) => (j === a.i ? v : x)));
      if (a.tipo === "apoio") setApoio(v);
    }
    if (p.modo === "fila") {
      if (a.tipo === "maior" && g.xDe && p.maior_arrastavel) {
        const piso = ordenar(p.valores).at(-2) ?? 0;
        setMaior(encaixar(g.xDe(q.x), p.maior_arrastavel.passo, piso, p.maior_arrastavel.ate));
      }
      if (a.tipo === "marcador" && g.posX) {
        const n = p.valores.length;
        let melhor = 0;
        for (let pos = 1; pos <= 2 * (n - 1); pos++) if (Math.abs(g.posX(pos) - q.x) < Math.abs(g.posX(melhor) - q.x)) melhor = pos;
        setMarcadores((m) => (m[a.q] === melhor ? m : { ...m, [a.q]: melhor }));
      }
    }
  };

  const soltar = () => {
    if (arraste.current?.tipo === "peso" || arraste.current?.tipo === "apoio") setArrastes((n) => n + 1);
    arraste.current = null;
  };

  // ---------- Chaves (botões abaixo do canvas) ----------
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

  if (p.modo === "categorias") {
    if (p.tipos.length > 1)
      for (const t of p.tipos)
        botao(`tipo-${t}`, tipo === t, t, () => {
          setTipo(t);
          ligar(t);
        });
    if (p.chave_relativa)
      botao("rel", relativa, relativa ? "em %" : "contagem", () => {
        setRelativa((r) => !r);
        ligar("relativa");
      });
    if (p.coleta)
      p.categorias.forEach((c, i) => botao(`col-${i}`, false, `+ ${c.nome}`, () => setExtra((x) => x.map((v, j) => (j === i ? v + 1 : v)))));
  }
  if (p.modo === "amostragem" && p.vicio) botao("vicio", vicio, p.vicio.rotulo, () => setVicio((v) => !v), "c3");
  if (p.modo === "pontos") {
    const alterna = (k: "desvios" | "quadrados" | "fila" | "soma_desvios", id: string) => {
      setMostrar((m) => ({ ...m, [k]: !(m[k] ?? p.mostrar[k]) }));
      ligar(id);
    };
    for (const k of p.chaves) {
      if (k === "desvios") botao(k, mostrar.desvios ?? p.mostrar.desvios, "desvios", () => alterna("desvios", k), p.cores.desvio);
      if (k === "quadrados") botao(k, mostrar.quadrados ?? p.mostrar.quadrados, "quadrados", () => alterna("quadrados", k), p.cores.quadrado);
      if (k === "fila") botao(k, mostrar.fila ?? p.mostrar.fila, "pôr em fila", () => alterna("fila", k));
      if (k === "somar") botao(k, mostrar.soma_desvios ?? p.mostrar.soma_desvios, "somar desvios", () => alterna("soma_desvios", k), p.cores.desvio);
    }
  }
  if (p.modo === "fila") {
    if (!p.ordenada) botao("ordem", ordenada, "pôr em fila", () => setOrdenada(true));
    if (p.chave_caixa) botao("caixa", mostrarCaixa, "desenhar caixa", () => setMostrarCaixa(true), p.cores.caixa);
  }

  const arrastavel = (p.modo === "pontos" && (p.arrastaveis.length > 0 || p.apoio === "arrastavel")) || (p.modo === "fila" && (p.arrastaveis.length > 0 || maior !== undefined));

  return (
    <>
      <canvas
        ref={ref}
        aria-label="Gráfico de barras"
        style={{ cursor: arrastavel ? "grab" : "pointer", touchAction: arrastavel ? "none" : undefined }}
        onPointerDown={(e) => {
          primeiroToque();
          const q = local(e, e.currentTarget);
          tocar(q);
          if (arraste.current) e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => arraste.current && mover(local(e, e.currentTarget))}
        onPointerUp={soltar}
        onPointerCancel={soltar}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      {chaves.length > 0 && <div style={linhaDeChaves}>{chaves}</div>}
    </>
  );
}
