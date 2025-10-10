/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'priori': ['var(--font-priori-serif)', 'serif'],
        'crimson': ['var(--font-crimson-pro)', 'serif'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400', 
        'medium': '500',
        'semibold': '600',
      },
    },
  },
  plugins: [],
}