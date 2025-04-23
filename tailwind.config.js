/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // Usa el preset de NativeWind v4
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f8d4e3",
        accent: "#d4af37",
      },
    },
  },
  plugins: [],
};
