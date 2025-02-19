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
      screens:{
        xs:"475px"
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