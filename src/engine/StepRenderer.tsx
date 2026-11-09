import { ConceptLock } from "../steps/ConceptLock";
import { InteractiveCanvas } from "../steps/InteractiveCanvas";
import { ManimVideo } from "../steps/ManimVideo";
import { MicroChallenge } from "../steps/MicroChallenge";
import type { Step } from "./schema";

/** Único ponto que mapeia o "type" do JSON para uma das 4 telas padronizadas. */
export function StepRenderer({ step, onNext }: { step: Step; onNext: () => void }) {
  switch (step.type) {
    case "interactive_canvas":
      return <InteractiveCanvas step={step} onNext={onNext} />;
    case "manim_video":
      return <ManimVideo step={step} onNext={onNext} />;
    case "micro_challenge":
      return <MicroChallenge step={step} onNext={onNext} />;
    case "concept_lock":
      return <ConceptLock step={step} onNext={onNext} />;
  }
}
