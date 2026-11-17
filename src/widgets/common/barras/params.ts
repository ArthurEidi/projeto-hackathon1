// Contrato do widget barras (estatística, sequências, parte e todo). Sem React: usado no Node.
// Modos:
//   categorias  barras / linha / setores de uma tabela; chave de tipo; início do eixo; régua relativa; coleta
//   amostragem  população com % reais; amostra de tamanho n sorteada; rastro; chave "amostra viciada"
//   pontos      valores como pesos numa régua: apoio (média), mediana, moda, desvios, quadrados
//   fila        fichas ordenadas com marcadores Q1, Q2, Q3; boxplot; valor atípico
//   sequencia   termos discretos aₙ (PA, PG, recorrência), degraus +d / ×q, soma acumulada, limite
//   parte_todo  barra do todo em partes iguais com parte pintada; fração, razão e %
import { z } from "zod";
import { CorTraco, Marca } from "../../../ui/marcas";
import { Expr, usaSlider } from "../expr";

const Highlight = z.array(Marca).default([]);
const Faixa = z.tuple([z.number(), z.number()]).refine(([a, b]) => a < b, "faixa precisa ter mínimo < máximo");

const Categoria = z.object({ nome: z.string(), valor: Expr });
const TipoGrafico = z.enum(["barras", "linha", "setores"]);

const Categorias = z.object({
  modo: z.literal("categorias"),
  categorias: z.array(Categoria).min(1),
  /** Forma inicial; com mais de um item em `tipos`, aparece a chave para trocar. */
  tipo: TipoGrafico.default("barras"),
  tipos: z.array(TipoGrafico).default([]),
  /** Início do eixo vertical (aceita "$id"): barras cortadas exageram a diferença. */
  eixo_inicio: Expr.default(0),
  eixo_fim: z.number().optional(),
  /** Tabela ao lado; tocar uma barra acende a linha. */
  tabela: z.boolean().default(false),
  /** Régua em % do total; `chave_relativa` mostra a chave "contagem / %". */
  relativa: z.boolean().default(false),
  chave_relativa: z.boolean().default(false),
  /** Botões que somam uma resposta a cada categoria. */
  coleta: z.boolean().default(false),
  /** Etiqueta "B parece X vezes A" entre as categorias de índice i e j. */
  comparar: z.tuple([z.number().int().min(0), z.number().int().min(0)]).optional(),
  /** Sufixo dos valores (ex.: "%"). */
  unidade: z.string().default(""),
  cor: CorTraco.default("c1"),
  cor_toque: CorTraco.default("c3"),
  /** Setores: cores das fatias % e ângulo. */
  cor_porcento: CorTraco.default("c1"),
  cor_angulo: CorTraco.default("c2"),
  /** Rótulos +d entre barras vizinhas (maior crescimento destacado). */
  degraus: z.boolean().default(false),
  /** Índices das barras acesas na figura (ex.: a barra que o erro leu). */
  acesas: z.array(z.number().int().min(0)).default([]),
  /** "ao_tocar": o valor de cada barra só aparece depois que o aluno toca nela. */
  valores: z.enum(["sempre", "ao_tocar"]).default("sempre"),
  highlight: Highlight,
});

const Amostragem = z.object({
  modo: z.literal("amostragem"),
  /** Categorias da população com a % real de cada uma (somam 100). */
  populacao: z.array(z.object({ nome: z.string(), pct: z.number().min(0) })).min(2),
  /** Índice da categoria acompanhada (a "% medida" do rastro). */
  destaque: z.number().int().min(0).default(0),
  n: Expr.default(10),
  /** Amostra viciada: a % dessa população troca pela `vicio.populacao` quando a chave liga. */
  vicio: z.object({ rotulo: z.string(), populacao: z.array(z.number().min(0)) }).optional(),
  vicio_ligado: z.boolean().default(false),
  semente: z.number().int().default(1),
  cor: CorTraco.default("c3"),
  cor_real: CorTraco.default("ink"),
  highlight: Highlight,
});

