// Web client entry file
import "../styles/globals.css";

import * as React from "react";
import ThemeContext from "../store/context";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import SocketContext from "../context/socket";
import PaymentParamsContext from "../context/paymentParameters";
import Head from "next/head";

const TheApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeContext>
        <SocketContext>
          <PaymentParamsContext>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <CssBaseline />
              <Component {...pageProps} />
            </LocalizationProvider>
          </PaymentParamsContext>
        </SocketContext>
      </ThemeContext>
    </>
  );
};

export default TheApp;
