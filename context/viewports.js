// Socket context definition

import * as React from "react";
import { subsSocket } from "../services/sockets";
import { useMediaQuery, useTheme } from "@mui/material";

const viewportsCtx = React.createContext({});

const ViewportsContext = ({ children }) => {
  const theme = useTheme();

  const screen870 = useMediaQuery(theme.breakpoints.down(870));

  return (
    <viewportsCtx.Provider value={{ screen870 }}>
      {children}
    </viewportsCtx.Provider>
  );
};

export { viewportsCtx };
export default ViewportsContext;
