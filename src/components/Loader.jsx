// loader component defintion

import * as React from "react";
import { useTheme, Stack } from "@mui/material";
import { viewportsCtx } from "../../context/viewports";

const Loader = ({}) => {
  const theme = useTheme();

  const screen870 = React.useContext(viewportsCtx)?.screen870;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: theme.palette.common.black,
        alignItems: "center",
        justifyContent: "center",
        "@keyframes load": {
          "0%": {
            width: "0px",
            transform: "rotate(360deg)",
          },
          "100%": {
            width: screen870 ? "50px" : "150px",
            transform: "rotate(0deg)",
          },
        },
      }}
    >
      <img
        src="/okapisaio.png"
        alt="loader"
        style={{
          width: screen870 ? "50px" : "150px",
          animation: "load 1s linear infinite",
        }}
      />
    </Stack>
  );
};

export default Loader;
