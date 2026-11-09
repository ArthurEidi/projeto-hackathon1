// Apresentação do app na primeira visita: o Paco (casual) se apresenta e apresenta a Tati.
import { useEffect } from "react";
import { TactileButton } from "../ui/Tactile";
import { Conversa, type Fala } from "./Conversa";
import { CORPO, pacoRosto, preloadSprites, spriteUrl, tatiRosto } from "./sprites";

const KEY = "mat:boas-vindas:v1";

export function jaViuBoasVindas(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function marcarBoasVindas(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* sem armazenamento: a apresentação volta na próxima visita */
  }
}

const APRESENTACAO: Fala[] = [
  {
    quem: "paco",
    humor: "happy",
    texto: "Oi, eu sou o Paco. Aqui você aprende matemática mexendo nas figuras, um passo de cada vez.",
  },
  { quem: "tati", humor: "asking", texto: "E eu sou a Tati. Quando algo não fizer sentido, eu pergunto." },
  { quem: "paco", humor: "encouraging", texto: "E eu respondo. Comece pela primeira aula da trilha." },
];

export function BoasVindas({ onFechar }: { onFechar: () => void }) {
  useEffect(
    () =>
      preloadSprites([
        spriteUrl(CORPO.pacoAcenando),
        spriteUrl(CORPO.tatiApresentando),
        pacoRosto("happy", "casual"),
        pacoRosto("thinking", "casual"),
        pacoRosto("encouraging", "casual"),
        tatiRosto("asking"),
        tatiRosto("answered"),
      ]),
    [],
  );

  return (
    <section className="boas-vindas" aria-label="Boas-vindas">
      <div className="dupla">
        <img className="corpo" src={spriteUrl(CORPO.pacoAcenando)} alt="Paco acenando" draggable={false} />
        <img className="corpo" src={spriteUrl(CORPO.tatiApresentando)} alt="Tati" draggable={false} />
      </div>
      <Conversa falas={APRESENTACAO} roupa="casual" />
      <TactileButton
        block
        onClick={() => {
          marcarBoasVindas();
          onFechar();
        }}
      >
        Vamos lá
      </TactileButton>
    </section>
  );
}

/** Cumprimento curto do Paco no topo da trilha, depois da apresentação. */
export function SaudacaoPaco({ temProgresso }: { temProgresso: boolean }) {
  const texto = temProgresso
    ? "Bom te ver de novo. Continue de onde parou."
    : "Comece pela primeira aula da trilha. Eu te acompanho.";
  return (
    <div className="saudacao">
      <Conversa falas={[{ quem: "paco", humor: "idle", texto }]} roupa="casual" />
    </div>
  );
}
