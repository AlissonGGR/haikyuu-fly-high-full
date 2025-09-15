// app/(tabs)/equipes/page.tsx
"use client";

import * as React from "react";
import Tabs from "../components/Tabs";
import Card from "../components/Card";
import FloatingGonFab from "@app/(tabs)/components/FloatingGonFab";

/* =========================================================================
   Configs utilitárias
   ========================================================================= */
const GON_URL = "https://gondif.github.io/haikyu-team-builder-PTBR/";
const AVATAR_SRC = "/gon.png";

/* =========================================================================
   Modal (aviso do Gon) — mantém como você curtiu
   ========================================================================= */
function GonNoticeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      {/* modal */}
      <div className="relative z-10 w-[min(92vw,560px)] rounded-2xl border border-amber-500/40 bg-neutral-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 rounded-md p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          ✕
        </button>

        <div className="mx-auto flex flex-col items-center text-center">
          <div className="mb-3 rounded-full border-4 border-amber-500/70 p-1 shadow">
            <img
              src={AVATAR_SRC}
              alt="Gon"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-amber-300">Atenção</h3>
          <p className="mt-2 text-sm text-neutral-300">
            Todas as composições mostradas aqui foram criadas no site de Builds
            do Gon! Dá uma atenção lá!
          </p>
          <div className="mt-1 text-sm font-semibold text-neutral-200">
            Gon
          </div>

          <a
            href={GON_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-500/60 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-500/20"
          >
            <span>🧭</span> Abrir Team Builder do Gon
          </a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   Blocos reutilizáveis da página
   ========================================================================= */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800 px-2 py-[2px] text-xs text-neutral-300">
      {children}
    </span>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-2 text-base font-semibold text-neutral-200">
      {children}
    </h3>
  );
}

function Box({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "bad" | "warn";
  className?: string;
}) {
  const map =
    tone === "good"
      ? "border-emerald-600/40 bg-emerald-900/20"
      : tone === "bad"
        ? "border-rose-600/40 bg-rose-900/20"
        : tone === "warn"
          ? "border-amber-500/40 bg-amber-900/20"
          : "border-neutral-700 bg-neutral-900/40";
  return (
    <div
      className={`rounded-lg border p-3 text-sm text-neutral-200 ${map} ${className}`}
    >
      {children}
    </div>
  );
}

/** área única central para a imagem da composição */
function SingleCompImage({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  return (
    <div className="mx-auto my-3 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
          <span>Imagem da composição (adicione depois)</span>
        </div>
      )}
    </div>
  );
}

/** uma “meta” (Iniciante/Intermediário/Avançado) com bullets, imagem central, PF/PF e sinergias ao final */
function MetaSection({
  title,
  bullets,
  image,
  strengths,
  weaknesses,
  synergies,
}: {
  title: string;
  bullets: string[];
  image?: { src?: string; alt: string };
  strengths: string;
  weaknesses: string;
  synergies?: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 p-4">
      <h4 className="mb-2 text-sm font-semibold text-amber-300">{title}</h4>

      <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-neutral-300">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <SingleCompImage src={image?.src} alt={image?.alt ?? title} />

      <div className="mt-2 grid gap-3 md:grid-cols-2">
        <Box tone="good">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
            PONTOS FORTES
          </div>
          <div>{strengths}</div>
        </Box>
        <Box tone="bad">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-rose-300">
            PONTOS FRACOS
          </div>
          <div>{weaknesses}</div>
        </Box>
      </div>

      {/* sinergias — amarelo (na região que você marcou) */}
      <Box tone="warn" className="mt-3">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-amber-300">
          SINERGIAS
        </div>
        <div className="text-neutral-200">
          {synergies ?? "Adicione aqui as sinergias principais dessa composição."}
        </div>
      </Box>
    </div>
  );
}

