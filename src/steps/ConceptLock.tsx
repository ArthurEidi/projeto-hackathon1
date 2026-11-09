import { Fragment, useMemo, useRef, useState } from "react";
import type { ConceptLockStep } from "../engine/schema";
import { Dica } from "../ui/Dica";
import { TactileButton } from "../ui/Tactile";
import type { Rect } from "../widgets/canvas";
import type { Marca } from "../ui/marcas";
import { figureParams } from "../widgets/params";
import { figures } from "../widgets/registry";
import { duvidaLiberada, StepLayout } from "./StepLayout";
import type { StepProps } from "./types";

export function ConceptLock({ step, onNext }: StepProps<ConceptLockStep>) {
  const Figure = figures[step.figure.widget];
  const [active, setActive] = useState<Marca | null>(null);
  const formulaRef = useRef<HTMLDivElement>(null);
  const [dica, setDica] = useState<{ key: Marca; alvo: Rect; largura: number } | null>(null);

  // Posição do botão dentro da fórmula, para a dica apontar para ele.
  const medir = (key: Marca, el: HTMLElement) => {
    const box = formulaRef.current!.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    return { key, alvo: { x: b.left - box.left, y: b.top - box.top, w: b.width, h: b.height }, largura: box.width };
  };

  const figState = useMemo(
    () => figureParams[step.figure.widget].parse({ ...step.figure.params, highlight: active ? [active] : [] }),
    [active, step.figure],
  );

  return (
    <StepLayout
      paco="happy"
      line={step.lines.intro}
      duvida={duvidaLiberada(step.duvida, true)}
      footer={
        <TactileButton block onClick={onNext}>
          Concluir aula
        </TactileButton>
      }
    >
      <div className="stage">
        <Figure state={figState} />
      </div>
      <div ref={formulaRef} className="formula" aria-label="Fórmula">
        {step.formula.map((tok, i) =>
          tok.ref ? (
            <TactileButton
              key={i}
              variant={tok.ref}
              className={active === tok.ref ? "" : "btn--off"}
              aria-pressed={active === tok.ref}
              onMouseEnter={(e) => setDica(medir(tok.ref!, e.currentTarget))}
              onMouseLeave={() => setDica(null)}
              onClick={(e) => {
                const ligar = active !== tok.ref;
                setActive(ligar ? tok.ref! : null);
                setDica(ligar ? medir(tok.ref!, e.currentTarget) : null);
              }}
            >
              {tok.text}
              {tok.sup && <sup>{tok.sup}</sup>}
            </TactileButton>
          ) : (
            <Fragment key={i}>
              <span className="formula__op">
                {tok.text}
                {tok.sup && <sup>{tok.sup}</sup>}
              </span>
            </Fragment>
          ),
        )}
        {dica && <Dica termo={dica.key} alvo={dica.alvo} largura={dica.largura} lado="acima" />}
      </div>
      <p className="hint">{step.lines.hint}</p>
      <div className="defs">
        {step.definitions.map((d) => (
          <div key={d.term} className="def">
            <b>{d.term}:</b> {d.text}
          </div>
        ))}
      </div>
    </StepLayout>
  );
}
