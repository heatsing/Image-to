interface CardSectionItem {
  title: string
  body: string
}

interface CardSectionProps {
  title: string
  description?: string
  items: CardSectionItem[]
}

export default function CardSection({ title, description, items }: CardSectionProps) {
  return (
    <section className="mt-12 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
            {description ? <p className="text-slate-600 mt-2">{description}</p> : null}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
