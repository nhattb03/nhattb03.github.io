import { motion } from 'framer-motion'
import { MapPin, Download, ArrowRight } from 'lucide-react'
import ProfilePhoto from './ProfilePhoto'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  const motionProps = prefersReduced ? {} : { variants: containerVariants, initial: 'hidden', animate: 'visible' }
  const itemProps = prefersReduced ? {} : { variants: itemVariants }

  const nameParts = t.hero.title.trim().split(' ')
  const last = nameParts.pop()
  const first = nameParts.join(' ')

  return (
    <section id="hero" aria-label="Introduction"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 55% at 78% 18%, var(--gold-10), transparent 70%), radial-gradient(55% 50% at 8% 92%, var(--accent-10), transparent 72%)' }} />

      <div className="relative max-w-content mx-auto px-6 md:px-12 py-16 md:py-24 w-full grid md:grid-cols-12 items-center gap-12 md:gap-10">
        <motion.div className="md:col-span-7 order-2 md:order-1" {...motionProps}>
          <motion.div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8" {...itemProps}>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {!prefersReduced && (
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ backgroundColor: 'var(--success)' }} />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--success)' }} />
              </span>
              <span className="eyebrow" style={{ color: 'var(--success)' }}>{t.hero.available}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} style={{ color: 'var(--muted)' }} aria-hidden="true" />
              <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{t.hero.location}</span>
            </span>
          </motion.div>

          <motion.h1 className="font-fraunces font-semibold mb-5"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 5.25rem)', color: 'var(--ink)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
            {...itemProps}>
            {first}{' '}
            <span className="display-italic" style={{ color: 'var(--accent)', fontWeight: 500 }}>{last}</span>
          </motion.h1>

          <motion.p className="font-inter font-medium mb-6"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', color: 'var(--gold)', letterSpacing: '0.02em' }}
            {...itemProps}>
            {t.hero.subtitle}
          </motion.p>

          <motion.p className="font-inter mb-10"
            style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.2rem)', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '34rem' }}
            {...itemProps}>
            {t.hero.thesis}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" {...itemProps}>
            <a href="#contact" id="hero-cta-contact" className="btn btn-primary">
              {t.hero.getInTouch}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href={t.hero.cvLink} id="hero-cta-cv" download="CV_Tran Thi Bich Nha.pdf" className="btn btn-ghost">
              <Download size={15} aria-hidden="true" />
              {t.hero.downloadCV}
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="md:col-span-5 order-1 md:order-2 w-[220px] sm:w-[260px] md:w-full mx-auto md:mx-0"
          initial={prefersReduced ? 'visible' : 'hidden'} animate="visible" variants={itemVariants}>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] hidden sm:block" style={{ border: '1px solid var(--gold-20)' }} />
            <ProfilePhoto />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: 'var(--line)' }} aria-hidden="true" />
    </section>
  )
}
