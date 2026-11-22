import { useCallback, useEffect, useMemo, useState } from "react";
import { isComplete, type Metrics } from "../engine/completion";
import type { InteractiveCanvasStep } from "../engine/schema";
import type { PacoHumor } from "../characters/sprites";
import { corDoTraco } from "../ui/marcas";
import { Slider } from "../ui/Slider";
import { TactileButton } from "../ui/Tactile";
import { widgets } from "../widgets/registry";
import { paramsDoPasso } from "./paramsDoPasso";
import { duvidaLiberada, StepLayout } from "./StepLayout";
import type { StepProps } from "./types";

export function InteractiveCanvas({ step, onNext }: StepProps<InteractiveCanvasStep>) {
  const Widget = widgets[step.widget];
  const [controls, setControls] = useState<Record<string, number>>(() =>
    Object.fromEntries(step.controls.map((c) => [c.id, c.initial])),
  );
  const [widgetMetrics, setWidgetMetrics] = useState<Metrics>({});
  const [interacted, setInteracted] = useState(false);
  const [done, setDone] = useState(false);

  const faixas = useMemo(
    () => Object.fromEntries(step.controls.map((c) => [c.id, { min: c.min, max: c.max }])),
    [step.controls],
  );
  const metrics = useMemo(() => ({ ...widgetMetrics, ...controls }), [widgetMetrics, controls]);
  const params = useMemo(
    () => paramsDoPasso(step.params, step.antes_de_concluir, done),
    [step.params, step.antes_de_concluir, done],
  );

  // Uma vez concluído, o passo continua concluído mesmo se o aluno voltar o controle.
  useEffect(() => {
    if (!done && isComplete(step.complete_when, metrics)) {
      setDone(true);
      navigator.vibrate?.(20);
    }
  }, [metrics, done, step.complete_when]);

  const onMetric = useCallback((name: string, value: number) => {
    setWidgetMetrics((m) => (m[name] === value ? m : { ...m, [name]: value }));
  }, []);
  const onInteract = useCallback(() => setInteracted(true), []);

  const paco: PacoHumor = done ? "happy" : interacted ? "thinking" : "idle";

  return (
    <StepLayout
      paco={paco}
      line={done ? step.lines.done : step.lines.intro}
      reservar={[step.lines.intro, step.lines.done]}
      duvida={duvidaLiberada(step.duvida, done)}
      footer={
        <TactileButton block disabled={!done} onClick={onNext}>
          Continuar
        </TactileButton>
      }
      figura={
        <div className={`stage${done ? " stage--concluido" : ""}`}>
          <Widget params={params} controls={controls} faixas={faixas} onMetric={onMetric} onInteract={onInteract} done={done} />
        </div>
      }
    >
      <p className={`step__status${done ? " step__status--ok" : ""}`} role="status">
        {done ? "Etapa concluída. Continue quando quiser." : interacted ? "Continue explorando a figura." : "Use os controles ou arraste na figura."}
      </p>
      {step.controls.map((c) => (
        <Slider
          key={c.id}
          label={c.label}
          min={c.min}
          max={c.max}
          step={c.step}
          unit={c.unit}
          value={controls[c.id]}
          color={corDoTraco(c.color).main}
          onChange={(v) => {
            setInteracted(true);
            setControls((s) => ({ ...s, [c.id]: v }));
          }}
        />
      ))}
    </StepLayout>
  );
}
