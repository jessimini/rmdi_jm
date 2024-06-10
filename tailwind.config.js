/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "!./src/components/**/*" // `src/components` 폴더와 그 하위 모든 파일 제외
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
