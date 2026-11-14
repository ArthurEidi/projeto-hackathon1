// Contrato do widget grade_resultados (contagem e probabilidade). Sem React: usado no Node.
// Modos:
//   casas              espaço amostral em fila (1 etapa) ou grade (2 etapas); tocar acende; eventos A e B;
//                      chaves: pode repetir, a ordem importa, e/ou, unir, tirar repetidas, complemento, pista, A e B
//   tabela             tabela de dupla entrada com contagens; tocar linha/coluna a vira pista
//   arvore             galhos por nível; pontas tocáveis acendem o caminho; agrupar por nº de sucessos
//   fila               lugares e fichas (permutações); cadeado; ordens iguais coladas
//   escada             barras n, n − 1, … e o produto
//   lista              arranjos agrupados por subconjunto (k! ordens por grupo)
//   barras             C(n, k) ou P(k) binomial para k = 0..n
//   pascal             linhas do triângulo de Pascal; tocar mostra as duas setas de cima
//   bolinhas_e_barras  k bolinhas e barras arrastáveis; caixas com a contagem
//   caixas             k itens iguais em n caixas; chave "pelo menos um"
//   colunas            colunas de opções (pães, recheios…) com o produto
import { z } from "zod";
import { CorTraco, Marca } from "../../../ui/marcas";
import { Expr, usaSlider } from "../expr";

const Highlight = z.array(Marca).default([]);

/** Conjunto de casas: a casa entra se bater em qualquer critério. */
export const Conjunto = z.object({
  casas: z.array(z.string()).default([]),
  linhas: z.array(z.string()).default([]),
  colunas: z.array(z.string()).default([]),
  soma: z.array(z.number()).default([]),
  /** Rótulos numéricos de `de` a `ate` (aceitam "$id": janela que desliza). */
  intervalo: z.object({ de: Expr, ate: Expr }).optional(),
  diagonal: z.boolean().default(false),
});
export type Conjunto = z.output<typeof Conjunto>;

const Rotulos = z.union([z.array(z.string()).min(1), z.number().int().min(1).max(20)]);

const ChaveCasas = z.enum(["repetir", "ordem", "e_ou", "unir", "tirar_repetidas", "complemento", "pista", "a_e_b"]);
export type ChaveCasas = z.infer<typeof ChaveCasas>;

const Casas = z.object({
  modo: z.literal("casas"),
  /** Rótulos das linhas (ou quantidade: 1..n). Sozinho, vira uma fila. */
  linhas: Rotulos,
  /** Rótulos das colunas; "linhas" repete os mesmos rótulos (pares, dois dados). */
  colunas: z.union([Rotulos, z.literal("linhas")]).optional(),
  /** Quantas linhas/colunas aparecem (aceita "$id"; o resto some). */
  n_linhas: Expr.optional(),
  n_colunas: Expr.optional(),
  /** 1 = só a fila das linhas; 2 = grade (aceita "$k", para "escolher 1 ou 2"). */
  etapas: Expr.default(2),
  /** Nome das etapas, escrito nas bordas. */
  titulos: z.object({ linhas: z.string().optional(), colunas: z.string().optional() }).default({}),
  /** O que cada casa mostra: rótulo da linha e coluna juntos, a soma, ou nada até ser tocada. */
  conteudo: z.enum(["rotulo", "soma", "vazio", "soma_ao_tocar"]).default("rotulo"),
  /** Evento pedido: casas dele que o aluno acende contam em marcadas_certas. */
  evento: Conjunto.optional(),
  a: Conjunto.optional(),
  b: Conjunto.optional(),
  rotulos_eventos: z.object({ a: z.string().default("A"), b: z.string().default("B") }).default({ a: "A", b: "B" }),
  /** Estados iniciais das chaves. */
  repetir: z.boolean().default(true),
  ordem: z.boolean().default(true),
  ou: z.boolean().default(false),
  pista: z.boolean().default(false),
  /** Chaves visíveis. */
  chaves: z.array(ChaveCasas).default([]),
  /** Botões de evento (ex.: "de 1 a 6", "sair 7"): tocar mostra a probabilidade. */
  botoes_evento: z.array(z.object({ rotulo: z.string(), conjunto: Conjunto })).default([]),
  /** Régua 0–1 com a fração do evento (ou de A; com pista, P(A) e P(A | B)). */
  regua: z.boolean().default(false),
  /** Contador do total de casas válidas. */
  contador: z.boolean().default(true),
  /** Casas acesas na figura. */
  acesas: z.array(z.string()).default([]),
  /** Figura: estado das chaves (unir, complemento, interseção). */
  mostrar: z
    .object({ uniao: z.boolean().default(false), sem_repetidas: z.boolean().default(false), complemento: z.boolean().default(false), intersecao: z.boolean().default(false) })
    .default({ uniao: false, sem_repetidas: false, complemento: false, intersecao: false }),
  cores: z
    .object({
      linhas: CorTraco.default("c1"),
      colunas: CorTraco.default("c2"),
      casa: CorTraco.default("c3"),
      a: CorTraco.default("c1"),
      b: CorTraco.default("c2"),
      intersecao: CorTraco.default("c3"),
      fora: CorTraco.default("c4"),
      regua: CorTraco.default("c3"),
    })
    .default({ linhas: "c1", colunas: "c2", casa: "c3", a: "c1", b: "c2", intersecao: "c3", fora: "c4", regua: "c3" }),
  highlight: Highlight,
});

