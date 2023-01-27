/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      superDark: '#221F1F',
      superDark2: '#221f1fd9',
      normalDark: '#232323',
      superGray: '#2f2f2f',
      normalGray: '#4f4f4f',
      lightGray: '#8a8a8a',
      superLightGray: '#fafafa',
      superRed: '#ff0000',
      normalRed: '#B81D24',
      white: '#ffffff',
      black: '#000000'
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
