import * as React from "react";

import { ThemeProvider } from "@mui/material";
import themes from "../store/assets/themes";

const ThemeContext = ({ children }) => {
  return <ThemeProvider theme={themes}>{children}</ThemeProvider>;
};

export default ThemeContext;
