module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#333333",
        secondary: "#6b7280",
        link: "#2563eb",
      },
      backgroundColor: {
        primary: "#FFFFFF",
        "primary-hover": "#F5F5F5",
        secondary: "#E5E7EB",
        tertiary: "#9CA3AF",
      },
      borderColor: {
        primary: "#333333",
        secondary: "#6B7280",
        tertiary: "#D1D5DB",
      },
      ringColor: {
        primary: "#333333",
        secondary: "#6B7280",
        tertiary: "#D1D5DB",
      },
    },
    fontFamily: {
      body: ["source-han-sans-japanese", "sans-serif"],
    },
    transitionProperty: {
      width: "width",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
