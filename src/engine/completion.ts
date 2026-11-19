import type { CompleteWhen } from "./schema";

export type Metrics = Record<string, number>;

export function isComplete(rule: CompleteWhen, metrics: Metrics): boolean {
  const v = metrics[rule.metric];
  // NaN (ex.: divisor inválido) nunca conclui: NaN < gte e NaN > lte dão false.
  if (typeof v !== "number" || Number.isNaN(v)) return false;
  if (rule.gte !== undefined && v < rule.gte) return false;
  if (rule.lte !== undefined && v > rule.lte) return false;
  return true;
}
