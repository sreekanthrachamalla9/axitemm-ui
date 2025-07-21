/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // 👈 Add this to scan Angular files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