const Tabela = z.object({
  modo: z.literal("tabela"),
  linhas: z.array(z.object({ rotulo: z.string(), valores: z.array(z.number()) })).min(1),
  colunas: z.array(z.string()).min(1),
  /** Linha/coluna que começa como pista (índice). */
  pista_linha: z.number().int().min(0).optional(),
  pista_coluna: z.number().int().min(0).optional(),
  /** Coluna (índice) do evento cuja fração aparece com a pista. */
  evento_coluna: z.number().int().min(0).optional(),
  cores: z.object({ pista: CorTraco.default("c2"), evento: CorTraco.default("c1"), fora: CorTraco.default("c4") }).default({ pista: "c2", evento: "c1", fora: "c4" }),
  highlight: Highlight,
});

const Galho = z.object({ rotulo: z.string(), cor: CorTraco.default("ink"), p: z.number().min(0).max(1).optional(), sucesso: z.boolean().default(false) });
export type Galho = z.output<typeof Galho>;
const Nivel = z.object({ titulo: z.string().optional(), galhos: z.array(Galho).min(1) });

const Arvore = z.object({
  modo: z.literal("arvore"),
  /** Níveis diferentes (camisetas → bermudas → bonés)… */
  niveis: z.array(Nivel).optional(),
  /** …ou o mesmo nível repetido n vezes (n aceita "$n"). */
  galhos: z.array(Galho).optional(),
  n: Expr.default(2),
  /** Barras abaixo das pontas agrupadas por nº de sucessos (coeficientes / probabilidades). */
  agrupar: z.boolean().default(false),
  /** Caminho sempre aceso: "sucessos" = só sucessos (só caras). */
  caminho: z.enum(["nenhum", "sucessos"]).default("nenhum"),
  /** Chave "a = b = 1": todas as pontas valem 1. */
  chave_um: z.boolean().default(false),
  /** Ao tocar uma ponta, mostra o produto das chances (1/2 · 1/2 · 1/2). */
  mostrar_produto: z.boolean().default(false),
  /** Pontas acesas na figura (índices) e quantos sucessos acender automaticamente. */
  acesas: z.array(z.number().int().min(0)).default([]),
  acender_k: z.number().int().min(0).optional(),
  cor_ponta: CorTraco.default("c3"),
  highlight: Highlight,
});

