// Painel de resultados do lançamento: os valores mudam junto com os controles, cada um com a cor da sua
// marca no desenho e, se pedido, a fórmula que o produz (para o caso h0 = 0).
import { num } from "../plot2d";
import type { Lancamento, Resultado } from "./calc";

interface Props {
  r: Resultado;
  l: Lancamento;
  mostrar: { altura: boolean; alcance: boolean; tempo: boolean; formulas: boolean };
}

/** "v₀" e "h₀" com subscrito de verdade: a fonte serifada das fórmulas não tem o glifo "₀". */
function comSubscrito(f: string) {
  return f.split("₀").flatMap((parte, i) => (i === 0 ? [parte] : [<sub key={i}>0</sub>, parte]));
}

export function PainelLancamento({ r, l, mostrar }: Props) {
  const semAltura = l.h0 === 0;
  const itens = [
    mostrar.altura && {
      marca: "c2",
      nome: "Altura máxima",
      valor: `${num(r.alturaMax)} m`,
      formula: semAltura ? "H = v₀² · sen²θ / 2g" : "H = h₀ + v_y² / 2g",
    },
    mostrar.alcance && {
      marca: "c1",
      nome: "Alcance",
      valor: `${num(r.alcance)} m`,
      formula: semAltura ? "A = v₀² · sen 2θ / g" : "A = v_x · T",
    },
    mostrar.tempo && {
      marca: "ink",
      nome: "Tempo de voo",
      valor: `${num(r.tempo)} s`,
      formula: semAltura ? "T = 2 · v₀ · sen θ / g" : "T = (v_y + √(v_y² + 2gh₀)) / g",
    },
  ].filter(Boolean) as { marca: string; nome: string; valor: string; formula: string }[];

  return (
    <div className="medidas" aria-live="polite">
      <dl className="medidas__grade">
        {itens.map((i) => (
          <div key={i.nome} className={`medida medida--${i.marca}`}>
            <dt>{i.nome}</dt>
            <dd>{i.valor}</dd>
            {mostrar.formulas && <dd className="medida__formula">{comSubscrito(i.formula)}</dd>}
          </div>
        ))}
      </dl>
      <p className="medidas__nota">
        v<sub>x</sub> = {num(r.vx)} m/s · v<sub>y</sub> = {num(r.vy)} m/s · g = {num(l.g)} m/s²
      </p>
    </div>
  );
}
