import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'
import SectionHead from './SectionHead'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Experience() {
  const prefersReduced = useReducedMotion()
  const { t, data } = useLanguage()

  const sectionProps = prefersReduced ? {} : {
    initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' },
    variants: { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } },
  }
  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="experience" aria-labelledby="experience-heading" style={{ backgroundColor: 'var(--bg-tint)' }}>
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          <SectionHead index="02" eyebrow={t.experience.sectionLabel} heading={t.experience.heading} />
          <div className="relative">
            <div className="absolute left-0 top-3 bottom-3 hidden md:block" style={{ width: '1px', backgroundColor: 'var(--line-strong)', marginLeft: '5px' }} aria-hidden="true" />
            <div className="flex flex-col gap-14">
              {data.experience.map((entry, idx) => (
                <motion.article key={entry.id} className="md:pl-12 relative" {...itemProps} aria-labelledby={`exp-role-${entry.id}`}>
                  <div className="absolute left-0 top-1.5 hidden md:block" aria-hidden="true">
                    <div style={{
                      width: '11px', height: '11px', borderRadius: '50%',
                      backgroundColor: idx === 0 ? 'var(--gold)' : 'var(--bg-tint)',
                      border: `2px solid ${idx === 0 ? 'var(--gold)' : 'var(--line-strong)'}`,
                      boxShadow: idx === 0 ? '0 0 0 4px var(--gold-10)' : 'none',
                    }} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <h3 id={`exp-role-${entry.id}`} className="font-fraunces font-semibold mb-1" style={{ color: 'var(--ink)', fontSize: '1.35rem', lineHeight: 1.25 }}>
                        {entry.role}
                      </h3>
                      <p className="font-inter text-sm font-medium" style={{ color: 'var(--accent)' }}>{entry.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 sm:pt-1">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ color: 'var(--muted)', backgroundColor: 'var(--surface)', border: '1px solid var(--line)' }}>
                        {entry.dates}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs" style={{ color: 'var(--faint)' }}>
                        <MapPin size={10} aria-hidden="true" />{entry.location}
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3" role="list">
                    {entry.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3" style={{ color: 'var(--muted)' }}>
                        <span aria-hidden="true" className="mt-2 shrink-0" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--gold)' }} />
                        <span className="font-inter text-sm" style={{ lineHeight: 1.75 }}>{bullet}</span>
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
