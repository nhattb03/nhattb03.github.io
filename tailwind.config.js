/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-tint': 'var(--bg-tint)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)',
        'accent-deep': 'var(--accent-deep)',
        gold: 'var(--gold)',
        'gold-soft': 'var(--gold-soft)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        success: 'var(--success)',
      },
      fontFamily: {
        fraunces: ['"Fraunces"', 'Georgia', 'serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem', 'lg': '1.25rem',
        'xl': '1.5rem', '2xl': '2rem', '3xl': '2.75rem', '4xl': '3.5rem',
        '5xl': '4.5rem', '6xl': '5.75rem',
      },
      letterSpacing: { tightest: '-0.04em' },
      maxWidth: { 'content': '1120px', 'prose-tight': '68ch' },
      borderRadius: { 'card': '14px', 'btn': '999px' },
      boxShadow: {
        'sm-token': 'var(--shadow-sm)',
        'md-token': 'var(--shadow-md)',
        'lg-token': 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
}
