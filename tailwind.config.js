/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07070b',
        graphite: '#0d0d14',
        panel: '#12121b',
        mute: '#8d8da3',
        accent: '#6d5cff',
        electric: '#2f7bff',
        ice: '#5fd0ff',
      },
      fontFamily: {
        display: ['"Unbounded Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Manrope Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'fluid-h1': ['clamp(1.8rem, 1.15rem + 2.9vw, 3.75rem)', { lineHeight: '1.08' }],
        'fluid-h2': ['clamp(1.65rem, 1.1rem + 2.3vw, 3.5rem)', { lineHeight: '1.08' }],
        'fluid-h3': ['clamp(1.4rem, 1.1rem + 1.3vw, 2.25rem)', { lineHeight: '1.12' }],
        'fluid-h4': ['clamp(1.2rem, 1rem + 0.9vw, 1.9rem)', { lineHeight: '1.15' }],
        'fluid-lead': ['clamp(1.35rem, 1rem + 1.8vw, 2.65rem)', { lineHeight: '1.22' }],
        'fluid-body': ['clamp(0.95rem, 0.9rem + 0.25vw, 1.125rem)', { lineHeight: '1.65' }],
        'fluid-small': ['clamp(0.8125rem, 0.78rem + 0.15vw, 0.9375rem)', { lineHeight: '1.5' }],
      },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.8,.2,1)' },
    },
  },
  plugins: [],
};
