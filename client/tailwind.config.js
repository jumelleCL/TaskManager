/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#3260F4",
        'primary-hover': '#6D8FFC',
        "secondary": "#112051",

        'gray-primary': '#EDF1F2',
        'gray-darker': '#D9D9D9',

        'red-danger': '#EB5659',
        'red-danger-hover': '#FB8A8C',
        'red-primary': '#FFA5A5',
        'red-disable': '#FFD5D5',

        'yellow-primary': '#FDE047',
        'yellow-disable': '#FCEFA8',

        'green-primary': '#86EFAC',
        'green-disable': '#C3F8D6',

      },
    },
  },
  plugins: [],
};
