import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5EEFA',
          100: '#E8D8F5',
          300: '#C9A8E8',
          500: '#A87DD5',
          600: '#8B5CC4',
          700: '#6B3FA0',
          800: '#4A2D7A',
          900: '#2D1B4E',
        },
        background: {
          DEFAULT: '#FFFDF7',
          secondary: '#F7F3EC',
          tertiary: '#EDE8DF',
        },
        accent: {
          200: '#FAD1B0',
          400: '#F2A87A',
          500: '#E8854F',
          600: '#D96B35',
          700: '#C4501C',
        },
        neutral: {
          text: '#1A1A1A',
          secondary: '#4A4A4A',
          muted: '#7A7A7A',
          border: '#D4D0C8',
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-source-sans)', 'sans-serif'],
      },
      fontSize: {
        base: '18px',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
      },
      spacing: {
        section: '64px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
