// 404 page definition

import * as React from "react";
import { Typography, useTheme } from "@mui/material";
import { PubLayout } from "../src/components";

const Page404 = ({}) => {
  const theme = useTheme();

  return (
    <>
      <Typography>Not found</Typography>
    </>
  );
};

export default Page404;
