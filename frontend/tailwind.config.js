/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'float-down': 'float-down 3s ease-in-out infinite',
        'float-diagonal': 'float-diagonal 4s ease-in-out infinite',
      },
      keyframes: {
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        'float-diagonal': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
      },
    },
  },
  plugins: [],
}
