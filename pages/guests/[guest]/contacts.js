// contact page definition

import * as React from "react";
import { useTheme } from "@mui/material";
import { AppLayout } from "../../../src/components";
import Contacts from "../../../src/components/Contacts";

const ContactPage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <Contacts />
    </AppLayout>
  );
};

export default ContactPage;
