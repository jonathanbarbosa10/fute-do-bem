/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fute: {
          darkBg: '#0b0512',
          card: '#180c29',
          cardHover: '#23123b',
          sidebar: '#140a23',
          border: '#371c5a',
          purple: '#8b5cf6',
          purpleBright: '#a855f7',
          purpleLight: '#d8b4fe',
          accent: '#c084fc',
          gold: '#fbbf24',
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
