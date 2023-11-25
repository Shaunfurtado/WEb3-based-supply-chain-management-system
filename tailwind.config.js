/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#009bff",
                   
          "secondary": "#00caff",
                   
          "accent": "#6d9b00",
                   
          "neutral": "#00100c",
                   
          "base-100": "#1e2c3f",
                   
          "info": "#00b0ff",
                   
          "success": "#00a500",
                   
          "warning": "#ffc800",
                   
          "error": "#f34563",
         },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

