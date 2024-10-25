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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
