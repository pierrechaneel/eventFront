// contact page definition

import * as React from "react";
import { useTheme } from "@mui/material";
import Profile from "../../../src/components/Profile";
import { AppLayout } from "../../../src/components";

const ContactPage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <Profile />
    </AppLayout>
  );
};

export default ContactPage;
