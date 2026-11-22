// Demonstração da página inicial: trajetória de um lançamento oblíquo calculada de verdade (mesmo módulo
// de física da aula, src/widgets/common/lancamento/calc.ts), desenhada em SVG numa "folha quadriculada"
// no estilo da arte da landing page (papel com grade, nota adesiva amarela, anotação em itálico serifado,
// ponto atual amarelo com contorno da tinta). Os controles ficam fora da folha girada, alinhados.
// Modelo: sem resistência do ar, g = 10 m/s².
import { useState } from "react";
import { Slider } from "../ui/Slider";
import { resolverLancamento, trajetoria } from "../widgets/common/lancamento/calc";
import { num } from "../widgets/common/plot2d";

const G = 10;
// Escala fixa para o maior caso dos sliders (30 m/s): alcance máximo 90 m (45°), altura máxima 41,99 m (75°).
const W = 520;
const H = 300;
const M = { esq: 34, base: 28, topo: 16, dir: 14 };
const ESCALA = Math.min((W - M.esq - M.dir) / 92, (H - M.base - M.topo) / 44);
const X = (x: number) => M.esq + x * ESCALA;
const Y = (y: number) => H - M.base - y * ESCALA;

const PRESETS = [15, 45, 75];

/** O que a figura mostra agora, em uma frase (sempre verdadeira para os valores atuais). */
function descoberta(angulo: number, alcance: number, v0: number) {
  if (angulo === 45) return { titulo: "Este é o maior alcance para essa velocidade.", texto: "Com 45°, sen 2θ = 1: nenhum outro ângulo leva a bola mais longe." };
  const par = 90 - angulo;
  return {
    titulo: `${angulo}° e ${par}° caem no mesmo lugar.`,
    texto: `Com ${num(v0)} m/s, os dois chegam a ${num(alcance)} m: sen 2θ é igual para ângulos que somam 90°.`,
  };
}

export function DemoTrajetoria() {
  const [angulo, setAngulo] = useState(60);
  const [v0, setV0] = useState(24);
  const l = { angulo, v0, g: G, h0: 0 };
  const r = resolverLancamento(l);
  const par = resolverLancamento({ ...l, angulo: 90 - angulo });
  const pts = (a: number) =>
    trajetoria({ ...l, angulo: a }, 60)
      .map((p) => `${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`)
      .join(" ");
  const topoX = r.vx * r.tSubida;
  const d = descoberta(angulo, r.alcance, v0);

  return (
    <figure className="lab">
      <div className="lab__arte" aria-hidden="false">
        <div className="lab__folha-fundo" aria-hidden="true" />
        <div className="lab__folha">
          <div className="lab__cabeca">
            <span>Lançamento oblíquo · g = 10 m/s²</span>
            <span aria-hidden="true">✦</span>
          </div>
          <p className="lab__equacao">
            A = v<sub>0</sub>² · sen 2θ / g
          </p>
          <svg className="lab__grafico" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Trajetória: alcance ${num(r.alcance)} metros, altura máxima ${num(r.alturaMax)} metros, ${num(r.tempo)} segundos no ar`}>
            {[20, 40, 60, 80].map((m) => (
              <text key={m} x={X(m)} y={Y(0) + 18} className="lab__eixo" textAnchor="middle">
                {m} m
              </text>
            ))}
            <line x1={X(0)} x2={X(92)} y1={Y(0)} y2={Y(0)} className="lab__solo" />
            {angulo !== 45 && <polyline points={pts(90 - angulo)} className="lab__curva lab__curva--par" />}
            <line x1={X(0)} x2={X(topoX)} y1={Y(r.alturaMax)} y2={Y(r.alturaMax)} className="lab__guia" />
            <polyline points={pts(angulo)} className="lab__curva" />
            <line x1={X(0)} y1={Y(0)} x2={X(0) + 44 * Math.cos((angulo * Math.PI) / 180)} y2={Y(0) - 44 * Math.sin((angulo * Math.PI) / 180)} className="lab__vetor" />
            <circle cx={X(r.alcance)} cy={Y(0)} r="5" className="lab__queda" />
            <circle cx={X(topoX)} cy={Y(r.alturaMax)} r="7" className="lab__ponto" />
          </svg>
          {angulo !== 45 && (
            <span className="lab__anotacao" aria-hidden="true">
              tracejada: {90 - angulo}°, mesmo alcance ({num(par.alcance)} m)
            </span>
          )}
        </div>
        <div className="lab__nota" aria-hidden="true">
          mude o ângulo.
          <br />
          <strong>veja a curva.</strong>
        </div>
      </div>

      <div className="lab__controles">
        <div className="lab__leitura" aria-live="polite">
          <span>
            <b>{num(r.alturaMax)} m</b> altura máxima
          </span>
          <span>
            <b>{num(r.alcance)} m</b> alcance
          </span>
          <span>
            <b>{num(r.tempo)} s</b> no ar
          </span>
        </div>
        <div className="lab__sliders">
          <Slider label="Ângulo" min={15} max={75} step={5} unit="°" value={angulo} onChange={setAngulo} color="#795B9E" />
          <Slider label="Velocidade inicial" min={10} max={30} step={2} unit=" m/s" value={v0} onChange={setV0} color="#365F91" />
        </div>
        <div className="presets" role="group" aria-label="Experimente ângulos">
          {PRESETS.map((a) => (
            <button key={a} type="button" aria-pressed={angulo === a} onClick={() => setAngulo(a)}>
              θ = {a}°
            </button>
          ))}
        </div>
        <div className="insight" aria-live="polite">
          <span className="insight__icone" aria-hidden="true">
            ✦
          </span>
          <div>
            <strong>{d.titulo}</strong>
            <p>{d.texto}</p>
          </div>
        </div>
        <p className="lab__rodape">Modelo sem resistência do ar, com g = 10 m/s². O mesmo cálculo da aula de Física.</p>
      </div>
    </figure>
  );
}
