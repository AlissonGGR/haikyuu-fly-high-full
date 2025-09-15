"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Tabs from "../../components/Tabs";
import Card from "../../components/Card";

import { characters as CHARACTERS, type Personagem } from "@data/personagens";
import {
    toSlug,
    resolvePersonagemImg,
    raridadeDe,
    symbolsToTipos,
} from "@helpers/personagens-helpers";

// catálogo (memórias)
import { memoryCatalog } from "@data/memorias-catalog";

/* ------------------------------------------------------------------ */
/* utils                                                              */
/* ------------------------------------------------------------------ */

// garante caminho público
const toPublic = (src: string) => (src.startsWith("/") ? src : `/${src.replace(/^\/?/, "")}`);

// corrige caminhos legados de MEMÓRIAS: /img/memories/*  -> /memorias/*
function resolveMemoryImg(src?: string) {
    if (!src) return "/memorias/placeholder.png";
    let s = src.trim();
    s = s.replace(/^\/?img\/memories\//i, "/memorias/").replace(/^\/?memories\//i, "/memorias/");
    if (!s.startsWith("/")) s = "/" + s;
    return s;
}

/** tenta achar uma memória “do próprio personagem” por heurística no nome */
function findRecommendedMemory(personName: string) {
    const slug = toSlug(personName);
    const base = slug.split("-")[0];
    const slugUnderscore = slug.replace(/-/g, "_");
    return (
        memoryCatalog.find((m) => m.id?.toLowerCase().includes(slugUnderscore)) ||
        memoryCatalog.find((m) => toSlug(m.name).includes(slug)) ||
        memoryCatalog.find((m) => toSlug(m.name).includes(base))
    );
}

/** potenciais recomendados: se não houver no dado, usa os ícones padrão/symbols */
function getRecommendedPotentials(p: Personagem): Array<{ icon: string; label?: string }> {
    const anyP = p as any;
    if (Array.isArray(anyP.potenciaisRecomendados) && anyP.potenciaisRecomendados.length) {
        return anyP.potenciaisRecomendados;
    }
    return (p.symbols ?? []).map((s) => {
        const icon = toPublic(s);
        return { icon, label: icon.split("/").pop()?.replace(".png", "") };
    });
}

/* ------------------------------------------------------------------ */
/* Ícones dos TIPOS e das Ressonâncias                                */
/* ------------------------------------------------------------------ */

// /public/tipos/{rapido,receber,batendo,servidor,levantando,bloqueio}.png
const TIPO_ICON_MAP: Record<string, string> = {
    QUICK: "/tipos/rapido.png",
    RECEIVE: "/tipos/receber.png",
    POWER: "/tipos/batendo.png",
    SERVE: "/tipos/servir.png",
    SETTER: "/tipos/toss.png",
    BLOCK: "/tipos/bloqueio.png",
};

// /public/ressonancia/ressonancia_lvl_{1..5}.png
const RES_ICON = (lvl: number) => `/ressonancia/ressonancia_lvl_${lvl}.png`;

/* ------------------------------------------------------------------ */
/* Conteúdo extra por personagem (wiki) – exemplo: HINATA SP          */
/* ------------------------------------------------------------------ */

type ExtraBlock = {
    tipos?: Array<{ titulo: string; texto: string; tipoKey?: keyof typeof TIPO_ICON_MAP }>;
    skills?: Array<{ nome: string; cd?: string; texto: string }>;
    resonancias?: Array<{ titulo: string; req?: string; texto: string }>;
    kizuna?: Array<{ titulo: string; texto: string }>;
    escolaKizuna?: { escola: string; texto: string };
    potenciais?: {
        efeitoConjunto: string;
        nota?: string;
        partes: Array<{ parte: string; param: string }>;
    };
    avaliacao?: string[];
};

const EXTRA_BY_SLUG: Record<string, ExtraBlock> = {
    /** HINATA SP */
    "hinata-sp": {
        tipos: [
            {
                titulo: "Ataque rápido",
                tipoKey: "QUICK",
                texto:
                    "Membro especializado em ataques rápidos. Ao executar um spike, o parâmetro [Ataque rápido] é ativado. A potência aumenta quando o adversário tenta bloquear.",
            },
            {
                titulo: "Receber",
                tipoKey: "RECEIVE",
                texto:
                    "Membro com alta proficiência em receber. Maior probabilidade de realizar recepções. A potência aumenta quando o adversário executa um ataque rápido.",
            },
        ],
        skills: [
            {
                nome: "Manipular momentos",
                cd: "Recarga: nenhuma",
                texto:
                    "Se Shoyo Hinata (Hanami) estiver em quadra, a [Técnica de Defesa] da vanguarda aliada aumenta (Nv1: 10%, Nv2: 13%, Nv3: 16%).\n" +
                    "Se a jogada de Hinata (Hanami) se tornar uma Boa Jogada, a sua [Técnica de Ataque] aumenta (Nv1: 3%, Nv2: 3,5%, Nv3: 4%). Acumula até 4 vezes.",
            },
            {
                nome: "Uma peça que serve de apoio",
                cd: "Recarga: 6",
                texto:
                    "Hinata (Hanami) realiza um [Receber] com poder de (Nv1: 140%, Nv2: 160%, Nv3: 180%), e os parâmetros principais dos aliados aumentam em 12%. Dura até a bola cruzar a rede 6 vezes.",
            },
            {
                nome: "Um golpe de retorno",
                cd: "Recarga: nenhuma",
                texto:
                    "Se Hinata (Hanami) estiver na retaguarda, a [Técnica de Defesa] da retaguarda aliada aumenta (Nv1: 10%, Nv2: 13%, Nv3: 16%).\n" +
                    "Se Hinata (Hanami) estiver em quadra e a recepção aliada não for RUIM, o [Ataque rápido] dele aumenta (Nv1: 12%, Nv2: 16%, Nv3: 20%). Dura até a bola cruzar a rede 2 vezes.\n" +
                    "Se uma recepção aliada se tornar Boa Jogada, no primeiro ataque rápido de Hinata (após a ocorrência), a sua [Consciência] aumenta em 100%.",
            },
            {
                nome: "Salte alto",
                cd: "Recarga: 8",
                texto:
                    "Hinata (Hanami) executa um [Ataque rápido] com poder de (Nv1: 260%, Nv2: 275%, Nv3: 290%, Nv4: 305%, Nv5: 320%). Se for Boa Jogada, o poder aumenta em [Ataque rápido] × (Nv1: 40%, Nv2: 45%, Nv3: 50%, Nv4: 55%, Nv5: 60%).",
            },
        ],
        resonancias: [
            {
                titulo: "Ressonância de habilidade I",
                req: "Nível de habilidade necessário: 4",
                texto: "Aumenta em 13% os parâmetros principais.",
            },
            {
                titulo: "Ressonância de habilidade II",
                req: "Nível de habilidade necessário: 6",
                texto:
                    "A [Técnica de Ataque] de Hinata (Hanami) aumenta 20%. Se o ataque rápido dele virar Boa Jogada, não poderá ser bloqueado e a [Consciência] e a [Reação] dos adversários reduzem 10%. Dura até a bola cruzar a rede 3 vezes.\n" +
                    "Se o ponto for marcado nesse ataque rápido, a [Consciência] e a [Reação] do adversário reduzem mais 10% (mesma duração).",
            },
            {
                titulo: "Ressonância de habilidade III",
                req: "Nível de habilidade necessário: 8",
                texto: "Aumenta em 13% os parâmetros principais.",
            },
            {
                titulo: "Ressonância de habilidade IV",
                req: "Nível de habilidade necessário: 10",
                texto:
                    "O [Poder] de Hinata (Hanami) aumenta 30%. No início da partida, a sua [Consciência] é reduzida para 0% e, a cada 1% reduzido, o [Poder] aumenta 2,5%. Se o ataque rápido virar Boa Jogada, o [Poder] adicional será [Consciência] × 40% (máx. +60%).",
            },
            {
                titulo: "Ressonância de habilidade V",
                req: "Nível de habilidade necessário: 12",
                texto: "Aumenta em 13% os parâmetros principais.",
            },
        ],
        kizuna: [
            {
                titulo: "Dupla excêntrica (Habilidade Kizuna)",
                texto:
                    "Quando uma habilidade de Receber de um aliado é ativada, consome 1 acúmulo de [Odeio Perder] e aumenta a [Reação] do receptor em 6%.\n" +
                    "Quando a habilidade de Receber de Hinata (Hanami) consome [Odeio Perder], a [Reação] dele aumenta mais 9% e Tobio Kageyama ganha 1 acúmulo de [Odeio Perder].\n" +
                    "Quando a técnica especial de Hinata (Hanami) é ativada, Kageyama ganha 1 acúmulo de [Odeio Perder].",
            },
            {
                titulo: "Hanami (Habilidade Kizuna)",
                texto:
                    "No início da partida, Kenma Kozume (Hanami) ganha 3 acúmulos de [Defesa para eliminar lacunas] e o máximo aumenta (Nv1: 13, Nv2: 13, Nv3: 14, Nv4: 14, Nv5: 15).\n" +
                    "Para cada acúmulo, a [Consciência] de Kenma aumenta (Nv1: 0,8%, Nv2: 1%, Nv3: 1%, Nv4: 1%, Nv5: 1,2%). Se a jogada de Hinata virar Boa Jogada, o [Ataque rápido] dele aumenta (Nv1: 1%, Nv2: 1,25%, Nv3: 1,25%, Nv4: 1,5%, Nv5: 1,5%).",
            },
            {
                titulo: "Karasuno — grupo da recuperação (Kizuna)",
                texto:
                    "Hinata (Hanami) [Receber] e Yū Nishinoya (pós-aula) [Levantar] aumentam (Nv1: 5+1%, Nv2: 7+2%, Nv3: 9+3%, Nv4: 12+4%, Nv5: 15%).",
            },
            {
                titulo: "Pessoas de físico semelhante (Kizuna)",
                texto:
                    "Hinata (Hanami) [Ataque rápido] e Kōrai Hoshiumi [Ataque potente] aumentam (Nv1: 5+1%, Nv2: 7+2%, Nv3: 9+3%, Nv4: 12+4%, Nv5: 15%).",
            },
            {
                titulo: "Amizade estranha (Kizuna)",
                texto:
                    "Hinata (Hanami) [Ataque rápido] e Takanobu Aone (praia) [Bloqueio] aumentam (Nv1: 5+1%, Nv2: 7+2%, Nv3: 9+3%, Nv4: 12+4%, Nv5: 15%).\n" +
                    "Observação: Kizuna é liberada quando todos os membros aplicáveis forem obtidos; Habilidade Kizuna funciona quando todos estão em quadra.",
            },
        ],
        escolaKizuna: {
            escola: "Escola Secundária Karasuno",
            texto:
                "Quando 4 ou mais membros de Karasuno estiverem em quadra, todos na quadra recebem [Ataque potente/Ataque rápido] +10%.",
        },
        potenciais: {
            efeitoConjunto: "Ao ativar a habilidade de Ataque rápido, [Ataque rápido] +5% (acumula até 5).",
            partes: [
                { parte: "II", param: "Consciência, Poder, Ataque rápido" },
                { parte: "IV", param: "Reação, Mental" },
                { parte: "VI", param: "Técnica de Ataque, Técnica de Defesa, Ataque rápido" },
            ],
            nota: "Referência: explicação completa de como selecionar cuidadosamente o potencial.",
        },
        avaliacao: [
            "Primeira implementação de raridade SP; os valores de parâmetros são ~2000 acima dos UR.",
            "Os bônus de Ressonância de Habilidade (13%) são iguais aos de UR — ou seja, sem diferença extrema.",
        ],
    },
};

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function PersonagemPage({ params }: { params: { slug: string } }) {
    const person = (CHARACTERS as Personagem[]).find((p) => toSlug(p.nome) === params.slug);
    if (!person) return notFound();

    const img = resolvePersonagemImg(person.img);
    const rar = raridadeDe(person.nome);
    const tipos = symbolsToTipos(person.symbols).join(", ") || "—";

    const mem = findRecommendedMemory(person.nome);
    const extra = EXTRA_BY_SLUG[params.slug];

    return (
        <>
            <Tabs />

            <div className="mb-4 flex items-center justify-between">
                <Link
                    href="/personagens"
                    className="text-sm rounded-lg border border-neutral-700 px-3 py-1.5 hover:border-orange-500"
                >
                    ← Voltar para personagens
                </Link>
            </div>

            <Card
                title={person.nome}
                subtitle={`${person.funcao}${rar !== "DESCONHECIDA" ? ` • ${rar}` : ""}`}
            >
                {/* Header com imagem + infos rápidas */}
                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    {/* Imagem */}
                    <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-2">
                        <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-lg">
                            <Image
                                src={img}
                                alt={person.nome}
                                fill
                                sizes="(max-width:768px) 100vw, 280px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Infos básicas */}
                    <div className="grid gap-4">
                        <div className="rounded-xl border border-neutral-700 p-4">
                            <h3 className="mb-2 font-semibold text-neutral-200">Informações Básicas</h3>
                            <ul className="space-y-1 text-sm text-neutral-300">
                                <li>
                                    <span className="text-neutral-400">Posição:</span> {person.funcao}
                                </li>
                                <li>
                                    <span className="text-neutral-400">Escola:</span> {person.School || "—"}
                                </li>
                                <li>
                                    <span className="text-neutral-400">Raridade:</span>{" "}
                                    {rar === "DESCONHECIDA" ? "—" : rar}
                                </li>
                                <li>
                                    <span className="text-neutral-400">Tipos:</span> {tipos}
                                </li>
                                <li>
                                    <span className="text-neutral-400">Data (se houver):</span>{" "}
                                    {person.data || "—"}
                                </li>
                            </ul>
                        </div>

                        {/* Stats (resumo clássico) */}
                        <div className="rounded-xl border border-neutral-700 p-4">
                            <h3 className="mb-2 font-semibold text-neutral-200">Parâmetros (nível máx.)</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                                <Stat label="Serve" value={person.Stats?.Serve} />
                                <Stat label="Spike" value={person.Stats?.Spike} />
                                <Stat label="Set" value={person.Stats?.Set} />
                                <Stat label="Receive" value={person.Stats?.Receive} />
                                <Stat label="Block" value={person.Stats?.Block} />
                                <Stat label="Save" value={person.Stats?.Save} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Potenciais recomendados (ícones) */}
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Potenciais recomendados</h3>
                    <div className="flex flex-wrap gap-3">
                        {getRecommendedPotentials(person).map((it, i) => (
                            <div
                                key={`${it.icon}-${i}`}
                                className="flex items-center gap-2 rounded-lg border border-neutral-800 p-2"
                            >
                                <img src={toPublic(it.icon)} alt="" className="h-7 w-7 object-contain" />
                                {it.label && <span className="text-xs text-neutral-400">{it.label}</span>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Memória recomendada (com imagem retangular) */}
                {mem && (
                    <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                        <h3 className="mb-3 font-semibold text-neutral-200">Memória recomendada</h3>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="shrink-0">
                                <div className="relative w-28 aspect-[7/10] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                                    <img
                                        src={resolveMemoryImg(mem.img)}
                                        alt={mem.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-orange-400">{mem.name}</div>
                                <div className="mt-0.5 text-xs text-neutral-400">
                                    Posições: {mem.positions?.join(", ") || "—"}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-200">{mem.desc}</p>
                                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                                    {Object.entries(mem.bonus || {}).map(([k, v]: any) => (
                                        <Stat key={k} label={k} value={v?.flat} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ================== CONTEÚDO EXTRA (WIKI) ================== */}
                {extra && <WikiExtra extra={extra} />}
                {/* =========================================================== */}

                {/* IMPORTANTE: retirado o bloco duplicado de
            “Habilidades (resumo do dataset)” para evitar repetição */}
            </Card>
        </>
    );
}

/* --------------------------------- Extra renderer --------------------------------- */

function WikiExtra({ extra }: { extra: ExtraBlock }) {
    return (
        <>
            {/* Tipos (com ícone à esquerda) */}
            {extra.tipos && extra.tipos.length > 0 && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Tipo</h3>
                    <div className="space-y-4">
                        {extra.tipos.map((t) => (
                            <div key={t.titulo}>
                                <div className="flex items-center gap-2">
                                    {t.tipoKey && (
                                        <img
                                            src={TIPO_ICON_MAP[t.tipoKey] || ""}
                                            alt=""
                                            className="h-5 w-5 object-contain"
                                        />
                                    )}
                                    <div className="font-semibold text-neutral-100">{t.titulo}</div>
                                </div>
                                <p className="mt-1 whitespace-pre-line text-sm text-neutral-300">{t.texto}</p>
                                <hr className="my-3 border-neutral-800" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Habilidades (principal) */}
            {extra.skills && extra.skills.length > 0 && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Habilidades</h3>
                    <div className="space-y-6">
                        {extra.skills.map((s) => (
                            <div key={s.nome}>
                                <div className="text-neutral-100">
                                    <span className="font-semibold">{s.nome}</span>
                                    {s.cd ? <span className="ml-2 text-xs text-neutral-400">({s.cd})</span> : null}
                                </div>
                                <p className="mt-1 whitespace-pre-line text-sm text-neutral-300">{s.texto}</p>
                                <hr className="my-3 border-neutral-800" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Ressonâncias (com ícone por nível) */}
            {extra.resonancias && extra.resonancias.length > 0 && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Habilidade de ressonância</h3>
                    <div className="space-y-6">
                        {extra.resonancias.map((r, idx) => (
                            <div key={r.titulo}>
                                <div className="flex items-center gap-2 text-neutral-100">
                                    <img
                                        src={RES_ICON(idx + 1)}
                                        alt=""
                                        className="h-5 w-5 object-contain"
                                    />
                                    <span className="font-semibold">{r.titulo}</span>
                                    {r.req ? <span className="ml-2 text-xs text-neutral-400">({r.req})</span> : null}
                                </div>
                                <p className="mt-1 whitespace-pre-line text-sm text-neutral-300">{r.texto}</p>
                                <hr className="my-3 border-neutral-800" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Kizuna */}
            {extra.kizuna && extra.kizuna.length > 0 && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Kizuna</h3>
                    <div className="space-y-6">
                        {extra.kizuna.map((k) => (
                            <div key={k.titulo}>
                                <div className="font-semibold text-neutral-100">{k.titulo}</div>
                                <p className="mt-1 whitespace-pre-line text-sm text-neutral-300">{k.texto}</p>
                                <hr className="my-3 border-neutral-800" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Escola Kizuna */}
            {extra.escolaKizuna && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Escola Kizuna</h3>
                    <div className="font-semibold text-neutral-100">{extra.escolaKizuna.escola}</div>
                    <p className="mt-1 text-sm text-neutral-300">{extra.escolaKizuna.texto}</p>
                </section>
            )}

            {/* Potenciais recomendados (tabela) */}
            {extra.potenciais && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Organização potencial recomendada</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-0 text-sm">
                            <thead>
                                <tr className="bg-neutral-800 text-neutral-100">
                                    <th className="border border-neutral-700 px-3 py-2 text-left">2 peças</th>
                                    <th className="border border-neutral-700 px-3 py-2 text-left">4 peças</th>
                                    <th className="border border-neutral-700 px-3 py-2 text-left">
                                        Efeito de conjunto (4 peças)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-neutral-800 px-3 py-2">—</td>
                                    <td className="border border-neutral-800 px-3 py-2">—</td>
                                    <td className="border border-neutral-800 px-3 py-2">
                                        {extra.potenciais.efeitoConjunto}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-0 text-sm">
                            <thead>
                                <tr className="bg-neutral-800 text-neutral-100">
                                    <th className="border border-neutral-700 px-3 py-2 text-left">Parte</th>
                                    <th className="border border-neutral-700 px-3 py-2 text-left">Parâmetro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extra.potenciais.partes.map((p) => (
                                    <tr key={p.parte}>
                                        <td className="border border-neutral-800 px-3 py-2">{p.parte}</td>
                                        <td className="border border-neutral-800 px-3 py-2">{p.param}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {extra.potenciais.nota && (
                        <p className="mt-2 text-xs text-neutral-500">{extra.potenciais.nota}</p>
                    )}
                </section>
            )}

            {/* Avaliação */}
            {extra.avaliacao && extra.avaliacao.length > 0 && (
                <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                    <h3 className="mb-3 font-semibold text-neutral-200">Avaliação e utilização</h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
                        {extra.avaliacao.map((t, i) => (
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
}

/* --------------------------------- Stat pill --------------------------------- */

function Stat({ label, value }: { label: string; value?: number }) {
    return (
        <div className="rounded-lg border border-neutral-800 p-2">
            <div className="text-[11px] uppercase tracking-wide text-neutral-400">{label}</div>
            <div className="text-sm font-semibold text-neutral-200">{value ?? "—"}</div>
        </div>
    );
}
