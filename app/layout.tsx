/**
 * Root layout - minimal wrapper
 * Actual layout with locale is in app/[locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}