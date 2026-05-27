import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Foundation
        ivory: '#FAF6F0',
        bone: '#F2EBE0',
        paper: '#FFFFFF',
        // Ink
        espresso: '#2A1E18',
        mocha: '#7A6B5F',
        ash: '#B5A99D',
        whisper: '#E5DDD0',
        // Accent
        caramel: {
          DEFAULT: '#C68A4F',
          deep: '#A26F3D',
        },
        rose: '#E8C9C0',
        sage: '#A8B59A',
        berry: '#8B3A4E',
        // Functional
        success: '#6B8E4E',
        error: '#B14545',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Display
        'display-xl': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '300' }],
        'display-lg': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '300' }],
        'display-md': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-sm': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '400' }],
        // Heading
        'heading-lg': ['clamp(1.375rem, 2.2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-md': ['clamp(1.25rem, 1.8vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '500' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        // Body
        'body-lg': ['clamp(1.0625rem, 1.4vw, 1.1875rem)', { lineHeight: '1.65', fontWeight: '400' }],
        'body-md': ['clamp(1rem, 1.2vw, 1.0625rem)', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55', letterSpacing: '0.005em', fontWeight: '400' }],
        // Mono / eyebrow
        'mono-sm': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' }],
        'mono-xs': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.12em', fontWeight: '500' }],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.5rem',
        '6': '2rem',
        '7': '3rem',
        '8': '4rem',
        '9': '6rem',
        '10': '8rem',
        '11': '10rem',
        '12': '12.5rem',
      },
      maxWidth: {
        content: '1440px',
      },
      borderRadius: {
        button: '2px',
        pill: '100px',
      },
      transitionTimingFunction: {
        'out-slow': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quick': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        instant: '150ms',
        quick: '300ms',
        base: '450ms',
        slow: '700ms',
        luxe: '1000ms',
      },
      keyframes: {
        'ken-burns': {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0)' },
          '70%': { transform: 'translate(0, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 18s ease-in-out infinite',
        'fade-up': 'fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'grain': 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
