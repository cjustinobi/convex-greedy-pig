/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        custom: '80px',
        'custom-sm': '20px',
      },
      colors: {
        'app-color': '#d9d9e8',
      },
      // backgroundImage:{
      //   'game': `url(${require('./src/assets/img/gamebg.jpg')})`
      // }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tw-elements/dist/plugin.cjs'),
    require('daisyui')
  ]
}
