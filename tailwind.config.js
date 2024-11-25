/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajusta el path según la estructura de tu proyecto
    "./index.html",
  ],
  theme: {
    extend: {
      colors:{
        customBlue:'rgba(172, 207, 217, 1)',       
        customSidebarColor: 'rgba(0, 0, 112, 1)',
        customYellow:'rgba(249, 198, 0, 1)'
        
      },
      screens:{
        customLg:'1180px',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

