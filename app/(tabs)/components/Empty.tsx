export default function Empty({ hint }: { hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-700 p-6 text-center">
      <p className="text-sm text-neutral-300">{hint || 'Conteúdo em breve. Envie textos/links para publicar aqui.'}</p>
    </div>
  )
}
