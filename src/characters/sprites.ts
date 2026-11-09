// Mapa de humores dos personagens para os sprites em public/personagens (gerados por sprites/recortar.py).
//
// Paco (capivara) é o professor e quem mais fala. Usa o jaleco quando está ensinando (passos da aula)
// e a blusa azul nos momentos casuais (trilha, boas-vindas, comemoração).
// Tati (suricato) é cética: aparece de vez em quando com a dúvida que o aluno teria, e o Paco responde.

export type Personagem = "paco" | "tati";
export type PacoRoupa = "jaleco" | "casual";

export type PacoHumor = "idle" | "thinking" | "happy" | "encouraging" | "answering";
export type TatiHumor = "asking" | "answered" | "happy";

/** Rostos (busto), usados ao lado dos balões de fala. */
const PACO_ROSTO: Record<PacoHumor, string> = {
  idle: "rosto-neutro",
  thinking: "rosto-pensando",
  happy: "rosto-rindo",
  encouraging: "rosto-piscadela",
  answering: "rosto-neutro",
};

const TATI_ROSTO: Record<TatiHumor, string> = {
  asking: "rosto-duvida",
  answered: "rosto-neutro",
  happy: "rosto-rindo",
};

/** Corpo inteiro, para telas com mais espaço. */
export const CORPO = {
  pacoAcenando: "paco-casual/acenando-1",
  pacoComemorando: "paco-casual/pulando",
  tatiApresentando: "tati/mas-espera",
  tatiComemorando: "tati/pulando",
} as const;

const BASE = `${import.meta.env.BASE_URL}personagens/`;

export const spriteUrl = (arquivo: string) => `${BASE}${arquivo}.webp`;

export const pacoRosto = (humor: PacoHumor, roupa: PacoRoupa) => spriteUrl(`paco-${roupa}/${PACO_ROSTO[humor]}`);
export const tatiRosto = (humor: TatiHumor) => spriteUrl(`tati/${TATI_ROSTO[humor]}`);

/** Todos os arquivos referenciados pelo app (o teste confere se existem em public/). */
export function todosOsSprites(): string[] {
  const roupas: PacoRoupa[] = ["jaleco", "casual"];
  return [
    ...roupas.flatMap((r) => Object.values(PACO_ROSTO).map((f) => `paco-${r}/${f}`)),
    ...Object.values(TATI_ROSTO).map((f) => `tati/${f}`),
    ...Object.values(CORPO),
  ];
}

const carregados = new Set<string>();

/** Baixa os sprites antes de serem exibidos, para a troca de humor não piscar. */
export function preloadSprites(urls: string[]): void {
  if (typeof Image === "undefined") return;
  for (const url of urls) {
    if (carregados.has(url)) continue;
    carregados.add(url);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
}

export function spritesDaAula(): string[] {
  const humoresPaco: PacoHumor[] = ["idle", "thinking", "happy", "encouraging", "answering"];
  const humoresTati: TatiHumor[] = ["asking", "answered"];
  return [
    ...humoresPaco.map((h) => pacoRosto(h, "jaleco")),
    ...humoresTati.map((h) => tatiRosto(h)),
    // Convite e resultado do treino: Paco casual e a Tati rindo quando o aluno acerta tudo.
    ...(["happy", "thinking", "encouraging"] as PacoHumor[]).map((h) => pacoRosto(h, "casual")),
    tatiRosto("happy"),
    spriteUrl(CORPO.pacoAcenando),
    spriteUrl(CORPO.pacoComemorando),
    spriteUrl(CORPO.tatiComemorando),
  ];
}
