'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/eventos', label: 'Eventos' },
  { href: '/equipes', label: 'Equipes' },
  { href: '/personagens', label: 'Personagens' },
  { href: '/potenciais', label: 'Potenciais' },
  { href: '/memorias', label: 'Memórias' },
  { href: '/guia-diamantes', label: 'Guia: Diamantes' },
  { href: '/planilha-diamantes', label: 'Planilha de Diamantes' },
]

export default function Tabs() {
  const pathname = usePathname()
  return (
    <nav className="mx-auto max-w-7xl px-2 sm:px-4">
      <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-2 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {tabs.map(t => {
          const active = pathname === t.href
          return (
            <Link key={t.href} href={t.href}
              className={`w-full text-center rounded-xl px-3 py-2 text-sm font-semibold transition outline-none focus:ring-2 focus:ring-orange-500/60 ${active ? 'bg-orange-600 text-neutral-900 shadow' : 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-200'}`}
            >
              {t.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
