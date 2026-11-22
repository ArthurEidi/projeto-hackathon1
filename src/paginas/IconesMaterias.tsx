// Ícones, marca e ilustrações das três áreas, em SVG.
//
// Linguagem visual tirada da landing page do projeto (src/components/illustrations/Science.tsx e
// public/favicon.svg de C:\HackBrasil\hackbrasil-landing): fundo com padrão de pontos a 15%, eixos no
// traço da tinta (currentColor) com opacidade, um traço forte na cor da disciplina (3 a 3,5 px, ponta
// redonda), ponto de destaque amarelo #F5D994 com contorno da tinta e uma anotação em itálico serifado.
// Os desenhos foram refeitos para o conteúdo real do app, e os números de cada um estão comentados:
// são esquemas fiéis, não enfeites.
import { useId } from "react";
import type { MateriaId } from "../engine/materias";

const AMARELO = "#F5D994";

/** Marca do produto, no desenho do favicon da landing (quadrado azul-pastel, eixos, parábola e ponto amarelo). */
export function MarcaProduto({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="#A7C7E7" />
      <path d="M13 17v32h39M19 22q13 44 28 0" fill="none" stroke="#26344A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="47" cy="22" r="5" fill={AMARELO} stroke="#26344A" strokeWidth="2" />
    </svg>
  );
}

export function IconeMateria({ id, size = 24, color = "currentColor" }: { id: MateriaId; size?: number; color?: string }) {
  const comum = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "matematica")
    return (
      <svg {...comum}>
        <path d="M4 4v16h16" />
        <path d="M6.5 7q5.5 15 11 0" />
        <circle cx="12" cy="14.5" r="1.8" fill={AMARELO} />
      </svg>
    );
  if (id === "fisica")
    return (
      <svg {...comum}>
        <path d="M3 20h18" />
        <path d="M4 19Q12 0 20 19" strokeDasharray="2.2 2.6" />
        <circle cx="12" cy="9.6" r="2.4" fill={AMARELO} />
      </svg>
    );
  return (
    <svg {...comum}>
      <path d="M8 3h8M9 3v6.5L4.6 18a2 2 0 0 0 1.8 3h11.2a2 2 0 0 0 1.8-3L15 9.5V3" />
      <path d="M6.6 15h10.8" />
      <circle cx="11" cy="18" r="1.3" fill={AMARELO} />
    </svg>
  );
}