const Pontos = z.object({
  modo: z.literal("pontos"),
  valores: z.array(Expr).min(1),
  /** Segundo grupo desenhado abaixo, na mesma régua (comparar espalhamentos). */
  grupo_b: z.array(z.number()).optional(),
  regua: Faixa.default([0, 10]),
  passo: z.number().positive().default(1),
  /** Índices dos pesos que o aluno arrasta. */
  arrastaveis: z.array(z.number().int().min(0)).default([]),
  /** "media": apoio sempre na média; "arrastavel": o aluno move; número: apoio fixo ali. */
  apoio: z.union([z.literal("media"), z.literal("arrastavel"), z.number()]).default("media"),
  apoio_inicial: z.number().optional(),
  mostrar: z
    .object({
      mediana: z.boolean().default(false),
      moda: z.boolean().default(false),
      desvios: z.boolean().default(false),
      quadrados: z.boolean().default(false),
      fila: z.boolean().default(false),
      soma_desvios: z.boolean().default(false),
      alerta_mediana: z.boolean().default(false),
      conta_media: z.boolean().default(false),
      /** Com quadrados: escreve "√variância = desvio padrão". false mostra só a variância (figura de desafio). */
      raiz: z.boolean().default(true),
    })
    .default({ mediana: false, moda: false, desvios: false, quadrados: false, fila: false, soma_desvios: false, alerta_mediana: false, conta_media: false, raiz: true }),
  /** Botões/chaves visíveis no widget. */
  chaves: z.array(z.enum(["desvios", "quadrados", "fila", "somar"])).default([]),
  /** Na fila, o aluno toca os dois do meio (métrica meios_tocados). */
  tocar_meios: z.boolean().default(false),
  /** Rótulo "?" no lugar do valor de um peso (figura de desafio). */
  incognita: z.number().int().min(0).optional(),
  cores: z
    .object({ apoio: CorTraco.default("c3"), mediana: CorTraco.default("c4"), desvio: CorTraco.default("c1"), quadrado: CorTraco.default("c3"), lado: CorTraco.default("c4") })
    .default({ apoio: "c3", mediana: "c4", desvio: "c1", quadrado: "c3", lado: "c4" }),
  highlight: Highlight,
});

const Quartil = z.enum(["q1", "q2", "q3"]);

const Fila = z.object({
  modo: z.literal("fila"),
  valores: z.array(z.number()).min(3),
  /** Começa já ordenada; senão aparece o botão "pôr em fila". */
  ordenada: z.boolean().default(false),
  /** Marcadores que o aluno arrasta (encaixam entre/sobre fichas). */
  arrastaveis: z.array(Quartil).default([]),
  /** Marcadores já no lugar certo. */
  fixos: z.array(Quartil).default([]),
  /** Marcadores do mínimo e/ou do máximo nas pontas da fila ordenada. */
  extremos: z.array(z.enum(["min", "max"])).default([]),
  /** Boxplot já desenhado; senão, `chave_caixa` mostra o botão "desenhar caixa". */
  caixa: z.boolean().default(false),
  chave_caixa: z.boolean().default(false),
  /** O maior valor vira arrastável até `ate` (valor atípico). */
  maior_arrastavel: z.object({ ate: z.number(), passo: z.number().positive().default(1) }).optional(),
  regua: Faixa.optional(),
  cores: z
    .object({ q1: CorTraco.default("c1"), q2: CorTraco.default("c4"), q3: CorTraco.default("c2"), caixa: CorTraco.default("c3"), extremo: CorTraco.default("c3") })
    .default({ q1: "c1", q2: "c4", q3: "c2", caixa: "c3", extremo: "c3" }),
  highlight: Highlight,
});

const Regra = z.enum(["pa", "pg", "recorrencia", "recorrencia2"]);
const RegraSeq = z.object({
  regra: Regra.default("pa"),
  a1: Expr.default(1),
  a2: Expr.optional(),
  d: Expr.default(0),
  p: Expr.default(1),
  q: Expr.default(1),
});

