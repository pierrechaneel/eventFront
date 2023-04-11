import * as React from "react";
import { createTheme } from "@mui/material";

const customeTheme = createTheme({
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
    fontFamily: ["'Poppins', sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export default customeTheme;
