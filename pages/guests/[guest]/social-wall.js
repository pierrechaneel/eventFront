// embeded page definition

import * as React from "react";
import { useTheme } from "@mui/material";
import { AppLayout } from "../../../src/components";
import SocialWall from "../../../src/components/SocialWall";

const ContactPage = ({}) => {
  const theme = useTheme();

  return (
    <AppLayout>
      <SocialWall />
    </AppLayout>
  );
};

export default ContactPage;
