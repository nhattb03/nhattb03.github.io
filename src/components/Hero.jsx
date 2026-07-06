import { motion } from 'framer-motion'
import { MapPin, Download, ArrowRight } from 'lucide-react'
import LedgerLine from './LedgerLine'
import ProfilePhoto from './ProfilePhoto'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  const motionProps = prefersReduced
    ? {}
    : { variants: containerVariants, initial: 'hidden', animate: 'visible' }

  const itemProps = prefersReduced ? {} : { variants: itemVariants }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-screen flex items-center pt-16"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-20 w-full flex flex-col-reverse md:flex-row md:items-center justify-between gap-12 md:gap-16">
        <motion.div
          className="max-w-2xl flex-1"
          {...motionProps}
        >
          {/* Location chip */}
          <motion.div
            className="inline-flex items-center gap-1.5 mb-8"
            {...itemProps}
          >
            <MapPin
              size={13}
              style={{ color: 'var(--accent)', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-xs font-medium tracking-wide uppercase"
              style={{ color: 'var(--muted)' }}
            >
              {t.hero.location}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-fraunces font-semibold leading-tight mb-3"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 3.75rem)',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}
            {...itemProps}
          >
            {t.hero.title}
          </motion.h1>

          {/* Ledger line signature */}
          <motion.div className="mb-6" {...itemProps}>
            <LedgerLine width={280} />
          </motion.div>

          {/* Sub-heading */}
          <motion.p
            className="font-inter font-medium mb-5"
            style={{
              fontSize: '1.1rem',
              color: 'var(--accent)',
              letterSpacing: '0.01em',
            }}
            {...itemProps}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Thesis */}
          <motion.p
            className="font-inter mb-10 max-w-xl"
            style={{
              fontSize: '1.0625rem',
              color: 'var(--muted)',
              lineHeight: 1.75,
            }}
            {...itemProps}
          >
            {t.hero.thesis}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            {...itemProps}
          >
            <a
              href="#contact"
              id="hero-cta-contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn font-inter text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#fff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--accent-deep)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {t.hero.getInTouch}
              <ArrowRight size={14} aria-hidden="true" />
            </a>

            <a
              href={t.hero.cvLink}
              id="hero-cta-cv"
              download = "CV_Tran Thi Bich Nha.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn font-inter text-sm font-medium border transition-all duration-200"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--accent-10)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Download size={14} aria-hidden="true" />
              {t.hero.downloadCV}
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image Column */}
        <motion.div 
          className="w-[240px] md:w-full md:max-w-[380px] shrink-0"
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
          variants={itemVariants}
        >
          <ProfilePhoto />
        </motion.div>
      </div>
    </section>
  )
}
