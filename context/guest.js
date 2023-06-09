// app Guestuage context definition

import axios from "axios";
import * as React from "react";
import configs from "../configs/generals.json";
import { useRouter } from "next/router";
import SnackMessage from "../src/components/SnackMessage";

const GuestCtx = React.createContext({});

const GuestContext = ({ children }) => {
  const [guest, setGuest] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsnackVisible(false);
  };

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  React.useEffect(() => {
    let guestObj = JSON.parse(window.sessionStorage.getItem("guest"));

    console.log("guest oibject def received", guestObj);

    if (guestObj) {
      // setLoggedIn(true);

      setGuest(guestObj);

      console.log("updated guest loggin in status");
    }
  }, []);

  return (
    <GuestCtx.Provider
      value={{
        guest,
        setGuest,
        loggedIn,
        setLoggedIn,
      }}
    >
      {isSnackVisible ? (
        <SnackMessage
          handleClose={handleClose}
          message={snackMessage}
          severity={severity}
        />
      ) : (
        ""
      )}
      {children}
    </GuestCtx.Provider>
  );
};

export { GuestCtx };
export default GuestContext;
