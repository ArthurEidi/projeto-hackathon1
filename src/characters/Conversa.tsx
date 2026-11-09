// Conversa entre Paco e Tati: balões revelados um de cada vez, com tempo para ler o anterior.
import { useEffect, useState } from "react";
import { pacoRosto, tatiRosto, type PacoHumor, type PacoRoupa, type TatiHumor } from "./sprites";
import "./characters.css";

export type Fala =
  | { quem: "paco"; texto: string; humor: PacoHumor }
  | { quem: "tati"; texto: string; humor: TatiHumor };

const DIGITANDO_MS = 700;

/** Tempo para ler um balão antes do próximo começar a aparecer. */
export const tempoLeitura = (texto: string) => Math.min(3500, Math.max(1200, 500 + [...texto].length * 30));

interface ConversaProps {
  falas: Fala[];
  roupa: PacoRoupa;
}

export function Conversa({ falas, roupa }: ConversaProps) {
  const [visiveis, setVisiveis] = useState(1);
  const [digitando, setDigitando] = useState(false);
  const n = Math.min(visiveis, falas.length);
  const anterior = falas[n - 1]?.texto ?? "";

  useEffect(() => {
    if (n >= falas.length) return;
    const espera = tempoLeitura(anterior);
    const t1 = setTimeout(() => setDigitando(true), espera);
    const t2 = setTimeout(() => {
      setDigitando(false);
      setVisiveis(n + 1);
    }, espera + DIGITANDO_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [n, falas.length, anterior]);

  const proxima = n < falas.length ? falas[n] : null;

  return (
    <div className="conversa" aria-live="polite">
      {falas.slice(0, n).map((f, i) => (
        <Balao
          key={i}
          fala={i < n - 1 && f.quem === "tati" ? { ...f, humor: "answered" } : f}
          roupa={roupa}
          compacta={i > 0}
        />
      ))}
      {digitando && proxima && (
        <Balao
          fala={proxima.quem === "paco" ? { ...proxima, humor: "thinking" } : { ...proxima, humor: "asking" }}
          roupa={roupa}
          compacta
          digitando
        />
      )}
    </div>
  );
}

interface BalaoProps {
  fala: Fala;
  roupa: PacoRoupa;
  compacta?: boolean;
  digitando?: boolean;
}

function Balao({ fala, roupa, compacta = false, digitando = false }: BalaoProps) {
  const src = fala.quem === "paco" ? pacoRosto(fala.humor, roupa) : tatiRosto(fala.humor);
  const nome = fala.quem === "paco" ? "Paco" : "Tati";
  return (
    <div className={`fala fala--${fala.quem}${compacta ? " fala--compacta" : ""}`}>
      <div className={`avatar avatar--${fala.humor}`}>
        <img src={src} alt="" draggable={false} />
      </div>
      <div className={`bubble bubble--${fala.quem}`}>
        {fala.quem === "tati" ? <span className="bubble__nome">{nome}</span> : <span className="sr-only">{nome}: </span>}
        {digitando ? (
          <span className="bubble__dots" aria-label={`${nome} está digitando`}>
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span key={fala.texto} className="bubble__text">
            {fala.texto}
          </span>
        )}
      </div>
    </div>
  );
}
