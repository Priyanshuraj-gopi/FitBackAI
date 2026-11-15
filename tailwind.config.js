/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#FAF8F4',
          beige: '#F1EDE5',
          charcoal: '#242321',
          muted: '#77736C',
          terracotta: '#A85F48',
          'terracotta-dark': '#8E4D39',
          'terracotta-light': '#F6EDE9',
          sage: '#89947C',
          'sage-light': '#F0F3EE',
          border: '#E8E3DA',
          forest: '#2E5A44',
          amber: '#C27803',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(36, 35, 33, 0.05)',
        'card': '0 8px 30px rgba(36, 35, 33, 0.07)',
        'drawer': '-10px 0 30px rgba(36, 35, 33, 0.12)',
      }
    },
  },
  plugins: [],
}
