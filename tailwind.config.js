/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand System
        primary: {
          DEFAULT: '#2563eb', // Blue-600
          dark: '#1d4ed8',    // Blue-700
          light: '#60a5fa',   // Blue-400
        },
        secondary: {
          DEFAULT: '#0f172a', // Slate-900 (Main Text)
          muted: '#64748b',   // Slate-500 (Subtitles)
          light: '#f8fafc',   // Slate-50 (Backgrounds)
        },
        // Functional
        accent: '#06b6d4',    // Cyan-500
        surface: '#ffffff',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}