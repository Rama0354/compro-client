/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1AB03B",
        secondary: "#6BDF34",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimGreen: "rgba(107, 223, 52, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        fadeOut: 'fadeOut 150ms ease-in-out',
        fadeIn: 'fadeIn 150ms ease-in-out',
      },

      keyframes: theme => ({
        fadeOut: {
          '0%': { transform: 'scale(1) translateY(0%)',opacity:'1' },
          '100%': { transform: 'scale(.4) translateY(20%)',opacity:'0' },
        },
        fadeIn: {
          '0%': { transform: 'scale(.8) translateY(20%)',opacity:'0' },
          '100%': { transform: 'scale(1) translateY(0%)',opacity:'1' },
        },
      }),
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
