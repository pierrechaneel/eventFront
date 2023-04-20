// section loader component defintion

import * as React from "react";
import { Stack, useTheme, CircularProgress, Typography } from "@mui/material";

const SectionLoader = ({}) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)`,
        bgcolor: theme.palette.common.white,
        borderradius: "0px",
        py: "1.5rem",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontSize: "14px",
          fontWeight: theme.typography.fontWeightRegular,
          mb: ".5rem",
        }}
      >
        Chargement ...
      </Typography>
      <CircularProgress
        size={"16px"}
        sx={{
          color: theme.palette.primary.main,
          fontSize: "16px",
          my: "1rem",
        }}
      />
    </Stack>
  );
};

export default SectionLoader;
