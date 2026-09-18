/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c1310",
        ink2: "#140d0b",
        merlot: "#3a1f1e",
        linen: "#f4ede2",
        linen2: "#ece1d2",
        bark: "#241a15",
        sand: "#7d6f60",
        rose: "#d98a7a",
        "rose-deep": "#8f4636",
        "rose-deep-hover": "#743a2d",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};
