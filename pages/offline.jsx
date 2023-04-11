// offline page component definition

import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { AppLayout } from "../src/components";

const OfflinePage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout pageTitle={"Hors connexios"}>
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: theme.typography.fontWeightRegular,
            color: theme.palette.grey[700],
            fontSize: "14px",
          }}
        >
          Vous êtes offline. Veuillez activer la connexion aux données avec
          votre SIM Orange <br /> pour pouvoir acéder à la page{" "}
        </Typography>
      </Stack>
    </AppLayout>
  );
};

export default OfflinePage;
