import { Linkedin } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg)' }}
      role="contentinfo"
    >
      <div className="max-w-content mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="font-inter text-sm"
          style={{ color: 'var(--muted)' }}
        >
          {t.footer.copyright}
        </p>

        <a
          href="https://linkedin.com/in/nhattb03"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <Linkedin size={16} />
          <span>linkedin.com/in/nhattb03</span>
        </a>
      </div>
    </footer>
  )
}
