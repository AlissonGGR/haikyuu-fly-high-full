// src/helpers/personagens-helpers.ts
import type { Personagem } from "@data/personagens";

/* =========================== Tipos / Filtros =========================== */

export type TipoJogada =
    | "BLOCK"
    | "POWER"
    | "QUICK"
    | "RECEIVE"
    | "SERVE"
    | "SETTER";

export type Raridade = "UR" | "SSR" | "SR" | "SP";

export type Filtros = {
    posicao: "Todos" | "S" | "MB" | "WS" | "OP" | "L";
    escola: "Todos" | string;
    status: "Todos" | Raridade;
    dataEsperada: "Ignorar" | "Com data" | "Sem data";
    tipos: Set<TipoJogada>;
    /** Texto de pesquisa por nome */
    q?: string;
};

/* =========================== Imagens / Paths =========================== */

// Normaliza caminho de imagem vindo do seu array (ex.: "img/kageyamaUR.png" -> "/personagens/kageyamaUR.png")
export function resolvePersonagemImg(img?: string): string {
    if (!img) return "/personagens/placeholder.png";
    const file = img.replace(/^\/?img\//, "");
    return `/personagens/${file}`;
}

// Mesma ideia, caso receba `src` genérico
export function resolveImg(src: string): string {
    if (!src) return "/personagens/placeholder.png";
    if (src.startsWith("/personagens/")) return src;
    const file = src.replace(/^img\//, "");
    return `/personagens/${file}`;
}

/* =========================== Derivações / Helpers =========================== */

// Extrai raridade a partir do nome (UR/SSR/SP/SR)
export function raridadeDe(nome: string): Raridade | "DESCONHECIDA" {
    const m = nome.match(/\b(UR|SSR|SP|SR)\b/i);
    return (m?.[1]?.toUpperCase() as Raridade) ?? "DESCONHECIDA";
}

// Converte a lista de ícones em tipos de jogada (POWER/QUICK/…)
export function symbolsToTipos(symbols: string[] = []): TipoJogada[] {
    const map: Record<string, TipoJogada> = {
        powersymbol: "POWER",
        quicksymbol: "QUICK",
        receivesymbol: "RECEIVE",
        servesymbol: "SERVE",
        blocksymbol: "BLOCK",
        settersymbol: "SETTER",
    };
    const tipos = new Set<TipoJogada>();
    for (const s of symbols) {
        const key = s.toLowerCase().replace(/.*\/|\.png$/g, ""); // tira path e .png
        const t = map[key];
        if (t) tipos.add(t);
    }
    return [...tipos];
}

// Marca “INCOMPLETO” se tiver stats placeholders ou habilidades sem info
export function personagemIncompleto(p: Personagem): boolean {
    const stats = Object.values(p.Stats ?? {});
    const statsPlaceholder = stats.length > 0 && stats.every((v) => v <= 1);
    const habilidadeVazia = (p.habilidades ?? []).some(
        (h) => !h || /no info yet/i.test(h.descricao || "")
    );
    return statsPlaceholder || habilidadeVazia;
}

// Opções de escola (dinâmicas)
export function listarEscolas(personagens: Personagem[]): string[] {
    return Array.from(new Set(personagens.map((p) => p.School))).sort();
}

// Ordem das posições (para agrupar/seções)
export const ORDEM_POSICOES: Array<Filtros["posicao"]> = ["S", "MB", "WS", "OP", "L"];

// normalizador p/ comparação sem acentos/caixa
const norm = (s: string) =>
    (s || "")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

/* =========================== Filtro principal =========================== */

export function filtrar(personagens: Personagem[], f: Filtros): Personagem[] {
    const q = (f.q || "").trim();

    return personagens.filter((p) => {
        // posição
        if (f.posicao !== "Todos" && p.funcao !== f.posicao) return false;

        // escola
        if (f.escola !== "Todos" && p.School !== f.escola) return false;

        // raridade
        const rar = raridadeDe(p.nome);
        if (f.status !== "Todos" && rar !== f.status) return false;

        // data esperada
        if (f.dataEsperada === "Com data" && !p.data) return false;
        if (f.dataEsperada === "Sem data" && !!p.data) return false;

        // tipos (checkboxes)
        if (f.tipos.size > 0) {
            const tiposDoP = new Set(symbolsToTipos(p.symbols));
            let match = false;
            for (const t of f.tipos) {
                if (tiposDoP.has(t)) {
                    match = true;
                    break;
                }
            }
            if (!match) return false;
        }

        // pesquisa por nome
        if (q && !norm(p.nome).includes(norm(q))) return false;

        return true;
    });
}

/* =========================== Slug / Busca por slug =========================== */

// Gera SLUG a partir do nome (ex.: "Kageyama UR" -> "kageyama-ur")
export function toSlug(s: string): string {
    return s
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/[^a-zA-Z0-9]+/g, "-") // troca não-alfanum por hífen
        .replace(/^-+|-+$/g, "") // tira hífens marginais
        .toLowerCase();
}

// Procura um personagem pelo slug na lista informada
export function findPersonagemBySlug<T extends { nome: string }>(
    slug: string,
    list: T[]
): T | undefined {
    return list.find((p) => toSlug(p.nome) === slug);
}
