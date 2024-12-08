/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(15px)" },
        },
      },
      colors: {
        'primary': "#3260F4",
        'primary-hover': '#6D8FFC',
        "secondary": "#112051",

        'gray-primary': '#EDF1F2',
        'gray-darker': '#D9D9D9',

        'red-danger': '#EB5659',
        'red-danger-hover': '#FB8A8C',

        'red-primary': '#F27373',
        'red-disable': '#FFD5D5',

        'yellow-primary': '#F0D131',
        'yellow-disable': '#FCEFA8',

        'green-primary': '#7DE16E',
        'green-disable': '#C3F8D6',

      },
    },
  },
  plugins: [],
};
