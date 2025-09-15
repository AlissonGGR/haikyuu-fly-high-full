// app/(tabs)/components/FiltrosPersonagens.tsx
"use client";

import * as React from "react";
import type { Personagem } from "@data/personagens";
import { ORDEM_POSICOES, type Filtros } from "@helpers/personagens-helpers";

/* ------------------------------------------------------------------ */
/* Labels/Tabelas locais                                               */
/* ------------------------------------------------------------------ */

// Opções fixas
const RARIDADES: Array<"Todos" | "UR" | "SSR" | "SR" | "SP"> = [
    "Todos",
    "UR",
    "SSR",
    "SR",
    "SP",
];

const DATA_OPT: Array<Filtros["dataEsperada"]> = ["Ignorar", "Com data", "Sem data"];

// Labels para os tipos (checkboxes)
const TIPO_LABEL: Record<
    "BLOCK" | "POWER" | "QUICK" | "RECEIVE" | "SERVE" | "SETTER",
    string
> = {
    BLOCK: "BLOCK",
    POWER: "POWER",
    QUICK: "QUICK",
    RECEIVE: "RECEIVE",
    SERVE: "SERVE",
    SETTER: "SETTER",
};

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
type Props = {
    personagens: Personagem[];
    filtros: Filtros;
    onChange: (next: Filtros) => void;
    onClear?: () => void;
};

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */
export default function FiltrosPersonagens({
    personagens,
    filtros,
    onChange,
    onClear,
}: Props) {
    // escolas dinâmicas a partir da lista
    const escolas = React.useMemo(() => {
        const set = new Set<string>();
        for (const p of personagens) if (p.School) set.add(p.School);
        return ["Todos", ...Array.from(set).sort()];
    }, [personagens]);

    // util p/ atualizar
    function setField<K extends keyof Filtros>(key: K, value: Filtros[K]) {
        onChange({ ...filtros, [key]: value });
    }

    // toggle de tipo (Set)
    function toggleTipo(tipo: keyof typeof TIPO_LABEL) {
        const next = new Set(filtros.tipos);
        if (next.has(tipo)) next.delete(tipo);
        else next.add(tipo);
        setField("tipos", next);
    }

    return (
        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 shadow-lg">
            {/* PESQUISAR POR NOME */}
            <div className="mb-3">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                    Pesquisar por nome:
                </label>
                <input
                    type="text"
                    value={filtros.q ?? ""}
                    onChange={(e) => setField("q", e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") setField("q", "");
                    }}
                    placeholder="Ex.: Atsumu, Kageyama, Aone…"
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-orange-500"
                />
            </div>

            {/* POSIÇÃO */}
            <div className="mb-3">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                    Posição:
                </label>
                <select
                    value={filtros.posicao}
                    onChange={(e) => setField("posicao", e.target.value as Filtros["posicao"])}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1.5 text-sm text-neutral-200"
                >
                    {["Todos", ...ORDEM_POSICOES].map((opt) => (
                        <option key={opt} value={opt}>
                            {opt === "S"
                                ? "S"
                                : opt === "MB"
                                    ? "MB"
                                    : opt === "WS"
                                        ? "WS"
                                        : opt === "OP"
                                            ? "OP"
                                            : opt === "L"
                                                ? "L"
                                                : "Todos"}
                        </option>
                    ))}
                </select>
            </div>

            {/* ESCOLA */}
            <div className="mb-3">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                    Escola:
                </label>
                <select
                    value={filtros.escola}
                    onChange={(e) => setField("escola", e.target.value)}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1.5 text-sm text-neutral-200"
                >
                    {escolas.map((esc) => (
                        <option key={esc} value={esc}>
                            {esc}
                        </option>
                    ))}
                </select>
            </div>

            {/* STATUS / RARIDADE */}
            <div className="mb-3">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                    Status:
                </label>
                <select
                    value={filtros.status}
                    onChange={(e) => setField("status", e.target.value as Filtros["status"])}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1.5 text-sm text-neutral-200"
                >
                    {RARIDADES.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>

            {/* DATA ESPERADA */}
            <div className="mb-3">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                    Data de Lançamento Esperada:
                </label>
                <select
                    value={filtros.dataEsperada}
                    onChange={(e) =>
                        setField("dataEsperada", e.target.value as Filtros["dataEsperada"])
                    }
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1.5 text-sm text-neutral-200"
                >
                    {DATA_OPT.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {/* TIPOS (checkboxes) */}
            <div className="mb-4">
                <div className="mb-1 text-xs font-semibold text-neutral-300">Tipo:</div>
                <div className="grid grid-cols-2 gap-y-2">
                    {(Object.keys(TIPO_LABEL) as Array<keyof typeof TIPO_LABEL>).map((t) => {
                        const checked = filtros.tipos.has(t);
                        return (
                            <label
                                key={t}
                                className="inline-flex items-center gap-2 text-sm text-neutral-200"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleTipo(t)}
                                    className="h-4 w-4 rounded border-neutral-600 bg-neutral-800 text-orange-500 focus:ring-0"
                                />
                                {TIPO_LABEL[t]}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* LIMPAR */}
            <button
                onClick={() => onClear?.()}
                className="w-full rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500"
            >
                Limpar
            </button>
        </div>
    );
}
