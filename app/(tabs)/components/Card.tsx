import { ReactNode } from 'react'

export default function Card({ title, subtitle, right, children }: {
  title: string
  subtitle?: string
  right?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="bg-[#0f0f0f] border border-[#262626] rounded-3xl p-5 sm:p-6 md:p-7 shadow-xl">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-neutral-100">{title}</h2>
          {subtitle && <p className="text-sm text-neutral-300 mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </section>
  )
}
