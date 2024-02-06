import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      display: ["group-hover"],
      padding: ['first']
    }
  },
  darkMode: "class",
  plugins: [
    nextui(
      {
        themes: {
          light: {
            colors: {
              background: "#FFFFFF", // or DEFAULT
              foreground: "#11181C", // or 50 to 900 DEFAULT
              primary: {
                50: "#FEEEE6",
                100: "#FEEEE6",
                200: "#FDDACE",
                300: "#FBC0B4",
                400: "#F7A8A0",
                500: "#F38181",
                600: "#D05E68",
                700: "#AE4154",
                800: "#8C2943",
                900: "#741838",
                foreground: "#FFFFFF",
                DEFAULT: "#F38181",
              },
              // ... rest of the colors
            },
          },
          dark: {
            colors: {
              background: "#333333",
              foreground: "#ffffff",
              primary: {
                50: "#FEEEE6",
                100: "#FEEEE6",
                200: "#FDDACE",
                300: "#FBC0B4",
                400: "#F7A8A0",
                500: "#F38181",
                600: "#D05E68",
                700: "#AE4154",
                800: "#8C2943",
                900: "#741838",
                DEFAULT: "#F38181",
                foreground: "#ffffff",
              },
              focus: "#D05E68",
            },
            layout: {
              disabledOpacity: "0.3",
              radius: {
                small: "4px",
                medium: "6px",
                large: "8px",
              },
              borderWidth: {
                small: "1px",
                medium: "2px",
                large: "3px",
              },
            },
          },
        },
      }
    ),
    require('@tailwindcss/typography'),
  ]
}