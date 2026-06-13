/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-deep': 'var(--accent-deep)',
        line: 'var(--line)',
        success: 'var(--success)',
      },
      fontFamily: {
        fraunces: ['"Fraunces"', 'Georgia', 'serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.75rem',
        '4xl': '3.5rem',
      },
      maxWidth: {
        'content': '1080px',
      },
      borderRadius: {
        'card': '8px',
        'btn': '6px',
      },
    },
  },
  plugins: [],
}
