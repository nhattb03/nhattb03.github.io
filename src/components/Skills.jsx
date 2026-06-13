import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const GROUP_ACCENT = {
  operations: 'var(--accent)',
  analytical: 'var(--success)',
  tools: 'var(--muted)',
}

export default function Skills() {
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
          visible: { transition: { staggerChildren: 0.1 } },
        },
      }

  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          {/* Section label */}
          <motion.p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
            {...itemProps}
          >
            {t.skills.sectionLabel}
          </motion.p>

          <motion.h2
            id="skills-heading"
            className="font-fraunces font-semibold mb-12"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--ink)' }}
            {...itemProps}
          >
            {t.skills.heading}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {data.skills.groups.map(group => (
              <motion.div key={group.id} {...itemProps}>
                {/* Group heading with accent underline */}
                <div className="mb-5">
                  <h3
                    className="font-inter font-semibold text-sm uppercase tracking-wide mb-2"
                    style={{ color: GROUP_ACCENT[group.id] || 'var(--ink)' }}
                  >
                    {group.label}
                  </h3>
                  <div
                    style={{
                      height: '2px',
                      width: '32px',
                      backgroundColor: GROUP_ACCENT[group.id] || 'var(--accent)',
                      borderRadius: '1px',
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Skill tags */}
                <div
                  className="flex flex-wrap gap-2"
                  role="list"
                  aria-label={`${group.label} skills`}
                >
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      role="listitem"
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
