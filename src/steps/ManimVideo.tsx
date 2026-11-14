import { useRef, useState } from "react";
import type { ManimVideoStep } from "../engine/schema";
import { IconReplay } from "../ui/Icons";
import { TactileButton } from "../ui/Tactile";
import { duvidaLiberada, StepLayout } from "./StepLayout";
import type { StepProps } from "./types";

/** Container limpo: sem barra de busca, só reproduzir de novo depois do fim. */
export function ManimVideo({ step, onNext }: StepProps<ManimVideoStep>) {
  const video = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const done = ended || failed;

  return (
    <StepLayout
      paco={done ? "happy" : "thinking"}
      line={done ? step.lines.done : step.lines.intro}
      reservar={[step.lines.intro, step.lines.done]}
      duvida={duvidaLiberada(step.duvida, done)}
      footer={
        <TactileButton block disabled={!done} onClick={onNext}>
          Continuar
        </TactileButton>
      }
    >
      <div className="stage">
        {failed ? (
          <div className="stage__error">Vídeo indisponível. Rode npm run manim para gerar a animação.</div>
        ) : (
          <video
            ref={video}
            src={step.src}
            poster={step.poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onEnded={() => setEnded(true)}
            onError={() => setFailed(true)}
          />
        )}
        {ended && !failed && (
          <div className="stage__overlay">
            <TactileButton
              variant="secondary"
              className="btn--icon"
              aria-label="Ver de novo"
              onClick={() => {
                const v = video.current;
                if (!v) return;
                v.currentTime = 0;
                void v.play();
              }}
            >
              <IconReplay />
            </TactileButton>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
