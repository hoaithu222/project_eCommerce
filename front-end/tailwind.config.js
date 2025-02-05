import colors from './src/style/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "spin-reverse": "spin 3s linear reverse infinite",
      },
      colors: {
        gradients: colors.gradients,
        textColors: colors.textColors,
        backgroundColors: colors.backgroundColors,
      },
    },
  },
  plugins: [],
}