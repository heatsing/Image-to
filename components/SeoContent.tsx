type SeoContentProps = {
  title: string
  content: string[]
}

export default function SeoContent({ title, content }: SeoContentProps) {
  return (
    <section className="mt-12 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
            {title}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
