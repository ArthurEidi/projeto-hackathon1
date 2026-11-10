// Widget grade_resultados: contagem e probabilidade com casas tocáveis, árvore, filas, Pascal…
// Métricas por modo (os sliders entram sozinhos, pelo id):
//   casas      total (casas válidas), celulas_tocadas, marcadas_certas, marcadas_erradas, modo_ou,
//              repetir_desligado, ordem_desligada, uniu, descontou, complemento_visto, pista_ligada,
//              intersecao_vista, extremos_vistos (botões de evento com chance 0 ou 1 já tocados), eventos_vistos
//   tabela     linha_tocada, coluna_tocada (quantas), linha_<rótulo>, coluna_<rótulo> (0/1; ex.: linha_meninas)
//   arvore     total (pontas), pontas_tocadas, pontas_k0..pontas_kN (pontas tocadas com k sucessos), chave_ligada
//   fila       filas_montadas, iguais_ligado, letra_presa, total (ordens possíveis com as chaves atuais)
//   escada     total (produto)        lista   total        barras  total (C(n, k) ou P(k) em %)
//   pascal     numeros_tocados        bolinhas_e_barras  distribuicoes_vistas, total
//   caixas     total, regra_ligada, distribuicoes_vistas      colunas  total, modo_ou
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Dica } from "../../../ui/Dica";
import { corDoTraco, type CorTraco } from "../../../ui/marcas";
import { palette } from "../../../ui/palette";
import { useCanvas, type Pt } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { arranjo, comb, moverBarra, pertence, slug } from "./calc";
import {
  aspectoGrade,
  criterio,
  degraus,
  desenharGrade,
  distribuicoesCaixas,
  modeloArvore,
  modeloCasas,
  ordensFila,
  sequenciaDe,
  textoOrdem,
  valoresBarras,
  type GeoGrade,
} from "./desenho";
import { GradeResultados } from "./params";

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
const dentro = (r: { x: number; y: number; w: number; h: number }, p: Pt) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

