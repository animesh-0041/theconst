/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}", // Include file extensions you're using
    ],
    theme: {
      extend: {
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        colors: {
          // Shades of black
          black: {
            0: "#FFFFFF",
            25: "#F6F7F8",
            50: "#EDF0F3",
            75: '#616161',
            100: '#878787',
            200: "#D6DBE0",
            300: "#A2ABB4",
            500: "#5C6A76",
            700: "#3F4D5A",
            900: "#1c1c1c",
          },
          // Shades of green
          green: {
            0: "#C3FFB9",
            50: "#F1FCEF",
            100: "#DFF9DB",
            200: "#318811",
            300: "#81C56A",
            500: "#57B635",
            600: "#3AA316",
            700: "#29720E",
            800: "#29720E",
            900: "#1A5205",
          },
          // Shades of blue
          blue: {
            500: "#207ACD",
          },
          // Shades of yellow
          yellow: {
            50: "#FCFAE3",
            100: "#F9F6DB",
            500: "#DFB41B",
          },
          // Shades of red
          red: {
            50: "#fff1f1",
            100: "#ffdfdf",
            200: "#ffc5c5",
            300: "#ff9d9d",
            400: "#ff6464",
            500: "#ff2929",
            600: "#ed1515",
            700: "#c80d0d",
            800: "#a50f0f",
            900: "#881414",
            950: "#4b0404",
          },
          orange: {
            50: "#fffbea",
            100: "#fff1c5",
            200: "#ffe485",
            300: "#ffcf46",
            400: "#ffb91b",
            500: "#ff9500",
            600: "#e26e00",
            700: "#bb4a02",
            800: "#983908",
            900: "#7c2f0b",
            950: "#481600",
          },
          brown: {
            50: '#d9a45e',
          },
          purpel: {
            500: "#5138ee",
          },
          // Color gradients
          gradient: {
            1: "#EA4444",
            2: "#F37447",
            3: "#FCA249",
            4: "#FFCE4B",
            5: "#FFE14C",
            6: "#F3EF3E",
            7: "#D4F435",
            8: "#9FDF2A",
            9: "#5CAF1C",
            10: "#359414",
          },
          // Other specific colors
          buttonPrimary: "#29720E",
          buttonLight: "#F1FCEFCC",
          selectFocus: "#3F4D5A1A",
        },
        fontFamily: {
          Golos: ["GolosText Regular", "sans-serif"],
          GolosBold: ["GolosText Bold", "sans-serif"],
          GolosExtra: ["GolosText ExtraBold", "sans-serif"],
          GolosMedium: ["GolosText Medium", "sans-serif"],
          GolosSemibold: ["GolosText Semibold", "sans-serif"],
        },
        boxShadow: {
          header: "0px 2px 12px 0px rgba(0, 0, 0, 0.16)",
        },
        height: {
          header: "8.88vh", // Sets the height to 8.88% of the viewport height
          content: "calc(100vh - 8.88vh)", // Sets the height to 100% viewport height minus the height of the header
        },
        margin: {
          25: "25%",
          7: "7.11vh",
        },
        fontSize: {
          base: "1rem",
          xl: "1.25rem",
          32: "32px",
          "3xl": "40px",
          "4xl": "2.441rem",
          "5xl": "3.052rem",
        },
        letterSpacing: {
          0.25: "0.015625rem", // Sets the letter-spacing to 0.25 pixels in terms of rem
        },
        lineHeight: {
          48: "3rem",
        },
        borderRadius: {
          12: "12px",
          51: "51px",
          93: "93px",
          xl: "0.75rem",
        },
        flex: {
          2: "1 0 0",
        },
      },
    },
    plugins: [],
  };
  