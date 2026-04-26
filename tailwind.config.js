/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#080810',
        surface: '#0E0E1A',
        elevated: '#14142A',
        cyan: '#00E5FF',
        amber: '#F5A623',
        purple: '#7B61FF',
        muted: '#8885A8',
        dim: '#4A4870',
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
