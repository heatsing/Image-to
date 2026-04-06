interface ComparisonRow {
  topic: string
  source: string
  target: string
  recommendation: string
}

interface ComparisonSectionProps {
  title: string
  sourceLabel: string
  targetLabel: string
  rows: ComparisonRow[]
}

export default function ComparisonSection({
  title,
  sourceLabel,
  targetLabel,
  rows,
}: ComparisonSectionProps) {
  return (
    <section className="mt-12 mb-8">
      <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Decision Point</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">{sourceLabel}</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">{targetLabel}</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.topic} className="align-top">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-900">{row.topic}</th>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.source}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.target}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
