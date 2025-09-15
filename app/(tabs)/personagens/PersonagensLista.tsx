"use client";

import * as React from "react";
// ✅ use relativo para não depender do alias
import Card from "../components/Card";
import FiltrosPersonagens from "../components/FiltrosPersonagens";

import { characters as CHARACTERS } from "@data/personagens";
import type { Personagem } from "@data/personagens";

import {
    Filtros,
    filtrar,
    resolveImg,
    raridadeDe,
    personagemIncompleto,
    ORDEM_POSICOES,
    symbolsToTipos,
} from "@helpers/personagens-helpers";

/* ------------------------- UI helpers ------------------------- */

type SortKey = "nome" | "raridade_desc" | "data_asc";

const FILTROS_INICIAIS: Filtros = {
    posicao: "Todos",
    escola: "Todos",
    status: "Todos",
    dataEsperada: "Ignorar",
    tipos: new Set(),
};

const raridadeRank: Record<string, number> = {
    UR: 4,
    SP: 3,
    SSR: 2,
    SR: 1,
    DESCONHECIDA: 0,
};

function normalize(s: string) {
    return (s || "")
        .normalize("NFD")
        // @ts-ignore – usar Unicode property escapes
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();
}

function parseData(mmddyy?: string): number {
    if (!mmddyy) return Number.POSITIVE_INFINITY;
    // seus dados estão no formato "MM/DD/YY"
    const [m, d, y] = mmddyy.split("/").map((n) => parseInt(n, 10));
    // suposição: "25" => 2025 etc.
    const year = y >= 70 ? 1900 + y : 2000 + y;
    const date = new Date(year, (m || 1) - 1, d || 1);
    return date.getTime();
}

function tituloPosicao(pos: string): string {
    switch (pos) {
        case "S":
            return "Levantador (S)";
        case "MB":
            return "Middle Blocker (MB)";
        case "WS":
            return "Wing Spiker (WS)";
        case "OP":
            return "Oposto (OP)";
        case "L":
            return "Líbero (L)";
        default:
            return pos;
    }
}

function RaridadeBadge({ raridade }: { raridade: string }) {
    const cores: Record<string, string> = {
        UR: "bg-cyan-300 text-neutral-900",
        SSR: "bg-violet-300 text-neutral-900",
        SR: "bg-emerald-400 text-neutral-900",
        SP: "bg-rose-300 text-neutral-900",
        DESCONHECIDA: "bg-neutral-600 text-white",
    };
    return (
        <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${cores[raridade] || "bg-neutral-600 text-white"}`}
        >
            {raridade}
        </span>
    );
}

function TipoChip({ t }: { t: string }) {
    const style: Record<string, string> = {
        BLOCK: "bg-indigo-500/20 text-indigo-300 border-indigo-600/40",
        POWER: "bg-orange-500/20 text-orange-300 border-orange-600/40",
        QUICK: "bg-green-500/20 text-green-300 border-green-600/40",
        RECEIVE: "bg-teal-500/20 text-teal-300 border-teal-600/40",
        SERVE: "bg-yellow-500/20 text-yellow-300 border-yellow-600/40",
        SETTER: "bg-sky-500/20 text-sky-300 border-sky-600/40",
    };
    return (
        <span
            className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${style[t] || "bg-neutral-700 text-neutral-200 border-neutral-600"}`}
        >
            {t}
        </span>
    );
}

/* --------------------------- Component --------------------------- */

