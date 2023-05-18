// embeded page definition

import * as React from "react";
import { useTheme } from "@mui/material";
import { AppLayout } from "../../../src/components";
import EmbededYt from "../../../src/components/EmbededYt";

const ContactPage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <EmbededYt />
    </AppLayout>
  );
};

export default ContactPage;
