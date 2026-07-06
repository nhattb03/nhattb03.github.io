import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navbar({ darkMode, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  const NAV_LINKS = [
    { label: t.nav.about, href: '#about', n: '01' },
    { label: t.nav.experience, href: '#experience', n: '02' },
    { label: t.nav.projects, href: '#projects', n: '03' },
    { label: t.nav.skills, href: '#skills', n: '04' },
    { label: t.nav.contact, href: '#contact', n: '05' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md border-b' : 'border-b border-transparent'}`}
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
        borderColor: scrolled ? 'var(--line)' : 'transparent',
      }}>
      <div className="max-w-content mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#hero" className="font-fraunces font-semibold text-xl tracking-tight" style={{ color: 'var(--ink)', textDecoration: 'none' }} aria-label="Nha Tran — home">
          Nha <span className="display-italic" style={{ color: 'var(--accent)' }}>Tran</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="font-inter text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {label}
            </a>
          ))}
          <div className="flex items-center gap-1.5 border-l pl-6 ml-1" style={{ borderColor: 'var(--line-strong)' }}>
            <button onClick={toggleLang} aria-label={lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors duration-200 font-mono text-xs font-medium uppercase"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              <Globe size={14} /><span>{lang}</span>
            </button>
            <button onClick={onToggleDark} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-1">
          <button onClick={toggleLang} aria-label={lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full font-mono text-xs font-medium uppercase" style={{ color: 'var(--muted)' }}>
            <Globe size={14} /><span>{lang}</span>
          </button>
          <button onClick={onToggleDark} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center rounded-full" style={{ color: 'var(--muted)' }}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
            className="w-9 h-9 flex items-center justify-center rounded-full" style={{ color: 'var(--ink)' }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="md:hidden border-t px-6 py-5 flex flex-col"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--line)' }}>
          {NAV_LINKS.map(({ label, href, n }) => (
            <a key={href} href={href} onClick={handleNavClick}
              className="flex items-baseline gap-3 py-3 border-b font-inter text-base font-medium"
              style={{ color: 'var(--ink)', borderColor: 'var(--line)' }}>
              <span className="font-mono text-xs" style={{ color: 'var(--gold)' }}>{n}</span>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
