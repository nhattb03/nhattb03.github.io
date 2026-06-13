import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Experience() {
  const prefersReduced = useReducedMotion()
  const { t, data } = useLanguage()

  const sectionProps = prefersReduced
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-80px' },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        },
      }

  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          {/* Section label */}
          <motion.p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
            {...itemProps}
          >
            {t.experience.sectionLabel}
          </motion.p>

          <motion.h2
            id="experience-heading"
            className="font-fraunces font-semibold mb-12"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--ink)' }}
            {...itemProps}
          >
            {t.experience.heading}
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Ledger spine line */}
            <div
              className="absolute left-0 top-2 bottom-2 hidden md:block"
              style={{
                width: '1px',
                backgroundColor: 'var(--line)',
                marginLeft: '11px',
              }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-12">
              {data.experience.map((entry, idx) => (
                <motion.article
                  key={entry.id}
                  className="md:pl-10 relative"
                  {...itemProps}
                  aria-labelledby={`exp-role-${entry.id}`}
                >
                  {/* Timeline dot + accent tick (the ledger motif) */}
                  <div
                    className="absolute left-0 top-1.5 hidden md:flex flex-col items-center"
                    aria-hidden="true"
                  >
                    {/* Accent tick mark above dot */}
                    <div
                      style={{
                        width: '2px',
                        height: '6px',
                        backgroundColor: 'var(--accent)',
                        borderRadius: '1px',
                        marginBottom: '2px',
                      }}
                    />
                    {/* Dot */}
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: idx === 0 ? 'var(--accent)' : 'var(--line)',
                        border: '2px solid var(--accent)',
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <h3
                        id={`exp-role-${entry.id}`}
                        className="font-inter font-semibold text-base mb-0.5"
                        style={{ color: 'var(--ink)' }}
                      >
                        {entry.role}
                      </h3>
                      <p
                        className="font-inter text-sm font-medium"
                        style={{ color: 'var(--accent)' }}
                      >
                        {entry.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span
                        className="font-mono text-xs"
                        style={{ color: 'var(--muted)' }}
                      >
                        {entry.dates}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 font-mono text-xs"
                        style={{ color: 'var(--muted)' }}
                      >
                        <MapPin size={10} aria-hidden="true" />
                        {entry.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2.5" role="list">
                    {entry.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="font-inter text-sm flex gap-3"
                        style={{ color: 'var(--muted)', lineHeight: 1.7 }}
                      >
                        <span
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            flexShrink: 0,
                            marginTop: '8px',
                          }}
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
