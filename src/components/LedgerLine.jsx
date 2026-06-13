import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * LedgerLine — the signature design element.
 * A thin horizontal line with a single accent tick, echoing a financial ledger.
 * Animates in via SVG path draw on mount (once). Respects prefers-reduced-motion.
 *
 * Uses <path> elements (not <line>) so Framer Motion pathLength works correctly.
 */
export default function LedgerLine({ className = '', width = 320 }) {
  const prefersReduced = useReducedMotion()

  const tickX = Math.round(width * 0.12)
  const lineY = 10
  const tickTop = 3
  const tickBottom = 17

  // Path strings
  const horizontalPath = `M 0 ${lineY} L ${width} ${lineY}`
  const tickPath = `M ${tickX} ${tickTop} L ${tickX} ${tickBottom}`

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.1, ease: 'easeInOut', delay: 0.3 },
        opacity: { duration: 0.15, delay: 0.3 },
      },
    },
  }

  const tickVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.35, ease: 'easeOut', delay: 1.1 },
        opacity: { duration: 0.1, delay: 1.1 },
      },
    },
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.25, delay: 1.35, ease: 'easeOut' },
    },
  }

  if (prefersReduced) {
    return (
      <svg
        width={width}
        height={20}
        viewBox={`0 0 ${width} 20`}
        aria-hidden="true"
        className={className}
        style={{ overflow: 'visible' }}
      >
        <path d={horizontalPath} stroke="var(--line)" strokeWidth="1" fill="none" />
        <path d={tickPath} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx={tickX} cy={lineY} r="3" fill="var(--accent)" />
      </svg>
    )
  }

  return (
    <motion.svg
      width={width}
      height={20}
      viewBox={`0 0 ${width} 20`}
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
      initial="hidden"
      animate="visible"
    >
      {/* Horizontal hairline */}
      <motion.path
        d={horizontalPath}
        stroke="var(--line)"
        strokeWidth="1"
        fill="none"
        variants={lineVariants}
      />
      {/* Accent tick mark */}
      <motion.path
        d={tickPath}
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        variants={tickVariants}
      />
      {/* Accent dot */}
      <motion.circle
        cx={tickX}
        cy={lineY}
        r="3"
        fill="var(--accent)"
        variants={dotVariants}
        style={{ originX: `${tickX}px`, originY: `${lineY}px` }}
      />
    </motion.svg>
  )
}
