/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#d7263d",
        primaryDark: "#a61b2c",
        crimson: "#cc2c3f",
        darkRed: "#8b1a2d",
        rust: "#b83c3c",
        rose: "#e85d75",
        maroon: "#5a1020",
        coral: "#ff6b6b",
        accent: "#ffb4b4",
        accentLight: "#ffcfd3",
        ink: "#0f172a",
      },
      boxShadow: {
        glass: "0 24px 60px rgba(215,38,61,0.18)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 10% 20%, rgba(215,38,61,0.08), transparent 30%), radial-gradient(circle at 90% 10%, rgba(255,180,180,0.18), transparent 25%), radial-gradient(circle at 40% 80%, rgba(232,93,117,0.06), transparent 30%)",
        heroCrimson: "linear-gradient(135deg, #cc2c3f 0%, #a61b2c 50%, #5a1020 100%)",
        heroRust: "linear-gradient(135deg, #b83c3c 0%, #8b1a2d 50%, #5a1020 100%)",
        hero: "linear-gradient(135deg, #d7263d 0%, #cc2c3f 50%, #8b1a2d 100%)",
      },
    },
  },
  plugins: [],
};