/** Ilustração da área (cards e cabeçalhos), 320 × 180, no estilo das ilustrações da landing. */
export function IlustracaoMateria({ id, className = "" }: { id: MateriaId; className?: string }) {
  const padrao = useId();
  const fundo = (
    <>
      <defs>
        <pattern id={padrao} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity=".15" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#${padrao})`} />
    </>
  );
  if (id === "matematica") {
    // y = (x − 1)² − 2 com 1 unidade = 30 px, origem em (130, 100): vértice (1; −2), raízes 1 ± √2.
    const X = (x: number) => 130 + x * 30;
    const Y = (y: number) => 100 - y * 30;
    const curva = Array.from({ length: 41 }, (_, i) => {
      const x = -1.2 + (4.4 * i) / 40;
      return `${X(x).toFixed(1)},${Y((x - 1) ** 2 - 2).toFixed(1)}`;
    }).join(" ");
    return (
      <svg className={className} viewBox="0 0 320 180" fill="none" aria-hidden="true">
        {fundo}
        <path d={`M40 ${Y(0)}H290M${X(0)} 170V14`} stroke="currentColor" opacity=".45" />
        <polyline points={curva} stroke="#446FA2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M${X(1)} ${Y(-2)}V${Y(0)}`} stroke="currentColor" opacity=".35" strokeDasharray="4 5" />
        <circle cx={X(1 - Math.SQRT2)} cy={Y(0)} r="4.5" fill="#FFFDF8" stroke="#446FA2" strokeWidth="2" />
        <circle cx={X(1 + Math.SQRT2)} cy={Y(0)} r="4.5" fill="#FFFDF8" stroke="#446FA2" strokeWidth="2" />
        <circle cx={X(1)} cy={Y(-2)} r="6" fill={AMARELO} stroke="currentColor" />
        <text x="196" y="158" fill="currentColor" fontSize="15" fontStyle="italic" fontFamily="Georgia, serif">
          y = (x − 1)² − 2
        </text>
      </svg>
    );
  }
  if (id === "fisica") {
    // v0 = 20 m/s a 60° (cheia) e a 30° (tracejada), g = 10: mesmo alcance de 34,6 m; escala 6,6 px/m.
    const traj = (ang: number) =>
      Array.from({ length: 31 }, (_, i) => {
        const a = (ang * Math.PI) / 180;
        const t = ((2 * 20 * Math.sin(a)) / 10) * (i / 30);
        const x = 20 * Math.cos(a) * t;
        const y = 20 * Math.sin(a) * t - 5 * t * t;
        return `${(44 + x * 6.6).toFixed(1)},${(150 - y * 6.6).toFixed(1)}`;
      }).join(" ");
    const topo = { x: 44 + 17.32 * 6.6, y: 150 - 15 * 6.6 };
    return (
      <svg className={className} viewBox="0 0 320 180" fill="none" aria-hidden="true">
        {fundo}
        <path d="M30 150H296" stroke="currentColor" opacity=".45" />
        <polyline points={traj(30)} stroke="currentColor" opacity=".35" strokeWidth="2" strokeDasharray="5 6" />
        <polyline points={traj(60)} stroke="#795B9E" strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" />
        <path d="M44 150l20-34.6m0 0-9 2m9-2 1 9" stroke="#624581" strokeWidth="2" strokeLinecap="round" />
        <path d={`M${topo.x} ${topo.y + 18}v26m-6-7 6 7 6-7`} stroke="#624581" strokeWidth="2" strokeLinecap="round" />
        <circle cx={topo.x} cy={topo.y} r="13" fill="#C6B3E6" stroke="#624581" strokeWidth="2" />
        <text x="72" y="114" fill="currentColor" fontStyle="italic" fontSize="18" fontFamily="Georgia, serif">
          v<tspan fontSize="11" dy="4">0</tspan>
        </text>
        <text x="138" y="172" fill="currentColor" fontStyle="italic" fontSize="14" fontFamily="Georgia, serif">
          30° e 60°: mesmo alcance
        </text>
      </svg>
    );
  }
  // Dois béqueres com o mesmo volume; o da direita tem o dobro de soluto (o dobro de partículas e cor mais forte).
  const bequer = (x0: number, n: number, alfa: number) => (
    <g>
      <path d={`M${x0} 62h70v74a12 12 0 0 1-12 12H${x0 + 12}a12 12 0 0 1-12-12z`} fill="#A8D5BA" opacity={alfa} />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + 10 + ((i * 23) % 52)} cy={72 + ((i * 17) % 64)} r="3.2" fill="#4F8164" />
      ))}
      <path d={`M${x0 - 6} 30h6v106a12 12 0 0 0 12 12h46a12 12 0 0 0 12-12V30h6`} stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d={`M${x0} 62h70`} stroke="#4F8164" strokeWidth="2" />
    </g>
  );
  return (
    <svg className={className} viewBox="0 0 320 180" fill="none" aria-hidden="true">
      {fundo}
      {bequer(52, 6, 0.35)}
      {bequer(192, 12, 0.7)}
      <circle cx="262" cy="40" r="8" fill={AMARELO} stroke="currentColor" />
      <text x="128" y="172" fill="currentColor" fontStyle="italic" fontSize="15" fontFamily="Georgia, serif">
        mesmo V, o dobro de m
      </text>
    </svg>
  );
}

/** Mantido para compatibilidade: miniatura = ilustração da área. */
export function MiniaturaMateria({ id }: { id: MateriaId; cor?: string }) {
  return <IlustracaoMateria id={id} className="ilustracao" />;
}

/**
 * Esquema da questão do vôlei (ENEM 2022 Q150), escala 1 m = 6 px: trajetória y = −x²/6 − 7x/3 + 12
 * somada aos 1,5 m do eixo (topo a 21,67 m em x = −7), tetos de 19 m e 21 m (atingidos, linha cheia)
 * e um teto acima do topo (tracejado). Origem do desenho: x = −19 em 20 px, piso em y = 160 px.
 */
export function IlustracaoVolei({ className = "" }: { className?: string }) {
  const X = (x: number) => 20 + (x + 19) * 11.5;
  const Y = (y: number) => 160 - y * 6;
  const curva = Array.from({ length: 45 }, (_, i) => {
    const x = -18 + (22 * i) / 44;
    return `${X(x).toFixed(1)},${Y(-(x * x) / 6 - (7 * x) / 3 + 12 + 1.5).toFixed(1)}`;
  }).join(" ");
  return (
    <svg className={className} viewBox="0 0 320 180" fill="none" aria-hidden="true">
      <path d="M14 160H306" stroke="currentColor" opacity=".45" />
      {[19, 21].map((h) => (
        <g key={h}>
          <path d={`M20 ${Y(h)}H300`} stroke="currentColor" opacity=".55" />
          <text x="248" y={Y(h) - 4} fill="currentColor" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">
            {h} m
          </text>
        </g>
      ))}
      <path d={`M20 ${Y(24)}H300`} stroke="currentColor" opacity=".4" strokeDasharray="4 5" />
      <polyline points={curva} stroke="#446FA2" strokeWidth="3" strokeLinecap="round" />
      <circle cx={X(-7)} cy={Y(121 / 6 + 1.5)} r="6" fill="#F5D994" stroke="currentColor" />
    </svg>
  );
}
