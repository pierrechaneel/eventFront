// agenda page defintion

import * as React from "react";
import { useTheme } from "@mui/material";
import Agenda from "../../../src/components/Agenda";
import { AppLayout } from "../../../src/components";

const AgendaPage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <Agenda />
    </AppLayout>
  );
};

export default AgendaPage;
