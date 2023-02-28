/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // @ts-ignore
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
  daisyui: {
    themes: ["dark"],
  },
};
