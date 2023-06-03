// Web client entry file
import "../styles/globals.css";

import * as React from "react";
import ThemeContext from "../context/theme";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import SocketContext from "../context/socket";
import GuestContext from "../context/guest";
import LangContext from "../context/lang";
import Head from "next/head";
import ViewportsContext from "../context/viewports";
import PostContext from "../context/posts";
import ContactsContext from "../context/contacts";

const TheApp = ({ Component, pageProps }) => {
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
          <LangContext>
            <GuestContext>
              <PostContext>
                <ContactsContext>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <CssBaseline />
                    <ViewportsContext>
                      <Component {...pageProps} />
                    </ViewportsContext>
                  </LocalizationProvider>
                </ContactsContext>
              </PostContext>
            </GuestContext>
          </LangContext>
        </SocketContext>
      </ThemeContext>
    </>
  );
};

export default TheApp;
