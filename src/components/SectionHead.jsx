import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function SectionHead({ index, eyebrow, heading }) {
  const prefersReduced = useReducedMotion()
  const itemProps = prefersReduced ? {} : { variants: fadeUp }

  return (
    <div className="mb-12 md:mb-16">
      <motion.div className="flex items-baseline gap-4 md:gap-6" {...itemProps}>
        <span
          className="section-index shrink-0"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          aria-hidden="true"
        >
          {index}
        </span>
        <div className="flex flex-col gap-2">
          <span className="eyebrow">{eyebrow}</span>
          <h2
            className="font-fraunces font-semibold"
            style={{ fontSize: 'clamp(1.85rem, 4.2vw, 2.75rem)', color: 'var(--ink)' }}
          >
            {heading}
          </h2>
        </div>
      </motion.div>
      <motion.div
        className="rule-gold mt-6"
        style={{ maxWidth: '160px' }}
        {...itemProps}
        aria-hidden="true"
      />
    </div>
  )
}
