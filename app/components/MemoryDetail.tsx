import Link from "next/link";
import Image from "next/image";

export type MemoryDetailProps = {
    /** Título exibido no topo */
    titulo: string;
    /** UR | SSR | SR | SP */
    raridade: "UR" | "SSR" | "SR" | "SP";
    /** S | MB | WS | OP | L */
    posicao: "S" | "MB" | "WS" | "OP" | "L";
    /** Caminho da imagem (de preferência em /public) */
    image: string;
    /** Texto do efeito/descrição principal */
    efeitoResumo: string;
    /** Stats flat por parâmetro (opcional) */
    stats?: Partial<{
        Serve: number;
        Spike: number;
        Set: number;
        Receive: number;
        Block: number;
        Save: number;
    }>;
    /** Link do botão “voltar” (ex.: /memorias) */
    backHref?: string;
};

export default function MemoryDetail({
    titulo,
    raridade,
    posicao,
    image,
    efeitoResumo,
    stats,
    backHref = "/memorias",
}: MemoryDetailProps) {
    return (
        <div className="space-y-4">
            {/* topo + voltar */}
            <div className="flex items-center justify-between">
                <Link
                    href={backHref}
                    className="text-sm rounded-lg border border-neutral-700 px-3 py-1.5 hover:border-orange-500"
                >
                    ← Voltar
                </Link>
            </div>

            {/* card principal */}
            <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-4 md:p-6">
                {/* header */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-extrabold text-neutral-100">{titulo}</h1>
                    <span className="rounded-full bg-neutral-700 px-2 py-[2px] text-[11px] font-bold text-neutral-200">
                        {posicao}
                    </span>
                    <span className="rounded-full bg-cyan-400 px-2 py-[2px] text-[11px] font-bold text-neutral-900">
                        {raridade}
                    </span>
                </div>

                {/* layout imagem + infos */}
                <div className="grid gap-6 md:grid-cols-[240px_1fr]">
                    {/* imagem (compacta, sem ficar imensa) */}
                    <div className="mx-auto md:mx-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px]">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-neutral-700">
                            <Image
                                src={image.startsWith("/") ? image : `/${image}`}
                                alt={titulo}
                                fill
                                sizes="(max-width:768px) 180px, 240px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* infos */}
                    <div className="space-y-4">
                        <section className="rounded-xl border border-neutral-700 p-4">
                            <h3 className="mb-2 font-semibold text-neutral-200">Efeito</h3>
                            <p className="text-sm leading-relaxed text-neutral-300">{efeitoResumo}</p>
                        </section>

                        <section className="rounded-xl border border-neutral-700 p-4">
                            <h3 className="mb-2 font-semibold text-neutral-200">Parâmetros (flat)</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                                <Stat label="Serve" value={stats?.Serve} />
                                <Stat label="Spike" value={stats?.Spike} />
                                <Stat label="Set" value={stats?.Set} />
                                <Stat label="Receive" value={stats?.Receive} />
                                <Stat label="Block" value={stats?.Block} />
                                <Stat label="Save" value={stats?.Save} />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value?: number }) {
    return (
        <div className="rounded-lg border border-neutral-800 p-2">
            <div className="text-[11px] uppercase tracking-wide text-neutral-400">{label}</div>
            <div className="text-sm font-semibold text-neutral-200">{value ?? "—"}</div>
        </div>
    );
}
