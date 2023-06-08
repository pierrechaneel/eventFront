// app theme context definiton

import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material";

/**
 * 
 * 
import helveticaNewBold from "../fonts/bold.ttf";
import helveticaNewBlack from "../fonts/black.ttf";
import helveticaNewLight from "../fonts/light.ttf";
import helveticaNewThin from "../fonts/thin.ttf";
import helveticaNewMedium from "../fonts/medium.ttf";
import helveticaNewRegular from "../fonts/regular.ttf";
 */

const ThemeContext = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff6600",
      },
      secondary: {
        main: "#000000",
      },

      tertiary: {
        main: "#333333",
      },
    },
    typography: {
      fontWeightThin: 100,
      fontWeightBlack: 900,
      fontFamily: ["Neue", "Helvetica"].join(","),
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Neue';
          font-weight: 400;
          font-style: normal;
          font-display: swap;
          src: local('Helvetica'), url('/fonts/regular.ttf')  format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Neue';
          font-weight: 500;
          font-style: normal;
          font-display: swap;
          src: local('Helvetica'), url('/fonts/medium.ttf')  format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Neue';
          font-weight: 200;
          font-style: normal;
          font-display: swap;
          src: local('Helvetica'), url('/fonts/thin.ttf')  format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Neue';
          font-weight: 300;
          font-style: normal;
          font-display: swap;
          src: local('Helvetica'), url('/fonts/light.ttf')  format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Neue';
          font-weight: 900;
          font-style: normal;
          font-display: swap;
          src: local('Helvetica'), url('/fonts/black.ttf')  format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Neue';
          font-weight: 700;
          font-style: normal;
          font-display: swap;
          src: local('Helvetica'), url('/fonts/bold.ttf')  format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;
