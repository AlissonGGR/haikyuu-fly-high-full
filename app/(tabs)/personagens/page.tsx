// app/(tabs)/personagens/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Tabs from "../components/Tabs";
import Card from "../components/Card";
import FiltrosPersonagens from "../components/FiltrosPersonagens";

import { characters as CHARACTERS } from "@data/personagens";
import type { Personagem } from "@data/personagens";

import {
  Filtros,
  filtrar,
  resolvePersonagemImg,
  raridadeDe,
  personagemIncompleto,
  symbolsToTipos,
  toSlug,
} from "@helpers/personagens-helpers";

/* ------------------------------ filtros iniciais ------------------------------ */
const FILTROS_INICIAIS: Filtros = {
  posicao: "Todos",
  escola: "Todos",
  status: "Todos",
  dataEsperada: "Ignorar",
  tipos: new Set(),
  q: "",
};

/* --------------------------------- Intro --------------------------------- */
function IntroParametros() {
  return (
    <Card title="Parâmetros — leia antes">
      <div className="overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900">
        <div className="aspect-[16/9] w-full">
          <img
            src="/personagens/intro-banner.png"
            alt="Parâmetros — explicação"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-200">
        <p className="mb-2">
          Nesta página listamos os <strong>parâmetros no nível máximo</strong> dos
          personagens para facilitar a montagem de times.
        </p>
        <ul className="ml-5 list-disc space-y-1 text-neutral-300">
          <li>
            Os <strong>valores em verde</strong> variam com <em>Potenciais</em>,
            <em> Memórias</em>, <em>Ressonância</em> e buffs/debuffs.
          </li>
          <li>
            Aqui priorizamos os <strong>valores base (pretos)</strong> para comparação justa.
          </li>
          <li>Após balanceamentos podem ocorrer pequenos desvios.</li>
        </ul>
      </div>
    </Card>
  );
}

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [filtros, setFiltros] = React.useState<Filtros>(FILTROS_INICIAIS);

  const lista = React.useMemo(
    () =>
      filtrar(CHARACTERS as Personagem[], filtros)
        .slice()
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")),
    [filtros]
  );

  return (
    <>
      <Tabs />

      {/* topo */}
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm hover:border-orange-500 lg:hidden"
        >
          Filtros
        </button>
        <span className="text-sm text-neutral-400">
          {lista.length} resultado{lista.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* layout */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* SIDEBAR */}
        <aside className="sticky top-20 hidden self-start lg:block">
          <div className="w-[320px] rounded-xl border border-neutral-700 bg-neutral-900 p-3 shadow-lg">
            <FiltrosPersonagens
              personagens={CHARACTERS as Personagem[]}
              filtros={filtros}
              onChange={setFiltros}
              onClear={() => setFiltros({ ...FILTROS_INICIAIS })}
            />
          </div>
        </aside>

        {/* CONTEÚDO */}
        <div className="space-y-6">
          <IntroParametros />

          <Card title="Personagens" subtitle="Lista de personagens cadastrados">
            {/* FLEX WRAP -> evita sobreposição quando as alturas variam */}
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-6">
              {lista.map((p) => {
                const rar = raridadeDe(p.nome);
                const src = resolvePersonagemImg(p.img);
                const resumo = p.habilidades?.[0]?.descricao?.slice(0, 280) ?? "";
                const tipos = symbolsToTipos(p.symbols).join(", ");
                const slug = toSlug(p.nome);

                return (
                  <li key={slug} className="list-none">
                    <Link
                      href={`/personagens/${slug}`}
                      className="group flex w-[232px] sm:w-[248px] flex-col overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 shadow-sm transition hover:border-orange-500 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      {/* Imagem padronizada 3:4 */}
                      <div className="border-b border-neutral-700 bg-neutral-900">
                        <div className="aspect-[3/4] w-full">
                          <img
                            src={src}
                            alt={p.nome}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 min-h-[44px]">
                          <h3 className="text-base font-semibold leading-tight text-orange-400 line-clamp-2">
                            {p.nome}
                          </h3>
                        </div>

                        <div className="mb-2 flex flex-wrap items-center gap-1.5">
                          <Badge>{p.funcao}</Badge>
                          {rar !== "DESCONHECIDA" && <Badge tone="info">{rar}</Badge>}
                          {personagemIncompleto(p) && <Badge tone="alert">INCOMPLETO</Badge>}
                        </div>

                        <p className="text-xs text-neutral-500">{p.School}</p>
                        <p className="mt-1 text-xs text-neutral-400">Tipos: {tipos || "—"}</p>

                        {resumo && (
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-200">
                            {resumo}
                          </p>
                        )}

                        <div className="mt-auto" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>

      {/* DRAWER (mobile) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"
            }`}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[320px] border-r border-neutral-700 bg-neutral-900 transition-transform ${open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 p-4">
            <strong className="text-neutral-200">Filtros</strong>
            <button
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-neutral-400 hover:bg-neutral-800"
            >
              ✕
            </button>
          </div>
          <div className="h-[calc(100vh-49px)] overflow-y-auto p-3">
            <FiltrosPersonagens
              personagens={CHARACTERS as Personagem[]}
              filtros={filtros}
              onChange={setFiltros}
              onClear={() => setFiltros({ ...FILTROS_INICIAIS })}
            />
          </div>
        </aside>
      </div>
    </>
  );
}

/* --------------------------------- Badge --------------------------------- */
function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "info" | "alert";
}) {
  const styles =
    tone === "alert"
      ? "bg-rose-500 text-white"
      : tone === "info"
        ? "bg-cyan-400 text-neutral-900"
        : "bg-neutral-700 text-neutral-200";
  return (
    <span className={`rounded-full px-2 py-[2px] text-[11px] font-bold ${styles}`}>
      {children}
    </span>
  );
}
