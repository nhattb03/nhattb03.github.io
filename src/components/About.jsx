import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'
import SectionHead from './SectionHead'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  const prefersReduced = useReducedMotion()
  const { t, data } = useLanguage()

  const sectionProps = prefersReduced ? {} : {
    initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' },
    variants: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
  }
  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="about" aria-labelledby="about-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          <SectionHead index="01" eyebrow={t.about.sectionLabel} heading={t.about.heading} />
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            <motion.div className="md:col-span-7" {...itemProps}>
              <p className="font-fraunces mb-6"
                style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)', color: 'var(--ink)', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                {t.about.bio1}
              </p>
              <div className="flex flex-col gap-5">
                <p className="font-inter" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>{t.about.bio2}</p>
                <p className="font-inter" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>{t.about.bio3}</p>
              </div>
            </motion.div>

            <motion.div className="md:col-span-5" {...itemProps}>
              <div className="card p-7" style={{ backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="rule-gold" style={{ width: '28px' }} aria-hidden="true" />
                  <p className="eyebrow" style={{ color: 'var(--muted)' }}>{t.about.glanceHeading}</p>
                </div>
                <dl className="flex flex-col">
                  {data.glance.map(({ label, value }, i) => (
                    <div key={label} className="py-4" style={{ borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
                      <dt className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--faint)' }}>{label}</dt>
                      <dd className="font-inter text-sm font-medium" style={{ color: 'var(--ink)' }}>{value}</dd>
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
