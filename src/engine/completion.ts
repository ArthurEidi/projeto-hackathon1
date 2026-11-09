import type { CompleteWhen } from "./schema";

export type Metrics = Record<string, number>;

export function isComplete(rule: CompleteWhen, metrics: Metrics): boolean {
  const v = metrics[rule.metric];
  if (typeof v !== "number") return false;
  if (rule.gte !== undefined && v < rule.gte) return false;
  if (rule.lte !== undefined && v > rule.lte) return false;
  return true;
}
