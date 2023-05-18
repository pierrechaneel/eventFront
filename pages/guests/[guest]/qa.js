// contact page definition

import * as React from "react";
import { useTheme } from "@mui/material";
import Qa from "../../../src/components/Qa";
import { AppLayout } from "../../../src/components";

const ContactPage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <Qa />
    </AppLayout>
  );
};

export default ContactPage;
