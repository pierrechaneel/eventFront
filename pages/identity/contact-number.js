// identity page defintion

import * as React from "react";

import {
  AppLayout,
  CustomerContact,
  EditContact,
  PromoPubs,
  PubLayout,
} from "../../src/components";
import {
  useTheme,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Dangerous } from "@mui/icons-material";

const StartPage = ({}) => {
  const theme = useTheme();

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  return (
    <>
      <PubLayout>
        <EditContact />
      </PubLayout>
    </>
  );
};

export default StartPage;
