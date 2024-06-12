/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "!./src/components/**/*", // Exclude all files in src/components
    "./src/components/Navbar.js", // Include Navbar.js specifically
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
