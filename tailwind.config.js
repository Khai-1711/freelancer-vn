/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#090C12',
          900: '#0F141F',
          850: '#111622',
          800: '#161D2C',
          750: '#1C2538',
          700: '#253047',
        },
        cobalt: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        semantic: {
          emerald: '#10B981',
          amber: '#F59E0B',
          danger: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        surface: '0 1px 0 0 rgba(255, 255, 255, 0.04), 0 8px 24px -12px rgba(0, 0, 0, 0.65)',
        modal: '0 24px 48px -12px rgba(0, 0, 0, 0.85)',
      },
    },
  },
  plugins: [],
};