const Fila = z.object({
  modo: z.literal("fila"),
  itens: z.array(z.string()).min(1).max(6),
  /** Quantos lugares (padrão: todos os itens). */
  lugares: z.number().int().min(1).optional(),
  /** Lista de todas as ordens (com `iguais`, as que só trocam os iguais se colam). */
  listar: z.boolean().default(false),
  /** Índices dos itens iguais (O₁ e O₂) e se a chave começa ligada. */
  iguais: z.array(z.number().int().min(0)).optional(),
  iguais_ligado: z.boolean().default(false),
  /** Cadeado: item preso num lugar (índices). */
  prender: z.object({ item: z.number().int().min(0), lugar: z.number().int().min(0) }).optional(),
  preso: z.boolean().default(false),
  /** Mostra a escada de escolhas embaixo dos lugares. */
  escada: z.boolean().default(true),
  /** Figura: ordem já montada (índices dos itens). */
  montada: z.array(z.number().int().min(0)).optional(),
  cores: z.object({ cabem: CorTraco.default("c2"), igual: CorTraco.default("c4"), cadeado: CorTraco.default("c4"), produto: CorTraco.default("c3") }).default({ cabem: "c2", igual: "c4", cadeado: "c4", produto: "c3" }),
  highlight: Highlight,
});

const Escada = z.object({
  modo: z.literal("escada"),
  n: Expr,
  /** Só os k primeiros degraus (arranjo); padrão: todos (fatorial). */
  k: Expr.optional(),
  /** Todos os k degraus com altura n (potência n^k ou soma k·n). */
  iguais: z.boolean().default(false),
  /** Operação mostrada na legenda e métrica total ("produto" ou "soma"). */
  operacao: z.enum(["produto", "soma"]).default("produto"),
  /** Mostra a etiqueta com a conta e o resultado. */
  contador: z.boolean().default(true),
  cores: z.object({ degrau: CorTraco.default("c2"), produto: CorTraco.default("c3") }).default({ degrau: "c2", produto: "c3" }),
  highlight: Highlight,
});

const Lista = z.object({
  modo: z.literal("lista"),
  itens: z.array(z.string()).min(1).max(5),
  k: Expr.default(2),
  /** Ordem importa? Desligada, cada grupo vira uma casa só. */
  ordem: z.boolean().default(true),
  cores: z.object({ grupo: CorTraco.default("c4") }).default({ grupo: "c4" }),
  highlight: Highlight,
});

const BarrasK = z.object({
  modo: z.literal("barras"),
  n: Expr,
  /** k aceso (aceita "$k"). */
  k: Expr.optional(),
  /** Chance de sucesso em % (aceita "$p"): sem ela, as barras são C(n, k). */
  p: Expr.optional(),
  /** Itens para mostrar quem entra (c2) e quem fica de fora no k aceso. */
  itens: z.array(z.string()).optional(),
  cores: z.object({ barra: CorTraco.default("c3"), acesa: CorTraco.default("c2") }).default({ barra: "c3", acesa: "c2" }),
  highlight: Highlight,
});

const Pascal = z.object({
  modo: z.literal("pascal"),
  n: Expr.default(4),
  /** Figura: casa tocada [linha, k]. */
  tocada: z.tuple([z.number().int().min(0), z.number().int().min(0)]).optional(),
  cores: z.object({ numero: CorTraco.default("c4"), seta: CorTraco.default("c1") }).default({ numero: "c4", seta: "c1" }),
  highlight: Highlight,
});

const BolinhasBarras = z.object({
  modo: z.literal("bolinhas_e_barras"),
  bolinhas: z.number().int().min(1).max(8),
  barras: z.number().int().min(1).max(4),
  /** Sequência inicial (figura): "●●|●|". */
  sequencia: z.string().regex(/^[●|o]+$/).optional(),
  /** Rótulos das caixas (x, y, z). */
  caixas: z.array(z.string()).optional(),
  /** Mostra o total C(k + b, b) depois de tantas fileiras vistas (0 = sempre). */
  contador_apos: z.number().int().min(0).default(0),
  /** Numera cada bolinha (1, 2, ...) na fileira. */
  numeradas: z.boolean().default(false),
  cores: z.object({ bolinha: CorTraco.default("c2"), barra: CorTraco.default("c1"), total: CorTraco.default("c3") }).default({ bolinha: "c2", barra: "c1", total: "c3" }),
  highlight: Highlight,
});

