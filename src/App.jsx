import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Light-first — default is light mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('nha-dark-mode')
    if (saved !== null) return saved === 'true'
    // Respect system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('nha-dark-mode', String(darkMode))
  }, [darkMode])

  const handleToggleDark = () => setDarkMode(prev => !prev)

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 px-4 py-2 rounded-btn text-sm font-medium"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        Skip to main content
      </a>

      <Navbar darkMode={darkMode} onToggleDark={handleToggleDark} />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
