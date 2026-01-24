import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-black mt-auto py-8 flex-shrink-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-white text-center md:text-left">
            <p>© {currentYear} Image Converter. All rights reserved.</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <Link
              href="/about"
              className="text-white hover:text-slate-300 transition-colors"
            >
              About us
            </Link>
            <Link
              href="/security"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Security
            </Link>
            <Link
              href="/terms"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Terms of use
            </Link>
            <Link
              href="/privacy"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-slate-300 transition-colors"
            >
              Contact us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
