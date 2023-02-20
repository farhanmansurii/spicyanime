/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // ...plugins: [require("tw-elements/dist/plugin")]
    require("@tailwindcss/line-clamp", "tw-elements/dist/plugin"),
  ],
};
