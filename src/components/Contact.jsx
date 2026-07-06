import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin, ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'
import SectionHead from './SectionHead'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  const CONTACT_ITEMS = [
    { id: 'email', icon: Mail, label: t.contact.emailLabel, href: 'mailto:bichnha07122003@gmail.com', display: 'bichnha07122003@gmail.com' },
    { id: 'linkedin', icon: Linkedin, label: t.contact.linkedinLabel, href: 'https://linkedin.com/in/nhattb03', display: 'linkedin.com/in/nhattb03' },
    { id: 'location', icon: MapPin, label: t.contact.locationLabel, href: null, display: t.contact.locationValue },
  ]

  const sectionProps = prefersReduced ? {} : {
    initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' },
    variants: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
  }
  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          <SectionHead index="05" eyebrow={t.contact.sectionLabel} heading={t.contact.heading} />
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            <motion.div className="md:col-span-6" {...itemProps}>
              <p className="font-fraunces" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', color: 'var(--ink)', lineHeight: 1.4 }}>
                {t.contact.message}
              </p>
            </motion.div>
            <motion.div className="md:col-span-6 flex flex-col gap-3" {...itemProps}>
              {CONTACT_ITEMS.map(({ id, icon: Icon, label, href, display }) => {
                const inner = (
                  <>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--gold-10)', border: '1px solid var(--gold-20)' }} aria-hidden="true">
                      <Icon size={16} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--faint)' }}>{label}</p>
                      <p className="font-inter text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{display}</p>
                    </div>
                    {href && <ArrowUpRight size={16} className="shrink-0" style={{ color: 'var(--muted)' }} aria-hidden="true" />}
                  </>
                )
                return href ? (
                  <a key={id} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="card flex items-center gap-4 p-4"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'translateX(0)' }}>
                    {inner}
                  </a>
                ) : (
                  <div key={id} className="card flex items-center gap-4 p-4">{inner}</div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
