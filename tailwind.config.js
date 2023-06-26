/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100svh'],
      },
      boxShadow: {
        focus: `0 0 0 2px red`,
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
