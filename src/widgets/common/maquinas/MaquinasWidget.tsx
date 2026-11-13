import { useEffect, useMemo, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { Chave, linhaDeChaves } from "../geo/Controles";
import { alternar, cadeia, contagens } from "./calc";
import { desenhar } from "./desenho";
import { Maquinas } from "./params";
export function MaquinasWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Maquinas.parse(params), [params]);
  const [s, setS] = useState({ ligacoes: p.modo === "flechas" ? p.ligacoes : [] as [number, number][], entrada: 0, x: null as number | null, ordem: p.modo === "maquinas" && p.ordem_invertida, inversa: p.modo === "maquinas" && p.inversa, testadas: [] as number[], ordens: [] as boolean[], inversaTestada: false });
  const x = s.x ?? (p.modo === "maquinas" ? avaliarExpr(p.x, controls) : 0);
  const { ref, hover, size } = useCanvas(1.05, (ctx, w, h, hits) => desenhar(ctx, w, h, hits, p, controls, s.ligacoes, x, s.ordem, s.inversa));
  useEffect(() => {
    onMetric("entradas_com_uma_saida", p.modo === "flechas" ? contagens(p.entradas.length, s.ligacoes).filter(n => n === 1).length : 0);
    onMetric("entradas_testadas", s.testadas.length); onMetric("ordens_testadas", s.ordens.length); onMetric("inversa_testada", Number(s.inversaTestada));
  }, [p, s, onMetric]);
  const testar = () => { onInteract(); if (p.modo !== "maquinas") return; const c = cadeia(p, controls, x, s.ordem, s.inversa); if (s.inversa && !c.invertivel) return; setS(old => ({ ...old, testadas: old.testadas.includes(x) ? old.testadas : [...old.testadas, x], ordens: old.ordens.includes(old.ordem) ? old.ordens : [...old.ordens, old.ordem], inversaTestada: old.inversaTestada || old.inversa })); };
  return <><canvas ref={ref} aria-label="Relações e máquinas de função" />{hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
    {p.modo === "flechas" ? <>
      <p style={{ textAlign: "center" }}>Escolha a entrada e toque nas saídas para ligar ou desligar.</p>
      <div style={linhaDeChaves}>{p.entradas.map((a, i) => <Chave key={i} cor="c1" ligada={s.entrada === i} onClick={() => { onInteract(); setS(old => ({ ...old, entrada: i })); }}>Entrada {a}</Chave>)}</div>
      <div style={linhaDeChaves}>{p.saidas.map((b, i) => <Chave key={i} cor="c2" ligada={s.ligacoes.some(l => l[0] === s.entrada && l[1] === i)} onClick={() => { onInteract(); setS(old => ({ ...old, ligacoes: alternar(old.ligacoes, old.entrada, i) })); }}>Saída {b}</Chave>)}</div>
    </> : <>
      <div style={linhaDeChaves}>{p.entradas.map((n, i) => <Chave key={i} ligada={x === n} onClick={() => { onInteract(); setS(old => ({ ...old, x: n })); }}>x = {n}</Chave>)}</div>
      <div style={linhaDeChaves}><Chave ligada={s.ordem} onClick={() => { onInteract(); setS(old => ({ ...old, ordem: !old.ordem })); }}>Inverter ordem</Chave><Chave ligada={s.inversa} onClick={() => { onInteract(); setS(old => ({ ...old, inversa: !old.inversa })); }}>Máquina inversa</Chave><Chave ligada={false} onClick={testar}>Testar entrada</Chave></div>
    </>}
  </>;
}
