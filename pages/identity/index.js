// identity page defintion

import * as React from "react";

import {
  AppLayout,
  CustomerContact,
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

const StartPage = ({ updateTime }) => {
  const theme = useTheme();

  const screen750 = useMediaQuery(theme.breakpoints.down(750));

  return (
    <>
      <PubLayout title="Mes numéros de contacts">
        <CustomerContact updateTime={updateTime} />
      </PubLayout>
    </>
  );
};

export async function getServerSideProps() {
  console.log("datime to delive to clients", {
    props: { updateTime: new Date().toLocaleString("fr-FR") },
  });

  return { props: { updateTime: new Date().toLocaleString("fr-FR") } };
}

export default StartPage;