export function GradeWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => GradeResultados.parse(params), [params]);
  const geo = useRef<GeoGrade | null>(null);
  const arrastando = useRef<number | null>(null);
  const [tocou, setTocou] = useState(false);
  const [vistos, setVistos] = useState<Set<string>>(new Set());
  const ligar = (k: string) => setVistos((s) => (s.has(k) ? s : new Set(s).add(k)));

  // casas
  const [acesas, setAcesas] = useState<Set<string>>(new Set(p.modo === "casas" ? p.acesas : []));
  const [repetir, setRepetir] = useState(p.modo === "casas" ? p.repetir : true);
  const [ordem, setOrdem] = useState(p.modo === "casas" || p.modo === "lista" ? p.ordem : true);
  const [ou, setOu] = useState(p.modo === "casas" || p.modo === "colunas" ? p.ou : false);
  const [pista, setPista] = useState(p.modo === "casas" ? p.pista : false);
  const [uniao, setUniao] = useState(false);
  const [semRepetidas, setSemRepetidas] = useState(false);
  const [complemento, setComplemento] = useState(false);
  const [intersecao, setIntersecao] = useState(false);
  const [botao, setBotao] = useState<number | undefined>(undefined);
  const [extremos, setExtremos] = useState<Set<number>>(new Set());
  // tabela
  const [pistaLinha, setPistaLinha] = useState<number | undefined>(p.modo === "tabela" ? p.pista_linha : undefined);
  const [pistaColuna, setPistaColuna] = useState<number | undefined>(p.modo === "tabela" ? p.pista_coluna : undefined);
  const [linhasTocadas, setLinhasTocadas] = useState<Set<number>>(new Set());
  const [colunasTocadas, setColunasTocadas] = useState<Set<number>>(new Set());
  // arvore
  const [pontas, setPontas] = useState<Set<number>>(new Set(p.modo === "arvore" ? p.acesas : []));
  const [um, setUm] = useState(false);
  // fila
  const L = p.modo === "fila" ? (p.lugares ?? p.itens.length) : 0;
  const [colocados, setColocados] = useState<number[]>(() => Array<number>(L).fill(-1));
  const [montadas, setMontadas] = useState<string[]>([]);
  const [iguais, setIguais] = useState(p.modo === "fila" ? p.iguais_ligado : false);
  const [preso, setPreso] = useState(p.modo === "fila" ? p.preso : false);
  // pascal
  const [tocada, setTocada] = useState<[number, number] | undefined>(p.modo === "pascal" ? p.tocada : undefined);
  const [numeros, setNumeros] = useState<Set<string>>(new Set());
  // bolinhas e barras
  const [seq, setSeq] = useState<boolean[]>(() => (p.modo === "bolinhas_e_barras" ? sequenciaDe(p) : []));
  const [fileiras, setFileiras] = useState<Set<string>>(new Set());
  // caixas
  const [minimo, setMinimo] = useState(p.modo === "caixas" ? p.minimo : false);
  const [distribuicao, setDistribuicao] = useState(0);
  const [dists, setDists] = useState<Set<number>>(new Set([0]));

  const primeiroToque = () => {
    if (!tocou) {
      setTocou(true);
      onInteract();
    }
  };

  // ---------- Métricas ----------
  const estadoCasas = { acesas, repetir, ordem, ou, pista, botao };
  useEffect(() => {
    if (p.modo !== "casas") return;
    const m = modeloCasas(p, controls, estadoCasas);
    const validas = m.casas.filter((k) => m.valida(k) && !m.fora(k));
    const ev = p.evento ? criterio(p.evento, controls) : null;
    const lit = validas.filter((k) => acesas.has(k.chave));
    onMetric("total", validas.length);
    onMetric("celulas_tocadas", lit.length);
    onMetric("marcadas_certas", ev ? lit.filter((k) => pertence(k, ev)).length : lit.length);
    onMetric("marcadas_erradas", ev ? lit.filter((k) => !pertence(k, ev)).length : 0);
  }, [p, controls, acesas, repetir, ordem, ou, pista, botao, onMetric]);
  useEffect(() => {
    if (p.modo !== "casas") return;
    onMetric("modo_ou", vistos.has("ou") ? 1 : 0);
    onMetric("repetir_desligado", vistos.has("repetir") ? 1 : 0);
    onMetric("ordem_desligada", vistos.has("ordem") ? 1 : 0);
    onMetric("uniu", vistos.has("unir") ? 1 : 0);
    onMetric("descontou", vistos.has("tirar_repetidas") ? 1 : 0);
    onMetric("complemento_visto", vistos.has("complemento") ? 1 : 0);
    onMetric("pista_ligada", vistos.has("pista") ? 1 : 0);
    onMetric("intersecao_vista", vistos.has("a_e_b") ? 1 : 0);
    onMetric("extremos_vistos", extremos.size);
    onMetric("eventos_vistos", [...vistos].filter((v) => v.startsWith("evento")).length);
  }, [p.modo, vistos, extremos, onMetric]);

  useEffect(() => {
    if (p.modo !== "tabela") return;
    onMetric("linha_tocada", linhasTocadas.size);
    onMetric("coluna_tocada", colunasTocadas.size);
    p.linhas.forEach((l, i) => onMetric(`linha_${slug(l.rotulo)}`, linhasTocadas.has(i) ? 1 : 0));
    p.colunas.forEach((col, j) => onMetric(`coluna_${slug(col)}`, colunasTocadas.has(j) ? 1 : 0));
  }, [p, linhasTocadas, colunasTocadas, onMetric]);

  useEffect(() => {
    if (p.modo !== "arvore") return;
    const m = modeloArvore(p, controls);
    onMetric("total", m.caminhos.length);
    onMetric("pontas_tocadas", [...pontas].filter((i) => i < m.caminhos.length).length);
    for (let k = 0; k <= m.niveis.length; k++) onMetric(`pontas_k${k}`, [...pontas].filter((i) => m.caminhos[i] && m.sucessos(m.caminhos[i]) === k).length);
    onMetric("chave_ligada", vistos.has("um") ? 1 : 0);
  }, [p, controls, pontas, vistos, onMetric]);

  useEffect(() => {
    if (p.modo !== "fila") return;
    onMetric("filas_montadas", montadas.length);
    onMetric("iguais_ligado", vistos.has("iguais") ? 1 : 0);
    onMetric("letra_presa", vistos.has("preso") ? 1 : 0);
    const ordens = ordensFila(p, preso && !!p.prender);
    onMetric("total", new Set(ordens.map((o) => textoOrdem(p, o, iguais))).size);
  }, [p, montadas, vistos, preso, iguais, onMetric]);

  useEffect(() => {
    if (p.modo === "escada") onMetric("total", degraus(p, controls).reduce((s, v) => s * v, 1));
    if (p.modo === "lista") {
      const k = Math.max(1, Math.min(p.itens.length, Math.round(avaliarExpr(p.k, controls))));
      onMetric("total", ordem ? arranjo(p.itens.length, k) : comb(p.itens.length, k));
      onMetric("ordem_desligada", vistos.has("ordem") ? 1 : 0);
    }
    if (p.modo === "barras") {
      const b = valoresBarras(p, controls);
      if (b.k !== null) onMetric("total", b.pp === null ? b.vals[b.k] : Math.round(b.vals[b.k] * 1000) / 10);
    }
    if (p.modo === "colunas") {
      const ns = p.colunas.map((col) => col.itens.length);
      onMetric("total", ou ? ns.reduce((s, v) => s + v, 0) : ns.reduce((s, v) => s * v, 1));
      onMetric("modo_ou", vistos.has("ou") ? 1 : 0);
    }
  }, [p, controls, ordem, ou, vistos, onMetric]);

  useEffect(() => {
    if (p.modo === "pascal") onMetric("numeros_tocados", numeros.size);
  }, [p.modo, numeros, onMetric]);
  useEffect(() => {
    if (p.modo !== "bolinhas_e_barras") return;
    onMetric("distribuicoes_vistas", fileiras.size);
    onMetric("total", comb(p.bolinhas + p.barras, p.barras));
  }, [p, fileiras, onMetric]);
  useEffect(() => {
    if (p.modo === "bolinhas_e_barras") setFileiras((f) => (f.has(seq.join()) ? f : new Set(f).add(seq.join())));
  }, [p.modo, seq]);
  useEffect(() => {
    if (p.modo !== "caixas") return;
    onMetric("total", distribuicoesCaixas(p, controls, minimo).length);
    onMetric("regra_ligada", vistos.has("minimo") ? 1 : 0);
    onMetric("distribuicoes_vistas", dists.size);
  }, [p, controls, minimo, vistos, dists, onMetric]);

  // ---------- Desenho ----------
  const { ref, size, hover } = useCanvas(aspectoGrade(p), (ctx, w, h, hits) => {
    geo.current = desenharGrade(ctx, w, h, hits, p, controls, {
      ...estadoCasas,
      uniao,
      semRepetidas,
      complemento,
      intersecao,
      pistaLinha,
      pistaColuna,
      pontas,
      um,
      colocados,
      montadas,
      iguais,
      preso,
      tocada,
      sequencia: seq,
      vistas: p.modo === "bolinhas_e_barras" ? fileiras.size : undefined,
      minimo,
      distribuicao,
    });
  });

  // ---------- Toque ----------
  const tocar = (q: Pt) => {
    const g = geo.current;
    if (!g) return;
    const alvo = [...g.alvos].reverse().find((a) => dentro(a.r, q));
    if (p.modo === "bolinhas_e_barras") {
      if (alvo?.tipo === "barra") arrastando.current = Number(alvo.id);
      return;
    }
    if (!alvo) return;
    const id = alvo.id;
    switch (alvo.tipo) {
      case "casa":
        setAcesas((s) => {
          const n = new Set(s);
          if (n.has(id)) n.delete(id);
          else n.add(id);
          return n;
        });
        break;
      case "linha":
        setPistaLinha(Number(id));
        setPistaColuna(undefined);
        setLinhasTocadas((s) => new Set(s).add(Number(id)));
        break;
      case "coluna":
        setPistaColuna(Number(id));
        setPistaLinha(undefined);
        setColunasTocadas((s) => new Set(s).add(Number(id)));
        break;
      case "ponta":
        setPontas((s) => {
          const n = new Set(s);
          const i = Number(id);
          if (n.has(i)) n.delete(i);
          else n.add(i);
          return n;
        });
        break;
      case "ficha": {
        if (p.modo !== "fila") break;
        const travado = preso && p.prender ? p.prender.lugar : -1;
        const vazio = colocados.findIndex((v, i) => v < 0 && i !== travado);
        if (vazio < 0) break;
        const novo = colocados.map((v, i) => (i === vazio ? Number(id) : v));
        setColocados(novo);
        const completa = novo.every((v, i) => v >= 0 || i === travado);
        if (completa) {
          const ordemTxt = textoOrdem(p, novo.map((v, i) => (i === travado ? p.prender!.item : v)), false);
          setMontadas((m) => (m.includes(ordemTxt) ? m : [...m, ordemTxt]));
        }
        break;
      }
      case "lugar":
        setColocados((c) => c.map((v, i) => (i === Number(id) ? -1 : v)));
        break;
      case "numero": {
        const [lin, k] = id.split(",").map(Number);
        setTocada([lin, k]);
        setNumeros((s) => new Set(s).add(id));
        break;
      }
      case "distribuicao":
        setDistribuicao(Number(id));
        setDists((s) => new Set(s).add(Number(id)));
        break;
    }
  };

  const mover = (q: Pt) => {
    const g = geo.current;
    const de = arrastando.current;
    if (!g?.slotsX || de === null) return;
    let alvo = 0;
    g.slotsX.forEach((x, i) => {
      if (Math.abs(x - q.x) < Math.abs(g.slotsX![alvo] - q.x)) alvo = i;
    });
    if (alvo === de) return;
    setSeq((s) => moverBarra(s, de, alvo));
    arrastando.current = alvo;
  };

  // ---------- Chaves ----------
  const chaves: ReactNode[] = [];
  const botaoChave = (key: string, ligada: boolean, rotulo: string, onClick: () => void, cor?: CorTraco) =>
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

  if (p.modo === "casas") {
    for (const k of p.chaves) {
      if (k === "repetir")
        botaoChave(k, repetir, "pode repetir", () => {
          setRepetir((v) => !v);
          if (repetir) ligar(k);
        }, p.cores.fora);
      if (k === "ordem")
        botaoChave(k, ordem, "a ordem importa", () => {
          setOrdem((v) => !v);
          if (ordem) ligar(k);
        }, p.cores.fora);
      if (k === "e_ou")
        botaoChave(k, ou, ou ? "ou" : "e", () => {
          setOu((v) => !v);
          ligar("ou");
        });
      if (k === "unir") botaoChave(k, uniao, "unir", () => (setUniao(true), ligar(k)), p.cores.intersecao);
      if (k === "tirar_repetidas") botaoChave(k, semRepetidas, "tirar repetidas", () => (setUniao(true), setSemRepetidas(true), ligar(k)), p.cores.intersecao);
      if (k === "complemento") botaoChave(k, complemento, "complemento", () => (setComplemento((v) => !v), ligar(k)), p.cores.fora);
      if (k === "pista") botaoChave(k, pista, `pista: ${p.rotulos_eventos.b}`, () => (setPista((v) => !v), ligar(k)), p.cores.b);
      if (k === "a_e_b") botaoChave(k, intersecao, `${p.rotulos_eventos.a} e ${p.rotulos_eventos.b}`, () => (setIntersecao((v) => !v), ligar(k)), p.cores.intersecao);
    }
    p.botoes_evento.forEach((b, i) =>
      botaoChave(`ev-${i}`, botao === i, b.rotulo, () => {
        setBotao(i);
        ligar(`evento-${i}`);
        const m = modeloCasas(p, controls, { ...estadoCasas, botao: i });
        const validas = m.casas.filter((k) => m.valida(k) && !m.fora(k));
        const f = validas.filter(m.emEvento).length;
        if (f === 0 || f === validas.length) setExtremos((s) => new Set(s).add(i));
      }, "c4"),
    );
  }
  if (p.modo === "arvore" && p.chave_um) botaoChave("um", um, "a = b = 1", () => (setUm((v) => !v), ligar("um")), p.cor_ponta);
  if (p.modo === "fila") {
    if (montadas.length && colocados.some((v) => v >= 0)) botaoChave("nova", false, "nova fila", () => setColocados(Array<number>(L).fill(-1)));
    if (p.iguais) botaoChave("iguais", iguais, "iguais são iguais", () => (setIguais((v) => !v), ligar("iguais")), p.cores.igual);
    if (p.prender)
      botaoChave("preso", preso, `prender ${p.itens[p.prender.item]}`, () => {
        setPreso((v) => !v);
        ligar("preso");
        setColocados((c) => c.map((v) => (v === p.prender!.item ? -1 : v)));
      }, p.cores.cadeado);
  }
  if (p.modo === "lista") botaoChave("ordem", ordem, "a ordem importa", () => (setOrdem((v) => !v), ligar("ordem")), p.cores.grupo);
  if (p.modo === "caixas" && p.chave_minimo)
    botaoChave("minimo", minimo, "cada um ganha pelo menos 1", () => (setMinimo((v) => !v), setDistribuicao(0), ligar("minimo")), p.cores.minimo);
  if (p.modo === "colunas") botaoChave("ou", ou, ou ? "ou" : "e", () => (setOu((v) => !v), ligar("ou")));

  const arrastavel = p.modo === "bolinhas_e_barras";
  return (
    <>
      <canvas
        ref={ref}
        aria-label="Casos possíveis"
        style={{ cursor: "pointer", touchAction: arrastavel ? "none" : undefined }}
        onPointerDown={(e) => {
          primeiroToque();
          const b = e.currentTarget.getBoundingClientRect();
          tocar({ x: e.clientX - b.left, y: e.clientY - b.top });
          if (arrastando.current !== null) e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (arrastando.current === null) return;
          const b = e.currentTarget.getBoundingClientRect();
          mover({ x: e.clientX - b.left, y: e.clientY - b.top });
        }}
        onPointerUp={() => (arrastando.current = null)}
        onPointerCancel={() => (arrastando.current = null)}
      />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      {chaves.length > 0 && <div style={linhaDeChaves}>{chaves}</div>}
    </>
  );
}
