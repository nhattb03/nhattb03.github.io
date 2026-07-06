import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'
import SectionHead from './SectionHead'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const GROUP_ACCENT = { operations: 'var(--accent)', analytical: 'var(--success)', tools: 'var(--gold)' }

export default function Skills() {
  const prefersReduced = useReducedMotion()
  const { t, data } = useLanguage()

  const sectionProps = prefersReduced ? {} : {
    initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' },
    variants: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
  }
  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="skills" aria-labelledby="skills-heading" style={{ backgroundColor: 'var(--bg-tint)' }}>
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          <SectionHead index="04" eyebrow={t.skills.sectionLabel} heading={t.skills.heading} />
          <div className="grid md:grid-cols-3 gap-6">
            {data.skills.groups.map((group, i) => (
              <motion.div key={group.id} className="card p-7 h-full" {...itemProps}>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-mono text-xs" style={{ color: GROUP_ACCENT[group.id] }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-inter font-semibold text-sm uppercase tracking-wide" style={{ color: 'var(--ink)' }}>{group.label}</h3>
                </div>
                <div className="rule-gold mb-5" style={{ width: '32px', background: `linear-gradient(90deg, ${GROUP_ACCENT[group.id]}, transparent)` }} aria-hidden="true" />
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.label} skills`}>
                  {group.skills.map(skill => (
                    <span key={skill} role="listitem" className="skill-tag">{skill}</span>
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
