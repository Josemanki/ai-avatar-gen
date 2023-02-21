/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  safelist: [
    {
      pattern: /bg-secondary/,
      variants: ["checked"],
    },
    {
      pattern: /bg-.*-500/, // You can display all the colors that you need
      variants: ["checked"],
    },
  ],
};
