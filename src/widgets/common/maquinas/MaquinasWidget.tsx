// Widget maquinas_funcao. Métricas por modo:
//   flechas   entradas_com_uma_saida
//   maquinas  entradas_testadas, ordens_testadas, inversa_testada
import { useEffect, useMemo, useState } from "react";
import { Dica } from "../../../ui/Dica";
import { useCanvas } from "../../canvas";
import type { WidgetProps } from "../../types";
import { avaliarExpr } from "../expr";
import { fmt } from "../geo/base";
import { Chave, linhaDeChaves } from "../geo/Controles";
import { alternar, cadeia, estadoInicial, metricasMaquinas } from "./calc";
import { aspectoMaquinas, desenharMaquinas } from "./desenho";
import { Maquinas } from "./params";

export function MaquinasWidget({ params, controls, onMetric, onInteract }: WidgetProps) {
  const p = useMemo(() => Maquinas.parse(params), [params]);
  const [estado, setEstado] = useState(() => estadoInicial(p));

  const x = estado.x ?? (p.modo === "maquinas" ? avaliarExpr(p.x, controls) : 0);

  const { ref, hover, size } = useCanvas(aspectoMaquinas(p), (ctx, w, h, hits) => {
    desenharMaquinas(
      ctx,
      w,
      h,
      hits,
      p,
      controls,
      estado.ligacoes,
      x,
      estado.ordem,
      estado.inversa,
      p.modo === "flechas" ? estado.entradaAtiva : null,
    );
  });

  useEffect(() => {
    const m = metricasMaquinas(p, controls, estado);
    for (const [k, v] of Object.entries(m)) onMetric(k, Number.isFinite(v) ? v : 0);
  }, [p, controls, estado, onMetric]);

  const escolherEntrada = (n: number) => {
    onInteract();
    if (p.modo !== "flechas") {
      const c = cadeia(p, controls, n, estado.ordem, estado.inversa);
      setEstado((old) => {
        const testadas = new Set(old.testadas);
        if (!old.inversa || c.invertivel) testadas.add(n);
        return { ...old, x: n, testadas };
      });
    } else {
      setEstado((old) => ({ ...old, entradaAtiva: n }));
    }
  };

  const alternarOrdem = () => {
    onInteract();
    setEstado((old) => {
      const proxima = !old.ordem;
      const ordens = new Set(old.ordens);
      ordens.add(old.ordem);
      ordens.add(proxima);
      return { ...old, ordem: proxima, ordens };
    });
  };

  const alternarInversa = () => {
    onInteract();
    if (p.modo !== "maquinas") return;
    setEstado((old) => {
      const proxima = !old.inversa;
      const c = cadeia(p, controls, x, old.ordem, proxima);
      return {
        ...old,
        inversa: proxima,
        inversaTestada: old.inversaTestada || (proxima && c.invertivel),
      };
    });
  };

  return (
    <>
      <canvas ref={ref} aria-label="Relações e máquinas de função" />
      {hover && <Dica termo={hover.key} alvo={hover} largura={size.w} />}
      {p.modo === "flechas" ? (
        <>
          <div style={linhaDeChaves}>
            {p.entradas.map((a, i) => (
              <Chave key={i} cor="c1" ligada={estado.entradaAtiva === i} onClick={() => escolherEntrada(i)}>
                Entrada {String(a)}
              </Chave>
            ))}
          </div>
          <div style={linhaDeChaves}>
            {p.saidas.map((b, i) => (
              <Chave
                key={i}
                cor="c2"
                ligada={estado.ligacoes.some(([ea, eb]) => ea === estado.entradaAtiva && eb === i)}
                onClick={() => {
                  onInteract();
                  setEstado((old) => ({ ...old, ligacoes: alternar(old.ligacoes, old.entradaAtiva, i) }));
                }}
              >
                Saída {String(b)}
              </Chave>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={linhaDeChaves}>
            {p.entradas.map((n, i) => (
              <Chave key={i} cor="c1" ligada={x === n && estado.testadas.has(n)} onClick={() => escolherEntrada(n)}>
                x = {fmt(n)}
              </Chave>
            ))}
          </div>
          {( (p.mostrar.inverter && p.maquinas.length >= 2) || p.mostrar.inversa ) && (
            <div style={linhaDeChaves}>
              {p.mostrar.inverter && p.maquinas.length >= 2 && (
                <Chave cor="c3" ligada={estado.ordem} onClick={alternarOrdem}>
                  Inverter ordem
                </Chave>
              )}
              {p.mostrar.inversa && (
                <Chave cor="c4" ligada={estado.inversa} onClick={alternarInversa}>
                  Máquina inversa
                </Chave>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
