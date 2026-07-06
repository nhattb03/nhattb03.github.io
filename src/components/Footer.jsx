import { Linkedin, Mail, ArrowUp } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const iconBtn = {
    color: 'var(--muted)',
    border: '1px solid var(--line-strong)',
  }
  const onEnter = e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }
  const onLeave = e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line-strong)' }

  return (
    <footer className="border-t" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg-tint)' }} role="contentinfo">
      <div className="max-w-content mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <a href="#hero" className="font-fraunces font-semibold text-lg" style={{ color: 'var(--ink)' }}>
              Nha <span className="display-italic" style={{ color: 'var(--accent)' }}>Tran</span>
            </a>
            <p className="font-inter text-sm mt-1" style={{ color: 'var(--muted)' }}>{t.footer.copyright}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:bichnha07122003@gmail.com" aria-label="Email"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              style={iconBtn} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <Mail size={16} />
            </a>
            <a href="https://linkedin.com/in/nhattb03" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              style={iconBtn} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <Linkedin size={16} />
            </a>
            <a href="#hero" aria-label="Back to top"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              style={iconBtn} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
