// 404 page definition

import * as React from "react";
import { Typography, useTheme } from "@mui/material";
import { PubLayout } from "../src/components";

const Page404 = ({}) => {
  const theme = useTheme();

  return (
    <>
      <PubLayout title="Page introuvable">
        <Typography
          sx={{
            my: "30vh",
            color: theme.palette.common.black,
            fontSize: "24px",
          }}
        >
          Oups ! Cette page n'existe pas
        </Typography>
      </PubLayout>
    </>
  );
};

export default Page404;
