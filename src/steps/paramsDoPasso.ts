/**
 * Parâmetros que o widget recebe num passo interativo: enquanto o passo não foi concluído, as chaves de
 * `antes_de_concluir` substituem as de `params` (mescla rasa); depois de concluído, valem os `params` completos.
 */
export function paramsDoPasso(
  params: Record<string, unknown>,
  antes: Record<string, unknown> | undefined,
  concluido: boolean,
): Record<string, unknown> {
  return concluido || !antes ? params : { ...params, ...antes };
}
