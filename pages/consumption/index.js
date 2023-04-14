// consumption page defintion

import * as React from "react";

import {
  AppLayout,
  BalancePie,
  Consumption,
  PubLayout,
  PromoPubs,
} from "../../src/components";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";

const StartPage = ({ updateTime }) => {
  console.log("out strat tilme we spread", { updateTime });

  return (
    <>
      <PubLayout>
        <Consumption updateTime={updateTime} />
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
