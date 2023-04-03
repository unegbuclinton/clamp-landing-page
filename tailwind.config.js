/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          colors: { 
            white: "#fff",
            black:"#000",
            "anti-white": "#e5e7eb"
           
           },
            backgroundImage: {
              'hero-pattern':
                'linear-gradient(90deg, rgba(52,58,64,1) 0%, rgba(130,140,150,1) 45%, rgba(233,236,239,1) 100%);',
            },
          },
          fontFamily: {
            IBM: [ 'IBM Plex Sans', "sans-serif"],
                },
                boxShadow: {
                  xl: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
                  xxl: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
                  '2xl': ' 0px -6px 79px 0px rgba(0,0,0,0.75)',
                },
  },
  plugins: [],
}

