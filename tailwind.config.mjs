/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'purplefortitle': '#E514E1',
        'signupcolor': '#E37633',
        'signuphover': '#E36533',
        'herocolor': '#B8B29A',
        'songsbutton': '#FF5400',
      },
    },
  },
  plugins: [],
};
