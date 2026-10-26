/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1B2430",
        concrete: "#F7F7F5",
        yellow: "#FFC93C",
        blue: "#2451B7",
        red: "#E63946",
        slate: "#5B6472",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.375rem', // 6px (sharp-ish 4-8px)
        md: '0.375rem',
        lg: '0.5rem',
      },
    },
  },
  plugins: [],
}
