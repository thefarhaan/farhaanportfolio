/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        cyan: 'var(--color-cyan)',
        amber: 'var(--color-amber)',
        purple: 'var(--color-purple)',
        muted: 'var(--color-muted)',
        dim: 'var(--color-dim)',
        primary: 'var(--text-primary)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        label: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
