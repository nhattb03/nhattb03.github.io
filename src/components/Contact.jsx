import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import LedgerLine from './LedgerLine'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  const CONTACT_ITEMS = [
    {
      id: 'email',
      icon: Mail,
      label: t.contact.emailLabel,
      value: 'bichnha07122003@gmail.com',
      href: 'mailto:bichnha07122003@gmail.com',
      display: 'bichnha07122003@gmail.com',
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: t.contact.linkedinLabel,
      value: 'linkedin.com/in/nhattb03',
      href: 'https://linkedin.com/in/nhattb03',
      display: 'linkedin.com/in/nhattb03',
    },
    {
      id: 'location',
      icon: MapPin,
      label: t.contact.locationLabel,
      value: t.contact.locationValue,
      href: null,
      display: t.contact.locationValue,
    },
  ]

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
    <section id="contact" aria-labelledby="contact-heading">
      <hr className="section-divider" />
      <div className="section-container">
        <motion.div {...sectionProps}>
          {/* Section label */}
          <motion.p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
            {...itemProps}
          >
            {t.contact.sectionLabel}
          </motion.p>

          <motion.h2
            id="contact-heading"
            className="font-fraunces font-semibold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--ink)' }}
            {...itemProps}
          >
            {t.contact.heading}
          </motion.h2>

          <motion.div className="mb-10" {...itemProps}>
            <LedgerLine width={200} />
          </motion.div>

          <motion.p
            className="font-inter mb-12 max-w-lg"
            style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1.0625rem' }}
            {...itemProps}
          >
            {t.contact.message}
          </motion.p>

          {/* Contact items */}
          <motion.div className="flex flex-col gap-5" {...itemProps}>
            {CONTACT_ITEMS.map(({ id, icon: Icon, label, href, display }) => (
              <div key={id} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-card flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--accent-10)',
                    border: '1px solid var(--accent-20)',
                  }}
                  aria-hidden="true"
                >
                  <Icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p
                    className="font-mono text-xs mb-0.5"
                    style={{ color: 'var(--muted)', opacity: 0.7 }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="font-inter text-sm font-medium transition-colors duration-200"
                      style={{ color: 'var(--ink)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                    >
                      {display}
                    </a>
                  ) : (
                    <p
                      className="font-inter text-sm font-medium"
                      style={{ color: 'var(--ink)' }}
                    >
                      {display}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
