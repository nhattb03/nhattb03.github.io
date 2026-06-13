import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const CATEGORIES = ['All', 'Financial Modeling', 'Research', 'Operations']

const CATEGORY_COLORS = {
  'Financial Modeling': { bg: 'rgba(30,94,255,0.08)', color: 'var(--accent)', border: 'rgba(30,94,255,0.2)' },
  'Research': { bg: 'rgba(18,124,90,0.08)', color: 'var(--success)', border: 'rgba(18,124,90,0.2)' },
  'Operations': { bg: 'rgba(91,100,114,0.08)', color: 'var(--muted)', border: 'rgba(91,100,114,0.2)' },
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
      className="rounded-card border flex flex-col group transition-all duration-200 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--line)',
      }}
      onMouseEnter={e => {
        if (!prefersReduced) {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,94,255,0.08)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--line)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Project image — shown if image field exists and loads successfully */}
      {project.image && !imgError && (
        <div
          className="w-full overflow-hidden"
          style={{ aspectRatio: '16/9', backgroundColor: 'var(--line)' }}
        >
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      )}

      {/* Card content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Category tag */}
        <div className="flex items-start justify-between gap-3">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded"
            style={{
              backgroundColor: catColor.bg,
              color: catColor.color,
              border: `1px solid ${catColor.border}`,
            }}
          >
            {t.projects.categories[project.category] || project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          id={`project-title-${project.id}`}
          className="font-inter font-semibold text-base leading-snug"
          style={{ color: 'var(--ink)' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="font-inter text-sm flex-1"
          style={{ color: 'var(--muted)', lineHeight: 1.7 }}
        >
          {project.description}
        </p>

        {/* Key result */}
        <div
          className="rounded p-3 border-l-2"
          style={{
            backgroundColor: 'var(--accent-10)',
            borderLeftColor: 'var(--accent)',
          }}
        >
          <p
            className="font-inter text-xs"
            style={{ color: 'var(--ink)', lineHeight: 1.6 }}
          >
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>{t.projects.resultLabel}</span>
            {project.result}
          </p>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tools used">
          {project.tools.map(tool => (
            <span
              key={tool}
              role="listitem"
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: 'var(--bg)',
                color: 'var(--muted)',
                border: '1px solid var(--line)',
              }}
            >
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

  const filtered = activeCategory === 'All'
    ? data.projects
    : data.projects.filter(p => p.category === activeCategory)

  const sectionProps = prefersReduced
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-80px' },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        },
      }

  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          {/* Section label */}
          <motion.p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
            {...itemProps}
          >
            {t.projects.sectionLabel}
          </motion.p>

          <motion.h2
            id="projects-heading"
            className="font-fraunces font-semibold mb-8"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--ink)' }}
            {...itemProps}
          >
            {t.projects.heading}
          </motion.h2>

          {/* Filter chips */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            role="group"
            aria-label="Filter projects by category"
            {...itemProps}
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className="font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--surface)',
                  color: activeCategory === cat ? '#fff' : 'var(--muted)',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--line)',
                  cursor: 'pointer',
                }}
              >
                {t.projects.categories[cat] || cat}
              </button>
            ))}
          </motion.div>

          {/* Cards grid */}
          <motion.div
            layout={!prefersReduced}
            className="grid sm:grid-cols-2 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  prefersReduced={prefersReduced}
                  t={t}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Caption */}
          <motion.p
            className="font-mono text-xs mt-8 text-center"
            style={{ color: 'var(--muted)', opacity: 0.6 }}
            {...itemProps}
          >
            {t.projects.imageReplaceText}
            <code style={{ fontFamily: 'inherit' }}>public/projects/</code>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
