// app theme context definiton

import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material";

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
      fontFamily: ["'Poppins', sans-serif"].join(","),
      button: {
        textTransform: "none",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;
