module.exports = {
  mode: "jit",
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Circular Std Book", "ui-sans-serif", "system-ui"],
    },
    extend: {},
  },
  plugins: [],
};
