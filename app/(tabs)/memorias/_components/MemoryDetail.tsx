import Link from "next/link";
import Image from "next/image";

export type Raridade = "UR" | "SSR" | "SR" | "SP";
export type Posicao = "S" | "MB" | "WS" | "OP" | "L";

export type MemoryDetailProps = {
    titulo: string;
    raridade: Raridade;
    posicao: Posicao;
    image?: string;        // ex.: "/memorias/aone-defensiva.jpg" (dentro de /public)
    imageFull?: string;    // opcional, uma arte grande
    efeitoResumo?: string; // parágrafo curto
    efeitos?: string[];    // lista de bullets
    escola?: string;
    postJP?: string;
    atualizadoEm?: string;
    stats?: Partial<Record<"Serve" | "Spike" | "Set" | "Receive" | "Block" | "Save", number>>;
    backHref?: string;     // default: /memorias
};

function normalizeImage(src?: string) {
    if (!src) return undefined;
    if (src.startsWith("http")) return src;
    return src.replace(/^\/?public\/?/, "/");
}

export default function MemoryDetail({
    titulo,
    raridade,
    posicao,
    image,
    imageFull,
    efeitoResumo,
    efeitos = [],
    escola,
    postJP,
    atualizadoEm,
    stats,
    backHref = "/memorias",
}: MemoryDetailProps) {
    const img = normalizeImage(imageFull || image);

    return (
        <>
            <div className="mb-4">
                <Link
                    href={backHref}
                    className="text-sm rounded-lg border border-neutral-700 px-3 py-1.5 hover:border-orange-500"
                >
                    ← Voltar para memórias
                </Link>
            </div>

            <section className="rounded-2xl border border-neutral-700 p-4 sm:p-5">
                <header className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-100">{titulo}</h1>
                    <p className="text-sm text-neutral-400">{raridade} • {posicao}</p>
                </header>

                {/* Header com imagem + infos rápidas */}
                <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                    {/* Imagem */}
                    <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-2">
                        <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-lg">
                            {img ? (
                                <Image
                                    src={img}
                                    alt={titulo}
                                    fill
                                    quality={90}
                                    sizes="(max-width:768px) 100vw, 260px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-neutral-900" />
                            )}
                        </div>
                    </div>

                    {/* Infos básicas + stats */}
                    <div className="grid gap-4">
                        <div className="rounded-xl border border-neutral-700 p-4">
                            <h3 className="mb-2 font-semibold text-neutral-200">Informações Básicas</h3>
                            <ul className="space-y-1 text-sm text-neutral-300">
                                <li><span className="text-neutral-400">Raridade:</span> {raridade}</li>
                                <li><span className="text-neutral-400">Posição:</span> {posicao}</li>
                                {escola && <li><span className="text-neutral-400">Escola:</span> {escola}</li>}
                                {postJP && <li><span className="text-neutral-400">Post (JP):</span> {postJP}</li>}
                                {atualizadoEm && <li><span className="text-neutral-400">Atualizado em:</span> {atualizadoEm}</li>}
                            </ul>
                            {efeitoResumo && (
                                <p className="mt-3 text-neutral-300">{efeitoResumo}</p>
                            )}
                        </div>

                        {stats && Object.keys(stats).length > 0 && (
                            <div className="rounded-xl border border-neutral-700 p-4">
                                <h3 className="mb-2 font-semibold text-neutral-200">Parâmetros (nível máx.)</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                                    {Object.entries(stats).map(([k, v]) => (
                                        <div key={k} className="rounded-lg border border-neutral-800 p-2">
                                            <div className="text-[11px] uppercase tracking-wide text-neutral-400">{k}</div>
                                            <div className="text-sm font-semibold text-neutral-200">{v ?? "—"}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Efeitos em lista */}
                {efeitos.length > 0 && (
                    <section className="mt-6 rounded-xl border border-neutral-700 p-4">
                        <h3 className="mb-3 font-semibold text-neutral-200">Efeitos</h3>
                        <ul className="space-y-2 list-disc list-inside text-neutral-300">
                            {efeitos.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </section>
                )}
            </section>
        </>
    );
}
