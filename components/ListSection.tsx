interface ListSectionProps {
  title: string
  description?: string
  items: string[]
  ordered?: boolean
}

export default function ListSection({ title, description, items, ordered = false }: ListSectionProps) {
  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <section className="mt-12 mb-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {description ? <p className="text-slate-600 mt-2 mb-6">{description}</p> : <div className="mb-6" />}

        <ListTag className="space-y-4">
          {items.map((item, index) => (
            <li key={`${index}-${item.slice(0, 16)}`} className="flex items-start gap-3 text-slate-700 leading-relaxed">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {ordered ? index + 1 : '•'}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ListTag>
      </div>
    </section>
  )
}
