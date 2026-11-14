export interface WidgetProps {
  params: Record<string, unknown>;
  /** Valores atuais dos sliders declarados no JSON. */
  controls: Record<string, number>;
  /** O widget informa métricas próprias (ex.: arco percorrido) para a condição de conclusão. */
  onMetric: (name: string, value: number) => void;
  /** Primeira interação do aluno, para o Paco passar a "thinking". */
  onInteract: () => void;
  done: boolean;
  /** Faixa [min, max] de cada slider do passo, para o widget fixar a escala no maior valor possível. */
  faixas?: Readonly<Record<string, { min: number; max: number }>>;
}
