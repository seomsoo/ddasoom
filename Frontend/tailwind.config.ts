import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main1: '#8ebb5b',
        main2: '#b6d89a',
        main3: '#ebf4e3',
        sub1: '#fbee7d',
        sub2: '#ff9901',
        sub3: '#e03c18',
        sub4: '#5673f9',
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
    },
  },
  plugins: [],
};

export default config;
