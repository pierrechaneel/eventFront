// OTP page definition

import * as React from "react";
import {
  Box,
  Button,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import { LangCtx } from "../../context/lang";
import { GuestCtx } from "../../context/guest";
import configs from "../../configs/generals.json";
import Mail from "@mui/icons-material/Mail";
import Pin from "@mui/icons-material/Pin";
import Link from "@mui/icons-material/Link";
import LockOpen from "@mui/icons-material/LockOpen";
import { useRouter } from "next/router";
import packageCfg from "../../package.json";
import SnackMessage from "./SnackMessage";
import axios from "axios";
import { viewportsCtx } from "../../context/viewports";

const OTP = ({}) => {
  const theme = useTheme();

  const router = useRouter();
  const currentLang = React.useContext(LangCtx)?.lang;
  const currentGuest = React.useContext(GuestCtx)?.guest;
  const setLoggedIn = React.useContext(GuestCtx)?.setLoggedIn;
  const setGuest = React.useContext(GuestCtx)?.setGuest;

  console.log("the guest context");

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
    (async () => {
      window.sessionStorage.clear();

      await axios
        .get(
          `${configs?.backendUrl}/api/guests/properties?accessKey=${
            window.location.pathname.split("/")[2]
          }`
        )
        .then(async (result) => {
          console.log("guest found ", result?.data);

          const guestDatum = result.data?.guestInfo[0];

          setGuest(guestDatum);

          await axios
            .post(`${configs?.otpEndpoint}/generate`, {
              reference: guestDatum?.phoneNumber,
              origin: packageCfg?.name,
              senderName: configs?.otpSenderName,
            })
            .then((results) => {
              setSnackMessage("Veuillez entrer le code réçu");
              setSeverity("info");
              setIsnackVisible(true);

              window.sessionStorage.setItem(
                "guest",
                JSON.stringify(guestDatum)
              );
            })
            .catch((error) => {
              console.log("an error has occured when sending OTP code", error);

              setSnackMessage("Désolé, veuillez recharger");
              setSeverity("error");
              setIsnackVisible(true);
            });
        })
        .catch((error) => {
          console.log("an error has occured when fetching guest info", error);

          setSnackMessage("Désolé ! Veuillez recharger la page");
          setSeverity("error");
          setIsnackVisible(true);
        });
    })();
  }, []);

  const handleSubmit = async (event) => {
    event?.preventDefault();

    let receivedOtp = null;

    Array.from(event?.target?.elements)
      ?.filter((elt) => elt?.name !== "")
      ?.forEach((element) => {
        if (element?.name === "otpCode") {
          receivedOtp = element?.value;
        }
      });

    console.log("otp to send", { receivedOtp });

    await axios
      .post(`${configs?.otpEndpoint}/check`, {
        receivedOtp,
        origin: packageCfg.name,
        reference: currentGuest?.phoneNumber,
      })
      .then((results) => {
        if (results?.data?.diagnosticResult) {
          setLoggedIn(true);

          window.location.pathname = `guests/${router.query?.guest}/qrcode`;
        } else {
          setIsnackVisible(true);
          setSnackMessage("Le code OTP entré n'est pas correct");
          setSeverity("error");
        }
      })
      .catch((error) => {
        console.log(
          "an error has occured when trying to check OTP code",
          error
        );

        setIsnackVisible(true);
        setSnackMessage("Le code OTP entré n'est pas correct");
        setSeverity("error");
      });
  };

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
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
      <Head>
        <title>Code OTP</title>
      </Head>
      <Box
        sx={{
          width: "100vw",
          height: "100%",
          backgroundImage: "url('/web_events_okapi.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          m: 0,
          p: 0,
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            bgcolor: `#000000CF`,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              fontSize: screen870 ? "14px" : "18px",
              fontWeight: theme.typography.fontWeightThin,
              textAlign: "center",
              color: theme.palette.primary.main,
              m: 0,
              textAlign: "center",
            }}
          >
            LET'S CONNECT
          </Typography>
          <Typography
            component={"h1"}
            sx={{
              color: theme.palette.common.white,
              fontSize: screen870 ? "26px" : "50px",
              fontWeight: theme.typography.fontWeightBlack,
              m: 0,
              textAlign: "center",
              lineHeight: 0.9,
              mb: ".5rem",
            }}
          >
            Digitizing our events
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              width: screen660 ? "90%" : screen870 ? "60%" : "30%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "1px",
                bgcolor: theme.palette.grey[300],
                flexGrow: 1,
                minWidth: "50px",
              }}
            ></Box>
            <Typography
              component={"h3"}
              sx={{
                color: theme.palette.grey[300],
                fontSize: screen660 ? "10px" : screen870 ? "12px" : "14px",
                fopntWeight: theme.typography.fontWeightLight,
                m: 0,
                textAlign: "center",
                mx: screen870 ? ".5rem" : "1rem",
              }}
            >
              Vous rapprocher de l'essentiel
            </Typography>

            <Box
              sx={{
                height: "1px",
                bgcolor: theme.palette.grey[300],
                flexGrow: 1,
                minWidth: "50px",
              }}
            ></Box>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack
              direction={"column"}
              sx={{
                alignItems: "center",
                mb: "3vh",
                width: "100%",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  width: "max-content",
                  border: `2px solid ${theme.palette.common.white}`,
                  px: ".5rem",
                  py: ".2rem",
                  mt: "1.5rem",
                  maxWidth: "90%",
                }}
              >
                <Pin
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: "32px",
                    mr: ".5rem",
                  }}
                />
                <InputBase
                  aria-label="Entrer le code récu"
                  placeholder="Entrer le code récu"
                  type="password"
                  name={"otpCode"}
                  autoFocus={true}
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: "12px",
                  }}
                />
              </Stack>
              <Button
                type={"submit"}
                startIcon={
                  <LockOpen
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "22px",
                    }}
                  />
                }
                sx={{
                  px: "1.5rem",
                  py: ".7rem",
                  bgcolor: theme.palette.common.black,
                  borderRadius: "0px",
                  mt: "1.2rem",
                  fontSize: "16px",
                  "&:hover": {
                    bgcolor: theme.palette.common.black,
                  },
                }}
              >
                Connexion
              </Button>
            </Stack>
          </form>
          <Typography
            sx={{
              color: theme.palette.grey[300],
              fontWeight: theme.typography.fontWeightLight,
              textAlign: "center",
              position: "absolute",
              bottom: "2rem",
              fontSize: "10px",
              maxWidth: screen870 ? "90%" : "60%",
            }}
          >
            Powered by Orange RDC Developers Team. All rights reserved
            &copy;Orange RDC SA {new Date().getFullYear()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default OTP;
