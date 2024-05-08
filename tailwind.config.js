/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // 1st
        "dark-maroon": "#49243E",
        "light-maroon": "#704264",
        "soft-maroon": "#BB8493",
        "light-peach": "#DBAFA0",

        //2 nd
        // "dark-maroon": "#240A34",
        // "light-maroon": "#891652",
        // "soft-maroon": "#EABE6C",
        // "light-peach": "#FFEDD8",

        //3rd
        // "dark-maroon": "#643843",
        // "light-maroon": "#99627A",
        // "soft-maroon": "#C88EA7",
        // "light-peach": "#E7CBCB",

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ConcertOne: ["Concert One", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
