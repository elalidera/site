import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // APENAS frontend — nunca incluir (payload)
    './src/app/(frontend)/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    // NÃO inclua './src/app/(payload)/**' aqui
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#F5EEFA',
          100: '#E8D8F5',
          300: '#C9A8E8',
          500: '#A87DD5',
          600: '#8B5CC4',
          700: '#6B3FA0',
          800: '#4A2D7A',
          900: '#2D1B4E',
        },
        offwhite: {
          DEFAULT: '#FFFDF7',
          200: '#F7F3EC',
          300: '#EDE8DF',
        },
        accent: {
          200: '#FAD1B0',
          400: '#F2A87A',
          500: '#E8854F',
          600: '#D96B35',
          700: '#C4501C',
        },
        neutral: {
          400: '#7A7A7A',
          600: '#4A4A4A',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        body: ['var(--font-body)', 'Source Sans 3', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '4px', // Editorial: sem bordas arredondadas excessivas
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
