// guest index page definition

import React from "react";
import OTP from "../../../src/components/OTP";

const StartPage = ({}) => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (error) {
            console.log("Service Worker registration failed: ", error);
          }
        );
      });
    }
  }, []);

  return (
    <>
      <OTP />
    </>
  );
};

export default StartPage;
