import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        grow2: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        wave: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        sirenPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 10px red)' },
          '50%': { transform: 'scale(1.1)', filter: 'drop-shadow(0 0 20px red)' },
        },
        fadein: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeout: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        grow: 'grow2 0.5s ease-in-out forwards',
        'progress-wave': 'wave 1s ease-in-out infinite',
        'progress-grow': 'grow 3s linear forwards',
        'siren-pulse': 'sirenPulse 1s infinite ease-in-out',
        fadein: 'fadein 2s ease-out forwards',
        fadeout: 'fadeout 1s ease-out forwards',
      },
      colors: {
        main1: '#8ebb5b',
        main2: '#b6d89a',
        main3: '#ebf4e3',
        main4: '#f8fcf6',
        sub1: '#fbee7d',
        sub2: '#ff9901',
        sub3: '#e03c18',
        sub4: '#D35F42',
        sub5: '#00c67b',
        black: '#262626',
        gray1: '#F8F9FA',
        gray2: '#EFF1F3',
        gray3: '#E1E4E8',
        gray4: '#A6B0BD',
        gray5: '#576373',
        button1: '#5B9915',
      },
      fontFamily: {
        nanumRegular: ['var(--font-nanumRegular)', 'sans-serif'],
        nanumLight: ['var(--font-nanumLight)', 'sans-serif'],
        nanumBold: ['var(--font-nanumBold)', 'sans-serif'],
        nanumExtraBold: ['var(--font-nanumExtraBold)', 'sans-serif'],
        nanumHeavy: ['var(--font-nanumHeavy)', 'sans-serif'],
        hakgyoansimR: ['var(--font-hakgyoansimR)', 'sans-serif'],
        hakgyoansimB: ['var(--font-hakgyoansimB)', 'sans-serif'],
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
