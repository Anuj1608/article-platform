/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: "#1E3A5F",
        "action-primary": "#2D5A8E",
        accent: "#E8711A",
        "status-error": "#DC2626",
        "status-success": "#16A34A",
      },
    },
  },
  plugins: [],
};
