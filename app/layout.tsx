import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haikyuu Fly High — Guia PT-BR",
  description:
    "Guia em português • atualizações, personagens, builds, diamantes & mais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-[#262626] bg-[#0f0f0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f0f]/80">
          <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8 py-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg">
              <span className="font-black text-neutral-900">HF</span>
            </div>

            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-100">
                Haikyuu Fly High — Global
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300">
                Guia em português • atualizações, personagens, builds, diamantes & mais
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-orange-500 transition"
                href="#"
              >
                Discord
              </a>
              <a
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-orange-500 transition"
                href="#"
              >
                Twitter/X
              </a>
            </div>
          </div>
        </header>

        {/* Main (conteúdo) */}
        <main className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8 pb-10">
          <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-neutral-400">
              © {new Date().getFullYear()} Haikyuu Fly High — Guia PT-BR. Não-oficial. Fan
              project.
            </p>
            <div className="text-xs text-neutral-400">
              Tema: preto & laranja · Karasuno 🦅
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
