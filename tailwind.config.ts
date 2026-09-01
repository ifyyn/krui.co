/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF8",
        "bg-alt": "#F3F0E9",
        ink: "#171717",
        "ink-soft": "#5B5952",
        line: "#E7E3D8",
        blue: "#1E6FD9",
        "blue-soft": "#E7F0FD",
        green: "#2FA84F",
        "green-soft": "#E7F6EA",
        orange: "#F5821F",
        "orange-soft": "#FDECDA",
        sand: "#E8DCC8",
        surf: "#0E8FBF",
        rental: "#3C9A3F",
        experience: "#E0672F",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-dmmono)", "'DM Mono'", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      borderRadius: {
        lg2: "28px",
        "card": "14px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(23, 23, 23, 0.08)",
      },
    },
  },
  plugins: [],
};
