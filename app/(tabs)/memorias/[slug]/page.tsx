// app/(tabs)/memorias/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Tabs from "../../components/Tabs";
import Card from "../../components/Card";

import { memoryCatalog, type MemoryCatalogItem } from "@data/memorias-catalog";
import { toSlug as baseToSlug } from "@helpers/personagens-helpers";

/* -------------------------------- utils -------------------------------- */

function toSlug(s: string | undefined | null) {
    if (!s) return "";
    return baseToSlug(String(s).replace(/_/g, "-"));
}

function canonicalSlugOf(m: MemoryCatalogItem) {
    return toSlug(m.id) || toSlug(m.name);
}

function findMemoryBySlug(slugParam: string) {
    const s = toSlug(slugParam);
    return (
        memoryCatalog.find((m) => toSlug(m.id) === s) ||
        memoryCatalog.find((m) => toSlug(m.name) === s)
    );
}

/** Extrai o nome do arquivo e força o caminho em /memorias/<arquivo>.png */
function memoryImgPath(m: MemoryCatalogItem) {
    const baseName = (m.img ?? "").split("/").pop() || `${canonicalSlugOf(m)}.png`;
    return `/memorias/${baseName.replace(/^\/?/, "")}`;
}

/* ----------------------------- static params ---------------------------- */

export function generateStaticParams() {
    return memoryCatalog.map((m) => ({ slug: canonicalSlugOf(m) }));
}

/* --------------------------------- Page --------------------------------- */

export default function MemoryPage({ params }: { params: { slug: string } }) {
    const mem = findMemoryBySlug(params.slug);
    if (!mem) return notFound();

    const imgSrc = memoryImgPath(mem);
    const positions =
        Array.isArray(mem.positions) && mem.positions.length
            ? mem.positions.join(", ")
            : "—";
    const bonus = mem.bonus || {};

    return (
        <>
            <Tabs />

            <div className="mb-4 flex items-center justify-between">
                <Link
                    href="/memorias"
                    className="text-sm rounded-lg border border-neutral-700 px-3 py-1.5 hover:border-orange-500"
                >
                    ← Voltar para memórias
                </Link>
            </div>

            <Card
                title={mem.name || "Memória"}
                subtitle={positions !== "—" ? `Posições: ${positions}` : undefined}
            >
                {/* Coluna da imagem 240px e proporção 3/4 */}
                <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
                    {/* Imagem */}
                    <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-2">
                        <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-lg">
                            <Image
                                src={imgSrc}
                                alt={mem.name || "Memória"}
                                fill
                                sizes="(max-width:768px) 70vw, 240px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="min-w-0 space-y-3">
                        {mem.name && (
                            <h2 className="text-xl font-semibold text-orange-400">{mem.name}</h2>
                        )}
                        {positions !== "—" && (
                            <div className="text-sm text-neutral-400">Posições: {positions}</div>
                        )}
                        {mem.desc && (
                            <p className="text-sm leading-relaxed text-neutral-200">{mem.desc}</p>
                        )}

                        {Object.keys(bonus).length > 0 && (
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                                {Object.entries(bonus).map(([k, v]: any) => (
                                    <div key={k} className="rounded-lg border border-neutral-800 p-2">
                                        <div className="text-[11px] uppercase tracking-wide text-neutral-400">
                                            {k}
                                        </div>
                                        <div className="text-sm font-semibold text-neutral-200">
                                            {v?.flat ?? "—"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
}
