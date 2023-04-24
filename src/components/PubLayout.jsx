// PubLayout component definition

import * as React from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { AppLayout, PromoPubs } from ".";

const PubLayout = ({ children, title = null }) => {
  const theme = useTheme();

  const screen1100 = useMediaQuery(theme.breakpoints.down(1100));
  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  return (
    <AppLayout pageTitle={title !== null ? title : "Ma consommation"}>
      <Stack
        direction={"column"}
        sx={{
          alignItems: "flex-start",
          justifyContent: screen1100 ? undefined : "space-between",
          mt: "60px",
          width: "100%",
          bgcolor: theme.palette.grey[50],
          minHeight: "100vh",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            maxHeight: "70vh",
            px: !screen750 ? "5%" : undefined,
          }}
        >
          <PromoPubs />
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            px: "5%",
            py: "1rem",
          }}
        >
          {children}
        </Stack>

        <Stack
          direction={"row-reverse"}
          sx={{
            width: "100%",
            pb: "3rem",
            pt: "1rem",
            px: "5%",
          }}
        >
          <img
            src={"/bottom-rign-corner.svg"}
            style={{
              width: "150px",
              transform: "rotate(90deg)",
              right: "-.85rem",
            }}
          />
        </Stack>
      </Stack>
    </AppLayout>
  );
};

export default PubLayout;
