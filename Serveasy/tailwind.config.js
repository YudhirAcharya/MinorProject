/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: 0,
        rounded: 0,
      },
      fontFamily: {
        Q: ["Quicksand", "sans-serif"],
        G: ["Garamond", "serif"],
        K: ["Kaushan Script"], // add this line
      },
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        vvsm: "300px",
        vsm: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#191406",
        cartNumBg: "#e80013",
        primary: "#ffc93c",
        secondary: "#4E6C50",
        tertiary: "#ffe49e",
        warning: "#820000",
        lightColor: "#fffaec",
        cardOverlay: "rgba(256,256,256,0.4)",
        lighttextGray: "#9ca0ab",
        card: "rgba(256,256,256,0.8)",
        cartBg: "#282a2c",
        cartItem: "#B19765",
        cartTotal: "#343739",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scale-175x": {
          transform: "scale(1.75)",
        },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        ".hide-lg-down": {
          "@media (max-width: 1200px)": {
            display: "none",
          },
        },
        ".hide-vsm-down": {
          "@media (max-width:550px)": {
            display: "none",
          },
        },
        ".hide-vvsm-down": {
          "@media (max-width:430px)": {
            display: "none",
          },
        },
      });
    },
  ],
};
