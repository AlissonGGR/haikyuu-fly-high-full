"use client";

import * as React from "react";

export default function FloatingGonFab({
    href,
    avatarSrc = "/gon.png",
}: {
    href: string;
    avatarSrc?: string;
}) {
    const [hover, setHover] = React.useState(false);

    return (
        <>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Team Builder do Gon"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500/70 bg-neutral-900 shadow-xl ring-0 transition hover:scale-105 hover:ring-2 hover:ring-amber-400/60"
            >
                <img
                    src={avatarSrc}
                    alt="Gon"
                    className="h-12 w-12 rounded-full object-cover"
                />
            </a>

            {/* tooltip */}
            <div
                className={`pointer-events-none fixed bottom-[84px] right-6 z-40 origin-bottom-right rounded-lg border border-amber-500/40 bg-neutral-900 px-3 py-1.5 text-sm text-amber-300 shadow-xl transition ${hover ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                Abrir site do Gon
            </div>
        </>
    );
}
