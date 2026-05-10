import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#232426',
        gold: '#B8960C',
        'gold-light': '#D4AF37',
        'gold-muted': 'rgba(184, 150, 12, 0.15)',
        'gray-light': '#F5F4F2',
        'gray-mid': '#E8E6E3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        label: ['var(--font-label)', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.06)',
        lift: '0 8px 24px rgba(0,0,0,0.08)',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
