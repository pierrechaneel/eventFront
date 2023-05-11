// guest page definition

import * as React from "react";
import { Stack, useTheme } from "@mui/material";
import { AppLayout } from "../../../src/components";
import QrCode from "../../../src/components/QrCode";

const Guest = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <QrCode />
    </AppLayout>
  );
};

export default Guest;