/** grupo de metas (atuais / futuras) */
function MetaGroup({
  title,
  items,
}: {
  title: string;
  items: Array<React.ReactNode>;
}) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-lg font-semibold text-neutral-100">
        {title}
      </h3>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((node, i) => (
          <div key={i}>{node}</div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Página
   ========================================================================= */
export default function Page() {
  const [showGon, setShowGon] = React.useState(true);

  return (
    <>
      <Tabs />

      <Card title="Composições do Gon" subtitle="Todas as composições são criadas no site de Builds do Gon. Dá uma atenção lá!">
        {/* topo: Indicações do OLDMAN */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <SectionTitle>Indicações de composições do <span className="text-amber-300">OLDMAN</span></SectionTitle>
            </div>
            <p className="max-w-2xl text-sm text-neutral-300">
              Espaço reservado para recomendações e destaques do OLDMAN
              (YT). Quando você tiver o conteúdo, é só trocar este parágrafo.
            </p>
          </div>
        </div>

        {/* Metas — Atuais */}
        <MetaGroup
          title="Composições — Metas (Atuais)"
          items={[
            <MetaSection
              key="atual-ini"
              title="Meta Iniciante"
              bullets={[
                "Foco em sinergias simples e fácil execução.",
                "Baixa exigência de memórias/potenciais.",
                "Rota de evolução clara para estágios mais altos.",
              ]}
              image={{ alt: "Meta Iniciante (imagem da composição)" }}
              strengths="Rotação estável e defesas seguras."
              weaknesses="Pressão ofensiva limitada contra times avançados."
              synergies="Ex.: Setter com suporte de Receivers; Quick + bloqueio duplo situacional."
            />,
            <MetaSection
              key="atual-int"
              title="Meta Intermediário"
              bullets={[
                "Combina buffs/debuffs e passes eficientes.",
                "Requer memórias mais específicas.",
                "Ótimo para eventos e ranqueado médio.",
              ]}
              image={{ alt: "Meta Intermediário (imagem da composição)" }}
              strengths="Bom equilíbrio entre ataque e bloqueio."
              weaknesses="Dependência maior de execução perfeita."
              synergies="Ex.: Core de bloqueio reativo com buffs de passe; hard-hit gatilhado por recepção PERFECT."
            />,
            <MetaSection
              key="atual-adv"
              title="Meta Avançado / Competitivo"
              bullets={[
                "Sinergias complexas e rotações otimizadas.",
                "Memórias UR/SP e potenciais no limite.",
                "Alta pressão ofensiva e controle de rede.",
              ]}
              image={{ alt: "Meta Avançado (imagem da composição)" }}
              strengths="Pressão constante, punição de erros e controle de ritmo."
              weaknesses="Custo alto e curva de aprendizado maior."
              synergies="Ex.: Stacks de moral + crítico no ataque potente; cadeia de quicks para travar a rotação inimiga."
            />,
          ]}
        />

        {/* Metas — Futuras */}
        <MetaGroup
          title="Composições — Metas (Futuras)"
          items={[
            <MetaSection
              key="fut-ini"
              title="Meta Iniciante (Futuro)"
              bullets={[
                "Pensada para novos personagens que virão.",
                "Rota segura para quem está começando do zero.",
              ]}
              image={{ alt: "Futuro Iniciante (imagem da composição)" }}
              strengths="Base sólida para aprendizado."
              weaknesses="Menor impacto imediato."
              synergies="Ex.: set focado em recuperar stamina + quick simples."
            />,
            <MetaSection
              key="fut-int"
              title="Meta Intermediário (Futuro)"
              bullets={[
                "Aproveita novas memórias e passivas de suporte.",
                "Ideal para jogar eventos de mid-game.",
              ]}
              image={{ alt: "Futuro Intermediário (imagem da composição)" }}
              strengths="Boa flexibilidade e ajustes in-game."
              weaknesses="Exige leitura de jogo mais ativa."
              synergies="Ex.: recepção buffada que converte em hard-hit/quick reforçado."
            />,
          ]}
        />
      </Card>

      {/* aviso inicial do Gon */}
      <GonNoticeModal open={showGon} onClose={() => setShowGon(false)} />

      {/* bolinha flutuante com link do Gon */}
      <FloatingGonFab href={GON_URL} />
    </>
  );
}
