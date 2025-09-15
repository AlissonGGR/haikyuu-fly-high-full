import Link from "next/link";
import Image from "next/image";

import Tabs from "../components/Tabs";
import Card from "../components/Card";

import { memoryCatalog, type MemoryCatalogItem } from "@/data/memorias-catalog";
import { raridadeDe, toSlug as baseToSlug } from "@helpers/personagens-helpers";

/* -------------------------------- utils -------------------------------- */

function canonicalSlugOf(m: MemoryCatalogItem) {
  // slug estável derivado do id (ou do name, se precisar)
  return baseToSlug(m.id) || baseToSlug(m.name);
}

// Extrai sempre o nome do arquivo e força o caminho /memorias/...
function memoryImgPath(m: MemoryCatalogItem) {
  const baseName =
    (m.img ?? "").split("/").pop() || `${canonicalSlugOf(m)}.png`;
  return `/memorias/${baseName.replace(/^\/?/, "")}`;
}

/* --------------------------- paginação (10/pg) -------------------------- */

export const dynamic = "force-dynamic";
const PAGE_SIZE = 10;

function Pager({ page, total }: { page: number; total: number }) {
  const last = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pages = Array.from({ length: last }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Link
        href={`/memorias?page=${Math.max(1, page - 1)}`}
        prefetch={false}
        aria-disabled={page <= 1}
        className={`px-3 py-1.5 rounded-lg border border-neutral-700 text-sm transition ${page <= 1 ? "opacity-40 pointer-events-none" : "hover:border-orange-500"
          }`}
      >
        ‹
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`/memorias?page=${p}`}
          prefetch={false}
          aria-current={p === page ? "page" : undefined}
          className={`px-3 py-1.5 rounded-lg border border-neutral-700 text-sm transition ${p === page ? "bg-orange-600 text-neutral-900" : "hover:border-orange-500"
            }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`/memorias?page=${Math.min(last, page + 1)}`}
        prefetch={false}
        aria-disabled={page >= last}
        className={`px-3 py-1.5 rounded-lg border border-neutral-700 text-sm transition ${page >= last ? "opacity-40 pointer-events-none" : "hover:border-orange-500"
          }`}
      >
        ›
      </Link>
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const total = memoryCatalog.length;
  const last = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageNum = Number(searchParams?.page ?? 1);
  const page = Number.isFinite(pageNum) ? Math.min(Math.max(1, pageNum), last) : 1;

  const start = (page - 1) * PAGE_SIZE;
  const items = memoryCatalog.slice(start, start + PAGE_SIZE) as MemoryCatalogItem[];

  return (
    <>
      <Tabs />
      <Card title="Memórias" subtitle="Lista paginada (10 por página)">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((m) => {
            const img = memoryImgPath(m);
            const slug = canonicalSlugOf(m);
            const rar = raridadeDe(m.name);
            const pos = (m.positions ?? []).join(", ") || "—";

            return (
              <Link
                key={slug}
                href={`/memorias/${slug}`}
                className="block bg-neutral-800 rounded-xl border border-neutral-700 hover:border-orange-500 transition overflow-hidden"
              >
                {/* Imagem */}
                <div className="relative w-full h-40">
                  <Image
                    src={img}
                    alt={m.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <h3 className="font-bold text-orange-400">{m.name}</h3>
                  <p className="text-xs text-neutral-400">
                    {(rar && rar !== "DESCONHECIDA" ? rar : "UR")} — {pos}
                  </p>
                  {m.desc && (
                    <p className="text-sm text-neutral-200 mt-1 line-clamp-2">
                      {m.desc}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <Pager page={page} total={total} />
      </Card>
    </>
  );
}
