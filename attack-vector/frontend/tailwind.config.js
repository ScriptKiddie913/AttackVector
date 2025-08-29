module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0f172a',
        'cyber-primary': '#0ea5e9',
        'cyber-secondary': '#8b5cf6',
        'cyber-accent': '#10b981',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}