const Sequencia = RegraSeq.extend({
  modo: z.literal("sequencia"),
  /** Quantas colunas existem (índices 1..termos). */
  termos: z.number().int().min(1).max(12).default(5),
  /** Até onde acende (aceita "$n"); as demais colunas ficam só no contorno. */
  n: Expr.optional(),
  /** Rótulo entre vizinhos: +d (PA) ou ×q (PG). */
  degraus: z.boolean().default(true),
  /** Coluna extra com a soma parcial Sₙ. */
  acumular: z.boolean().default(false),
  /** Linha do limite a₁/(1 − q) quando |q| < 1. */
  limite: z.boolean().default(false),
  /** Série de referência em cinza tracejado. */
  fantasma: RegraSeq.optional(),
  /** Nome do termo (ex.: "a", "S", "M" para montante). */
  nome: z.string().default("a"),
  /** Índices (1..N) destacados na figura (ex.: o passo a mais do erro). */
  acesos: z.array(z.number().int().min(1)).default([]),
  /** Casas decimais nos rótulos. */
  casas: z.number().int().min(0).max(4).default(2),
  cores: z
    .object({ indice: CorTraco.default("c1"), termo: CorTraco.default("c2"), d: CorTraco.default("c3"), q: CorTraco.default("c4"), soma: CorTraco.default("c3") })
    .default({ indice: "c1", termo: "c2", d: "c3", q: "c4", soma: "c3" }),
  highlight: Highlight,
});

const Fatia = z.object({ partes: Expr, pintadas: Expr });

const ParteTodo = z.object({
  modo: z.literal("parte_todo"),
  partes: Expr,
  pintadas: Expr,
  /** Valor do todo (ex.: 8 reais): cada parte mostra todo/partes. */
  todo: Expr.optional(),
  /** Barra de referência em cinza acima (a fração "antes"; ex.: 1/2 para comparar com (2 + n)/4). */
  referencia: Fatia.optional(),
  mostrar: z
    .object({ fracao: z.boolean().default(true), porcento: z.boolean().default(true), razao: z.boolean().default(false) })
    .default({ fracao: true, porcento: true, razao: false }),
  rotulos: z.object({ parte: z.string().default("P"), todo: z.string().default("T") }).default({ parte: "P", todo: "T" }),
  cores: z
    .object({ parte: CorTraco.default("c1"), todo: CorTraco.default("c2"), porcento: CorTraco.default("c3"), razao: CorTraco.default("c4") })
    .default({ parte: "c1", todo: "c2", porcento: "c3", razao: "c4" }),
  highlight: Highlight,
});

export const Barras = z.discriminatedUnion("modo", [Categorias, Amostragem, Pontos, Fila, Sequencia, ParteTodo]);
export type Barras = z.output<typeof Barras>;
export type BarrasDe<M extends Barras["modo"]> = Extract<Barras, { modo: M }>;

/** Todas as expressões do estado, para a figura recusar sliders. */
export function exprsDe(p: Barras): Expr[] {
  switch (p.modo) {
    case "categorias":
      return [...p.categorias.map((c) => c.valor), p.eixo_inicio];
    case "amostragem":
      return [p.n];
    case "pontos":
      return p.valores;
    case "fila":
      return [];
    case "sequencia":
      return [
        p.a1,
        ...(p.a2 !== undefined ? [p.a2] : []),
        p.d,
        p.p,
        p.q,
        ...(p.n !== undefined ? [p.n] : []),
        ...(p.fantasma ? [p.fantasma.a1, ...(p.fantasma.a2 !== undefined ? [p.fantasma.a2] : []), p.fantasma.d, p.fantasma.p, p.fantasma.q] : []),
      ];
    case "parte_todo":
      return [p.partes, p.pintadas, ...(p.todo !== undefined ? [p.todo] : []), ...(p.referencia ? [p.referencia.partes, p.referencia.pintadas] : [])];
  }
}

export const BarrasFigura = Barras.superRefine((p, ctx) => {
  if (exprsDe(p).some(usaSlider)) ctx.addIssue({ code: "custom", message: 'barras_figura não aceita "$slider": use números' });
});

export const widgetParams = { barras: Barras } as const;
export const figureParams = { barras_figura: BarrasFigura } as const;