export default function PersonagensLista() {
    const [filtros, setFiltros] = React.useState<Filtros>(FILTROS_INICIAIS);
    const [q, setQ] = React.useState("");
    const [sortBy, setSortBy] = React.useState<SortKey>("nome");

    // 1) aplica filtros
    const base = React.useMemo(
        () => filtrar(CHARACTERS as Personagem[], filtros),
        [filtros]
    );

    // 2) busca simples (nome + escola)
    const buscados = React.useMemo(() => {
        const n = normalize(q);
        if (!n) return base;
        return base.filter((p) =>
            normalize(`${p.nome} ${p.School}`).includes(n)
        );
    }, [base, q]);

    // 3) ordenação
    const lista = React.useMemo(() => {
        const arr = buscados.slice();
        arr.sort((a, b) => {
            if (sortBy === "nome") {
                return a.nome.localeCompare(b.nome, "pt-BR");
            }
            if (sortBy === "data_asc") {
                return parseData(a.data) - parseData(b.data) || a.nome.localeCompare(b.nome, "pt-BR");
            }
            // raridade_desc
            const ra = raridadeRank[raridadeDe(a.nome)] ?? 0;
            const rb = raridadeRank[raridadeDe(b.nome)] ?? 0;
            return rb - ra || a.nome.localeCompare(b.nome, "pt-BR");
        });
        return arr;
    }, [buscados, sortBy]);

    // 4) agrupa por posição na ordem desejada
    const grupos = React.useMemo(() => {
        const map = new Map<string, Personagem[]>();
        for (const pos of ORDEM_POSICOES) map.set(pos, []);
        for (const p of lista) (map.get(p.funcao) ?? []).push(p);
        return map;
    }, [lista]);

    const total = lista.length;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px,1fr]">
            {/* Lateral: filtros */}
            <FiltrosPersonagens
                personagens={CHARACTERS as Personagem[]}
                filtros={filtros}
                onChange={setFiltros}
                onClear={() => setFiltros({ ...FILTROS_INICIAIS })}
            />

            {/* Conteúdo */}
            <div className="space-y-6">
                <Card
                    title="Personagens"
                    subtitle={`Lista de personagens cadastrados • ${total} resultado${total === 1 ? "" : "s"}`}
                >
                    {/* Barra de busca + ordenação */}
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Buscar por nome ou escola…"
                            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-orange-500"
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortKey)}
                            className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-orange-500"
                        >
                            <option value="nome">Ordenar: Nome (A→Z)</option>
                            <option value="raridade_desc">Ordenar: Raridade (UR→SR)</option>
                            <option value="data_asc">Ordenar: Data (mais próxima)</option>
                        </select>
                    </div>

                    {/* Lista agrupada por posição, em “cards” estilo lista */}
                    {ORDEM_POSICOES.map((pos) => {
                        const itens = grupos.get(pos) || [];
                        if (itens.length === 0) return null;

                        return (
                            <section key={pos} className="mb-8">
                                <h2 className="mb-3 text-lg font-semibold text-orange-400">
                                    {tituloPosicao(pos)} <span className="text-neutral-400">({itens.length})</span>
                                </h2>

                                <ul className="space-y-3">
                                    {itens.map((p) => {
                                        const rar = raridadeDe(p.nome);
                                        const tipos = symbolsToTipos(p.symbols);
                                        const resumo =
                                            p.habilidades?.[0]?.descricao?.toString().slice(0, 220) ?? "";

                                        return (
                                            <li
                                                key={`${p.School}-${p.nome}`}
                                                className="grid grid-cols-[110px,1fr] gap-4 rounded-xl border border-neutral-700 bg-neutral-900 p-4 hover:border-orange-500"
                                            >
                                                <div className="h-24 w-[110px] overflow-hidden rounded-md bg-neutral-800">
                                                    <img
                                                        src={resolveImg(p.img)}
                                                        alt={p.nome}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src =
                                                                "/personagens/placeholder.png";
                                                        }}
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <strong className="truncate text-lg font-semibold text-amber-200">
                                                            {p.nome}
                                                        </strong>
                                                        <span className="text-neutral-400">• {p.School}</span>
                                                        <RaridadeBadge raridade={rar} />
                                                        {personagemIncompleto(p) && (
                                                            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white">
                                                                INCOMPLETO
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="mt-1 text-sm text-neutral-300">
                                                        {p.funcao}{" "}
                                                        {p.data ? (
                                                            <span className="text-neutral-400">• Lançamento: {p.data}</span>
                                                        ) : (
                                                            <span className="text-neutral-500">• Sem data</span>
                                                        )}
                                                    </div>

                                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                                        {tipos.length > 0
                                                            ? tipos.map((t) => <TipoChip key={t} t={t} />)
                                                            : <span className="text-xs text-neutral-500">Sem tipos</span>}
                                                    </div>

                                                    {resumo && (
                                                        <p className="mt-2 line-clamp-3 text-sm text-neutral-200">{resumo}</p>
                                                    )}

                                                    {/* bullets das habilidades (até 4) */}
                                                    {p.habilidades?.length ? (
                                                        <ul className="mt-2 ml-4 list-disc space-y-1 text-[13px] text-neutral-200">
                                                            {p.habilidades.slice(0, 4).map((h) => (
                                                                <li key={h.nome}>
                                                                    <b>{h.nome}:</b> {h.descricao}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        );
                    })}

                    {/* vazio */}
                    {total === 0 && (
                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-8 text-center text-neutral-300">
                            Nenhum personagem encontrado com os filtros/busca atuais.
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
