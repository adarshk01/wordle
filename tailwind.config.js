import { transform } from "typescript";

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
          "0%": { transform: "rotateX(0deg)" },
          "45%": { transform: "rotateX(90deg)" },
          "55%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        headShake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-6px) rotateY(-9deg)",
          },

          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },

          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },

          "43.5%": {
            transform: "translateX(2px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        heartBeat: "heartBeat 0.3s 1",
        vflip: "flipVertical 0.5s ease-in",
        headShake: "headShake 0.75s 1",
      },
    },
  },
  plugins: [],
};
