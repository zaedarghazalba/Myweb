/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Framer-style minimal grayscale palette
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['96px', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-2': ['72px', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-3': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      boxShadow: {
        'framer-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'framer-md': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'framer-lg': '0 4px 8px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'framer-fade-in': 'framerFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        framerFadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
