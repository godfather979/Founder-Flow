/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#1E3A8A", // Deep Navy
          secondary: "#64748B", // Slate Gray
          accent: "#FACC15", // Soft Gold
          background: "#F9FAFB", // Off-White
          text: "#1E293B", // Dark Gray
        },
        dark: {
          primary: "#1E40AF", // Royal Blue
          secondary: "#475569", // Slate Gray
          accent: "#FACC15", // Soft Gold
          background: "#0F172A", // Deep Blue-Black
          text: "#E2E8F0", // Soft White
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
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
        deep: "0 8px 16px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
