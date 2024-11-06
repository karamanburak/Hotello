/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        light: {
          background: "#ffffff",
          primary: "#3b82f6",
          secondary: "#f3f4f6",
          text: "#1f2937",
          textSecondary: "#4b5563",
          border: "#d1d5db",
          button: {
            DEFAULT: "#2563eb",
            hover: "#1e40af",
          },
          bookingButton: "#E0B973",
        },
        // Dark Mode Colors
        dark: {
          background: "#111827",
          background2: "#161f30",
          background3: "#1d2a44",
          primary: "#3b82f6",
          secondary: "#1f2937",
          text: "#f9fafb",
          textSecondary: "#9ca3af",
          border: "#4b5563",
          button: {
            DEFAULT: "#2563eb",
            hover: "#1e40af",
          },
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