const Caixas = z.object({
  modo: z.literal("caixas"),
  itens: z.number().int().min(0).max(8),
  /** Número de caixas (aceita "$n"). */
  n: Expr,
  rotulos: z.array(z.string()).optional(),
  /** Chave "cada uma ganha pelo menos 1". */
  chave_minimo: z.boolean().default(false),
  minimo: z.boolean().default(false),
  cores: z.object({ item: CorTraco.default("c2"), minimo: CorTraco.default("c4"), total: CorTraco.default("c3") }).default({ item: "c2", minimo: "c4", total: "c3" }),
  highlight: Highlight,
});

const Colunas = z.object({
  modo: z.literal("colunas"),
  colunas: z.array(z.object({ titulo: z.string(), itens: z.array(z.string()).min(1), cor: CorTraco.default("ink") })).min(1),
  /** "e": produto; "ou": soma. */
  ou: z.boolean().default(false),
  /** Mostra a etiqueta com a conta e o resultado. */
  contador: z.boolean().default(true),
  cor_total: CorTraco.default("c3"),
  highlight: Highlight,
});

const Urna = z.object({
  modo: z.literal("urna"),
  bolas: z
    .array(
      z.object({
        rotulo: z.string().optional(),
        cor: CorTraco.default("c1"),
        quantidade: z.number().int().min(0).max(20),
      }),
    )
    .min(1),
  /** Quantas bolas foram retiradas (riscadas do total). */
  retiradas: Expr.default(0),
  /** Índice do grupo em destaque para mostrar a fração favoráveis / restante. */
  destaque: z.number().int().min(0).optional(),
  highlight: Highlight,
});

export const Grade = z.discriminatedUnion("modo", [Casas, Tabela, Arvore, Fila, Escada, Lista, BarrasK, Pascal, BolinhasBarras, Caixas, Colunas, Urna]);
export type Grade = z.output<typeof Grade>;
export type GradeDe<M extends Grade["modo"]> = Extract<Grade, { modo: M }>;

const conjuntoExprs = (c?: Conjunto) => (c?.intervalo ? [c.intervalo.de, c.intervalo.ate] : []);

export function exprsDe(p: Grade): Expr[] {
  switch (p.modo) {
    case "casas":
      return [
        p.etapas,
        ...(p.n_linhas !== undefined ? [p.n_linhas] : []),
        ...(p.n_colunas !== undefined ? [p.n_colunas] : []),
        ...conjuntoExprs(p.evento),
        ...conjuntoExprs(p.a),
        ...conjuntoExprs(p.b),
        ...p.botoes_evento.flatMap((b) => conjuntoExprs(b.conjunto)),
      ];
    case "arvore":
      return [p.n];
    case "escada":
      return [p.n, ...(p.k !== undefined ? [p.k] : [])];
    case "lista":
      return [p.k];
    case "barras":
      return [p.n, ...(p.k !== undefined ? [p.k] : []), ...(p.p !== undefined ? [p.p] : [])];
    case "pascal":
      return [p.n];
    case "caixas":
      return [p.n];
    case "urna":
      return [p.retiradas];
    default:
      return [];
  }
}

const checar = (p: Grade, ctx: z.RefinementCtx) => {
  if (p.modo === "arvore" && !p.niveis && !p.galhos) ctx.addIssue({ code: "custom", message: "arvore precisa de niveis ou galhos" });
  if (p.modo === "tabela" && p.linhas.some((l) => l.valores.length !== p.colunas.length))
    ctx.addIssue({ code: "custom", message: "cada linha da tabela precisa de um valor por coluna" });
};

export const GradeResultados = Grade.superRefine(checar);
export const GradeFigura = Grade.superRefine(checar).superRefine((p, ctx) => {
  if (exprsDe(p).some(usaSlider)) ctx.addIssue({ code: "custom", message: 'grade_figura não aceita "$slider": use números' });
});

export const widgetParams = { grade_resultados: GradeResultados } as const;
export const figureParams = { grade_figura: GradeFigura } as const;
