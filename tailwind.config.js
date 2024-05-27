/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./storage/framework/views/*.php",
    "./resources/**/*.blade.php",
    "./resources/**/*.{js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

