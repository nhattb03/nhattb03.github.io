import { createContext, useContext, useState, useEffect } from 'react'
import translations from '../data/i18n.json'
import projectsDataEn from '../data/projects.json'
import projectsDataVi from '../data/projects_vi.json'
import skillsDataEn from '../data/skills.json'
import skillsDataVi from '../data/skills_vi.json'
import experienceDataEn from '../data/experience.json'
import experienceDataVi from '../data/experience_vi.json'
import glanceDataEn from '../data/glance.json'
import glanceDataVi from '../data/glance_vi.json'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem('nha-lang')
    return saved === 'vi' ? 'vi' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('nha-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]

  const data = {
    projects: lang === 'vi' ? projectsDataVi : projectsDataEn,
    skills: lang === 'vi' ? skillsDataVi : skillsDataEn,
    experience: lang === 'vi' ? experienceDataVi : experienceDataEn,
    glance: lang === 'vi' ? glanceDataVi : glanceDataEn,
  }

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'vi' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, data }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
