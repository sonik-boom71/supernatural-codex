import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0a',
        night: '#121212',
        asphalt: '#1a1a1a',
        mortar: '#242424',
        paper: '#2c2c2c',
        bone: '#f5f1e8',
        parchment: '#b8ad96',
        ash: '#6b6358',
        impala: '#d4af37',
        blood: '#8b0000',
        flame: '#ff6b1a',
        grace: '#4fa8ff',
        demon: '#1f5f1f',
        hell: '#c41e3a',
        rust: '#4a3520',
      },
      fontFamily: {
        // brand — латинский логотип/коды серий (Bebas Neue, без кириллицы)
        brand: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        // display — основные заголовки (Oswald, поддерживает кириллицу)
        display: ['var(--font-oswald)', 'Impact', 'sans-serif'],
        // title — декоративные подзаголовки (Playfair Display, кириллица)
        title: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(212, 175, 55, 0.15)',
        'glow-lg': '0 0 48px rgba(212, 175, 55, 0.25)',
        blood: '0 0 24px rgba(139, 0, 0, 0.35)',
        grace: '0 0 24px rgba(79, 168, 255, 0.3)',
      },
      backgroundImage: {
        'fog-radial': 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08), transparent 60%)',
        'paper-texture':
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 3px)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.78' },
          '55%': { opacity: '0.92' },
          '70%': { opacity: '0.7' },
        },
        'road-dash': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '15%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-120px) scale(0.3)', opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 4s infinite',
        'road-dash': 'road-dash 0.5s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'spin-slow': 'spin-slow 8s linear infinite',
        ember: 'ember 6s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
