import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ProfilePhoto({ t }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    // Fallback placeholder when no photo exists
    return (
      <div
        className="w-full aspect-square rounded-card flex flex-col items-center justify-center gap-3 border-2 border-dashed"
        style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg)' }}
      >
        <Camera size={32} style={{ color: 'var(--line)' }} aria-hidden="true" />
        <p className="font-inter text-xs text-center px-4" style={{ color: 'var(--muted)' }}>
          {t.about.addPhoto}<br />
          <span style={{ opacity: 0.6 }}>{t.about.replacePhoto} <code>public/profile.png</code></span>
        </p>
      </div>
    )
  }

  return (
    <div
      className="w-full aspect-square rounded-card overflow-hidden"
      style={{ border: '1px solid var(--line)' }}
    >
      <img
        src="/profile.png"
        alt="Tran Thi Bich Nha — profile photo"
        className="w-full h-full object-cover object-center"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  )
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

          {/* Main grid: photo | copy | glance card */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* Profile photo — 3 cols on desktop */}
            <motion.div className="md:col-span-3" {...itemProps}>
              <ProfilePhoto t={t} />
            </motion.div>

            {/* Bio copy — 5 cols on desktop */}
            <motion.div className="md:col-span-5 flex flex-col gap-5" {...itemProps}>
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

            {/* At-a-glance card — 4 cols on desktop */}
            <motion.div className="md:col-span-4" {...itemProps}>
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
