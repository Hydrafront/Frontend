/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: '#0A090F',
        lightColor: "#15131D",
        lighterColor: "#211E2C",
        lightestColor: "#322F40",
        textColor: 'rgb(239, 239, 229)',
        borderColor: 'rgb(53, 53, 57)',
        darkPurple: "#1C1927",
        borderColorThick: 'rgba(239, 239, 229, .25)',
        greenColor: "#00D26C",
        textDark: "#797979",
        pink: "#a349a4",
        green1: "#089981",
        grey1: "#212121",
        grey2: "#211e2c",
        grey3: "#353539",
        orangeColor: "#f0b90b"
      },
      boxShadow: {
        defaultShadow: "0 0 5px white"
      },
      fontFamily: {
        primary: ["Cascadia Code"],
        title: ['Violetsans', 'Arial', 'sans-serif'],
      },
      opacity: {
        opacity1: .6,
        opacity2: .65,
      }
    },
  },
  plugins: [],
});

