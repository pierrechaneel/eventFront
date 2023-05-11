// offline page component definition

import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { AppLayout, Welcome } from "../src/components";

const OfflinePage = ({}) => {
  const theme = useTheme();

  return <Welcome />;
};

export default OfflinePage;
