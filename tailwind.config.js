/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        heartBeat: {
          "0%": { transform: "scale(1);" },
          "14%": { transform: "scale(1.1);" },
          "28%": { transform: "scale(1);" },
          "42%": { transform: "scale(1.1);" },
          "70%": { transform: "scale(1);" },
        },
        flipVertical: {
          "50%": { transform: "rotateX(180deg)" },
        },
      },
      animation: {
        heartBeat: "heartBeat 0.3s 1",
      },
    },
  },
  plugins: [],
};
