// 500 page definition

import * as React from "react";
import { Typography, useTheme } from "@mui/material";
import { PubLayout, Welcome } from "../src/components";

const Page500 = ({}) => {
  const theme = useTheme();

  return (
    <>
      <Welcome />
    </>
  );
};

export default Page500;
