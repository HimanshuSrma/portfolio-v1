/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          0: '#000000',
          50: '#0a0a0f',
          100: '#0d0d14',
          200: '#13131c',
          300: '#1a1a26',
          400: '#242433',
          500: '#2f2f42',
        },
        primary: {
          50: '#e6fcff',
          100: '#b3f5ff',
          200: '#80eeff',
          300: '#4de7ff',
          400: '#1ae0ff',
          500: '#00f5ff',
          600: '#00c4cc',
          700: '#009399',
          800: '#006266',
          900: '#003133',
        },
        secondary: {
          50: '#f1ecff',
          100: '#d6c8ff',
          200: '#baa3ff',
          300: '#9e7fff',
          400: '#825aff',
          500: '#7b2fff',
          600: '#6225cc',
          700: '#4a1c99',
          800: '#311266',
          900: '#190933',
        },
        accent: {
          50: '#e8fff3',
          100: '#bbffd9',
          200: '#8fffbf',
          300: '#62ffa6',
          400: '#36ff8c',
          500: '#00ff88',
          600: '#00cc6d',
          700: '#009952',
          800: '#006638',
          900: '#00331d',
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient': 'gradient 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(8deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.8)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,245,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.07) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(circle, rgba(0,245,255,0.15) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
