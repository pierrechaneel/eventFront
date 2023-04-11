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

const StartPage = ({}) => {
  return (
    <>
      <PubLayout>
        <Consumption />
      </PubLayout>
    </>
  );
};

export default StartPage;
