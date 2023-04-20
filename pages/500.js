// 500 page definition

import * as React from "react";
import { Typography, useTheme } from "@mui/material";
import { PubLayout } from "../src/components";

const Page500 = ({}) => {
  const theme = useTheme();

  return (
    <>
      <PubLayout title="Erreur">
        <Typography
          sx={{
            my: "30vh",
            color: theme.palette.common.black,
            fontSize: "24px",
          }}
        >
          Oups ! Veuillez réessayer plus tard
        </Typography>
      </PubLayout>
    </>
  );
};

export default Page500;
