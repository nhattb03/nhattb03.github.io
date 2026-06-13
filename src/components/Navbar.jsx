import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navbar({ darkMode, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  const NAV_LINKS = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b'
          : 'border-b border-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? `color-mix(in srgb, var(--bg) 88%, transparent)` : 'transparent',
        borderColor: scrolled ? 'var(--line)' : 'transparent',
      }}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          className="font-fraunces font-semibold text-lg tracking-tight focus-visible:outline-none focus-visible:ring-2"
          style={{ color: 'var(--ink)', textDecoration: 'none' }}
          aria-label="Nha Tran — home"
        >
          Nha Tran
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-inter text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.target.style.color = 'var(--muted)')}
            >
              {label}
            </a>
          ))}

          <div className="flex items-center gap-2 border-l pl-8" style={{ borderColor: 'var(--line)' }}>
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label={lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors duration-200 font-mono text-xs font-medium uppercase"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              <Globe size={14} />
              <span>{lang}</span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDark}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Language toggle mobile */}
          <button
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md font-mono text-xs font-medium uppercase"
            style={{ color: 'var(--muted)' }}
          >
            <Globe size={14} />
            <span>{lang}</span>
          </button>
          
          <button
            onClick={onToggleDark}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 flex items-center justify-center rounded-md"
            style={{ color: 'var(--muted)' }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="w-8 h-8 flex items-center justify-center rounded-md"
            style={{ color: 'var(--ink)' }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--line)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleNavClick}
              className="font-inter text-sm font-medium py-1"
              style={{ color: 'var(--ink)' }}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
