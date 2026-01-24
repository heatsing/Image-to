/**
 * Reusable Benefits section: 4 benefits, alternating left-image-right-text layout.
 * Uses simplified diagram SVGs (简化图) instead of generic icons.
 */

export interface BenefitsSectionProps {
  title?: string
  subtitle?: string
}

const benefits = [
  {
    id: 'local',
    title: '100% Local Conversion',
    description:
      'All image conversion happens entirely on your device. Your files never leave your computer—no uploads to servers, no data collection, complete privacy and security.',
    bullets: ['No file uploads required', 'Complete data privacy', 'Works offline'],
    layout: 'image-left' as const,
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    accent: 'text-blue-600',
    /** Simplified diagram: device + local file, no cloud upload */
    Diagram: () => (
      <svg viewBox="0 0 200 140" className="w-full h-auto max-h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor/screen */}
        <rect x="40" y="20" width="120" height="75" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <rect x="50" y="32" width="45" height="35" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M50 70h45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
        {/* Base */}
        <rect x="85" y="95" width="30" height="8" rx="2" fill="#cbd5e1" />
        <rect x="75" y="103" width="50" height="6" rx="2" fill="#94a3b8" />
        {/* “Local” indicator: arrow staying inside */}
        <path d="M110 50 L150 50 L150 65 L135 65" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="135" cy="65" r="5" fill="#0ea5e9" />
        <text x="155" y="58" fontSize="10" fill="#64748b" fontFamily="system-ui">local</text>
        {/* No-cloud X */}
        <circle cx="165" cy="40" r="18" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M158 33 L172 47 M172 33 L158 47" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'fast',
    title: 'Lightning Fast Processing',
    description:
      'Convert images in seconds, not minutes. Our optimized conversion engine processes each file in about 1 second, and you can batch process hundreds of images simultaneously.',
    bullets: ['~1 second per image', 'Batch processing support', 'No waiting in queues'],
    layout: 'image-right' as const,
    gradient: 'from-green-50 to-emerald-100',
    border: 'border-green-200',
    accent: 'text-green-600',
    /** Simplified diagram: progress bar + “1s” */
    Diagram: () => (
      <svg viewBox="0 0 200 120" className="w-full h-auto max-h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Timeline / progress */}
        <rect x="20" y="45" width="160" height="20" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="20" y="45" width="160" height="20" rx="10" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
        <text x="100" y="58" fontSize="11" fill="white" fontFamily="system-ui" fontWeight="600" textAnchor="middle">done</text>
        {/* Time label */}
        <text x="100" y="90" fontSize="14" fill="#059669" fontFamily="system-ui" fontWeight="700" textAnchor="middle">&lt; 1s</text>
        {/* Three “files” before conversion */}
        <rect x="25" y="15" width="28" height="22" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
        <rect x="58" y="15" width="28" height="22" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
        <rect x="91" y="15" width="28" height="22" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
        <path d="M25 26 L50 26 M25 31 L45 31" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M58 26 L83 26 M58 31 L78 31" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M91 26 L116 26 M91 31 L111 31" stroke="#cbd5e1" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'free',
    title: '100% Free Forever',
    description:
      'No hidden fees, no subscriptions, no watermarks. Use our image converter as much as you want, whenever you need it. Completely free with no strings attached.',
    bullets: ['No signup required', 'No usage limits', 'No watermarks on output'],
    layout: 'image-left' as const,
    gradient: 'from-purple-50 to-pink-100',
    border: 'border-purple-200',
    accent: 'text-purple-600',
    /** Simplified diagram: “0” / FREE badge */
    Diagram: () => (
      <svg viewBox="0 0 200 140" className="w-full h-auto max-h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="70" r="55" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="3" />
        <text x="100" y="82" fontSize="42" fill="#7c3aed" fontFamily="system-ui" fontWeight="800" textAnchor="middle">0</text>
        <text x="100" y="110" fontSize="14" fill="#6d28d9" fontFamily="system-ui" fontWeight="600" textAnchor="middle">FREE</text>
      </svg>
    ),
  },
  {
    id: 'batch',
    title: 'Batch Processing Power',
    description:
      'Convert multiple images at once with our powerful batch processing feature. Upload hundreds of images and convert them all in one go, saving you hours of manual work.',
    bullets: ['Process hundreds of images', 'Individual file status tracking', 'Download all at once'],
    layout: 'image-right' as const,
    gradient: 'from-orange-50 to-amber-100',
    border: 'border-orange-200',
    accent: 'text-orange-600',
    /** Simplified diagram: grid of image thumbnails with checkmarks */
    Diagram: () => (
      <svg viewBox="0 0 200 140" className="w-full h-auto max-h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[
          [30, 20], [70, 20], [110, 20], [150, 20],
          [30, 55], [70, 55], [110, 55], [150, 55],
          [30, 90], [70, 90], [110, 90], [150, 90],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="32" height="26" rx="4" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
            <path d={`M${x + 6} ${y + 10} L${x + 12} ${y + 16} L${x + 26} ${y + 4}`} stroke={i < 6 ? '#ea580c' : '#cbd5e1'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </svg>
    ),
  },
]

export default function BenefitsSection({ title, subtitle }: BenefitsSectionProps) {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {title ?? 'Why Choose Our Image Converter?'}
        </h2>
        <p className="text-slate-600">{subtitle ?? 'Powerful features that make image conversion simple and secure'}</p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {benefits.map((b) => {
          const Diagram = b.Diagram
          return (
          <div
            key={b.id}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              b.layout === 'image-right' ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-shrink-0 w-full md:w-1/2">
              <div className={`card rounded-2xl p-8 md:p-12 bg-gradient-to-br ${b.gradient} ${b.border}`}>
                <div className="w-full max-w-xs mx-auto flex items-center justify-center">
                  <Diagram />
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{b.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">{b.description}</p>
              <ul className="space-y-2 text-slate-600">
                {b.bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          )
        })}
      </div>
    </section>
  )
}
