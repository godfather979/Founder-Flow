/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#2563EB", // Vibrant Blue
          secondary: "#10B981", // Emerald Green
          accent: "#F59E0B", // Amber
          background: "#FAF5E4", // Soft Cream
          text: "#1E293B", // Deep Navy Text
          card: "#FFFFFF", // White Cards
          border: "#E2E8F0", // Subtle Blue Border
        },
        dark: {
          primary: "#3B82F6", // Bright Blue
          secondary: "#14B8A6", // Teal
          accent: "#FACC15", // Gold
          background: "#111827", // Midnight Blue
          text: "#F3F4F6", // Soft White
          card: "#1F2937", // Dark Charcoal for Cards
          border: "#374151", // Subtle Dark Border
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        button: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft for light mode
        deep: "0 6px 14px rgba(0, 0, 0, 0.25)", // Deeper for dark mode
      },
    },
  },
  plugins: [],
};
