

import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
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
    <section id="about" aria-labelledby="about-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          {/* Section label */}
          <motion.p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
            {...itemProps}
          >
            {t.about.sectionLabel}
          </motion.p>

          <motion.h2
            id="about-heading"
            className="font-fraunces font-semibold mb-10"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--ink)' }}
            {...itemProps}
          >
            {t.about.heading}
          </motion.h2>

          {/* Main grid: copy | glance card */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* Bio copy — 7 cols on desktop */}
            <motion.div className="md:col-span-7 flex flex-col gap-5" {...itemProps}>
              <p className="font-inter" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                {t.about.bio1}
              </p>
              <p className="font-inter" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                {t.about.bio2}
              </p>
              <p className="font-inter" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                {t.about.bio3}
              </p>
            </motion.div>

            {/* At-a-glance card — 5 cols on desktop */}
            <motion.div className="md:col-span-5" {...itemProps}>
              <div
                className="rounded-card p-6 border"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--line)',
                }}
              >
                <p
                  className="font-inter text-xs font-semibold uppercase tracking-widest mb-5"
                  style={{ color: 'var(--muted)' }}
                >
                  {t.about.glanceHeading}
                </p>
                <dl className="flex flex-col gap-4">
                  {data.glance.map(({ label, value }) => (
                    <div key={label}>
                      <dt
                        className="font-mono text-xs mb-0.5"
                        style={{ color: 'var(--muted)', opacity: 0.7 }}
                      >
                        {label}
                      </dt>
                      <dd
                        className="font-inter text-sm font-medium"
                        style={{ color: 'var(--ink)' }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
