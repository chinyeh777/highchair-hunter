/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Noto Sans TC', 'sans-serif'],
      },
      colors: {
        cream: '#FDF8F2',
        terracotta: {
          DEFAULT: '#D4603A',
          dark: '#B84D2A',
        },
        sage: {
          DEFAULT: '#5A7A5C',
          light: '#EBF2EB',
        },
      },
      borderWidth: {
        '6': '6px',
      },
    },
  },
  plugins: [],
}
