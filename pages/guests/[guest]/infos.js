// embeded page definition

import * as React from "react";
import { useTheme } from "@mui/material";
import { AppLayout } from "../../../src/components";
import Info from "../../../src/components/Info";

const Infos = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <Info />
    </AppLayout>
  );
};

export default Infos;
