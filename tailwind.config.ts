import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [animate],
} satisfies Config

