import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'
import SectionHead from './SectionHead'

const CATEGORIES = ['All', 'Financial Modeling', 'Research', 'Operations']

const CATEGORY_COLORS = {
  'Financial Modeling': { color: 'var(--accent)', bg: 'var(--accent-10)', border: 'var(--accent-20)' },
  'Research': { color: 'var(--success)', bg: 'rgba(45,106,79,0.08)', border: 'rgba(45,106,79,0.20)' },
  'Operations': { color: 'var(--gold)', bg: 'var(--gold-10)', border: 'var(--gold-20)' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ project, prefersReduced, t }) {
  const catColor = CATEGORY_COLORS[project.category] || {}
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      layout={!prefersReduced}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReduced ? false : { opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card flex flex-col group overflow-hidden"
      onMouseEnter={e => {
        if (!prefersReduced) {
          e.currentTarget.style.borderColor = 'var(--gold)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--line)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {project.image && !imgError && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: 'var(--surface-2)' }}>
          <img src={project.image} alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={() => setImgError(true)} loading="lazy" />
          <span className="absolute top-3 left-3 font-mono text-xs px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: catColor.bg, color: catColor.color, border: `1px solid ${catColor.border}` }}>
            {t.projects.categories[project.category] || project.category}
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        {(!project.image || imgError) && (
          <span className="font-mono text-xs px-2.5 py-1 rounded-full self-start"
            style={{ backgroundColor: catColor.bg, color: catColor.color, border: `1px solid ${catColor.border}` }}>
            {t.projects.categories[project.category] || project.category}
          </span>
        )}

        <h3 id={`project-title-${project.id}`} className="font-fraunces font-semibold leading-snug flex items-start gap-2" style={{ color: 'var(--ink)', fontSize: '1.2rem' }}>
          <span className="flex-1">{project.title}</span>
          <ArrowUpRight size={18} className="mt-1 shrink-0 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ color: 'var(--gold)' }} aria-hidden="true" />
        </h3>

        <p className="font-inter text-sm flex-1" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{project.description}</p>

        <div className="rounded-lg p-3.5" style={{ backgroundColor: 'var(--surface-2)', borderLeft: '2px solid var(--gold)' }}>
          <p className="font-inter text-xs" style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
            <span className="font-semibold" style={{ color: 'var(--gold)' }}>{t.projects.resultLabel}</span>
            {project.result}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tools used">
          {project.tools.map(tool => (
            <span key={tool} role="listitem" className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--line)' }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const prefersReduced = useReducedMotion()
  const { t, data } = useLanguage()

  const filtered = activeCategory === 'All' ? data.projects : data.projects.filter(p => p.category === activeCategory)

  const sectionProps = prefersReduced ? {} : {
    initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' },
    variants: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
  }
  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          <SectionHead index="03" eyebrow={t.projects.sectionLabel} heading={t.projects.heading} />
          <motion.div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by category" {...itemProps}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat}
                className="font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? 'var(--ink)' : 'transparent',
                  color: activeCategory === cat ? 'var(--bg)' : 'var(--muted)',
                  borderColor: activeCategory === cat ? 'var(--ink)' : 'var(--line-strong)',
                  cursor: 'pointer',
                }}>
                {t.projects.categories[cat] || cat}
              </button>
            ))}
          </motion.div>
          <motion.div layout={!prefersReduced} className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} prefersReduced={prefersReduced} t={t} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
