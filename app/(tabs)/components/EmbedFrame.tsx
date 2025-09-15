// app/(tabs)/components/EmbedFrame.tsx
"use client";

import { useState } from "react";

type Props = {
    src: string;
    title: string;
    className?: string;
    /** Tailwind classes para altura; por padrão fica responsivo ao viewport */
    heightClassName?: string;
};

export default function EmbedFrame({
    src,
    title,
    className,
    heightClassName = "h-[min(1200px,calc(100vh-260px))] min-h-[560px]",
}: Props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`rounded-xl border border-neutral-700 bg-neutral-900 ${className ?? ""}`}>
            {/* header */}
            <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-2">
                <div className="text-sm font-semibold text-neutral-200">{title}</div>
                <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:border-orange-500"
                >
                    ↗ Abrir em nova aba
                </a>
            </div>

            {/* frame + skeleton */}
            <div className="relative">
                {!loaded && (
                    <div className={`${heightClassName} grid place-items-center text-neutral-400`}>
                        Carregando…
                    </div>
                )}

                <iframe
                    src={src}
                    title={title}
                    className={`w-full border-0 ${heightClassName} ${loaded ? "" : "opacity-0"}`}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    allowFullScreen
                    allow="clipboard-write; fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}
