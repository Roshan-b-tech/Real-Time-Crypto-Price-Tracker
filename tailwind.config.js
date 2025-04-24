/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        background: 'var(--color-background)',
        card: 'var(--color-card)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-price-up': 'pulse-bg 1.5s ease-out',
        'pulse-price-down': 'pulse-bg-red 1.5s ease-out',
      },
      gridTemplateColumns: {
        'crypto-table': 'minmax(60px, 0.5fr) minmax(220px, 2fr) minmax(100px, 1fr) repeat(3, minmax(90px, 1fr)) minmax(140px, 1.5fr) minmax(140px, 1.5fr) minmax(180px, 2fr) minmax(100px, 1fr)',
        'crypto-table-md': '60px 2fr 1fr repeat(3, 0.8fr) 1.5fr 1.5fr',
        'crypto-table-sm': '60px 2fr 1fr repeat(2, 0.8fr)',
      },
    },
  },
  plugins: [],
};